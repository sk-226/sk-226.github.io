import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

const config: QuartzConfig = {
  configuration: {
    pageTitle: "sk-226",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: false,
    analytics: null,
    locale: "en-US",
    baseUrl: "sk-226.github.io",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Inter",
        body: "Inter",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#FFFCF0",
          lightgray: "#E6E4D9",
          gray: "#B7B5AC",
          darkgray: "#575653",
          dark: "#100F0F",
          secondary: "#205EA6",
          tertiary: "#4385BE",
          highlight: "rgba(143, 159, 169, 0.1)",
          textHighlight: "#fff23688",
        },
        darkMode: {
          light: "#1C1B1A",
          lightgray: "#343331",
          gray: "#575653",
          darkgray: "#CECDC3",
          dark: "#FFFCF0",
          secondary: "#4385BE",
          tertiary: "#5DA0D3",
          highlight: "rgba(143, 159, 169, 0.1)",
          textHighlight: "#b3aa0288",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
    ],
  },
}

export default config
