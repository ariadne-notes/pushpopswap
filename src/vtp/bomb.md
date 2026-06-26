# Bomb

Caused when one VTP switch overwrites the VLANS of other VTP switches.

See [VTP Design Guidance].

[VTP Design Guidance]: ./vtp.md#design-guidance

## Terms

**VBS** --- VTP Bomb Switch

- Usually sits around for a bit until it's plugged back in

## VTP isn't really client-server

It operates more like peer-to-peer.

VTPv1 and VTPv2 allow multiple switches to be servers.


**Any** server switch can make VLAN changes.

VTP ties the desired VLAN state to `configuration revision number`

## Setup one - repurposed decom

- VTP revision number: 50
- VTP mode: server
- Switch is removed
- VLANs deleted
- VTP revision number: 58
- VBS Created
  - Stored
  - Pulled out of storage
  - Plugged into trunk port
  - Has higher revision number
  - Deletes VLANs

## Setup two - site move

- VTP revision number: 21
- VTP mode: server
- Multisite network
  - Templated config
  - Same VTP domain everywhere
- Biggest site
- VBS Created
  - Stored
- Site-B has revision: 15
- Site-B needs a new switch
- VBS is used
  - Pulled out of storage
  - Goes to Site-B
  - Plugged into trunk port
  - Has higher revision number
  - Deletes VLANs

## Setup three - lab work

- VTP revision number: 38
- VTP mode: server
- Junior engineer
- Doesn't fear VTP
- Disconnects a switch from production
- Takes to desk
- Practices with making vlans
- VTP revision number: 45
- VBS Created
- A switch is needed for an expansion
- VBS is used
  - Taken off desk
  - Plugged into trunk port
  - Has higher revision number
  - Deletes VLANs

## Stories

> **JumpyMud7539**
>

> I've just recovered from over writing a hospitals vlan database when collecting a new looking switch from the store room that was unboxed and installing it in the production network without really checking the running config.

>

> VTP obviously had it's own agenda. I am a network engineer who boasts no qualifications just experience on the job and the ability to blog my way through.

>

> I must say when things go catastrophically wrong is when I learn best. I'm surrounded by good engineers who say that what they teach you in certifications gives you good theory but it doesn't always relate to production environments.

>
> As soon as it happened, I knew the problem and how to fix it regardless, I became too complacent. I wont lose my job, but i felt really bad. I feel I've learned a good lesson, I've learnt more about vtp, what we need to do going forward.
>
> The organisation has also agreed to put me on a ccna course to enable me to progress.
>
> [Source](https://www.reddit.com/r/networking/comments/sl473u/biggest_fail_first_attempt_in_learning/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button)

---

> **FLATLANDRIDER**
>
> Setting up a new switch at a remote site. Cisco switch with VTP deployed.
>
> I set up the basics and was getting VTP set up. The device was in client mode but I needed to change the VTP version.
>
> Well you can only change the version in server mode. So I changed it to server mode so I could change the version.
>
> As soon as I did that I lost connection to the remote site. The switch had pushed its empty vlan database to all other switches in the site, deleting all vlans. Even the true VTP server was overwritten.
>
> I took the entire remote site down, which was in a different country. I ended up having to remote into someone's computer using their hotspot so I could gain access to the core switch (VTP server) and recreate the vlan database.
>
> [Source](https://www.reddit.com/r/sysadmin/comments/1pk274p/comment/nthx2ru/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button)

---

> **Win_Sys**
>
> I think we have all done this at one point or another.
>
> I took down an entire school once when I didn’t check VTP. Wiped the DC switch of most of its VLANs.
>
> [Source](https://www.reddit.com/r/networking/comments/sl473u/comment/hvqie7z/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button)

---

> **[deleted]**
>
> VTP mess-up (yes, I know)
>
> I am a student employee, and I have been put in charge of re-speccing our VTP so we avoid the typical vulnerability of VTP where you plugin a switch from a different location and wipe out the whole HO. (Very grateful for the responsibility, but it makes my nuts sweat, tbh).
>
> So in my department we are connected to switch A.
>

> - In server-mode
> - Pruning enabled
> - Password enabled
> - Version 2
>

> So I think "aight, let's go", and change it to the new domain. 5 seconds later 30 employees are DC. I panick (not too hard anyway).
>

> My superior doesn't know what happened, tries to pick up the pieces, but my console window breaks down.
>

> We connect to the switch via console.
>

> Turn it back to the old domain
>

> VOILA, it works!
>

> I don't dare touch VTP again.
>

> Dear /networking, what happened?!
>
> [Source](https://www.reddit.com/r/networking/s/J4orq543OI)

---

> **gypsy_endurance**
>

> Back in 2001’ish, was working Tier 2 networking shop at a Fin Srv company. 
>

> I was adding two 1RU switches to a very large Cisco campus network for a particular business unit (The Bond Pit).
>

> Anyhoo, prestaged everything at my desk and waited for the change window. Plugged the switches in and was looking through some operational commands when a guy walks in and says “are you doing something with the network?”
>

> I walk out of the room I’m in following him and about 30+ bond traders are standing up at their desks with their hands in the air complaining about the network being down.
>

> The engineer that did the configs I was implementing, looked at the configs on the 6500s that we were uplinked to and all the vlans were gone.
>

> Long story, shortened…Cisco’s client/server VTP feature didn’t actually act like a client/server. 
>

> The configuration revision in the VTP database was higher, or lower (don’t remember anymore) on the 1RU Cisco “clients” and overwrote the vlan database on the “server” 6500s.
>

> The Cisco TAC case answer was “that’s how it’s supposed to work.” Talking about fearing for your job for the next 12 hrs. LOL!
>
> [Source](https://www.reddit.com/r/networking/comments/1jvbihl/comment/mm913ve/?utm_source=share&utm_medium=web3x&utm_name=web3xcss&utm_term=1&utm_content=share_button)

---

> **Joe Morris**
>
> Plugged a previous used switch into a switched network. All Cisco. Running VTP
>

> The newly connected switch won the vtp war and wiped the vlan db from all other switches.
>
> [Source](https://www.facebook.com/groups/it.humor.and.memes/posts/6722908831068177/)
