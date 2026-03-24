import React, { useState, useEffect, useRef } from 'react';
import { RefreshCw, Play, Pause, AlertCircle, Share2, TrendingDown, TrendingUp, DollarSign } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { useLanguage } from '../context/LanguageContext';

const LottoSimulator = () => {
    const { lang, t } = useLanguage();
    const isEn = lang === 'en';
    const [isRunning, setIsRunning] = useState(false);
    const [stats, setStats] = useState({
        attempts: 0,
        spent: 0,
        won: 0,
        rank1: 0,
        rank2: 0,
        rank3: 0,
        rank4: 0,
        rank5: 0
    });
    const [speed, setSpeed] = useState(1); // x1, x10, x100

    const SIMULATION_INTERVAL = 50; // ms

    // Lotto Logic
    const generateLotto = () => {
        const numbers = new Set();
        while (numbers.size < 6) {
            numbers.add(Math.floor(Math.random() * 45) + 1);
        }
        return [...numbers].sort((a, b) => a - b);
    };

    const generateWinningNumbers = () => {
        const numbers = generateLotto();
        let bonus;
        do {
            bonus = Math.floor(Math.random() * 45) + 1;
        } while (numbers.includes(bonus));
        return { numbers, bonus };
    };

    const checkWin = (myNumbers, winNumbers, bonus) => {
        const matchCount = myNumbers.filter(n => winNumbers.includes(n)).length;
        const matchBonus = myNumbers.includes(bonus);

        if (matchCount === 6) return 1;
        if (matchCount === 5 && matchBonus) return 2;
        if (matchCount === 5) return 3;
        if (matchCount === 4) return 4;
        if (matchCount === 3) return 5;
        return 0;
    };

    const PRIZES = {
        1: 2000000000, // 2 billion
        2: 50000000,   // 50 million
        3: 1500000,    // 1.5 million
        4: 50000,      // 50k
        5: 5000        // 5k
    };

    useEffect(() => {
        let timer;
        if (isRunning) {
            timer = setInterval(() => {
                setStats(currentStats => {
                    const batchSize = speed === 1 ? 1 : (speed === 10 ? 10 : 100);
                    let updates = {
                        attempts: 0,
                        spent: 0,
                        won: 0,
                        rank1: 0, rank2: 0, rank3: 0, rank4: 0, rank5: 0
                    };

                    for (let i = 0; i < batchSize; i++) {
                        const myLotto = generateLotto();
                        const { numbers: winNumbers, bonus } = generateWinningNumbers();
                        const rank = checkWin(myLotto, winNumbers, bonus);

                        updates.attempts++;
                        updates.spent += 1000;
                        if (rank > 0) {
                            updates.won += PRIZES[rank];
                            updates[`rank${rank}`]++;
                        }
                    }

                    return {
                        attempts: currentStats.attempts + updates.attempts,
                        spent: currentStats.spent + updates.spent,
                        won: currentStats.won + updates.won,
                        rank1: currentStats.rank1 + updates.rank1,
                        rank2: currentStats.rank2 + updates.rank2,
                        rank3: currentStats.rank3 + updates.rank3,
                        rank4: currentStats.rank4 + updates.rank4,
                        rank5: currentStats.rank5 + updates.rank5
                    };
                });
            }, SIMULATION_INTERVAL);
        }
        return () => clearInterval(timer);
    }, [isRunning, speed]);

    const formatMoney = (n) => {
        if (isEn) return '$' + (n / 1300).toLocaleString(undefined, { maximumFractionDigits: 0 });
        return n.toLocaleString() + '원';
    };

    const yearsPassed = (stats.attempts / 52).toFixed(1);

    const getProfitRate = () => {
        if (stats.spent === 0) return 0;
        return ((stats.won - stats.spent) / stats.spent * 100).toFixed(2);
    };

    const toolFaqs = isEn ? [
        {
            "q": "What is the Lotto Simulator?",
            "a": "It simulates the actual 1-in-8.14 million odds of winning the top lotto prize, showing you how much time and money it would take in reality."
        },
        {
            "q": "Can I use these numbers to win the real lotto?",
            "a": "The numbers are generated randomly. While you can use them, the odds of winning remain extremely low."
        }
    ] : [
        {
            "q": "로또 시뮬레이터란 무엇인가요?",
            "a": "실제 로또 1등 당첨 확률(약 814만 분의 1)을 코드 상에 그대로 구현하여, 내가 가상으로 매주 로또를 살 때 1등 당첨까지 얼마나 많은 돈과 시간이 드는지 돌려보는 시뮬레이터입니다."
        },
        {
            "q": "이걸 돌려서 나온 번호로 실제로 당첨될 수 있나요?",
            "a": "확률은 매우 희박하지만, 시뮬레이터가 무작위로 생성한 행운의 번호를 실제 로또 구매에 참고용으로 사용해보실 수는 있습니다."
        }
    ];

    const toolSteps = isEn ? [
        "Select your simulation speed (x1, x10, x100).",
        "Press 'Start Mission' to begin buying tickets automatically.",
        "Observe the mounting costs and passed years as you wait for the jackpot."
    ] : [
        "시뮬레이션 속도를 선택합니다 (x1, x10, x100).",
        "'작전 시작' 버튼을 눌러 자동으로 로또를 구매하기 시작합니다.",
        "1등 당첨까지 소모된 시간과 투자한 금액을 보며 확률의 냉혹함을 직접 체감해 보세요."
    ];

    const toolTips = isEn ? [
        "This tool is designed to show how low the odds are, encouraging responsible play.",
        "Running the simulation at x100 speed covers roughly 2 years of weekly purchases every second.",
        "Try resetting if you want to test how lucky a new batch might be."
    ] : [
        "로또에 인생을 걸기보다는, 확률이 얼마나 희박한지 재미있게 체감하며 건전한 로또 문화를 즐기는 용도로 사용하세요.",
        "x100 속도로 돌리면 1초에 약 2년치의 로또를 자동으로 구매하게 됩니다.",
        "수익률이 마이너스라면 현실에서의 로또 구매도 한 번쯤 다시 생각해보는 계기가 될 수 있습니다."
    ];

    const shareResult = () => {
        const text = isEn 
            ? `I've spent ${yearsPassed} years playing the lotto and my profit is ${getProfitRate()}%! - Tool Hive`
            : `무려 ${yearsPassed}년 동안 로또를 샀지만 수익률이 ${getProfitRate()}%입니다... - 유틸리티 허브`;
        if (navigator.share) {
            navigator.share({
                title: isEn ? 'Lotto Jackpot Simulator' : '로또 당첨 시뮬레이터',
                text: text,
                url: window.location.href,
            });
        } else {
            alert(isEn ? 'Link copied!' : '링크가 복사되었습니다!');
            navigator.clipboard.writeText(window.location.href);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <SEO
                title={t('tools.lotto-simulator.title')}
                description={t('tools.lotto-simulator.description')}
                keywords={isEn ? "lotto simulator, lottery odds, jackpot probability, reality check, random numbers" : "로또시뮬레이터, 로또확률, 당첨운, 로또복권, 시뮬레이션"}
                faqs={toolFaqs}
                steps={toolSteps}
            />

            <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 dark:bg-amber-900/30 rounded-full text-amber-600 dark:text-amber-400 font-bold text-sm mb-4 border border-amber-100 dark:border-amber-800 animate-pulse">
                    <TrendingDown size={16} />
                    {isEn ? 'REALITY CHECK' : '현실 자각 타임'}
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-4 uppercase tracking-tighter italic">
                    {isEn ? 'LOTTO JACKPOT' : '로또 1등 당첨'} <span className="text-amber-500">SIMULATOR</span>
                </h1>
                <p className="text-xl text-muted-foreground font-medium italic">
                    {isEn ? "If I play every week for a lifetime, will I finally win?" : "매주 1장씩 평생 사면 언젠가 1등에 당첨될까?"}
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {/* Control Panel */}
                <div className="bg-card dark:bg-slate-800 rounded-[2.5rem] shadow-2xl p-10 border-4 border-border/50 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                        <DollarSign size={120} />
                    </div>
                    
                    <div className="flex justify-between items-center mb-10">
                        <div className="text-sm font-black uppercase tracking-widest text-muted-foreground">{isEn ? 'SIM SPEED' : '시뮬레이션 속도'}</div>
                        <div className="flex gap-2">
                            {[1, 10, 100].map(s => (
                                <button
                                    key={s}
                                    onClick={() => setSpeed(s)}
                                    className={`w-12 h-12 rounded-xl text-sm font-black transition-all ${speed === s ? 'bg-amber-500 text-white shadow-lg scale-110' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
                                >
                                    x{s}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-4 mb-10">
                        <button
                            onClick={() => setIsRunning(!isRunning)}
                            className={`flex-1 py-6 rounded-[1.5rem] text-2xl font-black flex items-center justify-center transition-all shadow-xl active:scale-95 uppercase italic tracking-widest ${isRunning ? 'bg-rose-500 hover:bg-rose-600 text-white' : 'bg-emerald-500 hover:bg-emerald-600 text-white'}`}
                        >
                            {isRunning ? <><Pause className="mr-3" fill="currentColor" /> {isEn ? 'PAUSE' : '일시정지'}</> : <><Play className="mr-3" fill="currentColor" /> {isEn ? 'ENGAGE' : '작전 시작'}</>}
                        </button>
                        <button
                            onClick={() => {
                                setIsRunning(false);
                                setStats({ attempts: 0, spent: 0, won: 0, rank1: 0, rank2: 0, rank3: 0, rank4: 0, rank5: 0 });
                            }}
                            className="w-20 h-20 rounded-[1.5rem] bg-muted hover:bg-muted/80 text-muted-foreground font-black flex items-center justify-center transition-all active:scale-90"
                            title={isEn ? 'Reset' : '초기화'}
                        >
                            <RefreshCw className="w-8 h-8" />
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center p-6 bg-muted/50 rounded-3xl border-2 border-border/50">
                            <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">{isEn ? 'PURCHASE COUNT' : '구매 횟수 (주)'}</span>
                            <span className="text-3xl font-black italic">{stats.attempts.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center p-6 bg-muted/50 rounded-3xl border-2 border-border/50">
                            <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">{isEn ? 'TIME PASSED' : '경과 시간 (가정)'}</span>
                            <span className="text-3xl font-black italic">{yearsPassed} {isEn ? 'YEARS' : '년'}</span>
                        </div>
                    </div>
                </div>

                {/* Financial Panel */}
                <div className="bg-card dark:bg-slate-800 rounded-[2.5rem] shadow-2xl p-10 border-4 border-border/50 flex flex-col justify-between">
                    <div className="space-y-6">
                        <div className="flex justify-between items-center">
                            <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">{isEn ? 'TOTAL WINNINGS' : '총 당첨금'}</span>
                            <span className="text-3xl font-black text-blue-500 italic">+{formatMoney(stats.won)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">{isEn ? 'TOTAL EXPENSES' : '총 지출액'}</span>
                            <span className="text-3xl font-black text-rose-500 italic">-{formatMoney(stats.spent)}</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500" style={{ width: `${Math.max(0, Math.min(100, (stats.won / (stats.spent || 1)) * 100))}%` }} />
                        </div>
                        <div className="flex justify-between items-center bg-muted/30 p-8 rounded-[2rem] border-4 border-dashed border-border/50">
                            <div>
                                <span className="text-xs font-black uppercase tracking-widest text-muted-foreground block mb-2">{isEn ? 'NET PROFIT' : '순수익 (손익)'}</span>
                                <span className={`text-5xl font-black italic tracking-tighter ${stats.won - stats.spent >= 0 ? 'text-blue-500' : 'text-rose-500'}`}>
                                    {formatMoney(stats.won - stats.spent)}
                                </span>
                            </div>
                            <div className="text-right">
                                <span className="text-xs font-black uppercase tracking-widest text-muted-foreground block mb-2">{isEn ? 'ROI' : '수익률'}</span>
                                <span className={`text-2xl font-black italic ${stats.won - stats.spent >= 0 ? 'text-blue-500' : 'text-rose-500'}`}>
                                    {getProfitRate()}%
                                </span>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={shareResult}
                        className="w-full mt-8 py-4 bg-slate-900 text-white rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-slate-800 transition-all uppercase tracking-widest italic"
                    >
                        <Share2 size={24} />
                        {isEn ? 'SHARE INTEL' : '결과 공유하기'}
                    </button>
                </div>
            </div>

            {/* Jackpot Status */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
                {[
                    { rank: 1, label: isEn ? '1st PRIZE' : '1등', prize: isEn ? '$1.5M' : '20억', count: stats.rank1, bg: 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 text-amber-600' },
                    { rank: 2, label: isEn ? '2nd PRIZE' : '2등', prize: isEn ? '$38k' : '5천만', count: stats.rank2, bg: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 text-blue-600' },
                    { rank: 3, label: isEn ? '3rd PRIZE' : '3등', prize: isEn ? '$1.1k' : '150만', count: stats.rank3, bg: 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 text-emerald-600' },
                    { rank: 4, label: isEn ? '4th PRIZE' : '4등', prize: isEn ? '$38' : '5만', count: stats.rank4, bg: 'bg-muted/50 border-border text-muted-foreground' },
                    { rank: 5, label: isEn ? '5th PRIZE' : '5등', prize: isEn ? '$4' : '5천', count: stats.rank5, bg: 'bg-muted/50 border-border text-muted-foreground' },
                ].map(item => (
                    <div key={item.rank} className={`p-6 rounded-3xl border-4 text-center transition-transform hover:scale-105 ${item.bg}`}>
                        <div className="text-xs font-black uppercase tracking-widest mb-1">{item.label}</div>
                        <div className="text-[10px] font-bold opacity-60 mb-4 italic">({item.prize})</div>
                        <div className="text-3xl font-black italic">{item.count}<span className="text-xs ml-1 font-bold not-italic">{isEn ? 'x' : '회'}</span></div>
                    </div>
                ))}
            </div>

            {/* Reality Check Message */}
            {stats.attempts > 0 && (
                <div className="bg-amber-500/10 border-4 border-dashed border-amber-500/30 rounded-[2rem] p-8 text-center animate-in fade-in zoom-in-95 duration-700">
                    <div className="flex items-center justify-center gap-3 text-amber-500 font-black text-xl uppercase italic mb-4">
                        <AlertCircle className="w-8 h-8" />
                        {isEn ? 'MISSION REPORT' : '상황 보고서'}
                    </div>
                    <p className="text-xl text-foreground font-bold italic leading-relaxed">
                        {stats.rank1 > 0
                            ? (isEn ? `INCREDIBLE! It only took ${yearsPassed} years to score the jackpot!` : `축하합니다! ${yearsPassed}년 만에 드디어 1등에 당첨되셨군요!`)
                            : (isEn ? `After ${yearsPassed} years of trying, the jackpot remains elusive.` : `${yearsPassed}년 동안 매주 로또를 샀지만 아직 1등에 당첨되지 못했습니다.`)}
                    </p>
                </div>
            )}
        
            <div className="mt-24">
                <ToolGuide
                    title={isEn ? "Lotto Simulator Mission Briefing" : "로또 시뮬레이터 안내"}
                    intro={isEn ? "Experience the cold reality of probability. This simulator replicates the exact odds of the South Korean lotto to show you how difficult it is to actually win the jackpot." : "매주 로또를 산다면 언제 1등에 당첨될까? 현실적인 로또 당첨 확률 시뮬레이터로 확인해보세요. 본 도구는 실제 확률을 기반으로 설계되었습니다."}
                    steps={toolSteps}
                    tips={toolTips}
                    faqs={toolFaqs}
                />
            </div>
        </div>
    );
};

export default LottoSimulator;
