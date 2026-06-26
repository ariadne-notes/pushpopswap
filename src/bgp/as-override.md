# AS-Override

This feature rewrites a customer `AS_PATH` attribute.

This command is run on the ISP router.

## Example

- eBGP
- Two BGP speakers with the same AS

```
          ┌─ eBGP ─┐        ┌─ eBGP ─┐          
          ▼        ▼        ▼        ▼          
 ┌────────┐        ┌────────┐        ┌────────┐ 
 │   R1   │        │  ISP   │        │   R2   │ 
 │AS 64496├────────┤AS 64511├────────┤AS 64496│ 
 └────────┘        └────────┘        └────────┘ 
10.64.1.0/24                        10.64.2.0/24
```

R1 and R2 would like to exchange reachability information with each other, but the ISP router is between them.

When the ISP router gets the updates, it will re-write `64496`, as `64511`.

## References

[SunilKhanna - Cisco Community - BGP AS Override](https://community.cisco.com/t5/networking-knowledge-base/understanding-bgp-as-override-feature/ta-p/3111967)

[Peter Paluch - Cisco Community - BGP Allowas-IN](https://community.cisco.com/t5/routing-and-sd-wan/neighbor-allowas-in/m-p/2648046/highlight/true#M248441)
