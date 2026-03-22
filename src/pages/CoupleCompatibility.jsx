import React, { useState } from 'react';

import { Share2, RefreshCw, Heart, User, Sparkles } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';

const CoupleCompatibility = () => {
    const [names, setNames] = useState({ person1: '', person2: '' });
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    // Simple hash function to generate a consistent score from names
    const calculateScore = (name1, name2) => {
        const combined = [name1, name2].sort().join('');
        let hash = 0;
        for (let i = 0; i < combined.length; i++) {
            const char = combined.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return Math.abs(hash % 101); // 0-100 score
    };

    const getMessage = (score) => {
        if (score >= 90) return { title: "환상의 천생연분! ❤️", desc: "이보다 더 좋을 순 없다! 전생에 부부였을지도 모르는 완벽한 궁합입니다." };
        if (score >= 70) return { title: "찰떡궁합 커플 🍯", desc: "서로를 너무 잘 아는 잉꼬 부부 같은 사이! 조금만 배려하면 평생 함께할 인연입니다." };
        if (score >= 50) return { title: "노력하면 좋은 사이 🤝", desc: "서로 다른 점도 있지만, 맞춰가며 사랑을 키워나갈 수 있는 평범하고 좋은 사이입니다." };
        if (score >= 30) return { title: "조금은 위험한 사이? 🔥", desc: "사랑하지만 자주 싸울 수 있는 애증의 관계! 서로의 다름을 인정하는 것이 중요해요." };
        return { title: "우리는 로미오와 줄리엣? 💔", desc: "극과 극은 통한다지만... 서로를 이해하기 위해 많은 노력이 필요한 사이입니다." };
    };

    const handleAnalyze = () => {
        if (!names.person1 || !names.person2) {
            alert('두 사람의 이름을 모두 입력해주세요!');
            return;
        }

        setLoading(true);

        // Simulating analyzing delay for effect
        setTimeout(() => {
            const score = calculateScore(names.person1, names.person2);
            setResult({
                score,
                ...getMessage(score)
            });
            setLoading(false);
        }, 1500);
    };

    const resetTest = () => {
        setNames({ person1: '', person2: '' });
        setResult(null);
    };

    const shareResult = () => {
        if (navigator.share) {
            navigator.share({
                title: '커플 궁합 테스트',
                text: `${names.person1}님과 ${names.person2}님의 궁합 점수는 ${result.score}점! - ${result.title}`,
                url: window.location.href,
            });
        } else {
            alert('링크가 복사되었습니다!');
            navigator.clipboard.writeText(window.location.href);
        }
    };

    
    const toolFaqs = [
        {
            "q": "이름 궁합의 원리가 무엇인가요?",
            "a": "전통적인 한글 이름의 획수를 기반으로 두 사람 이름의 획수를 더해가며 최종 확률(%)을 계산하는 재미 위주의 궁합 공식입니다."
        },
        {
            "q": "점수가 너무 낮게 나왔어요!",
            "a": "이름 획수만으로 계산하는 단순한 유희거리이므로, 실제 두 사람의 애정 전선이나 운명과는 전혀 무관하니 재미로만 즐겨주세요."
        }
    ];
    const toolSteps = [
        "본인의 이름과 상대방(연인, 썸남/썸녀, 최애 등)의 이름을 각각 입력합니다.",
        "결과 확인 버튼을 누릅니다.",
        "애니메이션과 함께 도출된 우리 두 사람의 궁합 점수(%)를 확인합니다."
    ];
    const toolTips = [
        "현실 연인 뿐만 아니라, 연예인이나 좋아하는 캐릭터의 이름을 넣어보는 것도 재미있습니다.",
        "결과 이미지를 카카오톡으로 공유하여 상대방의 반응을 살펴보세요."
    ];

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <SEO
                title="커플 궁합 테스트 | 우리 사이 몇 점일까?"
                description="재미로 보는 커플 이름 궁합 테스트! 좋아하는 사람, 썸남썸녀, 연인과의 궁합 점수를 확인해보세요. 이름만 입력하면 바로 결과가 나옵니다."
                keywords="궁합테스트, 이름궁합, 커플궁합, 연애운, 속궁합, 썸궁합"
                category="운세/재미"
                faqs={toolFaqs}
                steps={toolSteps}
            />

            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4 animate-fade-in">
                    💑 커플 궁합 테스트
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                    우리 둘의 이름으로 보는 사랑의 궁합 점수는?
                </p>
            </div>

            <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden p-8 transition-all duration-300 min-h-[400px] flex flex-col justify-center">
                {!result ? (
                    <div className="animate-fade-in space-y-8">
                        <div className="flex flex-col md:flex-row gap-6 items-center justify-center">
                            <div className="w-full">
                                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">당신의 이름</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="홍길동"
                                        value={names.person1}
                                        onChange={(e) => setNames({ ...names, person1: e.target.value })}
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none transition-all"
                                    />
                                </div>
                            </div>
                            <div className="hidden md:block text-pink-500">
                                <Heart className="w-8 h-8 animate-pulse" fill="currentColor" />
                            </div>
                            <div className="w-full">
                                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">상대방 이름</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-pink-400" />
                                    <input
                                        type="text"
                                        placeholder="김태희"
                                        value={names.person2}
                                        onChange={(e) => setNames({ ...names, person2: e.target.value })}
                                        className="w-full pl-12 pr-4 py-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-pink-500 outline-none transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleAnalyze}
                            disabled={loading}
                            className={`w-full py-4 text-xl font-bold text-white rounded-xl shadow-lg transition-all transform hover:-translate-y-1 ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 shadow-pink-500/30'
                                }`}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center">
                                    <RefreshCw className="w-6 h-6 animate-spin mr-2" />
                                    궁합 분석 중...
                                </span>
                            ) : (
                                <span className="flex items-center justify-center">
                                    <Sparkles className="w-6 h-6 mr-2" />
                                    궁합 보기
                                </span>
                            )}
                        </button>
                    </div>
                ) : (
                    <div className="text-center animate-scale-in space-y-8">
                        <div>
                            <div className="flex items-center justify-center gap-4 text-2xl font-bold text-gray-800 dark:text-white mb-2">
                                <span>{names.person1}</span>
                                <Heart className="w-6 h-6 text-pink-500 animate-pulse" fill="currentColor" />
                                <span>{names.person2}</span>
                            </div>
                            <p className="text-gray-500 dark:text-gray-400">두 사람의 궁합 점수는?</p>
                        </div>

                        <div className="relative inline-block">
                            <svg className="w-48 h-48 transform -rotate-90">
                                <circle
                                    className="text-gray-200 dark:text-gray-700"
                                    strokeWidth="10"
                                    stroke="currentColor"
                                    fill="transparent"
                                    r="80"
                                    cx="96"
                                    cy="96"
                                />
                                <circle
                                    className="text-pink-500 transition-all duration-1000 ease-out"
                                    strokeWidth="10"
                                    strokeDasharray={502}
                                    strokeDashoffset={502 - (502 * result.score) / 100}
                                    strokeLinecap="round"
                                    stroke="currentColor"
                                    fill="transparent"
                                    r="80"
                                    cx="96"
                                    cy="96"
                                />
                            </svg>
                            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                                <span className="text-5xl font-bold text-pink-600 dark:text-pink-400">{result.score}</span>
                                <span className="text-xl text-gray-500">점</span>
                            </div>
                        </div>

                        <div className="bg-pink-50 dark:bg-pink-900/20 p-6 rounded-2xl">
                            <h3 className="text-2xl font-bold text-pink-600 dark:text-pink-400 mb-2">{result.title}</h3>
                            <p className="text-gray-700 dark:text-gray-300">
                                {result.desc}
                            </p>
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
                    title="커플 궁합 테스트 안내"
                    intro="재미로 보는 커플 이름 궁합 테스트! 좋아하는 사람, 썸남썸녀, 연인과의 궁합 점수를 확인해보세요. 이름만 입력하면 바로 결과가 나옵니다."
                    steps={toolSteps}
                    tips={toolTips}
                    faqs={toolFaqs}
                />
            </div>
        </div>
    );
};

export default CoupleCompatibility;
