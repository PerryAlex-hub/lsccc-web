"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { navigateAfterAuth } from "@/lib/auth/client";
import { showAdminToast } from "@/components/admin/toast";
import type {
  AdminArticle,
  AdminContent,
  AdminMedia,
  AdminSettings,
  AdminState,
  ContentCollection,
} from "@/lib/admin/types";

export const adminContentQueryKey = ["admin", "content"] as const;

async function fetchAdminContent(): Promise<AdminState> {
  const response = await fetch("/api/admin/content", { cache: "no-store" });
  if (response.status === 401) {
    navigateAfterAuth("/admin/login");
    throw new Error("Sign in to continue.");
  }
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || "Content could not be loaded.");
  }
  return result.state as AdminState;
}

export function useAdminContent() {
  return useQuery({
    queryKey: adminContentQueryKey,
    queryFn: fetchAdminContent,
  });
}

// Components below AdminDataBoundary render only once content has loaded.
export function useAdminState(): AdminState {
  const { data } = useAdminContent();
  if (!data) {
    throw new Error("useAdminState must be used within AdminDataBoundary.");
  }
  return data;
}

export type ContentCommand =
  | {
      collection: "articles";
      operation: "save";
      value: AdminArticle;
      expectedUpdatedAt?: string;
    }
  | {
      collection: "articles";
      operation: "delete";
      value: { id: string };
      expectedUpdatedAt?: string;
    }
  | {
      collection: ContentCollection;
      operation: "save";
      value: AdminContent;
      expectedUpdatedAt?: string;
    }
  | {
      collection: ContentCollection;
      operation: "delete";
      value: { id: string };
      expectedUpdatedAt?: string;
    }
  | {
      collection: "media";
      operation: "save";
      value: AdminMedia;
      expectedUpdatedAt?: string;
    }
  | { collection: "media"; operation: "delete"; value: { id: string } }
  | { collection: "settings"; operation: "save"; value: AdminSettings }
  | { collection: "categories"; operation: "save"; value: { name: string } };

type ContentCommandResult = { message: string; state: AdminState };

async function sendContentCommand(
  command: ContentCommand,
): Promise<ContentCommandResult> {
  const response = await fetch("/api/admin/content", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(command),
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || "Could not save changes. Try again.");
  }
  return result as ContentCommandResult;
}

export function useContentCommand() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: sendContentCommand,
    onSuccess: (result) => {
      queryClient.setQueryData(adminContentQueryKey, result.state);
      showAdminToast({ message: result.message, tone: "success" });
    },
    onError: (error: Error) => {
      showAdminToast({
        message: error.message || "Could not save changes. Try again.",
        tone: "error",
      });
    },
  });
}

type UploadMediaResult = { id: string; state: AdminState; message: string };

export function useUploadMedia() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (file: File): Promise<UploadMediaResult> => {
      const response = await fetch("/api/admin/media", {
        method: "POST",
        headers: {
          "Content-Type": file.type,
          "x-filename": encodeURIComponent(file.name),
        },
        body: file,
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Upload failed. Try again.");
      }
      return result as UploadMediaResult;
    },
    onSuccess: (result) => {
      queryClient.setQueryData(adminContentQueryKey, result.state);
      showAdminToast({ message: result.message, tone: "success" });
    },
    onError: (error: Error) => {
      showAdminToast({
        message: error.message || "Upload failed. Try again.",
        tone: "error",
      });
    },
  });
}
