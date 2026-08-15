// The closest thing this library has to a tooltip, and the reason there still
// is no tooltip component (see the note in popover.tsx): a preview opens on
// hover and focus like a tooltip does, but also on long press, so a touch user
// can reach it at all. Its content may be interactive — a link, a button —
// because the popover stays open while the pointer travels towards it and can
// be tabbed into.
//
// The trigger is the first child and the `Popover` the second. Any component
// that forwards its ref and props to a focusable DOM element works as the
// trigger (`Button`, `ButtonLink`, a `Link`); wrap anything else in
// `Focusable` and give it a role, since a preview only a mouse can reach is not
// an accessible one.
//
//   <PreviewTrigger>
//     <ButtonLink href="/champions/ahri">Ahri</ButtonLink>
//     <Popover>
//       <PopoverBody>…</PopoverBody>
//     </Popover>
//   </PreviewTrigger>

export type { PreviewTriggerProps } from "react-aria-components";
export { PreviewTrigger } from "react-aria-components";
