# Load Balancing

## Inbound

- See if the ISP supports BGP Communities with local preference to mark routes on their side
- Adjust the MED, lower is better.
- Advertise longer prefixes to both ISPs
- Use AS_Path prepending

## Outbound

- Use Weight
- Use Local Preference
- Advertise a default route into the network
- Filter the provider routes and only install a subset into the RIB.
- Use AS_Path filtering

## BGP multipath

- Uses the `maximum-paths` keyword.

## Do not become a transit network

- Filter your routes, only advertise subnets you own.
