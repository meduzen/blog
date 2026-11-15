# My blog

- Built with [Vitepress](https://vitepress.dev/).
- URLs are tested on merge requests using [Lychee](https://lychee.cli.rs) in a GitHub Action. To test URLs locally install Lychee and run `npm run test:absolute-links`.

Since it doesn’t need the search function for now, I’ve hard-disabled it by overriding `@docsearch/js` in the `package.json`. That’s a 10-20 MB saving at CI install time.
