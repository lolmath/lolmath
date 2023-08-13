import plugin from "tailwindcss/plugin";

export const lolmathui = plugin(function ({}) {}, {
  theme: {
    extend: {
      // https://uicolors.app/edit?sv1=lol-graytemp:50-f5f5f5/100-e6e6e6/200-cccccc/300-a8a8a8/400-7d7d7d/500-616161/600-4d4d4d/700-3d3d3d/800-303030/900-262626/950-0f0f0f;lol-gold:50-f6f5ee/100-eae6d1/200-d8cea6/300-c2b075/400-ab914f/500-937a43/600-785d36/700-5a432a/800-473424/900-37291f/950-0e0907;lol-bluetemp:50-f6f7f9/100-eaecf1/200-ced3df/300-a6b1c4/400-7989a4/500-596882/600-434f65/700-323b4d/800-272e3a/900-20242c/950-15181e
      colors: {
        lol: {
          blue: {
            50: "#f6f7f9",
            100: "#eaecf1",
            200: "#ced3df",
            300: "#a6b1c4",
            400: "#7989a4",
            500: "#596882",
            600: "#434f65",
            700: "#323b4d",
            800: "#272e3a",
            900: "#20242c",
            950: "#15181e",
          },
          gray: {
            50: "#f5f5f5",
            100: "#e6e6e6",
            200: "#cccccc",
            300: "#a8a8a8",
            400: "#7d7d7d",
            500: "#616161",
            600: "#4d4d4d",
            700: "#3d3d3d",
            800: "#303030",
            900: "#262626",
            950: "#0f0f0f",
          },
          gold: {
            50: "#f6f5ee",
            100: "#eae6d1",
            200: "#d8cea6",
            300: "#c2b075",
            400: "#ab914f",
            500: "#937a43",
            600: "#785d36",
            700: "#5a432a",
            800: "#473424",
            900: "#37291f",
            950: "#0e0907",
          },
        },
      },
      fontFamily: {
        beaufort: "beaufort",
        spiegel: "spiegel",
      },
    },
  },
});
