"use client";

import { useActionState, useEffect } from "react";

export type LoginState = {
  alertId?: number;
  error?: string;
  success?: boolean;
};

type LoginAction = (
  state: LoginState,
  formData: FormData,
) => Promise<LoginState>;

export default function LoginFormClient({ action }: { action: LoginAction }) {
  const [state, formAction, isPending] = useActionState(action, {});

  useEffect(() => {
    if (state.error) {
      alert(state.error);
    }
  }, [state.alertId, state.error]);

  return (
    <form action={formAction} className="space-y-3">
      <input
        name="id"
        placeholder="아이디"
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
      />
      <input
        name="password"
        type="password"
        placeholder="비밀번호"
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
      />
      <button
        type="submit"
        disabled={isPending}
        className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? "로그인 중..." : "로그인"}
      </button>
    </form>
  );
}
