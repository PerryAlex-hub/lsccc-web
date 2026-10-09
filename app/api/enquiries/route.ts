import { validateEnquiry } from "@/lib/enquiries/schema";
import { isAllowedOrigin } from "@/lib/enquiries/origin";
import {
  deliverEnquiry,
  emailDeliveryConfigured,
} from "@/lib/enquiries/delivery";

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host") || new URL(request.url).host;
  if (!isAllowedOrigin(origin, host)) {
    return Response.json(
      { message: "Please submit the form from this website." },
      { status: 403 },
    );
  }
  let input: unknown;
  try {
    const body = await request.text();
    if (body.length > 20000) {
      return Response.json(
        { message: "Your enquiry is too long. Please shorten your message." },
        { status: 413 },
      );
    }
    input = JSON.parse(body);
  } catch {
    return Response.json(
      { message: "Please check your enquiry and try again." },
      { status: 400 },
    );
  }
  const validation = validateEnquiry(input);
  if (!validation.valid) {
    return Response.json(
      {
        message: "Please check the highlighted fields.",
        errors: validation.errors,
      },
      { status: 422 },
    );
  }
  if (!emailDeliveryConfigured()) {
    return Response.json(
      {
        message:
          "Online enquiries are not available yet. Your message has not been sent. For general government feedback, please use Lagos State Citizens Gate.",
      },
      { status: 503 },
    );
  }
  try {
    await deliverEnquiry(validation.data);
    return Response.json({
      message:
        "Your enquiry has been sent to the centre. Thank you for getting in touch.",
    });
  } catch {
    return Response.json(
      {
        message:
          "We could not send your enquiry. Your message is still here. Please try again later or use Lagos State Citizens Gate.",
      },
      { status: 502 },
    );
  }
}
