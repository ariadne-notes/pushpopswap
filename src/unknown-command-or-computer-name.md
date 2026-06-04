# Unknown Command or Computer Name

## The Problem

Typing the wrong commands in Cisco CLI ... the equipment tries to use telnet.

```console
R1# aoeu
Translating "aoeu"...domain server (255.255.255.255)
 (255.255.255.255)
Translating "aoeu"...domain server (255.255.255.255)

% Bad IP address or host name
% Unknown command or computer name, or unable to find computer address
```

This is from the [IOS-XE] guide.

[IOS-XE]: https://www.cisco.com/c/en/us/td/docs/ios/termserv/configuration/guide/xe_16/tsv-xe-book/tsv_term_op_char_dialin.html

> The Cisco IOS software accepts a host name entry at the EXEC prompt as a Telnet command.
>
> If you enter the host name incorrectly, the Cisco IOS software interprets the entry as an incorrect Telnet command and provides an error message indicating that the host does not exist.
>
> The **transport preferred none** command disables this option so that if you enter a command incorrectly at the EXEC prompt, the Cisco IOS software does not attempt to make a Telnet connection.


## Config

```console
configure terminal
line console 0
 transport preferred none
line vty 0 15
 transport preferred none
end
copy run start
```

## Verify

```console
R1# aoeu
    ^
% Invalid input detected at '^' marker.

R1#
```

## Longer Verification

DNS still works.

```plain
DNS resolution in show commands is enabled
```

The box will not attempt telnet on typing stuff into the CLI now.

```plain
Preferred transport is none
```


```console
R1# show terminal              
Line 0, Location: "", Type: ""
Length: 24 lines, Width: 80 columns
Status: PSI Enabled, Ready, Active, Automore On
Capabilities: none
Modem state: Ready
Group codes:    0
Modem hardware state: CTS* noDSR  DTR RTS
Special Chars: Escape  Hold  Stop  Start  Disconnect  Activation
                ^^x    none   -     -       none         
Timeouts:      Idle EXEC    Idle Session   Modem Answer  Session   Dispatch
               00:10:00        never                        none     not set
                            Idle Session Disconnect Warning
                              never 
                            Login-sequence User Response
                             00:00:30
                            Autoselect Initial Wait
                              not set 
Modem type is unknown.
Session limit is not set.
Time since activation: 00:05:35
Editing is enabled.
History is enabled, history size is 20.
DNS resolution in show commands is enabled
Full user help is disabled
Allowed input transports are none.
Allowed output transports are lat pad telnet rlogin lapb-ta mop v120 ssh.
Preferred transport is none.
Shell: disabled
Shell trace: off
No output characters are padded
No special data dispatching characters
```

## References

[Terminal Services Configuration Guide, Cisco IOS XE Release 16.x - Configuring Terminal Operating Characteristics for Dial-In Sessions Cisco 4000 Series Integrated Services Routers - Cisco](https://www.cisco.com/c/en/us/td/docs/ios/termserv/configuration/guide/xe_16/tsv-xe-book/tsv_term_op_char_dialin.html)
