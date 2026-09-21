---
title: "[C#/WPF] FFmpeg로 USB Camera(WebCam) Display 하기 - 2"
date: 2019-02-14
summary: "아래부터는 이전 장에서 생성한"
tags: ["C#", "WPF"]
key: tistory-62
---

아래부터는 이전 장에서 생성한

**FFmpegBinariesHelper.cs**

**FFmpegHelper.cs**

**VideoFrameConverter.cs**

**VideoStreamDecoder.cs**

파일들의 소스 코드이니 복사해서 붙여넣는다.

(* 클래스 이름이나 네임스페이스는 잘 확인해서 붙여넣어야 오류가 안난다.)

**FFmpegBinariesHelper.cs**

```
using System;
using System.IO;
using System.Runtime.InteropServices;

namespace FFmpeg_usbCam.FFmpeg
{
 public class FFmpegBinariesHelper
    {
 private const string LD_LIBRARY_PATH = "LD_LIBRARY_PATH";
 internal static void RegisterFFmpegBinaries()
        {
 switch (Environment.OSVersion.Platform)
            {
 case PlatformID.Win32NT:
 case PlatformID.Win32S:
 case PlatformID.Win32Windows:
 var current = Environment.CurrentDirectory;
 var probe = Path.Combine("FFmpeg", "Plugins");
 while (current != null)
                    {
 var ffmpegDirectory = Path.Combine(current, probe);
 if (Directory.Exists(ffmpegDirectory))
                        {
 RegisterLibrariesSearchPath(ffmpegDirectory);
 return;
                        }
 current = Directory.GetParent(current)?.FullName;
                    }
 break;
 case PlatformID.Unix:
 case PlatformID.MacOSX:
 var libraryPath = Environment.GetEnvironmentVariable(LD_LIBRARY_PATH);
 RegisterLibrariesSearchPath(libraryPath);
 break;
            }
        }

 private static void RegisterLibrariesSearchPath(string path)
        {
 switch (Environment.OSVersion.Platform)
            {
 case PlatformID.Win32NT:
 case PlatformID.Win32S:
 case PlatformID.Win32Windows:
 SetDllDirectory(path);
 break;
 case PlatformID.Unix:
 case PlatformID.MacOSX:
 string currentValue = Environment.GetEnvironmentVariable(LD_LIBRARY_PATH);
 if (string.IsNullOrWhiteSpace(currentValue) == false && currentValue.Contains(path) == false)
                    {
 string newValue = currentValue + Path.PathSeparator + path;
 Environment.SetEnvironmentVariable(LD_LIBRARY_PATH, newValue);
                    }
 break;
            }
        }

        [DllImport("kernel32", SetLastError = true)]
 private static extern bool SetDllDirectory(string lpPathName);
    }
}
```

FFmpegHelper.cs

```
using System;
using System.Runtime.InteropServices;
using FFmpeg.AutoGen;

namespace FFmpeg_usbCam.FFmpeg
{
 internal static class FFmpegHelper
    {
 public static unsafe string Av_strerror(int error)
        {
 var bufferSize = 1024;
 var buffer = stackalloc byte[bufferSize];
 ffmpeg.av_strerror(error, buffer, (ulong)bufferSize);
 var message = Marshal.PtrToStringAnsi((IntPtr)buffer);
 return message;
        }

 public static int ThrowExceptionIfError(this int error)
        {
 if (error < 0) throw new ApplicationException(Av_strerror(error));
 return error;
        }
    }
}
```

**VideoFrameConverter.cs**

```
using System;using System.Runtime.InteropServices;using System.Windows;using FFmpeg.AutoGen;namespace FFmpeg_usbCam.FFmpeg.Decoder{ public sealed unsafe class VideoFrameConverter : IDisposable    { private readonly IntPtr _convertedFrameBufferPtr; private readonly Size _destinationSize; private readonly byte_ptrArray4 _dstData; private readonly int_array4 _dstLinesize; private readonly SwsContext* _pConvertContext; public VideoFrameConverter(Size sourceSize, AVPixelFormat sourcePixelFormat, Size destinationSize, AVPixelFormat destinationPixelFormat)        { _destinationSize = destinationSize; _pConvertContext = ffmpeg.sws_getContext((int)sourceSize.Width, (int)sourceSize.Height, sourcePixelFormat, (int)destinationSize.Width, (int)destinationSize.Height, destinationPixelFormat, ffmpeg.SWS_FAST_BILINEAR, null, null, null); if (_pConvertContext == null) throw new ApplicationException("Could not initialize the conversion context."); var convertedFrameBufferSize = ffmpeg.av_image_get_buffer_size(destinationPixelFormat, (int)destinationSize.Width, (int)destinationSize.Height, 1); _convertedFrameBufferPtr = Marshal.AllocHGlobal(convertedFrameBufferSize); _dstData = new byte_ptrArray4(); _dstLinesize = new int_array4(); ffmpeg.av_image_fill_arrays(ref _dstData, ref _dstLinesize, (byte*)_convertedFrameBufferPtr, destinationPixelFormat, (int)destinationSize.Width, (int)destinationSize.Height, 1);        } public void Dispose()        { Marshal.FreeHGlobal(_convertedFrameBufferPtr); ffmpeg.sws_freeContext(_pConvertContext);        } public AVFrame Convert(AVFrame sourceFrame)        { ffmpeg.sws_scale(_pConvertContext, sourceFrame.data, sourceFrame.linesize, 0, sourceFrame.height, _dstData, _dstLinesize); var data = new byte_ptrArray8(); data.UpdateFrom(_dstData); var linesize = new int_array8(); linesize.UpdateFrom(_dstLinesize); return new AVFrame            { data = data, linesize = linesize, width = (int)_destinationSize.Width, height = (int)_destinationSize.Height            };        }    }}
```

