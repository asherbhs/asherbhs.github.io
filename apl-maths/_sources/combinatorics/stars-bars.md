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

# Stars and Bars

```{code-cell}
⎕IO←1
```

- diagramssss
- unlabelled balls into labelled boxes
    - `'*|**||*|' ←→ '*|**||*|'[7 2 4 1 5 6 3 8]`
- ways to generate
    - combinations of bars from string
    - `k!k+n-1 ←→ (n-1)!k+n-1` ways
- surjective stars and bars
    - first pick k-n, then add n to each one
    - `(k-n)!k-1 ←→ (n-1)!k-1` ways

# Integer Partitions

- unlabelled balls, unlabelled boxes, any or at least 1 per box
- no closed form, but we can still generate
- young diagram
- conjugate partitions - equivalent counts theorem
- self conjugate partitions
    - `7 6 4 4 4 2 2 1`
- self conjugate partitions ←→ distinct odd partitions
- proof using hook numbers in young tableaux

# Twelvefold Teaser

- some combinations of labelling and numbering we haven't tried
- this is the topic of the next section
