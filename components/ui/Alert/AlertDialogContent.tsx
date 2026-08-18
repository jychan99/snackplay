"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: {
    ttl?: string;
    desc?: string;
  };
  onConfirm?: () => void;
  confirm?: boolean;
};

// Radix AlertDialog를 직접 다루는 코드는 이 파일에만 있습니다.
// Alert.tsx에서 lazy()로 불러오는 대상이라, 실제로 열리기 전까지는 이 파일의 JS가 로드되지 않습니다.
export default function AlertDialogContentImpl({
  open,
  onOpenChange,
  data,
  confirm = false,
  onConfirm,
}: Props) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{data.ttl}</AlertDialogTitle>
          <AlertDialogDescription>{data.desc}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {confirm ? (
            <>
              <AlertDialogCancel>취소</AlertDialogCancel>
              <AlertDialogAction onClick={onConfirm}>확인</AlertDialogAction>
            </>
          ) : (
            <AlertDialogAction onClick={onConfirm}>확인</AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
