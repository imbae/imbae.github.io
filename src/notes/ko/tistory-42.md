---
title: "JPG Image 파일에 Geo Tagging 하기"
date: 2018-04-17
updated: 2023-03-21
summary: "Image에 GPS 정보를 추가하는 목적은 이미지 정합 시 위치 정확도를 더 높이기 위함이다."
tags: ["C#", "WPF"]
key: tistory-42
---

Image에 GPS 정보를 추가하는 목적은 이미지 정합 시 위치 정확도를 더 높이기 위함이다.

이것 외에도 다른 용도가 있을 수도 있지만 지금은 이 목적때문에 C#으로 해당 기능을 구현했다.

디지털 카메라로 촬영하면 기본적인 카메라 정보들이 이미지에 포함되어 저장된다.

![](/assets/images/notes/42/1.png)

이러한 정보들은 이미지 파일의 메타데이터에 저장되며 EXIF Properties 라고한다.

여기에 GPS 정보를 추가해야한다. 하지만 현재 .NET에서는 EXIF Property를 직접적으로 접근해서 값을 수정하는 기능은 지원하지 않는다.

때문에 각각의 property ID와 그에 따른 Type을 적절히 맞춰서 원하는 데이터를 저장해야 한다.

다음 표는 현재 추가하려는 GPS 정보의 EXIF Property 정보이다. (latitude, longitude)

| TAG (Hex) | IFD | KEY | TYPE |
|---|---|---|---|
| 0x0000 | GPSInfo | Byte | Exif.GPSInfo.GPSVersionID |
| 0x0001 | GPSInfo | Ascii | Exif.GPSInfo.GPSLatitudeRef |
| 0x0002 | GPSInfo | Rational | Exif.GPSInfo.GPSLatitude |
| 0x0003 | GPSInfo | Ascii | Exif.GPSInfo.GPSLongitudeRef |
| 0x0004 | GPSInfo | Rational | Exif.GPSInfo.GPSLongitude |

자세한 사항은 아래 사이트 참고

https://dejanstojanovic.net/aspnet/2014/november/adding-extra-info-to-an-image-file/

여기서 주의할 점은 위경도 좌표를 Degree 단위로 저장하지않고 도분초 단위로 변환하여 저장해야 한다는 것이다.

1) **Degrees**– Rational (8 bytes)  
2) **Minutes**– Rational (8 bytes)  
3) **Seconds**– Rational (8 bytes)

일반적으로 위경도는 Double형(8 byte)인데, 도분초로 변환하여 각각 8 byte로 할당하여 값을 저장해야 한다.

예를들어 좌표가 35.4612574라면

Deg: 35 (8 byte)Min: 27 (8 byte) = (0.4612574 * 60) = 27.675444Sec: 40.5 (8 byte) = (0.675444 * 60) = 40.52664  
가 된다.

변환된 도분초 값을 아래와 같은 형식으로 변환하여 값을 EXIF Property에 저장하면 된다.

![](/assets/images/notes/42/2.png)

- Source Code (C#)

```
private void WriteCoordinatesToImage(string Filename, double dLat, double dLon)
{
    using (MemoryStream read_ms = new MemoryStream(File.ReadAllBytes(Filename)))
    {
        File.Delete(Filename);
        using (Image Pic = Image.FromStream(read_ms))
        {
            // These constants come from the CIPA DC-008 standard for EXIF 2.3
            const short ExifTypeByte = 1;
            const short ExifTypeAscii = 2;
            const short ExifTypeRational = 5;

            const int ExifTagGPSVersionID = 0x0000;
            const int ExifTagGPSLatitudeRef = 0x0001;
            const int ExifTagGPSLatitude = 0x0002;
            const int ExifTagGPSLongitudeRef = 0x0003;
            const int ExifTagGPSLongitude = 0x0004;

            char latHemisphere = 'N';
            
            if (dLat < 0)
            {
            	latHemisphere = 'S';
                dLat = -dLat;
            }
            
            char lngHemisphere = 'E';
            
            if (dLon < 0)
            {
            	lngHemisphere = 'W';
                dLon = -dLon;
            }
            
            MemoryStream ms = new MemoryStream();
            Pic.Save(ms, ImageFormat.Jpeg);
            ms.Seek(0, SeekOrigin.Begin);

            Image img = Image.FromStream(ms);
            AddProperty(img, ExifTagGPSVersionID, ExifTypeByte, new byte[] { 2, 3, 0, 0 });
            AddProperty(img, ExifTagGPSLatitudeRef, ExifTypeAscii, new byte[] { (byte)latHemisphere, 0 });
            AddProperty(img, ExifTagGPSLatitude, ExifTypeRational, ConvertToRationalTriplet(dLat));
            AddProperty(img, ExifTagGPSLongitudeRef, ExifTypeAscii, new byte[] { (byte)lngHemisphere, 0 });
            AddProperty(img, ExifTagGPSLongitude, ExifTypeRational, ConvertToRationalTriplet(dLon));

            img.Save(Filename);
        }
    }
}​
```

```
private byte[] ConvertToRationalTriplet(double value)
{
    int degrees = (int)Math.Floor(value);
    value = (value - degrees) * 60;
    int minutes = (int)Math.Floor(value);
    value = (value - minutes) * 60 * 100;
    int seconds = (int)Math.Round(value);

    // Degrees, minutes, and seconds, each with a numerator and a denominator, each composed of 4 bytes
    byte[] bytes = new byte[3 * 2 * 4]; 

    int i = 0;
    Array.Copy(BitConverter.GetBytes(degrees), 0, bytes, i, 4); i += 4;
    Array.Copy(BitConverter.GetBytes(1), 0, bytes, i, 4); i += 4;
    Array.Copy(BitConverter.GetBytes(minutes), 0, bytes, i, 4); i += 4;
    Array.Copy(BitConverter.GetBytes(1), 0, bytes, i, 4); i += 4;
    Array.Copy(BitConverter.GetBytes(seconds), 0, bytes, i, 4); i += 4;
    Array.Copy(BitConverter.GetBytes(100), 0, bytes, i, 4);

    return bytes;
}

private void AddProperty(Image img, int id, short type, byte[] value)
{
    PropertyItem pi = img.PropertyItems[0];
    pi.Id = id;
    pi.Type = type;
    pi.Len = value.Length;
    pi.Value = value;
    img.SetPropertyItem(pi);
}
```

변환이 완료 되면 아래와 같이 이미지 정보에 GPS 정보가 삽입된다.

![](/assets/images/notes/42/3.png)
