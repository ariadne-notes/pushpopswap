# Git Switch

This command was added to Git in 2019 (2.23), after user feedback that `checkout` was destructive in some cases.

`switch` updates the working tree, and index to match the new branch.

>[!IMPORTANT]
> The destructive form of this command is `--discard-changes`.

## Make A New Branch

```console
git switch -c newbranch
```

## Make A New Branch From A Specific Commit

```console
git switch -c newbranch <commit>
```

## References

[Git - git-switch Documentation](https://git-scm.com/docs/git-switch)
