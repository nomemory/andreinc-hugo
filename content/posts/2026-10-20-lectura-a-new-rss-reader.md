+++
date = '2026-10-20'
draft = false
title = 'Lectura.info: A new RSS reader'
categories = ["programming"]
tags = ['programming']
usekatex = false
+++

I always knew it was inevitable that I'd build my own [RSS reader](https://lectura.info/).

I've been reading blogs since the 2000s. I've been blogging since 2005 (teenage angst blogs that are long dead), but on a more serious note since 2010.

I (used to) program. Eventually, these three activities were bound to produce another piece of software. So I coded it. Actually, it was mostly an exercise in vibecoding, although I couldn't help optimising some queries by hand and then doing some refactoring here and there.

So there was typing, there was prompting, and there was looking at the result and realising my programming skills are now obsolete... although there was some debugging as well.

The result is **[Lectura](https://lectura.info/)**.

The original idea was modest: a personal RSS reader I could self-host. 

Then I thought: well, if I'm already hosting it, it could support more than one user. So now I'm *launching* it.

---

The reader itself is [**deliberately** quiet](https://lectura.info/about?lang=en) and private. I store 0 information about the users (except the actual username).

For the curious, the technical ingredients include Java, Spring Boot, PostgreSQL, and Thymeleaf. I just wanted to render things on the server, so this seemed like a great idea.

Considering the modest server I'm hosting this on, the app seems to respond reasonably quickly, so I guess the technology choice was OK. Do people nowadays still care about the tech stack?

---

If you have any feedback, please leave a comment here or send me an email.

Looking forward to someone actually using this.
