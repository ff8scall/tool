import React, { useState } from 'react';

import { Share2, RefreshCw, Heart, Sparkles, Coffee, Sun, BookOpen } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';

const IdealType = () => {
    const [step, setStep] = useState(0);
    const [scores, setScores] = useState({
        cute: 0,
        sexy: 0,
        reliable: 0,
        fresh: 0,
        smart: 0
    });
    const [result, setResult] = useState(null);

    const questions = [
        {
            id: 1,
            question: "처음 이성을 볼 때 가장 먼저 눈길이 가는 곳은?",
            answers: [
                { text: "웃을 때 반달이 되는 선한 눈매", type: "cute", score: 2 },
                { text: "자기관리 잘된 탄탄한 피지컬", type: "sexy", score: 2 },
                { text: "깔끔하고 단정한 옷차림", type: "smart", score: 2 },
                { text: "보기만 해도 기분 좋아지는 미소", type: "fresh", score: 2 }
            ]
        },
        {
            id: 2,
            question: "연인과 함께 보내고 싶은 주말 데이트는?",
            answers: [
                { text: "놀이공원에서 교복 입고 신나게 놀기", type: "fresh", score: 2 },
                { text: "분위기 좋은 와인바에서 깊은 대화", type: "sexy", score: 2 },
                { text: "전시회 관람 후 힙한 카페 가기", type: "smart", score: 2 },
                { text: "집에서 맛있는 거 해먹으며 뒹굴뒹굴", type: "reliable", score: 2 }
            ]
        },
        {
            id: 3,
            question: "내가 반하는 이성의 의외의 모습은?",
            answers: [
                { text: "어려운 문제를 척척 해결할 때", type: "smart", score: 2 },
                { text: "서툴지만 나를 위해 노력하는 모습", type: "cute", score: 2 },
                { text: "무심한 듯 챙겨주는 츤데레 모먼트", type: "reliable", score: 2 },
                { text: "일할 때 집중하는 프로패셔널한 눈빛", type: "sexy", score: 2 }
            ]
        },
        {
            id: 4,
            question: "연애에서 가장 중요하게 생각하는 것은?",
            answers: [
                { text: "끊임없이 표현해주는 애정", type: "cute", score: 2 },
                { text: "설렘과 긴장감", type: "sexy", score: 2 },
                { text: "대화가 잘 통하는 티키타카", type: "fresh", score: 2 },
                { text: "서로 믿고 의지할 수 있는 신뢰", type: "reliable", score: 2 }
            ]
        },
        {
            id: 5,
            question: "썸 탈 때 상대방이 나에게 해줬으면 하는 것은?",
            answers: [
                { text: "밤늦게 집 앞까지 데려다주기", type: "reliable", score: 2 },
                { text: "귀엽게 질투하는 모습 보여주기", type: "cute", score: 2 },
                { text: "맛집 리스트 쫙 뽑아서 데려가기", type: "smart", score: 2 },
                { text: "갑자기 꽃 선물하며 서프라이즈", type: "fresh", score: 2 }
            ]
        },
        {
            id: 6,
            question: "나의 연애 스타일은?",
            answers: [
                { text: "리드하는 것보다 리드 당하는 게 좋다", type: "sexy", score: 2 },
                { text: "친구 같은 편안한 연애가 좋다", type: "fresh", score: 2 },
                { text: "서로의 발전을 응원하는 성숙한 연애", type: "smart", score: 2 },
                { text: "아이처럼 챙겨주고 보살펴주고 싶다", type: "cute", score: 2 }
            ]
        },
        {
            id: 7,
            question: "마지막으로, 당신이 꿈꾸는 완벽한 이상형은?",
            answers: [
                { text: "나만 바라봐주는 대형견 같은 사람", type: "cute", score: 2 },
                { text: "어른스럽고 배울 점이 많은 멘토 같은 사람", type: "smart", score: 2 },
                { text: "언제나 내 편이 되어주는 든든한 나무 같은 사람", type: "reliable", score: 2 },
                { text: "나를 긴장하게 만드는 매력적인 사람", type: "sexy", score: 2 }
            ]
        }
    ];

    const types = {
        cute: {
            name: "다정다감 댕댕이파 (Cute)",
            description: "당신의 이상형은 애교 많고 사랑스러운 '댕댕이' 같은 사람입니다! 표현에 솔직하고 당신만 바라보는 해바라기 같은 연인에게 마음이 끌리네요. 사소한 것까지 챙겨주고 항상 붙어있고 싶어하는 귀여운 매력에 약하신 편이군요.",
            traits: ["#애교만점", "#순정파", "#사랑꾼", "#대형견재질"],
            color: "text-amber-500",
            icon: Heart,
            bg: "bg-amber-100 dark:bg-amber-900/30",
            match: "고양이상"
        },
        sexy: {
            name: "치명적인 늑대/여우파 (Sexy)",
            description: "당신은 긴장감을 놓을 수 없는 치명적인 매력의 소유자에게 끌립니다. 섹시한 분위기와 카리스마, 거부할 수 없는 매력을 가진 사람에게 설렘을 느낌니다. 평범한 연애보다는 불같은 사랑을 꿈꾸는 타입이시군요!",
            traits: ["#치명적", "#섹시도발", "#카리스마", "#심쿵유발"],
            color: "text-red-600",
            icon: Sparkles,
            bg: "bg-red-100 dark:bg-red-900/30",
            match: "곰상"
        },
        reliable: {
            name: "든든한 곰돌이파 (Reliable)",
            description: "당신은 묵묵히 내 곁을 지켜주는 든든한 나무 같은 사람을 선호합니다. 감정 기복이 적고 이해심이 넓어 당신을 포근하게 감싸줄 수 있는 사람이 이상형이네요. 함께 있을 때 가장 나다워질 수 있는 편안한 연애를 추구합니다.",
            traits: ["#듬직함", "#신뢰감", "#배려왕", "#결혼상대1위"],
            color: "text-emerald-600",
            icon: Coffee,
            bg: "bg-emerald-100 dark:bg-emerald-900/30",
            match: "토끼상"
        },
        fresh: {
            name: "상큼발랄 과즙파 (Fresh)",
            description: "당신은 보기만 해도 기분이 좋아지는 인간 비타민 같은 사람에게 끌립니다. 긍정적인 에너지와 유쾌한 성격으로 당신의 삶에 활력을 불어넣어 줄 사람을 찾고 있군요. 친구처럼 장난치며 웃을 수 있는 연애가 딱입니다!",
            traits: ["#비타민", "#분위기메이커", "#긍정왕", "#유머감각"],
            color: "text-orange-500",
            icon: Sun,
            bg: "bg-orange-100 dark:bg-orange-900/30",
            match: "강아지상"
        },
        smart: {
            name: "스마트한 뇌섹남녀파 (Smart)",
            description: "당신은 배울 점이 많고 자기 일에 열정적인 스마트한 사람에게 호감을 느낍니다. 지적인 대화가 통하고, 서로의 성장을 응원해줄 수 있는 성숙한 관계를 지향합니다. 프로페셔널한 모습에서 섹시함을 느끼는 타입이시군요!",
            traits: ["#뇌섹남녀", "#자기관리", "#지적임", "#어른미"],
            color: "text-indigo-600",
            icon: BookOpen,
            bg: "bg-indigo-100 dark:bg-indigo-900/30",
            match: "여우상"
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
            // Final step handled by handleFinalAnswer directly on click
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
        setScores({ cute: 0, sexy: 0, reliable: 0, fresh: 0, smart: 0 });
        setResult(null);
    };

    const shareResult = () => {
        if (navigator.share) {
            navigator.share({
                title: '이상형 찾기 테스트',
                text: `나의 이상형은: ${types[result].name}`,
                url: window.location.href,
            });
        } else {
            alert('링크가 복사되었습니다!');
            navigator.clipboard.writeText(window.location.href);
        }
    };

    
    const toolFaqs = [
        {
            "q": "이상형 찾기 테스트는 어떤 로직인가요?",
            "a": "본인의 평소 데이트 성향, 연락 빈도, 애정 표현 방식을 분석하여 이를 가장 잘 보완해주거나 잘 맞는 이성 타입을 매칭해주는 로직입니다."
        },
        {
            "q": "결과에 나온 이상형과 제 현실 애인이 다르면 어떡하죠?",
            "a": "연애에는 정답이 없습니다! 서로 부족한 점을 맞춰가는 과정이 더 중요하니, 재미있는 테스트 결과로만 즐겨주세요."
        }
    ];
    const toolSteps = [
        "내가 선호하는 데이트 장소, 카톡 답장 스타일, 기념일 챙기는 방식 등에 대한 질문에 답합니다.",
        "모든 문항을 마치고 버튼을 누릅니다.",
        "나에게 가장 잘 조화되는 '운명의 이상형'의 묘사와 특징 해시태그를 확인합니다."
    ];
    const toolTips = [
        "연인과 함께 서로의 이상형을 테스트해 보고, 각자가 원하는 연애 스타일을 대화로 나눠보는 좋은 기회로 삼으세요.",
        "친구들과 어떤 이상형 결과를 받았는지 서로 비교해 보는 것도 흥미롭습니다."
    ];

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <SEO
                title="이상형 찾기 테스트 | 나에게 딱 맞는 이상형은?"
                description="나의 연애 스타일로 알아보는 이상형 테스트! 다정다감 댕댕이, 섹시한 여우, 듬직한 곰돌이 등 나에게 운명처럼 끌리는 이성 스타일을 찾아보세요."
                keywords="이상형테스트, 연애테스트, 이상형찾기, 심리테스트, 연애스타일"
                category="운세/재미"
                faqs={toolFaqs}
                steps={toolSteps}
            />

            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4 animate-fade-in">
                    💘 이상형 찾기 테스트 💘
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                    내 마음속 깊은 곳, 진짜 이상형은 누구일까?
                </p>
            </div>

            <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden p-8 transition-all duration-300 min-h-[500px] flex flex-col justify-center">
                {step < questions.length ? (
                    <div className="animate-fade-in">
                        <div className="mb-8 flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-500">Question {step + 1} / {questions.length}</span>
                            <div className="w-1/2 h-2 bg-gray-200 rounded-full">
                                <div
                                    className="h-full bg-pink-500 rounded-full transition-all duration-300"
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
                                    className="w-full p-6 text-lg text-left bg-gray-50 dark:bg-gray-700 hover:bg-pink-50 dark:hover:bg-gray-600 border-2 border-transparent hover:border-pink-500 rounded-2xl transition-all duration-200 transform hover:-translate-y-1"
                                >
                                    {answer.text}
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="text-center animate-scale-in">
                        <div className={`inline-block p-6 rounded-full ${types[result].bg} mb-6`}>
                            {React.createElement(types[result].icon, { className: `w-20 h-20 ${types[result].color}` })}
                        </div>

                        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                            당신의 운명의 짝은 <br /><span className={types[result].color}>{types[result].name}</span>
                        </h2>

                        <div className="flex flex-wrap justify-center gap-2 mb-6 mt-4">
                            {types[result].traits.map((trait, i) => (
                                <span key={i} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm font-medium text-gray-600 dark:text-gray-300">
                                    {trait}
                                </span>
                            ))}
                        </div>

                        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed whitespace-pre-wrap px-4 bg-gray-50 dark:bg-gray-700/50 py-6 rounded-2xl">
                            {types[result].description}
                        </p>

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
                                className="flex items-center px-6 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-xl font-bold shadow-lg shadow-pink-500/30 transition-all transform hover:-translate-y-1"
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
                    title="이상형 찾기 테스트 안내"
                    intro="나의 연애 스타일로 알아보는 이상형 테스트! 다정다감 댕댕이, 섹시한 여우, 듬직한 곰돌이 등 나에게 운명처럼 끌리는 이성 스타일을 찾아보세요."
                    steps={toolSteps}
                    tips={toolTips}
                    faqs={toolFaqs}
                />
            </div>
        </div>
    );
};

export default IdealType;
