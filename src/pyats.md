# PyATS

PyATS interacts with raw TCP ports expecting the other side to be Cisco CLI.

It shoud be paired with [CML Breakout](cml-breakout.md)

PyATS includes tools:

**Unicon** --- Manages the connection state machine

**Genie** --- Manages node representations 

#### Unicon - Connection State Machine

[Unicon] manages the different states a connection could be in.

[Unicon]: https://developer.cisco.com/docs/unicon/

- Username:
- R1>
- R1(config)#
- --More--
- "Press Return to get started"

#### Genie - Python Objects

[Genie] uses [models] to create objects that describe operational states.

[Genie]: https://developer.cisco.com/docs/genie-docs/

[models]: https://pubhub.devnetcloud.com/media/genie-feature-browser/docs/#/models


## PyATS Install

I already have python3 installed.


```console,editable
#
# create virtual environment
# upgrade PIP
# install pyats full
#
python3 -m venv .venv
.venv/bin/python -m pip install --upgrade pip
.venv/bin/python -m pip install 'pyats[full]'
```

## References

[venv — Creation of virtual environments — Python 3.14.6 documentation](https://docs.python.org/3/library/venv.html)

[Introduction - pyATS & Genie - Cisco DevNet](https://developer.cisco.com/docs/pyats/)
