import React, { useState, useEffect } from 'react';
import { FileText, Eye, Code, Copy } from 'lucide-react';
import { marked } from 'marked';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';

const MarkdownEditor = () => {
    const [markdown, setMarkdown] = useState(`# 마크다운 에디터에 오신 것을 환영합니다!

## 기능
- **굵은 글씨**와 *기울임 글씨*
- [링크](https://example.com)
- 리스트 작성

### 코드 블록
\`\`\`javascript
function hello() {
  console.log("Hello, World!");
}
\`\`\`

> 인용문도 작성할 수 있습니다.

---

왼쪽에 마크다운을 입력하면 오른쪽에 미리보기가 표시됩니다.`);
    const [html, setHtml] = useState('');
    const [activeTab, setActiveTab] = useState('split'); // split, edit, preview

    useEffect(() => {
        // 마크다운을 HTML로 변환
        const convertedHtml = marked(markdown);
        setHtml(convertedHtml);
    }, [markdown]);

    const copyMarkdown = () => {
        navigator.clipboard.writeText(markdown);
    };

    const copyHtml = () => {
        navigator.clipboard.writeText(html);
    };

    const downloadMarkdown = () => {
        const blob = new Blob([markdown], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'document.md';
        link.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            <SEO
                title="마크다운 에디터 - Utility Hub"
                description="온라인 마크다운 에디터. 실시간 미리보기와 함께 마크다운 문서를 작성하고 편집하세요."
                keywords="마크다운 에디터, markdown editor, md 에디터, 마크다운 미리보기"
            />

            <header className="text-center space-y-2">
                <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
                    <FileText className="w-8 h-8 text-primary" />
                    마크다운 에디터
                </h1>
                <p className="text-muted-foreground">
                    실시간 미리보기와 함께 마크다운 문서를 작성하세요
                </p>
            </header>

            {/* Toolbar */}
            <div className="bg-card border border-border rounded-xl p-4">
                <div className="flex flex-wrap items-center gap-2">
                    {/* View Mode */}
                    <div className="flex gap-1 bg-secondary rounded-lg p-1">
                        <button
                            onClick={() => setActiveTab('edit')}
                            className={`px-3 py-1 rounded-md text-sm transition-colors ${activeTab === 'edit' ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'
                                }`}
                        >
                            <Code className="w-4 h-4 inline mr-1" />
                            편집
                        </button>
                        <button
                            onClick={() => setActiveTab('split')}
                            className={`px-3 py-1 rounded-md text-sm transition-colors ${activeTab === 'split' ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'
                                }`}
                        >
                            분할
                        </button>
                        <button
                            onClick={() => setActiveTab('preview')}
                            className={`px-3 py-1 rounded-md text-sm transition-colors ${activeTab === 'preview' ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'
                                }`}
                        >
                            <Eye className="w-4 h-4 inline mr-1" />
                            미리보기
                        </button>
                    </div>

                    <div className="flex-1" />

                    {/* Actions */}
                    <button
                        onClick={copyMarkdown}
                        className="px-3 py-1 bg-secondary hover:bg-accent rounded-md text-sm transition-colors"
                    >
                        <Copy className="w-4 h-4 inline mr-1" />
                        MD 복사
                    </button>
                    <button
                        onClick={copyHtml}
                        className="px-3 py-1 bg-secondary hover:bg-accent rounded-md text-sm transition-colors"
                    >
                        <Copy className="w-4 h-4 inline mr-1" />
                        HTML 복사
                    </button>
                    <button
                        onClick={downloadMarkdown}
                        className="px-3 py-1 bg-primary text-primary-foreground hover:brightness-110 rounded-md text-sm transition-all"
                    >
                        다운로드
                    </button>
                </div>
            </div>

            {/* Editor */}
            <div className="bg-card border border-border rounded-xl overflow-hidden">
                <div className={`grid ${activeTab === 'split' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'} divide-x divide-border`}>
                    {/* Markdown Input */}
                    {(activeTab === 'edit' || activeTab === 'split') && (
                        <div className="flex flex-col">
                            <div className="px-4 py-2 bg-secondary border-b border-border">
                                <span className="text-sm font-medium">마크다운</span>
                            </div>
                            <textarea
                                value={markdown}
                                onChange={(e) => setMarkdown(e.target.value)}
                                className="flex-1 p-4 bg-background border-0 focus:outline-none font-mono text-sm resize-none min-h-[600px]"
                                placeholder="여기에 마크다운을 입력하세요..."
                            />
                        </div>
                    )}

                    {/* Preview */}
                    {(activeTab === 'preview' || activeTab === 'split') && (
                        <div className="flex flex-col">
                            <div className="px-4 py-2 bg-secondary border-b border-border">
                                <span className="text-sm font-medium">미리보기</span>
                            </div>
                            <div
                                className="flex-1 p-4 prose prose-sm dark:prose-invert max-w-none overflow-auto min-h-[600px]"
                                dangerouslySetInnerHTML={{ __html: html }}
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Guide */}
            <div className="bg-muted/30 rounded-xl p-6 text-sm text-muted-foreground">
                <h3 className="font-bold text-foreground mb-2">💡 마크다운 문법</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p className="font-medium text-foreground mb-1">제목</p>
                        <code className="block bg-background p-2 rounded"># H1<br />## H2<br />### H3</code>
                    </div>
                    <div>
                        <p className="font-medium text-foreground mb-1">강조</p>
                        <code className="block bg-background p-2 rounded">**굵게**<br />*기울임*<br />~~취소선~~</code>
                    </div>
                    <div>
                        <p className="font-medium text-foreground mb-1">리스트</p>
                        <code className="block bg-background p-2 rounded">- 항목 1<br />- 항목 2<br />  - 하위 항목</code>
                    </div>
                    <div>
                        <p className="font-medium text-foreground mb-1">링크 & 이미지</p>
                        <code className="block bg-background p-2 rounded">[링크](url)<br />![이미지](url)</code>
                    </div>
                </div>
            </div>
        \n            <ToolGuide
                title="마크다운 에디터"
                intro="실시간 미리보기 마크다운 편집기"
                steps={[
                    "원하시는 옵션이나 값을 화면에 안내된 순서대로 정확하게 기입해 주세요.",
                    "제시된 항목과 보기를 꼼꼼하게 살펴보고 본인에게 맞는 것을 선택합니다.",
                    "모든 입력을 완료한 후 결과 화면에서 계산된 수치나 분석된 내용을 확인합니다.",
                    "결과가 마음에 든다면 캡처하거나 공유하기 버튼을 눌러 지인들에게 공유해보세요!"
                ]}
                tips={[
                    "결과값이 예상과 다르다면 입력한 숫자나 단위를 한 번 더 확인해보는 것이 좋습니다.",
                    "제공되는 다양한 부가 옵션을 함께 활용하면 훨씬 구체적인 형태의 맞춤형 결과를 얻을 수 있습니다.",
                    "모바일과 데스크톱 환경 모두에 완벽하게 최적화되어 있으니 언제 어디서든 편리하게 이용해 보세요."
                ]}
                faqs={[
                    { "q": "이 도구들은 정말로 모두 무료인가요?", "a": "네! Tool Hive에서 제공하는 모든 도구 모음과 심리 테스트들은 가입 등의 번거로운 절차 없이 누구나 100% 무료로 무제한 사용할 수 있습니다." },
                    { "q": "제가 입력한 개인적인 정보 데이터가 서버에 남나요?", "a": "아니요, 사용자가 입력하는 이름, 숫자, 금액 등의 모든 데이터는 방문자의 기기 내 브라우저에서만 실시간으로 연산되며 어떠한 경우에도 외부 서버로 전송되거나 저장되지 않으므로 안심하셔도 됩니다." },
                    { "q": "버튼을 눌러도 반응이 없거나 에러가 생깁니다.", "a": "브라우저의 일시적인 캐시 문제일 수 있습니다. 키보드의 F5 버튼을 누르거나 새로고침을 진행한 후 다시 시도해 보시길 권장하며, 문제가 계속된다면 다른 브라우저 앱을 이용해 보세요." }
                ]}
            />
        </div>
    );
};

export default MarkdownEditor;
