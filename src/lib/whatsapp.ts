import type { InquiryItem, InquiryForm } from "@/types";

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || "8921211589";

function buildWhatsAppMessage(
  items: InquiryItem[],
  form: InquiryForm
): string {
  const lines: string[] = [];
  lines.push("*Colours Auto Traders Inquiry*");
  lines.push("");
  lines.push(`👤 *Contact:* ${form.contactName}`);
  lines.push(`🏢 *Company:* ${form.companyName || "N/A"}`);
  lines.push(`📞 *Phone:* ${form.phone}`);
  lines.push(`📧 *Email:* ${form.email || "N/A"}`);
  lines.push("");
  lines.push("📋 *Parts Requested:*");
  lines.push("─────────────────────");
  for (const item of items) {
    lines.push(`• ${item.quantity}x ${item.part.name}`);
    lines.push(`  Part #: ${item.part.partNumber}`);
    if (item.part.oemNumbers[0]) {
      lines.push(`  OEM: ${item.part.oemNumbers[0]}`);
    }
    if (item.note) {
      lines.push(`  Note: ${item.note}`);
    }
    lines.push("");
  }
  lines.push("📝 *General Notes:*");
  lines.push(form.notes || "None");
  lines.push("");
  lines.push("Sent via Colours Auto Traders");

  return lines.join("\n");
}

export function getWhatsAppUrl(
  items: InquiryItem[],
  form: InquiryForm
): string {
  const message = buildWhatsAppMessage(items, form);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function getEmailUrl(
  items: InquiryItem[],
  form: InquiryForm
): string {
  const subject = "Parts Inquiry — Colours Auto Traders";
  const body = buildWhatsAppMessage(items, form);
  return `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
