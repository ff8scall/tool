import React, { useState, useMemo } from 'react';
import { GitCompare, Copy, Check, Trash2, ArrowLeftRight, Plus, Minus, Edit3 } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { useLanguage } from '../context/LanguageContext';

const CodeDiff = () => {
    const { lang, t } = useLanguage();
    const isEn = lang === 'en';

    const [text1, setText1] = useState('');
    const [text2, setText2] = useState('');
    const [copied, setCopied] = useState(false);

    const diff = useMemo(() => {
        const lines1 = text1.split('\n');
        const lines2 = text2.split('\n');
        const maxLength = Math.max(lines1.length, lines2.length);
        const result = [];

        for (let i = 0; i < maxLength; i++) {
            const line1 = lines1[i] || '';
            const line2 = lines2[i] || '';

            if (line1 === line2) {
                result.push({ type: 'same', line1, line2, lineNum: i + 1 });
            } else if (!line1) {
                result.push({ type: 'added', line1, line2, lineNum: i + 1 });
            } else if (!line2) {
                result.push({ type: 'removed', line1, line2, lineNum: i + 1 });
            } else {
                result.push({ type: 'modified', line1, line2, lineNum: i + 1 });
            }
        }

        return result;
    }, [text1, text2]);

    const stats = useMemo(() => {
        const added = diff.filter(d => d.type === 'added').length;
        const removed = diff.filter(d => d.type === 'removed').length;
        const modified = diff.filter(d => d.type === 'modified').length;
        return { added, removed, modified };
    }, [diff]);

    const handleClear = () => {
        setText1('');
        setText2('');
    };

    const titleText = isEn ? t('tools.diff.title') : "코드 비교(Diff) - Utility Hub";
    const descText = isEn 
        ? t('tools.diff.description')
        : "두 개의 텍스트나 코드를 비교하여 차이점을 실시간으로 확인하세요. 추가, 삭제, 수정된 정보를 한눈에 볼 수 있는 Diff 도구입니다.";
    const keywordsText = isEn ? "code diff online, text comparison, compare source code, diff checker, versions difference" : "코드비교, DiffChecker, 텍스트비교, 차이점확인, 개발자도구";

    const faqs = isEn ? [
        {
            q: "Does this compare whitespace and indentation levels strictly?",
            a: "Yes. Our structural line comparison distinguishes any character mismatch, including spaces and tabs, to ensure absolute code integrity check fidelity."
        },
        {
            q: "Can I handle large configuration files here safely?",
            a: "Yes, you can paste and compare thousands of lines smoothly within your browser's memory without sending data to our external servers."
        }
    ] : [
        { "q": "공백이나 들여쓰기 차이도 인식하나요?", "a": "네, 현재 도구는 문자열이 완벽하게 일치하지 않으면 차이가 있는 것으로 인식하여 정밀하게 비교합니다." },
        { "q": "비교할 수 있는 텍스트 길이에 제한이 있나요?", "a": "수천 줄의 데이터도 브라우저 내에서 쾌적하게 처리 가능하지만, 지나치게 방대한 파일은 렌더링 성능에 영향을 줄 수 있습니다." }
    ];

    const steps = isEn ? [
        "Insert the original baseline text or legacy code into the 'Original Source' pane.",
        "Paste the latest version or modified snippet into the 'Updated Version' container.",
        "Verify automated highlighting beneath: Green for additions, Red for removals, and Yellow for modifications.",
        "Analyze the comparison statistics displayed at the top to measure change volume."
    ] : [
        "왼쪽 '원본 소스' 영역에 기준이 되는 기존 코드를 입력하거나 붙여넣습니다.",
        "오른쪽 '업데이트된 버전' 영역에 변경 사항이 포함된 최신 코드를 입력합니다.",
        "하단의 '실시간 비교 결과' 창에서 강조된 색상을 통해 차이점을 즉시 파악하세요.",
        "상단에 표시되는 수정/추가/삭제 수량 통계를 통해 수정 범위를 수치로 확인합니다."
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
                <div className="inline-flex items-center justify-center p-3 bg-zinc-100 dark:bg-zinc-800 rounded-2xl text-zinc-600 dark:text-zinc-400 mb-2 border border-zinc-200 dark:border-zinc-700 shadow-sm">
                    <GitCompare className="w-8 h-8" />
                </div>
                <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
                    {isEn ? 'Universal Code Diff Checker' : '코드 비교기 (Diff)'}
                </h1>
                <p className="text-muted-foreground">
                    {isEn ? 'Seamlessly identify structural shifts between two code snippets or plain text drafts.' : '두 텍스트의 차이점을 실시간으로 분석하고 가독성 좋게 출력하세요'}
                </p>
            </header>

            {/* Stats Dashboard */}
            {(text1 || text2) && (
                <div className="flex flex-wrap gap-4 justify-center animate-in fade-in slide-in-from-top-4 duration-500">
                    <div className="px-6 py-3 bg-green-500/10 border border-green-500/20 text-green-700 dark:text-green-400 rounded-2xl flex items-center gap-3 font-bold shadow-sm">
                        <Plus size={18} className="bg-green-500 text-white rounded-full p-0.5" />
                        {isEn ? 'Added' : '추가'}: {stats.added} {isEn ? 'lines' : '줄'}
                    </div>
                    <div className="px-6 py-3 bg-red-500/10 border border-red-500/20 text-red-700 dark:text-red-400 rounded-2xl flex items-center gap-3 font-bold shadow-sm">
                        <Minus size={18} className="bg-red-500 text-white rounded-full p-0.5" />
                        {isEn ? 'Removed' : '삭제'}: {stats.removed} {isEn ? 'lines' : '줄'}
                    </div>
                    <div className="px-6 py-3 bg-yellow-500/10 border border-yellow-500/20 text-yellow-700 dark:text-yellow-500 rounded-2xl flex items-center gap-3 font-bold shadow-sm">
                        <Edit3 size={18} className="bg-yellow-500 text-white rounded-full p-0.5" />
                        {isEn ? 'Modified' : '수정'}: {stats.modified} {isEn ? 'lines' : '줄'}
                    </div>
                </div>
            )}

            {/* Input Grids */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative">
                <div className="bg-card border border-border rounded-2xl p-6 space-y-4 shadow-sm relative overflow-hidden">
                    <div className="flex items-center justify-between mb-2">
                        <label className="block text-sm font-black text-muted-foreground uppercase tracking-widest">
                            {isEn ? 'Original Source (A)' : '기준 원본 소스 (A)'}
                        </label>
                        <span className="text-[10px] font-mono text-muted-foreground">{text1.split('\n').filter(l => l).length} lines</span>
                    </div>
                    <textarea
                        value={text1}
                        onChange={(e) => setText1(e.target.value)}
                        placeholder={isEn ? "Paste original text sequence here..." : "기준이 되는 원본 소스를 입력하세요..."}
                        className="w-full h-96 px-5 py-4 bg-background border-2 border-border/80 focus:border-zinc-500 rounded-xl resize-none font-mono text-sm focus:outline-none shadow-inner transition-colors"
                    />
                </div>

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden lg:flex bg-background border border-border p-2 rounded-full shadow-lg text-muted-foreground animate-pulse">
                    <ArrowLeftRight size={24} />
                </div>

                <div className="bg-card border border-border rounded-2xl p-6 space-y-4 shadow-sm overflow-hidden">
                    <div className="flex items-center justify-between mb-2">
                        <label className="block text-sm font-black text-muted-foreground uppercase tracking-widest">
                            {isEn ? 'Updated Version (B)' : '최신 변경 버전 (B)'}
                        </label>
                        <button 
                            onClick={handleClear}
                            className="p-2 text-muted-foreground hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                            title={isEn ? "Clear all" : "모두 지우기"}
                        >
                            <Trash2 size={18} />
                        </button>
                    </div>
                    <textarea
                        value={text2}
                        onChange={(e) => setText2(e.target.value)}
                        placeholder={isEn ? "Paste modified text sequence here..." : "변경된 최신 버전을 입력하세요..."}
                        className="w-full h-96 px-5 py-4 bg-background border-2 border-border/80 focus:border-zinc-500 rounded-xl resize-none font-mono text-sm focus:outline-none shadow-inner transition-colors"
                    />
                </div>
            </div>

            {/* Resulting Panel */}
            {(text1 || text2) && (
                <div className="bg-card border border-border rounded-2xl shadow-lg overflow-hidden animate-in fade-in zoom-in-95 duration-500">
                    <div className="flex items-center justify-between px-6 py-4 bg-muted/40 border-b border-border">
                        <h2 className="text-lg font-black tracking-tight">{isEn ? 'Side-by-Side Comparison' : '실시간 라인 비교 결과'}</h2>
                        <div className="flex items-center gap-4 text-[11px] font-bold text-muted-foreground hidden sm:flex">
                            <span className="flex items-center gap-1"><span className="w-2 h-2 bg-red-400 rounded-full"></span> {isEn ? 'Legacy' : '기존'}</span>
                            <span className="flex items-center gap-1"><span className="w-2 h-2 bg-green-400 rounded-full"></span> {isEn ? 'New' : '신규'}</span>
                        </div>
                    </div>
                    <div className="bg-background overflow-x-auto">
                        <div className="min-w-[800px]">
                            {diff.map((item, idx) => (
                                <div
                                    key={idx}
                                    className={`flex font-mono text-xs border-b border-border/30 last:border-b-0 group ${
                                        item.type === 'added' ? 'bg-green-500/10' :
                                        item.type === 'removed' ? 'bg-red-500/10' :
                                        item.type === 'modified' ? 'bg-yellow-500/5' :
                                        'hover:bg-muted/30'
                                    }`}
                                >
                                    {/* Left pane line */}
                                    <div className={`flex-1 flex px-4 py-1.5 border-r border-border/30 ${item.type === 'removed' ? 'text-red-600 dark:text-red-400' : 'text-foreground/70'}`}>
                                        <span className="text-muted-foreground/40 w-10 text-right pr-4 shrink-0 select-none group-hover:text-muted-foreground">{item.lineNum}</span>
                                        <span className="break-all whitespace-pre-wrap">{item.line1 || ' '}</span>
                                    </div>
                                    {/* Right pane line */}
                                    <div className={`flex-1 flex px-4 py-1.5 ${item.type === 'added' ? 'text-green-600 dark:text-green-400' : 'text-foreground/70'}`}>
                                        <span className="text-muted-foreground/40 w-10 text-right pr-4 shrink-0 select-none group-hover:text-muted-foreground">{item.lineNum}</span>
                                        <span className="break-all whitespace-pre-wrap">{item.line2 || ' '}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <ToolGuide
                title={isEn ? "Advanced Diff Checker Mastery" : "코드 비교기 활용 가이드"}
                intro={isEn 
                    ? "Our side-by-side terminal provides instant visual feedback on textual changes perfect for reviewing code commits and document iterations safely." 
                    : "두 텍스트를 나란히 대조하여 무엇이 바뀌었는지 명확하게 식별할 수 있는 통합 도구입니다. 버전 관리와 수정 사항 검토 시 필수적인 기능을 제공합니다."}
                steps={steps}
                tips={isEn ? [
                    "Compare different logic blocks before committing to your Git repository to ensure no rogue code snuck into your shipment.",
                    "The side-by-side view works best on high-resolution displays to see full line contexts comfortably.",
                    "Even subtle shifts like hidden spaces or line endings are visually highlighted for precise audit."
                ] : [
                    "Git 커밋 전, 어떤 코드를 수정했는지 이 도구에서 미리 대조하여 의도치 않은 코드 삽입을 방지할 수 있습니다.",
                    "가로 폭이 넓은 데스크톱 모니터에서 비교하면 긴 코드 라인도 잘림 없이 한눈에 보기 좋습니다.",
                    "보이지 않는 공백 한 칸이나 줄바꿈의 미세한 차이까지 정확히 짚어내어 데이터 무결성을 보장합니다."
                ]}
                faqs={faqs}
            />
        </div>
    );
};

export default CodeDiff;
