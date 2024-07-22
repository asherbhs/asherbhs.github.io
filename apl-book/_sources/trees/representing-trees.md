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

## The Nested Representation
