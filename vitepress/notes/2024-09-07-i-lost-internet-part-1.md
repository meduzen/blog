---
title: I’ve lost Internet and nobody knows how
description: Apparently it moved to another provider without moving to another provider.
publishedAt: 2024-09-07
outline: [2, 3]
excerpt: The Belgian [Easy Switch](https://www.bipt.be/consumers/faq/easy-switch) procedure allows you to switch internet provider in a more convenient way. In the [first part of this Belgian story](), we’ll try to understand how it seems so _easy_ that you don’t even need to ask for it.
---

# I’ve lost Internet and nobody knows how

<datetime :date="$frontmatter.publishedAt" formatter="longdate"/>

Proximus was my [dear](./2023-11-18-macos-sonoma-downloading-ios-simulator-is-now-complicated.md) domestic Internet provider until yesterday, when they cut my subscription around <datetime date="2024-09-06T17:45+02:00" formatter="shorttime" precision="datetime utc"/>. For now it seems **nobody asked for this resignation**. Not me, not them, nobody.

I immediatly checked my emails using mobile data, and noticed they sent me <time datetime="2024-09-05">two days ago</time> the normal email they send when someone resigns, which basically contains a confirmation of the resignation and instructions to return their hardware (router…) using postal services.

Since there are multiple [Proximus shops](https://www.proximus.be/en/id_ar_poslocator/personal/orphans/find-a-proximus-shop.html) in the country, I immediately decided to head to the closest one, despite they are not really doing support anymore but mostly commercial operations. You’ll understand why later.

## I (did not) asked an Easy Switch

The Belgian [Easy Switch](https://www.bipt.be/consumers/faq/easy-switch) procedure allows you to switch internet provider in a more convenient way. According to the limited information available to the Proximus shop, that’s what triggered my resignation, except I did not asked for it.

The way Easy Switch works is pretty simple and will look familiar to you if you’ve already transferred a domain name from a provider to another: you can get an Easy Switch number at any time from your current provider (apparently it’s on your invoices, and in the online dashboard) and bring it along with your client ID to any other provider, which allow them to trigger a switch. To minimize downtime on your side, your current subscription is only supposed to stop when the new one is activated.

For now my new provider is… nobody! The Proximus shop has no access to the origin of the request. They only could tell me it was initiated on <datetime date="2024-08-30" formatter="yearless"/>.

## How to (not) get back your resigned subscription

Since my subscription was _remotely_ (I guess) de-activated, my best hope was that an easy way to revert it would be possible, but it’s not. Once the Easy Switch has been started, there’s some sort of grace period where it’s not possible to do _anything_: even having me trying to re-subscribe like a new client was apparently complicated (see further), so it’s still too early to be positive about the outcome of a resubscription.

### I’m (not) a new Proximus client

So now the situation is that I’m considered as a new client, meaning I apparently have to wait up to <duration w="2">two weeks</duration> to get internet back because it’s the Proximus standard waiting time to send a technician to install the hardware… which is already installed since <duration w="30">months</duration>. What happens technically is that they enable the line the day the technician comes, which means they very probably could do it earlier.

Due to the absurdity of the situation, and with the limited powers in the hands of the shop, the guy left a note to request the technical support to call me today: they are supposed to have more information and stuff. Since we’re Saturday, I have very little hope this will happen, but who knows…

::: details FAQ
> Why the guy at the shop did not call the support to sort this out immediately?

Because it’s how Proximus, a company that’s basically broken, operates and treats the customer. The first reaction from the guy at the shop was something like “an Easy Switch has been triggered, so it’s not on our side”, and I had to protest a bit more than a bit to get some form of service. That’s the reason why I went to the shop instead of using the phone and waiting in line: Proximus phone support is hell and you won’t have someone technical until you take around <duration m="20">20 minutes</duration> to convince the person on the line that the issue is technical, and only then they will anyway tell you that someone technical will call you back the next day (which might or not happen depending on… stuff).

That’s how large the distance between you and the solution.

> But why did you not switch provider then?

Reasons tight to my landlord, and also because I follow a very simple rule: do not switch internet provider if your internet connection works.
:::

### My new subscription

So because the system of the shop was apparently not collaborative, I’m considered as a new client, and in order to avoid me unwanted fees (you pay around 50 € when the technician comes to install the stuff), my subscription has been changed from _fiber internet_ (52.99 €/month) to _fiber internet + TV_ (72.99 €/month), so that I can benefit from an ongoing discount leading to pay 52.99 €/month during <duration w="26">6 months</duration>, and then I’ll just have to cancel the TV before the discount ends. I absolutely don’t need TV and won’t even plug the decoder if the technician comes to my place with it.

## What I’ll do

Since I am now waiting in a technical void using the mobile data from the company phone, and unless Proximus manages to bring my internet back really soon, it means I’ll have to work from the company office for the next <duration w="2">two weeks</duration>. I don’t know to which extent I can use the company data plan since I don’t have access to my consumption, nor the real limitations of the data plan, nor if I have to pay anything from my pocket if I go above any limit.

Aside from this, I’ll drop a complaint on the [government service dedicated to telecommunications complaints](https://www.ombudsmantelecom.be/en) (and maybe at the police) and on [Proximus forum](https://fr.forum.proximus.be). I have the following hypothesis:
- Someone clicked on the wrong button somewhere.
- A postman put a Proximus letter (they don’t send those unless you’re very late on paying bills, which I’m not) in the wrong letterbox, and someone decided to use my “name” and Easy Switch ID (apparently it’s on bills) to open a new contract: I don’t even know if it’s plausible since subscribing to a new contract <time datetime="2024-09-06">yesterday</time> required my ID card…
- I do drugs and alcohol to a point I think I don’t at all, which probably led me to change internet provider: I can’t wait to discover my parallel life and know which other weird things I’ve done!

Count on me to document the next and still unknown part of this very Belgian absurd story in a follow-up note.

## Timeline

- <datetime date="2024-08-30" formatter="longdate"/>: someone somewhere triggers the Easy-Switch procedure.
- <datetime date="2024-09-05" formatter="longdate"/>: I receive an email saying I’ve resigned from Proximus.
- <datetime date="2024-09-06T17:45+02:00" formatter="longdate-shorttime" precision="datetime utc"/>: no more Internet.
- <datetime date="2024-09-06T18:00+02:00" formatter="longdate-shorttime" precision="datetime utc"/>: heading to the Proximus shop (this article).
- <datetime date="2024-09-07" formatter="longdate"/> (today): waiting for the phone call from the support, with slightly limited hope.
