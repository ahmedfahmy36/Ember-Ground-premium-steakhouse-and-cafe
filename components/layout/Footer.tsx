export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className=" border-t border-charcoal-600">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="mb-4">
              <span className="font-display text-2xl font-bold text-cream block">Ember</span>
              <span className="font-body text-xs tracking-ultra-wide uppercase text-brass">&amp; Ground</span>
            </div>
            <p className="font-body text-sm text-smoke leading-relaxed">
              Wood-fired steakhouse &amp; serious café.<br />
              Old Street, London.
            </p>
          </div>

          <div>
            <h3 className="font-body text-xs tracking-widest uppercase text-brass mb-4">Find Us</h3>
            <address className="not-italic font-body text-sm text-smoke leading-loose">
              14 Corsham Street<br />
              Shoreditch, London<br />
              EC1Y 8JT<br />
              <a
                href="tel:+442071234567"
                className="hover:text-cream transition-colors duration-200 mt-1 block"
              >
                +44 207 123 4567
              </a>
              <a
                href="mailto:hello@emberandground.co.uk"
                className="hover:text-cream transition-colors duration-200"
              >
                hello@emberandground.co.uk
              </a>
            </address>
          </div>

          <div>
            <h3 className="font-body text-xs tracking-widest uppercase text-brass mb-4">Follow</h3>
            <div className="flex flex-col gap-2">
              {[
                { label: "Instagram", href: "https://instagram.com" },
                { label: "Reservations", href: "#reservations" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="font-body text-sm text-smoke hover:text-cream transition-colors duration-200 tracking-wide"
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-charcoal-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="font-body text-xs text-smoke-dark">
            &copy; {year} Ember &amp; Ground Ltd. All rights reserved.
          </p>
          <p className="font-body text-xs text-smoke-dark">
            Shoreditch, London &mdash; Open Tuesday to Sunday
          </p>
        </div>
      </div>
    </footer>
  );
}
