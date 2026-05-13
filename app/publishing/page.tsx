import Image from "next/image";
import ArrowIcon2 from "@/components/icon/ArrowIcon2";
import Button from "@/components/ui/Button";
import BaseLink from "@/components/ui/BaseLink";
import Link from "@/components/ui/ViewAllLink";
import Input from "@/components/ui/Input";
import Badge from "@/components/ui/Badge";
import CheckInput from "@/components/ui/CheckInput";
import Card from "@/components/display/Card";
import CardHorizontal from "@/components/display/CardHorizontal";
import Loading from "@/components/ui/Loading";

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
} from "@/components/ui/alert-dialog"

export function AlertDialogDemo() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Show Dialog</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>에러 발생</AlertDialogTitle>
          <AlertDialogDescription>
            테스트를 확인중에 문제가 생겼습니다.
            다시 한 번 시도해 주세요.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>취소</AlertDialogCancel>
          <AlertDialogAction>확인</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center  font-sans dark:bg-black">
      <AlertDialogDemo/>
      <Link href="/" ariaLabel="게임 하러가기">
        View All
      </Link>
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Card href="/" count={100} variant="secondary">
          카드 타이틀
        </Card>
        <Card href="/" count={100} variant="primary">
          카드 타이틀22
        </Card>
        <CardHorizontal href="/" count={100} variant="primary">
          카드 타이틀22
        </CardHorizontal>
        <CardHorizontal href="/" count={100} variant="secondary">
          카드 타이틀22
        </CardHorizontal>
        <CheckInput id="CheckInput" label="체크박스" />
        <ArrowIcon2 size={40} className="text-primary" />
        <Button
          variant="outline"
          disabled
          icon={<ArrowIcon2 size={16} className="red" />}
        >
          children
        </Button>
        <BaseLink variant="outline" href="/" icon={<ArrowIcon2 size={16} />}>
          링크입니다
        </BaseLink>
        <BaseLink
          variant="primary"
          href="/"
          icon={<ArrowIcon2 className="text-white" size={16} />}
        >
          링크입니다
        </BaseLink>
        <BaseLink
          variant="secondary"
          href="/"
          icon={<ArrowIcon2 className="text-white" size={16} />}
        >
          링크입니다
        </BaseLink>
        <Badge >학교</Badge>
        <Badge variant="secondary">학교</Badge>
        <Input label="이름" id="test1" type="text" placeholder="테스트입니다" />
        <Input
          label="나이"
          id="test2"
          disabled
          type="number"
          placeholder="테스트입니다"
        />
        <Button
          variant="outline"
          icon={<ArrowIcon2 size={16} className="text-primary" />}
        >
          클릭하기
        </Button>
        <Button variant="primary" size="sm">
          클릭하기
        </Button>
        <Image
          className="dark:invert"
          src="/images/sample_img.png"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
      </main>
      {/* <Loading/> */}
    </div>
  );
}
