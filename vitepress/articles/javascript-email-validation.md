---
title: Validating an email using the web platform
description: Or how to avoid spinning a very complicated RegEx that will not cover all edge cases.
tags: javascript, email, validation, url, class
publishedAt: 2025-03-01
excerpt: There’s a lot we can do with only a few lines of code. [Let’s break this down]().
---

Some excerpt here…

---

# Validating an email using the web platform

<datetime :date="$frontmatter.publishedAt" formatter="longdate"/>
<tags/>

Emails RFCs ([5322](https://datatracker.ietf.org/doc/html/rfc5322), [6854](https://datatracker.ietf.org/doc/html/rfc6854)) are very complicated, leading people to write [bugs-prone](https://github.com/colinhacks/zod/issues/3913) [ridiculously complicated](https://github.com/guillaumepotier/Parsley.js/blob/654dfbf8cbf5f0278b7829b82d78fce6dfc337ee/src/parsley/validator_registry.js#L16) [regular expressions](https://github.com/colinhacks/zod/blob/e2b9a5f9ac67d13ada61cd8e4b1385eb850c7592/src/types.ts#L648-L663) to validate the format of an email address in their popular library.

While JavaScript runtimes (browsers, Node) are providing a direct way to do this, there’s still a way to workaround the [`URL`](https://developer.mozilla.org/en-US/docs/Web/API/URL/URL) object and surprisingly cover a bunch of cool stuff with it.

## Inside the `URL` object

Fun stuff: the `URL` object is not only for parsing regular links like `https://website.com`, but actually any type of link, no matter the protocol.

It can also parse:

- `file://MyLaptop/Mehdi/some-file.html`
- `ftp://username:password@domain.tld:8080/folder`
- `mailto:someone@domain.tld`

So let’s parse! (No it can’t directly parse email addresses.)

```js
const mailTo = new URL('mailto:someone@domain.tld')
```

```json
{
  href: "mailto:someone@domain.tld",
  pathname: "someone@domain.tld",
  protocol: "mailto:",
  /* other props */
}
```

“Oh look, the email address is in pathname, that’s a win!”

Hold on. It’s not. If we try to parse `mailto:someone@domain.tld/some/path`, this additional path will end up in pathname, too.

Instead, we are gonna use the protocol that contains something close to the email address, and more importantly that converts well into some properties: here comes `ftp`!

```js
const mailTo = new URL('ftp://username:password@domain.tld:8080/folder')
```

```json{3,10}
{
  host: "domain.tld:8080",
  hostname: "domain.tld",
  href: "ftp://username:password@domain.tld:8080/folder",
  origin: "ftp://domain.tld:8080",
  password: "password",
  pathname: "/folder",
  port: "8080",
  protocol: "ftp:",
  username: "username",
}
```

We have all we need!

Now we have two roads ahead of us: one where we only create a validation function based on this, and one where we try to get some additional benefits for common use cases. Let’s have a look at both.

## A simple validation function

We can make our email looks like a part of a `ftp` address, and then we recompose and compare.

```js
const validateEmail = address => {
  try {
    const { hostname, username } = new URL(`ftp://${address}`)
    return address == `${username}@${hostname}`
  } catch {
    return false
  }
}

// usage
validateEmail('someone@domain.tld') // true
validateEmail('invalid@email@domain.tld:123') // false
validateEmail(new Date()) // false
```

The `try...catch` is here to avoid a crash (`TypeError`) when providing a parameter like `new Date()`.

This works and leverage the web platform, which is always great: we don’t have to maintain any complicated code to validate emails, and chances are it is as solid, if not more than popular libraries. Actually it passes the whole Zod test suits, and at least 1 scenario where Zod fails.

Alternatively, we could have done the following, but chances are it would be slower (we could measure this), and not the right thing to do:

```js
const validateEmail = address => {
  const input = document.createElement('input')
  input.type = 'email'
  input.value = address
  return input.checkValidity()
}
```

Now let’s bring more fun.

## An `Email` class

Let’s convert the function into a class that extends `URL`, so we follow its spirit and provide a similar way to use it.

```js
export class Email extends URL {
  constructor(address) {
    super(`ftp://${address}`)

    if (!this.#validate(address)) {
      throw new TypeError(`Email constructor: ${address} is not a valid Email.`)
    }
  }

  #validate (address) {
    return `${this.username}@${this.hostname}` == address
  }

  static canParse(address) {
    try {
      new this(address)
      return true
    } catch {
      return false
    }
  }
}
```

We instantiate `Email` the same way we do with `URL`. Once [`super`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/super) is finished, `username` and `hostname` are available to the validation method, which also runs in the constructor.

```js
const email = new Email('someone@domain.tld')
email.username // 'someone'
email.hostname // 'domain.tld'

const wrongEmail = new Email('very@invalid@email:11') // ❌ TypeError
```

If we don’t want to instantiate, but only validate, we can run the static `canParse` method, which actually override the [one on the `URL`](https://developer.mozilla.org/en-US/docs/Web/API/URL/canParse_static) object and behaves similarly.

```js
Email.canParse('someone@domain.tld') // true
Email.canParse('invalid@email@domain.tld:123') // false
Email.canParse(new Date()) // false
```

At this point, we have an `Email` object following the standard `URL` object:
- throws if invalid
- validate with `canParse`
- bring `username` and `hostname`
- can be instantiated with a string but also with an instance of itself (`new Email(new Email('someone@domain.tld'))`)

It almost looks like it’s in the spec!

Two additional things we can make:
- ensuring `Email` can properly converts to a string: we want to output `someone@domain.tld` when needed, not an object;
- making sure neither `username` nor `hostname` can be reassigned.

This gives the following:

```js{10-24}
export class Email extends URL {
  constructor(address) {
    super(`ftp://${address}`)

    if (!this.#validate(address)) {
      throw new TypeError(`Email constructor: ${address} is not a valid Email.`)
    }
  }

  get hostname() {
    return super.hostname
  }

  get username() {
    return super.username
  }

  toJSON () {
    return `${this.username}@${this.hostname}`
  }

  toString () {
    return `${this.username}@${this.hostname}`
  }

  #validate (address) {
    return `${this.username}@${this.hostname}` == address
  }

  static canParse(address) {
    try {
      new this(address)
      return true
    } catch {
      return false
    }
  }
}
```

By redefining `username` and `hostname` using a [getter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get), we prevent to override these properties:

- a getter without [setter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set) means they can’t be reassigned;
- when accessed, we can’t return themselves (it would create an infinite loop), so we refer to the one instantiated on the parent class, from which it would anyway would have inherited if we did not reassigned the property.

With `toJSON` and especially `toString`, we now have an accurate representation of the instantiated object when we expect a string:

```js
const email = new Email('someone@domain.tld')

console.log(`My email is ${email}.`) // 'My email is someone@domain.tld.'
```

Without `toString` :

```js
console.log(`My email is ${email}.`) // 'My email is ftp://someone@domain.tld/.'
```

That’s it! The class is around 200 Bytes compressed, which is a satisfying amount of JavaScript for the provided features.

I’ll try to benchmark the different approaches and update this post at some point.

You can you use it by copying the presented code or by installing the [`frontacles`](https://npmjs.com/package/frontacles) package in your project.
