# SD-WAN Bootstrap

| Device Type     | filename                     |
| --------------- | ---------------------------- |
| hardware device | `ciscosdwan_cloud_init.cfg`  |
| software device | `ciscosdwan.cfg`             |

## USB

**Requirements**

- Device must be unprovisioned

The Manager can create a [bootable] USB drive.

[bootable]: https://www.cisco.com/c/en/us/td/docs/routers/sdwan/configuration/sdwan-xe-gs-book/hardware-and-software-installation.html

## CLI Paste method

This can be used to paste in a bootstrap so you can just erase and reload the device

```text,editable
tclsh
puts [open "bootflash:ciscosdwan.cfg" w+] {
!
! Certificates in the top of this file.
!
! Use a terminal client like SecureCRT
!
! Enable characters and line send delay if you need to.
!
}
```

## Python webserver

This uses python to start a small webserver to copy the bootstrap via HTTP.

`0.0.0.0` means bind on all IPs.

### python2

```console,editable
python -m SimpleHTTPServer 8000
```

### python3

```console,editable
python -m http.server 8000 --bind 0.0.0.0
```

3. Using the Cisco CLI, copy the file from your python webserver.

```console,editable
copy http://10.0.0.1:8000/ciscosdwan.cfg bootflash:/ciscosdwan.cfg
```

[Cisco - SD-WAN Getting Started Guide](https://www.cisco.com/c/en/us/td/docs/routers/sdwan/configuration/sdwan-xe-gs-book/hardware-and-software-installation.html)
