# Allowas-In

This feature turns off BGPs check of its own AS number in the `AS_PATH` attribute.

This command is run on R1 and R2.

## Example

- eBGP
- Two BGP speakers with the same AS

```
          ┌─ eBGP ─┐        ┌─ eBGP ─┐          
     CE   ▼        ▼   PE   ▼        ▼   CE     
 ┌────────┐        ┌────────┐        ┌────────┐ 
 │   R1   │        │  ISP   │        │   R2   │ 
 │AS 64496├────────┤AS 64511├────────┤AS 64496│ 
 └────────┘        └────────┘        └────────┘ 
10.64.1.0/24                        10.64.2.0/24
```

R1 and R2 would like to exchange reachability information with each other, but the ISP router is between them.

When R1 gets R2s info, without this command, it will drop the routes.

## References

[Peter Paluch - Allowas-IN - Cisco Community](https://community.cisco.com/t5/routing-and-sd-wan/neighbor-allowas-in/m-p/2648046/highlight/true#M248441)

[Configure Allowas-in Feature in BGP - Cisco](https://www.cisco.com/c/en/us/support/docs/ip/border-gateway-protocol-bgp/112236-allowas-in-bgp-config-example.html)
