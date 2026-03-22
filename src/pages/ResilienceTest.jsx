import React, { useState } from 'react';

import { Share2, RefreshCw, Shield, Zap, TrendingUp, Anchor } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';

const ResilienceTest = () => {
    const [step, setStep] = useState('intro'); // intro, test, result
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);

    const questions = [
        {
            id: 1,
            question: "중요한 프로젝트에서 큰 실수를 했다. 당신의 반응은?",
            options: [
                { text: "실수는 누구나 해. 수습하고 배우면 되지.", score: 5 },
                { text: "아... 왜 그랬지? 하루 종일 자책한다.", score: 2 },
                { text: "내 능력 부족인가? 때려치우고 싶다.", score: 0 },
                { text: "남 탓을 하거나 도망가고 싶다.", score: 1 }
            ]
        },
        {
            id: 2,
            question: "갑자기 예상치 못한 나쁜 일이 닥쳤을 때?",
            options: [
                { text: "패닉 상태가 되어 아무것도 못한다.", score: 0 },
                { text: "일단 상황을 파악하고 해결책을 찾는다.", score: 5 },
                { text: "주변 사람들에게 하소연부터 한다.", score: 3 },
                { text: "시간이 해결해 주겠지 하고 회피한다.", score: 2 }
            ]
        },
        {
            id: 3,
            question: "스트레스를 받을 때 나만의 해소법이 있나?",
            options: [
                { text: "확실한 해소법이 있어서 금방 푼다.", score: 5 },
                { text: "술이나 폭식으로 푼다.", score: 1 },
                { text: "해소법이 딱히 없어 쌓아둔다.", score: 0 },
                { text: "잠을 푹 자거나 휴식을 취한다.", score: 4 }
            ]
        },
        {
            id: 4,
            question: "다른 사람의 비판을 들었을 때?",
            options: [
                { text: "나를 공격한다고 생각해서 화가 난다.", score: 1 },
                { text: "도움 되는 말은 수용하고, 성장의 기회로 삼는다.", score: 5 },
                { text: "겉으론 웃지만 속으로 칼을 간다.", score: 2 },
                { text: "우울해지고 자신감이 떨어진다.", score: 0 }
            ]
        },
        {
            id: 5,
            question: "힘든 일이 생겼을 때 의지할 사람이 있나?",
            options: [
                { text: "언제든 내 편이 되어줄 든든한 사람들이 있다.", score: 5 },
                { text: "1~2명 정도 마음 터놓을 친구가 있다.", score: 4 },
                { text: "아무도 없다. 혼자 감당해야 한다.", score: 0 },
                { text: "가족에게만 털어놓는다.", score: 3 }
            ]
        },
        {
            id: 6,
            question: "미래에 대해 어떻게 생각하나?",
            options: [
                { text: "막막하고 불안하기만 하다.", score: 0 },
                { text: "노력하면 더 좋아질 거라 믿는다.", score: 5 },
                { text: "별생각 없이 흘러가는 대로 산다.", score: 2 },
                { text: "언젠가 대박이 날 것이다 (근거 없는 낙관).", score: 3 }
            ]
        },
        {
            id: 7,
            question: "새로운 도전을 앞두고 드는 생각은?",
            options: [
                { text: "실패하면 어떡하지? 무섭다.", score: 1 },
                { text: "설레고 기대된다. 해보자!", score: 5 },
                { text: "귀찮다. 하던 거나 잘하자.", score: 2 },
                { text: "남들이 하니까 어쩔 수 없이 한다.", score: 2 }
            ]
        }
    ];

    const getResult = (finalScore) => {
        if (finalScore >= 30) return {
            level: '강철 멘탈', title: '티타늄급 회복력', color: 'text-blue-600', bg: 'bg-blue-50', icon: Shield,
            desc: "당신은 어떤 시련이 와도 오뚝이처럼 다시 일어서는 회복 탄력성의 제왕입니다! 긍정적인 마인드와 문제 해결 능력을 모두 갖춘 당신에게 한계란 없습니다.",
            advice: "주변의 힘든 친구들에게 당신의 에너지를 나눠주세요!"
        };
        if (finalScore >= 20) return {
            level: '고무 멘탈', title: '탄탄한 회복력', color: 'text-green-600', bg: 'bg-green-50', icon: Anchor,
            desc: "일시적으로 충격을 받을 순 있어도, 금방 제자리로 돌아오는 건강한 멘탈의 소유자입니다. 스트레스를 관리하는 자신만의 노하우가 있으시군요?",
            advice: "지금처럼 자신을 믿고 나아가세요. 충분히 잘하고 있습니다."
        };
        if (finalScore >= 10) return {
            level: '유리 멘탈', title: '금이 간 유리잔', color: 'text-orange-500', bg: 'bg-orange-50', icon: Zap,
            desc: "작은 충격에도 쉽게 흔들리고 상처받는 편입니다. 실패에 대한 두려움이 크고, 한 번 빠지면 헤어나오는 데 시간이 걸립니다. 마음 근육을 키울 필요가 있어요.",
            advice: "작은 성공 경험을 쌓아 자존감을 높여보세요. 완벽하지 않아도 괜찮아요."
        };
        return {
            level: '쿠크다스', title: '바사삭 쿠크다스', color: 'text-gray-500', bg: 'bg-gray-100', icon: TrendingUp, // TrendingUp metaphor for needing improvement
            desc: "살짝만 건드려도 부서질 것 같은 위태로운 상태입니다. 현재 자존감이 많이 낮아져 있거나 번아웃 상태일 수 있습니다. 혼자 해결하려 하지 말고 주변의 도움을 받으세요.",
            advice: "전문가의 상담을 받거나, 잠시 모든 걸 내려놓고 푹 쉬는 게 좋습니다."
        };
    };

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
                title: '회복 탄력성 테스트',
                text: `나의 멘탈 등급은? [${result.title}] - Utility Hub`,
                url: window.location.href,
            });
        } else {
            alert('링크가 복사되었습니다!');
            navigator.clipboard.writeText(window.location.href);
        }
    };

    
    const toolFaqs = [
        {
            "q": "회복 탄력성이 무엇인가요?",
            "a": "크고 작은 시련이나 역경, 극심한 스트레스를 경험한 후에 이를 극복하고 툭툭 털어내어 본래의 안정된 심리 상태로 되돌아오는 마음의 근력(멘탈 강도)을 뜻합니다."
        },
        {
            "q": "결과 점수가 낮으면 큰일인가요?",
            "a": "전혀 아닙니다! 신체 근육처럼 마음의 근육인 회복탄력성도 후천적인 연습과 마인드 컨트롤을 통해 충분히 키울 수 있습니다."
        }
    ];
    const toolSteps = [
        "갑작스러운 실패, 인간관계의 갈등 상황 등 시련과 관련된 질문을 읽어봅니다.",
        "그 상황을 겪었을 때 평소 내가 회복하는 속도와 마음가짐을 가장 잘 나타내는 보기를 선택합니다.",
        "테스트 완료 후 나의 멘탈 회복 탄력성 지수와 이를 높이는 전문적인 조언을 읽어봅니다."
    ];
    const toolTips = [
        "최근 한 달 동안 본인이 스트레스를 받았던 사건을 떠올리며 풀면 더욱 정확한 진단이 가능합니다.",
        "결과에 나오는 '긍정 언어 사용하기', '작은 성공 경험하기' 등의 회복 솔루션을 일상에서 실천해보세요."
    ];

    return (
        <div className="max-w-2xl mx-auto px-4 py-12">
            <SEO
                title="회복 탄력성 테스트 | 멘탈 강도 측정"
                description="시련을 이겨내는 마음의 근력, 회복 탄력성! 당신의 멘탈은 유리일까요 강철일까요? 지금 확인해보세요."
                keywords="회복탄력성, 멘탈테스트, 유리멘탈, 쿠크다스, 심리테스트, resilience"
                category="건강"
                faqs={toolFaqs}
                steps={toolSteps}
            />

            {step === 'intro' && (
                <div className="text-center animate-fade-in bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl">
                    <Shield className="w-24 h-24 text-blue-600 mx-auto mb-6 animate-pulse" />
                    <h1 className="text-3xl md:text-4xl font-black text-gray-800 dark:text-white mb-4">
                        회복 탄력성 테스트
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                        실패했을 때 얼마나 빨리 일어서나요?<br />
                        스트레스에 얼마나 강한가요?<br />
                        당신의 마음 근육을 측정해드립니다.
                    </p>
                    <button
                        onClick={() => setStep('test')}
                        className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white text-xl font-bold rounded-2xl shadow-lg transition-transform hover:scale-105"
                    >
                        측정 시작하기
                    </button>
                    <p className="mt-4 text-xs text-gray-400">마음가짐이 인생을 바꿉니다</p>
                </div>
            )}

            {step === 'test' && (
                <div className="animate-fade-in">
                    <div className="mb-6 flex justify-between items-center text-sm font-bold text-gray-400">
                        <span>Q{currentQuestion + 1}</span>
                        <span>{currentQuestion + 1} / {questions.length}</span>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg text-center mb-6">
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white leading-relaxed">
                            {questions[currentQuestion].question}
                        </h2>
                    </div>

                    <div className="space-y-3">
                        {questions[currentQuestion].options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleAnswer(option.score)}
                                className="w-full py-4 px-6 bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 border-2 border-transparent hover:border-blue-300 rounded-2xl text-lg font-medium text-gray-700 dark:text-gray-200 shadow-sm transition-all text-left"
                            >
                                {option.text}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {step === 'result' && (() => {
                const result = getResult(score);
                const ResultIcon = result.icon;
                return (
                    <div className="animate-scale-in text-center bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl">
                        <div className="mb-6">
                            <ResultIcon className={`w-24 h-24 mx-auto animate-bounce ${result.color}`} />
                        </div>

                        <span className="text-gray-500 dark:text-gray-400 font-bold">당신의 마음 근력</span>
                        <h2 className={`text-3xl md:text-4xl font-black mt-2 mb-6 ${result.color}`}>
                            {result.title}
                        </h2>

                        <div className={`p-6 rounded-2xl mb-8 ${result.bg} dark:bg-opacity-10 text-left`}>
                            <p className="text-lg text-gray-800 dark:text-gray-200 leading-relaxed font-bold mb-4">
                                {result.desc}
                            </p>
                            <div className="bg-white/60 dark:bg-gray-800/60 p-4 rounded-xl">
                                <h4 className="font-bold text-sm text-gray-500 mb-2">💡 마음 처방</h4>
                                <p className="text-gray-700 dark:text-gray-300">
                                    {result.advice}
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={resetTest}
                                className="flex-1 py-4 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-2xl font-bold transition-all flex items-center justify-center gap-2"
                            >
                                <RefreshCw className="w-5 h-5" />
                                다시하기
                            </button>
                            <button
                                onClick={shareResult}
                                className="flex-1 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-1"
                            >
                                <Share2 className="w-5 h-5" />
                                공유하기
                            </button>
                        </div>
                    </div>
                );
            })()}
        
            <div className="mt-12">
                <ToolGuide
                    title="회복 탄력성 테스트 안내"
                    intro="시련을 이겨내는 마음의 근력, 회복 탄력성! 당신의 멘탈은 유리일까요 강철일까요? 지금 확인해보세요."
                    steps={toolSteps}
                    tips={toolTips}
                    faqs={toolFaqs}
                />
            </div>
        </div>
    );
};

export default ResilienceTest;
