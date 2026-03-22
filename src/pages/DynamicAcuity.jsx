import React, { useState, useEffect, useRef } from 'react';
import { Share2, RefreshCw, Eye, Play, ArrowRight, Zap, Target } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { useLanguage } from '../context/LanguageContext';

const DynamicAcuity = () => {
    const { lang } = useLanguage();
    const isEn = lang === 'en';
    const [gameState, setGameState] = useState('start'); // start, ready, moving, input, result
    const [level, setLevel] = useState(1);
    const [score, setScore] = useState(0);
    const [targetNumber, setTargetNumber] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [animationDuration, setAnimationDuration] = useState(2000); // ms
    const [feedback, setFeedback] = useState(null); // correct, wrong

    const inputRef = useRef(null);

    const startGame = () => {
        setGameState('ready');
        setLevel(1);
        setScore(0);
        setAnimationDuration(2000);
        setFeedback(null);
        startLevel();
    };

    const startLevel = () => {
        setGameState('ready');
        setInputValue('');
        setFeedback(null);

        // Generate random 3-digit number
        const randomNum = Math.floor(100 + Math.random() * 900);
        setTargetNumber(randomNum);

        setTimeout(() => {
            setGameState('moving');
        }, 1000); // 1 sec ready
    };

    // Auto-transition from moving to input
    useEffect(() => {
        if (gameState === 'moving') {
            const timer = setTimeout(() => {
                setGameState('input');
                setTimeout(() => inputRef.current?.focus(), 100);
            }, animationDuration);
            return () => clearTimeout(timer);
        }
    }, [gameState, animationDuration]);

    const checkAnswer = () => {
        if (parseInt(inputValue) === targetNumber) {
            setFeedback('correct');
            setScore(prev => prev + 10 * level);

            setTimeout(() => {
                if (level < 15) {
                    const nextLevel = level + 1;
                    setLevel(nextLevel);
                    setAnimationDuration(prev => Math.max(200, prev * 0.75)); // Increase speed
                    startLevel();
                } else {
                    setGameState('result');
                }
            }, 1000);
        } else {
            setFeedback('wrong');
            setTimeout(() => {
                setGameState('result');
            }, 1000);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            checkAnswer();
        }
    };

    const getRank = (finalScore) => {
        if (finalScore >= 500) return { title: isEn ? "Falcon Eye" : "매의 눈", desc: isEn ? "Incredible tracking ability! You can follow the fastest objects with ease." : "엄청난 동체 시력입니다! 프로게이머급이네요.", color: "text-purple-600" };
        if (finalScore >= 300) return { title: isEn ? "Predator Vision" : "야생의 맹수", desc: isEn ? "You have the visual instincts of a predator on the hunt." : "움직이는 물체를 놓치지 않는군요.", color: "text-blue-600" };
        if (finalScore >= 100) return { title: isEn ? "Human Norm" : "평범한 시력", desc: isEn ? "Standard human performance for dynamic visual acuity." : "평범한 동체 시력입니다.", color: "text-green-600" };
        return { title: isEn ? "Need Sunglasses?" : "안경 추천", desc: isEn ? "Maybe the screen was a bit too fast today. Try focusing on the center." : "안과 검진을 받아보시는 게...?", color: "text-rose-500" };
    };

    const shareResult = () => {
        const rank = getRank(score);
        const text = isEn 
            ? `My dynamic visual level: Lv.${level} (${score} pts) - Rank: ${rank.title} | Tool Hive` 
            : `나의 동체 시력 레벨: ${level}단계 (${score}점) - 랭크: ${rank.title} | 유틸리티 허브`;
        if (navigator.share) {
            navigator.share({
                title: isEn ? 'Dynamic Visual Acuity Test' : '동체 시력 테스트',
                text: text,
                url: window.location.href,
            });
        } else {
            alert(isEn ? 'Link copied to clipboard!' : '링크가 복사되었습니다!');
            navigator.clipboard.writeText(window.location.href);
        }
    };

    const toolFaqs = isEn ? [
        { q: "What is Dynamic Visual Acuity?", a: "It's the ability to identify and track moving objects accurately and quickly. It's crucial for athletes, drivers, and pilots." },
        { q: "The numbers are too fast to read!", a: "As the difficulty increases, the duration shortens. Try focusing your gaze on the center of the screen to catch the movement as it passes." },
        { q: "Is this test accurate?", a: "While it's a good estimate, hardware such as monitor refresh rate (Hz) can influence how smooth the animation appears." }
    ] : [
        { q: "동체 시력이란 무엇인가요?", a: "움직이는 물체를 정확하고 빠르게 쫓아 식별하는 시각 능력을 말합니다. 스포츠 선수, 레이서들에게 특히 필수적입니다." },
        { q: "숫자가 너무 빨라서 안 보여요.", a: "단계가 올라갈수록 속도가 기하급수적으로 빨라집니다. 눈동자를 빠르게 움직이는 연습을 통해 시력을 트레이닝 할 수 있습니다." }
    ];

    const toolSteps = isEn ? [
        "Focus your primary gaze on the center of the game screen.",
        "Observe the 3-digit number sequence moving rapidly from left to right.",
        "Correctly type the number you saw into the input field and press Enter.",
        "Success will unlock the next level with even faster movement speeds."
    ] : [
        "화면 중앙에 시선을 고정하고 지나가는 숫자를 캐치합니다.",
        "왼쪽에서 오른쪽으로 순식간에 날아가는 숫자를 포착하세요.",
        "본인이 본 숫자를 정확하게 입력란에 타이핑하고 확인 버튼을 누릅니다.",
        "성공 시 속도가 더욱 빨라진 다음 단계에 도전하게 됩니다."
    ];

    const toolTips = isEn ? [
        "Keep your eyes relaxed and try to maintain a wide field of vision.",
        "Avoid blinking right before the 'Ready' phase ends.",
        "Take a break if your eyes feel fatigued; the test requires high concentration."
    ] : [
        "화면 중앙에 시선을 고정하되 시야를 넓게 가지면 순간적으로 지나가는 숫자를 포착하기 쉽습니다.",
        "눈이 피로해질 수 있으니 적당히 휴식을 취하며 플레이하세요.",
        "더 높은 점수를 위해 모니터 주사율 설정을 확인해보세요."
    ];

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <SEO
                title={isEn ? "Dynamic Visual Acuity Test | Tracking Reflex Quiz | Tool Hive" : "동체 시력 테스트 | 순식간에 지나가는 숫자를 맞춰라 | Tool Hive"}
                description={isEn ? "Can you catch the high-speed numbers? Test your dynamic visual acuity required for athletes and drivers. Improve your visual reflexes." : "화면을 빠르게 지나가는 숫자를 읽을 수 있나요? 야구 선수, 카레이서에게 필요한 동체 시력을 테스트해보세요."}
                keywords={isEn ? "dynamic visual acuity, eye test, visual reflex, reflexes game, vision test" : "동체시력, 시력테스트, 눈건강, 순발력, 게임, visual acuity"}
                category="Luck/Fun"
                faqs={toolFaqs}
                steps={toolSteps}
            />

            <div className="text-center mb-12">
                <div className="inline-block p-4 bg-yellow-100 dark:bg-yellow-900/30 rounded-full mb-6">
                    <Target size={48} className="text-yellow-600 dark:text-yellow-400" />
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 tracking-tighter italic uppercase">
                    {isEn ? 'Dynamic Vision Test' : '동체 시력 테스트'}
                </h1>
                <p className="text-xl text-muted-foreground font-medium italic">
                    {isEn ? 'Catch the high-speed sequence as it flies by' : '순식간에 지나가는 숫자를 캐치해보세요!'}
                </p>
            </div>

            <div className="max-w-3xl mx-auto bg-slate-900 rounded-[3rem] shadow-2xl overflow-hidden min-h-[450px] flex flex-col relative border-8 border-slate-800 transition-all">
                {/* Game HUD */}
                <div className="absolute top-6 left-8 right-8 flex justify-between items-center z-10 pointer-events-none">
                    <div className="px-5 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                        <span className="text-xs font-black text-white/50 uppercase tracking-widest mr-2 italic">{isEn ? 'LEVEL' : '레벨'}</span>
                        <span className="text-xl font-black text-white italic">{level}</span>
                    </div>
                    <div className="px-5 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                        <span className="text-xs font-black text-white/50 uppercase tracking-widest mr-2 italic">{isEn ? 'SCORE' : '점수'}</span>
                        <span className="text-xl font-black text-yellow-400 italic font-mono">{score}</span>
                    </div>
                </div>

                <div className="flex-1 relative flex items-center justify-center p-8 overflow-hidden bg-slate-900">
                    {/* Scanlines Effect */}
                    <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]"></div>
                    
                    {gameState === 'start' && (
                        <div className="text-center z-10 animate-in fade-in zoom-in duration-500">
                            <Zap className="w-20 h-20 text-yellow-500 mx-auto mb-8 animate-pulse" />
                            <h2 className="text-3xl font-black text-white mb-6 italic tracking-tighter uppercase">{isEn ? 'EYES WIDE OPEN!' : '눈을 크게 뜨세요!'}</h2>
                            <p className="text-slate-400 mb-10 font-medium italic max-w-sm mx-auto">
                                {isEn ? 'A number will fly horizontally at high speed. It gets faster every level.' : '숫자가 왼쪽에서 오른쪽으로 빠르게 지나갑니다. 단계를 거듭할수록 점점 빨라집니다.'}
                            </p>
                            <button
                                onClick={startGame}
                                className="px-10 py-5 bg-yellow-500 hover:bg-yellow-600 text-slate-900 text-2xl font-black rounded-2xl shadow-xl shadow-yellow-500/20 transition-all transform hover:scale-105 active:scale-95 italic uppercase flex items-center gap-3 mx-auto"
                            >
                                <Play fill="currentColor" />
                                {isEn ? 'INITIALIZE' : '테스트 시작'}
                            </button>
                        </div>
                    )}

                    {gameState === 'ready' && (
                        <div className="text-center z-10">
                            <div className="text-6xl font-black text-white/20 italic tracking-widest animate-pulse uppercase">
                                {isEn ? 'STAY READY' : '준비...'}
                            </div>
                        </div>
                    )}

                    {gameState === 'moving' && (
                        <div
                            className="absolute text-7xl md:text-9xl font-black text-white top-1/2 transform -translate-y-1/2 italic tracking-tighter"
                            style={{
                                animation: `moveRight ${animationDuration}ms linear forwards`
                            }}
                        >
                            {targetNumber}
                        </div>
                    )}

                    {gameState === 'input' && (
                        <div className="text-center w-full max-w-xs z-10 animate-in scale-in duration-300">
                            <h3 className="text-2xl font-black text-slate-400 mb-8 italic uppercase tracking-tight">{isEn ? 'WHAT WAS IT?' : '어떤 숫자였나요?'}</h3>
                            <input
                                ref={inputRef}
                                type="number"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="w-full text-center text-6xl font-black py-4 border-b-8 border-indigo-500 bg-transparent focus:outline-none mb-10 text-white italic tracking-widest"
                                placeholder="???"
                            />
                            <button
                                onClick={checkAnswer}
                                className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 text-white text-2xl font-black rounded-2xl transition-all shadow-xl shadow-indigo-600/30 active:scale-95 italic uppercase"
                            >
                                {isEn ? 'VERIFY' : '확인'}
                            </button>
                        </div>
                    )}

                    {feedback && (
                        <div className="absolute inset-0 flex items-center justify-center bg-slate-950/80 backdrop-blur-md z-20 transition-all">
                            <div className="text-center">
                                <div className={`text-9xl font-black mb-4 ${feedback === 'correct' ? 'text-green-500' : 'text-rose-500'}`}>
                                    {feedback === 'correct' ? 'PASSED' : 'FAILED'}
                                </div>
                                {feedback === 'wrong' && (
                                    <div className="text-3xl font-black text-white/50 italic uppercase tracking-widest">
                                        {isEn ? 'ANSWER:' : '정답:'} {targetNumber}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {gameState === 'result' && (
                        <div className="text-center z-10 animate-in zoom-in duration-500 w-full p-8">
                            <Trophy size={80} className="text-yellow-500 mx-auto mb-8 drop-shadow-[0_0_20px_rgba(234,179,8,0.3)]" />
                            <h2 className="text-4xl font-black text-white mb-2 italic tracking-tighter uppercase">{isEn ? 'ANALYSIS COMPLETE' : '테스트 종료'}</h2>

                            <div className="py-10">
                                <div className="text-xs font-black text-slate-500 uppercase tracking-widest mb-2 italic">{isEn ? 'HIGHEST LEVEL ATTAINED' : '도달한 최종 레벨'}</div>
                                <div className="text-8xl font-black text-indigo-400 italic tracking-tighter mb-4">LV.{level}</div>
                                <div className="text-2xl font-black text-slate-400 italic">{isEn ? 'PERFORMANCE:' : '점수:'} {score.toLocaleString()}</div>
                            </div>

                            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-[2rem] mb-10 border border-white/10">
                                <h3 className={`text-3xl font-black mb-3 italic tracking-tight ${getRank(score).color}`}>
                                    {getRank(score).title}
                                </h3>
                                <p className="text-slate-400 font-medium italic">
                                    {getRank(score).desc}
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button
                                    onClick={startGame}
                                    className="flex-1 px-8 py-5 bg-white text-slate-900 rounded-2xl font-black text-lg hover:scale-105 transition-all shadow-xl active:scale-95 italic uppercase flex items-center justify-center gap-3"
                                >
                                    <RefreshCw className="w-6 h-6" />
                                    {isEn ? 'REINITIALIZE' : '다시하기'}
                                </button>
                                <button
                                    onClick={shareResult}
                                    className="flex-1 px-8 py-5 bg-indigo-600 text-white rounded-2xl font-black text-lg hover:scale-105 transition-all shadow-xl shadow-indigo-600/30 active:scale-95 italic uppercase flex items-center justify-center gap-3"
                                >
                                    <Share2 className="w-6 h-6" />
                                    {isEn ? 'BROADCAST' : '결과 공유'}
                                </button>
                            </div>
                        </div>
                    ) || (gameState === 'moving' || gameState === 'ready' || gameState === 'input') && (
                        <div className="absolute inset-x-0 top-1/2 h-0.5 bg-rose-500/20 pointer-events-none transform -translate-y-1/2"></div>
                    )}
                </div>
            </div>

            <style>{`
                @keyframes moveRight {
                    0% { transform: translate(-50%, -50%); left: -10%; opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { transform: translate(-50%, -50%); left: 110%; opacity: 0; }
                }
            `}</style>
        
            <div className="mt-20">
                <ToolGuide
                    title={isEn ? "Dynamic Vision Protocols" : "동체 시력 테스트 안내"}
                    intro={isEn ? "Traditional vision tests measure static clarity, but real-world scenarios—from driving to sports—require dynamic focus. This tool assesses your brain's ability to process rapidly moving high-contrast information and provides a training baseline for visual reflexes." : "화면을 빠르게 지나가는 숫자를 읽을 수 있나요? 야구 선수, 카레이서에게 필요한 동체 시력을 테스트해보세요."}
                    steps={toolSteps}
                    tips={toolTips}
                    faqs={toolFaqs}
                />
            </div>
        </div>
    );
};

export default DynamicAcuity;
