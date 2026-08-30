---
"@lolmath/ui": minor
---

Add `PreviewButton`, the trigger for a term inside running text.

The dashed-underline trigger that had to be hand-rolled with `Focusable` and an inline-styled `<button>` is now a component. It inherits the size, weight and leading of the sentence it sits in, so only the underline sets the term apart, and it is a real button, so a keyboard or screen reader user has something to act on. While the preview is open the dashes close up into a solid rule; the same applies under a `DialogTrigger` used as a toggle tip. The `previewButton` styles are exported for a term that should also navigate somewhere.

```tsx
<PreviewTrigger>
	<PreviewButton>Doran's Blade</PreviewButton>
	<Popover>
		<PopoverBody>…</PopoverBody>
	</Popover>
</PreviewTrigger>
```

`Focusable` stays the escape hatch for a trigger that is not text — an item icon, a champion portrait.
