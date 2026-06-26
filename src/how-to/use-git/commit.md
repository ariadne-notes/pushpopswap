# Commit

## Ordinary commit

```console
git commit -m "Here is what I did"
```

## Amend - change the last commit message

> [!WARNING]
> Do not amend commits that have already been published.

```console
git commit --amend -m "This is what I wished it said"
```

## All

- Automatically stages all files known to the Index
- Does not add new files

```console
git commit --all -m "Used when you don't want to manually add files
```

## References

[Git - git-commit Documentation](https://git-scm.com/docs/git-commit)
