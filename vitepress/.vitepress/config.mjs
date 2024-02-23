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
    ['link', { rel: 'alternate', type: 'application/rss+xml', title: APP_TITLE, href: `${APP_URL}/feed.xml` }],
    ['link', { rel: 'alternate', type: 'application/rss+xml', title: APP_TITLE, href: `${APP_URL}/feed-notes-only.xml` }],
    ['link', { rel: 'alternate', type: 'application/rss+xml', title: APP_TITLE, href: `${APP_URL}/feed-articles-only.xml` }],
    ['link', { rel: 'alternate', type: 'application/rss+xml', title: APP_TITLE, href: `${APP_URL}/feed-articles-excerpts-only.xml` }],
    ['link', { rel: 'alternate', type: 'application/rss+xml', title: APP_TITLE, href: `${APP_URL}/feed-articles-excerpts-and-notes.xml` }],
  ],
    ['meta', { property: 'og:site_name', content: APP_TITLE }],

  // add temporary stupid tracking
  transformHtml: async code => code.replace(
    '\n  </body>\n</html>',
    '<img class="visually-hidden" src="https://matomo.mehdi.cc/piwik.php?idsite=4&amp;rec=1" style="border:0" alt=""></body>\n</html>'
  ),

  vite: {
    ssr: {
      /**
       * Prevent “module not found” error. Solution from
       * https://github.com/vuejs/vitepress/issues/2832#issuecomment-1689498631
       * or any search using `noExternal` on Vitepress and Vite repos.
       * @todo: Shouldn’t be needed on Vite 5.
       */
      noExternal: ['datetime-attribute'],
    },
  },

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      // { text: 'Home', link: '/' },
      { text: 'Articles', link: '/articles' },
      { text: 'Notes', link: '/notes' },
      { text: 'About', link: '/about' },
      { text: 'RSS feeds', link: '/about#feeds' },
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

    footer: {
      message: 'Got any comment or question about the content? Feel free to <a href="https://mehdi.cc/#contact" target="_blank" rel="noopener">send me an email</a> or use GitHub <a href="https://github.com/meduzen/blog/discussions" target="_blank" rel="noopener">discussions</a> or <a href="https://github.com/meduzen/blog/issues" target="_blank" rel="noopener">issues</a>.',
      // copyright: 'Copyright © 2023-present Mehdi Merah'
    }
  },
  lastUpdated: true,
})
