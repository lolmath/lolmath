import plugin from "tailwindcss/plugin";
import { theme } from "./utilities/theme";

export const lolmathui = plugin(function ({}) {}, {
  theme: {
    extend: theme,
  },
});
