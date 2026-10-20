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

Quick recap: A real square matrix $A$ can be decomposed into $A = Q R$, where $R$ is an **upper triangular** matrix and $Q$ is an **orthonormal** matrix.

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

This leads us to the **Schur Factorization**. Over the complex numbers, every square matrix has a factorization $A=QUQ^{*}$, where $Q$ is unitary and $U$ is upper triangular. For a real matrix, a real orthogonal $Q$ gives a **quasi-upper-triangular** Schur form: its diagonal contains $1\times1$ blocks for real eigenvalues and $2\times2$ blocks for complex conjugate pairs.



Because $A$ and $U$ are similar, they have the same eigenvalues. For a triangular $U$, these are its diagonal entries. For a real quasi-triangular $U$, we must also compute the eigenvalues of its $2\times2$ blocks; reading only the diagonal would miss the complex pairs.

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

Mathematically, $A_k$ is related to $A_{k-1}$ through a similarity transformation: $A_k = Q_k^{-1} A_{k-1} Q_k$. If you follow the chain back to the start, $A_k$ is similar to our original matrix $A$. When this iteration converges to a triangular matrix, the sub-diagonal entries approach zero and its diagonal approximates the eigenvalues. Convergence is not automatic: a real rotation matrix has complex eigenvalues, and even some symmetric matrices make this simple iteration cycle. We must check the result before interpreting its diagonal.



## Implementing the Naive Algorithm

