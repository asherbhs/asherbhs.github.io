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

# Integer Partitions

```{code-cell}
⎕IO←1
```

So far, we've covered many different variations of our balls into boxes scenario. We're going to cover just one more before we tie them all up in a neat package. This last problem has a nice interpretation as partitioning a number into parts, and is also the first problem we're looking at which doesn't have a nice closed form for its count.

We're going to consider the case where we have unlabelled balls, and unlabelled boxes. To begin with, we're also going to restrict ourselves to surjective functions, so there must be at least one ball in each box. This is equivalent to counting the number of ways to write the integer $k$ as the sum of $n$ positive integers. These are called the *integer partitions* of $k$ into $n$ parts (not to be confused with *set* partitions which we saw [in a previous section](./inclusion-exclusion.md). For example, there are $8$ partitions of $10$ into $3$ parts:

```{code-cell}
⍪p←(8 1 1) (7 2 1) (6 3 1) (6 2 2) (5 4 1) (5 3 2) (4 4 2) (4 3 3)
+/¨p
```

We can think of each partition as a map of a balls into boxes placement, with each number indicating that many balls are placed in the box at that position.

```{code-cell}
⍪5 3 2⍴¨'*'    ⍝ 5 balls in the first box, 3 in the second, and 2 in the third
```

Note that since our boxes are unlabelled, we don't care about the ordering of these numbers. The partition `7 2 1` is the same as the partition `2 1 7`. Labelling boxes leads to the 'stars and bars' scenario we looked at in the [previous section](./stars-bars.md). We'll be representing each partition with its terms in decreasing order, for consistency.

If we remove the surjectivity restriction, we find ourselves counting ways to partition $k$ into *at most* $n$ parts. For example, there are $14$ ways to partition $10$ into at most $3$ parts.

```{code-cell}
p,←(9 1) (8 2) (7 3) (6 4) (5 5) (,10)
⍪p
+/¨p
```

When we set $n$ to be greater than or equal to $k$, we count the number of ways to partition $k$ into *any number* of parts, since we can't have a partition longer than `1+1+..+1`. We won't enumerate all the ways to partition $10$ here because there are a lot of them, but if you like you can confirm that there are $42$.

Sadly, there is no known closed form for any of these quantities! The only way to find them is to generate them, which we will get to in the next section, where we will also be implementing algorithms for all the counting problems we've seen so far. Before we do, let's look at some interesting properties of integer partitions.

Let's visualise our balls into boxes placements again, this time as a matrix, with each ball indicated by a $1$.

```{code-cell}
5 3 2⍴⍤0⊢1
```

This way of representing a partition is called a [*Young tableau*](https://en.wikipedia.org/wiki/Young_tableau)[^tableau], *Young diagram*, or *Ferrers diagram*.

[^tableau]: We are using a slightly different representation to what you'll find in the linked article, where we have $0$s indicating the absence of a box. We could use a nested ragged array instead, but the matrix representation gives us some nice extra properties.

Young tableaux of partitions suggest some interesting transformations we can perform on them. For instance, when we transpose a tableau, we get a new tableau which represents a different partition of the same integer:

```{code-cell}
⊢p←5 3 2⍴⍤0⊢1
⊢q←⍉p
+/q
(+/+/p) (+/+/q)
```

This is called the partition's *conjugate*. Since each partition has exactly one conjugate partition (`⍉` is a bijection on partitions), we know that the number of partitions of $k$ into $n$ parts must be the same as the number of partitions of $n$ into $k$ parts.

Some partitions are *self-conjugate*. That is, their Young tableau is symmetric down its leading diagonal so the partition equals its conjugate. For example, `7 6 4 4 2 2 1` is a self-conjugate partition of $26$.

```{code-cell}
⊢p←7 6 4 4 2 2 1⍴⍤0⊢1
p≡⍉p
```

It turns out that the number of self-conjugate partitions of some $k$ is exactly the same as the number of partitions of $k$ into distinct odd parts. For example, `13 9 3 1` has only odd terms, which are all different, so it is a distinct odd partition of $26$. To prove this, let's look at the Young diagram for our self-conjugate partition. We're going to label each ball by its 'layer' in the diagram.

```{code-cell}
⊢p←7 6 4 4 2 2 1⍴⍤0⊢1
⊢l←' ABCD'[1+p×∘.⌊⍨⍳≢p]
```

If we count how many squares are labelled with each letter, we get exactly our distinct odd partition!

```{code-cell}
'ABCD'(+/⍣2∘.=)l
```

This is because we can imagine 'unfolding' our self-conjugate tableau, so that each 'layer' matches a row of the tableau of a distinct odd partition like so:

```{code-cell}
p←7 6 4 4 2 2 1⍴⍤0⊢1
' ABCD'[1+p×∘.⌊⍨⍳≢p]
q←13 9 3 1⍴⍤0⊢1
' ABCD'[1+q×⍤1 0⍳≢q]
```

That's a neat picture, but it takes some more effort to conclusively prove that this works. To do that, for each $1$ in a Young tableau, let's write the number of $1$s below and to the right of it, including the $1$ itself. We'll call these the *hook numbers* of each place.

```{code-cell}
p
⊢h←⊖⌽(⊢-⍨+⍀++\)⊖⌽p
```

Note the non-zero numbers on the leading diagonal - they are the terms of the distinct odd partition which corresponds to this self-conjugate partition.

```{code-cell}
4↑1 1⍉h
```

For a self-conjugate partition, the hook numbers along the leading diagonal must be odd, since the number of $1$s below and to the right are equal, so their sum is even, and we add the $1$ itself. The hook numbers are necessarily decreasing (as a consequence of us ordering partitions in decreasing order), so the numbers along the leading diagonal must be odd. This means that we have a (bijective) correspondence between self-conjugate partitions of $k$ and distinct odd partition of $k$ by finding these diagonal hook numbers. Therefore, the number of self-conjugate partitions must be equal to the number of distinct odd partitions.

```{important}
- An *integer partition* of $k$ is a set of positive integers which sum to $k$.
- Integer partitions correspond to counting ways of placing unlabelled balls into unlabelled boxes, possibly with at least one per box.
- There is no known closed form for the number of integer partitions of $k$.
- We can represent an integer partition as a *Young tableau*.
- Any integer partition has a *conjugate partition*, which can be found by transposing the Young tableau.
- An integer partition which is its own conjugate is *self-conjugate*.
- Every self-conjugate partition has a corresponding distinct odd partition, found by unfolding its Young tableau.
- There are therefore an equal number of self-conjugate partitions of $k$ and distinct odd partitions of $k$.
```
