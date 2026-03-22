import React, { useState, useEffect } from 'react';

import { X as XIcon, Calculator, Trophy, RefreshCw, ChevronLeft, Delete, Check } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';

const MultiplicationQuiz = () => {
    const [gameState, setGameState] = useState('menu'); // menu, playing, result
    const [level, setLevel] = useState(1);
    const [questionCount, setQuestionCount] = useState(10);
    const [timeLimit, setTimeLimit] = useState(0); // 0 = unlimited, 30, 60, 180
    const [timeLeft, setTimeLeft] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState(null);
    const [history, setHistory] = useState([]);

    // Timer effect
    useEffect(() => {
        if (gameState === 'playing' && timeLimit > 0) {
            const timer = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        setGameState('result');
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            
    const toolFaqs = [
        {
            "q": "구구단 퀴즈인가요?",
            "a": "간단한 두 자리수 이상의 곱셈까지 포함되어 있어 구구단 이상의 암산 능력을 요구하는 퀴즈입니다."
        },
        {
            "q": "틀리면 어떻게 되나요?",
            "a": "오답 페널티나 점수 감점이 있으며, 정답을 입력할 때까지 다시 도전할 수 있습니다."
        }
    ];
    const toolSteps = [
        "자신의 암산 실력에 맞는 난이도(1단계~3단계)를 선택합니다.",
        "화면에 나타나는 곱셈 문제의 답을 머릿속으로 계산합니다.",
        "정답을 입력하고 다음 문제로 넘어가며 콤보 점수를 쌓습니다."
    ];
    const toolTips = [
        "계산기를 쓰지 않고 오로지 암산으로 도전해야 제대로 된 두뇌 트레이닝 효과를 얻을 수 있습니다.",
        "매일 시간을 정해놓고 10문제씩 푸는 습관을 들이면 수학적 감각이 눈에 띄게 좋아집니다."
    ];

    return () => clearInterval(timer);
        }
    }, [gameState, timeLimit]);

    const generateQuestions = (lvl, count) => {
        const newQuestions = [];
        for (let i = 0; i < count; i++) {
            let a, b;
            if (lvl === 1) {
                // 1 digit x 1 digit
                a = Math.floor(Math.random() * 9) + 1; // 1-9
                b = Math.floor(Math.random() * 9) + 1; // 1-9
            } else if (lvl === 2) {
                // 2 digits x 1 digit
                a = Math.floor(Math.random() * 90) + 10; // 10-99
                b = Math.floor(Math.random() * 9) + 1; // 1-9
                if (Math.random() > 0.5) [a, b] = [b, a];
            } else {
                // 2 digits x 2 digits
                a = Math.floor(Math.random() * 90) + 10;
                b = Math.floor(Math.random() * 90) + 10;
            }
            newQuestions.push({ a, b, answer: a * b });
        }
        return newQuestions;
    };

    const startGame = () => {
        const q = generateQuestions(level, questionCount);
        setQuestions(q);
        setCurrentQuestionIndex(0);
        setScore(0);
        setHistory([]);
        setTimeLeft(timeLimit);
        setGameState('playing');
        resetQuestionState();
    };

    const resetQuestionState = () => {
        setUserAnswer('');
        setFeedback(null);
    };

    const handleKeypad = (val) => {
        if (feedback) return;
        if (val === 'C') {
            setUserAnswer('');
        } else if (val === 'BS') {
            setUserAnswer(prev => prev.slice(0, -1));
        } else {
            if (userAnswer.length < 6) { // Allow up to 6 digits (99*99 = 9801, slightly more for safety)
                setUserAnswer(prev => prev + val);
            }
        }
    };

    const submitAnswer = () => {
        if (!userAnswer || feedback) return;

        const currentQ = questions[currentQuestionIndex];
        const isCorrect = parseInt(userAnswer) === currentQ.answer;

        if (isCorrect) {
            setScore(prev => prev + 1);
            setFeedback({ type: 'correct', message: '정답!' });
        } else {
            setFeedback({ type: 'wrong', message: `땡! 정답은 ${currentQ.answer}` });
        }

        setHistory(prev => [...prev, {
            eq: `${currentQ.a} × ${currentQ.b}`,
            userAnswer: userAnswer,
            correctAnswer: currentQ.answer,
            isCorrect
        }]);

        setTimeout(() => {
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(prev => prev + 1);
                resetQuestionState();
            } else {
                setGameState('result');
            }
        }, 1000);
    };

    // Format seconds to MM:SS
    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <div className="max-w-md mx-auto px-4 py-8">
            <SEO
                title="간단 곱셈 퀴즈 | 간단 상식 테스트"
                description="1단계부터 3단계까지 난이도 별로 즐기는 간단 곱셈 퀴즈입니다."
                keywords=""
                category="간단 상식 테스트"
                faqs={toolFaqs}
                steps={toolSteps}
            />

            <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center p-3 bg-green-500 rounded-2xl text-white mb-4 shadow-lg">
                    <XIcon size={32} />
                </div>
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">간단 곱셈 퀴즈</h1>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden min-h-[500px] flex flex-col">
                {gameState === 'menu' && (
                    <div className="p-8 flex flex-col items-center justify-center flex-1 space-y-6">

                        <div className="w-full">
                            <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">난이도 선택</label>
                            <div className="grid grid-cols-1 gap-2">
                                {[
                                    { lvl: 1, label: '1단계 (한자리 × 한자리)' },
                                    { lvl: 2, label: '2단계 (두자리 × 한자리)' },
                                    { lvl: 3, label: '3단계 (두자리 × 두자리)' }
                                ].map((item) => (
                                    <button
                                        key={item.lvl}
                                        onClick={() => setLevel(item.lvl)}
                                        className={`p-3 rounded-xl border-2 text-left transition-all ${level === item.lvl
                                                ? 'border-green-500 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 font-bold'
                                                : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400'
                                            }`}
                                    >
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="w-full">
                            <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">시간 제한</label>
                            <div className="grid grid-cols-2 gap-2">
                                {[
                                    { value: 0, label: '없음' },
                                    { value: 30, label: '30초' },
                                    { value: 60, label: '1분' },
                                    { value: 180, label: '3분' }
                                ].map((t) => (
                                    <button
                                        key={t.value}
                                        onClick={() => setTimeLimit(t.value)}
                                        className={`p-3 rounded-lg border-2 font-bold ${timeLimit === t.value
                                                ? 'border-green-500 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                                                : 'border-gray-200 dark:border-gray-700 text-gray-500 hover:border-green-300'
                                            }`}
                                    >
                                        {t.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="w-full">
                            <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">문제 수</label>
                            <div className="flex gap-2">
                                {[10, 20, 30].map(cnt => (
                                    <button
                                        key={cnt}
                                        onClick={() => setQuestionCount(cnt)}
                                        className={`flex-1 p-3 rounded-lg border-2 font-bold ${questionCount === cnt
                                                ? 'border-green-500 bg-green-500 text-white'
                                                : 'border-gray-300 dark:border-gray-600 text-gray-500 hover:border-green-400'
                                            }`}
                                    >
                                        {cnt}문제
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={startGame}
                            className="w-full py-4 bg-gradient-to-r from-green-500 to-teal-600 text-white text-xl font-bold rounded-xl shadow-lg hover:shadow-xl transform active:scale-95 transition-all mt-4"
                        >
                            시작하기
                        </button>
                    </div>
                )}

                {gameState === 'playing' && questions.length > 0 && (
                    <div className="flex flex-col h-full">
                        {/* Header */}
                        <div className="p-4 bg-gray-50 dark:bg-gray-700/50 flex justify-between items-center border-b border-gray-100 dark:border-gray-700">
                            <div className="flex gap-4">
                                <span className="text-gray-500 dark:text-gray-400 font-medium">
                                    {currentQuestionIndex + 1}/{questions.length}
                                </span>
                                {timeLimit > 0 && (
                                    <span className={`font-bold font-mono text-lg ${timeLeft <= 10 ? 'text-red-500 animate-pulse' : 'text-gray-700 dark:text-gray-300'}`}>
                                        {formatTime(timeLeft)}
                                    </span>
                                )}
                            </div>
                            <div className="text-green-600 dark:text-green-400 font-bold text-lg">
                                {score}점
                            </div>
                        </div>

                        {/* Problem Display */}
                        <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-8">
                            <div className="text-6xl font-black text-gray-800 dark:text-white tracking-widest flex items-center gap-4">
                                <span>{questions[currentQuestionIndex].a}</span>
                                <span className="text-green-500">×</span>
                                <span>{questions[currentQuestionIndex].b}</span>
                            </div>

                            <div className={`w-48 h-20 flex items-center justify-center text-4xl font-bold bg-gray-100 dark:bg-gray-700 rounded-2xl border-2 ${feedback
                                    ? feedback.type === 'correct' ? 'border-green-500 text-green-600 bg-green-50' : 'border-red-500 text-red-500 bg-red-50'
                                    : 'border-green-200 dark:border-gray-600 text-gray-800 dark:text-white'
                                }`}>
                                {userAnswer || "?"}
                            </div>

                            {feedback && (
                                <div className={`text-xl font-bold animate-bounce ${feedback.type === 'correct' ? 'text-green-500' : 'text-red-500'
                                    }`}>
                                    {feedback.message}
                                </div>
                            )}
                        </div>

                        {/* Keypad */}
                        <div className="p-4 bg-gray-50 dark:bg-gray-900 grid grid-cols-3 gap-2">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 'C', 0].map((key) => (
                                <button
                                    key={key}
                                    onClick={() => handleKeypad(key)}
                                    className={`h-16 rounded-xl text-2xl font-bold shadow-sm transition-transform active:scale-95 ${key === 'C'
                                            ? 'bg-red-100 text-red-600 hover:bg-red-200'
                                            : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700'
                                        }`}
                                >
                                    {key}
                                </button>
                            ))}
                            <button
                                onClick={() => handleKeypad('BS')}
                                className="h-16 rounded-xl text-xl font-bold bg-orange-100 text-orange-600 hover:bg-orange-200 flex items-center justify-center shadow-sm active:scale-95"
                            >
                                <Delete size={24} />
                            </button>
                        </div>

                        {/* Submit Button */}
                        <div className="p-4 bg-white dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700">
                            <button
                                onClick={submitAnswer}
                                disabled={!userAnswer}
                                className="w-full h-14 bg-green-600 hover:bg-green-700 text-white text-xl font-bold rounded-xl shadow-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                정답 확인 <Check size={24} />
                            </button>
                        </div>
                    </div>
                )}

                {gameState === 'result' && (
                    <div className="p-8 text-center flex flex-col h-full">
                        <div className="flex-1 flex flex-col items-center justify-center">
                            <Trophy size={64} className="text-yellow-400 mb-6 animate-bounce" />
                            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">결과 발표</h2>
                            <p className="text-gray-500 mb-6">수고하셨습니다!</p>

                            <div className="text-6xl font-black text-green-600 mb-8">
                                {score} <span className="text-3xl text-gray-400">/ {questions.length}</span>
                            </div>

                            <div className="flex gap-4 w-full justify-center">
                                <button
                                    onClick={() => setGameState('menu')}
                                    className="px-8 py-4 bg-gray-800 text-white rounded-xl font-bold flex items-center gap-2 hover:bg-gray-700 transition-colors"
                                >
                                    <RefreshCw size={20} />
                                    다시 하기
                                </button>
                            </div>
                        </div>

                        {/* Review List */}
                        <div className="mt-8 text-left bg-gray-50 dark:bg-gray-700/30 rounded-xl p-4 max-h-48 overflow-y-auto">
                            {history.map((item, idx) => (
                                <div key={idx} className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
                                    <span className="font-bold text-gray-700 dark:text-gray-300 w-24">{item.eq}</span>
                                    <div className="flex gap-2">
                                        <span className={`${item.isCorrect ? 'text-green-500' : 'text-red-500 line-through'}`}>
                                            {item.userAnswer}
                                        </span>
                                        {!item.isCorrect && (
                                            <span className="text-green-500 font-bold">({item.correctAnswer})</span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        
            <div className="mt-12">
                <ToolGuide
                    title="간단 곱셈 퀴즈 안내"
                    intro="1단계부터 3단계까지 난이도 별로 즐기는 간단 곱셈 퀴즈입니다."
                    steps={toolSteps}
                    tips={toolTips}
                    faqs={toolFaqs}
                />
            </div>
        </div>
    );
};

export default MultiplicationQuiz;
