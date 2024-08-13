---
jupytext:
  formats: md:myst
  text_representation:
    extension:        .md
    format_name:      myst
    format_version:   0.13
    jupytext_version: 1.11.5
kernelspec:
  display_name: Dyalog APL
  language:     Dyalog APL
  name:         dyalog_apl
---

# Combinations and Bijective Proofs

```{code-cell}
⎕IO←1
```

In this section, we're going to encounter one of the most basic and useful concepts in combinatorics: *combinations*.

A *combination* is a selection distinct elements from a set, without repetition, where we don't care about the order we pick elements. For example, given the set `'🍎🍌🍊🍐🍇'`, `'🍎🍌🍊'` is a combination of $3$ elements from the set. It is different to the combination `'🍎🍌🍇'`, but the same as the combination `'🍊🍌🍎'`, since we don't care about order. A *$k$-combination* is a combination of exactly $k$ elements from the set.

There are $10$ $3$-combinations of our set `'🍎🍌🍊🍐🍇'`:

```
🍎🍌🍊
🍎🍌🍐
🍎🍌🍇
🍎🍊🍐
🍎🍊🍇
🍎🍐🍇
🍌🍊🍐
🍌🍊🍇
🍌🍐🍇
🍊🍐🍇
```

It's probably clear where we're going with this. If we have a set of $n$ elements, how many $k$-combinations of elements from that set are there? This is very similar to a question we've already answered. We've already seen that there are `(!n)÷!n-k` $k$-*permutations* of an $n$ element set, so this is a good starting point. There are more $k$-permutations of a set than there are $k$-combinations of the same set, since the order that we select elements matters in a permutation, but not in combinations: `'🍏🍊'` and `'🍊🍏'` are the same combination of items, but they are different permutations.

For example, there are $60$ $3$-permutations of `'🍎🍌🍊🍐🍇'`, which we can group by which $3$-combinations they are equivalent to:

```
🍎🍌🍊  🍎🍌🍐  🍎🍊🍐  🍌🍊🍐  🍎🍌🍇  🍎🍊🍇  🍌🍊🍇  🍎🍐🍇  🍌🍐🍇  🍊🍐🍇
🍎🍊🍌  🍎🍐🍌  🍎🍐🍊  🍌🍐🍊  🍎🍇🍌  🍎🍇🍊  🍌🍇🍊  🍎🍇🍐  🍌🍇🍐  🍊🍇🍐
🍌🍎🍊  🍌🍎🍐  🍊🍎🍐  🍊🍌🍐  🍌🍎🍇  🍊🍎🍇  🍊🍌🍇  🍐🍎🍇  🍐🍌🍇  🍐🍊🍇
🍌🍊🍎  🍌🍐🍎  🍊🍐🍎  🍊🍐🍌  🍌🍇🍎  🍊🍇🍎  🍊🍇🍌  🍐🍇🍎  🍐🍇🍌  🍐🍇🍊
🍊🍎🍌  🍐🍎🍌  🍐🍎🍊  🍐🍌🍊  🍇🍎🍌  🍇🍎🍊  🍇🍌🍊  🍇🍎🍐  🍇🍌🍐  🍇🍊🍐
🍊🍌🍎  🍐🍌🍎  🍐🍊🍎  🍐🍊🍌  🍇🍌🍎  🍇🍊🍎  🍇🍊🍌  🍇🍐🍎  🍇🍐🍌  🍇🍐🍊
```

For each $3$-combination, we can see that there are `!3 ←→ 6` $3$-permutations of that combination's elements. In general, for each $k$-combination of items, there are `!k` permutations of that combination. So, in our formula `(!n)÷!n-k` for counting $k$-permutations, we are overcounting combinations by a factor of `!k`. This leads us to a formula for the number of $k$-combinations:

```
((!n)÷!n-k)÷!k ←→ (!n)÷(!k)×!n-k
```

By dividing by `!k`, we are undoing the overcounting in the partial permutations formula.

Along with the factorial, this is one of the most useful quantities in combinatorics, so it too gets it own name: the *binomial coefficient*. We'll see where this name comes from later. The binomial coefficient takes up the dyadic form of `!`:

```{code-cell}
k n←3 5           ⍝ 3-combinations of 5 items
(!n)÷(!k)×!n-k
k!n
```

You might like to read `k!n` as '$k$ from $n$' or similar. Note that our formula `(!n)÷(!k)×!n-k` will `DOMAIN ERROR` when `k>n`. This is because then `(n-k)<0`, so `!n-k` doesn't make any sense. This aligns with our intuition for combinations, since you can't take more elements from a set than there are. `k!n` is slightly more tolerant; it will evaluate to `0` when `k>n`, rather than `DOMAIN ERROR`ing, indicating that are no ways to take $k$ elements from the set.

```{code-cell}
k n←6 5           ⍝ trying to take 6 things from a set of 5
(!n)÷(!k)×!n-k
k!n
```

