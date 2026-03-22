import React, { useState } from 'react';

import { Share2, RefreshCw, Smile, Heart, MessageCircle } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';

const SmileDatingTest = () => {
    const [step, setStep] = useState('intro'); // intro, test, result
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [result, setResult] = useState(null);

    const questions = [
        {
            id: 1,
            question: "주말에 데이트 약속이 잡혔다! 나의 기분은?",
            options: [
                { text: "너무 설레서 벌써 옷 뭐 입을지 고민 중!", type: 'E' },
                { text: "좋긴 한데... 나가기 귀찮기도 하고...", type: 'I' }
            ]
        },
        {
            id: 2,
            question: "데이트 장소 도착! 사람이 너무 많다면?",
            options: [
                { text: "와! 여기 핫플인가봐! 신난다!", type: 'E' },
                { text: "기 빨려... 조용한 곳으로 갈까?", type: 'I' }
            ]
        },
        {
            id: 3,
            question: "연인이 우울해 보인다. 나의 반응은?",
            options: [
                { text: "무슨 일 있어? (이유를 묻는다)", type: 'T' },
                { text: "많이 힘들었겠다... (공감해준다)", type: 'F' }
            ]
        },
        {
            id: 4,
            question: "데이트 코스를 짤 때 나는?",
            options: [
                { text: "분 단위로 계획을 세워둔다.", type: 'J' },
                { text: "그날 기분 내키는 대로 간다.", type: 'P' }
            ]
        },
        {
            id: 5,
            question: "연인과 싸우고 난 뒤 나는?",
            options: [
                { text: "바로바로 풀고 넘어가야 직성이 풀린다.", type: 'E' },
                { text: "혼자만의 시간을 가지며 생각을 정리한다.", type: 'I' }
            ]
        },
        {
            id: 6,
            question: "연인이 선물을 줬을 때 나의 속마음은?",
            options: [
                { text: "이게 실용적인가? 얼마일까?", type: 'S' },
                { text: "나를 위해 이걸 골랐다니 감동이야!", type: 'N' } // Simplification for checking MBTI-like traits
            ]
        },
        {
            id: 7,
            question: "맛집에 갔는데 웨이팅이 1시간이라면?",
            options: [
                { text: "다른 맛집을 검색해서 이동한다.", type: 'J' },
                { text: "일단 기다리면서 근처 구경한다.", type: 'P' }
            ]
        },
        {
            id: 8,
            question: "연인이 '나 배 아파'라고 했을 때?",
            options: [
                { text: "약 사다 줄까? 병원 갈래?", type: 'T' },
                { text: "많이 아파? ㅠㅠ 어떡해...", type: 'F' }
            ]
        },
        {
            id: 9,
            question: "소개팅에서 처음 만난 상대가 마음에 든다면?",
            options: [
                { text: "적극적으로 대화를 주도하고 호감을 표현한다.", type: 'E' },
                { text: "수줍게 리액션하며 상대가 다가와주길 기다린다.", type: 'I' }
            ]
        },
        {
            id: 10,
            question: "연애의 끝은 무엇이라고 생각하나?",
            options: [
                { text: "현실적인 결혼과 안정", type: 'S' },
                { text: "영원한 사랑과 낭만", type: 'N' }
            ]
        }
    ];

    const results = {
        'ENTP': { color: 'bg-yellow-400', name: '장난꾸러기 옐로우 스마일', desc: "재치 있고 장난기 넘치는 당신! 지루한 연애는 딱 질색입니다.", match: 'INFJ' },
        'INTP': { color: 'bg-indigo-300', name: '시크한 인디고 스마일', desc: "무심한 듯 챙겨주는 츤데레 매력의 소유자입니다.", match: 'ENTJ' },
        'ESFJ': { color: 'bg-pink-400', name: '다정보스 핑크 스마일', desc: "사랑 넘치고 배려심 깊은 최고의 애인감입니다.", match: 'ISFP' },
        'ISFJ': { color: 'bg-emerald-300', name: '수호천사 에메랄드 스마일', desc: "뒤에서 묵묵히 챙겨주는 헌신적인 사랑꾼입니다.", match: 'ESFP' },
        // ... Implementing a simplified mapping logic for fun.
        // For a viral test, we often map simple counts or combination.
        // Let's use simple logic: Majority of E/I, T/F etc.
    };

    // Mapping logic helper
    const getResult = (answers) => {
        const counts = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
        answers.forEach(a => counts[a]++);

        const mbti = [
            counts.E >= counts.I ? 'E' : 'I',
            counts.S >= counts.N ? 'S' : 'N', // Question 6 & 10 are S/N proxies but for fun lets rely on random distribution if not enough q's
            counts.T >= counts.F ? 'T' : 'F',
            counts.J >= counts.P ? 'J' : 'P'
        ].join('');

        // Specific result mapping (simplified for this demo)
        const mappings = {
            'ISTJ': { color: 'text-slate-600', bg: 'bg-slate-100', name: '원칙주의 그레이 스마일', desc: '약속 시간 칼같이 지키는 신뢰의 아이콘!', sub: '한 번 내 사람음 끝까지 책임지는 든든한 스타일' },
            'ISFJ': { color: 'text-teal-600', bg: 'bg-teal-100', name: '포근한 민트 스마일', desc: '섬세하고 배려심 깊은 평화주의자', sub: '상대방의 기분을 귀신같이 알아차리는 눈치 100단' },
            'INFJ': { color: 'text-green-700', bg: 'bg-green-100', name: '신비로운 딥그린 스마일', desc: '겉은 조용하지만 속은 열정 가득!', sub: '나만의 도덕적 기준이 확고한 철학자 스타일' },
            'INTJ': { color: 'text-purple-800', bg: 'bg-purple-100', name: '치밀한 퍼플 스마일', desc: '연애도 전략이다! 분석적인 로맨티스트', sub: '배울 점이 있는 사람에게 끌리는 뇌섹남녀' },
            'ISTP': { color: 'text-blue-600', bg: 'bg-blue-100', name: '쿨내진동 블루 스마일', desc: '밀당은 귀찮아, 좋으면 직진!', sub: '효율성을 중시하는 현실적인 스타일' },
            'ISFP': { color: 'text-yellow-600', bg: 'bg-yellow-100', name: '예술가 옐로우 스마일', desc: '자유로운 영혼의 소유자', sub: '소소한 행복을 즐길 줄 아는 감성파' },
            'INFP': { color: 'text-rose-400', bg: 'bg-rose-100', name: '몽글몽글 로즈 스마일', desc: '낭만을 꿈꾸는 동화 속 주인공', sub: '마음이 여리고 공감 능력이 뛰어난 치유계' },
            'INTP': { color: 'text-indigo-600', bg: 'bg-indigo-100', name: '로봇감성 인디고 스마일', desc: '엉뚱한 매력의 4차원 천재', sub: '혼자만의 시간이 꼭 필요한 독립적인 스타일' },
            'ESTP': { color: 'text-red-500', bg: 'bg-red-100', name: '화끈한 레드 스마일', desc: '오늘을 즐기는 액션 영화 주인공', sub: '스릴을 즐기는 모험가 스타일' },
            'ESFP': { color: 'text-orange-500', bg: 'bg-orange-100', name: '핵인싸 오렌지 스마일', desc: '분위기 메이커! 노는 게 제일 좋아', sub: '사랑꾼 기질이 다분한 열정맨' },
            'ENFP': { color: 'text-pink-500', bg: 'bg-pink-100', name: '해피바이러스 핑크 스마일', desc: '어딜 가나 사랑받는 강아지상', sub: '금사빠 기질이 있지만 사랑에 빠지면 올인!' },
            'ENTP': { color: 'text-lime-600', bg: 'bg-lime-100', name: '장난꾸러기 라임 스마일', desc: '논쟁을 즐기는 유쾌한 악동', sub: '지적인 대화를 즐기는 창의적인 스타일' },
            'ESTJ': { color: 'text-cyan-700', bg: 'bg-cyan-100', name: '리더십 네이비 스마일', desc: '현실적이고 책임감 강한 보스', sub: '데이트도 일도 완벽하게 해내는 능력자' },
            'ESFJ': { color: 'text-sky-500', bg: 'bg-sky-100', name: '천사표 스카이 스마일', desc: '다정다감한 사교왕', sub: '주변 사람 챙기느라 바쁜 인맥 부자' },
            'ENFJ': { color: 'text-violet-600', bg: 'bg-violet-100', name: '달변가 바이올렛 스마일', desc: '카리스마 넘치는 정의로운 리더', sub: '상대방의 잠재력을 이끌어내는 멘토형 연인' },
            'ENTJ': { color: 'text-gray-800', bg: 'bg-gray-200', name: '야망가 블랙 스마일', desc: '성공을 향해 달리는 불도저', sub: '연인과 함께 성장하고 싶어하는 야심가' },
        };

        // Fallback random or closest if default logic fails (simple logic used above covers standard MBTI)
        // Since questions above don't cover all dimensions perfectly (just a demo), let's ensure we map cleanly.
        // Actually, we need to make sure 'answers' array has types.
        return mappings[mbti] || mappings['ENFP']; // Default to ENFP
    };

    const handleAnswer = (type) => {
        const newAnswers = [...answers, type];
        setAnswers(newAnswers);

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(prev => prev + 1);
        } else {
            const finalResult = getResult(newAnswers);
            setResult(finalResult);
            setStep('result');
        }
    };

    const resetTest = () => {
        setStep('intro');
        setCurrentQuestion(0);
        setAnswers([]);
        setResult(null);
    };

    const shareResult = () => {
        if (navigator.share) {
            navigator.share({
                title: '스마일 연애 테스트',
                text: `나의 연애 유형은? ${result.name} - Utility Hub`,
                url: window.location.href,
            });
        } else {
            alert('링크가 복사되었습니다!');
            navigator.clipboard.writeText(window.location.href);
        }
    };

    
    const toolFaqs = [
        {
            "q": "스마일 연애 테스트는 MBTI랑 관련이 있나요?",
            "a": "네, 대중적으로 잘 알려진 성격 유형 16가지 로직을 바탕으로, 연애 관계에서 나타나는 특성만 쏙쏙 뽑아 귀여운 스마일 캐릭터들에 비유해 주는 테스트입니다."
        },
        {
            "q": "색깔별 스마일은 어떤 의미인가요?",
            "a": "레드 스마일은 열정적, 블루 스마일은 차분하고 이성적 등, 색상과 표정 디자인을 통해 직관적으로 상대방에게 느껴지는 본인의 연애 아우라를 표현합니다."
        }
    ];
    const toolSteps = [
        "데이트 약속을 잡는 방식, 애인이 우울할 때 위로하는 방식 등 연애 상황극 문항을 읽습니다.",
        "본인의 연애 스타일에 가장 부합하는(혹은 과거 연애에서 실제로 그랬던) 답변을 찾아 클릭합니다.",
        "분석이 끝나면 나를 꼭 닮은 컬러 스마일 캐릭터 결과와 연애 장단점을 확인합니다."
    ];
    const toolTips = [
        "현재 썸을 타고 있거나 솔로라면, 맘에 드는 이성에게 링크를 보내 상대방의 스마일 컬러를 확인한 후 궁합을 맞춰보세요.",
        "지나치게 이상적인 내 모습보다는, 현실 연애에서 보여주는 솔직한 내 모습을 베이스로 답변해야 더욱 소름 돋는 결과가 나옵니다."
    ];

    return (
        <div className="max-w-2xl mx-auto px-4 py-12">
            <SEO
                title="스마일 연애 테스트 | 나의 연애 성향 알아보기"
                description="나의 연애 스타일을 스마일 캐릭터로 알아보세요. MBTI 기반의 재미있는 심리 테스트!"
                keywords="연애테스트, 심리테스트, MBTI연애, 스마일테스트, smile dating test"
                category="운세/재미"
                faqs={toolFaqs}
                steps={toolSteps}
            />

            {step === 'intro' && (
                <div className="text-center animate-fade-in bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl">
                    <div className="mb-8 relative inline-block">
                        <Smile className="w-32 h-32 text-yellow-400 mx-auto animate-bounce" />
                        <Heart className="w-12 h-12 text-pink-500 absolute -top-2 -right-2 animate-pulse" fill="currentColor" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black text-gray-800 dark:text-white mb-6">
                        스마일 연애 테스트
                        <span className="block text-lg font-medium text-pink-500 mt-2">나의 연애 성향은 어떤 스마일일까?</span>
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                        간단한 질문으로 알아보는 나의 연애 스타일!<br />
                        나는 어떤 사람과 잘 맞을까요?<br />
                        친구와 함께 테스트해보세요.
                    </p>
                    <button
                        onClick={() => setStep('test')}
                        className="w-full py-4 bg-yellow-400 hover:bg-yellow-500 text-white text-xl font-bold rounded-2xl shadow-lg transition-transform hover:scale-105"
                    >
                        테스트 시작하기
                    </button>
                    <p className="mt-4 text-sm text-gray-400">참여자 수: 1,234,567명</p>
                </div>
            )}

            {step === 'test' && (
                <div className="animate-fade-in">
                    <div className="mb-8">
                        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                            <div
                                className="bg-yellow-400 h-2.5 rounded-full transition-all duration-300"
                                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                            ></div>
                        </div>
                        <div className="text-right text-sm text-gray-400 mt-2">
                            {currentQuestion + 1} / {questions.length}
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl text-center mb-6 min-h-[200px] flex items-center justify-center">
                        <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white leading-relaxed">
                            {questions[currentQuestion].question}
                        </h2>
                    </div>

                    <div className="space-y-4">
                        {questions[currentQuestion].options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleAnswer(option.type)}
                                className="w-full py-4 px-6 bg-white dark:bg-gray-800 hover:bg-yellow-50 dark:hover:bg-gray-700 border-2 border-transparent hover:border-yellow-400 rounded-2xl text-lg font-medium text-gray-700 dark:text-gray-200 shadow-md transition-all text-left"
                            >
                                {option.text}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {step === 'result' && result && (
                <div className="animate-scale-in text-center">
                    <div className={`p-8 rounded-3xl shadow-2xl mb-8 ${result.bg} transition-colors duration-500`}>
                        <div className="mb-6">
                            <Smile className={`w-32 h-32 mx-auto ${result.color}`} strokeWidth={1.5} />
                        </div>
                        <h2 className={`text-2xl md:text-3xl font-black mb-4 ${result.color} dark:brightness-125`}>
                            {result.name}
                        </h2>
                        <div className="bg-white/80 dark:bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 mb-6">
                            <p className="text-lg font-bold text-gray-800 dark:text-white mb-2">
                                "{result.desc}"
                            </p>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">
                                {result.sub}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-left">
                            <div className="bg-white/60 dark:bg-gray-800/60 p-4 rounded-xl">
                                <span className="text-xs font-bold text-gray-500 block mb-1">GOOD MATCH</span>
                                <span className="text-sm font-bold text-gray-800 dark:text-white">잘 맞는 유형</span>
                            </div>
                            <div className="bg-white/60 dark:bg-gray-800/60 p-4 rounded-xl">
                                <span className="text-xs font-bold text-gray-500 block mb-1">BAD MATCH</span>
                                <span className="text-sm font-bold text-gray-800 dark:text-white">안 맞는 유형</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4 justify-center">
                        <button
                            onClick={resetTest}
                            className="flex-1 py-4 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-2xl font-bold shadow-lg transition-all flex items-center justify-center gap-2"
                        >
                            <RefreshCw className="w-5 h-5" />
                            다시하기
                        </button>
                        <button
                            onClick={shareResult}
                            className="flex-1 py-4 bg-yellow-400 hover:bg-yellow-500 text-white rounded-2xl font-bold shadow-lg shadow-yellow-400/30 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-1"
                        >
                            <Share2 className="w-5 h-5" />
                            공유하기
                        </button>
                    </div>
                </div>
            )}
        
            <div className="mt-12">
                <ToolGuide
                    title="스마일 연애 테스트 안내"
                    intro="나의 연애 스타일을 스마일 캐릭터로 알아보세요. MBTI 기반의 재미있는 심리 테스트!"
                    steps={toolSteps}
                    tips={toolTips}
                    faqs={toolFaqs}
                />
            </div>
        </div>
    );
};

export default SmileDatingTest;
