# Set up the AI rewrite — no API key for your students

This makes the **"✨ Get my improved answer"** button work for everyone **without anyone typing an API key**. You set your key once on a free Cloudflare Worker; the app talks to that worker.

Time needed: about 10 minutes. No coding required.

---

## What you'll need
- A free **Cloudflare** account → https://dash.cloudflare.com/sign-up
- One **AI API key**:
  - **Claude (recommended):** https://console.anthropic.com → *API Keys* → create one (starts with `sk-ant-`)
  - or **OpenAI:** https://platform.openai.com/api-keys (starts with `sk-`)
- A little credit/balance on that AI account (each rewrite costs a fraction of a cent to a few cents).

---

## Step 1 — Create the Worker
1. Go to https://dash.cloudflare.com and sign in.
2. In the left menu, click **Workers & Pages** → **Create** → **Create Worker**.
3. Give it a name, e.g. `ielts-ai`, then click **Deploy** (it deploys a placeholder — that's fine).

## Step 2 — Paste in the code
1. Click **Edit code** (top right).
2. Delete everything in the editor.
3. Open the file **`cloudflare-worker.js`** (in this app folder), copy ALL of it, and paste it in.
4. Click **Deploy**.

## Step 3 — Add your secret key
1. Go back to the Worker page → **Settings** → **Variables and Secrets**.
2. Click **Add** and create a **Secret** (not plain text):
   - **Name:** `ANTHROPIC_API_KEY`  (or `OPENAI_API_KEY` if you're using OpenAI)
   - **Value:** your key (e.g. `sk-ant-...`)
3. *(Optional)* Add a plain variable **`MODEL`** = `claude-sonnet-4-6` (Claude) or `gpt-4o-mini` (OpenAI).
4. Click **Save and deploy**.

## Step 4 — Copy your Worker URL
On the Worker's page you'll see its address, like:

```
https://ielts-ai.YOUR-NAME.workers.dev
```

Copy it.

## Step 5 — Tell the app to use it
1. Open **`app.js`** in this folder.
2. Near the top of the AI section, find this line:

   ```js
   const AI_PROXY_URL = "";
   ```

3. Paste your Worker URL inside the quotes:

   ```js
   const AI_PROXY_URL = "https://ielts-ai.YOUR-NAME.workers.dev";
   ```

4. Save and re-upload `app.js` to wherever the app is hosted.

**Done!** Now the app shows the improved answer with no key prompt — the ⚙ API key button disappears automatically.

---

## Step 6 (recommended) — Lock it to your site
By default anyone who knows your Worker URL could use your key. To stop that:

1. Worker → **Settings → Variables and Secrets** → add a plain variable
   **`ALLOWED_ORIGIN`** = your site's address, e.g. `https://yourname.github.io`
2. **Save and deploy.**

Now only your site's pages can use the worker. (This blocks other websites; it won't stop someone determined with developer tools, so also consider a spending cap on your AI account — see below.)

---

## Keeping costs under control
- **Anthropic:** Console → *Billing/Limits* → set a monthly **usage limit**.
- **OpenAI:** Platform → *Settings → Limits* → set a **monthly budget**.
- Each rewrite is short (~1,300 tokens out), so costs are small, but a cap protects you.

## Troubleshooting
- **"No API key set on the server"** → you missed Step 3, or named the secret wrong.
- **"This proxy is locked to another site"** → your `ALLOWED_ORIGIN` doesn't exactly match the site URL (check `https://` and no trailing slash).
- **401 / invalid key** → the key value is wrong or was revoked.
- **429 / quota** → you've hit a rate limit or run out of balance.
- Nothing happens / network error → make sure the app is opened from a real web address (https://…), not a `file://…` page.
