# rsync Examples

## Copying Files

```text,editable
rsync -aHAX -v --info=progress2 \
  /mnt/intermezzo/ariadne/home-movies/ /mnt/intermezzo/home-video/
```

## Moving files

I normally use rsync to move files since I like the checksum features.

> [!WARNING]
> **This example deletes source files**

```text,editable
rsync -aHAX -v --info=progress2 --remove-source-files \
  /mnt/intermezzo/ariadne/home-movies/ /mnt/intermezzo/home-video/
```

Removing empty directories afterwards

```console,editable
find /mnt/intermezzo/ariadne/home-movies/ -type d -empty -delete
```


## Archive Mode

`-a` Archive mode. Archive mode  is `-rlptgoD (no -A,-X,-U,-N,-H)`

`-r` copy directories recursively

`-l` copy sym links, as symlinks

`-p` preserve permissions

`-t` preserve modification times

`-g` preserve group

`-o` preserve owner (super-user only)

`-D` preserve device files (super-user only) & preserve special files

## Other Options

`-H` preserve hard links

`-A` preserve ACLs

`-X` preserve extended attributes
