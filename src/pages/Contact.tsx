import { Mail, MessageSquare, MapPin, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const WHATSAPP_NUMBER =
  import.meta.env.VITE_WHATSAPP_NUMBER || "8921211589";

const contactDetails = [
  {
    icon: MapPin,
    label: "Address",
    value: "Samkranthi, Perumbaikad, Kottayam, Kerala 686630",
  },
  {
    icon: MessageSquare,
    label: "WhatsApp",
    value: `+${WHATSAPP_NUMBER}`,
    href: `https://wa.me/${WHATSAPP_NUMBER}`,
  },
  {
    icon: Mail,
    label: "Email",
    value: "inquiries@colorsautotraders.in",
    href: "mailto:inquiries@colorsautotraders.in",
  },
  {
    icon: Clock,
    label: "Response Time",
    value: "We respond to all inquiries within 24 hours.",
  },
];

export function ContactPage() {
  return (
    <main className="min-h-screen pb-16">
      {/* Header */}
      <section className="px-6 pb-12 border-b border-border-subtle">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-xs font-body font-semibold text-text-muted uppercase tracking-[0.2em] mb-4">
            Contact
          </p>
          <h1 className="text-3xl sm:text-4xl font-heading font-black text-text-primary mb-4 tracking-[-0.02em]">
            Get in Touch
          </h1>
          <p className="text-sm font-body text-text-secondary leading-relaxed">
            Send us your parts list or technical queries. We'll get back to you
            with availability and pricing.
          </p>
        </div>
      </section>

      {/* Swiss rule */}
      <div className="h-0.5 bg-accent-amber mx-auto max-w-5xl" />

      <div className="max-w-5xl mx-auto px-6 pt-12 grid lg:grid-cols-5 gap-10">
        {/* Contact Details */}
        <div className="lg:col-span-2 space-y-6">
          {contactDetails.map((d) => {
            const Icon = d.icon;
            const inner = (
              <>
                <div className="w-10 h-10 bg-bg-elevated flex items-center justify-center shrink-0">
                  <Icon className="w-5 h-5 text-accent-amber" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] font-body font-semibold text-text-muted uppercase tracking-[0.15em] mb-0.5">
                    {d.label}
                  </p>
                  <p className="text-xs font-body text-text-primary break-words">
                    {d.value}
                  </p>
                </div>
              </>
            );

            if (d.href) {
              return (
                <a
                  key={d.label}
                  href={d.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-4 bg-bg-surface border border-border-subtle hover:border-accent-amber/40 transition-colors group"
                >
                  {inner}
                </a>
              );
            }

            return (
              <div
                key={d.label}
                className="flex items-start gap-4 p-4 bg-bg-surface border border-border-subtle"
              >
                {inner}
              </div>
            );
          })}

          <div className="pt-2">
            <Link
              to="/catalog"
              className="inline-flex items-center h-11 px-6 bg-accent-amber text-white font-body font-semibold text-xs uppercase tracking-[0.15em] hover:bg-accent-amber/90 transition-colors"
            >
              Browse Catalog
            </Link>
          </div>
        </div>

        {/* Map */}
        <div className="lg:col-span-3">
          <div className="overflow-hidden border border-border-subtle h-[400px] lg:h-full min-h-[320px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d1000!2d76.522!3d9.597!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m2!1s0x3b0628f8f8f8f8f8%3A0x0!2sJGMV%2BGC6%2C%20Samkranthi%2C%20Perumbaikad%2C%20Kerala%20686630!5e1!3m2!1sen!2sin!4v1"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Colors Auto Traders location"
              className="grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
