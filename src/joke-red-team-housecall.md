# A Red Team Housecall

This makes its way around the Internet. I rewrote it for technical accuracy.

> **Girl invited me over to “fix her WiFi.” I am a red team engineer with custom firmware on my router and no IoT devices.**
>

> I showed up 10 minutes early, hoodie on, my laptop loaded with a hardened gentoo install I self-compiled.
>

> She opened the door holding a MacBook Air. I saw she had chrome installed with 43 tabs open. I almost left right then.
>

> "Can I see a network diagram?" She laughed. “It’s just the router from the ISP.”
>

> Alright ... Let her have it.
>

> I popped open her router admin panel, with a default password: `admin123`. The SSID was "PrettyFlyForAWiFi". I ran `nmapscan.`

>

> * No firewall
> * 1 subnet, no vlans
> * 12 exposed ports
> * 3 outdated IoT devices
> * A printer running telnet.

>

> **... raw digital nudity.**
>

> "Do you ever get lag?"
> "What's lag?"
> "Is the network slow?"
> “yeah sometimes Netflix buffers.”
>

> I loaded up Wireshark, attaching it to the LAN side of the network. My machine is sluggish under the load of packets, I need to stop the capture to see the stream.
> I check the IPs and find they are located in several East European countries.
>

> "So your TV is on the wifi, huh?"
> "Yeah, but I never use the smart features, it's too slow"
> "Do you update it?"
> "Update what?"
> "Update the software on the TV."
>
> I'm struggling to stay composed. I reframe.
>
> "Your network will be much faster if you just ... take the TV off the wifi. Your ... TV looks to be participating in a botnet"
> "Is that bad?"
> "It isn't good."
>
> I offered to segment the network and install pfSense. She said she “just wanted Spotify to stop cutting out.”
>

> I airgapped her Sonos out of pity.
>

> After 20 minutes of work, I asked for her phone to remove TikTok and clean the app permissions. She said “but I need it for filters.”
> I looked into the distance. Deep sigh. I looked out the window and whispered ...
>

> "The panopticon isn’t metaphorical."
> "Are you always this intense?"
> "No, only when the NSA is listening." ... Which is always.
>

> She offered coffee. I declined, caffeine raises your attack surface.
>

> I get up to leave, she goes, “Thanks, you’re like, really good with computers.”
>

> I walked away slow. Her router was still on UPnP. So was my heart.
> You can't patch people. Believe me, I tried.
>

> `// date_night_final_final_forsure.txt.gpg`
> `#exit`