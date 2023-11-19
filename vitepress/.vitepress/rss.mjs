import path from 'path'
import { writeFileSync } from 'fs'
import { Feed } from 'feed'
import { createContentLoader } from 'vitepress'
import { comparePublicationDate, isPublished } from './utils/frontmatter.mjs'

/** @todo: should come from .env */
const APP_URL = `https://blog.mehdi.cc`

/** @param {import('vitepress').SiteConfig} config */
export async function rss(config) {
  const content = (await createContentLoader(['articles/*.md', 'notes/*.md'], { excerpt: true, render: true }).load())
    .filter(isPublished)
    .toSorted(comparePublicationDate)

  /**
   * FULL CONTENT
   */

  /**
   * https://www.rssboard.org/rss-profile
   * https://github.com/jpmonette/feed
   */
  const feedWithEverything = new Feed({
    docs: 'https://www.rssboard.org/rss-specification',
    link: APP_URL,
    title: 'Mehdi’s notes and articles',
    description: config.site.description,
    language: config.site.lang,
    // image: 'https://blog.mehdi.cc/file.png',
    // favicon: `${APP_URL}/favicon.ico`,
    copyright: 'Copyright © 2023-present, Mehdi Merah',
    feed: `${APP_URL}/feed.xml`,
    ttl: 2880, // 1 day,
  });

  content
    .forEach(({ url, excerpt, frontmatter, html }) =>
      feedWithEverything.addItem({
        title: frontmatter.title,
        id: `${APP_URL}${url}`,
        link: `${APP_URL}${url}`,
        description: frontmatter.description || excerpt,
        content: html,
        date: frontmatter.publishedAt,
        author: [{
          name: 'Mehdi Merah',
          link: 'https://mehdi.cc',
          email: 'hi@mehdi.cc',
        }],
      })
    )

  writeFileSync(path.join(config.outDir, 'feed.xml'), feedWithEverything.rss2())
}
