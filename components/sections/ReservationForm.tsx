"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { reservationSchema, ReservationInput } from "@/lib/reservationSchema";
import { Section } from "@/components/ui/Section";

type Status = "idle" | "submitting" | "success" | "error";

const TIME_SLOTS = [
  "17:30", "18:00", "18:30", "19:00", "19:30",
  "20:00", "20:30", "21:00", "21:30", "22:00",
];

interface FieldProps {
  label: string;
  id: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}

function Field({ label, id, error, required, children }: FieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block font-body text-xs tracking-widest uppercase text-smoke mb-2"
      >
        {label}
        {required && <span className="text-brass ml-1">*</span>}
      </label>
      {children}
      {error && (
        <p className="font-body text-xs text-white mt-1.5" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

const inputClass = `
  w-full bg-charcoal-700 border border-charcoal-600 text-cream font-body text-sm px-4 py-3
  focus:outline-none focus:border-brass transition-colors duration-200
  placeholder:text-smoke-dark
`;

export function ReservationForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReservationInput>({
    resolver: zodResolver(reservationSchema) as any,
    defaultValues: { party_size: "2", _honeypot: "" },
  });

  const onSubmit = async (data: ReservationInput) => {
    setStatus("submitting");
    setServerError("");

    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok || !json.success) {
        setServerError(json.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("success");
      reset();
    } catch {
      setServerError("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <Section id="reservations" tone="oxblood">
        <div className="max-w-xl mx-auto text-center py-12">
          <div className="w-12 h-px bg-brass mx-auto mb-8" />
          <h2 className="font-display text-4xl font-bold text-cream mb-4">
            We&apos;ll See You Soon.
          </h2>
          <p className="font-body text-base text-smoke-light leading-relaxed mb-8">
            Your reservation request has been received. We&apos;ll confirm via email within two hours.
            If you don&apos;t hear from us, please call us directly.
          </p>
          <a
            href="tel:+442071234567"
            className="font-body text-sm tracking-widest uppercase text-brass border border-brass px-6 py-3 hover:bg-brass hover:text-charcoal transition-colors duration-200 inline-block"
          >
            +44 207 123 4567
          </a>
          <button
            onClick={() => setStatus("idle")}
            className="block mx-auto mt-4 font-body text-xs tracking-widest uppercase text-smoke hover:text-cream transition-colors duration-200"
          >
            Make another reservation
          </button>
        </div>
      </Section>
    );
  }

  return (
    <Section id="reservations" tone="oxblood">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-16 lg:gap-24">
        <div>
          <p className="font-body text-xs tracking-ultra-wide uppercase text-brass mb-4">
            Book a Table
          </p>
          <h2 className="font-display text-5xl md:text-6xl font-bold text-cream leading-tight tracking-tight mb-8">
            Reserve at<br />
            <em className="not-italic text-brass">Ember.</em>
          </h2>

          <div className="space-y-6 font-body text-sm text-smoke-light leading-relaxed">
            <p>
              We hold 26 covers across the dining room and three seats at the kitchen counter.
              The counter seats are first-come, first-served — let us know if that&apos;s your preference.
            </p>
            <p>
              For parties of 7 or more, please call us directly.
              Cancellations within 24 hours may incur a £15/head charge.
            </p>
            <div className="pt-4 border-t border-charcoal-600">
              <p className="text-xs tracking-widest uppercase text-smoke mb-1">Steakhouse Hours</p>
              <p>Tue–Thu: 18:00 — 23:00</p>
              <p>Fri–Sat: 17:30 — midnight</p>
              <p>Sun: 17:00 — 22:00</p>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          aria-label="Reservation request form"
          className="space-y-6"
        >
          <div aria-hidden="true" className="absolute opacity-0 pointer-events-none h-0 overflow-hidden">
            <label htmlFor="website">Leave this blank</label>
            <input
              id="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              {...register("_honeypot")}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Field label="Full Name" id="res-name" error={errors.name?.message} required>
              <input
                id="res-name"
                type="text"
                autoComplete="name"
                placeholder="Jane Smith"
                className={inputClass}
                {...register("name")}
              />
            </Field>

            <Field label="Party Size" id="res-party" error={errors.party_size?.message} required>
              <input
                id="res-party"
                type="number"
                min={1}
                max={20}
                className={inputClass}
                {...register("party_size")}
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Field label="Email" id="res-email" error={errors.email?.message} required>
              <input
                id="res-email"
                type="email"
                autoComplete="email"
                placeholder="jane@example.com"
                className={inputClass}
                {...register("email")}
              />
            </Field>

            <Field label="Phone" id="res-phone" error={errors.phone?.message} required>
              <input
                id="res-phone"
                type="tel"
                autoComplete="tel"
                placeholder="+44 7700 000000"
                className={inputClass}
                {...register("phone")}
              />
            </Field>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Field label="Date" id="res-date" error={errors.date?.message} required>
              <input
                id="res-date"
                type="date"
                className={inputClass}
                min={new Date().toISOString().split("T")[0]}
                suppressHydrationWarning
                {...register("date")}
              />
            </Field>

            <Field label="Preferred Time" id="res-time" error={errors.time?.message} required>
              <select
                id="res-time"
                className={`${inputClass} cursor-pointer`}
                {...register("time")}
                defaultValue=""
              >
                <option value="" disabled>Select a time</option>
                {TIME_SLOTS.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </Field>
          </div>

          <Field label="Special Requests" id="res-message" error={errors.message?.message}>
            <textarea
              id="res-message"
              rows={4}
              placeholder="Allergies, dietary requirements, occasions, seating preferences…"
              className={`${inputClass} resize-none`}
              {...register("message")}
            />
          </Field>

          {serverError && (
            <div role="alert" className="border border-white/20 p-4 bg-white/5">
              <p className="font-body text-sm text-white">{serverError}</p>
            </div>
          )}

          <button
            id="reservation-submit-btn"
            type="submit"
            disabled={status === "submitting"}
            className={`
              w-full font-body text-sm tracking-widest uppercase py-4 transition-colors duration-200
              ${status === "submitting"
                ? "bg-charcoal-600 text-smoke cursor-not-allowed"
                : "bg-brass text-charcoal hover:bg-brass-light"
              }
            `}
          >
            {status === "submitting" ? "Sending…" : "Request Reservation"}
          </button>

          <p className="font-body text-xs text-smoke text-center">
            Submitting this form sends your request — it is not a confirmed booking until you receive our email.
          </p>
        </form>
      </div>
    </Section>
  );
}
