# Git Branch

Always name branches as lowercase, as case-sensitive branches do not work across all operating systems.

## Delete a branch

Only works if it's fully merged.

```console
git branch --delete dev
```

## Move a branch

```console
git branch --move old-branch new-branch
```

## Copy a branch

```console
git branch --copy old-branch new-branch
```

# References

[github - Git branch name - case sensitive or insensitive? - Stack Overflow](https://stackoverflow.com/questions/38493543/git-branch-name-case-sensitive-or-insensitive/38494084#38494084)

[Git - git-branch Documentation](https://git-scm.com/docs/git-branch)