Using [NumPy](https://numpy.org/), we can see this in action on a reproducible symmetric positive-definite example. The teaching routines below accept real square matrices and return only after reaching an approximately triangular form; they raise an error if they fail to converge. They do not handle real Schur blocks. For general matrices, use the library example later in the article.

```python
import numpy as np
from tabulate import tabulate

# A reproducible symmetric positive-definite matrix
A = np.array([[5.0, 1.0, 0.0],
              [1.0, 3.0, 1.0],
              [0.0, 1.0, 1.0]])
print("Initial Matrix A:")
print(tabulate(A))

def qr_input(A):
    if np.iscomplexobj(A):
        raise ValueError("This teaching example accepts real matrices only")
    Ak = np.array(A, dtype=float, copy=True)
    if Ak.ndim != 2 or Ak.shape[0] != Ak.shape[1] or Ak.shape[0] == 0:
        raise ValueError("A must be a nonempty square matrix")
    if not np.isfinite(Ak).all():
        raise ValueError("A must contain only finite values")
    return Ak


def is_upper_triangular(A, tol):
    # Scale first so the convergence test is relative to the matrix size.
    scale = np.max(np.abs(A))
    if scale == 0:
        return True
    scaled = A / scale
    return np.linalg.norm(np.tril(scaled, -1)) <= tol * np.linalg.norm(scaled)


def eigen_qr_simple(A, iterations=10000, tol=1e-10):
    if not 0 < tol < 1:
        raise ValueError("tol must be between 0 and 1")
    Ak = qr_input(A)
    Z = np.eye(Ak.shape[0])  # Accumulated similarity transformation
    for _ in range(iterations):
        if is_upper_triangular(Ak, tol):
            return Ak, Z
        Q, R = np.linalg.qr(Ak)
        Ak = R @ Q
        Z = Z @ Q
    if is_upper_triangular(Ak, tol):
        return Ak, Z
    raise RuntimeError("QR iteration did not converge to triangular form")

# Run the simple QR algorithm
Ak, schur_vectors = eigen_qr_simple(A)

print("\nFinal Ak (upper triangular within tolerance):")
print(tabulate(Ak))

print("\nComputed Eigenvalues:")
print(np.diag(Ak))

print("\nOfficial NumPy Eigenvalues:")
print(np.linalg.eigvals(A))
```

For this example, the diagonal agrees with NumPy up to numerical error, possibly in a different order. The accumulated matrix satisfies $A Z \approx Z A_k$. Its columns are Schur vectors at convergence. They are eigenvectors when $A_k$ is diagonal, as in the symmetric example; an upper-triangular matrix with nonzero off-diagonal entries does not give that conclusion. The unshifted iteration can be very slow when eigenvalue magnitudes are close.

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

A simple choice for $s_k$ is the last diagonal entry of the current iterate. This is the **Rayleigh quotient shift** associated with the last coordinate vector, and it can accelerate convergence. It is not a guarantee: for $A=\begin{bmatrix}0&1\\1&0\end{bmatrix}$ the shift stays zero and this iteration cycles, although the eigenvalues are $1$ and $-1$.

```python
def eigen_qr_practical(A, iterations=1000, tol=1e-10):
    # Uses qr_input and is_upper_triangular from the previous example.
    if not 0 < tol < 1:
        raise ValueError("tol must be between 0 and 1")
    Ak = qr_input(A)
    n = Ak.shape[0]
    for k in range(iterations):
        if is_upper_triangular(Ak, tol):
            return Ak
        # s is the shift (the last element on the diagonal)
        s = Ak[n-1, n-1]
        shift = s * np.eye(n)
        
        # Decompose (Ak - sI)
        Q, R = np.linalg.qr(Ak - shift)
        
        # Recompose (RQ + sI)
        Ak = R @ Q + shift

    if is_upper_triangular(Ak, tol):
        return Ak
    raise RuntimeError("Shifted QR did not converge to triangular form")

# Test the practical version
Ak_shifted = eigen_qr_practical(A)
print("\nEigenvalues with Shifts:")
print(np.diag(Ak_shifted))
```

This remains a teaching example: it does not deflate converged blocks or choose shifts that handle every case. A production QR eigensolver combines these techniques with convergence checks. A fixed iteration count alone does not establish that the reported diagonal is correct.

For a general real matrix, SciPy can compute a complex Schur form whose diagonal includes complex eigenvalues:

```python
from scipy.linalg import schur

B = np.array([[0.0, -1.0], [1.0, 0.0]])
T, Z = schur(B, output="complex")
print(np.diag(T))  # Approximately +1j and -1j, in either order
assert np.allclose(B, Z @ T @ Z.conj().T)
```

The [SciPy Schur documentation](https://docs.scipy.org/doc/scipy/reference/generated/scipy.linalg.schur.html) explains the real and complex forms.

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



Every square matrix is similar to a Hessenberg matrix. After an initial $O(n^3)$ reduction, a QR implementation that exploits this structure can perform each eigenvalue iteration in $O(n^2)$, for example using Givens rotations and implicit updates. Passing a Hessenberg matrix to the dense `np.linalg.qr` and `R @ Q` code above does not implement that optimization.

```python
from scipy.linalg import hessenberg
H, Q_hess = hessenberg(A, calc_q=True)
# A structured Hessenberg QR implementation can now exploit the zeros.
```

---

# But what about the Eigenvectors?

Once you have the eigenvalues ($\lambda$), finding an eigenvector means finding a **nonzero** vector in the nullspace of $A-\lambda I$.

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
This gives us the eigenvector $\begin{bmatrix} 1 \\ -2 \end{bmatrix}$ (or any nonzero scalar multiple).

An ordinary solver for a unique solution, such as the LUP solver in my [NML library post](/2021/01/20/writing-your-own-linear-algebra-matrix-library-in-c#solving-linear-systems-of-equations), cannot do this directly: $A-\lambda I$ is singular at an exact eigenvalue. With an approximate eigenvalue it may be nonsingular, in which case the homogeneous system has only the zero solution. Use a nullspace method or an eigensolver such as `np.linalg.eig`:

```python
A = np.array([[3.0, 1.0], [0.0, 1.0]])
eigenvalues, eigenvectors = np.linalg.eig(A)
# Each column corresponds to the eigenvalue in the same position.
assert np.allclose(A @ eigenvectors, eigenvectors * eigenvalues)
```

# References

* [QR Algorithm - Wikipedia](https://en.wikipedia.org/wiki/QR_algorithm)
* [Schur Decomposition - Wikipedia](https://en.wikipedia.org/wiki/Schur_decomposition)
* [Hessenberg Form Tutorial](https://www.youtube.com/watch?v=t_bj3V9Ubac)
* [NumPy linalg.eig Documentation](https://numpy.org/doc/stable/reference/generated/numpy.linalg.eig.html)