In traditional mathematical notation, `k!n` is written as

$$
\binom{n}{k}=\begin{cases}
    \frac{n!}{k!(n-k)!} & k\le n \\
    0                   & k>n
\end{cases}
$$

This notation is usually read as '$n$ choose $k$'.

Here's an interesting thing to note about the binomial coefficient. `k!n` and `(n-k)!n` will always evaluate to the same number. To see why, let's view combinations from another perspective. Take our trusty set of fruits `'🍎🍌🍊🍐🍇'`. Let's mark which of those we're choosing in the combination `'🍎🍊🍐'` with a $1$, and the rest with a $0$.

```{code-cell}
'🍎🍌🍊🍐🍇'∊'🍎🍊🍐'
```

This is nice representation of a combination, since it doesn't matter what order we put our choices in:

```{code-cell}
⍝ reverse order of combination, same result
'🍎🍌🍊🍐🍇'∊'🍐🍊🍎'
```

This representation gives us a new way to look at combinations - out of a sequence of $n$ $0$s, we choose $k$ to turn into ones. Equally, you can view this as a sequence of $n$ $1$s, where we choose $n-k$ to turn into $0$s. In other words, we're choosing $n-k$ to *not* select. Since there are the same number of ways to choose $k$ items as there are to discard $n-k$ items, it must be the case that `(k!n)≡(n-k)!n`.

## Pascal's Triangle and Bijective Proofs

To study the binomial coefficient in more detail, it will be helpful to look at its function table:

```{code-cell}
⍉∘.!⍨0,⍳7
```

Don't get tripped up! Note that `k!n` is defined for all $k$ and $n$ which are non-negative integers, *including* $0$. This means the value at `p[n;k]` is `(k-1)!n-1`, since we are working in `⎕IO←1`.

The triangle in this table is called *Pascal's triangle*, and has been studied for centuries[^pascal] for its many interesting patterns. First of all, we can easily see the property we just proved (`(k!n)≡(n-k)!n`) by the fact that each row is symmetrical (ignoring `0`s). Another thing to notice about the triangle is that each item is the sum of the item directly the above, and the item before that. For example, the $6$ in the $5$th row is the sum of the two $3$s in the row above. So we could also generate the trangle by starting with the first row and repeatedly summing adjacent items:

