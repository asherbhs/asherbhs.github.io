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

# The Catalan Numbers

- what are they - dyck paths
- simple examples
- recurrence and proof
    - `C n+1 ←→ +/(C×(C n-⊢))¨0,⍳n`
    - `C←{⍵=0: 1 ⋄ +/(∇×(∇⍵-1+⊢))¨¯1+⍳⍵}`
    - `Cs←{(⊢,⊢+.×⌽)⍣(⍵-1),1}`
- closed form and proof
    - `C n ←→ (n!2×n)-(n-1)!2×n ←→ (n+1)÷⍨n!2×n`
- more catalan number examples
- mention stanley book
