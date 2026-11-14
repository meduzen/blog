---
title: Using the appropriate Laravel assertions to test HTML
description: This is why you never know if you should use `assertSee()` or `assertSeeText()`.
tags: laravel, tests, html
publishedAt: 2026-11-14
---

I’ve stopped using `assertSee` in my Laravel tests because [it’s a trap](https://itsatr.app) (unrelated&#58; I once owned this domain). Instead, [I reach for](../articles/laravel-assertions-on-invalid-html.md) `assertSeeText` and `assertSeeHtml`.

---

# Using the appropriate Laravel assertions to test HTML

<datetime :date="$frontmatter.publishedAt" formatter="longdate"/>

Stack for this post:
- Laravel 13.38.0
- PHP 8.5.12

Laravel [`assertSeeText`](https://laravel.com/framework/docs/13.x/http-tests#assert-see-text) contains a trap: sometimes the content you expect to find in the tested HTML is there, but the test still fails. Without understanding why, you fall back on [`assertSee`](https://laravel.com/framework/docs/13.x/http-tests#assert-see) and your test passes again:

```php
// tests/Feature/Http/Controllers/WhateverControllerTest.php

it('visits whatever page and finds whatever text in it', function () {
    $this
        ->get('/whatever-page')
        ->assertSeeText('whatever text'); // [!code --]
        ->assertSee('whatever text'); // [!code ++]
});
```

## Why `assertSee` works where `assertSeeText` doesn’t

The reason the test failed is that `assertSeeText` first tries to turn the HTML into a plain text string. To do this, `strip_tags` is called and may [trash invalid DOM parts](https://www.php.net/manual/en/function.strip-tags.php#:~:text=partial%20or%20broken%20tags,data%20than%20expected), so if your content is inside a removed section, it can no longer be found and the test fails:

```html{1,5}
<<article>
    <h1>I contain whatever</h1>
    <p>
        The <code>article</code> tag is invalid
        and <em>whatever text</em> in it will be trashed
        during the test.
    </p>
</article>
```

When falling back on `assertSee`, it leaves the HTML untouched and the test passes again, but you are now missing an opportunity to discover and fix a potential markup issue. On the long run, you may end up wondering why some tests uses `assertSee` and others don’t.

## Avoid `assertSee`

Validate your HTML. Use `assertSeeText` to find content, and `assertHtml` to find HTML tags and attributes, this way intent is clear:

```php{6,7}
// tests/Feature/View/Components/BannerTest.php

describe('<x-banner>', function () {
    test('default (no params)', fn () => $this
        ->blade('<x-banner>Banner content</x-banner>')
        ->assertSeeHtml('<div class="banner')
        ->assertSeeText('Banner content')
    );
});
```

In fact, `assertSeeHtml` is a [currently undocumented](https://github.com/laravel/docs/pull/11459) but convenient alias for `assertSee('<div class="banner', false)`: passing `false` as second parameter disables character encoding, preventing `<div class="banner` in the tested HTML to become `&lt;div class=&quot;banner`, which would cause the test to fail.

Related assertions: [`assertDontSee`](https://laravel.com/framework/docs/13.x/http-tests#assert-dont-see), `assertDontSeeHtml`, [`assertDontSeeText`](https://laravel.com/framework/docs/13.x/http-tests#assert-dont-see-text), `assertSeeHtmlInOrder`, [`assertSeeInOrder`](https://laravel.com/framework/docs/13.x/http-tests#assert-see-in-order), [`assertSeeTextInOrder`](https://laravel.com/framework/docs/13.x/http-tests#assert-see-text-in-order).