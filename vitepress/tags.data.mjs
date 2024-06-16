import { createContentLoader } from 'vitepress'
import {
  comparePublicationDate,
  isPublished,
  tagsToArray
} from "./.vitepress/utils/frontmatter.mjs"

export default createContentLoader('articles/*.md', {
  excerpt: true,

  /**
   * Receive `/articles` and return their tags with count.
   *
   * @type {import('vitepress').ContentData[]}
   */
  transform(articles) {
    return articles

      // sort articles by date

      .filter(isPublished)
      .toSorted(comparePublicationDate)

      // retrieve tags as an object like `{ tagA: 3, tagB: 1, }`

      .flatMap(tagsToArray)
      .reduce((tags, tag) => {
        tags[tag] = (tags[tag] ?? 0) + 1
        return tags
      }, {})
  }
})
