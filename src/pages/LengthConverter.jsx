import React, { useState, useEffect } from 'react';
import { ArrowRightLeft, Ruler, Clock, Trash2 } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import useHistory from '../hooks/useHistory';
import ShareButtons from '../components/ShareButtons';
import { useLanguage } from '../context/LanguageContext';

const unitsEn = [
    { value: 'mm', label: 'Millimeter (mm)', ratio: 0.001 },
    { value: 'cm', label: 'Centimeter (cm)', ratio: 0.01 },
    { value: 'm', label: 'Meter (m)', ratio: 1 },
    { value: 'km', label: 'Kilometer (km)', ratio: 1000 },
    { value: 'in', label: 'Inch (in)', ratio: 0.0254 },
    { value: 'ft', label: 'Feet (ft)', ratio: 0.3048 },
    { value: 'yd', label: 'Yard (yd)', ratio: 0.9144 },
    { value: 'mi', label: 'Mile (mi)', ratio: 1609.344 },
];

const units = [
    { value: 'mm', label: '밀리미터 (mm)', ratio: 0.001 },
    { value: 'cm', label: '센티미터 (cm)', ratio: 0.01 },
    { value: 'm', label: '미터 (m)', ratio: 1 },
    { value: 'km', label: '킬로미터 (km)', ratio: 1000 },
    { value: 'in', label: '인치 (in)', ratio: 0.0254 },
    { value: 'ft', label: '피트 (ft)', ratio: 0.3048 },
    { value: 'yd', label: '야드 (yd)', ratio: 0.9144 },
    { value: 'mi', label: '마일 (mile)', ratio: 1609.344 },
];

