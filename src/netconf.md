# NETCONF

```console
conf t
aaa new-model
aaa authentication login default local
aaa authorization exec default local
username admin privilege 15 secret cisco123
!
! This service relies on SSH
!
netconf-yang
```

## Validate

```console
restconf-router#show netconf-yang status 
netconf-yang: enabled
netconf-yang ssh port: 830
netconf-yang candidate-datastore: disabled
```

## Setting an IP address


I performed this lab inside a linux virtual environment.

1. Load a python virtual environment

```console
python3 -m venv ~/netconf-lab
```

1. Activate it

```console
source ~/netconf-lab/bin/activate
```

1. Install ncclient

```console
pip install ncclient
```

1. Enter the python shell

```console
python
```

1. Connect to device:

```console
>>> conn = manager.connect(
    host="192.168.52.199",
    port=830,
    username="admin",
    password="cisco123",
    hostkey_verify=False,
    device_params={"name": "iosxe"}
)
```

1. Paste in a payload, follow the XML

```console
>>> payload = """
<config>
  <native xmlns="http://cisco.com/ns/yang/Cisco-IOS-XE-native">
    <interface>
      <Loopback>
        <name>5</name>
        <ip>
          <address>
            <primary>
              <address>5.5.5.5</address>
              <mask>255.255.255.255</mask>
            </primary>
          </address>
        </ip>
      </Loopback>
    </interface>
  </native>
</config>
"""
>>> conn.edit_config(target="running", config=payload)
<?xml version="1.0" encoding="UTF-8"?>
<rpc-reply xmlns="urn:ietf:params:xml:ns:netconf:base:1.0" message-id="urn:uuid:5edcd8ca-3e51-4581-8bce-87f7eb939735" xmlns:nc="urn:ietf:params:xml:ns:netconf:base:1.0"><ok/></rpc-reply>
```

## Reference

[Programmability Configuration Guide, Cisco IOS XE 17.17.x](https://www.cisco.com/c/en/us/td/docs/ios-xml/ios/prog/configuration/1717/b_1717_programmability_cg/m_1717_prog_restconf.html)
