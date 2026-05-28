# Git Switch

This command was added to Git in 2019 (2.23), after user feedback that `checkout` was destructive in some cases.

`switch` updates the working tree, and index to match the new branch.

>[!IMPORTANT]
> The destructive form of this command is `--discard-changes`.

## Make a new branch

```console
git switch -c newbranch
```

## Make a new branch from a specific commit

```console
git switch -c newbranch <commit>
```


# References

[Git - git-switch Documentation](https://git-scm.com/docs/git-switch)
