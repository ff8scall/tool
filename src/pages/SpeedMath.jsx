import React, { useState, useEffect, useRef } from 'react';

import { Share2, RefreshCw, Calculator, Trophy, Timer, Zap, Play } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';

const SpeedMath = () => {
    const [gameState, setGameState] = useState('start'); // start, playing, gameover
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [problem, setProblem] = useState({ expression: '', answer: 0 });
    const [userAnswer, setUserAnswer] = useState('');
    const [difficulty, setDifficulty] = useState('easy'); // easy, hard
    const inputRef = useRef(null);

    const generateProblem = (diff) => {
        let num1, num2, operator, expression, answer;

        if (diff === 'easy') {
            // Addition, Subtraction
            operator = Math.random() < 0.5 ? '+' : '-';
            num1 = Math.floor(Math.random() * 20) + 1;
            num2 = Math.floor(Math.random() * 20) + 1;

            if (operator === '-') {
                if (num1 < num2) [num1, num2] = [num2, num1]; // Ensure positive result
            }

            answer = operator === '+' ? num1 + num2 : num1 - num2;
            expression = `${num1} ${operator} ${num2}`;
        } else {
            // All operations
            const ops = ['+', '-', '*', '/'];
            operator = ops[Math.floor(Math.random() * ops.length)];

            if (operator === '*') {
                num1 = Math.floor(Math.random() * 12) + 2;
                num2 = Math.floor(Math.random() * 9) + 2;
                answer = num1 * num2;
            } else if (operator === '/') {
                num2 = Math.floor(Math.random() * 9) + 2;
                answer = Math.floor(Math.random() * 12) + 2;
                num1 = num2 * answer;
            } else {
                num1 = Math.floor(Math.random() * 50) + 10;
                num2 = Math.floor(Math.random() * 50) + 10;
                if (operator === '-') {
                    if (num1 < num2) [num1, num2] = [num2, num1];
                }
                answer = operator === '+' ? num1 + num2 : num1 - num2;
            }
            expression = `${num1} ${operator} ${num2}`;
        }

        return { expression, answer };
    };

    const startGame = (diff) => {
        setDifficulty(diff);
        setGameState('playing');
        setScore(0);
        setTimeLeft(30);
        setProblem(generateProblem(diff));
        setUserAnswer('');
        setTimeout(() => inputRef.current?.focus(), 100);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const num = parseInt(userAnswer, 10);

        if (num === problem.answer) {
            // Correct
            setScore(prev => prev + 1);
            setTimeLeft(prev => Math.min(30, prev + 2)); // Bonus time
            setProblem(generateProblem(difficulty));
            setUserAnswer('');
        } else {
            // Wrong
            setTimeLeft(prev => Math.max(0, prev - 5)); // Penalty
            // Shake effect or visual feedback could be added here
            setUserAnswer('');
        }
    };

    useEffect(() => {
        let timer;
        if (gameState === 'playing') {
            timer = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        setGameState('gameover');
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        
    const toolFaqs = [
        {
            "q": "암산 챌린지에 시간 제한이 있나요?",
            "a": "네, 각 문제당 주어지는 시간이 타임 스크롤 형태로 감소하여, 스피디하게 암산하고 숫자를 입력해야 하는 긴장감 넘치는 게임입니다."
        },
        {
            "q": "중간에 멈추면 어떻게 되나요?",
            "a": "시간이 모두 소진되면 게임 오버되며 그때까지 맞춘 문제 수에 기반하여 점수가 기록됩니다."
        }
    ];
    const toolSteps = [
        "게임 시작 버튼을 누르면 즉시 덧셈, 뺄셈 등 산수 문제가 표시됩니다.",
        "눈으로 문제를 보자마자 암산하여 화면 아래 숫자 키패드나 키보드로 정답을 입력합니다.",
        "시간 내에 맞추어 보너스 점수를 획득하고 랭킹(최고 점수) 갱신에 도전합니다."
    ];
    const toolTips = [
        "키보드의 텐키(우측 숫자 패드)를 활용하면 훨씬 더 빠르게 정답을 입력할 수 있습니다.",
        "매일 아침 잠을 깨기 위해, 뇌를 워밍업하고 싶을 때 플레이하면 두뇌 회전 보조제로 제격입니다."
    ];

    return () => clearInterval(timer);
    }, [gameState]);

    const getRank = (finalScore) => {
        if (finalScore >= 30) return { name: "🧮 인간 계산기", desc: "컴퓨터보다 빠른 두뇌 회전 속도!", color: "text-purple-600" };
        if (finalScore >= 20) return { name: "🎓 수학 영재", desc: "암산 실력이 대단하시네요!", color: "text-blue-600" };
        if (finalScore >= 10) return { name: "✏️ 모범생", desc: "나쁘지 않은 실력입니다. 조금 더 분발해볼까요?", color: "text-green-600" };
        return { name: "🥚 수포자", desc: "음... 계산기는 필수품이시군요?", color: "text-gray-500" };
    };

    const shareResult = () => {
        const rank = getRank(score);
        if (navigator.share) {
            navigator.share({
                title: '암산 챌린지',
                text: `나의 암산 점수는: ${score}점! - ${rank.name}`,
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
                title="암산 챌린지 | 두뇌 회전 스피드 게임"
                description="잠든 뇌를 깨우는 스피드 암산 게임! 제한 시간 내에 최대한 많은 산수 문제를 풀어보세요. 당신의 순발력과 암산 실력을 테스트해보세요."
                keywords="암산게임, 수학게임, 두뇌게임, 산수, 더하기빼기, 스피드게임"
                category="게임"
                faqs={toolFaqs}
                steps={toolSteps}
            />

            <div className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4 animate-fade-in">
                    🚀 스피드 암산 챌린지
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                    당신의 뇌지컬을 보여주세요!
                </p>
            </div>

            <div className="max-w-lg mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden p-6 transition-all duration-300 min-h-[400px] flex flex-col items-center justify-center">

                {gameState === 'start' && (
                    <div className="text-center animate-fade-in space-y-8 w-full">
                        <div className="relative inline-block">
                            <Calculator className="w-32 h-32 text-indigo-500 mx-auto" />
                            <div className="absolute top-0 right-0 animate-bounce">
                                <Zap className="w-10 h-10 text-yellow-400" fill="currentColor" />
                            </div>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">난이도 선택</h2>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
                                정답을 맞히면 시간이 추가되고, 틀리면 감소합니다.
                            </p>
                        </div>

                        <div className="flex flex-col gap-4 w-full px-8">
                            <button
                                onClick={() => startGame('easy')}
                                className="w-full py-4 bg-green-500 hover:bg-green-600 text-white text-xl font-bold rounded-2xl shadow-lg transition-all transform hover:-translate-y-1"
                            >
                                쉬움 (초급)
                            </button>
                            <button
                                onClick={() => startGame('hard')}
                                className="w-full py-4 bg-red-500 hover:bg-red-600 text-white text-xl font-bold rounded-2xl shadow-lg transition-all transform hover:-translate-y-1"
                            >
                                어려움 (고급)
                            </button>
                        </div>
                    </div>
                )}

                {gameState === 'playing' && (
                    <div className="w-full h-full flex flex-col items-center animate-fade-in">
                        <div className="flex justify-between items-center mb-8 w-full px-4">
                            <div className="flex items-center space-x-2 text-xl font-bold text-indigo-600 dark:text-indigo-400">
                                <Trophy className="w-6 h-6" />
                                <span>Score: {score}</span>
                            </div>
                            <div className={`flex items-center space-x-2 font-bold text-xl ${timeLeft < 5 ? 'text-red-500 animate-pulse' : 'text-gray-600 dark:text-gray-300'}`}>
                                <Timer className="w-6 h-6" />
                                <span>{timeLeft}s</span>
                            </div>
                        </div>

                        <div className="mb-10 text-center">
                            <span className="text-6xl md:text-7xl font-black text-gray-800 dark:text-white font-mono tracking-wider">
                                {problem.expression}
                            </span>
                        </div>

                        <form onSubmit={handleSubmit} className="w-full px-8">
                            <input
                                ref={inputRef}
                                type="number"
                                value={userAnswer}
                                onChange={(e) => setUserAnswer(e.target.value)}
                                placeholder="?"
                                className="w-full text-center text-4xl font-bold bg-gray-100 dark:bg-gray-700 border-2 border-indigo-500 rounded-2xl py-4 focus:outline-none focus:ring-4 focus:ring-indigo-500/30 transition-all placeholder-gray-400"
                            />
                            <button
                                type="submit"
                                className="w-full mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-md transition-all active:scale-95"
                            >
                                제출 (Enter)
                            </button>
                        </form>
                    </div>
                )}

                {gameState === 'gameover' && (
                    <div className="text-center animate-scale-in w-full">
                        <Trophy className="w-24 h-24 text-yellow-400 mx-auto mb-4" />
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Time's Up!</h2>
                        <div className="text-5xl font-black text-indigo-600 dark:text-indigo-400 mb-6 font-mono">
                            {score}점
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-2xl mb-8">
                            <h3 className={`text-2xl font-bold mb-2 ${getRank(score).color}`}>
                                {getRank(score).name}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                {getRank(score).desc}
                            </p>
                        </div>

                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={() => setGameState('start')}
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
                                점수 공유
                            </button>
                        </div>
                    </div>
                )}
            </div>

            
        
            <div className="mt-12">
                <ToolGuide
                    title="암산 챌린지 안내"
                    intro="잠든 뇌를 깨우는 스피드 암산 게임! 제한 시간 내에 최대한 많은 산수 문제를 풀어보세요. 당신의 순발력과 암산 실력을 테스트해보세요."
                    steps={toolSteps}
                    tips={toolTips}
                    faqs={toolFaqs}
                />
            </div>
        </div>
    );
};

export default SpeedMath;
