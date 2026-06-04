import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Button from "@/components/ui/Button";
type AlertProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: {
    ttl: string;
    desc: string;
  };
  onConfirm?: () => void;
  confirm?: boolean;
};

export default function Alert({
  open,
  onOpenChange,
  data,
  confirm = false,
  onConfirm,
}: AlertProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      {/* <AlertDialogTrigger asChild>
        <Button variant="outline">Show Dialog</Button>
      </AlertDialogTrigger> */}
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
