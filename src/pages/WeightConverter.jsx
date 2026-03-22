import React, { useState, useEffect } from 'react';
import { ArrowRightLeft, Weight, Clock, Trash2 } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import useHistory from '../hooks/useHistory';
import ShareButtons from '../components/ShareButtons';
import { useLanguage } from '../context/LanguageContext';

const unitsEn = [
    { value: 'mg', label: 'Milligram (mg)', ratio: 0.001 },
    { value: 'g', label: 'Gram (g)', ratio: 1 },
    { value: 'kg', label: 'Kilogram (kg)', ratio: 1000 },
    { value: 't', label: '(Metric) Ton (t)', ratio: 1000000 },
    { value: 'oz', label: 'Ounce (oz)', ratio: 28.3495 },
    { value: 'lb', label: 'Pound (lb)', ratio: 453.592 },
];

const units = [
    { value: 'mg', label: '밀리그램 (mg)', ratio: 0.001 },
    { value: 'g', label: '그램 (g)', ratio: 1 },
    { value: 'kg', label: '킬로그램 (kg)', ratio: 1000 },
    { value: 't', label: '(메트릭) 톤 (t)', ratio: 1000000 },
    { value: 'oz', label: '온스 (oz)', ratio: 28.3495 },
    { value: 'lb', label: '파운드 (lb)', ratio: 453.592 },
];

