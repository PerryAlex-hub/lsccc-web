import { requireUser } from "@/lib/auth/session";
import { listTeam, inviteStaff, changeAccess } from "@/lib/auth/team";
import { authFailure, authResponse, readAuthBody } from "@/lib/auth/http";

export async function GET() {
  try {
    await requireUser(true);
    return authResponse(await listTeam());
  } catch (error) {
    return authFailure(error);
  }
}

export async function POST(request: Request) {
  try {
    const user = await requireUser(true);
    const input = await readAuthBody(request);
    return authResponse(await inviteStaff(user.id, input));
  } catch (error) {
    return authFailure(error);
  }
}

export async function PATCH(request: Request) {
  try {
    const user = await requireUser(true);
    const input = await readAuthBody(request);
    return authResponse(await changeAccess(user.id, input));
  } catch (error) {
    return authFailure(error);
  }
}
