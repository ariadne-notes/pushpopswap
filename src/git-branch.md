# Git Branch

Always name branches as lowercase, as case-sensitive branches do not work across all operating systems.

## Create a new branch

```console
git branch --copy new-branch
```

### Create a branch from a specific branch

```console
git branch --copy new-branch old-branch
```

## Delete a branch

Only works if it's fully merged.

```console
git branch --delete dev
```

## Delete a remote branch

Only works if it's fully merged.

```console
git branch --delete --remotes dev
```

## Move a branch

```console
git branch --move old-branch new-branch
```

## See all branches

```console
git branch --all
```

## References

[github - Git branch name - case sensitive or insensitive? - Stack Overflow](https://stackoverflow.com/questions/38493543/git-branch-name-case-sensitive-or-insensitive/38494084#38494084)

[Git - git-branch Documentation](https://git-scm.com/docs/git-branch)
