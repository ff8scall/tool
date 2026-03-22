import React, { useState, useEffect } from 'react';
import { Play, Code2, Layout, Boxes, Terminal, Monitor, Trash2 } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { useLanguage } from '../context/LanguageContext';

const WebEditor = () => {
    const { lang, t } = useLanguage();
    const isEn = lang === 'en';

    const [html, setHtml] = useState('<div class="box">\n  <h1>Hello World!</h1>\n  <p>Start editing to see magic happen.</p>\n  <button id="btn">Click Me</button>\n</div>');
    const [css, setCss] = useState('.box {\n  padding: 2rem;\n  text-align: center;\n  background: #f8fafc;\n  border-radius: 1rem;\n  border: 2px solid #e2e8f0;\n}\nh1 {\n  color: #0f172a;\n  font-family: sans-serif;\n}\nbutton {\n  background: #2563eb;\n  color: white;\n  border: none;\n  padding: 0.5rem 1rem;\n  border-radius: 0.5rem;\n  cursor: pointer;\n}');
    const [js, setJs] = useState('document.getElementById("btn").addEventListener("click", () => {\n  alert("Button Clicked!");\n  console.log("Interaction detected.");\n});');
    const [output, setOutput] = useState('');

    const runCode = () => {
        const combinedCode = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <style>${css}</style>
            </head>
            <body>
                ${html}
                <script>${js}<\/script>
            </body>
            </html>
        `;
        setOutput(combinedCode);
    };

    const handleClear = () => {
        setHtml('');
        setCss('');
        setJs('');
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            runCode();
        }, 800);
        return () => clearTimeout(timer);
    }, [html, css, js]);

    const titleText = isEn ? t('tools.web-editor.title') : "실시간 웹 에디터 | HTML, CSS, JS 온라인 코딩 도구";
    const descText = isEn 
        ? t('tools.web-editor.description')
        : "HTML, CSS, JavaScript를 한 공간에서 작성하고 실시간 미리보기로 확인하세요. 프론트엔드 프로토타이핑 및 코드 테스트용 무료 웹 에디터입니다.";
    const keywordsText = isEn ? "web editor online, html css js preview, live code editor, frontend sandbox, online programming tool" : "웹에디터, HTML에디터, 코드에디터, 온라인코딩, 프론트엔드테스트, 개발자도구";

    const toolFaqs = isEn ? [
        {
            q: "Can I import external CSS or JavaScript libraries?",
            a: "Yes! Simply include standard CDN <link> or <script> tags inside the HTML editor section to load any external framework or layout engine."
        },
        {
            q: "Where can I see the JavaScript console logs?",
            a: "Since the preview runs in a secure iframe, any console.log() output appears in your browser's primary developer console (Press F12 or Right Click > Inspect)."
        }
    ] : [
        { "q": "외부 라이브러리(CDN)를 불러올 수 있나요?", "a": "네, HTML 입력란 상단에 시중의 CDN 링크(<link> 또는 <script> 태그)를 추가하면 다양한 라이브러리를 자유롭게 불러와 사용할 수 있습니다." },
        { "q": "자바스크립트 콘솔 로그는 어디서 확인하나요?", "a": "미리보기는 아이프레임(Iframe)에서 동작하므로, 브라우저의 전용 개발자 도구(F12) 콘솔 탭에서 실제 로그를 실시간으로 확인할 수 있습니다." }
    ];

    const toolSteps = isEn ? [
        "Construct your DOM hierarchy inside the 'Markup (HTML)' container.",
        "Define visual aesthetics and layout properties in the 'Styling (CSS)' pane.",
        "Add interactive behavior and event listeners through the 'Scripts (JS)' area.",
        "Verify the live execution results instantly in the 'Live Preview' window below."
    ] : [
        "Markup (HTML) 영역에 웹 페이지의 기본 구조와 뼈대를 설계합니다.",
        "Styling (CSS) 영역에서 색상, 글꼴, 레이아웃 등 미적 디자인을 정의합니다.",
        "Scripts (JS) 영역에 클릭 이벤트 등 동적인 인터랙션 로직을 작성합니다.",
        "하단의 '실시간 미리보기' 창에서 코드가 반영된 결과물을 즉시 확인합니다."
    ];

    const toolTips = isEn ? [
        "Ideal for rapid UI component prototyping before committing to full-scale repositories.",
        "Use the 'Run' button manually if you want to force updates without waiting for the auto-refresh debounce.",
        "Your code is processed entirely in-memory on your browser for total privacy."
    ] : [
        "본격적인 프로젝트 시작 전, 작은 UI 컴포넌트나 애니메이션을 빠르게 검증할 때 최고의 효율을 발휘합니다.",
        "자동 실행을 기다리지 않고 즉시 반영하고 싶다면 우측 상단의 '강제 실행' 버튼을 클릭하세요.",
        "모든 코드는 브라우저 내부 메모리에서만 동작하며 외부 서버에 기록되지 않으므로 안심하고 작업하세요."
    ];

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            <SEO
                title={titleText}
                description={descText}
                keywords={keywordsText}
                category="dev"
                faqs={toolFaqs}
                steps={toolSteps}
            />

            <header className="text-center space-y-4">
                <div className="inline-flex items-center justify-center p-3 bg-slate-100 dark:bg-slate-800 rounded-2xl text-slate-600 dark:text-slate-200 mb-2 border border-slate-200 dark:border-slate-700 shadow-sm">
                    <Monitor className="w-8 h-8" />
                </div>
                <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
                    {isEn ? 'Live Web Components Editor' : '실시간 웹 에디터'}
                </h1>
                <p className="text-muted-foreground text-sm">
                    {isEn ? 'The ultimate sandbox for rapid front-end prototyping and code experiments.' : 'HTML, CSS, JavaScript를 실시간으로 작성하고 나만의 웹 페이지를 구성하세요'}
                </p>
            </header>

            {/* Editor Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* HTML */}
                <div className="bg-card border border-border rounded-2xl p-5 space-y-3 shadow-sm flex flex-col">
                    <div className="flex items-center justify-between border-b border-border/50 pb-2">
                        <div className="flex items-center gap-2 font-black text-[10px] text-muted-foreground uppercase tracking-widest">
                            <Code2 className="w-4 h-4 text-orange-500" />
                            {isEn ? 'Markup (HTML)' : '마크업 (HTML)'}
                        </div>
                    </div>
                    <textarea
                        value={html}
                        onChange={(e) => setHtml(e.target.value)}
                        className="w-full h-72 p-4 bg-background border-2 border-border/80 focus:border-orange-500 rounded-xl resize-none font-mono text-xs leading-relaxed focus:outline-none shadow-inner transition-colors"
                        placeholder="<div>...</div>"
                    />
                </div>

                {/* CSS */}
                <div className="bg-card border border-border rounded-2xl p-5 space-y-3 shadow-sm flex flex-col">
                    <div className="flex items-center justify-between border-b border-border/50 pb-2">
                        <div className="flex items-center gap-2 font-black text-[10px] text-muted-foreground uppercase tracking-widest">
                            <Layout className="w-4 h-4 text-blue-500" />
                            {isEn ? 'Styling (CSS)' : '스타일 (CSS)'}
                        </div>
                    </div>
                    <textarea
                        value={css}
                        onChange={(e) => setCss(e.target.value)}
                        className="w-full h-72 p-4 bg-background border-2 border-border/80 focus:border-blue-500 rounded-xl resize-none font-mono text-xs leading-relaxed focus:outline-none shadow-inner transition-colors"
                        placeholder=".class { ... }"
                    />
                </div>

                {/* JavaScript */}
                <div className="bg-card border border-border rounded-2xl p-5 space-y-3 shadow-sm flex flex-col relative">
                    <div className="flex items-center justify-between border-b border-border/50 pb-2">
                        <div className="flex items-center gap-2 font-black text-[10px] text-muted-foreground uppercase tracking-widest">
                            <Terminal className="w-4 h-4 text-yellow-500" />
                            {isEn ? 'Scripts (JS)' : '스크립트 (JS)'}
                        </div>
                        <button 
                            onClick={handleClear}
                            className="p-1 px-2 text-[10px] font-bold text-muted-foreground hover:text-red-500 flex items-center gap-1 transition-colors"
                        >
                            <Trash2 size={12} /> {isEn ? 'Clear' : '전체 삭제'}
                        </button>
                    </div>
                    <textarea
                        value={js}
                        onChange={(e) => setJs(e.target.value)}
                        className="w-full h-72 p-4 bg-background border-2 border-border/80 focus:border-yellow-500 rounded-xl resize-none font-mono text-xs leading-relaxed focus:outline-none shadow-inner transition-colors"
                        placeholder="console.log('...')"
                    />
                </div>
            </div>

            {/* Preview Section */}
            <div className="bg-card border border-border rounded-2xl p-6 space-y-4 shadow-lg animate-in fade-in zoom-in-95 duration-500">
                <div className="flex items-center justify-between border-b border-border/50 pb-4">
                    <div className="flex items-center gap-2">
                        <Boxes className="w-5 h-5 text-slate-600" />
                        <h2 className="text-lg font-black tracking-tight">{isEn ? 'Live Interactive Preview' : '실시간 동적 미리보기'}</h2>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest hidden sm:block animate-pulse">
                            {isEn ? 'Live Compiling...' : '실시간 렌더링 중...'}
                        </span>
                        <button
                            onClick={runCode}
                            className="flex items-center gap-2 px-6 py-2 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-xl hover:scale-105 active:scale-95 transition-all text-sm font-black shadow-md"
                        >
                            <Play className="w-4 h-4" />
                            {isEn ? 'FORCED RUN' : '강제 실행'}
                        </button>
                    </div>
                </div>
                <div className="bg-white rounded-xl border border-border/50 min-h-[500px] shadow-inner overflow-hidden relative group">
                    <iframe
                        srcDoc={output}
                        title="preview"
                        sandbox="allow-scripts allow-modals"
                        className="w-full h-[500px] border-none"
                    />
                    {/* Visual iframe frame decoration */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 via-blue-400 to-yellow-400 opacity-20"></div>
                </div>
            </div>

            <div className="bg-slate-500/5 border border-slate-500/10 rounded-2xl p-6 text-sm text-foreground space-y-4">
                <h3 className="font-black text-lg flex items-center gap-2 text-slate-700 dark:text-slate-400">💡 {isEn ? 'Speed Up Your Workflow' : '웹 에디터 활용 팁'}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="space-y-2">
                        <p className="font-bold text-xs uppercase tracking-widest text-slate-500">{isEn ? 'Fast Prototyping' : '빠른 시제품 제작'}</p>
                        <p className="text-xs text-muted-foreground leading-relaxed">{isEn ? 'Quickly build and share small layouts or UI components before integrating them into large projects.' : '복잡한 설정 없이 브라우저에서 바로 UI 레이아웃을 코딩하고 즉시 결과를 상사나 동료에게 보여줄 수 있습니다.'}</p>
                    </div>
                    <div className="space-y-2">
                        <p className="font-bold text-xs uppercase tracking-widest text-slate-500">{isEn ? 'Library Testing' : '라이브러리 검증'}</p>
                        <p className="text-xs text-muted-foreground leading-relaxed">{isEn ? 'Test external libraries like Tailwind or FontAwesome by including their CDN links directly in HTML.' : '테일윈드(Tailwind)나 폰트어썸 같은 외부 라이브러리 CDN 링크를 HTML 헤더에 바로 넣어 테스트하기 좋습니다.'}</p>
                    </div>
                    <div className="space-y-2">
                        <p className="font-bold text-xs uppercase tracking-widest text-slate-500">{isEn ? 'Coding Education' : '학습 및 교육용'}</p>
                        <p className="text-xs text-muted-foreground leading-relaxed">{isEn ? 'Ideal for learners to see immediate visual results of their code changes in real-time.' : '코딩 학습자가 HTML/CSS의 상호 작용을 시각적으로 즉시 이해하기 가장 좋은 환경을 제공합니다.'}</p>
                    </div>
                </div>
            </div>

            <ToolGuide
                title={isEn ? "Ultimate Web Sandbox Guide" : "웹 에디터 통합 활용 가이드"}
                intro={isEn 
                    ? "Our integrated sandbox facilitates zero-latency coding experiments. Leverage the isolated preview to safely test potentially breaking layout shifts." 
                    : "개발자 및 퍼블리셔의 창의적인 실험을 위해 설계된 온라인 샌드박스입니다. 실제 웹 환경과 동일한 렌더링 엔진을 통해 코드를 시뮬레이션하고 최적화하세요."}
                steps={toolSteps}
                tips={toolTips}
                faqs={toolFaqs}
            />
        </div>
    );
};

export default WebEditor;
