"use client";
import { lazy, Suspense, useRef } from "react";

// 실제로 열릴 때만 Radix AlertDialog 코드(AlertDialogContent.tsx)를 불러옵니다.
const AlertDialogContentImpl = lazy(() => import("./AlertDialogContent"));

type AlertProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: {
    ttl?: string;
    desc?: string;
  };
  onConfirm?: () => void;
  confirm?: boolean;
};

export default function Alert(props: AlertProps) {
  // 한 번이라도 열린 적이 있어야 이후 닫힘 애니메이션도 정상적으로 보여줍니다.
  const hasOpenedRef = useRef(false);
  if (props.open) {
    hasOpenedRef.current = true;
  }

  if (!hasOpenedRef.current) {
    return null;
  }

  return (
    <Suspense fallback={null}>
      <AlertDialogContentImpl {...props} />
    </Suspense>
  );
}
