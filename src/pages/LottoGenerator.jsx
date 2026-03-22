import React, { useState } from 'react';
import { RefreshCw, Sparkles, History, Info, AlertTriangle, Share2 } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import ShareButtons from '../components/ShareButtons';
import RelatedTools from '../components/RelatedTools';
import { useLanguage } from '../context/LanguageContext';

const LottoGenerator = () => {
    const { lang } = useLanguage();
    const isEn = lang === 'en';
    const [numbers, setNumbers] = useState([]);
    const [history, setHistory] = useState([]);

    const generateNumbers = () => {
        const newNumbers = [];
        while (newNumbers.length < 6) {
            const num = Math.floor(Math.random() * 45) + 1;
            if (!newNumbers.includes(num)) {
                newNumbers.push(num);
            }
        }
        newNumbers.sort((a, b) => a - b);
        setNumbers(newNumbers);
        setHistory(prev => [newNumbers, ...prev.slice(0, 4)]);
    };

    const getNumberColor = (num) => {
        if (num <= 10) return 'bg-yellow-500';
        if (num <= 20) return 'bg-blue-500';
        if (num <= 30) return 'bg-red-500';
        if (num <= 40) return 'bg-slate-600';
        return 'bg-emerald-500';
    };

    const toolFaqs = isEn ? [
        { q: "Is the lotto generator free?", a: "Yes, this tool is 100% free to use. You can generate random number combinations as many times as you like." },
        { q: "What are the odds of winning with these numbers?", a: "Every combination of 6 numbers from 1-45 has exactly the same mathematical probability: 1 in 8,145,060." },
        { q: "Does the computer use past winning patterns?", a: "No, this generator uses a cryptographically secure random algorithm to ensure complete fairness and unpredictability." }
    ] : [
        { q: "로또 번호 생성은 무료인가요?", a: "네, 본 서비스는 100% 무료이며 제한 없이 번호를 생성하실 수 있습니다." },
        { q: "생성된 번호의 당첨 확률은 어떤가요?", a: "모든 번호 조합은 수학적으로 동일한 8,145,060분의 1의 확률을 가집니다." },
        { q: "과거 당첨 패턴을 분석하나요?", a: "아니요, 본 생성기는 완전한 무작위 추출 방식을 사용하여 공정성과 예측 불가능성을 보장합니다." }
    ];

    const toolSteps = isEn ? [
        "Click the purple 'Generate Numbers' button to start.",
        "A sequence of 6 unique numbers between 1 and 45 will appear.",
        "The numbers are automatically sorted for your convenience.",
        "Check your generation history below to see your previous lucky combinations."
    ] : [
        "'번호 생성하기' 버튼을 클릭하세요.",
        "1부터 45 사이의 무작위로 추출된 6개의 숫자를 확인하세요.",
        "번호는 자동으로 오름차순 정렬되어 표시됩니다.",
        "생성 기록 섹션에서 최근 5개의 번호 조합을 다시 확인할 수 있습니다."
    ];

    return (
        <div className="max-w-3xl mx-auto space-y-10 px-4 py-8">
            <SEO
                title={isEn ? "Free Lotto Number Generator - 6/45 Random Picker | Tool Hive" : "무료 로또 번호 생성기 | 6/45 랜덤 번호 추출기 | Tool Hive"}
                description={isEn ? "Generate your lucky 6/45 lotto numbers today! Our secure random algorithm provides fair combinations. Includes winning odds, color meanings, and responsible play guide." : "오늘의 행운을 잡으세요! 1부터 45까지 무작위로 추출되는 무료 온라인 로또 번호 생성기. 역대 당첨 확률 정보와 책임 있는 로또 구매 가이드를 확인하세요."}
                keywords={isEn ? "lotto generator, random number picker, 6/45 lotto, lucky numbers, lottery simulation" : "로또번호생성기, 로또자동번호, 로또당첨번호, 무료로또번호, 행운의숫자, 로또확률"}
                category="Luck/Fun"
                faqs={toolFaqs}
                steps={toolSteps}
            />

            <header className="text-center space-y-4">
                <div className="inline-flex items-center justify-center p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-full mb-2">
                    <Sparkles className="w-10 h-10 text-yellow-600 dark:text-yellow-400" />
                </div>
                <h1 className="text-4xl font-black text-gray-900 dark:text-white uppercase tracking-tighter italic">
                    {isEn ? 'LUCKY LOTTO GENERATOR' : '로또 번호 생성기'}
                </h1>
                <p className="text-lg text-muted-foreground font-medium italic">
                    {isEn ? 'Your fortune starts with a single click' : '당신에게 행운을 가져다줄 6개의 숫자를 뽑아보세요!'}
                </p>
            </header>

            {/* Generate Button Area */}
            <div className="flex flex-col items-center gap-8">
                <button
                    onClick={generateNumbers}
                    className="group relative flex items-center gap-4 px-12 py-6 bg-primary text-white rounded-[2rem] font-black text-2xl shadow-2xl hover:scale-105 active:scale-95 transition-all overflow-hidden italic uppercase tracking-widest"
                >
                    <RefreshCw className="w-8 h-8 group-hover:rotate-180 transition-transform duration-500" />
                    {isEn ? 'Generate Numbers' : '번호 생성하기'}
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>

                {/* Current Numbers Display */}
                {numbers.length > 0 && (
                    <div className="w-full bg-card border-4 border-border/50 rounded-[3rem] p-10 shadow-2xl animate-in zoom-in-95 duration-500 relative ring-8 ring-primary/5">
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-1 bg-primary text-white text-xs font-black rounded-full uppercase tracking-widest italic shadow-lg">
                            {isEn ? 'THE LUCKY SIX' : '오늘의 행운수'}
                        </div>
                        
                        <div className="flex justify-center gap-3 sm:gap-5 flex-wrap">
                            {numbers.map((num, idx) => (
                                <div
                                    key={idx}
                                    className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full ${getNumberColor(num)} flex items-center justify-center text-white font-black text-2xl sm:text-3xl shadow-xl border-b-8 border-black/20 animate-in slide-in-from-bottom-4 duration-300`}
                                    style={{ animationDelay: `${idx * 0.1}s` }}
                                >
                                    {num}
                                </div>
                            ))}
                        </div>

                        <div className="mt-10 pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                             <div className="flex items-center gap-2 text-muted-foreground font-black text-xs uppercase tracking-widest">
                                <History size={16} />
                                {isEn ? 'Auto-sorted by value' : '작은 수부터 정렬됨'}
                             </div>
                             <ShareButtons
                                title={isEn ? "My Lucky Lotto Numbers!" : "나의 행운의 로또 번호!"}
                                description={isEn ? `Generated numbers: ${numbers.join(', ')}` : `행운의 조합: ${numbers.join(', ')}`}
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* History Grid */}
            {history.length > 0 && (
                <div className="bg-card border-2 border-border/50 rounded-[2.5rem] p-8 shadow-lg">
                    <h2 className="text-sm font-black text-muted-foreground mb-6 uppercase tracking-widest flex items-center gap-2">
                        <History size={16} />
                        {isEn ? 'Recent Generations' : '최근 생성 기록'}
                    </h2>
                    <div className="space-y-4">
                        {history.map((nums, idx) => (
                            <div key={idx} className="flex gap-4 items-center p-3 bg-muted/30 rounded-2xl border-2 border-border/10">
                                <span className="text-[10px] font-black text-muted-foreground w-8 shrink-0">#{history.length - idx}</span>
                                <div className="flex gap-2 flex-wrap">
                                    {nums.map((num, numIdx) => (
                                        <div
                                            key={numIdx}
                                            className={`w-10 h-10 rounded-full ${getNumberColor(num)} flex items-center justify-center text-white font-black text-sm border-b-4 border-black/10`}
                                        >
                                            {num}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Educational Content Deck */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* What is it? */}
                <div className="bg-slate-50 dark:bg-slate-900/50 rounded-[2.5rem] p-8 border-2 border-border/50 space-y-4">
                    <h3 className="font-black text-xl flex items-center gap-3 italic uppercase text-foreground">
                        <span className="p-2 bg-primary rounded-xl text-white"><Info size={20} /></span>
                        {isEn ? 'How it Works' : '로또 생성기란?'}
                    </h3>
                    <div className="space-y-4 text-sm font-medium text-muted-foreground leading-relaxed">
                        <p>
                            {isEn 
                                ? "This tool uses a secure random algorithm to pick 6 unique numbers from a pool of 1 to 45. There is no bias, and no patterns are used, mirroring the true randomness of manual draws."
                                : "로또 번호 생성기는 1부터 45까지의 숫자 중 6개를 컴퓨터 알고리즘을 통해 완전히 무작위로 추출합니다. 어떠한 조작이나 패턴 없이 공정하게 번호 조합을 만들어냅니다."}
                        </p>
                        <div className="bg-background rounded-2xl p-5 border-2 border-border/50 shadow-inner">
                            <p className="font-black text-foreground mb-3 uppercase text-[10px] tracking-widest">{isEn ? 'Color Mappings' : '공 색상의 의미'}</p>
                            <div className="grid grid-cols-2 gap-3 text-xs">
                                <div className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded-full bg-yellow-500 border-b-2 border-black/10"></div>
                                    <span className="font-bold">01 - 10</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded-full bg-blue-500 border-b-2 border-black/10"></div>
                                    <span className="font-bold">11 - 20</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded-full bg-red-500 border-b-2 border-black/10"></div>
                                    <span className="font-bold">21 - 30</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded-full bg-slate-600 border-b-2 border-black/10"></div>
                                    <span className="font-bold">31 - 40</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded-full bg-emerald-500 border-b-2 border-black/10"></div>
                                    <span className="font-bold">41 - 45</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Winning Odds */}
                <div className="bg-indigo-50/50 dark:bg-indigo-950/20 rounded-[2.5rem] p-8 border-2 border-indigo-200/50 dark:border-indigo-800/50 space-y-4">
                    <h3 className="font-black text-xl flex items-center gap-3 italic uppercase text-indigo-700 dark:text-indigo-400">
                        <span className="p-2 bg-indigo-600 rounded-xl text-white"><Sparkles size={20} /></span>
                        {isEn ? 'The Odds' : '당첨 확률'}
                    </h3>
                    <div className="space-y-4 text-sm font-medium text-muted-foreground leading-relaxed">
                        <p>
                            {isEn 
                                ? "In a 6/45 format, there are exactly 8,145,060 possible combinations. Every single draw has the same chance to win."
                                : "로또 6/45의 모든 번호 조합은 수학적으로 동일한 확률을 가집니다. 1등 당첨 확률은 약 814만 분의 1로 매우 희박합니다."}
                        </p>
                        <div className="bg-indigo-100/50 dark:bg-indigo-900/20 rounded-2xl p-5 border-2 border-indigo-200/50">
                            <ul className="space-y-2 font-black text-[11px] uppercase italic tracking-tighter">
                                <li className="flex justify-between border-b border-indigo-200/50 pb-1">
                                    <span className="text-indigo-700 dark:text-indigo-300">1st Prize (6/6)</span>
                                    <span className="text-foreground">~1/8,145,060</span>
                                </li>
                                <li className="flex justify-between border-b border-indigo-200/50 pb-1">
                                    <span className="text-indigo-700 dark:text-indigo-300">2nd Prize (5+B)</span>
                                    <span className="text-foreground">~1/1,357,510</span>
                                </li>
                                <li className="flex justify-between border-b border-indigo-200/50 pb-1">
                                    <span className="text-indigo-700 dark:text-indigo-300">3rd Prize (5/6)</span>
                                    <span className="text-foreground">~1/35,724</span>
                                </li>
                                <li className="flex justify-between">
                                    <span className="text-indigo-700 dark:text-indigo-300">4th Prize (4/6)</span>
                                    <span className="text-foreground">~1/733</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Responsible Play */}
                <div className="md:col-span-2 bg-rose-50/50 dark:bg-rose-950/20 rounded-[2.5rem] p-8 border-2 border-rose-200/50 dark:border-rose-800/50 space-y-4">
                    <h3 className="font-black text-xl flex items-center gap-3 italic uppercase text-rose-700 dark:text-rose-400">
                        <span className="p-2 bg-rose-600 rounded-xl text-white"><AlertTriangle size={20} /></span>
                        {isEn ? 'Responsible Play' : '책임 있는 구매'}
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-8 text-sm font-medium text-muted-foreground leading-relaxed">
                        <div className="space-y-2">
                            <p className="font-black text-foreground italic uppercase italic">{isEn ? 'Enjoy as Fun' : '즐거움으로 즐기기'}</p>
                            <p>{isEn ? "Lottery should be treated as a form of entertainment, not as a reliable investment or source of income." : "로또는 가벼운 취미와 소소한 즐거움으로만 즐겨주세요. 과도한 몰입은 금물입니다."}</p>
                        </div>
                        <div className="space-y-2">
                            <p className="font-black text-foreground italic uppercase italic">{isEn ? 'Seek Help' : '도움이 필요할 때'}</p>
                            <p>{isEn ? "If gambling starts to interfere with your life, please contact local support helplines immediately." : "구매 액수를 미리 정해두고, 그 선을 넘지 않도록 스스로를 조절하는 습관이 중요합니다."}</p>
                        </div>
                    </div>
                    {isEn ? (
                        <div className="mt-4 p-4 bg-white/50 dark:bg-black/20 rounded-2xl text-[10px] font-black uppercase text-center border border-rose-200/30">
                            Play Responsibly. For support, call 1-800-GAMBLER or visit NGP.org
                        </div>
                    ) : (
                        <div className="mt-4 p-4 bg-white/50 dark:bg-black/20 rounded-2xl text-[10px] font-black uppercase text-center border border-rose-200/30 italic">
                            도박 문제 상담: 한국도박문제관리센터 ☎ 1336 (24시간 무료 상담)
                        </div>
                    )}
                </div>
            </div>

            <RelatedTools relatedIds={['compound-interest', 'loan', 'salary-calc']} />

            <ToolGuide
                title={isEn ? "Lotto Generator Master Guide" : "로또 번호 생성기 활용 가이드"}
                intro={isEn ? "Unlock your lucky streak today. Our goal is to provide a clean, secure, and truly random experience for generation and tracking your favorite lottery sequences." : "인생의 소소한 행운을 꿈꾸는 당신을 위한 로또 번호 생성 도구입니다. 본 서비스는 인위적인 통계 조작이나 유료 유도 없이, 가장 순수한 형태의 확률로 당신의 행운을 찾아드립니다."}
                steps={toolSteps}
                tips={isEn ? [
                    "Avoid using the same number twice in your real slip to maximize coverage.",
                    "Save your favorite combinations to look back on later.",
                    "Generation is instant. Click as many times as you want until you find 'the one'."
                ] : [
                    "특별히 선호하는 숫자가 있다면 해당 숫자가 포함될 때까지 여러 번 생성해보는 것도 재미있는 방법입니다.",
                    "최근 5개 기록을 통해 방금 지나친 번호를 다시 확인할 수 있습니다.",
                    "모바일 환경에서도 버튼 터치 한 번으로 손쉽게 행운수를 확인해보세요."
                ]}
                faqs={toolFaqs}
            />
        </div>
    );
};

export default LottoGenerator;
