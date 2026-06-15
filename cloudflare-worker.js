/* ===========================================================================
   IELTS Speaking Coach — AI proxy (Cloudflare Worker)
   ---------------------------------------------------------------------------
   This tiny server holds YOUR AI key, so the app (and your students) never
   need to enter one. The browser app just POSTs { prompt } here, and this
   worker forwards it to Anthropic (Claude) or OpenAI using the key you set
   as a secret in the Cloudflare dashboard.

   SET THESE in Cloudflare → your Worker → Settings → Variables and Secrets:
     • ANTHROPIC_API_KEY   (a secret, starts with sk-ant-)   ← use this OR OpenAI
     • OPENAI_API_KEY      (a secret, starts with sk-)        ← optional alternative
     • MODEL               (optional) e.g. claude-sonnet-4-6  or  gpt-4o-mini
     • ALLOWED_ORIGIN      (optional) your site URL, e.g. https://you.github.io
                            — locks the worker so only YOUR site can use it.

   Full step-by-step is in SETUP-AI-PROXY.md.
   =========================================================================== */

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const allow = env.ALLOWED_ORIGIN || "*";
    const cors = {
      "Access-Control-Allow-Origin": allow === "*" ? "*" : allow,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "content-type",
      "Vary": "Origin",
    };

    if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: cors });
    if (request.method !== "POST") return json({ error: "Use POST." }, 405, cors);

    // Optional: only allow your own site's browser to call this worker.
    if (allow !== "*" && origin && origin !== allow) {
      return json({ error: "This proxy is locked to another site." }, 403, cors);
    }

    let body;
    try { body = await request.json(); } catch (e) { return json({ error: "Bad JSON body." }, 400, cors); }
    const prompt = ((body && body.prompt) || "").toString();
    if (prompt.length < 10) return json({ error: "Missing prompt." }, 400, cors);
    if (prompt.length > 8000) return json({ error: "Prompt too long." }, 413, cors);

    const anthropicKey = env.ANTHROPIC_API_KEY;
    const openaiKey = env.OPENAI_API_KEY;

    try {
      if (anthropicKey) {
        const r = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            "x-api-key": anthropicKey,
            "anthropic-version": "2023-06-01",
          },
          body: JSON.stringify({
            model: env.MODEL || "claude-sonnet-4-6",
            max_tokens: 1300,
            messages: [{ role: "user", content: prompt }],
          }),
        });
        const data = await r.json().catch(() => ({}));
        if (!r.ok) return json({ error: (data.error && data.error.message) || ("Anthropic error " + r.status) }, r.status, cors);
        const text = (data.content || []).map((b) => b.text || "").join("").trim();
        return json({ text }, 200, cors);
      }

      if (openaiKey) {
        const r = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: { "content-type": "application/json", authorization: "Bearer " + openaiKey },
          body: JSON.stringify({
            model: env.MODEL || "gpt-4o-mini",
            max_tokens: 1300,
            messages: [{ role: "user", content: prompt }],
          }),
        });
        const data = await r.json().catch(() => ({}));
        if (!r.ok) return json({ error: (data.error && data.error.message) || ("OpenAI error " + r.status) }, r.status, cors);
        const text = ((data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) || "").trim();
        return json({ text }, 200, cors);
      }

      return json({ error: "No API key set on the server. Add ANTHROPIC_API_KEY or OPENAI_API_KEY in the Worker settings." }, 500, cors);
    } catch (e) {
      return json({ error: "Upstream request failed: " + (e.message || String(e)) }, 502, cors);
    }
  },
};

function json(obj, status, cors) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { "content-type": "application/json", ...cors },
  });
}
