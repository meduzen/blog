---
title: Developing for the 20%
description: You are among them.
publishedAt: 2024-04-26
excerpt: You managed to ship 120 KB of decently performant JavaScript, and suddenly it becomes 2 MB of craptilde nonsense so [why even bother optimizing]() in the first place?
outline: false
---

# Developing for the 20%

<datetime :date="$frontmatter.publishedAt" formatter="longdate"/>

In his excellent and very entertaining [_Capitalism, The Web, And You_ talk](https://www.youtube.com/watch?v=GZsIhiXJjpY) ([ffconf 2022](https://2022.ffconf.org)), [Heydon Pickering](https://heydonworks.com/) explains an arsh reality when doing web development as a job: no matter how much efforts you put into optimizing the performance of a website, too often there will be someone requiring you to add heavy [third-party](https://almanac.httparchive.org/en/2022/javascript#bytes) scripts for whatever silly purpose (mainly marketing, advertising and [tracking](https://gist.github.com/meduzen/062e543c6c11b596cdb7a02dd9fb3b67)), with no technical expert having a word to say on this.

You managed to ship 120 KB of decently performant JavaScript, and suddenly it becomes 2 MB of craptilde nonsense, [slowing down](https://gomakethings.com/the-cost-of-javascript-in-2023/) and significantly degrading the website. So why even bother optimizing in the first place?

Well, the answer is straightforward: do it for those who won’t be annoyed by these third-party scripts (because they are mostly equipped with ad blockers). **Develop for these 20%**.

> 20%, really?

It doesn’t matter, the number looks nice in the title. Actually it could be [way](https://backlinko.com/ad-blockers-users#ad-blocking-stats-top-picks) [more](https://www.statista.com/statistics/435252/adblock-users-worldwide/), but each website has a different audience.

## Giving back

If you care about having a decent experience on the internet, you are probably using an adblocker yourself, so one of the last things you want is having to deal with slow and clunky websites, even when they don’t come with third-party scripts.

Each time you are happy with a website, it means someone else put enough care in it for you, so it’s probably nice if you manage to give back to another human by also being careful while creating websites. Let’s do it, for the 20%.
