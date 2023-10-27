const parser = new DOMParser()
const EMPTY_LINK_SELECTOR = 'a[href="./.html"]'

/**
 * Turn excerpt into a proper link to be used in an index.
 * @param {import('vitepress').ContentData} note
 */
export const excerptToLink = note => {
  if (!note.frontmatter.excerpt) { return }

  const $body = parser.parseFromString(note.frontmatter.excerpt, 'text/html').body
  const $linkToNote = $body.querySelector(EMPTY_LINK_SELECTOR)

  // Add missing `href`, or use title as link add missing link.
  if ($linkToNote) {
    $linkToNote.href = note.url
  } else {
    $body.innerHTML = `<p><a href="${note.url}">${$body.children[0].innerHTML}</a></p>`
  }

  /**
   * Unwrap the `<p>` to only keep it’s HTML string. This would not be needed
   * if Vue could insert raw (unescaped) HTML like Laravel {{! htmlStr !}}.
   * That is why we wrapped the link by a `<p>` in a previous condition.
   */
  note.frontmatter.excerpt = $body.children[0].innerHTML
}
