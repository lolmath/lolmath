// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");
const path = require("path");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "LoLMath",
  tagline: "League Calculations",
  url: "https://your-docusaurus-test-site.com",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/logo.png",
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          routeBasePath: "/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "lolmath",
        logo: {
          alt: "lolmath",
          src: "img/logo.svg",
        },
        items: [
          {
            type: "doc",
            docId: "calc/index",
            position: "left",
            label: "Calc",
          },
          {
            href: "https://gitlab.com/lol-math",
            label: "GitLab",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Calc",
                to: "/docs/calc",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Discord",
                href: "https://discord.gg/w5mnDFg",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "LolMath",
                to: "https://lolmath.net",
              },
              {
                label: "GitLab",
                href: "https://gitlab.com/lol-math",
              },
            ],
          },
        ],
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
