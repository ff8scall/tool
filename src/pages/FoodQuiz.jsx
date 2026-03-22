import React, { useState, useEffect, useRef } from 'react';
import { Utensils, Trophy, RefreshCw, Check, X, ArrowRight, Share2, HelpCircle } from 'lucide-react';
import { foodQuizData } from '../data/foodQuizData';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { useLanguage } from '../context/LanguageContext';

const FoodQuiz = () => {
    const { lang } = useLanguage();
    const isEn = lang === 'en';
    const [gameState, setGameState] = useState('menu'); // menu, playing, result
    const [questionCount, setQuestionCount] = useState(10);
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [possiblePoints, setPossiblePoints] = useState(3); // 3, 2, 1
    const [visibleHints, setVisibleHints] = useState(1); // 1, 2, 3
    const [userAnswers, setUserAnswers] = useState([]); // { question, userAnswer, isCorrect, pointsEarned }
    const [feedback, setFeedback] = useState(null); // { type: 'correct' | 'wrong', message: string }

    const inputRef = useRef(null);

    const startGame = () => {
        const shuffled = [...foodQuizData].sort(() => 0.5 - Math.random());
        const selectedQuestions = shuffled.slice(0, Math.min(questionCount, shuffled.length));

        setQuestions(selectedQuestions);
        setCurrentQuestionIndex(0);
        setScore(0);
        setUserAnswers([]);
        setGameState('playing');
        resetQuestionState();
    };

    const resetQuestionState = () => {
        setPossiblePoints(3);
        setVisibleHints(1);
        setUserAnswer('');
        setFeedback(null);
        setTimeout(() => {
            if (inputRef.current) inputRef.current.focus();
        }, 100);
    };

    const showNextHint = () => {
        if (visibleHints < 3) {
            setVisibleHints(prev => prev + 1);
            setPossiblePoints(prev => prev - 1);
        }
    };

    const handleAnswerSubmit = (e) => {
        e.preventDefault();
        if (feedback?.type === 'correct') return;

        const currentQuestion = questions[currentQuestionIndex];
        const cleanUserAnswer = userAnswer.trim().replace(/\s+/g, '').toLowerCase();
        const cleanCorrectAnswer = currentQuestion.word.replace(/\s+/g, '').toLowerCase();

        if (cleanUserAnswer === cleanCorrectAnswer) {
            const points = possiblePoints;
            setScore(prev => prev + points);
            setFeedback({ type: 'correct', message: isEn ? `Correct! (+${points} pts)` : `정답입니다! (+${points}점)` });

            setUserAnswers(prev => [...prev, {
                question: currentQuestion,
                userAnswer: userAnswer,
                isCorrect: true,
                pointsEarned: points
            }]);

            setTimeout(() => {
                if (currentQuestionIndex < questions.length - 1) {
                    setCurrentQuestionIndex(prev => prev + 1);
                    resetQuestionState();
                } else {
                    setGameState('result');
                }
            }, 1500);
        } else {
            setFeedback({ type: 'wrong', message: isEn ? 'Wrong! Try again.' : '오답입니다. 다시 시도해보세요!' });
            setTimeout(() => {
                setFeedback(null);
                if (inputRef.current) inputRef.current.focus();
            }, 1500);
        }
    };

    const handleShare = async () => {
        const text = isEn ? `Food Quiz Challenge! My score is ${score}. (Max ${questions.length * 3})` : `음식 이름 퀴즈 도전 결과! 제 점수는 ${score}점입니다. (최대 ${questions.length * 3}점)`;
        if (navigator.share) {
            try {
                await navigator.share({
                    title: isEn ? 'Delicious Food Quiz' : '음식 이름 퀴즈',
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
        { q: "What is the Food Quiz?", a: "It's a game where you guess the name of a food based on ingredients, taste, and origin hints." },
        { q: "How are points calculated?", a: "You get 3 points for answering on the 1st hint, 2 points on the 2nd, and 1 point on the 3rd." },
        { q: "Is it mostly Korean food?", a: "The quiz includes a mix of international and Korean dishes, making it fun for everyone." }
    ] : [
        { q: "음식 이름 퀴즈는 어떻게 하나요?", a: "재료, 맛, 원산지 등의 힌트를 보고 해당 음식의 정확한 이름을 맞추는 퀴즈입니다." },
        { q: "힌트는 몇 개까지 나오나요?", a: "단어의 난이도에 따라 다르지만 보통 3가지의 상세한 힌트가 순차적으로 제공됩니다." }
    ];

    const toolSteps = isEn ? [
        "Predict the food from the first hint.",
        "If unsure, unlock the next hint (but you'll earn fewer points).",
        "Type the exact food name in the input box to submit.",
        "See your total score and review your answers at the end."
    ] : [
        "첫 번째 힌트를 보고 음식을 예상해 봅니다.",
        "잘 모르겠다면 다음 힌트를 확인하며 정답을 좁혀갑니다.",
        "생각한 음식 이름을 입력하여 정답을 맞춥니다.",
        "퀴즈가 종료되면 전체 점수를 확인하고 결과 목록을 살펴봅니다."
    ];

    const toolTips = isEn ? [
        "Try to visualize the dish based on the ingredients mentioned.",
        "Keep an eye on the points; sometimes guessing early pays off!",
        "Don't play this on an empty stomach!"
    ] : [
        "가장 좋아하는 음식 카테고리를 상상하며 풀면 더욱 쉽게 풀 수 있습니다.",
        "야식이 생각나는 밤에 풀면 식욕을 자극할 수 있으니 주의하세요!",
        "최대한 힌트를 적게 보고 맞추는 연습을 하면 미식가 지수가 높아집니다."
    ];

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            <SEO
                title={isEn ? "Foodie Quiz - Guess the Dish | Tool Hive" : "음식 이름 퀴즈 (Food Quiz) | 상식 테스트 | Tool Hive"}
                description={isEn ? "Test your culinary knowledge with our Food Quiz. Guess the names of various dishes using 3-step hints. The fewer hints you use, the higher you score!" : "3단계 힌트를 보고 음식 이름을 맞추는 퀴즈 게임입니다. 적은 힌트로 맞출수록 높은 점수를 획득합니다!"}
                keywords={isEn ? "food quiz, culinary trivia, guess the dish, foodie games" : "음식퀴즈, 푸드상식, 맛집테스트, 요리퀴즈"}
                faqs={toolFaqs}
                steps={toolSteps}
            />

            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-rose-400 to-red-600 rounded-3xl text-white mb-6 shadow-xl transform hover:scale-110 transition-transform">
                    <Utensils size={40} />
                </div>
                <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-3 tracking-tight uppercase italic">
                    {isEn ? 'THE FOODIE QUIZ' : '음식 이름 퀴즈'}
                </h1>
                <p className="text-muted-foreground font-medium italic">
                    {isEn ? 'Guess the delicious dishes from the hints!' : '설명을 보고 맛있는 음식의 이름을 맞춰보세요!'}
                </p>
            </div>

            <div className="bg-card dark:bg-slate-800 rounded-[2.5rem] shadow-2xl overflow-hidden border-2 border-border/50 transition-all">
                {gameState === 'menu' && (
                    <div className="p-10 space-y-10">
                        <div className="bg-rose-50 dark:bg-rose-900/20 p-8 rounded-[2rem] border-2 border-rose-100 dark:border-rose-900/30">
                            <h3 className="font-black text-xl text-rose-800 dark:text-rose-300 mb-6 flex items-center gap-3">
                                <Trophy size={24} />
                                {isEn ? 'GAME RULES' : '게임 규칙'}
                            </h3>
                            <ul className="space-y-4">
                                <li className="flex justify-between items-center text-rose-700/80 dark:text-rose-400/80 font-bold">
                                    <span>{isEn ? 'Level 1 Hint' : '1단계 힌트 정답'}</span>
                                    <span className="bg-rose-500 text-white px-3 py-1 rounded-full text-sm font-black">+3 {isEn ? 'PTS' : '점'}</span>
                                </li>
                                <li className="flex justify-between items-center text-rose-700/80 dark:text-rose-400/80 font-bold">
                                    <span>{isEn ? 'Level 2 Hint' : '2단계 힌트 정답'}</span>
                                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-black">+2 {isEn ? 'PTS' : '점'}</span>
                                </li>
                                <li className="flex justify-between items-center text-rose-700/80 dark:text-rose-400/80 font-bold">
                                    <span>{isEn ? 'Level 3 Hint' : '3단계 힌트 정답'}</span>
                                    <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-black">+1 {isEn ? 'PTS' : '점'}</span>
                                </li>
                            </ul>
                        </div>

                        <div className="space-y-8">
                            <div>
                                <label className="block text-xs font-black uppercase tracking-widest text-muted-foreground mb-4 text-center">{isEn ? 'Select Amount' : '문제 수 선택'}</label>
                                <div className="grid grid-cols-3 gap-4">
                                    {[10, 20, 30].map((count) => (
                                        <button
                                            key={count}
                                            onClick={() => setQuestionCount(count)}
                                            className={`py-5 rounded-2xl border-4 transition-all font-black ${questionCount === count
                                                    ? 'border-red-500 bg-red-500 text-white shadow-xl shadow-red-500/20 scale-105'
                                                    : 'border-muted bg-muted/40 text-muted-foreground hover:border-red-300'
                                                }`}
                                        >
                                            {count} {isEn ? 'FOODS' : '문제'}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={startGame}
                                className="w-full py-6 text-2xl font-black text-white bg-gradient-to-r from-red-600 to-rose-500 rounded-3xl shadow-2xl hover:shadow-red-500/30 transform active:scale-95 transition-all uppercase tracking-tighter"
                            >
                                {isEn ? 'START FEEDING' : '퀴즈 시작하기'}
                            </button>
                        </div>
                    </div>
                )}

                {gameState === 'playing' && questions.length > 0 && (
                    <div className="p-8 md:p-12 space-y-10">
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-muted/30 p-4 rounded-2xl">
                            <span className="bg-white/50 dark:bg-slate-700 px-4 py-1.5 rounded-full text-xs font-black text-muted-foreground uppercase tracking-widest shadow-sm">
                                {isEn ? 'DISH' : '문제'} {currentQuestionIndex + 1} / {questions.length}
                            </span>
                            <div className="flex items-center gap-3">
                                <span className="text-xs font-black text-muted-foreground uppercase tracking-widest">{isEn ? 'Current Bounty' : '획득 가능 점수'}:</span>
                                <span className={`font-black text-2xl italic ${possiblePoints === 3 ? 'text-red-500' :
                                        possiblePoints === 2 ? 'text-orange-500' : 'text-yellow-500'
                                    }`}>
                                    {possiblePoints} {isEn ? 'PTS' : '점'}
                                </span>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {/* Hint 1 */}
                            <div className="bg-blue-500/5 dark:bg-blue-500/10 p-6 rounded-[2rem] border-2 border-blue-500/20 shadow-inner group transition-all hover:bg-blue-500/10">
                                <div className="flex items-start gap-4">
                                    <div className="bg-blue-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-black shrink-0 shadow-lg">1</div>
                                    <p className="text-xl text-foreground font-black italic leading-tight">
                                        {questions[currentQuestionIndex].hints[0]}
                                    </p>
                                </div>
                            </div>

                            {/* Hint 2 */}
                            {visibleHints >= 2 ? (
                                <div className="bg-emerald-500/5 dark:bg-emerald-500/10 p-6 rounded-[2rem] border-2 border-emerald-500/20 shadow-inner group transition-all hover:bg-emerald-500/10 animate-in slide-in-from-left-4 duration-300">
                                    <div className="flex items-start gap-4">
                                        <div className="bg-emerald-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-black shrink-0 shadow-lg">2</div>
                                        <p className="text-xl text-foreground font-black italic leading-tight">
                                            {questions[currentQuestionIndex].hints[1]}
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <button
                                    onClick={showNextHint}
                                    className="w-full py-4 bg-emerald-50 dark:bg-emerald-900/10 border-4 border-dashed border-emerald-500/30 rounded-[2rem] text-emerald-600 dark:text-emerald-400 font-black uppercase tracking-widest text-sm hover:bg-emerald-500/5 transition-all flex items-center justify-center gap-3 group"
                                >
                                    <HelpCircle size={20} className="group-hover:rotate-12 transition-transform" />
                                    {isEn ? 'Unlock Next Hint' : '2단계 힌트 보기'} (-1 {isEn ? 'PT' : '점'})
                                </button>
                            )}

                            {/* Hint 3 */}
                            {visibleHints >= 3 ? (
                                <div className="bg-amber-500/5 dark:bg-amber-500/10 p-6 rounded-[2rem] border-2 border-amber-500/20 shadow-inner group transition-all hover:bg-amber-500/10 animate-in slide-in-from-left-4 duration-300">
                                    <div className="flex items-start gap-4">
                                        <div className="bg-amber-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-black shrink-0 shadow-lg">3</div>
                                        <p className="text-xl text-foreground font-black italic leading-tight">
                                            {questions[currentQuestionIndex].hints[2]}
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <button
                                    onClick={showNextHint}
                                    disabled={visibleHints < 2}
                                    className={`w-full py-4 border-4 border-dashed rounded-[2rem] font-black uppercase tracking-widest text-sm transition-all flex items-center justify-center gap-3 group ${visibleHints < 2
                                            ? 'border-muted bg-muted/20 text-muted-foreground/50 cursor-not-allowed opacity-50'
                                            : 'border-amber-500/30 bg-amber-50 dark:bg-amber-900/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/5'
                                        }`}
                                >
                                    <HelpCircle size={20} className="group-hover:rotate-12 transition-transform" />
                                    {isEn ? 'Unlock Final Hint' : '3단계 힌트 보기'} (-1 {isEn ? 'PT' : '점'})
                                </button>
                            )}
                        </div>

                        <div className="relative pt-6">
                            <form onSubmit={handleAnswerSubmit} className="relative">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={userAnswer}
                                    onChange={(e) => setUserAnswer(e.target.value)}
                                    placeholder={isEn ? "What's the name?" : "정답을 입력하세요"}
                                    disabled={feedback?.type === 'correct'}
                                    className={`w-full p-6 text-center text-3xl font-black border-4 rounded-3xl outline-none transition-all shadow-xl font-mono uppercase tracking-[0.1em] ${feedback
                                            ? feedback.type === 'correct'
                                                ? 'border-green-500 bg-green-500/10 text-green-600'
                                                : 'border-red-500 bg-red-500/10 text-red-600'
                                            : 'border-border/50 focus:border-red-500 bg-muted/20'
                                        }`}
                                />
                                <button
                                    type="submit"
                                    disabled={feedback?.type === 'correct' || !userAnswer.trim()}
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
                            <Trophy size={120} className="text-yellow-500 drop-shadow-[0_0_20px_rgba(234,179,8,0.3)] animate-bounce" />
                            <div className="absolute -top-4 -right-4 bg-red-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-black text-xl shadow-lg ring-4 ring-white dark:ring-slate-800">
                                !
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h2 className="text-5xl font-black text-foreground italic uppercase tracking-tighter">{isEn ? 'GOURMET FINISHED!' : '퀴즈 완료!'}</h2>
                            <p className="text-muted-foreground font-black uppercase tracking-widest text-xs">{isEn ? 'Your Final Score' : '당신의 최종 점수는?'}</p>
                        </div>

                        <div className="text-9xl font-black text-red-500 drop-shadow-lg flex items-baseline justify-center gap-4 italic">
                            {score} <span className="text-4xl text-muted font-bold tracking-tight">/ {questions.length * 3}</span>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <button
                                onClick={() => setGameState('menu')}
                                className="flex-1 flex items-center justify-center px-12 py-6 bg-slate-900 text-white rounded-[2rem] font-black text-xl hover:scale-105 transition-all shadow-2xl active:scale-95"
                            >
                                <RefreshCw size={28} className="mr-4" />
                                {isEn ? 'EAT AGAIN' : '다시 하기'}
                            </button>
                            <button
                                onClick={handleShare}
                                className="flex-1 flex items-center justify-center px-12 py-6 bg-red-600 text-white rounded-[2rem] font-black text-xl hover:scale-105 transition-all shadow-2xl shadow-red-500/20 active:scale-95"
                            >
                                <Share2 size={28} className="mr-4" />
                                {isEn ? 'SHARE' : '공유하기'}
                            </button>
                        </div>

                        <div className="bg-muted/30 rounded-[3rem] p-10 text-left space-y-8 shadow-inner border border-border/50">
                            <h3 className="font-black text-muted-foreground uppercase tracking-widest text-xs px-2 flex items-center gap-3">
                                <Utensils size={18} />
                                {isEn ? 'Culinary History' : '내 정답 목록'}
                            </h3>
                            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-4 scrollbar-thin">
                                {userAnswers.map((item, idx) => (
                                    <div key={idx} className="bg-card p-8 rounded-[2rem] shadow-sm border-2 border-border/50 hover:border-red-200 transition-all flex justify-between items-center group">
                                        <div className="space-y-2">
                                            <div className="font-black text-3xl text-foreground uppercase tracking-tight group-hover:text-red-500 transition-colors">
                                                {item.question.word}
                                            </div>
                                            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest italic truncate max-w-[240px]">
                                                {item.question.hints[0]}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <div className={`font-black text-3xl italic ${item.pointsEarned === 3 ? 'text-red-500' : 
                                                item.pointsEarned === 2 ? 'text-orange-500' : 'text-yellow-500'}`}>
                                                +{item.pointsEarned}
                                            </div>
                                            <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-50">POINTS</div>
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
                    title={isEn ? "The Foodie Challenge: Explained" : "음식 이름 퀴즈 완벽 가이드"}
                    intro={isEn ? "Are you a true gourmet? Our Food Quiz challenges your culinary knowledge using a unique 3-tier hint system. Identify global and local dishes with as few clues as possible to climb the leaderboard." : "이 퀴즈는 여러분의 미식 상식과 추리력을 동시에 테스트하는 두뇌 게임입니다. 단순히 이름을 맞추는 것을 넘어, 재료와 유래 등 깊이 있는 음식 정보를 힌트로 제공하여 교육적인 재미까지 더했습니다."}
                    steps={toolSteps}
                    tips={toolTips}
                    faqs={toolFaqs}
                />
            </div>
        </div>
    );
};

export default FoodQuiz;
