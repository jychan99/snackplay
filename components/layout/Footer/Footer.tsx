"use client";
import { lazy, Suspense, useState } from "react";

// 실제 사용까지는 거의 없는 개인정보/약관 다이얼로그라, 버튼을 눌렀을 때만
// Radix Dialog 코드(PrivacyPolicyDialog / UseOfTermDialog)를 불러옵니다.
const PrivacyPolicyDialog = lazy(() => import("./PrivacyPolicyDialog"));
const UseOfTermDialog = lazy(() => import("./UseOfTermDialog"));

type OpenDialog = "privacy" | "terms" | null;

export default function Footer() {
  const [openDialog, setOpenDialog] = useState<OpenDialog>(null);

  return (
    <footer className="flex items-center justify-center py-12 border-t-1 border-border-sub">
      <div className="flex items-center justify-between w-[640px] flex-wrap px-8">
        <div>
          <h2 className="text-[18px] font-bold">SnackPlay</h2>
          <p className="text-text-sub text-[12px]">
            © 2026 SnackPlay. All rights reserved.
          </p>
        </div>
        <div className="flex relative -right-4 max-[480px]:right-3">
          <button
            className="text-text-sub text-[12px] underline underline-offset-1 px-4 py-2 hover:font-bold transition ease-linear"
            type="button"
            onClick={() => setOpenDialog("privacy")}
          >
            개인정보보호
          </button>
          <button
            className="text-text-sub text-[12px] underline underline-offset-1 px-4 py-2 hover:font-bold transition ease-linear"
            type="button"
            onClick={() => setOpenDialog("terms")}
          >
            이용약관
          </button>
        </div>
      </div>

      {openDialog && (
        <Suspense fallback={null}>
          {openDialog === "privacy" && (
            <PrivacyPolicyDialog
              open
              onOpenChange={(next) => !next && setOpenDialog(null)}
            />
          )}
          {openDialog === "terms" && (
            <UseOfTermDialog
              open
              onOpenChange={(next) => !next && setOpenDialog(null)}
            />
          )}
        </Suspense>
      )}
    </footer>
  );
}
