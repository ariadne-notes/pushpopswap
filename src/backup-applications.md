# Backup Applications

I did research for modern content addressesable memory backup solutions.

## Applications

- [Restic](restic.md)
- [Kopia](kopia.md)

## Ariadne's Requirements

I don't want to mix and match my media types into one repository, that feels icky.

If I have a filesystem and that filesystem has hardlinks, I don't want to ... hack to restore it.

## Ariadne's Learned Lessons

### Kopia

- No multiple repo support in Kopia Server/Web UI
  - [Please: Multiple Repositories in the WebUI]
  - [Multiple Repositories]
- No hardlink support
  - [Support for advanced filesystem features]

I created 11 docker containers then realized I had a mess.

### Backrest

- Restoring in backrest isn't point and click, it needs thought.

[Please: Multiple Repositories in the WebUI]: https://kopia.discourse.group/t/please-multiple-repositories-in-the-webui/1281
[Multiple Repositories]: https://kopia.discourse.group/t/multiple-repositories/1535
[Support for advanced filesystem features]: https://github.com/kopia/kopia/issues/544
