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

# Enumerative Combinatorics

```{code-cell}
⎕IO←1
```

## How to Count

Enumerative Combinatorics is, in essence, the study of counting. Of course, we all (hopefully) know how to count, but in this chapter we'll be using much more insightful techniques than you were taught as a child.

Let's start with a simple example. Say we have a group of people - Alice, Bob, and Charlie - and we ask them to pick their favourite from a group of colours - red, green, blue, and yellow. How many different ways can our hypothetical gang pick these colours? Well, Alice has $4$ choices, as do Bob and Charlie, so there are a total of `4×4×4 ←→ 4*3 ←→ 64` possibilities. This holds in general. Say we have `k` people and `n` colours, there are `n*k` ways for them to pick their favourite colours.

Consider another problem: we have a bookshelf nicely filled with $4$ books. How many ways are there to arrange our shelf? If we took all our books off the shelf and put them back on, one by one, we would have $4$ books to put the first place, then $3$ books to put the second, and so on. This means there are `4×3×2×1 ←→ 24` ways to rearrange the books. Such a rearrangement of items is called a *permutation*, so we can say that there are $24$ different permutations of $5$ books. For example, if our set of books is `'📕📘📘📙'`, a permutation of the books might be `'📘📙📘📕'`.

Our calculation to count the permutations nicely generalises - if we have $k$ books, then there are `k×(k-1)×(k-2)×...×2×1 ←→ ×/⍳k` permutations of them. In combinatorics, this quantity is used all the time, so it gets its own name: the *factorial*. APL has factorial built in as monadic `!`:

```{code-cell}
4×3×2×1
×/⍳4
!4
```

`!0` is defined as $1$, since that's the result of an empty product. We can also imagine the case of rearranging a bookshelf with no books on it. There's exactly one way to do this: doing nothing at all.

```{code-cell}
×/⍳0
!0
```

In traditional mathematical notation, the factorial is written postfix:

$$k!=k\times(k-1)\times(k-2)\times\cdots\times 2\times 1$$

Now let's consider a slightly more restricted scenario. We still want to put $4$ books onto our bookshelf, but now we're selecting from a larger collection of $7$ books. So, starting with an empty bookshelf, we have $7$ books which could go in the first place, $6$ books for the second, and so on until we have $3$ books remaining for the final place. This means there are `7×6×5×4 ←→ 840` arrangments of $4$ books from our collection of $7$ - a lot of choice! To calculate this, we want to take the whole product `7×6×5×4×3×2×1 ←→ !7` and chop off the trailing `3×2×1 ←→ !3`, which we can do by dividing them: `7×6×5×4 ←→ (!7)÷!3 ←→ (!7)×!7-5`. Since an arrangement of all our books is a permutation, an arrangement of only some of them is a *partial permutation* or *$k$-permutation* (for arrangements of $k$ books). For example, given out set of books `'📕📘📘📙'`, a $2$-permutation might be `'📙📘'`. In general, we only want the first $k$ terms in the factorial, so we want to chop off the last `n-k` terms. This tells us that there are `(!n)÷!n-k` *$k$-permutations* of $n$ items. 

These are the kinds of problems we're concerned with in enumerative combinatorics. Over the remainder of this chapter, we'll be returning to these problems as well as many more. Once we've covered enough ground, we're going to see a unified framework for looking at all sorts of counting problems called 'The Twelvefold Way'. At this point, we'll also look not just at counting all the possibilities for a problem, but also algorithms for generating them all.

```{important}
- Enumerative combinatorics is the study of counting finite structures.
- The factorial: `!k ←→ ×/⍳k ←→ k×(k-1)×(k-2)×...×2×1`, $k!$.
- A *permutation* is a rearrangement of a set.
- There are `!n` permutations of an $n$ element set.
- A *$k$-permutation* is an arrangement of exactly $k$ elements of a set.
- There are `(!n)÷!n-k` $k$-permutations of an $n$ element set.
```
