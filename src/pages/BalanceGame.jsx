import React, { useState } from 'react';
import { Share2, RefreshCw, Scale, ArrowRight, CheckCircle2 } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { useLanguage } from '../context/LanguageContext';

const BalanceGame = () => {
    const { lang } = useLanguage();
    const isEn = lang === 'en';
    const [step, setStep] = useState(0);
    const [history, setHistory] = useState([]); // Stores user choices
    const [showStats, setShowStats] = useState(false); // To show stats after selection
    const [currentStats, setCurrentStats] = useState({ a: 50, b: 50 });

    const questions = isEn ? [
        {
            id: 1,
            title: "If you had to eat only one food for the rest of your life?",
            optionA: "Ramen",
            optionB: "Fried Chicken"
        },
        {
            id: 2,
            title: "Summer vs Winter, which season is worse?",
            optionA: "Summer without AC",
            optionB: "Winter without Heating"
        },
        {
            id: 3,
            title: "If you could have one superpower?",
            optionA: "Time Travel to Past",
            optionB: "See the Future"
        },
        {
            id: 4,
            title: "If you were born again?",
            optionA: "Rich family (Random face)",
            optionB: "Extremely attractive (Average income)"
        },
        {
            id: 5,
            title: "Which type of friend is worse?",
            optionA: "Ghosting on the day of meeting",
            optionB: "Always 1 hour late"
        },
        {
            id: 6,
            title: "When your phone is dying?",
            optionA: "1% battery but with WiFi",
            optionB: "100% battery but no Internet"
        },
        {
            id: 7,
            title: "Choosing a boss",
            optionA: "Kind but incompetent",
            optionB: "Rude but highly efficient"
        },
        {
            id: 8,
            title: "If you win the lottery (1st prize)?",
            optionA: "Tell no one",
            optionB: "Tell only family"
        },
        {
            id: 9,
            title: "10-year friendship vs $100,000?",
            optionA: "Take money and cut ties",
            optionB: "Keep friend (Get $0)"
        },
        {
            id: 10,
            title: "Which is more unforgivable in a relationship?",
            optionA: "Partner drinking alone with 'just a friend' (opposite gender)",
            optionB: "Partner keeping in touch with an Ex"
        }
    ] : [
        {
            id: 1,
            title: "평생 한 가지 음식만 먹어야 한다면?",
            optionA: "라면",
            optionB: "치킨"
        },
        {
            id: 2,
            title: "여름 vs 겨울, 더 싫은 계절은?",
            optionA: "에어컨 없는 여름",
            optionB: "보일러 고장난 겨울"
        },
        {
            id: 3,
            title: "초능력을 가질 수 있다면?",
            optionA: "과거로 가는 능력",
            optionB: "미래를 보는 능력"
        },
        {
            id: 4,
            title: "다시 태어난다면?",
            optionA: "재벌 2세 (얼굴 랜덤)",
            optionB: "존잘/존예 (평범한 집안)"
        },
        {
            id: 5,
            title: "친구와의 약속, 더 나쁜 것은?",
            optionA: "약속 당일 잠수타는 친구",
            optionB: "약속 시간마다 1시간 늦는 친구"
        },
        {
            id: 6,
            title: "핸드폰 배터리가 없을 때?",
            optionA: "배터리 1%인데 와이파이 됨",
            optionB: "배터리 100%인데 인터넷 안됨"
        },
        {
            id: 7,
            title: "직장 상사 고르기",
            optionA: "일 못하는데 착한 상사",
            optionB: "일 잘하는데 성격 더러운 상사"
        },
        {
            id: 8,
            title: "로또 1등에 당첨된다면?",
            optionA: "아무한테도 말 안 한다",
            optionB: "가족한테만 말한다"
        },
        {
            id: 9,
            title: "10년지기 이성 친구",
            optionA: "1억 받고 절교하기",
            optionB: "그냥 지내기 (돈 0원)"
        },
        {
            id: 10,
            title: "연인 사이에 더 용서할 수 없는 것은?",
            optionA: "이성 친구와 단둘이 술 마시기",
            optionB: "전 연인과 연락하며 지내기"
        }
    ];

    const generateRandomStats = () => {
        // Generate random percentage between 30 and 70 for Option A
        const percentA = Math.floor(Math.random() * (70 - 30 + 1)) + 30;
        return { a: percentA, b: 100 - percentA };
    };

    const handleSelect = (choice) => {
        if (showStats) return;

        const stats = generateRandomStats();
        setCurrentStats(stats);
        setShowStats(true);

        const newHistory = [...history, { questionId: questions[step].id, choice, stats }];
        setHistory(newHistory);

        // Auto advance after delay
        setTimeout(() => {
            if (step < questions.length) {
                setShowStats(false);
                setStep(step + 1);
            }
        }, 1500);
    };

    const resetGame = () => {
        setStep(0);
        setHistory([]);
        setShowStats(false);
    };

    const shareResult = () => {
        const text = isEn 
            ? "Check out my choices in the Balance Game! Compare yours with mine." 
            : "나의 밸런스 게임 결과는? 당신의 선택과 비교해보세요!";
        if (navigator.share) {
            navigator.share({
                title: isEn ? 'The Balance Game' : '밸런스 게임',
                text: text,
                url: window.location.href,
            });
        } else {
            alert(isEn ? 'Link copied to clipboard!' : '링크가 복사되었습니다!');
            navigator.clipboard.writeText(window.location.href);
        }
    };

    const toolFaqs = isEn ? [
        { q: "What is the Balance Game?", a: "It's a game where you must choose between two extreme or difficult options. It's often used to explore people's values and preferences." },
        { q: "Is there a right answer?", a: "No! There are no right or wrong answers. It's purely for fun to see your personal preferences and compare them with others." },
        { q: "Are the percentages real?", a: "In the current version, the percentages are simulated for entertainment to add tension and fun to the experience." }
    ] : [
        { q: "밸런스 게임이 무엇인가요?", a: "두 개의 매우 극단적이거나 고르기 힘든 선택지 중 하나를 무조건 선택해야 하는 게임입니다. 사람들의 극단적인 가치관과 취향을 알아보는 용도로 많이 쓰입니다." },
        { q: "정답이 있는 게임인가요?", a: "아닙니다! 오답이나 정답은 없으며 오로지 플레이어의 개인적인 선호도와 가치관을 알아보기 위한 재미 콘텐츠입니다." },
        { q: "화면에 나오는 % 수치는 실제 사람들의 선택인가요?", a: "현재 버전은 각 답변이 완료된 후 재미를 위해 무작위(가상) 대중 선택 비율을 제공하여 쫄깃한 긴장감을 더합니다." }
    ];

    const toolSteps = isEn ? [
        "Read the two extreme choices provided on the screen.",
        "Think about which one is better (or less worse) for you and click it.",
        "Check the percentage to see if your opinion aligns with the majority or minority.",
        "Complete all 10 questions and share your results with friends to start a debate!"
    ] : [
        "화면에 제시되는 극강의 밸런스 질문 두 가지(A, B)를 확인합니다.",
        "둘 중 어느 것이 나에게 더 중요한지, 혹은 덜 최악인지 고민 후 하나를 클릭합니다.",
        "클릭 즉시 나타나는 % 수치를 통해 나의 의견이 대중적인지 혹은 소수파인지 확인합니다.",
        "10개의 질문이 끝나면 기록을 확인하고 친구에게 링크를 공유하여 논쟁을 시작합니다!"
    ];

    const toolTips = isEn ? [
        "The charm of this game is to pick intuitively within 3 seconds.",
        "Play with friends or partners and announce your choice at the same time.",
        "Capture your result screen and post it on social media to spark interesting conversations."
    ] : [
        "절대 고를 수 없는 문제라도 직관적으로 '3초' 안에 고르는 것이 이 게임의 묘미입니다.",
        "친구, 연인과 함께 모여서 동시에 하나 둘 셋! 을 외치고 선택해보세요.",
        "결과 화면을 캡처하여 인스타그램이나 카카오톡 단톡방에 올리면 아주 뜨거운 토론이 열립니다."
    ];

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <SEO
                title={isEn ? "Ultimate Balance Game | Would You Rather Quiz | Tool Hive" : "밸런스 게임 | 황금밸런스 질문 모음 | Tool Hive"}
                description={isEn ? "The ultimate 'Would You Rather' challenge! From food choices to life-changing dilemmas, test your decision-making in the Balance Game." : "인생 최대의 난제! 짜장 vs 짬뽕부터 상상 초월 밸런스 게임까지. 친구, 연인과 함께 즐기는 재밌는 밸런스 게임 질문 모음."}
                keywords={isEn ? "balance game, would you rather, life dilemmas, personality test, fun quiz" : "밸런스게임, 밸런스질문, vs게임, 심리테스트, 재미있는게임, 커플밸런스게임"}
                category="Luck/Fun"
                faqs={toolFaqs}
                steps={toolSteps}
            />

            <div className="text-center mb-12">
                <div className="inline-block p-4 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mb-6">
                    <Scale size={48} className="text-indigo-600 dark:text-indigo-400" />
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 tracking-tighter italic uppercase">
                    {isEn ? 'The Balance Game' : '밸런스 게임'}
                </h1>
                <p className="text-xl text-muted-foreground font-medium italic">
                    {isEn ? "Life's hardest choices. What will you pick?" : "선택장애 유발! 당신의 선택은?"}
                </p>
            </div>

            <div className="max-w-3xl mx-auto">
                {step < questions.length ? (
                    <div className="bg-card dark:bg-slate-800 rounded-[3rem] shadow-2xl overflow-hidden p-8 md:p-14 border-4 border-slate-200 dark:border-slate-700 transition-all min-h-[500px] flex flex-col justify-center animate-in fade-in duration-500 relative">
                        {/* Progress Bar */}
                        <div className="absolute top-0 left-0 w-full h-3 bg-slate-100 dark:bg-slate-900">
                            <div
                                className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-300"
                                style={{ width: `${((step) / questions.length) * 100}%` }}
                            ></div>
                        </div>

                        <div className="text-center mb-12 mt-8">
                            <span className="inline-block px-4 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded-full text-xs font-black uppercase tracking-widest mb-6">
                                {isEn ? 'CHALLENGE' : '질문'} {step + 1}
                            </span>
                            <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white leading-tight italic tracking-tighter">
                                {questions[step].title}
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative items-stretch">
                            {/* Option A */}
                            <button
                                onClick={() => handleSelect('A')}
                                disabled={showStats}
                                className={`relative group p-10 rounded-[2.5rem] border-4 transition-all duration-300 transform hover:scale-[1.02] flex flex-col items-center justify-center min-h-[220px] shadow-xl
                                ${showStats
                                        ? (history[step]?.choice === 'A' ? 'border-rose-500 bg-rose-50 dark:bg-rose-900/20' : 'border-slate-200 opacity-40 grayscale pointer-events-none')
                                        : 'border-rose-200 hover:border-rose-500 bg-white dark:bg-slate-700 hover:bg-rose-50 dark:hover:bg-rose-900/10'
                                    }`}
                            >
                                <span className={`text-5xl font-black mb-4 italic ${showStats && history[step]?.choice === 'A' ? 'text-rose-600' : 'text-rose-400 opacity-50'}`}>A</span>
                                <span className="text-xl md:text-2xl font-black text-gray-800 dark:text-white break-keep text-center leading-tight">{questions[step].optionA}</span>

                                {showStats && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-white/90 dark:bg-slate-800/90 rounded-[2.2rem] animate-in zoom-in duration-300">
                                        <span className="text-6xl font-black text-rose-600 italic">{currentStats.a}%</span>
                                    </div>
                                )}
                            </button>

                            {/* VS Badge */}
                            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 hidden md:flex items-center justify-center">
                                <div className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 w-16 h-16 rounded-full flex items-center justify-center font-black text-2xl italic shadow-2xl ring-8 ring-card dark:ring-slate-800">
                                    VS
                                </div>
                            </div>

                            {/* Option B */}
                            <button
                                onClick={() => handleSelect('B')}
                                disabled={showStats}
                                className={`relative group p-10 rounded-[2.5rem] border-4 transition-all duration-300 transform hover:scale-[1.02] flex flex-col items-center justify-center min-h-[220px] shadow-xl
                                ${showStats
                                        ? (history[step]?.choice === 'B' ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' : 'border-slate-200 opacity-40 grayscale pointer-events-none')
                                        : 'border-indigo-200 hover:border-indigo-500 bg-white dark:bg-slate-700 hover:bg-indigo-50 dark:hover:bg-indigo-900/10'
                                    }`}
                            >
                                <span className={`text-5xl font-black mb-4 italic ${showStats && history[step]?.choice === 'B' ? 'text-indigo-600' : 'text-indigo-400 opacity-50'}`}>B</span>
                                <span className="text-xl md:text-2xl font-black text-gray-800 dark:text-white break-keep text-center leading-tight">{questions[step].optionB}</span>

                                {showStats && (
                                    <div className="absolute inset-0 flex items-center justify-center bg-white/90 dark:bg-slate-800/90 rounded-[2.2rem] animate-in zoom-in duration-300">
                                        <span className="text-6xl font-black text-indigo-600 italic">{currentStats.b}%</span>
                                    </div>
                                )}
                            </button>
                        </div>

                        {showStats && (
                            <p className="text-center text-sm font-black text-indigo-500 mt-10 animate-pulse uppercase tracking-widest italic">
                                {isEn ? "Moving to next dilemma..." : "다음 질문으로 넘어갑니다..."}
                            </p>
                        )}
                    </div>
                ) : (
                    <div className="bg-card dark:bg-slate-800 rounded-[3rem] shadow-2xl overflow-hidden p-10 border-4 border-slate-200 dark:border-slate-700 animate-in zoom-in duration-500">
                        <div className="text-center mb-10">
                            <div className="inline-block p-4 bg-yellow-100 dark:bg-yellow-900/30 rounded-[2rem] mb-6">
                                <CheckCircle2 className="w-16 h-16 text-yellow-600 dark:text-yellow-400" />
                            </div>
                            <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-3 italic tracking-tighter uppercase">{isEn ? 'SESSION ENDED' : '게임 종료!'}</h2>
                            <p className="text-xl text-muted-foreground font-medium italic">
                                {isEn ? "You've made some tough choices!" : "당신의 취향은 확고하시군요!"}
                            </p>
                        </div>

                        <div className="space-y-4 mb-10 max-h-[400px] overflow-y-auto pr-4 custom-scrollbar">
                            {history.map((record, index) => (
                                <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 bg-slate-50 dark:bg-slate-700/50 rounded-[2rem] border-2 border-border/50 hover:border-indigo-200 transition-all group">
                                    <div className="flex-1">
                                        <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-2 italic opacity-60">{questions[index].title}</p>
                                        <p className={`text-xl font-black italic tracking-tight ${record.choice === 'A' ? 'text-rose-600' : 'text-indigo-600'}`}>
                                            {record.choice === 'A' ? questions[index].optionA : questions[index].optionB}
                                        </p>
                                    </div>
                                    <div className="text-right mt-4 sm:mt-0 pt-4 sm:pt-0 border-t sm:border-0 border-dashed border-border/50 w-full sm:w-auto">
                                        <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1 italic">{isEn ? 'MAJORITY' : '대중의 선택'}</div>
                                        <span className="text-2xl font-black text-slate-800 dark:text-white font-mono italic">
                                            {record.choice === 'A' ? record.stats.a : record.stats.b}%
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={resetGame}
                                className="flex-1 flex items-center justify-center px-8 py-5 bg-slate-900 text-white rounded-2xl font-black text-lg hover:scale-105 transition-all shadow-xl active:scale-95 italic uppercase"
                            >
                                <RefreshCw className="w-6 h-6 mr-3" />
                                {isEn ? 'RESTART' : '다시하기'}
                            </button>
                            <button
                                onClick={shareResult}
                                className="flex-1 flex items-center justify-center px-8 py-5 bg-primary text-white rounded-2xl font-black text-lg hover:scale-105 transition-all shadow-xl shadow-primary/20 active:scale-95 italic uppercase"
                            >
                                <Share2 className="w-6 h-6 mr-3" />
                                {isEn ? 'SHARE' : '결과 공유'}
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <div className="mt-20">
                <ToolGuide
                    title={isEn ? "The Art of Balance" : "밸런스 게임 안내"}
                    intro={isEn ? "Life is a collection of choices. The Balance Game presents you with impossible dilemmas to test your intuition and values. It is a fantastic icebreaker for social gatherings and a fun way to learn more about yourself and those around you." : "인생 최대의 난제 모음! 도저히 하나를 포기할 수 없거나, 둘 다 최악인 황금 밸런스 상황에서 당신의 선택을 테스트합니다. 친해지고 싶은 사람과 함께 플레이하며 다양한 가치관을 확인해보세요."}
                    steps={toolSteps}
                    tips={toolTips}
                    faqs={toolFaqs}
                />
            </div>
        </div>
    );
};

export default BalanceGame;
