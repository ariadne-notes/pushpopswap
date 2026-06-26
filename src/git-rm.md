# Git RM

Used to remove files from the Index, in the event they are deleted from the working tree, and need to be deleted from future commits.

## Example

I've already deleted this file from the Working Tree, now I want to remove it from the Index.

```console
ariadne@tesseract:~/git/network-notes$ git status
On branch main
Your branch is up to date with 'origin/main'.

Changes not staged for commit:
  (use "git add/rm <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   .github/workflows/mdbook.yml
        modified:   book.toml
        deleted:    src/New Text Document.txt
```

```console,editable
git rm --cached src/New Text Document.txt
```

## References

[Git - git-rm Documentation](https://git-scm.com/docs/git-rm)
