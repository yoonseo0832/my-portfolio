import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const aboutMarkdown = `# Yoonseo

> Frontend developer & digital maker

복잡한 문제를 단순하고 아름다운 인터페이스로 바꾸는 개발자입니다. 사용자가 자연스럽게 이해하고 사용할 수 있는 제품을 만드는 일에 관심이 많습니다.

## About me

웹의 속도와 접근성, 그리고 작은 인터랙션의 완성도를 중요하게 생각합니다. 새로운 기술을 빠르게 실험하고, 배운 내용을 실제 제품에 적용하며 성장하고 있습니다.

## Tech stack

### Frontend

- TypeScript, JavaScript
- React, Next.js
- Tailwind CSS, shadcn/ui

### Backend

- Node.js, REST API
- PostgreSQL, Firebase

### Tools

- Git & GitHub
- VS Code, Figma
- Vercel, Docker

## Career & learning

- 제품의 처음부터 출시까지 함께하는 프론트엔드 개발
- 웹 성능과 디자인 시스템을 꾸준히 학습
- 오픈소스와 개인 프로젝트를 통해 새로운 패턴 실험

~~~ts
const currentFocus = ["accessible UI", "design systems", "web performance"];
~~~

[View my projects →](/projects) · [Get in touch →](/contact)
`;

export async function getAboutMarkdown() {
  try {
    const { getSupabase } = await import("@/lib/supabase");
    const { data } = await getSupabase().from("site_content").select("content").eq("key", "about").maybeSingle();
    return data?.content || aboutMarkdown;
  } catch {
    return aboutMarkdown;
  }
}

export default async function AboutMarkdown() {
  const content = await getAboutMarkdown();
  return <div className="markdown-content"><p className="syntax-comment">{'// latest-intro.myself'}</p><ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown></div>;
}
