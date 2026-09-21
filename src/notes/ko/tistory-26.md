---
title: "[Ubuntu] add-apt-repository command not found"
date: 2017-12-11
updated: 2023-02-27
summary: "add-apt-repository command not found"
tags: ["삽질", "Ubuntu"]
key: tistory-26
---

```
$ sudo apt-get install python-software-properties

$ sudo apt-get install apt-file

$ apt-file update

$ apt-file search add-apt-repository

As you can see add-apt-repository is in software-properties-common:

software-properties-common: /usr/bin/add-apt-repository software-properties-common: /usr/share/man/man1/add-apt-repository.1.gz

After installing software-properties-common I was able to use add-apt-repository without any further issue:

$ sudo apt-get install software-properties-common

ref. https://pricklytech.wordpress.com/2014/05/16/ubuntu-server-14-4-trusty-add-apt-repository-command-not-found/
```

[![](/assets/images/notes/26/1.png)](https://pricklytech.wordpress.com/2014/05/16/ubuntu-server-14-4-trusty-add-apt-repository-command-not-found/)

[Ubuntu Server 14.4 (Trusty Tahr) – add-apt-repository: command not found
The last time I encountered the add-apt-repository: command not found error I was using Ubuntu Server 12.4 Lucid. The solution the...
pricklytech.wordpress.com](https://pricklytech.wordpress.com/2014/05/16/ubuntu-server-14-4-trusty-add-apt-repository-command-not-found/)
