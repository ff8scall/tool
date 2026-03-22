import React, { useState, useEffect, useRef } from 'react';

import { Utensils, Trophy, RefreshCw, Check, X, ArrowRight, Share2, HelpCircle } from 'lucide-react';
import { foodQuizData } from '../data/foodQuizData';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';

const FoodQuiz = () => {
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
        // Shuffle and slice
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
        // Clean answer string (remove spaces, case insensitive)
        const cleanUserAnswer = userAnswer.trim().replace(/\s+/g, '').toLowerCase();
        const cleanCorrectAnswer = currentQuestion.word.replace(/\s+/g, '').toLowerCase();

        if (cleanUserAnswer === cleanCorrectAnswer) {
            const points = possiblePoints;
            setScore(prev => prev + points);
            setFeedback({ type: 'correct', message: `정답입니다! (+${points}점)` });

            setUserAnswers(prev => [...prev, {
                question: currentQuestion,
                userAnswer: userAnswer,
                isCorrect: true,
                pointsEarned: points
            }]);

            // Auto advance after correct answer
            setTimeout(() => {
                if (currentQuestionIndex < questions.length - 1) {
                    setCurrentQuestionIndex(prev => prev + 1);
                    resetQuestionState();
                } else {
                    setGameState('result');
                }
            }, 1500);
        } else {
            setFeedback({ type: 'wrong', message: '오답입니다. 다시 시도해보세요!' });
            // Clear wrong feedback after a moment so they can try again
            setTimeout(() => {
                setFeedback(null);
                if (inputRef.current) inputRef.current.focus();
            }, 1500);
        }
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: '음식 이름 퀴즈',
                    text: `음식 이름 퀴즈 도전 결과! 제 점수는 ${score}점입니다. (최대 ${questions.length * 3}점)`,
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
            "q": "음식 이름 퀴즈는 어떻게 하나요?",
            "a": "재료, 맛, 원산지 등의 힌트를 보고 해당 음식의 정확한 이름을 맞추는 퀴즈입니다."
        },
        {
            "q": "힌트는 몇 개까지 나오나요?",
            "a": "단어의 난이도에 따라 다르지만 보통 3가지의 상세한 힌트가 순차적으로 제공됩니다."
        }
    ];
    const toolSteps = [
        "첫 번째 힌트를 보고 음식을 예상해 봅니다.",
        "잘 모르겠다면 다음 힌트를 확인하며 정답을 좁혀갑니다.",
        "생각한 음식 이름을 입력하여 정답을 맞춥니다."
    ];
    const toolTips = [
        "가장 좋아하는 음식 카테고리를 상상하며 풀면 더욱 쉽게 풀 수 있습니다.",
        "야식이 생각나는 밤에 풀면 식욕을 자극할 수 있으니 주의하세요!"
    ];

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            <SEO
                title="음식 이름 퀴즈 | 간단 상식 테스트"
                description="3단계 힌트를 보고 음식 이름을 맞추는 퀴즈 게임입니다. 적은 힌트로 맞출수록 높은 점수를 획득합니다!"
                keywords=""
                category="간단 상식 테스트"
                faqs={toolFaqs}
                steps={toolSteps}
            />

            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center p-3 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl text-white mb-4 shadow-lg">
                    <Utensils size={32} />
                </div>
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">음식 이름 퀴즈</h1>
                <p className="text-gray-600 dark:text-gray-300">설명을 보고 맛있는 음식의 이름을 맞춰보세요!</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transition-all duration-300">
                {gameState === 'menu' && (
                    <div className="p-8">
                        <div className="space-y-6">
                            <div className="text-center bg-orange-50 dark:bg-orange-900/20 p-6 rounded-xl mb-6">
                                <h3 className="font-bold text-lg text-orange-800 dark:text-orange-300 mb-2">게임 규칙</h3>
                                <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                                    <li>총 3단계의 힌트가 제공됩니다.</li>
                                    <li>1단계 힌트만 보고 맞추면 <span className="font-bold text-red-500">3점</span></li>
                                    <li>2단계 힌트까지 보고 맞추면 <span className="font-bold text-orange-500">2점</span></li>
                                    <li>3단계 힌트까지 보고 맞추면 <span className="font-bold text-yellow-500">1점</span></li>
                                </ul>
                            </div>

                            <div>
                                <label className="block text-gray-700 dark:text-gray-200 font-semibold mb-3 text-center">문제 수 선택</label>
                                <div className="grid grid-cols-3 gap-3">
                                    {[10, 20, 30].map((count) => (
                                        <button
                                            key={count}
                                            onClick={() => setQuestionCount(count)}
                                            className={`p-4 rounded-xl border-2 transition-all ${questionCount === count
                                                    ? 'border-orange-500 bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 font-bold shadow-md'
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
                                className="w-full py-4 text-xl font-bold text-white bg-gradient-to-r from-orange-500 to-red-500 rounded-xl shadow-md hover:shadow-lg transform active:scale-95 transition-all mt-4"
                            >
                                퀴즈 시작하기
                            </button>
                        </div>
                    </div>
                )}

                {gameState === 'playing' && questions.length > 0 && (
                    <div className="p-6 md:p-8">
                        {/* Header Info */}
                        <div className="flex justify-between items-center mb-6">
                            <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full text-sm font-semibold text-gray-600 dark:text-gray-300">
                                문제 {currentQuestionIndex + 1} / {questions.length}
                            </span>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-500">현재 획득 가능 점수:</span>
                                <span className={`font-bold text-xl ${possiblePoints === 3 ? 'text-red-500' :
                                        possiblePoints === 2 ? 'text-orange-500' : 'text-yellow-500'
                                    }`}>
                                    {possiblePoints}점
                                </span>
                            </div>
                        </div>

                        {/* Hints Area */}
                        <div className="space-y-4 mb-8">
                            {/* Hint 1 */}
                            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-900/30 animate-fade-in-up">
                                <div className="flex items-start gap-3">
                                    <div className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</div>
                                    <p className="text-lg text-gray-800 dark:text-gray-200 font-medium leading-relaxed">
                                        {questions[currentQuestionIndex].hints[0]}
                                    </p>
                                </div>
                            </div>

                            {/* Hint 2 */}
                            {visibleHints >= 2 ? (
                                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl border border-green-100 dark:border-green-900/30 animate-fade-in-up">
                                    <div className="flex items-start gap-3">
                                        <div className="bg-green-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</div>
                                        <p className="text-lg text-gray-800 dark:text-gray-200 font-medium leading-relaxed">
                                            {questions[currentQuestionIndex].hints[1]}
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <button
                                    onClick={showNextHint}
                                    className="w-full py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                                >
                                    <HelpCircle size={18} />
                                    2단계 힌트 보기 (-1점)
                                </button>
                            )}

                            {/* Hint 3 */}
                            {visibleHints >= 3 ? (
                                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-xl border border-yellow-100 dark:border-yellow-900/30 animate-fade-in-up">
                                    <div className="flex items-start gap-3">
                                        <div className="bg-yellow-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">3</div>
                                        <p className="text-lg text-gray-800 dark:text-gray-200 font-medium leading-relaxed">
                                            {questions[currentQuestionIndex].hints[2]}
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <button
                                    onClick={showNextHint}
                                    disabled={visibleHints < 2}
                                    className={`w-full py-3 border-2 border-dashed rounded-xl transition-colors flex items-center justify-center gap-2 ${visibleHints < 2
                                            ? 'border-gray-200 dark:border-gray-800 text-gray-300 dark:text-gray-600 cursor-not-allowed'
                                            : 'border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                                        }`}
                                >
                                    <HelpCircle size={18} />
                                    3단계 힌트 보기 (-1점)
                                </button>
                            )}
                        </div>

                        {/* Input Area */}
                        <div className="relative mt-8">
                            <form onSubmit={handleAnswerSubmit} className="relative">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={userAnswer}
                                    onChange={(e) => setUserAnswer(e.target.value)}
                                    placeholder="정답을 입력하세요"
                                    disabled={feedback?.type === 'correct'}
                                    className={`w-full p-4 text-center text-xl font-bold border-2 rounded-xl outline-none transition-all ${feedback
                                            ? feedback.type === 'correct'
                                                ? 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
                                                : 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'
                                            : 'border-gray-200 dark:border-gray-700 focus:border-orange-500 dark:bg-gray-700 dark:text-white'
                                        }`}
                                />
                                <button
                                    type="submit"
                                    disabled={feedback?.type === 'correct' || !userAnswer.trim()}
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
                            <div className="text-5xl font-black text-orange-500 dark:text-orange-400">
                                {score} <span className="text-2xl text-gray-400 font-medium">/ {questions.length * 3}</span>
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
                            <h3 className="font-bold text-gray-700 dark:text-gray-200 mb-4 px-2">내 정답 목록</h3>
                            <div className="space-y-3">
                                {userAnswers.map((item, idx) => (
                                    <div key={idx} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 flex justify-between items-center">
                                        <div>
                                            <div className="font-bold text-lg text-gray-800 dark:text-white mb-1">
                                                {item.question.word}
                                            </div>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-[200px]">
                                                {item.question.hints[0]}
                                            </p>
                                        </div>
                                        <div className="font-bold text-orange-500 bg-orange-50 dark:bg-orange-900/30 px-3 py-1 rounded-lg">
                                            {item.pointsEarned}점
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
                    title="음식 이름 퀴즈 안내"
                    intro="3단계 힌트를 보고 음식 이름을 맞추는 퀴즈 게임입니다. 적은 힌트로 맞출수록 높은 점수를 획득합니다!"
                    steps={toolSteps}
                    tips={toolTips}
                    faqs={toolFaqs}
                />
            </div>
        </div>
    );
};

export default FoodQuiz;
