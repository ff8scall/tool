import React, { useState } from 'react';

import { Share2, RefreshCw, Palette, Lightbulb, Users, PenTool, Mic } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';

const HiddenTalent = () => {
    const [step, setStep] = useState(0);
    const [scores, setScores] = useState({
        creative: 0,
        strategic: 0,
        social: 0,
        empathic: 0,
        artisan: 0
    });
    const [result, setResult] = useState(null);

    const questions = [
        {
            id: 1,
            question: "멍 때릴 때 주로 하는 생각은?",
            answers: [
                { text: "만약에 좀비가 나타난다면? 엉뚱한 상상", type: "creative", score: 2 },
                { text: "오늘 할 일과 스케줄 정리", type: "strategic", score: 2 },
                { text: "친구들과 있었던 재미있는 일 회상", type: "social", score: 2 },
                { text: "주변 사람들의 기분이나 감정 생각", type: "empathic", score: 2 }
            ]
        },
        {
            id: 2,
            question: "새로운 물건을 샀을 때 나는?",
            answers: [
                { text: "설명서를 꼼꼼히 읽어보고 파악한다", type: "strategic", score: 2 },
                { text: "일단 이것저것 만져보며 기능을 익힌다", type: "artisan", score: 2 },
                { text: "디자인이 예쁜지, 어디에 둘지 고민한다", type: "creative", score: 2 },
                { text: "이걸로 누구와 무엇을 할지 생각한다", type: "social", score: 2 }
            ]
        },
        {
            id: 3,
            question: "친구의 고민 상담을 해줄 때 나의 반응은?",
            answers: [
                { text: "같이 울어주거나 화내주며 공감한다", type: "empathic", score: 2 },
                { text: "현실적인 해결책과 대안을 제시한다", type: "strategic", score: 2 },
                { text: "기분 전환을 위해 맛집이나 여행을 제안한다", type: "social", score: 2 },
                { text: "나만의 독특한 방식으로 위로해준다", type: "creative", score: 2 }
            ]
        },
        {
            id: 4,
            question: "가장 즐거움을 느끼는 순간은?",
            answers: [
                { text: "무언가를 내 손으로 직접 만들 때", type: "artisan", score: 2 },
                { text: "사람들 앞에서 주목받고 이야기할 때", type: "social", score: 2 },
                { text: "새로운 아이디어가 번뜩일 때", type: "creative", score: 2 },
                { text: "복잡한 문제가 시원하게 해결될 때", type: "strategic", score: 2 }
            ]
        },
        {
            id: 5,
            question: "팀 프로젝트에서 맡고 싶은 역할은?",
            answers: [
                { text: "분위기 메이커 및 발표 담당", type: "social", score: 2 },
                { text: "전체적인 계획 수립 및 조율", type: "empathic", score: 2 },
                { text: "새로운 아이디어 제시", type: "creative", score: 2 },
                { text: "자료 조사 및 정리, 제작", type: "artisan", score: 2 }
            ]
        },
        {
            id: 6,
            question: "나의 방 상태는?",
            answers: [
                { text: "깔끔하게 정리정돈이 잘 되어 있다", type: "strategic", score: 2 },
                { text: "나만의 감성이 담긴 인테리어 소품이 많다", type: "artisan", score: 2 },
                { text: "조금 어지럽혀져 있어도 어디에 뭐 있는지 안다", type: "creative", score: 2 },
                { text: "친구들이 언제든 놀러 올 수 있게 편안하다", type: "social", score: 2 }
            ]
        },
        {
            id: 7,
            question: "당신에게 '재능'이란?",
            answers: [
                { text: "남들은 못 하는 독창적인 것을 만드는 것", type: "creative", score: 2 },
                { text: "사람의 마음을 움직이는 힘", type: "empathic", score: 2 },
                { text: "복잡한 것을 단순하고 명확하게 만드는 것", type: "strategic", score: 2 },
                { text: "오랜 노력으로 갈고닦은 기술", type: "artisan", score: 2 }
            ]
        }
    ];

    const talents = {
        creative: {
            name: "세상을 바꾸는 아이디어 뱅크 (Creative Artist)",
            description: "당신은 남들이 생각하지 못하는 기발한 아이디어로 가득 차 있습니다! 엉뚱하지만 창의적인 발상으로 세상을 놀라게 할 잠재력이 있네요. 예술, 디자인, 기획 분야에서 당신의 빛나는 재능을 발휘해보세요.",
            traits: ["#아이디어뱅크", "#창의력대장", "#예술감각", "#호기심천국"],
            color: "text-purple-600",
            icon: Lightbulb,
            bg: "bg-purple-100 dark:bg-purple-900/30",
            recommend: "기획자, 디자이너, 작가, 아티스트"
        },
        strategic: {
            name: "빈틈없는 논리왕 (Analytical Strategist)",
            description: "당신은 복잡한 문제를 논리적으로 분석하고 해결책을 찾아내는 능력이 탁월합니다! 냉철한 판단력과 계획성으로 어떤 상황에서도 최선의 길을 찾아내는 훌륭한 전략가입니다.",
            traits: ["#뇌섹남녀", "#해결사", "#계획형J", "#분석력"],
            color: "text-blue-600",
            icon: PenTool,
            bg: "bg-blue-100 dark:bg-blue-900/30",
            recommend: "컨설턴트, 개발자, 분석가, CEO"
        },
        social: {
            name: "사람을 끌어당기는 자석 (Social Influencer)",
            description: "당신은 어디서나 주목받는 매력적인 인싸 재질! 타고난 입담과 센스로 사람들을 즐겁게 하고, 분위기를 주도하는 능력이 있습니다. 당신의 영향력으로 세상을 움직일 수 있는 잠재력이 있군요.",
            traits: ["#핵인싸", "#분위기메이커", "#언변능숙", "#리더십"],
            color: "text-pink-500",
            icon: Mic,
            bg: "bg-pink-100 dark:bg-pink-900/30",
            recommend: "마케터, 유튜버, 강사, 영업 전문가"
        },
        empathic: {
            name: "마음을 치유하는 힐러 (Empathic Leader)",
            description: "당신은 타인의 감정을 깊이 이해하고 공감하는 따뜻한 마음씨를 가졌습니다. 사람들의 마음을 열고, 진심으로 소통하며 팀을 하나로 뭉치게 하는 부드러운 카리스마가 당신의 숨겨진 무기입니다.",
            traits: ["#공감능력", "#경청왕", "#따뜻함", "#소통전문가"],
            color: "text-green-600",
            icon: Users,
            bg: "bg-green-100 dark:bg-green-900/30",
            recommend: "상담가, HR 전문가, 교육자, 복지 전문가"
        },
        artisan: {
            name: "황금손의 소유자 (Skilled Artisan)",
            description: "당신은 손재주가 뛰어나고 디테일에 강한 장인 정신을 가지고 있습니다! 섬세한 감각으로 무언가를 만들거나 고치는 데 탁월한 재능이 있네요. 당신의 손끝에서 탄생하는 결과물들은 모두를 감탄하게 만듭니다.",
            traits: ["#금손", "#섬세함", "#집중력", "#완벽주의"],
            color: "text-amber-600",
            icon: Palette,
            bg: "bg-amber-100 dark:bg-amber-900/30",
            recommend: "요리사, 공예가, 엔지니어, 건축가"
        }
    };

    const handleAnswer = (type, score) => {
        setScores(prev => ({
            ...prev,
            [type]: prev[type] + score
        }));

        if (step < questions.length - 1) {
            setStep(step + 1);
        } else {
            // handled by final answer
        }
    };

    const handleFinalAnswer = (type, score) => {
        const finalScores = { ...scores, [type]: scores[type] + score };
        setScores(finalScores);

        const winner = Object.entries(finalScores).sort((a, b) => b[1] - a[1])[0][0];
        setResult(winner);
        setStep(questions.length);
    };

    const resetTest = () => {
        setStep(0);
        setScores({ creative: 0, strategic: 0, social: 0, empathic: 0, artisan: 0 });
        setResult(null);
    };

    const shareResult = () => {
        if (navigator.share) {
            navigator.share({
                title: '숨겨진 재능 테스트',
                text: `나의 숨겨진 재능은: ${talents[result].name}`,
                url: window.location.href,
            });
        } else {
            alert('링크가 복사되었습니다!');
            navigator.clipboard.writeText(window.location.href);
        }
    };

    
    const toolFaqs = [
        {
            "q": "숨겨진 재능 테스트는 어떤 것을 알아볼 수 있나요?",
            "a": "내가 평소에 인지하지 못했던 무의식적인 성향을 평가하여, 예술성, 리더십, 관찰력 등의 잠재적 재능을 도출해냅니다."
        },
        {
            "q": "나온 재능을 직업으로 삼아야 하나요?",
            "a": "이 테스트는 흥미 위주의 심리테스트로, 진로 결정보다는 취미나 장점을 가볍게 발굴하는 데 참고만 해주세요."
        }
    ];
    const toolSteps = [
        "다양한 일상적 상황에서 내가 어떻게 반응할지 묻는 질문들을 꼼꼼히 읽습니다.",
        "가장 내 모습에 가까운 보기를 선택합니다.",
        "모든 응답 완료 후, 나에게 숨겨진 특별한 1급 재능 타이틀을 확인합니다."
    ];
    const toolTips = [
        "의식적으로 '좋아 보이는' 답변보다는 솔직한 행동 패턴을 골라야 정확한 잠재력을 알 수 있습니다.",
        "결과에 나온 재능을 발휘할 수 있는 새로운 취미 활동을 시작해보는 것은 어떨까요?"
    ];

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <SEO
                title="숨겨진 재능 테스트 | 나의 잠재력 발견하기"
                description="나도 모르는 나의 숨겨진 재능은 무엇일까요? 창의력, 리더십, 공감능력 등 당신 안에 잠들어 있는 보석 같은 재능을 찾아드립니다."
                keywords="재능테스트, 적성검사, 잠재력, 심리테스트, 강점찾기, 진로탐색"
                category="운세/재미"
                faqs={toolFaqs}
                steps={toolSteps}
            />

            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4 animate-fade-in">
                    💎 숨겨진 재능 테스트 ✨
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                    당신 안에 빛나고 있는 원석을 찾아보세요!
                </p>
            </div>

            <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden p-8 transition-all duration-300 min-h-[500px] flex flex-col justify-center">
                {step < questions.length ? (
                    <div className="animate-fade-in">
                        <div className="mb-8 flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-500">Question {step + 1} / {questions.length}</span>
                            <div className="w-1/2 h-2 bg-gray-200 rounded-full">
                                <div
                                    className="h-full bg-purple-500 rounded-full transition-all duration-300"
                                    style={{ width: `${((step + 1) / questions.length) * 100}%` }}
                                ></div>
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8 text-center leading-relaxed">
                            {questions[step]?.question}
                        </h2>

                        <div className="space-y-4">
                            {questions[step]?.answers.map((answer, index) => (
                                <button
                                    key={index}
                                    onClick={() => step === questions.length - 1 ? handleFinalAnswer(answer.type, answer.score) : handleAnswer(answer.type, answer.score)}
                                    className="w-full p-6 text-lg text-left bg-gray-50 dark:bg-gray-700 hover:bg-purple-50 dark:hover:bg-gray-600 border-2 border-transparent hover:border-purple-500 rounded-2xl transition-all duration-200 transform hover:-translate-y-1"
                                >
                                    {answer.text}
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="text-center animate-scale-in">
                        <div className={`inline-block p-6 rounded-full ${talents[result].bg} mb-6`}>
                            {React.createElement(talents[result].icon, { className: `w-20 h-20 ${talents[result].color}` })}
                        </div>

                        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                            당신의 숨겨진 재능은 <br /><span className={talents[result].color}>{talents[result].name}</span>
                        </h2>

                        <div className="flex flex-wrap justify-center gap-2 mb-6 mt-4">
                            {talents[result].traits.map((trait, i) => (
                                <span key={i} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm font-medium text-gray-600 dark:text-gray-300">
                                    {trait}
                                </span>
                            ))}
                        </div>

                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed whitespace-pre-wrap px-4 bg-gray-50 dark:bg-gray-700/50 py-6 rounded-2xl">
                            {talents[result].description}
                        </p>

                        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl mb-8">
                            <span className="text-sm text-gray-500 dark:text-gray-400 block mb-1">추천 분야/직업</span>
                            <span className="text-lg font-bold text-purple-600 dark:text-purple-400">{talents[result].recommend}</span>
                        </div>

                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={resetTest}
                                className="flex items-center px-6 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-xl font-bold transition-all"
                            >
                                <RefreshCw className="w-5 h-5 mr-2" />
                                다시하기
                            </button>
                            <button
                                onClick={shareResult}
                                className="flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold shadow-lg shadow-purple-500/30 transition-all transform hover:-translate-y-1"
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
                    title="숨겨진 재능 테스트 안내"
                    intro="나도 모르는 나의 숨겨진 재능은 무엇일까요? 창의력, 리더십, 공감능력 등 당신 안에 잠들어 있는 보석 같은 재능을 찾아드립니다."
                    steps={toolSteps}
                    tips={toolTips}
                    faqs={toolFaqs}
                />
            </div>
        </div>
    );
};

export default HiddenTalent;
