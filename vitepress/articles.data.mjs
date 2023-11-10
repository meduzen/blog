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
      .filter(({ frontmatter }) => frontmatter.publishedAt < now)
      .sort((a, b) => b.frontmatter.publishedAt - a.frontmatter.publishedAt)

    // enrich frontmatter

    articles
      .forEach(article => {

        // convert Markdown excerpt to HTML
        if ('excerpt' in article.frontmatter) {
          article.frontmatter.excerpt = mdRenderer.render(article.frontmatter.excerpt)
        }


        // convert coma-separated list of tags to array
        article.frontmatter.tags = (article.frontmatter.tags?.split(',') ?? []).map(tag => tag.trim())
      })

    return articles
  }
})
