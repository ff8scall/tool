import React, { useState } from 'react';
import { Copy, Check, FileCode, Trash2, Zap, Layout } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { useLanguage } from '../context/LanguageContext';

const HtmlFormatter = () => {
    const { lang, t } = useLanguage();
    const isEn = lang === 'en';

    const [input, setInput] = useState('');
    const [formatted, setFormatted] = useState('');
    const [copied, setCopied] = useState(false);

    const formatHtml = () => {
        try {
            let html = input.trim();
            let indent = 0;
            const tab = '  ';
            let result = '';

            html = html.replace(/>\s+</g, '><');

            const tokens = html.split(/(<[^>]+>)/g).filter(token => token.trim());

            tokens.forEach(token => {
                if (token.match(/^<\/\w/)) {
                    indent--;
                    result += tab.repeat(Math.max(0, indent)) + token + '\n';
                } else if (token.match(/^<\w[^>]*[^\/]>$/)) {
                    result += tab.repeat(indent) + token + '\n';
                    indent++;
                } else if (token.match(/^<\w[^>]*\/>$/)) {
                    result += tab.repeat(indent) + token + '\n';
                } else if (token.trim()) {
                    result += tab.repeat(indent) + token + '\n';
                }
            });

            setFormatted(result.trim());
        } catch (err) {
            setFormatted(isEn ? 'Formatting Error: ' + err.message : '포맷팅 오류: ' + err.message);
        }
    };

    const minifyHtml = () => {
        const minified = input
            .replace(/\s+/g, ' ')
            .replace(/>\s+</g, '><')
            .trim();
        setFormatted(minified);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(formatted);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    const handleClear = () => {
        setInput('');
        setFormatted('');
    };

    const keywordsText = isEn ? "html formatter, beautify html online, html minifier, online developer tools, clean html code" : "HTML포맷터, HTML정렬, 코드포맷팅, HTML압축, 개발자도구";

    const faqs = isEn ? [
        {
            q: "Does this handle nested <script> or <style> tags perfectly?",
            a: "This formatter primarily targets standard HTML tag structure. While it preserves internal content, specialized JS/CSS formatting is best handled by dedicated script beautifiers."
        },
        {
            q: "Can minified HTML break my styles?",
            a: "Usually no, as it only strips redundant whitespaces. However, if your CSS relies strictly on whitespace between inline-block elements, slight visual shifts might occur natively."
        }
    ] : [
        { "q": "스크립트(JS)나 스타일(CSS) 태그 안의 내용도 완벽히 정렬되나요?", "a": "기본적으로 HTML 태그 구조를 중심으로 정렬합니다. 태그 내부의 복잡한 로직은 원본의 형태를 최대한 보존하여 코드 손상을 방지합니다." },
        { "q": "압축 기능 사용 시 레이아웃이 깨질 수 있나요?", "a": "단순히 불필요한 공백과 줄바꿈만 제거하므로 대부분 안전합니다. 다만 인라인 블록 요소 간의 미세한 간격에 의존하는 디자인의 경우 아주 미세한 차이가 생길 수 있습니다." }
    ];

    const steps = isEn ? [
        "Insert your raw, unformatted, or minified HTML source code into the left editor pane.",
        "Select 'Beautify Format' to restore a clean, indented tag hierarchy instantly.",
        "Choose 'Minify Code' if your goal is to reduce file size for production performance.",
        "Grab the final output using the copy button on the results window."
    ] : [
        "정리가 필요한 HTML 원본 소스 코드를 왼쪽 입력창에 붙여넣습니다.",
        "상단 '가독성 포맷팅' 버튼을 누르면 들여쓰기가 적용된 깔끔한 코드로 변환됩니다.",
        "웹사이트 성능 최적화를 위해 코드를 압축하려면 '코드 압축' 버튼을 사용하세요.",
        "변환된 결과를 우측 창의 '복사' 버튼으로 가져가 프로젝트에 적용합니다."
    ];

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            <SEO
                title={t('tools.html-view.title')}
                description={t('tools.html-view.description')}
                keywords={keywordsText}
                category="dev"
                faqs={faqs}
                steps={steps}
            />

            <header className="text-center space-y-4">
                <div className="inline-flex items-center justify-center p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl text-emerald-600 dark:text-emerald-400 mb-2 border border-emerald-200 dark:border-emerald-800 shadow-sm">
                    <FileCode className="w-8 h-8" />
                </div>
                <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
                    {isEn ? 'Professional HTML Formatter' : 'HTML 코드 뷰/포맷터'}
                </h1>
                <p className="text-muted-foreground">
                    {isEn ? 'Effortlessly beautify markup or optimize file size with advanced minification.' : 'HTML 구조를 분석하여 보기 좋게 정렬하거나 성능 최적화를 위해 압축하세요'}
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Input */}
                <div className="bg-card border border-border rounded-2xl p-6 space-y-4 shadow-sm">
                    <div className="flex items-center justify-between">
                        <label className="block text-sm font-bold text-muted-foreground uppercase tracking-widest">
                            {isEn ? 'Source HTML Content' : 'HTML 소스 입력'}
                        </label>
                        <button 
                            onClick={handleClear}
                            className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                            title={isEn ? "Clear input" : "내용 지우기"}
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="<div class='container'><p>Hello World</p></div>"
                        className="w-full h-[450px] px-4 py-3 bg-background border-2 border-border/80 focus:border-emerald-500 rounded-xl resize-none font-mono text-sm focus:outline-none shadow-inner transition-colors"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <button
                            onClick={formatHtml}
                            disabled={!input.trim()}
                            className="px-4 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all disabled:opacity-50 font-bold shadow-md active:scale-95 flex items-center justify-center gap-2"
                        >
                            <Layout className="w-4 h-4" />
                            {isEn ? 'Beautify Format' : '가독성 포맷팅'}
                        </button>
                        <button
                            onClick={minifyHtml}
                            disabled={!input.trim()}
                            className="px-4 py-3 bg-secondary hover:bg-accent rounded-xl transition-colors disabled:opacity-50 font-bold border border-border flex items-center justify-center gap-2"
                        >
                            <Zap className="w-4 h-4" />
                            {isEn ? 'Minify Payload' : '코드 압축'}
                        </button>
                    </div>
                </div>

                {/* Output */}
                <div className="bg-card border border-border rounded-2xl p-6 space-y-4 shadow-sm">
                    <div className="flex items-center justify-between">
                        <label className="block text-sm font-bold text-muted-foreground uppercase tracking-widest">
                            {isEn ? 'Processed Results' : '변환 결과'}
                        </label>
                        {formatted && (
                            <button
                                onClick={copyToClipboard}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-all ${copied ? 'bg-green-500 text-white shadow-sm' : 'bg-background hover:bg-secondary text-muted-foreground border border-border'}`}
                            >
                                {copied ? (
                                    <>
                                        <Check className="w-4 h-4" />
                                        {isEn ? 'Copied' : '복사됨'}
                                    </>
                                ) : (
                                    <>
                                        <Copy className="w-4 h-4" />
                                        {isEn ? 'Copy Snippet' : '결과 복사'}
                                    </>
                                )}
                            </button>
                        )}
                    </div>
                    <textarea
                        value={formatted}
                        readOnly
                        placeholder={isEn ? "Your processed HTML will render here..." : "변환된 결과가 여기에 표시됩니다"}
                        className="w-full h-[450px] px-4 py-3 bg-background border-2 border-border/80 rounded-xl resize-none font-mono text-sm focus:outline-none shadow-inner"
                    />
                </div>
            </div>

            <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-2xl p-6 text-sm text-foreground space-y-4">
                <h3 className="font-black text-lg flex items-center gap-2 text-emerald-700 dark:text-emerald-400">💡 {isEn ? 'Optimization Tips' : 'HTML 최적화 팁'}</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm font-medium text-muted-foreground">
                    <li className="flex gap-3">
                        <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 flex items-center justify-center font-bold text-xs shrink-0">1</div>
                        <span>{isEn ? 'Properly indented HTML significantly improves code review efficiency and maintenance speed.' : '규격에 맞는 들여쓰기는 코드 리뷰의 가독성을 높이고 유지보수 시간을 단축시킵니다.'}</span>
                    </li>
                    <li className="flex gap-3">
                        <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 flex items-center justify-center font-bold text-xs shrink-0">2</div>
                        <span>{isEn ? 'Minify code before production shipping to reduce total payload volume for faster user page loads.' : '실제 서비스 배포 전에는 코드를 압축하여 데이터 전송량을 줄이고 페이지 로딩 속도를 개선하세요.'}</span>
                    </li>
                    <li className="flex gap-3">
                        <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 flex items-center justify-center font-bold text-xs shrink-0">3</div>
                        <span>{isEn ? 'Avoid deep nesting if possible; it keeps your DOM tree traversal optimized and clean.' : '불필요하게 깊은 중첩 구조를 피하면 브라우저의 DOM 렌더링 성능이 향상됩니다.'}</span>
                    </li>
                    <li className="flex gap-3">
                        <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 flex items-center justify-center font-bold text-xs shrink-0">4</div>
                        <span>{isEn ? 'Ensure all tags are properly closed to prevent rogue layout shifts across different browsers.' : '모든 태그가 정확히 닫혀 있는지 확인하여 크로스 브라우징 시 레이아웃 깨짐을 방지하세요.'}</span>
                    </li>
                </ul>
            </div>
            
            <ToolGuide
                title={isEn ? "Universal HTML Formatter Guide" : "HTML 포맷터 상세 가이드"}
                intro={isEn 
                    ? "Designed for developers seeking rapid structural cleanup of legacy HTML templates or production optimization via minification." 
                    : "개발자 및 웹 디자이너를 위해 설계된 HTML 통합 도구입니다. 복잡한 마크업 구조를 표준 규격에 맞춰 정렬하거나 데이터 경량화를 위해 압축할 수 있습니다."}
                steps={steps}
                tips={isEn ? [
                    "Need to analyze a third-party website's source? Use 'Beautify' to decode their minified delivery assets.",
                    "Properly formatted HTML helps search engine crawlers (SEO) index your content structure more reliably.",
                    "This tool is 100% browser-based; your private source code never touches our server during processing."
                ] : [
                    "타사 웹사이트의 소스를 분석할 때 '가독성 포맷팅'을 사용하면 압축된 코드를 쉽게 해독할 수 있습니다.",
                    "정리된 HTML 문법은 검색 엔진(SEO) 크롤러가 사이트 구조를 파악하는 데 도움을 줍니다.",
                    "모든 작업은 브라우저 내에서 완결되므로 보안이 필수한 프로젝트 코드도 안심하고 작업하세요."
                ]}
                faqs={faqs}
            />
        </div>
    );
};

export default HtmlFormatter;
