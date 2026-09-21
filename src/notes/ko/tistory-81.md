---
title: "[Kotlin] 알아가기 - 5"
date: 2023-06-15
summary: "일단 아래 소스를 보자."
tags: ["Kotlin", "Android"]
key: tistory-81
---

## 1. Generics

일단 아래 소스를 보자.

list를 초기화 하고 초기 값을 할당하였다.

Finder라는 클래스를 만들고 findItem 메서드를 구현했다. (using Trailing Lambda)

findItem 메서드를 통해 사용자가 원하는 문자열을 찾는 간단한 기능의 예제이다.

```
fun main(){
    val listOfItems = listOf("Kotlin", "Java", "WPF")
    val finder = Finder(listOfItems)
    finder.findItem("WPF"){
        println("Found $it")	//Found WPF
    }
}

class Finder(private val list: List<String>){

    fun findItem(element: String, fountItem: (element: String?) -> Unit) {
        val itemFoundList = list.filter { it == element }

        if(itemFoundList.isNullOrEmpty()){
            fountItem(null)
        }else{
            fountItem(itemFoundList.first())
        }
    }
}
```

하지만 이 예제에서는 찾는 아이템이 String 타입이라는 제약이 있다.

이를 유연하게 바꿀수 있는 개념이 Generic이다.

```
fun main(){
    val listOfItems0 = listOf("Kotlin", "Java", "WPF")
    val listOfItems1 = listOf(23, 45, 19)

    val finder0 = Finder(listOfItems0)
    finder0.findItem("Kotlin"){
        println("Found0 $it")	//Found0 Kotlin
    }

    val finder1 = Finder(listOfItems1)
    finder1.findItem(19){
        println("Found1 $it")	//Found1 19
    }
}

class Finder<T>(private val list: List<T>){

    fun findItem(element: T, fountItem: (element: T?) -> Unit) {
        val itemFoundList = list.filter {
            it == element
        }

        if(itemFoundList.isNullOrEmpty()){
            fountItem(null)
        }else{
            fountItem(itemFoundList.first())
        }
    }
}
```

Generic을 사용하는 건 간단하다. 매개변수의 타입을 T로 치환해주면 된다.

아래 소스코드와 같이 데이터 타입 뿐만 아니라 클래스, 인터페이스등 다양한 유형을 넘길 수 있다.

```
fun main(){
    val person = Person("Ko", 5)
    val person1 = Person("Tl", 4)
    val person2 = Person("In", 15)

    val people = listOf(person, person1, person2)

    val finder = Finder(people)
    finder.findItem(person2){
        println("Found $it")	//Found Person(name=In, age=15)
    }
}

class Finder<T>(private val list: List<T>){

    fun findItem(element: T, fountItem: (element: T?) -> Unit) {
        val itemFoundList = list.filter {
            it == element
        }

        if(itemFoundList.isNullOrEmpty()){
            fountItem(null)
        }else{
            fountItem(itemFoundList.first())
        }
    }
}

data class Person(val name: String, val age: Int) {
}
```

## 2. Enums

Enum은 열거형 클래스로 보통은 변하지 않는 키 값을 이름을 붙여서 가독성을 높이기 위해 사용한다.

아래 소스코드는 Repository 오브젝트에서 loadState를 변화시켜 현재 loadState 값을 출력하는 예제이다.

여기서 Object는 싱글톤과 비슷한 개념이며 객체가 한 번만 생성되도록 한다.

```
fun main(){
    Repository.startFetch()
    getResult(Repository.getCurrentState())	//Loading

    Repository.error()
    getResult(Repository.getCurrentState())	//Error

    Repository.finishedFetch()
    getResult(Repository.getCurrentState())	//Success!
}

fun getResult(result: Result){
    return when(result){
        Result.SUCCESS -> println("Success!")
        Result.WARNING -> println("Warning")
        Result.ERROR -> println("Error")
        Result.IDLE -> println("Idle")
        Result.LOADING -> println("Loading")
    }
}

object Repository{
    private var loadState: Result = Result.IDLE
    private var dataFetched: String? = null

    fun startFetch(){
        loadState = Result.LOADING
        dataFetched = "data"
    }
    fun finishedFetch(){
        loadState = Result.SUCCESS
        dataFetched = null
    }
    fun error(){
        loadState = Result.ERROR
    }
    fun getCurrentState() : Result {
        return loadState
    }
}

enum class Result{
    SUCCESS,
    WARNING,
    ERROR,
    IDLE,
    LOADING
}
```

enum의 한계는 한가지 형식만 전달할 수 있다는 것이다. 여기서는 SUCCESS 라면 0을 전달할 것이고,

LOADING 이라면 4를 전달할 것이다. 즉 현재 상태가 SUCCESS일 때 우리가 필요한 데이터를 함께 전달할 수 없다.

