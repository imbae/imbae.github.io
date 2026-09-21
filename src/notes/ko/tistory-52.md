---
title: "Floating Point (C++ Source Example)"
date: 2018-09-10
summary: "float, double에 관한 소스코드 몇 가지를 정리한다."
tags: ["C/C++"]
key: tistory-52
---

float, double에 관한 소스코드 몇 가지를 정리한다.

```
#include <stdio.h>
#include <tchar.h>
#include <stdlib.h>
#include <string.h>
#include <iostream>
#include <iomanip>
#include <cmath>

using namespace std;

int main()
{
    cout << numeric_limits<float>::max() << endl;
    cout << numeric_limits<double>::min() << endl;
    cout << numeric_limits<long double>::lowest() << endl;

 return 0;
}
```

각 자료형의 최대 표현 가능한 범위, 최소 표현 가능한 범위(절대 값), 음수의 최소 표현 가능한 범위를 확인 할 수 있다.

**Output**

![](/assets/images/notes/52/1.png)

```
int main()
{
    double zero = 0.0;
    double pos = 5.0 / zero;
    double neg = -5.0 / zero;
    double nan = zero / zero;

    cout << pos << " " << std::isinf(pos) << endl;
    cout << neg << " " << std::isinf(neg) << endl;
    cout << nan << " " << std::isnan(nan) << endl;
    cout << 1.0 << " " << std::isnan(1.0) << endl;

 return 0;
}
```

계산한 값이 무한 값인지, Not a Number 인지 판별하여 true(1), flase(0)로 반환한다.

**Output**

![](/assets/images/notes/52/2.png)

```
int main()
{
    double d1 = 1.0;
    double d2 = 0.1 + 0.1 + 0.1 + 0.1 + 0.1 + 0.1 + 0.1 + 0.1 + 0.1 + 0.1;

    cout << std::setprecision(20);
    cout << d1 << endl;
    cout << d2 << endl;

 return 0;
}
```

앞서 얘기했던 부동소수점 계산 오차를 보여준다.

여기서  setprecesion은 설정한 자릿수까지 출력하라는 의미다.

**Output**

![](/assets/images/notes/52/3.png)
