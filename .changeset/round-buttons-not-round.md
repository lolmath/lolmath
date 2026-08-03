---
"@lolmath/ui": patch
---

Fix `Button`/`ToggleButton` with `shape="round"` rendering square. The `.round` rule was authored before `.button` at equal specificity, so the base `border-radius: 0px` won the cascade — and the same tie also dropped the heavier `font-weight: 900` from both `round` and `square`. The shape rules are now nested under `.button` so they win on specificity regardless of source order.
