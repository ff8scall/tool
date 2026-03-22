import React, { useState, useEffect, useRef } from 'react';
import { Lightbulb, Trophy, RefreshCw, Check, X, ArrowRight, Share2, Tag } from 'lucide-react';
import { associationQuizData } from '../data/associationQuizData';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { useLanguage } from '../context/LanguageContext';

const AssociationQuiz = () => {
    const { lang } = useLanguage();
    const isEn = lang === 'en';
    const [gameState, setGameState] = useState('menu'); // menu, playing, result
    const [questionCount, setQuestionCount] = useState(10);
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]); // { question, userAnswer, isCorrect }
    const [feedback, setFeedback] = useState(null); // { type: 'correct' | 'wrong', message: string }

    const inputRef = useRef(null);

    const startGame = () => {
        const shuffled = [...associationQuizData].sort(() => 0.5 - Math.random());
        const selectedQuestions = shuffled.slice(0, Math.min(questionCount, shuffled.length));

        setQuestions(selectedQuestions);
        setCurrentQuestionIndex(0);
        setScore(0);
        setUserAnswers([]);
        setGameState('playing');
        resetQuestionState();
    };

    const resetQuestionState = () => {
        setUserAnswer('');
        setFeedback(null);
        setTimeout(() => {
            if (inputRef.current) inputRef.current.focus();
        }, 100);
    };

    const handleAnswerSubmit = (e) => {
        e.preventDefault();
        if (feedback) return;

        const currentQuestion = questions[currentQuestionIndex];
        const cleanUserAnswer = userAnswer.trim().replace(/\s+/g, '').toLowerCase();
        const cleanCorrectAnswer = currentQuestion.answer.replace(/\s+/g, '').toLowerCase();

        const isCorrect = cleanUserAnswer === cleanCorrectAnswer || (currentQuestion.answer === '크리스마스' && cleanUserAnswer === '산타');

        if (isCorrect) {
            setScore(prev => prev + 10);
            setFeedback({ type: 'correct', message: isEn ? 'Correct! (+10 pts)' : '정답입니다! (+10점)' });
            setUserAnswers(prev => [...prev, {
                question: currentQuestion,
                userAnswer: userAnswer,
                isCorrect: true
            }]);
        } else {
            setFeedback({ type: 'wrong', message: isEn ? `Wrong! Answer was '${currentQuestion.answer}'.` : `오답입니다. 정답은 '${currentQuestion.answer}' 입니다.` });
            setUserAnswers(prev => [...prev, {
                question: currentQuestion,
                userAnswer: userAnswer,
                isCorrect: false
            }]);
        }

        setTimeout(() => {
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(prev => prev + 1);
                resetQuestionState();
            } else {
                setGameState('result');
            }
        }, 1500);
    };

    const handleShare = async () => {
        const text = isEn ? `Word Association Quiz result! My score is ${score} pts.` : `연상 퀴즈 도전 결과! 제 점수는 ${score}점입니다.`;
        if (navigator.share) {
            try {
                await navigator.share({
                    title: isEn ? 'Word Association Quiz' : '연상 퀴즈',
                    text: text,
                    url: window.location.href,
                });
            } catch (error) {
                console.log('Error sharing:', error);
            }
        } else {
            alert(isEn ? 'Your browser does not support sharing.' : '공유 기능을 지원하지 않는 브라우저입니다.');
        }
    };

    const toolFaqs = isEn ? [
        { q: "What is the Association Quiz?", a: "It's a game where you find the common word that links three different keywords together." },
        { q: "How many keywords are provided?", a: "Three keywords are shown for each question to help you narrow down the answer." },
        { q: "Can I answer in English?", a: "Since the keywords are based on Korean culture and concepts, the answers must be entered in Korean." }
    ] : [
        { q: "연상 퀴즈란 무엇인가요?", a: "세 가지 연관된 단어를 힌트로 보고, 공통으로 떠오르는 정답을 맞추는 게임입니다." },
        { q: "힌트를 더 볼 수 있나요?", a: "기본적으로 3개의 단어 힌트가 모두 제공되어 정답을 유추하는 데 도움을 줍니다." }
    ];

    const toolSteps = isEn ? [
        "Carefully examine the three keyword hints provided.",
        "Think of a single word that is commonly associated with all three hints.",
        "Type your answer in the box and press Enter or the arrow button.",
        "Earn 10 points for each correct word and check your final results."
    ] : [
        "주어진 단어 힌트들을 유심히 살펴봅니다.",
        "공통으로 연상되는 단어를 유추하여 입력란에 적습니다.",
        "정답 확인 후 다음 문제로 넘어갑니다.",
        "모든 문제를 푼 후 오답 노트를 통해 연상 능력을 점검합니다."
    ];

    const toolTips = isEn ? [
        "Trust your intuition; the first word that comes to mind is often correct.",
        "Consider various categories like objects, events, movies, or animals.",
        "It's fun to play with friends and see who has the fastest verbal association skills!"
    ] : [
        "직관적으로 떠오르는 단어가 정답일 확률이 높습니다.",
        "사물, 인물, 장소 등 다양한 카테고리를 넘나들며 생각해보세요.",
        "친구들과 함께 풀면 서로 다른 연상 과정을 비교해보는 재미가 있습니다."
    ];

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            <SEO
                title={isEn ? "Word Association Brain Quiz | Tool Hive" : "연상 퀴즈 (Association Quiz) | 상식 테스트 | Tool Hive"}
                description={isEn ? "Challenge your brain with our Word Association Quiz. Find the common link between 3 keywords and test your mental agility. Simple, fun, and educational." : "제시된 3개의 단어를 보고 떠오르는 하나의 정답을 맞추는 연상 퀴즈 게임입니다."}
                keywords={isEn ? "word association quiz, brain games, vocabulary trivia, mental agility" : "연상퀴즈, 단어퀴즈, 두뇌게임, 상식테스트"}
                faqs={toolFaqs}
                steps={toolSteps}
            />

            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl text-white mb-6 shadow-xl transform -rotate-2 hover:rotate-0 transition-transform">
                    <Lightbulb size={40} />
                </div>
                <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-3 tracking-tighter uppercase italic">
                    {isEn ? 'THE ASSOCIATION' : '연상 퀴즈'}
                </h1>
                <p className="text-muted-foreground font-medium">
                    {isEn ? 'Find the secret link between the three words!' : '세 단어의 공통점을 찾아보세요!'}
                </p>
            </div>

            <div className="bg-card dark:bg-slate-800 rounded-[2.5rem] shadow-2xl overflow-hidden border-2 border-border/50 transition-all">
                {gameState === 'menu' && (
                    <div className="p-10 space-y-10">
                        <div className="text-center bg-indigo-50 dark:bg-indigo-900/20 p-8 rounded-[2rem] border-2 border-indigo-100 dark:border-indigo-900/30">
                            <h3 className="font-black text-xl text-indigo-800 dark:text-indigo-300 mb-6 flex items-center justify-center gap-2">
                                <Tag size={20} />
                                {isEn ? 'EXAMPLE' : '게임 예시'}
                            </h3>
                            <div className="text-lg text-indigo-700/80 dark:text-indigo-400/80 space-y-4 font-black italic">
                                <p>[ {isEn ? 'Yellow' : '노란색'}, {isEn ? 'Fruit' : '과일'}, {isEn ? 'Monkey' : '원숭이'} ] → <span className="text-indigo-600 dark:text-indigo-300 uppercase">{isEn ? 'Banana' : '바나나'}</span></p>
                                <p>[ {isEn ? 'Winter' : '겨울'}, {isEn ? 'Snowman' : '눈사람'}, {isEn ? 'Gifts' : '선물'} ] → <span className="text-indigo-600 dark:text-indigo-300 uppercase">{isEn ? 'Christmas' : '크리스마스'}</span></p>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div>
                                <label className="block text-xs font-black uppercase tracking-widest text-muted-foreground mb-4 text-center">{isEn ? 'Number of Items' : '문제 수 선택'}</label>
                                <div className="grid grid-cols-3 gap-4">
                                    {[10, 20, 30].map((count) => (
                                        <button
                                            key={count}
                                            onClick={() => setQuestionCount(count)}
                                            className={`py-5 rounded-2xl border-4 transition-all font-black ${questionCount === count
                                                    ? 'border-indigo-500 bg-indigo-500 text-white shadow-xl shadow-indigo-500/20 scale-105'
                                                    : 'border-muted bg-muted/40 text-muted-foreground hover:border-indigo-300'
                                                }`}
                                        >
                                            {count} {isEn ? 'QUIZZES' : '문제'}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={startGame}
                                className="w-full py-6 text-2xl font-black text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 rounded-3xl shadow-2xl hover:shadow-indigo-500/30 transform active:scale-95 transition-all uppercase tracking-tighter italic"
                            >
                                {isEn ? 'CONNECT BRAIN' : '퀴즈 시작하기'}
                            </button>
                        </div>
                    </div>
                )}

                {gameState === 'playing' && questions.length > 0 && (
                    <div className="p-10 md:p-14 space-y-12">
                        <div className="flex justify-between items-center bg-muted/30 p-4 rounded-2xl border border-border/10 shadow-inner">
                            <span className="bg-white/50 dark:bg-slate-700 px-4 py-1.5 rounded-full text-xs font-black text-muted-foreground uppercase tracking-widest">
                                {isEn ? 'SET' : '문제'} {currentQuestionIndex + 1} / {questions.length}
                            </span>
                            <span className="text-indigo-500 font-black text-2xl italic tracking-tighter">
                                {score} {isEn ? 'PTS' : '점'}
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {questions[currentQuestionIndex].keywords.map((keyword, idx) => (
                                <div
                                    key={idx}
                                    className="bg-muted/10 dark:bg-slate-700/50 border-4 border-indigo-500/10 h-32 flex items-center justify-center rounded-[2rem] shadow-xl text-2xl font-black text-foreground italic uppercase animate-in slide-in-from-bottom-4 duration-500"
                                    style={{ animationDelay: `${idx * 150}ms` }}
                                >
                                    {keyword}
                                </div>
                            ))}
                        </div>

                        <div className="relative pt-6">
                            <form onSubmit={handleAnswerSubmit} className="relative">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={userAnswer}
                                    onChange={(e) => setUserAnswer(e.target.value)}
                                    placeholder={isEn ? "Link them together..." : "정답을 입력하세요"}
                                    disabled={!!feedback}
                                    className={`w-full p-6 text-center text-3xl font-black border-4 rounded-3xl outline-none transition-all shadow-xl font-mono uppercase tracking-[0.2em] ${feedback
                                            ? feedback.type === 'correct'
                                                ? 'border-green-500 bg-green-500/10 text-green-600'
                                                : 'border-rose-500 bg-rose-500/10 text-rose-600'
                                            : 'border-border/50 focus:border-indigo-500 bg-muted/20'
                                        }`}
                                />
                                <button
                                    type="submit"
                                    disabled={!!feedback || !userAnswer.trim()}
                                    className="absolute right-3 top-3 bottom-3 px-8 bg-slate-900 text-white rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-800 transition-all shadow-lg active:scale-95"
                                >
                                    <ArrowRight size={32} />
                                </button>
                            </form>

                            {feedback && (
                                <div className={`mt-6 p-6 rounded-2xl text-center font-black text-2xl animate-in fade-in zoom-in-95 duration-200 shadow-xl ${feedback.type === 'correct'
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-rose-100 text-rose-700'
                                    }`}>
                                    {feedback.type === 'correct' ? <Check className="inline-block mr-4 w-10 h-10" /> : <X className="inline-block mr-4 w-10 h-10" />}
                                    {feedback.message}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {gameState === 'result' && (
                    <div className="p-12 text-center space-y-12 animate-in zoom-in duration-500">
                        <div className="relative inline-block">
                            <Trophy size={110} className="text-yellow-500 drop-shadow-[0_0_30px_rgba(234,179,8,0.4)] animate-bounce" />
                            <div className="absolute -top-4 -right-4 bg-indigo-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-black text-xl shadow-lg ring-4 ring-white dark:ring-slate-800">
                                OK
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-5xl font-black text-foreground italic uppercase tracking-tighter">{isEn ? 'BRAIN SYNCED!' : '퀴즈 완료!'}</h2>
                            <p className="text-muted-foreground font-black uppercase tracking-widest text-xs">{isEn ? 'Your Intelligence Quotient' : '당신의 최종 점수는?'}</p>
                        </div>

                        <div className="text-9xl font-black text-indigo-500 drop-shadow-lg flex items-baseline justify-center gap-4 italic tracking-tighter">
                            {score} <span className="text-4xl text-muted font-bold tracking-tight">/ {questions.length * 10}</span>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <button
                                onClick={() => setGameState('menu')}
                                className="flex-1 flex items-center justify-center px-12 py-6 bg-slate-900 text-white rounded-[2rem] font-black text-xl hover:scale-105 transition-all shadow-2xl active:scale-95"
                            >
                                <RefreshCw size={28} className="mr-4" />
                                {isEn ? 'RECONNECT' : '다시 하기'}
                            </button>
                            <button
                                onClick={handleShare}
                                className="flex-1 flex items-center justify-center px-12 py-6 bg-indigo-600 text-white rounded-[2rem] font-black text-xl hover:scale-105 transition-all shadow-2xl shadow-indigo-500/20 active:scale-95"
                            >
                                <Share2 size={28} className="mr-4" />
                                {isEn ? 'BROADCAST' : '공유하기'}
                            </button>
                        </div>

                        <div className="bg-muted/30 rounded-[3rem] p-10 text-left space-y-8 shadow-inner border border-border/50">
                            <h3 className="font-black text-muted-foreground uppercase tracking-widest text-xs px-2 flex items-center gap-3 italic">
                                <Lightbulb size={18} />
                                {isEn ? 'Cognitive Recap' : '오답 노트'}
                            </h3>
                            <div className="space-y-6 max-h-[500px] overflow-y-auto pr-4 scrollbar-thin">
                                {userAnswers.map((item, idx) => (
                                    <div key={idx} className="bg-card p-8 rounded-[2rem] shadow-sm border-2 border-border/50 hover:border-indigo-200 transition-all group">
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {item.question.keywords.map((k, i) => (
                                                <span key={i} className="px-4 py-1.5 bg-muted rounded-full text-xs font-black text-muted-foreground uppercase tracking-widest group-hover:bg-indigo-500/10 group-hover:text-indigo-600 transition-colors">
                                                    {k}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-6 border-t border-dashed border-border/50">
                                            <div className="text-sm font-black uppercase tracking-widest text-muted-foreground">
                                                {isEn ? 'You guessed' : '입력'}: <span className={item.isCorrect ? 'text-green-600 italic font-mono' : 'text-rose-500 italic font-mono line-through'}>{item.userAnswer || '...'}</span>
                                            </div>
                                            <div className="text-lg font-black uppercase tracking-tighter text-indigo-500 italic">
                                                {isEn ? 'Target' : '정답'}: <span className="font-mono text-2xl">{item.question.answer}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="mt-20">
                <ToolGuide
                    title={isEn ? "The Art of Word Association" : "연상 퀴즈 완벽 가이드"}
                    intro={isEn ? "Boost your mental agility with our Word Association Quiz. Analyze three seemingly unrelated hints to find the singular concept that binds them together. It's a fantastic exercise for lateral thinking and linguistic expansion." : "세 개의 단어를 보고 하나의 공통 분모를 찾아내는 이 퀴즈는 창의력과 논리적 직관력을 동시에 요구합니다. 평소 사용하지 않던 뇌의 연상 회로를 자극하여 인지 능력을 향상시키고 어휘 지도를 넓혀보세요."}
                    steps={toolSteps}
                    tips={toolTips}
                    faqs={toolFaqs}
                />
            </div>
        </div>
    );
};

export default AssociationQuiz;
