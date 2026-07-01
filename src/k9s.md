# K9S

K9S is a cli to manage a K8S cluster.

I'm on Debian so I'm following the Debian instructions.



## Install Brew

This is done inside a home directory

```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

## Perform the next steps

```console,editable
==> Next steps:
- Run these commands in your terminal to add Homebrew to your PATH:
    echo >> /home/ariadne/.bashrc
    echo 'eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv bash)"' >> /home/ariadne/.bashrc
    eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv bash)"
- Install Homebrew's dependencies if you have sudo access:
    sudo apt-get install build-essential bubblewrap
```

## Install K9S

```console,editable
brew install derailed/k9s/k9s
```

## References

[Homebrew: The Package Manager for Everywhere](https://brew.sh/)

[K9s - Manage Your Kubernetes Clusters In Style](https://k9scli.io/)