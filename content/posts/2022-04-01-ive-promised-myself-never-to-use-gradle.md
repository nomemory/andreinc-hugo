+++
title = "I've promised myself never to use gradle"
date = "2022-04-01"
usekatex = false
categories = ['persona', 'programming']
tags = ["java"]
+++

> The current article won't be an exhaustive technical analysis of Gradle but more like a spontaneous rant. 

Firstly, the time I am willing to allocate to learning a build tool will always be strictly limited. Secondly, I try to be fair, so the list of things I expect from a build tool is quite small: 
* Let me list a few dependencies by using a purely descriptive approach.
* Please give me a stable (!) interface to write plugins for "extravagant" features. If other devs are building open-source plugins, I am more than willing to use them instead of writing them independently.
* After the initial effort to write the build file, I should rarely have to touch it (unless I am incrementing version numbers). 

Jokes aside, I've just described Maven. 

Unfortunately, Gradle lost its way somewhere between the upgrade from version `4.x` to `5.x`, or between the upgrade from `5.x` to `6.x`, or between `6.x` to `7.x`, or between `7.x` to `8.x`. Or maybe Gradle was never the way to begin with. We were momentarily happy not having to write and read `pom.xml` files ever again, and we jumped ship too early. Our problem was never Maven; it was XML...

# Gradle and the cognitive load

The moment you exit the realm of straightforward build files, you will become lost and incredibly lonely. This will happen because you never had the patience (by then!) to read the documentation in its entirety. And bear in mind, Gradle's documentation is not something you can skim on the weekend or from your mobile phone while sitting on the bus. On the contrary, it's a "hard" read, full of specific technical jargon you need to intimately familiarize yourself with.

