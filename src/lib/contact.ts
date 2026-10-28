export interface Inquiry {
  name: string;
  phone: string;
  service: string;
  message: string;
  website: string;
}

export function validateInquiry(input: Inquiry): string | null {
  if (input.website.trim()) return "We could not validate this request. Please call or email us directly.";
  if (input.name.trim().length < 2 || input.name.length > 120) return "Please enter your name (2–120 characters).";
  const digits = input.phone.replace(/\D/g, "");
  if (digits.length < 7 || digits.length > 15 || input.phone.length > 40) return "Please enter a phone number we can reach you at.";
  if (input.service.length > 120) return "Please choose a service from the list.";
  if (input.message.length > 4000) return "Please keep your message under 4,000 characters.";
  return null;
}

export function buildEmailDraft(recipient: string, input: Inquiry): string {
  const error = validateInquiry(input);
  if (error) throw new Error(error);
  const subject = `Service request: ${input.service || "General question"}`;
  const body = `Name: ${input.name.trim()}\nPhone: ${input.phone.trim()}\nService needed: ${input.service || "Not sure yet"}\n\n${input.message.trim()}`;
  return `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function isAcceptedResponse(value: unknown): value is { ok: true } {
  return typeof value === "object" && value !== null && "ok" in value && value.ok === true;
}
