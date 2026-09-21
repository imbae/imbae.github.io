---
title: "데이터형에 관계없는 swap() 함수"
date: 2017-12-11
summary: "데이터형에 관계없는 swap() 함수"
tags: ["C/C++"]
key: tistory-37
---

memcpy(a, b, c);

a : 복사될 메모리 주소

b : 복사할 메모리 주소

c : 복사할 크기

#include<stdio.h>

#include<stdlib.h> //malloc(), free()

#include<memory.h> //memcpy()

void swap(void *a, void *b, int n)

{

void *t;

t = malloc(n); //임시 영역 t에 n만큼의 공간을 확보

memcpy(t, a, n); //t = a

memcpy(a, b, n); //a = b

memcpy(b, t, n); //b = t

free(t); //t에 할당된 메모리를 해제

}

void main(void)

{

char c1 = 'A', c2 = 'B'

int i1 = 100, i2 = 200;

float f1 = 3.14, f2 = 2.71;

printf("\nBefor : %c, %c", c1,c2);

swap(&c1, &c2, sizeof(char));

printf("\nAfter : %c, %c", c1,c2);

printf("\nBefor : %d, %d", i1,i2);

swap(&i1, &i2, sizeof(int));

printf("\nAfter : %d, %d", i1,i2);

printf("\nBefor : %f, %f", f1,f2);

swap(&f1, &f2, sizeof(float));

printf("\nAfter : %f, %f", f1,f2);

}
