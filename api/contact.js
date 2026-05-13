import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

function classifyLead(remarks = "", info = "") {
  const r = String(remarks).toLowerCase();
  const i = String(info).toLowerCase();
  if (r.includes("template submission") || i.includes("template submission")) return "template";
  if (r.includes("lead magnet") || i.includes("lead magnet")) return "lead_magnet";
  if (r.includes("contact request")) return "contact";
  return "contact";
}

function getEmailContent({ type, username }) {
  const safeName = username || "there";
  if (type === "template") {
    const greeting =
      safeName !== "there" ? `Thanks for sharing, ${safeName}.` : "Thanks for sharing your template.";
    return {
      subject: "We received your template — FossilUI",
      heading: "Your template contribution is in review",
      body: `${greeting} We logged your repository link and will take a look soon.`,
    };
  }
  if (type === "lead_magnet") {
    return {
      subject: "Your FossilUI guide is on the way",
      heading: `Thanks, ${safeName}!`,
      body: "We received your request. We will share the latest FossilUI templates and guides with you shortly.",
    };
  }
  return {
    subject: "Thanks for contacting FossilUI",
    heading: `Thanks, ${safeName}!`,
    body: "We received your message and will get back to you within one business day.",
  };
}

function getEmailImageUrl() {
  if (process.env.EMAIL_IMAGE_URL) return process.env.EMAIL_IMAGE_URL;
  if (process.env.PUBLIC_BASE_URL) {
    return `${process.env.PUBLIC_BASE_URL.replace(/\/$/, "")}/email.jpg`;
  }
  return "https://fossilui.buzz/email.jpg";
}

function buildEmailHtml({ heading, body, imageUrl }) {
  return `
    <div style="margin:0;padding:24px;background:#0a0a0a;font-family:Arial,sans-serif;color:#ffffff;text-align:center;">
      <div style="max-width:600px;margin:0 auto;background:#121212;border:1px solid #2a2a2a;border-radius:14px;padding:28px 22px;">
        <h2 style="margin:0 0 14px 0;font-size:28px;line-height:1.2;">${heading}</h2>
        <p style="margin:0 0 20px 0;font-size:16px;line-height:1.6;color:#d4d4d8;">${body}</p>
        <img src="${imageUrl}" alt="FossilUI" style="max-width:600px;width:100%;height:auto;border-radius:10px;margin:0 0 20px 0;" />
        <p style="margin:0;font-size:14px;line-height:1.5;color:#a1a1aa;">- FossilUI Team</p>
      </div>
    </div>
  `;
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const resendApiKey = process.env.RESEND_API_KEY;

    if (!supabaseUrl || !supabaseServiceRoleKey || !resendApiKey) {
      console.error("Missing required environment variables for /api/contact");
      return res.status(500).json({ error: "Server configuration error" });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);
    const resend = new Resend(resendApiKey);

    const body =
      req.body && typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
    const { username, email, contact, info, remarks, userLocation } = body;

    if (!email || !remarks) {
      return res.status(400).json({ error: "Email and message are required" });
    }

    const { data, error } = await supabase
      .from("leads")
      .insert([
        {
          username,
          email,
          contact,
          info,
          remarks,
          user_location: userLocation,
        },
      ])
      .select();

    if (error) throw error;

    const leadType = classifyLead(remarks, info);
    const emailContent = getEmailContent({ type: leadType, username });
    const emailImageUrl = getEmailImageUrl();
    const mailResult = await resend.emails.send({
      from: process.env.RESEND_FROM || "FossilUI <noreply@tronzlabs.com>",
      to: [email],
      subject: emailContent.subject,
      html: buildEmailHtml({ ...emailContent, imageUrl: emailImageUrl }),
    });
    if (mailResult?.error) {
      throw new Error(mailResult.error.message || "Failed to send confirmation email");
    }

    return res.status(200).json({ success: true, id: data?.[0]?.id || null });
  } catch (err) {
    console.error("Server error:", err);
    return res.status(500).json({ error: "Server error" });
  }
}
