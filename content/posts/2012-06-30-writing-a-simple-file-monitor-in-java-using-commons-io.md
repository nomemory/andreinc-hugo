+++
title = "Writing a simple file monitor in Java using Commons IO"
date = "2012-06-30"
usekatex = true
categories = ["programming"]
tags = ["java"]
+++

Even though Java 7 introduced a low-level API to watch for file system changes (see the article [here](http://java.dzone.com/news/how-watch-file-system-changes)), you also have the option of using the [Commons IO](http://commons.apache.org/io/) library from the [Apache Foundation](http://www.apache.org/), specifically the [org.apache.commons.io.monitor](http://commons.apache.org/io/api-release/index.html?org/apache/commons/io/monitor/package-summary.html) package.

The first step is to define the location that we are going to monitor:

```java
public static final String FOLDER =
        "/home/skywalker/Desktop/simple-test-monitor/watchdir";
```        

Next, we define a polling interval: this determines how often the system "looks" for file system changes. The value is expressed in milliseconds:

```java
final long pollingInterval = 5 * 1000;
```

Now, we create a `File` object from the folder path:

```java
File folder = new File(FOLDER);
```

At this point, [Commons IO](http://commons.apache.org/io/) comes into play. To make the file monitor functional, we need an instance of each of the following: 

* [FileAlterationObserver](http://commons.apache.org/io/api-release/org/apache/commons/io/monitor/FileAlterationObserver.html): Monitors a specific directory.
* [FileAlterationMonitor](http://commons.apache.org/io/api-release/org/apache/commons/io/monitor/FileAlterationMonitor.html): A runnable that spawns a monitoring thread.
* [FileAlterationListenerAdaptor](http://commons.apache.org/io/api-release/org/apache/commons/io/monitor/FileAlterationListenerAdaptor.html): A convenient base class for receiving events.



```java
FileAlterationObserver observer = new FileAlterationObserver(folder);
FileAlterationMonitor monitor = new FileAlterationMonitor(pollingInterval);
FileAlterationListener listener = new FileAlterationListenerAdaptor() {
    // Is triggered when a file is created in the monitored folder
    @Override
    public void onFileCreate(File file) {
        try {
            // "file" is the reference to the newly created file
            System.out.println("File created: "
                    + file.getCanonicalPath());
        } catch (IOException e) {
            e.printStackTrace(System.err);
        }
    }

    // Is triggered when a file is deleted from the monitored folder
    @Override
    public void onFileDelete(File file) {
        try {
            // "file" is the reference to the removed file
            System.out.println("File removed: "
                    + file.getCanonicalPath());
            // "file" does not exists anymore in the location
            System.out.println("File still exists in location: "
                    + file.exists());
        } catch (IOException e) {
            e.printStackTrace(System.err);
        }
    }
};
```

Finally, we add the listener to the observer, attach the observer to the monitor, and start the monitoring process:

```java
observer.addListener(listener);
monitor.addObserver(observer);
monitor.start();
```

Once the code is compiled and running, every change in the directory will be recorded:

```text
File created: /home/skywalker/Desktop/simple-test-monitor/watchdir/1
File created: /home/skywalker/Desktop/simple-test-monitor/watchdir/test
File created: /home/skywalker/Desktop/simple-test-monitor/watchdir/test2
File removed: /home/skywalker/Desktop/simple-test-monitor/watchdir/test
File still exists in location: false
```