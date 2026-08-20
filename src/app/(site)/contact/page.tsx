import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const contactMarkdown = `# Let&apos;s talk.

> 좋은 아이디어는 좋은 대화에서 시작됩니다.

새로운 프로젝트, 협업, 혹은 가벼운 인사까지 편하게 연락해 주세요. 함께 의미 있는 디지털 경험을 만들어 보고 싶습니다.

## Contact

- **Email:** [hello@example.com](mailto:hello@example.com)
- **GitHub:** [github.com/yoonseo0832](https://github.com/yoonseo0832)
- **Blog:** [yoonseo0832.tistory.com](https://yoonseo0832.tistory.com)

## I can help with

- React / Next.js 기반 웹 애플리케이션
- 디자인 시스템과 재사용 가능한 UI
- 웹 성능 및 접근성 개선
- 아이디어를 실제 제품으로 구체화하기

~~~sh
echo "Looking forward to hearing from you"
~~~
`;

export default function Contact() {
  return (
    <article className="about-page">
      <div className="markdown-content">
        <p className="syntax-comment">{'// latest-contact.information'}</p>
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {contactMarkdown}
        </ReactMarkdown>
      </div>
    </article>
  );
}
