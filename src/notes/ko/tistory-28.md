---
title: "[Qt] openssl-1.0.1f on Ubuntu 14.04 x64 with SSLv2 enabled"
date: 2017-12-11
summary: "openssl-1.0.1f on Ubuntu 14.04 x64 with SSLv2 enabled"
tags: ["삽질", "Qt"]
key: tistory-28
---

**Pre-requisits Packages**

|  | `$ sudo apt-get install libssl-dev devscripts dpkg-dev cdbs debhelper dh-autoreconf libev-dev libpcre3-dev pkg-config -y` |
|---|---|

**OpenSSL openssl-1.0.1f Patching**

Now openssl in ubunutu is compiled without sslv2 because it’s insecure (don’t install openssl like this on a production server), but some security tools use openssl to do cipher checks such as SSLSCAN which needs it enabled in order to check for the insecure ssl version. In order to enable sslv2 the package needs to be needs to be re-configued without the nossl flag. First let’s grab the source.

> $ apt-get 
> source
>  
> openssl

Now you have a load of files in your directory, your going to want to cd to the openssl-1.0.1f directory have contains the source code and compile script.  
Next we need to edit the file in debain/rules. Remove the “no-ssl2” so it looks like the line commented below.

> $ 
> cd
>  
> openssl-1.0.1f
> $ nano debian
> /rules

> #CONFARGS  = --prefix=/usr --openssldir=/usr/lib/ssl --libdir=lib/$(DEB_HOST_MULTIARCH) no-idea no-mdc2 no-rc5 no-zlib  enable-tlsext $(ARCH_CONFARGS)

Next we will add a comment and commit the change. Then re-build the package, this is going to take some time so skip down to the nmap part and download the source.  
You might get some error says copyright was unable to be verified, ignore it.

> $ 
> dch –n 
> 'Allow SSLv2'
> $ dpkg-
> source
>  
> --commit
> $ debuild -uc -us

Now cd .. and ls and you will see all the deb packages built.  
To install all of them use dpkg -i *ssl*.deb

> $ cd ..
> $ dpkg -i *ssl*.deb

You will get unknown hostname instead of unknown argument which means openssl is working.

Ref: [https://www.duncanwinfrey.com/openssl-1-0-1f-on-ubuntu-14-04-x64-with-sslv2-enabled/](https://www.duncanwinfrey.com/openssl-1-0-1f-on-ubuntu-14-04-x64-with-sslv2-enabled/)
