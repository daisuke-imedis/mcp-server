import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";

const WeatherSchema = z.object({ location: z.string() });

// Create server instance
const server = new Server(
  { name: "weather", version: "1.0.0" },
  { capabilities: { tools: {} } },
);

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "check-weather",
        description: "Check the weather for a location",
        inputSchema: {
          type: "object",
          properties: {
            location: {
              type: "string",
              description: "The location to check the weather for",
            },
          },
          required: ["location"],
        },
      },
    ],
  };
});

// Handle tool execution
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    if (name === "check-weather") {
      const { location } = WeatherSchema.parse(args);
      const weather = await getWeather(location);
      return { content: [{ type: "text", text: weather }] };
    } else {
      throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(
        `Invalid arguments: ${error.errors
          .map((e) => `${e.path.join(".")}: ${e.message}`)
          .join(", ")}`,
      );
    }
    throw error;
  }
});

// Fake weather API
async function getWeather(location: string): Promise<string> {
  return `It's bright and sunny in ${location} today.`;
}

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
