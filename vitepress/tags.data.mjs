import { createContentLoader } from 'vitepress'
import { comparePublicationDate, isPublished } from "./.vitepress/utils/frontmatter.mjs"

/**
 * Load `/articles`:
 * - sort them by date
 * - group them by year
 * - convert `frontmatter.excerpt` Markdown to HTML
 * - add tags to `frontmatter`
 */
export default createContentLoader('articles/*.md', {
  excerpt: true,

  /** @type {import('vitepress').ContentData[]} */
  transform(articles) {
    return articles

      // sort articles by date

      .filter(isPublished)
      .toSorted(comparePublicationDate)

      // retrieve tags from frontmatter

      .flatMap(article => {
        return (article.frontmatter.tags?.split(',') ?? [])
          .map(tag => tag.trim())
      })

      // turn tags into an object like `{ tagA: 3, tagB: 1, }`.

      .reduce((tags, tag) => {
        tags[tag] = (tags[tag] ?? 0) + 1
        return tags
      }, {})
  }
})
