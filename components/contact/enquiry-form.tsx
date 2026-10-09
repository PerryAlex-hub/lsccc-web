"use client";

import { Suspense, useRef, useState } from "react";
import type { FormEvent } from "react";
import { SectionIntro } from "@/components/ui/section";
import { TextLink } from "@/components/ui/text-link";
import { validateEnquiry } from "@/lib/enquiries/schema";
import type { EnquiryErrors } from "@/lib/enquiries/schema";
import { destinations } from "@/lib/navigation";
import { FormField, FormInput } from "./form-field";
import { EnquiryTopic, TopicSelect } from "./enquiry-topic";

export function EnquiryForm() {
  const [errors, setErrors] = useState<EnquiryErrors>({});
  const [status, setStatus] = useState<{
    message: string;
    success: boolean;
  } | null>(null);
  const [pending, setPending] = useState(false);
  const statusRef = useRef<HTMLDivElement>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) {
      return;
    }
    const form = event.currentTarget;
    const result = validateEnquiry(Object.fromEntries(new FormData(form)));
    setErrors(result.errors);
    setStatus(null);
    if (!result.valid) {
      const name = Object.keys(result.errors)[0];
      form.querySelector<HTMLElement>(`[name="${name}"]`)?.focus();
      return;
    }
    setPending(true);
    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });
      const data = await response.json();
      setErrors(data.errors || {});
      setStatus({
        message:
          data.message || "We could not send your enquiry. Please try again.",
        success: response.ok,
      });
      if (response.ok) {
        form.reset();
      }
    } catch {
      setStatus({
        message:
          "We could not connect. Your message is still here. Please check your connection and try again.",
        success: false,
      });
    } finally {
      setPending(false);
      requestAnimationFrame(() => statusRef.current?.focus());
    }
  }

  return (
    <form
      noValidate
      onSubmit={submit}
      className="flex min-w-0 flex-col gap-6"
      aria-busy={pending}
    >
      <SectionIntro
        eyebrow="GENERAL ENQUIRIES"
        title="How can we help?"
        titleClassName="text-[30px] leading-[1.5] sm:text-[34px]"
      >
        <p className="text-base leading-6 text-muted">
          Choose a topic and send your message to the centre.
        </p>
      </SectionIntro>
      <div className="grid gap-6 sm:grid-cols-2">
        <FormField id="enquiry-name" label="Full name *" error={errors.name}>
          <FormInput
            id="enquiry-name"
            name="name"
            autoComplete="name"
            maxLength={120}
            required
            error={errors.name}
            placeholder="Enter your full name"
          />
        </FormField>
        <FormField
          id="enquiry-email"
          label="Email address *"
          error={errors.email}
        >
          <FormInput
            id="enquiry-email"
            name="email"
            type="email"
            autoComplete="email"
            maxLength={254}
            required
            error={errors.email}
            placeholder="you@example.com"
          />
        </FormField>
        <FormField
          id="enquiry-topic"
          label="Enquiry topic *"
          error={errors.topic}
        >
          <Suspense fallback={<TopicSelect error={errors.topic} />}>
            <EnquiryTopic error={errors.topic} />
          </Suspense>
        </FormField>
        <FormField
          id="enquiry-phone"
          label="Phone number (optional)"
          error={errors.phone}
        >
          <FormInput
            id="enquiry-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            maxLength={30}
            error={errors.phone}
            placeholder="Optional callback number"
          />
        </FormField>
      </div>
      <FormField id="enquiry-subject" label="Subject *" error={errors.subject}>
        <FormInput
          id="enquiry-subject"
          name="subject"
          maxLength={200}
          required
          error={errors.subject}
          placeholder="What is your enquiry about?"
        />
      </FormField>
      <FormField
        id="enquiry-message"
        label="Your message *"
        error={errors.message}
      >
        <textarea
          id="enquiry-message"
          name="message"
          rows={5}
          maxLength={5000}
          required
          aria-invalid={Boolean(errors.message)}
          aria-describedby={
            errors.message
              ? "enquiry-message-error enquiry-privacy"
              : "enquiry-privacy"
          }
          placeholder="Include the details of your general enquiry."
          className="form-input min-h-[156px] resize-y"
        />
      </FormField>
      <p id="enquiry-privacy" className="text-[13px] leading-5 text-muted">
        Only include information needed for your enquiry. Avoid sharing
        sensitive personal details.
      </p>
      <button
        type="submit"
        disabled={pending}
        className="min-h-14 w-full bg-navy px-4 py-4 text-left text-sm font-bold text-white hover:bg-blue disabled:cursor-wait disabled:opacity-70 sm:w-[240px]"
      >
        {pending ? "Sending enquiry…" : "Send enquiry"}{" "}
        <span aria-hidden="true">→</span>
      </button>
      <p className="text-xs leading-[18px] text-muted">* Required fields</p>
      {status && (
        <div
          ref={statusRef}
          tabIndex={-1}
          role={status.success ? "status" : "alert"}
          className={`space-y-3 border p-5 text-sm leading-relaxed ${status.success ? "border-green bg-paper" : "border-border bg-paper"}`}
        >
          <p>{status.message}</p>
          {!status.success && (
            <TextLink href={destinations.citizensGate} className="text-navy">
              Open Citizens Gate <span aria-hidden="true">↗</span>
            </TextLink>
          )}
        </div>
      )}
    </form>
  );
}
