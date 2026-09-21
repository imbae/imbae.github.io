---
title: "[Kotlin] 알아가기 - 1"
date: 2023-06-14
summary: "var는 variable의 약자로 값의 읽기, 쓰기가 허용"
tags: ["Kotlin", "Android"]
key: tistory-77
---

## 1. 변수 var, val

var는 variable의 약자로 값의 읽기, 쓰기가 허용

val는 value의 약자로 값의 읽기만 허용

```
fun main(){
    var name = "Kotlin"
    val myName = "Ko"

    println("Hello $name")
    println("Hello $myName")

    name = "Changed Name"
    myName = "Changed Name"
}
```

위 코드에서 name은 variable로 선언되어 있고, myName은 value로 선언되어 있다.

value로 선언된 myName 변수는 초기화때 말곤 값의 변경이 불가하기 때문에

myName = "Changed Name" 라인은 오류를 발생시킨다.

## 2. 명시적 타입 선언

컴파일러에게 이 변수는 어떤 타입이다 라고 명시해준다.

컴파일러가 똑똑해서 굳이 이렇게 명시하지 않아도 뒤에 초기화되는 값을 보고

추론이 가능하지만 개체를 인스턴스화 할 때 더 명확해진다.

```
fun main(){
    val name: String = "Kotlin"
    val age: Int = 5

    println("Hello $name")
    println("$age")
}
```

## 3. 조건문 if, when

코틀린에서는 조건문의 생김새가 C언어 계열과 조금 다르다.

```
val amount = 1500

    if (amount > 1000){
        println("greater than $1000")
    }
    else{
        println("less than $1000")
    }
```

if문은 기존 알고 있던 형식과 같지만 switch문 비슷한게 있는데 바로 when이다.

```
when(amount){
        100 -> println("$100")
        500 -> println("$500")
        1000 -> println("$1000")
        else -> {
            println("else")
        }
    }
```

아래처럼 범위 또는 여러개의 조건문을 설정할 수도 있다.

```
when(amount){
        0, 100 -> println("0 or 100")
        in 1..50 -> println("amount = 1 to 50")
        else -> {
            println("else")
        }
    }
```

## 4.반복문 for

반복문은 다른 언어와 같이 사용법이 거의 동일하다.

for문 뿐만 아니라 while, do-while도 동일하게 사용할 수 있다.

```
for(i in 1..100){
        println(i)
    }
```
