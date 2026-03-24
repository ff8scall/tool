import React, { useState } from 'react';
import { Binary, ArrowRightLeft, Copy, Trash2, Check, Globe } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { useLanguage } from '../context/LanguageContext';

const UnicodeConverter = () => {
    const { lang, t } = useLanguage();
    const isEn = lang === 'en';

    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [mode, setMode] = useState('encode'); // 'encode' (Text -> Unicode), 'decode' (Unicode -> Text)
    const [copied, setCopied] = useState(false);

    const convert = (text, currentMode) => {
        if (!text) {
            setOutput('');
            return;
        }

        try {
            if (currentMode === 'encode') {
                // Text to Unicode
                let result = '';
                for (let i = 0; i < text.length; i++) {
                    result += '\\u' + text.charCodeAt(i).toString(16).padStart(4, '0').toUpperCase();
                }
                setOutput(result);
            } else {
                // Unicode to Text
                // Replace \uXXXX with actual characters
                const result = text.replace(/\\u[\dA-F]{4}/gi, (match) => {
                    return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
                });
                setOutput(result);
            }
        } catch (e) {
            setOutput(isEn ? 'Conversion Error. Please verify the Unicode format strictly.' : '변환 중 오류가 발생했습니다. 유니코드 형식을 확인해주세요.');
        }
    };

    const handleInputChange = (e) => {
        const text = e.target.value;
        setInput(text);
        convert(text, mode);
    };

    const handleModeToggle = () => {
        const newMode = mode === 'encode' ? 'decode' : 'encode';
        setMode(newMode);
        // Swap input and output for convenience
        setInput(output);
        convert(output, newMode);
    };

    const handleCopy = () => {
        if (!output) return;
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    const handleClear = () => {
        setInput('');
        setOutput('');
    };

    // Removed titleText and descText as they were not used in SEO and the header uses direct t() calls or isEn ternaries.
    const keywordsText = isEn ? "unicode converter, text to unicode, unicode decoder, hex to text, dev tools online" : "유니코드변환기, unicode converter, 유니코드인코딩, 유니코드디코딩, 한글유니코드변환, 개발자도구, 이스케이프시퀀스";

    const toolFaqs = isEn ? [
        {
            q: "What defines Unicode specifically?",
            a: "Unicode is a universal industrial standard designed strictly to consistently represent every character from every language worldwide using unique numeric code points."
        },
        {
            q: "How does the \\uXXXX escape sequence work?",
            a: "In languages like Javascript and Java, it represents a character using a 4-digit hexadecimal code specifically after the '\\u' identifier. 'XXXX' maps directly to the unique hex integer."
        }
    ] : [
        { "q": "유니코드(Unicode)란 무엇인가요?", "a": "전 세계의 모든 문자를 컴퓨터에서 일관되게 표현하고 다룰 수 있도록 설계된 산업 표준입니다. 각 문자마다 고유한 숫자 값(코드 포인트)을 부여합니다." },
        { "q": "\\uXXXX 형식은 무엇인가요?", "a": "자바스크립트, 자바, C# 등 여러 프로그래밍 언어에서 유니코드 문자를 표현하는 이스케이프 시퀀스 방식입니다. 'XXXX'는 해당 문자의 16진수 코드 값을 나타냅니다." }
    ];

    const toolSteps = isEn ? [
        "Select your conversion direction: 'Text to Unicode' or vice-versa using the center toggle.",
        "Insert the source text strings into the left input window plainly.",
        "Observe the rendered translation appearing instantly on the right result pane.",
        "Copy the output strings using the top-right clipboard interaction."
    ] : [
        "가운데 화살표 버튼을 눌러 인코딩(텍스트→유니코드) 또는 디코딩 모드를 선택하세요.",
        "왼쪽 입력창에 변환하고자 하는 문자열을 입력합니다.",
        "오른쪽 결과창에 실시간으로 생성되는 변환 값을 확인하세요.",
        "우측 상단의 복사 아이콘을 클릭하여 결과물을 클립보드에 저장합니다."
    ];

    const toolTips = isEn ? [
        "Use Unicode escapes to safely include special characters inside programming source codes preventing encoding breaks.",
        "The toggle button allows you to instantly swap input and output for rapid reverse-conversions.",
        "Ensure your Unicode inputs strictly start with the \\u prefix followed by exactly 4 hex characters."
    ] : [
        "소스 코드 내에서 특수 문자를 깨짐 없이 안전하게 포함시키고 싶을 때 매우 유용합니다.",
        "가운데 스왑(Swap) 버튼을 누르면 현재 결과값을 다시 입력값으로 사용하여 반대 방향 변환을 바로 수행할 수 있습니다.",
        "유니코드 입력 시 반드시 \\u 로 시작하는 4자리 16진수 규격을 지켜주세요."
    ];

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            <SEO
                title={t('tools.unicode.title')}
                description={t('tools.unicode.description')}
                keywords={keywordsText}
                category="dev"
                faqs={toolFaqs}
                steps={toolSteps}
            />

            <header className="text-center space-y-4">
                <div className="inline-flex items-center justify-center p-3 bg-violet-100 dark:bg-violet-900/30 rounded-2xl text-violet-600 dark:text-violet-400 mb-2 border border-violet-200 dark:border-violet-800 shadow-sm">
                    <Globe className="w-8 h-8" />
                </div>
                <h1 className="text-3xl font-bold flex items-center justify-center gap-2 tracking-tight">
                    {isEn ? 'Universal Unicode Converter' : '유니코드 변환기'}
                </h1>
                <p className="text-muted-foreground">
                    {isEn ? 'Effortlessly translate between plain text and Unicode escape sequences instantly.' : '텍스트와 유니코드 이스케이프(\\uXXXX)를 실시간으로 상호 변환하세요'}
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-4 md:gap-6 items-start">
                {/* Input Area */}
                <div className="bg-card border border-border rounded-2xl p-6 space-y-4 shadow-sm relative">
                    <label className="block text-[10px] font-black text-muted-foreground uppercase tracking-widest pl-1">
                        {mode === 'encode' ? (isEn ? 'Source Text' : '일반 텍스트 입력') : (isEn ? 'Unicode Source' : '유니코드 입력')}
                    </label>
                    <textarea
                        value={input}
                        onChange={handleInputChange}
                        placeholder={mode === 'encode' ? (isEn ? 'Hello Friend' : '안녕하세요') : '\\uC548\\uB155\\uD558\\uC138\\uC694'}
                        className="w-full h-[400px] p-5 bg-background border-2 border-border/80 focus:border-violet-500 rounded-xl resize-none outline-none font-mono text-sm leading-relaxed shadow-inner transition-colors"
                    />
                </div>

                {/* Center Control */}
                <div className="flex md:flex-col justify-center items-center h-full relative z-10">
                    <button
                        onClick={handleModeToggle}
                        className="p-4 rounded-full bg-background border-2 border-border hover:border-violet-500 hover:text-violet-600 transition-all shadow-md active:scale-95 group"
                        title={isEn ? "Toggle Mode" : "방향 전환"}
                    >
                        <ArrowRightLeft className={`w-8 h-8 transition-transform duration-500 ${mode === 'decode' ? 'rotate-180' : ''}`} />
                    </button>
                    <div className="hidden md:block h-32 w-px bg-gradient-to-b from-transparent via-border to-transparent mt-4"></div>
                </div>

                {/* Output Area */}
                <div className="bg-card border border-border rounded-2xl p-6 space-y-4 shadow-sm">
                    <div className="flex justify-between items-center px-1">
                        <label className="block text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                            {mode === 'encode' ? (isEn ? 'Unicode Results' : '유니코드 출력') : (isEn ? 'Text Results' : '일반 텍스트 출력')}
                        </label>
                        <div className="flex gap-2">
                            <button
                                onClick={handleCopy}
                                className={`p-2 rounded-lg transition-all border ${copied ? 'bg-green-500 border-green-500 text-white' : 'bg-background hover:bg-secondary text-muted-foreground border-border'}`}
                                title={isEn ? "Copy" : "복사"}
                            >
                                {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                            </button>
                            <button
                                onClick={handleClear}
                                className="p-2 rounded-lg bg-background hover:bg-secondary text-muted-foreground border border-border hover:text-red-500 hover:border-red-500/30 transition-all"
                                title={isEn ? "Clear" : "지우기"}
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                    <textarea
                        value={output}
                        readOnly
                        placeholder={isEn ? "Processed results will appear here..." : "변환 결과가 여기에 표시됩니다."}
                        className="w-full h-[400px] p-5 bg-background/50 border-2 border-dashed border-border rounded-xl resize-none outline-none font-mono text-sm leading-relaxed shadow-inner text-foreground/80"
                    />
                </div>
            </div>

            <div className="bg-violet-500/5 border border-violet-500/10 rounded-2xl p-6 text-sm text-foreground space-y-4">
                <h3 className="font-black text-lg flex items-center gap-2 text-violet-700 dark:text-violet-400">💡 {isEn ? 'Developer Guidelines' : '유니코드 활용 팁'}</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm font-medium text-muted-foreground">
                    <li className="flex gap-2">
                        <span className="text-violet-500 font-bold">#</span>
                        <span>{isEn ? 'Prevent character corruption across different database encoding sets by using escapes.' : '각기 다른 DB 인코딩 환경에서도 문자 깨짐 없이 데이터를 안전하게 전송할 수 있습니다.'}</span>
                    </li>
                    <li className="flex gap-2">
                        <span className="text-violet-500 font-bold">#</span>
                        <span>{isEn ? 'Standardize API payloads that require multi-language non-ASCII support.' : '다국어 지원이 필요한 API 통신 시 원본 문자를 유니코드로 표준화하여 관리하세요.'}</span>
                    </li>
                </ul>
            </div>

            <ToolGuide
                title={isEn ? "Unicode Master Integration Guide" : "유니코드 변환기 상세 가이드"}
                intro={isEn 
                    ? "Our utility provides a distraction-free environment to encode or decode Unicode escape sequences. Essential for cross-platform data integrity and web development." 
                    : "텍스트 손실 없이 다국어 데이터를 안전하게 다루기 위한 유니코드 전문 변환 도구입니다. 복잡한 설치 없이 브라우저에서 즉시 개발 생산성을 높이세요."}
                steps={toolSteps}
                tips={toolTips}
                faqs={toolFaqs}
            />
        </div>
    );
};

export default UnicodeConverter;
