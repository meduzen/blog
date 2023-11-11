import path from 'path'
import { writeFileSync } from 'fs'
import { Feed } from 'feed'
import { createContentLoader } from 'vitepress'
import { comparePublicationDate, isPublished } from './utils/frontmatter.mjs'

const baseUrl = `https://blog.mehdi.cc` // should come from .env

/**
 * @param {import('vitepress').SiteConfig} config
 */
export async function rss(config) {

  // get notes

  const notes = (await createContentLoader('notes/*.md', {
    excerpt: true,
    render: true,
  }).load())
    .filter(isPublished)

  // get articles

  const articles = (await createContentLoader('articles/*.md', {
    excerpt: true,
    render: true,
  }).load())
    .filter(isPublished)

  // sort them

  articles.sort(comparePublicationDate)
  notes.sort(comparePublicationDate)

  // combine articles and notes

  const items = articles.concat(notes).toSorted(comparePublicationDate)

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
  })

  items.forEach(({ url, excerpt, frontmatter, html }) =>
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
