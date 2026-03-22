import React, { useState, useEffect, useRef } from 'react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { Trophy, RefreshCw, Play, Timer, History, Trash2, Share2 } from 'lucide-react';
import useShareCanvas from '../hooks/useShareCanvas';
import { useLanguage } from '../context/LanguageContext';

const OneToFifty = () => {
    const { lang } = useLanguage();
    const isEn = lang === 'en';
    const [numbers, setNumbers] = useState([]);
    const [currentNumber, setCurrentNumber] = useState(1);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [grid, setGrid] = useState([]);
    const [history, setHistory] = useState([]);
    const { shareCanvas } = useShareCanvas();
    const containerRef = useRef(null);

    // Load history from localStorage
    useEffect(() => {
        const savedHistory = localStorage.getItem('oneToFiftyHistory');
        if (savedHistory) {
            setHistory(JSON.parse(savedHistory));
        }
    }, []);

    // 1-25 are initially visible, 26-50 replace them
    const generateGrid = () => {
        const firstSet = Array.from({ length: 25 }, (_, i) => i + 1);
        return shuffle(firstSet);
    };

    const shuffle = (array) => {
        return [...array].sort(() => Math.random() - 0.5);
    };

    const startGame = () => {
        setNumbers(generateGrid());
        setCurrentNumber(1);
        setStartTime(Date.now());
        setEndTime(null);
        setIsPlaying(true);
        setGrid(Array(25).fill(null).map((_, i) => ({
            value: null,
            index: i
        })));

        // Initialize grid with 1-25 shuffled
        const initialNumbers = shuffle(Array.from({ length: 25 }, (_, i) => i + 1));
        setGrid(initialNumbers.map((val, idx) => ({ value: val, index: idx })));
    };

    const handleClick = (number, index) => {
        if (!isPlaying || number !== currentNumber) return;

        if (currentNumber === 50) {
            const finalTime = Date.now();
            setEndTime(finalTime);
            setIsPlaying(false);

            // Save to history
            const completionTime = (finalTime - startTime) / 1000;
            const newRecord = {
                id: Date.now(),
                date: new Date().toLocaleString(),
                time: completionTime
            };

            const newHistory = [newRecord, ...history].slice(0, 50); // Keep last 50
            setHistory(newHistory);
            localStorage.setItem('oneToFiftyHistory', JSON.stringify(newHistory));
            return;
        }

        // If number is <= 25, replace with number + 25
        // If number is > 25, just clear it (set to null)
        const newGrid = [...grid];
        if (number <= 25) {
            newGrid[index] = { value: number + 25, index };
        } else {
            newGrid[index] = { value: null, index };
        }

        setGrid(newGrid);
        setCurrentNumber(prev => prev + 1);
    };

    const formatTime = (ms) => {
        return (ms / 1000).toFixed(2);
    };

    const clearHistory = () => {
        const confirmMsg = isEn ? 'Are you sure you want to clear your history?' : '기록을 모두 삭제하시겠습니까?';
        if (window.confirm(confirmMsg)) {
            setHistory([]);
            localStorage.removeItem('oneToFiftyHistory');
        }
    };

    // Timer update for display
    const [currentTime, setCurrentTime] = useState(0);
    useEffect(() => {
        let interval;
        if (isPlaying) {
            interval = setInterval(() => {
                setCurrentTime(Date.now() - startTime);
            }, 10);
        }
        return () => clearInterval(interval);
    }, [isPlaying, startTime]);

    const toolFaqs = isEn ? [
        { q: "What is an average time for 1 to 50?", a: "Average adults complete it in 30-45 seconds. Experts can score below 20 seconds using peripheral vision." },
        { q: "Does the game save my progress?", a: "Your game session is live, but your top 10 best times are automatically saved to your browser's local storage." },
        { q: "Can I play this on mobile?", a: "Yes, 1 to 50 is optimized for touch screens and is actually a great way to test finger-eye coordination." }
    ] : [
        { q: "보통 몇 초 정도 나오면 잘하는 건가요?", a: "일반적인 성인은 30~45초대, 숙련자나 자격증 보유자 수준의 고수는 20초대 이하의 기록을 냅니다." },
        { q: "기록이 저장되나요?", a: "네, 브라우저의 로컬 스토리지를 통해 최근 최고 기록 10위까지 자동으로 저장되어 언제든 확인 가능합니다." },
        { q: "모바일에서도 가능한가요?", a: "네, 터치 인터페이스에 최적화되어 있어 스마트폰이나 태블릿에서도 쾌적하게 즐기실 수 있습니다." }
    ];

    return (
        <div className="max-w-2xl mx-auto space-y-8 select-none" ref={containerRef}>
            <SEO
                title={isEn ? "1 to 50 - Reaction & Speed Game Online" : "1 to 50 - 순발력 테스트 게임 | Utility Hub"}
                description={isEn ? "Click numbers 1 to 50 as fast as you can. Test your focus and reaction time in this addictive speed challenge." : "1부터 50까지 숫자를 순서대로 빠르게 클릭하세요! 당신의 순발력을 테스트해보세요."}
                keywords={isEn ? "1to50, speed test, reaction game, focus game, click speed" : "1to50, 1부터50, 순발력, 게임, 반응속도"}
                faqs={toolFaqs}
            />

            <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-full mb-2">
                    <Trophy className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
                </div>
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-orange-500">
                    1 to 50
                </h1>
                <p className="text-muted-foreground">
                    {isEn ? 'Touch numbers from 1 to 50 in order as fast as possible!' : '1부터 50까지 순서대로 빠르게 터치하세요!'}
                </p>
            </div>

            {/* Control Bar */}
            <div className="flex justify-center">
                <button
                    onClick={startGame}
                    className={`px-10 py-4 rounded-2xl text-xl font-black text-white shadow-xl transition-all transform hover:scale-105 active:scale-95 flex items-center gap-3 ${isPlaying
                        ? 'bg-orange-500 hover:bg-orange-600'
                        : 'bg-primary hover:bg-primary/90'
                        }`}
                >
                    {isPlaying ? (
                        <>
                            <RefreshCw className={`w-6 h-6 ${isPlaying ? 'animate-spin-once' : ''}`} />
                            {isEn ? 'Restart' : '다시 시작'}
                        </>
                    ) : (
                        <>
                            <Play className="w-6 h-6 fill-current" />
                            {endTime ? (isEn ? 'Try Again' : '다시 하기') : (isEn ? 'START GAME' : '게임 시작')}
                        </>
                    )}
                </button>
            </div>

            <div className="card border-2 border-border/50 p-6 md:p-8 text-center space-y-8 shadow-2xl">
                {/* Status Bar */}
                <div className="flex justify-between items-center bg-secondary/30 rounded-2xl p-6 font-black">
                    <div className="text-primary flex flex-col items-start">
                        <span className="text-xs uppercase tracking-widest opacity-60 mb-1">{isEn ? 'Next Number' : '다음 숫자'}</span>
                        <span className="text-4xl">{isPlaying ? currentNumber : '-'}</span>
                    </div>
                    <div className="text-red-500 font-mono flex flex-col items-end">
                        <span className="text-xs uppercase tracking-widest opacity-60 mb-1">{isEn ? 'Timer' : '경과 시간'}</span>
                        <span className="text-4xl">
                            {isPlaying
                                ? formatTime(currentTime)
                                : endTime
                                    ? formatTime(endTime - startTime)
                                    : '0.00'}s
                        </span>
                    </div>
                </div>

                {/* Game Grid */}
                {!isPlaying && !endTime ? (
                    <div className="h-96 flex items-center justify-center bg-secondary/10 rounded-2xl border-2 border-dashed border-border/50">
                        <div className="text-muted-foreground text-xl font-bold animate-pulse">
                            {isEn ? "Press 'START' Above!" : "상단의 '게임 시작' 버튼을 눌러주세요!"}
                        </div>
                    </div>
                ) : endTime ? (
                    <div className="h-96 flex flex-col items-center justify-center bg-secondary/5 rounded-2xl border-2 border-primary/20 space-y-8 animate-in zoom-in-95 duration-300">
                        <div className="space-y-2">
                            <Trophy className="w-20 h-20 mx-auto text-yellow-500 drop-shadow-lg" />
                            <div className="text-4xl font-black text-foreground uppercase tracking-tighter">
                                {isEn ? 'WELL DONE!' : '대단해요!'}
                            </div>
                        </div>
                        <div className="text-7xl font-black text-red-500 font-mono drop-shadow-md">
                            {formatTime(endTime - startTime)}s
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm px-6">
                            <button
                                onClick={startGame}
                                className="flex-1 px-6 py-3 bg-primary text-white rounded-xl font-bold text-lg hover:bg-primary/90 transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
                            >
                                <RefreshCw className="w-5 h-5" />
                                {isEn ? 'Try Again' : '다시 도전'}
                            </button>
                            <button
                                onClick={() => shareCanvas(containerRef.current, '1 to 50', `${formatTime(endTime - startTime)}s`)}
                                className="flex-1 px-6 py-3 bg-slate-600 text-white rounded-xl font-bold text-lg hover:bg-slate-700 transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
                            >
                                <Share2 className="w-5 h-5" /> 
                                {isEn ? 'Share' : '공유하기'}
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-5 gap-2 md:gap-4 max-w-md mx-auto aspect-square">
                        {grid.map((item, idx) => (
                            <div
                                key={`${idx}-${item.value}`}
                                onClick={() => item.value && handleClick(item.value, idx)}
                                className={`
                                    aspect-square flex items-center justify-center text-2xl md:text-3xl font-black rounded-xl cursor-pointer transition-all duration-75 select-none
                                    ${item.value
                                        ? 'bg-card shadow-lg hover:bg-secondary active:scale-90 active:bg-primary active:text-white border-2 border-border transform hover:-translate-y-0.5'
                                        : 'invisible pointer-events-none opacity-0'}
                                `}
                            >
                                {item.value}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="text-center text-sm font-medium text-muted-foreground bg-secondary/20 py-3 rounded-full">
                💡 {isEn ? "Tip: Use 'Peripheral Vision' to find next numbers faster!" : "팁: 다음 숫자를 미리 찾아두면 더 빠르게 기록을 단축할 수 있습니다."}
            </div>

            {/* History Section */}
            {history.length > 0 && (
                <div className="card p-6 space-y-4 shadow-xl border-border/50">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-black flex items-center gap-2 uppercase tracking-tight">
                            <History className="w-5 h-5 text-primary" />
                            {isEn ? 'Top Records' : '최고 기록'}
                        </h3>
                        <button
                            onClick={clearHistory}
                            className="text-sm font-bold text-red-500 hover:text-red-600 flex items-center gap-1 transition-colors"
                        >
                            <Trash2 className="w-4 h-4" />
                            {isEn ? 'Clear' : '초기화'}
                        </button>
                    </div>
                    <div className="overflow-x-auto rounded-xl border border-border">
                        <table className="w-full text-sm text-center">
                            <thead className="text-xs text-muted-foreground uppercase bg-secondary/50 font-black">
                                <tr>
                                    <th className="px-4 py-4">{isEn ? 'Rank' : '순위'}</th>
                                    <th className="px-4 py-4">{isEn ? 'Date' : '날짜'}</th>
                                    <th className="px-4 py-4">{isEn ? 'Time' : '시간'}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {history
                                    .sort((a, b) => a.time - b.time)
                                    .slice(0, 10)
                                    .map((record, index) => (
                                        <tr key={record.id} className="bg-card border-b border-border hover:bg-secondary/20 transition-colors">
                                            <td className="px-4 py-4">
                                                <span className={`text-xl font-black ${index === 0 ? 'text-yellow-500' :
                                                    index === 1 ? 'text-gray-400' :
                                                        index === 2 ? 'text-orange-600' :
                                                            'text-muted-foreground'
                                                    }`}>
                                                    {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}${isEn ? 'th' : '위'}`}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4 text-muted-foreground font-medium">{record.date.split(',')[0]}</td>
                                            <td className="px-4 py-4 font-black text-primary font-mono text-xl">
                                                {record.time.toFixed(2)}s
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            <ToolGuide
                title={isEn ? "Mastering the 1 to 50 Game" : "1 to 50 게임 완벽 가이드"}
                intro={isEn ? "1 to 50 is a classic brain game designed to test your processing speed and peripheral vision. The goal is simple: find and click numbers from 1 to 50 as fast as possible." : "1부터 50까지 숫자를 순서대로 빠르게 클릭하여 자신의 순발력과 집중력을 테스트하는 게임입니다. 전 세계적으로 인기 있는 뇌 운동 게임으로, 기록 단축을 통해 성취감을 느낄 수 있습니다."}
                steps={isEn ? [
                    "Click the 'START GAME' button to begin the timer.",
                    "Find number 1 in the grid and click it. It will be replaced by a number from 26-50.",
                    "Continue clicking numbers in sequential order (1, 2, 3...).",
                    "Once you hit 50, the timer stops and reveals your final score."
                ] : [
                    "'게임 시작' 버튼을 눌러 게임을 개시합니다.",
                    "화면에 무작위로 배치된 1부터 25까지의 숫자 중 1을 찾아 클릭합니다.",
                    "클릭된 숫자 자리에 26부터 50까지의 숫자가 새롭게 나타납니다.",
                    "50까지 모든 숫자를 순서대로 클릭하면 게임이 종료되고 최종 기록이 표시됩니다."
                ]}
                tips={isEn ? [
                    "Don't stare at a single spot. Keep your eyes loose to catch numbers in your peripheral vision.",
                    "Maintain a steady rhythm; panic-clicking often leads to missing the number you're looking for.",
                    "Practicing for just 5 minutes a day can significantly improve your brain's processing speed.",
                    "On mobile, use two hands if your screen is large enough for faster multi-tapping."
                ] : [
                    "다음 숫자가 어디에 있는지 눈으로 미리 훑어보는 '주변시' 활용이 중요합니다.",
                    "일정한 리듬을 유지하며 클릭하면 실수를 줄이고 속도를 높일 수 있습니다.",
                    "매일 5분씩 연습하면 뇌의 반응 속도 향상에 도움이 됩니다.",
                    "모바일 기기에서는 양손을 모두 사용하여 터치 범위를 넓히는 것이 유리합니다."
                ]}
                faqs={toolFaqs}
            />
        </div>
    );
};

export default OneToFifty;
