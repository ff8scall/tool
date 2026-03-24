import React, { useState, useEffect, useRef } from 'react';
import { Share2, RefreshCw, Timer, Play, Pause, Trophy, Clock, Zap } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { useLanguage } from '../context/LanguageContext';

const TimeSense = () => {
    const { lang, t } = useLanguage();
    const isEn = lang === 'en';
    const [gameState, setGameState] = useState('idle'); // idle, running, stopped
    const [startTime, setStartTime] = useState(0);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [displayTime, setDisplayTime] = useState('0.00');
    const [targetTime, setTargetTime] = useState(10.00);
    const [showHint, setShowHint] = useState(true);

    const start = () => {
        setGameState('running');
        setStartTime(Date.now());
        setShowHint(true);
        setDisplayTime('0.00');
    };

    const stop = () => {
        const now = Date.now();
        const elapsed = (now - startTime) / 1000;
        setElapsedTime(elapsed);
        setGameState('stopped');
        setDisplayTime(elapsed.toFixed(2));
    };

    // Visual update effect
    useEffect(() => {
        let interval;
        if (gameState === 'running') {
            interval = setInterval(() => {
                const now = Date.now();
                const current = (now - startTime) / 1000;

                if (current < 3.0) {
                    setDisplayTime(current.toFixed(2));
                } else {
                    setDisplayTime('?.??');
                    setShowHint(false);
                }
            }, 30);
        }
        return () => clearInterval(interval);
    }, [gameState, startTime]);

    const getRank = (time) => {
        const diff = Math.abs(time - targetTime);
        if (diff === 0) return { rank: "GOD", desc: isEn ? "Are you the god of time?" : "당신은 시간의 신인가요?", color: "text-purple-600" };
        if (diff <= 0.05) return { rank: "SSS", desc: isEn ? "Chilling accuracy! You're a human clock." : "소름돋는 정확도! 인간 시계입니다.", color: "text-rose-500" };
        if (diff <= 0.1) return { rank: "S", desc: isEn ? "Perfect timing! Truly impressive." : "칼 같은 타이밍! 아주 훌륭해요.", color: "text-orange-500" };
        if (diff <= 0.3) return { rank: "A", desc: isEn ? "Very accurate!" : "꽤 정확한 편이네요!", color: "text-green-600" };
        if (diff <= 0.5) return { rank: "B", desc: isEn ? "Average sense. Focus more." : "평범한 감각입니다. 조금 더 집중해보세요.", color: "text-blue-500" };
        if (diff <= 1.0) return { rank: "C", desc: isEn ? "You're a bit off..." : "시간이 꽤 흘렀네요...", color: "text-slate-500" };
        return { rank: "F", desc: isEn ? "Do you even know what time is? 😅" : "시간 개념이... 없으신가요? 😅", color: "text-slate-400" };
    };

    const diffCount = Math.abs(elapsedTime - targetTime).toFixed(2);
    const result = getRank(elapsedTime);

    const shareResult = () => {
        const text = isEn 
            ? `My record: ${elapsedTime.toFixed(2)}s (Error ${diffCount}s) - Rank: ${result.rank} | Tool Hive` 
            : `나의 기록: ${elapsedTime.toFixed(2)}초 (오차 ${diffCount}초) - 랭크 ${result.rank} | 유틸리티 허브`;
        if (navigator.share) {
            navigator.share({
                title: isEn ? 'Absolute Time Sense Test' : '절대 시간 감각 테스트',
                text: text,
                url: window.location.href,
            });
        } else {
            alert(isEn ? 'Link copied to clipboard!' : '링크가 복사되었습니다!');
            navigator.clipboard.writeText(window.location.href);
        }
    };

    const toolFaqs = isEn ? [
        { q: "What is the goal of this test?", a: "The goal is to stop the timer exactly at 10.00 seconds without looking at the display. It tests your internal biological clock's precision." },
        { q: "Why does the timer disappear after 3 seconds?", a: "To prevent you from cheating by just watching the numbers. The real test is mental counting and feeling the rhythm of time." },
        { q: "How can I get the SSS rank?", a: "Consistency is key. You need an error of less than 0.05 seconds to reach the top ranks." }
    ] : [
        { q: "절대 시간 감각 테스트의 목표는 무엇인가요?", a: "타이머 화면을 보지 않고 마음속으로 초를 세어 정확히 10.00초에 버튼을 정지시켜, 생체 시계의 오차율을 알아보는 게임입니다." },
        { q: "왜 3초 후에 타이머가 사라지나요?", a: "숫자를 보고 맞추는 것은 의미가 없기 때문입니다. 오로지 본인의 느낌과 박자 감각만으로 시간을 맞춰야 진정한 감각 테스트가 됩니다." }
    ];

    const toolSteps = isEn ? [
        "Click the Start button and immediately start counting seconds in your head.",
        "The timer will be visible for the first 3 seconds to give you a rhythm reference.",
        "The numbers will then hide, and you must rely on your internal clock.",
        "Click the Stop button precisely when you think 10.00 seconds have passed."
    ] : [
        "시작 버튼을 누름과 동시에 마음속으로 박자를 맞추어 초를 세기 시작합니다.",
        "처음 3초간은 타이머 숫자가 보이며 리듬을 타는 데 도움을 줍니다.",
        "이후 타이머 숫자가 가려지면 오로지 본인의 감각에만 의존해야 합니다.",
        "정확히 10초가 되었다고 직감하는 순간 '정지' 버튼을 빠르게 누르고 결과를 확인합니다."
    ];

    const toolTips = isEn ? [
        "Mnemonic tip: Counting 'One thousand and one, one thousand and two' helps maintain a consistent 1-second tempo.",
        "Try to breathe rhythmically or tap your finger to match the speed of the timer.",
        "Avoid distractions and focus entirely on the passage of time."
    ] : [
        "'일, 이, 삼, 사' 같이 세는 것보다 '천 일, 천 이, 천 삼' 형식으로 네 글자로 세면 인간의 심장 박동과 비슷하게 1초 템포를 일정하게 유지할 수 있습니다.",
        "일정한 주기로 심호흡을 하거나 손가락을 까딱이며 리듬을 타보세요.",
        "친구들과 누가 더 10.00에 가까운지 내기 게임으로 즐기기에 아주 좋습니다."
    ];

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <SEO
                title={t('tools.time-sense.title')}
                description={t('tools.time-sense.description')}
                keywords={isEn ? "internal clock, timing game, precision test, reaction speed, time sense" : "시간감각, 10초맞추기, 타이머게임, 절대시간, 순발력테스트, 미니게임"}
                faqs={toolFaqs}
                steps={toolSteps}
            />

            <div className="text-center mb-10">
                <div className="inline-block p-4 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mb-6">
                    <Clock size={48} className="text-indigo-600 dark:text-indigo-400" />
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 tracking-tighter italic uppercase">
                    {isEn ? 'Sonic Time Sense' : '절대 시간 감각'}
                </h1>
                <p className="text-xl text-muted-foreground font-medium italic">
                    {isEn ? "Sync your mind with the clock. Can you hit the target?" : "눈을 감고 마음속으로 10초를 세어보세요."}
                </p>
            </div>

            <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 rounded-[3rem] shadow-2xl p-12 text-center border-4 border-slate-100 dark:border-slate-700 transition-all flex flex-col items-center">
                <div className="mb-12">
                    <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest block italic mb-2">{isEn ? 'TARGET MISSION' : '목표 시간'}</span>
                    <div className="text-7xl font-black text-indigo-500 font-mono italic tracking-tighter">
                        {targetTime.toFixed(2)}<span className="text-3xl ml-1 text-slate-400">S</span>
                    </div>
                </div>

                <div className="w-64 h-64 rounded-full border-8 border-slate-50 dark:border-slate-700 flex items-center justify-center mb-12 relative overflow-hidden bg-slate-50 dark:bg-slate-900/50 shadow-inner">
                    <div className={`text-6xl font-black font-mono italic tracking-tighter transition-all duration-300 ${gameState === 'stopped' ? (Math.abs(elapsedTime - targetTime) <= 0.1 ? 'text-green-500 scale-110 drop-shadow-[0_0_15px_rgba(34,197,94,0.3)]' : 'text-rose-500') : 'text-slate-800 dark:text-white'}`}>
                        {displayTime}<span className="text-3xl ml-1 opacity-50">S</span>
                    </div>
                    {gameState === 'running' && (
                        <div className="absolute inset-0 rounded-full border-8 border-indigo-500/20 border-t-indigo-500 animate-spin-slow"></div>
                    )}
                </div>

                {gameState === 'idle' && (
                    <button
                        onClick={start}
                        className="w-full max-w-sm py-6 bg-slate-900 text-white text-2xl font-black rounded-2xl shadow-xl hover:scale-105 transition-all active:scale-95 italic uppercase tracking-tight flex items-center justify-center gap-3"
                    >
                        <Play fill="currentColor" />
                        {isEn ? 'INITIALIZE CLOCK' : '시작하기'}
                    </button>
                )}

                {gameState === 'running' && (
                    <div className="w-full max-w-sm">
                        <p className="text-sm font-black text-indigo-500 mb-8 animate-pulse italic uppercase tracking-widest">
                            {showHint ? (isEn ? "SYNCING RHYTHM..." : "3초 후 타이머가 사라집니다...") : (isEn ? "CHARTING INTERNALLY..." : "마음속으로 10초를 세세요!")}
                        </p>
                        <button
                            onClick={stop}
                            className="w-full py-6 bg-rose-500 hover:bg-rose-600 text-white text-2xl font-black rounded-2xl shadow-xl shadow-rose-500/30 transition-all transform active:scale-95 italic uppercase flex items-center justify-center gap-3"
                        >
                            <Pause fill="currentColor" />
                            {isEn ? 'HALT (STOP)' : '멈춤 (STOP)'}
                        </button>
                    </div>
                )}

                {gameState === 'stopped' && (
                    <div className="w-full space-y-10 animate-in zoom-in duration-500">
                        <div className="bg-slate-50 dark:bg-slate-900/50 p-10 rounded-[2.5rem] border-2 border-border/50">
                            <div className="flex items-center justify-center gap-4 mb-4">
                                <span className="text-xs font-black text-muted-foreground uppercase tracking-widest italic">{isEn ? 'TIME VARIANCE' : '오차 범위'}</span>
                                <span className="font-black font-mono text-3xl text-slate-800 dark:text-white italic">{diffCount}S</span>
                            </div>
                            <div className="space-y-2">
                                <h3 className={`text-6xl font-black italic tracking-tighter ${result.color}`}>
                                    {result.rank} <span className="text-lg uppercase">GRADE</span>
                                </h3>
                                <p className="text-slate-600 dark:text-slate-400 font-medium italic">
                                    {result.desc}
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={() => setGameState('idle')}
                                className="flex-1 flex items-center justify-center px-8 py-5 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-2xl font-black text-lg hover:scale-105 transition-all shadow-xl border-2 border-slate-200 dark:border-slate-700 active:scale-95 italic uppercase"
                            >
                                <RefreshCw className="w-6 h-6 mr-3" />
                                {isEn ? 'RETRY' : '다시하기'}
                            </button>
                            <button
                                onClick={shareResult}
                                className="flex-1 flex items-center justify-center px-8 py-5 bg-primary text-white rounded-2xl font-black text-lg hover:scale-105 transition-all shadow-xl shadow-primary/20 active:scale-95 italic uppercase"
                            >
                                <Share2 className="w-6 h-6 mr-3" />
                                {isEn ? 'BROADCAST' : '결과 공유'}
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <style>{`
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                .animate-spin-slow {
                    animation: spin-slow 10s linear infinite;
                }
            `}</style>
        
            <div className="mt-20">
                <ToolGuide
                    title={isEn ? "The Internal Stopwatch Guide" : "절대 시간 감각 테스트 안내"}
                    intro={isEn ? "Absolute time sense is the ability to perceive the passage of time without artificial aids. While computers are perfect at tracking milliseconds, the human brain relies on complex rhythms and heartbeat-like mental pacing. This tool helps you calibrate your internal stopwatch to human benchbark standards." : "시계 없이 정확히 10.00초를 맞춰보세요! 당신의 체감 시간은 실제 시간과 얼마나 다를까요? 초정밀 시간 감각 테스트."}
                    steps={toolSteps}
                    tips={toolTips}
                    faqs={toolFaqs}
                />
            </div>
        </div>
    );
};

export default TimeSense;
