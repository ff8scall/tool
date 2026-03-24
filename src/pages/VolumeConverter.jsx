import React, { useState } from 'react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { Droplet, ArrowRightLeft } from 'lucide-react';
import ShareButtons from '../components/ShareButtons';
import { useLanguage } from '../context/LanguageContext';

const unitsEn = {
    liter: { name: 'Liter (L)', toBase: 1 },
    ml: { name: 'Milliliter (mL)', toBase: 0.001 },
    gallon: { name: 'Gallon (US gal)', toBase: 3.78541 },
    quart: { name: 'Quart (US qt)', toBase: 0.946353 },
    pint: { name: 'Pint (US pt)', toBase: 0.473176 },
    cup: { name: 'Cup (US cup)', toBase: 0.236588 },
    floz: { name: 'Fluid Ounce (fl oz)', toBase: 0.0295735 },
    cbm: { name: 'Cubic Meter (m³)', toBase: 1000 },
    cbcm: { name: 'Cubic Centimeter (cm³)', toBase: 0.001 },
    cbft: { name: 'Cubic Foot (ft³)', toBase: 28.3168 }
};

const VolumeConverter = () => {
    const [value, setValue] = useState('');
    const [fromUnit, setFromUnit] = useState('liter');
    const [toUnit, setToUnit] = useState('ml');

    const { lang, t } = useLanguage();
    const isEn = lang === 'en';

    const units = {
        liter: { name: '리터 (L)', toBase: 1 },
        ml: { name: '밀리리터 (mL)', toBase: 0.001 },
        gallon: { name: '갤런 (gal)', toBase: 3.78541 },
        quart: { name: '쿼트 (qt)', toBase: 0.946353 },
        pint: { name: '파인트 (pt)', toBase: 0.473176 },
        cup: { name: '컵 (cup)', toBase: 0.236588 },
        floz: { name: '액량온스 (fl oz)', toBase: 0.0295735 },
        cbm: { name: '세제곱미터 (m³)', toBase: 1000 },
        cbcm: { name: '세제곱센티미터 (cm³)', toBase: 0.001 },
        cbft: { name: '세제곱피트 (ft³)', toBase: 28.3168 }
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
        { q: 'How many liters are in 1 gallon?', a: 'Based on the US gallon, 1 gallon is approximately 3.785 liters. Frequently used when comparing car fuel efficiency (mpg) or fluid capacities.' },
        { q: 'How many mL is 1 cup in recipes?', a: '1 US standard cup is about 236.6 mL. When making foreign recipes, you can round it roughly to 240 mL.' },
        { q: 'How many mL is 1 fl oz (fluid ounce)?', a: '1 US fl oz is about 29.57 mL. It frequently appears on drink cans (12 fl oz = 354 mL) and cosmetic packaging.' },
        { q: 'How many liters is 1 m³?', a: '1 m³ equals 1,000 liters. Used for calculating water tanks, swimming pools, and AC airflow rates.' },
    ] : [
        { q: '1갤런은 몇 리터인가요?', a: '미국 갤런(US gallon) 기준으로 1갤런 = 약 3.785리터입니다. 자동차 연비(mpg)나 물통 용량을 리터로 비교할 때 사용합니다.' },
        { q: '레시피에서 1컵은 몇 mL인가요?', a: '미국 표준 1 US cup = 약 236.6mL입니다. 해외 레시피를 따를 때 240mL로 어림잡으면 편합니다.' },
        { q: '1 fl oz(액량온스)는 몇 mL인가요?', a: '1 US fl oz = 약 29.57mL입니다. 음료 캔(12fl oz = 354mL), 화장품 용량 표기에 자주 등장합니다.' },
        { q: '1m³는 몇 리터인가요?', a: '1m³ = 1,000리터입니다. 물탱크, 수영장, 에어컨 풍량 등을 계산할 때 활용됩니다.' },
    ];

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <SEO
                title={t('tools.volume-converter.title')}
                description={t('tools.volume-converter.description')}
                keywords={isEn ? "volume converter, liters to gallons, ml converter, cup to ml, liters calculation" : "부피변환기, 리터갤런변환, mL변환, 컵ml변환, volume converter, 갤런리터계산"}
                faqs={faqs}
            />

            <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl mb-2 shadow-lg">
                    <Droplet className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                    {isEn ? 'Volume Converter' : '부피 변환기'}
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    {isEn ? 'Liters, Gallons, mL, Cups, Pints — Instantly convert any volume unit.' : '리터 · 갤런 · mL · 컵 · 파인트 — 모든 부피 단위를 즉시 변환하세요.'}
                </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{isEn ? 'Value' : '변환할 값'}</label>
                    <div className="flex gap-4">
                        <input
                            type="number"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            placeholder={isEn ? "Enter number" : "숫자 입력"}
                            className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 dark:bg-gray-700 dark:text-white"
                        />
                        <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)}
                            className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 dark:bg-gray-700 dark:text-white">
                            {Object.entries(activeUnits).map(([key, unit]) => (
                                <option key={key} value={key}>{unit.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="flex justify-center mb-6">
                    <button onClick={swap} className="p-3 bg-cyan-100 dark:bg-cyan-900 text-cyan-600 dark:text-cyan-300 rounded-full hover:bg-cyan-200 transition-colors">
                        <ArrowRightLeft className="w-5 h-5" />
                    </button>
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{isEn ? 'Result' : '변환 결과'}</label>
                    <div className="flex gap-4">
                        <div className="flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg font-semibold text-lg dark:text-white">
                            {convert() || '0'}
                        </div>
                        <select value={toUnit} onChange={(e) => setToUnit(e.target.value)}
                            className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 dark:bg-gray-700 dark:text-white">
                            {Object.entries(activeUnits).map(([key, unit]) => (
                                <option key={key} value={key}>{unit.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="bg-cyan-50 dark:bg-cyan-900/20 rounded-lg p-4">
                    <h3 className="font-semibold dark:text-white mb-2">💡 {isEn ? 'Common Volume References' : '자주 쓰는 환산값'}</h3>
                    <div className="text-sm text-gray-600 dark:text-gray-400 grid grid-cols-2 gap-1">
                        <p>1 L = 1,000 mL</p>
                        <p>1 {isEn ? 'Gallon' : '갤런'} ≈ 3.785 L</p>
                        <p>1 {isEn ? 'Cup' : '컵'} ≈ 236.6 mL</p>
                        <p>1 m³ = 1,000 L</p>
                        <p>1 fl oz ≈ 29.57 mL</p>
                        <p>1 {isEn ? 'Pint' : '파인트'} ≈ 473 mL</p>
                    </div>
                </div>
            </div>

            <ShareButtons />

            <ToolGuide
                title={isEn ? "Volume Converter Guide" : "부피 변환기 사용 가이드"}
                intro={isEn 
                    ? "Accurately convert across multiple volume dimensions including Liters, mL, Gallons, Cups, Pints, Quarts, and cubic meters. Great for international recipes, assessing gas tanks, and examining cosmetics packages."
                    : "리터, 밀리리터, 갤런, 컵, 파인트, 쿼트, 세제곱미터 등 다양한 부피 단위를 정확하게 변환해 드립니다. 해외 요리 레시피, 자동차 연료 용량 비교, 음료·화장품 용량 파악에 활용하세요."}
                steps={isEn ? [
                    'Enter a volume number in the "Value" field.',
                    'Select the current unit from the right dropdown. (e.g. Gallon)',
                    'Select the target unit in the bottom dropdown. (e.g. Liter)',
                    'The converted result calculates instantly.',
                    'Use the ⇄ button to reverse the operation completely in one click.'
                ] : [
                    '"변환할 값" 입력란에 부피 숫자를 입력합니다.',
                    '오른쪽 드롭다운에서 현재 단위를 선택합니다. (예: 갤런)',
                    '아래 드롭다운에서 변환할 단위를 선택합니다. (예: 리터)',
                    '결과가 즉시 자동 계산됩니다.',
                    '⇄ 버튼으로 변환 방향을 한 번에 바꿀 수 있습니다.',
                ]}
                tips={isEn ? [
                    'Foreign recipes using "1 cup" → Consider it roughly 240mL.',
                    'US gas tank capacities (Gallons) → Liters converting reference: 15 gallons ≈ 56.8 L.',
                    'Imported cosmetics measured in 1 fl oz → exactly around 29.6 mL.',
                    'A UK beer pint ≈ 568 mL, while a US pint ≈ 473 mL; note that they differ by country.'
                ] : [
                    '해외 레시피 "1 cup" → 약 240mL로 계산하세요.',
                    '미국 자동차 연료 탱크 용량(갤런) → 리터 변환: 15갤런 ≈ 56.8L.',
                    '수입 화장품 용량 1fl oz → 약 29.6mL.',
                    '영국 맥주 1파인트 ≈ 568mL, 미국 1파인트 피인트 ≈ 473mL로 국가마다 다릅니다.',
                ]}
                faqs={faqs}
            />
        </div>
    );
};

export default VolumeConverter;
