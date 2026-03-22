import React, { useState, useRef, useEffect } from 'react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { Zap, RotateCcw, Trophy } from 'lucide-react';
import ShareButtons from '../components/ShareButtons';
import { useLanguage } from '../context/LanguageContext';

const ReactionTest = () => {
    const { lang, t } = useLanguage();
    const isEn = lang === 'en';
    const [gameState, setGameState] = useState('waiting'); // waiting, ready, now, result, too-early
    const [startTime, setStartTime] = useState(0);
    const [reactionTime, setReactionTime] = useState(null);
    const [bestScore, setBestScore] = useState(() => {
        return parseInt(localStorage.getItem('reaction-best')) || null;
    });

    const timeoutRef = useRef(null);

    const startGame = () => {
        setGameState('ready');
        setReactionTime(null);

        const randomDelay = Math.floor(Math.random() * 3000) + 2000; // 2-5 seconds

        timeoutRef.current = setTimeout(() => {
            setGameState('now');
            setStartTime(Date.now());
        }, randomDelay);
    };

    const handleClick = () => {
        if (gameState === 'waiting' || gameState === 'result' || gameState === 'too-early') {
            startGame();
        } else if (gameState === 'ready') {
            clearTimeout(timeoutRef.current);
            setGameState('too-early');
        } else if (gameState === 'now') {
            const endTime = Date.now();
            const time = endTime - startTime;
            setReactionTime(time);
            setGameState('result');

            if (!bestScore || time < bestScore) {
                setBestScore(time);
                localStorage.setItem('reaction-best', time);
            }
        }
    };

    useEffect(() => {
        return () => clearTimeout(timeoutRef.current);
    }, []);

    const getMessage = () => {
        switch (gameState) {
            case 'waiting': return isEn ? 'Click the screen to start' : '화면을 클릭하여 시작하세요';
            case 'ready': return isEn ? 'Click when it turns green!' : '초록색이 되면 클릭하세요!';
            case 'now': return isEn ? 'CLICK!!!' : '클릭!!!';
            case 'result': return `${reactionTime}ms`;
            case 'too-early': return isEn ? 'Too early! Try again' : '너무 빨라요! 다시 시도하세요';
            default: return '';
        }
    };

    const getBgColor = () => {
        switch (gameState) {
            case 'waiting': return 'bg-blue-500 hover:bg-blue-600';
            case 'ready': return 'bg-red-500';
            case 'now': return 'bg-green-500';
            case 'result': return 'bg-blue-500 hover:bg-blue-600';
            case 'too-early': return 'bg-blue-500 hover:bg-blue-600';
            default: return 'bg-blue-500';
        }
    };

    const toolFaqs = isEn ? [
        { q: "What is an average reaction time?", a: "The average reaction time for humans is about 250-280ms. Professional gamers often score below 200ms." },
        { q: "Does hardware affect my score?", a: "Yes. Screen refresh rate (Hz) and input lag from your mouse or touchpad can add several milliseconds to your final result." },
        { q: "Is this test scientifically accurate?", a: "While it provides a good estimate, factors like browser performance, internet latency (if assets are loading), and distractions can impact precision." }
    ] : [
        { q: "평균적인 반응 속도는 어느 정도인가요?", a: "일반인의 경우 약 250~280ms 정도입니다. 프로게이머들은 보통 200ms 이하의 기록을 보입니다." },
        { q: "장비가 기록에 영향을 주나요?", a: "네, 모니터의 주사율(Hz)과 마우스/터치패드의 입력 지연(인풋랙)에 따라 수십 ms의 차이가 발생할 수 있습니다." },
        { q: "가장 정확하게 측정하려면 어떻게 해야 하나요?", a: "주변의 방해 요소가 없는 정숙한 환경에서, 유선 마우스를 사용하고 다른 브라우저 탭을 모두 닫은 상태에서 테스트하는 것이 좋습니다." }
    ];

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <SEO
                title={isEn ? "Reaction Time Test - Check Your Reflexes Online" : "반응속도 테스트 - 순발력 게임 | Utility Hub"}
                description={isEn ? "How fast are your reflexes? Test your reaction time in milliseconds. Compare your score with the average." : "나의 반응속도는 몇 ms일까요? 초록색 화면이 뜰 때 클릭하여 순발력을 테스트해보세요."}
                keywords={isEn ? "reaction time test, click speed, human benchbark, reflexes test" : "반응속도, 순발력테스트, 미니게임, 반응속도테스트"}
                faqs={toolFaqs}
            />

            <div className="text-center space-y-4 py-6">
                <div className="inline-flex items-center justify-center p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-full mb-2">
                    <Zap className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
                </div>
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-orange-500">
                    {isEn ? 'Reaction Time Test' : '반응속도 테스트'}
                </h1>
                <p className="text-muted-foreground">
                    {isEn ? 'Click as fast as you can when the screen turns green!' : '화면 색상이 초록색으로 바뀌는 순간 최대한 빠르게 클릭하세요!'}
                </p>
            </div>

            <div
                className={`
                    relative w-full aspect-video md:aspect-[2/1] rounded-2xl shadow-xl 
                    flex flex-col items-center justify-center text-white cursor-pointer 
                    transition-all duration-200 select-none
                    ${getBgColor()}
                `}
                onMouseDown={handleClick}
                onTouchStart={(e) => { e.preventDefault(); handleClick(); }}
            >
                {gameState === 'waiting' && <Zap className="w-16 h-16 mb-4 animate-pulse" />}
                {gameState === 'ready' && <div className="text-6xl font-bold mb-4">...</div>}
                {gameState === 'now' && <div className="text-6xl font-bold mb-4">CLICK!</div>}
                {gameState === 'result' && <div className="text-6xl font-bold mb-4">{reactionTime}ms</div>}
                {gameState === 'too-early' && <div className="text-6xl font-bold mb-4">Wait!</div>}

                <h2 className="text-3xl md:text-4xl font-bold text-center px-4 drop-shadow-md">
                    {getMessage()}
                </h2>

                {gameState === 'result' && (
                    <p className="mt-4 text-lg opacity-90">{isEn ? 'Click to restart' : '클릭하여 다시 시작'}</p>
                )}
            </div>

            {bestScore && (
                <div className="flex justify-center">
                    <div className="bg-card border border-border px-8 py-4 rounded-xl shadow-sm flex items-center gap-4">
                        <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
                            <Trophy className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                        </div>
                        <div className="text-center">
                            <div className="text-sm text-muted-foreground font-medium">{isEn ? 'Personal Best' : '최고 기록'}</div>
                            <div className="text-2xl font-bold">{bestScore}ms</div>
                        </div>
                    </div>
                </div>
            )}

            <div className="mt-8">
                <ShareButtons
                    title={isEn ? "Reaction Time Test" : "반응속도 테스트"}
                    description={isEn ? `My reaction time is ${bestScore ? bestScore + 'ms' : '...'}! Can you beat me?` : `제 반응속도는 ${bestScore ? bestScore + 'ms' : '측정 중'} 입니다! 당신의 순발력은?`}
                />
            </div>

            <ToolGuide
                title={isEn ? "How to Test Your Reaction Time" : "반응속도 테스트 가이드"}
                intro={isEn ? "Reaction time is the measure of how quickly an organism responds to a stimulus. In this test, we measure your simple reaction time using a visual stimulus." : "반응속도 테스트는 시각적 자극에 대해 뇌가 근육으로 신호를 보내는 속도를 측정합니다. 이 간단한 테스트를 통해 자신의 순발력이 어느 정도인지 확인해보세요."}
                steps={isEn ? [
                    "Click the blue area to standby for the test.",
                    "Wait for the red screen to appear (Ready state).",
                    "The moment the screen turns green, click as fast as possible.",
                    "Review your score in milliseconds (ms) and try to beat your record."
                ] : [
                    "파란색 대기 화면을 클릭하여 테스트를 시작합니다.",
                    "빨간색 대기 상태가 되면 마음의 준비를 하세요.",
                    "초록색 정지 화면으로 바뀌는 찰나에 가장 빠르게 클릭합니다.",
                    "밀리초(ms) 단위의 결과를 확인하고 최고 기록에 도전하세요."
                ]}
                tips={isEn ? [
                    "Use a physical mouse instead of a laptop touchpad for better scores.",
                    "Focus your eyes in the center of the screen to catch the color change faster.",
                    "Ensure your monitor is set to its highest refresh rate.",
                    "Reducing background tasks on your computer can minimize input lag."
                ] : [
                    "노트북 터치패드보다는 물리 마우스를 사용하면 더 좋은 결과가 나옵니다.",
                    "화면 중앙에 시선을 집중하면 색상 변화를 더 빨리 감지할 수 있습니다.",
                    "모니터 주사율이 높을수록 화면 전환이 부드러워 측정이 정확해집니다.",
                    "주변이 밝은 곳보다는 화면에 집중할 수 있는 조명 아래서 테스트하세요."
                ]}
                faqs={toolFaqs}
            />
        </div>
    );
};

export default ReactionTest;
