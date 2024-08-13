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

We've covered lots of ways to play with the structure of a tree, but, similarly to how we often accumulate values in an array with a reduction, we often want to accumulate the values in a tree somehow, while respecting its structure. Usually, this involves working our way up from the bottom of the tree, with each parent combining the results of its children, until we reach the root.

```{code-cell}
:tags: [remove-cell]

⎕IO←0
I←{⍺[⍵]}
]box on

Depths←{ ⍝ find the depths of each node in a parent vector
    ⍝ ←: a vector of the depths of each node in the input
    p←⍵    ⍝ input parent vector
    depths←(≢p)⍴0
    StepUp←{ ⍝ step up the tree and increment depths
        q←p[⍵]
        depths+←⍵≠q
        q
    }
    _←StepUp⍣≡⍳≢p
    depths
}

_PrettyPrint_←{ ⍝ renders a tree given labels, box drawing characters, and padding
	⍝ ←: vector of character matrices, each a labelled rendering of a tree in the forest given by the input parent vector
	labels    ←⍺     ⍝ vector of character matrices giving the labels for each node
	connectors←⍺⍺    ⍝ box drawing characters to render the tree, e.g: '─┌┬┐│┴├┼┤│' (normal, and upstruck)
	spaces    ←⍵⍵    ⍝ number of spaces to pad with between sub-trees
	p         ←⍵     ⍝ parent vector
	d←Depths p
	maxDepth←⌈/d
	results←labels         ⍝ result of rendering each sub-tree, seeded with labels
	maxDepth=0: results    ⍝ avoid the each running on the prototype
	DoFamily←{ ⍝ render and record a sub-tree
		⍝ ⍺: parent node
		⍝ ⍵: rendered results of children
		widths←(1⊃⍴)¨⍵                                                                           ⍝ widths of each rendered child
		width←spaces-⍨+/spaces+widths                                                            ⍝ eventual width of the rendered tree       wwwwwww
		centres←(+\0,¯1↓spaces+widths)+¯1+⌈2÷⍨widths                                             ⍝ centres of each rendered sub-tree         ∘ss∘ss∘
		result←width⍴' '                                                                         ⍝ header to be decorated                   '       '
		result[(⊢⊢⍤/⍨((⊃⌽centres)>⊢)∧(⊃centres)<⊢)⍳width]←connectors[0]                          ⍝ add horizontal bar                       ' ───── '
		result[   ⊃ centres]←connectors[1]                                                       ⍝ left end of bar                          '┌───── '
		result[   ⊃⌽centres]←connectors[3]                                                       ⍝ right end of bar                         '┌─────┐'
		result[¯1↓1↓centres]←connectors[2]                                                       ⍝ connectors to intermediate children      '┌──┬──┐'
		result[(1=≢centres)⍴⊃centres]←connectors[4]                                              ⍝ if there's only one child, just make it a lone upstrike
		centre←¯1+⌈2÷⍨width                                                                      ⍝ index of the centre of the rendered tree     ∘
		result[centre]←connectors[5 6 7 8 9][connectors[0 1 2 3 4]⍳result[centre]]               ⍝ connector to the parent                  '┌──┼──┐'
		result⍪←(-spaces)↓⍤1⊃,/,∘(spaces⍴' ')⍤1¨⍵↑¨⍨⌈/≢¨⍵                                        ⍝ pad labels, join under header
		parentResult←⍺⊃results                                                                   ⍝ label of the parent
		parentWidth←1⊃⍴parentResult                                                              ⍝ width of label of parent
		parentCentre←¯1+⌈2÷⍨parentWidth                                                          ⍝ centre of label of parent
		result      ←((centre-parentCentre)⌽parentWidth↑⍤1⊢)⍣(width<parentWidth)⊢result          ⍝ pad and recentre text so far if it's less wide
		parentResult←((parentCentre-centre)⌽      width↑⍤1⊢)⍣(width>parentWidth)⊢parentResult    ⍝ pad and recentre parent label if it's less wide
		result⍪⍨←parentResult                                                                    ⍝ add parent label
		results[⍺]←⊂result                                                                       ⍝ record result
		1
	}
	DoLayer←{ ⍝ render and record all nodes whose children have depth ⍵
		⍝ ⍵: depth to handle nodes at
		i←⍸d=⍵    ⍝ nodes at this depth
		_←p[i]DoFamily⌸results[i]
		1
	}
	_←DoLayer¨⌽1+⍳maxDepth    ⍝ bottom up accumulation
	results/⍨p=⍳≢p            ⍝ return results at roots only
}

PPV←{⍺←'∘' ⋄   ((≢⍵)⍴⍉⍤⍪⍤⍕¨'∘'@(0=≢¨)⍺)('─┌┬┐│┴├┼┤│'_PrettyPrint_ 1)⍵}    ⍝ vertical
PPH←{⍺←'∘' ⋄ ⍉¨((≢⍵)⍴  ⍪⍤⍕¨'∘'@(0=≢¨)⍺)('│┌├└─┤┬┼┴─'_PrettyPrint_ 0)⍵}    ⍝ horizontal
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
DoLayer←{
    i←⍸d=⍵
    p[i]{r[⍺],←⊂r[⍵]}⌸i
}
DoLayer¨⌽1+⍳⌈/d
```

