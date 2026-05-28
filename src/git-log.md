# Git Log

Top down, the normal view.

```console
git log --oneline
```

Bottom up, good for rebasing

```console
git log --oneline --reverse
```

Decorate with active branches

```console
git log --oneline --decorate --graph
```

Decorate with all branches, even rebased ones.

```console
git log --oneline --decorate --graph --all
```

## Before Rebasing

This can help find a commit in the event you need it again.

```console
git log --reverse --oneline --date=short --format="%ad | %h | %an | %s" > commit-before-rebasing.txt
```


## References

[Git - git-log Documentation](https://git-scm.com/docs/git-log)
