/** @typedef {import('vitepress').PageData} PageData */

import { datetime } from 'datetime-attribute'
import { metaProperty } from './head.mjs'

/**
 * Check the type of content based on file path.
 *
 * @param {PageData} page
 * @param {string} type
 */
const isContentType = ({ filePath }, type) => filePath.startsWith(`${type}s/`)

/**
 * The content is an article.
 *
 * @param {PageData} page
 */
export const isArticle = page => isContentType(page, 'article')

/**
 * The content is a note.
 *
 * @param {PageData} page
 */
export const isNote = page => isContentType(page, 'note')

/**
 * Get Open Graph HTML tags from page data.
 * @param {PageData} pageData
 */
export const getOpenGraphTags = pageData => {

  // For now, only enable Open Graph tags for notes and articles…
  if (!isNote(pageData) && !isArticle(pageData)) { return [] }

  /**
   * {@link https://ogp.me/ Open Graph specification}
   * @todo Add remaining tags:
   *
   * - <meta property="og:image" content="https://some.website/share.jpg">
   * - <meta property="og:image:width" content=1800>
   * - <meta property="og:image:height" content=945>
   */

  const metaTags = [
    metaProperty('og:type', 'article'),
    metaProperty('og:title', pageData.title),
    metaProperty('og:description', pageData.description),
    metaProperty('article:tag', pageData.frontmatter.tags),
  ]

  if (pageData.frontmatter.publishedAt) {
    const publicationDate = new Date(pageData.frontmatter.publishedAt)

    metaProperty('article:published_time', datetime(publicationDate, 'datetime'))
  }

  return metaTags
}
