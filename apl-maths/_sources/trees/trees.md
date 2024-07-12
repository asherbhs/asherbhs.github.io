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

- depth vector representation
    - what you get out of ⎕xml
    - slow to work with subtrees
- path matrix representation
    - construction from depth vector
    - distances between nodes
    - oh no it's O(nd)
- parent vector representation
    - this is super great
    - basic operations
        - find children: `⍸p∊i`
        - find leaves:   `p~⍨⍳≢p`
        - find roots:    `I⍣≡⍨p`
            - note forests are possible
    - ordering
        - don't need to maintain dfpt order
        - need to maintain sibling order if it matters for your operation
- relationship to depth vector
    - construction from depth vector
    - finding depths (not guaranteed to be dfpt order)
- forests
    - join multiple into a forest
    - split multiple into individual (deforest)
    - exercise: join all trees in a forest under 1 root: `{0,(⍵≠⍳≢⍵)×1+⍵}`
- bottom-up traversal
    - Lisp
        - using key
        - without using key
        - using a fold
    - GV as an example
    - PP as another example, copy and use me
    - exercise
        - sum each tree in a forest
        - sanity check: sum of trees should equal sum of all values
- top-down construction
    - Nary
        - challenge: find Mary
    - Collatz
    - Leet as an example
