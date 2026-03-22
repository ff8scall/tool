import React, { useState, useEffect, useRef } from 'react';
import { Share2, RefreshCw, Eye, Play, Trophy, Zap, AlertCircle } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { useLanguage } from '../context/LanguageContext';

const ColorTest = () => {
    const { lang } = useLanguage();
    const isEn = lang === 'en';
    const [gameState, setGameState] = useState('start'); // start, playing, result
    const [level, setLevel] = useState(1);
    const [timeLeft, setTimeLeft] = useState(15);
    const [score, setScore] = useState(0);
    const [gridSize, setGridSize] = useState(2);
    const [colors, setColors] = useState({ base: '', target: '' });
    const [targetIndex, setTargetIndex] = useState(null);
    
    const timerRef = useRef(null);

    const generateLevel = (currentLevel) => {
        const size = Math.min(Math.floor(currentLevel / 2) + 2, 8);
        setGridSize(size);

        // Generate base color
        const h = Math.floor(Math.random() * 360);
        const s = Math.floor(Math.random() * 60) + 20;
        const l = Math.floor(Math.random() * 40) + 30;
        
        const baseColor = `hsl(${h}, ${s}%, ${l}%)`;
        
        // Difficulty: difference in lightness/saturation decreases as level increases
        const diff = Math.max(2, 25 - currentLevel); 
        const targetColor = `hsl(${h}, ${s}%, ${l + diff}%)`;

        setColors({ base: baseColor, target: targetColor });
        setTargetIndex(Math.floor(Math.random() * (size * size)));
    };

    const startGame = () => {
        setGameState('playing');
        setLevel(1);
        setScore(0);
        setTimeLeft(15);
        generateLevel(1);
        
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    endGame();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    };

    const handleTileClick = (index) => {
        if (gameState !== 'playing') return;

        if (index === targetIndex) {
            // Correct
            const nextLevel = level + 1;
            setLevel(nextLevel);
            setScore(prev => prev + 10);
            setTimeLeft(prev => Math.min(prev + 2, 20)); // Bonus time
            generateLevel(nextLevel);
        } else {
            // Wrong - penalty
            setTimeLeft(prev => Math.max(0, prev - 3));
        }
    };

    const endGame = () => {
        setGameState('result');
        if (timerRef.current) clearInterval(timerRef.current);
    };

    const getRank = (finalScore) => {
        if (finalScore >= 300) return { title: isEn ? "Eagle Eye" : "색감의 신 (독수리)", desc: isEn ? "Incredible color perception! You can see the world in billions of shades." : "엄청난 색감 능력입니다! 당신은 세계를 수십억 가지의 색으로 봅니다.", color: "text-purple-600" };
        if (finalScore >= 200) return { title: isEn ? "Designer Vision" : "전문 디자이너급", desc: isEn ? "You have a very sharp eye for detail and color nuance." : "미묘한 색깔 차이도 아주 잘 잡아내시는군요.", color: "text-blue-600" };
        if (finalScore >= 100) return { title: isEn ? "Normal Human" : "평범한 눈", desc: isEn ? "You have standard human color vision." : "표준적인 색감 능력을 갖추고 있습니다.", color: "text-green-600" };
        return { title: isEn ? "Need Screen Calibration?" : "색 구분이 힘드신가요?", desc: isEn ? "Check your monitor settings or maybe you're just tired today." : "화면 설정이 이상하거나 오늘 조금 피곤하신 것 같네요.", color: "text-rose-500" };
    };

    const shareResult = () => {
        const rank = getRank(score);
        const text = isEn 
            ? `My color vision score is ${score}! Rank: ${rank.title}. Can you beat me?` 
            : `저의 색감 테스트 점수는 ${score}점, 등급은 ${rank.title}입니다! 당신의 눈은 안녕하신가요?`;
        if (navigator.share) {
            navigator.share({
                title: isEn ? 'Color Blindness/Vision Test' : '색감 능력 테스트',
                text: text,
                url: window.location.href,
            });
        } else {
            alert(isEn ? 'Link copied to clipboard!' : '링크가 복사되었습니다!');
            navigator.clipboard.writeText(window.location.href);
        }
    };

    const toolFaqs = isEn ? [
        { q: "What does this test measure?", a: "It measures your color discrimination ability—how well you can distinguish subtle differences in lightness and hue between similar colors." },
        { q: "Does monitor quality matter?", a: "Yes. The accuracy of the test depends heavily on your screen's contrast and color calibration. High-quality IPS panels usually provide the best experience." },
        { q: "How can I improve my score?", a: "Focusing on the center of the grid or looking for the tile that 'pops' as you squint can sometimes help." }
    ] : [
        { q: "이 테스트는 무엇을 측정하나요?", a: "색 분별력, 즉 비슷한 색깔들 사이에서 명도나 색조의 미세한 차이를 얼마나 잘 잡아내는지를 측정합니다." },
        { q: "모니터 화질이 영향을 주나요?", a: "네, 사용 중인 디스플레이의 명암비와 색 표현력에 따라 결과가 달라질 수 있습니다. 조명이 너무 밝은 곳은 피해서 테스트하세요." }
    ];

    const toolSteps = isEn ? [
        "Click the Start button to begin the timer (15 seconds).",
        "Look at the grid of colored tiles and find the one that has a different color.",
        "Click the target tile as fast as possible to earn points and bonus time.",
        "The grid gets larger and the color difference gets smaller as you level up."
    ] : [
        "시작 버튼을 눌러 게임을 개시합니다 (제한시간 15초).",
        "여러 타일 중 색깔이 다른 단 하나의 타일을 찾아 클릭합니다.",
        "빨리 맞출수록 높은 점수와 추가 시간을 얻을 수 있습니다.",
        "단계가 올라갈수록 판이 커지고 색깔 차이가 줄어들어 난이도가 급상승합니다."
    ];

    const toolTips = isEn ? [
        "Don't stare too long at one spot; your eyes can get fatigued quickly.",
        "Blinking often helps reset your color perception.",
        "A wrong click takes away 3 seconds, so accuracy is key!"
    ] : [
        "한 곳을 너무 오래 응시하면 눈이 피로해져 색 구분이 더 어려워집니다.",
        "눈을 깜빡여서 시력을 리셋하는 것도 좋은 전략입니다.",
        "잘못 클릭하면 3초의 시간 패널티가 있으니 신중하게 선택하세요."
    ];

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <SEO
                title={isEn ? "Color Sensitivity Test | Detail Vision Quiz | Tool Hive" : "색감 능력 테스트 | 미세한 색깔 차이 맞추기 | Tool Hive"}
                description={isEn ? "How sharp is your color vision? Find the odd tile in the grid and test your visual sensitivity. Fun, fast, and challenging." : "당신의 눈은 얼마나 예리한가요? 미세하게 다른 색깔의 타일을 찾아 클릭하세요. 재미있는 색감 능력 테스트 게임."}
                keywords={isEn ? "color test, vision quiz, color blind test, visual sensitivity, odd one out" : "색감테스트, 색맹테스트, 시력테스트, 다른색깔찾기, 눈건강게임"}
                category="Luck/Fun"
                faqs={toolFaqs}
                steps={toolSteps}
            />

            <div className="text-center mb-10">
                <div className="inline-block p-4 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mb-6">
                    <Eye size={48} className="text-indigo-600 dark:text-indigo-400" />
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 tracking-tighter italic uppercase">
                    {isEn ? 'Color Genius Test' : '색감 능력 테스트'}
                </h1>
                <p className="text-xl text-muted-foreground font-medium italic">
                    {isEn ? 'Find the odd tile in a world of shades' : '미세하게 다른 색깔을 찾아보세요!'}
                </p>
            </div>

            <div className="max-w-xl mx-auto">
                {gameState === 'playing' && (
                    <div className="space-y-6">
                        <div className="flex justify-between items-center px-6 py-4 bg-white dark:bg-slate-800 rounded-[2rem] shadow-xl border-4 border-slate-200 dark:border-slate-700">
                            <div className="text-center">
                                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest block italic">{isEn ? 'TIME LEFT' : '남은 시간'}</span>
                                <span className={`text-4xl font-black font-mono italic ${timeLeft <= 5 ? 'text-rose-500 animate-pulse' : 'text-slate-800 dark:text-white'}`}>
                                    {timeLeft}s
                                </span>
                            </div>
                            <div className="text-center">
                                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest block italic">{isEn ? 'LEVEL' : '레벨'}</span>
                                <span className="text-4xl font-black text-indigo-500 italic uppercase">{level}</span>
                            </div>
                            <div className="text-center">
                                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest block italic">{isEn ? 'SCORE' : '점수'}</span>
                                <span className="text-4xl font-black text-indigo-500 italic uppercase">{score}</span>
                            </div>
                        </div>

                        <div 
                            className="aspect-square bg-slate-200 dark:bg-slate-700 rounded-[2.5rem] p-4 grid gap-2 shadow-2xl border-4 border-white dark:border-slate-800"
                            style={{ 
                                gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                                gridTemplateRows: `repeat(${gridSize}, 1fr)`
                            }}
                        >
                            {Array.from({ length: gridSize * gridSize }).map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleTileClick(i)}
                                    className="w-full h-full rounded-2xl shadow-sm transition-transform active:scale-95 duration-100"
                                    style={{ 
                                        backgroundColor: i === targetIndex ? colors.target : colors.base 
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {gameState === 'start' && (
                    <div className="bg-card dark:bg-slate-800 rounded-[3rem] shadow-2xl p-12 text-center border-4 border-slate-200 dark:border-slate-700 animate-in zoom-in duration-500">
                        <Zap size={80} className="text-yellow-500 mx-auto mb-8 animate-bounce" />
                        <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-6 italic tracking-tighter uppercase">{isEn ? 'Ready to Focus?' : '당신의 눈을 믿나요?'}</h2>
                        <p className="text-lg text-muted-foreground mb-10 leading-relaxed font-medium italic">
                            {isEn ? 'You have 15 seconds to find as many different-colored tiles as you can. Every correct click adds time!' : '제한시간 15초 동안 다른 색깔의 타일을 최대한 많이 찾으세요. 정답을 맞출수록 시간이 충전됩니다!'}
                        </p>
                        <button
                            onClick={startGame}
                            className="w-full py-6 bg-slate-900 text-white rounded-2xl font-black text-2xl hover:scale-105 transition-all shadow-2xl active:scale-95 italic uppercase tracking-tight flex items-center justify-center gap-3"
                        >
                            <Play fill="currentColor" />
                            {isEn ? 'ENGAGE SIGHT' : '테스트 시작'}
                        </button>
                    </div>
                )}

                {gameState === 'result' && (
                    <div className="bg-card dark:bg-slate-800 rounded-[3rem] shadow-2xl p-12 text-center border-4 border-slate-200 dark:border-slate-700 animate-in zoom-in duration-500">
                        <Trophy size={80} className="text-yellow-500 mx-auto mb-8 drop-shadow-[0_0_20px_rgba(234,179,8,0.3)]" />
                        <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-2 italic tracking-tighter uppercase">{isEn ? 'TEST COMPLETE' : '테스트 결과'}</h2>
                        
                        <div className="py-10">
                            <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2 italic">{isEn ? 'FINAL PERFORMANCE' : '최종 점수'}</div>
                            <div className="text-8xl font-black text-indigo-500 italic tracking-tighter mb-4">{score}</div>
                            <div className="inline-block px-6 py-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-full">
                                <span className={`text-2xl font-black italic tracking-tight ${getRank(score).color}`}>
                                    {getRank(score).title}
                                </span>
                            </div>
                        </div>

                        <div className="bg-slate-50 dark:bg-slate-700/50 p-6 rounded-[2rem] mb-10 border-2 border-border/50">
                            <p className="text-slate-600 dark:text-slate-300 font-medium italic">
                                {getRank(score).desc}
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={startGame}
                                className="flex-1 flex items-center justify-center px-8 py-5 bg-slate-900 text-white rounded-2xl font-black text-lg hover:scale-105 transition-all shadow-xl active:scale-95 italic uppercase"
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

            <div className="mt-20">
                <ToolGuide
                    title={isEn ? "The Color Spectrum Guide" : "색감 능력 테스트 안내"}
                    intro={isEn ? "Human eyes are capable of seeing millions of colors, but our sensitivity varies depending on genetics, environment, and fatigue. This test is a fast way to check your 'Eye Age' and detail perception." : "인간의 눈은 수만 가지의 색을 구별할 수 있지만, 컨디션이나 환경에 따라 그 민감도는 달라집니다. 이 테스트는 당신의 현재 시각적 예리함과 긴장도를 체크할 수 있는 가장 빠른 방법입니다."}
                    steps={toolSteps}
                    tips={toolTips}
                    faqs={toolFaqs}
                />
            </div>
        </div>
    );
};

export default ColorTest;
