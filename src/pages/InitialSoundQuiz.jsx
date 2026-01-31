import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { BookOpen, Trophy, RefreshCw, Check, X, ArrowRight, Share2, Home } from 'lucide-react';
import { initialSoundQuizData } from '../data/initialSoundQuizData';

const InitialSoundQuiz = () => {
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
        // Filter questions by difficulty
        const filteredData = initialSoundQuizData.filter(item => item.difficulty === difficulty);

        // Shuffle and slice
        const shuffled = [...filteredData].sort(() => 0.5 - Math.random());
        // If not enough questions, take all available
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
        if (feedback) return; // Prevent double submission during feedback

        const currentQuestion = questions[currentQuestionIndex];
        const isCorrect = userAnswer.trim().replace(/\s+/g, '') === currentQuestion.word.replace(/\s+/g, '');

        if (isCorrect) {
            setScore(prev => prev + 10);
            setFeedback({ type: 'correct', message: '정답입니다!' });
        } else {
            setFeedback({ type: 'wrong', message: `오답! 정답은 '${currentQuestion.word}' 입니다.` });
        }

        setUserAnswers(prev => [...prev, {
            question: currentQuestion,
            userAnswer: userAnswer,
            isCorrect
        }]);

        // Auto advance
        setTimeout(() => {
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(prev => prev + 1);
                setUserAnswer('');
                setFeedback(null);
                // Focus input
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

    const handleHomeClick = () => {
        window.location.href = '/';
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: '초성 단어 퀴즈',
                    text: `초성 단어 퀴즈 (${difficulty === 'low' ? '초급' : difficulty === 'medium' ? '중급' : '고급'}) - 제 점수는 ${score}점입니다!`,
                    url: window.location.href,
                });
            } catch (error) {
                console.log('Error sharing:', error);
            }
        } else {
            alert('공유 기능을 지원하지 않는 브라우저입니다.');
        }
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            <Helmet>
                <title>초성 단어 퀴즈 | 간단 상식 테스트</title>
                <meta name="description" content="제시된 초성과 설명을 보고 단어를 맞추는 재미있는 초성 퀴즈 게임입니다." />
            </Helmet>

            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl text-white mb-4 shadow-lg">
                    <BookOpen size={32} />
                </div>
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">초성 단어 퀴즈</h1>
                <p className="text-gray-600 dark:text-gray-300">초성을 보고 알맞은 단어를 맞춰보세요!</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-all duration-300">
                {gameState === 'menu' && (
                    <div className="p-8">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-3">난이도 선택</label>
                                <div className="grid grid-cols-3 gap-3">
                                    {['low', 'medium', 'high'].map((level) => (
                                        <button
                                            key={level}
                                            onClick={() => setDifficulty(level)}
                                            className={`p-3 rounded-xl border-2 transition-all ${difficulty === level
                                                    ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 font-bold'
                                                    : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-orange-300'
                                                }`}
                                        >
                                            {level === 'low' ? '초급' : level === 'medium' ? '중급' : '고급'}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-3">문제 수 선택</label>
                                <div className="grid grid-cols-3 gap-3">
                                    {[10, 20, 30].map((count) => (
                                        <button
                                            key={count}
                                            onClick={() => setQuestionCount(count)}
                                            className={`p-3 rounded-xl border-2 transition-all ${questionCount === count
                                                    ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 font-bold'
                                                    : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-orange-300'
                                                }`}
                                        >
                                            {count}문제
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={startGame}
                                className="w-full py-4 text-xl font-bold text-white bg-gradient-to-r from-orange-500 to-red-500 rounded-xl shadow-md hover:shadow-lg transform active:scale-95 transition-all"
                            >
                                퀴즈 시작하기
                            </button>
                        </div>
                    </div>
                )}

                {gameState === 'playing' && questions.length > 0 && (
                    <div className="p-6 md:p-8">
                        <div className="flex justify-between items-center mb-6">
                            <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-sm font-semibold text-gray-600 dark:text-gray-300">
                                문제 {currentQuestionIndex + 1} / {questions.length}
                            </span>
                            <span className="text-orange-500 dark:text-orange-400 font-bold">
                                {score} 점
                            </span>
                        </div>

                        <div className="mb-0 text-center py-8">
                            <div className="text-6xl md:text-7xl font-black text-gray-800 dark:text-white tracking-widest mb-6 animate-fade-in">
                                {questions[currentQuestionIndex].initial}
                            </div>
                            <div className="inline-block bg-blue-50 dark:bg-blue-900/30 px-6 py-3 rounded-xl">
                                <p className="text-lg md:text-xl text-blue-800 dark:text-blue-300 font-medium">
                                    💡 힌트: {questions[currentQuestionIndex].hint}
                                </p>
                            </div>
                        </div>

                        <div className="mt-8 relative">
                            <form onSubmit={handleAnswerSubmit} className="relative">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={userAnswer}
                                    onChange={(e) => setUserAnswer(e.target.value)}
                                    placeholder="정답을 입력하세요"
                                    disabled={!!feedback}
                                    className={`w-full p-4 text-center text-xl font-bold border-2 rounded-xl outline-none transition-all ${feedback
                                            ? feedback.type === 'correct'
                                                ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                                                : 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'
                                            : 'border-gray-200 dark:border-gray-700 focus:border-orange-500 dark:bg-gray-700 dark:text-white'
                                        }`}
                                />
                                <button
                                    type="submit"
                                    disabled={!!feedback || !userAnswer.trim()}
                                    className="absolute right-2 top-2 bottom-2 px-4 bg-gray-900 dark:bg-gray-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-800 dark:hover:bg-gray-500 transition-colors"
                                >
                                    <ArrowRight size={24} />
                                </button>
                            </form>

                            {feedback && (
                                <div className={`mt-4 p-4 rounded-xl text-center font-bold text-lg animate-bounce-short ${feedback.type === 'correct'
                                        ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300'
                                        : 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300'
                                    }`}>
                                    {feedback.type === 'correct' ? <Check className="inline-block mr-2" /> : <X className="inline-block mr-2" />}
                                    {feedback.message}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {gameState === 'result' && (
                    <div className="p-8 text-center">
                        <Trophy size={64} className="mx-auto text-yellow-500 mb-4 animate-bounce" />
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">퀴즈 완료!</h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-8">당신의 최종 점수는?</p>

                        <div className="text-5xl font-black text-orange-500 dark:text-orange-400 mb-8">
                            {score} <span className="text-2xl text-gray-400 font-medium">/ {questions.length * 10}</span>
                        </div>

                        <div className="flex gap-3 justify-center mb-8">
                            <button
                                onClick={() => setGameState('menu')}
                                className="flex items-center px-6 py-3 bg-gray-900 dark:bg-gray-700 text-white rounded-xl hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors"
                            >
                                <RefreshCw size={20} className="mr-2" />
                                다시 하기
                            </button>
                            <button
                                onClick={handleShare}
                                className="flex items-center px-6 py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors"
                            >
                                <Share2 size={20} className="mr-2" />
                                공유하기
                            </button>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 text-left max-h-96 overflow-y-auto">
                            <h3 className="font-bold text-gray-700 dark:text-gray-200 mb-4 px-2">오답 노트</h3>
                            <div className="space-y-3">
                                {userAnswers.map((item, idx) => (
                                    <div key={idx} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
                                        <div className="flex justify-between items-start mb-2">
                                            <span className="font-bold text-lg text-gray-800 dark:text-white">
                                                {item.question.initial}
                                            </span>
                                            <span className={`px-2 py-1 rounded text-xs font-bold ${item.isCorrect
                                                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                                                    : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                                                }`}>
                                                {item.isCorrect ? '정답' : '오답'}
                                            </span>
                                        </div>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{item.question.hint}</p>
                                        <div className="flex justify-between text-sm">
                                            <div className="text-gray-500">
                                                입력: <span className={item.isCorrect ? 'text-green-600' : 'text-red-500 line-through'}>{item.userAnswer}</span>
                                            </div>
                                            <div className="font-bold text-blue-600 dark:text-blue-400">
                                                정답: {item.question.word}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InitialSoundQuiz;
