import React, { useState, useEffect, useRef } from 'react';
import { Share2, RefreshCw, Calculator, Trophy, Timer, Zap, Play, Target, Sparkles } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { useLanguage } from '../context/LanguageContext';

const SpeedMath = () => {
    const { lang, t } = useLanguage();
    const isEn = lang === 'en';
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
            operator = Math.random() < 0.5 ? '+' : '-';
            num1 = Math.floor(Math.random() * 20) + 1;
            num2 = Math.floor(Math.random() * 20) + 1;

            if (operator === '-') {
                if (num1 < num2) [num1, num2] = [num2, num1];
            }

            answer = operator === '+' ? num1 + num2 : num1 - num2;
            expression = `${num1} ${operator} ${num2}`;
        } else {
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
            setScore(prev => prev + 1);
            setTimeLeft(prev => Math.min(30, prev + 2)); 
            setProblem(generateProblem(difficulty));
            setUserAnswer('');
        } else {
            setTimeLeft(prev => Math.max(0, prev - 5)); 
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
        return () => clearInterval(timer);
    }, [gameState]);

    const getRank = (finalScore) => {
        if (isEn) {
            if (finalScore >= 30) return { name: "🧮 Human Calculator", desc: "Your brain rotates faster than a CPU!", color: "text-purple-600" };
            if (finalScore >= 20) return { name: "🎓 Math Genius", desc: "Incredible mental math skills!", color: "text-blue-600" };
            if (finalScore >= 10) return { name: "✏️ Top Student", desc: "Great performance. Aim higher next time!", color: "text-green-600" };
            return { name: "🥚 Math Rookie", desc: "Calculators are fine, but keep practicing!", color: "text-gray-500" };
        } else {
            if (finalScore >= 30) return { name: "🧮 인간 계산기", desc: "컴퓨터보다 빠른 두뇌 회전 속도!", color: "text-purple-600" };
            if (finalScore >= 20) return { name: "🎓 수학 영재", desc: "암산 실력이 대단하시네요!", color: "text-blue-600" };
            if (finalScore >= 10) return { name: "✏️ 모범생", desc: "나쁘지 않은 실력입니다. 조금 더 분발해볼까요?", color: "text-green-600" };
            return { name: "🥚 수포자", desc: "음... 계산기는 필수품이시군요?", color: "text-gray-500" };
        }
    };

    const shareResult = () => {
        const rank = getRank(score);
        const title = isEn ? 'Speed Math Challenge' : '암산 챌린지';
        const text = isEn ? `My Score: ${score} pts! Rank: ${rank.name}` : `나의 암산 점수는: ${score}점! - ${rank.name}`;
        if (navigator.share) {
            navigator.share({
                title: title,
                text: text,
                url: window.location.href,
            });
        } else {
            alert(isEn ? 'Link copied to clipboard!' : '링크가 복사되었습니다!');
            navigator.clipboard.writeText(window.location.href);
        }
    };

    const toolFaqs = isEn ? [
        { q: "Is there a time limit for the challenge?", a: "Yes, you start with 30 seconds. Correct answers add bonus time, while wrong answers incur a time penalty." },
        { q: "What happens if I pause?", a: "The timer keeps running! The game ends when time reaches zero, and your final score is recorded." },
        { q: "How are the difficulty levels different?", a: "Easy mode focuses on basic addition and subtraction. Hard mode includes multiplication, division, and larger numbers." }
    ] : [
        { q: "암산 챌린지에 시간 제한이 있나요?", a: "네, 각 문제당 주어지는 시간이 타임 스크롤 형태로 감소하여, 스피디하게 암산하고 숫자를 입력해야 하는 긴장감 넘치는 게임입니다." },
        { q: "중간에 멈추면 어떻게 되나요?", a: "시간이 모두 소진되면 게임 오버되며 그때까지 맞춘 문제 수에 기반하여 점수가 기록됩니다." },
        { q: "난이도는 어떻게 다른가요?", a: "쉬움은 초등 수준의 덧셈/뺄셈 위주이며, 어려움은 사칙연산 전체와 큰 숫자가 등장합니다." }
    ];

    const toolSteps = isEn ? [
        "Select your difficulty level to start the countdown.",
        "Calculate the mathematical expression shown in the center as quickly as possible.",
        "Type your answer using the numeric keypad or your keyboard and hit Enter.",
        "Aim for a high score by maintaining speed and accuracy to regain time."
    ] : [
        "자신에게 맞는 난이도 버튼을 눌러 게임을 시작합니다.",
        "화면 중앙에 표시되는 산수 문제를 눈으로 보자마자 빠르게 암산합니다.",
        "숫자 키패드나 키보드로 정답을 입력하고 Enter 키를 눌러 제출합니다.",
        "연속 정답으로 보너스 시간을 획득하여 최고 점수에 도전하세요."
    ];

    const toolTips = isEn ? [
        "Using a numeric keypad (Numpad) on a physical keyboard is significantly faster for high scores.",
        "Play this game every morning to wake up your brain and improve concentration for the day.",
        "Try not to overthink; go with your first mental calculation result to save previous seconds."
    ] : [
        "키보드의 텐키(우측 숫자 패드)를 활용하면 훨씬 더 빠르게 정답을 입력할 수 있습니다.",
        "매일 아침 잠을 깨기 위해, 뇌를 워밍업하고 싶을 때 플레이하면 두뇌 회전 보조제로 제격입니다.",
        "정답이 바로 떠오르지 않을 때는 너무 고민하지 말고 빠르게 다음 문제로 넘어가는 것이 유리할 수 있습니다."
    ];

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <SEO
                title={t('tools.speed-math.title')}
                description={t('tools.speed-math.description')}
                keywords={isEn ? "speed math, arithmetic game, brain training, mental math test, quick calculation" : "암산게임, 수학게임, 두뇌게임, 산수, 더하기빼기, 스피드게임"}
                faqs={toolFaqs}
                steps={toolSteps}
            />

            <div className="text-center mb-12">
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-full text-indigo-600 dark:text-indigo-400 font-black text-sm uppercase tracking-widest mb-6 border border-indigo-100 dark:border-indigo-800 animate-in fade-in slide-in-from-top-4 duration-700">
                    <Sparkles size={16} />
                    {isEn ? 'High Speed Brain Training' : '고속 두뇌 트레이닝'}
                </div>
                <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white mb-6 uppercase tracking-tighter italic animate-in fade-in duration-1000">
                    {isEn ? 'SPEED MATH' : '스피드 암산'} <span className="text-indigo-600">CHALLENGE</span>
                </h1>
                <p className="text-xl text-muted-foreground font-medium italic">
                    {isEn ? 'Show the world your mental agility!' : '당신의 뇌지컬을 증명할 시간입니다!'}
                </p>
            </div>

            <div className="max-w-xl mx-auto bg-card dark:bg-slate-800 rounded-[3rem] shadow-2xl border-4 border-border/50 overflow-hidden p-10 transition-all duration-500 min-h-[500px] flex flex-col items-center justify-center relative shadow-indigo-500/10">
                
                {gameState === 'start' && (
                    <div className="text-center animate-in fade-in zoom-in-95 duration-500 space-y-10 w-full">
                        <div className="relative inline-block scale-110">
                            <div className="absolute inset-0 bg-indigo-500/20 blur-3xl rounded-full animate-pulse" />
                            <Calculator className="w-40 h-40 text-indigo-500 mx-auto relative z-10 drop-shadow-2xl" />
                            <div className="absolute -top-4 -right-4 animate-bounce z-20">
                                <Zap className="w-14 h-14 text-yellow-400 drop-shadow-lg" fill="currentColor" />
                            </div>
                        </div>

                        <div>
                            <h2 className="text-3xl font-black text-foreground mb-3 italic uppercase tracking-widest">{isEn ? 'CHOOSE DIFFICULTY' : '난이도 선택'}</h2>
                            <p className="text-muted-foreground font-bold italic">
                                {isEn ? 'Correct adds time, wrong takes it away!' : '정답을 맞히면 시간이 추가되고, 틀리면 감소합니다.'}
                            </p>
                        </div>

                        <div className="flex flex-col gap-4 w-full px-4">
                            <button
                                onClick={() => startGame('easy')}
                                className="w-full py-6 bg-gradient-to-r from-emerald-500 to-green-600 text-white text-2xl font-black rounded-3xl shadow-xl hover:scale-105 transition-all transform active:scale-95 uppercase tracking-widest italic"
                            >
                                {isEn ? 'EASY (BASIC)' : '쉬움 (초급)' }
                            </button>
                            <button
                                onClick={() => startGame('hard')}
                                className="w-full py-6 bg-gradient-to-r from-rose-500 to-pink-600 text-white text-2xl font-black rounded-3xl shadow-xl hover:scale-105 transition-all transform active:scale-95 uppercase tracking-widest italic"
                            >
                                {isEn ? 'HARD (ADVANCED)' : '어려움 (고급)'}
                            </button>
                        </div>
                    </div>
                )}

                {gameState === 'playing' && (
                    <div className="w-full h-full flex flex-col items-center animate-in fade-in duration-300">
                        <div className="flex justify-between items-center mb-12 w-full px-2">
                            <div className="flex items-center gap-3 px-6 py-3 bg-indigo-500/10 rounded-2xl border-2 border-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-black text-2xl italic tracking-tighter">
                                <Trophy className="w-8 h-8" />
                                <span>{isEn ? 'SCORE' : '점수'}: {score}</span>
                            </div>
                            <div className={`flex items-center gap-3 px-6 py-3 rounded-2xl border-2 font-black text-2xl italic tracking-tighter transition-colors ${timeLeft < 5 ? 'bg-rose-500 border-rose-600 text-white animate-pulse' : 'bg-muted border-border text-foreground'}`}>
                                <Timer className="w-8 h-8" />
                                <span>{timeLeft}S</span>
                            </div>
                        </div>

                        <div className="mb-14 text-center">
                            <div className="text-8xl md:text-9xl font-black text-foreground font-mono tracking-tighter italic drop-shadow-xl p-8 bg-muted/30 rounded-[3rem] border-4 border-dashed border-indigo-500/30">
                                {problem.expression}
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="w-full px-4 space-y-6">
                            <input
                                ref={inputRef}
                                type="number"
                                value={userAnswer}
                                onChange={(e) => setUserAnswer(e.target.value)}
                                placeholder="?"
                                className="w-full text-center text-6xl font-black bg-muted rounded-[2rem] py-8 border-4 border-indigo-500/50 focus:border-indigo-500 focus:ring-8 focus:ring-indigo-500/20 transition-all placeholder-muted-foreground/30 italic"
                            />
                            <button
                                type="submit"
                                className="w-full py-6 bg-indigo-600 hover:bg-indigo-700 text-white text-2xl font-black rounded-[1.5rem] shadow-2xl shadow-indigo-600/30 transition-all active:scale-95 uppercase tracking-widest italic flex items-center justify-center gap-3"
                            >
                                <Target size={28} />
                                {isEn ? 'SUBMIT (ENTER)' : '정답 제출 (Enter)'}
                            </button>
                        </form>
                    </div>
                )}

                {gameState === 'gameover' && (
                    <div className="text-center animate-in zoom-in-95 duration-500 w-full space-y-8">
                        <div className="relative inline-block">
                             <Trophy className="w-32 h-32 text-yellow-500 drop-shadow-[0_0_30px_rgba(234,179,8,0.4)] mx-auto mb-2 animate-bounce" />
                             <div className="absolute -top-4 -right-4 bg-primary text-white text-xs font-black p-2 rounded-full rotate-12">STOPWATCH</div>
                        </div>
                        
                        <h2 className="text-4xl font-black text-foreground mb-1 italic uppercase tracking-tighter">{isEn ? "TIME'S UP!" : '타임오버!'}</h2>
                        <div className="text-8xl font-black text-indigo-600 dark:text-indigo-400 mb-8 font-mono tracking-tighter italic bg-indigo-500/10 py-6 rounded-[2.5rem] border-4 border border-indigo-500/30">
                            {score}<span className="text-2xl text-muted-foreground ml-2 font-bold not-italic">{isEn ? 'PTS' : '점'}</span>
                        </div>

                        <div className="bg-muted p-8 rounded-[2rem] mb-10 border-4 border-border/50 text-left relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Sparkles size={100} />
                            </div>
                            <h3 className={`text-3xl font-black mb-2 italic uppercase tracking-widest ${getRank(score).color}`}>
                                {getRank(score).name}
                            </h3>
                            <p className="text-muted-foreground font-bold italic text-lg leading-tight uppercase">
                                {getRank(score).desc}
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center w-full px-4">
                            <button
                                onClick={() => setGameState('start')}
                                className="flex-1 flex items-center justify-center py-5 bg-card hover:bg-muted border-4 border-border text-foreground rounded-2xl font-black text-lg transition-all active:scale-95 uppercase tracking-widest italic"
                            >
                                <RefreshCw className="w-6 h-6 mr-3" />
                                {isEn ? 'RETRY' : '다시하기'}
                            </button>
                            <button
                                onClick={shareResult}
                                className="flex-1 flex items-center justify-center py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-lg shadow-2xl shadow-indigo-600/30 transition-all transform active:scale-95 uppercase tracking-widest italic"
                            >
                                <Share2 className="w-6 h-6 mr-3" />
                                {isEn ? 'SHARE' : '결과 공유'}
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <div className="mt-24">
                <ToolGuide
                    title={isEn ? "The Speed Math Playbook" : "스피드 암산 챌린지 가이드"}
                    intro={isEn ? "Unlock your brain's hidden potential. Speed Math is more than just a game; it's a high-intensity workout for your prefrontal cortex. Challenge yourself to solve equations under pressure and watch your daily focus and calculation speed soar." : "잠든 뇌를 깨우는 가장 확실한 방법, 스피드 암산에 도전하세요. 본 게임은 정해진 시간 안에 최대한 많은 문제를 풀어내야 하는 고도의 집중력 훈련 도구입니다. 매일의 기록 갱신을 통해 당신의 순발력과 수리적 사고력을 극대화할 수 있습니다."}
                    steps={toolSteps}
                    tips={toolTips}
                    faqs={toolFaqs}
                />
            </div>
        </div>
    );
};

export default SpeedMath;
