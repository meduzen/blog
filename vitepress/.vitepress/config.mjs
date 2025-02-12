import { defineConfig } from 'vitepress'
import { rss } from './rss.mjs'
import { getOpenGraphTags } from './utils/pagedata.mjs'
import { metaName, metaProperty } from './utils/head.mjs'

const APP_URL = `https://blog.mehdi.cc`
const APP_TITLE = 'Mehdi’s Notes'

export const rssTag = path => ['link', { rel: 'alternate', type: 'application/rss+xml', title: APP_TITLE, href: `${APP_URL}/${path}` }]

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: APP_TITLE,
  description: 'Content for your web-enthusiast brain, by Mehdi Merah.',
  lang: 'en',
  cleanUrls: true, // https://vitepress.dev/guide/routing#generating-clean-url

  outDir: '../public',
  buildEnd: rss,

  head: [
    // Color schemes
    metaName('color-scheme', 'dark light only'),

    // RSS
    rssTag('feed.xml'),
    rssTag('feed-notes-only.xml'),
    rssTag('feed-articles-only.xml'),
    rssTag('feed-articles-excerpts-only.xml'),
    rssTag('feed-articles-excerpts-and-notes.xml'),

    // Open Graph
    metaProperty('og:site_name', APP_TITLE),
    metaProperty('og:locale', 'en_GB'),
    metaProperty('fediverse:creator', '@meduz@m.nintendojo.fr')
  ],

  // per page `<head>` entries
  async transformHead({ pageData }) {
    const keywordsMeta = metaName('keywords', pageData.frontmatter.tags) // @todo: add general website keyword

    if (pageData.title == '404') { return keywordsMeta }

    // remove trailing `index.md` or `.md`
    const path = pageData.filePath.replace(/((index)?\.md)$/, '')

    const canonicalUrl = `${APP_URL}/${path}`.replace(/\/$/, '') // remove trailing `/`

    return [
      keywordsMeta,
      ['link', { rel: 'canonical', href: canonicalUrl }],
      metaProperty('og:url', canonicalUrl),
      ...getOpenGraphTags(pageData),
    ]
  },

  // add temporary stupid tracking
  transformHtml: async code => code.replace(
    '\n  </body>\n</html>',
    '<img class="visually-hidden" src="https://matomo.mehdi.cc/piwik.php?idsite=4&amp;rec=1" style="border:0" alt=""></body>\n</html>'
  ),

  appearance: 'force-auto',

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
         * prevent to display the link. In the meantime, use the same pattern.
         * - https://github.com/vuejs/vitepress/blob/a482611d17197a0b7afc403891cd95f344e7a55f/src/client/theme-default/components/VPDocFooter.vue#L13C7-L13C15
         * - https://github.com/vuejs/vitepress/blob/a482611d17197a0b7afc403891cd95f344e7a55f/src/client/theme-default/composables/edit-link.ts#L10
         */
        return `https://github.com/meduzen/blog/edit/main/vitepress/${filePath}`
      },
      text: 'Edit this page on GitHub',
    },

    footer: {
      message: 'Got any comment or question about the content? Feel free to <a href="https://mehdi.cc/#contact" target="_blank" rel="noopener">send me an email</a> or use GitHub <a href="https://github.com/meduzen/blog/discussions" target="_blank" rel="noopener">discussions</a> or <a href="https://github.com/meduzen/blog/issues" target="_blank" rel="noopener">issues</a>. You can also <a href="/notes/2024-10-01-ask-me-anything">ask me anything</a>.',
      // copyright: 'Copyright © 2023-present Mehdi Merah'
    }
  },
  lastUpdated: true,
})
