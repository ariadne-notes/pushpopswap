# Git Push

Git has a default setup for where it plans to perform the `push`. This is the `push.default`.

The `push.default` contains the `refspec`.

## Refspec

The refspec maps a local branch to a remote branch.

This is inside of `.git/config`

```console
[remote "origin"]
        url = git@github.com:ariadne-notes/network-notes.git
        fetch = +refs/heads/*:refs/remotes/origin/*
```

### Format of Refspec

This is the `fetch` line from above.

- Format: `+<src>:<dst>`
  - `+` force update (non-fast-forward allowed)
  - `<src>` source ref
  - `<dst>` destination ref

## Updating History

Making a change on the remote, to the *commit history itself* requires force.

The safer way to do this is per-branch, not the entire repo.

```plain
git push origin +main
```

## References

[Git - git-push Documentation](https://git-scm.com/docs/git-push)

[Git - The Refspec](https://git-scm.com/book/en/v2/Git-Internals-The-Refspec)

