import React, { useState } from 'react';
import { Share2, RefreshCw, MessageSquare, Users, ThumbsUp, ThumbsDown } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';

const DebateTest = () => {
    const [step, setStep] = useState('intro'); // intro, test, result
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [userChoices, setUserChoices] = useState([]);

    const questions = [
        {
            id: 1,
            title: "깻잎 논쟁",
            desc: "나, 연인, 내 친구가 밥을 먹는데 친구가 깻잎을 못 떼고 끙끙댄다. 이때 연인이 젓가락으로 깻잎을 잡아준다면?",
            options: [
                { text: "상관없다. 잡아줘도 된다.", type: 'okay', percent: 45 },
                { text: "절대 안 된다. 굳이?", type: 'nope', percent: 55 }
            ]
        },
        {
            id: 2,
            title: "새우깡 논쟁",
            desc: "연인이 내 친구에게 새우 껍질을 까준다면?",
            options: [
                { text: "미친 거 아냐? 바로 이별각", type: 'nope', percent: 90 },
                { text: "친절하네... 하고 넘어간다.", type: 'okay', percent: 10 }
            ]
        },
        {
            id: 3,
            title: "패딩 논쟁",
            desc: "연인이 내 친구의 패딩 지퍼를 올려준다면?",
            options: [
                { text: "절대 안 된다. 선 넘네.", type: 'nope', percent: 85 },
                { text: "손 시려우니까 도와줄 수 있지.", type: 'okay', percent: 15 }
            ]
        },
        {
            id: 4,
            title: "블루투스 논쟁",
            desc: "연인 차에 내 친구가 블루투스 연결해도 되나?",
            options: [
                { text: "어차피 음악 듣는 건데 뭐 어때.", type: 'okay', percent: 60 },
                { text: "내 차도 아닌데 왜 연결함? 기분 나쁨.", type: 'nope', percent: 40 }
            ]
        },
        {
            id: 5,
            title: "이성 친구와의 술자리",
            desc: "연인이 나 몰래 이성 친구와 단둘이 술을 마셨다면?",
            options: [
                { text: "말 안 한 게 문제지, 친구면 상관없음.", type: 'okay', percent: 30 },
                { text: "남녀 사이에 단둘이 술? 절대 안 됨.", type: 'nope', percent: 70 }
            ]
        },
        {
            id: 6,
            title: "결혼식 하객 패션",
            desc: "내 결혼식에 친구가 흰 원피스를 입고 왔다면?",
            options: [
                { text: "손절 각. 예의가 없다.", type: 'nope', percent: 80 },
                { text: "예쁘게 입고 온 건데 뭐... 신경 안 씀.", type: 'okay', percent: 20 }
            ]
        }
    ];

    const getAnalysis = (choices) => {
        let openMindScore = choices.filter(c => c === 'okay').length;
        if (openMindScore >= 5) return {
            title: '열린교회 닫힘 문', desc: "당신은 쿨함 그 자체! 웬만한 일에는 눈 하나 깜짝 안 하는 대인배시군요. 하지만 연인이 서운해할 수도 있어요.", icon: ThumbsUp, color: "text-blue-500", bg: "bg-blue-50"
        };
        if (openMindScore >= 3) return {
            title: '유교걸/유교보이', desc: "적당히 쿨하면서도 지킬 건 지키는 스타일! 보편적인 도덕관념을 가지고 계시네요.", icon: Users, color: "text-purple-500", bg: "bg-purple-50"
        };
        return {
            title: '흥선대원군', desc: "절대 안 돼! 보수적인 연애관을 가지고 계시군요. 내 연인은 내가 지킨다! 질투의 화신일 수도?", icon: ThumbsDown, color: "text-red-500", bg: "bg-red-50"
        };
    };

    const handleAnswer = (choice) => {
        const newChoices = [...userChoices, choice];
        setUserChoices(newChoices);

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(prev => prev + 1);
        } else {
            setStep('result');
        }
    };

    const resetTest = () => {
        setStep('intro');
        setCurrentQuestion(0);
        setUserChoices([]);
    };

    const shareResult = () => {
        const result = getAnalysis(userChoices);
        if (navigator.share) {
            navigator.share({
                title: '깻잎 논쟁 테스트',
                text: `나의 유교력 테스트 결과는? [${result.title}] - Utility Hub`,
                url: window.location.href,
            });
        } else {
            alert('링크가 복사되었습니다!');
            navigator.clipboard.writeText(window.location.href);
        }
    };

    const debateFaqs = [
        { q: "친구의 패딩 지퍼를 올려주는 게 왜 문제가 되나요?", a: "연인 외의 이성에게 불필요한 스킨십이나 과도한 친절을 베푸는 것은 오해를 불러일으킬 수 있다는 입장이 많습니다. 물론 사람마다 허용 범위는 다릅니다!" },
        { q: "이런 논쟁으로 진짜 싸우는 커플이 있나요?", a: "생각보다 많습니다. 각자의 가치관과 질투의 기준이 다르기 때문에, 평소 대화를 통해 서로의 '선'을 맞춰가는 과정이 중요합니다." },
        { q: "결과에 나온 '유교걸/유교보이'는 무슨 뜻인가요?", a: "한국의 전통적인 유교 사상처럼 보수적이고 엄격한 도덕적 기준(특히 남녀 관계에서)을 가진 사람을 재미있게 부르는 밈(Meme)입니다." }
    ];

    const debateSteps = [
        "6가지의 대표적인 연애 논쟁 상황(깻잎, 새우깡, 패딩 등)을 확인합니다.",
        "각 상황에서 나는 어떻게 반응할지, 허용 가능한 선인지 솔직하게 선택합니다.",
        "나의 선택을 바탕으로 분석된 나의 '유교력(보수성)' 등급을 확인합니다.",
        "다른 사람들의 평균 선택 데이터(다수파/소수파)와 나의 의견을 비교해봅니다."
    ];

    const debateTips = [
        "정답이 없는 문제이니 연인과 함께 테스트하며 서로의 생각을 공유해보세요.",
        "결과가 다르다고 싸우지 말고, 서로의 가치관 차이를 이해하는 재미 요소로 즐겨주세요.",
        "친구들과 단톡방에 결과를 공유하고 누가 가장 보수적인지 알아보는 것도 좋습니다!"
    ];

    return (
        <div className="max-w-2xl mx-auto px-4 py-12">
            <SEO
                title="깻잎 논쟁 테스트 | 연애 논쟁 밸런스 게임"
                description="깻잎 논쟁, 새우깡 논쟁 등 핫한 연애 논쟁! 과연 당신의 선택은? 다수결 결과와 내 선택을 비교하고 나의 유교력을 테스트해보세요."
                keywords="깻잎논쟁, 패딩논쟁, 연애논쟁, 밸런스게임, 커플논쟁, debate test"
                category="운세/재미"
                faqs={debateFaqs}
                steps={debateSteps}
            />

            {step === 'intro' && (
                <div className="text-center animate-fade-in bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl">
                    <MessageSquare className="w-24 h-24 text-green-500 mx-auto mb-6 animate-pulse" />
                    <h1 className="text-3xl md:text-4xl font-black text-gray-800 dark:text-white mb-4">
                        대국민 깻잎 논쟁
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                        애인이 내 친구 깻잎 떼줘도 된다? 안 된다?<br />
                        수많은 커플을 싸우게 만든 그 논쟁들!<br />
                        당신의 유교력을 테스트해드립니다.
                    </p>
                    <button
                        onClick={() => setStep('test')}
                        className="w-full py-4 bg-green-500 hover:bg-green-600 text-white text-xl font-bold rounded-2xl shadow-lg transition-transform hover:scale-105"
                    >
                        참전하기
                    </button>
                    <p className="mt-4 text-xs text-gray-400">* 싸움 조장 주의</p>
                </div>
            )}

            {step === 'test' && (
                <div className="animate-fade-in">
                    <div className="mb-6 flex justify-between items-center text-sm font-bold text-gray-400">
                        <span>ROUND {currentQuestion + 1}</span>
                        <span>{currentQuestion + 1} / {questions.length}</span>
                    </div>

                    <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg text-center mb-8">
                        <span className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 rounded-full text-sm font-bold mb-4">
                            {questions[currentQuestion].title}
                        </span>
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white leading-relaxed">
                            "{questions[currentQuestion].desc}"
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {questions[currentQuestion].options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleAnswer(option.type)}
                                className={`py-6 px-4 rounded-2xl text-lg font-bold shadow-md transition-all h-full
                                    ${index === 0
                                        ? 'bg-blue-50 hover:bg-blue-100 text-blue-700 border-2 border-blue-200'
                                        : 'bg-red-50 hover:bg-red-100 text-red-700 border-2 border-red-200'
                                    }
                                `}
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
                        {getAnalysis(userChoices).icon({ className: `w-24 h-24 mx-auto animate-bounce ${getAnalysis(userChoices).color}` })}
                    </div>

                    <span className="text-gray-500 dark:text-gray-400 font-bold">당신의 유교 레벨</span>
                    <h2 className={`text-3xl md:text-4xl font-black mt-2 mb-6 ${getAnalysis(userChoices).color}`}>
                        {getAnalysis(userChoices).title}
                    </h2>

                    <div className={`p-6 rounded-2xl mb-8 ${getAnalysis(userChoices).bg} dark:bg-opacity-10 text-left`}>
                        <p className="text-lg text-gray-800 dark:text-gray-200 leading-relaxed font-bold mb-4">
                            {getAnalysis(userChoices).desc}
                        </p>
                    </div>

                    <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-2xl mb-8 text-left">
                        <h3 className="font-bold text-gray-700 dark:text-white mb-4 border-b pb-2 border-gray-300 dark:border-gray-600">📊 다른 사람들은? (평균 데이터)</h3>
                        <div className="space-y-4">
                            {questions.map((q, i) => {
                                // Find stats
                                const myChoice = userChoices[i];
                                const myOption = q.options.find(o => o.type === myChoice);
                                const majority = q.options[0].percent > q.options[1].percent ? q.options[0] : q.options[1];

                                return (
                                    <div key={i} className="flex justify-between items-center text-sm">
                                        <span className="text-gray-600 dark:text-gray-300 w-1/3 truncate font-medium">{q.title}</span>
                                        <span className={`w-1/3 text-center font-bold ${myChoice === majority.type ? 'text-blue-500' : 'text-red-500'}`}>
                                            {myChoice === majority.type ? '다수파' : '소수파'}
                                        </span>
                                        <span className="w-1/3 text-right text-gray-500 dark:text-gray-400">
                                            {myOption.percent}%와 같은 선택
                                        </span>
                                    </div>
                                );
                            })}
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
                            className="flex-1 py-4 bg-green-500 hover:bg-green-600 text-white rounded-2xl font-bold shadow-lg shadow-green-500/30 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-1"
                        >
                            <Share2 className="w-5 h-5" />
                            공유하기
                        </button>
                    </div>
                </div>
            )}

            <ToolGuide
                title="깻잎 논쟁 테스트 안내"
                intro="연인 사이에서 흔히 일어나는, 하지만 정답은 없는 핫한 연애 논쟁들을 모아봤습니다. 나의 관대한 정도(유교력)를 테스트해보고 다른 사람들의 평균적인 생각과 비교해보세요."
                steps={debateSteps}
                tips={debateTips}
                faqs={debateFaqs}
            />
        </div>
    );
};

export default DebateTest;
