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

Say we want to delete node $3$ and all of its descendants. We can mask all nodes which aren't node $3$ or one of its descendents using a method we've seen before.

```{code-cell}
⊢mask←3≠p I@{⍵≠3}⍣≡⍳≢p
mask PPV p
```

The first step will be to remove node $3$ and its descendents from the parent vector using this mask.

```{code-cell}
mask/p
```

Like so many times before, we're now left with parent pointers which need correcting. The parent pointers we have now are pointing to nodes in the original `p`.
