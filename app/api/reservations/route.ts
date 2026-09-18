import { NextRequest, NextResponse } from "next/server";
import { reservationSchema } from "@/lib/reservationSchema";
import { insertReservation } from "@/lib/db";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Simple in-memory rate limiting: max 5 requests per IP per minute
const rateLimitMap = new Map<string, { count: number; reset: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.reset) {
    rateLimitMap.set(ip, { count: 1, reset: now + 60_000 });
    return true;
  }

  if (entry.count >= 5) return false;

  entry.count++;
  return true;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  // Rate limiting
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { success: false, error: "Too many requests. Please wait a moment." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request body." },
      { status: 400 }
    );
  }

  // Server-side validation
  const result = reservationSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      {
        success: false,
        errors: result.error.flatten().fieldErrors,
      },
      { status: 422 }
    );
  }

  const { _honeypot: _hp, ...data } = result.data;

  try {
    const id = await insertReservation({
      name: data.name,
      email: data.email,
      phone: data.phone,
      date: data.date,
      time: data.time,
      party_size: data.party_size,
      message: data.message ?? "",
    });

    // Send confirmation email
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      await transporter.sendMail({
        from: `"Ember & Ground" <${process.env.EMAIL_USER}>`,
        to: data.email,
        subject: "Reservation Confirmed - Ember & Ground",
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1C1A18;">
            <h1 style="color: #6B1A1A;">Reservation Confirmed!</h1>
            <p>Hi ${data.name},</p>
            <p>Your table at Ember & Ground is confirmed. We look forward to hosting you for:</p>
            <ul style="background-color: #FAF8F5; padding: 20px; border-radius: 4px; list-style-type: none; margin: 20px 0;">
              <li><strong>Date:</strong> ${data.date}</li>
              <li><strong>Time:</strong> ${data.time}</li>
              <li><strong>Party Size:</strong> ${data.party_size} guests</li>
              ${data.message ? `<li><strong>Special Requests:</strong> ${data.message}</li>` : ""}
            </ul>
            <p>If you need to make any changes or cancel, please call us at +44 207 123 4567.</p>
            <br/>
            <p style="font-size: 12px; color: #9E9890;">Ember & Ground, 14 Corsham Street, London</p>
          </div>
        `,
      });
    } else {
      console.warn("EMAIL_USER or EMAIL_PASS is not set. Email was not sent.");
    }

    return NextResponse.json({ success: true, id }, { status: 201 });
  } catch (err) {
    console.error("Reservation insert error:", err);
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
