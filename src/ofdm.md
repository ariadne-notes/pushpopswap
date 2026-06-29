# OFDM

**OFDM** --- Orthogonal frequency domain multiplexing

- Multiple carriers for one datastream
- Subcarriers are orthogonal
- There is a guard interval

> The orthogonality requires that the subcarrier spacing is:
> 
> \\( \Delta f = \frac{k}{T_U} \\) Hz, where 
>
> - \\( k \\) is a positive integer, typically equal to 1
> 
> - \\( T_U \\) seconds, the useful symbol duration (the receiver-side window size)
>
> This stipulates that each carrier frequency undergoes \\( k \\) more complete cycles per symbol period than the previous carrier.
>
> Therefore, with \\( N \\) subcarriers, the total passband bandwidth will be \\( B \approx N \cdot \Delta f \\) (Hz).

Courtesy of [Wikipedia].

[Wikipedia]: https://en.wikipedia.org/wiki/Orthogonal_frequency-division_multiplexing

## What does this look like?

If \\( \Delta f \\) Hz is chosen correctly, transmitted signals look like this...

![ofdm-freq-time representation](/images/ofdm-freq-time-representation.png)

Image courtesy of [Keysight].

[Keysight]: https://helpfiles.keysight.com/csg/89600B/Webhelp/Subsystems/wlan-ofdm/content/ofdm_basicprinciplesoverview.htm

- 8 subcarriers
- 1 OFDM symbol per unit interval
- Orthogonal signals eliminate crosstalk between subcarriers

## Terms

**[Symbol]**

[Symbol]: https://en.wikipedia.org/wiki/Symbol_rate#Symbols

- A waveform in the communication channel that persists for a period of time

**Symbol Duration Time**

- AKA, unit interval
- AKA, baud rate

\\( T_s = \frac{1}{f_s} \\)

**FFT** --- Fast Fourier Transform

- Used to decode a recovered RF signal

**IFFT** --- Inverse Fast Fourier Transform

- Used to encode a symbol into RF

## References

[Concepts of Orthogonal Frequency Division Multiplexing (OFDM) and 802.11 WLAN](https://helpfiles.keysight.com/csg/89600B/Webhelp/Subsystems/wlan-ofdm/content/ofdm_basicprinciplesoverview.htm)

[Orthogonal frequency-division multiplexing - Wikipedia](https://en.wikipedia.org/wiki/Orthogonal_frequency-division_multiplexing)

