const parser = new DOMParser()
const EMPTY_LINK_SELECTOR = 'a[href="./.html"]'

/**
 * Turn excerpt into a proper link to be used in an index.
 * @param {import('vitepress').ContentData} post
 */
export const excerptToLink = post => {
  if (!post.frontmatter.excerpt || post.excerptTransformed) { return }

  const $body = parser.parseFromString(post.frontmatter.excerpt, 'text/html').body
  const $linkToPost = $body.querySelector(EMPTY_LINK_SELECTOR)

  // Add missing `href`, or use title as link add missing link.
  if ($linkToPost) {
    $linkToPost.href = post.url
  } else {
    $body.innerHTML = `<p><a href="${post.url}">${$body.children[0].innerHTML}</a></p>`
  }

  /**
   * Unwrap the `<p>` to only keep it’s HTML string. This would not be needed
   * if Vue could insert raw (unescaped) HTML like Laravel {{! htmlStr !}}.
   * That is why we wrapped the link by a `<p>` in a previous condition.
   */
  post.frontmatter.excerpt = $body.children[0].innerHTML
  post.excerptTransformed = true
}
