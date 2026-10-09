export const enquiryTopics = [
  { value: "general", label: "General enquiry" },
  { value: "media", label: "Media enquiry" },
  { value: "partnership", label: "Partnership enquiry" },
  { value: "public-information", label: "Public information" },
] as const;

export type Enquiry = {
  name: string;
  email: string;
  topic: string;
  phone: string;
  subject: string;
  message: string;
};

export type EnquiryErrors = Partial<Record<keyof Enquiry, string>>;

export function validateEnquiry(input: unknown): {
  data: Enquiry;
  errors: EnquiryErrors;
  valid: boolean;
} {
  const value =
    input && typeof input === "object" && !Array.isArray(input)
      ? (input as Record<string, unknown>)
      : {};
  const string = (key: keyof Enquiry) =>
    typeof value[key] === "string" ? value[key].trim() : "";
  const data: Enquiry = {
    name: string("name"),
    email: string("email"),
    topic: string("topic"),
    phone: string("phone"),
    subject: string("subject"),
    message: string("message"),
  };
  const errors: EnquiryErrors = {};

  if (!data.name || data.name.length > 120 || /[\r\n]/.test(data.name)) {
    errors.name = "Enter your full name (up to 120 characters).";
  }
  if (
    data.email.length > 254 ||
    !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(data.email)
  ) {
    errors.email = "Enter a valid email address.";
  }
  if (!enquiryTopics.some((topic) => topic.value === data.topic)) {
    errors.topic = "Choose an enquiry topic.";
  }
  if (
    data.phone &&
    (!/^[+\d\s().-]{7,30}$/.test(data.phone) ||
      data.phone.replace(/\D/g, "").length < 7)
  ) {
    errors.phone = "Enter a valid phone number or leave this field empty.";
  }
  if (
    !data.subject ||
    data.subject.length > 200 ||
    /[\r\n]/.test(data.subject)
  ) {
    errors.subject = "Enter a subject (up to 200 characters).";
  }
  if (!data.message || data.message.length > 5000) {
    errors.message = "Enter your message (up to 5,000 characters).";
  }
  return { data, errors, valid: Object.keys(errors).length === 0 };
}
