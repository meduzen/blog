/**
 * Create a `<meta property="">` Vitepress head entry
 *
 * @param {string} property name
 * @param {string} content
 * @returns {['meta', { property: string, content: string }]}
 */
export const metaProperty = (property, content) => metaTag({ property, content })

/**
 * Create a `<meta name="">` Vitepress head entry
 *
 * @param {string} name
 * @param {string} content
 * @returns {['meta', { name: string, content: string }]}
 */
export const metaName = (name, content) => metaTag({ name, content })

const metaTag = attrs => attrs.content ? ['meta', attrs] : []