const LengthConverter = () => {
    const { lang, t } = useLanguage();
    const isEn = lang === 'en';
    const activeUnits = isEn ? unitsEn : units;
    
    const [amount, setAmount] = useState('');
    const [fromUnit, setFromUnit] = useState('m');
    const [toUnit, setFromUnitTo] = useState('cm');
    const [result, setResult] = useState('');

    const { history, saveHistory, clearHistory } = useHistory('length-converter-history');

    useEffect(() => {
        if (amount === '' || isNaN(amount)) {
            setResult('');
            return;
        }

        const fromRatio = units.find(u => u.value === fromUnit)?.ratio || 1;
        const toRatio = units.find(u => u.value === toUnit)?.ratio || 1;

        const valueInMeters = parseFloat(amount) * fromRatio;
        const convertedValue = valueInMeters / toRatio;

        const formattedResult = Number(convertedValue.toPrecision(10)).toLocaleString(isEn ? 'en-US' : 'ko-KR', { maximumFractionDigits: 10 });
        setResult(formattedResult);

        const timer = setTimeout(() => {
            if (amount && formattedResult) {
                const now = new Date();
                saveHistory({
                    from: `${parseFloat(amount).toLocaleString(isEn ? 'en-US' : 'ko-KR')} ${fromUnit}`,
                    to: `${formattedResult} ${toUnit}`,
                    timestamp: now.toLocaleString(isEn ? 'en-US' : 'ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })
                });
            }
        }, 2000);

        return () => clearTimeout(timer);
    }, [amount, fromUnit, toUnit]);

    const handleSwap = () => {
        setFromUnit(toUnit);
        setFromUnitTo(fromUnit);
    };

    const handleHistoryClick = (item) => {
        const [val, unit] = item.from.split(' ');
        setAmount(val);
        setFromUnit(unit);
        const [, targetUnit] = item.to.split(' ');
        setFromUnitTo(targetUnit);
    };

    const faqs = isEn ? [
        { q: 'How many centimeters (cm) is 1 inch?', a: '1 inch is exactly 2.54 cm. Since TV or monitor screen sizes are marked in inches in many countries, inch-to-cm conversion is often needed. Example: 65 inch TV = approx 165.1 cm.' },
        { q: 'How many meters (m) is 1 foot (ft)?', a: '1 foot is 0.3048 m, or about 30.48 cm. It is frequently used when converting between countries that use feet/inches for height (US, UK) and metric countries. Example: 6 ft = approx 182.88 cm.' },
        { q: 'How many km is 1 mile?', a: '1 mile (statute mile) is exactly 1.609344 km. This is primarily used to convert road signs in the US and UK to km. Example: 100 miles ≈ 160.93 km.' },
        { q: 'Why does the result show so many decimal places?', a: 'Converting between very large and small units may result in long decimals. The result is displayed up to 10 significant digits. You may round it according to your needs.' },
        { q: 'Where are yards (yd) typically used?', a: 'Yards are mainly used for American football field distances, golf hole distances, and fabric/textile measurements. 1 yard = 3 feet = 0.9144 m.' }
    ] : [
        { q: '1인치(inch)는 몇 센티미터(cm)인가요?', a: '1인치는 정확히 2.54cm입니다. 미국에서 TV나 모니터 화면 크기를 인치로 표기하기 때문에 인치↔cm 변환이 자주 필요합니다. 예: 65인치 TV = 약 165.1cm.' },
        { q: '1피트(ft)는 몇 미터(m)인가요?', a: '1피트는 0.3048m, 즉 약 30.48cm입니다. 키를 피트·인치로 표기하는 나라(미국, 영국 등)와 미터법을 쓰는 나라 간 변환 시 자주 사용됩니다. 예: 6ft = 약 182.88cm.' },
        { q: '1마일(mile)은 몇 km인가요?', a: '1마일(법정 마일)은 정확히 1.609344km입니다. 미국·영국 도로 표지판의 miles를 km로 변환할 때 사용합니다. 예: 100miles ≈ 160.93km.' },
        { q: '변환 결과에 소수점이 너무 많이 나와요.', a: '매우 큰 단위와 작은 단위 간 변환 시 소수점이 길어질 수 있습니다. 결과는 유효숫자 10자리까지 표시합니다. 필요에 따라 직접 반올림하여 사용하세요.' },
        { q: '야드(yd)는 주로 어디에서 쓰이나요?', a: '야드는 미식축구 경기장 거리 단위, 골프 홀 거리 표기, 원단·섬유의 길이 측정 등에 주로 사용됩니다. 1야드 = 3피트 = 0.9144m입니다.' },
    ];

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <SEO
                title={t('tools.length.title')}
                description={t('tools.length.description')}
                keywords={isEn ? "length converter, unit converter, meters to feet, inches to cm, miles to km, metric system" : "길이변환기, 미터변환, 인치센티미터변환, 피트미터변환, 마일킬로미터변환, cm인치, 피트cm, 야드파운드법, 단위변환"}
                faqs={faqs}
            />

            <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold text-text-primary flex items-center justify-center gap-3">
                    <Ruler className="w-8 h-8 text-primary" />
                    {isEn ? 'Length Converter' : '길이 변환기'}
                </h1>
                <p className="text-text-secondary">
                    {isEn ? 'Convert all length units instantly: mm, cm, m, km, inches, feet, yards, miles.' : 'mm · cm · m · km · 인치 · 피트 · 야드 · 마일 — 모든 길이 단위를 즉시 변환하세요.'}
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
                            className="input cursor-pointer font-semibold border-2 hover:border-primary transition-colors"
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
                            onChange={(e) => setFromUnitTo(e.target.value)}
                            className="input cursor-pointer font-semibold border-2 hover:border-primary transition-colors"
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
                                className="w-full flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg hover:bg-bg-card-hover transition-colors text-sm group gap-2"
                            >
                                <div className="flex items-center gap-2">
                                    <span className="font-medium">{item.from}</span>
                                    <ArrowRightLeft className="w-3 h-3 text-text-tertiary" />
                                    <span className="font-bold text-primary">{item.to}</span>
                                </div>
                                <span className="text-xs text-text-tertiary">
                                    {item.timestamp || item.date}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <ToolGuide
                title={isEn ? "Length Converter Guide" : "길이 변환기 사용 가이드"}
                intro={isEn 
                    ? "The Length Converter helps you easily interchange units from the Metric system (mm, cm, m, km) to the Imperial system (inches, feet, yards, miles). Helpful for online shopping, architectural plans, and distance estimations."
                    : "길이 변환기는 전 세계에서 사용되는 미터법(mm, cm, m, km)과 야드파운드법(인치, 피트, 야드, 마일)을 정확하게 상호 변환해주는 도구입니다. 해외 직구 시 신발·의류 사이즈 확인, 인테리어 계획, 해외여행 거리 감각 파악, 학교 수업 등 다양한 상황에서 활용할 수 있습니다."}
                steps={isEn ? [
                    'Enter the numeric value you wish to convert in the "Value" field.',
                    'Select the current unit from the "From" dropdown.',
                    'Select the target unit from the "To" dropdown.',
                    'The conversion result is instantly calculated and displayed below.',
                    'Click the ⇄ button to quickly swap the from and to units.',
                    'Your conversion history is automatically saved, providing quick 1-click retrieval.'
                ] : [
                    '"변환할 값" 입력란에 변환하고 싶은 숫자를 입력합니다.',
                    '"에서" 드롭다운에서 현재 단위를 선택합니다. (예: 인치)',
                    '"으로" 드롭다운에서 변환 대상 단위를 선택합니다. (예: 센티미터)',
                    '결과가 자동으로 즉시 계산되어 하단에 표시됩니다.',
                    '⇄ 버튼을 클릭하면 변환 방향을 한 번에 바꿀 수 있습니다.',
                    '변환 기록은 자동 저장되며, 클릭 한 번으로 이전 값을 불러옵니다.',
                ]}
                tips={isEn ? [
                    'Remembering key ratios is useful: 1 inch = 2.54 cm, 1 ft = 30.48 cm, 1 mile ≈ 1.609 km.',
                    'Convert US shoe sizes labeled in inches to cm instantly before purchasing.',
                    'If someone in an American TV show is "6 feet 2 inches" tall, that is about 187.96 cm.',
                    'Architectural drawings typically use millimeters. Use m to mm conversions for verification.'
                ] : [
                    '1인치 = 2.54cm, 1피트 = 30.48cm, 1마일 ≈ 1.609km 등 핵심 환산값을 기억해두면 빠르게 어림짐작할 수 있습니다.',
                    '해외 쇼핑몰에서 신발 사이즈가 인치로 표기될 때 즉시 cm로 변환해 확인하세요.',
                    '미국 드라마 속 인물의 키가 "6 feet 2 inches"라면, 이 도구로 변환하면 약 187.96cm입니다.',
                    '건축·인테리어 도면은 주로 mm 단위를 사용합니다. m 입력 후 mm로 변환해 즉시 비교해보세요.',
                    '골프장 거리 표기(야드)를 미터로 변환하면 더 직관적으로 거리를 파악할 수 있습니다.',
                ]}
                faqs={faqs}
            />
        </div>
    );
};

export default LengthConverter;
