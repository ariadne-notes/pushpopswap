# Ethernet CSMA/CD

Is used when the link is half-duplex. For full-duplex links CDMA/CD isn't used.

> This standard provides for **two modes of operation of the MAC sublayer:**
>
> a) In half duplex mode, stations contend for the use of the physical medium, using the CSMA/CD algorithms specified.

>

> Bidirectional communication is accomplished by rapid exchange of frames, rather than full duplex operation.

>

> Half duplex operation is possible on all supported media; it is required on those media that are incapable of supporting simultaneous transmission and reception without interference, for example, 10BASE2 and 100BASE-T4.
>
> b) The full duplex mode of operation can be used when all of the following are true:
>
> 1) The physical medium is capable of supporting simultaneous transmission and reception without interference (e.g., 10BASE-T, 10BASE-FL, and 100BASE-TX/FX).
>
> 2) There are exactly two stations on the LAN. This allows the physical medium to be treated as a full duplex point-to-point link between the stations. Since there is no contention for use of a shared medium, the multiple access (i.e., CSMA/CD) algorithms are unnecessary.
>
> 3) Both stations on the LAN are capable of and have been configured to use full duplex operation.
>
> Source - [IEEE 802.3-2022] - Section 4.1.1 Media Access Control, Functional model of the MAC method, Overview

[IEEE 802.3-2022]: https://ieeexplore.ieee.org/document/9844436

## References

[802.3-2022 - IEEE Standard for Ethernet](https://ieeexplore.ieee.org/document/9844436)
