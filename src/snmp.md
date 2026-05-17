# SNMPv3
```
snmp-server group SSG_PROMETHEUS v3 priv
snmp-server user ciscosnmp SSG_PROMETHEUS v3 auth sha auth-password-goes-here priv aes 128 encryption-password-goes-here
```

# Using SNMP Walk to look at the OIDs

`snmpwalk -Os -c`

### v2

`snmpwalk -v2c -c <community> <host> 1.3.6.1.4.1.9.9.13`


### v3

`snmpwalk -v3 -l authPriv -u <user> -a SHA -A  <auth-password> -x AES -X <encryption-password> <host> 1.3.6.1.4.1.9.9.13`

# Trap Severity
```
snmp-server enable traps syslog
logging snmp-trap emergencies
logging snmp-trap alerts
logging snmp-trap critical
```

# Refereces
[Cisco - Consider SNMP](https://www.cisco.com/c/en/us/support/docs/ip/simple-network-management-protocol-snmp/9226-mibs-9226.html)