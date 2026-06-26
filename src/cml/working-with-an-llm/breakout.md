# Breakout

The breakout tool attaches lab device console ports to telnet ports on the CML host, in the form: `127.0.0.1:90XX`

This tool is required to make changes via automation after the initial topology has been created and started.

## Downloading

The CML Web UI provides download for this tool. It's available at a link like this.

## Files

`breakout-config.yml`

- How Claude can use the breakout tool

`breakout-map.yml`

- How the console ports are currently mapped

### breakout-config.yml

```console
ariadne@tesseract:~/claude-mcp-cml$ cat breakout-config.yml 
#
# breakout configuration file
# - 'username' and 'password' for authentication
#   NOTE: the password is NOT stored here. breakout reads it from the
#   BREAKOUT_PASSWORD environment variable (kept in .breakout.env, mode 600).
# - 'controller' is the CML FQDN.
# - set an empty 'listen_address' to listen globally.
# - 'lab_config_name' is the lab/node -> console-port map file.
#
# Launch (the -config flag default is config.yaml, so name it explicitly):
#   source .breakout.env && ./breakout-linux-amd64 -config breakout-config.yml run
#
console_start_port: 9000
controller: https://cml.haske.org
extra_lf: false
lab_config_name: breakout-map.yml
listen_address: ''
populate_all: true
ui_server_port: 8080
username: claude
verify_tls: false
vnc_start_port: 5900
```

### breakout-map.yml

```console,editable
ariadne@tesseract:~/claude-mcp-cml$ cat lab-connections-and-state.yaml 
3626ec3a-0c1d-43c6-9111-2ff128ac88ee:
  created: "2026-05-18T15:29:21+00:00"
  effective_permissions:
  - lab_view
  - lab_edit
  - lab_exec
  - lab_admin
  enabled: true
  id: 3626ec3a-0c1d-43c6-9111-2ff128ac88ee
  lab_description: ""
  lab_title: OSPF Area Types
  link_count: 14
  node_count: 15
  nodes:
    122a07e1-91a2-4746-b8a2-786bca167850:
      devices:
      - enabled: true
        listen_port: 9020
        name: serial0
        running: false
        status: ""
      - enabled: false
        listen_port: 9021
        name: serial1
        running: false
        status: ""
      label: R6
    1a83c2b8-6614-427e-852f-27648bad1c05:
      devices:
      - enabled: true
        listen_port: 9024
        name: serial0
        running: false
        status: ""
      - enabled: false
        listen_port: 9025
        name: serial1
        running: false
        status: ""
      label: R7
    6f274dd4-330b-4a8d-b49a-3e674e002946:
      devices:
      - enabled: true
        listen_port: 9004
        name: serial0
        running: false
        status: ""
      - enabled: false
        listen_port: 9005
        name: serial1
        running: false
        status: ""
      label: R3
    6fe92bf5-55cf-46ed-93b0-ea4f82686881:
      devices:
      - enabled: true
        listen_port: 9016
        name: serial0
        running: false
        status: ""
      - enabled: false
        listen_port: 9017
        name: serial1
        running: false
        status: ""
      label: R55
    29c7b2b0-0f9d-4199-bf04-f47c22e924ac:
      devices:
      - enabled: true
        listen_port: 9014
        name: serial0
        running: false
        status: ""
      - enabled: false
        listen_port: 9015
        name: serial1
        running: false
        status: ""
      label: R5
    39f62639-c122-4129-a055-376309ecb2af:
      devices:
      - enabled: true
        listen_port: 9026
        name: serial0
        running: false
        status: ""
      - enabled: false
        listen_port: 9027
        name: serial1
        running: false
        status: ""
      label: R77
    40914cfe-55aa-49a0-92a9-ab86dabaa5c0:
      devices:
      - enabled: true
        listen_port: 9018
        name: serial0
        running: false
        status: ""
      - enabled: false
        listen_port: 9019
        name: serial1
        running: false
        status: ""
      label: R56
    578631b5-a38e-4586-90d8-2956d181fb4e:
      devices:
      - enabled: true
        listen_port: 9008
        name: serial0
        running: false
        status: ""
      - enabled: false
        listen_port: 9009
        name: serial1
        running: false
        status: ""
      label: R34
    a44df6b9-ec1e-44c0-8457-34742980b16a:
      devices:
      - enabled: true
        listen_port: 9010
        name: serial0
        running: false
        status: ""
      - enabled: false
        listen_port: 9011
        name: serial1
        running: false
        status: ""
      label: R4
    b4a60f6f-abe8-4801-8a30-b683f4384573:
      devices:
      - enabled: true
        listen_port: 9000
        name: serial0
        running: false
        status: ""
      - enabled: false
        listen_port: 9001
        name: serial1
        running: false
        status: ""
      label: R1
    d8497702-885d-4a0d-acd5-d2216d31d6f3:
      devices:
      - enabled: true
        listen_port: 9028
        name: serial0
        running: false
        status: ""
      - enabled: false
        listen_port: 9029
        name: serial1
        running: false
        status: ""
      label: R78
    e1e0ad5b-409c-464d-b0a0-1c471531df02:
      devices:
      - enabled: true
        listen_port: 9012
        name: serial0
        running: false
        status: ""
      - enabled: false
        listen_port: 9013
        name: serial1
        running: false
        status: ""
      label: R44
    ea127185-72c4-4ed5-92c9-330b7f37975c:
      devices:
      - enabled: true
        listen_port: 9022
        name: serial0
        running: false
        status: ""
      - enabled: false
        listen_port: 9023
        name: serial1
        running: false
        status: ""
      label: R66
    ec239ae1-cf08-4d77-8348-e558d7dff26f:
      devices:
      - enabled: true
        listen_port: 9002
        name: serial0
        running: false
        status: ""
      - enabled: false
        listen_port: 9003
        name: serial1
        running: false
        status: ""
      label: R2
    f6376fc4-0d13-4fdd-8c88-c9d4aa3867ed:
      devices:
      - enabled: true
        listen_port: 9006
        name: serial0
        running: false
        status: ""
      - enabled: false
        listen_port: 9007
        name: serial1
        running: false
        status: ""
      label: R33
  state: STARTED
```
