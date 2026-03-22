import React, { useState, useEffect, useRef } from 'react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { MousePointer2, RefreshCw, Zap, Trophy, Share2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import ShareButtons from '../components/ShareButtons';

const CpsTest = () => {
    const { lang } = useLanguage();
    const isEn = lang === 'en';
    const [clicks, setClicks] = useState(0);
    const [timeLeft, setTimeLeft] = useState(10);
    const [isActive, setIsActive] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [duration, setDuration] = useState(10); // Default 10s

    // Ripple effect state
    const [ripples, setRipples] = useState([]);

    useEffect(() => {
        let interval;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 0.1) { // Use 0.1 to prevent float issues
                        finishGame();
                        return 0;
                    }
                    return prev - 0.1;
                });
            }, 100);
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft]);

    const finishGame = () => {
        setIsActive(false);
        setIsFinished(true);
    };

    const handleClick = (e) => {
        if (isFinished) return;

        if (!isActive) {
            setIsActive(true);
        }

        setClicks((prev) => prev + 1);

        // Add ripple effect
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const newRipple = { x, y, id: Date.now() };
        setRipples((prev) => [...prev, newRipple]);

        // Remove ripple after animation
        setTimeout(() => {
            setRipples((prev) => prev.filter(r => r.id !== newRipple.id));
        }, 500);
    };

    const resetGame = () => {
        setClicks(0);
        setTimeLeft(duration);
        setIsActive(false);
        setIsFinished(false);
    };

    const changeDuration = (sec) => {
        setDuration(sec);
        setTimeLeft(sec);
        setClicks(0);
        setIsActive(false);
        setIsFinished(false);
    };

    const cps = duration > 0 ? (clicks / duration).toFixed(2) : 0;

    const getRank = (cps) => {
        if (cps >= 12) return { title: isEn ? '⚡ Thunder Fingers' : '⚡ 신의 손가락', color: 'text-purple-500' };
        if (cps >= 10) return { title: isEn ? '🔥 Pro Gamer' : '🔥 프로게이머', color: 'text-red-500' };
        if (cps >= 8) return { title: isEn ? '💎 Diamond' : '💎 다이아몬드', color: 'text-blue-500' };
        if (cps >= 6) return { title: isEn ? '🥇 Gold' : '🥇 골드', color: 'text-yellow-500' };
        if (cps >= 4) return { title: isEn ? '🥈 Silver' : '🥈 실버', color: 'text-gray-400' };
        return { title: isEn ? '🥉 Bronze' : '🥉 브론즈', color: 'text-amber-700' };
    };

    const toolFaqs = isEn ? [
        { q: "What is a good CPS score?", a: "An average person clicks at 4-6 CPS. Minecraft players and professional gamers often reach 10-14 CPS using techniques like jitter clicking or butterfly clicking." },
        { q: "Does my mouse affect physical speed?", a: "Yes. High-quality gaming mice have lower actuation force and less travel distance, allowing for faster repetitive clicks compared to office mice or laptop trackpads." },
        { q: "Is the CPS test accurate?", a: "Yes, we measure clicks in real-time with millisecond precision to provide your average Clicks Per Second over the selected duration." }
    ] : [
        { q: "좋은 CPS 점수는 어느 정도인가요?", a: "일반적으로는 4~6 CPS 정도이며, 마인크래프트 유저나 프로게이머들은 지터 클릭, 버터플라이 클릭 등의 기술을 사용해 10~14 CPS 이상을 기록하기도 합니다." },
        { q: "마우스 장비가 영향을 주나요?", a: "네, 클릭 압력이 낮고 반발력이 좋은 게이밍 마우스를 사용하면 일반 사무용 마우스나 노트북 트랙패드보다 훨씬 높은 점수를 얻을 수 있습니다." },
        { q: "측정 방식이 정확한가요?", a: "실시간 클릭 이벤트를 밀리초 단위로 감지하여 선택한 시간 동안의 평균 클릭 횟수를 정확하게 계산합니다." }
    ];

    return (
        <div className="max-w-2xl mx-auto space-y-8 select-none">
            <SEO
                title={isEn ? "CPS Test - Check Your Clicks Per Second" : "CPS 테스트 - 클릭 속도 측정 | Utility Hub"}
                description={isEn ? "How fast can you click? Test your CPS (Clicks Per Second) with our online click speed test. Support 1s to 60s challenges." : "1초당 마우스 클릭 횟수(CPS)를 측정해보세요. 당신의 손가락 속도는 얼마나 빠를까요?"}
                keywords={isEn ? "cps test, click speed, click per second, jitter clicking, mouse test" : "cps, click test, 클릭 속도, 광클, 마우스 테스트"}
                faqs={toolFaqs}
            />

            <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-2">
                    <MousePointer2 className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-500">
                    {isEn ? 'CPS Test' : 'CPS 테스트'}
                </h1>
                <p className="text-muted-foreground">
                    {isEn ? 'Click as fast as you can in the area below!' : '제한 시간 동안 최대한 빠르게 클릭하세요!'}
                </p>
            </div>

            {/* Duration Selector */}
            <div className="flex justify-center flex-wrap gap-2">
                {[1, 3, 5, 10, 30, 60].map((sec) => (
                    <button
                        key={sec}
                        onClick={() => changeDuration(sec)}
                        disabled={isActive}
                        className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${duration === sec
                                ? 'bg-primary text-white shadow-lg'
                                : 'bg-secondary/50 text-muted-foreground hover:bg-secondary'
                            }`}
                    >
                        {sec}{isEn ? 's' : '초'}
                    </button>
                ))}
            </div>

            <div className="card p-6 md:p-8 space-y-8 shadow-2xl border-2 border-border/50">
                {isFinished ? (
                    <div className="text-center space-y-8 py-4 animate-in zoom-in-95 duration-300">
                        <div className="space-y-2">
                            <div className="text-sm font-bold uppercase tracking-widest text-muted-foreground">{isEn ? 'Final Score' : '최종 점수'}</div>
                            <div className="text-7xl font-black text-foreground font-mono">
                                {cps} <span className="text-2xl text-muted-foreground">CPS</span>
                            </div>
                        </div>

                        <div className={`p-6 rounded-2xl bg-secondary/30 text-3xl font-black ${getRank(cps).color} flex items-center justify-center gap-3 border border-border shadow-inner`}>
                            <Trophy className="w-10 h-10" />
                            {getRank(cps).title}
                        </div>

                        <div className="text-muted-foreground font-medium">
                            {isEn ? `Total ${clicks} clicks in ${duration} seconds` : `총 ${clicks}회 클릭 / ${duration}초`}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 max-w-sm mx-auto">
                            <button
                                onClick={resetGame}
                                className="flex-1 btn btn-primary py-4 flex items-center justify-center gap-2 font-bold"
                            >
                                <RefreshCw className="w-5 h-5" />
                                {isEn ? 'Try Again' : '다시 시도'}
                            </button>
                            <ShareButtons 
                                title={isEn ? `CPS Test Result: ${cps} CPS` : `CPS 테스트 결과: ${cps} CPS`}
                                description={isEn ? `My clicking speed is ${cps} CPS! Rank: ${getRank(cps).title}. Can you beat me?` : `내 클릭 속도는 ${cps} CPS! 등급은 ${getRank(cps).title}입니다. 도전해보세요!`}
                            />
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="flex justify-between items-center bg-secondary/20 rounded-2xl p-6 font-black">
                            <div className="flex flex-col items-start">
                                <span className="text-xs uppercase tracking-widest opacity-60 mb-1">{isEn ? 'Time Left' : '남은 시간'}</span>
                                <span className="text-4xl text-foreground font-mono">{timeLeft.toFixed(1)}s</span>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="text-xs uppercase tracking-widest opacity-60 mb-1">{isEn ? 'Clicks' : '클릭수'}</span>
                                <span className="text-4xl text-primary font-mono">{clicks}</span>
                            </div>
                        </div>

                        <div
                            onMouseDown={handleClick}
                            onTouchStart={(e) => { e.preventDefault(); handleClick(e); }}
                            className={`
                                relative h-72 bg-secondary/10 rounded-3xl border-4 border-dashed border-border flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden
                                ${isActive ? 'bg-primary/5 border-primary/20 rotate-0' : 'hover:bg-secondary/20'}
                            `}
                        >
                            {/* Ripple Effects */}
                            {ripples.map((ripple) => (
                                <span
                                    key={ripple.id}
                                    className="absolute rounded-full bg-primary/20 animate-ripple pointer-events-none"
                                    style={{
                                        left: ripple.x,
                                        top: ripple.y,
                                        width: '100px',
                                        height: '100px',
                                        transform: 'translate(-50%, -50%)'
                                    }}
                                />
                            ))}

                            {!isActive && clicks === 0 ? (
                                <div className="text-center space-y-4 pointer-events-none">
                                    <div className="p-4 bg-white dark:bg-gray-800 rounded-full shadow-lg mb-2 inline-block">
                                        <Zap className="w-10 h-10 text-yellow-500 animate-pulse" />
                                    </div>
                                    <div className="text-2xl font-black text-foreground uppercase tracking-tight">
                                        {isEn ? 'Click to Start!' : '여기를 클릭해서 시작하세요!'}
                                    </div>
                                    <div className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
                                        {isEn ? 'Ready?' : '준비되셨나요?'}
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center pointer-events-none select-none">
                                    <div className="text-8xl font-black text-foreground font-mono drop-shadow-md">
                                        {(clicks / (duration - timeLeft + 0.001)).toFixed(1)}
                                    </div>
                                    <div className="text-xl font-bold text-muted-foreground tracking-widest">CPS</div>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </div>

            <ToolGuide
                title={isEn ? "CPS Test - Ultimate Guide" : "CPS 테스트 가이드"}
                intro={isEn ? "CPS stands for Clicks Per Second. It is a measurement of how many times you can click your mouse button within a single second. This test is popular among gamers in competitive scenes like Minecraft or FPS games." : "CPS(Clicks Per Second)는 초당 마우스 클릭 횟수를 의미합니다. 자신의 손가락 근육 조절 능력과 순발력을 확인해보세요. 보통 FPS 게임이나 마인크래프트와 같은 경쟁 게임 사용자들 사이에서 실력의 척도로 쓰이기도 합니다."}
                steps={isEn ? [
                    "Select your preferred time duration (e.g., 1s, 5s, 10s).",
                    "Click the large designated area to initiate the countdown.",
                    "Continue clicking as fast as possible until the timer hits zero.",
                    "Compare your result with the global ranking chart provided."
                ] : [
                    "먼저 테스트하고 싶은 시간(1초~60초)을 선택합니다.",
                    "가운데 파선으로 표시된 영역을 클릭하면 즉시 타이머가 시작됩니다.",
                    "시간이 다 될 때까지 최대한 손가락을 빠르게 움직여 클릭하세요.",
                    "종료 후 계산된 CPS와 당신의 랭킹 등급을 확인합니다."
                ]}
                tips={isEn ? [
                    "Use 'Jitter Clicking' or 'Butterfly Clicking' techniques for peak performance.",
                    "A high-quality gaming mouse can increase your score by up to 20%.",
                    "Rest your wrist on a mousepad to prevent strain and improve leverage.",
                    "Short duration (1s, 3s) tests reflexes, while long duration (60s) tests endurance."
                ] : [
                    "지터 클릭(Jitter)이나 버터플라이 클릭 등 전문적인 기술을 연습해 보세요.",
                    "손목을 고정하고 손가락 끝의 감각에 집중하면 클릭 속도가 더 빨라집니다.",
                    "마우스 제어판 설정에서 더블 클릭 속도를 조절해 보는 것도 도움이 될 수 있습니다.",
                    "너무 무리해서 광클을 하면 근육에 무리가 갈 수 있으니 중간중간 휴식을 취하세요."
                ]}
                faqs={toolFaqs}
            />
        </div>
    );
};

export default CpsTest;
