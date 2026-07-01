# SSH without a password

Requirements
- Linux
- ssh and sshd

I usually disable password access to my SSH boxes. This means I can't use the easy pathway.

## If you can log in

If you can log in with a password, this should work.

```console,editable
ssh-copy-id -i ~/.ssh/id_ed25519.pub ariadne@k3s-tiny-1-control.haske.org
```

## You cannot log in

I have access to the equipment, just not from `tesseract`.

```
ariadne@tesseract:~$ cat ~/.ssh/id_
id_ed25519      id_ed25519.pub  id_rsa          id_rsa.pub
```

The comment on the end can be changed, it isn't embedded in the keys.

```
ariadne@tesseract:~$ cat ~/.ssh/id_ed25519.pub
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIJ/UlUf3BVZs3qc6xXhNT8vwfeHuTQ2l7u5MPxXOsUOb ariadne@tesseract
```

### Prerequisite 

Make sure `~/.ssh` exists

```bash,editable
mkdir -p ~/.ssh && chmod 700 ~/.ssh
touch ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys
```

### Copy the key

```bash,editable
echo 'ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIJ/UlUf3BVZs3qc6xXhNT8vwfeHuTQ2l7u5MPxXOsUOb ariadne@tesseract' >> ~/.ssh/authorized_keys
```
