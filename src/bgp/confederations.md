# Confederations

External peers see the `confederation_id`.

`NEXT_HOP` is preserved throughout the confederation.

`MED` is preserved for routes advertised into the confederation.

`LOCAL_PREF` is preserved throughout the confederation.

`AS_PATH` for privates ASes is used within the confederation.

## Force interior confederation MEDs to be considered

`bgp deterministic-med`

Route Reflectors are generally preferred.

IF you want to add two BGP speakers to the same router reflector cluster, specify the cluster ID.

- clients can not detect inter-cluster loops. They don't have the attributes in the BGP table.
