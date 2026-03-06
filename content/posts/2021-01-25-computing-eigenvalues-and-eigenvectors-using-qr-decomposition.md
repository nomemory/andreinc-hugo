+++
title = "Computing Eigenvalues and Eigenvectors using QR Decomposition"
date = "2021-01-25"
usekatex = true
excerpt = "A short tutorial on how to compute Eigenvalues and Eigenvectors using QR Matrix Decomposition. Python code included."
categories = ["programming", "math"]
tags = ["python", "linear algebra"]
+++

{{<toc>}}

# Introduction

> In my last two articles, I explored some fundamental topics in linear algebra: [QR Decomposition](/2021/01/20/writing-your-own-linear-algebra-matrix-library-in-c#qr-decomposition), [linear transformations](/2021/01/20/eigenvalues-and-eigenvectors-explained#linear-transformations), and [Eigenvalues/Eigenvectors](/2021/01/20/eigenvalues-and-eigenvectors-explained#eigenvalues-and-eigenvectors). If you haven't done so, I recommend reading those first, as they provide the foundation for what we are about to do.

It might not be immediately obvious, but the QR Decomposition ($A = Q R$) of a matrix $A$ is a powerful tool for computing its eigenvalues and eigenvectors.

Quick recap: A square matrix $A$ can be decomposed into $A = Q R$, where $R$ is an **upper triangular** matrix and $Q$ is an **orthonormal** matrix.

Because $Q$ is orthonormal, it possesses unique properties that make computation a breeze:

<div class="mp mpc">
\[
Q^{T} Q = Q Q^{T} = I 
\]
\[
Q^{T} = Q^{-1} 
\]
</div>

Since the inverse of an orthonormal matrix is simply its transpose, we save ourselves from expensive matrix inversions.

Now, let's talk about **Similarity**. Two matrices $A$ and $B$ are **similar** if there exists a non-singular matrix $X$ such that: $B = X^{-1} A X$. Crucially, similar matrices share the same eigenvalues.

This leads us to the **Schur Factorization**. It states that every square matrix $A$ can be written as: $A = Q U Q^{-1}$ (or $Q U Q^{*}$ in the complex domain), where $Q$ is unitary and $U$ is **upper triangular**. 



Because $A$ and $U$ are similar, they have the same eigenvalues. And as we know, the eigenvalues of an upper triangular matrix are simply the elements on its **main diagonal**.

# Using QR Decomposition to Determine Eigenvalues

The algorithm, in its most basic "naive" form, is surprisingly simple:

```python
for i in range(iterations):
    Q, R = decompose_qr(A)
    A = R @ Q 
```

Under the right conditions, $A$ will eventually converge to its Schur Form ($U$). Why? Let's look at the sequence:

<div class="mp mpc">
\[
A_{0} = A
\]
\[
\text{For } k = 1, 2, \ldots
\]
\[
Q_{k}, R_{k} = \text{qr}(A_{k-1})
\]
\[
A_{k} = R_{k} Q_{k}
\]
</div>

Mathematically, $A_k$ is related to $A_{k-1}$ through a similarity transformation: $A_k = Q_k^{-1} A_{k-1} Q_k$. If you follow the chain back to the start, $A_k$ is similar to our original matrix $A$. As $k$ approaches infinity, the sub-diagonal elements of $A_k$ tend toward zero, leaving the eigenvalues sitting on the diagonal.



## Implementing the Naive Algorithm

Using [NumPy](https://numpy.org/), we can see this in action:

```python
import numpy as np
from tabulate import tabulate

# A is a square random matrix of size n
n = 5
A = np.random.rand(n, n)
print("Initial Matrix A:")
print(tabulate(A))

def eigen_qr_simple(A, iterations=500000):
    Ak = np.copy(A)
    n = A.shape[0]
    QQ = np.eye(n) # To accumulate eigenvectors
    for k in range(iterations):
        Q, R = np.linalg.qr(Ak)
        Ak = R @ Q
        QQ = QQ @ Q
        
        if k % 100000 == 0:
            print(f"Iteration {k}...")
            
    return Ak, QQ

# Run the simple QR algorithm
Ak, eigenvectors = eigen_qr_simple(A)

print("\nFinal Ak (Should be upper triangular):")
print(tabulate(Ak))

print("\nComputed Eigenvalues:")
print(np.diag(Ak))

print("\nOfficial NumPy Eigenvalues:")
print(np.linalg.eigvals(A))
```

In a "happy case," $Ak$ becomes upper-triangularish, and the diagonal elements match the official results perfectly. However, for larger matrices (like an $8 \times 8$), this naive approach is incredibly slow, and the CPU temperature will start climbing long before you see convergence.

---

# Improving the Algorithm: Practical QR with Shifts

The naive algorithm is a great theory, but it's computationally "heavy." To speed things up, we use **shifts**. We tweak the decomposition by subtracting a value $s_k$ (the shift) from the diagonal before decomposing, then adding it back:

<div class="mp mpc">
\[
A_{k} - s_{k}I = Q_{k}R_{k}
\]
\[
A_{k+1} = R_{k}Q_{k} + s_{k}I
\]
</div>

A common choice for $s_k$ is the last element of the diagonal ($A_{nn}$). This is called the **Rayleigh quotient shift**, and it forces the bottom-right element to converge to an eigenvalue much faster.

```python
def eigen_qr_practical(A, iterations=1000):
    Ak = np.copy(A)
    n = Ak.shape[0]
    for k in range(iterations):
        # s is the shift (the last element on the diagonal)
        s = Ak[n-1, n-1]
        shift = s * np.eye(n)
        
        # Decompose (Ak - sI)
        Q, R = np.linalg.qr(Ak - shift)
        
        # Recompose (RQ + sI)
        Ak = R @ Q + shift
        
    return Ak

# Test the practical version
Ak_shifted = eigen_qr_practical(A)
print("\nEigenvalues with Shifts:")
print(np.diag(Ak_shifted))
```

The difference is night and day. With shifts, the matrix converges in a fraction of the time.

---

# More Improvements: The Hessenberg Form

Even with shifts, doing a full QR decomposition on a dense matrix is $O(n^3)$ per iteration. To optimize this, we first transform $A$ into an **Upper Hessenberg Matrix**.

A Hessenberg matrix is almost upper triangular, but it allows for non-zero elements on the first sub-diagonal:

<div class="mp mpc">
\[
H = \begin{bmatrix}
\times & \times & \times & \times \\
\times & \times & \times & \times \\
0 & \times & \times & \times \\
0 & 0 & \times & \times 
\end{bmatrix}
\]
</div>



Every square matrix is similar to a Hessenberg matrix. If we start our QR iterations from this form, each step becomes $O(n^2)$, making the whole process significantly more efficient.

```python
from scipy.linalg import hessenberg
H, Q_hess = hessenberg(A, calc_q=True)
# Now run QR iterations on H instead of A!
```

---

# But what about the Eigenvectors?

Once you have the eigenvalues ($\lambda$), finding the eigenvectors is a matter of solving the linear system $(A - \lambda I)x = 0$.

Take our favorite example: 
<div class="mp mpc">
\[
    A = \begin{bmatrix} 3 & 1 \\ 0 & 1 \end{bmatrix}
\]
</div>

Eigenvalues are $\lambda_1 = 3$ and $\lambda_2 = 1$.

For $\lambda = 1$:
<div class="mp mpc">
\[
\begin{bmatrix} 3-1 & 1 \\ 0 & 1-1 \end{bmatrix} \begin{bmatrix} x_1 \\ x_2 \end{bmatrix} = \begin{bmatrix} 0 \\ 0 \end{bmatrix} \implies 2x_1 + x_2 = 0
\]
</div>
This gives us the eigenvector $\begin{bmatrix} 1 \\ -2 \end{bmatrix}$ (or any scalar multiple).

In code, you can solve these using a linear system solver like the ones I described in my [NML library post](/2021/01/20/writing-your-own-linear-algebra-matrix-library-in-c#solving-linear-systems-of-equations), or simply use NumPy's `np.linalg.eig(A)`, which returns both the values and the vectors in one go.

# References

* [QR Algorithm - Wikipedia](https://en.wikipedia.org/wiki/QR_algorithm)
* [Schur Decomposition - Wikipedia](https://en.wikipedia.org/wiki/Schur_decomposition)
* [Hessenberg Form Tutorial](https://www.youtube.com/watch?v=t_bj3V9Ubac)
* [NumPy linalg.eig Documentation](https://numpy.org/doc/stable/reference/generated/numpy.linalg.eig.html)