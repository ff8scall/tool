import React, { useState } from 'react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { Ruler, ArrowRightLeft } from 'lucide-react';
import ShareButtons from '../components/ShareButtons';
import { useLanguage } from '../context/LanguageContext';

const unitsEn = {
    sqm: { name: 'Square Meters (m²)', toBase: 1 },
    pyeong: { name: 'Pyeong (坪)', toBase: 3.305785 },
    sqft: { name: 'Square Feet (sq ft)', toBase: 0.092903 },
    sqyd: { name: 'Square Yards (sq yd)', toBase: 0.836127 },
    acre: { name: 'Acres', toBase: 4046.856 },
    hectare: { name: 'Hectares (ha)', toBase: 10000 },
    sqkm: { name: 'Square Kilometers (km²)', toBase: 1000000 },
    sqmi: { name: 'Square Miles (sq mi)', toBase: 2589988 }
};

const AreaConverter = () => {
    const [value, setValue] = useState('');
    const [fromUnit, setFromUnit] = useState('sqm');
    const [toUnit, setToUnit] = useState('pyeong');

    const { lang, t } = useLanguage();
    const isEn = lang === 'en';
    
    const units = {
        sqm: { name: '제곱미터 (㎡)', toBase: 1 },
        pyeong: { name: '평 (坪)', toBase: 3.305785 },
        sqft: { name: '제곱피트 (ft²)', toBase: 0.092903 },
        sqyd: { name: '제곱야드 (yd²)', toBase: 0.836127 },
        acre: { name: '에이커 (acre)', toBase: 4046.856 },
        hectare: { name: '헥타르 (ha)', toBase: 10000 },
        sqkm: { name: '제곱킬로미터 (km²)', toBase: 1000000 },
        sqmi: { name: '제곱마일 (mi²)', toBase: 2589988 }
    };

    const activeUnits = isEn ? unitsEn : units;

    const convert = () => {
        if (!value || isNaN(value)) return '';
        const baseValue = parseFloat(value) * activeUnits[fromUnit].toBase;
        const result = baseValue / activeUnits[toUnit].toBase;
        return result.toLocaleString(isEn ? 'en-US' : 'ko-KR', { maximumFractionDigits: 6 });
    };

    const swap = () => {
        setFromUnit(toUnit);
        setToUnit(fromUnit);
    };

    const faqs = isEn ? [
        { q: 'How many square meters (m²) is 1 Pyeong?', a: '1 Pyeong is approx 3.306 m². Conversely, 1 m² is about 0.3025 Pyeong. Example: A standard Korean apartment of 84m² is about 25.4 Pyeong.' },
        { q: 'How many Pyeong are in 1 acre?', a: '1 acre is roughly 4,047 m², which converts to about 1,224 Pyeong. Acres are primarily used for land area in English-speaking countries like the US and Australia.' },
        { q: 'How many Pyeong in 1 hectare (ha)?', a: '1 hectare is 10,000 m², which is roughly 3,025 Pyeong. Hectares are often used to express the size of farmland or large land areas. Example: 1 soccer field is roughly 1 hectare.' },
        { q: 'Where are square feet (sq ft) primarily used?', a: 'In the US and UK, house dimensions are listed in square feet. 1 sq ft is approximately 0.0929 m². Example: 1,000 sq ft ≈ 92.9 m² ≈ 28.1 Pyeong.' },
        { q: 'What is the difference between supply area and private area in apartment listings?', a: 'This is a unit conversion tool supporting m² ↔ Pyeong only. Supply area includes common areas (hallways, stairs), while private area is the actual living space you exclusively use.' },
    ] : [
        { q: '1평은 몇 제곱미터(㎡)인가요?', a: '1평은 약 3.306㎡(정확히는 3.3058...㎡)입니다. 반대로 1㎡는 약 0.3025평입니다. 예: 아파트 84㎡ = 약 25.4평. 부동산 면적 표기에서 ㎡와 평을 빠르게 변환해보세요.' },
        { q: '1에이커(acre)는 몇 평인가요?', a: '1에이커는 약 4,047㎡로, 평으로 환산하면 약 1,224평입니다. 미국·호주 등 영어권 국가의 토지 면적은 에이커 단위를 주로 사용합니다.' },
        { q: '1헥타르(ha)는 몇 평인가요?', a: '1헥타르는 10,000㎡로, 약 3,025평입니다. 농지나 대규모 토지 면적을 표시할 때 헥타르를 많이 씁니다. 예: 축구장 1개 ≈ 약 1헥타르.' },
        { q: '제곱피트(ft²)는 어디서 주로 쓰나요?', a: '미국·영국의 부동산 문화에서 집 면적을 제곱피트로 표기합니다. 1ft² = 약 0.0929㎡입니다. 예: 1,000ft² ≈ 92.9㎡ ≈ 28.1평.' },
        { q: '아파트 분양 광고에서 공급면적과 전용면적이 다른데요.', a: '이 도구는 단위 변환 도구로, ㎡↔평 변환만 지원합니다. 공급면적과 전용면적의 차이는 공용면적(복도, 계단 등) 포함 여부에 따라 다릅니다. 전용면적 기준으로 변환해 실거주 공간을 파악하세요.' },
    ];

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <SEO
                title={t('tools.area.title')}
                description={t('tools.area.description')}
                keywords={isEn ? "area converter, square meters to pyeong, acres to square meters, hectares converter, apartment size conversion" : "면적변환기, 제곱미터평변환, 평계산기, 에이커변환, 헥타르계산, 아파트평수변환, 부동산면적계산"}
                faqs={faqs}
            />

            <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold text-foreground flex items-center justify-center gap-3">
                    <Ruler className="w-8 h-8 text-primary" />
                    {isEn ? 'Area Converter' : '면적 변환기'}
                </h1>
                <p className="text-muted-foreground">
                    {isEn ? 'Instantly convert m², Pyeong, Acres, Hectares, sq ft for real estate and lands.' : '㎡ · 평 · 에이커 · 헥타르 · ft² — 부동산, 농지, 인테리어 면적을 즉시 변환하세요.'}
                </p>
            </div>

            <div className="card p-6 space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">{isEn ? 'Value' : '변환할 값'}</label>
                    <div className="flex gap-3">
                        <input
                            type="number"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            placeholder={isEn ? "Enter Number" : "숫자 입력"}
                            className="input flex-1"
                        />
                        <select
                            value={fromUnit}
                            onChange={(e) => setFromUnit(e.target.value)}
                            className="input w-44"
                        >
                            {Object.entries(activeUnits).map(([key, unit]) => (
                                <option key={key} value={key}>{unit.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="flex justify-center">
                    <button
                        onClick={swap}
                        className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
                        title="단위 바꾸기"
                    >
                        <ArrowRightLeft className="w-5 h-5" />
                    </button>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">{isEn ? 'Result' : '변환 결과'}</label>
                    <div className="flex gap-3">
                        <div className="input flex-1 bg-secondary/50 flex items-center font-bold text-lg">
                            {convert() || '0'}
                        </div>
                        <select
                            value={toUnit}
                            onChange={(e) => setToUnit(e.target.value)}
                            className="input w-44"
                        >
                            {Object.entries(activeUnits).map(([key, unit]) => (
                                <option key={key} value={key}>{unit.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="bg-primary/5 rounded-xl p-4 text-sm">
                    <h3 className="font-bold mb-2">💡 {isEn ? 'Common Area References' : '자주 쓰는 환산 기준'}</h3>
                    <div className="text-muted-foreground space-y-1 grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <p>1 {isEn ? 'Pyeong' : '평'} ≈ 3.306 ㎡</p>
                        <p>1 {isEn ? 'Acre' : '에이커'} ≈ 1,224 {isEn ? 'Pyeong' : '평'}</p>
                        <p>1 {isEn ? 'Hectare' : '헥타르'} ≈ 3,025 {isEn ? 'Pyeong' : '평'}</p>
                        <p>1 ft² ≈ 0.093 ㎡</p>
                        <p>84 ㎡ ≈ 25.4 {isEn ? 'Pyeong' : '평'}</p>
                        <p>100 ㎡ ≈ 30.25 {isEn ? 'Pyeong' : '평'}</p>
                    </div>
                </div>
            </div>

            <ShareButtons />

            <ToolGuide
                title={isEn ? "Area Converter Guide" : "면적 변환기 사용 가이드"}
                intro={isEn 
                    ? "The Area Converter precisely calculates between diverse area units worldwide, such as square meters, Pyeongs, acres, hectares, and square feet. Useful for property assessments, foreign real estate, farmlands, and interior plans."
                    : "면적 변환기는 ㎡(제곱미터), 평, 에이커, 헥타르, 제곱피트 등 전 세계에서 사용되는 다양한 면적 단위를 정확하게 변환해 드립니다. 아파트·토지 면적 파악, 해외 부동산 비교, 농지 계산, 인테리어 공간 계획 등 다양한 상황에서 활용하세요."}
                steps={isEn ? [
                    'Enter the numeric area value in the "Value" text box.',
                    'Select the current unit from the dropdown next to the input.',
                    'Choose the unit you want to convert to from the bottom dropdown.',
                    'The result immediately displays for the chosen unit.',
                    'Use the ⇄ button to swap conversion direction across units.'
                ] : [
                    '"변환할 값" 입력란에 면적 숫자를 입력합니다.',
                    '입력 값 오른쪽 드롭다운에서 현재 단위를 선택합니다. (예: ㎡)',
                    '아래 드롭다운에서 변환하고 싶은 단위를 선택합니다. (예: 평)',
                    '결과가 자동으로 계산되어 즉시 표시됩니다.',
                    '⇄ 버튼으로 변환 방향을 한 번에 바꿀 수 있습니다.',
                ]}
                tips={isEn ? [
                    'Korean apartment metric: Supply area of 84m² is about 25.4 Pyeong, Private area 59m² is roughly 17.8 Pyeong.',
                    'If a US real estate listing shows "1,200 sq ft", that equates to approx 111.5m² ≈ 33.7 Pyeong.',
                    'Farmland calculation: 1,000 Pyeong = approx 3,306m² = approx 0.33 hectares.',
                    'When planning interior design, comparing m² to Pyeong helps gauge material costs efficiently.',
                    'For scale reference, 1 Standard international soccer field (105x68m) is roughly 7,140m² ≈ 0.7 hectares.'
                ] : [
                    '한국 아파트 면적 표기: 공급면적 84㎡는 약 25.4평, 전용면적 59㎡는 약 17.8평입니다.',
                    '미국 부동산 리스팅에서 "1,200 sq ft"라고 나오면 약 111.5㎡ ≈ 33.7평입니다.',
                    '농지 면적 계산: 1,000평 = 약 3,306㎡ = 약 0.33헥타르입니다.',
                    '실내 인테리어 계획 시 ㎡와 평 모두 알아야 자재 견적을 비교하기 편합니다.',
                    '축구장 크기(국제 기준 약 105×68m = 7,140㎡)와 비교하면 대형 공간의 규모를 가늠할 수 있습니다.',
                ]}
                faqs={faqs}
            />
        </div>
    );
};

export default AreaConverter;
