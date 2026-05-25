# AAA with FreeRadius and Univention UCS

This solution relies on:
* [Univention UCS](https://www.univention.com/products/ucs/) a Linux based, Active Directory, Domain Controller.
* [FreeRADUS](https://github.com/FreeRADIUS/freeradius-server), an AAA plugin for Univention UCS.

<pre>
┌──────────────┐          ┌──────────────┐
│    UCS-1     │          │    UCS-2     │
│ ┌──────────┐ │   DRS    │ ┌──────────┐ │
│ │   LDAP   │ │◄────────►│ │   LDAP   │ │
│ └──────────┘ │          │ └──────────┘ │
│      ▲       │          │      ▲       │
│      │       │          │      │       │
│      ▼       │          │      ▼       │
│ ┌──────────┐ │          │ ┌──────────┐ │
│ │FreeRADIUS│ │          │ │FreeRADIUS│ │
│ └──────────┘ │          │ └──────────┘ │
└──────────────┘          └──────────────┘
             ▲              ▲
             └──┐         ┌─┘
                ▼         ▼
             ┌──────────────┐
             │   Network    │
             │     Device   │
             └──────────────┘
</pre>

## Cisco Side


### AAA Config

<pre>
aaa new-model
!
radius server FREERADIUS
 address ipv4 192.168.1.10 auth-port 1812 acct-port 1813
 key StrongSharedSecret123
!
aaa authentication login default group radius local
!
aaa authorization exec default group radius local
!
line vty 0 15
 login authentication default
 transport input ssh
</pre>

## Univention UCS Side


### LDAP - Create the Groups

This loads the `dc=` stuff into `$ldap_base`

```
eval $(ucr shell)
```

RADIUS Network Admins

```
udm groups/group create \
  --position "cn=groups,$ldap_base" \
  --set name="RADIUS Network Admins" \
  --set description="Full RADIUS access to network devices"
```

RADIUS Network Read Only

```
udm groups/group create \
  --position "cn=groups,$ldap_base" \
  --set name="RADIUS Network Read Only" \
  --set description="Read-only RADIUS access to network devices"
```

### LDAP - Verifying the groups

```
udm groups/group list --filter name="RADIUS Network Admins"

udm groups/group list --filter name="RADIUS Network Read Only"
```

### Add users

Users need to be added to this group directly.

I am `ariadne` so that's my uid.

```
udm groups/group modify \
  --dn "cn=RADIUS Network Admins,cn=groups,$ldap_base" \
  --append users="uid=ariadne,cn=users,$ldap_base"
```

### Verify Users

```
udm users/user list --filter uid=ariadne | grep -i group
```

### FreeRADIUS Clients

```
cat >> /etc/freeradius/3.0/clients.conf << 'EOF'

client internal_network {
    ipaddr   = 192.168.0.0/16
    secret   = StrongSharedSecret123
    nas-type = cisco
}
EOF
```

### FreeRADIUS Cisco AV Pairs

```
eval $(ucr shell)

cat >> /etc/freeradius/3.0/mods-config/files/authorize << EOF
DEFAULT Ldap-Group == "cn=RADIUS Network Admins,cn=groups,$ldap_base"
        Service-Type = NAS-Prompt-User,
        cisco-avpair = "shell:priv-lvl=15"

DEFAULT Ldap-Group == "cn=RADIUS Network Read Only,cn=groups,$ldap_base"
        Service-Type = NAS-Prompt-User,
        cisco-avpair = "shell:priv-lvl=1"

DEFAULT Auth-Type := Reject
        Reply-Message = "Not in any authorized group"
EOF
```


## Testing on Cisco

```
test aaa group radius ariadne my-password legacy
```

## Testing On UCS

```
radtest <user-in-ldap> <ldap-password> <server-ip> 0 <FreeRADIUS-secret>
```

### Do packets arrive

```
tcpdump -i any -n udp port 1812
```

## Debugging FreeRADIUS

```
systemctl daemon-reload
systemctl restart freeradius
systemctl status freeradius
freeradius -X
```

## After it's working, RSYNC it.

```
rsync -av /etc/freeradius/3.0/clients.conf \
  root@ucs-2:/etc/freeradius/3.0/clients.conf
```

```
rsync -av /etc/freeradius/3.0/mods-config/files/authorize \
  root@ucs-2:/etc/freeradius/3.0/mods-config/files/authorize
```

## References

[Univention Corporate Server - Manual for users and administrators](https://docs.software-univention.de/manual/5.0/en/)