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

# Introduction

APL is fantastic for working with linear data. If you can organise your data in an array, you have dozens of primitives and years of collective wisdom to lead you to success. Sadly, in the wild, there are many problems which have a fundamentally non-linear structure. These present an issue for the brave APL programmer, whose array primitives struggle to cope.

One of the most common cases of this is dealing with hierarchical data, where pieces of data are variously 'contained in' or 'belonging to' others. Data like this are examples of a general structure called a *tree*.

Formally, trees are made up of *nodes*. Each node may have some number of *child nodes*, and usually one *parent node*. There is exactly one node in a tree which has no parent, this is the tree's *root node*. Nodes which share a parent are *sibling nodes*, and nodes with no children are *leaf nodes*.

For many kinds of hierarchical data, we can model its structure as a tree:

| Data                       | Nodes             | Root node                  | $x$ is a child node of $y$  |
| -------------------------- | ----------------- | -------------------------- | --------------------------- |
| A file system              | Files and folders | The root or home directory | $x$ is in folder $y$        |
| Jobs in a company          | Employees         | CEO                        | $x$ reports to $y$          |
| [Evolutionary tree of life](https://en.wikipedia.org/wiki/Tree_of_life_(biology)) | Species | Some unknown early micro-organism | $x$ evolved from $y$ |
| [JSON](https://www.json.org/json-en.html) | Data | The outermost object or array | $x$ is a member of array or object $y$ |

Interestingly, a family tree is not an example of this kind of tree, as each child typically does not have just one unique parent.

We will generally draw trees with the root node at the top, and all child nodes arranged below, with a line connecting each child to its parent. For instance, in the following tree, the node labelled $a$ is the root node, and is a parent of $b$, $c$ and $d$ - its children.

```{figure} media/IntroTree_ManimCE_v0.18.1.png
:alt: A diagram of a simple tree.

Baby's first tree.
```

So how can we work with trees in APL? The answer, of course, is to find a way to encode the nodes and relationships in an array. In fact, we're going to find that encoding trees as arrays doesn't involve bending over backwards to fit a square peg into a round hole - instead we'll see that the right representation leads to extremely elegant and fast code.

I can take no credit for discovering the techniques discussed in this tutorial. The following resources have been especially influential:

- [Aaron Hsu's thesis](https://scholarworks.iu.edu/dspace/items/3ab772c9-92c9-4f59-bd95-40aff99e8c7a) on working with tree transformations in the context of a compiler. The thesis is extremely readable, especially for an academic paper, so you're encouraged to take a look if you're curious about a specialised application of tree transformation techniques.
- [Stevan Apter's Vector article](http://archive.vector.org.uk/art10500340) on working with trees in q, a relative of APL. In various places, you can find trees represented with a parent vector (a technique which we will cover in due course) referred to as 'Apter trees' thanks to the influence of this excellent article.

Other useful resources on working with trees in array languages include:

- Devon McCormick's [page](https://code.jsoftware.com/wiki/User:Devon_McCormick/Trees) on working with trees in J.
- Doug Mennella's [page](https://code.jsoftware.com/wiki/User:Doug_Mennella/Trees) on drawing trees in J.
- [This](https://github.com/JohnEarnest/ok/blob/gh-pages/docs/Trees.md) section of the oK documentation covering two different representations of trees.
- Aaron Hsu's talks on [text processing](https://dyalog.tv/Dyalog22/?v=5I4YPkVU7mY) and [tree wrangling](https://dyalog.tv/Dyalog18/?v=hzPd3umu78g).
- Brandon Wilson's [talk on parsing](https://www.youtube.com/watch?v=Ym2TIKgiRkM).
- The [README](https://github.com/tlack/atree/blob/master/README.md) of a C++ implementation of Apter trees.
