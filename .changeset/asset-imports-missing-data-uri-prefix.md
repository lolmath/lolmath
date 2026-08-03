---
"@lolmath/ui": patch
---

Fix every JS-imported image shipping as a bare payload with no `data:` prefix, which made the checkbox icons, spinner and breadcrumb divider broken images in consumers. `tsdown.config.ts` used the `base64` loader, which emits only the encoded bytes; it now uses `dataurl`, which emits a complete `data:image/png;base64,…` (or url-encoded `data:image/svg+xml,…`) URI. Failed image requests are never cached, so each broken asset was also re-requested on every render.
