+++
title = "Hash, displace, and compress: Perfect hashing with Java"
date = "2022-03-15"
usekatex = true
excerpt = "An implementation of a perfect hashing algorithm in Java"
categories = ["programming"]
tags = ["java", "algorithms"]
+++

> This article explains a straightforward approach for generating *Perfect Hash Functions*, and using them in tandem with a `Map<K,V>` implementation called `ReadOnlyMap<K,V>`. It assumes the reader is already familiar with concepts like hash functions and hash tables. If you want to refresh your knowledge on these two topics, I recommend you read some of my previous articles: [Implementing Hash Tables in C](/2021/10/02/implementing-hash-tables-in-c-part-1) and [A tale of Java Hash Tables](/2021/11/08/a-tale-of-java-hash-tables). 

A *Perfect Hash Function* (PHF), $H$, is a *hash function* that maps distinct elements from a set $S$ to a range of integer values $[0, 1, ....]$ so that there are absolutely no collisions. In mathematical terms, $H$ is injective. This means that for any $x_{1}, x_{2} \in S$, if $H(x_{1}) = H(x_{2})$ we can confidently say $x_{1} = x_{2}$. The contrapositive argument is also true: if $x_{1} \neq x_{2}$, then $H(x_{1}) \neq H(x_{2})$.  

{{< img src="/images/2022-03-15-perfect-hashing-with-java/ph.drawio.png" width="400">}}

Moreover, a *Minimal Perfect Hash Function* (MPHF) is a PHF $H$ defined on a finite set $S = \{a_0, a_1, ..., a_{m-1}\}$ with values strictly in the range of integer values $\{0, 1, ..., m-1\}$ of size $m$.

{{< img src="/images/2022-03-15-perfect-hashing-with-java/mph.drawio.png" width="400">}}

A function like this would be fantastic to use in the context of *Hash Tables*, wouldn't it!? 

In theory, without collisions, every element goes straight into an empty bucket without risking finding an intruder already settled in. Or, in the case of Open Addressing Hash Tables, the element doesn't have to awkwardly probe the surrounding buckets to find its place in the *Universe*.

Another (significant) advantage of using an MPHF involves space considerations: we don't have to impose a load factor constraint on the **Hash Table** because we know there is a perfect 1:1 association between elements and buckets. When using an MPHF, the load factor is exactly `1.0`, compared to ~ `0.66-0.8` for Open Addressing Hash Tables or `0.7` for classic Separate Chaining implementations.  

