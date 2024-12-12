# MCP Server Quickstart

Setup a [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) server in 60 seconds.

https://github.com/user-attachments/assets/19a2248a-64f4-4e0b-aedc-55eb51c7cbfe

## Usage

1. Ensure you have [Bun](https://bun.sh/docs/installation) installed.
2. Clone the repo and install dependencies:
   ```bash
   git clone https://github.com/dexaai/mcp-quickstart.git mcp-quickstart && cd mcp-quickstart && bun install
   ```
3. Copy the absolute path to the server:
   ```bash
   realpath server.ts | pbcopy
   ```
4. Open the Claude desktop app config:
   ```bash
   vim ~/Library/Application\ Support/Claude/claude_desktop_config.json
   ```
5. Add the server config with the path from step 3 instead of `<path/to/repo>/server.ts`.
   ```json
   {
     "mcpServers": {
       "weather-quickstart": {
         "command": "bun",
         "args": ["<path/to/repo>/server.ts"]
       }
     }
   }
   ```
6. Restart the Claude desktop app and ask for the weather.
