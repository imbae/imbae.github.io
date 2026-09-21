---
title: "[Kotlin] 알아가기 - 3 (Collections)"
date: 2023-06-14
updated: 2023-06-15
summary: "코틀린에서 Collections는 3가지 종류가 있다."
tags: ["Kotlin", "Android"]
key: tistory-79
---

코틀린에서 Collections는 3가지 종류가 있다.

1. list

2. set

3. map

여기서도 읽기/쓰기가 가능한지(mutable), 읽기만 가능한지(immutable)에 따라 선언방식이 다르다.

## 1. List

리스트는 배열과 같은 기능을 가진다.

listOf로 초기화하면 읽기만 가능한 리스트가 생성이 되고,

mutableListOf로 선언한 리스트는 add나 removeAt등의 함수를 이용해 값을 변경할 수 있다.

아래 소스코드는 리스트의 값 변경 및 다양한 출력 방법이다.

```
fun main(){
    val list = listOf("Kotlin", "Java", "C")		//읽기
    val mutableList = mutableListOf(1, 2, 3, 4)		//읽기, 쓰기
    //val mutableList = mutableListOf<Int>()
    
    mutableList.add(42)
    mutableList.removeAt(2)

    println(mutableList)

    for(item in mutableList){
        println(item)
    }

    mutableList.forEach {
        println(it)
    }

    println("Number of elements: ${mutableList.size}")	//4
    println("Second elements: ${mutableList[1]}")		//2
    println("Index of elements 42: ${mutableList.indexOf(42)}")	//3
}
```

## 2.Set

리스트와 거의 동일하지만 차이점은 중복된 값을 허용하지 않는다는 것이다.

```
fun main(){
    val mySet = setOf("Hello", "Kotlin")
    val myMutableSet = mutableSetOf(1,2,3,5)
    //val myMutableSet = mutableSetOf<Int>()
    
    myMutableSet.add(3)
    myMutableSet.add(35)
    
    println(myMutableSet)	// [1, 2, 3, 5, 35]
}
```

## 3.Map

맵은 key-value 쌍으로 이루어진 Collection이다.

Dictionary와 같이 key값은 중복될 수 없으며 value는 중복가능하다.

```
fun main(){
    val myMap = mapOf("Up" to 1, "Down" to 2)
    val myMutableMap = mutableMapOf("One" to 1, "Two" to 2, "Three" to 3)
    //val myMutableMap = mutableMapOf<String, Int>()

    myMutableMap["Four"] = 4
    println(myMutableMap)	//{One=1, Two=2, Three=3, Four=4}

    if("Up" in myMap) println("Yes is in")	//Yes is in
    if(4 in myMutableMap.values) println("Yes is in")	//Yes is in
}
```

## 4. Empty Collections

코틀린에서는 비어있는 콜렉션으로 초기화 할 수도 있다.

말그대로 아무것도 없는 빈 Immutable collection이다.

이놈들의 활용에 대해선 추후 다시 알아보고 지금은 이런게 있다라는 것만 알아놓자.

```
val emptyList = emptyList<String>()
val emptySet = emptySet<Int>()
val emptyMap = emptyMap<String, Int>()
```

## 5. Filter

콜렉션 항목들 중 원하는 것만 얻고 싶을때 filter를 활용할 수 있다.

```
fun main(){
    val list = listOf("Kotlin", "Java", "C")

    val found0 = list.filter {
        it.length >= 3
    }
    println(found0)	//[Kotlin, Java]

    val found1 = list.filter {
        it.startsWith("k")
    }
    println(found1)	//[]

    val found2 = list.filter {
        it == "C"
    }
    println(found2)	//[C]

    val found3 = list.filter {
        it.startsWith("k", ignoreCase = true) && it.endsWith("n")
    }
    println(found3)	//[Kotlin]
}
```

이외에 코틀린 콜렉션에 대해 잘 설명해둔 사이트가 있어서 소개한다.

[Kotlin Collection Functions Cheat Sheet](https://medium.com/mobile-app-development-publication/kotlin-collection-functions-cheat-sheet-975371a96c4b)

[Kotlin Collection Functions Cheat Sheet
Enable learning and finding relevant collection function easier
medium.com](https://medium.com/mobile-app-development-publication/kotlin-collection-functions-cheat-sheet-975371a96c4b)
