---
title: Using Vitepress `cleanUrls` option on a Nginx server
description: We share, receive and see URLs all the time, so it’s nice to have human-readable URLs. Here’s my Nginx configuration for this in Vitepress.
tags: nginx, url-rewriting, vitepress, url, http, redirect
publishedAt: 2023-11-10
outline: [2, 3]
excerpt: We share, receive and see URLs all the time, so it’s nice to have [human-readable URLs](https://en.wikipedia.org/wiki/Clean_URL) like `example.tld/yeah` instead of `example.tld/yeah.html`. On this blog using Vitepress on a Nginx environment, [it works rather well]().
---

We share, receive and see URLs all the time, so it’s nice to have [human-readable URLs](https://en.wikipedia.org/wiki/Clean_URL) like `example.tld/yeah` instead of `example.tld/yeah.html`.

On this blog using [Vitepress](https://vitepress.dev) on a [Nginx](https://nginx.org/) environment, it works rather well (with a minor trade-off).

---

# Vitepress `cleanUrls` option on a Nginx server

<datetime :date="$frontmatter.publishedAt" formatter="longdate"/>
<tags/>

Setting Vitepress [`cleanUrls`](https://vitepress.dev/reference/site-config#cleanurls) to `true` removes the trailing `.html` from URLs. The internal links of your Vitepress app changes **from `<a href="/something.html">` to `<a href="/something">`**.

However, `cleanUrls` does not change the file names or the folder structure of the generated HTML files, which means your server must now be able to serve the `/something.html` file when the `/something` URL is requested.

Here’s how I solved it, assuming the app is hosted on its own domain or subdomain (`example.tld` or `subdomain.example.tld`, I did not test `example.tld/path/to/app`).

At the time of writing, I’m using Vitepress 1.0.0-rc.24 and Nginx 1.25.

## Full configuration

If you don’t want to read the [step-by-step section](#step-by-step), here are the important parts of the configuration. Adapt them to your needs and make sure to understand the [trade-off for index pages](#the-trade-off-for-index-pages).

```nginx
server {
    index index.html;
    rewrite ^(.+)/$ $1 permanent;

    if ($request_uri ~ ^/(.*)index\.html(\?|$)) {
        return 301 /$1;
    }

    if ($request_uri ~ ^/(.*)\.html(\?|$)) {
        return 301 /$1;
    }

    location / {
        error_page 404 /404.html;
        try_files $uri $uri.html $uri/ =404;
    }
}
```

::: details The same, with code comments:
```nginx
server {
    index index.html;
    # and other things…

    # Remove the trailing slash (permanent 301 redirect). 
    rewrite ^(.+)/$ $1 permanent;

    # Remove the trailing `index.html`. 
    if ($request_uri ~ ^/(.*)index\.html(\?|$)) {
        return 301 /$1;
    }

    # Remove the trailing `.html`. 
    if ($request_uri ~ ^/(.*)\.html(\?|$)) {
        return 301 /$1;
    }

    location / {
        # When the HTTP status code is 404, answer with the `/404.html` file.
        error_page 404 /404.html;

        # When `foo/bar` (which is `$uri`) is requested, 
        # try to serve the first existing file among the list: 
        # `foo/bar`, `foo/bar.html` or `foo/bar/index.html`. 
        # Otherwise answer with a 404 code.
        try_files $uri $uri.html $uri/ =404;
    }
}
```
:::

## Step-by-step

The [first step](#step-1-the-gist) is enough to have clean URLs, the [other steps after](#step-2-the-404-page) will bring refinements and safeguards.

### Step 1: the gist

Make sure your Nginx [`location`](https://nginx.org/en/docs/http/ngx_http_core_module.html#location) block have this [`try_files`](https://nginx.org/en/docs/http/ngx_http_core_module.html#try_files) rule:

```nginx
server {
    index index.html;
    # and other things…

    location / {
        # When `foo/bar` (which is `$uri`) is requested, 
        # try to serve the first existing file among the list: 
        # `foo/bar`, `foo/bar.html` or `foo/bar/index.html`. 
        # Otherwise answer with a 404 code.
        try_files $uri $uri.html $uri/ =404; // [!code hl]
    }
}
```
::: details The `try_files` list in details:
- **`$uri`** is for **exact matches** like assets: when the browser requests `logo.svg`, we search for a `logo.svg` file.
- **`$uri.html`** **adds a missing `.html`** (`foo/bar` becomes `foo/bar.html`), which is the reverse operation of Vitepress `cleanUrls`.
- **`$uri/`** adds a trailing `/` (`foo/bar/`) to instruct Nginx to “look into the `foo/bar` **directory**”, so Nginx ends up searching for `foo/bar/index.html`, as defined by the [`index`](https://nginx.org/en/docs/http/ngx_http_index_module.html#index) directive. This one is needed for the root of the website (`example.tld` must serve `example.tld/index.html`).
- **`=404`** throws a [404](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/404) status if none of these files can be found.
:::

At this step, most paths are working with and without `.html`:

| Markdown | Valid paths | Invalid paths |
|---|---|---|
| `/index.md` | `/`, `/index.html` | - |
| `/notes.md` | `/notes`, `/notes.html` | `/notes/` ([403](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/403))
| `/notes/my-note.md` | `/notes/my-note`, `/notes/my-note/`, `/notes/my-note.html` | -
| - | anything not found | Nginx 404

We need 3 improvements:
- Vitepress 404 page (see [step 2](#step-2-the-404-page)) instead of Nginx 404 message;
- a fix for the 403 when there’s a trailing slash ([step 3](#step-3-avoiding-the-403-errors));
- no more paths with `.html` ([step 4](#step-4-redirect-slughtml-to-slug));

### Step 2: the 404 page

The default Vitepress comes with a `404.html` page. Let’s serve it using the [`error_page`](https://nginx.org/en/docs/http/ngx_http_core_module.html#error_page) directive:

```nginx
server {
    index index.html;
    # and other things…

    location / {
        # When the HTTP status code is 404, answer with the `/404.html` file. // [!code ++]
        error_page 404 /404.html; // [!code ++]
        // [!code ++]
        try_files $uri $uri.html $uri/ =404;
    }
}
```

### Step 3: avoiding the 403 errors

To avoid the [403](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/403) on paths with a trailing slash (e.g. `my-blog.com/` or `my-blog.com/notes/`), we can redirect them to their non-trailing slash version using the [`rewrite`](https://nginx.org/en/docs/http/ngx_http_rewrite_module.html#rewrite) directive in the [`server`](https://nginx.org/en/docs/http/ngx_http_core_module.html#server) block.

```nginx
server {
    index index.html;
    # and other things…
    // [!code ++]
    # Remove the trailing slash (permanent 301 redirect). // [!code ++]
    rewrite ^(.+)/$ $1 permanent; // [!code ++]

    location / {
        error_page 404 /404.html;
        try_files $uri $uri.html $uri/ =404;
    }
}
```

::: warning {id=warning-http-redirect}
Note that the `permanent` keyword do a [301](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/301) redirect, which is permanent and might be cached during a very long time by browsers and search engines. If you are not sure about this rewriting rule, consider the `redirect` keyword to get a [302](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/302) (temporary) redirect instead of a 301.
:::

### Step 4: redirect `/slug.html` to `/slug`

For now, `/slug` and `/slug.html` are both working, so let’s redirect the one with the trailing `.html`.

https://stackoverflow.com/questions/38228393/nginx-remove-html-extension

```nginx
server {
    # other things…

    rewrite ^(.+)/$ $1 permanent;
    // [!code ++]
    # Remove the trailing `index.html`. // [!code ++]
    if ($request_uri ~ ^/(.*)index\.html(\?|$)) { // [!code ++]
        return 301 /$1; // [!code ++]
    } // [!code ++]
    // [!code ++]
    # Remove the trailing `.html`. // [!code ++]
    if ($request_uri ~ ^/(.*)\.html(\?|$)) { // [!code ++]
        return 301 /$1; // [!code ++]
    } // [!code ++]

    location / {
        error_page 404 /404.html;
        try_files $uri $uri.html $uri/ =404;
    }
}
```

::: warning
Like explained in the [warning of the previous step](#warning-http-redirect), you might prefer `return 302` over `return 301`.
:::

## The trade-off for index pages

If you have index pages like `notes/index.md`, you have to move them to `notes.md`, otherwise you’ll experience an infinite redirection loop where Nginx wants to remove the slash, but Vitepress wants to add it back.

In other words, do this:

```
.
├─ index.md
├─ notes
│  ├─ index.md // [!code --]
│  ├─ post-1.md
│  └─ post-2.md
├─ about.md
└─ notes.md // [!code ++]
```

## Readings

Aside from [Nginx documentation for the HTTP core module](https://nginx.org/en/docs/http/ngx_http_core_module.html), I was helped by:
- [NGINX remove .html extension](https://stackoverflow.com/questions/38228393/nginx-remove-html-extension) (StackOverflow)
- [Routing access failure after server Nginx deployment](https://github.com/vuejs/vitepress/discussions/2837#discussioncomment-7337266) (GitHub issue on Vitepress repository): this was where I started before deciding to write this post.
