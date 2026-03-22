import React, { useState } from 'react';
import { Calendar, Heart, DollarSign, Activity, Briefcase, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import ShareButtons from '../components/ShareButtons';

const ZodiacFortune = () => {
    const [selectedZodiac, setSelectedZodiac] = useState('');
    const [showMonthly, setShowMonthly] = useState(false);

    const zodiacs = [
        { id: 'rat', name: '쥐띠', emoji: '🐭', years: '1948, 1960, 1972, 1984, 1996, 2008, 2020' },
        { id: 'ox', name: '소띠', emoji: '🐮', years: '1949, 1961, 1973, 1985, 1997, 2009, 2021' },
        { id: 'tiger', name: '호랑이띠', emoji: '🐯', years: '1950, 1962, 1974, 1986, 1998, 2010, 2022' },
        { id: 'rabbit', name: '토끼띠', emoji: '🐰', years: '1951, 1963, 1975, 1987, 1999, 2011, 2023' },
        { id: 'dragon', name: '용띠', emoji: '🐲', years: '1952, 1964, 1976, 1988, 2000, 2012, 2024' },
        { id: 'snake', name: '뱀띠', emoji: '🐍', years: '1953, 1965, 1977, 1989, 2001, 2013, 2025' },
        { id: 'horse', name: '말띠', emoji: '🐴', years: '1954, 1966, 1978, 1990, 2002, 2014' },
        { id: 'goat', name: '양띠', emoji: '🐑', years: '1955, 1967, 1979, 1991, 2003, 2015' },
        { id: 'monkey', name: '원숭이띠', emoji: '🐵', years: '1956, 1968, 1980, 1992, 2004, 2016' },
        { id: 'rooster', name: '닭띠', emoji: '🐔', years: '1957, 1969, 1981, 1993, 2005, 2017' },
        { id: 'dog', name: '개띠', emoji: '🐶', years: '1958, 1970, 1982, 1994, 2006, 2018' },
        { id: 'pig', name: '돼지띠', emoji: '🐷', years: '1959, 1971, 1983, 1995, 2007, 2019' }
    ];

    const fortuneData = {
        rat: {
            overall: '2025년 을사년(乙巳年)은 쥐띠에게 새로운 기회의 해입니다. 뱀의 해는 쥐띠의 지혜와 민첩함이 빛을 발하는 시기로, 그동안 준비해온 일들이 결실을 맺을 수 있습니다. 상반기에는 조금 조심스럽게, 하반기에는 적극적으로 움직이는 것이 좋습니다.',
            love: '연애운이 상승하는 해입니다. 솔로라면 상반기에 좋은 인연을 만날 가능성이 높고, 커플이라면 관계가 한 단계 발전할 수 있습니다. 5월과 10월이 특히 좋은 시기입니다.',
            wealth: '재물운은 중상입니다. 본업에서의 수입은 안정적이나, 투자는 신중해야 합니다. 3월과 9월에 예상치 못한 지출이 있을 수 있으니 비상금을 준비하세요.',
            health: '전반적으로 건강한 한 해입니다. 다만 스트레스 관리가 중요합니다. 규칙적인 운동과 충분한 수면을 취하세요. 소화기 계통을 조심하세요.',
            career: '직장운이 좋습니다. 새로운 프로젝트나 승진의 기회가 올 수 있습니다. 상사와의 관계를 잘 유지하고, 동료들과 협력하면 좋은 성과를 낼 수 있습니다.',
            luckyColor: '파란색, 금색',
            luckyNumber: '2, 7',
            advice: '너무 서두르지 말고 차근차근 진행하세요. 인내심을 가지고 기다리면 좋은 결과가 있을 것입니다.'
        },
        ox: {
            overall: '2025년은 소띠에게 안정과 성장의 해입니다. 성실함과 끈기가 인정받는 시기로, 꾸준히 노력해온 일들이 좋은 결과로 이어집니다. 급하게 서두르기보다는 차분하게 한 걸음씩 나아가세요.',
            love: '연애운은 평온합니다. 급격한 변화보다는 안정적인 관계 유지가 중요합니다. 기존 관계를 소중히 여기고, 솔로라면 주변 지인의 소개로 좋은 인연을 만날 수 있습니다.',
            wealth: '재물운이 좋은 편입니다. 꾸준한 저축과 안정적인 투자가 권장됩니다. 부동산이나 장기 투자에 관심을 가져보세요. 6월과 11월이 재물운이 특히 좋습니다.',
            health: '건강 관리에 신경 써야 합니다. 과로를 피하고 규칙적인 생활 습관을 유지하세요. 관절과 허리 건강에 주의가 필요합니다.',
            career: '직장에서 인정받는 한 해입니다. 성실한 업무 태도가 빛을 발하며, 중요한 프로젝트를 맡을 수 있습니다. 이직보다는 현재 위치에서 역량을 키우는 것이 좋습니다.',
            luckyColor: '녹색, 흰색',
            luckyNumber: '1, 9',
            advice: '조급해하지 말고 묵묵히 자신의 길을 가세요. 성실함이 최고의 무기입니다.'
        },
        tiger: {
            overall: '2025년은 호랑이띠에게 도전과 변화의 해입니다. 용기와 추진력이 필요한 시기로, 새로운 시도를 두려워하지 마세요. 다만 무모한 도전보다는 계획적인 행동이 필요합니다.',
            love: '연애운이 활발합니다. 새로운 만남이 많고 드라마틱한 전개가 있을 수 있습니다. 하지만 너무 성급하게 결정하지 말고 신중하게 판단하세요.',
            wealth: '재물운은 기복이 있습니다. 큰 수입이 있을 수 있지만 지출도 많을 수 있으니 계획적인 소비가 필요합니다. 투기성 투자는 피하세요.',
            health: '활동적인 한 해이지만 무리하지 않도록 주의하세요. 부상 위험이 있으니 운동할 때 조심하고, 충분한 휴식을 취하세요.',
            career: '새로운 기회가 많은 해입니다. 이직이나 창업을 고려할 수 있지만, 충분한 준비와 검토가 필요합니다. 4월과 10월이 중요한 결정을 내리기 좋은 시기입니다.',
            luckyColor: '주황색, 보라색',
            luckyNumber: '3, 8',
            advice: '용기를 가지되 신중함을 잃지 마세요. 계획적인 도전이 성공의 열쇠입니다.'
        },
        rabbit: {
            overall: '2025년은 토끼띠에게 평화롭고 안정적인 해입니다. 큰 변화보다는 현재를 잘 유지하고 발전시키는 것이 중요합니다. 인간관계가 특히 좋아 주변의 도움을 많이 받을 수 있습니다.',
            love: '연애운이 매우 좋습니다. 솔로라면 이상형을 만날 확률이 높고, 커플이라면 결혼까지 고려할 수 있습니다. 3월과 8월이 특히 좋은 시기입니다.',
            wealth: '재물운은 안정적입니다. 큰 횡재는 없지만 꾸준한 수입이 보장됩니다. 저축과 재테크에 관심을 가지면 좋은 결과가 있을 것입니다.',
            health: '건강 상태가 양호합니다. 다만 스트레스로 인한 불면증이나 소화불량에 주의하세요. 명상이나 요가 같은 이완 운동이 도움이 됩니다.',
            career: '직장 생활이 순조롭습니다. 상사와 동료들과의 관계가 좋아 업무 협조가 잘 이루어집니다. 승진이나 포상의 기회가 있을 수 있습니다.',
            luckyColor: '분홍색, 하늘색',
            luckyNumber: '4, 6',
            advice: '주변 사람들을 소중히 여기고 감사하는 마음을 가지세요. 좋은 인연이 행운을 가져다줍니다.'
        },
        dragon: {
            overall: '2025년은 용띠에게 본격적인 상승의 해입니다. 2024년 본띠해를 지나 더욱 성숙해진 모습으로 큰 성과를 낼 수 있습니다. 리더십을 발휘할 기회가 많고, 주목받는 한 해가 될 것입니다.',
            love: '연애운이 화려합니다. 인기가 많아 여러 이성의 관심을 받을 수 있지만, 진심을 구별하는 것이 중요합니다. 7월과 12월에 중요한 결정을 내릴 수 있습니다.',
            wealth: '재물운이 매우 좋습니다. 본업뿐만 아니라 부업이나 투자에서도 좋은 성과를 기대할 수 있습니다. 다만 과욕은 금물입니다.',
            health: '에너지가 넘치는 한 해이지만 과로에 주의하세요. 일과 휴식의 균형을 맞추고, 정기 건강검진을 받으세요.',
            career: '승진이나 중요한 프로젝트 리더로 발탁될 가능성이 높습니다. 창업을 고려한다면 좋은 시기입니다. 자신감을 가지고 도전하세요.',
            luckyColor: '금색, 빨간색',
            luckyNumber: '5, 9',
            advice: '자신감을 가지되 겸손함을 잃지 마세요. 주변의 조언에도 귀 기울이세요.'
        },
        snake: {
            overall: '2025년 을사년은 뱀띠의 본띠해입니다! 12년 만에 돌아온 자신의 해로, 새로운 시작과 변화의 기회가 많습니다. 다만 본띠해는 조심스럽게 행동해야 하는 해이기도 하니 신중함이 필요합니다.',
            love: '본띠해라 연애운에 변화가 많습니다. 새로운 만남이나 이별, 결혼 등 중요한 결정을 내릴 수 있습니다. 감정적으로 행동하기보다는 이성적으로 판단하세요.',
            wealth: '재물운은 기복이 있습니다. 큰 수입이 있을 수 있지만 예상치 못한 지출도 많을 수 있습니다. 보수적인 재테크가 권장됩니다.',
            health: '본띠해라 건강 관리에 특히 신경 써야 합니다. 정기 검진을 받고, 무리한 일정은 피하세요. 스트레스 관리가 중요합니다.',
            career: '새로운 기회가 많지만 신중한 선택이 필요합니다. 이직이나 창업을 고려한다면 충분한 준비 기간을 가지세요. 2월과 8월이 중요한 시기입니다.',
            luckyColor: '빨간색, 노란색',
            luckyNumber: '6, 8',
            advice: '본띠해는 빨간 속옷을 입으면 액운을 막는다는 속설이 있습니다. 조심스럽게 한 해를 보내세요.'
        },
        horse: {
            overall: '2025년은 말띠에게 활력이 넘치는 해입니다. 자유롭고 역동적인 에너지가 가득한 시기로, 새로운 도전과 모험을 즐길 수 있습니다. 다만 너무 산만해지지 않도록 집중력이 필요합니다.',
            love: '연애운이 활발합니다. 새로운 만남이 많고 즐거운 데이트가 기다립니다. 하지만 진지한 관계를 원한다면 한 사람에게 집중하세요.',
            wealth: '재물운은 들쑥날쑥합니다. 수입이 늘어날 수 있지만 충동구매나 여행 등으로 지출도 많을 수 있습니다. 계획적인 소비가 필요합니다.',
            health: '활동적인 한 해이지만 무리하지 마세요. 충분한 수면과 규칙적인 식사가 중요합니다. 다리와 발목 건강에 주의하세요.',
            career: '새로운 프로젝트나 업무 영역 확장의 기회가 있습니다. 적극적으로 도전하되, 마무리를 확실히 하는 것이 중요합니다.',
            luckyColor: '초록색, 갈색',
            luckyNumber: '2, 7',
            advice: '자유로운 영혼이지만 책임감도 잊지 마세요. 시작한 일은 끝까지 마무리하세요.'
        },
        goat: {
            overall: '2025년은 양띠에게 평온하고 예술적인 감성이 빛나는 해입니다. 창의력이 발휘되고 주변 사람들과의 조화로운 관계를 유지할 수 있습니다. 급하게 서두르기보다는 여유를 가지고 즐기세요.',
            love: '연애운이 로맨틱합니다. 감성적이고 따뜻한 관계를 만들 수 있습니다. 솔로라면 예술 활동이나 취미 모임에서 좋은 인연을 만날 수 있습니다.',
            wealth: '재물운은 안정적입니다. 큰 부자가 되기는 어렵지만 필요한 만큼은 충분히 벌 수 있습니다. 예술품이나 취미 관련 투자를 고려해보세요.',
            health: '전반적으로 건강하지만 감정 기복에 따라 컨디션이 달라질 수 있습니다. 긍정적인 마인드를 유지하고, 좋아하는 활동으로 스트레스를 풀으세요.',
            career: '창의적인 업무에서 두각을 나타낼 수 있습니다. 팀워크가 중요한 프로젝트에서 좋은 성과를 낼 수 있습니다. 예술, 디자인, 기획 분야가 유리합니다.',
            luckyColor: '베이지색, 연두색',
            luckyNumber: '3, 9',
            advice: '자신의 감성을 믿고 창의력을 발휘하세요. 주변 사람들과의 조화가 행복의 열쇠입니다.'
        },
        monkey: {
            overall: '2025년은 원숭이띠에게 재치와 지혜가 빛나는 해입니다. 영리함과 순발력으로 어려운 상황도 잘 헤쳐나갈 수 있습니다. 다양한 기회가 찾아오니 적극적으로 활용하세요.',
            love: '연애운이 재미있습니다. 유머와 재치로 이성의 마음을 사로잡을 수 있습니다. 하지만 장난이 과하면 오해를 살 수 있으니 적당히 조절하세요.',
            wealth: '재물운이 좋습니다. 영리한 판단으로 투자에서 좋은 성과를 낼 수 있습니다. 다만 너무 욕심부리면 실수할 수 있으니 적당한 선에서 만족하세요.',
            health: '건강은 양호하지만 신경이 예민해질 수 있습니다. 충분한 휴식과 취미 활동으로 스트레스를 관리하세요.',
            career: '문제 해결 능력이 인정받는 해입니다. 어려운 프로젝트를 맡아 성공시킬 수 있습니다. 네트워킹이 중요하니 인맥 관리를 잘하세요.',
            luckyColor: '흰색, 금색',
            luckyNumber: '1, 7',
            advice: '영리함은 장점이지만 너무 교활해 보이지 않도록 주의하세요. 정직함도 중요합니다.'
        },
        rooster: {
            overall: '2025년은 닭띠에게 성실함이 빛을 발하는 해입니다. 부지런함과 정확함이 인정받아 좋은 기회를 잡을 수 있습니다. 계획적으로 움직이면 원하는 목표를 달성할 수 있습니다.',
            love: '연애운은 차분합니다. 화려하지는 않지만 진실한 관계를 만들 수 있습니다. 솔로라면 직장이나 학교에서 좋은 인연을 만날 수 있습니다.',
            wealth: '재물운이 안정적입니다. 성실하게 일한 만큼 수입이 보장됩니다. 저축과 장기 투자가 권장되며, 부동산에 관심을 가져보세요.',
            health: '건강 관리를 잘하는 한 해입니다. 규칙적인 생활 습관을 유지하고, 정기 검진을 받으세요. 호흡기 건강에 주의하세요.',
            career: '성실함이 인정받아 승진이나 중요한 업무를 맡을 수 있습니다. 완벽주의 성향이 장점이 되지만, 너무 스트레스받지 않도록 주의하세요.',
            luckyColor: '노란색, 갈색',
            luckyNumber: '5, 7',
            advice: '성실함을 유지하되 완벽을 추구하느라 스트레스받지 마세요. 적당한 휴식도 필요합니다.'
        },
        dog: {
            overall: '2025년은 개띠에게 충실함과 신뢰가 보상받는 해입니다. 정직하고 성실한 태도가 주변 사람들에게 인정받아 좋은 기회가 찾아옵니다. 믿음직한 파트너로서 빛을 발할 것입니다.',
            love: '연애운이 따뜻합니다. 진심 어린 관계를 만들 수 있고, 신뢰를 바탕으로 한 사랑이 깊어집니다. 결혼을 고려하는 커플에게 좋은 해입니다.',
            wealth: '재물운은 평범합니다. 큰 횡재는 없지만 성실하게 일한 만큼 벌 수 있습니다. 투자보다는 저축이 안전합니다.',
            health: '건강 상태가 좋습니다. 규칙적인 운동과 건강한 식습관을 유지하면 더욱 좋아질 것입니다. 관절 건강에 신경 쓰세요.',
            career: '직장에서 신뢰받는 한 해입니다. 중요한 업무를 맡을 수 있고, 팀의 중심 역할을 할 수 있습니다. 이직보다는 현재 위치에서 성장하는 것이 좋습니다.',
            luckyColor: '빨간색, 녹색',
            luckyNumber: '3, 4',
            advice: '정직함과 성실함을 유지하세요. 신뢰는 가장 큰 자산입니다.'
        },
        pig: {
            overall: '2025년은 돼지띠에게 풍요롭고 행복한 해입니다. 낙천적인 성격이 주변을 밝게 만들고, 좋은 일들이 자연스럽게 찾아옵니다. 여유를 가지고 즐기면서도 게으르지 않도록 주의하세요.',
            love: '연애운이 매우 좋습니다. 따뜻하고 포근한 관계를 만들 수 있습니다. 솔로라면 식사 자리나 모임에서 좋은 인연을 만날 확률이 높습니다.',
            wealth: '재물운이 풍성합니다. 예상치 못한 수입이 있을 수 있고, 투자에서도 좋은 성과를 기대할 수 있습니다. 다만 과소비에 주의하세요.',
            health: '건강은 양호하지만 과식과 운동 부족에 주의해야 합니다. 규칙적인 운동을 시작하고, 건강한 식습관을 유지하세요.',
            career: '직장 생활이 즐겁습니다. 좋은 동료들과 함께 일하며 성과도 좋습니다. 복지나 처우 개선의 기회가 있을 수 있습니다.',
            luckyColor: '검은색, 파란색',
            luckyNumber: '2, 8',
            advice: '여유로운 마음을 가지되 게으름은 경계하세요. 균형 잡힌 생활이 행복의 비결입니다.'
        }
    };

    const selectedData = selectedZodiac ? fortuneData[selectedZodiac] : null;
    const selectedZodiacInfo = zodiacs.find(z => z.id === selectedZodiac);

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <SEO
                title="2025년 띠별 운세 - 12띠 신년운세 | Utility Hub"
                description="2025년 을사년 12띠 운세를 확인하세요. 쥐띠, 소띠, 호랑이띠, 토끼띠, 용띠, 뱀띠, 말띠, 양띠, 원숭이띠, 닭띠, 개띠, 돼지띠의 종합운, 애정운, 재물운, 건강운, 직장운을 상세히 알려드립니다."
                keywords="띠별운세, 2025년운세, 12띠운세, 신년운세, 쥐띠운세, 소띠운세, 호랑이띠운세, 토끼띠운세, 용띠운세, 뱀띠운세, 말띠운세, 양띠운세, 원숭이띠운세, 닭띠운세, 개띠운세, 돼지띠운세, 을사년, 2025년신년운세"
            />

            {/* Header */}
            <header className="text-center space-y-4 py-8">
                <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-2xl mb-2">
                    <Sparkles className="w-10 h-10 text-primary" />
                </div>
                <h1 className="text-4xl font-bold">2025년 을사년 띠별 운세</h1>
                <p className="text-lg text-muted-foreground">
                    나의 띠를 선택하고 2025년 한 해 운세를 확인하세요
                </p>
            </header>

            {/* Zodiac Selection */}
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {zodiacs.map((zodiac) => (
                    <button
                        key={zodiac.id}
                        onClick={() => setSelectedZodiac(zodiac.id)}
                        className={`p-4 rounded-xl border-2 transition-all hover:scale-105 ${selectedZodiac === zodiac.id
                                ? 'border-primary bg-primary/10 shadow-lg'
                                : 'border-border hover:border-primary/50'
                            }`}
                    >
                        <div className="text-4xl mb-2">{zodiac.emoji}</div>
                        <div className="font-bold text-sm">{zodiac.name}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                            {zodiac.years.split(', ')[zodiac.years.split(', ').length - 1]}년생
                        </div>
                    </button>
                ))}
            </div>

            {/* Fortune Display */}
            {selectedData && selectedZodiacInfo && (
                <div className="space-y-6 animate-in fade-in duration-500">
                    {/* Title */}
                    <div className="bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-2xl p-8 text-center">
                        <div className="text-6xl mb-4">{selectedZodiacInfo.emoji}</div>
                        <h2 className="text-3xl font-bold mb-2">{selectedZodiacInfo.name} 운세</h2>
                        <p className="text-muted-foreground">출생년도: {selectedZodiacInfo.years}</p>
                        <div className="flex justify-center gap-4 mt-4">
                            <div className="px-4 py-2 bg-background rounded-lg">
                                <span className="text-sm text-muted-foreground">행운의 색</span>
                                <p className="font-bold">{selectedData.luckyColor}</p>
                            </div>
                            <div className="px-4 py-2 bg-background rounded-lg">
                                <span className="text-sm text-muted-foreground">행운의 숫자</span>
                                <p className="font-bold">{selectedData.luckyNumber}</p>
                            </div>
                        </div>
                    </div>

                    {/* Overall Fortune */}
                    <div className="bg-card border border-border rounded-xl p-6">
                        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <Calendar className="w-6 h-6 text-primary" />
                            종합운
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">{selectedData.overall}</p>
                    </div>

                    {/* Detailed Fortunes */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-card border border-border rounded-xl p-6">
                            <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                                <Heart className="w-5 h-5 text-pink-500" />
                                애정운
                            </h3>
                            <p className="text-sm text-muted-foreground">{selectedData.love}</p>
                        </div>

                        <div className="bg-card border border-border rounded-xl p-6">
                            <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                                <DollarSign className="w-5 h-5 text-green-500" />
                                재물운
                            </h3>
                            <p className="text-sm text-muted-foreground">{selectedData.wealth}</p>
                        </div>

                        <div className="bg-card border border-border rounded-xl p-6">
                            <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                                <Activity className="w-5 h-5 text-red-500" />
                                건강운
                            </h3>
                            <p className="text-sm text-muted-foreground">{selectedData.health}</p>
                        </div>

                        <div className="bg-card border border-border rounded-xl p-6">
                            <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                                <Briefcase className="w-5 h-5 text-blue-500" />
                                직장운
                            </h3>
                            <p className="text-sm text-muted-foreground">{selectedData.career}</p>
                        </div>
                    </div>

                    {/* Advice */}
                    <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/50 rounded-xl p-6">
                        <h3 className="text-lg font-bold mb-3 text-yellow-600 dark:text-yellow-400">
                            💡 한 마디 조언
                        </h3>
                        <p className="text-muted-foreground">{selectedData.advice}</p>
                    </div>

                    {/* Share Buttons */}
                    <div className="bg-card border border-border rounded-xl p-6">
                        <ShareButtons
                            title={`2025년 ${selectedZodiacInfo.name} 운세`}
                            description={selectedData.overall.substring(0, 100) + '...'}
                        />
                    </div>
                </div>
            )}

            {/* Info */}
            {!selectedZodiac && (
                <div className="bg-muted/30 rounded-xl p-8 text-center">
                    <p className="text-muted-foreground">
                        위에서 나의 띠를 선택하면 2025년 한 해 운세를 확인할 수 있습니다.
                    </p>
                </div>
            )}
        \n            <ToolGuide
                title="띠별 운세"
                intro="12띠 오늘의 운세"
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

export default ZodiacFortune;
