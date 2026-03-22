import React, { useState, useEffect } from 'react';
import { Star, Heart, Info, Calendar, Sparkles, RefreshCw, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import ShareButtons from '../components/ShareButtons';
import { zodiacSigns, zodiacPersonality, compatibilityData, fortuneMessages } from '../data/HoroscopeData';

const Horoscope = () => {
    const [selectedSign, setSelectedSign] = useState(null);
    const [partnerSign, setPartnerSign] = useState(null);
    const [activeTab, setActiveTab] = useState('fortune'); // fortune, personality, compatibility
    const [today, setToday] = useState(new Date());
    const [fortune, setFortune] = useState(null);

    // 날짜 포맷팅
    const formatDate = (date) => {
        return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
    };

    // 운세 생성 (결정론적 난수 생성)
    const generateFortune = (signId, date) => {
        if (!signId) return null;

        // 시드 생성: 날짜 + 별자리 ID
        const dateStr = `${date.getFullYear()}${date.getMonth()}${date.getDate()}`;
        const seedStr = dateStr + signId;
        let seed = 0;
        for (let i = 0; i < seedStr.length; i++) {
            seed = ((seed << 5) - seed) + seedStr.charCodeAt(i);
            seed |= 0;
        }

        const random = () => {
            const x = Math.sin(seed++) * 10000;
            return x - Math.floor(x);
        };

        // 점수 생성 (0~100)
        const totalScore = Math.floor(random() * 41) + 60; // 60~100점 보장
        const loveScore = Math.floor(random() * 101);
        const wealthScore = Math.floor(random() * 101);
        const healthScore = Math.floor(random() * 101);

        // 메시지 선택
        let messageType = 'medium';
        if (totalScore >= 85) messageType = 'high';
        else if (totalScore <= 65) messageType = 'low';

        const messages = fortuneMessages[messageType];
        const messageIndex = Math.floor(random() * messages.length);

        // 행운의 요소
        const colors = ['빨강', '주황', '노랑', '초록', '파랑', '보라', '분홍', '흰색', '검정', '금색', '은색'];
        const colorIndex = Math.floor(random() * colors.length);
        const number = Math.floor(random() * 99) + 1;

        return {
            totalScore,
            loveScore,
            wealthScore,
            healthScore,
            message: messages[messageIndex],
            luckyColor: colors[colorIndex],
            luckyNumber: number
        };
    };

    useEffect(() => {
        if (selectedSign) {
            setFortune(generateFortune(selectedSign, today));
        }
    }, [selectedSign, today]);

    const handleDateChange = (days) => {
        const newDate = new Date(today);
        newDate.setDate(today.getDate() + days);
        setToday(newDate);
    };

    const getCompatibilityResult = () => {
        if (!selectedSign || !partnerSign) return null;

        const best = compatibilityData.best[selectedSign];
        const good = compatibilityData.good[selectedSign];
        const bad = compatibilityData.bad[selectedSign];

        if (best.includes(partnerSign)) return { score: 95, label: '천생연분', desc: '더할 나위 없이 완벽한 조화입니다. 서로의 부족한 점을 채워주고 장점을 극대화하는 최고의 파트너입니다.', color: 'text-pink-600' };
        if (good.includes(partnerSign)) return { score: 80, label: '좋음', desc: '서로 잘 통하고 즐거운 관계입니다. 약간의 노력으로도 훌륭한 관계를 유지할 수 있습니다.', color: 'text-green-600' };
        if (bad.includes(partnerSign)) return { score: 40, label: '노력 필요', desc: '성향 차이가 있을 수 있습니다. 서로의 다름을 인정하고 이해하려는 노력이 필요합니다.', color: 'text-orange-600' };

        return { score: 60, label: '보통', desc: '무난한 관계입니다. 서로 맞춰가며 알아가는 재미가 있을 것입니다.', color: 'text-blue-600' };
    };

    const compResult = getCompatibilityResult();
    const selectedSignData = zodiacSigns.find(s => s.id === selectedSign);
    const partnerSignData = zodiacSigns.find(s => s.id === partnerSign);

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <SEO
                title="무료 별자리 운세 - 오늘의 운세, 성격, 궁합 | Utility Hub"
                description="매일 확인하는 나의 별자리 운세! 양자리부터 물고기자리까지 12별자리의 오늘의 운세, 성격 분석, 그리고 연인과의 궁합까지 무료로 확인하세요."
                keywords="별자리운세, 오늘의운세, 별자리성격, 별자리궁합, 무료운세, 양자리, 황소자리, 쌍둥이자리, 게자리, 사자자리, 처녀자리, 천칭자리, 전갈자리, 사수자리, 염소자리, 물병자리, 물고기자리"
            />

            <div className="text-center space-y-4 py-6">
                <div className="inline-flex items-center justify-center p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-2">
                    <Star className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">별자리 운세</h1>
                <p className="text-muted-foreground">
                    밤하늘의 별들이 들려주는 당신의 이야기를 확인해보세요.
                </p>
            </div>

            {/* 별자리 선택 그리드 */}
            {!selectedSign ? (
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {zodiacSigns.map((sign) => (
                        <button
                            key={sign.id}
                            onClick={() => setSelectedSign(sign.id)}
                            className="flex flex-col items-center justify-center p-4 bg-card border border-border rounded-xl hover:border-purple-500 hover:shadow-lg hover:-translate-y-1 transition-all group"
                        >
                            <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">{sign.emoji}</div>
                            <div className="font-bold text-sm">{sign.name}</div>
                            <div className="text-xs text-muted-foreground">{sign.date}</div>
                        </button>
                    ))}
                </div>
            ) : (
                <div className="space-y-6 animate-in fade-in duration-500">
                    {/* 선택된 별자리 헤더 & 탭 */}
                    <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
                            <div className="flex items-center gap-4">
                                <div className="text-6xl">{selectedSignData.emoji}</div>
                                <div>
                                    <h2 className="text-2xl font-bold flex items-center gap-2">
                                        {selectedSignData.name}
                                        <button
                                            onClick={() => setSelectedSign(null)}
                                            className="text-xs font-normal text-muted-foreground hover:text-primary underline ml-2"
                                        >
                                            변경
                                        </button>
                                    </h2>
                                    <p className="text-muted-foreground">{selectedSignData.date}</p>
                                </div>
                            </div>
                            <div className="flex gap-2 bg-muted/50 p-1 rounded-lg">
                                {[
                                    { id: 'fortune', label: '오늘의 운세', icon: Sparkles },
                                    { id: 'personality', label: '성격 분석', icon: Info },
                                    { id: 'compatibility', label: '별자리 궁합', icon: Heart }
                                ].map(tab => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${activeTab === tab.id
                                                ? 'bg-white dark:bg-gray-800 text-purple-600 shadow-sm'
                                                : 'text-muted-foreground hover:text-foreground'
                                            }`}
                                    >
                                        <tab.icon className="w-4 h-4" />
                                        <span className="hidden sm:inline">{tab.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* 탭 컨텐츠 */}
                        <div className="mt-4">
                            {activeTab === 'fortune' && fortune && (
                                <div className="space-y-6 animate-in fade-in">
                                    <div className="flex items-center justify-center gap-4 mb-6">
                                        <button onClick={() => handleDateChange(-1)} className="p-2 hover:bg-muted rounded-full"><ArrowRight className="w-5 h-5 rotate-180" /></button>
                                        <div className="flex items-center gap-2 font-bold text-lg">
                                            <Calendar className="w-5 h-5 text-purple-500" />
                                            {formatDate(today)}
                                        </div>
                                        <button onClick={() => handleDateChange(1)} className="p-2 hover:bg-muted rounded-full"><ArrowRight className="w-5 h-5" /></button>
                                    </div>

                                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-100 dark:border-purple-900/50 rounded-xl p-6 text-center">
                                        <h3 className="text-xl font-bold mb-4 text-purple-900 dark:text-purple-100">오늘의 총운</h3>
                                        <p className="text-lg leading-relaxed mb-6">{fortune.message}</p>

                                        <div className="grid grid-cols-3 gap-4">
                                            <div className="bg-white/50 dark:bg-black/20 rounded-lg p-3">
                                                <div className="text-sm text-muted-foreground mb-1">총점</div>
                                                <div className="text-2xl font-bold text-purple-600">{fortune.totalScore}점</div>
                                            </div>
                                            <div className="bg-white/50 dark:bg-black/20 rounded-lg p-3">
                                                <div className="text-sm text-muted-foreground mb-1">행운의 색</div>
                                                <div className="text-lg font-bold">{fortune.luckyColor}</div>
                                            </div>
                                            <div className="bg-white/50 dark:bg-black/20 rounded-lg p-3">
                                                <div className="text-sm text-muted-foreground mb-1">행운의 숫자</div>
                                                <div className="text-lg font-bold">{fortune.luckyNumber}</div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="bg-card border border-border rounded-xl p-4">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="font-medium">❤️ 애정운</span>
                                                <span className="font-bold text-pink-500">{fortune.loveScore}%</span>
                                            </div>
                                            <div className="w-full bg-muted rounded-full h-2">
                                                <div className="bg-pink-500 h-2 rounded-full transition-all duration-1000" style={{ width: `${fortune.loveScore}%` }}></div>
                                            </div>
                                        </div>
                                        <div className="bg-card border border-border rounded-xl p-4">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="font-medium">💰 금전운</span>
                                                <span className="font-bold text-yellow-500">{fortune.wealthScore}%</span>
                                            </div>
                                            <div className="w-full bg-muted rounded-full h-2">
                                                <div className="bg-yellow-500 h-2 rounded-full transition-all duration-1000" style={{ width: `${fortune.wealthScore}%` }}></div>
                                            </div>
                                        </div>
                                        <div className="bg-card border border-border rounded-xl p-4">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="font-medium">💪 건강운</span>
                                                <span className="font-bold text-green-500">{fortune.healthScore}%</span>
                                            </div>
                                            <div className="w-full bg-muted rounded-full h-2">
                                                <div className="bg-green-500 h-2 rounded-full transition-all duration-1000" style={{ width: `${fortune.healthScore}%` }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'personality' && (
                                <div className="space-y-6 animate-in fade-in">
                                    <div className="bg-card border border-border rounded-xl p-6">
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {zodiacPersonality[selectedSign].keywords.map(keyword => (
                                                <span key={keyword} className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium">
                                                    #{keyword}
                                                </span>
                                            ))}
                                        </div>
                                        <p className="text-lg leading-relaxed mb-6">
                                            {zodiacPersonality[selectedSign].desc}
                                        </p>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <h4 className="font-bold text-green-600 mb-2">장점</h4>
                                                <p className="text-muted-foreground">{zodiacPersonality[selectedSign].strengths}</p>
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-red-600 mb-2">단점</h4>
                                                <p className="text-muted-foreground">{zodiacPersonality[selectedSign].weaknesses}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-muted/30 p-4 rounded-xl text-center">
                                            <div className="text-sm text-muted-foreground mb-1">수호성</div>
                                            <div className="font-bold text-lg">{selectedSignData.planet}</div>
                                        </div>
                                        <div className="bg-muted/30 p-4 rounded-xl text-center">
                                            <div className="text-sm text-muted-foreground mb-1">원소</div>
                                            <div className="font-bold text-lg">{selectedSignData.element}</div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === 'compatibility' && (
                                <div className="space-y-6 animate-in fade-in">
                                    <div className="bg-card border border-border rounded-xl p-6">
                                        <h3 className="font-bold text-lg mb-4">상대방 별자리 선택</h3>
                                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 mb-6">
                                            {zodiacSigns.map((sign) => (
                                                <button
                                                    key={sign.id}
                                                    onClick={() => setPartnerSign(sign.id)}
                                                    className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${partnerSign === sign.id
                                                            ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/20 ring-2 ring-pink-200'
                                                            : 'border-border hover:border-pink-300'
                                                        }`}
                                                >
                                                    <div className="text-2xl mb-1">{sign.emoji}</div>
                                                    <div className="text-xs font-medium">{sign.name}</div>
                                                </button>
                                            ))}
                                        </div>

                                        {partnerSign && compResult && (
                                            <div className="bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 border border-pink-200 dark:border-pink-900/50 rounded-xl p-6 text-center animate-in zoom-in-95 duration-300">
                                                <div className="flex items-center justify-center gap-4 mb-4 text-4xl">
                                                    <span>{selectedSignData.emoji}</span>
                                                    <Heart className="w-8 h-8 text-pink-500 animate-pulse" fill="currentColor" />
                                                    <span>{partnerSignData.emoji}</span>
                                                </div>
                                                <h3 className="text-2xl font-bold mb-2">
                                                    {selectedSignData.name} & {partnerSignData.name}
                                                </h3>
                                                <div className={`text-4xl font-bold mb-4 ${compResult.color}`}>
                                                    {compResult.label} ({compResult.score}점)
                                                </div>
                                                <p className="text-muted-foreground leading-relaxed">
                                                    {compResult.desc}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mt-8">
                        <ShareButtons
                            title="나의 별자리 운세 확인하기"
                            description="오늘의 별자리 운세와 성격, 궁합까지 확인해보세요!"
                        />
                    </div>
                </div>
            )}
        \n            <ToolGuide
                title="별자리 운세"
                intro="12별자리 오늘의 운세"
                steps={[
                    "원하시는 옵션이나 값을 화면에 안내된 순서대로 정확하게 기입해 주세요.",
                    "제시된 항목과 보기를 꼼꼼하게 살펴보고 본인에게 맞는 것을 선택합니다.",
                    "모든 입력을 완료한 후 결과 화면에서 계산된 수치나 분석된 내용을 확인합니다.",
                    "결과가 마음에 든다면 캡처하거나 공유하기 버튼을 눌러 지인들에게 공유해보세요!"
                ]}
                tips={[
                    "결과값이 예상과 다르다면 입력한 숫자나 단위를 한 번 더 확인해보는 것이 좋습니다.",
                    "제공되는 다양한 부가 옵션을 함께 활용하면 훨씬 구체적인 형태의 맞춤형 결과를 얻을 수 있습니다.",
                    "모바일과 데스크톱 환경 모두에 완벽하게 최적화되어 있으니 언제 어디서든 편리하게 이용해 보세요."
                ]}
                faqs={[
                    { "q": "이 도구들은 정말로 모두 무료인가요?", "a": "네! Tool Hive에서 제공하는 모든 도구 모음과 심리 테스트들은 가입 등의 번거로운 절차 없이 누구나 100% 무료로 무제한 사용할 수 있습니다." },
                    { "q": "제가 입력한 개인적인 정보 데이터가 서버에 남나요?", "a": "아니요, 사용자가 입력하는 이름, 숫자, 금액 등의 모든 데이터는 방문자의 기기 내 브라우저에서만 실시간으로 연산되며 어떠한 경우에도 외부 서버로 전송되거나 저장되지 않으므로 안심하셔도 됩니다." },
                    { "q": "버튼을 눌러도 반응이 없거나 에러가 생깁니다.", "a": "브라우저의 일시적인 캐시 문제일 수 있습니다. 키보드의 F5 버튼을 누르거나 새로고침을 진행한 후 다시 시도해 보시길 권장하며, 문제가 계속된다면 다른 브라우저 앱을 이용해 보세요." }
                ]}
            />
        </div>
    );
};

export default Horoscope;
