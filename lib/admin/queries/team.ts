"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authRequest, navigateAfterAuth } from "@/lib/auth/client";
import { showAdminToast } from "@/components/admin/toast";

export type Staff = {
  id: string;
  name: string;
  email: string;
  role: "ADMINISTRATOR" | "EDITOR";
  status: "ACTIVE" | "DEACTIVATED";
};

export type Invite = {
  id: string;
  email: string;
  role: Staff["role"];
  expiresAt: string;
  revokedAt: string | null;
};

export type Team = { users: Staff[]; invitations: Invite[] };

export const adminTeamQueryKey = ["admin", "team"] as const;

async function fetchTeam(): Promise<Team> {
  const response = await fetch("/api/admin/team", { cache: "no-store" });
  if (response.status === 401) {
    navigateAfterAuth("/admin/login");
    throw new Error("Sign in to continue.");
  }
  if (!response.ok) {
    throw new Error(
      "Unable to load staff. Administrator access is required.",
    );
  }
  return response.json();
}

export function useAdminTeam() {
  return useQuery({ queryKey: adminTeamQueryKey, queryFn: fetchTeam });
}

export function useTeamMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data, method }: { data: unknown; method?: string }) =>
      authRequest("/api/admin/team", data, method),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: adminTeamQueryKey });
      showAdminToast({ message: result.message, tone: "success" });
    },
    onError: (error: Error) => {
      showAdminToast({
        message: error.message || "Unable to update access.",
        tone: "error",
      });
    },
  });
}
