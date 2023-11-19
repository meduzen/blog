import { Feed } from 'feed'
import { createContentLoader } from 'vitepress'
import { isArticle, isNote } from './utils/content-type.mjs'
import { comparePublicationDate, isPublished } from './utils/frontmatter.mjs'
import { baseFeedOptions, compareItemDate, feedItem, writeFeed } from './utils/rss.mjs'

/** @todo: should come from .env */
const APP_URL = `https://blog.mehdi.cc`

/** @param {import('vitepress').SiteConfig} config */
export async function rss(config) {
  const feedOptions = baseFeedOptions()

  // Load content and turn it into feed items.

  /** @type {import('vitepress').ContentData[]} */
  const content = (await createContentLoader(['articles/*.md', 'notes/*.md'], { excerpt: true, render: true }).load())
    .filter(isPublished)
    .toSorted(comparePublicationDate)

  const notesItems = content.filter(isNote).map(feedItem)
  const articlesItems = content.filter(isArticle).map(feedItem)
  const articlesItemsExcerptOnly = content
    .filter(isArticle)
    .map(content => feedItem(content, { content: content.excerpt }))

  /**
   * Generate all feeds and store them on disk.
   *
   * - spec: https://www.rssboard.org/rss-specification
   * - spec best practices: https://www.rssboard.org/rss-profile
   * - `feed` package: https://github.com/jpmonette/feed
   */

  // Feed 1: full content

  const feedWithEverything = new Feed({
    title: 'Mehdi’s notes and articles',
    description: config.site.description,
    feed: `${APP_URL}/feed.xml`,
    ...feedOptions,
  })

  feedWithEverything.items = [...notesItems, ...articlesItems].toSorted(compareItemDate)

  writeFeed('feed', feedWithEverything)

  // Feed 2: notes

  const feedWithNotes = new Feed({
    title: 'Mehdi’s notes',
    description: 'A chronological gathering of… notes.',
    feed: `${APP_URL}/feed-notes-only.xml`,
    ...feedOptions,
  })

  feedWithNotes.items = notesItems

  writeFeed('feed-notes-only', feedWithNotes)

  // Feed 3: articles

  const feedWithArticles = new Feed({
    title: 'Mehdi’s articles',
    description: 'A chronological gathering of… articles.',
    feed: `${APP_URL}/feed-articles-only.xml`,
    ...feedOptions,
  })

  feedWithArticles.items = articlesItems

  writeFeed('feed-articles-only', feedWithArticles)

  // Feed 4: articles excerpts

  const feedWithArticlesExcerpts = new Feed({
    title: 'Mehdi’s articles (excerpts only)',
    description: 'Excerpt of my articles.',
    feed: `${APP_URL}/feed-articles-excerpts-only.xml`,
    ...feedOptions,
  })

  feedWithArticlesExcerpts.items = articlesItemsExcerptOnly

  writeFeed('feed-articles-excerpts-only', feedWithArticlesExcerpts)

  // Feed 5: articles excerpts and notes

  const feedWithArticlesExcerptsAndNotes = new Feed({
    title: 'Mehdi’s light feed',
    description: 'Articles excerpts and notes.',
    feed: `${APP_URL}/feed-articles-excerpts-and-notes.xml`,
    ...feedOptions,
  })

  feedWithArticlesExcerptsAndNotes.items = [...notesItems, ...articlesItemsExcerptOnly].toSorted(compareItemDate)

  writeFeed('feed-articles-excerpts-and-notes', feedWithArticlesExcerptsAndNotes)
}
