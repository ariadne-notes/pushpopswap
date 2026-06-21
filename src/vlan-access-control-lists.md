# VLAN Access Control Lists

Can be IPs and/or MACs.

These work on routed or switched traffic.

## Routed flow

```mermaid
block
columns 1
    id1(("Ingress\nPort"))
    block:one
      id2("Port\nACL")
      id3("VLAN\nACL")
      id4("Routed\nACL")
    end
    id5(["SVI"])
    id6("Routing\nOperation")
    id7(["SVI"])
    block:two
      id8("Routed\nACL")
      id9("VLAN\nACL")
      id10("Port\nACL")
    end
    id11(("Egress\nPort"))
    id1 space:2 id2
    id1  --- id2
    id2  --- id3
    id3  --- id4
    id4  --- id5
    id5  --- id6
    id6  --- id7
    id7  --- id8
    id8  --- id9
    id9  --- id10
    id10 --- id11
    style id6 fill:#1A1,stroke:#333,stroke-width:2px
```

## Switched flow

The VLAN ACL is only processed once, on switching operation.


```mermaid
block
columns 1
    id1(("Ingress\nPort"))
    id2("Port\nACL")
    block:switching
        id3("VLAN\nACL")
        id6("Switching\nOperation")
    end
    id10("Port\nACL")
    id11(("Egress\nPort"))
    id1  --- id2
    id2  --- id3
    id3  --- id6
    id6  --- id10
    id10 --- id11
    style id6 fill:#1A1,stroke:#333,stroke-width:2px
    style switching fill:#1A1,stroke:#333,stroke-width:2px
```

## Config

Copied from the [TAC] notes.

[TAC]: https://www.cisco.com/c/en/us/support/docs/switches/catalyst-9500-series-switches/217266-validate-security-acls-on-catalyst-9000.html

```console
ip access-list extended TEST
 10 permit ip host 10.1.1.1 any
 20 permit ip any host 10.1.1.1
!
ip access-list extended ELSE
 10 permit ip any any
!
vlan access-map VACL 10
 match ip address TEST
 action forward
vlan access-map VACL 20
 match ip address ELSE
 action drop
!
vlan filter VACL vlan-list 10
```

## References

[Cisco Catalyst IR8340 Rugged Series Router Software Configuration Guide, Cisco IOS XE Release 17.15.x - VLAN Access Control Lists Cisco Catalyst IR8300 Rugged Series Router - Cisco](https://www.cisco.com/c/en/us/td/docs/routers/ir8340/software/configuration/b_ir8340_cg_17-15/m-vlan-access-control-lists.html)

[Validate Security ACLs on Catalyst 9000 Switches - Cisco](https://www.cisco.com/c/en/us/support/docs/switches/catalyst-9500-series-switches/217266-validate-security-acls-on-catalyst-9000.html)

[Solved: PACL and VACL processing order - Cisco Community](https://community.cisco.com/t5/switching/pacl-and-vacl-processing-order/td-p/5261049)