Now, `r` contains the representation for every node in the tree.

```{code-cell}
⍪r
```

The final step is to extract the representation of just the root node (or nodes, in the case of a forest).

```{code-cell}
(p=⍳≢p)/r
```

And we are done! This is the general format for accumulating values according to a tree. Indeed, [look back](parent-vectors.md#pretty-printing) at `_PrettyPrint_` - it uses exactly this method.

Putting this together into a dfn, there's one more thing we need to worry about. When we have a tree or forest consisting of only root nodes, that is, all nodes have depth $0$, our `¨` will still run once on the prototype of `⌽1+⍳⌈/d`, leading to an incorrect result. Therefore, we will introduce a guard statement to avoid this.

```{code-cell}
ParentToNested←{ ⍝ convert a parent vector to a nested representation
    p←⍵    ⍝ input parent vector
    ⍺←⊂⍤,¨⍳≢p
    r←⍺    ⍝ values to place at nodes (by default, their indices in the parent vector)
    d←Depths p
    maxDepth←⌈/d
    maxDepth=0: r
    DoLayer←{
        i←⍸d=⍵
        _←p[i]{r[⍺],←⊂r[⍵]}⌸i
        1    ⍝ the interpreter will complain if we don't provide a result
    }
    _←DoLayer¨⌽1+⍳maxDepth
    (p=⍳≢p)/r
}
v ParentToNested p
```

We should mention that, for simple accumulations, it's also possible to forego using `⌸`, and instead simply use indexing. For instance, we could also have written our accumulation like so:

```{code-cell}
r←⊂¨v
DoLayer←{
    i←⍸d=⍵
    r[p[i]],←⊂¨r[i]    ⍝ using indexing instead of ⌸
    1
}
_←DoLayer¨⌽1+⍳⌈/d
(p=⍳≢p)/r
```

Here, we exploit that fact that indexed assignment (`r[p[i]],←`) gracefully handles repeated indices. When `p[i]` gives repeated parents (which it often will, as parent nodes rarely have just one child), the catenations each happen in turn.

## Challenges

**Challenge 1**: Given a forest, and a vector of numbers associated with the nodes, find the sum of each tree in the forest. To check your solution, make sure that the sum of the values for each tree equals the overall sum of the data.

**Solution**:

```{code-cell}
:tags: [remove-output, hide-cell]
Sum←{ ⍝ sum the values in each tree in a forest
    v←⍺    ⍝ numbers at each node
    p←⍵    ⍝ parent vector
    sums←v
    d←Depths p
    maxDepth←⌈/d
    maxDepth=0: sums
    DoLayer←{
        i←⍸d=⍵
        sums[p[i]]+←sums[i]
        1
    }
    _←DoLayer¨⌽1+⍳maxDepth
    (p=⍳≢p)/sums
}
```

**Challenge 2** (bonus): Do the same thing, but without using the template we described on this page.

**Solution**:

```{code-cell}
:tags: [remove-output, hide-cell]
⍝ this exploits the commutativity of addition
Sum2←{(I⍣≡⍨⍵)+/⍤⊢⌸⍺}
```

**Challenge 3**: Given a tree, find the height of each node. The *height* of a node is its depth subtracted from the depth of the node's deepest descendant.

**Solution**:

```{code-cell}
:tags: [remove-output, hide-cell]
Height←{ ⍝ find the height of each node in a parent vector
    p←⍵    ⍝ parent vector
    heights←0⍴⍨≢p
    d←Depths p
    maxDepth←⌈/d
    maxDepth=0: heights
    DoLayer←{
        i←⍸d=⍵
        p[i]{heights[⍺]←1+⌈/heights[⍵]}⌸i
        1
    }
    _←DoLayer¨⌽1+⍳maxDepth
    heights
}
```
