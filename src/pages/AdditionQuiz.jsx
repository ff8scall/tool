import React, { useState, useEffect } from 'react';
import { Plus, Calculator, Trophy, RefreshCw, ChevronLeft, Delete, X, Check } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { useLanguage } from '../context/LanguageContext';

const AdditionQuiz = () => {
    const { lang } = useLanguage();
    const isEn = lang === 'en';
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
            return () => clearInterval(timer);
        }
    }, [gameState, timeLimit]);

    const generateQuestions = (lvl, count) => {
        const newQuestions = [];
        for (let i = 0; i < count; i++) {
            let a, b;
            if (lvl === 1) {
                a = Math.floor(Math.random() * 9) + 1;
                b = Math.floor(Math.random() * 9) + 1;
            } else if (lvl === 2) {
                a = Math.floor(Math.random() * 90) + 10;
                b = Math.floor(Math.random() * 9) + 1;
                if (Math.random() > 0.5) [a, b] = [b, a];
            } else {
                a = Math.floor(Math.random() * 90) + 10;
                b = Math.floor(Math.random() * 90) + 10;
            }
            newQuestions.push({ a, b, answer: a + b });
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
            if (userAnswer.length < 5) {
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
            setFeedback({ type: 'correct', message: isEn ? 'Correct!' : '정답!' });
        } else {
            setFeedback({ type: 'wrong', message: isEn ? `Oops! Answer is ${currentQ.answer}` : `땡! 정답은 ${currentQ.answer}` });
        }

        setHistory(prev => [...prev, {
            eq: `${currentQ.a} + ${currentQ.b}`,
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

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    const toolFaqs = isEn ? [
        { q: "How do I play the Addition Quiz?", a: "Simply solve the addition problems displayed on the screen and enter the answer using the keypad. Try to be as fast as possible!" },
        { q: "Can I adjust the difficulty?", a: "Yes, you can choose from Level 1 (single digits) to Level 3 (double digits) to match your skill level." },
        { q: "Is there a time limit?", a: "You can play with no limit, or challenge yourself with 30s, 1m, or 3m time limits." }
    ] : [
        { q: "덧셈 퀴즈는 어떤 방식인가요?", a: "화면에 제시되는 두 숫자의 합을 제한 시간 내에 빠르게 입력하는 방식입니다." },
        { q: "난이도 조절이 가능한가요?", a: "네, 1단계부터 3단계까지 자리수와 난이도가 달라집니다." }
    ];

    const toolSteps = isEn ? [
        "Select your preferred difficulty level and time limit.",
        "Solve the addition problems shown in the center of the screen.",
        "Submit your answer and aim for a perfect score!",
        "Review your mistakes at the end to improve your mental math."
    ] : [
        "원하는 난이도와 시간 제한을 선택합니다.",
        "화면에 나오는 덧셈 문제를 암산으로 빠르게 풉니다.",
        "정답을 제출하고 연속 정답과 최종 점수를 확인합니다.",
        "틀린 문제는 결과창에서 복습할 수 있습니다."
    ];

    const toolTips = isEn ? [
        "Practice daily to increase your mental calculation speed.",
        "Using a time limit is great for brain training and focus.",
        "Try to visualize the numbers being grouped together for faster results."
    ] : [
        "암산 능력을 키우기 위해 매일 꾸준히 풀어보세요.",
        "제한 시간을 두고 풀면 두뇌 트레이닝에 효과적입니다.",
        "친구들과 누가 더 빨리 많이 맞추나 내기 게임으로 활용해보세요."
    ];

    return (
        <div className="max-w-md mx-auto px-4 py-8">
            <SEO
                title={isEn ? "Online Addition Quiz - Mental Math Trainer | Tool Hive" : "간단 덧셈 퀴즈 | 암산 능력 향상 테스트 | Tool Hive"}
                description={isEn ? "Level up your math skills with our Addition Quiz. Choose your difficulty and solve problems against the clock. Perfect for students and brain training." : "1단계부터 3단계까지 난이도 별로 즐기는 간단 덧셈 퀴즈입니다. 매일 꾸준한 연습으로 암산 능력을 키워보세요."}
                keywords={isEn ? "addition quiz, math game, mental math, online calculator, brain exercise" : "덧셈퀴즈, 암산게임, 초등수학, 두뇌트레이닝, 수학퀴즈"}
                faqs={toolFaqs}
                steps={toolSteps}
            />

            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center p-4 bg-primary rounded-3xl text-white mb-6 shadow-2xl shadow-primary/20">
                    <Plus size={40} />
                </div>
                <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-2 uppercase tracking-tighter italic">
                    {isEn ? 'ADDITION CHALLENGE' : '간단 덧셈 퀴즈'}
                </h1>
                <p className="text-lg text-muted-foreground font-medium italic">
                    {isEn ? 'Sharpen your mind with numbers' : '사칙연산의 기본, 덧셈을 정복하세요'}
                </p>
            </div>

            <div className="bg-card dark:bg-slate-800 rounded-[2.5rem] shadow-2xl overflow-hidden min-h-[550px] flex flex-col border-4 border-border/50 relative">
                {gameState === 'menu' && (
                    <div className="p-10 flex flex-col items-center justify-center flex-1 space-y-8 animate-in fade-in zoom-in-95 duration-500">
                        <div className="w-full space-y-3">
                            <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-2">{isEn ? 'SELECT DIFFICULTY' : '난이도 선택'}</label>
                            <div className="grid grid-cols-1 gap-3">
                                {[
                                    { lvl: 1, label: isEn ? 'Level 1 (Single Digits)' : '1단계 (한자리 + 한자리)' },
                                    { lvl: 2, label: isEn ? 'Level 2 (Mixed Digits)' : '2단계 (두자리 + 한자리)' },
                                    { lvl: 3, label: isEn ? 'Level 3 (Double Digits)' : '3단계 (두자리 + 두자리)' }
                                ].map((item) => (
                                    <button
                                        key={item.lvl}
                                        onClick={() => setLevel(item.lvl)}
                                        className={`p-4 rounded-2xl border-4 text-left transition-all italic font-black text-lg ${level === item.lvl
                                                ? 'border-primary bg-primary/10 text-primary shadow-lg'
                                                : 'border-muted/30 hover:border-muted/60 text-muted-foreground'
                                            }`}
                                    >
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="w-full space-y-3">
                            <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-2">{isEn ? 'TIME LIMIT' : '시간 제한'}</label>
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { value: 0, label: isEn ? 'INFINITY' : '없음' },
                                    { value: 30, label: isEn ? '30 SEC' : '30초' },
                                    { value: 60, label: isEn ? '1 MIN' : '1분' },
                                    { value: 180, label: isEn ? '3 MIN' : '3분' }
                                ].map((t) => (
                                    <button
                                        key={t.value}
                                        onClick={() => setTimeLimit(t.value)}
                                        className={`p-4 rounded-2xl border-4 font-black transition-all italic ${timeLimit === t.value
                                                ? 'border-primary bg-primary/10 text-primary shadow-lg'
                                                : 'border-muted/30 hover:border-muted/60 text-muted-foreground'
                                            }`}
                                    >
                                        {t.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="w-full space-y-3">
                            <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-2">{isEn ? 'QUESTION COUNT' : '문제 수'}</label>
                            <div className="flex gap-3">
                                {[10, 20, 30].map(cnt => (
                                    <button
                                        key={cnt}
                                        onClick={() => setQuestionCount(cnt)}
                                        className={`flex-1 p-4 rounded-2xl border-4 font-black transition-all italic ${questionCount === cnt
                                                ? 'border-primary bg-primary text-white shadow-xl rotate-1'
                                                : 'border-muted/30 hover:border-muted/60 text-muted-foreground'
                                            }`}
                                    >
                                        {cnt} {isEn ? 'Q' : '문제'}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            onClick={startGame}
                            className="w-full py-6 bg-gradient-to-r from-primary to-indigo-600 text-white text-2xl font-black rounded-3xl shadow-2xl shadow-primary/30 hover:scale-105 transform active:scale-95 transition-all mt-6 uppercase tracking-widest italic"
                        >
                            {isEn ? 'LETS MATH!' : '시작하기'}
                        </button>
                    </div>
                )}

                {gameState === 'playing' && questions.length > 0 && (
                    <div className="flex flex-col h-full animate-in fade-in duration-300">
                        {/* Header */}
                        <div className="p-6 bg-muted/30 flex justify-between items-center border-b border-border shadow-inner">
                            <div className="flex gap-6 items-center">
                                <span className="text-xs font-black uppercase tracking-widest text-muted-foreground bg-muted p-2 rounded-lg">
                                    {currentQuestionIndex + 1}/{questions.length}
                                </span>
                                {timeLimit > 0 && (
                                    <div className={`flex items-center gap-2 font-black font-mono text-xl ${timeLeft <= 10 ? 'text-rose-500 animate-pulse' : 'text-foreground'}`}>
                                        <div className="w-3 h-3 bg-red-500 rounded-full" />
                                        {formatTime(timeLeft)}
                                    </div>
                                )}
                            </div>
                            <div className="text-primary font-black text-2xl italic tracking-tighter">
                                {score} {isEn ? 'PTS' : '점'}
                            </div>
                        </div>

                        {/* Problem Display */}
                        <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-12">
                            <div className="text-7xl font-black text-foreground tracking-tighter flex items-center gap-6 italic drop-shadow-sm">
                                <span>{questions[currentQuestionIndex].a}</span>
                                <Plus size={48} className="text-primary stroke-[4]" />
                                <span>{questions[currentQuestionIndex].b}</span>
                            </div>

                            <div className={`w-full max-w-[280px] h-24 flex items-center justify-center text-5xl font-black bg-muted/50 rounded-[2rem] border-4 transition-all duration-300 italic ${feedback
                                    ? feedback.type === 'correct' ? 'border-green-500 text-green-600 bg-green-500/10 scale-110 shadow-xl shadow-green-500/20' : 'border-rose-500 text-rose-500 bg-rose-500/10'
                                    : 'border-border text-foreground shadow-inner'
                                }`}>
                                {userAnswer || "?"}
                            </div>

                            {feedback && (
                                <div className={`text-2xl font-black uppercase tracking-widest animate-in slide-in-from-top-4 duration-300 italic ${feedback.type === 'correct' ? 'text-green-500' : 'text-rose-500'
                                    }`}>
                                    {feedback.message}
                                </div>
                            )}
                        </div>

                        {/* Keypad */}
                        <div className="p-6 bg-muted/50 grid grid-cols-3 gap-3 border-t border-border shadow-inner">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 'C', 0].map((key) => (
                                <button
                                    key={key}
                                    onClick={() => handleKeypad(key)}
                                    className={`h-16 rounded-[1.25rem] text-3xl font-black shadow-lg transition-all active:scale-90 italic ${key === 'C'
                                            ? 'bg-rose-500 text-white hover:bg-rose-600'
                                            : 'bg-card text-foreground hover:bg-primary/10 border-b-4 border-border/80'
                                        }`}
                                >
                                    {key}
                                </button>
                            ))}
                            <button
                                onClick={() => handleKeypad('BS')}
                                className="h-16 rounded-[1.25rem] text-2xl font-black bg-orange-500 text-white hover:bg-orange-600 flex items-center justify-center shadow-lg active:scale-90 italic"
                            >
                                <Delete size={28} />
                            </button>
                        </div>

                        {/* Submit Button */}
                        <div className="p-6 bg-card border-t border-border">
                            <button
                                onClick={submitAnswer}
                                disabled={!userAnswer || feedback}
                                className="w-full h-18 bg-primary hover:bg-primary/90 text-white text-2xl font-black rounded-[1.5rem] shadow-2xl shadow-primary/20 transition-all disabled:opacity-30 disabled:grayscale flex items-center justify-center gap-3 uppercase tracking-widest italic"
                            >
                                {isEn ? 'SUBMIT' : '정답 확인'} <Check size={32} className="stroke-[4]" />
                            </button>
                        </div>
                    </div>
                )}

                {gameState === 'result' && (
                    <div className="p-10 text-center flex flex-col h-full animate-in zoom-in-95 duration-500 space-y-8">
                        <div className="flex-1 flex flex-col items-center justify-center space-y-6">
                            <div className="relative">
                                <Trophy size={100} className="text-yellow-500 drop-shadow-[0_0_20px_rgba(234,179,8,0.4)] animate-bounce" />
                                <div className="absolute -top-4 -right-4 bg-primary text-white text-xs font-black p-2 rounded-full rotate-12">BEST</div>
                            </div>
                            
                            <div className="space-y-1">
                                <h2 className="text-4xl font-black text-foreground italic uppercase tracking-tighter">{isEn ? 'RESULT' : '결과 발표'}</h2>
                                <p className="text-muted-foreground font-bold italic">{isEn ? 'Mission Accomplished!' : '수고하셨습니다!'}</p>
                            </div>

                            <div className="text-8xl font-black text-primary italic tracking-tighter drop-shadow-lg p-8 bg-muted/30 rounded-[3rem] w-full border-4 border-border/50">
                                {score} <span className="text-3xl text-muted font-bold tracking-normal italic">/ {questions.length}</span>
                            </div>

                            <button
                                onClick={() => setGameState('menu')}
                                className="w-full py-6 bg-slate-900 text-white rounded-3xl font-black text-xl flex items-center justify-center gap-3 hover:scale-105 transition-all shadow-2xl active:scale-95 uppercase tracking-widest italic"
                            >
                                <RefreshCw size={24} />
                                {isEn ? 'PLAY AGAIN' : '다시 하기'}
                            </button>
                        </div>

                        {/* Review List */}
                        <div className="mt-4 text-left bg-muted/50 rounded-[2rem] p-6 border-2 border-border/50 max-h-56 overflow-y-auto space-y-3 shadow-inner custom-scrollbar">
                            {history.map((item, idx) => (
                                <div key={idx} className="flex justify-between items-center py-3 border-b border-border/50 last:border-0">
                                    <span className="font-black text-foreground italic text-lg">{item.eq}</span>
                                    <div className="flex items-center gap-3">
                                        <span className={`text-xl font-black italic ${item.isCorrect ? 'text-green-500' : 'text-rose-500 line-through'}`}>
                                            {item.userAnswer}
                                        </span>
                                        {!item.isCorrect && (
                                            <span className="text-lg font-black text-green-500 italic bg-green-500/10 px-2 py-1 rounded-lg">
                                                {item.correctAnswer}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="mt-20">
                <ToolGuide
                    title={isEn ? "The Addition Master Guide" : "간단 덧셈 퀴즈 가이드"}
                    intro={isEn ? "Master the foundation of mathematics. This tool is designed to help students and adults alike improve their mental math speed and accuracy through progressive difficulty levels and time pressure." : "덧셈은 모든 수학의 기초입니다. 본 퀴즈는 난이도별 맞춤 학습을 통해 어린이들의 연산 감각을 깨워주고, 성인들에게는 뇌 회전을 돕는 훌륭한 두뇌 트레이닝 도구가 됩니다."}
                    steps={toolSteps}
                    tips={toolTips}
                    faqs={toolFaqs}
                />
            </div>
        </div>
    );
};

export default AdditionQuiz;
