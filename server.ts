/**
 * Chatwork Webhook → Claude → Notion
 * 最小の動作確認用 Worker
 */

export default {
  async fetch(request: Request): Promise<Response> {
    // ひとまず常に 200 OK を返す
    return new Response("OK from MCP Worker", { status: 200 });
  },
};
