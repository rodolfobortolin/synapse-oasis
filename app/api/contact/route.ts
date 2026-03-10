import { NextRequest, NextResponse } from "next/server";

const POSTMARK_TOKEN = process.env.POSTMARK_SERVER_TOKEN || "";
const TO_EMAIL = "contact@synapseoasis.com";
const FROM_EMAIL = "contact@synapseoasis.com";

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

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
        ReplyTo: email,
        Subject: `[SynapseOasis] Contact from ${name}`,
        TextBody: `Name: ${name}\nEmail: ${email}\n\n${message}`,
        HtmlBody: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><hr/><p>${message.replace(/\n/g, "<br/>")}</p>`,
        MessageStream: "outbound",
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Postmark error:", text);
      return NextResponse.json(
        { error: "Failed to send message." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Contact API error:", e);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
