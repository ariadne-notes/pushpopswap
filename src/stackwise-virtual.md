# StackWise Virtual

This is a [MLAG] technology.

[MLAG]: https://en.wikipedia.org/wiki/Multi-chassis_link_aggregation_group

Used to reduce complexity from FHRP and STP.

![nb-06-cat-9k-stack-wp-cte-en_0.avif](./images/cisco/nb-06-cat-9k-stack-wp-cte-en_0.avif)

![nb-06-cat-9k-stack-wp-cte-en_1.avif](./images/cisco/nb-06-cat-9k-stack-wp-cte-en_1.avif)

Images courtesy of [Cisco].

[Cisco]: https://www.cisco.com/c/en/us/products/collateral/switches/catalyst-9000/nb-06-cat-9k-stack-wp-cte-en.html

## Terms

SVL
: Stackwise Virtual Link

SVH
: StackWise Virtual Header

DAD
: Duplicate Active Detection

## SVL

Between 1 and 8 inter-chassis links, for control-plane and data-plane traffic.

![nb-06-cat-9k-stack-wp-cte-en_4.png](./images/cisco/nb-06-cat-9k-stack-wp-cte-en_4.png)

## DAD

One worst case scenario, is the SVL fails, and both switches go Active/Active.

There are lot of bad effects from this:
- SVI IP Duplication
- SSH PKI Duplication
- STP Bridge ID Duplication

To help prevent this, it's recommended to configure DAD links.

## References

[Products - Cisco Catalyst 9000 Platform StackWise Virtual White Paper - Cisco](https://www.cisco.com/c/en/us/products/collateral/switches/catalyst-9000/nb-06-cat-9k-stack-wp-cte-en.html)
