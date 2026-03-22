import React, { useState } from 'react';
import { Copy, Check, Code, ArrowRightLeft, ShieldAlert } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';

const HtmlEncoder = () => {
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
        const textarea = document.createElement('textarea');
        textarea.innerHTML = text;
        return textarea.value;
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

    const toolFaqs = [
        {
            "q": "HTML 인코딩(Encoding)은 왜 필요한가요?",
            "a": "브라우저가 텍스트 내의 특수 문자(<, >, & 등)를 HTML 태그로 오해하여 렌더링하는 것을 방지하기 위함입니다. 또한 XSS(Cross-Site Scripting) 공격으로부터 웹사이트를 보호하는 보안 필수 과정입니다."
        },
        {
            "q": "어떤 문자들을 변환해 주나요?",
            "a": "기본적으로 태그 구분자(<, >), 앰퍼샌드(&), 따옴표(\", '), 그리고 슬래시(/)를 안전한 엔티티 코드로 변환합니다."
        },
        {
            "q": "복잡한 HTML 코드도 전체 변환이 가능한가요?",
            "a": "네, DIV나 SCRIPT 태그가 포함된 전체 소스 코드를 입력하면 해당 태그들이 웹 페이지 상에서 문자로 그대로 보이도록 안전하게 변환해 드립니다."
        }
    ];

    const toolSteps = [
        "변환할 소스(원본 HTML 또는 엔티티 코드)를 입력창에 넣으세요.",
        "수행할 작업(인코딩/디코딩)을 모드 버튼으로 선택합니다.",
        "인코딩/디코딩 버튼을 누르면 즉시 결과가 옆 창에 생성됩니다."
    ];

    const toolTips = [
        "개발 중 로그 메시지에 HTML 태그를 포함시켜야 할 때 유용하게 활용할 수 있습니다.",
        "웹 게시판이나 블로그에 소스 코드를 포스팅할 때 인코딩된 결과를 복사하여 넣으시면 코드가 깨지지 않고 잘 보입니다.",
        "엔티티 코드(&lt; 등)를 실제 문자로 돌리고 싶다면 디코딩 모드를 활용하세요."
    ];

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <SEO
                title="HTML 인코더/디코더 | HTML 엔티티 및 특수문자 변환 도구"
                description="HTML 특수문자를 안전하게 인코딩하거나 디코딩하세요. XSS 방지 및 소스 코드 표기에 필수적인 HTML 엔티티 변환 기능을 실시간으로 제공합니다."
                keywords="html인코더, html디코더, html엔티티, 특수문자변환, html이스케이프, xss방지, 웹개발도구"
                category="dev"
                faqs={toolFaqs}
                steps={toolSteps}
            />

            <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center p-3 bg-emerald-600 rounded-2xl text-white mb-4 shadow-lg">
                    <Code size={32} />
                </div>
                <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-3 tracking-tight">
                    HTML 인코딩/디코딩
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                    특수 문자를 안전한 HTML 엔티티로 즉시 변환하세요.
                </p>
            </div>

            {/* Mode Selector */}
            <div className="flex justify-center items-center gap-3 mb-8">
                <button
                    onClick={() => setMode('encode')}
                    className={`px-8 py-3 rounded-2xl font-black transition-all shadow-md active:scale-95 ${mode === 'encode'
                        ? 'bg-emerald-600 text-white shadow-emerald-200 dark:shadow-none'
                        : 'bg-white dark:bg-gray-800 text-gray-500 border border-gray-100 dark:border-gray-700 hover:bg-gray-50'
                    }`}
                >
                    인코딩 (Encode)
                </button>
                <button
                    onClick={handleSwap}
                    className="p-3 rounded-full bg-white dark:bg-gray-800 border-2 border-emerald-100 dark:border-emerald-900/30 text-emerald-600 hover:bg-emerald-50 transition-all shadow-sm active:rotate-180"
                    title="입력/출력 바꾸기"
                >
                    <ArrowRightLeft size={20} />
                </button>
                <button
                    onClick={() => setMode('decode')}
                    className={`px-8 py-3 rounded-2xl font-black transition-all shadow-md active:scale-95 ${mode === 'decode'
                        ? 'bg-emerald-600 text-white shadow-emerald-200 dark:shadow-none'
                        : 'bg-white dark:bg-gray-800 text-gray-500 border border-gray-100 dark:border-gray-700 hover:bg-gray-50'
                    }`}
                >
                    디코딩 (Decode)
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {/* Input Area */}
                <div className="bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 rounded-3xl p-8 shadow-xl">
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-4 ml-1">
                        {mode === 'encode' ? 'Source HTML Content' : 'Encoded Entities'}
                    </label>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={mode === 'encode' ? '<div>Hello & Welcome</div>' : '&lt;div&gt;Hello &amp; Welcome&lt;/div&gt;'}
                        className="w-full h-80 p-6 bg-gray-50 dark:bg-gray-900 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl resize-none font-mono text-base focus:outline-none focus:border-emerald-500 transition-all dark:text-white"
                    />
                    <button
                        onClick={handleConvert}
                        disabled={!input.trim()}
                        className="w-full mt-6 py-4 bg-emerald-700 text-white rounded-2xl font-black text-lg hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-emerald-100 dark:shadow-none disabled:opacity-30"
                    >
                        {mode === 'encode' ? 'HTML 인코딩 실행' : 'HTML 디코딩 실행'}
                    </button>
                </div>

                {/* Output Area */}
                <div className="bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 rounded-3xl p-8 shadow-xl">
                    <div className="flex items-center justify-between mb-4">
                        <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
                            {mode === 'encode' ? 'Encoded Result' : 'Original Content'}
                        </label>
                        {output && (
                            <button
                                onClick={copyToClipboard}
                                className={`flex items-center gap-2 px-4 py-1.5 rounded-xl font-bold text-sm transition-all ${copied ? 'bg-green-500 text-white' : 'bg-gray-100 dark:bg-gray-900 text-gray-500 hover:bg-emerald-50 hover:text-emerald-600'}`}
                            >
                                {copied ? <Check size={16} /> : <Copy size={16} />}
                                {copied ? '복사됨' : '전체 복사'}
                            </button>
                        )}
                    </div>
                    <textarea
                        value={output}
                        readOnly
                        placeholder="변환된 결과가 여기에 표시됩니다..."
                        className="w-full h-80 p-6 bg-emerald-50/30 dark:bg-gray-900/50 border-2 border-emerald-100/50 dark:border-gray-700 rounded-2xl resize-none font-mono text-base focus:outline-none text-emerald-900 dark:text-emerald-200 shadow-inner"
                    />
                    <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-2xl flex gap-3 items-start border border-amber-100 dark:border-amber-900/30">
                        <ShieldAlert className="w-5 h-5 text-amber-600 mt-0.5" />
                        <p className="text-xs text-amber-700 dark:text-amber-400 font-medium leading-relaxed">
                            XSS 방지를 위해서는 동적인 사용자 입력값을 렌더링하기 전에 반드시 서버와 클라이언트 양측에서 인코딩 처리를 거쳐야 합니다.
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-3xl p-8 mb-12 shadow-sm">
                <h3 className="font-black text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <span className="w-2 h-6 bg-emerald-500 rounded-full inline-block"></span>
                    💡 주요 HTML 엔티티 참조표
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {Object.entries(htmlEntities).map(([char, entity]) => (
                        <div key={char} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-700 group hover:border-emerald-300 transition-colors">
                            <code className="text-lg font-bold text-emerald-700 dark:text-emerald-400">{char}</code>
                            <span className="text-gray-300 dark:text-gray-600">→</span>
                            <code className="font-mono font-bold text-gray-600 dark:text-gray-300 group-hover:text-emerald-600">{entity}</code>
                        </div>
                    ))}
                </div>
            </div>

            <ToolGuide
                title="HTML 인코더/디코더 상세 가이드"
                intro="웹 개발 및 콘텐츠 관리 시 HTML 엔티티 변환은 데이터의 무결성과 보안을 위해 필수적인 과정입니다. 본 온라인 도구는 복잡한 하드코딩 없이도 특수 문자를 안전하게 처리할 수 있도록 직관적인 인터페이스를 제공합니다."
                steps={toolSteps}
                tips={toolTips}
                faqs={toolFaqs}
            />
        </div>
    );
};

export default HtmlEncoder;
