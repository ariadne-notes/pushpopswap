# IETF Automation

IAB[^IAB] organized a workshop between June 4 to June 6th in 2002 to establish a dialog between network operators and developers to guide the IETF on network automation.

[^IAB]: Internet Architecture Board

That workshop is recorded in [RFC 3535].

[RFC 3535]: https://www.rfc-editor.org/info/rfc3535/

[YANG], [RESTCONF], [NETCONF], and [gRPC] try to solve these problems.

[YANG]: /automation/yang.md
[RESTCONF]: /automation/restconf.md
[NETCONF]: /automation/netconf.md
[gRPC]: /automation/grpc.md

> 3. Operator Requirements
>

>    During the breakout session, the operators were asked to identify
>    needs that have not been sufficiently addressed.  The results
>    produced during the breakout session were later discussed and
>    resulted in the following list of operator requirements.
>

>    1.  Ease of use is a key requirement for any network management
>        technology from the operators point of view.
>

>    2.  It is necessary to make a clear distinction between configuration
>        data, data that describes operational state and statistics.  Some
>        devices make it very hard to determine which parameters were
>        administratively configured and which were obtained via other
>        mechanisms such as routing protocols.
>

>    3.  It is required to be able to fetch separately configuration data,
>        operational state data, and statistics from devices, and to be
>        able to compare these between devices.
>

>    4.  It is necessary to enable operators to concentrate on the
>        configuration of the network as a whole rather than individual
>        devices.
>

>    5.  Support for configuration transactions across a number of devices
>        would significantly simplify network configuration management.
>

>    6.  Given configuration A and configuration B, it should be possible
>        to generate the operations necessary to get from A to B with
>        minimal state changes and effects on network and systems.  It is
>        important to minimize the impact caused by configuration changes.
>

>    7.  A mechanism to dump and restore configurations is a primitive
>        operation needed by operators.  Standards for pulling and pushing
>        configurations from/to devices are desirable.
>
>    8.  It must be easy to do consistency checks of configurations over
>        time and between the ends of a link in order to determine the
>        changes between two configurations and whether those
>        configurations are consistent.
>

>    9.  Network wide configurations are typically stored in central
>        master databases and transformed into formats that can be pushed
>        to devices, either by generating sequences of CLI commands or
>        complete configuration files that are pushed to devices.  There
>        is no common database schema for network configuration, although
>        the models used by various operators are probably very similar.
>        It is desirable to extract, document, and standardize the common
>        parts of these network wide configuration database schemas.
>

>    10. It is highly desirable that text processing tools such as diff,
>        and version management tools such as RCS or CVS, can be used to
>        process configurations, which implies that devices should not
>        arbitrarily reorder data such as access control lists.
>

>    11. The granularity of access control needed on management interfaces
>        needs to match operational needs.  Typical requirements are a
>        role-based access control model and the principle of least
>        privilege, where a user can be given only the minimum access
>        necessary to perform a required task.
>

>    12. It must be possible to do consistency checks of access control
>        lists across devices.
>

>    13. It is important to distinguish between the distribution of
>        configurations and the activation of a certain configuration.
>        Devices should be able to hold multiple configurations.
>

>    14. SNMP access control is data-oriented, while CLI access control is
>        usually command (task) oriented.  Depending on the management
>        function, sometimes data-oriented or task-oriented access control
>        makes more sense.  As such, it is a requirement to support both
>        data-oriented and task-oriented access control.

## References

[RFC 3535: Overview of the 2002 IAB Network Management Workshop | RFC Editor](https://www.rfc-editor.org/info/rfc3535/)
