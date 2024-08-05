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

# Bottom-Up Accumulation

We've covered lots of ways to play with the structure of a tree, but, similarly to how we often accumulate values in an array with a reduction, we often want to accumulate the values in a tree somehow, while respecting its structure. Usually, this involves working out way up from the bottom of the tree, with each parent combining the results of its children, until we reach the root.

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

Depths←{p←⍵
    depths←(≢p)⍴0
    _←{
        q←p[⍵]
        depths+←⍵≠q
        q
    }⍣≡⍳≢p
    depths
}
```

To show this process, let's reconstruct the nested representation of a tree, which we saw [earlier](representing-trees.md#the-nested-representation), from a parent vector.

Let's look again at a familiar tree.

```{code-cell}
p←0 0 1 2 2 1 0 6 7 7 7 0    ⍝ parent vector
v←,¨'abcdefghijkl'           ⍝ some associated data
v PPV p
```

Our goal is to reconstruct the nested representation of this tree.

```{code-cell}
(,'a') ((,'b') ((,'c') (,⊂,'d') (,⊂,'e')) (,⊂,'f')) ((,'g') ((,'h') (,⊂,'i') (,⊂,'j') (,⊂,'k'))) (,⊂,'l')
```

Something to note is that for leaf nodes, we have almost nothing to do. We can just wrap up the value of the node and we are done.

```{code-cell}
,⊂,'d'    ⍝ the nested representation of node d
```

We can represent non-leaf nodes by attaching the representations of all their children.

```{code-cell}
  (,'c') (,⊂,'d') (,⊂,'e')
⍝ └────┴─│──────│─│──────│─── representation of the parent
⍝        └──────┴─┴──────┴─── representations of the children
```

If we continue this process for all nodes, we will cover the whole tree. Since we're working from the bottom up, we want to start with nodes at the greatest depth, then proceed to the depths of their parents, then their grandparents, and so on.

```{figure} media/PVTreeAccumulate_ManimCE_v0.18.1.gif
:alt: The nodes of the tree falling upwards into their parents, one depth level at a time.

How we will accumulate the nodes of the tree.
```

To work from the deepest nodes upwards, we will need to know the depths of each node. Luckily for us, [we know how to do that](relating-depth-and-parent-vectors.md#recovering-depths).

```{code-cell}
⍝ note that this may not be a properly ordered depth vector, but that doesn't matter for our purposes here
⊢d←Depths p
```

For each node, we're going to accumulate the representation for it in a new vector `r`. We're going to seed it with just the values at each node as if each node was a leaf, and then update each ancestor as we go.

```{code-cell}
⊢r←⊂¨v
```

The maximum depth of our tree is $3$ in this case. We'll need to find which nodes are at this depth.

```{code-cell}
⊢i←⍸d=3
```

Next, we'll need to group these nodes by their parent, since we only want to each node to contribute to the representation of its parent, and no other nodes which happen to be on the same level.

```{code-cell}
p[i]{⍺⍵}⌸i
```

For each of these groups of children, we now need to append their representations to the representation of their particular parent.

```{code-cell}
p[i]{⊂(⊃r[⍺]),r[⍵]}⌸i
```

Finally, we store this in `r`, and we are ready to proceed to the next level up the tree.

```{code-cell}
_←p[i]{r[⍺],←⊂r[⍵]}⌸i
r
```

To run this over the entire tree, we first generate the depths of each level we need to visit, from the bottom up.

```{code-cell}
r←⊂¨v    ⍝ reset r
⌽1+⍳⌈/d
```

We can then repeat our process for each level.

```{code-cell}
_←{
    i←⍸d=⍵
    p[i]{r[⍺],←⊂r[⍵]}⌸i
}¨⌽1+⍳⌈/d
```

Now, `r` contains the representation for every node in the tree.

```{code-cell}
⍪r
```

The final step is to extract the representation of just the root node (or nodes, in the case of a forest).

```{code-cell}
(p=⍳≢p)/r
```

And we are done! This is the general format for accumulating values according to a tree. Indeed, [look back](parent-vectors.md#pretty-printing) at `_pp_` - it uses exactly this method.

Putting this together into a dfn, there's one more thing we need to worry about. When we have a tree or forest consisting of only root nodes, that is, all nodes have depth $0$, our `¨` will still run once on the prototype of `⌽1+⍳⌈/d`, leading to an incorrect result. Therefore, we will introduce a guard statement to avoid this.

```{code-cell}
ParentToNested←{
    p←⍵
    ⍺←⊂⍤,¨⍳≢p
    r←⍺
    d←Depths p
    md←⌈/d
    md=0: r
    _←{
        i←⍸d=⍵
        _←p[i]{r[⍺],←⊂r[⍵]}⌸i
        ⍬    ⍝ the interpreter will complain if we don't provide a result
    }¨⌽1+⍳md
    (p=⍳≢p)/r
}
v ParentToNested p
```

We should mention that, for simple accumulations, it's also possible to forego using `⌸`, and instead simply use indexing. For instance, we could also have written our accumulation like so:

```{code-cell}
r←⊂¨v
_←{
    i←⍸d=⍵
    r[p[i]],←⊂¨r[i]    ⍝ using indexing instead of ⌸
}¨⌽1+⍳⌈/d
(p=⍳≢p)/r
```

Here, we exploit that fact that indexed assignment (`r[p[i]],←`) gracefully handles repeated indices. When `p[i]` gives repeated parents (which it often will, as parent nodes rarely have just one child), the catenations each happen in turn.

## Challenges

**Challenge 1**: Given a forest, and a vector of numbers associated with the nodes, find the sum of each tree in the forest. To check your solution, make sure that the sum of the values for each tree equals the overall sum of the data.

**Solution**:

```{code-cell}
:tags: [remove-output, hide-cell]
Sum←{v p←⍺⍵
    d←Depths p
    md←⌈/d
    md=0: v
    _←{
        i←⍸d=⍵
        v[p[i]]+←v[i]
        ⍬
    }¨⌽1+⍳⌈/d
    (p=⍳≢p)/v
}
```

**Challenge 2** (bonus): Do the same thing, but without using the template we described on this page.

**Solution**:

```{code-cell}
:tags: [remove-output, hide-cell]
⍝ this exploits the commutativity of addition
Sum2←{v p←⍺⍵
    (I⍣≡⍨p)+/⍤⊢⌸v
}
```

**Challenge 3**: Given a tree, find the height of each node. The *height* of a node is its depth subtracted from the depth of the node's deepest descendant.

**Solution**:

```{code-cell}
:tags: [remove-output, hide-cell]
Height←{p←⍵
    r←0⍴⍨≢p
    d←Depths p
    md←⌈/d
    md=0: r
    _←{
        i←⍸d=⍵
        p[i]{r[⍺]←1+⌈/r[⍵]}⌸i
        ⍬
    }¨⌽1+⍳md
    r
}
```
