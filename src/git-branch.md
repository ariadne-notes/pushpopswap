# Git Branch

Always name branches as lowercase, as case-sensitive branches do not work across all operating systems.

## Create a New Branch

```console
git branch --copy new-branch
```

### Create a Branch From a Specific Branch

```console
git branch --copy new-branch old-branch
```

## Delete a Branch

Only works if it's fully merged.

```console
git branch --delete dev
```

## Delete a Remote Branch

Only works if it's fully merged.

```console
git branch --delete --remotes dev
```

## Move a Branch

```console
git branch --move old-branch new-branch
```

## See all Branches

```console
git branch --all
```

## References

[github - Git branch name - case sensitive or insensitive? - Stack Overflow](https://stackoverflow.com/questions/38493543/git-branch-name-case-sensitive-or-insensitive/38494084#38494084)

[Git - git-branch Documentation](https://git-scm.com/docs/git-branch)
