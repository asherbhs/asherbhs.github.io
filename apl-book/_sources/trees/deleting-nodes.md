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

# Deleting Nodes

One fundamental tree operation we haven't covered yet is deleting nodes. 

```{code-cell}
:tags: [remove-cell]

⎕IO←0
I←{⍺[⍵]}
]box on

⍝ renders a tree given labels, box drawing characters, and padding
⍝     ┌─────── vector of character matrices giving the labels for each node
⍝     │ ┌───── box drawing characters to render the tree, e.g: '─┌┬┐│┴├┼┤│'
⍝     │ │                                               normal ─┴───┘└───┴─ upstruck
⍝     │ │ ┌─── number of spaces to pad with between sub-tree
⍝     │ │ │ ┌─ parent vector
_pp_←{v b s p←⍺ ⍺⍺ ⍵⍵ ⍵
    d←p≠⍳≢p
    _←{
        q←p[⍵]
        d+←⍵≠q
        q
    }⍣≡p
    md←⌈/d
    r←v        ⍝ result of rendering each sub-tree, seeded with labels
    md=0: r    ⍝ avoid the each running on the prototype
    _←{
        i←⍸d=⍵    ⍝ nodes at this depth
        F←{                                          ⍝ ⍺ parent, ⍵ rendered child sub-trees
            ws←(1⊃⍴)¨⍵                               ⍝ widths of each rendered child
            w←s-⍨+/s+ws                              ⍝ eventual width of the rendered tree       wwwwwww
            cs←(+\0,¯1↓s+ws)+¯1+⌈2÷⍨ws               ⍝ centres of each rendered sub-tree         ∘ss∘ss∘
            t←w⍴' '                                  ⍝ header to be decorated                   '       '
            t[(⊢⊢⍤/⍨((⊃⌽cs)>⊢)∧(⊃cs)<⊢)⍳w]←b[0]      ⍝ add horizontal bar                       ' ───── '
            t[   ⊃ cs]←b[1]                          ⍝ left end of bar                          '┌───── '
            t[   ⊃⌽cs]←b[3]                          ⍝ right end of bar                         '┌─────┐'
            t[¯1↓1↓cs]←b[2]                          ⍝ connectors to intermediate children      '┌──┬──┐'
            t[(1=≢cs)⍴⊃cs]←b[4]                      ⍝ if there's only one child, just make it a lone upstrike
            c←¯1+⌈2÷⍨w                               ⍝ index of the centre of the rendered tree     ∘
            t[c]←b[5 6 7 8 9][b[0 1 2 3 4]⍳t[c]]     ⍝ connector to the parent                  '┌──┼──┐'
            t⍪←(-s)↓⍤1⊃,/,∘(s⍴' ')⍤1¨((⌈/≢¨)↑¨⊢)⍵    ⍝ pad lables, join under header
            rp←⍺⊃r                                   ⍝ label of the parent
            ww←1⊃⍴rp                                 ⍝ width of label of parent
            cc←¯1+⌈2÷⍨ww                             ⍝ centre of label of parent
            t ←((c-cc)⌽ww↑⍤1⊢)⍣(w<ww)⊢t              ⍝ pad and recentre text so far if it's less wide
            rp←((cc-c)⌽ w↑⍤1⊢)⍣(w>ww)⊢rp             ⍝ pad and recentre parent label if it's less wide
            t⍪⍨←rp                                   ⍝ add parent label
            r[⍺]←⊂t                                  ⍝ record result
            ⍬
        }
        _←p[i]F⌸r[i]
        ⍬
    }¨⌽1+⍳md    ⍝ bottom up accumulation
    r/⍨p=⍳≢p    ⍝ return results at roots only
}

PPV←{⍺←'∘' ⋄ v p←⍺⍵ ⋄   ((≢p)⍴⍉⍤⍪⍤⍕¨'∘'@(0=≢¨)v)('─┌┬┐│┴├┼┤│'_pp_ 1)p}    ⍝ vertical
PPH←{⍺←'∘' ⋄ v p←⍺⍵ ⋄ ⍉¨((≢p)⍴  ⍪⍤⍕¨'∘'@(0=≢¨)v)('│┌├└─┤┬┼┴─'_pp_ 0)p}    ⍝ horizontal
```

We saw previously a way to select sub-trees of a tree with a mask. For instance given the following tree:

```{code-cell}
p←1 7 4 1 7 6 3 7 6 1
(⍳≢p) PPV p
```

Say we want to delete node $3$ and all of its descendants. We can mask all nodes which are node $3$ or one of its descendents using a method we've seen before.

```{code-cell}
⊢mask←3=p I@{⍵≠3}⍣≡⍳≢p
mask PPV p
```

The first step will be to remove node $3$ and its descendents from the parent vector using this mask.

```{code-cell}
(~mask)/p
```

Like so many times before, we're now left with parent pointers which need correcting. In the original `p`, a certain number of to-be-deleted nodes may have appeared before each node which was not deleted. After deleting the sub-tree, each node is therefore that many places farther back in the vector, and we need to correct the pointers to reflect that.

For instance, there are $3$ nodes which we will remove that appear before node $7$ in `p`, so when the nodes are removed, node $7$ will move to index $7-3=4$, and we need to update parent pointers accordingly.

```
index:     0 1 2 3 4 5 6 7 8 9
p:         1 7 4 1 7 6 3 7 6 1
mask:      0 0 0 1 0 1 1 0 1 0
                 ↑   ↑ ↑ ↑
  to-be-deleted ─┴───┴─┘ │
                   ┌─────┘
                   ↓
(~mask)/p: 1 7 4 7 7 1
```

We saw a similar situation when we were [extracting trees from forests](forests.md#deforestation), where parent pointers were offset too far. In that instance, we found the offsets to correct by with a `+\` on the mask of deleted nodes. We can use the same technique here, but for completeness, we're going to show another way[^performance].

[^performance]: Additionally, I ran some performance tests and found that the scan technique was faster for deforesting, while the technique described here was faster for the general task of deleting sub-trees.

Firstly, let's find the indices of all the nodes being deleted.

```{code-cell}
⍸mask
```

These indices define intervals, within which we know how many to-be-deleted nodes have appeared. For example, we know that $3$ such nodes appear before node $7$.

```{code-cell}
  1+(⍸mask)⍸7    ⍝ 3 to-be-deleted nodes appear before node 7
⍝ ││└───────┴───── in which interval does node 7 appear
⍝ └┴────────────── using ⎕IO←0 means we have to make this adjustment
```

This tells us exactly what to subtract in order to correct each parent pointer.

```{code-cell}
q←(~mask)/p          ⍝ delete unwanted nodes
  1+(⍸mask)⍸q        ⍝ deleted nodes appearing before each parent
q-1+(⍸mask)⍸q        ⍝ correcting the pointers
```

This correctly removes the whole sub-tree descending from node $3$.

```{code-cell}
PPV q-1+(⍸mask)⍸q
```

We can put this all together into a tacit idiom we can easily reuse.

```{code-cell}
    (⍸mask)(⊢-1+⍸)(~mask)/p
PPV (⍸mask)(⊢-1+⍸)(~mask)/p
```
