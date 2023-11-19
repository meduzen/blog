/** @typedef {import('vitepress').ContentData} ContentData */

/**
 * Check the type of content based on URL.
 *
 * @param {ContentData} content
 * @param {string} type
 */
const isContentType = ({ url }, type) => url.startsWith(`/${type}s/`)

/**
 * The content is an article.
 *
 * @param {ContentData} content
 */
export const isArticle = content => isContentType(content, 'article')

/**
 * The content is a note.
 *
 * @param {ContentData} content
 */
export const isNote = content => isContentType(content, 'note')
