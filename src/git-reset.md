# Git Reset

Reset changes what commit `HEAD` points to. This is one way to undo a bad local commit, or a series of bad local commits.

Reset always modifies history.

## Soft Reset

AKA, *Squashing*

- Move `HEAD`.
- Do not modify the Index.
- Do not modify the Working Tree.

This is useful to undo local commits then re-play them as one commit.

e.g, you don't need to `git add` the files are already in the Index.

```console
git reset --soft HEAD~3
git commit
```

## Mixed Reset

Creates Intermediate Commits.

- Move `HEAD`.
- Reset Index to `HEAD`
- Do not modify the Working Tree.

Maybe you made 5 local commits but you'd prefer if it was 2.

```console
git reset --mixed HEAD~5
git add file1.c
git add file2.c
git commit -m "Intermediate Commit 1"
git add file3.c
git add file4.c
git commit -m "Final commit"
```

## Hard Reset

> [!CAUTION]
> This erases uncommitted work. This creates dangling local commits.

- Move `HEAD`
- Reset Index to `HEAD`
- Reset Working Tree to `HEAD`

```console
git fetch origin
git reset --hard origin/main
```

## References

[Git - git-reset Documentation](https://git-scm.com/docs/git-reset)

