# CML

... seems to work fine!

If you have enterprise CML, there is a front network and a back network.

The back network uses ipv6 link-local addresses which do not play well with Proxmox port channels and vlan tags.

It seems much safer to have a dedicated port for the back network.

CML in a hypervisor struggles with some Juniper images which do not like nested virtualization.
