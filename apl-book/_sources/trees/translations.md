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

## Basic Operations

### Finding Children

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

### Finding Leaves

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

### Trimming Branches

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

### Finding Roots

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

### Selecting Sub-Trees

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

### Mirroring

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
