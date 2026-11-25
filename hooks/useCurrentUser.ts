"use client";

import { useQuery } from "@tanstack/react-query";
import { getCurrentUserClient } from "@/lib/api/user";

export function useCurrentUser() {
  return useQuery({
    queryKey: ["currentUser"],
    queryFn: getCurrentUserClient,
    staleTime: 1000 * 60 * 5, // 로그인/로그아웃 시 직접 갱신하므로 5분간 재요청 안 함
  });
}
