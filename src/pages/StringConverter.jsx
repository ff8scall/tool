import React, { useState } from 'react';
import { Copy, Check, Type, RefreshCw, Trash2 } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { useLanguage } from '../context/LanguageContext';

const StringConverter = () => {
    const { lang, t } = useLanguage();
    const isEn = lang === 'en';

    const [input, setInput] = useState('');
    const [copied, setCopied] = useState('');

    const conversions = [
        {
            name: isEn ? 'UPPERCASE' : '대문자 (UPPERCASE)',
            convert: (str) => str.toUpperCase()
        },
        {
            name: isEn ? 'lowercase' : '소문자 (lowercase)',
            convert: (str) => str.toLowerCase()
        },
        {
            name: isEn ? 'Sentence case' : '첫 글자만 대문자 (Sentence case)',
            convert: (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
        },
        {
            name: isEn ? 'Title Case' : '단어별 첫 글자 대문자 (Title Case)',
            convert: (str) => str.replace(/\b\w/g, c => c.toUpperCase())
        },
        {
            name: isEn ? 'No Space' : '모든 공백 제거 (No Space)',
            convert: (str) => str.replace(/\s+/g, '')
        },
        {
            name: isEn ? 'Trim Whitespace' : '앞뒤 공백만 제거 (Trim)',
            convert: (str) => str.trim()
        },
        {
            name: isEn ? 'No Newlines' : '줄바꿈을 공백으로 (No Newlines)',
            convert: (str) => str.replace(/\n/g, ' ')
        },
        {
            name: isEn ? 'Reverse String' : '문자열 뒤집기 (Reverse)',
            convert: (str) => str.split('').reverse().join('')
        }
    ];

    const copyToClipboard = (text, label) => {
        if (!text) return;
        navigator.clipboard.writeText(text);
        setCopied(label);
        setTimeout(() => setCopied(''), 1500);
    };

    const handleClear = () => {
        setInput('');
    };

    const titleText = t('tools.string-converter.title');
    const descText = t('tools.string-converter.description');
    const keywordsText = isEn ? "string converter, uppercase lowercase, remove spaces, title case tool, reverse text online" : "문자열변환기, 대소문자변환, 공백제거, 텍스트편집, 첫글자대문자, 문자열뒤집기, 온라인텍스트도구";

    const toolFaqs = isEn ? [
        {
            q: "What specific modifications can I perform here?",
            a: "We provide 8 essential logic blocks: Upper/Lower case, Sentence/Title case formatting, Whitespace/Newline removal, and complete String Reversal."
        },
        {
            q: "Will this corrupt data from non-English languages?",
            a: "No! While case-related features only apply to Latin alphabets, our whitespace removal and string reversal logic works perfectly across all Unicode characters (Korean, Japanese, emojis, etc.)."
        }
    ] : [
        { "q": "어떤 종류의 변환이 가능한가요?", "a": "영어 대소문자 상호 변환, 문장 첫 글자 대문자화, 공백 및 줄바꿈 제거, 문자열 역순 정렬 등 8가지 필수 변환 기능을 제공합니다." },
        { "q": "한글도 변환이 되나요?", "a": "대소문자 구분이 없는 한글의 경우 대소문자 변환은 적용되지 않으나, 공백 제거, 줄바꿈 제거, 문자열 뒤집기 기능은 정상적으로 작동합니다." }
    ];

    const toolSteps = isEn ? [
        "Insert or paste your messy sentence strings into the large input region top-center.",
        "Scan the 8 live-updating result cards beneath to find your preferred format.",
        "Hit the copy icon specifically in the top right of your chosen result box."
    ] : [
        "상단 입력창에 변환하고 싶은 텍스트를 입력하거나 붙여넣으세요.",
        "텍스트를 입력하면 하단에 8가지 변환 결과가 실시간으로 나타납니다.",
        "원하는 변환 방식의 카드 오른쪽 상단에 있는 복사 아이콘을 눌러 결과를 사용하세요."
    ];

    const toolTips = isEn ? [
        "Perfect for normalizing coding variable names or cleaning up messy email address lists.",
        "Use Title Case to instantly fix headlines for blogs or documentation drafts.",
        "Trim functionality is natively essential if you suspect hidden trailing spaces causing API authentication failures."
    ] : [
        "코딩 시 변수명을 정리하거나 이메일 주소의 공백을 제거할 때 매우 유용합니다.",
        "Title Case 변환은 영어 제목이나 문서의 헤드라인을 작성할 때 표준 규격에 맞게 도와줍니다.",
        "API 통신 시 의도치 않은 공백 때문에 오류가 난다면 Trim(앞뒤 공백 제거) 기능을 가장 먼저 써보세요."
    ];

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            <SEO
                title={titleText}
                description={descText}
                keywords={keywordsText}
                category="text"
                faqs={toolFaqs}
                steps={toolSteps}
            />

            <header className="text-center space-y-4">
                <div className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-900/30 rounded-2xl text-blue-600 dark:text-blue-400 mb-2 border border-blue-200 dark:border-blue-800 shadow-sm">
                    <Type size={32} />
                </div>
                <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
                    {isEn ? 'Professional String Converter' : '문자열 변환기'}
                </h1>
                <p className="text-muted-foreground">
                    {isEn ? 'Instantly reformulate text formatting with a suite of essential editing modules.' : '복잡한 텍스트 편집, 클릭 한 번으로 완벽하게 변환하세요'}
                </p>
            </header>

            {/* Input Section */}
            <div className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-4 shadow-sm">
                <div className="flex justify-between items-center mb-2 px-1">
                    <label className="block text-sm font-black text-muted-foreground uppercase tracking-widest pl-1">
                        {isEn ? 'Source Content' : '변환할 소스 텍스트'}
                    </label>
                    {input && (
                        <button 
                            onClick={handleClear}
                            className="text-xs font-bold text-muted-foreground hover:text-red-500 flex items-center gap-1 transition-colors"
                        >
                            <Trash2 size={14} /> {isEn ? 'Clear All' : '내용 지우기'}
                        </button>
                    )}
                </div>
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={isEn ? "Paste or type your sentence sequence here..." : "여기에 변환하고 싶은 문장을 입력하세요..."}
                    className="w-full h-44 p-6 bg-background border-2 border-border/80 focus:border-blue-500 rounded-2xl resize-none outline-none font-medium text-lg shadow-inner transition-colors"
                />
            </div>

            {/* Conversions Output Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-12">
                {conversions.map((conv, idx) => {
                    const result = input ? conv.convert(input) : '';
                    return (
                        <div key={idx} className="group bg-card border border-border rounded-2xl p-5 shadow-sm hover:shadow-md transition-all hover:border-blue-500/50">
                            <div className="flex items-center justify-between mb-3 border-b border-border/50 pb-2">
                                <h3 className="font-black text-[10px] text-muted-foreground/60 group-hover:text-blue-600 transition-colors uppercase tracking-widest">{conv.name}</h3>
                                <button
                                    onClick={() => copyToClipboard(result, conv.name)}
                                    disabled={!result}
                                    className={`p-2 rounded-lg transition-all border ${copied === conv.name ? 'bg-green-500 border-green-500 text-white' : 'bg-background hover:bg-secondary text-muted-foreground border-border'}`}
                                    title={isEn ? "Copy Result" : "결과 복사"}
                                >
                                    {copied === conv.name ? (
                                        <Check className="w-4 h-4" />
                                    ) : (
                                        <Copy className="w-4 h-4" />
                                    )}
                                </button>
                            </div>
                            <div className="p-4 bg-background/50 rounded-xl text-lg break-all min-h-[4rem] flex items-center font-medium leading-relaxed lining-nums">
                                {result || <span className="text-muted-foreground/30 text-xs italic font-normal">{isEn ? 'Waiting for input...' : '입력 시 결과가 표시됩니다.'}</span>}
                            </div>
                        </div>
                    );
                })}
            </div>

            <ToolGuide
                title={isEn ? "Text Conversion Mastery Guide" : "문자열 변환기 상세 가이드"}
                intro={isEn 
                    ? "Our utility handles everything from case-shifting to whitespace normalization instantly across local memory for maximum privacy." 
                    : "문서 작업부터 개발 데이터 정제까지 폭넓게 활용할 수 있는 다목적 텍스트 편집 도구입니다. 복잡한 명령어 없이 실시간으로 결과를 확인하며 작업 효율성을 높이세요."}
                steps={toolSteps}
                tips={toolTips}
                faqs={toolFaqs}
            />
        </div>
    );
};

export default StringConverter;
