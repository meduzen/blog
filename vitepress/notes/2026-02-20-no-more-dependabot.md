---
title: No more dependabot in these repositories
description: Code repositories with low activity shouldn’t bother about tooling that much.
publishedAt: 2026-02-20
excerpt: Code repositories with low activity [shouldn’t bother]() about tooling that much.
---

# No more dependabot in these repositories

<datetime :date="$frontmatter.publishedAt" formatter="longdate"/>

[Dependabot](https://github.com/dependabot/dependabot-core) is a great tool: it automatically creates periodic pull requests in your repository when there are dependencies updates or security fixes. It’s convenient, a lot of projects use it. But when your repository hasn’t that much activity, it becomes burden and noise, even when you configure it to only run once per month, the lowest frequency you can get.

Looking at [_Can We_ repository](https://github.com/meduzen/canwe/), which exists since 6 years and in which dependabot was added 3 years ago, there are now [192 pull requests](https://github.com/meduzen/canwe/pulls?q=is%3Apr): [67 are from myself](https://github.com/meduzen/canwe/pulls?q=is%3Apr+is%3Aclosed+author%3Ameduzen) and [127 from dependabot](https://github.com/meduzen/canwe/pulls?q=is%3Apr+is%3Aclosed+author%3Aapp%2Fdependabot). But here’s the thing: I’ve closed without merging them [97 dependabot pull requests](https://github.com/meduzen/canwe/pulls?q=is%3Apr+is%3Aclosed+author%3Aapp%2Fdependabot++is%3Aunmerged) (and [2 from me](https://github.com/meduzen/canwe/pulls?q=is%3Apr+is%3Aclosed+author%3Ameduzen++is%3Aunmerged+)).

So today I [Mari Kondo-ed it](https://en.wikipedia.org/wiki/Marie_Kondo#KonMari_method) from this repository, and will soon on others (there are [softer ways to disable it](https://docs.github.com/en/code-security/how-tos/secure-your-supply-chain/secure-your-dependencies/configuring-dependabot-version-updates#disabling-dependabot-version-updates)).

Putting aside the noise in both the repo history and my GitHub notifications, a project with low activity and no security risks like [_Can We_](https://canwe.dev) doesn’t need frequent maintenance. Also, dependabot won’t help with breaking changes and code migration for major updates, so I do them manually anyway.

As a developer, you often reuse stuff (code, configuration, workflow…) from a project to another, but sometimes the “defaults” you are used to doesn’t work that much everywhere, or things change and it’s time to take decisions.
