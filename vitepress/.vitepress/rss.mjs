import path from 'path'
import { writeFileSync } from 'fs'
import { Feed } from 'feed'
import { createContentLoader } from 'vitepress'
import { isArticle, isNote } from './utils/content-type.mjs'
import { comparePublicationDate, isPublished } from './utils/frontmatter.mjs'

/** @typedef {import('vitepress').ContentData} ContentData */

/** @todo: should come from .env */
const APP_URL = `https://blog.mehdi.cc`

/** @param {import('vitepress').SiteConfig} config */
export async function rss(config) {

  /** @type {ContentData[]} */
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

  /**
   * NOTES ONLY
   */

  const feedWithNotesOnly = new Feed({
    docs: 'https://www.rssboard.org/rss-specification',
    link: APP_URL,
    title: 'Mehdi’s notes',
    description: 'A chronological gathering of… notes.',
    language: config.site.lang,
    // image: 'https://blog.mehdi.cc/file.png',
    // favicon: `${APP_URL}/favicon.ico`,
    copyright: 'Copyright © 2023-present, Mehdi Merah',
    feed: `${APP_URL}/feed-notes-only.xml`,
    ttl: 2880, // 1 day,
  });

  content
    .filter(isNote)
    .forEach(({ url, excerpt, frontmatter, html }) =>
      feedWithNotesOnly.addItem({
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

  writeFileSync(path.join(config.outDir, 'feed-notes-only.xml'), feedWithNotesOnly.rss2())

  /**
   * ARTICLES ONLY
   */

  const feedWithArticlesOnly = new Feed({
    docs: 'https://www.rssboard.org/rss-specification',
    link: APP_URL,
    title: 'Mehdi’s articles',
    description: 'A chronological gathering of… articles.',
    language: config.site.lang,
    // image: 'https://blog.mehdi.cc/file.png',
    // favicon: `${APP_URL}/favicon.ico`,
    copyright: 'Copyright © 2023-present, Mehdi Merah',
    feed: `${APP_URL}/feed-articles-only.xml`,
    ttl: 2880, // 1 day,
  });

  content
    .filter(isArticle)
    .forEach(({ url, excerpt, frontmatter, html }) =>
      feedWithArticlesOnly.addItem({
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

  writeFileSync(path.join(config.outDir, 'feed-articles-only.xml'), feedWithArticlesOnly.rss2())

  /**
   * ARTICLES EXCERPTS ONLY
   */

  const feedWithArticlesExcerptOnly = new Feed({
    docs: 'https://www.rssboard.org/rss-specification',
    link: APP_URL,
    title: 'Mehdi’s articles',
    description: 'Excerpt of my articles.',
    language: config.site.lang,
    // image: 'https://blog.mehdi.cc/file.png',
    // favicon: `${APP_URL}/favicon.ico`,
    copyright: 'Copyright © 2023-present, Mehdi Merah',
    feed: `${APP_URL}/feed-articles-excerpts-only.xml`,
    ttl: 2880, // 1 day,
  });

  content
    .filter(isArticle)
    .forEach(({ url, excerpt, frontmatter, html }) =>
      feedWithArticlesExcerptOnly.addItem({
        title: frontmatter.title,
        id: `${APP_URL}${url}`,
        link: `${APP_URL}${url}`,
        description: frontmatter.description || excerpt,
        content: excerpt,
        date: frontmatter.publishedAt,
        author: [{
          name: 'Mehdi Merah',
          link: 'https://mehdi.cc',
          email: 'hi@mehdi.cc',
        }],
      })
    )

  writeFileSync(path.join(config.outDir, 'feed-articles-excerpts-only.xml'), feedWithArticlesExcerptOnly.rss2())

  /**
   * ARTICLES EXCERPTS + NOTES
   */

  const feedWithNotesAndArticlesExcerpts = new Feed({
    docs: 'https://www.rssboard.org/rss-specification',
    link: APP_URL,
    title: 'Mehdi’s light feed',
    description: 'Articles excerpts and notes.',
    language: config.site.lang,
    // image: 'https://blog.mehdi.cc/file.png',
    // favicon: `${APP_URL}/favicon.ico`,
    copyright: 'Copyright © 2023-present, Mehdi Merah',
    feed: `${APP_URL}/feed-articles-excerpts-and-notes.xml`,
    ttl: 2880, // 1 day,
  });

  content
    .forEach(({ url, excerpt, frontmatter, html }) =>
      feedWithNotesAndArticlesExcerpts.addItem({
        title: frontmatter.title,
        id: `${APP_URL}${url}`,
        link: `${APP_URL}${url}`,
        description: frontmatter.description || excerpt,
        content: isNote({ url }) ? html : excerpt,
        date: frontmatter.publishedAt,
        author: [{
          name: 'Mehdi Merah',
          link: 'https://mehdi.cc',
          email: 'hi@mehdi.cc',
        }],
      })
    )

  writeFileSync(path.join(config.outDir, 'feed-articles-excerpts-and-notes.xml'), feedWithNotesAndArticlesExcerpts.rss2())
}
