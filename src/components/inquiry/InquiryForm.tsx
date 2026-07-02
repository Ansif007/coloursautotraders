import { forwardRef, useImperativeHandle } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/Input";

const schema = z.object({
  contactName: z
    .string()
    .min(2, "Full name is required — enter at least 2 characters"),
  phone: z
    .string()
    .min(7, "Phone number is required — include country code"),
  email: z.string().email("Enter a valid email address").optional().or(z.literal("")),
  companyName: z.string().optional(),
  notes: z.string().optional(),
  preferredContact: z.enum(["whatsapp", "email", "call"]),
});

type FormValues = z.infer<typeof schema>;

export interface InquiryFormHandle {
  getValues: () => FormValues;
  trigger: () => Promise<boolean>;
}

export const InquiryForm = forwardRef<InquiryFormHandle>(function InquiryForm(
  _props,
  ref
) {
  const {
    register,
    getValues,
    trigger,
    formState: { errors },
    watch,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: {
      contactName: "",
      phone: "",
      email: "",
      companyName: "",
      notes: "",
      preferredContact: "whatsapp",
    },
  });

  useImperativeHandle(ref, () => ({
    getValues: () => getValues(),
    trigger: () => trigger(),
  }));

  const preferredContact = watch("preferredContact");

  return (
    <form id="inquiry-drawer-form" className="space-y-4" noValidate>
      <Input
        label="Full Name"
        placeholder="John Smith"
        error={errors.contactName?.message}
        {...register("contactName")}
      />

      <Input
        label="Phone Number"
        type="tel"
        placeholder="+1 555 123 4567"
        error={errors.phone?.message}
        {...register("phone")}
      />

      <Input
        label="Company Name (optional)"
        placeholder="ACME Fleet Services"
        {...register("companyName")}
      />

      <Input
        label="Email (optional)"
        type="email"
        placeholder="john@acmefleet.com"
        error={errors.email?.message}
        {...register("email")}
      />

      {/* Preferred Contact */}
      <div className="flex flex-col gap-1.5">
        <label className="text-sm text-text-secondary font-body">
          Preferred Contact
        </label>
        <div className="flex border border-border-subtle rounded-md overflow-hidden">
          {(
            [
              { value: "whatsapp", label: "WhatsApp" },
              { value: "email", label: "Email" },
              { value: "call", label: "Call" },
            ] as const
          ).map((option) => (
            <label
              key={option.value}
              className={`flex-1 cursor-pointer text-center py-2.5 text-sm font-body transition-colors ${
                preferredContact === option.value
                  ? "bg-accent-amber/10 text-accent-amber font-medium"
                  : "text-text-muted hover:text-text-secondary"
              }`}
            >
              <input
                type="radio"
                value={option.value}
                {...register("preferredContact")}
                className="sr-only"
              />
              {option.label}
            </label>
          ))}
        </div>
      </div>

      {/* General Notes */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="inquiry-notes"
          className="text-sm text-text-secondary font-body"
        >
          General Notes
        </label>
        <textarea
          id="inquiry-notes"
          rows={3}
          placeholder="Any additional information for your inquiry..."
          className="px-3 py-2.5 rounded-md font-body text-sm text-text-primary bg-bg-surface border border-border-subtle placeholder:text-text-muted transition-all duration-[var(--duration-base)] focus:outline-none focus:border-accent-amber focus:shadow-[var(--shadow-glow-amber)] resize-y min-h-[80px]"
          {...register("notes")}
        />
      </div>
    </form>
  );
});
