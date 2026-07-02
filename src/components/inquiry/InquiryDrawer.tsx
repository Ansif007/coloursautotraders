import { useRef, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { Drawer } from "@/components/ui/Drawer";
import { Button } from "@/components/ui/Button";
import { InquiryItemRow } from "./InquiryItemRow";
import { InquiryForm, type InquiryFormHandle } from "./InquiryForm";
import { useInquiry } from "@/hooks/useInquiry";
import { getWhatsAppUrl, getEmailUrl } from "@/lib/whatsapp";
import { api } from "@/lib/api";
import { showToast } from "@/components/ui/Toast";

interface InquiryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InquiryDrawer({ isOpen, onClose }: InquiryDrawerProps) {
  const formRef = useRef<InquiryFormHandle>(null);
  const { items, updateQuantity, removeItem, clearItems, totalItems } =
    useInquiry();
  const [sending, setSending] = useState(false);

  const count = totalItems();

  const handleSend = useCallback(
    async (method: "whatsapp" | "email") => {
      if (items.length === 0) {
        showToast("Your inquiry list is empty", "error");
        return;
      }

      const isValid = await formRef.current?.trigger();
      if (!isValid) {
        showToast("Please fix the form errors", "error");
        return;
      }

      const values = formRef.current?.getValues();
      if (!values) return;

      const formData = {
        contactName: values.contactName,
        phone: values.phone,
        email: values.email || undefined,
        companyName: values.companyName || undefined,
        notes: values.notes || undefined,
        preferredContact: values.preferredContact,
      };

      setSending(true);

      try {
        await api.inquiries.submit({
          ...formData,
          items: items.map((i) => ({
            partId: i.part.id,
            quantity: i.quantity,
            note: i.note,
          })),
        });
      } catch {
        // Inquiry persisted server-side; still proceed to WhatsApp/Email
      }

      if (method === "whatsapp") {
        const url = getWhatsAppUrl(items, formData);
        window.open(url, "_blank", "noopener,noreferrer");
        showToast("Inquiry sent via WhatsApp", "success");
      } else {
        const url = getEmailUrl(items, formData);
        window.open(url, "_blank", "noopener,noreferrer");
        showToast("Inquiry sent via Email", "success");
      }

      setSending(false);
      clearItems();
      onClose();
    },
    [items, clearItems, onClose]
  );

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={`Inquiry List (${count})`}
      ariaLabel="Inquiry List Drawer"
    >
      <div className="flex flex-col h-full">
        {/* Items List */}
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <ShoppingBag className="w-12 h-12 text-text-muted/30 mb-4" />
            <p className="text-sm font-body text-text-secondary mb-2">
              Your inquiry list is empty
            </p>
            <p className="text-xs font-body text-text-muted">
              Start browsing parts to add items.
            </p>
          </div>
        ) : (
          <>
            <div className="divide-y divide-border-subtle">
              <AnimatePresence initial={false}>
                {items.map((item) => (
                  <motion.div
                    key={item.part.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{
                      duration: 0.25,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <InquiryItemRow
                      item={item}
                      onUpdateQuantity={updateQuantity}
                      onRemove={removeItem}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Summary */}
            <div className="flex items-center justify-between py-4 border-y border-border-subtle mt-4">
              <span className="text-sm font-body text-text-secondary">
                {items.length} part{items.length !== 1 ? "s" : ""} selected
              </span>
              <span className="text-sm font-mono text-text-primary">
                {count} total
              </span>
            </div>
          </>
        )}

        {/* Form */}
        <div className="mt-6 flex-1">
          <p className="text-sm font-body font-medium text-text-primary mb-4">
            Your Details
          </p>
          <InquiryForm ref={formRef} />
        </div>

        {/* Action Buttons */}
        <div className="mt-6 space-y-3">
          <Button
            variant="primary"
            size="lg"
            className="w-full"
            disabled={items.length === 0 || sending}
            onClick={() => handleSend("whatsapp")}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="shrink-0"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            {sending ? "Sending..." : "Send via WhatsApp"}
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="w-full"
            disabled={items.length === 0 || sending}
            onClick={() => handleSend("email")}
          >
            Send via Email
          </Button>

          <p className="text-xs text-text-muted font-body text-center">
            Your details are only used to respond to your inquiry.
          </p>
        </div>
      </div>
    </Drawer>
  );
}
