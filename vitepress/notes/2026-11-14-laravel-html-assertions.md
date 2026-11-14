---
title: Clear intent with Laravel HTML assertions
description: This is for you if you ramble and gesture at the screen when you use `assertSee()` or `assertSeeText()`.
publishedAt: 2026-11-14
excerpt: I’ve stopped using `assertSee` in my Laravel tests because [it’s a trap](https://itsatr.app) (unrelated&#58; I once owned this domain). Instead, [I reach for]() `assertSeeText` and `assertSeeHtml`.
---

# Clear intent with Laravel HTML assertions

<datetime :date="$frontmatter.publishedAt" formatter="longdate"/>

Writing tests can feel like a misuse of time, so when something feels weird or behave unexpectedly, it’s tempting to take the **fastest way**. However, as a project grows, so does chaos.

For me, `assertSeeText` was the pain point: sometimes it works, sometimes it doesn’t and I then rely on the generic `assertSee` (the fastest way!) without understanding why. It was disappointing, so I found [how to avoid this mess](../articles/laravel-assertions-on-invalid-html.md).