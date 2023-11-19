import path from 'path'
import { writeFileSync } from 'fs'
import { Feed } from 'feed'

/** @typedef {import('feed').FeedOptions} FeedOptions */
/** @typedef {import('feed').Item} Item */
/** @typedef {import('vitepress').ContentData} ContentData */
/** @typedef {import('vitepress').SiteConfig} SiteConfig */

/** @todo: should come from .env */
const APP_URL = `https://blog.mehdi.cc`

/** @type SiteConfig */
let config = null

/**
 * Compare frontmatter publication date
 * @param {Item} a
 * @param {Item} b
 */
export const compareItemDate = (a, b) => new Date(b.date) - new Date(a.date)

/**
 * @param {SiteConfig} config
 * @returns {FeedOptions}
 */
export const baseFeedOptions = siteConfig => {
  if (!config) {
    config = { ...siteConfig }
  }

  return {
    docs: 'https://www.rssboard.org/rss-specification',
    link: APP_URL,
    language: config.site.lang,
    // image: 'https://blog.mehdi.cc/file.png',
    // favicon: `${APP_URL}/favicon.ico`,
    copyright: 'Copyright © 2023-present, Mehdi Merah',
    ttl: 2880, // 1 day,
  }
}

/**
 * @param {ContentData} content
 * @param {Item?} overrides
 * @returns {Item}
 */
export const feedItem = ({ url, excerpt, frontmatter, html }, { content } = null) => ({
  title: frontmatter.title,
  id: `${APP_URL}${url}`,
  link: `${APP_URL}${url}`,
  description: frontmatter.description || excerpt,
  content: content ?? html,
  date: frontmatter.publishedAt,
  author,
})

/** @type {import('feed').Author[]} */
export const author = [{
  name: 'Mehdi Merah',
  link: 'https://mehdi.cc',
  email: 'hi@mehdi.cc',
}]

/**
 * Save a feed on the file system.
 *
 * @param {string} filename The name of the feed without file extension.
 * @param {Feed} feed
 */
export const writeFeed = (filename, feed) => writeFileSync(
  path.join(config.outDir, `${filename}.xml`),
  feed.rss2(),
)
