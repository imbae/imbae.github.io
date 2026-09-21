---
title: "[C#/WPF] FFmpeg로 USB Camera(WebCam) Display 하기 - 3"
date: 2019-02-14
summary: "웹캠을 디스플레이하기 위해 UI에 Play 버튼과 Image 컨트롤을 추가한다."
tags: ["C#", "WPF"]
key: tistory-63
---

웹캠을 디스플레이하기 위해 UI에 Play 버튼과 Image 컨트롤을 추가한다.

Image 컨트롤의 이름은 image로 설정하고 (x:Name="image")

Button 컨트롤의 이름은 Play_Button으로 설정하고(x:Name="Play_Button") 클릭 이벤트를 추가한다.

그리고 종료 시 thread종료를 위해 MianWindow Closing 이벤트를 추가한다.

![](/assets/images/notes/63/1.png)

**프로젝트 참조에 System.Drawing 을 추가**하고

MainWindow 코드비하인드에 아래 소스를 추가한다.

**MianWindow.xaml.cs**

```
using System;using System.Linq;using System.Runtime.InteropServices;using System.Threading;using System.Windows;using System.Windows.Media.Imaging;using System.Windows.Threading;using FFmpeg.AutoGen;using FFmpeg_usbCam.FFmpeg.Decoder;using System.Drawing;using System.IO;using FFmpeg_usbCam.FFmpeg;namespace FFmpeg_usbCam{ /// <summary> /// MainWindow.xaml에 대한 상호 작용 논리 /// </summary> public partial class MainWindow : Window    { Thread thread; ThreadStart ts; Dispatcher dispatcher = Application.Current.Dispatcher; private bool activeThread;      //thread 활성화 유무 public MainWindow()        { InitializeComponent(); //비디오 프레임 디코딩 thread 생성 ts = new ThreadStart(DecodeAllFramesToImages); thread = new Thread(ts); //FFmpeg dll 파일 참조 경로 설정 FFmpegBinariesHelper.RegisterFFmpegBinaries(); activeThread = true;        } private void Play_Button_Click(object sender, RoutedEventArgs e)        { //thread 시작  if (thread.ThreadState == ThreadState.Unstarted)            { thread.Start();            }        } private unsafe void DecodeAllFramesToImages()        { //video="웹캠 디바이스 이름" string device = "video=AVerMedia GC550 Video Capture"; using (var vsd = new VideoStreamDecoder(device))            { //Console.WriteLine($"codec name: {vsd.CodecName}"); var info = vsd.GetContextInfo(); info.ToList().ForEach(x => Console.WriteLine($"{x.Key} = {x.Value}")); var sourceSize = vsd.FrameSize; var sourcePixelFormat = vsd.PixelFormat; var destinationSize = sourceSize; var destinationPixelFormat = AVPixelFormat.AV_PIX_FMT_BGR24; using (var vfc = new VideoFrameConverter(sourceSize, sourcePixelFormat, destinationSize, destinationPixelFormat))                { var frameNumber = 0; while (vsd.TryDecodeNextFrame(out var frame) && activeThread)                    { var convertedFrame = vfc.Convert(frame); Bitmap bitmap; bitmap = new Bitmap(convertedFrame.width, convertedFrame.height, convertedFrame.linesize[0], System.Drawing.Imaging.PixelFormat.Format24bppRgb, (IntPtr)convertedFrame.data[0]); BitmapToImageSource(bitmap); frameNumber++;                    }                }            }        } void BitmapToImageSource(Bitmap bitmap)        { //UI thread에 접근하기 위해 dispatcher 사용 dispatcher.BeginInvoke((Action)(() =>            { using (MemoryStream memory = new MemoryStream())                { if (thread.IsAlive)                    { bitmap.Save(memory, System.Drawing.Imaging.ImageFormat.Bmp); memory.Position = 0; BitmapImage bitmapimage = new BitmapImage(); bitmapimage.BeginInit(); bitmapimage.CacheOption = BitmapCacheOption.OnLoad; //bitmapimage.CreateOptions = BitmapCreateOptions.IgnoreImageCache; bitmapimage.StreamSource = memory; bitmapimage.EndInit(); image.Source = bitmapimage;     //image 컨트롤에 웹캠 이미지 표시                    }                }            }));        } private void Window_Closing(object sender, System.ComponentModel.CancelEventArgs e)        { if (thread.IsAlive)            { activeThread = false; thread.Join();            }        }    }}
```

그리고 프로젝트 속성 -> 빌드 항목에서

안전하지 않은 코드 허용에 체크해준다.

![](/assets/images/notes/63/2.png)

이제 실행시켜보자

![](/assets/images/notes/63/3.png)

잘 재생된다. 이번 포스팅에서는 웹캠을 사용한게 아니라 비디오 캡처 장비를 통해

노트북에서 전송되는 영상을 그대로 출력한 것이다.

웹캠도 PC와 연결하면 비디오 장치로 인식하기 때문에 위 소스에서

video="웹캠 디바이스 이름"

이 부분만 사용 중인 웹캡 디바이스의 이름을 정확히 적어주면 문제없이 출력될 거다.

만약 IO Directory를 찾을 수 없습니다. 라는 에러메시지가 출력된다면

웹캠 디바이스 이름이 올바르지 않을 수도 있다.

아래는 전체 프로젝트 압축 파일이다.

Plugins 폴더에 FFmpeg dll 파일 8개만 붙여넣기하고 실행하면 된다.

[![](/assets/images/notes/63/4.gif)FFmpeg usbCam.zip](https://t1.daumcdn.net/cfile/tistory/999A534B5C64FFF918)

PS. 본 포스팅 예제소스는 기능 수행에만 초첨을 뒀기 때문에 원활한 성능을 기대하기는 힘들것입니다.

오류가 있거나 좀 더 나은 방법이 있다면 피드백 바랍니다.
