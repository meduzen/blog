import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Mehdi’s Notes",
  description: "Mehdi Merah’s notes about creating web stuff.",
  lang: "en",
  cleanUrls: true, // https://vitepress.dev/guide/routing#generating-clean-url

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    socialLinks: [
      { icon: 'github', link: 'https://github.com/meduzen/blog' }
    ]
  }
})
