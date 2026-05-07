This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---
# 페이지 정보입니다.
**※보기양식은 다음과같습니다.**
url -> 화면명
  사용 테이블 - 테이블설명(CRUD)
--

/ -> 메인화면
  USER_MAIN(R)
  TEST_MAIN(R)
  GAME_MAIN(R)

/login -> 로그인
  USER_MAIN(CR)

/my -> 마이페이지(탈퇴 | 비밀번호 재설정 | 플레이 통계)
  USER_MAIN(RUD)
  TEST_RESULT(R)

/test -> 미니 테스트
  TEST_MAIN(R)
/test/{:test_id} -> 테스트상세
  TEST_MAIN(R)
  TEST_CONTENT(R)
  TEST_RESULT(RU)

/game -> 미니 게임
  GAME_MAIN(R)
/game/{:game_id} -> 게임상세
