---
title: Recover a lost Git stash in two steps
description: A technique to retrieve lost stashes from the limbos.
tags: git, git-stash
publishedAt: 2023-11-15
outline: [2, 3]
---

Losing in-progress work is one of the fastest ways to feel helpless in front of a computer. This article about recovering lost [git stashes](https://css-irl.info/how-git-stash-can-help-you-juggle-multiple-branches) was [initially published](https://dev.to/meduzen/recover-a-lost-git-stash-in-two-steps-569) 5 years ago on _Dev.to_ and has a steady 10000 views per year, so I guess it happens to a lot of persons.

---

# Recover a lost Git stash in two steps

<datetime :date="$frontmatter.publishedAt" formatter="longdate"/>
<tags/>

Sometimes you end up [stashing](https://css-irl.info/how-git-stash-can-help-you-juggle-multiple-branches) [code](https://www.git-scm.com/docs/git-stash), then at some point those stashes get cleaned. And one day, you may be like:
> Ooops, I think I just deleted stashes that I needed! Are they lost forever? 😨

Fortunately, I managed to recover them. Here’s the two-steps procedure that worked for me after going [through](https://stackoverflow.com/questions/89332/how-to-recover-a-dropped-stash-in-git) [various](https://stackoverflow.com/questions/32517870/how-to-undo-git-stash-clear) [readings](https://stackoverflow.com/questions/20537223/when-should-i-use-git-stash) (and others), and also some general tips.

## Step 1: list lost stashes

In your project where stashes are trashed:

```sh
git fsck --unreachable | grep commit | cut -d ' ' -f3 | xargs git log --merges --no-walk
```

It returns a list of lost stashes, ordered by date.

```sh
commit 7754fed19955d2958d952ab2836b22631b036b5
Merge: f0a125c 36f580 e508036
Author: Mehdi Merah <xx@xxx.com>
Date:   Fri Apr 27 16:41:17 2018 +0200

    On regions-components: After Regions component

commit 43c45c94caadcc87d783064624585c194f4be8
Merge: 13703fd bc8220e 4005629
Author: Mehdi Merah <xx@xxx.com>
Date:   Sat Apr 21 20:03:44 2018 +0200

    On master: Before Regions components

commit bb615e44ed99b5a5622ead0c4bbb7b4acc19767
Merge: c6a7b3 127203e 45dcc54
Author: Mehdi Merah <xx@xxx.com>
Date:   Sat Apr 7 19:39:50 2018 +0200

    On master: Wololo

# So, basically this anatomy:

commit {stash commit hash}
Merge: {parent commit hash…}
Author: {author name} <{author email}>
Date:   {stash date with timezone}

    On {branch name}: {stash commit message}
(END)
```

- To quit the list of stashes, press the <kbd>Q</kbd> key.
- To navigate in a long stashes list, use the <kbd>up</kbd> and <kbd>down</kbd> arrows.
- For Windows user, maybe [johnwait’s comment](https://dev.to/johnwait/comment/k9j5) will help you during the battle:

::: details johnwait’s comment

On Windows, in a good old command window (your usual `cmd.exe`), step 1. could be translated to:

`for /f "tokens=3" %a in ('git fsck --unreachable ^| find "commit"') do @git log --merges --no-walk %a`

If your Git speaks français, and you're one to choose the more complicated path, you could use something like:

`for /f "tokens=1,2,3,4" %a in ('git fsck --unreachable ^| find "commit"') do @if "%c"=="inatteignable" (@git log --merges --no-walk %d) else (@git log --merges --no-walk %c)`

or, really, keep it simple with `alias git='LANG=en_GB git'` instead.

**Bonus**

For PowerShell aficionados, here's a command that should work regardless of your Git's locale (well, as long as a commit is still referred to as `commit`):

`(git fsck --unreachable | Select-String "commit") -split '\s+' |
Select-String -pattern "^[0-9a-fA-F]{40}$" |
ForEach-Object { git log --merges --no-walk $_ }`

(Really useful post btw!)
:::

## Step 2: send a lost stash back where it comes from

Let’s use the commit hash of the second stash (from the previous list):

```sh
git update-ref refs/stash 4b3fc45c94caadcc87d783064624585c194f4be8 -m "My recovered stash"
```

And that’s it! You’ll find your stash as usual, using `git stash list` or by having a look in your [favorite Git client](http://gitup.co/).

## Gotchas

### 1. I still can’t see my recovered stash

Retry using the `--create-reflog` parameter (thanks [studoggithub](https://dev.to/studoggithub/comment/d54a)):
```sh
git update-ref refs/stash 4b3fc45c94caadcc87d783064624585c194f4be8 --create-reflog -m "My recovered stash"
```

It did the trick for that person using git 2.22.0 on Ubuntu 18.04.

### 2. My Git client isn’t in English

If your Git isn’t in English, you’ll have to run `alias git='LANG=en_GB git'` each time you want to recover a set of stashes (thanks [mathieuschopfer](https://dev.to/mathieuschopfer/comment/egd0)), otherwise the `unreachable` flag in `git fsck --unreachable` might be in another language, so you can either:
- alias the language like Mathieu (put in in your `.bashrc` file so it becomes permanent);
- adapt the [first command](#step-1-list-lost-stashes): translate `unreachable` into your git language and update the [`cut` command](https://man.openbsd.org/cut.1).

## Advices

### Commit messages are healthy

I **always add a commit message** to stash using `git stash save -m "My commit message"`: without message, the only way to identify a stash are its timestamp and the branch it was saved from, which might not be enough compared to human-written words.

Commit messages also help Git clients:
- [GitUp](https://gitup.co), the Git client I use, completely fails at showing unnamed stashes. That’s probably why you can’t create a stash in GitUp without giving it a name, which is great!
- The well-known [SourceTree](https://www.sourcetreeapp.com/) succeeds at showing unnamed stashes, but as you can guess, the list isn’t friendly to browse: ![Unnamed stashes in SourceTree](/content/sourcetree-stash-list-2018.png)

### Prefer `git stash apply` over `git stash pop`

Unlike `git stash pop`, `git stash apply` does not remove the stash from the list of stashes, which can avoid accidental loss.

### Prefer branches over stashes

Stashes serve a different purpose than branches. Wherever it makes sense to you, commit your code to a new branch instead of stashing it. You’re gonna start a new branch anyway if you use a branching model like [Git Flow](http://nvie.com/posts/a-successful-git-branching-model/).
