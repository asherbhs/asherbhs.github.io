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

We saw previously a way to select sub-trees of a tree with a mask. For instance given the following tree:

```{code-cell}
p←1 7 4 1 7 6 3 7 6 1
(⍳≢p) PPV p
```

Say we want to delete node $3$ and all of its descendants. We can mask all nodes which are node $3$ or one of its descendants using a method we've seen before.

```{code-cell}
⊢mask←3=p I@{⍵≠3}⍣≡⍳≢p
mask PPV p
```

The first step will be to remove node $3$ and its descendants from the parent vector using this mask.

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
((~mask)/⍳≢p) PPV q-1+(⍸mask)⍸q
```

We can put this all together into a tacit idiom we can easily reuse.

```{code-cell}
    (⍸mask)(⊢-1+⍸)(~mask)/p
PPV (⍸mask)(⊢-1+⍸)(~mask)/p
```
