import { Section } from "@/components/ui/Section";

export function Location() {
  return (
    <Section id="location" tone="linen-muted" maxWidth="2xl">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-16 items-start">
        <div>
          <p className="font-body text-xs tracking-ultra-wide uppercase text-bronze mb-4">
            Find Us
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-ink leading-tight tracking-tight mb-8">
            We&apos;re in<br />Shoreditch.
          </h2>

          <address className="not-italic space-y-1 mb-8">
            <p className="font-body text-lg text-ink font-medium">14 Corsham Street</p>
            <p className="font-body text-base text-ink-muted">Shoreditch, London EC1Y 8JT</p>
          </address>

          <div className="space-y-4 mb-10">
            <div>
              <p className="font-body text-xs tracking-widest uppercase text-bronze mb-1">By Tube</p>
              <p className="font-body text-sm text-ink-dark">
                Old Street (Northern line), 4-minute walk south on City Road.
              </p>
            </div>
            <div>
              <p className="font-body text-xs tracking-widest uppercase text-bronze mb-1">By Bus</p>
              <p className="font-body text-sm text-ink-dark">
                Stops 55, 243 on Old Street. Alight at Corsham Street junction.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <a
              href="https://maps.google.com/?q=14+Corsham+Street+Shoreditch+London"
              target="_blank"
              rel="noopener noreferrer"
              id="google-maps-link"
              className="inline-block font-body text-sm tracking-widest uppercase border border-bronze text-bronze px-6 py-3 hover:bg-bronze hover:text-linen transition-colors duration-200"
            >
              Open in Google Maps
            </a>
            <a
              href="tel:+442071234567"
              className="inline-block font-body text-sm tracking-widest uppercase border border-border-ink text-ink-muted px-6 py-3 hover:border-ink hover:text-ink transition-colors duration-200"
            >
              Call Us: +44 207 123 4567
            </a>
          </div>
        </div>

        <div className="relative h-[400px] lg:h-[500px] overflow-hidden border border-border-ink">
          <iframe
            title="Ember & Ground location map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2482.268929959714!2d-0.08873362333076706!3d51.52575167181756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761ca7ab3b2b51%3A0x5b1e28f34ea7e21b!2sCorsham%20St%2C%20London%20EC1Y%208JT!5e0!3m2!1sen!2suk!4v1695123456789!5m2!1sen!2suk"
            width="100%"
            height="100%"
            className="map-embed"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </Section>
  );
}
