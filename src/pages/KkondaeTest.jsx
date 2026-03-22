import React, { useState } from 'react';

import { Share2, RefreshCw, Briefcase, Frown, ThumbsUp, AlertCircle } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';

const KkondaeTest = () => {
    const [step, setStep] = useState('intro'); // intro, test, result
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);

    const questions = [
        {
            id: 1,
            question: "후배가 출근 시간에 딱 맞춰 9:00에 도착했다. 나의 생각은?",
            options: [
                { text: "뭐 어때? 지각만 안 하면 되지.", score: 0 },
                { text: "최소 10분 전에는 와서 준비해야 하는 거 아닌가?", score: 5 },
                { text: "요즘 애들은 기본이 안 되어 있어.", score: 10 },
                { text: "인사는 제대로 하나 지켜본다.", score: 3 }
            ]
        },
        {
            id: 2,
            question: "회식 메뉴를 정할 때 나는?",
            options: [
                { text: "다수결이나 투표로 정한다.", score: 0 },
                { text: "내가 먹고 싶은 걸 넌지시(강하게) 어필한다.", score: 5 },
                { text: "답정너. 이미 내가 예약해둠.", score: 10 },
                { text: "맛집 리스트를 쫙 뽑아오라고 시킨다.", score: 8 }
            ]
        },
        {
            id: 3,
            question: "후배가 에어팟을 끼고 일하고 있다.",
            options: [
                { text: "일만 잘하면 상관없다.", score: 0 },
                { text: "부를 때 못 들을까 봐 걱정된다.", score: 3 },
                { text: "건방지게... 당장 빼라고 한다.", score: 10 },
                { text: "한쪽만 끼라고 타협한다.", score: 5 }
            ]
        },
        {
            id: 4,
            question: "'나 때는 말이야...' 라는 말을 얼마나 자주 쓰나?",
            options: [
                { text: "거의 안 쓴다. (의식적으로 피함)", score: 0 },
                { text: "가끔 옛날얘기 할 때 쓴다.", score: 3 },
                { text: "후배들이 답답할 때 자주 나온다.", score: 8 },
                { text: "내 입버릇이다.", score: 10 }
            ]
        },
        {
            id: 5,
            question: "휴가 쓴다는 후배에게 '무슨 일 있어?' 라고 묻는 이유는?",
            options: [
                { text: "순수한 호기심 or 업무 조정 필요해서", score: 2 },
                { text: "그냥 스몰토크 아닌가?", score: 5 },
                { text: "바쁜 시즌에 굳이 가야 하는지 눈치 주려고", score: 10 },
                { text: "묻지 않는다. 결재만 해준다.", score: 0 }
            ]
        },
        {
            id: 6,
            question: "후배가 나보다 먼저 퇴근하려 한다.",
            options: [
                { text: "잘 가~ 내일 봐!", score: 0 },
                { text: "벌써 가? 일은 다 했어?", score: 5 },
                { text: "상사도 안 갔는데... 눈치가 없네.", score: 10 },
                { text: "저녁 뭐 먹을지 물어본다 (붙잡기)", score: 8 }
            ]
        },
        {
            id: 7,
            question: "자신의 의견에 반박하는 후배를 보면?",
            options: [
                { text: "오, 참신한데? 수용한다.", score: 0 },
                { text: "일리는 있지만 기분은 좀 나쁘다.", score: 5 },
                { text: "어디서 말대꾸야?", score: 10 },
                { text: "논리로 박살 내서 다시는 못 덤비게 한다.", score: 8 }
            ]
        }
    ];

    const getResult = (finalScore) => {
        if (finalScore >= 50) return {
            level: 'LV.99', title: '킹 오브 꼰대 (The Boomer)', color: 'text-red-600', bg: 'bg-red-50', icon: AlertCircle,
            desc: "축하합니다(?). 당신은 숨 쉬는 것조차 꼰대입니다. '라떼는 말이야'가 인생의 신조이시군요. 후배들이 당신을 피해 다니는 이유를 이제 아시겠나요? 제발 멈춰!",
            advice: "입은 닫고 지갑을 여세요. 그게 유일한 살길입니다."
        };
        if (finalScore >= 30) return {
            level: 'LV.50', title: '젊은 꼰대 (Young Kkondae)', color: 'text-orange-500', bg: 'bg-orange-50', icon: Briefcase,
            desc: "본인은 쿨하다고 생각하지만, 은근히 꼰대 기질이 다분합니다. '나는 꼰대 아니지?'라고 묻는 순간 이미 꼰대입니다. 선택적 꼰대질을 멈춰주세요.",
            advice: "충고보다는 공감을 먼저 해보는 건 어떨까요?"
        };
        if (finalScore >= 10) return {
            level: 'LV.10', title: '새싹 꼰대 (Baby Kkondae)', color: 'text-yellow-500', bg: 'bg-yellow-50', icon: Frown,
            desc: "가끔 욱하는 마음에 꼰대력이 튀어나오지만, 아직은 이성이 살아있습니다. 사회생활 하다 보니 어쩔 수 없이 물들어가는 단계군요. 조심하세요!",
            advice: "초심을 잃지 마세요. 당신도 한때는 신입이었습니다."
        };
        return {
            level: 'LV.0', title: '엔젤 (Angel)', color: 'text-green-500', bg: 'bg-green-50', icon: ThumbsUp,
            desc: "당신은 꼰대력이 0에 수렴하는 천사입니다! 후배들이 존경하고 따르는 이상적인 선배상이네요. (혹시 눈치를 너무 많이 보는 건 아니죠?)",
            advice: "지금처럼만 하세요! 당신은 빛과 소금입니다."
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
                title: '꼰대 성향 테스트',
                text: `나의 꼰대 레벨은? [${result.title}] - Utility Hub`,
                url: window.location.href,
            });
        } else {
            alert('링크가 복사되었습니다!');
            navigator.clipboard.writeText(window.location.href);
        }
    };

    
    const toolFaqs = [
        {
            "q": "꼰대 테스트는 직장인만 할 수 있나요?",
            "a": "조직 생활 문항이 일부 포함되어 있으나, 후배나 어린 친구들을 대하는 보편적인 태도에 대한 퀴즈이므로 학생이나 프리랜서도 재미있게 참여할 수 있습니다."
        },
        {
            "q": "너무 심한 꼰대라고 나오면 어떡하죠?",
            "a": "시대가 변하면서 가치관이 변한 것일 뿐입니다! 스스로를 되돌아보는 계기로 유쾌하게 받아들여주시면 됩니다."
        }
    ];
    const toolSteps = [
        "후배의 복장, 회식 자리 예절 등 직장 및 일상에서 흔히 겪는 갈등 상황에 대한 질문을 읽습니다.",
        "본인이 속으로 혹은 겉으로 할법한 생각을 선택합니다.",
        "나의 꼰대력(%)과 진단 결과 레벨을 확인합니다."
    ];
    const toolTips = [
        "머리로 '이게 정답이겠지' 하는 대답 말고, 속마음에 가장 가까운 것을 골라야 나의 진짜 꼰대력을 알 수 있습니다.",
        "직장 동료들과 점심시간에 링크를 공유하여 서로의 꼰대 성향을 웃으며 진단해보세요."
    ];

    return (
        <div className="max-w-2xl mx-auto px-4 py-12">
            <SEO
                title="꼰대 성향 테스트 | 르네상스 꼰대 자가진단"
                description="Latte is horse... 혹시 나도 꼰대? 직장 및 사회생활에서의 꼰대력을 측정해드립니다."
                keywords="꼰대테스트, 꼰대자가진단, 라떼는말이야, 직장인테스트, kkondae test"
                category="운세/재미"
                faqs={toolFaqs}
                steps={toolSteps}
            />

            {step === 'intro' && (
                <div className="text-center animate-fade-in bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl">
                    <Briefcase className="w-24 h-24 text-gray-700 dark:text-gray-300 mx-auto mb-6 animate-pulse" />
                    <h1 className="text-3xl md:text-4xl font-black text-gray-800 dark:text-white mb-4">
                        꼰대 성향 테스트
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                        "나 때는 말이야..."<br />
                        본인은 쿨하다고 생각하시나요?<br />
                        당신의 잠재된 꼰대력을 확인해보세요.
                    </p>
                    <button
                        onClick={() => setStep('test')}
                        className="w-full py-4 bg-gray-800 hover:bg-black dark:bg-white dark:hover:bg-gray-200 text-white dark:text-gray-900 text-xl font-bold rounded-2xl shadow-lg transition-transform hover:scale-105"
                    >
                        테스트 시작하기
                    </button>
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
                                className="w-full py-4 px-6 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 border-2 border-transparent hover:border-gray-300 rounded-2xl text-lg font-medium text-gray-700 dark:text-gray-200 shadow-sm transition-all text-left"
                            >
                                {option.text}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {step === 'result' && (
                <div className="animate-scale-in text-center bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl">
                    <div className="mb-6">
                        {getResult(score).icon({ className: `w-24 h-24 mx-auto animate-bounce ${getResult(score).color}` })}
                    </div>

                    <span className="text-gray-500 dark:text-gray-400 font-bold">{getResult(score).level}</span>
                    <h2 className={`text-3xl md:text-4xl font-black mt-2 mb-6 ${getResult(score).color}`}>
                        {getResult(score).title}
                    </h2>

                    <div className={`p-6 rounded-2xl mb-6 ${getResult(score).bg} dark:bg-opacity-10 text-left`}>
                        <p className="text-lg text-gray-800 dark:text-gray-200 leading-relaxed font-bold mb-4">
                            {getResult(score).desc}
                        </p>
                        <div className="bg-white/60 dark:bg-gray-800/60 p-4 rounded-xl">
                            <h4 className="font-bold text-sm text-gray-500 mb-2">💡 처방전</h4>
                            <p className="text-gray-700 dark:text-gray-300">
                                {getResult(score).advice}
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
                            className="flex-1 py-4 bg-gray-800 hover:bg-black dark:bg-white dark:hover:bg-gray-200 text-white dark:text-gray-900 rounded-2xl font-bold shadow-lg transition-all flex items-center justify-center gap-2 transform hover:-translate-y-1"
                        >
                            <Share2 className="w-5 h-5" />
                            공유하기
                        </button>
                    </div>
                </div>
            )}
        
            <div className="mt-12">
                <ToolGuide
                    title="꼰대 성향 테스트 안내"
                    intro="Latte is horse... 혹시 나도 꼰대? 직장 및 사회생활에서의 꼰대력을 측정해드립니다."
                    steps={toolSteps}
                    tips={toolTips}
                    faqs={toolFaqs}
                />
            </div>
        </div>
    );
};

export default KkondaeTest;
