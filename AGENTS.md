<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
# Claude Code 작업 규칙

## 보안 규칙

- 파일 읽기 전에 사용자에게 확인한다.
- 파일 수정 전에 변경 내용을 설명하고 승인을 받는다.
- 터미널 명령 실행 전 반드시 명령어를 보여주고 확인받는다.
- 자동 실행하지 않는다.

## 절대 접근 금지

읽지 말 것:

- .env
- .env.\*
- \*.pem
- \*.key
- credentials 파일
- secrets 폴더
- \*.pdf
- \*.json

## 터미널 실행 규칙

위험한 명령은 항상 확인:

- rm
- npm install
- git push
- docker
- database migration
- curl
- ssh

## 이 프로젝트가 뭐야?

심리/성격 테스트 등 다양한 콘텐츠를 제공하는 플랫폼 사이트입니다. 
사용자는 간단한 테스트 응답을 통해 AI를 기반으로 한 
개인 맞춤형 결과를 받아 볼 수 있고 그 결과를 공유 할 수 있습니다.

## 기술 스택

프론트엔드/백엔드: Next.js, typescript
배포
프론트엔드 서버- Vercel
백엔드&DB서버 - NeonDB
스토리지 서버 - Cloudflare
API: Gemini 3.1flash-lite
기타 툴: Codex, GitHub, Figma, Tailwind CSS, Stitch AI


## 폴더 구조

- app/(auth) → 화면 페이지 코드 (수정 시 확인 필요)
- app/(main) → 화면 페이지 코드 (수정 시 확인 필요)
- app/api/ → 백엔드 코드 (수정 시 확인 필요)
- componment/ → 페이지에 추가되는 컴포넌트 코드
- data/docs/company → 실제 작업할 때 필요한 문서 (읽기 금지)
- lib/ → api 호출
- types/ → 백엔드/프론트엔드 타입설정
- .env → API 키 (절대 접근 금지)

## 코딩 스타일

-
