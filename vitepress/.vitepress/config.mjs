import { defineConfig } from 'vitepress'
import { rss } from './rss.mjs'

const APP_URL = `https://blog.mehdi.cc`
const APP_TITLE = 'Mehdi’s Notes'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: APP_TITLE,
  description: 'Content for your web-enthusiast brain, by Mehdi Merah.',
  lang: 'en',
  cleanUrls: true, // https://vitepress.dev/guide/routing#generating-clean-url

  outDir: '../public',
  buildEnd: rss,

  head: [
    ['meta', { name: 'color-scheme', content: 'dark light only' }],
    ['link', { rel: 'alternate', type: 'application/rss+xml', title: APP_TITLE, href: `${APP_URL}/feed.xml` }]
  ],

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      // { text: 'Home', link: '/' },
      { text: 'Articles', link: '/articles' },
      { text: 'Notes', link: '/notes' },
      { text: 'About', link: '/about' },
      { text: 'RSS feed', link: '/feed.xml' },
    ],

    // sidebar: [
    //   {
    //     text: 'Examples',
    //     items: [
    //       { text: 'Markdown Examples', link: '/markdown-examples' },
    //       { text: 'Runtime API Examples', link: '/api-examples' }
    //     ]
    //   }
    // ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/meduzen/blog' },
    ],

    editLink: {
      pattern: ({ filePath }) => {
        // path starts by `articles/` or `notes/`
        if (/^(articles|notes)\//.test(filePath)) {
          return `https://github.com/meduzen/blog/edit/main/vitepress/${filePath}`
        }

        /**
         * @todo: PR Vitepress so that returning a false-ish value should
         * prevennt to display the link. In the meantime, use the same pattern.
         * - https://github.com/vuejs/vitepress/blob/a482611d17197a0b7afc403891cd95f344e7a55f/src/client/theme-default/components/VPDocFooter.vue#L13C7-L13C15
         * - https://github.com/vuejs/vitepress/blob/a482611d17197a0b7afc403891cd95f344e7a55f/src/client/theme-default/composables/edit-link.ts#L10
         */
        return `https://github.com/meduzen/blog/edit/main/vitepress/${filePath}`
      },
      text: 'Edit this page on GitHub',
    },
  },
  lastUpdated: true,
})
