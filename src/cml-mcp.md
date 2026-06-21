# CML MCP

## Terms

**MCP** --- Model Context Protocol

- MCP is a formal way to define tools a LLM can use

**CML** --- Cisco Modeling Labs

## Abilities

- Lab Control
  - Build
  - Wipe
  - Start
  - Stop

- Node Control
  - Add
  - Remove

- Link Control
  - Add
  - Remove
  
- Packet Captures

CML-MCP isn't great after the lab has been started to make modifications or tweaks, for that, use [PyATS].

[PyATS]: ./pyats.md

## GitHub

```text,editable
git clone https://github.com/xorrkaz/cml-mcp/
```

## Docker

I followed [this guide](https://github.com/xorrkaz/cml-mcp/blob/main/INSTALLATION.md)

```text,editable
ariadne@orchard:~/docker/cml-mcp$ cat docker-compose.yml 
services:
  cml-mcp:
    image: xorrkaz/cml-mcp:latest
    container_name: cml-mcp
    restart: unless-stopped
    #
    # For the custom PKI to work
    #
    volumes:
      - /etc/ssl/certs:/etc/ssl/certs:ro  
    environment:
      TZ: "America/New_York"
      CML_MCP_TRANSPORT: "http"
      CML_VERIFY_SSL: "false"
      DEBUG: "false"
      PYATS_USERNAME: "claude"
      PYATS_PASSWORD: "claude-password"
      PYATS_AUTH_PASS: ""
      # Optional default target if a client omits the X-CML-URL header:
      CML_URL: "https://cml.haske.org"
      # For multi-host / per-request X-CML-URL, set one of these instead:
      # CML_ALLOWED_URLS: "https://cml.haske.org"
      # CML_URL_PATTERN: '^https://cml\.haske\.org'
    #
    # For the reverse proxy to work
    #
    labels:
      traefik.enable: "true"
      traefik.http.routers.cml-mcp.rule: Host(`cml-mcp.haske.org`)
      traefik.http.routers.cml-mcp.entrypoints: websecure
      traefik.http.routers.cml-mcp.tls.certresolver: step-ca
      traefik.http.services.cml-mcp.loadbalancer.server.port: 9000
    networks:
      - user-bridge

networks:
  user-bridge:
    external: true
```

## References

[GitHub - xorrkaz/cml-mcp: A Model Context Protocol (MCP) Server for Cisco Modeling Labs (CML)](https://github.com/xorrkaz/cml-mcp)
