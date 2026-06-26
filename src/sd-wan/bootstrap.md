# Bootstrap

## USB

**Requirements**

- Device must be unprovisioned

The Manager can create a [bootable] USB drive.

[bootable]: https://www.cisco.com/c/en/us/td/docs/routers/sdwan/configuration/sdwan-xe-gs-book/hardware-and-software-installation.html

### Paste method

This can be used to paste in a bootstrap so you can just erase and reload the device

```text,editable
tclsh
puts [open "bootflash:name-of-bootstrap-file.cfg" w+] {
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

**Requirements**

- Python

1. This small python oneliner gets your current v4 IP.

```text,editable
python -c "import socket; s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM); s.connect(('8.8.8.8', 80)); print(s.getsockname()[0]); s.close()"
```

2. Start the small http server

`0.0.0.0` means bind on all IPs.

```console,editable
python -m http.server 8000 --bind 0.0.0.0
```

3. Using the Cisco CLI, copy the file from your python webserver.

```console,editable
copy http://10.0.0.1:8000/bootstrap-file.cfg bootflash:/bootstrap-file.cfg
```

[Cisco - SD-WAN Getting Started Guide](https://www.cisco.com/c/en/us/td/docs/routers/sdwan/configuration/sdwan-xe-gs-book/hardware-and-software-installation.html)
