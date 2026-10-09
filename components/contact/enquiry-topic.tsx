"use client";

import { useSearchParams } from "next/navigation";
import { enquiryTopics } from "@/lib/enquiries/schema";

export function TopicSelect({
  error,
  initialValue = "",
}: {
  error?: string;
  initialValue?: string;
}) {
  return (
    <select
      id="enquiry-topic"
      name="topic"
      defaultValue={initialValue}
      required
      aria-invalid={Boolean(error)}
      aria-describedby={error ? "enquiry-topic-error" : undefined}
      className="form-input"
    >
      <option value="">Select a topic</option>
      {enquiryTopics.map((topic) => (
        <option key={topic.value} value={topic.value}>
          {topic.label}
        </option>
      ))}
    </select>
  );
}

export function EnquiryTopic({ error }: { error?: string }) {
  const params = useSearchParams();
  const requestedTopic = params.get("topic");
  const initialValue =
    enquiryTopics.find((topic) => topic.value === requestedTopic)?.value || "";
  return (
    <TopicSelect key={initialValue} error={error} initialValue={initialValue} />
  );
}
