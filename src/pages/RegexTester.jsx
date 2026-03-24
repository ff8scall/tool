import React, { useState, useMemo } from 'react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { Search, AlertTriangle, Hash, Zap, BookOpen, Trash2, ListChecks } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const RegexTester = () => {
    const { lang, t } = useLanguage();
    const isEn = lang === 'en';

    const [regexPattern, setRegexPattern] = useState('(\\d{3})-(\\d{4})');
    const [flags, setFlags] = useState('g');
    const [testString, setTestString] = useState('Call us at 010-1234 or write to 02-5678.');

    const result = useMemo(() => {
        if (!regexPattern) return { matches: [], error: null };

        try {
            const regex = new RegExp(regexPattern, flags);
            const matches = [];
            let match;

            // Prevent infinite loops with global flag
            if (!flags.includes('g')) {
                const m = regex.exec(testString);
                if (m) matches.push(m);
            } else {
                // Limit matches to prevent browser crash on bad regex
                let count = 0;
                while ((match = regex.exec(testString)) !== null && count < 1000) {
                    matches.push(match);
                    if (match.index === regex.lastIndex) {
                        regex.lastIndex++;
                    }
                    count++;
                }
            }
            return { matches, error: null };
        } catch (e) {
            return { matches: [], error: e.message };
        }
    }, [regexPattern, flags, testString]);

    const highlightText = () => {
        if (!regexPattern || result.error || result.matches.length === 0) {
            return testString;
        }

        let lastIndex = 0;
        const elements = [];

        result.matches.forEach((match, i) => {
            // Text before match
            if (match.index > lastIndex) {
                elements.push(testString.slice(lastIndex, match.index));
            }

            // Match text
            elements.push(
                <span key={i} className="bg-purple-200 dark:bg-purple-900/50 border-b-2 border-purple-500 font-bold px-0.5 rounded-sm" title={`Match ${i + 1}`}>
                    {match[0]}
                </span>
            );

            lastIndex = match.index + match[0].length;
        });

        // Remaining text
        if (lastIndex < testString.length) {
            elements.push(testString.slice(lastIndex));
        }

        return elements;
    };

    const handleClear = () => {
        setRegexPattern('');
        setTestString('');
    };

    const titleText = t('tools.regex-tester.title');
    const descText = t('tools.regex-tester.description');
    const keywordsText = isEn ? "regex tester, regular expression online, regex debug, javascript regex, pattern matching tool" : "정규식테스터, 정규표현식, RegexTester, 매칭결과, 개발자도구, 자바스크립트정규식";

    const faqs = t('tools.regex-tester.faqs', { returnObjects: true }) || [];
    const steps = t('tools.regex-tester.steps', { returnObjects: true }) || [];

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            <SEO
                title={titleText}
                description={descText}
                keywords={keywordsText}
                category="dev"
                faqs={Array.isArray(faqs) ? faqs : []}
                steps={Array.isArray(steps) ? steps : []}
            />

            <header className="text-center space-y-4">
                <div className="inline-flex items-center justify-center p-3 bg-purple-100 dark:bg-purple-900/30 rounded-2xl text-purple-600 dark:text-purple-400 mb-2 border border-purple-200 dark:border-purple-800 shadow-sm">
                    <Search className="w-8 h-8" />
                </div>
                <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
                    {isEn ? 'Professional Regex Tester' : '정규식 테스터'}
                </h1>
                <p className="text-muted-foreground">
                    {isEn ? 'Validate complex patterns and capture groups with instantaneous visual feedback.' : '정규표현식을 실시간으로 검증하고 텍스트 매칭 결과를 가시적으로 확인하세요'}
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Configuration Panel */}
                <div className="lg:col-span-8 space-y-6">
                    <div className="bg-card border border-border rounded-2xl p-6 space-y-6 shadow-sm">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="md:col-span-3 space-y-2">
                                <label className="block text-xs font-black text-muted-foreground uppercase tracking-widest pl-1">
                                    {isEn ? 'Pattern Specification' : '정규표현식 패턴'}
                                </label>
                                <div className="relative flex items-center group">
                                    <span className="absolute left-4 text-purple-500 font-bold text-lg">/</span>
                                    <input
                                        type="text"
                                        value={regexPattern}
                                        onChange={(e) => setRegexPattern(e.target.value)}
                                        placeholder="[a-zA-Z0-9]+"
                                        className={`w-full pl-8 pr-8 py-4 bg-background border-2 font-mono text-sm rounded-xl focus:outline-none transition-all shadow-inner ${
                                            result.error ? 'border-red-500 focus:border-red-500 ring-4 ring-red-500/10' : 'border-border/80 focus:border-purple-500'
                                        }`}
                                    />
                                    <span className="absolute right-4 text-purple-500 font-bold text-lg">/</span>
                                </div>
                                {result.error && (
                                    <div className="text-red-500 text-[11px] font-bold flex items-center gap-2 px-1 animate-pulse">
                                        <AlertTriangle className="w-3.5 h-3.5" />
                                        {result.error}
                                    </div>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="block text-xs font-black text-muted-foreground uppercase tracking-widest pl-1">
                                    {isEn ? 'Flags' : '플래그'}
                                </label>
                                <input
                                    type="text"
                                    value={flags}
                                    onChange={(e) => setFlags(e.target.value)}
                                    placeholder="gmi"
                                    className="w-full px-4 py-4 bg-background border-2 border-border/80 focus:border-purple-500 rounded-xl font-mono text-sm focus:outline-none shadow-inner transition-colors"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between px-1">
                                <label className="block text-xs font-black text-muted-foreground uppercase tracking-widest">
                                    {isEn ? 'Test Subject' : '테스트할 본문 내용'}
                                </label>
                                <button 
                                    onClick={handleClear}
                                    className="p-1 px-3 text-[10px] font-bold text-muted-foreground hover:text-red-500 flex items-center gap-1 transition-colors bg-secondary/30 rounded-lg"
                                >
                                    <Trash2 size={12} /> {isEn ? 'Reset All' : '패턴 초기화'}
                                </button>
                            </div>
                            <textarea
                                value={testString}
                                onChange={(e) => setTestString(e.target.value)}
                                placeholder={isEn ? "Paste sample JSON, HTML, or plain logs here..." : "매칭 여부를 확인하고 싶은 데이터를 입력하세요..."}
                                className="w-full h-40 p-5 bg-background border-2 border-border/80 focus:border-purple-500 rounded-2xl resize-none font-mono text-sm leading-relaxed focus:outline-none shadow-inner transition-colors"
                            />
                        </div>

                        <div className="space-y-3">
                            <div className="flex justify-between items-center px-1 border-b border-border/50 pb-2">
                                <label className="block text-xs font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                                    <ListChecks className="w-4 h-4 text-purple-600" />
                                    {isEn ? `Live Capture Results (${result.matches.length} hits)` : `실시간 매칭 시각화 (${result.matches.length}개 발견)`}
                                </label>
                                <span className={`${result.matches.length > 0 ? 'text-green-600' : 'text-muted-foreground'} text-[10px] font-black`}>
                                    {result.matches.length > 0 ? '✓ MATCH FOUND' : '× NO MATCH'}
                                </span>
                            </div>
                            <div className="w-full h-56 p-6 overflow-auto font-mono text-sm whitespace-pre-wrap bg-background/50 border-2 border-dashed border-border/80 rounded-2xl leading-relaxed text-foreground/80 shadow-inner custom-scrollbar">
                                {highlightText()}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Cheat Sheet */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-card border border-border rounded-2xl p-6 shadow-sm sticky top-24">
                        <h3 className="text-sm font-black uppercase tracking-widest mb-6 flex items-center gap-2 text-purple-700 dark:text-purple-400">
                            <BookOpen className="w-4 h-4" />
                            {isEn ? 'Regex Logic Atlas' : '정규표현식 치트시트'}
                        </h3>
                        
                        <div className="space-y-6">
                            <div className="space-y-3 pb-4 border-b border-border/50">
                                <div className="flex items-center gap-2 text-[10px] font-black text-muted-foreground uppercase tracking-tighter">
                                    <Hash className="w-3 h-3" /> {isEn ? 'Classes' : '주요 문자 기호'}
                                </div>
                                <ul className="grid grid-cols-2 gap-2 text-[11px] font-medium">
                                    <li className="flex justify-between p-1.5 bg-secondary/40 rounded-lg"><code>.</code> <span className="text-muted-foreground">{isEn ? 'Any' : '임의문자'}</span></li>
                                    <li className="flex justify-between p-1.5 bg-secondary/40 rounded-lg"><code>\d</code> <span className="text-muted-foreground">{isEn ? 'Digit' : '숫자'}</span></li>
                                    <li className="flex justify-between p-1.5 bg-secondary/40 rounded-lg"><code>\w</code> <span className="text-muted-foreground">{isEn ? 'Word' : '문자+숫자'}</span></li>
                                    <li className="flex justify-between p-1.5 bg-secondary/40 rounded-lg"><code>\s</code> <span className="text-muted-foreground">{isEn ? 'Space' : '공백'}</span></li>
                                </ul>
                            </div>

                            <div className="space-y-3 pb-4 border-b border-border/50">
                                <div className="flex items-center gap-2 text-[10px] font-black text-muted-foreground uppercase tracking-tighter">
                                    <Zap className="w-3 h-3" /> {isEn ? 'Quantifiers' : '수량 제어'}
                                </div>
                                <ul className="grid grid-cols-1 gap-2 text-[11px] font-medium">
                                    <li className="flex justify-between p-1.5 bg-secondary/40 rounded-lg"><code>*</code> <span className="text-muted-foreground">{isEn ? 'Zero or more' : '0개 이상'}</span></li>
                                    <li className="flex justify-between p-1.5 bg-secondary/40 rounded-lg"><code>+</code> <span className="text-muted-foreground">{isEn ? 'One or more' : '1개 이상'}</span></li>
                                    <li className="flex justify-between p-1.5 bg-secondary/40 rounded-lg"><code>?</code> <span className="text-muted-foreground">{isEn ? 'Zero or one' : '불확실 (있거나 없거나)'}</span></li>
                                    <li className="flex justify-between p-1.5 bg-secondary/40 rounded-lg"><code>{`{n}`}</code> <span className="text-muted-foreground">{isEn ? 'Exactly n' : '정확히 n개'}</span></li>
                                </ul>
                            </div>

                            <div className="p-4 bg-purple-500/5 rounded-xl border border-purple-500/10">
                                <p className="text-[10px] font-bold text-purple-700 dark:text-purple-400 leading-relaxed italic">
                                    {isEn ? '"Regular expressions are used logic patterns designed strictly for searching and manipulating strings effectively."' : '"정규표현식은 문자열의 특정 패턴을 검색하고 조작하기 위해 설계된 강력한 논리 도구입니다."'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ToolGuide
                title={isEn ? "Advanced Pattern Recognition Guide" : "정규식 테스터 상세 가이드"}
                intro={isEn 
                    ? "Our real-time engine provides high-fidelity syntax highlighting and match counting. Essential for data scraping, validation logic experiments, and log analysis." 
                    : "개발자 및 데이터 분석가를 위한 표준 정규표현식 검증 도구입니다. 복잡한 패턴을 실제 데이터에 대입하여 의도한 대로 동작하는지 안전하게 테스트하세요."}
                steps={steps}
                tips={isEn ? [
                    "Leading and trailing slashes are added automatically by our interface—only type the internal pattern logic.",
                    "The purple highlight indicates 'Match Groups' specifically allowing you to visualize capturing logic errors.",
                    "Always use the 'g' flag if you want to find all occurrences within your sample text rather than just the first hit."
                ] : [
                    "패턴 시작과 끝의 슬래시(/)는 도구가 자동으로 처리하므로 내부 로직 코드만 입력하시면 됩니다.",
                    "보라색 하이라이트 영역에 마우스를 올리면 각 매칭 항목의 순서를 확인할 수 있습니다.",
                    "문서 전체에서 모든 항목을 찾으려면 플래그 영역에 반드시 'g'를 포함시켜야 합니다."
                ]}
                faqs={faqs}
            />
        </div>
    );
};

export default RegexTester;
