+++
title = "Adding custom annotations to your java beans"
date = "2013-09-05"
usekatex = true
categories = ["programming"]
tags = ["java"]
+++

Java annotations are syntactic meta-information that can be added to your source code. You can annotate classes, methods, variables, parameters, and even [packages](https://puredanger.github.io/tech.puredanger.com/2007/02/28/package-annotations/).

The primary advantage of annotations over Javadoc tags is that they can be reflective. This means the information remains available to the Virtual Machine at runtime via the [Java Reflection API](http://docs.oracle.com/javase/tutorial/reflect/). Modern frameworks like Spring rely heavily on this to extend behavior, inject data, and handle configurations seamlessly.

In this article, we will define a custom annotation and use reflection to enhance the behavior of Java beans at runtime. Specifically, we will build a mechanism that serializes a collection of Java beans into a CSV file. 

We don't want to export every field, so we will use annotations to mark only the specific fields we wish to include in our CSV output.

# Step 1: Defining the Annotation

The first step is to create the annotation class. We will name this `CSVExport.java`:

```java
package net.andreinc.utils;

import java.lang.annotation.*;

@Retention(RetentionPolicy.RUNTIME)
@Target(ElementType.METHOD)
@interface CSVExport {
}
```

As shown, annotation-related classes reside in the `java.lang.annotation.*` package. We use `@Retention(RetentionPolicy.RUNTIME)` to ensure the annotation is accessible during execution. The `@Target(ElementType.METHOD)` indicates that this specific annotation can only be applied to methods.

# Step 2: Annotating the Java Bean

Next, we create our Java Bean and mark the "getters" we want to serialize with our new `@CSVExport` annotation.

```java
package net.andreinc.utils;

public class TestModel {
    public String p1;
    public int p2;
    public Double p3;

    public TestModel(String p1, int p2, Double p3) {
        super();
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;
    }
    
    @CSVExport
    public String getP1() {
        return p1;
    }
    
    public void setP1(String p1) {
        this.p1 = p1;
    }
    
    @CSVExport
    public int getP2() {
        return p2;
    }
    
    public void setP2(int p2) {
        this.p2 = p2;
    }
    
    @CSVExport
    public Double getP3() {
        return p3;
    }

    public void setP3(Double p3) {
        this.p3 = p3;
    }
}
```

Only the methods decorated with `@CSVExport` will appear in the resulting file. If the annotation is missing, the field is ignored.

# Step 3: The Exporting Mechanism

Now we write the logic that inspects the beans at runtime using reflection.

```java
package net.andreinc.utils;

import java.beans.BeanInfo;
import java.beans.IntrospectionException;
import java.beans.Introspector;
import java.beans.PropertyDescriptor;
import java.io.PrintStream;
import java.util.Collection;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.lang.annotation.Annotation;
import java.lang.reflect.*;

public class CollectionToCSV<T> {

    private Collection<T> collection;

    public CollectionToCSV(Collection<T> collection) {
        this.collection = collection;
    }

    public void export(PrintStream out) {
        Iterator<T> iterator = this.collection.iterator();
        while (iterator.hasNext()) {
            try {
                out.println(buildCSVRow(iterator.next()));
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }

    private String buildCSVRow(T element) throws IllegalArgumentException,
            IllegalAccessException, IntrospectionException, InvocationTargetException {
        
        StringBuilder buff = new StringBuilder("");
        BeanInfo beanInfo = Introspector.getBeanInfo(element.getClass());
        PropertyDescriptor[] propertyDescriptors = beanInfo.getPropertyDescriptors();
        
        for (PropertyDescriptor propertyDescriptor : propertyDescriptors) {
            Method readMethod = propertyDescriptor.getReadMethod();
            if (null != readMethod) {
                // Check if the getter has our custom annotation
                if (readMethod.isAnnotationPresent(CSVExport.class)) {
                    Object value = readMethod.invoke(element);
                    buff.append(value).append(",");
                }
            }
        }
        
        if (buff.length() > 0) {
            buff.deleteCharAt(buff.length() - 1);
        }
        
        return buff.toString();
    }

    public static void main(String args[]) throws Exception {
        TestModel t1 = new TestModel("a", 1, 2.0);
        TestModel t2 = new TestModel("b", 2, 4.0);
        TestModel t3 = new TestModel("c", 3, 6.0);

        List<TestModel> tl = new LinkedList<>();
        tl.add(t1);
        tl.add(t2);
        tl.add(t3);

        CollectionToCSV<TestModel> ccsv = new CollectionToCSV<>(tl);
        ccsv.export(System.out);
    }
}
```

# Result

Running this code produces the following output:

```text
a,1,2.0
b,2,4.0
c,3,6.0
```

By simply removing any `@CSVExport` annotation from the `TestModel` class, that specific column will be omitted from the output.
