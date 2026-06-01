import { NextRequest, NextResponse } from "next/server";

const POSTMARK_TOKEN = process.env.POSTMARK_SERVER_TOKEN || "";
const TO_EMAIL = "contact@synapseoasis.com";
const FROM_EMAIL = "contact@synapseoasis.com";

// ── Limits & validation ──────────────────────────────────────────────────
const MAX_NAME = 200;
const MAX_EMAIL = 320;
const MAX_MESSAGE = 5000;
// Pragmatic email check (not RFC-perfect; rejects the obviously invalid + header/HTML-injection chars).
const EMAIL_RE = /^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]+$/;

// ── Basic in-memory, per-IP rate limiting ────────────────────────────────
// Note: in-memory state is per server instance and resets on cold start. It is a
// cheap first line of defense against form spam/abuse; pair with a CDN/WAF rule or a
// shared store (Redis/Upstash) for hard guarantees in multi-instance deploys.
const RATE_LIMIT = 5; // requests
const RATE_WINDOW_MS = 10 * 60 * 1000; // per 10 minutes
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (v.resetAt < now) hits.delete(k);
  }
  const entry = hits.get(ip);
  if (!entry || entry.resetAt < now) {
    hits.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return false;
  }
  entry.count++;
  return entry.count > RATE_LIMIT;
}

function clientIp(req: NextRequest): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: NextRequest) {
  try {
    if (rateLimited(clientIp(req))) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429, headers: { "Retry-After": "600" } }
      );
    }

    let body: unknown;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    const { name, email, message } = (body ?? {}) as Record<string, unknown>;

    // Type + presence validation
    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof message !== "string" ||
      !name.trim() ||
      !email.trim() ||
      !message.trim()
    ) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    // Length bounds (prevent abuse / oversized payloads)
    if (name.length > MAX_NAME || email.length > MAX_EMAIL || message.length > MAX_MESSAGE) {
      return NextResponse.json({ error: "One or more fields exceed the allowed length." }, { status: 400 });
    }

    // Email format (also blocks header/HTML-injection characters)
    if (!EMAIL_RE.test(email.trim())) {
      return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
    }

    const cleanName = name.trim();
    const cleanEmail = email.trim();
    const cleanMessage = message.trim();

    const res = await fetch("https://api.postmarkapp.com/email", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-Postmark-Server-Token": POSTMARK_TOKEN,
      },
      body: JSON.stringify({
        From: FROM_EMAIL,
        To: TO_EMAIL,
        ReplyTo: cleanEmail,
        // Strip CR/LF defensively so nothing can be smuggled into the subject line.
        Subject: `[SynapseOasis] Contact from ${cleanName.replace(/[\r\n]+/g, " ")}`,
        TextBody: `Name: ${cleanName}\nEmail: ${cleanEmail}\n\n${cleanMessage}`,
        // HTML-escape every user value before interpolating into the notification email
        // (prevents HTML/script injection into the inbox that receives these messages).
        HtmlBody: `<p><strong>Name:</strong> ${escapeHtml(cleanName)}</p><p><strong>Email:</strong> ${escapeHtml(
          cleanEmail
        )}</p><hr/><p>${escapeHtml(cleanMessage).replace(/\n/g, "<br/>")}</p>`,
        MessageStream: "outbound",
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Postmark error:", text);
      return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Contact API error:", e);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
