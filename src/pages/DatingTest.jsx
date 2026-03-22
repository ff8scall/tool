import React, { useState } from 'react';

import { Share2, RefreshCw, Heart, GraduationCap, CheckCircle2 } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';

const DatingTest = () => {
    const [step, setStep] = useState('intro'); // intro, test, result
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    const questions = [
        {
            id: 1,
            question: "연인이 갑자기 '나 오늘 뭐 달라진 거 없어?'라고 묻는다. 정답은?",
            options: [
                { text: "머리 잘랐어? (변화를 찾는다)", score: 5 },
                { text: "오늘 좀 예쁜데? (일단 칭찬부터)", score: 10 },
                { text: "글쎄... 모르겠는데?", score: 0 },
                { text: "옷 샀어?", score: 5 }
            ]
        },
        {
            id: 2,
            question: "연락이 3시간째 안 되는 연인... 어떻게 할까?",
            options: [
                { text: "부재중 전화 30통 남기기", score: 0 },
                { text: "'바쁜가보다' 생각하고 내 할 일 하기", score: 10 },
                { text: "친구들에게 어디냐고 수소문하기", score: 3 },
                { text: "기다리다가 1시간 뒤에 카톡 남기기", score: 8 }
            ]
        },
        {
            id: 3,
            question: "기념일 선물을 준비하려고 한다. 가장 좋은 방법은?",
            options: [
                { text: "내 마음에 드는 걸로 서프라이즈", score: 5 },
                { text: "평소에 연인이 갖고 싶어했던 것 기억해서 사기", score: 10 },
                { text: "가장 비싼 명품 선물", score: 7 },
                { text: "현금이 최고지 (봉투 준비)", score: 8 }
            ]
        },
        {
            id: 4,
            question: "연인이 '나 살찐 것 같아...'라고 한다. 나의 대답은?",
            options: [
                { text: "응, 좀 찐 것 같네. 운동하자.", score: 0 },
                { text: "아냐, 지금이 딱 보기 좋아! (거짓말)", score: 8 },
                { text: "살이 어디 쪄! 맛있는 거 먹으러 가자.", score: 10 },
                { text: "체중계 올라가 봐.", score: -5 }
            ]
        },
        {
            id: 5,
            question: "첫 데이트 후 애프터 신청 타이밍은?",
            options: [
                { text: "헤어지고 집에 가는 길에 바로 카톡", score: 10 },
                { text: "3일 뒤 (밀당의 정석)", score: 2 },
                { text: "상대가 연락할 때까지 기다림", score: 0 },
                { text: "다음 날 점심시간쯤", score: 7 }
            ]
        },
        {
            id: 6,
            question: "연인이 회사 상사 때문에 힘들다고 하소연한다. 반응은?",
            options: [
                { text: "네가 실수한 거 아니야? (객관적 분석)", score: 0 },
                { text: "그 상사 완전 또라이네! (무조건적 공감)", score: 10 },
                { text: "퇴사해! 내가 먹여 살릴게!", score: 5 },
                { text: "원래 회사가 다 그래. 참아.", score: -5 }
            ]
        },
        {
            id: 7,
            question: "주말에 쉬고 싶은데 연인이 놀러 가자고 조른다.",
            options: [
                { text: "나 피곤해. 집에서 쉴래.", score: 2 },
                { text: "그래 가자! (피곤함을 숨김)", score: 8 },
                { text: "오늘은 집에서 쉬고 내일 좋은 데 가자!", score: 10 },
                { text: "너 혼자 다녀와.", score: -10 }
            ]
        }
    ];

    const getRank = (finalScore) => {
        if (finalScore >= 65) return { tier: '다이아몬드', title: '연애 고수', desc: '당신은 완벽한 연애 천재! 상대방의 마음을 읽는 독심술사 수준이네요.', color: 'text-blue-500' };
        if (finalScore >= 50) return { tier: '골드', title: '연애 중수', desc: '센스 만점! 연애하는 데 큰 문제는 없겠어요.', color: 'text-yellow-500' };
        if (finalScore >= 30) return { tier: '실버', title: '연애 초보', desc: '조금 더 노력이 필요해요. 눈치를 좀 더 길러보세요!', color: 'text-gray-400' };
        return { tier: '브론즈', title: '연애 고자', desc: '혹시 모태솔로...? 연애 세포 심폐소생술이 시급합니다.', color: 'text-orange-700' };
    };

    const handleAnswer = (points) => {
        if (selectedAnswer !== null) return;

        setSelectedAnswer(true);
        const nextScore = score + points;
        setScore(nextScore);

        setTimeout(() => {
            if (currentQuestion < questions.length - 1) {
                setCurrentQuestion(prev => prev + 1);
                setSelectedAnswer(null);
            } else {
                setStep('result');
            }
        }, 500);
    };

    const resetTest = () => {
        setStep('intro');
        setCurrentQuestion(0);
        setScore(0);
        setSelectedAnswer(null);
    };

    const shareResult = () => {
        const rank = getRank(score);
        if (navigator.share) {
            navigator.share({
                title: '연애 능력 고사',
                text: `나의 연애 티어는? ${rank.tier} (${score}점) - Utility Hub`,
                url: window.location.href,
            });
        } else {
            alert('링크가 복사되었습니다!');
            navigator.clipboard.writeText(window.location.href);
        }
    };

    
    const toolFaqs = [
        {
            "q": "연애 능력 고사가 뭔가요?",
            "a": "연애나 썸 상황에서 발생할 수 있는 다양하고 난감한 에피소드들에 대해 본인이 어떻게 대처할지를 묻는 상황극 퀴즈입니다."
        },
        {
            "q": "결과에 나오는 티어(등급)는 어떻게 나뉘나요?",
            "a": "선택한 대답의 센스 점수를 종합하여, 모태솔로 수준부터 연애 고수(마스터) 수준까지 다양한 등급으로 결과를 판별해 줍니다."
        }
    ];
    const toolSteps = [
        "제시되는 연애 관련 상황극 문항을 주의 깊게 읽습니다.",
        "보기 중 가장 나의 평소 성향과 맞거나 올바르다고 생각되는 대처법을 고릅니다.",
        "모든 문항 완료 후 나의 연애 능력 등급과 해설을 확인합니다."
    ];
    const toolTips = [
        "너무 깊게 계산하기보다는, 상황을 마주했을 때 직관적으로 할 것 같은 행동을 고르세요.",
        "연인이나 썸 타는 사람과 함께 풀어보고 서로의 연애 가치관을 비교해 보는 것을 추천합니다."
    ];

    return (
        <div className="max-w-2xl mx-auto px-4 py-12">
            <SEO
                title="연애 능력 고사 | 나의 연애 센스 점수는?"
                description="난감한 연애 상황 퀴즈! 당신의 대처 능력은? 연애 티어를 측정해드립니다."
                keywords="연애능력고사, 연애퀴즈, 연애센스, 연애고수, 심리테스트"
                category="운세/재미"
                faqs={toolFaqs}
                steps={toolSteps}
            />

            {step === 'intro' && (
                <div className="text-center animate-fade-in bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl">
                    <GraduationCap className="w-24 h-24 text-pink-500 mx-auto mb-6" />
                    <h1 className="text-3xl md:text-4xl font-black text-gray-800 dark:text-white mb-4">
                        제1회 연애 능력 고사
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                        당신의 연애 세포는 안녕하십니까?<br />
                        현실 고증 100% 상황별 문답으로 알아보는<br />
                        나의 찐 연애 등급 테스트!
                    </p>
                    <div className="flex justify-center gap-2 mb-8 text-sm text-gray-500">
                        <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">총 {questions.length}문제</span>
                        <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">예상 시간 1분</span>
                    </div>
                    <button
                        onClick={() => setStep('test')}
                        className="w-full py-4 bg-pink-500 hover:bg-pink-600 text-white text-xl font-bold rounded-2xl shadow-lg transition-transform hover:scale-105"
                    >
                        시험 응시하기
                    </button>
                    <p className="mt-4 text-xs text-gray-400">* 재미로만 봐주세요</p>
                </div>
            )}

            {step === 'test' && (
                <div className="animate-fade-in">
                    <div className="mb-8">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-pink-500 font-bold">Q{currentQuestion + 1}</span>
                            <span className="text-gray-400 text-sm">{currentQuestion + 1}/{questions.length}</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                            <div
                                className="bg-pink-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                            ></div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg mb-6">
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white leading-relaxed">
                            {questions[currentQuestion].question}
                        </h2>
                    </div>

                    <div className="space-y-3">
                        {questions[currentQuestion].options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleAnswer(option.score)}
                                disabled={selectedAnswer !== null}
                                className="w-full py-4 px-6 bg-white dark:bg-gray-800 hover:bg-pink-50 dark:hover:bg-gray-700 border-2 border-transparent hover:border-pink-300 rounded-2xl text-lg font-medium text-gray-700 dark:text-gray-200 shadow-sm transition-all text-left flex items-center"
                            >
                                <span className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mr-4 text-sm font-bold text-gray-500 flex-shrink-0">
                                    {index + 1}
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
                        <Heart className="w-20 h-20 text-pink-500 mx-auto animate-pulse" fill="currentColor" />
                    </div>

                    <span className="text-gray-500 dark:text-gray-400 font-bold">최종 점수</span>
                    <div className="text-6xl font-black text-gray-800 dark:text-white my-2 mb-6">
                        {score} <span className="text-2xl text-gray-400 font-medium">점</span>
                    </div>

                    <div className={`p-6 bg-gray-50 dark:bg-gray-700/50 rounded-2xl mb-8 border-2 ${score >= 60 ? 'border-pink-200' : 'border-gray-200'} `}>
                        <div className={`text-3xl font-black mb-2 ${getRank(score).color}`}>
                            {getRank(score).tier}
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                            "{getRank(score).title}"
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                            {getRank(score).desc}
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
                    title="연애 능력 고사 안내"
                    intro="난감한 연애 상황 퀴즈! 당신의 대처 능력은? 연애 티어를 측정해드립니다."
                    steps={toolSteps}
                    tips={toolTips}
                    faqs={toolFaqs}
                />
            </div>
        </div>
    );
};

export default DatingTest;
