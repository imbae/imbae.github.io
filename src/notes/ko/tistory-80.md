---
title: "[Kotlin] 알아가기 - 4 (OOP)"
date: 2023-06-15
summary: "코틀린은 객체지향프로그래밍언어이다."
tags: ["Kotlin", "Android"]
key: tistory-80
---

## 1. Object Oriented Programming

코틀린은 객체지향프로그래밍언어이다.

일반적으로 명사가 객체가 되고 동사가 객체 내부에서 메서드가 된다.

예를들어 '자동차가 시속 100km/h로 주행중이다' 라는 문구에서

자동차는 객체이고 시속 100km/h는 멤버변수, 주행중은 메서드로 구성할 수 있다.

```
fun main(){
    val car = Car("Green", "Model3")
    val secondCar = Car("Black", "ModelX")

    println("Car color: ${car.color}, model: ${car.model}")
    println("Second car color: ${secondCar.color}, model: ${secondCar.model}")

    car.speed(30, 200)
    secondCar.drive()
}

class Car (var color: String, var model: String){
    init{
        if(color == "Green"){
            println("Color is green")
        }
        else{
            println("$color is not green")
        }
    }

    fun speed(minSpeed: Int, maxSpeed: Int){
        println("Min speed: $minSpeed, Max speed: $maxSpeed")
    }
    fun drive(){
        println("Boooooong")
    }
}

//Color is green
//Black is not green
//Car color: Green, model: Model3
//Second car color: Black, model: ModelX
//Min speed: 30, Max speed: 200
//Boooooong
```

## 2. Inheritance & Override

상속과 오버라이드 개념은 다른 객체지향언어에서도 공통적으로 사용되는 개념이다.

여기서 Truck 클래스는 Car클래스를 상속받았다.

main()에서 truck 객체를 생성하고 speed() 메소드를 호출하면

super.speed()를 통해 부모의 speed()를 먼저 호출하고 자기 기능을 수행한다.

반대로 super가 없는 drive()의 경우 부모의 drive()는 무시하고 자신의 기능만 수행한다.

```
fun main(){
    val car = Car("Green", "ModelS")

    car.speed(30, 200)	//Min speed: 30, Max speed: 200
    car.drive()	//Boooooong

    val truck = Truck("White", "Bongo")
    truck.speed(30, 80)	//Min speed: 30, Max speed: 80
    			//Truck speed limited
    truck.drive()	//Truckkkkkkk
}

class Truck(color: String, model: String): Car(color, model) {

    override fun speed(minSpeed: Int, maxSpeed: Int) {
        super.speed(minSpeed, maxSpeed)

        println("Truck speed limited")
    }
    override fun drive(){
        println("Truckkkkkkk")
    }
}

open class Car (var color: String, var model: String){

    open fun speed(minSpeed: Int, maxSpeed: Int){
        println("Min speed: $minSpeed, Max speed: $maxSpeed")
    }
    open fun drive(){
        println("Boooooong")
    }
}
```

## 3. Interface

인터페이스는 클래스의 상속관계에 상관없이 클래스가 구현해야하는 메소드를 지정할 수 있다.

아래 예제에서 ClickEvent 인터페이스내 onClick 메소드는 몸통이 없다. 이는 클래스 레벨에서 구현될 것이기 때문이다.

따라서 어떠한 클래스라도 ClickEvent 인터페이스를 상속받았다면 onClick 메소드를 구현할 수 있게 된다.

이는 많은 유연성을 만들어준다. 버튼만 클릭을 구현할 수 있는게 아니라

아이콘, 텍스트박스같은 다른 컨트롤들도 클릭 이벤트를 구현할 수 있게 되기 때문이다.

```
fun main(){
    val button = CustomButton("Custom Button")
    button.onClick("Raised click event")	//Clicked by Custom Button, message: Raised click event
}

interface ClickEvent{
    fun onClick(message: String){
    }
}

class CustomButton(val label:String) : ClickEvent {
    override fun onClick(message: String) {
        println("Clicked by $label, message: $message")
    }
}
```

## 4. 확장 기능

함수 확장 기능을 활용하면 기존 라이브러리가 제공하는 것 이상을 구현할 수 있다.

```
fun main(){
    println("Hello Kotlin".append(" & Android"))	//Hello Kotlin & Android
    println("Hello Android".append2(" & Kotlin"))	//Hello Android & Kotlin
}

fun String.append(toAppend: String) : String {
    return this.plus(toAppend)
}

fun String.append2(toAppend: String) : String = this.plus(toAppend)
```

## 5. Data Class

데이터 클래스는 말 그대로 데이터를 보관하는 것이 주 목적인 클래스이다.

그래서 상속할 수 없고 기본 생성자 매개변수가 1개 이상 있어야 한다.

```
fun main(){
    val person = Person("Ko", 5)
    val person1 = Person("Tl", 4)
    val person2 = Person("In", 15)

    val people = listOf(person, person1, person2)

    people.forEach { person ->
        println(person.age)	//5, 4, 15
    }
}

data class Person(val name: String, val age: Int) {
}
```
