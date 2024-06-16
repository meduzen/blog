/**
 * @file Generate a route per tag (`/tags/{tag}`).
 * {@link https://vitepress.dev/guide/routing#dynamically-generating-paths Vitepress documentation for dynamic routes}
 */

import { readFileSync } from 'fs'

/**
 * Library choice to match Vitepress implementation:
 * {@link https://github.com/vuejs/vitepress/blob/8aa6ccbe32655f76c390d15568f69f83d079385d/src/node/contentLoader.ts#L115-L153 glob, matter}
 * {@link https://github.com/vuejs/vitepress/blob/8aa6ccbe32655f76c390d15568f69f83d079385d/src/node/markdown/markdown.ts#L16 @mdit-vue/shared}
 */
import glob from 'fast-glob'
import matter from 'gray-matter'
import { slugify } from '@mdit-vue/shared'

export default {
  async paths ()  {
    let tags = (await glob(`${__dirname}/../articles/*.md`))
      .flatMap(markdownPath => {
        const body = readFileSync(markdownPath)

        return matter(body).data.tags // get tags from frontmatter
          .split(',')
          .map(tag => slugify(tag.trim())) // trim and slugify
      })

    tags = [...new Set(tags)] // make tags unique

    return tags.map(tag => ({ params: { tag } }))
  }
}
