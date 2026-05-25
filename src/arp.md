# ARP

Captured on-wire.

<pre>
packet #1 - who has 10.0.6.10? Tell 10.0.0.20
packet #2 - 10.0.0.10 is at ce:b1:5f:58:1d:8a
</pre>

## ARP Request


<pre>
> Ethernet II

    Destination: Broadcast (ff:ff:ff:ff:ff:ff)
    Source: 1a:20:4e:9e:fb:9c (1a:20:4e:9e:fb:9c)
    Type: ARP (0x0806)

> Address Resolution Protocol (request)

    Hardware type: Ethernet (1)
    Protocol type: IPv4 (0x0800)
    Hardware size: 6
    Protocol size: 4
    Opcode: request (1)
    Sender MAC address: 1a:20:4e:9e:fb:9c (1a:20:4e:9e:fb:9c)
    Sender IP address: 10.0.0.20
    Target MAC address: 00:00:00_00:00:00 (00:00:00:00:00:00)
    Target IP address: 10.0.0.10
</pre>

## ARP Reply


<pre>
> Ethernet II

    Destination: 1a:20:4e:9e:fb:9c (1a:20:4e:9e:fb:9c)
    Source: ce:b1:5f:58:1d:8a (ce:b1:5f:58:1d:8a)
    Type: ARP (0x0806)
    Padding: <lots of zeros>

> Address Resolution Protocol (reply)

    Hardware type: Ethernet (1)
    Protocol type: IPv4 (0x0800)
    Hardware size: 6
    Protocol size: 4
    Opcode: reply (2)
    Sender MAC address: ce:b1:5f:58:1d:8a (ce:b1:5f:58:1d:8a)
    Sender IP address: 10.0.0.10
    Target MAC address: 1a:20:4e:9e:fb:9c (1a:20:4e:9e:fb:9c)
    Target IP address: 10.0.0.20
</pre>
