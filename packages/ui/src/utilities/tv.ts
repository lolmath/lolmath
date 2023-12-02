import { createTV } from "tailwind-variants";
import { theme } from "./theme";

// function formatColors() {
//   const colors = [];
//   for (const [key, color] of Object.entries(theme.colors)) {
//     if (typeof color === "string") {
//       colors.push(key);
//     } else {
//       const colorGroup = Object.keys(color).map((subKey) =>
//         subKey === "DEFAULT" ? "" : subKey,
//       );
//       colors.push({ [key]: colorGroup });
//     }
//   }
//   return colors;
// }

export const tv = createTV({
  twMergeConfig: {
    theme: {
      // colors: formatColors(),
    },
    classGroups: {
      "font-size": [
        {
          text: Object.keys(theme.fontSize),
        },
      ],
    },
  },
});
