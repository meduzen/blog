---
title: ISO standards are not free
description: It baffles me that access to ISO standards are under a paywall.
publishedAt: 2023-11-25
excerpt: I want to dive in the ISO 8601 standards (the ones for date and time formats), so I’m [frustrated by the paywall]().
outline: false
---

# ISO standards are not free

<datetime :date="$frontmatter.publishedAt" formatter="longdate"/>

- [ISO standards](https://www.iso.org/standards.html) are **not** free to read. They are for an incredible amount of things.
- [TC39 specifications](https://tc39.es/) are free to read. They are for JavaScript.
- [W3C standards](https://www.w3.org/standards/) are free to read. They are specifications for HTML, CSS, browsers API, protocols, anything web…

There’s even a [FAQ entry for that on the ISO website](https://www.iso.org/footer-links/frequently-asked-questions-faqs/general-faqs.html):

::: info Why is there a charge for standards?
> Developing, publishing and maintaining ISO standards incurs a cost, and revenues from selling them helps ISO and its members to cover an important part of these costs. Charging for standards allows us to ensure that they are developed in an impartial environment and therefore meet the needs of all stakeholders for which the standard is relevant. This is essential if standards are to remain effective in the real world. ISO and its members offer a number of options to access ISO standards.
:::

I understand creating quality standards require a favorable environment, making them expansive, with [the financing being a mix of public and private contributions](https://en.wikipedia.org/wiki/International_Organization_for_Standardization#Financing), but as an individual who wants to understand how a web spec makes use an ISO standards, there’s no way I can spend so much money [each time](https://github.com/meduzen/datetime-attribute/issues/108) I’m interested in a specification. In the case of the ISO 8601 spec, it’s [CHF 166](https://www.iso.org/standard/70907.html) + [CHF 17](https://www.iso.org/standard/81801.html) + [CHF 187](https://www.iso.org/standard/70908.html), so that’s 383 €, not counting the [_under development_ extension](https://www.iso.org/standard/86124.html).

Standards should be part of the commons, otherwise it’s as dumb as the [scientific publications business](https://direct.mit.edu/qss/article/doi/10.1162/qss_a_00272/118070/The-Oligopoly-s-Shift-to-Open-Access-How-the-Big).

## Resources:

- [Why aren't ISO standards free?](https://www.reddit.com/r/engineering/comments/jquuls/why_arent_iso_standards_free/)
- [Tech spec experts seek allies to tear down ISO standards paywall](https://www.theregister.com/2021/07/31/iso_paywall_battle/)
