# Git Restore

This command was added to Git in 2019 (2.23), after user feedback that `checkout` was destructive in some cases.

> [!IMPORTANT]
> These are destructive commands.

These commands should be used with `--` otherwise Git doesn't know if you want a branch, directory, or file.

`--` means file.

## Restore from Index

- Copy a file to the working tree from the Index.

A file is staged.

```console
git add hello.c
```

Work happens (in the working tree) now this file is broken.

```console
git restore -- hello.c
```

## Restore the Index

- Copy a file to the Index from the current commit..

This "unstages" a file, the version in `HEAD` is restored to Index.

Equivalent to undoing `git add`

```console
git restore --staged -- hello.c
```

## Restore a file to working tree from origin

```console
git restore --source origin/main -- hello.c
```

## References

[Git - git-restore Documentation](https://git-scm.com/docs/git-restore)

[What is `git restore` and how is it different from `git reset`? - Stack Overflow](https://stackoverflow.com/questions/58003030/what-is-git-restore-and-how-is-it-different-from-git-reset)

