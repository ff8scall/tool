import React, { useState } from 'react';

import { Share2, RefreshCw, PenTool, CheckCircle2, XCircle } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';

const SpellingQuiz = () => {
    const [step, setStep] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);

    const questions = [
        {
            id: 1,
            question: "연락이 [      ] 걱정했어.",
            options: ["안돼서", "안되서"],
            answer: "안돼서",
            desc: "'안 되어'의 준말이므로 '안돼'가 맞습니다."
        },
        {
            id: 2,

            question: "내일 [      ] 뵙겠습니다.",
            options: ["봬요", "뵈요"],
            answer: "봬요",
            desc: "'봬요'는 '뵈어요'의 준말입니다. '뵈요'는 틀린 표기입니다."
        },
        {
            id: 3,
            question: "감기에 걸려서 몸이 [      ].",
            options: ["않좋아", "안좋아"],
            answer: "안좋아",
            desc: "'안'은 부사 '아니'의 준말입니다."
        },
        {
            id: 4,

            options: ["되", "돼"],
            answer: "돼",
            desc: "문장의 끝에는 '돼(되어)'를 써야 합니다."
        },
        {
            id: 5,
            question: "[      ] 없어서 못 먹어.",
            options: ["어이", "어의"],
            answer: "어이",
            desc: "'어이없다'가 올바른 표현입니다."
        },
        {
            id: 6,

            question: "감기가 씻은 듯이 [      ].",
            options: ["나았다", "낳았다"],
            answer: "나았다",
            desc: "'병이 고쳐지다'는 '낫다(나았다)'입니다. '낳다'는 출산의 의미입니다."
        },
        {
            id: 7,
            question: "무난하게 [      ] 통과했다.",
            options: ["문안하게", "무난하게"],
            answer: "무난하게",
            desc: "'별탈없이'라는 뜻은 '무난하다'입니다."
        },
        {
            id: 8,
            question: "설거지는 내가 [      ].",
            options: ["할께", "할게"],
            answer: "할게",
            desc: "종결 어미는 된소리로 발음하더라도 예사소리로 적어야 합니다. '-ㄹ게'"
        },
        {
            id: 9,
            question: "[      ] 몇 시야?",
            options: ["금새", "금세"],
            answer: "금세",
            desc: "'지금 바로'의 뜻인 '금시에'의 준말은 '금세'입니다."
        },
        {
            id: 10,
            question: "[      ] 와 주세요.",
            options: ["들러", "들려"],
            answer: "들러",
            desc: "'지나가는 길에 거치다'는 '들르다'이므로 '들러'가 맞습니다."
        }
    ];

    // Re-index and clean up questions array for real implementation
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
        if (selectedAnswer !== null) return; // Prevent double click

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
        }, 1500); // Wait 1.5s to show feedback
    };

    const resetQuiz = () => {
        setStep(0);
        setScore(0);
        setShowResult(false);
        setSelectedAnswer(null);
        setIsCorrect(null);
    };

    const getRank = () => {
        if (score === 10) return { title: "세종대왕", desc: "한글을 창제하신 세종대왕님이 흐뭇해하실 실력입니다! 완벽해요 👑", color: "text-yellow-600" };
        if (score >= 8) return { title: "집현전 학자", desc: "맞춤법 고수시군요! 웬만한 건 다 아시는군요. 🎓", color: "text-indigo-600" };
        if (score >= 5) return { title: "평범한 백성", desc: "기본적인 건 알지만 헷갈리는 게 좀 있으시네요. 조금만 더 관심을! 😊", color: "text-green-600" };
        return { title: "외국인...?", desc: "혹시 한국어가 모국어가 아니신가요? 공부가 시급합니다! 😅", color: "text-red-500" };
    };

    const shareResult = () => {
        const rank = getRank();
        if (navigator.share) {
            navigator.share({
                title: '한국어 맞춤법 능력 고사',
                text: `나의 맞춤법 점수는 ${score}점! 등급: ${rank.title} - 유틸리티 허브`,
                url: window.location.href,
            });
        } else {
            alert('링크가 복사되었습니다!');
            navigator.clipboard.writeText(window.location.href);
        }
    };

    
    const toolFaqs = [
        {
            "q": "맞춤법 퀴즈는 어떤 단어들이 나오나요?",
            "a": "되/돼, 낫/낳/낮, 어이/어의 등 성인들도 메신저에서 자주 틀려 곤란해지는 실생활 헷갈리는 맞춤법들이 주로 출제됩니다."
        },
        {
            "q": "정답 해설도 제공되나요?",
            "a": "문제를 푸신 뒤, 왜 이 단어가 맞는 표현인지 국어사전 기준의 깔끔한 설명과 올바른 예문을 제공하여 학습에 도움을 줍니다."
        }
    ];
    const toolSteps = [
        "문장 안에서 비어 있는 괄호나 밑줄 친 부분에 알맞은 단어를 보기 두어 개 중에서 고릅니다.",
        "모든 문제를 풀었다면 채점 버튼을 눌러 점수를 확인합니다.",
        "틀린 문제의 오답 노트와 해설 지문을 꼼꼼히 읽어 맞춤법을 완전히 내 것으로 만듭니다."
    ];
    const toolTips = [
        "자격증 시험 준비가 아닙니다! 친구 카톡을 볼 때 불편함 없이 바로 지적해줄 수 있는 '맞춤법 경찰'이 되기 위한 테스트라고 생각하고 가볍게 푸세요.",
        "헷갈렸던 문제들은 캡처하여 스마트폰 메모장에 따로 저장해두면 실생활 글쓰기에 아주 유용합니다."
    ];

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <SEO
                title="한국어 맞춤법 능력 고사 | 헷갈리는 맞춤법 퀴즈"
                description="안돼? 안되? 봬요? 뵈요? 자주 틀리는 한국어 맞춤법 퀴즈로 당신의 국어 실력을 테스트해보세요."
                keywords="맞춤법퀴즈, 한글맞춤법, 띄어쓰기, 국어문법, 맞춤법검사, 한국어테스트"
                category="간단 상식 테스트"
                faqs={toolFaqs}
                steps={toolSteps}
            />

            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4 animate-fade-in">
                    ✍️ 한국어 맞춤법 능력 고사
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                    당신의 맞춤법 실력은 상위 몇 프로일까요?
                </p>
            </div>

            <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden p-8 transition-all duration-300 min-h-[400px] flex flex-col justify-center">
                {!showResult ? (
                    <div className="animate-fade-in">
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-sm font-bold text-indigo-500">
                                문제 {step + 1} / {quizData.length}
                            </span>
                            <span className="text-sm font-medium text-gray-400">
                                현재 점수: {score}
                            </span>
                        </div>

                        <div className="mb-10 text-center">
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-white leading-relaxed break-keep">
                                {quizData[step].question}
                            </h2>
                        </div>

                        <div className="space-y-4">
                            {quizData[step].options.map((option, index) => {
                                const isSelected = selectedAnswer === option;
                                const isAnswer = option === quizData[step].answer;

                                let buttonClass = "bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 border-2 border-transparent text-gray-800 dark:text-gray-200";

                                if (selectedAnswer) {
                                    if (isSelected) {
                                        buttonClass = isCorrect
                                            ? "bg-green-100 dark:bg-green-900/30 border-green-500 text-green-700 dark:text-green-300"
                                            : "bg-red-100 dark:bg-red-900/30 border-red-500 text-red-700 dark:text-red-300";
                                    } else if (isAnswer) {
                                        // Show correct answer if user picked wrong
                                        buttonClass = "bg-green-100 dark:bg-green-900/30 border-green-500 text-green-700 dark:text-green-300 opacity-70";
                                    } else {
                                        buttonClass = "bg-gray-50 dark:bg-gray-700 opacity-50";
                                    }
                                }

                                return (
                                    <button
                                        key={index}
                                        onClick={() => handleAnswer(option)}
                                        disabled={selectedAnswer !== null}
                                        className={`w-full py-4 rounded-xl text-xl font-bold transition-all ${buttonClass}`}
                                    >
                                        <div className="flex items-center justify-center">
                                            {option}
                                            {selectedAnswer && isAnswer && <CheckCircle2 className="w-6 h-6 ml-2" />}
                                            {selectedAnswer && isSelected && !isCorrect && <XCircle className="w-6 h-6 ml-2" />}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        {selectedAnswer && (
                            <div className={`mt-6 p-4 rounded-xl text-center text-sm font-medium animate-fade-in ${isCorrect ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
                                }`}>
                                {isCorrect ? "정답입니다! 👏" : "땡! 틀렸습니다 😅"}
                                <p className="mt-1 text-gray-600 dark:text-gray-400 font-normal">
                                    {quizData[step].desc}
                                </p>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="text-center animate-scale-in">
                        <PenTool className="w-20 h-20 text-indigo-500 mx-auto mb-6" />

                        <div className="mb-8">
                            <span className="text-gray-500 dark:text-gray-400">당신의 점수는</span>
                            <div className="text-6xl font-black text-indigo-600 dark:text-indigo-400 my-2">
                                {score} <span className="text-2xl text-gray-400 font-bold">/ {quizData.length}</span>
                            </div>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-2xl mb-8">
                            <h3 className={`text-2xl font-bold mb-2 ${getRank().color}`}>
                                {getRank().title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                {getRank().desc}
                            </p>
                        </div>

                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={resetQuiz}
                                className="flex items-center px-6 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-xl font-bold transition-all"
                            >
                                <RefreshCw className="w-5 h-5 mr-2" />
                                다시하기
                            </button>
                            <button
                                onClick={shareResult}
                                className="flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-500/30 transition-all transform hover:-translate-y-1"
                            >
                                <Share2 className="w-5 h-5 mr-2" />
                                결과 공유
                            </button>
                        </div>
                    </div>
                )}
            </div>

            
        
            <div className="mt-12">
                <ToolGuide
                    title="한국어 맞춤법 능력 고사 안내"
                    intro="안돼? 안되? 봬요? 뵈요? 자주 틀리는 한국어 맞춤법 퀴즈로 당신의 국어 실력을 테스트해보세요."
                    steps={toolSteps}
                    tips={toolTips}
                    faqs={toolFaqs}
                />
            </div>
        </div>
    );
};

export default SpellingQuiz;
