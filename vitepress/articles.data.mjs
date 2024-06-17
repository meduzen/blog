import { createContentLoader, createMarkdownRenderer } from 'vitepress'
import {
  comparePublicationDate,
  isPublished,
  tagsToArray
} from "./.vitepress/utils/frontmatter.mjs"

const mdRenderer = await createMarkdownRenderer()

/**
 * Load `/articles`:
 * - sort articles by date
 * - group articles by year
 * - convert `frontmatter.excerpt` Markdown to HTML
 */
export default createContentLoader('articles/*.md', {
  excerpt: true,

  transform(articles) {

    // sort articles by date

    articles = articles
      .filter(isPublished)
      .sort(comparePublicationDate)

    // enrich frontmatter

    articles
      .forEach(article => {

        // parse Markdown in title
        article.frontmatter.title = mdRenderer.render(article.frontmatter.title)

        // convert coma-separated list of tags to array
        article.frontmatter.tags = tagsToArray(article)

        // convert Markdown excerpt to HTML
        if ('excerpt' in article.frontmatter) {
          article.frontmatter.excerpt = mdRenderer.render(article.frontmatter.excerpt)
        }
      })

    return articles
  }
})
