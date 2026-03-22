import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, Trophy, RefreshCw, Check, X, ArrowRight, Share2, Home, Star } from 'lucide-react';
import { initialSoundQuizData } from '../data/initialSoundQuizData';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { useLanguage } from '../context/LanguageContext';

const InitialSoundQuiz = () => {
    const { lang } = useLanguage();
    const isEn = lang === 'en';
    const [gameState, setGameState] = useState('menu'); // menu, playing, result
    const [difficulty, setDifficulty] = useState('low');
    const [questionCount, setQuestionCount] = useState(10);
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswer, setUserAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]); // { question, answer, isCorrect }
    const [feedback, setFeedback] = useState(null); // { type: 'correct' | 'wrong', message: string }
    const inputRef = useRef(null);

    const startGame = () => {
        const filteredData = initialSoundQuizData.filter(item => item.difficulty === difficulty);
        const shuffled = [...filteredData].sort(() => 0.5 - Math.random());
        const selectedQuestions = shuffled.slice(0, Math.min(questionCount, shuffled.length));

        setQuestions(selectedQuestions);
        setCurrentQuestionIndex(0);
        setScore(0);
        setUserAnswers([]);
        setGameState('playing');
        setFeedback(null);
        setUserAnswer('');
    };

    const handleAnswerSubmit = (e) => {
        e.preventDefault();
        if (feedback) return;

        const currentQuestion = questions[currentQuestionIndex];
        const isCorrect = userAnswer.trim().replace(/\s+/g, '') === currentQuestion.word.replace(/\s+/g, '');

        if (isCorrect) {
            setScore(prev => prev + 10);
            setFeedback({ type: 'correct', message: isEn ? 'Correct!' : '정답입니다!' });
        } else {
            setFeedback({ type: 'wrong', message: isEn ? `Wrong! Answer was '${currentQuestion.word}'.` : `오답! 정답은 '${currentQuestion.word}' 입니다.` });
        }

        setUserAnswers(prev => [...prev, {
            question: currentQuestion,
            userAnswer: userAnswer,
            isCorrect
        }]);

        setTimeout(() => {
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(prev => prev + 1);
                setUserAnswer('');
                setFeedback(null);
                setTimeout(() => {
                    if (inputRef.current) inputRef.current.focus();
                }, 100);
            } else {
                setGameState('result');
            }
        }, 1500);
    };

    useEffect(() => {
        if (gameState === 'playing' && inputRef.current) {
            inputRef.current.focus();
        }
    }, [gameState, currentQuestionIndex]);

    const handleShare = async () => {
        const diffLabel = isEn ? (difficulty === 'low' ? 'Beginner' : difficulty === 'medium' ? 'Intermediate' : 'Expert') : (difficulty === 'low' ? '초급' : difficulty === 'medium' ? '중급' : '고급');
        const text = isEn ? `Korean Initial Sound Quiz (${diffLabel}) - My score is ${score}!` : `초성 단어 퀴즈 (${diffLabel}) - 제 점수는 ${score}점입니다!`;
        if (navigator.share) {
            try {
                await navigator.share({
                    title: isEn ? 'Korean Initial Sound Quiz' : '초성 단어 퀴즈',
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
        { q: "What is an Initial Sound Quiz?", a: "It's a popular Korean word game where you guess the original word based on its initial consonants (Choseong) and a brief hint." },
        { q: "Is it case-sensitive or space-sensitive?", a: "Korean doesn't have cases. For spaces, it's generally best to enter the word without spaces as shown in the answer format." },
        { q: "Can non-Koreans play this?", a: "It's a great way for Korean language learners to test their vocabulary and cultural knowledge!" }
    ] : [
        { q: "초성 퀴즈는 어떻게 푸나요?", a: "제시된 한글 자음(초성) 힌트와 설명 글을 읽고 올바른 단어를 유추하여 타이핑하면 됩니다." },
        { q: "맞춤법이 띄어쓰기까지 정확해야 하나요?", a: "일반적으로 띄어쓰기 없이 붙여서 입력하는 것이 표준이며, 가장 보편적인 단어 위주로 정답이 설정되어 있습니다." }
    ];

    const toolSteps = isEn ? [
        "Look at the Korean initial consonants (e.g., 'ㅅㅂ') shown on the screen.",
        "Read the hint provided below the consonants to narrow down the word.",
        "Type the full Korean word in the input box and press Enter or the arrow button.",
        "Check your score and review any missed words at the end of the quiz."
    ] : [
        "화면에 뜬 큼직한 'ㄱ ㄴ ㄷ' 등의 초성 힌트를 확인합니다.",
        "아래에 제시된 부연 설명을 통해 단어의 범위를 좁힙니다.",
        "정답을 입력창에 정확히 적어 제출합니다.",
        "퀴즈가 종료되면 점수를 확인하고 틀린 단어들을 복습합니다."
    ];

    const toolTips = isEn ? [
        "Most answers are common nouns or well-known idioms (Lion Idioms).",
        "If you're stuck, try saying the consonants out loud; sometimes the sound triggers the memory.",
        "This quiz is perfect for warming up your brain or competing with friend who are also learning Korean."
    ] : [
        "명사 위주의 표준어가 주로 출제되므로 백과사전적인 지식을 떠올리면 유리합니다.",
        "친구와 초성 퀴즈 내기를 하면서 워밍업 게임으로 즐겨보세요.",
        "모바일 환경에서도 간편하게 즐길 수 있어 이동 중에 뇌 운동을 하기 좋습니다."
    ];

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            <SEO
                title={isEn ? "Korean Initial Sound Quiz - Test Your Vocabulary | Tool Hive" : "초성 단어 퀴즈 (Initial Sound Quiz) | 간단 상식 테스트 | Tool Hive"}
                description={isEn ? "Challenge yourself with the classic Korean Initial Sound Quiz. Guess words from Choseong hints and improve your Korean vocabulary. Fun for learners and natives." : "제시된 초성과 설명을 보고 단어를 맞추는 재미있는 초성 퀴즈 게임입니다."}
                keywords={isEn ? "korean initial sound quiz, choseong quiz, learn korean game, korean vocabulary test" : "초성퀴즈, 한글게임, 단어맞추기, 상식테스트"}
                faqs={toolFaqs}
                steps={toolSteps}
            />

            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-amber-400 to-orange-500 rounded-3xl text-white mb-6 shadow-xl transform hover:rotate-3 transition-transform">
                    <BookOpen size={40} />
                </div>
                <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-3 tracking-tight italic uppercase">
                    {isEn ? 'K-Initial Quiz' : '초성 단어 퀴즈'}
                </h1>
                <p className="text-muted-foreground font-medium">
                    {isEn ? 'Guess the Korean word from its initial consonants!' : '초성을 보고 알맞은 단어를 맞춰보세요!'}
                </p>
            </div>

            <div className="bg-card dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden border-2 border-border/50 transition-all">
                {gameState === 'menu' && (
                    <div className="p-10 space-y-10">
                        <div className="space-y-8">
                            <div>
                                <label className="block text-sm font-black uppercase tracking-widest text-muted-foreground mb-4">{isEn ? 'Difficulty' : '난이도 선택'}</label>
                                <div className="grid grid-cols-3 gap-3">
                                    {['low', 'medium', 'high'].map((level) => (
                                        <button
                                            key={level}
                                            onClick={() => setDifficulty(level)}
                                            className={`py-4 rounded-2xl border-4 transition-all font-black text-sm uppercase tracking-tighter ${difficulty === level
                                                    ? 'border-orange-500 bg-orange-500 text-white shadow-lg shadow-orange-500/20 scale-105'
                                                    : 'border-muted bg-muted/30 text-muted-foreground hover:border-orange-300'
                                                }`}
                                        >
                                            {level === 'low' ? (isEn ? 'Easy' : '초급') : level === 'medium' ? (isEn ? 'Normal' : '중급') : (isEn ? 'Hard' : '고급')}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-black uppercase tracking-widest text-muted-foreground mb-4">{isEn ? 'Number of Questions' : '문제 수 선택'}</label>
                                <div className="grid grid-cols-3 gap-3">
                                    {[10, 20, 30].map((count) => (
                                        <button
                                            key={count}
                                            onClick={() => setQuestionCount(count)}
                                            className={`py-4 rounded-2xl border-4 transition-all font-black text-sm uppercase tracking-tighter ${questionCount === count
                                                    ? 'border-orange-500 bg-orange-500 text-white shadow-lg shadow-orange-500/20 scale-105'
                                                    : 'border-muted bg-muted/30 text-muted-foreground hover:border-orange-300'
                                                }`}
                                        >
                                            {count} {isEn ? 'Q' : '문제'}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={startGame}
                                className="w-full py-6 text-2xl font-black text-white bg-gradient-to-r from-orange-500 via-rose-500 to-red-500 rounded-2xl shadow-2xl hover:shadow-orange-500/20 transform active:scale-95 transition-all uppercase tracking-tighter italic"
                            >
                                {isEn ? 'START QUIZ' : '퀴즈 시작하기'}
                            </button>
                        </div>
                    </div>
                )}

                {gameState === 'playing' && questions.length > 0 && (
                    <div className="p-8 md:p-12 space-y-8">
                        <div className="flex justify-between items-center bg-muted/30 p-4 rounded-2xl font-black text-xs uppercase tracking-widest">
                            <span className="text-muted-foreground">
                                {isEn ? 'Question' : '문제'} {currentQuestionIndex + 1} / {questions.length}
                            </span>
                            <span className="text-orange-500">
                                {score} PTS
                            </span>
                        </div>

                        <div className="text-center space-y-8 py-4">
                            <div className="text-7xl md:text-9xl font-black text-foreground tracking-[0.2em] break-all animate-in zoom-in-95 duration-500">
                                {questions[currentQuestionIndex].initial}
                            </div>
                            <div className="inline-block bg-primary/5 border border-primary/20 px-8 py-4 rounded-2xl shadow-inner">
                                <p className="text-lg md:text-xl text-primary font-black italic">
                                    💡 {isEn ? 'HINT' : '힌트'}: {questions[currentQuestionIndex].hint}
                                </p>
                            </div>
                        </div>

                        <div className="relative pt-4">
                            <form onSubmit={handleAnswerSubmit} className="relative">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={userAnswer}
                                    onChange={(e) => setUserAnswer(e.target.value)}
                                    placeholder={isEn ? "Type the word in Korean" : "정답을 입력하세요"}
                                    disabled={!!feedback}
                                    className={`w-full p-6 text-center text-2xl font-black border-4 rounded-3xl outline-none transition-all shadow-xl ${feedback
                                            ? feedback.type === 'correct'
                                                ? 'border-green-500 bg-green-500/10 text-green-600'
                                                : 'border-rose-500 bg-rose-500/10 text-rose-600'
                                            : 'border-border/50 focus:border-orange-500 bg-muted/20'
                                        }`}
                                />
                                <button
                                    type="submit"
                                    disabled={!!feedback || !userAnswer.trim()}
                                    className="absolute right-3 top-3 bottom-3 px-6 bg-slate-900 text-white rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-800 transition-all active:scale-95 shadow-lg"
                                >
                                    <ArrowRight size={28} />
                                </button>
                            </form>

                            {feedback && (
                                <div className={`mt-6 p-6 rounded-2xl text-center font-black text-xl animate-in slide-in-from-top-4 duration-300 shadow-lg ${feedback.type === 'correct'
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-rose-100 text-rose-700'
                                    }`}>
                                    {feedback.type === 'correct' ? <Check className="inline-block mr-3 w-8 h-8" /> : <X className="inline-block mr-3 w-8 h-8" />}
                                    {feedback.message}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {gameState === 'result' && (
                    <div className="p-12 text-center space-y-8 animate-in zoom-in duration-500">
                        <div className="relative inline-block">
                            <Trophy size={100} className="text-yellow-500 drop-shadow-2xl animate-bounce" />
                            <div className="absolute -top-4 -right-4 bg-orange-500 text-white rounded-full p-2">
                                <Star size={24} fill="white" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <h2 className="text-4xl font-black text-foreground italic uppercase tracking-tight">{isEn ? 'Quiz Complete!' : '퀴즈 완료!'}</h2>
                            <p className="text-muted-foreground font-black uppercase tracking-widest text-xs">{isEn ? 'Your Final Score' : '당신의 최종 점수는?'}</p>
                        </div>

                        <div className="text-8xl font-black text-orange-500 drop-shadow-lg flex items-baseline justify-center gap-2">
                            {score} <span className="text-3xl text-muted font-bold">/ {questions.length * 10}</span>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={() => setGameState('menu')}
                                className="flex-1 flex items-center justify-center px-10 py-5 bg-slate-900 text-white rounded-2xl font-black text-lg hover:scale-105 transition-all active:scale-95 shadow-xl"
                            >
                                <RefreshCw size={24} className="mr-3" />
                                {isEn ? 'PLAY AGAIN' : '다시 하기'}
                            </button>
                            <button
                                onClick={handleShare}
                                className="flex-1 flex items-center justify-center px-10 py-5 bg-blue-600 text-white rounded-2xl font-black text-lg hover:scale-105 transition-all active:scale-95 shadow-xl shadow-blue-500/20"
                            >
                                <Share2 size={24} className="mr-3" />
                                {isEn ? 'SHARE' : '공유하기'}
                            </button>
                        </div>

                        <div className="bg-muted/30 rounded-3xl p-8 text-left space-y-6 shadow-inner border border-border/50">
                            <h3 className="font-black text-muted-foreground uppercase tracking-widest text-xs px-2 flex items-center gap-2">
                                <BookOpen size={16} />
                                {isEn ? 'Review Mistakes' : '오답 노트'}
                            </h3>
                            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin">
                                {userAnswers.map((item, idx) => (
                                    <div key={idx} className="bg-card p-6 rounded-2xl shadow-sm border-2 border-border/50 hover:border-orange-200 transition-all">
                                        <div className="flex justify-between items-start mb-3">
                                            <span className="font-black text-2xl text-foreground tracking-widest">
                                                {item.question.initial}
                                            </span>
                                            <span className={`px-3 py-1 rounded-lg text-xs font-black uppercase tracking-widest ${item.isCorrect
                                                    ? 'bg-green-100 text-green-600'
                                                    : 'bg-rose-100 text-rose-600'
                                                }`}>
                                                {item.isCorrect ? (isEn ? 'PASS' : '정답') : (isEn ? 'FAIL' : '오답')}
                                            </span>
                                        </div>
                                        <p className="text-muted-foreground font-bold text-sm mb-4 leading-relaxed italic">💡 {item.question.hint}</p>
                                        <div className="flex flex-col sm:flex-row justify-between gap-2 pt-4 border-t border-dashed border-border/50">
                                            <div className="text-sm font-black uppercase tracking-widest text-muted-foreground">
                                                {isEn ? 'Input' : '입력'}: <span className={item.isCorrect ? 'text-green-600 font-mono' : 'text-rose-500 font-mono line-through'}>{item.userAnswer || (isEn ? '(blank)' : '(공백)')}</span>
                                            </div>
                                            <div className="text-sm font-black uppercase tracking-widest text-primary">
                                                {isEn ? 'Answer' : '정답'}: <span className="font-mono text-lg">{item.question.word}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="mt-16">
                <ToolGuide
                    title={isEn ? "Mastering the Korean Initial Sound Quiz" : "초성 단어 퀴즈 완벽 가이드"}
                    intro={isEn ? "Step into the world of 'Choseong Quiz', a beloved Korean word game that tests your vocabulary and intuitive thinking. Guess the original word using only its initial consonants and a helpful clue." : "제시된 초성과 설명을 보고 단어를 맞추는 재미있는 초성 퀴즈 게임입니다. 어휘력과 상식을 동시에 기를 수 있는 뇌 운동 콘텐츠로, 누구나 쉽고 재미있게 즐길 수 있습니다."}
                    steps={toolSteps}
                    tips={toolTips}
                    faqs={toolFaqs}
                />
            </div>
        </div>
    );
};

export default InitialSoundQuiz;
