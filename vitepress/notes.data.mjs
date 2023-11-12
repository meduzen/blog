import groupBy from "core-js-pure/full/object/group-by"
import { createContentLoader, createMarkdownRenderer } from 'vitepress'
import { comparePublicationDate, hasExcerptInFrontmatter, isPublished } from "./.vitepress/utils/frontmatter.mjs"

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
      .filter(isPublished)
      .sort(comparePublicationDate)

    // convert Markdown excerpt to HTML

    notes
      .filter(hasExcerptInFrontmatter)
      .forEach(note => {
        note.frontmatter.excerpt = mdRenderer.render(note.frontmatter.excerpt)
      })

    // group notes by year

    const dateFormatter = new Intl.DateTimeFormat('en-BG', { year: 'numeric' })

    return groupBy(notes, note => dateFormatter.format(note.frontmatter.publishedAt))
  }
})