이 한계를 해결하기 위한 하나의 방법이 abstract 클래스를 활용하는 것이다.

abstact 클래스는 프로토콜과 규칙에 맞는 특정 개체를 생성하는데 사용된다.

여기서 Result라는 abstract 클래스를 생성하였고, Success, Error, Loading, NotLoadng

클래스는 모두 Result 클래스를 상속받는다.

그리고 이제 Success와 Error 클래스는 상태 메시지를 받아 전달할 수 있게 되었다.

```
fun main(){
    Repository.startFetch()
    getResult(Repository.getCurrentState())	//Loading

    Repository.error()
    getResult(Repository.getCurrentState())	//java.lang.Exception

    Repository.finishedFetch()
    getResult(Repository.getCurrentState())	//data
}

fun getResult(result: Result){
    return when(result){
        is NotLoading -> println("Idle")
        is Loading -> println("Loading")
        is Success -> println(result.dataFetched)
        is Error -> println(result.exception.toString())
        else -> println("None")
    }
}

object Repository{
    private var loadState: Result = NotLoading
    private var dataFetched: String? = null

    fun startFetch(){
        loadState = Loading
        dataFetched = "data"
    }
    fun finishedFetch(){
        loadState = Success(dataFetched)
        dataFetched = null
    }
    fun error(){
        loadState = Error(Exception())
    }
    fun getCurrentState() : Result {
        return loadState
    }
}

abstract  class Result

data class Success(val dataFetched: String?) : Result()
data class Error(val exception: Exception) : Result()
object NotLoading : Result()
object Loading : Result()
```

하지만 이 방법에도 하나의 결함이 존재한다.

바로 when 구문에서이다. absract 클래스는 하위 자식 클래스들의 종류를 알지 못한다.

즉 각 상태를 모두 체크하지 않아도 오류를 발생시키지 않는다는 것이다.

이는 개발을 하다보면 엄청난 오류를 잠재하고 있는 시한폭탄 코드가 되어 버린다.

모든 상태를 체크하지 않고도 에러를 발생시키지 않기 때문에 디버깅도 어려워질 것이다.

```
fun getResult(result: Result){
    return when(result){
        is NotLoading -> println("Idle")
        is Loading -> println("Loading")
        else -> println("None")
    }
}
```

## 3. Sealed Class

간단한 방법은 abstract 클래스를 sealed 클래스로 변경하는 것이다.

sealed 클래스는 abstract 클래스로 상속받는 자식 클래스의 종류를 컴파일러가 알게 할 수 있다.

아래 소스코드를 보면 else문이 없기 때문에 Result를 상속하는 모든 케이스의

상태 체크를 하지 않는다면 에러를 발생시킨다.

```
sealed class Result

data class Success(val dataFetched: String?) : Result()
data class Error(val exception: Exception) : Result()
object NotLoading : Result()
object Loading : Result()

fun getResult(result: Result){
    return when(result){		//에러
        is NotLoading -> println("Idle")
        is Loading -> println("Loading")
        is Error -> println(result.exception.toString())
    }
}
```

sealed 클래스는 아래와 같이 사용할 수도 있다.

```
fun main(){
    Repository.startFetch()
    getResult(Repository.getCurrentState())

    Repository.error()
    getResult(Repository.getCurrentState())

    Repository.finishedFetch()
    getResult(Repository.getCurrentState())

    Repository.customFailure()
    getResult(Repository.getCurrentState())

    Repository.anotherCustomFailure()
    getResult(Repository.getCurrentState())
}

fun getResult(result: Result){
    return when(result){
        is NotLoading -> println("Idle")
        is Loading -> println("Loading")
        is Success -> println(result.dataFetched)
        is Error -> println(result.exception.toString())

        is Failure.CustomFailure -> println(result.customFailure)
        is Failure.AnotherCustomFailure -> println(result.anotherCustomFailure)
    }
}

object Repository{
    private var loadState: Result = NotLoading
    private var dataFetched: String? = null

    fun startFetch(){
        loadState = Loading
        dataFetched = "data"
    }
    fun finishedFetch(){
        loadState = Success(dataFetched)
        dataFetched = null
    }
    fun error(){
        loadState = Error(Exception())
    }
    fun getCurrentState() : Result {
        return loadState
    }
    fun customFailure() {
        loadState = Failure.CustomFailure(IOException())
    }
    fun anotherCustomFailure() {
        loadState = Failure.AnotherCustomFailure(NullPointerException())
    }
}

sealed class Result

data class Success(val dataFetched: String?) : Result()
data class Error(val exception: Exception) : Result()
object NotLoading : Result()
object Loading : Result()

sealed class Failure : Result() {
    data class CustomFailure(val customFailure: IOException) : Failure()
    data class AnotherCustomFailure(val anotherCustomFailure: NullPointerException) : Failure()
}
```
