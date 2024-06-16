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

    // sort articles by date

    articles = articles
      .filter(isPublished)
      .toSorted(comparePublicationDate)

    // enrich frontmatter

    articles
      .forEach(article => {

        // convert coma-separated list of tags to array
        article.frontmatter.tags =
          (article.frontmatter.tags?.split(',') ?? [])
            .map(tag => tag.trim())
      })

    return articles
  }
})