const WeightConverter = () => {
    const { lang, t } = useLanguage();
    const isEn = lang === 'en';
    const activeUnits = isEn ? unitsEn : units;

    const [amount, setAmount] = useState('');
    const [fromUnit, setFromUnit] = useState('kg');
    const [toUnit, setToUnit] = useState('lb');
    const [result, setResult] = useState('');

    const { history, saveHistory, clearHistory } = useHistory('weight-converter-history');

    useEffect(() => {
        if (amount === '' || isNaN(amount)) {
            setResult('');
            return;
        }

        const fromRatio = units.find(u => u.value === fromUnit)?.ratio || 1;
        const toRatio = units.find(u => u.value === toUnit)?.ratio || 1;

        const valueInGrams = parseFloat(amount) * fromRatio;
        const convertedValue = valueInGrams / toRatio;

        const formattedResult = Number(convertedValue.toPrecision(10)).toLocaleString(isEn ? 'en-US' : 'ko-KR', { maximumFractionDigits: 10 });
        setResult(formattedResult);

        const timer = setTimeout(() => {
            if (amount && formattedResult) {
                saveHistory({
                    from: `${parseFloat(amount).toLocaleString(isEn ? 'en-US' : 'ko-KR')} ${fromUnit}`,
                    to: `${formattedResult} ${toUnit}`,
                    date: new Date().toLocaleString(isEn ? 'en-US' : 'ko-KR')
                });
            }
        }, 2000);

        return () => clearTimeout(timer);
    }, [amount, fromUnit, toUnit]);

    const handleSwap = () => {
        setFromUnit(toUnit);
        setToUnit(fromUnit);
    };

    const handleHistoryClick = (item) => {
        const [val, unit] = item.from.split(' ');
        setAmount(val);
        setFromUnit(unit);
        const [, targetUnit] = item.to.split(' ');
        setToUnit(targetUnit);
    };

    const faqs = isEn ? [
        { q: 'How many pounds (lb) is 1 kilogram (kg)?', a: '1 kg is approximately 2.2046 pounds (lb). Since the US measures weight in pounds, converting is often necessary when viewing fitness or diet information. Example: 70kg ≈ 154.3lb.' },
        { q: 'How many grams (g) is 1 pound (lb)?', a: '1 pound is roughly 453.59g. Converting recipe ingredient weights from pounds to grams makes measuring easier outside the US.' },
        { q: 'How many grams is 1 ounce (oz)?', a: '1 ounce (standard ounce, excluding troy) is about 28.35g. Often seen on coffee beans or precious metals weights. Note: Gold prices usually use troy ounces (approx 31.1g).' },
        { q: 'What is the relationship between mg, g, and kg?', a: '1g = 1,000mg, and 1kg = 1,000g = 1,000,000mg. Pharmaceutical dosages or nutrient amounts are often marked in mg.' },
        { q: 'How do I convert units seen on nutritional labels?', a: 'Nutrition labels typically use g (grams), mg (milligrams), and mcg (micrograms). This tool can convert between g and mg. 1 mcg equals 0.001 mg.' },
    ] : [
        { q: '1킬로그램(kg)은 몇 파운드(lb)인가요?', a: '1kg은 약 2.2046파운드(lb)입니다. 미국에서는 체중을 파운드로 표기하기 때문에, 운동·다이어트 관련 정보를 볼 때 자주 변환이 필요합니다. 예: 70kg ≈ 154.3lb.' },
        { q: '1파운드(lb)는 몇 그램(g)인가요?', a: '1파운드는 약 453.59g입니다. 해외 레시피의 재료 무게가 파운드로 표기될 때 그램으로 변환하면 계량이 편리합니다.' },
        { q: '1온스(oz)는 몇 그램인가요?', a: '1온스(troy oz 제외, 상형 온스 기준)는 약 28.35g입니다. 커피 원두나 귀금속 무게 표기에 자주 등장합니다. 금 시세는 주로 troy ounce(약 31.1g) 기준이니 참고하세요.' },
        { q: 'mg와 g, kg의 관계가 궁금합니다.', a: '1g = 1,000mg이며, 1kg = 1,000g = 1,000,000mg입니다. 의약품 용량이나 영양소 함량은 mg 단위로 표기되는 경우가 많습니다.' },
        { q: '영양 성분표에서 본 단위를 변환하고 싶어요.', a: '식품 영양 성분표는 보통 g(그램), mg(밀리그램), mcg(마이크로그램) 단위를 사용합니다. 이 도구에서 g·mg 간 변환이 가능합니다. mcg(마이크로그램)는 0.001mg에 해당합니다.' },
    ];

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <SEO
                title={t('tools.weight.title')}
                description={t('tools.weight.description')}
                keywords={isEn ? "weight converter, unit converter, kg to lbs, pounds to grams, ounces to grams, body weight conversion" : "무게변환기, kg파운드변환, 킬로그램파운드, 온스그램변환, lb kg변환, 무게단위계산기, 체중변환"}
                faqs={faqs}
            />

            <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold text-text-primary flex items-center justify-center gap-3">
                    <Weight className="w-8 h-8 text-primary" />
                    {isEn ? 'Weight Converter' : '무게 변환기'}
                </h1>
                <p className="text-text-secondary">
                    {isEn ? 'Convert all weight & mass units: kg, g, mg, tons, lbs, oz instantly.' : 'kg · g · mg · 톤 · 파운드 · 온스 — 모든 무게 단위를 즉시 변환하세요.'}
                </p>
            </div>

            <div className="card p-8 space-y-8">
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-text-secondary">{isEn ? 'Value' : '변환할 값'}</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder={isEn ? "Enter number" : "숫자를 입력하세요"}
                        className="input text-2xl font-bold py-4"
                    />
                </div>

                <div className="grid grid-cols-[1fr,auto,1fr] gap-4 items-center">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-text-secondary">{isEn ? 'From' : '에서'}</label>
                        <select
                            value={fromUnit}
                            onChange={(e) => setFromUnit(e.target.value)}
                            className="input cursor-pointer"
                        >
                            {activeUnits.map((u) => (
                                <option key={u.value} value={u.value}>{u.label}</option>
                            ))}
                        </select>
                    </div>

                    <button
                        onClick={handleSwap}
                        className="p-3 rounded-full hover:bg-bg-card-hover text-primary transition-colors mt-6"
                        title={isEn ? 'Swap Units' : '단위 바꾸기'}
                    >
                        <ArrowRightLeft className="w-5 h-5" />
                    </button>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-text-secondary">{isEn ? 'To' : '으로'}</label>
                        <select
                            value={toUnit}
                            onChange={(e) => setToUnit(e.target.value)}
                            className="input cursor-pointer"
                        >
                            {activeUnits.map((u) => (
                                <option key={u.value} value={u.value}>{u.label}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="pt-8 border-t border-border-color text-center space-y-2">
                    <p className="text-text-secondary text-sm">{isEn ? 'Result' : '변환 결과'}</p>
                    <div className="text-4xl font-bold text-primary break-all">
                        {result || '0'}
                        <span className="text-lg text-text-tertiary ml-2 font-normal lowercase">
                            {toUnit}
                        </span>
                    </div>
                </div>
            </div>

            <ShareButtons />

            {history.length > 0 && (
                <div className="card p-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="font-bold flex items-center gap-2">
                            <Clock className="w-5 h-5 text-text-secondary" />
                            {isEn ? 'Recent History' : '최근 변환 기록'}
                        </h3>
                        <button
                            onClick={clearHistory}
                            className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1"
                        >
                            <Trash2 className="w-3 h-3" />
                            {isEn ? 'Clear History' : '기록 삭제'}
                        </button>
                    </div>
                    <div className="space-y-2">
                        {history.map((item, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleHistoryClick(item)}
                                className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-bg-card-hover transition-colors text-sm group"
                            >
                                <div className="flex items-center gap-2">
                                    <span className="font-medium">{item.from}</span>
                                    <ArrowRightLeft className="w-3 h-3 text-text-tertiary" />
                                    <span className="font-bold text-primary">{item.to}</span>
                                </div>
                                <span className="text-xs text-text-tertiary opacity-0 group-hover:opacity-100 transition-opacity">
                                    {item.date}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <ToolGuide
                title={isEn ? "Weight Converter Guide" : "무게 변환기 사용 가이드"}
                intro={isEn
                    ? "The Weight Converter accurately converts various mass units including kilograms, grams, pounds, ounces, milligrams, and tons. Use it for managing body weight, measuring recipe ingredients, calculating international shipping weight, and checking supplement dosages."
                    : "무게 변환기는 킬로그램, 그램, 파운드, 온스, 밀리그램, 톤 등 다양한 질량 단위를 정확하게 상호 변환해 드립니다. 체중 관리, 해외 레시피 재료 계량, 해외 직구 시 배송 무게 계산, 의약품·영양제 용량 확인 등 생활 속 곳곳에서 활용할 수 있습니다."}
                steps={isEn ? [
                    'Enter the numeric weight value you want to convert in the "Value" field.',
                    'Select your original unit in the "From" dropdown. (e.g. Kilograms)',
                    'Select the target unit in the "To" dropdown. (e.g. Pounds)',
                    'The conversion result will instantly appear at the bottom.',
                    'Use the ⇄ button to easily swap the conversion direction.'
                ] : [
                    '"변환할 값" 입력란에 변환하려는 무게 숫자를 입력합니다.',
                    '"에서" 드롭다운에서 원래 단위를 선택합니다. (예: 킬로그램)',
                    '"으로" 드롭다운에서 변환할 대상 단위를 선택합니다. (예: 파운드)',
                    '결과가 자동으로 하단에 즉시 표시됩니다.',
                    '⇄ 버튼으로 변환 방향을 손쉽게 바꿀 수 있습니다.',
                ]}
                tips={isEn ? [
                    'When looking at US health info using pounds for weight: 1 lb ≈ 0.454 kg. Divide your weight in kg by about 2.2 to get pounds.',
                    'When international shipping lists weight in pounds (lb), instantly convert it to kg to estimate shipping costs.',
                    'Coffee bean bags in ounces (oz): 12 oz bag = approx 340g.',
                    'Convert barbell weights listed in pounds from global fitness routines into kg to match local gym equipment.',
                    'Converting between medication dosages (mg) and regular weight (g): 500mg = 0.5g.'
                ] : [
                    '체중을 파운드로 말하는 미국 의학 정보를 볼 때: 1lb ≈ 0.454kg입니다. 내 체중(kg)을 2.2046으로 나누면 파운드가 됩니다.',
                    '해외 직구 시 배송 무게가 파운드(lb)로 표기되면, 이 도구로 kg로 변환해 배송비를 예측할 수 있습니다.',
                    '커피 원두 무게 표기(oz): 12oz 봉지 = 약 340g입니다.',
                    '운동·헬스 정보에서 파운드로 표기된 바벨 무게를 kg으로 변환해 비교하세요.',
                    '의약품 용량(mg)과 일반 무게(g) 간 변환: 500mg = 0.5g입니다.',
                ]}
                faqs={faqs}
            />
        </div>
    );
};

export default WeightConverter;
