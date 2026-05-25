# RESTCONF

RESTCONF uses http to send command operations to network equipment.

## Config


```
conf t
aaa new-model
aaa authentication login default local
aaa authorization exec default local
username admin privilege 15 secret cisco123
!
! This is a web service, turn on http
!
ip http secure-server
restconf
```


## Validate


RESTCONF relies on DMI and nginx

```
restconf-router# show platform software yang-management process
confd            : Running    
nesd             : Running    
syncfd           : Running    
ncsshd           : Running    
dmiauthd         : Running    
nginx            : Running    
ndbmand          : Running    
pubd             : Running  
```


## Get an IP Address


This is done from the linux commandline via curl

`--insecure` is added because Cisco generates it's own self-signed certificates.

```
ariadne@tesseract:~$ curl --insecure --user admin:cisco123 \
   -H "Accept: application/yang-data+json" \
   https://192.168.52.199/restconf/data/Cisco-IOS-XE-native:native/interface/Loopback=0

{
  "Cisco-IOS-XE-native:Loopback": {
    "name": 0,
    "ip": {
      "address": {
        "primary": {
          "address": "1.1.1.1",
          "mask": "255.255.255.255"
        }
      }
    }
  }
}
```


## Set an IP Address


More command line, just with a PATCH message.

```
ariadne@tesseract:~$ curl --insecure --user admin:cisco123 \
   -X PATCH \
   -H "Accept: application/yang-data+json" \
   -H "Content-Type: application/yang-data+json" \
   https://192.168.52.199/restconf/data/Cisco-IOS-XE-native:native/interface/Loopback=0 \
   -d '{
     "Cisco-IOS-XE-native:Loopback": {
       "name": 0,
       "ip": {
         "address": {
           "primary": {
             "address": "2.2.2.2",
             "mask": "255.255.255.255"
           }
         }
       }
     }
   }'
```

## Reference

[Programmability Configuration Guide, Cisco IOS XE 17.17.x](https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/prog/configuration/1717/b_1717_programmability_cg/m_1717_prog_restconf.html)