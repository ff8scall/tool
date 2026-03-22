import React, { useState } from 'react';
import { Sparkles, RotateCcw, Heart, Briefcase, TrendingUp } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import ShareButtons from '../components/ShareButtons';

const TarotCard = () => {
    const [selectedCard, setSelectedCard] = useState(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [readingType, setReadingType] = useState('daily'); // daily, love, career

    const tarotCards = [
        {
            id: 0,
            name: '바보 (The Fool)',
            emoji: '🃏',
            keywords: ['새로운 시작', '순수함', '모험', '자유'],
            upright: '새로운 시작과 무한한 가능성의 시기입니다. 두려움 없이 새로운 모험을 시작하세요. 순수한 마음으로 세상을 바라보면 예상치 못한 기회가 찾아올 것입니다.',
            reversed: '무모함과 경솔함을 경계하세요. 계획 없이 행동하면 실수할 수 있습니다. 좀 더 신중하게 생각하고 준비가 필요합니다.',
            love: '새로운 만남이나 관계의 시작을 의미합니다. 설레는 감정을 즐기되, 너무 성급하게 판단하지 마세요.',
            career: '새로운 프로젝트나 직장의 시작. 창의적인 아이디어를 자유롭게 펼칠 수 있는 시기입니다.',
            advice: '직관을 믿고 용기를 가지세요. 하지만 완전히 무모하지는 마세요.'
        },
        {
            id: 1,
            name: '마법사 (The Magician)',
            emoji: '🎩',
            keywords: ['창조력', '의지', '능력', '자신감'],
            upright: '당신은 원하는 것을 이룰 수 있는 모든 능력을 가지고 있습니다. 자신감을 가지고 행동하면 목표를 달성할 수 있습니다. 창의력과 기술을 발휘할 최적의 시기입니다.',
            reversed: '능력을 잘못 사용하거나 자만심에 빠질 수 있습니다. 교활함이나 속임수를 경계하세요.',
            love: '매력이 넘치는 시기입니다. 적극적으로 다가가면 좋은 결과가 있을 것입니다.',
            career: '리더십을 발휘하고 프로젝트를 주도할 수 있습니다. 당신의 능력이 인정받을 것입니다.',
            advice: '자신의 능력을 믿되 겸손함을 잃지 마세요.'
        },
        {
            id: 2,
            name: '여사제 (The High Priestess)',
            emoji: '🌙',
            keywords: ['직관', '신비', '지혜', '내면'],
            upright: '내면의 목소리에 귀 기울이세요. 직관과 무의식이 중요한 답을 알려줄 것입니다. 지금은 행동보다 관찰과 성찰의 시기입니다.',
            reversed: '직관을 무시하거나 비밀이 드러날 수 있습니다. 내면의 소리를 듣지 못하고 있습니다.',
            love: '신비롭고 깊은 감정의 교류. 말하지 않아도 통하는 관계를 만들 수 있습니다.',
            career: '연구, 분석, 상담 등 깊이 있는 작업에 적합한 시기입니다.',
            advice: '조용히 명상하고 내면의 지혜를 찾으세요.'
        },
        {
            id: 3,
            name: '여황제 (The Empress)',
            emoji: '👑',
            keywords: ['풍요', '창조', '모성', '사랑'],
            upright: '풍요롭고 창조적인 시기입니다. 사랑과 아름다움이 넘치며, 새로운 것을 창조하거나 키울 수 있습니다. 자연과 감각을 즐기세요.',
            reversed: '과잉보호나 의존성. 창의력이 막히거나 물질적 어려움이 있을 수 있습니다.',
            love: '따뜻하고 포근한 사랑. 임신이나 출산의 가능성도 있습니다.',
            career: '예술, 디자인, 창작 분야에서 좋은 성과. 풍요로운 결실을 맺을 것입니다.',
            advice: '자신과 타인을 돌보고 사랑하세요.'
        },
        {
            id: 4,
            name: '황제 (The Emperor)',
            emoji: '⚔️',
            keywords: ['권위', '질서', '안정', '리더십'],
            upright: '강력한 리더십과 통제력을 발휘할 시기입니다. 체계와 질서를 세우고, 책임감 있게 행동하세요. 안정과 구조가 중요합니다.',
            reversed: '독재적이거나 융통성이 없을 수 있습니다. 권위에 대한 반발이나 통제력 상실.',
            love: '안정적이고 책임감 있는 관계. 하지만 너무 권위적이지 않도록 주의하세요.',
            career: '관리직이나 리더 역할에 적합. 조직을 체계적으로 이끌 수 있습니다.',
            advice: '강함과 부드러움의 균형을 찾으세요.'
        },
        {
            id: 5,
            name: '교황 (The Hierophant)',
            emoji: '📿',
            keywords: ['전통', '가르침', '신념', '도덕'],
            upright: '전통과 규범을 따르는 것이 도움이 됩니다. 멘토나 스승의 조언을 구하세요. 정통적인 방법과 도덕적 가치가 중요합니다.',
            reversed: '전통에 대한 반발이나 독단적인 신념. 규칙에 얽매이지 마세요.',
            love: '전통적인 관계나 결혼. 가족의 축복을 받는 관계입니다.',
            career: '교육, 종교, 법률 분야. 정통적인 방법을 따르면 성공할 것입니다.',
            advice: '전통을 존중하되 맹목적으로 따르지는 마세요.'
        },
        {
            id: 6,
            name: '연인 (The Lovers)',
            emoji: '💕',
            keywords: ['사랑', '선택', '조화', '관계'],
            upright: '중요한 선택의 순간입니다. 사랑과 관계가 깊어지며, 조화로운 파트너십을 만들 수 있습니다. 가치관이 맞는 사람과의 만남.',
            reversed: '관계의 불화나 잘못된 선택. 가치관의 충돌이 있을 수 있습니다.',
            love: '진정한 사랑과 깊은 유대감. 영혼의 짝을 만날 수 있는 시기입니다.',
            career: '파트너십이나 협업이 중요. 팀워크가 성공의 열쇠입니다.',
            advice: '마음의 소리를 따르되 책임감 있게 선택하세요.'
        },
        {
            id: 7,
            name: '전차 (The Chariot)',
            emoji: '🏇',
            keywords: ['승리', '의지', '추진력', '통제'],
            upright: '강한 의지와 결단력으로 목표를 향해 나아가세요. 장애물을 극복하고 승리할 수 있습니다. 자신감을 가지고 전진하세요.',
            reversed: '방향 상실이나 통제력 부족. 너무 공격적이거나 무모할 수 있습니다.',
            love: '적극적으로 관계를 이끌어가세요. 하지만 독단적이지 않도록 주의하세요.',
            career: '목표 달성과 성공. 경쟁에서 승리하고 인정받을 것입니다.',
            advice: '균형을 유지하며 앞으로 나아가세요.'
        },
        {
            id: 8,
            name: '힘 (Strength)',
            emoji: '🦁',
            keywords: ['용기', '인내', '자제력', '내면의 힘'],
            upright: '부드러움과 강함을 동시에 가진 진정한 힘을 발휘할 시기입니다. 인내심과 자제력으로 어려움을 극복하세요. 내면의 힘을 믿으세요.',
            reversed: '자신감 부족이나 자제력 상실. 두려움에 굴복하지 마세요.',
            love: '서로를 이해하고 포용하는 사랑. 인내심이 관계를 더 깊게 만듭니다.',
            career: '어려운 상황도 침착하게 해결할 수 있습니다. 리더십이 빛을 발합니다.',
            advice: '폭력이 아닌 사랑으로 문제를 해결하세요.'
        },
        {
            id: 9,
            name: '은둔자 (The Hermit)',
            emoji: '🕯️',
            keywords: ['성찰', '고독', '지혜', '탐구'],
            upright: '혼자만의 시간이 필요합니다. 내면을 돌아보고 진정한 자아를 찾으세요. 영적 성장과 깨달음의 시기입니다.',
            reversed: '고립이나 외로움. 너무 은둔하지 말고 세상과 소통하세요.',
            love: '혼자만의 시간이 필요한 시기. 관계를 재평가하고 깊이 생각해보세요.',
            career: '연구, 분석, 자기계발에 집중하세요. 멘토의 조언을 구하세요.',
            advice: '고요함 속에서 진리를 찾으세요.'
        },
        {
            id: 10,
            name: '운명의 수레바퀴 (Wheel of Fortune)',
            emoji: '🎡',
            keywords: ['운명', '변화', '순환', '행운'],
            upright: '인생의 전환점입니다. 긍정적인 변화와 행운이 찾아옵니다. 운명의 흐름을 받아들이고 새로운 기회를 잡으세요.',
            reversed: '불운이나 예상치 못한 변화. 하지만 이것도 지나갈 것입니다.',
            love: '운명적인 만남이나 관계의 큰 변화. 흐름에 맡기세요.',
            career: '예상치 못한 기회나 승진. 변화를 두려워하지 마세요.',
            advice: '모든 것은 순환합니다. 겸손함을 유지하세요.'
        },
        {
            id: 11,
            name: '정의 (Justice)',
            emoji: '⚖️',
            keywords: ['공정', '진실', '균형', '인과응보'],
            upright: '공정한 판단과 진실이 드러나는 시기입니다. 정직하게 행동하면 정당한 보상을 받을 것입니다. 균형과 조화를 추구하세요.',
            reversed: '불공정하거나 편견. 진실이 왜곡되거나 책임을 회피할 수 있습니다.',
            love: '공평하고 균형 잡힌 관계. 서로에게 정직해야 합니다.',
            career: '법률, 계약 관련 일이 잘 풀립니다. 공정한 평가를 받을 것입니다.',
            advice: '정직하고 공정하게 행동하세요.'
        },
        {
            id: 12,
            name: '매달린 사람 (The Hanged Man)',
            emoji: '🙃',
            keywords: ['희생', '관점전환', '정지', '깨달음'],
            upright: '다른 관점에서 바라보세요. 잠시 멈추고 성찰하는 시간이 필요합니다. 작은 희생이 큰 깨달음을 가져올 것입니다.',
            reversed: '불필요한 희생이나 정체. 변화를 두려워하지 마세요.',
            love: '일방적인 희생은 피하세요. 관계를 새로운 시각으로 바라보세요.',
            career: '잠시 멈추고 재평가할 시기. 급하게 서두르지 마세요.',
            advice: '때로는 멈춤이 전진입니다.'
        },
        {
            id: 13,
            name: '죽음 (Death)',
            emoji: '💀',
            keywords: ['변화', '끝', '재탄생', '전환'],
            upright: '끝은 새로운 시작입니다. 낡은 것을 버리고 새로운 것을 받아들이세요. 근본적인 변화와 재탄생의 시기입니다.',
            reversed: '변화에 대한 저항. 과거에 집착하지 말고 앞으로 나아가세요.',
            love: '관계의 끝이나 새로운 단계로의 전환. 두려워하지 마세요.',
            career: '직장이나 업무의 큰 변화. 새로운 기회를 받아들이세요.',
            advice: '변화를 두려워하지 말고 받아들이세요.'
        },
        {
            id: 14,
            name: '절제 (Temperance)',
            emoji: '🍶',
            keywords: ['균형', '조화', '절제', '치유'],
            upright: '균형과 조화를 찾으세요. 극단을 피하고 중용의 길을 가세요. 인내심을 가지고 천천히 진행하면 치유와 평화가 찾아옵니다.',
            reversed: '불균형이나 과도함. 절제력을 잃지 마세요.',
            love: '서로를 이해하고 타협하는 관계. 균형 잡힌 사랑입니다.',
            career: '팀워크와 협력이 중요. 조화롭게 일하면 성공할 것입니다.',
            advice: '모든 것은 적당히, 균형 있게 하세요.'
        },
        {
            id: 15,
            name: '악마 (The Devil)',
            emoji: '😈',
            keywords: ['유혹', '집착', '속박', '물질'],
            upright: '유혹이나 중독에 빠질 수 있습니다. 물질적 욕망이나 나쁜 습관에서 벗어나세요. 당신을 속박하는 것이 무엇인지 깨달으세요.',
            reversed: '속박에서 벗어남. 자유를 되찾고 나쁜 습관을 끊을 수 있습니다.',
            love: '건강하지 못한 집착이나 의존. 관계를 재평가하세요.',
            career: '돈이나 권력에 대한 과도한 욕심. 윤리를 지키세요.',
            advice: '진정으로 중요한 것이 무엇인지 생각하세요.'
        },
        {
            id: 16,
            name: '탑 (The Tower)',
            emoji: '🗼',
            keywords: ['파괴', '충격', '깨달음', '해방'],
            upright: '갑작스러운 변화나 충격이 올 수 있습니다. 하지만 이는 잘못된 기반을 무너뜨리고 진실을 드러내는 과정입니다. 재건의 기회입니다.',
            reversed: '변화를 피하려 함. 하지만 피할 수 없는 변화입니다.',
            love: '관계의 위기나 진실의 폭로. 하지만 이후 더 견고해질 수 있습니다.',
            career: '예상치 못한 변화나 실패. 하지만 새로운 시작의 기회입니다.',
            advice: '무너진 것 위에 더 견고하게 다시 세우세요.'
        },
        {
            id: 17,
            name: '별 (The Star)',
            emoji: '⭐',
            keywords: ['희망', '영감', '치유', '평화'],
            upright: '희망과 영감이 가득한 시기입니다. 어두운 시기가 지나고 빛이 보입니다. 꿈을 향해 나아가세요. 치유와 평화가 찾아옵니다.',
            reversed: '희망 상실이나 실망. 하지만 포기하지 마세요.',
            love: '이상적인 사랑과 영혼의 교감. 순수한 감정이 빛납니다.',
            career: '창의적인 영감과 새로운 비전. 꿈을 실현할 수 있습니다.',
            advice: '희망을 잃지 말고 별을 바라보세요.'
        },
        {
            id: 18,
            name: '달 (The Moon)',
            emoji: '🌕',
            keywords: ['환상', '불안', '직관', '무의식'],
            upright: '불확실하고 혼란스러운 시기입니다. 환상과 현실을 구분하세요. 직관을 믿되 두려움에 휘둘리지 마세요. 무의식의 메시지에 귀 기울이세요.',
            reversed: '두려움 극복이나 진실 발견. 혼란에서 벗어나고 있습니다.',
            love: '불안정하거나 비밀스러운 관계. 솔직한 대화가 필요합니다.',
            career: '불확실성과 혼란. 명확한 정보를 얻을 때까지 기다리세요.',
            advice: '두려움을 직면하고 진실을 찾으세요.'
        },
        {
            id: 19,
            name: '태양 (The Sun)',
            emoji: '☀️',
            keywords: ['기쁨', '성공', '활력', '긍정'],
            upright: '최고의 카드입니다! 기쁨과 성공이 가득한 시기입니다. 모든 것이 밝고 긍정적입니다. 자신감을 가지고 빛나세요. 행복이 당신을 기다립니다.',
            reversed: '일시적인 어려움. 하지만 곧 좋아질 것입니다.',
            love: '행복하고 밝은 관계. 순수한 기쁨과 사랑을 나눕니다.',
            career: '큰 성공과 인정. 모든 일이 잘 풀립니다.',
            advice: '긍정적인 에너지를 나누고 행복을 즐기세요.'
        },
        {
            id: 20,
            name: '심판 (Judgement)',
            emoji: '📯',
            keywords: ['부활', '깨달음', '용서', '결정'],
            upright: '과거를 돌아보고 평가하는 시기입니다. 용서하고 새롭게 태어나세요. 중요한 결정을 내릴 때입니다. 과거의 경험에서 배우세요.',
            reversed: '자기 비판이나 후회. 과거에 얽매이지 말고 앞으로 나아가세요.',
            love: '관계를 재평가하고 새로운 시작. 용서와 화해의 시기입니다.',
            career: '업적 평가나 승진. 과거의 노력이 인정받습니다.',
            advice: '과거를 용서하고 새로운 삶을 시작하세요.'
        },
        {
            id: 21,
            name: '세계 (The World)',
            emoji: '🌍',
            keywords: ['완성', '성취', '조화', '여행'],
            upright: '완성과 성취의 시기입니다. 목표를 달성하고 새로운 단계로 나아갑니다. 세상과 조화를 이루며 완전함을 경험하세요. 축하합니다!',
            reversed: '미완성이나 지연. 하지만 곧 완성될 것입니다.',
            love: '완벽한 조화와 만족. 영혼의 짝과 함께하는 완전한 사랑입니다.',
            career: '프로젝트 완성과 큰 성공. 국제적인 기회도 있을 수 있습니다.',
            advice: '성취를 축하하고 다음 여정을 준비하세요.'
        }
    ];

    const drawCard = () => {
        setIsDrawing(true);
        setTimeout(() => {
            const randomCard = tarotCards[Math.floor(Math.random() * tarotCards.length)];
            const isReversed = Math.random() > 0.5;
            setSelectedCard({ ...randomCard, isReversed });
            setIsDrawing(false);
        }, 1500);
    };

    const reset = () => {
        setSelectedCard(null);
    };

    const getReadingContent = () => {
        if (!selectedCard) return null;

        const content = selectedCard.isReversed ? selectedCard.reversed : selectedCard.upright;
        let specificReading = '';

        if (readingType === 'love') {
            specificReading = selectedCard.love;
        } else if (readingType === 'career') {
            specificReading = selectedCard.career;
        }

        return { content, specificReading };
    };

    const reading = getReadingContent();

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <SEO
                title="타로 카드 - 오늘의 운세 | Utility Hub"
                description="22장의 메이저 아르카나 타로 카드로 오늘의 운세를 확인하세요. 연애운, 직장운, 일일운세를 무료로 볼 수 있습니다."
                keywords="타로카드, 타로, 오늘의운세, 타로점, 연애타로, 직장운, 메이저아르카나, 무료타로, 타로카드해석"
            />

            {/* Header */}
            <header className="text-center space-y-4 py-8">
                <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-2xl mb-2">
                    <Sparkles className="w-10 h-10 text-primary" />
                </div>
                <h1 className="text-4xl font-bold">타로 카드</h1>
                <p className="text-lg text-muted-foreground">
                    카드를 뽑아 오늘의 운세를 확인하세요
                </p>
            </header>

            {/* Reading Type Selection */}
            {!selectedCard && (
                <div className="flex justify-center gap-3 flex-wrap">
                    <button
                        onClick={() => setReadingType('daily')}
                        className={`px-6 py-3 rounded-xl font-medium transition-all ${readingType === 'daily'
                                ? 'bg-primary text-primary-foreground shadow-lg'
                                : 'bg-card border border-border hover:border-primary'
                            }`}
                    >
                        <TrendingUp className="w-5 h-5 inline mr-2" />
                        오늘의 운세
                    </button>
                    <button
                        onClick={() => setReadingType('love')}
                        className={`px-6 py-3 rounded-xl font-medium transition-all ${readingType === 'love'
                                ? 'bg-pink-600 text-white shadow-lg'
                                : 'bg-card border border-border hover:border-pink-600'
                            }`}
                    >
                        <Heart className="w-5 h-5 inline mr-2" />
                        연애운
                    </button>
                    <button
                        onClick={() => setReadingType('career')}
                        className={`px-6 py-3 rounded-xl font-medium transition-all ${readingType === 'career'
                                ? 'bg-blue-600 text-white shadow-lg'
                                : 'bg-card border border-border hover:border-blue-600'
                            }`}
                    >
                        <Briefcase className="w-5 h-5 inline mr-2" />
                        직장운
                    </button>
                </div>
            )}

            {/* Card Drawing Area */}
            <div className="flex justify-center">
                {!selectedCard ? (
                    <button
                        onClick={drawCard}
                        disabled={isDrawing}
                        className={`relative group ${isDrawing ? 'cursor-wait' : 'cursor-pointer'
                            }`}
                    >
                        <div className={`w-64 h-96 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl shadow-2xl flex items-center justify-center transition-all duration-500 ${isDrawing ? 'animate-pulse scale-95' : 'group-hover:scale-105 group-hover:shadow-3xl'
                            }`}>
                            <div className="text-center text-white">
                                <div className="text-6xl mb-4">🔮</div>
                                <p className="text-xl font-bold">
                                    {isDrawing ? '카드를 뽑는 중...' : '카드 뽑기'}
                                </p>
                            </div>
                        </div>
                    </button>
                ) : (
                    <div className="animate-in fade-in duration-700">
                        <div className={`w-64 h-96 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl shadow-2xl p-6 flex flex-col items-center justify-between ${selectedCard.isReversed ? 'rotate-180' : ''
                            }`}>
                            <div className={`text-center ${selectedCard.isReversed ? 'rotate-180' : ''}`}>
                                <div className="text-7xl mb-4">{selectedCard.emoji}</div>
                                <h3 className="text-xl font-bold text-white mb-2">{selectedCard.name}</h3>
                                <div className="flex flex-wrap gap-2 justify-center">
                                    {selectedCard.keywords.map((keyword, idx) => (
                                        <span key={idx} className="text-xs px-2 py-1 bg-white/20 rounded-full text-white">
                                            {keyword}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        {selectedCard.isReversed && (
                            <p className="text-center mt-4 text-sm text-muted-foreground">
                                ⚠️ 역방향 카드
                            </p>
                        )}
                    </div>
                )}
            </div>

            {/* Card Reading */}
            {selectedCard && reading && (
                <div className="space-y-6 animate-in fade-in duration-700">
                    <div className="bg-card border border-border rounded-xl p-6">
                        <h3 className="text-xl font-bold mb-4">
                            {selectedCard.isReversed ? '역방향 해석' : '정방향 해석'}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed mb-4">
                            {reading.content}
                        </p>
                        {reading.specificReading && (
                            <div className="mt-4 pt-4 border-t border-border">
                                <h4 className="font-semibold mb-2 text-primary">
                                    {readingType === 'love' ? '💕 연애운' : readingType === 'career' ? '💼 직장운' : ''}
                                </h4>
                                <p className="text-sm text-muted-foreground">
                                    {reading.specificReading}
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/50 rounded-xl p-6">
                        <h3 className="text-lg font-bold mb-3 text-yellow-600 dark:text-yellow-400">
                            💡 조언
                        </h3>
                        <p className="text-muted-foreground">{selectedCard.advice}</p>
                    </div>

                    {/* Share Buttons */}
                    <div className="bg-card border border-border rounded-xl p-6">
                        <ShareButtons
                            title={`타로 카드: ${selectedCard.name}`}
                            description={reading.content.substring(0, 100) + '...'}
                        />
                    </div>

                    <button
                        onClick={reset}
                        className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl"
                    >
                        <RotateCcw className="w-6 h-6" />
                        다시 뽑기
                    </button>
                </div>
            )}

            {/* Info */}
            {!selectedCard && !isDrawing && (
                <div className="bg-muted/30 rounded-xl p-8 space-y-4">
                    <h3 className="font-bold text-lg">🔮 타로 카드란?</h3>
                    <p className="text-sm text-muted-foreground">
                        타로 카드는 78장의 카드로 구성된 점술 도구입니다. 이 중 22장의 메이저 아르카나는
                        인생의 중요한 주제와 영적 여정을 상징합니다. 카드를 뽑아 현재 상황에 대한 통찰과
                        조언을 얻을 수 있습니다.
                    </p>
                    <div className="bg-background border border-border rounded-lg p-4">
                        <p className="text-xs text-muted-foreground">
                            💡 <strong>Tip:</strong> 마음을 편안하게 하고 질문을 떠올린 후 카드를 뽑으세요.
                            정방향과 역방향은 각각 다른 의미를 가집니다.
                        </p>
                    </div>
                </div>
            )}
        \n            <ToolGuide
                title="타로 카드"
                intro="오늘의 타로 운세"
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

export default TarotCard;
