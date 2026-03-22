import React, { useState } from 'react';
import { Copy, Check, FileCode, Trash2 } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { useLanguage } from '../context/LanguageContext';

const JsonFormatter = () => {
    const { lang, t } = useLanguage();
    const isEn = lang === 'en';

    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);

    const formatJson = () => {
        setError('');
        try {
            const parsed = JSON.parse(input);
            const formatted = JSON.stringify(parsed, null, 2);
            setOutput(formatted);
        } catch (err) {
            setError((isEn ? 'JSON Parsing Failed: ' : 'JSON 파싱 실패: ') + err.message);
            setOutput('');
        }
    };

    const minifyJson = () => {
        setError('');
        try {
            const parsed = JSON.parse(input);
            const minified = JSON.stringify(parsed);
            setOutput(minified);
        } catch (err) {
            setError((isEn ? 'JSON Parsing Failed: ' : 'JSON 파싱 실패: ') + err.message);
            setOutput('');
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    const validateJson = () => {
        setError('');
        try {
            JSON.parse(input);
            setError('');
            setOutput(isEn ? '✅ Valid JSON! Structure is syntactically perfect.' : '✅ 유효한 JSON입니다! 구조에 결함이 없습니다.');
        } catch (err) {
            setError((isEn ? '❌ Invalid JSON: ' : '❌ 유효하지 않은 JSON: ') + err.message);
            setOutput('');
        }
    };

    const handleClear = () => {
        setInput('');
        setOutput('');
        setError('');
    };

    const titleText = isEn ? t('tools.json-formatter.title') : "JSON 뷰어/포맷터 - Utility Hub";
    const descText = isEn 
        ? t('tools.json-formatter.description')
        : "JSON 데이터를 보기 좋게 포맷팅하거나 압축할 수 있습니다. JSON 유효성 검사 기능도 제공합니다.";
    const keywordsText = isEn 
        ? "json formatter, json minifier, beautify json, validate json, online dev tools" 
        : "JSON, JSON 포맷터, JSON 뷰어, JSON 검증, JSON 압축, 개발자도구";

    const faqs = isEn ? [
        {
            q: "Why does it say 'Invalid' even with correct-looking keys?",
            a: "Standard JSON explicitly requires double quotes (\") for both keys and string values. Single quotes or missing quotes will naturally cause parsing errors."
        },
        {
            q: "Does this handle nested objects or arrays?",
            a: "Absolutely! Our tool recursively formats deeply nested JSON hierarchies with accurate two-space indentation for maximum readability."
        }
    ] : [
        { "q": "JSON 형식이 유효하지 않다고 나옵니다.", "a": "마지막 항목 뒤에 불필요한 쉼표(,)가 있거나, 키 이름에 큰따옴표가 없는 경우, 혹은 홑따옴표(')를 사용한 경우에 오류가 자주 발생합니다." },
        { "q": "입력한 데이터가 외부 서버로 전송되나요?", "a": "아니요, 모든 분석과 변환은 사용자의 브라우저 내에서만 이루어지며 어떤 데이터도 외부로 전송되거나 저장되지 않습니다." }
    ];

    const steps = isEn ? [
        "Select the left input pane and paste your raw or malformed JSON payload.",
        "Choose 'Format' to beautify with indentation, or 'Minify' to remove all whitespaces.",
        "Click 'Validate' if you're purely checking for syntax errors or trailing commas.",
        "Use the top right copy button on the output pane to grab the results."
    ] : [
        "좌측 입력창에 정리가 필요한 JSON 텍스트를 붙여넣으세요.",
        "상단 '포맷팅' 버튼을 누르면 보기 좋게 들여쓰기된 결과를 즉시 확인할 수 있습니다.",
        "데이터 크기를 줄이고 싶다면 '압축' 버튼을, 문법 오류만 찾고 싶다면 '검증' 버튼을 활용하세요.",
        "우측 결과 화면의 '복사' 버튼으로 변환된 내용을 가져갑니다."
    ];

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            <SEO
                title={titleText}
                description={descText}
                keywords={keywordsText}
                category="dev"
                faqs={faqs}
                steps={steps}
            />

            <header className="text-center space-y-4">
                <div className="inline-flex items-center justify-center p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl text-emerald-600 dark:text-emerald-400 mb-2 border border-emerald-200 dark:border-emerald-800">
                    <FileCode className="w-8 h-8" />
                </div>
                <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
                    {isEn ? 'JSON Formatter & Validator' : 'JSON 뷰어/포맷터'}
                </h1>
                <p className="text-muted-foreground">
                    {isEn ? 'Beautify, compress, and troubleshoot your JSON structures effortlessly.' : 'JSON 데이터를 포맷팅하고 검증하여 가독성을 높이세요'}
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Input */}
                <div className="bg-card border border-border rounded-xl p-6 space-y-4 shadow-sm">
                    <div className="flex items-center justify-between">
                        <label className="block text-sm font-bold text-muted-foreground uppercase tracking-wider">
                            {isEn ? 'Source JSON' : 'JSON 원본'}
                        </label>
                        <button 
                            onClick={handleClear}
                            className="p-2 hover:bg-red-500/10 text-muted-foreground hover:text-red-500 rounded-lg transition-colors"
                            title={isEn ? "Clear input" : "내용 지우기"}
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder='{"name": "John", "age": 30, "admin": true}'
                        className="w-full h-[450px] px-4 py-3 bg-background border-2 border-border/80 focus:border-emerald-500 rounded-xl resize-none font-mono text-sm focus:outline-none shadow-inner transition-colors"
                    />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <button
                            onClick={formatJson}
                            disabled={!input.trim()}
                            className="px-4 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all disabled:opacity-50 font-bold shadow-md active:scale-95"
                        >
                            {isEn ? 'Beautify Format' : '가독성 포맷팅'}
                        </button>
                        <button
                            onClick={minifyJson}
                            disabled={!input.trim()}
                            className="px-4 py-3 bg-secondary hover:bg-accent rounded-xl transition-colors disabled:opacity-50 font-bold border border-border"
                        >
                            {isEn ? 'Minify Payload' : '한 줄 압축'}
                        </button>
                        <button
                            onClick={validateJson}
                            disabled={!input.trim()}
                            className="px-4 py-3 bg-secondary hover:bg-accent rounded-xl transition-colors disabled:opacity-50 font-bold border border-border"
                        >
                            {isEn ? 'Validate Check' : '문법 검증'}
                        </button>
                    </div>
                </div>

                {/* Output */}
                <div className="bg-card border border-border rounded-xl p-6 space-y-4 shadow-sm">
                    <div className="flex items-center justify-between">
                        <label className="block text-sm font-bold text-muted-foreground uppercase tracking-wider">
                            {isEn ? 'Formatted Output' : '변환 결과'}
                        </label>
                        {output && !error && (
                            <button
                                onClick={copyToClipboard}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-bold text-sm transition-all ${copied ? 'bg-green-500 text-white shadow-sm' : 'bg-secondary hover:bg-accent text-muted-foreground border border-border'}`}
                            >
                                {copied ? (
                                    <>
                                        <Check className="w-4 h-4" />
                                        {isEn ? 'Copied' : '복사됨'}
                                    </>
                                ) : (
                                    <>
                                        <Copy className="w-4 h-4" />
                                        {isEn ? 'Copy Results' : '결과 복사'}
                                    </>
                                )}
                            </button>
                        )}
                    </div>
                    <textarea
                        value={output}
                        readOnly
                        placeholder={isEn ? "Formatted and cleaned JSON results will appear here..." : "변환된 결과가 여기에 표시됩니다"}
                        className="w-full h-[450px] px-4 py-3 bg-background border-2 border-border/80 rounded-xl resize-none font-mono text-sm focus:outline-none shadow-inner"
                    />
                    {error && (
                        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-600 dark:text-red-400 text-xs break-all font-mono leading-relaxed animate-in fade-in slide-in-from-bottom-2">
                             <span className="font-bold underline mr-2">ERROR:</span> {error}
                        </div>
                    )}
                </div>
            </div>

            <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-2xl p-6 text-sm text-foreground space-y-4">
                <h3 className="font-black text-lg flex items-center gap-2 text-emerald-700 dark:text-emerald-400">💡 {isEn ? 'Best Practice Guidelines' : 'JSON 작업 가이드'}</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-medium text-muted-foreground">
                    <li className="flex gap-2">
                        <span className="text-emerald-500 font-bold">1.</span>
                        <span>{isEn ? 'Always verify that every key is enclosed strictly in double quotes.' : 'JSON 표준 규격에서 키(Key)는 반드시 큰따옴표로 감싸야 합니다.'}</span>
                    </li>
                    <li className="flex gap-2">
                        <span className="text-emerald-500 font-bold">2.</span>
                        <span>{isEn ? 'Remove trailing commas from precisely the last item in an array or object block.' : '배열이나 객체의 마지막 항목 뒤에는 쉼표가 붙지 않도록 주의하세요.'}</span>
                    </li>
                    <li className="flex gap-2">
                        <span className="text-emerald-500 font-bold">3.</span>
                        <span>{isEn ? 'Use Minify for production deployment to reduce unnecessary byte transfer weight.' : '최종 서비스 배포 시에는 압축 모드를 사용하여 전송량을 줄이는 것이 좋습니다.'}</span>
                    </li>
                    <li className="flex gap-2">
                        <span className="text-emerald-500 font-bold">4.</span>
                        <span>{isEn ? 'Beautify mode is perfect for debugging and code review sessions during development.' : '포맷팅 기능을 이용하면 복잡한 데이터 구조를 한눈에 파악하기 매우 수월합니다.'}</span>
                    </li>
                </ul>
            </div>
            
            <ToolGuide
                title={isEn ? "Advanced JSON Formatter Guide" : "JSON 포맷터 상세 가이드"}
                intro={isEn 
                    ? "Our utility provides a secure, locally-rendered interface to manage your JSON data perfectly. Designed for developers needing rapid debugging without data leaks." 
                    : "개발자 및 데이터 관리자를 위해 기획된 JSON 통합 도구입니다. 복잡하게 얽힌 JSON 데이터를 사람이 읽기 편하게 정리하거나 기계가 처리하기 좋게 압축하세요."}
                steps={steps}
                tips={isEn ? [
                    "JSON (JavaScript Object Notation) is natively the most popular open standard for data exchange.",
                    "Our parser runs strictly on your machine's CPU, meaning sensitive tokens or secrets never leave your browser.",
                    "If you encounter failures, look for missing brackets [] or braces {} which often break structural balance."
                ] : [
                    "JSON은 자바스크립트 객체 표기법에서 파생되었지만 현재 모든 언어에서 사용되는 표준 데이터 형식입니다.",
                    "모든 작업은 브라우저 내에서만 완결되므로 API Key나 토큰 정보가 포함된 데이터도 안심하고 작업할 수 있습니다.",
                    "구조가 깨진 것 같다면 중괄호{}와 대괄호[]의 짝이 잘 맞는지 가장 먼저 확인해 보세요."
                ]}
                faqs={faqs}
            />
        </div>
    );
};

export default JsonFormatter;
