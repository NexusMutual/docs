// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Nexus Mutual Documentation',
  tagline: 'Your guide to the crypto insurance alternative',
  url: 'https://docs.nexusmutual.io/',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/NXM-Spinner-Green.svg',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'NexusMutual', // Usually your GitHub org/user name.
  projectName: 'NexusMutual/docs', // Usually your repo name.
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: { routeBasePath: '/' },
        blog: false,
        googleTagManager: { containerId: 'GTM-WKL6F7R' },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  plugins: [
    [
      require.resolve('@cmfcmf/docusaurus-search-local'),
      { indexDocs: true, indexBlog: false },
    ]
  ],

  themeConfig:
  /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Nexus Mutual',
        logo: {
          alt: 'NXM-Spinner-Green',
          src: 'img/NXM-Spinner-Green.svg',
        },
        items: [
          //{to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://nexusmutual.io/',
            label: 'Website',
            position: 'right',
          },
          {
            href: 'https://app.nexusmutual.io/home',
            label: 'Nexus Mutual UI',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Governance',
            items: [
              {
                label: 'Forum',
                href: 'https://forum.nexusmutual.io/',
              },
              {
                label: 'Protocol Governance',
                href: 'https://app.nexusmutual.io/governance',
              },
              {
                label: 'DAO Snapshot Governance',
                href: 'https://snapshot.org/#/community.nexusmutual.eth',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Discord',
                href: 'https://discord.com/invite/xxFaAEn',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/NexusMutual',
              },
              {
                label: 'LinkedIn',
                href: 'https://www.linkedin.com/company/nexus-mutual',
              },
            ],
          },
          {
            title: 'Developers',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/NexusMutual',
              },
              {
                label: 'Bug Bounty',
                href: 'https://immunefi.com/bounty/nexusmutual/',
              },
            ],
          },
          {
            title: 'Publishing',
            items: [
              {
                label: 'Blog',
                to: 'https://nexusmutual.io/blog',
              },
              {
                label: 'Nexus Mutual Newsletter',
                href: 'https://nexusmutual.substack.com/',
              },
              {
                label: 'YouTube',
                href: 'https://www.youtube.com/@nexus_mutual',
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
