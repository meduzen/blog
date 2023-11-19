---
title: My first game changer
description: RSS feeds variations for all tastes and deviances
publishedAt: 2023-11-20
excerpt: RSS feeds were my first game changer as a consumer of the web.
---

# My first game changer

<datetime :date="$frontmatter.publishedAt" formatter="longdate"/>

In the early 2000’s, I used to regularly visit many videogames websites. Browsing them one by one was time-consuming, so imagine my happiness when I stumbled upon that cool tech with an equally cool name: [Really Simple Syndication](https://developer.mozilla.org/en-US/docs/Glossary/RSS).

Instead of wandering on the internet, I could now use one software to pull them’all and access the news offline. It was one of the most important **game changer** in how I consume the web, to the point I ended up reading the whole [spec](https://www.rssboard.org/rss-specification) and coding a RSS feed generator in PHP.

This blog now has [multiple flavors of RSS feeds](../about.md#feeds): big ones with all the content, lightweight ones with only excerpts or notes. I think it’s best to let you decide how you want to consume that space.

## The web is decentralized

Since Google sent [Google Reader](https://en.wikipedia.org/wiki/Google_Reader) [to the graveyard](https://gcemetery.co/google-reader/), many considered RSS as dead and irrelevant. These claims did not stop me to use them because there always was enough websites providing them, and RSS are powerful: they allowed to gather my decentralized web in a centralized place way before Facebook started to centralize a big chunk of the (in-)humanity around cats videos and [shitty engagement algorithms](https://www.europarl.europa.eu/news/en/press-room/20211028IPR16121/facebook-whistleblower-frances-haugen-testifies-in-parliament-on-8-november). I’ve always seen the web has decentralized.

::: details Even YouTube has RSS feeds
Find the ID of a YouTube channel (I don’t know if there’s a fast way to do this: find it out by yourself), and get the RSS feed by using this pattern:

```sh
https://www.youtube.com/feeds/videos.xml?channel_id=CHANNEL_ID
```
:::

Nowadays with the [Fediverse](https://en.wikipedia.org/wiki/Fediverse), an additional layer for the decentralized and interconnected web is [technically layed](https://www.w3.org/TR/activitypub/). RSS usages are straightforward to understand, but I can’t really grasp the future enabled by ActivityPub and I hope to live old enough to see it, whether it’s popular or on the edge of human societies.

If that topic is of any interest for you, a good place to start is on Aran Balkan’s blog: [in 2019, he talked about our dear internet at the European Commission](https://ar.al/2019/11/29/the-future-of-internet-regulation-at-the-european-parliament/).

## Aaron Schwartz

Among all the persons who made RSS awesome, one of them was [Aaron Schwartz](https://en.m.wikipedia.org/wiki/Aaron_Swartz). Aaron [was](https://www.harvardmagazine.com/2013/01/rss-creator-aaron-swartz-dead-at-26) a brilliant hactivist, his legacy includes contributions to the RSS spec, the Markdown spec, the [Creative Commons](https://creativecommons.org/2013/01/12/remembering-aaron-swartz/), the [Guerilla Open Access Manifesto](https://archive.org/stream/GuerillaOpenAccessManifesto/Goamjuly2008_djvu.txt), and more. The documentary [_The Internet's Own Boy: The Story of Aaron Swartz_](https://en.m.wikipedia.org/wiki/The_Internet%27s_Own_Boy) is a must watch (on [PeerTube](https://peertube.fr/videos/watch/5734aa91-b396-437c-9b3c-af3161282213), [Web Archive](https://archive.org/details/TheInternetsOwnBoyTheStoryOfAaronSwartz) or [YouTube](https://www.youtube.com/watch?v=9vz06QO3UkQ)).
