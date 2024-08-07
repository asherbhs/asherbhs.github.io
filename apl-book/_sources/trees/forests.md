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

# Forests

We saw [previously](parent-vectors.md#trimming-branches) that the parent vector representation can actually represent multiple trees at once. We call such a parent vector with multiple trees a *forest*. Forests are a delight to work with using the parent representation, and we'll see examples of that on this page.

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
		result⍪←(-spaces)↓⍤1⊃,/,∘(spaces⍴' ')⍤1¨⍵↑¨⍨⌈/≢¨⍵                                        ⍝ pad lables, join under header
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

## Planting Forests

Given multiple parent vectors, each representing a tree, how can we put all these trees into one parent vector?

Let's start with some simple trees:

```{code-cell}
trees←(0 0 0 2 2)(0 0 0)(0 0 0 2 0 4)(0 0 1 1)
PPV¨trees
```

We want one parent vector which represents the forest of all these trees. It would be nice if we could simply catenate all these vectors together and be done, but sadly it's not that simple.

```{code-cell} 
PPV⊃,/trees    ⍝ not what we want
```

When we catenate the vectors, the indices in the later parent vectors are suddenly innacurate, as they have been shifted futher along the index space. We therefore need to correct for this. For instance, we need to correct the parent vector `0 0 0` to `5 5 5` before we catenate it, since there are $5$ nodes in the preceding parent vector `0 0 0 2 2`. This way, the nodes preserve their connections in the catenated result, rather than all pointing to the node $0$ in the first vector. Similarly, we need to add $8$ to the third parent vector, and $14$ to the fourth. It's easy to calculate these offsets with a scan.

```{code-cell}
0,+\¯1↓≢¨trees    ⍝ offsets for each vector
```

We can then use these offsets to correct the parent vectors before we catenate them, giving us the correct result vector for the forest of them all.

```{code-cell}
      trees+0,+\¯1↓≢¨trees    ⍝ correctly offset vectors
   ⊃,/trees+0,+\¯1↓≢¨trees    ⍝ parent vector for forest
PPV⊃,/trees+0,+\¯1↓≢¨trees    ⍝ this gives us the correct forest
```

Perfect! This construction has a couple of nice properties. If our original vectors were in DFPT order, then our forest vector will be as well. Additionally, if we have any associated data with our original vectors, we can simply catenate these together and we will have a vector associated with our forest in exactly the same way.

```{code-cell}
data←'abcde' 'fgh' 'ijklmn' 'opqr'    ⍝ some additional data associated with our vectors
data PPV¨trees
forest←⊃,/trees+0,+\¯1↓≢¨trees        ⍝ make the forest vector
data←⊃,/data                          ⍝ just catenate the data
data PPV forest                       ⍝ the forest is labelled correctly
```

## Deforestation

What if we have the reverse problem? Say we have a parent vector representing a forest, and we want to extract the individual trees from it.

Importantly, the forest vector could arrive with any tangled order of nodes, so we can't rely on the nice consecute arrangement of trees we have in the `forest` vector right now. To emphasise this, let's shuffle `forest`.

```{code-cell}
perm←6 7 0 9 11 13 1 2 5 16 17 3 8 4 14 15 10 12
⊢forest←perm⍳forest[perm]    ⍝ shuffle forest and correct parents
⊢data←data[perm]             ⍝ shuffle data as well
data PPV forest              ⍝ still represents the same forest
(⍳≢forest) PPV forest
```

The first step to extracting the trees from the forest will be identifying which nodes belong to which tree. Each tree can be uniquely identified by its root, so by finding the roots of each node, we can see which tree they belong to.

```{code-cell}
⊢roots←I⍣≡⍨forest    ⍝ we have seen I⍣≡⍨ previously
```

We can then use this to group the nodes in the parent vector by which tree they belong to.

```{code-cell}
roots{⊂⍵}⌸forest
```

The trouble with this is that the vectors we have are pointing to their parent in the `forest` vector. We need to correct the parent pointers so that they are appropriate to just the lone tree.

Each of the parents pointers are too large (in rare cases they are just right, but in general they are not correct) as they are offset by all the nodes in the `forest` vector which appeared before it, but are not present in the lone tree.

Take the group `8 8 8`, in the `forest` vector, the parent pointers are set up like so:

```
        ┌──────────────────┐
        │                  ↓
forest: 8 8 2 12 12 12 2 2 8 14 14 2 12 2 14 14 12 12
          │ └──6─nodes───┘ ↑
          └────────────────┘
```

There are six nodes not in the tree which appear before the root node $8$ in the forest. Therefore, this node will appear at index $8-6=2$ in its own parent vector, and the parent pointers should be updated accordingly.

```
┌───┐
│   ↓
2 2 2
  │ ↑
  └─┘
```

For each tree, we can find the number of nodes outside the tree which appear before each node inside the tree with a scan. 

```
8 8 2 12 12 12 2 2 8 14 14 2 12  2 14 14 12 12    ⍝ original forest vector
0 0 1  1  1  1 1 1 0  1  1 1  1  1  1  1  1  1    ⍝ nodes outside the tree
0 0 1  2  3  4 5 6 6  7  8 9 10 11 12 13 14 15    ⍝ +\ of the above vector
                   ↑
        6 nodes before this place
```

We can use this correct the parent pointers for each group, and extract parent vectors for each tree in the forest.

```{code-cell}
 roots{      ~forest∊⍵    }⌸forest    ⍝ mask of nodes outside the tree
 roots{    +\~forest∊⍵    }⌸forest    ⍝ how many nodes outside the tree appear before each parent
⍪roots{⊂  (+\~forest∊⍵)[⍵]}⌸forest    ⍝ restricted only to this tree
⍪roots{⊂⍵-(+\~forest∊⍵)[⍵]}⌸forest    ⍝ use to correct the parent pointers
```

This gives us exactly the trees we packed into the forest originally.

```{code-cell}
trees←roots{⊂⍵-(+\~forest∊⍵)[⍵]}⌸forest
PPV¨trees
```

We can use the same grouping method to extract the data for each tree. Thankfully there's no complicated parent vector correction needed here.

```{code-cell}
data←roots{⊂⍵}⌸data
data PPV¨trees
```

Notice that we've extracted the trees in a different order to the order we see when we render the forest. This is because `PPV` looks at the order that the root nodes appear in a forest when rendering, while `⌸` looks at the first appearance of a group indicator in the `roots` vector. Luckily, it's easy to correct this if you need to.

```{code-cell}
∪roots                   ⍝ the order ⌸ sees
⊢trees←trees[⍋∪roots]    ⍝ correct order of trees
⊢data ←data [⍋∪roots]    ⍝ correct order of data
data PPV¨trees
```

## Challenge

**Challenge:** Write a function that, given a parent vector representing a forest, joins each tree in the forest under one new root node.

**Solution:**

```{code-cell}
:tags: [hide-cell, remove-output]

 {0,(⍵≠⍳≢⍵)×1+⍵}
⍝ │││      │└─┴─ offset to adjust for new root
⍝ ││└──────┴──── set old roots to point to 0 (which we're about to add)
⍝ └┴──────────── add new root the old roots now point to
```
