import plugin from "tailwindcss/plugin.js";
import { theme } from "./utilities/theme.js";

export const lolmathui = plugin(function ({}) {}, {
  theme: {
    extend: theme,
  },
});
