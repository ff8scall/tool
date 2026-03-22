import React, { useState, useEffect, useRef } from 'react';

import { Share2, RefreshCw, Timer, Play, Pause, Trophy, Clock } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';

const TimeSense = () => {
    const [gameState, setGameState] = useState('idle'); // idle, running, stopped
    const [startTime, setStartTime] = useState(0);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [displayTime, setDisplayTime] = useState('0.00');
    const [targetTime, setTargetTime] = useState(10.00);
    const timerRef = useRef(null);

    const startGame = () => {
        setGameState('running');
        setStartTime(Date.now());
        setElapsedTime(0);
        setDisplayTime('0.00');

        timerRef.current = setInterval(() => {
            const now = Date.now();
            const elapsed = (now - startTime) / 1000;
            // Only update display for the first 3 seconds to let user know it's working
            // Then hide it (???) or just blur it. 
            // Better UX: Show timer counting up, then hide it after 2-3 seconds with a "Hidden" message
            // or just kept hidden from start? 
            // Let's hide it after 3 seconds for difficulty.
        }, 10);
    };

    // Actually, react state inside interval is tricky with stale closures if we use state directly.
    // Let's use requestAnimationFrame for display updates or just update on stop.
    // For this game "Hidden Timer", we don't need to update UI while running except maybe a "Running..." indicator.

    const handleStart = () => {
        setGameState('running');
        setStartTime(Date.now());
        setDisplayTime('0.00');

        // Clear any existing timer
        if (timerRef.current) clearInterval(timerRef.current);

        // Update display for first 3 seconds
        timerRef.current = setInterval(() => {
            const currentElapsed = (Date.now() - startTime) / 1000;
            // We can't access updated startTime here easily without ref, but Date.now() is fine.
            // Wait, startTime is state. 
            // We need to capture the start timestamp in a ref or use functional update if we want exactness, 
            // but here we just need visually 3 seconds
        }, 100);
    };

    // Revised Logic
    const [visualTime, setVisualTime] = useState(0);

    useEffect(() => {
        let animationFrame;

        if (gameState === 'running') {
            const start = Date.now();
            const tick = () => {
                const now = Date.now();
                const elapsed = (now - start) / 1000;
                setVisualTime(elapsed);

                if (elapsed < 3.0) {
                    setDisplayTime(elapsed.toFixed(2));
                } else {
                    setDisplayTime('?.??');
                }

                animationFrame = requestAnimationFrame(tick);
            };
            animationFrame = requestAnimationFrame(tick);
        }

        
    const toolFaqs = [
        {
            "q": "절대 시간 감각 테스트의 목표는 무엇인가요?",
            "a": "타이머 화면을 보지 않고 마음속으로 초를 세어 정확히 10.00초에 버튼을 정지시켜, 생체 시계의 오차율을 알아보는 게임입니다."
        },
        {
            "q": "소수점 몇 째 자리까지 나오나요?",
            "a": "밀리초 단위인 소수점 둘째 자리(예: 10.03초, 9.87초)까지 측정되어 엄청난 집중력을 요구합니다."
        }
    ];
    const toolSteps = [
        "화면 중앙의 거대한 '시작' 버튼을 누름과 동시에 마음속으로 속으로 1초, 2초 카운트를 속으로 셉니다.",
        "화면의 타이머 숫자는 가려지게 됩니다.",
        "정확히 10초가 되었다고 직감하는 순간 '정지' 버튼을 빠르게 누르고 결과를 확인합니다."
    ];
    const toolTips = [
        "'일, 이, 삼, 사' 같이 세는 것보다 '천 일, 천 이, 천 삼' 형식으로 네 글자로 세면 인간의 심장 박동과 비슷하게 1초 템포를 좀 더 일정하게 유지할 수 있습니다.",
        "친구들과 내기할 때, 화면을 보지 않고 10.00에 가장 가깝게 멈춘 사람이 밥값 내기 등을 진행하면 폭발적인 인기를 끕니다."
    ];

    return () => cancelAnimationFrame(animationFrame);
    }, [gameState]);

    const handleStop = () => {
        const stopTime = Date.now();
        const finalElapsed = (stopTime - startTime) / 1000; // Recalculate precisely from start
        // Wait, startInEffect was different from handleStart logic. 
        // Let's unify.

        // Actually simplest is just:
        // When running, we track start time in REF to avoid re-renders impacting precision if possible, 
        // but state is fine for simple game.
        // Let's use the effect above for visual, but calculate final score based on precise diff.

        // If we use the visualTime state, it might be slightly off due to frame timing.
        // Better to use Date.now() diff.
    };

    // Refactored clean implementation
    const [showHint, setShowHint] = useState(true);

    const start = () => {
        setGameState('running');
        setStartTime(Date.now());
        setShowHint(true);
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
        if (diff === 0) return { rank: "GOD", desc: "당신은 시간의 신인가요?", color: "text-purple-600" };
        if (diff <= 0.05) return { rank: "SSS", desc: "소름돋는 정확도! 인간 시계입니다.", color: "text-red-500" };
        if (diff <= 0.1) return { rank: "S", desc: "칼 같은 타이밍! 아주 훌륭해요.", color: "text-orange-500" };
        if (diff <= 0.3) return { rank: "A", desc: "꽤 정확한 편이네요!", color: "text-green-600" };
        if (diff <= 0.5) return { rank: "B", desc: "평범한 감각입니다. 조금 더 집중해보세요.", color: "text-blue-500" };
        if (diff <= 1.0) return { rank: "C", desc: "시간이 꽤 흘렀네요...", color: "text-gray-500" };
        return { rank: "F", desc: "시간 개념이... 없으신가요? 😅", color: "text-gray-400" };
    };

    const diff = Math.abs(elapsedTime - targetTime).toFixed(2);
    const result = getRank(elapsedTime);

    const shareResult = () => {
        if (navigator.share) {
            navigator.share({
                title: '절대 시간 감각 테스트',
                text: `나의 기록: ${elapsedTime.toFixed(2)}초 (오차 ${diff}초) - 랭크 ${result.rank} | 유틸리티 허브`,
                url: window.location.href,
            });
        } else {
            alert('링크가 복사되었습니다!');
            navigator.clipboard.writeText(window.location.href);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <SEO
                title="절대 시간 감각 테스트 | 10초 맞추기 게임"
                description="시계 없이 정확히 10.00초를 맞춰보세요! 당신의 체감 시간은 실제 시간과 얼마나 다를까요? 초정밀 시간 감각 테스트."
                keywords="시간감각, 10초맞추기, 타이머게임, 절대시간, 시간맞추기, 감각테스트"
                category="게임"
                faqs={toolFaqs}
                steps={toolSteps}
            />

            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4 animate-fade-in">
                    ⏱️ 절대 시간 감각 테스트
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                    눈을 감고 마음속으로 10초를 세어보세요.
                </p>
            </div>

            <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden p-8 transition-all duration-300 min-h-[400px] flex flex-col justify-center items-center">

                <div className="mb-12 text-center">
                    <span className="text-sm font-bold text-gray-400 tracking-widest uppercase mb-2 block">Target Time</span>
                    <div className="text-6xl font-black text-indigo-500 dark:text-indigo-400 font-mono">
                        {targetTime.toFixed(2)}<span className="text-3xl">s</span>
                    </div>
                </div>

                <div className="w-64 h-64 rounded-full border-8 border-gray-100 dark:border-gray-700 flex items-center justify-center mb-10 relative">
                    {/* Timer Display */}
                    <div className={`text-5xl font-bold font-mono transition-all duration-300 ${gameState === 'stopped' ? (Math.abs(elapsedTime - targetTime) <= 0.1 ? 'text-green-500 scale-110' : 'text-red-500') : 'text-gray-800 dark:text-white'}`}>
                        {displayTime}<span className="text-2xl ml-1">s</span>
                    </div>

                    {/* Progress Ring Animation (Optional) */}
                    {gameState === 'running' && (
                        <div className="absolute inset-0 rounded-full border-8 border-t-indigo-500 border-r-transparent border-b-transparent border-l-transparent animate-spin-slow opacity-30"></div>
                    )}
                </div>

                {gameState === 'idle' && (
                    <button
                        onClick={start}
                        className="w-full max-w-xs py-4 bg-indigo-600 hover:bg-indigo-700 text-white text-xl font-bold rounded-2xl shadow-lg shadow-indigo-500/30 transition-all transform hover:-translate-y-1 flex items-center justify-center"
                    >
                        <Play className="w-6 h-6 mr-2" fill="currentColor" />
                        시작하기
                    </button>
                )}

                {gameState === 'running' && (
                    <div className="text-center w-full">
                        <p className="text-sm text-gray-400 mb-6 animate-pulse">
                            {showHint ? "3초 후에 타이머가 사라집니다..." : "마음속으로 10초를 세세요!"}
                        </p>
                        <button
                            onClick={stop}
                            className="w-full max-w-xs py-4 bg-red-500 hover:bg-red-600 text-white text-xl font-bold rounded-2xl shadow-lg shadow-red-500/30 transition-all transform active:scale-95 flex items-center justify-center mx-auto"
                        >
                            <Pause className="w-6 h-6 mr-2" fill="currentColor" />
                            멈춤 (STOP)
                        </button>
                    </div>
                )}

                {gameState === 'stopped' && (
                    <div className="text-center animate-scale-in w-full">
                        <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-2xl mb-8">
                            <div className="flex items-center justify-center gap-2 mb-2">
                                <span className="text-gray-500 dark:text-gray-400">오차</span>
                                <span className="font-bold font-mono text-xl">{diff}초</span>
                            </div>
                            <h3 className={`text-4xl font-black mb-2 ${result.color}`}>
                                {result.rank} <span className="text-lg font-bold text-gray-400">등급</span>
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                {result.desc}
                            </p>
                        </div>

                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={() => setGameState('idle')}
                                className="flex items-center px-6 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-xl font-bold transition-all"
                            >
                                <RefreshCw className="w-5 h-5 mr-2" />
                                다시하기
                            </button>
                            <button
                                onClick={shareResult}
                                className="flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-500/30 transition-all transform hover:-translate-y-1"
                            >
                                <Share2 className="w-5 h-5 mr-2" />
                                결과 공유
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
        
            <div className="mt-12">
                <ToolGuide
                    title="절대 시간 감각 테스트 안내"
                    intro="시계 없이 정확히 10.00초를 맞춰보세요! 당신의 체감 시간은 실제 시간과 얼마나 다를까요? 초정밀 시간 감각 테스트."
                    steps={toolSteps}
                    tips={toolTips}
                    faqs={toolFaqs}
                />
            </div>
        </div>
    );
};

export default TimeSense;
