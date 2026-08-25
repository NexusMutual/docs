// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const { themes } = require("prism-react-renderer");

async function createConfigAsync() {
  return {
    title: "Nexus Mutual Documentation",
    tagline: "Your guide to the crypto insurance alternative",
    url: "https://docs.nexusmutual.io/",
    baseUrl: "/",
    onBrokenLinks: "throw",
    onBrokenAnchors: "throw",
    favicon: "img/NXM-Spinner-Green.svg",

    organizationName: "NexusMutual",
    projectName: "NexusMutual/docs",
    i18n: {
      defaultLocale: "en",
      locales: ["en"],
    },

    markdown: {
      mermaid: true,
      hooks: {
        onBrokenMarkdownLinks: "warn",
      },
      mdx1Compat: {
        comments: true,
        admonitions: true,
        headingIds: true,
      },
    },

    // Add the mermaid theme
    themes: ["@docusaurus/theme-mermaid"],

    presets: [
      [
        "@docusaurus/preset-classic",
        {
          docs: {
            routeBasePath: "/",
            remarkPlugins: [(await import('remark-math')).default],
            rehypePlugins: [(await import('rehype-katex')).default],
          },
          blog: false,
          theme: {
            customCss: require.resolve("./src/css/custom.css"),
          },
          googleTagManager: {
            containerId: 'GTM-WKL6F7R',
          },
        },
      ],
    ],

    plugins: [
      [
        '@easyops-cn/docusaurus-search-local',
        {
          hashed: true,
          indexDocs: true,
          indexBlog: false,
          docsRouteBasePath: '/',
        },
      ],
      [
        '@docusaurus/plugin-client-redirects',
        {
          // The V2 contract pages were replaced when the contracts were
          // rewritten. Redirect the old URLs, which search engines still
          // index, to their successors.
          redirects: [
            {
              from: '/developers/contracts/Assessment',
              to: '/developers/contracts/Assessments',
            },
            {
              from: '/developers/contracts/IndividualClaims',
              to: '/developers/contracts/Claims',
            },
          ],
          // The developer directories were renamed to remove spaces, which
          // had been reaching production as %20 in the URL. Keep the old
          // paths working for anything already linking to them.
          createRedirects(existingPath) {
            const renamed = [
              ['/developers/Diagrams/user-flows-diagrams/', '/developers/Diagrams/User Flows Diagrams/'],
              ['/developers/Diagrams/contracts-diagrams/', '/developers/Diagrams/Contracts Diagrams/'],
              ['/developers/user-flows/', '/developers/User Flows/'],
            ];
            for (const [current, previous] of renamed) {
              if (existingPath.startsWith(current)) {
                return [existingPath.replace(current, previous)];
              }
            }
            return undefined;
          },
        },
      ],
    ],

    stylesheets: [
      {
        href: "https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css",
        type: "text/css",
        integrity:
          "sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM",
        crossorigin: "anonymous",
      },
    ],

    themeConfig:
      /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
      ({
        // Mermaid configuration
        mermaid: {
          theme: { light: "neutral", dark: "forest" },
        },

        // For codeblocks
        prism: {
          theme: themes.github,
          darkTheme: themes.dracula,
        },

        navbar: {
          title: "Nexus Mutual",
          logo: {
            alt: "NXM-Spinner-Green",
            src: "img/NXM-Spinner-Green.svg",
          },
          items: [
            //{to: '/blog', label: 'Blog', position: 'left'},
            {
              href: "https://nexusmutual.io/",
              label: "Website",
              position: "right",
            },
            {
              href: "https://app.nexusmutual.io/",
              label: "Nexus Mutual UI",
              position: "right",
            },
          ],
        },
        footer: {
          style: "dark",
          links: [
            {
              title: "Governance",
              items: [
                {
                  label: "Forum",
                  href: "https://forum.nexusmutual.io/",
                },
                {
                  label: "Protocol Governance",
                  href: "https://app.nexusmutual.io/governance",
                },
                {
                  label: "DAO Snapshot Governance",
                  href: "https://snapshot.org/#/community.nexusmutual.eth",
                },
              ],
            },
            {
              title: "Community",
              items: [
                {
                  label: "Discord",
                  href: "https://discord.com/invite/xxFaAEn",
                },
                {
                  label: "Twitter",
                  href: "https://twitter.com/NexusMutual",
                },
                {
                  label: "LinkedIn",
                  href: "https://www.linkedin.com/company/nexus-mutual",
                },
              ],
            },
            {
              title: "Developers",
              items: [
                {
                  label: "GitHub",
                  href: "https://github.com/NexusMutual",
                },
                {
                  label: "Bug Bounty",
                  href: "https://immunefi.com/bounty/nexusmutual/",
                },
              ],
            },
            {
              title: "Publishing",
              items: [
                {
                  label: "Blog",
                  to: "https://nexusmutual.io/blog",
                },
                {
                  label: "Nexus Mutual Newsletter",
                  href: "https://nexusmutual.substack.com/",
                },
                {
                  label: "YouTube",
                  href: "https://www.youtube.com/@nexus_mutual",
                },
              ],
            },
          ],
        },
      }),
  };
}

module.exports = createConfigAsync();
