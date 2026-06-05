"use client";

import { useQuery } from "@tanstack/react-query";
import { getCurrentUserClient } from "@/lib/api/user";

export function useCurrentUser() {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUserClient,
    staleTime: 0,
  });
}
