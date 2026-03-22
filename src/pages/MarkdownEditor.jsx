import React, { useState, useEffect } from 'react';
import { FileText, Eye, Code, Copy, Download, Trash2, Split } from 'lucide-react';
import { marked } from 'marked';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { useLanguage } from '../context/LanguageContext';

const MarkdownEditor = () => {
    const { lang, t } = useLanguage();
    const isEn = lang === 'en';

    const defaultKoText = `# 마크다운 에디터에 오신 것을 환영합니다!

## 주요 기능
- **굵은 글씨**와 *기울임 글씨* 지원
- [유용한 링크](https://example.com) 삽입
- 깔끔한 리스트 작성

### 코드 블록 예시
\`\`\`javascript
function welcome() {
  console.log("안녕하세요, 마크다운의 세계입니다!");
}
\`\`\`

> 인용문을 활용해 강조하고 싶은 내용을 작성할 수 있습니다.

---

왼쪽 창에 마크다운을 입력하면 오른쪽에서 실시간으로 렌더링된 결과를 확인할 수 있습니다.`;

    const defaultEnText = `# Welcome to the Live Markdown Editor!

## Key Features
- **Bold Text** and *Italics* support
- [Useful Links](https://example.com) insertion
- Clean bullet and numbered lists

### Code block preview
\`\`\`javascript
function welcome() {
  console.log("Hello, welcome to the world of Markdown!");
}
\`\`\`

> Use block quotes to emphasize critical information and sources.

---

Input raw markdown strings on the left to view the live HTML rendering on the right pane instantly.`;

    const [markdown, setMarkdown] = useState(isEn ? defaultEnText : defaultKoText);
    const [html, setHtml] = useState('');
    const [activeTab, setActiveTab] = useState('split'); // split, edit, preview
    const [copied, setCopied] = useState(null);

    useEffect(() => {
        // Re-initialize default text if it was untempered and language changes
        if (markdown === defaultEnText && !isEn) setMarkdown(defaultKoText);
        if (markdown === defaultKoText && isEn) setMarkdown(defaultEnText);
    }, [isEn]);

    useEffect(() => {
        // Convert Markdown to HTML
        const convertedHtml = marked(markdown);
        setHtml(convertedHtml);
    }, [markdown]);

    const copyMarkdown = () => {
        navigator.clipboard.writeText(markdown);
        setCopied('md');
        setTimeout(() => setCopied(null), 2000);
    };

    const copyHtml = () => {
        navigator.clipboard.writeText(html);
        setCopied('html');
        setTimeout(() => setCopied(null), 2000);
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

    const handleClear = () => {
        setMarkdown('');
    };

    const titleText = isEn ? t('tools.markdown-editor.title') : "마크다운 에디터 - 실시간 미리보기 및 HTML 변환";
    const descText = isEn 
        ? t('tools.markdown-editor.description')
        : "온라인 마크다운 에디터. 실시간 미리보기와 함께 마크다운 문서를 작성하고 편집하세요. HTML 변환 및 파일 다운로드를 지원합니다.";
    const keywordsText = isEn ? "online markdown editor, live md preview, markdown to html converter, github flavor markdown, write readme online" : "마크다운 에디터, markdown editor, md 에디터, 마크다운 미리보기, 텍스트편집기";

    const faqs = isEn ? [
        {
            q: "What is Markdown used for typically?",
            a: "Markdown is a lightweight markup language used extensively for documentation (like GitHub READMEs). It allows you to format plain text using simple symbols that render into structured HTML."
        },
        {
            q: "Can I use the output HTML on my own website?",
            a: "Absolutely! Just use the 'Copy HTML' button to grab the rendered code and paste it into any web builder's raw code block."
        }
    ] : [
        { "q": "마크다운(Markdown)은 왜 사용하나요?", "a": "텍스트 기반의 단순한 기호만으로 문서의 구조와 서식을 빠르게 정의할 수 있기 때문입니다. 특히 깃허브나 블로그 작성 시 필수적인 도구입니다." },
        { "q": "작성한 내용을 HTML로 바로 쓸 수 있나요?", "a": "네, 상단 'HTML 복사' 버튼을 누르면 이 도구가 실시간으로 변환한 표준 HTML 소스 코드를 가져와 웹사이트에 바로 활용할 수 있습니다." }
    ];

    const steps = isEn ? [
        "Pick your preferred workspace: 'Edit' (Full input), 'Split' (Side-by-side), or 'Preview' (Rendered output).",
        "Begin typing your content using standard MD syntax like # for headers or - for lists.",
        "Observe the live preview updating instantly as you type each character.",
        "Export your work by copying the raw MD, the compiled HTML, or downloading as a .md file."
    ] : [
        "작업 스타일에 맞춰 '편집', '분할(가로)', '미리보기' 모드 중 하나를 선택하세요.",
        "왼쪽 입력창에 내용을 작성합니다. #, *, - 등의 기호를 사용하여 서식을 지정하세요.",
        "오른쪽 미리보기 창에서 실제 반영되는 결과를 즉시 확인합니다.",
        "작성이 끝나면 마크다운 텍스트를 복사하거나 파일로 다운로드하여 저장하세요."
    ];

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            <SEO
                title={titleText}
                description={descText}
                keywords={keywordsText}
                category="dev"
                faqs={faqs}
                steps={steps}
            />

            <header className="text-center space-y-4">
                <div className="inline-flex items-center justify-center p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl text-indigo-600 dark:text-indigo-400 mb-2 border border-indigo-200 dark:border-indigo-800">
                    <FileText className="w-8 h-8" />
                </div>
                <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
                    {isEn ? 'Universal Markdown Editor' : '마크다운 에디터'}
                </h1>
                <p className="text-muted-foreground">
                    {isEn ? 'Craft structured documentation with a real-time WYSIWYG rendering experience.' : '실시간 미리보기를 통해 마크다운 문서를 더욱 쉽고 빠르게 작성하세요'}
                </p>
            </header>

            {/* Toolbar */}
            <div className="bg-card border border-border rounded-xl p-3 md:p-4 shadow-sm">
                <div className="flex flex-col md:flex-row items-center gap-4">
                    {/* View Mode */}
                    <div className="flex gap-1 bg-secondary/50 rounded-lg p-1 w-full md:w-auto">
                        <button
                            onClick={() => setActiveTab('edit')}
                            className={`flex-1 md:flex-none px-4 py-2 rounded-md text-sm font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'edit' ? 'bg-indigo-600 text-white shadow-sm' : 'hover:bg-accent text-muted-foreground'}`}
                        >
                            <Code className="w-4 h-4" />
                            {isEn ? 'Edit' : '편집'}
                        </button>
                        <button
                            onClick={() => setActiveTab('split')}
                            className={`hidden md:flex px-4 py-2 rounded-md text-sm font-bold transition-all items-center gap-2 ${activeTab === 'split' ? 'bg-indigo-600 text-white shadow-sm' : 'hover:bg-accent text-muted-foreground'}`}
                        >
                            <Split className="w-4 h-4" />
                            {isEn ? 'Split' : '분할'}
                        </button>
                        <button
                            onClick={() => setActiveTab('preview')}
                            className={`flex-1 md:flex-none px-4 py-2 rounded-md text-sm font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'preview' ? 'bg-indigo-600 text-white shadow-sm' : 'hover:bg-accent text-muted-foreground'}`}
                        >
                            <Eye className="w-4 h-4" />
                            {isEn ? 'Preview' : '미리보기'}
                        </button>
                    </div>

                    <div className="hidden md:block flex-1 border-r border-border h-8 mx-2" />

                    {/* Actions */}
                    <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                        <button
                            onClick={copyMarkdown}
                            className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 border border-border ${copied === 'md' ? 'bg-green-500 text-white' : 'bg-secondary hover:bg-accent text-foreground'}`}
                        >
                            {copied === 'md' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            {copied === 'md' ? (isEn ? 'Copied' : '복사됨') : (isEn ? 'Copy MD' : 'MD 복사')}
                        </button>
                        <button
                            onClick={copyHtml}
                            className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 border border-border ${copied === 'html' ? 'bg-green-500 text-white' : 'bg-secondary hover:bg-accent text-foreground'}`}
                        >
                            {copied === 'html' ? <Check className="w-4 h-4" /> : <Code className="w-4 h-4" />}
                            {copied === 'html' ? (isEn ? 'Copied' : '복사됨') : (isEn ? 'Copy HTML' : 'HTML 복사')}
                        </button>
                        <button
                            onClick={downloadMarkdown}
                            className="flex-1 md:flex-none px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 shadow-md active:scale-95"
                        >
                            <Download className="w-4 h-4" />
                            {isEn ? 'Download' : '다운로드'}
                        </button>
                        <button 
                            onClick={handleClear}
                            className="p-2.5 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors border border-transparent hover:border-red-500/20"
                            title={isEn ? "Clear Editor" : "지우기"}
                        >
                            <Trash2 className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Editor Console */}
            <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-lg min-h-[600px] flex flex-col">
                <div className={`flex-1 grid ${activeTab === 'split' ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} divide-x divide-border`}>
                    {/* Markdown Input */}
                    {(activeTab === 'edit' || activeTab === 'split') && (
                        <div className="flex flex-col">
                            <div className="px-4 py-2.5 bg-muted/30 border-b border-border flex items-center justify-between">
                                <span className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">{isEn ? 'Input Workspace' : '입력 창'}</span>
                                <span className="text-[10px] font-mono text-muted-foreground">{markdown.length} chars</span>
                            </div>
                            <textarea
                                value={markdown}
                                onChange={(e) => setMarkdown(e.target.value)}
                                className="flex-1 p-6 bg-background border-0 focus:outline-none font-mono text-sm leading-relaxed resize-none min-h-[500px]"
                                placeholder={isEn ? "Start drafting your document with Markdown..." : "내용을 입력하세요..."}
                            />
                        </div>
                    )}

                    {/* Preview Area */}
                    {(activeTab === 'preview' || activeTab === 'split') && (
                        <div className="flex flex-col bg-slate-50 dark:bg-gray-900/60">
                            <div className="px-4 py-2.5 bg-muted/30 border-b border-border flex items-center">
                                <span className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">{isEn ? 'Live Rendering' : '렌더링 결과'}</span>
                            </div>
                            <div
                                className="flex-1 p-8 prose prose-indigo dark:prose-invert max-w-none overflow-y-auto"
                                dangerouslySetInnerHTML={{ __html: html }}
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Quick Syntax Guide */}
            <div className="bg-muted/30 rounded-2xl p-6 text-sm text-muted-foreground mt-8 border border-border/50">
                <h3 className="font-bold text-foreground mb-6 flex items-center gap-2 underline underline-offset-8 decoration-indigo-500">📚 {isEn ? 'Quick Syntax Reference' : '자주 사용하는 마크다운 문법'}</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="space-y-3">
                        <p className="font-bold text-foreground text-xs uppercase tracking-widest text-indigo-500">{isEn ? 'Structure' : '구조'}</p>
                        <code className="block bg-background dark:bg-gray-800 p-3 rounded-xl border border-border leading-relaxed font-mono">
                            # Header 1<br />## Header 2<br />### Header 3
                        </code>
                    </div>
                    <div className="space-y-3">
                        <p className="font-bold text-foreground text-xs uppercase tracking-widest text-indigo-500">{isEn ? 'Emphasis' : '강조'}</p>
                        <code className="block bg-background dark:bg-gray-800 p-3 rounded-xl border border-border leading-relaxed font-mono">
                            **{isEn ? 'Bold' : '굵게'}**<br />*{isEn ? 'Italic' : '기울임'}*<br />~~{isEn ? 'Strike' : '취소선'}~~
                        </code>
                    </div>
                    <div className="space-y-3">
                        <p className="font-bold text-foreground text-xs uppercase tracking-widest text-indigo-500">{isEn ? 'Links' : '링크'}</p>
                        <code className="block bg-background dark:bg-gray-800 p-3 rounded-xl border border-border leading-relaxed font-mono">
                            [Label](url)<br />![Alt](img_url)
                        </code>
                    </div>
                    <div className="space-y-3">
                        <p className="font-bold text-foreground text-xs uppercase tracking-widest text-indigo-500">{isEn ? 'Blocks' : '블록'}</p>
                        <code className="block bg-background dark:bg-gray-800 p-3 rounded-xl border border-border leading-relaxed font-mono">
                            &gt; {isEn ? 'Quote' : '인용문'}<hr className="my-1 border-border/50" />\`code\`
                        </code>
                    </div>
                </div>
            </div>

            <ToolGuide
                title={isEn ? "Markdown Mastery Guide" : "마크다운 에디터 활용 팁"}
                intro={isEn 
                    ? "Our editor provides a distraction-free writing environment to craft documentation effortlessly. Whether you're a developer or a content creator, get your ideas structured in seconds." 
                    : "텍스트 기반으로 빠르게 서식이 있는 문서를 만들 수 있는 마크다운 전용 도구입니다. 작성과 동시에 결과물을 확인할 수 있어 문서 생산성이 극대화됩니다."}
                steps={steps}
                tips={isEn ? [
                    "Keyboard shortcuts: Use the split view to experience the fastest 'write and verify' workflow.",
                    "The HTML output is perfectly valid for modern blogs, content management systems (CMS), and websites.",
                    "Markdown is case-sensitive inside code blocks, ensuring your programming logic displays correctly."
                ] : [
                    "분할(Split) 뷰를 활용하면 코드를 치는 도중에 실수한 부분을 즉시 발견하고 수정할 수 있어 매우 편리합니다.",
                    "HTML 복사 기능을 활용하면 티스토리, 네이버 블로그, 워드프레스 등에서 스타일이 입혀진 본문을 그대로 사용할 수 있습니다.",
                    "이미지 주소를 마크다운 문법으로 넣을 때 괄호 안에 따옴표를 넣지 않도록 주의하세요."
                ]}
                faqs={faqs}
            />
        </div>
    );
};

export default MarkdownEditor;
