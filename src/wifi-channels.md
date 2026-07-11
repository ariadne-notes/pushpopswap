# Wi-Fi Channels

## 2ghz

1, 6, and 11 are the recommended channels in the US. There is a lot of overlap on 2ghz.

![2ghz](/images/ariadne/wifi-2ghz-channel-allocation.svg)

This graphic is rendered with python and [matplotlib] from [ariadne-notes/wifi-charts].

## 5ghz

**DFS** --- Dynamic Frequency Selection

These channels are shared with other applications, like weather radar.

When a primary user is transmitting (like the weather radar) radios allocated to these frequencies must suspend transmitting.

![5ghz](/images/ariadne/wifi-5ghz-channel-allocation.svg)

This graphic is rendered with python and [matplotlib] from [ariadne-notes/wifi-charts].

## 6ghz

![6ghz](/images/ariadne/wifi-6ghz-channel-allocation.svg)

This graphic is rendered with python and [matplotlib] from [ariadne-notes/wifi-charts].

## References

Channel numbers, center frequencies, and channel widths are from [IEEE Std 802.11-2024]. United States regulatory allocation and operating constraints are from FCC rules.

[IEEE Std 802.11-2024]: https://ieeexplore.ieee.org/document/10654696

[Wi-Fi Alliance](https://www.wi-fi.org)

[FCC - 5GHz Unlicensed Spectrum](https://www.fcc.gov/document/5-ghz-unlicensed-spectrum-unii)

[FCC 47 CFR 15.247 - Operation within the bands 902-928 MHz, 2400-2483.5 MHz, and 5725-5850 MHz](https://www.ecfr.gov/current/title-47/section-15.247)

[FCC 47 CFR 15.407 - General technical requirements for U-NII devices](https://www.ecfr.gov/current/title-47/section-15.407)

[Unlicensed National Information Infrastructure - Wikipedia](https://en.wikipedia.org/wiki/Unlicensed_National_Information_Infrastructure)

[ariadne-notes/wifi-charts]: https://github.com/ariadne-notes/wifi-charts
[matplotlib]: https://matplotlib.org/
