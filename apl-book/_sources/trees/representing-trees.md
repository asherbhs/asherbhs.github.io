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

# Representing Trees

In this section, we're going to look at several different ways to represent trees as arrays, and we're going to settle on one as the main representation we'll be looking at for the rest of the tutorial.

## Preliminary Definitions

Before we go any further, let's nail down one thing.

```{code-cell}
⎕IO←0
```

The unending debate over what value `⎕IO` should take rages on. I don't have a particular favourite, but we just need to pick one and be consistent with it throughout our study of trees.

Additionally, there are some places where we're going to want to use indexing functionally, so it will be helpful to define:

```{code-cell}
I←{⍵[⍺]}
```

If/when Dyalog gets the proposed [Select](https://aplwiki.com/wiki/From) function, we'll be able to drop the name and just write `⊇⍨`, but for now we will use `I`.

Finally, for cosmetic reasons:

```{code-cell}
]box on
```

## The Nested Representation

The naive way to represent a tree with an array is with a nested vector. Each node in a tree has an associated piece of data and some number of child nodes. We can represent this structure directly in a nested vector by storing the data of each node as the first element, and then storing the nested vectors representing the child nodes in the tail of the vector.

Take the simple tree from the previous page:

```{figure} media/IntroTree_ManimCE_v0.18.1.png
:alt: A diagram of a simple tree.

A simple tree.
```

We can represent this tree like so:

```{code-cell}
(,'a') ((,'b') (,⊂,'e') (,⊂,'f')) ((,'c') ((,'g') (,⊂,'h') (,⊂,'i') (,⊂,'j'))) (,'d')
```

The vector represents the root node labelled `a`, with the label stored as the first element, and the representations of the children placed in the tail.

While messy to write out, this representation is elegant, and in most programming paradigms this kind of representation is used for working with trees. However, this structure isn't suited for making the most of APL. To get really good performance, it's important for us to be working with flat arrays. Deeply nested arrays are stored internally with pointers to potentially disparate allocations in the workspace. Traversing these pointers is a costly operation, compared to using APL's well optimised array primitives.

## The Depth Vector Representation

So, let's try to find a more APL-friendly representation for trees. Some information that tells us a lot about the structure of a tree is the *depth* of each node. We say the root node of a tree has depth $0$, the root's children have depth $1$, their children have depth $2$, and so on.

We can label each node of our example tree with its depth:

```{figure} media/IntroTreeDepth_ManimCE_v0.18.1.png
:alt: The same tree, with nodes labelled with their depth.

The same tree, with nodes labelled with their depth.
```

Notice that the depth corresponds to horizontal levels in the tree, and that siblings share the same depth.

It's fairly straightforward to calculate the depth of each node for a tree represented by a nested vector:

```{code-cell}
t←(,'a') ((,'b') (,⊂,'e') (,⊂,'f')) ((,'c') ((,'g') (,⊂,'h') (,⊂,'i') (,⊂,'j'))) (,'d')
NestedDepth←{
    ⍺←0             ⍝ depth of the root is 0
    1=≢⍵: ,⍺        ⍝ if there are no children, just return own depth
    ⍺,(⍺+1)∇¨1↓⍵    ⍝ else, recursively find depths of children
}
NestedDepth t
```

Reading this result from left to right (`0`, `1`, `2`, `2`, `1`, and so on), we can see some useful patterns. Every time the depth steps up by one, we are descending to a child node. Similarly, whenever the depth decreases, we are ascending to a sibling of an ancestor. This means that we can do away with the nesting, keeping only the depth numbers, and preserve a full description of the structure of the tree.

```{code-cell}
⊢depths←∊NestedDepth t
```

We call this description of a tree a *depth vector*. Nodes are now identified by an index into this vector. On its own, the depth vector doesn't tell us anything about the extra data associated with each node. We therefore need to store the data associated with each node in a separate vector.

```{code-cell}
⊢data←,¨'abefcghijd'
```

The `data` vector is indexed by the same indices as the `depths` vector, so that for a node at index `i`, `depths[i]` is its depth and `data[i]` is its data.

```{code-cell}
↑(⊂¨'index:' 'depths:' 'data:'),¨(⍳≢depths) depths data
```

Labelling each node of our tree with its corresponding index in the `depth` and `data` vectors reveals an interesting pattern.

```{figure} media/IntroTreeDFPT_ManimCE_v0.18.1.png
:alt: Nodes labelled with their index into the `depth` and `data` vectors.

The same tree, with nodes labelled with their index into the `depth` and `data` vectors.
```

If we trace the path through the tree given by these indices, we find that we traverse the tree in a particular pattern. We dive down the tree until we hit a leaf node ($0 \to 1 \to 2$). When we reach a leaf node, we step back along our path until we find a junction with an unexplored path, and then resume our traversal, once again descending until we hit a leaf before backtracking. In technical jargon, this is a *depth-first, pre-order traversal*.

```{figure} media/IntroTreeDFPTAnim_ManimCE_v0.18.1.gif
:alt: An animation of a depth-first, pre-order traversal on the example tree.

The depth-first, pre-order traversal in action.
```

So the depth vector representation orders nodes in a depth-first, pre-order traversal order. This presents a problem for manipulating trees in this format, as we are required to maintain this ordering exactly whenever we change the structure of the tree, which can be fairly inconvenient and costly. Additionally, we often want to find parents or siblings of a node for various reasons. These nodes will be fairly local in the structure of the tree, but may be frustratingly far apart in the depth vector, with no easy way to find them without a linear search.

The depth vector representation is therefore useful in some situations, but not the representation that we would like to settle on for most of our operations.

## The Path Matrix Representation

[TODO]
