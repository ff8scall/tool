import React, { useState, useEffect, useRef } from 'react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { Trophy, RefreshCw, Play, Timer, History, Trash2, Share2 } from 'lucide-react';
import useShareCanvas from '../hooks/useShareCanvas';

const OneToFifty = () => {
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
        if (window.confirm('기록을 모두 삭제하시겠습니까?')) {
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

    return (
        <div className="max-w-2xl mx-auto space-y-6 select-none" ref={containerRef}>
            <SEO
                title="1 to 50 - 순발력 테스트 게임"
                description="1부터 50까지 숫자를 순서대로 빠르게 클릭하세요! 당신의 순발력을 테스트해보세요."
                keywords={['1to50', '1부터50', '순발력', '게임', '반응속도']}
            />

            <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-3">
                    <Trophy className="w-8 h-8 text-yellow-500" />
                    1 to 50
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    1부터 50까지 순서대로 빠르게 터치하세요!
                </p>
            </div>

            {/* Control Bar */}
            <div className="flex justify-center">
                <button
                    onClick={startGame}
                    className={`px-8 py-3 rounded-lg text-lg font-bold text-white shadow-md transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2 ${isPlaying
                        ? 'bg-yellow-500 hover:bg-yellow-600'
                        : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                >
                    {isPlaying ? (
                        <>
                            <RefreshCw className="w-6 h-6" />
                            다시 시작
                        </>
                    ) : (
                        <>
                            <Play className="w-6 h-6" />
                            {endTime ? '다시 하기' : '게임 시작'}
                        </>
                    )}
                </button>
            </div>

            <div className="card p-6 text-center space-y-6">
                {/* Status Bar */}
                <div className="flex justify-between items-center text-xl font-bold px-4">
                    <div className="text-blue-500">
                        다음 숫자: <span className="text-3xl">{isPlaying ? currentNumber : '-'}</span>
                    </div>
                    <div className="text-red-500 font-mono text-3xl">
                        {isPlaying
                            ? formatTime(currentTime)
                            : endTime
                                ? formatTime(endTime - startTime)
                                : '0.00'}s
                    </div>
                </div>

                {/* Game Grid */}
                {!isPlaying && !endTime ? (
                    <div className="h-96 flex items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-xl">
                        <div className="text-white text-xl font-bold animate-pulse">
                            상단의 '게임 시작' 버튼을 눌러주세요!
                        </div>
                    </div>
                ) : endTime ? (
                    <div className="h-96 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800 rounded-xl space-y-6">
                        <div className="text-4xl font-bold text-gray-900 dark:text-white">
                            Game Over!
                        </div>
                        <div className="text-6xl font-bold text-red-500 font-mono">
                            {formatTime(endTime - startTime)}s
                        </div>
                        <button
                            onClick={startGame}
                            className="btn btn-primary btn-lg flex items-center gap-2"
                        >
                            <RefreshCw className="w-6 h-6" />
                            다시 도전
                        </button>
                        <button
                            onClick={() => shareCanvas(containerRef.current, '1 to 50', `${formatTime(endTime - startTime)}s`)}
                            className="px-8 py-3 bg-slate-600 hover:bg-slate-700 text-white rounded-xl font-bold text-lg transition-colors shadow-lg mt-3 flex items-center justify-center gap-2"
                        >
                            <Share2 size={24} /> 결과 공유하기
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-5 gap-2 md:gap-3 max-w-md mx-auto">
                        {grid.map((item, idx) => (
                            <div
                                key={idx}
                                onClick={() => item.value && handleClick(item.value, idx)}
                                className={`
                  aspect-square flex items-center justify-center text-2xl md:text-3xl font-bold rounded-lg cursor-pointer transition-all duration-75
                  ${item.value
                                        ? 'bg-white dark:bg-gray-700 shadow-md hover:bg-gray-50 dark:hover:bg-gray-600 active:scale-95 border-2 border-gray-200 dark:border-gray-600'
                                        : 'invisible'}
                `}
                            >
                                {item.value}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="text-center text-sm text-gray-500">
                💡 팁: 다음 숫자를 미리 찾아두면 더 빠르게 기록을 단축할 수 있습니다.
            </div>

            {/* History Section */}
            {history.length > 0 && (
                <div className="card p-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold flex items-center gap-2">
                            <History className="w-5 h-5" />
                            최근 기록
                        </h3>
                        <button
                            onClick={clearHistory}
                            className="text-sm text-red-500 hover:text-red-600 flex items-center gap-1"
                        >
                            <Trash2 className="w-4 h-4" />
                            기록 초기화
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th className="px-4 py-3">순위</th>
                                    <th className="px-4 py-3">시간</th>
                                    <th className="px-4 py-3">완료 시간</th>
                                </tr>
                            </thead>
                            <tbody>
                                {history
                                    .sort((a, b) => a.time - b.time)
                                    .slice(0, 10)
                                    .map((record, index) => (
                                        <tr key={record.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <td className="px-4 py-3">
                                                <span className={`font-bold ${index === 0 ? 'text-yellow-500' :
                                                    index === 1 ? 'text-gray-400' :
                                                        index === 2 ? 'text-orange-600' :
                                                            'text-gray-600 dark:text-gray-400'
                                                    }`}>
                                                    {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}위`}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">{record.date}</td>
                                            <td className="px-4 py-3 font-bold text-blue-600 dark:text-blue-400 font-mono text-lg">
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
                title="1 to 50 게임 완벽 가이드"
                intro="1부터 50까지 숫자를 순서대로 빠르게 클릭하여 자신의 순발력과 집중력을 테스트하는 게임입니다. 전 세계적으로 인기 있는 뇌 운동 게임으로, 기록 단축을 통해 성취감을 느낄 수 있습니다."
                steps={[
                    "'게임 시작' 버튼을 눌러 게임을 개시합니다.",
                    "화면에 무작위로 배치된 1부터 25까지의 숫자 중 1을 찾아 클릭합니다.",
                    "클릭된 숫자 자리에 26부터 50까지의 숫자가 새롭게 나타납니다.",
                    "50까지 모든 숫자를 순서대로 클릭하면 게임이 종료되고 최종 기록이 표시됩니다."
                ]}
                tips={[
                    "다음 숫자가 어디에 있는지 눈으로 미리 훑어보는 '주변시' 활용이 중요합니다.",
                    "일정한 리듬을 유지하며 클릭하면 실수를 줄이고 속도를 높일 수 있습니다.",
                    "매일 5분씩 연습하면 뇌의 반응 속도 향상에 도움이 됩니다."
                ]}
                faqs={[
                    {
                        q: "보통 몇 초 정도 나오면 잘하는 건가요?",
                        a: "일반적인 성인은 30~40초대, 숙련자는 20초대 이하의 기록을 냅니다."
                    },
                    {
                        q: "기록이 저장되나요?",
                        a: "네, 브라우저의 로컬 스토리지를 통해 최근 기록 10위까지 자동으로 저장됩니다."
                    }
                ]}
            />

        </div>
    );
};

export default OneToFifty;
