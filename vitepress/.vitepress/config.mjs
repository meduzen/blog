import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Mehdi’s Notes",
  description: "Mehdi Merah’s notes about creating web stuff.",
  lang: "en",
  cleanUrls: true, // https://vitepress.dev/guide/routing#generating-clean-url

  outDir: '../public',

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      // { text: 'Home', link: '/' },
      // { text: 'Articles', link: '/articles' },
      { text: 'Notes', link: '/notes' },
      { text: 'About', link: '/about' },
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

    /**
     * @todo: PR Vitepress so that returning no pattern should disabled the display of the link
     * - https://github.com/vuejs/vitepress/blob/a482611d17197a0b7afc403891cd95f344e7a55f/src/client/theme-default/components/VPDocFooter.vue#L13C7-L13C15
     * - https://github.com/vuejs/vitepress/blob/a482611d17197a0b7afc403891cd95f344e7a55f/src/client/theme-default/composables/edit-link.ts#L10
     */
    editLink: {
      pattern: ({ filePath }) => {
        // path starts by `articles/` or `notes/`
        if (/^(articles|notes)\//.test(filePath)) {
          return `https://github.com/meduzen/blog/edit/main/vitepress/${filePath}`
        }

        return undefined
      },
      text: 'Edit this page on GitHub',
    },
  },
})
