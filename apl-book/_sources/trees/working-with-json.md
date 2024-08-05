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

# Working with `⎕JSON`

We've laboriously gone through many different ways to work with parent vectors, but we're yet to do any 'real work' with them. This page will cover an interesting application of the techniques we've learned so far. We're going to look at manipulating [JSON](https://www.json.org/json-en.html)-formatted data, making use of Dyalog APL's built-in `⎕JSON`.

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

DepthToParent←{d←⍵
    p←⍳≢d
    _←2{p[⍵]←⍺[⍺⍸⍵]}/⊂⍤⊢⌸d
    ⍝ │ │   ││    │ │└───┴─── indices of each level
    ⍝ └─│───││────│─┴──────── pairwise between levels
    ⍝   │   │└────┴────────── leftmost node at previous level - the parent
    ⍝   └───┴──────────────── make this the parent
    p
}

ParentToDepth←{
    paths←(≢p)0⍴⍬
    depths←(≢p)⍴0
    _←{
        paths,←⍵
        q←p[⍵]
        depths+←⍵≠q
        q
    }⍣≡⍳≢p
    order←⍋⌽¨(depths+1)⊂⍤↑⍤¯1⊢paths
    depths order
}
```

There's a wonderful little API which returns some JSON describing every person currently in space.

```{code-cell}
]load HttpCommand
json←(HttpCommand.Get 'http://api.open-notify.org/astros.json').Data
⎕JSON⎕OPT'Compact' 0⎕JSON json    ⍝ prettify it
```

Let's say we want to group the names of these astronauts by the craft they are on, and return this as JSON as well. We want a structure like this:

```
{
  "ISS": ["Oleg Kononenko", ...],
  "Tiangong": ["Li Guangsu", ...]
}
```

with `...` replaced by the rest of the names of course.

To accomlish this, we're going to make use of a variant of `⎕JSON` which parses JSON and returns a matrix describing its structure (rather than parsing it into an APL namespace, as is the default).

```{code-cell}
⎕JSON⎕OPT'Format' 'M'⊢json
```

The [`⎕JSON` documentation](https://help.dyalog.com/latest/Content/Language/System%20Functions/json.htm) describes the format of this table in detail. For our purposes, the most important column is the first, which gives the nesting depth for each row. You may recognise this as a form of depth vector, just like those we have used to describe trees previously. We can use this to create a parent vector representing our JSON.

```{code-cell}
⍪d k v t←↓⍉⎕JSON⎕OPT'Format' 'M'⊢json    ⍝ extract each column as a vector
⊢p←DepthToParent d                       ⍝ create the parent vector
PPH p
```

The other columns, which we have extracted as `k`, `v`, and `t`, store the key, value, and type for a node respectively. For example, the row corresponding to `"number": 12` has a key of `'number'`, a value of `12`, and a type of `3`, indicating the data is numeric. Labelling our tree with these vectors shows us exactly how parts of the tree correspond to the original JSON object.

```{code-cell}
k PPH p
v PPH p
jsonTypes←'N/A' 'Object' 'Array' 'Numeric' 'String'
⍝           0      1        2        3        4
jsonTypes[t] PPH p
```

Now that we have all of this information, we can begin to manipulate our tree to group the astronaut's names by their craft. Our first step will be to find those nodes which indicate the craft, and extract the unique craft names.

```{code-cell}
i←⍸'craft'∘≡¨k    ⍝ which nodes have a key of 'craft'
⊢c←∪v[i]          ⍝ find the unique craft names
```

Look again at our target structure.

```
{
  "ISS": ["Oleg Kononenko", ...],
  "Tiangong": ["Li Guangsu", ...]
}
```

We want a root object with two keys (`"ISS"` and `"Tiangong"`), each of which maps to an array. Our parent vector already has nodes in the indices `0` up to and including `(≢p)-1`, so our new nodes should have IDs `≢p` and greater. So, we create our new root node with ID `≢p`, and child nodes for each group with IDs `(≢p)+1`, `(≢p)+2`, and so on.

```{code-cell}
⊢r←≢p         ⍝ new node for root object
⊢g←r+1+⍳≢c    ⍝ child nodes for groups
```

We then want to add these nodes and their associated data to each of the vectors we are using for this tree.

```{code-cell}
p,←(1+≢c)⍴r     ⍝ each new node points to r as its parent
k,←(⊂''),c      ⍝ root node has no key, group nodes have craft names as keys
v,←(1+≢c)⍴⊂⍬    ⍝ no node has values assigned yet
t,←1,(≢c)⍴2     ⍝ root node has type 1 (object) and groups have type 2 (array)

k PPH p
v PPH p
jsonTypes[t] PPH p
```

Now, we want to move the astronaut names from where they are, to the correct group. We're going to use a little trick to find the name nodes - since the original data was in DFPT order, and we haven't changed the order so far, each `"craft"` node (which we found earlier as `i`) appears immediately before the `"name"` node it accompanies in the parent vector. You can see this in our original table, where each row containing the key `'craft'` appears straight before the fellow row with the key `'name'`. We can exploit this to be sure that the nodes `i+1` are exactly the `"name"` nodes.

To move the astronaut names to their correct groups, we simply need to update their parents to the appropriate group node. We find the index in the `c` vector of craft names of the craft name we are concerned with, and use that to index the vector `g` of new group nodes, whose craft names are ordered identically to `c`. We also need to update the keys of these name nodes to be empty, as when we feed this data back to `⎕JSON` later, it will not be expecting array elements to have keys.

```{code-cell}
p[i+1]←g[c⍳v[i]]
k[i+1]←⊂''

k PPH p
v PPH p
jsonTypes[t] PPH p
```

Now we have two distinct trees, and we only need the newly created one, so we can simply delete the other using the idiom we described previously.

```{code-cell}
m←r=p I@(r∘≠)⍣≡⍳≢p    ⍝ make of nodes which are in the new tree
p←(⍸~m)(⊢-1+⍸)m/p     ⍝ delete nodes in the old tree
k←m/k                 ⍝─┐
v←m/v                 ⍝─┼─ filter the associated data
t←m/t                 ⍝─┘

k PPH p
v PPH p
jsonTypes[t] PPH p
```

Now, our tree corresponds exactly to the JSON structure we want to return, all that remains is to feed it back into `⎕JSON`. Remember that the matrix format `⎕JSON` uses has the depth vector as its first column. In order to pass our vectors back to `⎕JSON`, we need to recover the depth vector. We could exploit the structure that we know our parent vector to have, since we controlled exactly how it was constructed, but we will instead take this opportunity to show how `ParentToDepth` (which we defined [previously](relating-depths-and-parent-vectors.md#depth-vector-ordering)) works in practice.

```{code-cell}
⍝ find depths and DFPT ordering of p
d perm←ParentToDepth p

⍝ correct d, k, v, and t to DFPT order
d←d[perm]
k←k[perm]
v←v[perm]
t←t[perm]
```

We can then pack these vectors back into the matrix format expected by `⎕JSON`.

```{code-cell}
⍉↑d k v t
```

And finally, we can pass this matrix back to `⎕JSON`, and it generates the output we want.

```{code-cell}
⎕JSON⎕OPT('Format' 'M')('Compact' 0)⍉↑d k v t
```
