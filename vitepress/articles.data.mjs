import groupBy from "core-js-pure/full/object/group-by"
import { createContentLoader, createMarkdownRenderer } from 'vitepress'

const mdRenderer = await createMarkdownRenderer()

/**
 * Load `/articles`:
 * - sort articles by date
 * - group articles by year
 * - convert `frontmatter.excerpt` Markdown to HTML
 */
export default createContentLoader('articles/*.md', {
  excerpt: true,

  /** @type {import('vitepress').ContentData[]} */
  transform(articles) {
    const now = new Date()

    // sort articles by date

    articles = articles
      .filter(article => article.frontmatter.publishedAt < now)
      .sort((a, b) => b.frontmatter.publishedAt - a.frontmatter.publishedAt)

    // convert Markdown excerpt to HTML

    articles
      .filter(article => article.frontmatter.excerpt)
      .forEach(article => {
        article.frontmatter.excerpt = mdRenderer.render(article.frontmatter.excerpt)
      })

    return articles
  }
})
