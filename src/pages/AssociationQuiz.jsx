import React, { useState, useEffect, useRef } from 'react';

import { Lightbulb, Trophy, RefreshCw, Check, X, ArrowRight, Share2, Tag } from 'lucide-react';
import { associationQuizData } from '../data/associationQuizData';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';

const AssociationQuiz = () => {
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
        // Shuffle and slice
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
        // Remove spaces from correct answer for comparison
        const cleanCorrectAnswer = currentQuestion.answer.replace(/\s+/g, '').toLowerCase();

        // Also allow "Santa" if answer is "Christmas" based on user request example? 
        // User example: "Christmas (or Santa)". Data currently has "Christmas".
        // Let's stick to exact match or contains for now?
        // Actually, simple exact match (after cleaning) is safest/least ambiguous.
        // My data has simple one-word answers mostly.

        const isCorrect = cleanUserAnswer === cleanCorrectAnswer || (currentQuestion.answer === '크리스마스' && cleanUserAnswer === '산타');

        if (isCorrect) {
            setScore(prev => prev + 10);
            setFeedback({ type: 'correct', message: '정답입니다! (+10점)' });
            setUserAnswers(prev => [...prev, {
                question: currentQuestion,
                userAnswer: userAnswer,
                isCorrect: true
            }]);
        } else {
            setFeedback({ type: 'wrong', message: `오답입니다. 정답은 '${currentQuestion.answer}' 입니다.` });
            setUserAnswers(prev => [...prev, {
                question: currentQuestion,
                userAnswer: userAnswer,
                isCorrect: false
            }]);
        }

        // Auto advance
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
        if (navigator.share) {
            try {
                await navigator.share({
                    title: '연상 퀴즈 (단어 3개)',
                    text: `연상 퀴즈 (단어 3개 맞추기) 도전 결과! 제 점수는 ${score}점입니다.`,
                    url: window.location.href,
                });
            } catch (error) {
                console.log('Error sharing:', error);
            }
        } else {
            alert('공유 기능을 지원하지 않는 브라우저입니다.');
        }
    };

    
    const toolFaqs = [
        {
            "q": "연상 퀴즈란 무엇인가요?",
            "a": "세 가지 연관된 단어를 힌트로 보고, 공통으로 떠오르는 정답을 맞추는 게임입니다."
        },
        {
            "q": "힌트를 더 볼 수 있나요?",
            "a": "처음에는 2개의 단어가 제공되며, 어려울 경우 마지막 3번째 단어 힌트를 볼 수 있습니다."
        }
    ];
    const toolSteps = [
        "주어진 단어 힌트들을 유심히 살펴봅니다.",
        "공통으로 연상되는 단어를 유추하여 입력란에 적습니다.",
        "정답 확인 후 다음 문제로 넘어갑니다."
    ];
    const toolTips = [
        "직관적으로 떠오르는 단어가 정답일 확률이 높습니다.",
        "친구들과 함께 풀면 더 재미있습니다."
    ];

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            <SEO
                title="연상 퀴즈 | 간단 상식 테스트"
                description="제시된 3개의 단어를 보고 떠오르는 하나의 정답을 맞추는 연상 퀴즈 게임입니다."
                keywords=""
                category="간단 상식 테스트"
                faqs={toolFaqs}
                steps={toolSteps}
            />

            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-2xl text-white mb-4 shadow-lg">
                    <Lightbulb size={32} />
                </div>
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">연상 퀴즈</h1>
                <p className="text-gray-600 dark:text-gray-300">세 단어의 공통점을 찾아보세요!</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-all duration-300">
                {gameState === 'menu' && (
                    <div className="p-8">
                        <div className="space-y-6">
                            <div className="text-center bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-xl mb-6">
                                <h3 className="font-bold text-lg text-indigo-800 dark:text-indigo-300 mb-2">게임 예시</h3>
                                <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                                    <p>[ 노란색, 과일, 원숭이 ] → <span className="font-bold text-indigo-600 dark:text-indigo-400">바나나</span></p>
                                    <p>[ 겨울, 눈사람, 선물 ] → <span className="font-bold text-indigo-600 dark:text-indigo-400">크리스마스</span></p>
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-3 text-center">문제 수 선택</label>
                                <div className="grid grid-cols-3 gap-3">
                                    {[10, 20, 30].map((count) => (
                                        <button
                                            key={count}
                                            onClick={() => setQuestionCount(count)}
                                            className={`p-4 rounded-xl border-2 transition-all ${questionCount === count
                                                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-bold shadow-md'
                                                    : 'border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-indigo-300'
                                                }`}
                                        >
                                            {count}문제
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={startGame}
                                className="w-full py-4 text-xl font-bold text-white bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl shadow-md hover:shadow-lg transform active:scale-95 transition-all mt-4"
                            >
                                퀴즈 시작하기
                            </button>
                        </div>
                    </div>
                )}

                {gameState === 'playing' && questions.length > 0 && (
                    <div className="p-6 md:p-8">
                        <div className="flex justify-between items-center mb-10">
                            <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-sm font-semibold text-gray-600 dark:text-gray-300">
                                문제 {currentQuestionIndex + 1} / {questions.length}
                            </span>
                            <span className="text-indigo-500 dark:text-indigo-400 font-bold text-xl">
                                {score} 점
                            </span>
                        </div>

                        {/* Keywords Display */}
                        <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-12">
                            {questions[currentQuestionIndex].keywords.map((keyword, idx) => (
                                <div
                                    key={idx}
                                    className="bg-gray-50 dark:bg-gray-700 border-2 border-indigo-100 dark:border-indigo-900 w-full md:w-32 h-24 flex items-center justify-center rounded-2xl shadow-sm text-lg md:text-xl font-bold text-gray-800 dark:text-white animate-fade-in-up"
                                    style={{ animationDelay: `${idx * 150}ms` }}
                                >
                                    {keyword}
                                </div>
                            ))}
                        </div>

                        {/* Input Area */}
                        <div className="relative">
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
                                            : 'border-gray-200 dark:border-gray-700 focus:border-indigo-500 dark:bg-gray-700 dark:text-white'
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

                        <div className="my-8">
                            <p className="text-gray-500 dark:text-gray-400 mb-2">최종 점수</p>
                            <div className="text-5xl font-black text-indigo-500 dark:text-indigo-400">
                                {score} <span className="text-2xl text-gray-400 font-medium">/ {questions.length * 10}</span>
                            </div>
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
                                        <div className="flex gap-2 mb-3">
                                            {item.question.keywords.map((k, i) => (
                                                <span key={i} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs text-gray-600 dark:text-gray-300 rounded">
                                                    {k}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <div className="text-gray-500">
                                                입력: <span className={item.isCorrect ? 'text-green-600 font-bold' : 'text-red-500 line-through'}>{item.userAnswer}</span>
                                            </div>
                                            <div className="font-bold text-indigo-600 dark:text-indigo-400">
                                                정답: {item.question.answer}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        
            <div className="mt-12">
                <ToolGuide
                    title="연상 퀴즈 안내"
                    intro="제시된 3개의 단어를 보고 떠오르는 하나의 정답을 맞추는 연상 퀴즈 게임입니다."
                    steps={toolSteps}
                    tips={toolTips}
                    faqs={toolFaqs}
                />
            </div>
        </div>
    );
};

export default AssociationQuiz;