But don't get too excited just yet; there are a few *gotchas*:
- To find an MPHF or PHF, we need to know *all* the keys in advance. After computing the PHF and building the *Hash Table*, we cannot add new entries; the data structure is strictly read-only. To be 100% accurate, [dynamic perfect hashing does exist](https://en.wikipedia.org/wiki/Dynamic_perfect_hashing), but because it's quite memory-intensive, we rarely see it in practice. 
- Computing an MPHF is not guaranteed to work every single time, at least not if we use an algorithm that runs in (almost) linear or logarithmic time. 
- The resulting *Perfect Hash Function* is often mathematically complex and usually performs a secondary table lookup. In practice, this means it can actually be slower to compute than a standard hash function.

The idea of generating PHFs and MPHFs is not new; it first appeared in 1984 in a paper called [Storing a Sparse Table with O(1) Worst Case Access Time](https://www.cs.princeton.edu/courses/archive/fall09/cos521/Handouts/storingasparse.pdf). A significant algorithm improvement was later proposed in 2009 in the paper [Hash, displace, and compress](http://cmph.sourceforge.net/papers/esa09.pdf) (which this current article is based upon). 

Since then, more algorithms have emerged, and most of them are already implemented and described in the excellent [cmph library](http://cmph.sourceforge.net). What is nice about **cmph** is that you can compile the library as a standalone executable that allows you to generate MPHFs directly from the command line. Currently, cmph supports the following algorithms: [CHD](http://cmph.sourceforge.net/chd.html), [BDZ](http://cmph.sourceforge.net/bdz.html), [BMZ](http://cmph.sourceforge.net/bmz.html), [BRZ](http://cmph.sourceforge.net/brz.html), [CHM](http://cmph.sourceforge.net/chm.html), and [FCH](http://cmph.sourceforge.net/fch.html), each with its own PROs and CONs, as explained on [their page](http://cmph.sourceforge.net). 

If you are passionate about this topic, you can also check out Reini Urban's [Perfect-Hash](https://github.com/rurban/Perfect-Hash) for PHF code generation, and [his excellent article](http://blogs.perl.org/users/rurban/2014/08/perfect-hashes-and-faster-than-memcmp.html) on the topic. 

In this article, we are going to implement in Java a "naive" version of the [CHD](http://cmph.sourceforge.net/chd.html) algorithm, which is actually based heavily on how Steve Hanov implemented it in Python in his article: ["Throw away the keys: Easy, Minimal Perfect Hashing"](http://stevehanov.ca/blog/?id=119), and this [C implementation](https://github.com/wahern/phf/blob/master/phf.cc) by [William Ahern](https://github.com/wahern).

# The code

If you want to check out the code associated with this project:

```bash
git clone git@github.com:nomemory/mphmap.git
```

# A glimpse

To get a better understanding of what we are going to achieve by the end of this article, let's suppose we have a Set $S$ of 15 *Roman Emperor* keys: 

```java
Set<String> emperors =
    Set.of("Augustus", "Tiberius", "Caligula",
            "Claudius", "Nero", "Vespasian",
            "Titus", "Dominitian", "Nerva",
            "Trajan", "Hadrian", "Antonious Pius",
            "Marcus Aurelius", "Lucius Verus", "Commodus");
```

We want to find a function $H$ that evenly distributes each of these keys into 15 hash buckets in the exact range `[0, 1, .. 14]`. 

If we use Java's built-in `String.hashCode()` on the keys, we will get quite a few collisions:

```java
// Initialize buckets as an empty List<ArrayList<String>>
List<ArrayList<String>> buckets =
    Stream.generate(() -> new ArrayList<String>()).limit(emperors.size()).toList();

// Distribute elements into the buckets
emperors.forEach(s -> {
    // We apply & 0xfffffff because, by default, hashCode() 
    // can return a negative value.
    int hash = (s.hashCode() & 0xfffffff) % buckets.size();
    buckets.get(hash).add(s);
});

// Printing bucket contents
for (int i = 0; i < buckets.size(); i++) {
    System.out.printf("bucket[%d]=%s\n", i, buckets.get(i));
}
```        

Output:

```
bucket[0]=[Augustus]
bucket[1]=[]
bucket[2]=[Tiberius]
bucket[3]=[]
bucket[4]=[Lucius Verus]
bucket[5]=[]
bucket[6]=[]
bucket[7]=[]
bucket[8]=[Caligula]
bucket[9]=[Antonious Pius]
bucket[10]=[]
bucket[11]=[Dominitian]
bucket[12]=[Hadrian, Titus, Claudius]
bucket[13]=[Nerva, Marcus Aurelius]
bucket[14]=[Trajan, Vespasian, Commodus, Nero]
```

As you can see, the distribution is far from perfect; there are nine collisions squeezed into just 15 buckets. 

In this article, we will implement a class, [`PHF.java`](https://github.com/nomemory/mphmap/blob/main/src/main/java/net/andreinc/jperhash/PHF.java), that will be able to evenly distribute the 15 Roman emperors into their very own *personal* buckets. This is the right thing to do because it would have been totally unfair to have `"Trajan"` sharing the same cramped space with `"Nero"`.

```java
Set<String> emperors =
            Set.of("Augustus", "Tiberius", "Caligula",
                    "Claudius", "Nero", "Vespasian",
                    "Titus", "Dominitian", "Nerva",
                    "Trajan", "Hadrian", "Antonious Pius",
                    "Marcus Aurelius", "Lucius Verus", "Commodus");

// Initializing the Minimal Perfect Hash Function we are going to build 
// in this article
PHF phf = new PHF(1.0, 4, Integer.MAX_VALUE);
phf.build(emperors, String::getBytes);

// Putting elements into the buckets
final String[] buckets = new String[emperors.size()];
emperors.forEach(emperor -> buckets[phf.hash(emperor.getBytes())] = emperor);

// Printing the results
for (int i = 0; i < buckets.length; i++) {
    System.out.printf("bucket[%d]=%s\n", i, buckets[i]);
}                    
```

Output:

```
bucket[0]=Titus
bucket[1]=Vespasian
bucket[2]=Claudius
bucket[3]=Marcus Aurelius
bucket[4]=Nero
bucket[5]=Nerva
bucket[6]=Caligula
bucket[7]=Commodus
bucket[8]=Augustus
bucket[9]=Tiberius
bucket[10]=Hadrian
bucket[11]=Lucius Verus
bucket[12]=Antonious Pius
bucket[13]=Trajan
bucket[14]=Dominitian
```

As you can see, there are absolutely no collisions now. Our function `PHF.hash()` works "flawlessly" in this regard: each Emperor to his own bucket.

But don't get too excited yet. Let's "microbenchmark" how fast our new function is compared to the established, battle-tested `Object.hashCode()`.

{{< img src="/images/2022-03-15-perfect-hashing-with-java/phfbench.png" >}}

Being ten times slower than `Object.hashCode()` is not exactly what I intended to show you, but you get the main idea: `PHF.hash()` will be computationally slower. My implementation is not exactly the absolute best, but even if you apply some heavy low-level optimizations, you won't be able to get massive improvements over this baseline.

Now let's see how `PHF.java` is actually implemented.

# The algorithm in images


1. We split our initial set $S$ (which contains all the possible keys) into virtual "buckets" $B_{i}$ of size $0 \le i \lt r$. To obtain these buckets, we use a first-level hash function $g(x)$, such that $B_i = \{ x \mid g(x)=i \}$. 

{{< img src="/images/2022-03-15-perfect-hashing-with-java/algo-buckets.drawio.png" >}}

2. We sort the $B_{i}$ buckets in descending order (according to their size, $\mid B_{i} \mid$), keeping track of their initial index for later use. The main idea is to tackle the *problematic* buckets first (the ones having the most collisions).  

{{< img src="/images/2022-03-15-perfect-hashing-with-java/algo-descending-order.drawio.png" >}}

3. We initialize an array $T=[0, 1, 2, ..., m-1]$ with `0` elements. In our particular example, `m=15`. In $T$ we will keep track of the slots for which our PHF has successfully avoided collisions.

4. We iterate over each bucket $B_{i}$ (with $i \in \{0, 1, ..., r-1\}$) in the sorted order obtained in step `2`, until we reach buckets of size $\mid B_{i}\mid = 1$.
    1. For each element in $B_{i}$, we compute $K_{i} = \{ \phi_{l}(x) \mid x \in B_{i} \}$, where $l \in [1, ..]$ and $\phi_{1}, \phi_{2}, \phi_{3}, ...$ is a family of hash functions. For each $l$, it returns a different value for $\phi_{l}(x)$.
    2. We stop incrementing $l$ when $\mid K_i \mid = \mid B_i \mid$ AND $K_i \cap \{j \mid T[j]=1\} = \emptyset$. This means that we have successfully found $K_{i}$ unique slots that do not collide with any previously placed elements for the current $l$.
        1. For $j \in K_i$, we mark $T[j] = 1$.
        2. We store the successful value as $\sigma(i) = l$. At this point, we know that the elements from $B_{i}$ won't collide if we apply $\phi_l(x)$ to them. From a code perspective, we can keep $\sigma(i)$ in a simple array. 

{{< img src="/images/2022-03-15-perfect-hashing-with-java/algo-algo.drawio.png" >}}    

5. For the remaining buckets where $\mid B_i \mid = 1$, we will simply look for the remaining empty slots in $T$, and one by one, we will place all remaining elements into them. For these, we store $\sigma(i) = -\text{position} - 1$. 

The last part is to define a way to compute $H(x)$, which is our final PHF:
$$
H(x) =
\begin{cases}
    \phi_{\sigma(g(x))}(x)  & \text{if } \sigma(g(x)) > 0 \\
    -\sigma(g(x)) - 1 & \text{if } \sigma(g(x)) \leq 0
\end{cases}
$$

Visually, $H(x)$ works like this:

{{< img src="/images/2022-03-15-perfect-hashing-with-java/fct.drawio.png" >}}

Don't worry if things don't make perfect sense right now; the code is actually easier to implement than the mathematical presentation makes it look. 

# The implementation

## The hash functions $g(x)$ and $\phi_l(x)$

In practice, we don't need two completely separate functions for $g(x)$ and $\phi_l(x)$. We simply apply the following convention: 

* We define $g(x) = \phi_0(x)$;
* At step `4.1`, when we increment $l$ to compute $\phi_l(x)$, we start with $l \in \{1, 2, ...\}$.

From a code perspective, my function of choice was [MurmurHash](https://en.wikipedia.org/wiki/MurmurHash), utilizing this [Apache implementation](https://commons.apache.org/proper/commons-codec/jacoco/org.apache.commons.codec.digest/MurmurHash3.java.html#L398):

```java
// Constants for 32-bit variant
private static final int C1_32 = 0xcc9e2d51;
private static final int C2_32 = 0x1b873593;
private static final int R1_32 = 15;
private static final int R2_32 = 13;
private static final int M_32 = 5;
private static final int N_32 = 0xe6546b64;

public static int hash32x86(final byte[] data, final int offset, final int length, final int seed) {
    int hash = seed;
    final int nblocks = length >> 2;

    // body
    for (int i = 0; i < nblocks; i++) {
        final int index = offset + (i << 2);
        final int k = getLittleEndianInt(data, index);
        hash = mix32(k, hash);
    }

    // tail
    final int index = offset + (nblocks << 2);
    int k1 = 0;
    switch (offset + length - index) {
    case 3:
        k1 ^= (data[index + 2] & 0xff) << 16;
    case 2:
        k1 ^= (data[index + 1] & 0xff) << 8;
    case 1:
        k1 ^= (data[index] & 0xff);

        // mix functions
        k1 *= C1_32;
        k1 = Integer.rotateLeft(k1, R1_32);
        k1 *= C2_32;
        hash ^= k1;
    }

    hash ^= length;
    return fmix32(hash);
}

private static int mix32(int k, int hash) {
    k *= C1_32;
    k = Integer.rotateLeft(k, R1_32);
    k *= C2_32;
    hash ^= k;
    return Integer.rotateLeft(hash, R2_32) * M_32 + N_32;
}

private static int fmix32(int hash) {
    hash ^= (hash >>> 16);
    hash *= 0x85ebca6b;
    hash ^= (hash >>> 13);
    hash *= 0xc2b2ae35;
    hash ^= (hash >>> 16);
    return hash;
}
```

In this regard:
* $g(x)$ is functionally equivalent to `MurmurHash32.hash32x86(data, 0, data.length, 0)`
* $\phi_l(x)$ is functionally equivalent to `MurmurHash32.hash32x86(data, 0, data.length, l)`

## The `PHF.java` class

We start with the following constructor and class attributes:

```java
protected double loadFactor;
protected int keysPerBucket;
protected int maxSeed;
protected int numBuckets;
public int[] seeds;

public PHF(double loadFactor, int keysPerBucket, int maxSeed) {
    if (loadFactor > 1.0) {
        throw new IllegalArgumentException("Load factor should be <= 1.0");
    }
    this.loadFactor = loadFactor;
    this.keysPerBucket = keysPerBucket;
    this.maxSeed = maxSeed;
}
```    

* `this.loadFactor` is by default `1.0` if we want an `MPHF`, or strictly less than `1.0` if we simply want to generate a `PHF`.
* `this.keysPerBucket` represents the expected average keys per bucket $B_{i}$. For example, if we have 15 elements in $S$, and we pick `keysPerBucket=3`, then we will have 5 buckets: $B_{0}, B_{1}, B_{2}, B_{3}, B_{4}$, each holding an average of 3 elements.
* `this.maxSeed` is the absolute maximum value of $l$. If, for example, we cannot find a valid $K_{i}$ before $l$ exceeds `maxSeed`, then we say our search for the MPHF has failed and we throw an exception.
* `this.seeds` directly corresponds to the array of $\sigma(i)$ values from the algorithm description.

The next step is to define two hash functions:

* One for internal use (a wrapper) over `MurmurHash3.hash32x86(...)`;
* The actual $H(x)$.

```java
public int hash(byte[] obj) {
    // g(x)
    int seed = internalHash(obj, INIT_SEED) % seeds.length;
    // if σ(g(x)) <= 0
    if (seeds[seed] <= 0) {
        // we return -σ(g(x))-1
        return -seeds[seed] - 1;
    }
    // else we return ϕ_σ(g(x))(x)
    int finalHash = internalHash(obj, seeds[seed]) % this.numBuckets;
    return finalHash;
}

// IF val == 0 => g(x)
// ELSE acts like ϕ(x)
protected static int internalHash(byte[] obj, int val) {
    return MurmurHash3.hash32x86(obj, 0, obj.length, val) & SIGN_MASK;
}
```

At this point, we introduce a helper class called `PHFBucket`. The sole purpose of this class is to store the original index of the bucket after sorting in step `2`:

```java
private static class PHFBucket implements Comparable<PHFBucket> {
    ArrayList<byte[]> elements;
    int originalBucketIndex;  // stores the original index

    static PHFBucket from(ArrayList<byte[]> bucket, int originalIndex) {
        PHFBucket result = new PHFBucket();
        result.elements = bucket;
        result.originalBucketIndex = originalIndex;
        return result;
    }

    // Written in a way so we can sort in reverse (descending) order
    @Override
    public int compareTo(PHFBucket o) {
        return o.elements.size() - this.elements.size();
    }

    @Override
    public String toString() {
        return "Bucket{" +
                "elements.size=" + elements.size() +
                ", originalBucketIndex=" + originalBucketIndex +
                '}';
    }
}
```    

The last step is to define the actual build algorithm. By the end, `this.seeds[]` will contain all the values necessary to accurately compute the `MPHF` (or `PHF`).

```java
public <T> void build(Set<T> inputElements, Function<T, byte[]> objToByteArrayMapper) {

    int seedsLength = inputElements.size() / keysPerBucket;         // m
    int numBuckets = (int) (inputElements.size() / loadFactor);     // r
    this.numBuckets = numBuckets;

    // The seeds have to be calculated.
    // From an algorithm perspective, this array holds σ(i)
    this.seeds = new int[seedsLength];             

    // Fill the buckets with empty lists initially
    ArrayList<byte[]>[] buckets = new ArrayList[seedsLength];
    for (int i = 0; i < buckets.length; i++) {
        buckets[i] = new ArrayList<>();
    }

    // Adding elements to buckets 
    // (step 1 from the algorithm)
    inputElements.stream().map(objToByteArrayMapper).forEach(el -> {
        int index = (internalHash(el, INIT_SEED) % seedsLength);
        buckets[index].add(el);
    });

    // Sorting so we can start resolving the buckets with the most items first
    // (step 2 from the algorithm)
    ArrayList<PHFBucket> sortedBuckets = new ArrayList<>();
    for (int i = 0; i < buckets.length; i++) {
        sortedBuckets.add(PHFBucket.from(buckets[i], i));
    }
    Collections.sort(sortedBuckets);

    // For each bucket we try to find a function for which the seed creates no collisions.
    // 'occupied' represents the array T
    // (step 3)
    BitSet occupied = new BitSet(numBuckets);
    int sortedBucketIdx = 0;
    PHFBucket bucket;
    Integer originalIndex;
    ArrayList<byte[]> bucketElements;
    Set<Integer> occupiedBucket;
    
    // (step 4)
    for (; sortedBucketIdx < sortedBuckets.size(); sortedBucketIdx++) {
        bucket = sortedBuckets.get(sortedBucketIdx);
        originalIndex = bucket.originalBucketIndex;
        bucketElements = bucket.elements;
        
        // If the buckets start to have a single element, we don't have
        // to do any complicated computations; we can break the loop
        if (bucketElements.size() == 1) {
            break;
        }
        
        // For each seed
        int seedTry = INIT_SEED + 1;
        for (; seedTry < maxSeed; seedTry++) {
            occupiedBucket = new HashSet<>();
            // For each element in the bucket
            int eIdx = 0;
            for (; eIdx < bucketElements.size(); eIdx++) {
                int hash = internalHash(bucketElements.get(eIdx), seedTry) % numBuckets;
                if (occupied.get(hash) || occupiedBucket.contains(hash)) {
                    // Trying with this seed is not successful, we break the loop
                    // so we can try again with another seed
                    break;
                }
                occupiedBucket.add(hash);
            }
            if (eIdx == bucketElements.size()) {
                // In this case, all elements per bucket displace well without collisions;
                // we can safely add them to occupied and record the seed to 'seeds'
                occupiedBucket.forEach(occupied::set);
                this.seeds[originalIndex] = seedTry;
                break;
            }
        }
        
        // If the seed == maxSeed, then we've completely failed at constructing a Perfect Hash Function
        // This means we've exhausted all possible seeds
        if (seedTry == maxSeed) {
            throw new IllegalStateException("Cannot construct a perfect hash function with the given parameters");
        }
    }
    
    // At this point, only the buckets with exactly one or zero elements remain. 
    // We need to add them to seeds; we continue the iteration
    // (step 5)
    int occupiedIdx = 0; // start from the first position
    for (; sortedBucketIdx < sortedBuckets.size(); sortedBucketIdx++) {
        bucket = sortedBuckets.get(sortedBucketIdx);
        originalIndex = bucket.originalBucketIndex;
        bucketElements = bucket.elements;
        
        if (bucketElements.isEmpty()) {
            break; // No more elements to process
        }
        
        // Find the next available empty slot in the bitset
        while (occupied.get(occupiedIdx)) {
            occupiedIdx++;
        }
        occupied.set(occupiedIdx);
        
        // We subtract (-1) to safely cover 0 indices (since 0 cannot be negative)
        this.seeds[originalIndex] = -(occupiedIdx) - 1;
    }
}
```

## Bonus: Creating a read-only `Map<K,V>`

Now that we have [`PHF.java`](https://github.com/nomemory/mphmap/blob/main/src/main/java/net/andreinc/jperhash/PHF.java), we can easily create a *Hash Table* called [`ReadOnlyMap<K,V>`](https://github.com/nomemory/mphmap/blob/main/src/main/java/net/andreinc/jperhash/ReadOnlyMap.java) that only permits read operations:

```java
public class ReadOnlyMap<K,V> {

    protected static final double LOAD_FACTOR = 1.0;
    protected static final int KEYS_PER_BUCKET = 1;
    protected static final int MAX_SEED = Integer.MAX_VALUE;

    private PHF phf;
    private ArrayList<V> values;
    private Function<K, byte[]> mapper;

    public static final <K,V> ReadOnlyMap<K,V> snapshot(Map<K, V> map, Function<K, byte[]> mapper, double loadFactor, int keysPerBucket, int maxSeed) {
        ReadOnlyMap<K,V> result = new ReadOnlyMap<>();
        result.phf = new PHF(loadFactor, keysPerBucket, maxSeed);
        result.phf.build(map.keySet(), mapper);
        
        result.values = new ArrayList<>(map.keySet().size());
        for (int i = 0; i < map.keySet().size(); i++) {
            result.values.add(null);
        }
        result.mapper = mapper;
        
        map.forEach((k, v) -> {
            int hash = result.phf.hash(mapper.apply(k));
            result.values.set(hash, v);
        });
        
        return result;
    }

    public static final <K,V> ReadOnlyMap<K,V> snapshot(Map<K,V> map, Function<K, byte[]> mapper) {
        return snapshot(map, mapper, LOAD_FACTOR, KEYS_PER_BUCKET, MAX_SEED);
    }

    public static final <V> ReadOnlyMap<String, V> snapshot(Map<String, V> map) {
        return snapshot(map, String::getBytes);
    }

    public V get(K key) {
        int hash = phf.hash(mapper.apply(key));
        return values.get(hash);
    }
}
```

Using the `ReadOnlyMap<K,V>` is quite straightforward. We essentially just have one factory method to create a `ReadOnlyMap<K,V>` snapshot from an existing read-write `Map<K,V>`:

```java
public static void main(String[] args) {
    Set<String> emperors =
            Set.of("Augustus", "Tiberius", "Caligula",
                    "Claudius", "Nero", "Vespasian",
                    "Titus", "Dominitian", "Nerva",
                    "Trajan", "Hadrian", "Antonious Pius",
                    "Marcus Aurelius", "Lucius Verus", "Commodus");

    // Creates a "normal map" from the given keys
    final Map<String, String> mp = new HashMap<>();
    emperors.forEach(emp -> {
        mp.put(emp, emp + "123");
    });

    // Creates a "read-only map" snapshot from the previous map
    final ReadOnlyMap<String, String> romp = ReadOnlyMap.snapshot(mp);
    emperors.forEach(emp -> {
        System.out.println(emp + ":" + romp.get(emp));
    });
}
```

## Bonus section: Benchmarking `HashMap<K,V>` vs. `ReadOnlyMap<K,V>`

We already benchmarked how "fast" `PHF.hash()` is at the beginning of the article, and we've seen that computing the hash can be up to 10 times slower than `Object.hashCode()`. But let's see how fast `ReadOnlyMap<K,V>` actually is compared to a standard `HashMap<K,V>`. 

In this regard, I wrote the following benchmark that tests the performance of the `get` operation on Maps containing 20,000,000 keys:

```java
@BenchmarkMode(Mode.AverageTime)
@OutputTimeUnit(TimeUnit.MICROSECONDS)
@State(Scope.Benchmark)
@Fork(value = 3, jvmArgs = {"-Xms6G", "-Xmx16G"})
@Warmup(iterations = 3, time = 10)
@Measurement(iterations = 5, time = 10)
public class TestReads {

    @Param({"1000", "100000", "1000000", "10000000", "20000000"})
    private int size;

    private Map<String, String> map;
    private ReadOnlyMap<String, String> readOnlyMap;
    private MockUnitString stringsGenerator = words().map(s -> s + ints().get()).mapToString();
    private List<String> keys;

    @Setup(Level.Trial)
    public void initMaps() {
        keys = stringsGenerator.list(size).get();
        this.map = new HashMap<>();
        keys.forEach(key -> map.put(key, "abc"));
        this.readOnlyMap = ReadOnlyMap.snapshot(map);
    }

    @Benchmark
    public void testGetInMap(Blackhole bh) {
        bh.consume(map.get(From.from(keys).get()));
    }

    @Benchmark
    public void testGetInReadOnlyMap(Blackhole bh) {
        bh.consume(readOnlyMap.get(From.from(keys).get()));
    }
}
```

The results were quite interesting:

{{< img src="/images/2022-03-15-perfect-hashing-with-java/benchget.png" >}}

~~Even if the hash function is slower, given the higher memory locality, `ReadOnlyMap` performs a little bit faster than a normal `HashMap<K,V>`.~~

**Later Edit:**
The initial benchmark performed was unfortunately incorrect, resulting in erroneous conclusions. The reality is that the standard `HashMap<K,V>` is faster overall. 

# References

* [http://cmph.sourceforge.net/papers/esa09.pdf](http://cmph.sourceforge.net/papers/esa09.pdf)
* [http://stevehanov.ca/blog/?id=119](http://stevehanov.ca/blog/?id=119)
* [https://github.com/wahern/phf/blob/master/phf.cc](https://github.com/wahern/phf/blob/master/phf.cc)