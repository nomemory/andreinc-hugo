+++
title = "Writing your own linear algebra matrix library in C"
date = "2021-01-20"
usekatex = true
excerpt = "A step-by-step guide on how to implement a matrix library in pure C"
categories = ["programming", "math"]
tags = ["python", "linear algebra"]
+++

{{<toc>}}

# Disclaimer

The reader should be familiar with the concept of a matrix and it's basic applications.

# Math, math

Linear algebra is the branch of mathematics focused on:
* **Linear equations**: $a_{1}x_{1} + \dots + a_{n}x_{n} = b$
* **Linear maps**: $(x_{1}, \dots, x_{n}) \rightarrow a_{1}x_{1} + \dots + a_{n}x_{n}$ and their representation in vector spaces through matrices.
  
A finite set of linear equations with a finite set of variables is called a **system of linear equations** or simply a **linear system**.

Linear systems are a fundamental part of linear algebra. Historically, matrix theory was developed specifically to solve such systems. In a modern context, many real-world problems (engineering, physics, etc.), are interpreted and solved using matrices and linear systems.

To see the connection between matrices and linear systems, let's look at the following example, where we need to find $x_1, x_2, x_3$:

<div class="mp mpc">
\[ 
\begin{cases} 
2x_{1} + x_{2} + 3x_{3} = 1 \\
2x_{1} + 6x_{2} + 8x_{3} = 3 \\
6x_{1} + 8x_{2} + 18x_{3} = 5 
\end{cases}
\]
</div>

Susbtitution cannot get us too far computatational wise, so we need new strategies to solve such problems. For this system of three linear equations, we can associate the coefficient matrix $A[3 \times 3]$ and the vector of constants $B[3 \times 1]$. 

We can define our system in matrix form as $A \cdot x = B$:

<div class="mp mpc">
\[
\begin{bmatrix}
2 & 1 & 3\\
2 & 6 & 8\\
6 & 8 & 18
\end{bmatrix}
\begin{bmatrix}
x_{1}\\
x_{2}\\
x_{3}
\end{bmatrix}
=
\begin{bmatrix}
1 \\
3 \\
5 \\
\end{bmatrix}
\]
</div>

Alternatively, we can use the **augmented matrix** notation, $S$, which combines $A$ and $B$ into something more compact:

<div class="mp mpc">
\[
S = \left(\begin{array}{ccc|c}
2 & 1 & 3 & 1 \\
2 & 6 & 8 & 3 \\
6 & 8 & 18 & 5
\end{array}\right)
\]
</div>

The power of this notation lies in the fact that by performing **elementary row operations** (swapping rows, adding rows, or multiplying rows by scalars), we can transform the system into an equivalent form that is much easier to solve. Using your specific sequence of operations, we can see the matrix "morph" step-by-step:

We use $\text{Row}_1$ to eliminate the leading terms in the rows below it:

<div class="mp mpc">
\[
S \xrightarrow{-1 \cdot R_1 + R_2 \to R_2}
\left(\begin{array}{ccc|c}
2 & 1 & 3 & 1 \\
0 & 5 & 5 & 2 \\
6 & 8 & 18 & 5
\end{array}\right)
\xrightarrow{-3 \cdot R_1 + R_3 \to R_3}
\left(\begin{array}{ccc|c}
2 & 1 & 3 & 1 \\
0 & 5 & 5 & 2 \\
0 & 5 & 9 & 2
\end{array}\right)
\]
</div>

Next, we use the updated $\text{Row}_2$ to create a zero in the second column of $\text{Row}_3$:

<div class="mp mpc">
\[
\xrightarrow{-1 \cdot R_2 + R_3 \to R_3}
\left(\begin{array}{ccc|c}
2 & 1 & 3 & 1 \\
0 & 5 & 5 & 2 \\
0 & 0 & 4 & 0
\end{array}\right)
\]
</div>

Finally, we apply scalar multiplications to set the leading "pivot" element of each row to $1$:

<div class="mp mpc">
\[
\xrightarrow{\frac{1}{4} \cdot R_3 \to R_3}
\left(\begin{array}{ccc|c}
2 & 1 & 3 & 1 \\
0 & 5 & 5 & 2 \\
0 & 0 & 1 & 0
\end{array}\right)
\xrightarrow{\frac{1}{2} \cdot R_1 \to R_1}
\left(\begin{array}{ccc|c}
1 & \frac{1}{2} & \frac{3}{2} & \frac{1}{2} \\
0 & 5 & 5 & 2 \\
0 & 0 & 1 & 0
\end{array}\right)
\]
</div>

And the last operation results in a matrix, equivalent to the initial one, that would enable us to easy find the $x$s:

<div class="mp mpc">
\[
\xrightarrow{\frac{1}{5} \cdot R_2 \to R_2}
S = \left(\begin{array}{ccc|c}
1 & \frac{1}{2} & \frac{3}{2} & \frac{1}{2} \\
0 & 1 & 1 & \frac{2}{5} \\
0 & 0 & 1 & 0
\end{array}\right)
\]
</div>

Notice how our coefficient matrix has become **upper triangular** (all elements below the main diagonal are $0$). The more advanced algorithms we will implement in our C library (like LU or QR decomposition) are all centered around creating these triangular forms. Once the augmented matrix is in this state, the initial system is trivial to solve via **back-substitution**:

<div class="mp mpc">
\[
\begin{cases}
x_{1} + \frac{1}{2}x_{2} + \frac{3}{2}x_{3} = \frac{1}{2} \\
x_{2} + x_{3} = \frac{2}{5} \\
x_{3} = 0
\end{cases}
\]
</div>

Because the matrix is upper triangular, we instantly find $x_{3} = 0$. Substituting $x_{3}$ into the second equation gives $x_{2} = \frac{2}{5}$, and so on. 

From a computational perspective, transforming dense matrices into triangular forms is the essential first step in solving almost any linear system efficiently.

# The Library

