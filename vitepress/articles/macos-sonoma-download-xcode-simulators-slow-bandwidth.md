---
title: Downloading Xcode Simulators on macOS Sonoma when the bandwidth is slow
description: It shouldn’t be a pain in the ass, but it is.
tags: ios simulator, xcode, safari, macos, apple, bandwidth
publishedAt: 2023-11-18
outline: [2, 3]
---

::: info Article updated on <datetime date="2025-02-07" formatter="longdate"/>
[Read all about the changes](../articles/macos-sonoma-download-xcode-simulators-slow-bandwidth.md#updates-to-this-article).
:::

Since [macOS Sonoma](https://www.apple.com/macos/sonoma/) (macOS 14), [Xcode](https://developer.apple.com/xcode/) doesn’t include any iOS Simulator anymore, so it’s now 50% lighter to download (3.2 GB instead of 7 GB), which is nice… except that downloading the Simulator separately sucks <del datetime="2025-06-07">if your bandwidth is slow</del> <ins datetime="2025-06-07">and will peak below 5 MB/s no matter your bandwidth</ins>.

---
# Downloading Xcode Simulators on macOS Sonoma when the bandwidth is slow

<datetime :date="$frontmatter.publishedAt" formatter="longdate"/>

There’s one question you might have before we jump in:

> I’m a web developer, should I care about the iOS Simulator?

Yes! If you are doing web development and wonder if you should install the iOS Simulator, jump to the [last section](#what-are-xcode-simulators-by-the-way).

## How to download the iOS Simulator

### Fail: the traditional way

On macOS, you would normally open Xcode and hit the “get” button from _Settings_ / _Platforms_.

<picture>
    <source media="(prefers-color-scheme: dark)" srcset="/content/xcode-settings-platforms-dark.webp" type="image/webp"/>
    <source media="(prefers-color-scheme: dark)" srcset="/content/xcode-settings-platforms-dark.png" type="image/png"/>
    <source media="(prefers-color-scheme: light)" srcset="/content/xcode-settings-platforms-light.webp" type="image/webp"/>
    <img src="/content/xcode-settings-platforms-light.png" alt="Xcode platforms settings, showing available platforms (macOS, iOS, watchOS, tvOS)." style="margin-inline: auto;" />
</picture>

My connexion is slow and peak at 21 Mbps (2.6 MB/s.), and downloading from that menu is more often in the 0.1 to 1 MB/s range, and even worse: it will fail after around 2 hours **with no possibility to resume the failing download**!

### Fail: same player try again with the command line

Alternatively, the download can be triggered from the command line:

```sh
xcodebuild -downloadPlatform iOS
```

But unfortunately, it’s as slow as a download from the Xcode app, and you’ll get kicked out the same way after a while without the ability to resume the download. At least the experience is consistent…

### Success: use Safari

Fortunately, along with the [previous method documentation](https://developer.apple.com/documentation/xcode/installing-additional-simulator-runtimes#Install-and-manage-Simulator-runtimes-from-the-command-line) comes a way simpler way to proceed: go to the [Apple developer downloads website](https://developer.apple.com/download/all/?q=ios%20Simulator%20runtime) (you have to login with an Apple ID) and download the Simulator runtime `.dmg` file directly from Safari: the download was way faster for me, and it can be resumed if it fails (it did not for me but I checked, for science and for you 😘).

Once you have downloaded the simulator file, add it to Xcode with this command (make sure to check the file path):

```sh
xcrun simctl runtime add iOS_17.0.1_Simulator_Runtime.dmg
```

The command should take around 20 seconds to run. Now you can open Spotlight and type _Simulator_.

<abbr title="We own the other team">w00t</abbr>! Another dumb mystery that should not exist is now solved. 💁‍♂️

## What are Xcode Simulators, by the way?

One of the benefits of using a Macbook is that you get access to Simulators for the whole Apple ecosystem through Xcode.

Simulators allow you to test how your websites or in-development native apps behave on any iPhone and iPad without the need to purchase the devices. Using Simulators doesn’t replace the experience of having your fingers on the real devices, but they are very good and you should definitely use them.

<picture>
    <source media="(prefers-color-scheme: dark)" srcset="/content/simulator-mehdi-blog-dark.webp" type="image/webp"/>
    <source media="(prefers-color-scheme: dark)" srcset="/content/simulator-mehdi-blog-dark.png" type="image/png"/>
    <source media="(prefers-color-scheme: light)" srcset="/content/simulator-mehdi-blog-light.webp" type="image/webp" />
    <img src="/content/simulator-mehdi-blog-light.png" alt="Simulator showing an iPhone SE (3rd generation) using iOS 17.0. The About page of Mehdi Merah’s blog is displayed in Safari." width="400" style="margin-inline: auto;" />
</picture>

Simulators are handy, robust and come with a good set of features, like the ability to use Safari macOS developer tools to inspect any Safari iOS tab. There’s an Apple WWDC 23 video about it ([from 6:42](https://developer.apple.com/videos/play/wwdc2023/10262?time=402) to 8:45).

:::details Screenshot of Safari iOS inspected from macOS.
<picture>
    <source media="(prefers-color-scheme: dark)" srcset="/content/ios-simulator-safari-dark.webp" type="image/webp"/>
    <source media="(prefers-color-scheme: dark)" srcset="/content/ios-simulator-safari-dark.png" type="image/png"/>
    <source media="(prefers-color-scheme: light)" srcset="/content/ios-simulator-safari-light.webp" type="image/webp"/>
    <img src="/content/ios-simulator-safari-light.png" alt="Simulator showing an iPhone SE (3rd generation) using iOS 17.0. Next to its window is Safari macOS developer tools, with the element and styles panes visible." style="margin-inline: auto;" />
</picture>

View this screenshot in light mode ([WebP](/content/ios-simulator-safari-light.webp), [PNG](/content/ios-simulator-safari-light.png)) or in dark mode ([WebP](/content/ios-simulator-safari-dark.webp), [PNG](/content/ios-simulator-safari-dark.png)).
:::

## Updates to this article

### <datetime date="2025-02-07" formatter="longdate"/>

- I now have fast internet and have noticed a slow bandwidth isn’t the only issue to download the Simulator runtime: the download speed is throttled anyway for [failing](#fail-the-traditional-way) [situations](#fail-same-player-try-again-with-the-command-line).
- Bad news: [the only successful possibility](#success-use-safari) got killed: Apple does’t provide new iOS Simulator runtimes as direct download on their website since iOS 18.3. I still have to try to download it, pending a macOS computer update before I do. Previous runtimes (iOS 18.2 and below) are still available and fast to download.

If you want to share how this change impacts you, follow the website footer and tell me.
