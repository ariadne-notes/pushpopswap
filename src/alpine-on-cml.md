# Alpine on CML

```
USERNAME=cisco
PASSWORD=cisco
hostname pc-20
ip link set dev eth0 up
ip address add 10.0.20.20/24 dev eth0
ip route add default via 10.0.20.1
```

## Setting Addresses after it's booted.

```
cat > /etc/local.d/ipv6.start << 'EOF'
#!/bin/sh
ip addr add 2001:db8:1::4/64 dev eth0
sysctl -w net.ipv6.conf.eth0.accept_ra=1
EOF

chmod +x /etc/local.d/ipv6.start
```

## Setting DNS

```
cat > /etc/local.d/dns.start << 'EOF'
#!/bin/sh
cat > /etc/resolv.conf << 'RESOLV'
nameserver 2001:db8:1::64
RESOLV
EOF

chattr +i /etc/resolv.conf
chmod +x /etc/local.d/dns.start
```