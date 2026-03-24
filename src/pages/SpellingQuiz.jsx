import React, { useState } from 'react';
import { Share2, RefreshCw, PenTool, CheckCircle2, XCircle } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { useLanguage } from '../context/LanguageContext';

const SpellingQuiz = () => {
    const { lang, t } = useLanguage();
    const isEn = lang === 'en';
    const [step, setStep] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);

    const quizData = [
        {
            id: 1,
            question: "연락이 [      ] 걱정했어.",
            options: ["안돼서", "안되서"],
            answer: "안돼서",
            desc: "'안 되어'의 준말이므로 '안돼'가 맞습니다. ('하'를 넣어 말이 되면 '돼', 아니면 '되' - 안해서(O) -> 안돼서)"
        },
        {
            id: 2,
            question: "내일 [      ] 뵙겠습니다.",
            options: ["봬요", "뵈요"],
            answer: "봬요",
            desc: "'봬요'는 '뵈어요'의 준말입니다. '하요/해요'를 넣어보세요. (해요 -> 봬요)"
        },
        {
            id: 3,
            question: "감기에 걸려서 몸이 [      ].",
            options: ["않좋아", "안좋아"],
            answer: "안좋아",
            desc: "'안'은 '아니'의 준말, '않'은 '아니하'의 준말입니다. '안 좋다'가 맞습니다."
        },
        {
            id: 4,
            question: "그러면 안 [      ].",
            options: ["되", "돼"],
            answer: "돼",
            desc: "문장의 끝이나 조사 앞에서는 '돼(되어)'를 씁니다. ('하'를 넣어 말이 안 되면 '되', 되면 '돼')"
        },
        {
            id: 5,
            question: "[      ] 없어서 말이 안 나오네.",
            options: ["어이", "어의"],
            answer: "어이",
            desc: "'어처구니가 없다'와 같은 말로 '어이없다'가 표준어입니다."
        },
        {
            id: 6,
            question: "감기가 씻은 듯이 [      ].",
            options: ["나았다", "낳았다"],
            answer: "나았다",
            desc: "'병이 치유되다'는 '낫다'의 활용형 '나았다'를 씁니다. '낳다'는 아기를 출산하다 입니다."
        },
        {
            id: 7,
            question: "시험을 [      ] 통과했다.",
            options: ["문안하게", "무난하게"],
            answer: "무난하게",
            desc: "'이렇다 할 단점이나 흠이 없다'는 '무난하다'입니다."
        },
        {
            id: 8,
            question: "설거지는 내가 [      ].",
            options: ["할께", "할게"],
            answer: "할게",
            desc: "발음은 [할께]로 나지만, 표기는 '할게'가 맞습니다. (의문형인 -ㄹ까? 만 된소리 표기)"
        },
        {
            id: 9,
            question: "약효가 [      ] 나타났다.",
            options: ["금새", "금세"],
            answer: "금세",
            desc: "'금시에'가 줄어든 말로 '금세'가 맞습니다."
        },
        {
            id: 10,
            question: "집에 오는 길에 마트에 [      ].",
            options: ["들러", "들려"],
            answer: "들러",
            desc: "'들르다'가 기본형이므로 활용형은 '들러'가 됩니다. '들려'는 '듣다'의 피동형입니다."
        }
    ];

    const handleAnswer = (choice) => {
        if (selectedAnswer !== null) return;

        setSelectedAnswer(choice);
        const correct = choice === quizData[step].answer;
        setIsCorrect(correct);

        if (correct) {
            setScore(prev => prev + 1);
        }

        setTimeout(() => {
            if (step < quizData.length - 1) {
                setStep(step + 1);
                setSelectedAnswer(null);
                setIsCorrect(null);
            } else {
                setShowResult(true);
            }
        }, 1500);
    };

    const resetQuiz = () => {
        setStep(0);
        setScore(0);
        setShowResult(false);
        setSelectedAnswer(null);
        setIsCorrect(null);
    };

    const getRank = () => {
        if (score === 10) return { title: isEn ? "King Sejong" : "세종대왕", desc: isEn ? "Perfect! King Sejong would be proud of your Korean skills. 👑" : "한글을 창제하신 세종대왕님이 흐뭇해하실 실력입니다! 완벽해요 👑", color: "text-yellow-600" };
        if (score >= 8) return { title: isEn ? "Jiphyeonjeon Scholar" : "집현전 학자", desc: isEn ? "You're a spelling master! You know almost everything. 🎓" : "맞춤법 고수시군요! 웬만한 건 다 아시는군요. 🎓", color: "text-indigo-600" };
        if (score >= 5) return { title: isEn ? "Commoner" : "평범한 백성", desc: isEn ? "You know the basics but still get confused sometimes. Keep going! 😊" : "기본적인 건 알지만 헷갈리는 게 좀 있으시네요. 조금만 더 관심을! 😊", color: "text-green-600" };
        return { title: isEn ? "Beginner...?" : "외국인...?", desc: isEn ? "Is Korean your native language? You need some serious study! 😅" : "혹시 한국어가 모국어가 아니신가요? 공부가 시급합니다! 😅", color: "text-red-500" };
    };

    const shareResult = () => {
        const rank = getRank();
        const text = isEn ? `My Korean Spelling score is ${score}! Rank: ${rank.title}` : `나의 맞춤법 점수는 ${score}점! 등급: ${rank.title} - 유틸리티 허브`;
        if (navigator.share) {
            navigator.share({
                title: isEn ? 'Korean Spelling Ability Test' : '한국어 맞춤법 능력 고사',
                text: text,
                url: window.location.href,
            });
        } else {
            alert(isEn ? 'Link copied to clipboard!' : '링크가 복사되었습니다!');
            navigator.clipboard.writeText(window.location.href);
        }
    };

    const toolFaqs = t('tools.spelling-quiz.faqs', { returnObjects: true }) || [];
    const toolSteps = t('tools.spelling-quiz.steps', { returnObjects: true }) || [];

    const toolTips = isEn ? [
        "Focus on the sound and meaning; often the origin of the word gives a clue.",
        "Try substituting different verb endings to see which one sounds more natural.",
        "Don't take it too seriously; it's a fun way to learn the nuances of the Korean language!"
    ] : [
        "자격증 시험 준비가 아닙니다! 실생활에서 당당해지기 위한 테스트라고 생각하고 가볍게 푸세요.",
        "헷갈렸던 문제들은 캡처하여 저장해두면 나중에 글을 쓸 때 아주 유용합니다.",
        "친구들과 점수 내기를 해서 꼴찌가 간식을 쏘는 게임으로 활용해보세요."
    ];

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <SEO
                title={t('tools.spelling-quiz.title')}
                description={t('tools.spelling-quiz.description')}
                keywords={isEn ? "korean spelling quiz, learn korean grammar, choseong quiz, hangul test" : "맞춤법퀴즈, 한글맞춤법, 국어문법, 한국어테스트, 맞춤법교정"}
                faqs={toolFaqs}
                steps={toolSteps}
            />

            <div className="text-center mb-10">
                <div className="inline-block p-4 bg-primary/10 rounded-full mb-6">
                    <PenTool size={48} className="text-primary" />
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 tracking-tight uppercase italic">
                    {isEn ? 'K-Spelling Test' : '한국어 맞춤법 능력 고사'}
                </h1>
                <p className="text-xl text-muted-foreground font-medium">
                    {isEn ? 'How accurate is your Korean grammar?' : '당신의 맞춤법 실력은 상위 몇 프로일까요?'}
                </p>
            </div>

            <div className="max-w-xl mx-auto bg-card dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden p-10 border-2 border-border/50 transition-all min-h-[450px] flex flex-col justify-center">
                {!showResult ? (
                    <div className="animate-in fade-in duration-500">
                        <div className="flex justify-between items-center mb-10">
                            <span className="text-xs font-black uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
                                {isEn ? 'Question' : '문제'} {step + 1} / {quizData.length}
                            </span>
                            <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                                {isEn ? 'Score' : '현재 점수'}: {score}
                            </span>
                        </div>

                        <div className="mb-12 text-center">
                            <h2 className="text-2xl md:text-3xl font-black text-foreground leading-tight tracking-tight break-keep italic">
                                "{quizData[step].question}"
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            {quizData[step].options.map((option, index) => {
                                const isSelected = selectedAnswer === option;
                                const isAnswer = option === quizData[step].answer;

                                let buttonStyle = "bg-muted/40 hover:bg-muted/60 border-4 border-transparent text-foreground shadow-sm";

                                if (selectedAnswer) {
                                    if (isSelected) {
                                        buttonStyle = isCorrect
                                            ? "bg-green-500 border-green-600 text-white shadow-lg shadow-green-500/20"
                                            : "bg-rose-500 border-rose-600 text-white shadow-lg shadow-rose-500/20";
                                    } else if (isAnswer) {
                                        buttonStyle = "bg-green-500/20 border-green-500/50 text-green-600";
                                    } else {
                                        buttonStyle = "opacity-30 grayscale pointer-events-none";
                                    }
                                }

                                return (
                                    <button
                                        key={index}
                                        onClick={() => handleAnswer(option)}
                                        disabled={selectedAnswer !== null}
                                        className={`w-full py-5 rounded-2xl text-2xl font-black transition-all transform active:scale-95 ${buttonStyle}`}
                                    >
                                        <div className="flex items-center justify-center gap-3">
                                            {option}
                                            {selectedAnswer && isAnswer && <CheckCircle2 size={24} />}
                                            {selectedAnswer && isSelected && !isCorrect && <XCircle size={24} />}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        {selectedAnswer && (
                            <div className={`mt-8 p-6 rounded-2xl animate-in slide-in-from-top-4 duration-300 border-2 ${isCorrect ? "bg-green-50 border-green-100 text-green-800" : "bg-rose-50 border-rose-100 text-rose-800"
                                } shadow-lg`}>
                                <div className="font-black text-lg mb-2 flex items-center gap-2">
                                    {isCorrect ? (isEn ? "Correct! 👏" : "정답입니다! 👏") : (isEn ? "Oops! WRONG 😅" : "땡! 틀렸습니다 😅")}
                                </div>
                                <p className="text-sm font-medium leading-relaxed italic border-t border-black/5 pt-3">
                                    {quizData[step].desc}
                                </p>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="text-center animate-in zoom-in duration-500 space-y-8">
                        <div className="relative inline-block">
                            <PenTool size={100} className="text-primary opacity-20" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Trophy size={64} className="text-yellow-500 drop-shadow-lg" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <span className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground">{isEn ? 'G Grade' : '최종 국어 성적'}</span>
                            <div className="text-8xl font-black text-primary italic tracking-tighter">
                                {score} <span className="text-3xl text-muted font-bold tracking-normal">/ {quizData.length}</span>
                            </div>
                        </div>

                        <div className="bg-muted/30 p-8 rounded-3xl border border-border/50 shadow-inner">
                            <h3 className={`text-4xl font-black mb-3 italic uppercase tracking-tighter ${getRank().color}`}>
                                {getRank().title}
                            </h3>
                            <p className="font-bold text-muted-foreground leading-relaxed">
                                {getRank().desc}
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                            <button
                                onClick={resetQuiz}
                                className="flex-1 flex items-center justify-center px-8 py-5 bg-slate-900 text-white rounded-2xl font-black text-lg hover:scale-105 transition-all shadow-xl active:scale-95"
                            >
                                <RefreshCw size={24} className="mr-3" />
                                {isEn ? 'RETRY' : '다시하기'}
                            </button>
                            <button
                                onClick={shareResult}
                                className="flex-1 flex items-center justify-center px-8 py-5 bg-primary text-white rounded-2xl font-black text-lg hover:scale-105 transition-all shadow-xl shadow-primary/20 active:scale-95"
                            >
                                <Share2 size={24} className="mr-3" />
                                {isEn ? 'SHARE' : '결과 공유'}
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <div className="mt-20">
                <ToolGuide
                    title={isEn ? "The K-Spelling Guide" : "한국어 맞춤법 능력 고사 안내"}
                    intro={isEn ? "Korean spelling can be tricky even for native speakers. This quiz focuses on commonly confused words used in daily life, helping you improve your written communication and professional image." : "안돼? 안되? 봬요? 뵈요? 평소 카톡이나 메일에서 무심코 사용하던 표현 중 자주 틀리는 한국어 맞춤법 퀴즈입니다. 단순한 재미를 넘어 여러분의 올바른 언어 생활을 돕기 위해 제작되었습니다."}
                    steps={toolSteps}
                    tips={toolTips}
                    faqs={toolFaqs}
                />
            </div>
        </div>
    );
};

export default SpellingQuiz;
