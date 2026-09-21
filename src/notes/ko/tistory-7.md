---
title: "[MariaDB] 데이터 입력"
date: 2017-02-07
updated: 2017-12-11
summary: "데이터 입력"
tags: ["C#", "WPF", "MariaDB"]
key: tistory-7
---

```
string cmdStr = "INSERT INTO attitude (pitch, roll, heading)" + "VALUES('"+ attitude.Pitch + "', '"+ attitude.Roll + "', '"+ attitude.Yaw + "')" ;

cmd = new OdbcCommand(cmdStr, conn);

reader = cmd.ExecuteReader();
```
