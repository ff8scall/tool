import React, { useState } from 'react';
import { Copy, Check, Code, ArrowRightLeft, ShieldAlert } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { useLanguage } from '../context/LanguageContext';

const HtmlEncoder = () => {
    const { lang, t } = useLanguage();
    const isEn = lang === 'en';

    const [mode, setMode] = useState('encode');
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [copied, setCopied] = useState(false);

    const htmlEntities = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '/': '&#x2F;'
    };

    const encodeHtml = (text) => {
        return text.replace(/[&<>"'\/]/g, (char) => htmlEntities[char]);
    };

    const decodeHtml = (text) => {
        // Safe DOM parser approach to prevent script execution during decode
        const doc = new DOMParser().parseFromString(text, "text/html");
        return doc.documentElement.textContent;
    };

    const handleConvert = () => {
        if (!input.trim()) return;
        if (mode === 'encode') {
            setOutput(encodeHtml(input));
        } else {
            setOutput(decodeHtml(input));
        }
    };

    const handleSwap = () => {
        setMode(mode === 'encode' ? 'decode' : 'encode');
        setInput(output);
        setOutput(input);
    };

    const copyToClipboard = () => {
        if (!output) return;
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    const keywordsText = isEn ? "html encoder, html decoder, html entity converter, prevent xss, escape html" : "html인코더, html디코더, html엔티티, 특수문자변환, html이스케이프, xss방지";

    const faqs = isEn ? [
        {
            q: "Why is HTML encoding critical for site safety?",
            a: "Browsers passively interpret tags inherently (like <script>). Encoding safely converts these strict characters into pure textual string sequences blocking cross-site scripting executions completely."
        },
        {
            q: "Can I decode huge documents inside the browser?",
            a: "Yes! Processing happens actively natively relying on modern front-end computational layers entirely securely handling extremely long files smoothly offline."
        }
    ] : [
        { "q": "HTML 인코딩(Encoding)은 왜 필요한가요?", "a": "브라우저가 텍스트 내의 특수 문자(<, >, & 등)를 HTML 태그로 오해하여 렌더링하는 것을 방지하기 위함입니다. 또한 XSS(Cross-Site Scripting) 공격으로부터 웹사이트를 보호하는 필수 과정입니다." },
        { "q": "어떤 문자들을 변환해 주나요?", "a": "기본적으로 태그 구분자(<, >), 앰퍼샌드(&), 따옴표(\", '), 그리고 슬래시(/)를 안전한 엔티티 코드로 변환합니다." },
        { "q": "복잡한 HTML 코드도 전체 변환이 가능한가요?", "a": "네, DIV나 SCRIPT 태그가 포함된 전체 소스 코드를 입력하면 해당 태그들이 웹 페이지 상에서 문자로 그대로 보이도록 안전하게 변환해 드립니다." }
    ];

    const steps = isEn ? [
        "Pick strictly whether you'd love to precisely encode plain HTML text or rather decode back existing entities.",
        "Paste payload nodes purely inside the primary left textbox field.",
        "Click the heavy main convert trigger manually confirming transformations.",
        "Grab the resulting encrypted character strings promptly clicking copy buttons attached securely."
    ] : [
        "변환할 소스(원본 HTML 또는 엔티티 코드)를 입력창에 넣으세요.",
        "수행할 작업(인코딩/디코딩)을 모드 버튼으로 선택합니다.",
        "수행 버튼을 누르면 즉시 결과가 화면 상에 생성됩니다.",
        "우측 결과물 우측의 복사 버튼을 눌러 소스코드를 활용하세요."
    ];

    const tips = isEn ? [
        "Use encoding systematically across forums when trying actively displaying <script> code chunks gracefully preventing structural collapses.",
        "Reversing encoded entities occasionally helps deeply analyze underlying invisible node injections originally nested deep inside codebases.",
        "XSS purely depends highly entirely across missing strict entity sanitizations natively!"
    ] : [
        "개발 중 로그 메시지에 HTML 태그를 포함시켜야 할 때 유용하게 활용할 수 있습니다.",
        "웹 게시판이나 블로그에 소스 코드를 포스팅할 때 인코딩된 결과를 복사하여 넣으시면 코드가 깨지지 않고 잘 보입니다.",
        "엔티티 코드(&lt; 등)를 실제 문자로 돌리고 싶다면 디코딩 모드를 활용하세요."
    ];

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <SEO
                title={t('tools.html-encoder.title')}
                description={t('tools.html-encoder.description')}
                keywords={keywordsText}
                category="dev"
                faqs={faqs}
                steps={steps}
            />

            <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl text-emerald-600 dark:text-emerald-400 mb-2 border border-emerald-200 dark:border-emerald-800">
                    <Code className="w-8 h-8" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {isEn ? 'HTML Entity Encoder / Decoder' : 'HTML 인코딩/디코딩'}
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    {isEn ? 'Convert structural characters securely into native HTML entities dynamically offline.' : '특수 문자를 안전한 HTML 엔티티로 즉시 변환하세요.'}
                </p>
            </div>

            {/* Mode Selector */}
            <div className="flex justify-center items-center gap-3 bg-secondary/30 p-2 rounded-2xl w-fit mx-auto border border-border">
                <button
                    onClick={() => setMode('encode')}
                    className={`px-6 md:px-8 py-3 rounded-xl font-bold transition-all text-sm md:text-base ${mode === 'encode'
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'text-muted-foreground hover:bg-secondary/80 hover:text-foreground'
                    }`}
                >
                    {isEn ? 'Encode HTML' : '인코딩 (Encode)'}
                </button>
                <button
                    onClick={handleSwap}
                    className="p-3.5 rounded-xl bg-background border border-border hover:bg-secondary text-foreground hover:text-emerald-600 transition-all shadow-sm active:scale-95 group"
                    title={isEn ? "Swap Modes" : "입력/출력 바꾸기"}
                >
                    <ArrowRightLeft className="w-5 h-5 group-hover:rotate-180 transition-transform duration-300" />
                </button>
                <button
                    onClick={() => setMode('decode')}
                    className={`px-6 md:px-8 py-3 rounded-xl font-bold transition-all text-sm md:text-base ${mode === 'decode'
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'text-muted-foreground hover:bg-secondary/80 hover:text-foreground'
                    }`}
                >
                    {isEn ? 'Decode Entities' : '디코딩 (Decode)'}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                {/* Input Area */}
                <div className="card p-6 space-y-4 border border-border shadow-sm">
                    <div className="flex justify-between items-center px-1">
                        <label className="text-sm font-bold tracking-wider text-muted-foreground uppercase flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                            {mode === 'encode' ? (isEn ? 'Raw HTML Source' : '원본 HTML태그') : (isEn ? 'Encoded Entities' : '엔티티 코드')}
                        </label>
                    </div>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={mode === 'encode' ? '<div><p>Hello & Welcome!</p></div>' : '&lt;div&gt;&lt;p&gt;Hello &amp; Welcome!&lt;/p&gt;&lt;/div&gt;'}
                        className="input w-full h-64 resize-none font-mono text-sm bg-background border-2 border-dashed border-border focus:border-emerald-500"
                    />
                    <button
                        onClick={handleConvert}
                        disabled={!input.trim()}
                        className={`w-full py-4 text-white rounded-xl font-bold text-lg transition-all shadow-md active:scale-[0.98] flex justify-center items-center gap-2 ${!input.trim() ? 'bg-muted-foreground/30 text-muted-foreground shadow-none cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700 hover:shadow-emerald-600/20'}`}
                    >
                        {mode === 'encode' ? (isEn ? 'Execute Encoding' : 'HTML 인코딩 실행') : (isEn ? 'Execute Decoding' : 'HTML 디코딩 실행')}
                    </button>
                </div>

                {/* Output Area */}
                <div className="card p-6 space-y-4 border border-border shadow-sm bg-emerald-50/5 dark:bg-emerald-900/5">
                    <div className="flex items-center justify-between px-1 h-8">
                        <label className="text-sm font-bold tracking-wider text-muted-foreground uppercase flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                            {mode === 'encode' ? (isEn ? 'Encoded Result' : '변환된 결과') : (isEn ? 'Decoded HTML Source' : '원본 HTML 구조')}
                        </label>
                        {output && (
                            <button
                                onClick={copyToClipboard}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold text-xs transition-all ${copied ? 'bg-green-500 text-white' : 'bg-secondary hover:bg-emerald-100 hover:text-emerald-700 dark:hover:bg-emerald-900/30'}`}
                            >
                                {copied ? <Check size={14} /> : <Copy size={14} />}
                                {copied ? (isEn ? 'Copied' : '복사됨') : (isEn ? 'Copy Result' : '복사')}
                            </button>
                        )}
                    </div>
                    <textarea
                        value={output}
                        readOnly
                        placeholder={isEn ? "Conversion output displays clearly here..." : "변환된 결과가 여기에 표시됩니다..."}
                        className="input w-full h-64 resize-none font-mono text-sm shadow-inner bg-secondary/30 text-emerald-800 dark:text-emerald-300 border-border"
                    />
                    <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl flex gap-3 items-start border border-amber-200 dark:border-amber-900/50">
                        <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                        <p className="text-xs text-amber-800 dark:text-amber-300 font-medium leading-relaxed">
                            {isEn 
                                ? "Critical security note: Always encode unknown origin inputs securely on your server backends prior completely avoiding XSS payload execution chains natively entirely." 
                                : "XSS 방지를 위해서는 동적인 사용자 입력값을 렌더링하기 전에 반드시 서버와 클라이언트 양측에서 인코딩 처리를 거쳐야 합니다."}
                        </p>
                    </div>
                </div>
            </div>

            <div className="card p-6 border border-border mt-8">
                <h3 className="font-bold text-foreground mb-6 flex items-center gap-2">
                    <span className="w-2 h-6 bg-emerald-500 rounded-full inline-block"></span>
                    {isEn ? 'Common HTML Entity References' : '주요 HTML 엔티티 참조표'}
                </h3>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(htmlEntities).map(([char, entity]) => (
                        <div key={char} className="flex items-center justify-between p-4 bg-secondary/50 rounded-xl border border-border group hover:border-emerald-400/50 transition-colors">
                            <code className="text-xl font-bold text-emerald-600 dark:text-emerald-400 w-8 text-center">{char}</code>
                            <span className="text-muted-foreground group-hover:text-emerald-500">→</span>
                            <code className="font-mono font-bold text-muted-foreground group-hover:text-foreground">{entity}</code>
                        </div>
                    ))}
                </div>
            </div>

            <ToolGuide
                title={isEn ? "Encoder Defense Strategy" : "HTML 인코더/디코더 상세 가이드"}
                intro={isEn 
                    ? "Executing dynamic frontends securely necessitates perfectly isolating character nodes natively preventing structural DOM exploits completely securely natively." 
                    : "웹 개발 및 콘텐츠 관리 시 HTML 엔티티 변환은 데이터의 무결성과 보안을 위해 필수적인 과정입니다."}
                steps={steps}
                tips={tips}
                faqs={faqs}
            />
        </div>
    );
};

export default HtmlEncoder;