[^pascal]: Although it is named after French Mathematician [Blaise Pascal](https://en.wikipedia.org/wiki/Blaise_Pascal), Pascal's triangle was discovered and studied for centuries before him.

```{code-cell}
⍪{⍵,⊂1,(2+/⊃⌽⍵),1}⍣7⊂,1    ⍝ ↑-ing this would give the same matrix as we saw before
```

Stated more formally, we're saying that `k!n ←→ (k!n-1)+(k-1)!n-1`. There's more than one way we can prove this. We *could* go about it algebraically, but that would be long and unenlightening. You can find the algebraic proof in the footnotes if you're interested in it[^algebraic-proof]. Instead, it's equally valid to prove this by talking about what it's describing.

[^algebraic-proof]: $$\begin{aligned}
    \binom{n-1}{k}+\binom{n-1}{k-1}&=\frac{(n-1)!     }{k!((n-1)-k)!} +\frac{(n-1)! }{(k-1)!((n-1)-(k-1))!} \\
                                   &=\frac{(n-1)!     }{k!(n-k-1)!  } +\frac{(n-1)! }{(k-1)!(n-k)!        } \\
                                   &=\frac{(n-1)!(n-k)}{k!(n-k)!    } +\frac{(n-1)!k}{k!    (n-k)!        } \\
                                   &=\frac{(n-1)!((n-k)+k)}{k!(n-k)!} \\
                                   &=\frac{(n-1)!n        }{k!(n-k)!} \\
                                   &=\frac{n!             }{k!(n-k)!} \\
                                   &=\binom{n}{k}
\end{aligned}
$$

`k!n` is the number of ways to pick a combination of $k$ items from an $n$ element set. To pick a combination, for each item in the set, we have two options. We can either (1) pick it, and pick `k-1` more items from the remaining `n-1` elements of the set, or (2) not pick it, and instead pick all `k` items from the remaining `n-1` elements. There are `(k-1)!n-1` ways for (1), and `k!n-1` ways for (2). So, in total, there are `(k!n-1)+(k-1)!n-1` ways to pick a combination of $k$ items from an $n$ element set. Therefore, `k!n ←→ (k!n-1)+(k-1)!n-1`.

This kind of proof, where we show that two different expressions count the same thing (or, in general, the same number of things), is called a *bijective proof*, and they are used throughout combinatorics. Let's do another one to get a better feel of the process.

If you were playing around with Pascal's triangle, you might notice a pattern that arises from summing along its rows.

```{code-cell}
⊢p←⍉∘.!⍨0,⍳7
+/p
```

Those are all powers of $2$! Specifically, each `n+1`th row of the triangle sums to `2*n`, which we can write formally as `+/(0,⍳n)!n ←→ 2*n` (note that `!` is pervasive like `+`, `×` and friends, so `a b c!n ←→ (a!n) (b!n) (c!n)`).

Again, we can prove this alegebraically, but it's much more insightful to prove it bijectively. `+/(0,⍳n)!n` is the number of ways to pick a $1$-combination from $n$ items, plus the number of ways to pick a $2$-combination, and a $3$-combination, and so on until $n$-combination. In other words, it is the number of ways to pick a combination of any size. The number of ways to pick a combination of any size can also be described differently. For each item in the set, we have $2$ choices: either we can pick it or we can not pick it. Therefore there are `2*n` ways to pick a combination of any size from an $n$ element set. Since both `+/(0,⍳n)!n` and `2*n` count the number of ways to pick a combination of any size from an $n$ element set, the expressions must be equal for all $n$.

## The Binomial Theorem

Now, we're ready to see the namesake of the binomial coefficient `k!n`. Take a look at the expansion of $(a+b)^n$ for some small values of $n$:

$$
\begin{aligned}
    (a+b)^2&=a^2+\mathbf{2}ab+b^2 \\
    (a+b)^3&=a^3+\mathbf{3}a^2b+\mathbf{3}ab^2+b^3 \\
    (a+b)^4&=a^4+\mathbf{4}a^3b+\mathbf{6}a^2b^2+\mathbf{4}ab^3+b^4 \\
    (a+b)^5&=a^5+\mathbf{5}a^4b+\mathbf{10}a^3b^2+\mathbf{10}a^2b^3+\mathbf{5}ab^4+b^5 \\
    \vdots
\end{aligned}
$$

Those coefficients might be ringing some bells in your head. They're exactly the numbers in Pascal's triangle! This is no coincidence. When we multiply by $(a+b)$, the distributive law creates two different sub-expressions, one where everything is multiplied by $a$, and another where everything is multiplied by $b$. This leads to the eventual result being made up of strings of $a$s and $b$s multiplied together in all possible ways, for example:

$$
\begin{aligned}
    (a+b)^3&=(a+b)(a+b)(a+b) \\
           &=(a+b)(aa+ab+ba+bb) \\
           &=aaa+aab+aba+abb+baa+bab+bba+bbb \\
           &=a^3+3a^2b+3ab^2+b^3 \\
\end{aligned}
$$

A we can think of each string of $a$s and $b$s as just a relabelling of a binary string, where each $1$ is replaced by an $a$, and each $0$ by a $b$. This is exactly a representation of combinations that we've already seen! This means that the coefficient on, for example, $a^2b$ must be the same as the number of combinations of $2$ items from a set of $3$ elements - `2!3` or $\binom{3}{2}$. In general, this gives us the *binomial theorem*:

$$
(a+b)^n=\sum_{k=0}^n\binom{n}{k}a^kb^{n-k}
$$

Since $\binom{n}{k}$ is the *coefficient* in the *binomial* theorem, it takes the name *binomial coefficient*.

The reasoning behind the binomial theorem is somewhat easier to grasp when written in traditional mathematical notation, but we can, of course, express the result in APL terms: `(a+b)*n ←→ +/(!∘n × (a*⌽) × b∘*)0,⍳n`. 

```{code-cell}
a b n←3 4 5
(a+b)*n
+/(!∘n × (a*⌽) × b∘*)0,⍳n
```

```{admonition} Aside
Essentially, when we take a combination of items from a set, we're splitting it into two partitions: the items we take and the items we don't. We can generalise this to more partitions. If we have some group sizes $k_1,k_2,\ldots,k_r$ whose sum is $n$, there are

$$\binom{n}{k_1,k_2,\ldots,k_r}=\frac{n!}{k_1!k_2!\cdots k_r!}$$

ways to split the $n$ element set into partitions with sizes $k_1,k_2,\ldots,k_r$. This is the *multinomial* coefficient.

Splitting into two groups with sizes $k$ and $n-k$ specialises the multinomial coefficent to the familiar binomial coefficent we've been studying in this section.
```

```{important}
- A *combination* is an unordered selection of distinct elements from a set.
- A *$k$-combination* is a combination of exactly $k$ elements.
- There are `k!n ←→ (!n)÷(!k)×!n-k` $k$-combinations from an $n$ element set. This is the *binomial coefficient*.
- The function table of `!` gives us Pascal's triangle.
- `k!n ←→ (k!n-1)+(k-1)!n-1`
- A *bijective proof* is a way of showing two formulas are equivalent by showing that they count sets which are the same size.
- The sum of a row of Pascal's triangle is a power of two, since it's related to counting all combinations of elements of a set.
- The binomial coefficient features in the expansion of $(a+b)^n$ in the *binomial theorem*.
```
