import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const aboutMarkdown = `# 이윤서

> 실수하더라도 포기하지 않는 개발자

고려대학교 세종캠퍼스 컴퓨터융합소프트웨어학과에 재학 중인 개발자입니다. 사용자가 자연스럽게 이해하고 편하게 사용할 수 있는 서비스를 만드는 데 관심이 있으며, UI/UX를 고민한 뒤 실제 동작하는 웹 서비스로 구현하는 과정을 좋아합니다.

## About me

새로운 기술을 빠르게 익히는 것에 그치지 않고, 배운 내용을 실제 프로젝트에 적용하며 성장하고 있습니다. 팀 프로젝트에서는 화면 설계와 사용자 경험을 함께 고민하고, 백엔드와 데이터베이스까지 이해해 전체 흐름을 연결하는 개발을 지향합니다.

## Tech stack

### Frontend

- TypeScript, JavaScript
- React, Next.js
- HTML, CSS, Tailwind CSS

### Backend & database

- Python, Django
- Java, Spring
- Oracle, PostgreSQL
- REST API, 소셜 로그인, CRUD 설계

### Tools & deployment

- Git, GitHub
- VS Code, Figma, Cursor AI
- Vercel, PythonAnywhere

## Experience

### KETG 하계 인턴 · 2026.07 — 2026.08

실무 환경에서 협업 방식과 서비스 개발 과정을 경험하며, 요구사항을 이해하고 문제를 해결하는 개발자의 역할을 배웠습니다. 인턴십에서 얻은 경험을 바탕으로 더 안정적이고 사용하기 쉬운 서비스를 만드는 데 집중하고 있습니다.

### 기업 홈페이지 개선 및 배포 프로젝트

클라이언트의 요구사항을 분석해 실제 운영 중인 기업 홈페이지를 개선하고 배포했습니다. Python과 Django를 사용했으며, PythonAnywhere 서버 설정 과정에서 발생한 문제를 직접 해결해 실서비스 배포까지 완료했습니다.

### KH 정보교육원 풀스택 개발자 양성과정 · 2024.12 — 2025.06

- **여행 다섯시**: 숙박 플랫폼의 UI/UX 기획, 카카오맵 API 연동, 숙박 정보 CRUD 백엔드 구현
- **Trip-log**: Oracle 데이터베이스 설계, 소셜 로그인 연동, 사용자 화면 구현
- Git 충돌을 줄이기 위한 코드 컨벤션을 팀과 함께 문서화

### 2024 세종 DX 해커톤 · 2024.08

웰니스 매칭 서비스를 기획·개발한 팀 프로젝트에 참여했습니다. UI/UX 디자인과 발표 자료 제작을 담당했으며, SW융합클러스터 인재상을 수상했습니다.

## Current focus

~~~ts
const currentFocus = ["accessible UI", "design systems", "web performance"];
~~~

[프로젝트 보기](/projects) · [연락하기](/contact)
`;

export async function getAboutMarkdown() {
  try {
    const { getSupabase } = await import("@/lib/supabase");
    const { data } = await getSupabase().from("site_content").select("content").eq("key", "about").maybeSingle();
    return data?.content || aboutMarkdown;
  } catch { return aboutMarkdown; }
}

export default async function AboutMarkdown() {
  const content = await getAboutMarkdown();
  return <div className="markdown-content"><p className="syntax-comment">{"// latest-intro.myself"}</p><ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown></div>;
}