Let me give you an example. The chapter ["Learning the Basics -> Understanding the Build Lifecycle"](https://docs.gradle.org/current/userguide/build_lifecycle.html) starts with the following paragraph. This should theoretically be an easy read, given it's an introductory article:

{{< img src="/images/2022-04-01-ive-promised-myself-never-to-use-gradle/gradledoc.png" width="650" >}}

Quickly, without opening your CS reference book, tell me what a **Directed Acyclic Graph** is. It's ok; you don't have to open your CS reference book because the authors of the documentation were kind enough to link a Wikipedia article:


{{< img src="/images/2022-04-01-ive-promised-myself-never-to-use-gradle/wikipediadag.png" width="650" >}}

After digging through the documentation for a few days (or up to a week, if you want to understand how Multi-Project builds actually work), things will become much clearer as you experience a few Eureka moments. This period is critical. After this week, you will either hate or love Gradle. It only depends on your overall tolerance for complexity and over-engineered solutions. 

In any case, kudos! You are now part of a select group of people who managed to get through the Gradle documentation. But it would be wise to hide this fact from your team. Otherwise, your colleagues will make *you* the guy responsible for the build file. This is a burden not always worth carrying. 

**My advice**:
- Gradle is not a tool you can hack your way into by copy-pasting stuff from StackOverflow. If you haven't done so already, sit down and allocate time to actually read the documentation.

# The disregard for backward compatibility

Java prides itself on being a conservative technology (for lack of a better word). The standard API rarely changes, and the old stuff keeps working, even if it falls from grace. People aren't using `Vector<T>` anymore, but this doesn't mean `Vector<T>` was removed from the Standard Library. To a lesser extent, the ecosystem of libraries, frameworks, and tools surrounding and supporting Java inherits this conservative approach. Developers make great efforts to maintain backward compatibility, even between major versions.

This is absolutely not the case with Gradle. Incrementing to a new major version is always painful (for non-trivial builds).

The API always changes. Sometimes for purely cosmetic reasons:

{{< img src="/images/2022-04-01-ive-promised-myself-never-to-use-gradle/change1.png" width="600" >}}

{{< img src="/images/2022-04-01-ive-promised-myself-never-to-use-gradle/change2.png" width="600" >}}

Or there are subtle changes that can affect existing behavior:

{{< img src="/images/2022-04-01-ive-promised-myself-never-to-use-gradle/change3.png" width="600" >}}

Because of these constant API changes, the 3rd-party plugins you depend upon won't work anymore unless the original authors proactively update them. For this reason, the highly popular plugin [Gradle Shadow](https://github.com/johnrengelman/shadow) comes in 3 "flavors", one for each ~~API change~~ major Gradle version:

{{< img src="/images/2022-04-01-ive-promised-myself-never-to-use-gradle/shadow.png" width="400" >}}

Maintaining multiple versions puts an unnecessary burden on open-source maintainers. For example, the famous [Log4shell](https://uit.stanford.edu/news/log4shell-vulnerability-what-you-need-know) exploit was never fixed in older versions of the Gradle Shadow plugin (see [issue](https://github.com/johnrengelman/shadow/issues/739)), forcing users to either forcefully update their Gradle version (provoking even more backward compatibility havoc) or implement messy alternative workarounds.

On the one hand, I love that the Gradle team is forward-thinking, but the way things change from version to version is sometimes just too much. If you plan to use Gradle, you must permanently update it. If you get to the point of being a few major versions behind, you will make your life much harder than it should be. 

**My advice**:
- Migrating to a major Gradle version can be a massive hurdle, so allocate time wisely from a project planning perspective. Read the changelog with extreme attention.
- Limit your usage of 3rd-party Gradle plugins. 
- Prefer to write your own custom plugins if possible.

# Gatekeeping Pandora's Box

Make no mistake: when you choose to use Gradle, you will *program* your build file, not configure it. 

The `build.gradle` file is a running program in disguise (a [DSL](https://en.wikipedia.org/wiki/Domain-specific_language)). This means you can write actual business logic into a build file by creating your own functions and hooking them directly into the **Directed Acyclic Graph** we were previously speaking of. So even if it's not explicitly required, it's time for you to learn a little bit of [Groovy](https://www.groovy-lang.org/) or [Kotlin](https://kotlinlang.org/), depending on the Gradle dialect you pick. 

As a fun exercise, let's write a `build.gradle` file that fails the build if the weather temperature in Bucharest is lower than 25 degrees Celsius. We need to write a new `task` called `howIsTheWeatherInBucharest`, connect to the [https://openweathermap.org/](https://openweathermap.org/) API through a REST call, perform the check, and fail the build if the day is too cold for programming. 

```groovy
// rest of the build file

task howIsTheWeatherInBucharest {
    doLast {
        // Quick and dirty code 
        def apiKey = '<...enter api code here...>'
        def req = new URL('[https://api.openweathermap.org/data/2.5/weather?q=Bucharest&units=metric&appid=](https://api.openweathermap.org/data/2.5/weather?q=Bucharest&units=metric&appid=)' + apiKey).openConnection()
        req.setRequestMethod("GET")
        req.setRequestProperty("Content-Type", "application/json; charset=UTF-8")
        req.setDoOutput(true)
        def is = req.getInputStream();
        def resp = new Scanner(is).useDelimiter("\\A").next();
        def json = new groovy.json.JsonSlurper().parseText(resp)
        def temp = Double.parseDouble(json.main.temp.toString())
        if (temp < 25.0) {
            throw new GradleException("Build failed, the weather in Bucharest is bad")
        }
    }
}
compileJava.dependsOn(howIsTheWeatherInBucharest)
```

Having the ability to write raw code is seductive, but it opens Pandora's Box. The programmer's reflex to throw in some custom functions to make things work will kick in, especially if the build requirements are complex. And to be honest, writing your build file with a programmer's mindset is more natural than trying to circumvent the DSL. 

But let's take a step back and ask ourselves: is this really what we want from a build tool?! Writing quick and dirty code can spiral into writing more and more quick 'n' dirty code. Other people in your extended team will add their personal quick 'n' dirty code. Without the ability to properly debug the build process, and given the non-standard hacks people are willing to put into the build file, things can rapidly become less portable, extremely environment-dependent, or simply not idempotent. Should you always be online to build your project? Should you be inside a specific Private Network?

Do you remember when people were creating massive `.sh` shell scripts to build things? There's a reason we stopped doing that.

Even if it's easy to do, a Gradle build shouldn't replace a proper CI/CD pipeline. Yet, I've worked on and seen projects where the build process was doing much more than just assembling a fat jar. It ran tests, integrated directly with SonarQube, created custom reports based on static code analysis results, performed infrastructure changes, etc. Why!? Simply because it was possible. 



**My advice**:

- Keep your build file as declarative as possible and stick strictly to the DSL. 
- Avoid adding arbitrary logic, even if it's fast and *it works!*
- Don't add tasks in your build file that should be implemented as individual steps in a proper CI/CD pipeline.
- If you understand how Gradle works, try to gatekeep the file and heavily review whatever changes your colleagues make.

# Groovy, Kotlin, do you speak it?!

Gradle 5.0 came with a "game"-breaking change: devs were suddenly allowed to use an experimental Kotlin DSL to replace the historical Groovy DSL. In theory, this was terrific news, especially for the Android folks who were already flocking to Kotlin in droves. In reality, this heavily fragmented the community and brought even more confusion to the uninitiated. 

For example, searching StackOverflow for Gradle issues suddenly became an arduous chore. First of all, the answers you will find on the Internet are, most of the time, horribly outdated. You cannot simply hack your way through with a solution targeting `5.0` if you are already on version `7.0`. Chances are it won't work. But now, you also need to be highly attentive to the dialect! You might find a working solution that uses Groovy, and you will have to manually translate it yourself to Kotlin. 

Compared to the Groovy DSL, the Kotlin DSL seems to be much stricter and more *opinionated*. After all, Kotlin has a much stricter type system compared to Groovy. So if you are a Java developer planning to use Gradle with the Kotlin DSL, you have to be familiar with Groovy (just to be able to read the old reference materials), but you *also* need to learn enough Kotlin to be able to actually write your build file. A little bit of learning new things never killed anyone, but I am asking again: Why is it necessary to learn a completely new programming language just to master a build tool!?

**My advice**:

* I still use the Groovy dialect simply because there are far more materials available to get inspiration from. It's 2022, and things might change in the future, but for now, Groovy is safer.

# Abrupt final thoughts

I promised myself not to use Gradle anymore... but I still do it from time to time, especially for smaller, contained, personal projects. Old habits die hard.