**VideoStreamDecoder.cs**

```
using FFmpeg.AutoGen;using System;using System.Collections.Generic;using System.Runtime.InteropServices;namespace FFmpeg_usbCam.FFmpeg.Decoder{ public sealed unsafe class VideoStreamDecoder : IDisposable    { private readonly AVCodecContext* _pCodecContext; private readonly AVFormatContext* _pFormatContext; private readonly int _streamIndex; private readonly AVFrame* _pFrame; private readonly AVPacket* _pPacket; public VideoStreamDecoder(string device)        { _pFormatContext = ffmpeg.avformat_alloc_context(); var pFormatContext = _pFormatContext; //ffmpeg.av_register_all(); ffmpeg.avdevice_register_all(); //webcam AVInputFormat* iformat = ffmpeg.av_find_input_format("dshow"); ffmpeg.avformat_open_input(&pFormatContext, device, iformat, null).ThrowExceptionIfError();  ////미디어 정보 가져옴, blocking 함수라서 network protocol으로 가져올 시, 블락될수도 있슴 ffmpeg.avformat_find_stream_info(_pFormatContext, null).ThrowExceptionIfError(); // find the first video stream AVStream* pStream = null; for (var i = 0; i < _pFormatContext->nb_streams; i++) if (_pFormatContext->streams[i]->codec->codec_type == AVMediaType.AVMEDIA_TYPE_VIDEO)                { pStream = _pFormatContext->streams[i]; break;                } if (pStream == null) throw new InvalidOperationException("Could not found video stream."); _streamIndex = pStream->index; _pCodecContext = pStream->codec; var codecId = _pCodecContext->codec_id; var pCodec = ffmpeg.avcodec_find_decoder(codecId);  //H264 if (pCodec == null) throw new InvalidOperationException("Unsupported codec."); //open codec ffmpeg.avcodec_open2(_pCodecContext, pCodec, null).ThrowExceptionIfError(); CodecName = ffmpeg.avcodec_get_name(codecId); FrameSize = new System.Windows.Size(_pCodecContext->width, _pCodecContext->height); PixelFormat = _pCodecContext->pix_fmt; _pPacket = ffmpeg.av_packet_alloc(); _pFrame = ffmpeg.av_frame_alloc();        } public string CodecName { get; } public System.Windows.Size FrameSize { get; } public AVPixelFormat PixelFormat { get; } public void Dispose()        { ffmpeg.av_frame_unref(_pFrame); ffmpeg.av_free(_pFrame); ffmpeg.av_packet_unref(_pPacket); ffmpeg.av_free(_pPacket); ffmpeg.avcodec_close(_pCodecContext); var pFormatContext = _pFormatContext; ffmpeg.avformat_close_input(&pFormatContext);        } public bool TryDecodeNextFrame(out AVFrame frame)        { ffmpeg.av_frame_unref(_pFrame); int error; do            { try                { do                    { error = ffmpeg.av_read_frame(_pFormatContext, _pPacket); if (error == ffmpeg.AVERROR_EOF)                        { frame = *_pFrame; return false;                        } error.ThrowExceptionIfError();                    } while (_pPacket->stream_index != _streamIndex); ffmpeg.avcodec_send_packet(_pCodecContext, _pPacket).ThrowExceptionIfError();                } finally                { ffmpeg.av_packet_unref(_pPacket);                } error = ffmpeg.avcodec_receive_frame(_pCodecContext, _pFrame);            } while (error == ffmpeg.AVERROR(ffmpeg.EAGAIN)); error.ThrowExceptionIfError(); frame = *_pFrame; return true;        } public IReadOnlyDictionary<string, string> GetContextInfo()        { AVDictionaryEntry* tag = null; var result = new Dictionary<string, string>(); while ((tag = ffmpeg.av_dict_get(_pFormatContext->metadata, "", tag, ffmpeg.AV_DICT_IGNORE_SUFFIX)) != null)            { var key = Marshal.PtrToStringAnsi((IntPtr)tag->key); var value = Marshal.PtrToStringAnsi((IntPtr)tag->value); result.Add(key, value);            } return result;        }    }}
```

* 위 소스코드는 구글검색하다가 스택오버플로우 같은데서 구한 소스인데 그대로 쓰기로 한다..

사실 아직까진 위 소스들의 의미를 명확히 다 파악하진 못했다.

다음 포스팅에서 마무리하도록 하겠다.

PS. Visual Studio Code에 소스를 붙여넣기해서 복사했는데

오른쪽이 좀 짤리지만 복사해서 붙여넣기하면 괜찮다.
