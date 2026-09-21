---
title: "[Kotlin] 알아가기 - 2 (fun, Lambda)"
date: 2023-06-14
summary: "코틀린에서 함수 선언은 fun으로 시작한다."
tags: ["Kotlin", "Android"]
key: tistory-78
---

## 1. 코틀린 함수

코틀린에서 함수 선언은 fun으로 시작한다.

calculate 함수의 파라미터 fitst와 second는 매개변수이름이고 Int형으로 받는다는 의미이다.

```
fun main(){
    calculate(1, 10)
}

fun calculate(first: Int, second: Int){
    var sum = 0
    for(i in first..second){
        sum += i
    }
    println(sum)
}
```

다음과 같이 default argument로 설정할 수도 있다.

```
fun main(){
    calculate(1, 10, "Calculate", 5)
}

fun calculate(first: Int = 1, second: Int = 1000, message: String, multipleOf: Int){
    for(i in first..second){
        if(i % multipleOf == 0){
            println("$i $message $multipleOf")
        }
    }
}
```

여기서 default argument 로 선언된 first와 second는 생략할 수 있는데,

이 때 명시적으로 변수의 이름과 값을 통해 전달해줘야 한다.

```
fun main(){
    calculate(message = "Calculate", multipleOf = 5)
}

fun calculate(first: Int = 1, second: Int = 1000, message: String, multipleOf: Int){
    for(i in first..second){
        if(i % multipleOf == 0){
            println("$i $message $multipleOf")
        }
    }
}
```

함수 리턴은 아래와 같이 구현할 수 있다.

```
fun main(){
    println("Value is " + calculate(multipleOf = 5))
}

fun calculate(first: Int = 1, second: Int = 10, multipleOf: Int) : Int{
    var sum = 0
    for(i in first..second){
        if(i % multipleOf == 0){
            sum += i
        }
    }
    return sum
}
```

```
fun main(){
    println("Dog age is " + getDogAge(5))
}

fun getDogAge(age: Int) : Int = age * 7
```

## 2. 람다 표현식

람다는 함수를 더 짧게 표현하는 하나의 방법이다.

아래 두 표현식은 같은 기능을 수행한다. 람다는 이름이 없는 함수라고 생각하면 될 것 같다.

```
fun add(a: Int, b:Int): Int{
    return a+b
}

val sum: (Int, Int) -> Int = {
    a, b -> a + b
}
```

![](/assets/images/notes/78/1.png)

매개변수가 하나인 경우에는 다음과 같이 단순화할 수 있다.

it 키워드는 매개변수가 하나이고 이름을 정의하지 않았을때 디폴트로 적용되는 이름이다.

```
val dogAge: (Int) -> Int = { age ->
    age * 7
}

val dogAge: (Int) -> Int = {
    it * 7
}
```

람다 표현식은 아래와 같이 작성할 수도 있다.

아무것도 반환하지 않는다는 의미의 Unit을 활용한 람다식이다. (Unit = Void)

```
fun main(){
    name("Kotlin")
    showName("Kotlin")
}

val name: (String) -> Unit = {
    name -> println(name)
}

fun showName(name: String){
    println(name)
}
```

람다식과 showName함수는 같은 결과를 보여준다.

name 람다식은 당연히 매개변수가 하나이기 때문에 it으로 바꿔서 표현할 수도 있다.

```
val name: (String) -> Unit = {
    println(it)
}
```

## 3. Trailing Lambda

먼저 다음 표현식을 보자

```
fun main(){
    enhancedMessage("Hello Kotlin"){
        add(10,5)
    }
}

fun enhancedMessage(message: String, funAsParameter: () -> Int) {
    println("$message ${funAsParameter()}")
}

var add: (Int, Int) -> Int = {
    a, b -> a + b
}
```

함수의 파라미터 모양이 특이하다. message는 String 타입으로 받는건 알겠는데,

funAsParameter라는 함수가 람다로 표현되어 있으며 매개변수안에 있다.

그리고 main에서 "Hello Kotlin"이라는 문자열과 함께 괄호 안에 add 람다를 호출하는 모양이다.

코틀린에서는 함수의 마지막 매개 변수가 함수라면 해당 인수로 전달 되는 람다식을 괄호 밖에 넣을 수 있다.

그리고 만약 람다가 함수의 유일한 인수라면 괄호를 완전히 생략할 수 있다.

이런식으로 말이다.

```
fun main(){
    enhancedMessage { add(10,5) }
}

fun enhancedMessage(funAsParameter: () -> Int) {
    println("${funAsParameter()}")
}

var add: (Int, Int) -> Int = {
    a, b -> a + b
}
```

이렇게도 사용할 수 있다.

```
fun main(){
    enhancedMessage("Hello Kotlin"){
        print(it)
        add(10,5)
    }
}

fun enhancedMessage(message: String, funAsParameter: (String) -> Int) {
    println("$message ${funAsParameter("Hey ")}")
}

var add: (Int, Int) -> Int = {
    a, b -> a + b
}
```

실행하게 되면 Hey Hello Kotlin 15 라는 결과가 나오게 된다.

Trailing Lambda는 이후 공부할 Jetpack Compose에서 광범위하게 사용되는 중요한 개념이라고 한다.

아직은 이해하기 어렵지만  계속 보다보면 언젠가 이해할 수 있겠지...
