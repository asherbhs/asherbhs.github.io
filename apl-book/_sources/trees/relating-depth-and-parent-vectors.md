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

# Relating the Depth and Parent Vectors

While we are focusing on the parent vector representation, the depth vector is still very useful, and in many applications we will begin with a depth vector and later construct a parent vector. This page covers constructing a parent vector from a depth vector, finding the depths of nodes in a parent vector, and ordering a parent vector in the same way as the corresponding depth vector.

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

## Constructing the Parent Vector

The first thing we'll look at is constructing a parent vector, given a depth vector. In both the page on [working with `⎕JSON`](working-with-json.md) and the page on [parsing](parsing.md), we will begin with a depth vector, and construct a parent vector in order to do more complicated operations. So it's important for us to be able to make this conversion.

Let's look at the same tree we worked with in the page on [representing trees](representing-trees.md).

```{figure} media/IntroTreeDFPT_ManimCE_v0.18.1.png
:alt: A simple tree with nodes labelled in DFPT order.

Our simple tree.
```

The depth vector for this tree is:

```{code-cell}
d←0 1 2 2 1 2 3 3 3 1
```

For each node `i` in this tree, we want to find the index `j` of the node which is the parent of `i`. Recall that the nodes in any sub-tree are necessarily adjacent in the depth vector. Also notice that the root of a sub-tree appears immediately before all of its descendents.

```{figure} media/IntroTreeFlatten_ManimCE_v0.18.1.gif
:alt: An animation of the tree with depth labels flattening into the depth vector. A sub-tree is highlighted.

The location of a sub-tree in the depth vector.
```

Finally, if `j` is the parent of `i`, we know that `j` must have a depth one less than the depth of `i`, i.e. `d[j]=d[i]-1`. All of this information together leads to a neat method for constructing a parent vector from a depth vector.

Firstly, we want to group the nodes in the depth vector by their given depth. `⌸` is the perfect primitive for this:

```{code-cell}
⊂⍤⊢⌸d
```

Here, we have grouped the nodes in the tree by their depth. `⌸` orders the groups it creates by the order the values appear in its right argument. The ordering of the depth vector ensures that this is exactly the all the possible depths of the tree in ascending order. So, the $0$th place has all nodes with a depth of $0$ (in our case just the single root), the $1$st place has all those with a depth of $1$, and so on.

Any non-root node `i` will appear after its parent `j` in the depth vector, and before the next node at the same depth as its parent. It is not possible for there to be another node with the same depth as `j` which appears between `i` and `j`.

```
   no 1s here
      ┌┴┐
d: 0 1 2 2 1 2 3 3 3 1
     ↑   ↑
     j   i
```

Look again at our nodes grouped by their depth:

```{code-cell}
⊂⍤⊢⌸d
```

Since the parent of `i` has depth one less than `i`, it must appear in the group immediately preceding the group that contains `i`. Within that group, the parent of `i` must be the leftmost node (i.e. node with the largest index) that is not later than (has a greater index than) `i`. In this sense, the groups define intervals of the indexes of the depth vector, splitting it up into sub-trees. We can use this to find the parent of each node using `⍸` (Interval Index).

```{code-cell}
i←3               ⍝ let's find the parent of node 3
1 4 9⍸i           ⍝ where in the group is the parent of node 3
1 4 9[1 4 9⍸i]    ⍝ which node is the parent of node 3
```

Of course, this works for finding the parents of the whole group of nodes at a certain depth.

```{code-cell}
i←2 3 5           ⍝ all nodes at depth 2
1 4 9⍸i
1 4 9[1 4 9⍸i]
```

We can use this trick to finally construct the parent vector corresponding to the tree. First we initialise the parent vector so that all nodes are roots. We will update all non-roots with their parents.

```{code-cell}
⊢p←⍳≢d
```

We then want to look at each adjacent pair of groups and update `p` accordingly, which we can do with a windowed reduction:

```{code-cell}
⍝  ┌──┬─ {⍺⍵} is executed with ⍺ as the left group and ⍵ as the right group
  2{⍺⍵}/⊂⍤⊢⌸d
  2{p[⍵]←⍺[⍺⍸⍵]}/⊂⍤⊢⌸d
⍝  └───────────┴─ instead, we can use our method to update p
```

