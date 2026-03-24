import React, { useState, useEffect } from 'react';
import { Minus, Calculator, Trophy, RefreshCw, ChevronLeft, Delete, X, Check } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { useLanguage } from '../context/LanguageContext';

const SubtractionQuiz = () => {
    const { lang, t } = useLanguage();
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
                if (a < b) [a, b] = [b, a];
            } else if (lvl === 2) {
                a = Math.floor(Math.random() * 90) + 10;
                b = Math.floor(Math.random() * 9) + 1;
            } else {
                a = Math.floor(Math.random() * 90) + 10;
                b = Math.floor(Math.random() * 90) + 10;
                if (a < b) [a, b] = [b, a];
            }
            newQuestions.push({ a, b, answer: a - b });
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
            eq: `${currentQ.a} - ${currentQ.b}`,
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
        { q: "What's the best way to improve subtraction speed?", a: "Practice breaking down numbers. For example, 54 - 7 can be 54 - 4 - 3 = 47. Use our Level 2 for this training!" },
        { q: "Is this suitable for children?", a: "Yes, Level 1 is perfect for elementary students learning basic math facts." },
        { q: "Can I review my mistakes?", a: "Definitely. A review list with your answers and correct answers is provided at the result screen." }
    ] : [
        { q: "뺄셈 퀴즈의 난이도는 어떤가요?", a: "받아내림이 필요한 두 자리 수부터 두뇌 트레이닝용 복합 뺄셈까지 존재합니다." },
        { q: "음수(마이너스) 결과도 나오나요?", a: "주로 양수 결과가 나오는 문제들로 세팅되어 초보자나 어린이도 재미있고 쉽게 접근할 수 있습니다." }
    ];

    const toolSteps = isEn ? [
        "Pick a difficulty level and set a goal for how many questions to solve.",
        "Calculate the subtraction result mentally as each problem appears.",
        "Input the answer and keep your streak alive to reach high scores.",
        "Review your incorrect answers at the end to learn from your mistakes."
    ] : [
        "목표 난이도와 시간 제한을 자유롭게 설정합니다.",
        "화면에 제시되는 뺄셈을 머릿속으로 빠르게 계산하여 정답란에 숫자를 입력합니다.",
        "정확도와 속도별로 측정된 나의 뺄셈 두뇌 점수를 확인합니다.",
        "틀린 문제는 결과창에서 한 번 더 복습하여 연산 실수를 줄입니다."
    ];

    const toolTips = isEn ? [
        "Imagine you're a cashier at a store—this mindset often boosts subtraction speed dramatically!",
        "Start with Level 1 and move up once you can consistently get a perfect score within 30 seconds.",
        "Take a deep breath and focus on the numbers; mental math is a great way to start your day."
    ] : [
        "일상생활에서 현금 거스름돈을 계산하는 캐시어 알바생이 되었다는 마인드로 플레이하면 스피드가 비약적으로 상승합니다.",
        "어린이들의 수학적 감각과 흥미를 높이기 위한 홈스쿨링 교보재로 부모님이 옆에서 아이와 함께 진행해보세요.",
        "매일 아침 1분만 플레이해도 뇌에 활기를 불어넣는 훌륭한 스트레칭이 됩니다."
    ];

    return (
        <div className="max-w-md mx-auto px-4 py-8">
            <SEO
                title={t('tools.simple-math.title')}
                description={t('tools.simple-math.description')}
                keywords={isEn ? "subtraction quiz, math game, mental math, brain training, learn subtraction" : "뺄셈퀴즈, 암산게임, 초등수학, 두뇌트레이닝, 수학퀴즈"}
                faqs={toolFaqs}
                steps={toolSteps}
            />

            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center p-4 bg-rose-500 rounded-3xl text-white mb-6 shadow-2xl shadow-rose-500/20">
                    <Minus size={40} />
                </div>
                <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-2 uppercase tracking-tighter italic">
                    {isEn ? 'SUBTRACTION BATTLE' : '간단 뺄셈 퀴즈'}
                </h1>
                <p className="text-lg text-muted-foreground font-medium italic">
                    {isEn ? 'Subtract fast, think sharp' : '빠르고 정확한 거슬름돈 계산 실력'}
                </p>
            </div>

            <div className="bg-card dark:bg-slate-800 rounded-[2.5rem] shadow-2xl overflow-hidden min-h-[550px] flex flex-col border-4 border-border/50">
                {gameState === 'menu' && (
                    <div className="p-10 flex flex-col items-center justify-center flex-1 space-y-8 animate-in fade-in zoom-in-95 duration-500">
                        <div className="w-full space-y-3">
                            <label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-2">{isEn ? 'SELECT DIFFICULTY' : '난이도 선택'}</label>
                            <div className="grid grid-cols-1 gap-3">
                                {[
                                    { lvl: 1, label: isEn ? 'Level 1 (Single Digits)' : '1단계 (한자리 - 한자리)' },
                                    { lvl: 2, label: isEn ? 'Level 2 (Mixed Digits)' : '2단계 (두자리 - 한자리)' },
                                    { lvl: 3, label: isEn ? 'Level 3 (Double Digits)' : '3단계 (두자리 - 두자리)' }
                                ].map((item) => (
                                    <button
                                        key={item.lvl}
                                        onClick={() => setLevel(item.lvl)}
                                        className={`p-4 rounded-2xl border-4 text-left transition-all italic font-black text-lg ${level === item.lvl
                                                ? 'border-rose-500 bg-rose-500/10 text-rose-500 shadow-lg'
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
                                                ? 'border-rose-500 bg-rose-500/10 text-rose-500 shadow-lg'
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
                                                ? 'border-rose-500 bg-rose-500 text-white shadow-xl rotate-1'
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
                            className="w-full py-6 bg-gradient-to-r from-rose-500 to-pink-600 text-white text-2xl font-black rounded-3xl shadow-2xl shadow-rose-500/30 hover:scale-105 transform active:scale-95 transition-all mt-6 uppercase tracking-widest italic"
                        >
                            {isEn ? 'START SURVIVAL' : '시작하기'}
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
                            <div className="text-rose-500 font-black text-2xl italic tracking-tighter">
                                {score} {isEn ? 'PTS' : '점'}
                            </div>
                        </div>

                        {/* Problem Display */}
                        <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-12">
                            <div className="text-7xl font-black text-foreground tracking-tighter flex items-center gap-6 italic drop-shadow-sm">
                                <span>{questions[currentQuestionIndex].a}</span>
                                <Minus size={48} className="text-rose-500 stroke-[4]" />
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
                                            ? 'bg-rose-500 text-white hover:bg-rose-600 outline-none'
                                            : 'bg-card text-foreground hover:bg-rose-500/10 border-b-4 border-border/80'
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
                                className="w-full h-18 bg-rose-500 hover:bg-rose-600 text-white text-2xl font-black rounded-[1.5rem] shadow-2xl shadow-rose-500/20 transition-all disabled:opacity-30 disabled:grayscale flex items-center justify-center gap-3 uppercase tracking-widest italic"
                            >
                                {isEn ? 'CONFIRM' : '정답 확인'} <Check size={32} className="stroke-[4]" />
                            </button>
                        </div>
                    </div>
                )}

                {gameState === 'result' && (
                    <div className="p-10 text-center flex flex-col h-full animate-in zoom-in-95 duration-500 space-y-8">
                        <div className="flex-1 flex flex-col items-center justify-center space-y-6">
                            <div className="relative">
                                <Trophy size={100} className="text-yellow-500 drop-shadow-[0_0_20px_rgba(234,179,8,0.4)] animate-bounce" />
                                <div className="absolute -top-4 -right-4 bg-rose-500 text-white text-xs font-black p-2 rounded-full -rotate-12">SHARP</div>
                            </div>
                            
                            <div className="space-y-1">
                                <h2 className="text-4xl font-black text-foreground italic uppercase tracking-tighter">{isEn ? 'FINAL SCORE' : '결과 발표'}</h2>
                                <p className="text-muted-foreground font-bold italic">{isEn ? 'Brilliant Computation!' : '수고하셨습니다!'}</p>
                            </div>

                            <div className="text-8xl font-black text-rose-500 italic tracking-tighter drop-shadow-lg p-8 bg-muted/30 rounded-[3rem] w-full border-4 border-border/50">
                                {score} <span className="text-3xl text-muted font-bold tracking-normal italic">/ {questions.length}</span>
                            </div>

                            <button
                                onClick={() => setGameState('menu')}
                                className="w-full py-6 bg-slate-900 text-white rounded-3xl font-black text-xl flex items-center justify-center gap-3 hover:scale-105 transition-all shadow-2xl active:scale-95 uppercase tracking-widest italic"
                            >
                                <RefreshCw size={24} />
                                {isEn ? 'RE-CHALLENGE' : '다시 하기'}
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

            <div className="mt-24">
                <ToolGuide
                    title={isEn ? "The Subtraction Master Guide" : "간단 뺄셈 퀴즈 가이드"}
                    intro={isEn ? "Sharpen your mental edge with subtraction. Whether you're a student building basics or an adult keeping your mind quick for daily transactions, this tool offers the perfect practice environment with survival modes." : "뺄셈은 일상생활에서 가장 많이 쓰이는 연산 중 하나입니다. 본 퀴즈는 난이도별 뺄셈 훈련을 통해 거스름돈 계산과 같은 실생활 응용력을 키워주고, 시간 제한 모드를 통해 고도의 집중력을 발휘하는 두뇌 트레이닝 경험을 선사합니다."}
                    steps={toolSteps}
                    tips={toolTips}
                    faqs={toolFaqs}
                />
            </div>
        </div>
    );
};

export default SubtractionQuiz;
