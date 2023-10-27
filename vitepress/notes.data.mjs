import groupBy from "core-js-pure/full/object/group-by"
import { createContentLoader, createMarkdownRenderer } from 'vitepress'

const mdRenderer = await createMarkdownRenderer()

/**
 * Load `/notes`:
 * - sort notes by date
 * - group notes by year
 * - convert `frontmatter.excerpt` Markdown to HTML
 */
export default createContentLoader('notes/*.md', {
  excerpt: true,

  /** @type {import('vitepress').ContentData[]} */
  transform(notes) {
    const now = new Date()

    // sort notes by date

    notes = notes
      .filter(note => note.frontmatter.publishedAt < now)
      .sort((a, b) => b.frontmatter.publishedAt - a.frontmatter.publishedAt)

    // convert Markdown excerpt to HTML

    notes
      .filter(note => note.frontmatter.excerpt)
      .forEach(note => {
        note.frontmatter.excerpt = mdRenderer.render(note.frontmatter.excerpt)
      })

    // group notes by year

    const dateFormatter = new Intl.DateTimeFormat('en-BG', { year: 'numeric' })

    return groupBy(notes, note => dateFormatter.format(note.frontmatter.publishedAt))
  }
})
