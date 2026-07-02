import { useInquiryStore } from "@/store/inquiryStore";

export function useInquiry() {
  const items = useInquiryStore((s) => s.items);
  const addItem = useInquiryStore((s) => s.addItem);
  const removeItem = useInquiryStore((s) => s.removeItem);
  const updateQuantity = useInquiryStore((s) => s.updateQuantity);
  const clearItems = useInquiryStore((s) => s.clearItems);
  const totalItems = useInquiryStore((s) => s.totalItems);

  return { items, addItem, removeItem, updateQuantity, clearItems, totalItems };
}
