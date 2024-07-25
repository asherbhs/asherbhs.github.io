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

While this tutorial is primarily targeted at intemediate APL users, this section includes translations of various code snippets into BQN, J, and K (K6) for the convenience of users of those languages.

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
&+/p=/:i
```

### Finding Leaves

**APL:**

```
~(⍳≢p)∊p
```

**BQN:**

```
¬(↕≠p)∊p
```

**J:**

```
-.(i.#p)e.p
```

**K:**
```
~|/(!#p)=/:p
```
