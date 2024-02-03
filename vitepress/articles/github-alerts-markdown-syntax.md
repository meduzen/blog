---
title: GitHub Markdown syntax for alerts considered harmful
description: I’ve decided to not use it, it’s confusing and poorly designed.
tags: markdown, github, semantic, vitepress
publishedAt: 2024-02-03
excerpt: I loved the _GitHub Markdown syntax for alerts_ until it [landed in Vitepress](https://github.com/vuejs/vitepress/blob/main/CHANGELOG.md#100-rc40-2024-1-22), which made me think about it. Now [I think it sucks]().
---

I had multiple options for the title of this note, from being neutral to opinionated, or even pedantic. I deliberately kept [the worst](https://meyerweb.com/eric/comment/chech.html).

The rant has been written before having discovered [this comment and its answers](https://github.com/orgs/community/discussions/16925#discussioncomment-2791869) on the related GitHub community discussion. If you’ve already read what’s there, you won’t learn anything new here. (I am actually glad my observations were all backed by others before I even published them.)

---

# GitHub Markdown syntax for alerts considered harmful

<datetime :date="$frontmatter.publishedAt" formatter="longdate"/>

Vitepress [1.0.0-rc.40](https://github.com/vuejs/vitepress/blob/main/CHANGELOG.md#100-rc40-2024-1-22) adds [support for the GitHub syntax for alerts](https://vitepress.dev/guide/markdown#github-flavored-alerts) and converts it into [custom containers](https://vitepress.dev/guide/markdown#custom-containers).

## The issues

Thou I’ve been an early adopter of this syntax on GitHub, I’ve [decided not use it](https://github.com/meduzen/blog/blob/main/CONTRIBUTING.md#markdown-flavor) in other contexts:

```md
> [!NOTE]  
> Lorem mynote ipsum.
```

Here’s why:
- The content of the ~~heading~~ first sentence is predefined: goodbye freedom of writing, or translations.
- You have to use the syntax for a [blockquote](https://daringfireball.net/projects/markdown/syntax#blockquote) but it generates exactly 1 [paragraph](https://developer.mozilla.org/fr/docs/Web/HTML/Element/p), so it’s [impossible](https://github.com/vuejs/vitepress/issues/3512) to have any other [block element](https://daringfireball.net/projects/markdown/syntax#block). This semantic issue impacts the portability of Markdown documents to other systems: they will create a blockquote.
- You have to remember limitations that [raise questions](https://github.com/vuejs/vitepress/issues/3512).

In any system, the previous example would be a blockquote (more precisely: a paragraph in a blockquote) but both GitHub and Vitepress turns it into two paragraphs without blockquote.

In GitHub:

```html
<div class="markdown-alert markdown-alert-note">
    <p class="markdown-alert-title"><svg>…</svg> Note</p>
    <p>Lorem mynote ipsum</p>
</div>
```

In Vitepress:

```html
<div class="note custom-block github-alert">
    <p class="custom-block-title">NOTE</p>
    <p>Lorem mynote ipsum</p>
</div>
```

## Use Vitepress custom containers instead

Vitepress [custom containers](https://vitepress.dev/guide/markdown#custom-containers) are more suitable in any situation: you get the full power of the previous example, but with full semantic support and the ability to put whatever you want as first sentence:

```md
::: info My first sentence
This is a paragraph

> This is a blockquote.
:::
```

HTML output:

```html
::: <!-- 👈 not shown in Vitepress -->
<div class="info custom-block">
    <p class="custom-block-title">My first sentence</p>
    <p>This is a paragraph</p>
    <blockquote>
        <p>This is a blockquote.</p>
    </blockquote>
</div>
::: <!-- 👈 not shown in Vitepress -->
```

And if you are reading it on my blog:

::: info My first sentence
This is a paragraph

> This is a blockquote.
:::

The `:::` will look disgracious on other systems, but I prefer this trade-off over incorrect semantic: [looking at my blog](https://github.com/search?q=repo%3Ameduzen%2Fblog+lang%3AMarkdown+%3A%3A%3A&type=code), only 5 of 11 occurences (at the time of writing) would have been achievable with the GitHub syntax… and this is assuming I don’t need to customise the first sentence, which I always do, giving a 0 of 11 occurences.

## Wrapping up

Instead of having to figure out if I can use the GitHub syntax at a given place, it’s better maintenance to not use it at all. The only use case I can think of for the GitHub syntax outside of GitHub is when you don’t care about semantic (e.g. paper books).

When the GitHub syntax was initially designed, I doubt the flexibility, the semantic or the compatibility with other systems were considered. Actually, [the exact issues I’ve observed](#the-issues) were raised immediatly after the initial post went online: exactly [9 hours](https://github.com/orgs/community/discussions/16925#discussioncomment-2787141) for the first and [1 day and 58 min.](https://github.com/orgs/community/discussions/16925#discussioncomment-2791861) for the second.


I think [Vitepress shouldn’t encourage it](https://github.com/vuejs/vitepress/discussions/3540), and could revert it. I also think GitHub should change its decision and adopt a custom syntax that doesn’t break semantic: a candidate for this is the one used by Vitepress for custom containers, which is also used by [Docusaurus](https://docusaurus.io/docs/markdown-features/admonitions), and for which [extensive discussions](https://talk.commonmark.org/t/generic-directives-plugins-syntax/444) exist since a decade ago.
> Hey, but if GitHub reverts it, that would looks bad on my documentation.

Well, yes, and mine too: and actually it already changed [at least once](https://github.com/meduzen/datetime-attribute/commit/26e1234b46c0db7585883ed52d6b371066e37159) since the early implementation. And worst: at work I have documentation that now needs to be ingested in another system that doesn’t give a tilde about this syntax. So I’m very fine with breaking it again, but hopefully for a better design.
