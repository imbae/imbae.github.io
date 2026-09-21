---
title: "[C#/WPF] FFmpeg로 RTP / RTSP 영상 Display 하기"
date: 2019-02-14
summary: "시리즈의 보너스 판이다."
tags: ["C#", "WPF"]
key: tistory-65
---

본 포스팅은

[C#/WPF] FFmpeg로 USB Camera(WebCam) Display 하기

시리즈의 보너스 판이다.

링크

[[C#/WPF] FFmpeg로 USB Camera(WebCam) Display 하기 - 1](/notes/tistory-61/)

[[C#/WPF] FFmpeg로 USB Camera(WebCam) Display 하기 - 2](/notes/tistory-62/)

[[C#/WPF] FFmpeg로 USB Camera(WebCam) Display 하기 - 3](/notes/tistory-63/)

기본적인 환경설정과 대부분의 소스코드는 동일하다.

단 2개 소스 파일의 일부분만 변경하면 웹캠에서 RTP 혹은 RTSP 영상을 출력할 수 있다.

수정할 파일 목록이다.

VideoStreamDecoder.cs

MainWindow.xaml.cs

**VideoStreamDecoder.cs**

```
using FFmpeg.AutoGen;
using System;
using System.Collections.Generic;
using System.Runtime.InteropServices;

namespace FFmpeg_usbCam.FFmpeg.Decoder
{
 public sealed unsafe class VideoStreamDecoder : IDisposable
    {
 private readonly AVCodecContext* _pCodecContext;
 private readonly AVFormatContext* _pFormatContext;
 private readonly int _streamIndex;
 private readonly AVFrame* _pFrame;
 private readonly AVPacket* _pPacket;

 public VideoStreamDecoder(string url)
        {
 _pFormatContext = ffmpeg.avformat_alloc_context();
 var pFormatContext = _pFormatContext;

 //미디어 파일 열기 url주소 또는 파일 이름 필요
 ffmpeg.avformat_open_input(&pFormatContext, url, null, null).ThrowExceptionIfError();

 ////미디어 정보 가져옴, blocking 함수라서 network protocol으로 가져올 시, 블락될수도 있슴
 ffmpeg.avformat_find_stream_info(_pFormatContext, null).ThrowExceptionIfError();

 // find the first video stream
 AVStream* pStream = null;

 for (var i = 0; i < _pFormatContext->nb_streams; i++)

 if (_pFormatContext->streams[i]->codec->codec_type == AVMediaType.AVMEDIA_TYPE_VIDEO)
                {
 pStream = _pFormatContext->streams[i];
 break;
                }

 if (pStream == null) throw new InvalidOperationException("Could not found video stream.");

 _streamIndex = pStream->index;
 _pCodecContext = pStream->codec;

 var codecId = _pCodecContext->codec_id;
 var pCodec = ffmpeg.avcodec_find_decoder(codecId);  //H264
 if (pCodec == null) throw new InvalidOperationException("Unsupported codec.");

 //open codec
 ffmpeg.avcodec_open2(_pCodecContext, pCodec, null).ThrowExceptionIfError();

 CodecName = ffmpeg.avcodec_get_name(codecId);
 FrameSize = new System.Windows.Size(_pCodecContext->width, _pCodecContext->height);
 PixelFormat = _pCodecContext->pix_fmt;

 _pPacket = ffmpeg.av_packet_alloc();
 _pFrame = ffmpeg.av_frame_alloc();
        }
 public string CodecName { get; }
 public System.Windows.Size FrameSize { get; }
 public AVPixelFormat PixelFormat { get; }

 public void Dispose()
        {
 ffmpeg.av_frame_unref(_pFrame);
 ffmpeg.av_free(_pFrame);

 ffmpeg.av_packet_unref(_pPacket);
 ffmpeg.av_free(_pPacket);

 ffmpeg.avcodec_close(_pCodecContext);
 var pFormatContext = _pFormatContext;
 ffmpeg.avformat_close_input(&pFormatContext);
        }

 public bool TryDecodeNextFrame(out AVFrame frame)
        {
 ffmpeg.av_frame_unref(_pFrame);
 int error;
 do
            {
 try
                {
 do
                    {
 error = ffmpeg.av_read_frame(_pFormatContext, _pPacket);
 if (error == ffmpeg.AVERROR_EOF)
                        {
 frame = *_pFrame;
 return false;
                        }

 error.ThrowExceptionIfError();
                    } while (_pPacket->stream_index != _streamIndex);

 ffmpeg.avcodec_send_packet(_pCodecContext, _pPacket).ThrowExceptionIfError();
                }
 finally
                {
 ffmpeg.av_packet_unref(_pPacket);
                }

 error = ffmpeg.avcodec_receive_frame(_pCodecContext, _pFrame);
            } while (error == ffmpeg.AVERROR(ffmpeg.EAGAIN));

 error.ThrowExceptionIfError();
 frame = *_pFrame;
 return true;
        }

 public IReadOnlyDictionary<string, string> GetContextInfo()
        {
 AVDictionaryEntry* tag = null;
 var result = new Dictionary<string, string>();
 while ((tag = ffmpeg.av_dict_get(_pFormatContext->metadata, "", tag, ffmpeg.AV_DICT_IGNORE_SUFFIX)) != null)
            {
 var key = Marshal.PtrToStringAnsi((IntPtr)tag->key);
 var value = Marshal.PtrToStringAnsi((IntPtr)tag->value);
 result.Add(key, value);
            }

 return result;
        }
    }
}
```

**MainWindow.xaml.cs**

```
using System;
using System.Linq;
using System.Runtime.InteropServices;
using System.Threading;
using System.Windows;
using System.Windows.Media.Imaging;
using System.Windows.Threading;
using FFmpeg.AutoGen;
using FFmpeg_usbCam.FFmpeg.Decoder;
using System.Drawing;
using System.IO;
using FFmpeg_usbCam.FFmpeg;

namespace FFmpeg_usbCam
{
 /// <summary>
 /// MainWindow.xaml에 대한 상호 작용 논리
 /// </summary>
 public partial class MainWindow : Window
    {
 Thread thread;
 ThreadStart ts;
 Dispatcher dispatcher = Application.Current.Dispatcher;

 private bool activeThread;      //thread 활성화 유무

 public MainWindow()
        {
 InitializeComponent();

 //비디오 프레임 디코딩 thread 생성
 ts = new ThreadStart(DecodeAllFramesToImages);
 thread = new Thread(ts);

 //FFmpeg dll 파일 참조 경로 설정
 FFmpegBinariesHelper.RegisterFFmpegBinaries();

 activeThread = true;
        }

 private void Play_Button_Click(object sender, RoutedEventArgs e)
        {
 //thread 시작
 if (thread.ThreadState == ThreadState.Unstarted)
            {
 thread.Start();
            }
        }

 private unsafe void DecodeAllFramesToImages()
        {
 //test rtsp 영상 주소
 var url = "rtsp://184.72.239.149/vod/mp4:BigBuckBunny_115k.mov"; // be advised this file holds 1440 frames
 using (var vsd = new VideoStreamDecoder(url))
            {
 var info = vsd.GetContextInfo();
 info.ToList().ForEach(x => Console.WriteLine($"{x.Key} = {x.Value}"));

 var sourceSize = vsd.FrameSize;
 var sourcePixelFormat = vsd.PixelFormat;
 var destinationSize = sourceSize;
 var destinationPixelFormat = AVPixelFormat.AV_PIX_FMT_BGR24;
 using (var vfc = new VideoFrameConverter(sourceSize, sourcePixelFormat, destinationSize, destinationPixelFormat))
                {
 var frameNumber = 0;
 while (vsd.TryDecodeNextFrame(out var frame) && activeThread)
                    {
 var convertedFrame = vfc.Convert(frame);

 Bitmap bitmap;

 bitmap = new Bitmap(convertedFrame.width, convertedFrame.height, convertedFrame.linesize[0], System.Drawing.Imaging.PixelFormat.Format24bppRgb, (IntPtr)convertedFrame.data[0]);
 BitmapToImageSource(bitmap);

 frameNumber++;
                    }
                }
            }
        }

 void BitmapToImageSource(Bitmap bitmap)
        {
 //UI thread에 접근하기 위해 dispatcher 사용
 dispatcher.BeginInvoke((Action)(() =>
            {
 if (thread.IsAlive)
                {
 using (MemoryStream memory = new MemoryStream())
                    {
 bitmap.Save(memory, System.Drawing.Imaging.ImageFormat.Bmp);
 memory.Position = 0;
 BitmapImage bitmapimage = new BitmapImage();
 bitmapimage.BeginInit();
 bitmapimage.CacheOption = BitmapCacheOption.OnLoad;
 bitmapimage.StreamSource = memory;
 bitmapimage.EndInit();

 image.Source = bitmapimage;     //image 컨트롤에 웹캠 이미지 표시

 //memory.Dispose();
 //GC.Collect();
                    }
                }

            }));

        }

 private void Window_Closing(object sender, System.ComponentModel.CancelEventArgs e)
        {
 if (thread.IsAlive)
            {
 activeThread = false;
 thread.Join();
            }
        }
    }
}
```

수정 후 빌드하면 아래와 같이 테스트용 RTSP 영상이 출력된다.

특정 주소를 열고 싶다면 url만 수정하면 될 것이다.

![](/assets/images/notes/65/1.png)
