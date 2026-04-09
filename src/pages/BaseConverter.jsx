import React, { useState, useEffect } from 'react';
import { Binary, Copy, Check } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { useLanguage } from '../context/LanguageContext';

const BaseConverter = () => {
    const { lang, t } = useLanguage();
    const isEn = lang === 'en';

    // Added default 10 to ensure binary conversions start logically immediately
    const [inputValue, setInputValue] = useState('10');
    const [inputBase, setInputBase] = useState(10);
    const [results, setResults] = useState({});
    const [copiedKey, setCopiedKey] = useState(null);

    useEffect(() => {
        convertBase(inputValue, inputBase);
        // eslint-disable-next-line
    }, []);

    const convertBase = (value, fromBase) => {
        if (!value.trim()) {
            setResults({});
            return;
        }

        try {
            // Remove spaces from input
            const cleanValue = value.replace(/\s+/g, '');
            const decimal = parseInt(cleanValue, fromBase);

            if (isNaN(decimal)) {
                setResults({ error: isEn ? 'Invalid input sequence strictly targeting chosen base type' : '유효하지 않은 입력값입니다' });
                return;
            }

            setResults({
                binary: decimal.toString(2),
                octal: decimal.toString(8),
                decimal: decimal.toString(10),
                hexadecimal: decimal.toString(16).toUpperCase()
            });
        } catch (error) {
            setResults({ error: isEn ? 'Math execution payload broken' : '변환 중 오류가 발생했습니다' });
        }
    };

    const handleInputChange = (value) => {
        setInputValue(value);
        convertBase(value, inputBase);
    };

    const handleBaseChange = (base) => {
        setInputBase(base);
        if (inputValue.trim()) {
            convertBase(inputValue, base);
        }
    };

    const copyToClipboard = (text, key) => {
        navigator.clipboard.writeText(text);
        setCopiedKey(key);
        setTimeout(() => setCopiedKey(null), 1500);
    };

    const titleText = t('tools.base-converter.title');
    const descText = t('tools.base-converter.description');
    const keywordsText = t('tools.base-converter.keywords');

    const faqs = isEn ? [
        {
            q: "Can I enter spaced sequences like '1010 1100' instead explicitly?",
            a: "Yes. Our input natively strips out arbitrary white spatial bytes dynamically calculating accurate roots easily perfectly."
        },
        {
            q: "Why does the app cap excessively massive inputs typically?",
            a: "Standard Javascript numerical limits top roughly out safely strictly avoiding architecture precision buffer overflows during translation."
        }
    ] : [
        { "q": "띄어쓰기가 포함된 값도 입력 가능한가요?", "a": "네, 공백이나 여백이 섞여 있어도 자동으로 제거하고 순수 숫자값만으로 로직을 수행합니다." },
        { "q": "결과에 오류가 뜨는 이유는 무엇인가요?", "a": "현재 선택한 진수 체계에서 유효하지 않은 문자(예: 2진수인데 3을 입력)를 포함할 경우 에러가 발생합니다." }
    ];

    const steps = isEn ? [
        "Pick exactly the numeric system base belonging currently firmly corresponding closely to your initial input.",
        "Insert character inputs natively inside the core centered textbox simply.",
        "Explore immediately translated multi-formatted results simultaneously popping precisely beneath your field.",
        "Copy securely clicking any relevant result box strictly."
    ] : [
        "입력하려는 숫자가 현재 몇 진수인지 목록에서 선택하세요.",
        "입력창에 실제 숫자를 기입합니다 (선택한 진수에 맞는 문자만 지원합니다).",
        "별도 버튼 없이 실시간으로 변환된 4가지 결과가 노출됩니다.",
        "원하는 결과 우측의 복사 버튼을 눌러 결과값을 가져갑니다."
    ];

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <SEO
                title={titleText}
                description={descText}
                keywords={keywordsText}
                category="dev"
                faqs={faqs}
                steps={steps}
            />

            <header className="text-center space-y-4">
                <div className="inline-flex items-center justify-center p-3 bg-purple-100 dark:bg-purple-900/30 rounded-2xl text-purple-600 dark:text-purple-400 mb-2 border border-purple-200 dark:border-purple-800">
                    <Binary className="w-8 h-8" />
                </div>
                <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
                    {isEn ? 'Numeric Base Converter' : '진법 변환기'}
                </h1>
                <p className="text-muted-foreground">
                    {isEn ? 'Convert strictly between natively Binary, Octal, Decimal, Hex values freely.' : '2진수, 8진수, 10진수, 16진수 통합 상호 변환'}
                </p>
            </header>

            {/* Input */}
            <div className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-6 shadow-sm">
                <div>
                    <label className="block text-sm font-bold text-muted-foreground uppercase tracking-widest mb-3">
                        {isEn ? 'Select Origin Base' : '입력 진법 선택'}
                    </label>
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                        {[
                            { base: 2, label: isEn ? 'Binary(2)' : '2진수' },
                            { base: 8, label: isEn ? 'Octal(8)' : '8진수' },
                            { base: 10, label: isEn ? 'Decimal(10)' : '10진수' },
                            { base: 16, label: isEn ? 'Hex(16)' : '16진수' }
                        ].map(({ base, label }) => (
                            <button
                                key={base}
                                onClick={() => handleBaseChange(base)}
                                className={`px-4 py-3 rounded-xl font-bold transition-all shadow-sm active:scale-95 border ${inputBase === base
                                        ? 'bg-purple-600 text-white border-purple-500'
                                        : 'bg-secondary hover:bg-secondary/80 text-muted-foreground border-border/50'
                                    }`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-muted-foreground uppercase tracking-widest mb-3">
                        {isEn ? 'Data Input String' : '입력값 기입'}
                    </label>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => handleInputChange(e.target.value)}
                        placeholder={
                            inputBase === 2 ? (isEn ? 'Example: 101011' : '예: 1010') :
                                inputBase === 8 ? (isEn ? 'Example: 7321' : '예: 12') :
                                    inputBase === 10 ? (isEn ? 'Example: 902' : '예: 10') :
                                        (isEn ? 'Example: A3F2' : '예: A')
                        }
                        className="w-full px-6 py-5 text-2xl font-black bg-background border-2 border-border/80 focus:border-purple-500 rounded-xl font-mono tracking-widest shadow-inner placeholder:font-sans placeholder:text-lg placeholder:tracking-normal placeholder:font-medium transition-colors outline-none"
                    />
                </div>
            </div>

            {/* Results */}
            {results.error ? (
                <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/50 rounded-2xl p-6 text-center animate-in fade-in zoom-in-95 duration-200 shadow-sm">
                    <p className="text-red-600 dark:text-red-400 font-bold flex items-center justify-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                        {results.error}
                    </p>
                </div>
            ) : Object.keys(results).length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-300">
                    {[
                        { key: 'binary', label: isEn ? 'Binary / Base 2' : '2진수 (Binary)', color: 'bg-blue-500', border: 'border-blue-200 dark:border-blue-900' },
                        { key: 'octal', label: isEn ? 'Octal / Base 8' : '8진수 (Octal)', color: 'bg-emerald-500', border: 'border-emerald-200 dark:border-emerald-900' },
                        { key: 'decimal', label: isEn ? 'Decimal / Base 10' : '10진수 (Decimal)', color: 'bg-amber-500', border: 'border-amber-200 dark:border-amber-900' },
                        { key: 'hexadecimal', label: isEn ? 'Hexadecimal / Base 16' : '16진수 (Hexadecimal)', color: 'bg-rose-500', border: 'border-rose-200 dark:border-rose-900' }
                    ].map(({ key, label, color, border }) => (
                        <div key={key} className={`bg-card border ${border} rounded-2xl p-5 hover:shadow-md transition-shadow`}>
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className={`w-3 h-3 rounded-full ${color} shadow-sm`} />
                                    <span className="font-bold text-foreground tracking-tight">{label}</span>
                                </div>
                                <button
                                    onClick={() => copyToClipboard(results[key], key)}
                                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold text-xs transition-all ${copiedKey === key ? 'bg-green-500 text-white shadow-sm' : 'bg-background border border-border hover:bg-secondary text-muted-foreground'}`}
                                >
                                    {copiedKey === key ? <Check size={14} /> : <Copy size={14} />}
                                    {copiedKey === key ? (isEn ? 'Copied' : '복사됨') : (isEn ? 'Copy' : '복사')}
                                </button>
                            </div>
                            <div className="px-4 py-3 bg-secondary/30 border border-border/50 rounded-xl font-mono text-xl font-black text-foreground break-all tracking-wider shadow-inner">
                                {results[key]}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="bg-secondary/40 border border-border/50 rounded-2xl p-6 text-sm text-foreground space-y-4">
                <h3 className="font-black text-lg flex items-center gap-2">
                    <span className="w-2 h-6 bg-purple-500 rounded-full inline-block"></span>
                    💡 {isEn ? 'Understanding the Math Bases' : '진수(Base) 개념 안내'}
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm font-medium text-muted-foreground list-none">
                    <li className="flex gap-2 bg-background p-3 rounded-xl border border-border shadow-sm">
                        <strong className="text-foreground shrink-0 w-16 text-blue-600 dark:text-blue-400">{isEn ? 'Binary:' : '2진수:'}</strong> 
                        <span>{isEn ? 'Zeros & Ones. The purest foundational language interpreted actively natively entirely utilizing logic gates.' : '0과 1로만 기입 (디지털 정보 저장의 기초)'}</span>
                    </li>
                    <li className="flex gap-2 bg-background p-3 rounded-xl border border-border shadow-sm">
                        <strong className="text-foreground shrink-0 w-16 text-emerald-600 dark:text-emerald-400">{isEn ? 'Octal:' : '8진수:'}</strong> 
                        <span>{isEn ? 'Digits 0-7. Historically heavily deployed handling 3-bit chunk intervals across Unix native networking permissions mapping.' : '0~7 사용 (권한 설정 등 특수 목적용)'}</span>
                    </li>
                    <li className="flex gap-2 bg-background p-3 rounded-xl border border-border shadow-sm">
                        <strong className="text-foreground shrink-0 w-16 text-amber-600 dark:text-amber-500">{isEn ? 'Decimal:' : '10진수:'}</strong> 
                        <span>{isEn ? 'Standard numeric format (0-9). The global baseline structurally scaling entirely human mathematical comprehension.' : '0~9 사용 (인간이 일상적으로 쓰는 기본 체계)'}</span>
                    </li>
                    <li className="flex gap-2 bg-background p-3 rounded-xl border border-border shadow-sm">
                        <strong className="text-foreground shrink-0 w-16 text-rose-600 dark:text-rose-400">{isEn ? 'Hex:' : '16진수:'}</strong> 
                        <span>{isEn ? 'Digits 0-9 & letters strictly A-F natively. Widely implemented coloring CSS values efficiently.' : '0~F 사용 (색상 코드 및 데이터 압축 표기용)'}</span>
                    </li>
                </ul>
            </div>
            
            <ToolGuide
                title={isEn ? "Base Conversion Master Guide" : "진법 변환기 활용 가이드"}
                intro={isEn 
                    ? "Effortlessly cross-multiply integers precisely scaling natively between Hex and Binary entirely instantly within safe browser borders dynamically." 
                    : "개발 및 코딩 시 필수적인 다양한 진수 체계를 서로 바꿀 수 있는 유용한 도구입니다. 리눅스나 데이터 통신 등 여러 분야에서 사용됩니다."}
                steps={steps}
                tips={isEn ? [
                    "Remember strictly hexadecimal identifiers intrinsically require alphabetical variants actively mapping towards integers exceeding natively size 10 limits.",
                    "Binary representations drastically inherently span extremely massive visual spaces visually due to possessing completely binary size structures.",
                    "Hex formats massively inherently structure optimal spacing specifically compressing massive byte arrays locally!"
                ] : [
                    "16진수에는 A부터 F까지의 알파벳이 포함됩니다. 코드 작성 시 접두사 0x와 함께 쓰이는 경우가 많습니다.",
                    "2진수 출력 결과가 너무 길어 보인다면 16진수로 변환하여 콤팩트하게 관리하는 것이 효율적입니다.",
                    "입력값의 범위가 너무 크면 자바스크립트의 숫자 정밀도 한계로 인해 정확하지 않을 수 있으니 주의하세요."
                ]}
                faqs={faqs}
            />
        </div>
    );
};

export default BaseConverter;
