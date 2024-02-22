---
title: Mouse-first typewriting
description: A revolutionary technique to type on the keyboard. Compatible with CSS.
publishedAt: 2024-02-21
excerpt: I just created a [revolutionary technique]() to make typing on the keyboard easier, and it’s compatible with CSS!
---

# Mouse-first typewriting

<datetime :date="$frontmatter.publishedAt" formatter="longdate"/>

Picture yourself at a younger age: you want to discover that mesmerizing machine named computer, but you’ve never used a keyboard before. There are so many keys, even more than the alphabet can contain, and they are all layed out in a weird order. It’s so intimidating!

So you call your racist uncle (apparently there’s one in every family these days), and he shows you a “mouse-first typewriting” technique he created to make your life better:

> Forget these keyboards, they _doesn’t scale_. With the _well-engineered_ copy-paste, you only need two _meticulously balanced_ utility buttons!

<video autoplay loop playsinline>
    <source src="/content/mouse-first-typewriting-dark.mp4" />
</video>

Do your younger selves approve? I bet they do!

<figure>
    <img src="/content/brent-rambo-thumbs-up.gif" alt="A young blond boy – apparently named Brent Rambo – giving a thumbs up after having used a mouse in front of an Apple computer" style="margin-inline: auto;" />
</figure>

## Let’s move on.

There’s an interesting phenomenon happening when you read web developers passionated by the web platform: every now and then, there’s kind of a moment, usually lasting a couple of days, during which some of them are writing one after the other about the same topic, like a rally cry in defense of the _Goodness of the Web Platform™_ or against _things_ damaging it. This cycle occures every couple of months.

Unfortunately we pretty much need this, because browsing the web is often a disaster. There are plenty of reasons for that, like underestimating the complexity of the front-end discipline, overlooking HTML and CSS, or not giving a tilde about who will actually use the websites you make.

So, these days, it’s about FailWind: about [its marketing and promises](https://nuejs.org/blog/tailwind-misinformation-engine/), about [_utility-first CSS_](https://heydonworks.com/article/what-is-utility-first-css/), about [sharing experience](https://bastianallgeier.com/notes/tailwind) of using this tool. My experience with it is pretty straightforward: I know my stuff around CSS, I’ve never used any CSS framework, but I had to try it 6 years ago in a project, upon request of a back-end colleague, and it was a disaster.

- It’s unproductive when you are productive with CSS.
- It bloats the HTML payload and makes it harder to read.
- FailWind class naming is [not CSS friendly](https://github.com/tailwindlabs/tailwindcss/issues/413) [nor predictable](https://mastodon.social/@HTeuMeuLeu/111957326389259598).
- Adding dark mode [bloats the CSS payload](https://twitter.com/meduzen/status/1634517215834718208).

(It was 6 years ago, I don’t know today, and I don’t know any front-end developer using it or any other CSS framework.)

Again, I know my stuff around CSS. Everyone their path. Like for everything in web development, there are a lot of fashions and techniques to write and maintain CSS: this diversity is great, but it can be hard to navigate. Each time you decide to go for a tool or technology, there’s a learning curve for its adoption, its in-depth usage and its removal. The time you will take for this is time you can also decide to invest in understanding and learning the fundamentals.

## Bonus

Since we are talking about utility class, here are some I often use:

```css
/* Center the children of a flex container. */

.flex-center {
  display: inline-flex;
  justify-content: center;
  align-items: center;
}

/* Apply the accent color. */

.accent {
  color: var(--accent);
}

/* Apply font-weights. */

.f300 { font-weight: 300; }
.f400 { font-weight: 400; }
.f700 { font-weight: 700; }

/* Limit motion based on user preference.
 *
 * https://toot.cafe/@tomayac/110989258569274871
 */

.reduced-motion {
  &,
  &::before,
  &::after {
    @media (--reduced-motion) {
      animation-delay: -1ms !important;
      animation-duration: 1ms !important;
      animation-iteration-count: 1 !important;

      transition-duration: 1ms !important;
      transition-delay: 1ms !important;
    }
  }
}
```

When using utility classes along semantic classes in HTML, I separate them using a pipe (`|`), which increases the readability of the HTML:

```html
<ul class="eventsList | flex-center f700">
```

(Yes, I care about readability up to that level if detail. And I did not invent that technique, by the way.)

Also if you’re wondering what’s that `@media (--reduced-motion)` syntax from the last example, it’s called [Custom Media Queries](https://github.com/meduzen/--media.scss/blob/main/docs/custom-media-queries.md) and you can [use it](https://github.com/meduzen/canwe/tree/47541f6e6f104e8b8a8fdc0a8668edb0da5bd08a/src/css/media-queries) since years thanks to the PostCSS [`postcss-preset-env` plugin](https://preset-env.cssdb.org/). I can definitely say PostCSS is the most important tool for CSS: I’ve always coupled Sass and PostCSS together, and last year I’ve started to [ditch Sass in favor of only PostCSS](https://github.com/meduzen/canwe/pull/138), but that’s another story.
