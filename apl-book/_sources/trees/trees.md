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

# Trees

- introduction
    - preliminary definitions
        - `I←{⍵[⍺]}`
        - `⎕IO←0`
    - references:
        - [aaron's thesis](https://scholarworks.iu.edu/dspace/items/3ab772c9-92c9-4f59-bd95-40aff99e8c7a)
        - aaron's talks
            - [text processing](https://dyalog.tv/Dyalog22/?v=5I4YPkVU7mY)
            - [tree wrangling](https://dyalog.tv/Dyalog18/?v=hzPd3umu78g)
        - [apter's article](http://archive.vector.org.uk/art10500340)
        - [tlack readme](https://github.com/tlack/atree/blob/master/README.md)
        - [ok docs](https://github.com/JohnEarnest/ok/blob/gh-pages/docs/Trees.md)
- depth vector and path matrix
    - depth vector
        - what you get out of ⎕json
        - slow to work with subtrees
    - path matrix
        - construction from depth vector
        - distances between nodes?
        - oh no it's O(nd)
    - parent vector
- parent vector representation
    - this is super great
    - basic operations
        - find children:    `⍸p∊i`
        - find leaves:      `p~⍨⍳≢p`
        - find roots:       `I⍣≡⍨p`
            - note forests are possible
        - select sub-trees: `I@{...}⍣≡⍨p`
        - snip:             `i@i⊢p`
    - ordering
        - don't need to maintain dfpt order
        - need to maintain sibling order if it matters for your operation
    - `_pp_ PPV PPH`
        - we will explain the general approach later
        - for now feel free to copy and use these for noodling
- relationship to depth vector
    - construction from depth vector
    - finding depths
    - imposing dfpt order
- forests
    - join multiple into a forest
    - split multiple into individual (deforest)
    - exercise: join all trees in a forest under 1 root: `{0,(⍵≠⍳≢⍵)×1+⍵}`
- deletion
- bottom-up acculumation
    - Lisp
        - using key
        - without using key
        - using a fold
    - go back and look at `_pp_`
    - challenges
        - sum each tree in a forest
            - sanity check: sum of trees should equal sum of all values
            - bonus: find `(I⍣≡⍨p)+/⍤⊢⌸v`
        - find height of every node in a tree
- top-down construction
    - Nary
        - challenge: find Mary
    - Collatz
    - Leet as an example
- leetcode problems
    - [invert](https://leetcode.com/problems/invert-binary-tree/)
    - [height balanced](https://leetcode.com/problems/balanced-binary-tree/)
    - [leaf similar](https://leetcode.com/problems/leaf-similar-trees/)
- manipulating json with matrix import ⎕json
    - grouping astronauts example
    - mention that ⎕xml uses a similar format
- small calculator as a larger example
    - point to co-dfns for more
