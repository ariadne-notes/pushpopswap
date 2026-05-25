# Classful Networking

<pre>

▄▄  ▄▄▄▄
██ ███▄▄
██ ▄▄██▀



████▄  ▄▄▄▄▄  ▄▄▄  ▄▄▄▄
██  ██ ██▄▄  ██▀██ ██▀██
████▀  ██▄▄▄ ██▀██ ████▀


</pre>

Never speak out loud "This is a class C address" unless you are in a 1990s movie.

Early Internet addressing (1980s) the IP itself indicated the subnet mask, by using the High Order bits. There were only three network sizes.

Internet Address starts with `0-127`? You must have one network with 16 million hosts.

Internet Address starts with `128-191`? You must have one network with 65 thousand hosts.

Internet Address starts with `192-223`? You must have one network with 254 hosts.

We know now this was a terrible idea, but parts of it stay with us today.

- `/24` (from class A) is a very popular prefix. This is said out loud as "A twenty four".
- `/16` (from class B) is a very popular prefix. This is said out loud as "A sixteen".
- All v4 multicast addresses still start with `1110`

If someone gives you an IP, you can **never guess** its network without also being told the mask.

My personal favorite is `8.8.8.8/32` [Google DNS](https://en.wikipedia.org/wiki/Google_Public_DNS) it works by [Anycast!](https://en.wikipedia.org/wiki/Anycast)

##  Classful Networking, the RFC



### RFC 791

```
Internet Protocol
Specification

  Addressing

    To provide for flexibility in assigning address to networks and
    allow for the  large number of small to intermediate sized networks
    the interpretation of the address field is coded to specify a small
    number of networks with a large number of host, a moderate number of
    networks with a moderate number of hosts, and a large number of
    networks with a small number of hosts.  In addition there is an
    escape code for extended addressing mode.

    Address Formats:

      High Order Bits   Format                           Class
      ---------------   -------------------------------  -----
            0            7 bits of net, 24 bits of host    a
            10          14 bits of net, 16 bits of host    b
            110         21 bits of net,  8 bits of host    c
            111         escape to extended addressing mode
```
