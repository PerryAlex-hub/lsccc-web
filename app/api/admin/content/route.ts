import { revalidatePath, revalidateTag } from "next/cache";
import { requireUser } from "@/lib/auth/session";
import { authFailure, authResponse, readAuthBody } from "@/lib/auth/http";
import { readAdminContent } from "@/lib/cms/read";
import { writeContent } from "@/lib/cms/write";
import { AuthError } from "@/lib/auth/errors";

export async function GET() {
  try {
    await requireUser();
    return authResponse({ state: await readAdminContent() });
  } catch (error) {
    if (!(error instanceof AuthError)) {
      console.error("Content request failed", {
        name: error instanceof Error ? error.name : "Unknown",
        code:
          typeof error === "object" && error && "code" in error
            ? error.code
            : undefined,
      });
    }
    return authFailure(error);
  }
}

export async function POST(request: Request) {
  try {
    const user = await requireUser();
    await writeContent(user.id, await readAuthBody(request, 100000));
    revalidateTag("public-content", { expire: 0 });
    revalidatePath("/", "layout");
    return authResponse({
      message: "Changes saved. Published updates are now live.",
      state: await readAdminContent(),
    });
  } catch (error) {
    if (!(error instanceof AuthError)) {
      console.error("Content mutation failed", {
        name: error instanceof Error ? error.name : "Unknown",
        code:
          typeof error === "object" && error && "code" in error
            ? error.code
            : undefined,
      });
    }
    return authFailure(error);
  }
}
