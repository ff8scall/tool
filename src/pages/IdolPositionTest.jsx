import React, { useState } from 'react';

import { Share2, RefreshCw, Mic2, Star, Music, Users } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';

const IdolPositionTest = () => {
    const [step, setStep] = useState('intro'); // intro, test, result
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [scores, setScores] = useState({ vocal: 0, dance: 0, visual: 0, variety: 0, leader: 0 });

    const questions = [
        {
            id: 1,
            question: "오디션을 보게 된 당신! 가장 자신 있는 분야는?",
            options: [
                { text: "천장을 뚫는 고음 발사 (보컬)", type: 'vocal', points: 3 },
                { text: "관절 꺾기 댄스 (댄스)", type: 'dance', points: 3 },
                { text: "숨만 쉬어도 화보 (비주얼)", type: 'visual', points: 3 },
                { text: "분위기 메이커 입담 (예능감)", type: 'variety', points: 3 }
            ]
        },
        {
            id: 2,
            question: "연습생 동기가 안무를 계속 틀린다. 당신의 행동은?",
            options: [
                { text: "따로 불러서 1:1로 가르쳐준다.", type: 'leader', points: 3 },
                { text: "나도 틀릴까 봐 내 연습만 한다.", type: 'dance', points: 1 },
                { text: "괜찮아~ 할 수 있어! 응원해준다.", type: 'variety', points: 2 },
                { text: "틀린 모습도 귀엽네 하고 웃는다.", type: 'visual', points: 1 }
            ]
        },
        {
            id: 3,
            question: "데뷔 무대 엔딩 포즈! 카메라가 나를 잡는다면?",
            options: [
                { text: "치명적인 윙크 발사 😉", type: 'visual', points: 3 },
                { text: "거친 숨을 몰아쉬며 아련한 눈빛", type: 'dance', points: 2 },
                { text: "팬들을 향한 손하트 ❤️", type: 'variety', points: 2 },
                { text: "여유로운 미소와 제스처", type: 'vocal', points: 1 }
            ]
        },
        {
            id: 4,
            question: "예능 프로에 나간 우리 그룹. MC가 개인기를 시킨다면?",
            options: [
                { text: "빼지 않고 흑역사라도 만든다.", type: 'variety', points: 3 },
                { text: "성대모사나 모창을 선보인다.", type: 'vocal', points: 2 },
                { text: "부끄럽지만 시키면 열심히 한다.", type: 'leader', points: 1 },
                { text: "얼굴 개인기라도 한다.", type: 'visual', points: 2 }
            ]
        },
        {
            id: 5,
            question: "그룹 불화설 기사가 났다. 리더로서(혹은 멤버로서) 대처는?",
            options: [
                { text: "멤버들을 모아 긴급 회의를 소집한다.", type: 'leader', points: 3 },
                { text: "SNS에 끈끈한 우정을 과시하는 사진을 올린다.", type: 'visual', points: 2 },
                { text: "라이브 방송을 켜서 팬들을 안심시킨다.", type: 'variety', points: 2 },
                { text: "연습실에서 묵묵히 연습하는 모습을 보여준다.", type: 'dance', points: 2 }
            ]
        },
        {
            id: 6,
            question: "콘서트 중 마이크가 고장 났다!",
            options: [
                { text: "생목으로 더 크게 부른다.", type: 'vocal', points: 3 },
                { text: "재빨리 댄스 브레이크로 시선을 끈다.", type: 'dance', points: 3 },
                { text: "팬들의 호응을 유도하며 시간을 번다.", type: 'variety', points: 2 },
                { text: "다른 멤버 마이크를 자연스럽게 빌린다.", type: 'leader', points: 2 }
            ]
        },
        {
            id: 7,
            question: "팬들이 나를 좋아하는 가장 큰 이유는?",
            options: [
                { text: "믿고 듣는 꿀성대", type: 'vocal', points: 3 },
                { text: "무대를 찢어놓는 퍼포먼스", type: 'dance', points: 3 },
                { text: "비현실적인 외모와 비율", type: 'visual', points: 3 },
                { text: "반전 매력 엉뚱함", type: 'variety', points: 3 }
            ]
        }
    ];

    const getResult = (finalScores) => {
        const categories = Object.keys(finalScores);
        const maxCategory = categories.reduce((a, b) => finalScores[a] > finalScores[b] ? a : b);

        const results = {
            vocal: {
                title: '고막 남친/여친 메인보컬', desc: "CD를 삼킨 듯한 가창력의 소유자! 그룹의 음악적 중심을 잡는 기둥입니다. 3단 고음은 기본, 감성 발라드까지 소화하는 당신은 천생 가수!", icon: Mic2, color: 'text-indigo-500', bg: 'bg-indigo-50'
            },
            dance: {
                title: '무대 천재 메인댄서', desc: "뼈가 없는 듯한 유연함과 파워풀한 춤선! 춤출 때 가장 빛나는 당신은 그룹의 퍼포먼스를 책임집니다. 직캠 조회수 1위는 당신의 것!", icon: Music, color: 'text-rose-500', bg: 'bg-rose-50'
            },
            visual: {
                title: '얼굴 천재 확신의 센터', desc: "존재 자체가 복지! 서 있기만 해도 서사가 완성되는 비주얼입니다. 엔딩 요정은 무조건 당신 차지. 광고계의 러브콜이 끊이지 않겠네요.", icon: Star, color: 'text-yellow-500', bg: 'bg-yellow-50'
            },
            variety: {
                title: '입덕 요정 예능캐', desc: "넘치는 끼와 재치로 방송 분량을 확보하는 능력자! 무대 위와 아래의 갭차이로 팬들을 조련합니다. 당신의 매력에 한 번 빠지면 출구는 없습니다.", icon: Star, color: 'text-orange-500', bg: 'bg-orange-50'
            },
            leader: {
                title: '참된 리더', desc: "따뜻한 카리스마로 멤버들을 이끄는 리더! 멘탈 관리부터 스케줄 정리까지, 당신 없이는 그룹이 돌아가지 않습니다. 팬들이 가장 신뢰하는 멤버입니다.", icon: Users, color: 'text-blue-500', bg: 'bg-blue-50'
            }
        };

        return results[maxCategory];
    };

    const handleAnswer = (type, points) => {
        setScores(prev => ({
            ...prev,
            [type]: prev[type] + points
        }));

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(prev => prev + 1);
        } else {
            setStep('result');
        }
    };

    const resetTest = () => {
        setStep('intro');
        setCurrentQuestion(0);
        setScores({ vocal: 0, dance: 0, visual: 0, variety: 0, leader: 0 });
    };

    const shareResult = () => {
        const result = getResult(scores);
        if (navigator.share) {
            navigator.share({
                title: '아이돌 포지션 테스트',
                text: `내가 아이돌이라면? [${result.title}] - Utility Hub`,
                url: window.location.href,
            });
        } else {
            alert('링크가 복사되었습니다!');
            navigator.clipboard.writeText(window.location.href);
        }
    };

    
    const toolFaqs = [
        {
            "q": "아이돌 포지션 테스트가 무엇인가요?",
            "a": "본인의 성격, 특기, 대인관계 성향을 바탕으로 K-POP 아이돌 그룹 내에서 어떤 포지션(메인보컬, 댄서, 예능캐 등)에 어울릴지 알려줍니다."
        },
        {
            "q": "노래나 춤을 못해도 되나요?",
            "a": "성향과 매력을 통해 가상의 포지션을 부여하는 심리테스트이므로 실제 실력과는 무관하게 누구나 즐길 수 있습니다."
        }
    ];
    const toolSteps = [
        "팀 프로젝트나 단체 생활에서 본인의 역할을 묻는 질문들에 솔직하게 답합니다.",
        "대중들에게 어떻게 보이고 싶은지 등 매력 관련 질문에 응답합니다.",
        "나에게 찰떡인 아이돌 데뷔 포지션과 매력 포인트를 확인합니다."
    ];
    const toolTips = [
        "케이팝 팬이라면, 본인의 결과가 최애 멤버의 포지션과 일치하는지 확인해보는 소소한 재미가 있습니다.",
        "자신의 매력을 어필해야 히는 자기소개 자리에서 참고 용도로 활용해도 좋습니다."
    ];

    return (
        <div className="max-w-2xl mx-auto px-4 py-12">
            <SEO
                title="아이돌 포지션 테스트 | 나는 메보? 센터?"
                description="내가 K-POP 아이돌로 데뷔한다면 어떤 포지션일까? 메인보컬, 댄서, 비주얼 등 나에게 딱 맞는 역할을 찾아보세요."
                keywords="아이돌테스트, 아이돌포지션, kpop, 데뷔, 심리테스트"
                category="운세/재미"
                faqs={toolFaqs}
                steps={toolSteps}
            />

            {step === 'intro' && (
                <div className="text-center animate-fade-in bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl">
                    <Mic2 className="w-24 h-24 text-indigo-500 mx-auto mb-6 animate-pulse" />
                    <h1 className="text-3xl md:text-4xl font-black text-gray-800 dark:text-white mb-4">
                        아이돌 포지션 테스트
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                        상상해 보세요. 당신은 지금 데뷔를 앞둔 연습생!<br />
                        과연 그룹 내에서 당신의 역할은 무엇일까요?<br />
                        센터? 메인보컬? 아니면... 리더?
                    </p>
                    <button
                        onClick={() => setStep('test')}
                        className="w-full py-4 bg-indigo-500 hover:bg-indigo-600 text-white text-xl font-bold rounded-2xl shadow-lg transition-transform hover:scale-105"
                    >
                        오디션 보러 가기
                    </button>
                    <p className="mt-4 text-xs text-gray-400">꿈은★이루어진다</p>
                </div>
            )}

            {step === 'test' && (
                <div className="animate-fade-in">
                    <div className="mb-6 flex justify-between items-center text-sm font-bold text-gray-400">
                        <span>Q{currentQuestion + 1}</span>
                        <span>{currentQuestion + 1} / {questions.length}</span>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg text-center mb-6 min-h-[150px] flex items-center justify-center">
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white leading-relaxed">
                            {questions[currentQuestion].question}
                        </h2>
                    </div>

                    <div className="space-y-3">
                        {questions[currentQuestion].options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleAnswer(option.type, option.points)}
                                className="w-full py-4 px-6 bg-white dark:bg-gray-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 border-2 border-transparent hover:border-indigo-300 rounded-2xl text-lg font-medium text-gray-700 dark:text-gray-200 shadow-sm transition-all text-left"
                            >
                                <span className="mr-3 font-bold text-indigo-400">{index + 1}.</span>
                                {option.text}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {step === 'result' && (() => {
                const result = getResult(scores);
                const ResultIcon = result.icon;
                return (
                    <div className="animate-scale-in text-center bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl">
                        <div className="mb-6">
                            <ResultIcon className={`w-24 h-24 mx-auto animate-bounce ${result.color}`} />
                        </div>

                        <span className="text-gray-500 dark:text-gray-400 font-bold">당신의 데뷔 포지션은</span>
                        <h2 className={`text-3xl md:text-4xl font-black mt-2 mb-6 ${result.color}`}>
                            {result.title}
                        </h2>

                        <div className={`p-6 rounded-2xl mb-8 ${result.bg} dark:bg-opacity-10 text-left`}>
                            <p className="text-lg text-gray-800 dark:text-gray-200 leading-relaxed font-bold">
                                {result.desc}
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
                                className="flex-1 py-4 bg-indigo-500 hover:bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-500/30 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-1"
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
                    title="아이돌 포지션 테스트 안내"
                    intro="내가 K-POP 아이돌로 데뷔한다면 어떤 포지션일까? 메인보컬, 댄서, 비주얼 등 나에게 딱 맞는 역할을 찾아보세요."
                    steps={toolSteps}
                    tips={toolTips}
                    faqs={toolFaqs}
                />
            </div>
        </div>
    );
};

export default IdolPositionTest;
