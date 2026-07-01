# Configure SSH on Cisco IOS

This should also work for IOS-XE.

`aaa new-model` is necessary for the login default line under the vty.

## Config

```console,editable
aaa new-model
!
username ariadne secret passwordgoeshere
!
ip domain-name <domain-here>
!
crypto key generate rsa modulus 4096
!
ip ssh version 2
!
line vty 0 15
  transport input ssh
  login authentication default
```

## Verification

```console
R2# ssh -l ariadne 10.0.0.1

[banner message]

Password: 

[banner message]

R1>
```
