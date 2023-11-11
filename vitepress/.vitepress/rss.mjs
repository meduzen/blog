import path from 'path'
import { writeFileSync } from 'fs'
import { Feed } from 'feed'
import { createContentLoader } from 'vitepress'
import { comparePublicationDate, isPublished } from './utils/frontmatter.mjs'

/** @todo: should come from .env */
const baseUrl = `https://blog.mehdi.cc`

/**
 * @param {import('vitepress').SiteConfig} config
 */
export async function rss(config) {
  /**
   * https://www.rssboard.org/rss-profile
   * https://github.com/jpmonette/feed
   */
  const feed = new Feed({
    docs: 'https://www.rssboard.org/rss-specification',
    link: baseUrl + 'link',
    title: config.site.title,
    description: config.site.description,
    language: config.site.lang,
    // image: 'https://blog.mehdi.cc/file.png',
    // favicon: `${baseUrl}/favicon.ico`,
    copyright: 'Copyright © 2023-present, Mehdi Merah',
    feed: `${baseUrl}/feed.rss`,
    ttl: 2880, // 1 day,
  });

  (await createContentLoader(['articles/*.md', 'notes/*.md'], { excerpt: true, render: true }).load())
    .filter(isPublished)
    .toSorted(comparePublicationDate)
    .forEach(({ url, excerpt, frontmatter, html }) =>
      feed.addItem({
        title: frontmatter.title,
        id: `${baseUrl}${url}`,
        link: `${baseUrl}${url}`,
        description: frontmatter.description || excerpt,
        content: html,
        date: frontmatter.publishedAt,
        author: [{
          name: 'Mehdi Merah',
          link: 'https://mehdi.cc',
          email: ' ', // hack, otherwise <author> is missing in RSS
        }],
      })
    )

  writeFileSync(path.join(config.outDir, 'feed.rss'), feed.rss2())
}
