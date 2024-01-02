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

# Stars and Bars

```{code-cell}
⎕IO←1
```

We've considered several variants of our balls and boxes analogy, and now it's time to consider another. Suppose we have $n$ labelled boxes, and $k$ unlabelled balls, how many different ways are there to place these balls into the boxes? There are a few other ways to interpret this problem.

- How many ways are there to distribute $k$ identical cookies among $n$ people?
- How many ways can we roll $k$ dice with $n$ faces?
- How many degree-$k$ monomials are there in $n$ variables?

To answer these questions we're going to use a very specific representation. It will be helpful to represent some number of balls in a box as a string of stars and bars. For example, we could represent three balls in a box as:

$$\mid\star\star\star\mid$$

Then, we can represent many boxes by juxtaposing these strings, for example:

$$\mid\star\star\star\mid\mid\star\star\mid\mid\star\star\star\star\mid$$

But there's some redundancy in this representation. There will always be a bar at both ends of the string, and in the middle of the string the bars always come in pairs at the boundary of two boxes. We can remove these superfluous bars to simplify our representation:

$$\star\star\star\mid\star\star\mid\star\star\star\star$$

Note that, in this representation, the boxes are distinguished by their position in the string, while the balls are indistinguishable, as they are all represented by identical stars. With the exception of the first box, each box has a bar indicating where the previous box ends, and this box starts, so there are $n-1$ bars. This form will be helpful for understanding the unlabelled balls into labelled boxes problem, as it lets us rephrase our problem very concretely: how many ways are there to arrange a string of $k$ stars and $n-1$ bars?

To answer this, let's just consider the bars on their own. There are `k+n-1` total positions in the string, and we want to place `n-1` bars in place, and fill all the remaining spaces with stars. This gives us a very nice count for this problem:

```(n-1)!k+n-1```

Similarly, there are `k!k+n-1` ways to place down the stars first, and fill the rest of the spaces with bars. These must be the same since we're counting solutions to the same problem, and indeed we saw this in the section on the [binomial coefficient](./combinations-and-bijective-proofs.md).

Now let's modify this problem slightly. What if we wanted to ensure that each box had at least one ball placed into it? Or, to put it another way, we only want to count surjective functions for this problem. This turns out to be a very easy modification to make. First, we reserve $n$ balls, leaving us with `k-n` remaining balls. We then place these as normal with our stars and bars technique, with `k-n` instead of $k$ balls: `(n-1)!(k-n)+n-1 ←→ (n-1)!k-1`. We then place one of our $n$ reserved balls into each of the $n$ boxes, to ensure that each box receives at least one ball.
