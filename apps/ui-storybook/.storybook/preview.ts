import type { Preview } from "@storybook/react";
import { themes } from "@storybook/theming";
import "../src/tailwind.css";
import "@lolmath/ui/font/beaufort";
import "@lolmath/ui/font/spiegel";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      theme: themes.dark,
    },
  },
};

export default preview;