After this operation, we have successfully created the parent vector corresponding to `d`.

```{code-cell}
p
d PPV p
```

Putting it all together:

```{code-cell}
DepthToParent←{d←⍵
    p←⍳≢d
    _←2{p[⍵]←⍺[⍺⍸⍵]}/⊂⍤⊢⌸d
    ⍝ │ │   ││    │ │└───┴─── indices of each level
    ⍝ └─│───││────│─┴──────── pairwise between levels
    ⍝   │   │└────┴────────── leftmost node at previous level - the parent
    ⍝   └───┴──────────────── make this the parent
    p
}
```

Now that we can convert depth vectors to parent vectors, a natural next question is converting parent vectors back into depth vectors. There are two stages to this: firstly of which is finding the depths of each node, and secondly imposing the DFPT ordering on the nodes.

## Recovering Depths

We will look at finding the depths of each node in a parent vector first. Our method will be roughly to see how many jumps to parents it takes to reach a root.

Take our current tree:

```{code-cell}
(⍳≢p) PPV p
```

Since we constructed this parent vector from a depth vector, it is already in DFPT order. To emphasise that the parent vector need not be in this order (and to give us something to do when we get the order back), we're going to shuffle it.

```{code-cell}
perm←1 9 8 2 4 6 7 0 3 5    ⍝ an arbitrary permutation of the nodes
p←perm⍳p[perm]
(⍳≢p) PPV p
```

To find the depth of each of these nodes, we will repeatedly follow parent pointers until we reach a root. Once we do reach a root, the number of jumps it took to get there will be the depth of the node.

Let's use node $5$ as an example. This node has depth $2$, which we can be sure of as two parental jumps reaches a root.

```{code-cell}
p[5]          ⍝ depth ≥ 1 since 5 is not a root
p[p[5]]       ⍝ depth ≥ 2 since p[5] is not a root
p[p[p[5]]]    ⍝ depth = 2 since p[p[5]] is a root
```

Since we're traversing the tree until the parent does not change, we can automate this repetition with `⍣≡` to find the depth of any particular node.

```{code-cell}
depth←0           ⍝ seed value
_←{
    q←p[⍵]        ⍝ parent of current node
    depth+←⍵≠q    ⍝ increment depth if not a root
    q             ⍝╶┬╴continue until p[⍵]≡⍵
}⍣≡5              ⍝╶┘
depth             ⍝ node 5 has depth 2
```

This method can be easily extended to find the depths of all nodes at once.

```{code-cell}
depths←(≢p)⍴0      ⍝ seed for all nodes
_←{
    q←p[⍵]
    depths+←⍵≠q    ⍝ increment for each path which has not hit a root
    q
}⍣≡⍳≢p             ⍝ all nodes this time
depths
depths PPV p
```

Wrapping it all up in a dfn:

```{code-cell}
Depths←{p←⍵
    depths←(≢p)⍴0
    _←{
        q←p[⍵]
        depths+←⍵≠q
        q
    }⍣≡⍳≢p
    depths
}
(Depths p) PPV p
```

Remember: `depths` is not in DFPT order! Our next task will be to put it back in that order to fully recover the depth vector.

````{admonition} Challenge
Can you change the initial conditions of our method so that we can skip the first iteration?

```
:tags: [hidden-cell]

depths←p≠⍳≢p    ⍝ start with 1 depth for non-roots
_←{
    q←p[⍵]
    depths+←⍵≠q
    q
}⍣≡p            ⍝ start at parent immediately
```
````

## Depth Vector Ordering

Having recovered the depths of each node, the next step fully reconstructing the depth vector for a tree is imposing the DFPT ordering. To do this, we're going to augment our method for find depths to build up the path matrix for the tree as we go. We can then use the paths to find the DFPT ordering.

To begin with, let's initialise an empty path matrix.

```{code-cell}
⊢paths←(⍳≢p)0⍴⍬
```

Now, as we traverse the tree as normal, we also record the ancestors found at each iteration and record these in the path matrix.
