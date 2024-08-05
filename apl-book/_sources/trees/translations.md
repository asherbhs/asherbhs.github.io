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

# Appendix: Translations

While this tutorial is primarily targeted at intemediate APL users, this section includes translations of various code snippets into BQN, J, and K (K6) for the convenience of users of those languages. I do not use these languages nearly as frequently as APL, so there are more likely to be places for improvement, do let me know!

## Finding Children

**APL:**

```
⍸p∊i
```

**BQN:**

```
/p∊i
```

**J:**

```
I.p e.i
```

**K:**

```
&~^i?p
```

## Finding Leaves

**APL:**

```
~p∊⍨⍳≢p
```

**BQN:**

```
¬p∊˜↕≠p
```

**J:**

```
-.p e.~i.#p
```

**K:**

```
^p?!#p
```

## Trimming Branches

**APL:**

```
i@i⊢p
p[i]←i
```

**BQN:**

```
i⌾(i⊸⊏)p
```

**J:**

```
i i}p
```

**K:**

```
@[p;i;:;i]
```

## Finding Roots

**APL:**

```
I⍣≡⍨p
```

**BQN:**

```
{𝕊⍟(𝕩⊸≢)𝕩⊏p}p
```

**J:**

```
{^:_~p
```

**K:**

```
(p@)/p
```

## Selecting Sub-Trees

**APL:**

```
i∊⍨p I@{~⍵∊i}⍣≡⍳≢p
```

**BQN:**

```
i∊˜{𝕊⍟(𝕩⊸≢)⊏⟜p⌾((¬𝕩∊i)⊸/)𝕩}↕≠p
```

**J:**

```
i e.~{{y j}~p{~y{~j=.I.-.y e.i}}^:_ i.#p
```

**K:**

```
~^i?{@[x;&^i?x;p@]}/!#p
```

## Shuffling

**APL:**

```
perm⍳p[perm]
```

**BQN:**

```
perm⊐perm⊏p
```

**J:**

```
perm i.perm{p
```

**K:**

```
perm?p@perm
```

## Mirroring

**APL:**

```
(¯1+≢-⌽)p
```

**BQN:**

```
(¯1+≠-⌽)p
```

**J:**

```
(_1+#-|.)p
```

**K:**

```
-1+(#p)-|p
```

## DepthToParent

**APL:**

```
DepthToParent←{d←⍵
    p←⍳≢d
    _←2{p[⍵]←⍺[⍺⍸⍵]}/⊂⍤⊢⌸d
    p
}
```

**BQN:**

```
DepthToParent←{d←𝕩
    p←↕≠d
    {p(𝕨⊏˜¯1+𝕨⍋𝕩)⌾(𝕩⊸⊏)↩}´˘2↕d⊔↕≠d
    p
}
```

**J:**

```
DepthToParent=:{{d=.y
    p=:i.#d
    2{{p=:p y}~x{~_1+x I.y}}&>/\d<@]/.i.#d
    p
}}
```

**K:**

```
DepthToParent:{d:x
    p::!#d
    {p::@[p;y;:;x@x'y]}/'2':.=d
    p}
```

## Depths

## ParentToDepth

## Forest

## Deforest

## Deleting

## ParentToNested
