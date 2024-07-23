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

```{code-cell}
:tags: [remove-cell]

⎕IO←0
I←{⍵[⍺]}
]box on
```

# Parent Vectors

At the end of the previous section we settled on the parent vector representation as the main representation of trees we will be using in this tutorial. To reiterate, to represent a tree on $n$ nodes, we associate each node with an index in `⍳n`, and create an $n$-element vector `parent` such that if a node `i` is a child of a node `j`, then `parent[i]=j`.

For instance, the tree we saw many times in the previous section:

```{figure} media/IntroTreeDFPT_ManimCE_v0.18.1.png
:alt: The tree diagram from the previous section.

Our favourite tree, back again... again!
```

and the parent vector representing this tree:

```{code-cell}
⊢parent←0 0 1 1 0 4 5 5 5 0
```

```
        ┌─┐─────┐ ┌─┐─┐─┐
        ↓ │     │ ↓ │ │ │
parent: 0 0 1 1 0 4 5 5 5 0
        ↑ ↑ │ │ ↑ │       │
        │ └─┘─┘ └─┘       │
        └─────────────────┘
```

In this section, we're going to look at some of the basic operations you can do on trees represented in this way.

## Basic Operations

For brevity, we'll abbreviate `parent` to `p` from now on.

```{code-cell}
p←parent
```

### Finding Children

Given a node `i`, the children of `i` are all those nodes whose parent is `i`. We can therefore easily create a mask of nodes which are children of `i`:

```{code-cell}
i←1
p=i    ⍝ nodes 2 and 3 are children of node 1
```

If we have multiple nodes which we want to find the children of, we can simply mask for those nodes which have a parent that is any of the parent nodes in question:

```{code-cell}
i←1 5
p∊i    ⍝ additionally, nodes 6, 7, and 8 are children of node 5
```

Applying Where (`⍸`) gives us the nodes which this mask selects.

```{code-cell}
⍸p∊i
```

### Finding Leaves

We can create a vector of all the node IDs in a tree, as it is just every index in `p`.

```{code-cell}
⍳≢p
```

The leaf nodes are those nodes which do not have any children, i.e. those nodes which are not pointed to in the parent vector. We can think of the parent vector as a list of all nodes which are not leaves, and remove them from a list of all nodes to obtain only the leaf nodes:

```{code-cell}
(⍳≢p)~p
```

### Trimming Branches

Time for our first structural change to a tree. Say that we want to remove a sub-tree from the main tree, but still keep the nodes around for reference. In a sense, we just want to snip the connection between a parent and child node:

```{figure} media/IntroTreeSnip_ManimCE_v0.18.1.gif
:alt: The same tree, with the edge between nodes 0 and 4 fading away, while the tree rearranges itself.

Trimming the branch between nodes $0$ and $4$.
```

Recall that a root node (a node with no parent) is indicated by a self-loop in the parent vector - it is considered its own parent. Because of this, it's easy to trim a node from its parent by setting its parent to itself.

```{code-cell}
i←4
i@i⊢p     ⍝ using @
p[i]←i    ⍝ using indexing
p
```

Note that the above code also works when given a vector of indices to be trimmed off, instead of a single scalar index.

Interestingly, `p` now represents two disconnected trees. The parent vector representation is versatile enough to handle this.

### Finding Roots

Given a parent vector which represents multiple trees, we may like to find which tree each node is part of. Each tree is uniquely identified by its root node, so we can find the tree each node is a member of by finding which root node it descends from.

After trimming node $4$ from our tree, our two new trees look like:

```{figure} media/IntroTreeSnipped_ManimCE_v0.18.1.png
:alt: The two trees resulting from the snipping operation shown previously.

Our two trees after snipping the branch between nodes $0$ and $4$.
```

and they are represented by the parent vector:

```
   ┌─┐       ┌─┐─┐─┐
   ↓ │       ↓ │ │ │
p: 0 0 1 1 4 4 5 5 5 0
   ↑ ↑ │ │ ↑ │       │
   │ └─┘─┘ └─┘       │
   └─────────────────┘
```

We can quite easily find the grandparents of each node, by simply finding the parent of each parent:

```{code-cell}
p[p]    ⍝ great-grandparents - parents of parents
```

Now we can see why we decided to indicate roots with a self-loop. When we repeatedly index with the parent vector, the roots are constant.

If we try to find the great-grandparents of each node, we find that the result doesn't change, since there are no nodes deep enough in the tree to have great-grandparents, so the result loops at the grandparents.

```{code-cell}
p[p[p]]
p[p[p]]≡p[p]
```

Notice that the result at each index `i` is now the root of the tree `i` is part of. So in general, to find the root of the tree each node is part of, we repeatedly index with the parent vector to a fixed point.

```{code-cell}
{p[⍵]}⍣≡p
```

Recall that we defined `I←{⍵[⍺]}`, this is why. We can rephrase the above as

```{code-cell}
p I⍣≡p    ⍝ substituting I
I⍣≡⍨p     ⍝ this is equivalent
```

### Selecting Sub-Trees

We can use a similar technique to select sub-trees of a tree. In the previous example, repeatedly indexing with `p` saturated at the root node. With a small modification to the expression, we can have the indexing saturate at a different point. Take our tree from before we snipped node $4$ off:

```{figure} media/IntroTreeDFPT_ManimCE_v0.18.1.png
:alt: The tree diagram from the previous section.

Node $4$ has been kindly reattached.
```

If 

## Favourite Children (Ordering Siblings)

## Pretty Printing

