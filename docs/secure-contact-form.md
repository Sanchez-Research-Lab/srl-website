# Secure Contact Form Setup

The website is static, so the form must not submit directly to Web3Forms from the browser. Direct browser submission exposes the Web3Forms access key and lets bots bypass the website and CAPTCHA.

This setup uses:

- hCaptcha in the browser
- a Cloudflare Worker at `/api/contact`
- server-side hCaptcha verification
- a honeypot field
- basic per-IP rate limiting
- Web3Forms forwarding with the access key stored as a Worker secret

## Required Setup

1. Revoke the old Web3Forms access key that was committed in site history.
2. Create a new Web3Forms access key.
3. Create an hCaptcha site for `sanchezresearchlab.com`.
4. Replace every `PASTE_HCAPTCHA_SITE_KEY_HERE` value in the HTML with the public hCaptcha site key.
5. Deploy `workers/contact-form-worker.js` to Cloudflare Workers.
6. Add these encrypted Worker secrets:

```sh
wrangler secret put HCAPTCHA_SECRET
wrangler secret put WEB3FORMS_ACCESS_KEY
```

7. Configure the Worker route for:

```text
sanchezresearchlab.com/api/contact
www.sanchezresearchlab.com/api/contact
```

Use `workers/wrangler.toml.example` as the starting point.

## Why This Stops The Spam Pattern

The old implementation put the Web3Forms access key in public HTML. Bots could scrape that key and post directly to Web3Forms every few seconds, without loading the website or solving CAPTCHA.

The new implementation keeps the Web3Forms key private in Cloudflare. The Worker rejects submissions unless the hCaptcha token verifies server-side, the request comes from the allowed site origin, the honeypot is empty, the fields are valid, and the IP is not submitting too frequently.
