# Wireless Channels

## 2ghz

1, 6, and 11 are the recommended channels in the US. There is a lot of overlap on 2ghz.

![2ghz](/images/ariadne/wifi-2ghz-channel-allocation.svg)

## 5ghz

The Wi-Fi Alliance helped drive use of the 5 GHz band for Wi-Fi.

**[UNII]** --- Unlicensed National Information Infrastructure

**[TDWR]** -- Terminal Doppler Weather Radio

- Uses and relies on a 5ghz signal to detect weather events

**[DFS]** --- Dynamic Frequency Selection

- Weather radar is the primary user of DFS frequencies
- WLAN equipment must not transmit if it senses [TDWR]

[UNII]: https://en.wikipedia.org/wiki/Unlicensed_National_Information_Infrastructure
[TDWR]: https://en.wikipedia.org/wiki/Terminal_Doppler_Weather_Radar
[DFS]: https://en.wikipedia.org/wiki/Dynamic_frequency_selection

![5ghz](/images/ariadne/wifi-5ghz-channel-allocation.svg)

## 6ghz

![6ghz](/images/ariadne/wifi-6ghz-channel-allocation.svg)

## Graphics

Graphics on this page are rendered with python and [matplotlib] from [ariadne-notes/wifi-charts].

[ariadne-notes/wifi-charts]: https://github.com/ariadne-notes/wifi-charts
[matplotlib]: https://matplotlib.org/

## References

Channel numbers, center frequencies, and channel widths are from [IEEE Std 802.11-2024]. United States regulatory allocation and operating constraints are from FCC rules.

[IEEE Std 802.11-2024]: https://ieeexplore.ieee.org/document/10654696

[Wi-Fi Alliance](https://www.wi-fi.org)

[FCC - 5GHz Unlicensed Spectrum](https://www.fcc.gov/document/5-ghz-unlicensed-spectrum-unii)

[FCC 47 CFR 15.247 - Operation within the bands 902-928 MHz, 2400-2483.5 MHz, and 5725-5850 MHz](https://www.ecfr.gov/current/title-47/section-15.247)

[FCC 47 CFR 15.407 - General technical requirements for U-NII devices](https://www.ecfr.gov/current/title-47/section-15.407)

[Unlicensed National Information Infrastructure - Wikipedia](https://en.wikipedia.org/wiki/Unlicensed_National_Information_Infrastructure)

[NTIA Report 20-544 - Lessons Learned from the Development and Deployment of 5 GHz ...](/pdfs/TR-20-544.pdf)

[FCC 03-287 - Revision of Parts 2 and 15 of the Commission's Rules to Permit U-NII devices in the 5ghz band](/pdfs/FCC-03-287A3.pdf)
