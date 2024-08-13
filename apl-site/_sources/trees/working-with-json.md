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

DepthToParent←{ ⍝ return the parent vector representation of a tree from a depth vector
    ⍝ ←: the parent vector corresponding to the depth vector input
    d←⍵                       ⍝ depth vector to be parentified
    p←⍳≢d                     ⍝ seed as all loops
    _←2{p[⍵]←⍺[⍺⍸⍵]}/⊂⍤⊢⌸d    ⍝ find the parents of each non-root
    ⍝ │ │   ││    │ │└───┴─ indices of each level
    ⍝ └─│───││────│─┴─ pairwise between levels
    ⍝   │   │└────┴─ leftmost node at previous level - the parent
    ⍝   └───┴─ make this the parent
    p
}

ParentToDepth←{ ⍝ recover the depths and DFPT ordering of a parent vector
    ⍝ ←: a two element vector consisting of (1) the depths of each node and (2) the permutation vector for DFPT order
    p←⍵    ⍝ input parent vector
    paths←(≢p)0⍴⍬
    depths←(≢p)⍴0
    StepUp←{
        paths,←⍵
        q←p[⍵]
        depths+←⍵≠q
        q
    }
    _←StepUp⍣≡⍳≢p
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

To accomplish this, we're going to make use of a variant of `⎕JSON` which parses JSON and returns a matrix describing its structure (rather than parsing it into an APL namespace, as is the default).

```{code-cell}
⎕JSON⎕OPT'Format' 'M'⊢json
```

The [`⎕JSON` documentation](https://help.dyalog.com/latest/Content/Language/System%20Functions/json.htm) describes the format of this table in detail. For our purposes, the most important column is the first, which gives the nesting depth for each row. You may recognise this as a form of depth vector, just like those we have used to describe trees previously. We can use this to create a parent vector representing our JSON.

```{code-cell}
⍪d keys values types←↓⍉⎕JSON⎕OPT'Format' 'M'⊢json    ⍝ extract each column as a vector
⊢p←DepthToParent d                                   ⍝ create the parent vector
PPH p
```

The other columns, which we have extracted as `k`, `v`, and `t`, store the key, value, and type for a node respectively. For example, the row corresponding to `"number": 12` has a key of `'number'`, a value of `12`, and a type of `3`, indicating the data is numeric. Labelling our tree with these vectors shows us exactly how parts of the tree correspond to the original JSON object.

```{code-cell}
keys PPH p
values PPH p
typeNames←'N/A' 'Object' 'Array' 'Numeric' 'String'
typeNames[types] PPH p
```

Now that we have all of this information, we can begin to manipulate our tree to group the astronaut's names by their craft. Our first step will be to find those nodes which indicate the craft, and extract the unique craft names.

```{code-cell}
i←⍸'craft'∘≡¨keys     ⍝ which nodes have a key of 'craft'
⊢crafts←∪values[i]    ⍝ find the unique craft names
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
⊢root←≢p                   ⍝ new node for root object
⊢groups←root+1+⍳≢crafts    ⍝ child nodes for groups
```

We then want to add these nodes and their associated data to each of the vectors we are using for this tree.

```{code-cell}
p     ,←(1+≢groups)⍴root    ⍝ each new node points to root as its parent
keys  ,←(⊂''),crafts        ⍝ root node has no key, group nodes have craft names as keys
values,←(1+≢groups)⍴⊂⍬      ⍝ no node has values assigned yet
types ,←1,(≢groups)⍴2       ⍝ root node has type 1 (object) and groups have type 2 (array)

keys PPH p
values PPH p
typeNames[types] PPH p
```

Now, we want to move the astronaut names from where they are, to the correct group. We're going to use a little trick to find the name nodes - since the original data was in DFPT order, and we haven't changed the order so far, each `"craft"` node (which we found earlier as `i`) appears immediately before the `"name"` node it accompanies in the parent vector. You can see this in our original table, where each row containing the key `'craft'` appears straight before the fellow row with the key `'name'`. We can exploit this to be sure that the nodes `i+1` are exactly the `"name"` nodes.

To move the astronaut names to their correct groups, we simply need to update their parents to the appropriate group node. We find the index in the `crafts` vector of the craft name we are concerned with, and use that to index the vector `groups`, whose craft names are ordered identically to `crafts`. We also need to update the keys of these name nodes to be empty, as when we feed this data back to `⎕JSON` later, it will not be expecting array elements to have keys.

```{code-cell}
p[i+1]←groups[crafts⍳values[i]]
keys[i+1]←⊂''

keys PPH p
values PPH p
typeNames[types] PPH p
```

Now we have two distinct trees, and we only need the newly created one, so we can simply delete the other using the idiom we described previously.

```{code-cell}
mask←root=p I@(root∘≠)⍣≡⍳≢p    ⍝ mask of nodes which are in the new tree
p←(⍸~mask)(⊢-1+⍸)mask/p        ⍝ delete nodes in the old tree
keys  ←mask/keys               ⍝─┐
values←mask/values             ⍝ │ filter the associated data
types ←mask/types              ⍝─┘

keys PPH p
values PPH p
typeNames[types] PPH p
```

Now, our tree corresponds exactly to the JSON structure we want to return, all that remains is to feed it back into `⎕JSON`. Remember that the matrix format `⎕JSON` uses has the depth vector as its first column. In order to pass our vectors back to `⎕JSON`, we need to recover the depth vector. We could exploit the structure that we know our parent vector to have, since we controlled exactly how it was constructed, but we will instead take this opportunity to show how `ParentToDepth` (which we defined [previously](relating-depth-and-parent-vectors.md#depth-vector-ordering)) works in practice.

```{code-cell}
⍝ find depths and DFPT ordering of p
d perm←ParentToDepth p

⍝ correct d, keys, values, and types to DFPT order
d     ←d     [perm]
keys  ←keys  [perm]
values←values[perm]
types ←types [perm]
```

We can then pack these vectors back into the matrix format expected by `⎕JSON`.

```{code-cell}
⍉↑d keys values types
```

And finally, we can pass this matrix back to `⎕JSON`, and it generates the output we want.

```{code-cell}
⎕JSON⎕OPT('Format' 'M')('Compact' 0)⍉↑d keys values types
```
