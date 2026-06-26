# Ignore

The `.gitignore` file is useful for things that should not be included in Git.

`#` - Comments

`/` - Directories, the first `/` is the root of the repo.

## Example

This ignores the file itself, and the directory `/book` which is the build artifacts when mdbook is run.

```console
ariadne@tesseract:~/git/network-notes$ cat .gitignore 
.gitignore
/book
```

## References

[Git - gitignore Documentation](https://git-scm.com/docs/gitignore)
