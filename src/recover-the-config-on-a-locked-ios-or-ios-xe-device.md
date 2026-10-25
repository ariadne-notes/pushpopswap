# Recover the config on a locked Cisco IOS or IOS-XE device

This works on IOS and IOS-XE. This assumes you're working at the console. It will not work over the network.

1. Connect to the console.

   Reload and boot into rommon.
   
   You'll need to send a break character (Usually `Ctrl+Shift+6`, then press `X`).

   We are setting the config-register to change how the device boots.

   ```console,editable
   rommon > confreg 0x2142
   rommon > boot
   ```

   It will boot and skip the startup config.

1. When the box reloads back into IOS or IOS-XE, dump the config.

   If the box asks you to configure it put `N`.

   ```console,editable
   enable
   terminal length 0
   more nvram:startup-config
   ```

1. Paste the config back onto the box.

   ```console,editable
   configure terminal
   !
   ! entire config here
   !
   end
   ```

1. Turn off AAA.

   Necessary because you can't log in, you can fix this later.

   ```console,editable
   configure terminal
   no aaa new-model
   end
   ```

1. Remove the password from the console.

   Necessary because you can't log in, you can fix this later.

   ```console,editable
   line console 0
   no password
   no login local
   end
   ```

1. Save 

   ```console,editable
   configure terminal
   config-register 0x2102
   end
   copy running-config startup-config
   ```

1. Reload

   ```console,editable
   reload
   ```

You should still be able to access the console without a password. Now fix AAA.

## References

[Cisco - Understand Configuration Register Usage on all Routers](https://www.cisco.com/c/en/us/support/docs/routers/10000-series-routers/50421-config-register-use.html)

[Cisco - 900 Series ISR Software Configuration Guide](https://www.cisco.com/c/en/us/td/docs/routers/access/900/software/configuration/guide/900SCG/install.html)
