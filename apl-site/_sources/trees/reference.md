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

# Appendix: Reference

Quick reference for the algorithms in this tutorial.

**Finding Children:**

```
⍸p∊i
```

**Finding Leaves:**

```
~p∊⍨⍳≢p
```

**Trimming Branches:**

```
i@i⊢p
```

or

```
p[i]←i
```

**Finding Roots:**

```
I⍣≡⍨p
```

**Selecting Sub-Trees:**

```
i∊⍨p I@{~⍵∊i}⍣≡⍳≢p
```

**Shuffling:**

```
perm⍳p[perm]
```

**Mirroring:**

```
(¯1+≢-⌽)p
```

**Depth Vector to Parent Vector:**

```
DepthToParent←{d←⍵
    p←⍳≢d
    _←2{p[⍵]←⍺[⍺⍸⍵]}/⊂⍤⊢⌸d
    p
}
```

**Finding Depths:**

```
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
(Depths p) PPV p
```

**Parent Vector to Depth Vector:**

```
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

**Joining Trees into a Forest:**

```
forest←⊃,/trees+0,+\¯1↓≢¨trees
data←⊃,/data
```

**Splitting a Forest into Trees:**

```
trees←roots{⊂⍵-(+\~forest∊⍵)[⍵]}⌸forest
data←roots{⊂⍵}⌸data
```

**Deleting Nodes:**

```
p←(⍸mask)(⊢-1+⍸)(~mask)/p
data←mask⌿data
```

**Parent Vector to Nested Representation:**

```
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
```
