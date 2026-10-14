import {
  acceptInvitation,
  invitationDetails,
  login,
  requestPasswordReset,
  resetDetails,
  resetPassword,
} from "@/lib/auth/service";
import { currentUser, endSession } from "@/lib/auth/session";
import { authFailure, authResponse, readAuthBody } from "@/lib/auth/http";

type Context = { params: Promise<{ action: string }> };

export async function GET(request: Request, context: Context) {
  try {
    const { action } = await context.params;
    if (action === "session") {
      return authResponse({ user: await currentUser() });
    }
    const token = new URL(request.url).searchParams.get("token");
    if (action === "invitation") {
      return authResponse(await invitationDetails(token));
    }
    if (action === "reset-password") {
      return authResponse(await resetDetails(token));
    }
    return authResponse({ message: "Not found." }, 404);
  } catch (error) {
    return authFailure(error);
  }
}

export async function POST(request: Request, context: Context) {
  try {
    const input = await readAuthBody(request);
    const { action } = await context.params;
    if (action === "login") {
      return authResponse(await login(input));
    }
    if (action === "logout") {
      await endSession();
      return authResponse({ message: "Logged out." });
    }
    if (action === "accept-invitation") {
      return authResponse(await acceptInvitation(input));
    }
    if (action === "forgot-password") {
      return authResponse(await requestPasswordReset(input));
    }
    if (action === "reset-password") {
      return authResponse(await resetPassword(input));
    }
    return authResponse({ message: "Not found." }, 404);
  } catch (error) {
    return authFailure(error);
  }
}