Whether you are an Engineering or Computer Science student passionate about [linear algebra](https://en.wikipedia.org/wiki/Linear_algebra) and [numerical analysis](https://en.wikipedia.org/wiki/Numerical_analysis), or simply a developer curious about the low-level mechanics of Matlab's [`lu(A)`](https://www.mathworks.com/help/matlab/ref/lu.html) method, this project is for you. 

If you are diving into Artificial Intelligence, you already know that you cannot truly master AI algorithms without a rock-solid foundation in linear algebra.

I believe the best way to demystify these concepts is to build your own Matrix library from scratch in a low-level language like [C](https://en.wikipedia.org/wiki/C_(programming_language)), [C++](https://en.wikipedia.org/wiki/C%2B%2B), or even [D](https://dlang.org/). 

This tutorial provides a step-by-step guide to creating a C-based Matrix library. We will implement both "basic" and "advanced" numerical analysis algorithms, culminating in a tool capable of solving complex systems of linear equations.

# Source Code
All code discussed in this tutorial is available on GitHub in the [neat-matrix-library](https://github.com/nomemory/neat-matrix-library) repository. 

To clone it using the GitHub CLI:

```
git clone git@github.com:nomemory/neat-matrix-library.git
```

The code is designed to be readable and easy to follow rather than hyper-optimized for production performance. 

To follow the tutorial, you should be comfortable writing C code, understand how pointers and dynamic memory allocation work, and be familiar with the C Standard Library.

# The data: `nml_matrix`

The first step in our journey is modeling the core entity of linear algebra: the matrix. In C, we achieve this by defining a `struct` named `nml_mat`. This structure will encapsulate both the dimensions of the matrix and the actual numerical data.

```c
typedef struct nml_mat_s {
  unsigned int num_rows;
  unsigned int num_cols;
  double **data;
  int is_square;
} nml_mat;
```

## Breakdown of the Structure
The properties of this `struct` are designed to be intuitive:
* **`num_rows` & `num_cols`**: These represent the vertical and horizontal dimensions. Note that $0$ is not a valid dimension for our purposes; a matrix must have at least one element.
* **`data`**: A pointer-to-a-pointer (`double **`) used to create a 2D array structure. This allows us to access elements using the familiar `matrix->data[i][j]` syntax.
* **`is_square`**: A simple integer acting as a boolean flag. It is set to $1$ if `num_rows == num_cols`, allowing us to quickly skip non-square matrices for algorithms like LUP decomposition or determinant calculation.

## A Note on Memory Layout
From a high-performance computing perspective, it is often superior to store matrix elements in a single contiguous block of memory (`double *`). This improves **cache locality** and simplifies memory management. In that scenario, you would map 2D coordinates to a 1D index using the formula:

<div class="mp mpc">
\[ 
\text{index} = i \cdot \text{num\_cols} + j 
\]
</div>

To dive deeper into linear storage, you can check out this [StackOverflow discussion](https://stackoverflow.com/questions/14015556/how-to-map-the-indexes-of-a-matrix-to-a-1-dimensional-array-c) or the Wikipedia article on [Row-major order](https://en.wikipedia.org/wiki/Row-_and_column-major_order).

However, we are opting for the `double **` approach. While slightly more fragmented in memory, it is significantly easier to implement and read for educational purposes. 

# Allocating / De-allocating memory for the `nml_mat` matrix

Unlike "higher-level" languages like Java or Python that feature automatic garbage collection, C requires manual memory management. You must explicitly request memory from the heap and, crucially, release it once it is no longer needed. 

In C development, a golden rule to live by is: **"Every allocation must have its corresponding de-allocation."** To manage this for our `nml_mat` structure, we will implement "constructor-like" and "destructor-like" functions.

```c
// Constructor: Allocates a new matrix on the heap
// All elements are initialized to 0.0
nml_mat *nml_mat_new(unsigned int num_rows, unsigned int num_cols);

// Destructor: Safely releases all memory associated with the matrix
void nml_mat_free(nml_mat *matrix);
```

## Implementation: `nml_mat_new()`

We use `calloc()` instead of `malloc()` because it automatically zeroes out the allocated memory, ensuring our matrix starts with a clean state of `0.0` values.

```c
nml_mat *nml_mat_new(unsigned int num_rows, unsigned int num_cols) {
  if (num_rows == 0 || num_cols == 0) {
    NML_ERROR(INVALID_DIMENSIONS);
    return NULL;
  }

  // 1. Allocate the container struct
  nml_mat *m = calloc(1, sizeof(*m));
  NP_CHECK(m);

  m->num_rows = num_rows;
  m->num_cols = num_cols;
  m->is_square = (num_rows == num_cols) ? 1 : 0;

  // 2. Allocate the array of row pointers
  m->data = calloc(m->num_rows, sizeof(*m->data));
  NP_CHECK(m->data);

  // 3. Allocate each individual row
  for(int i = 0; i < m->num_rows; ++i) {
    m->data[i] = calloc(m->num_cols, sizeof(**m->data));
    NP_CHECK(m->data[i]);
  }

  return m;
}
```

**Technical Notes:**
* `NML_ERROR` and `NP_CHECK` are internal macros. `NP_CHECK` specifically validates that a pointer is not `NULL`; if the system is out of memory, it prints a trace and halts the program to prevent a segmentation fault.
* The allocation happens in a **top-down** fashion: we allocate the struct, then the row pointers, then the actual data rows.

## Implementation: `nml_mat_free()`

Because our memory allocation was multi-staged, our de-allocation must be as well. If you were to simply `free(matrix)`, you would leak the memory allocated for the rows. We must free the memory in the **exact reverse order** of its allocation:

```c
void nml_mat_free(nml_mat *matrix) {
  if (matrix == NULL) return;

  // 1. Free each individual data row
  for(int i = 0; i < matrix->num_rows; ++i) {
    free(matrix->data[i]);
  }

  // 2. Free the array of row pointers
  free(matrix->data);

  // 3. Free the container struct itself
  free(matrix);
}
```

## Expanding the API

With the core allocation logic in place, we can now build higher-level utility methods to make the library more user-friendly:

| Method | Description |
| :--- | :--- |
| `nml_mat_rnd()` | Creates a matrix populated with random values within a given range. |
| `nml_mat_sqr()` | Convenience wrapper to create a square ($N \times N$) matrix. |
| `nml_mat_eye()` | Creates an identity matrix (diagonal elements are $1.0$). |
| `nml_mat_cp()`  | Deep-copies the content of one matrix into a newly allocated one. |
| `nml_mat_fromfile()` | Parses a matrix structure and its values from a text file. |

## Creating a Random Matrix

Implementing a method like `nml_mat_rnd()` is straightforward once our core allocation function, `nml_mat_new()`, is ready. This function allows us to generate test data or initialize weights for algorithms that require stochastic starting points.

```c
nml_mat *nml_mat_rnd(unsigned int num_rows, unsigned int num_cols, double min, double max) {
  nml_mat *r = nml_mat_new(num_rows, num_cols);
  if (r == NULL) return NULL;

  for(int i = 0; i < num_rows; i++) {
    for(int j = 0; j < num_cols; j++) {
      r->data[i][j] = nml_rand_interval(min, max);
    }
  }
  return r;
}
```

### Generating Values within an Interval

The `min` and `max` parameters define the range for the generated elements. To achieve this, we use a helper function, `nml_rand_interval()`, which scales the raw output of the standard `rand()` function to our desired bounds.

The logic relies on normalizing the random integer into a `double` between $[0, 1)$ and then mapping it linearly to the $[min, max]$ range:

```c
// Note: Ensure you have called srand(time(NULL)) once in your main 
// to seed the random number generator.
double nml_rand_interval(double min, double max) {
  double d = (double) rand() / ((double) RAND_MAX + 1);
  return min + d * (max - min);
}
```

**Technical Tip:** We add `1` to `RAND_MAX` in the divisor to ensure the normalized value `d` is strictly less than `1.0`, preventing the function from occasionally returning the exact `max` value if the caller expects an exclusive upper bound.

## Creating a square matrix

A **square matrix** is a matrix where the number of rows equals the number of columns. These matrices are fundamental to linear algebra because only square matrices can have determinants, inverses, or eigenvalues.

For example, $A$ is a square $3 \times 3$ matrix:

<div class="mp mpc">
\[
A = \begin{bmatrix}
1.0 & 2.0 & 3.0\\
0.0 & 2.0 & 3.0\\
2.0 & 1.0 & 9.0
\end{bmatrix}
\]
</div>

While $B$ is a rectangular $2 \times 3$ matrix, and therefore is **not** square:

<div class="mp mpc">
\[
B = \begin{bmatrix}
1.0 & 2.0 & 3.0\\
0.0 & 2.0 & 3.0
\end{bmatrix}
\]
</div>

Implementing a constructor for square matrices is simple. We just call our existing `nml_mat_new()` function and pass the same value for both `rows` and `cols`:

```c
nml_mat *nml_mat_sqr(unsigned int size) {
  // We utilize the same size for both dimensions
  return nml_mat_new(size, size);
}
```

Similarly, we can provide a convenience method for generating a random square matrix by wrapping our `nml_mat_rnd()` function:

```c
nml_mat *nml_mat_sqr_rnd(unsigned int size, double min, double max) {
  return nml_mat_rnd(size, size, min, max);
} 
```

**Note:** When these functions call `nml_mat_new()`, the `is_square` flag in our struct is automatically set to $1$, allowing subsequent algorithms (like LU decomposition) to instantly verify that the matrix is valid for square-only operations.

## Creating an identity matrix

An identity matrix $I_n$ is a square ($n \times n$) matrix where all elements on the main diagonal are $1.0$, and all other elements are $0.0$:

<div class="mp mpc">
\[ 
I_n = \begin{bmatrix}
1 & 0 & 0 & \cdots & 0 \\
0 & 1 & 0 & \cdots & 0 \\
0 & 0 & 1 & \cdots & 0 \\
\vdots & \vdots & \vdots & \ddots & \vdots \\
0 & 0 & 0 & \cdots & 1
\end{bmatrix}
\]
</div>

The identity matrix acts as the "1" of the matrix world. Its most critical property is that any square matrix multiplied by its inverse results in the identity matrix: 

<div class="mp mpc">
\[ A^{-1} A = A A^{-1} = I \]
</div>

From a programming perspective, the main diagonal is the series of elements where the row index $i$ and the column index $j$ are equal ($i == j$). This allows us to populate the matrix using a single loop rather than nested loops, making the implementation very efficient.

```c
nml_mat *nml_mat_eye(unsigned int size) {
  nml_mat *r = nml_mat_new(size, size);
  if (r == NULL) return NULL;

  for(int i = 0; i < r->num_rows; i++) {
    // Only set the diagonal elements where i == j
    r->data[i][i] = 1.0;
  }
  return r;
}
```

If you are wondering why this method is commonly named `eye()` in libraries like NumPy or MATLAB, it is a playful pun on the word "Identity" (I) sounding like "Eye." You can read more about the history of this naming convention in this [Math Exchange post](https://math.stackexchange.com/questions/3028394/what-is-the-motivation-behind-naming-identity-matrix-as-eye/3028999).

## Creating a matrix from a `FILE`

Setting matrix elements manually in code is tedious and error-prone. Instead of hardcoding values like this:

```c
nml_mat *m = nml_mat_new(3, 1);
m->data[0][0] = 1.0;
m->data[1][0] = 2.0;
m->data[2][0] = 4.0;
```

It is far more practical to let your library users load data from external text files. This makes your programs more flexible and easier to debug.

### Input File Format
To keep the parsing logic simple, we expect the input file to follow a specific structure. The first two values represent the matrix dimensions, followed by the actual elements:

`matrix01.data`
```text
4 5
0.0     1.0     2.0     5.0     3.0
3.0     8.0     9.0     1.0     4.0
2.0     3.0     7.0     1.0     1.0
0.0     0.0     4.0     3.0     8.0
```

* **Header**: The first row `4 5` indicates 4 rows and 5 columns.
* **Body**: The subsequent rows contain the 20 elements (4 * 5) of the matrix.

### Implementation
We use `fscanf()` to read formatted data from the file stream. The function first parses the dimensions, allocates the necessary memory using `nml_mat_new()`, and then fills the grid.

```c
nml_mat *nml_mat_fromfilef(FILE *f) {
  unsigned int num_rows = 0, num_cols = 0;

  // 1. Read dimensions from the first line
  if (fscanf(f, "%u %u", &num_rows, &num_cols) != 2) {
    NML_ERROR(CANNOT_READ_HEADER);
    return NULL;
  }

  // 2. Allocate the matrix
  nml_mat *r = nml_mat_new(num_rows, num_cols);
  if (r == NULL) return NULL;

  // 3. Populate elements
  for(int i = 0; i < r->num_rows; i++) {
    for(int j = 0; j < r->num_cols; j++) {
      if (fscanf(f, "%lf", &r->data[i][j]) != 1) {
        NML_FERROR(CANNOT_READ_ELEMENT, i, j);
        nml_mat_free(r);
        return NULL;
      }
    }
  }
  return r;
} 
```

**Technical Details:**
* **`fscanf(f, "%u %u", ...)`**: Captures the row and column counts.
* **`fscanf(f, "%lf", ...)`**: Reads each floating-point value. The `\t` in the format string isn't strictly necessary as `%lf` automatically skips any whitespace (spaces, tabs, or newlines).

**Pro Tip:** Because this function accepts a `FILE *` pointer, you can use it to read interactive user input from the terminal by passing the standard input stream:

```c
nml_mat *user_matrix = nml_mat_fromfilef(stdin);
```

# Matrix methods

## Checking for equality

A robust library needs a way to compare two matrices. For two matrices to be considered equal, they must satisfy two conditions:
1. They must have identical dimensions ($M \times N$).
2. Every corresponding element must be equal.

In numerical computing, however, checking for exact equality with `==` is dangerous due to floating-point precision errors. Calculations that should mathematically result in $0.5$ might result in $0.5000000000000001$. Therefore, we implement an "almost equal" check using a **tolerance** (often called *epsilon*).

### Implementation

The process is straightforward: we first verify the dimensions, then iterate through the elements. If any pair of elements differs by more than the specified tolerance, the matrices are not equal.

```c
// Checks if two matrices have the same dimensions
int nml_mat_eqdim(nml_mat *m1, nml_mat *m2) {
  return (m1->num_cols == m2->num_cols) &&
         (m1->num_rows == m2->num_rows);
}

// Checks if two matrices are equal within a given tolerance.
// For exact binary equality, set tolerance to 0.0.
int nml_mat_eq(nml_mat *m1, nml_mat *m2, double tolerance) {
  if (!nml_mat_eqdim(m1, m2)) {
    return 0;
  }

  for(int i = 0; i < m1->num_rows; i++) {
    for(int j = 0; j < m1->num_cols; j++) {
      // We check if the absolute difference is within the acceptable range
      if (fabs(m1->data[i][j] - m2->data[i][j]) > tolerance) {
        return 0;
      }
    }
  }
  return 1;
}
```

**Technical Note:**
We use [`fabs(x)`](https://www.cplusplus.com/reference/cmath/fabs/) from `math.h` to get the absolute value ($|x|$) of the difference. This ensures that the comparison works correctly regardless of which element is larger.

## Printing the matrix

Visualizing the data is essential for debugging and verifying the results of your calculations. 

While it might seem *trivial*, implementing a flexible print function allows you to control the precision and spacing of the output.

We use `fprintf()` to output the matrix to `stdout`. To make the library more robust, we provide two versions: a simple one-click print and a more advanced version that accepts a custom format string (e.g., to limit decimal places).

```c
// Standard print with default formatting (2 tabs for spacing)
void nml_mat_print(nml_mat *matrix) {
  nml_mat_printf(matrix, "%lf\t\t");
}

// Prints the matrix on the stdout with custom element formatting
void nml_mat_printf(nml_mat *matrix, const char *d_fmt) {
  if (matrix == NULL) {
    fprintf(stdout, "Matrix is NULL\n");
    return;
  }

  fprintf(stdout, "\n");
  for(int i = 0; i < matrix->num_rows; ++i) {
    for(int j = 0; j < matrix->num_cols; ++j) {
      fprintf(stdout, d_fmt, matrix->data[i][j]);
    }
    // Newline at the end of each row
    fprintf(stdout, "\n");
  }
  fprintf(stdout, "\n");
} 
```

**Why use a format string?**
By using the `nml_mat_printf` version, you can control how the `double` values are displayed. For example, if you want to see only two decimal places to keep the output clean, you can call:

```c
nml_mat_printf(my_matrix, "%7.2f ");
```

This will reserve 7 spaces for the number and show 2 decimal places, ensuring that even with large matrices, your columns stay perfectly aligned in the terminal.

## Accessing and modifying matrix elements

### Retrieving / Selecting a column

Many advanced numerical analysis algorithms, such as **QR Decomposition** or **Gram-Schmidt Orthonormalization**, operate primarily on columns rather than rows. Because our matrix is stored as an array of row pointers (`double **`), retrieving a column is not as simple as a `memcpy()`. We need to manually iterate through each row to "pluck" the element at the desired index.

We define this method to return a new $M \times 1$ column matrix:

<div class="mp mpc">
\[
\text{nml\_mat\_col\_get} \left(
\begin{bmatrix}
1.0 & 2.0 & 3.0\\
0.0 & 2.0 & 3.0\\
2.0 & 1.0 & 9.0
\end{bmatrix}
, 1 \right) =
\begin{bmatrix}
2.0\\
2.0\\
1.0
\end{bmatrix}
\]
</div>

The function validates the requested index, allocates a new column matrix, and performs the extraction:

```c
nml_mat *nml_mat_col_get(nml_mat *m, unsigned int col) {
  if (col >= m->num_cols) {
    NML_FERROR(CANNOT_GET_COLUMN, col, m->num_cols);
    return NULL;
  }

  // Create a new matrix with M rows and 1 column
  nml_mat *r = nml_mat_new(m->num_rows, 1);
  if (r == NULL) return NULL;

  for(int i = 0; i < m->num_rows; i++) {
    // We navigate to each row i and take the element at index 'col'
    r->data[i][0] = m->data[i][col];
  }

  return r;
} 
```

**Technical Observations:**
* **Memory Allocation**: The resulting matrix is an entirely new structure. This means the user is responsible for calling `nml_mat_free()` on the returned column when they are finished with it.
* **Access Pattern**: Because we are jumping between different rows in memory to find the column elements, this operation is less "cache-friendly" than row access. However, it is an essential trade-off for the algorithms we will implement later.

### Retrieving / Selecting a row

To maintain a consistent API, we provide a method for row retrieval that mirrors our column selection tool. This method extracts a specific row and returns it as a new $1 \times N$ row matrix.

<div class="mp mpc">
\[
\text{nml\_mat\_row\_get} \left(
\begin{bmatrix}
1.0 & 2.0 & 3.0\\
0.0 & 2.0 & 3.0\\
2.0 & 1.0 & 9.0
\end{bmatrix}
, 1 \right) =
\begin{bmatrix}
0.0 & 2.0 & 3.0
\end{bmatrix}
\]
</div>

While column retrieval requires a manual loop, row retrieval is significantly more efficient in our library. Because we store each row as a contiguous block of memory, we can skip the loop and use the standard C library function `memcpy()` to perform a high-speed memory copy.

```c
nml_mat *nml_mat_row_get(nml_mat *m, unsigned int row) {
  if (row >= m->num_rows) {
    NML_FERROR(CANNOT_GET_ROW, row, m->num_rows);
    return NULL;
  }

  // Create a new matrix with 1 row and N columns
  nml_mat *r = nml_mat_new(1, m->num_cols);
  if (r == NULL) return NULL;

  // Since row data is contiguous, we copy the entire block at once
  memcpy(r->data[0], m->data[row], m->num_cols * sizeof(*r->data[0]));

  return r;
} 
```

**Technical Insight:**
* **Contiguous Memory:** In our `double **` implementation, each `m->data[row]` points to a distinct, unbroken array of `double` values. This is why `memcpy` works here but not for columns.
* **Performance:** `memcpy()` is heavily optimized at the CPU level (often using SIMD instructions), making `nml_mat_row_get` substantially faster than `nml_mat_col_get`.
* **Deep Copy:** Like the column selection, this creates a **new** matrix. Changes to the retrieved row will not affect the original matrix, and you must remember to free the result.

### Setting values

The most direct way to modify a matrix is to access the `data` field of the `nml_mat` struct. Because of our `double **` implementation, you can use standard array indexing to target a specific intersection of row $i$ and column $j$:

```c
nml_mat *m = ...;
m->data[i][j] = 2.0; 
```

While direct access is powerful, providing higher-level helper methods makes the library code much cleaner, especially when initializing matrices or resetting states.

To populate an entire matrix with a single constant, useful for initializing a "zero" or "one" matrix, we implement a nested loop that visits every coordinate:

```c
// Sets all elements of a matrix to a given value
void nml_mat_all_set(nml_mat *matrix, double value) {
  for(int i = 0; i < matrix->num_rows; i++) {
    for(int j = 0; j < matrix->num_cols; j++) {
      matrix->data[i][j] = value;
    }
  }
}
```

Setting the main diagonal is a common operation (e.g., creating a scalar matrix). This method is restricted to square matrices; attempting to set the diagonal of a rectangular matrix would be mathematically ambiguous and could lead to out-of-bounds access.

```c
// Sets all elements on the main diagonal to a given value
int nml_mat_diag_set(nml_mat *m, double value) {
  if (!m->is_square) {
    NML_FERROR(CANNOT_SET_DIAG, value);
    return 0;
  }
  for(int i = 0; i < m->num_rows; i++) {
    // We only need one index as i == j on the diagonal
    m->data[i][i] = value;
  }
  return 1;
} 
```

**Implementation Detail:** Notice that `nml_mat_diag_set` uses a single loop. Since we are targeting the diagonal where the row index equals the column index ($i = j$), we only need $O(n)$ operations rather than the $O(n^2)$ required for a full matrix sweep.

### Multiplying a row with a scalar

Multiplying a specific row by a scalar is a fundamental **elementary row operation**. It is a prerequisite for algorithms like **Gaussian Elimination** and **LUP Decomposition**, where we often need to scale a row so that its leading entry (the pivot) becomes $1.0$.



#### In-Place Modification (`_r`)
We define our primary method with an `_r` suffix. In this library's convention, `_r` stands for **reference**, indicating that the function modifies the input matrix directly rather than creating a copy. This is highly efficient as it avoids unnecessary memory allocation.

<div class="mp mpc">
\[
\text{nml\_mat\_row\_mult\_r} \left(
\begin{bmatrix}
1.0 & 2.0 & 3.0\\
0.0 & 2.0 & 3.0\\
2.0 & 1.0 & 9.0
\end{bmatrix}
, 1, 2.0 \right) =
\begin{bmatrix}
1.0 & 2.0 & 3.0\\
\mathbf{0.0} & \mathbf{4.0} & \mathbf{6.0}\\
2.0 & 1.0 & 9.0
\end{bmatrix}
\]
</div>

The implementation iterates through every element in the specified row:

```c
int nml_mat_row_mult_r(nml_mat *m, unsigned int row, double num) {
  if (row >= m->num_rows) {
    NML_FERROR(CANNOT_ROW_MULTIPLY, row, m->num_rows);
    return 0;
  }

  for(int i = 0; i < m->num_cols; i++) {
    // Modify the row element-by-element
    m->data[row][i] *= num;
  }
  return 1;
}
```

#### Functional Alternative (Copy)
Sometimes you may want to preserve the original matrix. For these cases, we provide a version without the `_r` suffix. It creates a deep copy of the matrix first and then applies the transformation to that copy.

```c
nml_mat *nml_mat_row_mult(nml_mat *m, unsigned int row, double num) {
  // 1. Create a deep copy of the original
  nml_mat *r = nml_mat_cp(m);
  if (r == NULL) return NULL;

  // 2. Apply the in-place logic to the copy
  if (!nml_mat_row_mult_r(r, row, num)) {
    nml_mat_free(r);
    return NULL;
  }
  return r;
} 
```

**Technical Insight:**
This "Wrapper" pattern (calling the reference function inside the copy function) is a common design in C. it ensures that the core logic is only written once, reducing the chance of bugs across the two different API styles.

### Multiplying a column with a scalar

While row operations are more frequent in standard Gaussian elimination, multiplying a column by a scalar is equally important for various matrix transformations and normalization procedures.

Just as with rows, we provide two implementations: one that modifies the matrix **in-place** (by reference) for performance, and one that returns a **deep copy** to maintain immutability.

<div class="mp mpc">
\[
\text{nml\_mat\_col\_mult\_r} \left(
\begin{bmatrix}
1.0 & 2.0 & 3.0\\
0.0 & 2.0 & 3.0\\
2.0 & 1.0 & 9.0
\end{bmatrix}
, 0, 2.0 \right) =
\begin{bmatrix}
\mathbf{2.0} & 2.0 & 3.0\\
\mathbf{0.0} & 2.0 & 3.0\\
\mathbf{4.0} & 1.0 & 9.0
\end{bmatrix}
\]
</div>

The logic mirrors the row multiplication, but with a critical difference in how memory is accessed. Since columns are not contiguous in a row-major `double **` structure, we iterate through each row `i` at a fixed column index `col`.

```c
// Functional version: Returns a new matrix
nml_mat *nml_mat_col_mult(nml_mat *m, unsigned int col, double num) {
  nml_mat *r = nml_mat_cp(m);
  if (r == NULL) return NULL;

  if (!nml_mat_col_mult_r(r, col, num)) {
    nml_mat_free(r);
    return NULL;
  }
  return r;
}

// Reference version: Modifies m in-place
int nml_mat_col_mult_r(nml_mat *m, unsigned int col, double num) {
  if (col >= m->num_cols) {
    NML_FERROR(CANNOT_COL_MULTIPLY, col, m->num_cols);
    return 0;
  }

  for(int i = 0; i < m->num_rows; i++) {
    // Accessing column elements requires jumping through row pointers
    m->data[i][col] *= num;
  }
  return 1;
} 
```

**Technical Observation: Cache Locality**
Notice that `nml_mat_col_mult_r` is generally slower than `nml_mat_row_mult_r`. In the row version, the CPU reads contiguous memory addresses. In this column version, each iteration of the loop accesses a different pointer in `m->data`, which can lead to more "cache misses." While negligible for small matrices, this is a core reason why many high-performance libraries favor one specific storage order (Row-major vs Column-major).

### Adding two rows

The ability to add a multiple of one row to another is an important **elementary row operation**. It is the primary engine behind **Gaussian Elimination**, allowing us to create zeros below a pivot point to reach **Row Echelon Form**.

To make this versatile, we don't just add two rows; we add a row multiplied by a scalar (the `multiplier`) to a target row (the `where` index).

In this example, we take $Row_1$, multiply it by $0.5$, and add the result to $Row_0$.

<div class="mp mpc">
\[
\text{nml\_mat\_row\_addrow\_r} \left(
\begin{bmatrix}
1.0 & 2.0 & 3.0\\
0.0 & 2.0 & 4.0\\
2.0 & 1.0 & 9.0
\end{bmatrix}
, 0, 1, 0.5 \right) =
\]
\[
\begin{bmatrix}
1.0 + (0.0 \cdot 0.5) & 2.0 + (2.0 \cdot 0.5) & 3.0 + (4.0 \cdot 0.5)\\
0.0 & 2.0 & 4.0\\
2.0 & 1.0 & 9.0
\end{bmatrix}
=
\begin{bmatrix}
1.0 & 3.0 & 5.0\\
0.0 & 2.0 & 4.0\\
2.0 & 1.0 & 9.0
\end{bmatrix}
\]
</div>

We provide both the in-place reference version (`_r`) and the functional version that returns a copy.

```c
// Reference version: Modifies the target row in matrix 'm' directly
int nml_mat_row_addrow_r(nml_mat *m, unsigned int where, unsigned int row, double multiplier) {
  if (where >= m->num_rows || row >= m->num_rows) {
    NML_FERROR(CANNOT_ADD_TO_ROW, multiplier, row, where, m->num_rows);
    return 0;
  }

  for(int i = 0; i < m->num_cols; i++) {
    // TargetRow[i] = TargetRow[i] + (multiplier * SourceRow[i])
    m->data[where][i] += multiplier * m->data[row][i];
  }
  return 1;
}

// Functional version: Returns a new matrix with the transformation applied
nml_mat *nml_mat_row_addrow(nml_mat *m, unsigned int where, unsigned int row, double multiplier) {
  nml_mat *r = nml_mat_cp(m);
  if (r == NULL) return NULL;

  if (!nml_mat_row_addrow_r(r, where, row, multiplier)) {
    nml_mat_free(r);
    return NULL;
  }
  return r;
}
```

**Key Notes:**
* **Simplicity**: If you only need to add two rows without scaling, simply pass `1.0` as the `multiplier`. If you need to subtract, pass `-1.0`.
* **Logic**: Notice the specific access: `m->data[where][i] += multiplier * m->data[row][i]`. We iterate over the columns `i` while the row indices remain fixed.
* **Safety**: We always validate that both `where` and `row` indices are within the matrix bounds to prevent memory corruption.

### Multiplying the matrix with a scalar

Scalar multiplication is the process of multiplying every single entry in a matrix by a constant number (the scalar). Geometrically, this operation "scales" the matrix without changing its structure, for example, doubling every value or flipping the sign of all elements.



[Image of scalar multiplication of a matrix]


The mathematical definition is straightforward:

<div class="mp mpc">
\[
s \cdot \begin{bmatrix}
a_{11} & a_{12} & \cdots & a_{1n}\\
a_{21} & a_{22} & \cdots & a_{2n}\\
\vdots & \vdots & \ddots & \vdots \\
a_{m1} & a_{m2} & \cdots & a_{mn}
\end{bmatrix}
=
\begin{bmatrix}
s \cdot a_{11} & s \cdot a_{12} & \cdots & s \cdot a_{1n}\\
s \cdot a_{21} & s \cdot a_{22} & \cdots & s \cdot a_{2n}\\
\vdots & \vdots & \ddots & \vdots \\
s \cdot a_{m1} & s \cdot a_{m2} & \cdots & s \cdot a_{mn}
\end{bmatrix}
\]
</div>

Just like the mathematical formula, the code requires a nested loop to visit every element. Following our library's design pattern, we provide an in-place version (`_r`) and a version that returns a copy.

```c
// Reference version: Modifies the original matrix in-place
int nml_mat_smult_r(nml_mat *m, double num) {
  if (m == NULL) return 0;
  
  for(int i = 0; i < m->num_rows; i++) {
    for(int j = 0; j < m->num_cols; j++) {
      // Scale each individual element
      m->data[i][j] *= num;
    }
  }
  return 1;
}

// Functional version: Returns a new scaled matrix
nml_mat *nml_mat_smult(nml_mat *m, double num) {
  nml_mat *r = nml_mat_cp(m);
  if (r == NULL) return NULL;

  nml_mat_smult_r(r, num);
  return r;
}
```

**Technical Detail:** The operation $m_{ij} \leftarrow s \cdot m_{ij}$ has a time complexity of $O(m \cdot n)$, where $m$ and $n$ are the dimensions of the matrix. Since our data is stored in row-major order, the nested loop `i` then `j` is the most cache-efficient way to traverse the memory.

# Modifying the `nml_mat` internal structure

While arithmetic operations are the core of linear algebra, a robust library must also allow for structural manipulations. The next set of functionalities helps users "reshape" their matrices by adding or removing dimensions and rearranging data:

* **Removing** columns and rows to create sub-matrices.
* **Swapping** rows and columns (crucial for pivoting in LUP decomposition).
* **Concatenating** matrices horizontally or vertically.

## Removing a column

Removing a column from an $n \times m$ matrix results in the creation of a new $n \times (m-1)$ matrix. This is a non-destructive operation; we leave the original matrix intact and return a fresh allocation.

For this specific use case, creating an "in-place" (`_r`) version would be inefficient and complex due to the way memory is structured in C (specifically with pointers to pointers), so we stick to returning a new matrix.

<div class="mp mpc">
\[
\text{nml\_mat\_col\_rem} \left(
\begin{bmatrix}
1.0 & 2.0 & 3.0\\
0.0 & 2.0 & 4.0\\
2.0 & 1.0 & 9.0
\end{bmatrix}
, 1 \right) =
\begin{bmatrix}
1.0 & 3.0\\
0.0 & 4.0\\
2.0 & 9.0
\end{bmatrix}
\]
</div>

The logic relies on a "desynchronized index." We iterate through the original columns $j$, but only increment the destination column index $k$ when we aren't at the index targeted for removal.

```c
nml_mat *nml_mat_col_rem(nml_mat *m, unsigned int column) {
  if(column >= m->num_cols) {
    NML_FERROR(CANNOT_REMOVE_COLUMN, column, m->num_cols);
    return NULL;
  }

  // The new matrix has one less column
  nml_mat *r = nml_mat_new(m->num_rows, m->num_cols - 1);
  if (r == NULL) return NULL;

  for(int i = 0; i < m->num_rows; i++) {
    for(int j = 0, k = 0; j < m->num_cols; j++) {
      // Skip the column targeted for removal
      if (column != j) {
        // k only increments when we actually copy data
        r->data[i][k++] = m->data[i][j];
      }
    }
  }
  return r;
}
```

**Technical Observations:**
* **Dimension Shift**: The resulting matrix `r` correctly reflects the reduced width: `r->num_cols = m->num_cols - 1`.
* **The Index Gap**: We use a secondary index `k`. As soon as the loop hits the `column` index, $j$ continues to increment while $k$ stays behind. From that point on, $j - k = 1$, effectively "sliding" all subsequent data one position to the left.
* **Memory**: Remember that because this function calls `nml_mat_new`, you are responsible for freeing the memory of the resulting matrix.
    
## Removing a row

Removing a row from an $n \times m$ matrix results in a new matrix with dimensions $(n-1) \times m$. Similar to column removal, this operation returns a new allocation, leaving the original matrix unmodified.

The method signature is:

```c
nml_mat *nml_mat_row_rem(nml_mat *m, unsigned int row);
```

<div class="mp mpc">
\[
\text{nml\_mat\_row\_rem} \left(
\begin{bmatrix}
1.0 & 2.0 & 3.0\\
0.0 & 2.0 & 4.0\\
2.0 & 1.0 & 9.0
\end{bmatrix}
, 1 \right) =
\begin{bmatrix}
1.0 & 2.0 & 3.0\\
2.0 & 1.0 & 9.0
\end{bmatrix}
\]
</div>

The logic follows a "skip-and-copy" pattern. We iterate through the source rows $i$ and use a separate index $k$ to track the destination rows in the new matrix.

```c 
nml_mat *nml_mat_row_rem(nml_mat *m, unsigned int row) {
  if (row >= m->num_rows) {
    NML_FERROR(CANNOT_REMOVE_ROW, row, m->num_rows);
    return NULL;
  }

  // The new matrix has one less row
  nml_mat *r = nml_mat_new(m->num_rows - 1, m->num_cols);
  if (r == NULL) return NULL;

  for(int i = 0, k = 0; i < m->num_rows; i++) {
    // If this is the row we want to keep, copy it
    if (row != i) {
      for(int j = 0; j < m->num_cols; j++) {
        r->data[k][j] = m->data[i][j];
      }
      // Increment destination index only after a successful copy
      k++;
    }
  }
  return r;
}
```

**Technical Observations:**
* **Index Synchronization**: Initially, $k$ and $i$ are identical. Once the loop encounters the target `row`, $i$ increments but $k$ does not. This effectively "pulls" all subsequent rows up by one position.
* **Row-Major Efficiency**: Unlike column removal, where we had to jump across memory to pluck elements, here we are copying entire rows. While the code above uses a nested loop for clarity, this could also be implemented using `memcpy(r->data[k], m->data[i], ...)` for even better performance.
* **API Consistency**: This function returns a pointer to a new `nml_mat`, maintaining the functional programming style used throughout the structural modification section of the library.

## Swapping Rows

Row swapping is a fundamental operation in numerical linear algebra. It is the core of **partial pivoting**, a technique used in **LU Decomposition** and **Gaussian Elimination** to avoid dividing by zero and to reduce numerical instability.

<div class="mp mpc">
\[
\text{nml\_mat\_row\_swap\_r} \left(
\begin{bmatrix}
1.0 & 2.0 & 3.0\\
0.0 & 2.0 & 4.0\\
2.0 & 1.0 & 9.0
\end{bmatrix}
, 0, 1 \right) =
\begin{bmatrix}
0.0 & 2.0 & 4.0\\
1.0 & 2.0 & 3.0\\
2.0 & 1.0 & 9.0
\end{bmatrix}
\]
</div>

Following our established API pattern, we provide two versions:

```c
// Returns a new matrix with row1 and row2 swapped
nml_mat *nml_mat_row_swap(nml_mat *m, unsigned int row1, unsigned int row2);

// Modifies the existing matrix m by swapping row1 and row2 in-place
int nml_mat_row_swap_r(nml_mat *m, unsigned int row1, unsigned int row2);
```

Because we implemented our matrix as an array of pointers to rows (`double **`), swapping two rows is incredibly efficient. We don't actually need to copy the numerical data within the rows. Instead, we simply swap the **pointers** themselves. 

This turns an operation that would normally take $O(n)$ time into a constant time $O(1)$ operation.

```c
int nml_mat_row_swap_r(nml_mat *m, unsigned int row1, unsigned int row2) {
  if (row1 >= m->num_rows || row2 >= m->num_rows) {
    NML_FERROR(CANNOT_SWAP_ROWS, row1, row2, m->num_rows);
    return 0;
  }
  
  // We only swap the pointers, not the data they point to!
  double *tmp = m->data[row2];
  m->data[row2] = m->data[row1];
  m->data[row1] = tmp;
  
  return 1;
} 
```

The functional version simply copies the matrix and then applies the pointer swap to the copy:

```c
nml_mat *nml_mat_row_swap(nml_mat *m, unsigned int row1, unsigned int row2) {
  nml_mat *r = nml_mat_cp(m);
  if (r == NULL) return NULL;

  if (!nml_mat_row_swap_r(r, row1, row2)) {
    nml_mat_free(r);
    return NULL;
  }
  return r;
} 
```

**Technical Insight:** This efficiency is a direct benefit of our "controversial" decision to use `double **`. In a flat-array storage model (`double *`), swapping rows would require a buffer and a full `memcpy` of the data, which is much more taxing on the CPU for large matrices.

## Swapping Columns

While not as frequently used in standard decomposition algorithms as row swapping, column swapping is an essential tool for a complete matrix API. It is often required in "full pivoting" strategies to ensure the highest possible numerical precision.


<div class="mp mpc">
\[
\text{nml\_mat\_col\_swap\_r} \left(
\begin{bmatrix}
1.0 & 2.0 & 3.0\\
0.0 & 2.0 & 4.0\\
2.0 & 1.0 & 9.0
\end{bmatrix}
, 0, 1 \right) =
\begin{bmatrix}
2.0 & 1.0 & 3.0\\
2.0 & 0.0 & 4.0\\
1.0 & 2.0 & 9.0
\end{bmatrix}
\]
</div>

We provide the same dual-method interface:

```c
// Returns a new matrix with col1 and col2 swapped
nml_mat *nml_mat_col_swap(nml_mat *m, unsigned int col1, unsigned int col2);

// Modifies the existing matrix m by swapping col1 and col2 in-place
int nml_mat_col_swap_r(nml_mat *m, unsigned int col1, unsigned int col2); 
```

Unlike row swapping, where we could simply swap two pointers in constant time, swapping columns is significantly more expensive. Because our matrix is stored in **row-major order**, the elements of a column are scattered across different memory locations. We must visit every row and manually swap the values at the specified column indices.

```c
int nml_mat_col_swap_r(nml_mat *m, unsigned int col1, unsigned int col2) {
  if (col1 >= m->num_cols || col2 >= m->num_cols) {
    NML_FERROR(CANNOT_SWAP_COLUMNS, col1, col2, m->num_cols);
    return 0;
  }

  double tmp;
  for(int i = 0; i < m->num_rows; i++) {
    // We must physically swap the values for every row
    tmp = m->data[i][col1];
    m->data[i][col1] = m->data[i][col2];
    m->data[i][col2] = tmp;
  }
  return 1;
} 
```

The functional version follows our standard "copy-then-modify" pattern:

```c
nml_mat *nml_mat_col_swap(nml_mat *m, unsigned int col1, unsigned int col2) {
  nml_mat *r = nml_mat_cp(m);
  if (r == NULL) return NULL;

  if (!nml_mat_col_swap_r(r, col1, col2)) {
    nml_mat_free(r);
    return NULL;
  }
  return r;
} 
```

**Technical Insight:** This operation has a time complexity of $O(m)$, where $m$ is the number of rows. In contrast, our row swap was $O(1)$. This is a great example of how your choice of data structure (pointers to rows) directly impacts the performance profile of different operations.

## Vertical Concatenation of multiple matrices

While stacking matrices might seem like a simple utility, it is incredibly useful in data science and numerical analysis; for instance, when augmenting a coefficient matrix with an identity matrix to find an inverse or when combining datasets.

<div class="mp mpc">
\[
A= \begin{bmatrix} 1 & 2 & 3 \\ 0 & 2 & 4 \\ 2 & 1 & 9 \end{bmatrix}, \quad
B= \begin{bmatrix} 4 & 0 & 9 \end{bmatrix}, \quad
C= \begin{bmatrix} 3 & -1 & 1 \\ 2 & 0 & -5 \end{bmatrix}
\]
\[
\text{Result} = \begin{bmatrix} 
1.0 & 2.0 & 3.0 \\ 0.0 & 2.0 & 4.0 \\ 2.0 & 1.0 & 9.0 \\ \hline 
4.0 & 0.0 & 9.0 \\ \hline 
3.0 & -1.0 & 1.0 \\ 2.0 & 0.0 & -5.0 
\end{bmatrix}
\]
</div>

We want to write a function that takes an array of matrices (`nml_mat **`) and stacks them on top of each other. For this to be mathematically valid, all input matrices **must have the same number of columns**.

```c
nml_mat *nml_mat_catv(unsigned int mnum, nml_mat **marr); 
```

* **`mnum`**: The total number of matrices to concatenate.
* **`marr`**: An array of pointers to the matrices we want to stack.

If we have three matrices $A$, $B$, and $C$, calling `nml_mat_catv(3, [A, B, C])` stacks them vertically:

The logic involves calculating the total required rows, validating the column widths, and then carefully mapping the elements from the source matrices into the new, larger structure.

```c
nml_mat *nml_mat_catv(unsigned int mnum, nml_mat **marr) {
  if (0 == mnum) return NULL;
  if (1 == mnum) return nml_mat_cp(marr[0]);

  unsigned int total_rows = 0;
  unsigned int target_cols = marr[0]->num_cols;

  // 1. Validate dimensions and calculate total height
  for(unsigned int k = 0; k < mnum; k++) {
    if (NULL == marr[k]) {
      NML_FERROR(INCONSISTENT_ARRAY, k, mnum);
      return NULL;
    }
    if (target_cols != marr[k]->num_cols) {
      NML_FERROR(CANNOT_CONCATENATE_V, target_cols, marr[k]->num_cols);
      return NULL;
    }
    total_rows += marr[k]->num_rows;
  }

  // 2. Allocate the large resulting matrix
  nml_mat *r = nml_mat_new(total_rows, target_cols);
  if (r == NULL) return NULL;

  // 3. Populate the matrix
  unsigned int current_row = 0;
  for(unsigned int k = 0; k < mnum; k++) {
    for(unsigned int i = 0; i < marr[k]->num_rows; i++) {
      // We use memcpy for efficiency since rows are contiguous
      memcpy(r->data[current_row], marr[k]->data[i], target_cols * sizeof(double));
      current_row++;
    }
  }

  return r;
}
```

**Technical Observations:**
* **`total_rows`**: We sum the heights of all input matrices to define the new matrix's size.
* **Row-Major Efficiency**: Because we are stacking vertically, we can use `memcpy` to move entire rows at once. This is much faster than the element-by-element loop used for horizontal concatenation.
* **The `current_row` Tracker**: Instead of complex offset math, we use a simple counter (`current_row`) that increments every time we successfully copy a row from any of the source matrices.

## Horizontal Concatenation

While perhaps less common in core decomposition algorithms, horizontal concatenation is a vital utility for tasks like creating augmented matrices (e.g., $[A | I]$ for finding an inverse). This function takes an array of matrices and "stitches" them together side-by-side.

For horizontal concatenation to be valid, all input matrices **must have the same number of rows**.

```c
nml_mat *nml_mat_cath(unsigned int mnum, nml_mat **marr);
```

* **`mnum`**: Total number of matrices in the array.
* **`marr`**: The array of matrix pointers to be joined.

If we take a $2 \times 3$ matrix $A$ and a $2 \times 3$ matrix $B$, the horizontal concatenation $C = [A \ B]$ results in a $2 \times 6$ matrix:

<div class="mp mpc">
\[
A = \begin{bmatrix} 1.0 & 2.0 & 3.0 \\ 0.0 & 2.0 & 4.0 \end{bmatrix}, \quad
B = \begin{bmatrix} 4.0 & 0.0 & 9.0 \\ 2.0 & 1.0 & 9.0 \end{bmatrix}
\]
\[
\text{Result} = \begin{bmatrix} 
1.0 & 2.0 & 3.0 & \mathbf{4.0} & \mathbf{0.0} & \mathbf{9.0} \\ 
0.0 & 2.0 & 4.0 & \mathbf{2.0} & \mathbf{1.0} & \mathbf{9.0} 
\end{bmatrix}
\]
</div>

The logic involves verifying that the heights (rows) match, calculating the total resulting width (columns), and then populating the new matrix using an offset to switch between source matrices.

```c 
nml_mat *nml_mat_cath(unsigned int mnum, nml_mat **marr) {
  if (0 == mnum) return NULL;
  if (1 == mnum) return nml_mat_cp(marr[0]);

  unsigned int target_rows = marr[0]->num_rows;
  unsigned int total_cols = 0;

  // 1. Validate height consistency and calculate total width
  for(unsigned int i = 0; i < mnum; i++) {
    if (NULL == marr[i]) {
      NML_FERROR(INCONSISTENT_ARRAY, i, mnum);
      return NULL;
    }
    if (target_rows != marr[i]->num_rows) {
      NML_FERROR(CANNOT_CONCATENATE_H, target_rows, marr[i]->num_rows);
      return NULL;
    }
    total_cols += marr[i]->num_cols;
  }

  // 2. Allocate the resulting matrix
  nml_mat *r = nml_mat_new(target_rows, total_cols);
  if (r == NULL) return NULL;

  // 3. Copy values using a column-offset logic
  for(int i = 0; i < r->num_rows; i++) {
    int k = 0;      // Current source matrix index
    int offset = 0; // Cumulative column offset
    for(int j = 0; j < r->num_cols; j++) {
      // Check if we have exhausted the columns of the current source matrix
      if (j - offset == marr[k]->num_cols) {
        offset += marr[k]->num_cols;
        k++; // Move to the next matrix in the array
      }
      r->data[i][j] = marr[k]->data[i][j - offset];
    }
  }

  return r;
}
```

**Technical Observations:**
* **Iteration Strategy**: We iterate through the resulting matrix $r$. The inner loop manages the "hand-off" from one source matrix to the next by tracking the `offset`.
* **The `offset` Variable**: This is key to mapping the global column index $j$ back to the local column index of the source matrix $marr[k]$.
* **Safety**: This implementation ensures that even if matrices have different widths, as long as their heights match, they will be stitched correctly.

# Basic Matrix Operations

## Adding two matrices

From a mathematical perspective, adding two matrices $A$ and $B$ is only possible if they have the same dimensions. The operation is performed "element-wise," meaning you simply sum the values at the corresponding positions.

<div class="mp mpc">
\[
\begin{bmatrix}
a_{11} & a_{12} & \cdots & a_{1n}\\
a_{21} & a_{22} & \cdots & a_{2n}\\
\vdots & \vdots & \ddots & \vdots \\
a_{m1} & a_{m2} & \cdots & a_{mn}
\end{bmatrix}
+
\begin{bmatrix}
b_{11} & b_{12} & \cdots & b_{1n}\\
b_{21} & b_{22} & \cdots & b_{2n}\\
\vdots & \vdots & \ddots & \vdots \\
b_{m1} & b_{m2} & \cdots & b_{mn}
\end{bmatrix}
=
\begin{bmatrix}
a_{11} + b_{11} & a_{12} + b_{12} & \cdots & a_{1n} + b_{1n}\\
a_{21} + b_{21} & a_{21} + b_{21} & \cdots & a_{2n} + b_{2n}\\
\vdots & \vdots & \ddots & \vdots \\
a_{m1} + b_{m1} & a_{m2} + b_{m2} & \cdots & a_{mn} + b_{mn}
\end{bmatrix}
\]
</div>

The corresponding C code follows our standard pattern of providing both a functional version (returns a new matrix) and a reference version (modifies the first matrix in-place).

```c
// Functional version: Returns a new matrix r = m1 + m2
nml_mat *nml_mat_add(nml_mat *m1, nml_mat *m2) {
  nml_mat *r = nml_mat_cp(m1);
  if (r == NULL) return NULL;

  if (!nml_mat_add_r(r, m2)) {
    nml_mat_free(r);
    return NULL;
  }
  return r;
}

// Reference version: Performs m1 = m1 + m2
int nml_mat_add_r(nml_mat *m1, nml_mat *m2) {
  if (!nml_mat_eqdim(m1, m2)) {
    NML_ERROR(CANNOT_ADD);
    return 0;
  }

  for(int i = 0; i < m1->num_rows; i++) {
    for(int j = 0; j < m1->num_cols; j++) {
      m1->data[i][j] += m2->data[i][j];
    }
  }
  return 1;
}
```

## Subtracting two matrices

Subtraction follows the same logic as addition. Two matrices can be subtracted only if their dimensions are identical. Each element from $B$ is subtracted from the corresponding element in $A$.

```c
// Functional version: Returns a new matrix r = m1 - m2
nml_mat *nml_mat_sub(nml_mat *m1, nml_mat *m2) {
  nml_mat *r = nml_mat_cp(m1);
  if (r == NULL) return NULL;

  if (!nml_mat_sub_r(r, m2)) {
    nml_mat_free(r);
    return NULL;
  }
  return r;
}

// Reference version: Performs m1 = m1 - m2
int nml_mat_sub_r(nml_mat *m1, nml_mat *m2) {
  if (!nml_mat_eqdim(m1, m2)) {
    NML_ERROR(CANNOT_SUBTRACT);
    return 0;
  }

  for(int i = 0; i < m1->num_rows; i++) {
    for(int j = 0; j < m1->num_cols; j++) {
      m1->data[i][j] -= m2->data[i][j];
    }
  }
  return 1;
} 
```

## Multiplying two matrices (The Dot Product)

Matrix multiplication, or the **Dot Product**, is significantly more complex than simple addition. It is not element-wise, instead, it is a row-by-column operation. 

For the product $C = A \cdot B$ to exist, the number of columns in $A$ must equal the number of rows in $B$. This shared dimension is often referred to as the "inner dimension."

### The Mathematical Formula

Given $A[m \times n]$ and $B[n \times p]$, the resulting matrix $C$ will have dimensions $[m \times p]$. 

<div class="mp mpc">
\[
c_{ij} = \sum_{k=1}^{n} a_{ik} \cdot b_{kj} = a_{i1}b_{1j} + a_{i2}b_{2j} + \cdots + a_{in}b_{nj}
\]
</div>

Each element $c_{ij}$ is the "dot product" of the $i$-th row of $A$ and the $j$-th column of $B$.

### A Practical Example

Let's multiply a $2 \times 3$ matrix by a $3 \times 2$ matrix:

<div class="mp mpc">
\[
A = \begin{bmatrix} 1 & 2 & 3 \\ 0 & 0 & 4 \end{bmatrix}, \quad B = \begin{bmatrix} 2 & 3 \\ 2 & 1 \\ 1 & 5 \end{bmatrix}
\]
</div>

Since the inner dimension is $3$, we proceed to calculate the $2 \times 2$ result:

<div class="mp mpc">
\[
C = \begin{bmatrix}
(1 \cdot 2 + 2 \cdot 2 + 3 \cdot 1) & (1 \cdot 3 + 2 \cdot 1 + 3 \cdot 5) \\
(0 \cdot 2 + 0 \cdot 2 + 4 \cdot 1) & (0 \cdot 3 + 0 \cdot 1 + 4 \cdot 5)
\end{bmatrix}
= \begin{bmatrix} 9 & 20 \\ 4 & 20 \end{bmatrix}
\]
</div>

### C Implementation (naive)

The "naive" implementation uses three nested loops. While not the most efficient for massive matrices (where Strassen's algorithm or BLAS libraries would be used), it is the gold standard for clarity and understanding.

```c 
nml_mat *nml_mat_dot(nml_mat *m1, nml_mat *m2) {
  // 1. Check dimension compatibility
  if (m1->num_cols != m2->num_rows) {
    NML_ERROR(CANNOT_MULTIPLY);
    return NULL;
  }

  // 2. Resulting matrix gets Rows from m1 and Cols from m2
  nml_mat *r = nml_mat_new(m1->num_rows, m2->num_cols);
  if (r == NULL) return NULL;

  // 3. Perform the triple-loop multiplication
  for(int i = 0; i < m1->num_rows; i++) {
    for(int j = 0; j < m2->num_cols; j++) {
      double sum = 0.0;
      for(int k = 0; k < m1->num_cols; k++) {
        sum += m1->data[i][k] * m2->data[k][j];
      }
      r->data[i][j] = sum;
    }
  }
  return r;
}
```

**Technical Notes:**
* **Complexity**: This algorithm has a time complexity of $O(n^3)$. For a $1000 \times 1000$ matrix, that's a billion multiplications!
* **Cache Optimization**: In professional libraries, the loops are often rearranged or "blocked" to ensure that the CPU cache is used more effectively, as the `m2->data[k][j]` access pattern jumps across rows and can cause cache misses.
* **Accuracy**: We use a local `sum` variable to accumulate the result before assigning it to `r->data[i][j]`. This is generally faster and safer than repeatedly accessing the pointer-to-pointer structure in the innermost loop.

For those interested in high-performance computing, you can explore more advanced [matrix multiplication algorithms](https://en.wikipedia.org/wiki/Matrix_multiplication_algorithm) like Strassen's.

## Row Echelon Form (REF)

A matrix is in **Row Echelon Form** if it has been "morphed" by Gaussian Elimination into a staircase-like structure. This form is the finish line for solving systems of equations and the first step toward finding a matrix inverse.

### Properties of REF
A matrix is in Row Echelon Form if it satisfies three conditions:
1. **Leading Entry**: The first non-zero element in each row (the pivot) is exactly $1.0$.
2. **Staircase Structure**: Each pivot is in a column to the right of the pivot in the row above it.
3. **Zero Rows**: Any rows consisting entirely of zeros are moved to the bottom of the matrix.

### Examples of REF Matrices
<div class="mp mpc">
\[
A= \begin{bmatrix} 1 & 2 & 3 & 4 \\ 0 & 0 & 1 & 3 \\ 0 & 0 & 0 & 1 \end{bmatrix}, \quad
B= \begin{bmatrix} 1 & 2 & 3 & 4 \\ 0 & 0 & 1 & 3 \\ 0 & 0 & 0 & 1 \\ 0 & 0 & 0 & 0 \end{bmatrix}, \quad
C= \begin{bmatrix} 1 & 2 \\ 0 & 1 \\ 0 & 0 \\ 0 & 0 \end{bmatrix}
\]
</div>

### The Gaussian Elimination Algorithm
To transform any matrix into REF, we use the **elementary row operations** we implemented earlier:
1. **Find the Pivot**: Search for the first non-zero entry in the current column.
2. **Swap**: Move that row to the current top position using `nml_mat_row_swap_r()`.
3. **Normalize**: Multiply the pivot row by $1/pivot$ to set the leading entry to $1.0$ using `nml_mat_row_mult_r()`.
4. **Eliminate**: Subtract multiples of the pivot row from all rows below it to create zeros in that column using `nml_mat_row_addrow_r()`.

### Implementation: The Pivot Finder
Numerical stability is key. We create a private helper function to find the best candidate for a pivot. It uses `fabs()` and a constant `NML_MIN_COEF` to avoid treating tiny, insignificant values (resulting from floating-point noise) as valid pivots.

```c 
// Internal helper: Finds the first non-zero element in column 'col'
// starting from 'row' downwards. Returns index or -1 if none found.
int _nml_mat_pivotidx(nml_mat *m, unsigned int col, unsigned int row) {
  for(unsigned int i = row; i < m->num_rows; i++) {
    // Check against a guard value instead of absolute zero
    if (fabs(m->data[i][col]) > NML_MIN_COEF) {
      return i;
    }
  }
  return -1;
}
```

### Implementation: `nml_mat_ref`
The main algorithm orchestrates the row operations to "clear" the columns one by one.

```c
nml_mat *nml_mat_ref(nml_mat *m) {
  nml_mat *r = nml_mat_cp(m);
  if (r == NULL) return NULL;

  unsigned int i = 0; // Current row
  unsigned int j = 0; // Current column

  while(j < r->num_cols && i < r->num_rows) {
    int pivot = _nml_mat_pivotidx(r, j, i);
    
    if (pivot < 0) {
      // Entire column is zero; move to the next column
      j++;
      continue;
    }

    // 1. Move pivot row to the top
    if ((unsigned int)pivot != i) {
      nml_mat_row_swap_r(r, i, pivot);
    }

    // 2. Normalize: Pivot becomes 1.0
    double pv = r->data[i][j];
    nml_mat_row_mult_r(r, i, 1.0 / pv);

    // 3. Eliminate: Create zeros below the pivot
    for(unsigned int k = i + 1; k < r->num_rows; k++) {
      if (fabs(r->data[k][j]) > NML_MIN_COEF) {
        // Subtract the pivot row scaled by the element we want to clear
        nml_mat_row_addrow_r(r, k, i, -(r->data[k][j]));
      } 
    }
    i++;
    j++;
  }
  return r;
} 
```

**Technical Warning: The Floating-Point Trap**
In pure math, $0.0$ is absolute. In computer memory, $0.0$ often looks like $1.0 \times 10^{-18}$. If we divide by such a tiny number ($1/pv$), we trigger an **overflow** or introduce massive rounding errors. By using `NML_MIN_COEF` (a "guard" or *epsilon* value), we treat these tiny values as zero, making our library significantly more reliable for real-world data.

## Reduced Row Echelon Form (RREF)

A matrix is in **Reduced Row Echelon Form** (also known as Gauss-Jordan form) if it satisfies all the requirements of Row Echelon Form, with one critical addition: **every pivot must be the only non-zero entry in its column.**

While a matrix can have several different Row Echelon Forms depending on the sequence of operations, the **RREF is unique** for every matrix. This makes it the definitive form for solving linear systems and finding matrix inverses.

### Examples of RREF Matrices
<div class="mp mpc">
\[
A= \begin{bmatrix} 1 & 2 & 0 & 0 \\ 0 & 0 & 1 & 0 \\ 0 & 0 & 0 & 1 \end{bmatrix}, \quad
B= \begin{bmatrix} 1 & 0 \\ 0 & 1 \\ 0 & 0 \\ 0 & 0 \end{bmatrix}
\]
</div>

### The Gauss-Jordan Step
To reach RREF, we perform a "backward phase" after the standard Gaussian elimination. Once the matrix is in REF:
1. Identify the pivot in the last non-zero row.
2. Add multiples of this pivot row to all rows **above** it to clear those entries to $0.0$.
3. Repeat this process for each pivot, moving from the bottom of the matrix to the top.

### Implementation: Partial Pivoting for Stability
In numerical computing, simply picking the *first* non-zero element as a pivot can lead to precision loss. To make our library more robust, we implement **Partial Pivoting**. We search for the element with the **largest absolute value** in the current column to use as our pivot. This minimizes rounding errors during division.

```c
// Finds the maximum absolute element in column 'col' under row 'row'
// Used for numerical stability in Gauss-Jordan elimination
int _nml_mat_pivotmaxidx(nml_mat *m, unsigned int col, unsigned int row) {
  int maxi = row;
  double max_val = fabs(m->data[row][col]);

  for(unsigned int i = row + 1; i < m->num_rows; i++) {
    double current_val = fabs(m->data[i][col]);
    if (current_val > max_val) {
      max_val = current_val;
      maxi = i;
    }
  }

  // If the max value is effectively 0, there is no valid pivot
  return (max_val < NML_MIN_COEF) ? -1 : maxi;
} 
```

### Implementation: `nml_mat_rref`
The RREF algorithm first performs a forward pass to get the matrix into REF, then a backward pass to clear the elements above the pivots.

```c
nml_mat *nml_mat_rref(nml_mat *m) {
  nml_mat *r = nml_mat_cp(m);
  if (r == NULL) return NULL;

  unsigned int i = 0; // Current pivot row
  unsigned int j = 0; // Current column

  // 1. Forward Pass (Gaussian Elimination with Partial Pivoting)
  while(j < r->num_cols && i < r->num_rows) {
    int pivot = _nml_mat_pivotmaxidx(r, j, i);
    if (pivot < 0) {
      j++;
      continue;
    }

    if ((unsigned int)pivot != i) {
      nml_mat_row_swap_r(r, i, pivot);
    }

    // Normalize pivot to 1.0
    nml_mat_row_mult_r(r, i, 1.0 / r->data[i][j]);

    // Eliminate elements BELOW the pivot
    for(unsigned int k = i + 1; k < r->num_rows; k++) {
      if (fabs(r->data[k][j]) > NML_MIN_COEF) {
        nml_mat_row_addrow_r(r, k, i, -(r->data[k][j]));
      }
    }
    i++;
    j++;
  }

  // 2. Backward Pass (Gauss-Jordan)
  // We go from bottom to top, clearing values above pivots
  for(int k = i - 1; k >= 0; k--) {
    // Find the column index of the pivot in row k
    int pivot_col = 0;
    while(pivot_col < r->num_cols && fabs(r->data[k][pivot_col]) < NML_MIN_COEF) {
      pivot_col++;
    }

    if (pivot_col < r->num_cols) {
      for(int row_above = k - 1; row_above >= 0; row_above--) {
        if (fabs(r->data[row_above][pivot_col]) > NML_MIN_COEF) {
          nml_mat_row_addrow_r(r, row_above, k, -(r->data[row_above][pivot_col]));
        }
      }
    }
  }

  return r;
}
```

**Why RREF matters:** Once a matrix representing a system of equations is in RREF, the solution can be read directly from the augmented column without any further back-substitution.

# LU(P) Decomposition

**LU Decomposition**, also known as **LU Factorization**, refers to the process of breaking down a square matrix $A$ into the product of two triangular factors: $L$ and $U$.

Ideally, the factorization looks like this:

<div class="mp mpc">
\[
\begin{bmatrix}
a_{11} & a_{12} & a_{13} \\
a_{21} & a_{22} & a_{23} \\
a_{31} & a_{32} & a_{33} 
\end{bmatrix}
=
\begin{bmatrix}
1 & 0 & 0 \\
l_{21} & 1 & 0 \\
l_{31} & l_{32} & 1
\end{bmatrix} 
* \begin{bmatrix}
u_{11} & u_{12} & u_{13} \\
0 & u_{22} & u_{23} \\
0 & 0 & u_{33}
\end{bmatrix}
\]
</div>

In practice, however, this simple factorization can fail if a zero (or a very small number) appears on the diagonal during computation. To ensure numerical stability and handle such cases, we swap rows of $A$ as we go. We track these swaps in a new matrix $P$, called the **Permutation Matrix**.

With this addition, the method is known as **LU Factorization with partial pivoting**, defined by the equation:

<div class="mp mpc">
\[ P * A = L * U \]
</div>

Where:
* **$P$** represents a row permutation of the Identity matrix $I$, generated during the process.
* **$L$** is a lower triangular matrix, where every element on the main diagonal is exactly $1.0$.
* **$U$** is an upper triangular matrix.

While there is another variation called *LU Factorization with full pivoting* (which involves swapping both rows and columns), partial pivoting is generally sufficient for most applications, so that is what we will implement.

If the matrix $A$ is square ($n \times n$), it can always be decomposed as $P * A = L * U$. 

To compute the LUP decomposition, we implement a modified version of the **Gaussian Elimination** algorithm. This is the most common approach and is quite efficient, requiring approximately $\frac{2}{3}n^{3}$ floating-point operations.

While other methods exist, such as recursive or randomized algorithms, the Gaussian approach is the most straightforward to implement and understand. Mastering the $P * A = L * U$ decomposition is essential, as it serves as the foundation for computing matrix determinants, finding inverses, and solving complex systems of linear equations.

## The LU(P) algorithm as an example

LU(P) factorisation can be achieved by refining the core logic of Gaussian Elimination. The primary difference is that instead of simply discarding the row operations we perform to create zeroes, we "record" them within the $L$ matrix.

The algorithm proceeds as follows:
* **Initialisation**: We allocate memory for the $L$, $U$, and $P$ matrices.
  * $L$ starts as a zero matrix.
  * $P$ is initialized as the Identity matrix.
  * $U$ starts as an exact copy of the input matrix $A$.
* **Iteration**: We iterate through the matrix $U$ column by column.
  * For each column, we identify the **pivot** (the value with the largest absolute magnitude in that column).
    * We swap the corresponding rows in $U$, $L$, and $P$ to move the pivot to the main diagonal.
    * Once the pivot is in place, we eliminate the values below it using row addition: $Row_{x} + multiplier \times Row_{y}$.
    * We record each $multiplier$ used during this process in the $L$ matrix.
* **Completion**: This continues until $U$ is transformed into an upper triangular form (only zeroes remain below the main diagonal).

Let’s trace the decomposition of a $3 \times 3$ matrix $A$:

<div class="mp mpc">
\[
P = \begin{bmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{bmatrix}, \quad
A = \begin{bmatrix} 2 & 1 & 5 \\ 4 & 4 & -4 \\ 1 & 3 & 1 \end{bmatrix}, \quad
L = \begin{bmatrix} 0 & 0 & 0 \\ 0 & 0 & 0 \\ 0 & 0 & 0 \end{bmatrix}, \quad
U = \begin{bmatrix} 2 & 1 & 5 \\ 4 & 4 & -4 \\ 1 & 3 & 1 \end{bmatrix}
\]
</div>

* **Step 1**: In the first column, $4 > 2$, so we swap $Row_{0}$ with $Row_{1}$ across $P$ and $U$:

<div class="mp mpc">
\[
P = \begin{bmatrix} 0 & 1 & 0 \\ 1 & 0 & 0 \\ 0 & 0 & 1 \end{bmatrix}, \quad
L = \begin{bmatrix} 0 & 0 & 0 \\ 0 & 0 & 0 \\ 0 & 0 & 0 \end{bmatrix}, \quad
U = \begin{bmatrix} 4 & 4 & -4 \\ 2 & 1 & 5 \\ 1 & 3 & 1 \end{bmatrix}
\]
</div>

* **Step 2**: To create a zero in $U[1][0]$, we apply $Row_{1} - (\frac{1}{2})Row_{0}$. We record the multiplier $\frac{1}{2}$ in $L[1][0]$ and update $U$:

<div class="mp mpc">
\[
P = \begin{bmatrix} 0 & 1 & 0 \\ 1 & 0 & 0 \\ 0 & 0 & 1 \end{bmatrix}, \quad
L = \begin{bmatrix} 0 & 0 & 0 \\ \frac{1}{2} & 0 & 0 \\ 0 & 0 & 0 \end{bmatrix}, \quad
U = \begin{bmatrix} 4 & 4 & -4 \\ 0 & -1 & 7 \\ 1 & 3 & 1 \end{bmatrix}
\]
</div>

* **Step 3**: To create a zero in $U[2][0]$, we apply $Row_{2} - (\frac{1}{4})Row_{0}$. We record the multiplier $\frac{1}{4}$ in $L[2][0]$ and update $U$:

<div class="mp mpc">
\[
P = \begin{bmatrix} 0 & 1 & 0 \\ 1 & 0 & 0 \\ 0 & 0 & 1 \end{bmatrix}, \quad
L = \begin{bmatrix} 0 & 0 & 0 \\ \frac{1}{2} & 0 & 0 \\ \frac{1}{4} & 0 & 0 \end{bmatrix}, \quad
U = \begin{bmatrix} 4 & 4 & -4 \\ 0 & -1 & 7 \\ 0 & 2 & 2 \end{bmatrix}
\]
</div>

* **Step 4**: Moving to the second column, we see $|-1| < |2|$, so we swap $Row_{1}$ with $Row_{2}$. Note that $P$, $L$, and $U$ are all affected by this swap to maintain the consistency of the recorded multipliers:

<div class="mp mpc">
\[
P = \begin{bmatrix} 0 & 1 & 0 \\ 0 & 0 & 1 \\ 1 & 0 & 0 \end{bmatrix}, \quad
L = \begin{bmatrix} 0 & 0 & 0 \\ \frac{1}{4} & 0 & 0 \\ \frac{1}{2} & 0 & 0 \end{bmatrix}, \quad
U = \begin{bmatrix} 4 & 4 & -4 \\ 0 & 2 & 2 \\ 0 & -1 & 7 \end{bmatrix}
\]
</div>

* **Step 5**: To create the final zero in $U[2][1]$, we apply $Row_{2} - (-\frac{1}{2})Row_{1}$. We record $-\frac{1}{2}$ in $L[2][1]$:

<div class="mp mpc">
\[
P = \begin{bmatrix} 0 & 1 & 0 \\ 0 & 0 & 1 \\ 1 & 0 & 0 \end{bmatrix}, \quad
L = \begin{bmatrix} 0 & 0 & 0 \\ \frac{1}{4} & 0 & 0 \\ \frac{1}{2} & -\frac{1}{2} & 0 \end{bmatrix}, \quad
U = \begin{bmatrix} 4 & 4 & -4 \\ 0 & 2 & 2 \\ 0 & 0 & 8 \end{bmatrix}
\]
</div>

* **Step 6**: Finally, we complete $L$ by adding $1$s along its main diagonal.

In conclusion, the $P \cdot A = L \cdot U$ factorisation of $A$ results in:

<div class="mp mpc">
\[
\begin{bmatrix} 0 & 1 & 0 \\ 0 & 0 & 1 \\ 1 & 0 & 0 \end{bmatrix} \cdot
\begin{bmatrix} 2 & 1 & 5 \\ 4 & 4 & -4 \\ 1 & 3 & 1 \end{bmatrix} =
\begin{bmatrix} 1 & 0 & 0 \\ \frac{1}{4} & 1 & 0 \\ \frac{1}{2} & -\frac{1}{2} & 1 \end{bmatrix} \cdot
\begin{bmatrix} 4 & 4 & -4 \\ 0 & 2 & 2 \\ 0 & 0 & 8 \end{bmatrix}
\]
</div>

For a visual walkthrough of this process, you can view the example in this video [here](https://www.youtube.com/watch?v=f6RT4BI4S7M).

## Code implementation

To model the results of the $LU(P)$ computation effectively, we wrap the three resulting matrices into a single `struct` named `nml_mat_lup`. This container holds the pointers to $L$, $U$, and $P$, along with metadata about the transformation.

```c
typedef struct nml_mat_lup_s {
  nml_mat *L;
  nml_mat *U;
  nml_mat *P;
  unsigned int num_permutations;
} nml_mat_lup;
```

The property `num_permutations` tracks the total number of row swaps performed during factorization. This count is vital later on: the determinant of the permutation matrix $P$ is $(-1)^n$, where $n$ is the number of permutations. Tracking this now saves us from re-calculating the sign of the determinant later.

### Optimization Note: The Combined LU Storage
In many high-performance libraries, memory is saved by storing both $L$ and $U$ within a single $n \times n$ matrix. Since $L$ always has $1.0$ on its diagonal, those values are implicit, allowing the lower part of the matrix to store $L$ and the upper part (including the diagonal) to store $U$:

<div class="mp mpc">
\[
\begin{bmatrix}
u_{11} & u_{12} & u_{13} \\
l_{21} & u_{22} & u_{23} \\
l_{31} & l_{32} & u_{33}
\end{bmatrix}
\]
</div>

For our implementation, we will keep $L$ and $U$ as separate matrices to prioritize code readability and simplicity.

### Memory Management
Following our established pattern for the `nml_mat` library, we provide "constructor" and "destructor" functions to manage the lifecycle of the LUP structure.

```c
nml_mat_lup *nml_mat_lup_new(nml_mat *L, nml_mat *U, nml_mat *P, unsigned int num_permutations) {
  nml_mat_lup *r = malloc(sizeof(*r));
  NP_CHECK(r);
  r->L = L;
  r->U = U;
  r->P = P;
  r->num_permutations = num_permutations;
  return r;
}

void nml_mat_lup_free(nml_mat_lup* lu) {
  if (!lu) return;
  nml_mat_free(lu->P);
  nml_mat_free(lu->L);
  nml_mat_free(lu->U);
  free(lu);
} 
```

### The LUP Factorization Algorithm

The following function performs the actual decomposition. It utilizes partial pivoting by finding the maximum absolute value in each column to ensure numerical stability.

```c
nml_mat_lup *nml_mat_lup_solve(nml_mat *m) {
  if (!m->is_square) {
    NML_FERROR(CANNOT_LU_MATRIX_SQUARE, m->num_rows, m->num_cols);
    return NULL;
  }

  nml_mat *L = nml_mat_new(m->num_rows, m->num_rows);
  nml_mat *U = nml_mat_cp(m);
  nml_mat *P = nml_mat_eye(m->num_rows);

  unsigned int num_permutations = 0;
  double mult;

  for(int j = 0; j < U->num_cols; j++) {
    // 1. Partial Pivoting: Find the row with the largest absolute element in column (j)
    int pivot = _nml_mat_absmaxr(U, j); 
    
    // 2. Check for singularity (degenerate matrix)
    if (fabs(U->data[pivot][j]) < NML_MIN_COEF) {
      NML_ERROR(CANNOT_LU_MATRIX_DEGENERATE);
      // Note: In a production setting, you'd free L, U, P before returning NULL
      return NULL;
    }

    if (pivot != j) {
      // Swap rows in U, L, and P to maintain the decomposition relationship
      nml_mat_row_swap_r(U, j, pivot);
      nml_mat_row_swap_r(L, j, pivot);
      nml_mat_row_swap_r(P, j, pivot);
      num_permutations++;
    }

    // 3. Elimination: Create zeros under the diagonal pivot
    for(int i = j + 1; i < U->num_rows; i++) {
      mult = U->data[i][j] / U->data[j][j];
      
      // Update the U matrix (upper triangular part)
      nml_mat_row_addrow_r(U, i, j, -mult);
      
      // Store the multiplier in L (lower triangular part)
      L->data[i][j] = mult;
    }
  }

  // Finalize L by setting the main diagonal elements to 1.0
  nml_mat_diag_set(L, 1.0);

  return nml_mat_lup_new(L, U, P, num_permutations);
} 
```

# Solving linear systems of equations

## Forward substitution

**Forward substitution** is an efficient method for solving a linear system of equations $L \mathbf{x} = \mathbf{b}$ when the coefficient matrix $L$ is **lower triangular**. Because the first equation in the system depends only on the first variable, we can solve for $x_1$ directly and then "substitute" that value forward into the subsequent equations.

The system is visually represented as:

<div class="mp mpc">
\[
\begin{bmatrix}
l_{11} & 0 & \cdots & 0 \\
l_{21} & l_{22} & \cdots & 0 \\
\vdots & \vdots & \ddots & \vdots \\
l_{m1} & l_{m2} & \cdots & l_{mm}
\end{bmatrix}
\cdot
\begin{bmatrix}
x_{1} \\
x_{2} \\
\vdots \\
x_{m}
\end{bmatrix}
=
\begin{bmatrix}
b_{1} \\
b_{2} \\
\vdots \\
b_{m}
\end{bmatrix}
\]
</div>

### The Mathematical Formula

We solve the system row by row, from top to bottom. The value for each $x_i$ is determined by:

<div class="mp mpc">
\[
x_{1} = \frac{b_{1}}{l_{11}}
\]
\[
x_{2} = \frac{b_{2} - l_{21}x_{1}}{l_{22}}
\]
\[
x_{m} = \frac{b_{m} - \sum_{j=1}^{m-1} l_{mj}x_{j}}{l_{mm}}
\]
</div>

### C Implementation

The implementation uses a nested loop structure. The outer loop moves down the rows, while the inner loop accumulates the sum of the previously solved variables multiplied by their coefficients.

```c
// Forward substitution algorithm
// Solves the linear system L * x = b
//
// L: Lower triangular matrix of size NxN
// b: Column matrix of size Nx1
// Returns: Solution column matrix x of size Nx1
//
// Note: If any diagonal element L[i][i] is 0, the system is singular and cannot be solved.
// Note: This function is a core component of solving systems via LU decomposition.
nml_mat *nml_ls_solvefwd(nml_mat *L, nml_mat *b) {
  nml_mat* x = nml_mat_new(L->num_cols, 1);
  if (x == NULL) return NULL;

  for(int i = 0; i < L->num_cols; i++) {
    double sum = b->data[i][0];
    for(int j = 0; j < i; j++) {
      sum -= L->data[i][j] * x->data[j][0];
    }

    // Check for division by zero
    if (fabs(L->data[i][i]) < NML_MIN_COEF) {
      NML_ERROR(CANNOT_SOLVE_SINGULAR_MATRIX);
      nml_mat_free(x);
      return NULL;
    }

    x->data[i][0] = sum / L->data[i][i];
  }
  return x;
}
```

**Technical Insight:**
* **Complexity:** This algorithm is $O(n^2)$, making it significantly faster than general solvers once the matrix has been decomposed into its triangular factors.
* **Numerical Stability:** We include a check against `NML_MIN_COEF` before dividing. If the diagonal element is nearly zero, the matrix is "singular" (or degenerate), and a unique solution does not exist.

## Backward substitution

**Backward substitution** is the logical counterpart to forward substitution. It is used to solve a linear system $U \mathbf{x} = \mathbf{y}$ where the coefficient matrix $U$ is **upper triangular**. 

In this scenario, the last equation in the system involves only the last variable ($x_m$). By solving for $x_m$ first, we can work our way "backward" to solve for $x_{m-1}, x_{m-2}$, and so on, until we reach $x_1$.

The system is structured as follows:

<div class="mp mpc">
\[
\begin{bmatrix}
u_{11} & u_{12} & \cdots & u_{1m} \\
0 & u_{22} & \cdots & u_{2m} \\
\vdots & \vdots & \ddots & \vdots \\
0 & 0 & \cdots & u_{mm}
\end{bmatrix}
\cdot
\begin{bmatrix}
x_{1} \\
x_{2} \\
\vdots \\
x_{m}
\end{bmatrix}
=
\begin{bmatrix}
y_{1} \\
y_{2} \\
\vdots \\
y_{m}
\end{bmatrix}
\]
</div>

### The Mathematical Formula

Starting from the bottom row and moving upwards, the solution for each variable $x_i$ is given by:

<div class="mp mpc">
\[
x_{m} = \frac{y_{m}}{u_{mm}}
\]
\[
x_{m-1} = \frac{y_{m-1} - u_{m-1,m}x_{m}}{u_{m-1,m-1}}
\]
\[
x_{i} = \frac{y_{i} - \sum_{j=i+1}^{m} u_{ij}x_{j}}{u_{ii}}
\]
</div>

### C Implementation

The implementation reverses the direction of the row traversal found in forward substitution. We start the outer loop at the last index and decrement toward zero.

```c
// Backward substitution algorithm
// Solves the linear system U * x = b
//
// U: Upper triangular matrix of size NxN
// b: Column matrix of size Nx1
// Returns: Solution column matrix x of size Nx1
//
// Note: If any diagonal element U[i][i] is 0, the system is singular and cannot be solved.
nml_mat *nml_ls_solvebck(nml_mat *U, nml_mat *b) {
  nml_mat *x = nml_mat_new(U->num_cols, 1);
  if (x == NULL) return NULL;

  int i = U->num_cols;
  double sum;

  // We start from the last row and work our way up
  while(i-- > 0) {
    sum = b->data[i][0];
    for(int j = i + 1; j < U->num_cols; j++) {
      sum -= U->data[i][j] * x->data[j][0];
    }

    // Numerical safety: check for potential division by zero
    if (fabs(U->data[i][i]) < NML_MIN_COEF) {
      NML_ERROR(CANNOT_SOLVE_SINGULAR_MATRIX);
      nml_mat_free(x);
      return NULL;
    }

    x->data[i][0] = sum / U->data[i][i];
  }
  return x;
} 
```

**Technical Insight:**
* **Efficiency:** Like forward substitution, this is an $O(n^2)$ operation. Combined with LUP decomposition, it allows for solving systems of equations much faster than calculating a full matrix inverse.
* **Diagonal Dependency:** The success of the algorithm depends entirely on the diagonal elements $u_{ii}$ being non-zero. If the matrix $U$ comes from an LUP decomposition and the original matrix was non-singular, these diagonals are guaranteed to be valid pivots.

## Solving linear systems using LU(P) decomposition

Leveraging the $P \cdot A = L \cdot U$ factorization is the gold standard for solving linear systems of the form $A \mathbf{x} = \mathbf{b}$. By breaking the original matrix into triangular components, we transform a complex problem into two simple, sequential substitution steps.

### The Mathematical Logic

To solve $A \mathbf{x} = \mathbf{b}$ using LUP, we perform the following transformations:

1.  **Rearrange the system**: Multiply both sides by the permutation matrix $P$:
    <div mp mpc>
    \[ P \cdot A \mathbf{x} = P \mathbf{b} \]
    </div>
2.  **Substitute the factors**: Replace $P \cdot A$ with our $L \cdot U$ factors:
    <div mp mpc>
    \[ L \cdot U \mathbf{x} = P \mathbf{b} \]
    </div>
3.  **Break into two steps**: We introduce an auxiliary vector $\mathbf{y}$, where $\mathbf{y} = U \mathbf{x}$. This allows us to solve the problem in two stages:
    * **Stage 1**: Solve $L \mathbf{y} = P \mathbf{b}$ for $\mathbf{y}$ using **forward substitution**.
    * **Stage 2**: Solve $U \mathbf{x} = \mathbf{y}$ for $\mathbf{x}$ using **backward substitution**.

### C Implementation

This function orchestrates the entire process. It first applies the permutation to the result vector $\mathbf{b}$, then calls our previously implemented substitution solvers to find the final solution $\mathbf{x}$.

```c
nml_mat *nml_ls_solve(nml_mat_lup *lu, nml_mat* b) {
  // 1. Validation: ensure dimensions of b match the LUP factors
  if (lu->U->num_rows != b->num_rows || b->num_cols != 1) {
    NML_FERROR(CANNOT_SOLVE_LIN_SYS_INVALID_B,
      b->num_rows,
      b->num_cols,
      lu->U->num_rows,
      1);
      return NULL;
  }

  // 2. Permute b: Pb = P * b
  nml_mat *Pb = nml_mat_dot(lu->P, b);
  if (Pb == NULL) return NULL;

  // 3. Forward substitution: Solve L * y = Pb
  nml_mat *y = nml_ls_solvefwd(lu->L, Pb);
  if (y == NULL) {
    nml_mat_free(Pb);
    return NULL;
  }

  // 4. Backward substitution: Solve U * x = y
  nml_mat *x = nml_ls_solvebck(lu->U, y);

  // Clean up temporary matrices
  nml_mat_free(y);
  nml_mat_free(Pb);

  return x;
} 
```

**Why is this better than $x = A^{-1}b$?**
While mathematically identical, calculating the full inverse of a matrix is more computationally expensive and prone to numerical rounding errors. The LUP method combined with substitution is faster ($O(n^2)$ after decomposition) and significantly more stable for large systems.

# Calculating the inverse 

A square matrix $A$ is considered **invertible** if there exists another matrix $A^{-1}$ such that their product results in the Identity matrix $I$.

The property $A \cdot A^{-1} = I$ can be expanded into its component form:

<div class="mp mpc">
\[
\begin{bmatrix}
a_{11} & a_{12} & a_{13} \\
a_{21} & a_{22} & a_{23} \\
a_{31} & a_{32} & a_{33}
\end{bmatrix}
\cdot
\begin{bmatrix}
a_{11}^{-1} & a_{12}^{-1} & a_{13}^{-1} \\
a_{21}^{-1} & a_{22}^{-1} & a_{23}^{-1} \\
a_{31}^{-1} & a_{32}^{-1} & a_{33}^{-1}
\end{bmatrix}
=
\begin{bmatrix}
1 & 0 & 0 \\
0 & 1 & 0 \\
0 & 0 & 1
\end{bmatrix}
\]
</div>

## The Column-by-Column Approach

To find the values of $A^{-1}$, we don't solve for the whole matrix at once. Instead, we observe that each column of the Identity matrix is the result of multiplying $A$ by the corresponding column of $A^{-1}$. This effectively turns the inversion problem into $n$ separate systems of linear equations:

<div class="mp mpc">
\[
A \cdot \mathbf{x}_j = \mathbf{e}_j
\]
</div>

Where:
* $\mathbf{x}_j$ is the $j$-th column of the inverse matrix $A^{-1}$.
* $\mathbf{e}_j$ is the $j$-th column of the Identity matrix $I$ (a vector with $1$ at position $j$ and $0$ elsewhere).

For a $3 \times 3$ matrix, we solve:

<div class="mp mpc">
\[
\begin{cases}
A \cdot \text{col}_1(A^{-1}) = [1, 0, 0]^T \\
A \cdot \text{col}_2(A^{-1}) = [0, 1, 0]^T \\
A \cdot \text{col}_3(A^{-1}) = [0, 0, 1]^T
\end{cases}
\]
</div>

## C Implementation

Since we have already implemented the `nml_ls_solve` function (which uses forward and backward substitution), calculating the inverse is simply a matter of looping through the columns of an identity matrix and solving for each one.

```c
// Calculates the inverse of a matrix using its LUP decomposition
nml_mat *nml_mat_inv(nml_mat_lup *lup) {
  unsigned n = lup->L->num_cols;
  
  // Create the resulting matrix (n x n)
  nml_mat *r = nml_mat_new(n, n);
  
  // Create an identity matrix to extract columns from
  nml_mat *I = nml_mat_eye(lup->U->num_rows);
  
  nml_mat *inv_col;
  nml_mat *I_col;
  
  for(int j = 0; j < n; j++) {
    // 1. Get the j-th column of the Identity matrix
    I_col = nml_mat_col_get(I, j);
    
    // 2. Solve the system A * x = I_col
    inv_col = nml_ls_solve(lup, I_col);
    
    if (inv_col == NULL) {
        // Handle error: Matrix is singular and cannot be inverted
        nml_mat_free(I_col);
        nml_mat_free(I);
        nml_mat_free(r);
        return NULL;
    }

    // 3. Place the solution vector into the j-th column of our result matrix
    for(int i = 0; i < n; i++) {
      r->data[i][j] = inv_col->data[i][0];
    }
    
    // Clean up temporary column matrices
    nml_mat_free(inv_col);
    nml_mat_free(I_col);
  }
  
  nml_mat_free(I);
  return r;
} 
```

**Technical Insight:**
This method is numerically superior to many other inversion techniques. By using LUP decomposition, we perform the "expensive" part of the work (Gaussian elimination) only once. Solving for each subsequent column only takes $O(n^2)$ time, resulting in a total complexity of $O(n^3)$ for the entire inverse.

# Calculating the determinant

The determinant of the product of two matrices is equal to the product of their individual determinants. Since our LUP decomposition provides the relationship $P \cdot A = L \cdot U$, we can derive the determinant of $A$ by examining the properties of its components:

<div class="mp mpc">
\[ \det(P) \cdot \det(A) = \det(L) \cdot \det(U) \]
</div>

## Understanding the Components

Each matrix in the LUP decomposition has specific geometric and algebraic properties that make calculating their determinants efficient:

1.  **Permutation Matrix ($P$):** A permutation matrix is the Identity matrix with its rows reordered. Its determinant is always either $1$ or $-1$. Specifically, $\det(P) = (-1)^n$, where $n$ is the number of row swaps performed. We already track this in `nml_mat_lup->num_permutations`.
2.  **Lower Triangular Matrix ($L$):** The determinant of any triangular matrix is simply the product of its diagonal elements. Since our LUP algorithm constructs $L$ with $1.0$ values along the entire main diagonal, $\det(L)$ is always $1$.
3.  **Upper Triangular Matrix ($U$):** Like $L$, the determinant of $U$ is the product of its diagonal entries:
    <div class="mp mpc">
    \[ \det(U) = \prod_{i=0}^{N-1} U_{ii} \]
    </div>

## The Final Formula

By substituting these properties back into our initial equation, we find that the determinant of $A$ is the product of $U$'s diagonal elements, adjusted by the sign (parity) of the row swaps:

<div class="mp mpc">
\[ \det(A) = (-1)^{\text{num\_permutations}} \cdot \prod_{i=0}^{N-1} U_{ii} \]
</div>

## C Implementation

This approach is highly optimized. Because the LUP factorization (the most expensive part) has already been performed, calculating the determinant becomes a simple $O(n)$ linear traversal of the diagonal.

```c
// Calculates the determinant from an LUP-decomposed matrix.
// The sign is determined by the parity of row permutations:
// - Even permutations: sign is +1
// - Odd permutations: sign is -1
double nml_mat_det(nml_mat_lup* lup) {
  if (lup == NULL) return 0.0;

  // Step 1: Determine the sign (+1 or -1) based on row swaps
  int sign = (lup->num_permutations % 2 == 0) ? 1 : -1;
  
  nml_mat *U = lup->U;
  double product = 1.0;

  // Step 2: The determinant is the product of the diagonal elements of U
  for(int k = 0; k < U->num_rows; k++) {
    product *= U->data[k][k];
  }

  return product * sign;
}
```

**Technical Insight:**
While beginners often learn the **Laplace Expansion** (minors and cofactors) for determinants, that method has a factorial complexity $O(n!)$, making it unusable for matrices larger than $10 \times 10$. The LUP method is the standard professional approach, reducing the problem to $O(n^3)$ for the decomposition and $O(n)$ for the final product.

# QR Decomposition

Any square matrix $A$ can be decomposed into two distinct matrices: $A = Q \cdot R$. In this factorization, **$Q$** is an orthogonal matrix and **$R$** is an upper triangular matrix.

An orthogonal matrix satisfies the property $Q \cdot Q^{T} = Q^{T} \cdot Q = I$, which implies that $Q^{T} = Q^{-1}$. Geometrically, this means the columns of $Q$ are unit vectors that are perpendicular to each other.

While LU(P) factorization relies on row-wise elementary operations, QR decomposition is fundamentally column-oriented. The most common method to compute this is the **Gram–Schmidt process**, which systematically orthogonalizes and normalizes the columns of $A$.

## The Mathematical Framework

Consider the matrices by their column vectors:

<div class="mp mpc">
\[ 
A = \begin{bmatrix} | & | & | \\ a_{1} & a_{2} & a_{3} \\ | & | & | \end{bmatrix}, \quad Q = \begin{bmatrix} | & | & | \\ q_{1} & q_{2} & q_{3} \\ | & | & | \end{bmatrix}
\]
</div>

Since $Q$ must be orthogonal, we normalize the columns of $A$ and remove their projections onto previously calculated vectors:

<div class="mp mpc">
\[
\begin{cases}
q_{1} = \frac{a_{1}}{\lVert a_{1} \rVert} \\
q_{2} = \frac{a^{\bot}_{2}}{\lVert a^{\bot}_{2} \rVert}, \quad a^{\bot}_{2} = a_{2} - \langle a_{2}, q_{1} \rangle q_{1} \\
q_{3} = \frac{a^{\bot}_{3}}{\lVert a^{\bot}_{3} \rVert}, \quad a^{\bot}_{3} = a_{3} - \langle a_{3}, q_{1} \rangle q_{1} - \langle a_{3}, q_{2} \rangle q_{2}
\end{cases}
\]
</div>

The full decomposition is represented as:

<div class="mp mpc">
\[
\begin{bmatrix} | & | & | \\ a_{1} & a_{2} & a_{3} \\ | & | & | \end{bmatrix} = \begin{bmatrix} | & | & | \\ q_{1} & q_{2} & q_{3} \\ | & | & | \end{bmatrix} \cdot \begin{bmatrix} \lVert a_{1} \rVert & \langle a_{2}, q_{1} \rangle & \langle a_{3}, q_{1} \rangle \\ 0 & \lVert a^{\bot}_{2} \rVert & \langle a_{3}, q_{2} \rangle \\ 0 & 0 & \lVert a^{\bot}_{3} \rVert \end{bmatrix}
\]
</div>

## Essential Components: Dot Product and $L_2$ Norm

To implement this, we need two core vector operations: the **Dot Product** and the **Euclidean Norm**.

### 1. Dot Product $\langle a, b \rangle$
This represents the inner product of two vectors, used here to find the projection of one column onto another.

<div class="mp mpc">
\[ \langle a, b \rangle = \sum a_{i} b_{i} \]
</div>

```c
// Calculates the dot product of two matrix columns
double nml_vect_dot(nml_mat *m1, unsigned int m1col, nml_mat *m2, unsigned m2col) {
  if (m1->num_rows != m2->num_rows) {
    NML_FERROR(CANNOT_VECT_DOT_DIMENSIONS, m1->num_rows, m2->num_rows);
  }
  double dot = 0.0;
  for(int i = 0; i < m1->num_rows; i++) {
    dot += m1->data[i][m1col] * m2->data[i][m2col];
  }
  return dot;
} 
```

### 2. Euclidean Norm $\lVert a \rVert$
The $L_2$ norm represents the length of a vector. It is crucial for the normalization step to ensure $Q$'s columns are unit vectors.

<div class="mp mpc">
\[ \lVert a \rVert = \sqrt{\sum a^{2}_{i}} \]
</div>

```c
// Calculates the L2 norm for a specific column
double nml_mat_col_l2norm(nml_mat *m, unsigned int col) {
  double square_sum = 0.0;
  for(int i = 0; i < m->num_rows; i++) {
    square_sum += (m->data[i][col] * m->data[i][col]);
  }
  return sqrt(square_sum);
}
```

## QR Algorithm Implementation

The following solver implements the classical Gram-Schmidt process. It iterates through columns, computing the orthogonal projection for each and storing the result in $Q$, while the coefficients of these projections form the upper triangular matrix $R$.

```c
nml_mat_qr *nml_mat_qr_solve(nml_mat *m) {
  nml_mat_qr *qr = nml_mat_qr_new();
  nml_mat *Q = nml_mat_cp(m);
  nml_mat *R = nml_mat_new(m->num_rows, m->num_cols);

  for(int j = 0; j < m->num_cols; j++) {    
    nml_mat *aj = nml_mat_col_get(m, j);
    for(int k = 0; k < j; k++) {
       // Projection of aj onto qk
       double rkj = nml_vect_dot(m, j, Q, k);
       R->data[k][j] = rkj;
       
       nml_mat *qk = nml_mat_col_get(Q, k);
       nml_mat_col_mult_r(qk, 0, rkj);
       nml_mat_sub_r(aj, qk);
       nml_mat_free(qk);
    }
    
    // Set the j-th column of Q
    for(int i = 0; i < Q->num_rows; i++) {
      Q->data[i][j] = aj->data[i][0];
    }
    
    // Normalize the column
    double l2norm = nml_mat_col_l2norm(Q, j);
    if (l2norm > NML_MIN_COEF) {
        nml_mat_col_mult_r(Q, j, 1.0 / l2norm);
        R->data[j][j] = l2norm;
    }
    
    nml_mat_free(aj);
  }
  qr->Q = Q;
  qr->R = R;
  return qr;
} 
```

**Technical Note:** The Classical Gram-Schmidt (CGS) implemented here can sometimes suffer from numerical instability due to rounding errors, leading to a loss of orthogonality in $Q$. For high-precision requirements, the **Modified Gram-Schmidt (MGS)** or **Householder Reflections** are typically preferred.

# Conclusion: From Arrays to Algorithms

Congratulations! 

You have just journeyed from the absolute basics of memory allocation in C to implementing some of the most coolest algorithms in numerical linear algebra. 

**Happy Coding!**

# References

* https://stattrek.com/matrix-algebra/echelon-transform.aspx?tutorial=matrix
* http://lampx.tugraz.at/~hadley/num/ch2/2.3a.php
* https://www.youtube.com/watch?v=FAnNBw7d0vg
* https://en.wikipedia.org/wiki/Norm_(mathematics)
* https://en.wikipedia.org/wiki/Dot_product
