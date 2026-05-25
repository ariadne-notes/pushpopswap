# SSH

## Config

```
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
