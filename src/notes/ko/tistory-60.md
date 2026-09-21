---
title: "Text to Speech(TTS) 사용 + 편법"
date: 2019-02-13
summary: "Text to Speech 는 단어나 문장을 기계어가 자동으로 읽어주는 것을 말한다."
tags: ["C#", "WPF"]
key: tistory-60
---

Text to Speech 는 단어나 문장을 기계어가 자동으로 읽어주는 것을 말한다.

윈도우 10버전에서는 단순히 참조 추가만으로 사용할 수 있고

그 이하 버전에서는 SDK를 따로 설치해줘야 할 것이다.

그럼 C#기준으로 윈도우 기본 목소리를 활용하여 텍스트를 읽어보자.

![](/assets/images/notes/60/1.png)

먼저 참조 추가에서 System.Speech를 추가해준다.

using System.Speech.Synthesis;

SpeechSynthesizer speechSynthesizer = new SpeechSynthesizer();

speechSynthesizer.SetOutputToDefaultAudioDevice();

speechSynthesizer.SelectVoice("Microsoft Heami Desktop");

speechSynthesizer.Speak("안녕하세요");

speechSynthesizer.Speak("Hello World");

위 소스는 윈도우 기본 목소리 중 하나인 Heami의 목소리다.

현재 윈도우 10 기준으로 기본 목소리가 4개 있는 것 같은데 한국어 지원은 Heami 하나이고

나머지는 모두 영어 음성이다.

음성을 변경하고 싶으면 아래 목소리 중 하나를 선택해서 소스코드에 추가하면 된다.

speechSynthesizer.SelectVoice("Microsoft David Desktop");

speechSynthesizer.SelectVoice("Microsoft Zira Desktop");

speechSynthesizer.SelectVoice("Microsoft Mark Desktop");

speechSynthesizer.SelectVoice("Microsoft Heami Desktop");

빌드하고 실행하면 입력한 문자열이 순차적으로 재생된다.

PS. 영어에 비해 한국어는 상당히 인위적인 기계목소리다... 조금 더 자연스러운 소리를 찾으려면

보이스웨어에서 TTS 엔진을 구입하는 방법이 있는데 비싸다고 한다. 몇 백만? 그것도 년단위로

음성 지원할 문자가 많지 않은 경우에는 그냥 무식하게

파파고 번역기에 해당 문자열 넣고 소리 재생하고 녹음한걸로

녹음파일 재상하는 방법으로 써도 괜찮지 않을까 한다.
