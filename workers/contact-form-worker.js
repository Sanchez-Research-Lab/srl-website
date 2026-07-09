const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
const HCAPTCHA_VERIFY_ENDPOINT = 'https://hcaptcha.com/siteverify';
const DEFAULT_ALLOWED_ORIGINS = ['https://sanchezresearchlab.com', 'https://www.sanchezresearchlab.com'];
const recentRequests = new Map();

function jsonResponse(body, status = 200, origin = '') {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'access-control-allow-origin': origin,
      'access-control-allow-methods': 'POST, OPTIONS',
      'access-control-allow-headers': 'content-type',
      'vary': 'Origin'
    }
  });
}

function getAllowedOrigins(env) {
  if (!env.ALLOWED_ORIGINS) {
    return DEFAULT_ALLOWED_ORIGINS;
  }

  return env.ALLOWED_ORIGINS.split(',').map((origin) => origin.trim()).filter(Boolean);
}

function getClientIp(request) {
  return request.headers.get('cf-connecting-ip') || request.headers.get('x-forwarded-for') || 'unknown';
}

function isRateLimited(ip) {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000;
  const maxRequests = 3;
  const timestamps = (recentRequests.get(ip) || []).filter((timestamp) => now - timestamp < windowMs);

  if (timestamps.length >= maxRequests) {
    recentRequests.set(ip, timestamps);
    return true;
  }

  timestamps.push(now);
  recentRequests.set(ip, timestamps);
  return false;
}

function getString(formData, key) {
  const value = formData.get(key);
  return typeof value === 'string' ? value.trim() : '';
}

async function verifyCaptcha({ token, remoteIp, env }) {
  const verifyData = new FormData();
  verifyData.set('secret', env.HCAPTCHA_SECRET);
  verifyData.set('response', token);

  if (remoteIp && remoteIp !== 'unknown') {
    verifyData.set('remoteip', remoteIp);
  }

  const response = await fetch(HCAPTCHA_VERIFY_ENDPOINT, {
    method: 'POST',
    body: verifyData
  });

  const result = await response.json();
  return Boolean(result.success);
}

async function submitToWeb3Forms({ formData, env }) {
  const payload = {
    access_key: env.WEB3FORMS_ACCESS_KEY,
    from_name: getString(formData, 'from_name') || 'Sanchez Research Lab Website',
    subject: getString(formData, 'subject') || 'New message from SRL website',
    name: getString(formData, 'name'),
    email: getString(formData, 'email'),
    phone: getString(formData, 'phone'),
    message_subject: getString(formData, 'message_subject'),
    message: getString(formData, 'message'),
    form_type: getString(formData, 'form_type')
  };

  const response = await fetch(WEB3FORMS_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(payload)
  });

  const result = await response.json().catch(() => ({}));
  return response.ok && result.success;
}

export default {
  async fetch(request, env) {
    const allowedOrigins = getAllowedOrigins(env);
    const origin = request.headers.get('origin') || '';
    const responseOrigin = allowedOrigins.includes(origin) ? origin : allowedOrigins[0];

    if (request.method === 'OPTIONS') {
      return jsonResponse({ success: true }, 204, responseOrigin);
    }

    if (request.method !== 'POST') {
      return jsonResponse({ success: false, message: 'Method not allowed.' }, 405, responseOrigin);
    }

    if (!allowedOrigins.includes(origin)) {
      return jsonResponse({ success: false, message: 'Origin not allowed.' }, 403, responseOrigin);
    }

    if (!env.HCAPTCHA_SECRET || !env.WEB3FORMS_ACCESS_KEY) {
      return jsonResponse({ success: false, message: 'Form service is not configured.' }, 500, responseOrigin);
    }

    const ip = getClientIp(request);
    if (isRateLimited(ip)) {
      return jsonResponse({ success: false, message: 'Too many submissions. Please try again later.' }, 429, responseOrigin);
    }

    const formData = await request.formData();
    const honeypot = getString(formData, 'website');
    const name = getString(formData, 'name');
    const email = getString(formData, 'email');
    const message = getString(formData, 'message');
    const captchaToken = getString(formData, 'h-captcha-response');
    const startedAt = Number(getString(formData, 'started_at'));

    if (honeypot) {
      return jsonResponse({ success: true }, 200, responseOrigin);
    }

    if (!name || !email || !message || !captchaToken) {
      return jsonResponse({ success: false, message: 'Missing required fields.' }, 400, responseOrigin);
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return jsonResponse({ success: false, message: 'Invalid email address.' }, 400, responseOrigin);
    }

    if (message.length > 4000 || name.length > 120 || email.length > 254) {
      return jsonResponse({ success: false, message: 'Message is too long.' }, 400, responseOrigin);
    }

    if (!startedAt || Date.now() - startedAt < 3000) {
      return jsonResponse({ success: false, message: 'Please try again.' }, 400, responseOrigin);
    }

    const captchaOk = await verifyCaptcha({ token: captchaToken, remoteIp: ip, env });
    if (!captchaOk) {
      return jsonResponse({ success: false, message: 'Human verification failed.' }, 400, responseOrigin);
    }

    const submitted = await submitToWeb3Forms({ formData, env });
    if (!submitted) {
      return jsonResponse({ success: false, message: 'Unable to send message.' }, 502, responseOrigin);
    }

    return jsonResponse({ success: true }, 200, responseOrigin);
  }
};
