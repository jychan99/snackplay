import Button from "@/components/ui/Button";
import { TestForm } from "./TestForm";

type Props = {
  children: React.ReactNode;
};

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function CreateTestDialog({ children }: Props) {
  return (
    <Dialog>
      {/* <DialogTrigger
        render={<Button variant="outline">Sticky Footer</Button>}
      /> */}
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>테스트 등록하기</DialogTitle>
          <DialogDescription>
            아래 폼을 작성하여 테스트를 등록해주세요!
          </DialogDescription>
        </DialogHeader>
        <div className="-mx-4 max-h-[50vh] overflow-y-auto px-4">
          <TestForm />
        </div>
        <DialogFooter>
          {/* <DialogClose render={<Button variant="outline">Close</Button>} /> */}
          <Button type="button" variant="outline" size="sm">
            항목 추가하기
          </Button>
          <Button type="submit" variant="primary" size="sm">
            저장하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
