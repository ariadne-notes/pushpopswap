# Git Rebase

> [!CAUTION]
>
> `rebase` modifies history.
>
> Do not rebase commits that others may have based work on.

Two branches, the start.

```mermaid
---
config:
  gitGraph:
    parallelCommits: true
---
gitGraph LR:
   commit id: "A"
   commit id: "B"
   commit id: "C"
   branch dev
   checkout dev
   commit id: "HEAD → E"
   checkout main
   commit id: "HEAD → D"
```

Normally, with two branches, we'd do a `merge`

**After the `merge`**

```mermaid
---
config:
  gitGraph:
    parallelCommits: true
---
gitGraph LR:
   commit id: "A"
   commit id: "B"
   commit id: "C"
   branch dev
   checkout dev
   commit id: "HEAD → E"
   checkout main
   commit id: "D"
   merge dev id: "HEAD → F"
```

`F` is the commit the combines the diff **of the endpoints of the branches** `main` and `dev`.

The `dev` branch is just hanging out.

***

**What a rebase does.**

```mermaid
---
config:
  gitGraph:
    parallelCommits: true
---
gitGraph LR:
   commit id: "A"
   commit id: "B"
   commit id: "C"
   branch dev
   checkout dev
   commit id: "HEAD → E"
   checkout main
   commit id: "HEAD → D"
```

Finding the common ancestor to both branches, `C` we go "This is the common base, just play the diffs forward from both branches onto `main`"

```console
git checkout dev
git rebase main
```

```mermaid
---
config:
  gitGraph:
    parallelCommits: true
---
gitGraph LR:
   commit id: "A"
   commit id: "B"
   commit id: "C"
   commit id: "HEAD/main → D"
   commit id: "HEAD/dev → E"
```

Now the `HEAD` for two branches `main` and `dev` are on the same branch. Main can be FF'd to move the `HEAD`.

```console
git checkout main
git merge dev
```

```mermaid
---
config:
  gitGraph:
    parallelCommits: true
---
gitGraph LR:
   commit id: "A"
   commit id: "B"
   commit id: "C"
   commit id: "D"
   commit id: "HEAD/main, dev → E"
```

# References
[Git - Rebasing](https://git-scm.com/book/en/v2/Git-Branching-Rebasing)

[Git - git-rebase Documentation](https://git-scm.com/docs/git-rebase)
