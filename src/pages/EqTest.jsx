import React, { useState } from 'react';

import { Share2, RefreshCw, Heart, MessageCircle, User } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';

const EqTest = () => {
    const [step, setStep] = useState('intro'); // intro, test, result
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);

    const questions = [
        {
            id: 1,
            question: "친구가 '나 요즘 너무 우울해...'라고 말했을 때, 나의 반응은?",
            options: [
                { text: "왜 우울해? 무슨 일 있었어?", score: 5 }, // Reason
                { text: "많이 힘들구나... 맛있는 거 먹으러 갈까?", score: 10 }, // Empathy
                { text: "운동이라도 좀 해봐. 기분 나아질 거야.", score: 2 }, // Solution
                { text: "나도 요즘 우울해 ㅠㅠ", score: 8 } // Sympathy
            ]
        },
        {
            id: 2,
            question: "동료가 프로젝트 실수로 상사에게 크게 혼나고 있다. 나의 심정은?",
            options: [
                { text: "'저런 실수를 왜 했지?' 이해가 안 간다.", score: 2 },
                { text: "나까지 심장이 벌렁거리고 안타깝다.", score: 10 },
                { text: "다음에 어떻게 도와줄지 생각한다.", score: 5 },
                { text: "못 본 척 내 일에 집중한다.", score: 0 }
            ]
        },
        {
            id: 3,
            question: "드라마 속 주인공이 억울한 누명을 쓰고 오열하는 장면을 볼 때",
            options: [
                { text: "같이 펑펑 운다.", score: 10 },
                { text: "저 배우 연기 잘하네... 라고 생각한다.", score: 2 },
                { text: "작가누구야? 스토리 전개가 왜 저래?", score: 0 },
                { text: "안타깝긴 하지만 눈물은 안 난다.", score: 5 }
            ]
        },
        {
            id: 4,
            question: "친구가 새로 산 옷이 정말 안 어울릴 때 나의 반응은?",
            options: [
                { text: "솔직하게 별로라고 말해준다. 친구를 위해서.", score: 2 },
                { text: "너랑은 좀 안 맞는 것 같아... (최대한 돌려서)", score: 5 },
                { text: "개성 있고 괜찮네! (일단 칭찬)", score: 10 },
                { text: "화제를 다른 곳으로 돌린다.", score: 8 }
            ]
        },
        {
            id: 5,
            question: "약속 시간 1시간 늦은 친구가 헐레벌떡 뛰어와서 미안하다고 한다.",
            options: [
                { text: "왜 늦었어? 얼마나 기다린 줄 알아?", score: 2 },
                { text: "뛰어오느라 힘들었겠다. 숨 좀 골라.", score: 10 },
                { text: "다음부턴 늦지 마 (단호)", score: 5 },
                { text: "나도 방금 왔어~ (거짓말)", score: 10 }
            ]
        },
        {
            id: 6,
            question: "지하철에서 누군가 실수로 내 발을 밟고 그냥 갔을 때",
            options: [
                { text: "쫓아가서 사과를 받는다.", score: 0 },
                { text: "기분 나쁘지만 '바쁜가보다' 하고 넘긴다.", score: 8 },
                { text: "하루 종일 기분이 안 좋다.", score: 5 },
                { text: "뭐야! 하면서 큰 소리로 따진다.", score: 2 }
            ]
        },
        {
            id: 7,
            question: "반려동물이 무지개 다리를 건넜다는 지인의 소식을 들었을 때",
            options: [
                { text: "새로 한 마리 입양하는 건 어때?", score: 0 },
                { text: "수명 다해서 죽은 건데 어쩔 수 없지.", score: -5 },
                { text: "얼마나 마음이 아플까... 힘내라는 말도 조심스럽네.", score: 10 },
                { text: "좋은 곳으로 갔을 거야. 명복을 빌게.", score: 8 }
            ]
        }
    ];

    const getResult = (finalScore) => {
        if (finalScore >= 60) return {
            level: '최상', title: '걸어다니는 천사', color: 'text-pink-500', bg: 'bg-pink-50',
            desc: "당신은 타인의 감정을 내 것처럼 느끼는 공감 능력자입니다. 주변 사람들의 마음을 따뜻하게 안아주는 치유계 스타일이네요. 하지만 너무 타인의 감정에 이입하다 보면 본인이 힘들 수 있으니 주의하세요!"
        };
        if (finalScore >= 40) return {
            level: '상', title: '따뜻한 난로', color: 'text-orange-500', bg: 'bg-orange-50',
            desc: "적절한 공감 능력과 이성을 겸비하고 있습니다. 상대방의 기분을 잘 파악하고 상황에 맞게 위로할 줄 아는 센스쟁이입니다. 대인관계가 원만한 타입입니다."
        };
        if (finalScore >= 20) return {
            level: '중', title: '이성적인 로봇', color: 'text-blue-500', bg: 'bg-blue-50',
            desc: "공감보다는 해결책을 제시하는 것을 선호합니다. 감정적인 위로가 필요한 사람에게는 다소 차갑게 느껴질 수 있습니다. '그랬구나' 화법을 연습해보는 건 어떨까요?"
        };
        return {
            level: '하', title: '마이웨이 쿨가이', color: 'text-gray-500', bg: 'bg-gray-100',
            desc: "타인의 감정보다는 사실과 논리가 중요한 당신! 솔직하고 직설적인 화법을 구사합니다. 가끔은 '영혼 없는 리액션'이라도 상대방에게는 큰 힘이 될 수 있답니다."
        };
    };

    const handleAnswer = (points) => {
        const nextScore = score + points;
        setScore(nextScore);

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
                title: 'EQ 공감 능력 테스트',
                text: `나의 공감 능력은? [${result.title}] - Utility Hub`,
                url: window.location.href,
            });
        } else {
            alert('링크가 복사되었습니다!');
            navigator.clipboard.writeText(window.location.href);
        }
    };

    
    const toolFaqs = [
        {
            "q": "EQ(감성 지수)란 무엇인가요?",
            "a": "자신과 타인의 감정을 이해하고 조절하며, 공감할 수 있는 정서적 지능 지수를 의미합니다."
        },
        {
            "q": "이 테스트로 진짜 저의 공감 능력을 알 수 있나요?",
            "a": "전문적인 심리 검사는 아니지만, 일상적인 대화 상황에서 타인의 감정을 얼마나 잘 캐치하는지 대략적인 수준을 알아볼 수 있습니다."
        }
    ];
    const toolSteps = [
        "속상함, 슬픔, 기쁨 등 다양한 타인의 감정이 담긴 대화 상황을 읽습니다.",
        "그 상황에서 내가 건넬 법한 위로나 답변을 선택합니다.",
        "모든 선택이 끝나면 분석된 나의 공감 능력 수치와 성향을 확인합니다."
    ];
    const toolTips = [
        "'내가 무엇을 해야 맞을까?' 보다 평소 나의 진짜 성격대로 답해야 정확한 결과가 나옵니다.",
        "일명 'T(사고형)' 와 'F(감정형)' 친구들이 함께 해보면 결과가 극명하게 갈려 더욱 재미있습니다."
    ];

    return (
        <div className="max-w-2xl mx-auto px-4 py-12">
            <SEO
                title="EQ 공감 능력 테스트 | 감정 지능 측정"
                description="타인의 감정을 얼마나 잘 이해하고 있나요? 다양한 상황극을 통해 나의 공감 능력을 테스트해보세요."
                keywords="eq테스트, 공감능력, 감정지능, 심리테스트, emotional intelligence"
                category="운세/재미"
                faqs={toolFaqs}
                steps={toolSteps}
            />

            {step === 'intro' && (
                <div className="text-center animate-fade-in bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl">
                    <Heart className="w-24 h-24 text-pink-500 mx-auto mb-6 animate-pulse" fill="currentColor" />
                    <h1 className="text-3xl md:text-4xl font-black text-gray-800 dark:text-white mb-4">
                        EQ 공감 능력 테스트
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                        친구가 울 때 같이 눈물이 나나요?<br />
                        혹시 'T냐?' 라는 말을 자주 듣나요?<br />
                        나의 감정 지능을 확인해보세요.
                    </p>
                    <button
                        onClick={() => setStep('test')}
                        className="w-full py-4 bg-pink-500 hover:bg-pink-600 text-white text-xl font-bold rounded-2xl shadow-lg transition-transform hover:scale-105"
                    >
                        테스트 시작하기
                    </button>
                    <p className="mt-4 text-xs text-gray-400">총 7문항 / 예상 소요시간 1분</p>
                </div>
            )}

            {step === 'test' && (
                <div className="animate-fade-in">
                    <div className="mb-6 flex justify-between items-center text-sm font-bold text-gray-400">
                        <span>Q{currentQuestion + 1}</span>
                        <span>{currentQuestion + 1} / {questions.length}</span>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg text-center mb-6">
                        <MessageCircle className="w-10 h-10 text-pink-300 mx-auto mb-4" />
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white leading-relaxed">
                            "{questions[currentQuestion].question}"
                        </h2>
                    </div>

                    <div className="space-y-3">
                        {questions[currentQuestion].options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleAnswer(option.score)}
                                className="w-full py-4 px-6 bg-white dark:bg-gray-800 hover:bg-pink-50 dark:hover:bg-gray-700 border-2 border-transparent hover:border-pink-300 rounded-2xl text-lg font-medium text-gray-700 dark:text-gray-200 shadow-sm transition-all text-left group"
                            >
                                <span className="inline-block w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-600 text-gray-400 dark:text-gray-300 text-xs text-center leading-6 mr-3 group-hover:bg-pink-500 group-hover:text-white transition-colors">
                                    {String.fromCharCode(65 + index)}
                                </span>
                                {option.text}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {step === 'result' && (
                <div className="animate-scale-in text-center bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl">
                    <div className="mb-6">
                        <User className="w-20 h-20 text-gray-400 mx-auto bg-gray-100 dark:bg-gray-700 rounded-full p-4" />
                    </div>

                    <span className="text-gray-500 dark:text-gray-400 font-bold">당신의 공감 레벨은</span>
                    <h2 className={`text-4xl font-black mt-2 mb-6 ${getResult(score).color}`}>
                        {getResult(score).title}
                    </h2>

                    <div className={`p-6 rounded-2xl mb-8 ${getResult(score).bg} dark:bg-opacity-10 text-left`}>
                        <p className="text-lg text-gray-800 dark:text-gray-200 leading-relaxed font-medium">
                            {getResult(score).desc}
                        </p>
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
                            className="flex-1 py-4 bg-pink-500 hover:bg-pink-600 text-white rounded-2xl font-bold shadow-lg shadow-pink-500/30 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-1"
                        >
                            <Share2 className="w-5 h-5" />
                            공유하기
                        </button>
                    </div>
                </div>
            )}
        
            <div className="mt-12">
                <ToolGuide
                    title="EQ 공감 능력 테스트 안내"
                    intro="타인의 감정을 얼마나 잘 이해하고 있나요? 다양한 상황극을 통해 나의 공감 능력을 테스트해보세요."
                    steps={toolSteps}
                    tips={toolTips}
                    faqs={toolFaqs}
                />
            </div>
        </div>
    );
};

export default EqTest;
