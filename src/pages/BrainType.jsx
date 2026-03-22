import React, { useState } from 'react';
import { Share2, RefreshCw, Brain, Lightbulb, PenTool } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { useLanguage } from '../context/LanguageContext';

const BrainType = () => {
    const { lang } = useLanguage();
    const isEn = lang === 'en';
    const [step, setStep] = useState('intro'); // intro, test, result
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0); // Positive: Left, Negative: Right

    const questionsKo = [
        {
            id: 1,
            question: "양손 깍지를 껴보세요. 어느 쪽 엄지손가락이 위에 있나요?",
            options: [
                { text: "오른쪽 엄지가 위", type: 'L', score: 1 },
                { text: "왼쪽 엄지가 위", type: 'R', score: -1 }
            ]
        },
        {
            id: 2,
            question: "팔짱을 껴보세요. 어느 쪽 팔이 위에 있나요?",
            options: [
                { text: "오른팔이 위", type: 'L', score: 1 },
                { text: "왼팔이 위", type: 'R', score: -1 }
            ]
        },
        {
            id: 3,
            question: "다리를 꼬아 앉을 때 어느 쪽 다리가 위에 있나요?",
            options: [
                { text: "오른쪽 다리", type: 'L', score: 1 },
                { text: "왼쪽 다리", type: 'R', score: -1 }
            ]
        },
        {
            id: 4,
            question: "한쪽 눈을 감고 물체를 볼 때 어느 눈을 사용하나요?",
            options: [
                { text: "오른쪽 눈 (왼쪽 눈 감음)", type: 'L', score: 1 },
                { text: "왼쪽 눈 (오른쪽 눈 감음)", type: 'R', score: -1 }
            ]
        },
        {
            id: 5,
            question: "단어 'RED'가 파란색으로 쓰여 있습니다. 무엇이 먼저 인식되나요?",
            options: [
                { text: "글자 의미 (RED)", type: 'L', score: 2 },
                { text: "글자 색상 (파란색)", type: 'R', score: -2 }
            ]
        },
        {
            id: 6,
            question: "지도를 볼 때 나는?",
            options: [
                { text: "북쪽을 기준으로 방향을 파악한다.", type: 'L', score: 2 },
                { text: "지도를 내가 가는 방향으로 돌려서 본다.", type: 'R', score: -2 }
            ]
        },
        {
            id: 7,
            question: "그림을 그릴 때 나는?",
            options: [
                { text: "사실적으로 있는 그대로 그린다.", type: 'L', score: 1 },
                { text: "상상력을 더해 추상적으로 그린다.", type: 'R', score: -1 }
            ]
        },
        {
            id: 8,
            question: "계획을 세울 때 나는?",
            options: [
                { text: "목록을 작성하고 순서대로 진행한다.", type: 'L', score: 2 },
                { text: "큰 그림만 그리고 유동적으로 행동한다.", type: 'R', score: -2 }
            ]
        }
    ];

    const questionsEn = [
        {
            id: 1,
            question: "Clasp your hands together. Which thumb is on top?",
            options: [
                { text: "Right thumb on top", type: 'L', score: 1 },
                { text: "Left thumb on top", type: 'R', score: -1 }
            ]
        },
        {
            id: 2,
            question: "Cross your arms. Which arm is on top?",
            options: [
                { text: "Right arm on top", type: 'L', score: 1 },
                { text: "Left arm on top", type: 'R', score: -1 }
            ]
        },
        {
            id: 3,
            question: "When you cross your legs while sitting, which leg is on top?",
            options: [
                { text: "Right leg", type: 'L', score: 1 },
                { text: "Left leg", type: 'R', score: -1 }
            ]
        },
        {
            id: 4,
            question: "When you close one eye to look at an object, which eye do you use?",
            options: [
                { text: "Right eye (Close left eye)", type: 'L', score: 1 },
                { text: "Left eye (Close right eye)", type: 'R', score: -1 }
            ]
        },
        {
            id: 5,
            question: "The word 'RED' is written in blue color. What do you recognize first?",
            options: [
                { text: "Word meaning (RED)", type: 'L', score: 2 },
                { text: "Word color (Blue)", type: 'R', score: -2 }
            ]
        },
        {
            id: 6,
            question: "When you look at a map, you:",
            options: [
                { text: "Grasp direction based on North.", type: 'L', score: 2 },
                { text: "Rotate the map in the direction you are going.", type: 'R', score: -2 }
            ]
        },
        {
            id: 7,
            question: "When you draw a picture, you:",
            options: [
                { text: "Draw realistically as things are.", type: 'L', score: 1 },
                { text: "Draw abstractly with added imagination.", type: 'R', score: -1 }
            ]
        },
        {
            id: 8,
            question: "When you make a plan, you:",
            options: [
                { text: "Create a list and proceed in order.", type: 'L', score: 2 },
                { text: "Draw only the big picture and act flexibly.", type: 'R', score: -2 }
            ]
        }
    ];

    const questions = isEn ? questionsEn : questionsKo;

    const getResultEn = (finalScore) => {
        if (finalScore > 2) return {
            type: 'Left-Brain', title: 'Logical Analyst', color: 'text-blue-600', bg: 'bg-blue-50',
            desc: "You are a rational and logical left-brain person. You have excellent linguistic and mathematical skills and are strong at sequential and systematic processing. You tend to value facts and data over emotions.",
            traits: ["Planned and meticulous", "Values facts and logic", "Excellent verbal/math skills", "Realistic and cautious"]
        };
        if (finalScore < -2) return {
            type: 'Right-Brain', title: 'Intuitive Artist', color: 'text-pink-600', bg: 'bg-pink-50',
            desc: "You are an emotional and intuitive right-brain person. You have excellent spatial perception and creativity and are skilled at grasping the overall flow. You tend to value feelings and images over logic.",
            traits: ["Creative and spontaneous", "Values emotions and intuition", "Excellent art/spatial skills", "Idealistic and passionate"]
        };
        return {
            type: 'Balanced-Brain', title: 'Balanced All-Rounder', color: 'text-purple-600', bg: 'bg-purple-50',
            desc: "You are a whole-brain person who uses both the left and right brains evenly! You have a very good balance between logic and emotion, reason and intuition. You are excellent at responding flexibly to situations.",
            traits: ["Flexible thinking style", "Harmony of logic and emotion", "Great adaptability", "Versatile"]
        };
    };

    const getResultKo = (finalScore) => {
        if (finalScore > 2) return {
            type: '좌뇌형', title: '논리적인 분석가', color: 'text-blue-600', bg: 'bg-blue-50',
            desc: "당신은 이성적이고 논리적인 좌뇌형 인간입니다. 언어 능력과 수리 능력이 뛰어나며, 순차적이고 체계적인 처리에 강합니다. 감정보다는 사실과 데이터를 중시하는 경향이 있습니다.",
            traits: ["계획적이고 꼼꼼함", "사실과 논리 중시", "언어/수리 능력 우수", "현실적이고 신중함"]
        };
        if (finalScore < -2) return {
            type: '우뇌형', title: '직관적인 예술가', color: 'text-pink-600', bg: 'bg-pink-50',
            desc: "당신은 감성적이고 직관적인 우뇌형 인간입니다. 공간 지각 능력과 창의력이 뛰어나며, 전체적인 흐름을 파악하는 데 능숙합니다. 논리보다는 느낌과 이미지를 중시하는 경향이 있습니다.",
            traits: ["창의적이고 즉흥적", "감정과 직관 중시", "예술/공간 지각 능력 우수", "이상적이고 열정적"]
        };
        return {
            type: '양뇌형', title: '균형 잡힌 만능캐', color: 'text-purple-600', bg: 'bg-purple-50',
            desc: "당신은 좌뇌와 우뇌를 골고루 사용하는 양뇌형 인간입니다! 논리와 감성, 이성과 직관의 균형이 아주 잘 잡혀 있습니다. 상황에 따라 유연하게 대처하는 능력이 탁월합니다.",
            traits: ["유연한 사고 방식", "논리와 감성의 조화", "상황 적응력 뛰어남", "다재다능함"]
        };
    };

    const getResult = (finalScore) => isEn ? getResultEn(finalScore) : getResultKo(finalScore);

    const handleAnswer = (points) => {
        setScore(prev => prev + points);
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(prev => prev + 1);
        } else {
            setStep('result');
        }
    };

    const resetTest = () => {
        setStep('intro');
        setCurrentQuestion(0);
        setScore(0);
    };

    const shareResult = () => {
        const result = getResult(score);
        if (navigator.share) {
            navigator.share({
                title: isEn ? 'Left-Right Brain Test' : '좌뇌 우뇌 테스트',
                text: isEn ? `My brain type: [${result.type}] - Tool Hive` : `나의 뇌 유형은? [${result.type}] - 유틸리티 허브`,
                url: window.location.href,
            });
        } else {
            alert(isEn ? 'Link copied!' : '링크가 복사되었습니다!');
            navigator.clipboard.writeText(window.location.href);
        }
    };

    const toolFaqsEn = [
        {
            "q": "Is the Left-Right Brain Test scientific?",
            "a": "It is a simple and fun psychological test that identifies the tendencies of the brain you mainly use through unconscious physical habits (like crossing your arms)."
        },
        {
            "q": "What is the difference between left-brain and right-brain types?",
            "a": "In general, it is known that the left-brain type has strong logical and analytical tendencies, while the right-brain type has strong sensible and intuitive tendencies."
        }
    ];

    const toolFaqsKo = [
        {
            "q": "좌뇌 우뇌 테스트는 과학적인가요?",
            "a": "무의식적인 신체 습관(팔짱 끼기 등)을 통해 주로 사용하는 뇌의 성향을 파악하는 간단하고 재미있는 심리테스트입니다."
        },
        {
            "q": "좌뇌형과 우뇌형의 차이는 무엇인가요?",
            "a": "일반적으로 좌뇌형은 논리적, 분석적 성향이 강하며, 우뇌형은 감각적이고 직관적인 성향이 강하다고 알려져 있습니다."
        }
    ];

    const toolStepsEn = [
        "Cross your arms comfortably as you usually do.",
        "Check which arm or finger comes on top.",
        "Answer simple questions and check the results."
    ];

    const toolStepsKo = [
        "평소 습관대로 편안하게 팔짱을 껴봅니다.",
        "어느 쪽 팔이나 손가락이 위로 올라오는지 확인합니다.",
        "두 가지 간단한 질문에 답하고 결과를 확인합니다."
    ];

    const toolTipsEn = [
        "Don't think too long; choose based on your first unconscious action.",
        "Share the results with friends and compare each other's tendencies."
    ];

    const toolTipsKo = [
        "너무 오래 생각하지 말고 무의식적인 첫 행동을 기준으로 선택하세요.",
        "결과를 친구들과 공유해 서로의 성향을 비교해보세요."
    ];

    const toolFaqs = isEn ? toolFaqsEn : toolFaqsKo;
    const toolSteps = isEn ? toolStepsEn : toolStepsKo;
    const toolTips = isEn ? toolTipsEn : toolTipsKo;

    return (
        <div className="max-w-2xl mx-auto px-4 py-12">
            <SEO
                title={isEn ? "Left-Right Brain Test | What's your brain type? | Tool Hive" : "좌뇌 우뇌 테스트 | 나의 뇌 유형은? | Tool Hive"}
                description={isEn ? "Left/right brain test through simple actions and questions. Am I a logical left-brain or a sensitive right-brain?" : "간단한 동작과 질문으로 알아보는 좌뇌형/우뇌형 테스트. 나는 논리적인 좌뇌형일까, 감각적인 우뇌형일까?"}
                keywords={isEn ? "left right brain test, brain type, psychological test, brain test, left brain vs right brain" : "좌뇌우뇌테스트, 뇌유형, 심리테스트, 두뇌테스트, left right brain"}
                category={isEn ? "Fun" : "운세/재미"}
                faqs={toolFaqs}
                steps={toolSteps}
            />

            {step === 'intro' && (
                <div className="text-center animate-fade-in bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl">
                    <div className="flex justify-center gap-4 mb-6">
                        <Brain className="w-20 h-20 text-blue-500 animate-pulse" />
                        <Brain className="w-20 h-20 text-pink-500 animate-pulse delay-75" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black text-gray-800 dark:text-white mb-4">
                        {isEn ? 'Left-Right Brain Test' : '좌뇌 우뇌 테스트'}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                        {isEn ? (
                            <>Am I a logical analyst?<br />Or an intuitive artist?<br />Find out your brain type through physical habits and thinking styles!</>
                        ) : (
                            <>나는 논리적인 분석가일까?<br />아니면 직관적인 예술가일까?<br />신체 습관과 사고 방식으로 알아보는 나의 두뇌 유형!</>
                        )}
                    </p>
                    <button
                        onClick={() => setStep('test')}
                        className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white text-xl font-bold rounded-2xl shadow-lg transition-transform hover:scale-105"
                    >
                        {isEn ? 'Start Test' : '테스트 시작하기'}
                    </button>
                </div>
            )}

            {step === 'test' && (
                <div className="animate-fade-in">
                    <div className="mb-8 text-center text-sm text-gray-500 dark:text-gray-400">
                        {isEn ? `Question ${currentQuestion + 1} / ${questions.length}` : `질문 ${currentQuestion + 1} / ${questions.length}`}
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl text-center mb-6 min-h-[150px] flex items-center justify-center">
                        <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white leading-relaxed">
                            {questions[currentQuestion].question}
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {questions[currentQuestion].options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleAnswer(option.score)}
                                className="py-6 px-4 bg-white dark:bg-gray-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 border-2 border-transparent hover:border-indigo-500 rounded-2xl text-lg font-bold text-gray-700 dark:text-gray-200 shadow-md transition-all h-full"
                            >
                                {option.text}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {step === 'result' && (
                <div className="animate-scale-in text-center bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl">
                    <div className="mb-6 inline-block p-4 rounded-full bg-gray-50 dark:bg-gray-700">
                        {score > 2 ? <Brain className="w-20 h-20 text-blue-600" /> :
                            score < -2 ? <Lightbulb className="w-20 h-20 text-pink-600" /> :
                                <PenTool className="w-20 h-20 text-purple-600" />
                        }
                    </div>

                    <h2 className={`text-4xl font-black mb-2 ${getResult(score).color}`}>
                        {getResult(score).type}
                    </h2>
                    <h3 className="text-xl font-bold text-gray-600 dark:text-gray-300 mb-6">
                        "{getResult(score).title}"
                    </h3>

                    <div className={`p-6 rounded-2xl mb-6 ${getResult(score).bg} dark:bg-opacity-10 text-left`}>
                        <p className="text-lg text-gray-800 dark:text-gray-200 leading-relaxed font-medium mb-4">
                            {getResult(score).desc}
                        </p>
                        <div className="bg-white/60 dark:bg-gray-800/60 p-4 rounded-xl">
                            <h4 className="font-bold text-sm text-gray-500 mb-2">{isEn ? 'Key Traits' : '주요 특징'}</h4>
                            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                                {getResult(score).traits.map((trait, i) => (
                                    <li key={i}>{trait}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="flex gap-4 justify-center">
                        <button
                            onClick={resetTest}
                            className="flex-1 py-4 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-2xl font-bold transition-all flex items-center justify-center gap-2"
                        >
                            <RefreshCw className="w-5 h-5" />
                            {isEn ? 'Retry' : '다시하기'}
                        </button>
                        <button
                            onClick={shareResult}
                            className="flex-1 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold shadow-lg shadow-indigo-500/30 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-1"
                        >
                            <Share2 className="w-5 h-5" />
                            {isEn ? 'Share' : '공유하기'}
                        </button>
                    </div>
                </div>
            )}
        
            <div className="mt-12">
                <ToolGuide
                    title={isEn ? "Left-Right Brain Test Guide" : "좌뇌 우뇌 테스트 안내"}
                    intro={isEn ? "Left/right brain test through simple actions and questions. Am I a logical left-brain or a sensitive right-brain?" : "간단한 동작과 질문으로 알아보는 좌뇌형/우뇌형 테스트. 나는 논리적인 좌뇌형일까, 감각적인 우뇌형일까?"}
                    steps={toolSteps}
                    tips={toolTips}
                    faqs={toolFaqs}
                />
            </div>
        </div>
    );
};

export default BrainType;
