import Image from "next/image";
import ArrowIcon2 from "@/components/icon/ArrowIcon2";
import Button from "@/components/ui/Button";
import BaseLink from "@/components/ui/BaseLink";
import Link from "@/components/ui/ViewAllLink";
import Input from "@/components/ui/Input";
import Badge from "@/components/ui/Badge";
import Checkbox from "@/components/ui/Checkbox";
import Card from "@/components/display/Card";
import CardHorizontal from "@/components/display/CardHorizontal";
export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Link href="/" ariaLabel="게임 하러가기">
        View All
      </Link>
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Card href="/" count={100} varient="secondary">
          카드 타이틀
        </Card>
        <Card href="/" count={100} varient="primary">
          카드 타이틀22
        </Card>
        <CardHorizontal href="/" count={100} varient="primary">
          카드 타이틀22
        </CardHorizontal>
        <Checkbox id="checkbox" label="체크박스" />
        <ArrowIcon2 size={40} color="color-primary" />
        <Button
          variant="outline"
          disabled
          icon={<ArrowIcon2 size={16} color="red" />}
        >
          children
        </Button>
        <BaseLink variant="outline" href="/" icon={<ArrowIcon2 size={16} />}>
          링크입니다
        </BaseLink>
        <Badge color="primary">학교</Badge>
        <Badge color="secondary">학교</Badge>
        <Input label="이름" id="test1" type="text" placeholder="테스트입니다" />
        <Input
          label="나이"
          id="test2"
          disabled
          type="number"
          placeholder="테스트입니다"
        />
        <Button variant="outline" icon={<ArrowIcon2 size={16} color="red" />}>
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
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            To get started, edit the page.tsx file.
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Looking for a starting point or more instructions? Head over to{" "}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Templates
            </a>{" "}
            or the{" "}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Learning
            </a>{" "}
            center.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}
