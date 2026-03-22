import React, { useState } from 'react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { Percent } from 'lucide-react';
import ShareButtons from '../components/ShareButtons';
import { useLanguage } from '../context/LanguageContext';

const PercentCalculator = () => {
    const { lang, t } = useLanguage();
    const isEn = lang === 'en';

    const [mode, setMode] = useState('basic'); // basic, change, ratio

    // Basic: X의 Y%
    const [basicX, setBasicX] = useState('');
    const [basicY, setBasicY] = useState('');

    // Change: 증감률
    const [changeFrom, setChangeFrom] = useState('');
    const [changeTo, setChangeTo] = useState('');

    // Ratio: 비율
    const [ratioPart, setRatioPart] = useState('');
    const [ratioWhole, setRatioWhole] = useState('');

    const calculateBasic = () => {
        if (!basicX || !basicY) return '';
        const result = (parseFloat(basicX) * parseFloat(basicY)) / 100;
        return result.toLocaleString(isEn ? 'en-US' : 'ko-KR', { maximumFractionDigits: 2 });
    };

    const calculateChange = () => {
        if (!changeFrom || !changeTo) return { percent: '', diff: '' };
        const from = parseFloat(changeFrom);
        const to = parseFloat(changeTo);
        const diff = to - from;
        const percent = ((diff / from) * 100).toFixed(2);
        return {
            percent: percent,
            diff: diff.toLocaleString(isEn ? 'en-US' : 'ko-KR', { maximumFractionDigits: 2 })
        };
    };

    const calculateRatio = () => {
        if (!ratioPart || !ratioWhole) return '';
        const result = (parseFloat(ratioPart) / parseFloat(ratioWhole)) * 100;
        return result.toFixed(2);
    };

    let titleText, descText, keywordsText;
    if (isEn) {
        titleText = t('tools.percent-calculator.title') || "Percent Calculator | Percentage, Change, Ratio";
        descText = t('tools.percent-calculator.description') || "Calculate Y% of X, percentage increase/decrease, and ratios easily.";
        keywordsText = "percent calculator, percentage change, ratio calculation, discount rate, yield percent";
    } else {
        titleText = "퍼센트 계산기 | 백분율, 증감률, 비율 계산기";
        descText = "X의 Y%, 전후 증감률, 비율(%) 세 가지 모드로 퍼센트를 간편하게 계산합니다.";
        keywordsText = "퍼센트계산기, 백분율계산, 증감률계산, 비율계산기, 할인율계산, 수익률계산, 퍼센트구하기";
    }

    const faqs = isEn ? [
        { q: 'What is the formula for Percentage Change?', a: 'Percentage Change (%) = ((New Value - Old Value) / Old Value) × 100. Positive means increase, negative means decrease.' },
        { q: 'What is a Percent Point (%p)?', a: 'If a rate goes from 10% to 20%, it is a 10%p increase (simple difference) but a +100% percentage change (relative growth). Statistics often distinguish %p and %.' },
    ] : [
        { q: '증감률 계산 공식은?', a: '증감률(%) = (현재값 - 이전값) / 이전값 × 100. 양수이면 증가, 음수이면 감소율입니다.' },
        { q: '퍼센트 포인트(%p)와 퍼센트(%)의 차이는 무엇인가요?', a: '10%에서 20%로 변하면, 10%p 증가(단순 차이)이지만 100% 상승(증감률)입니다. 금리, 지지율 등 통계에서는 "퍼센트 포인트(%p)"를 쓰는 경우가 많습니다.' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <SEO
                title={titleText}
                description={descText}
                keywords={keywordsText}
                path="/percent-calculator"
                faqs={faqs}
            />

            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mb-4 shadow-lg">
                        <Percent className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                        {isEn ? 'Percent Calculator' : '퍼센트 계산기'}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        {isEn ? 'Calculate Percentage, Change, and Ratio' : '백분율, 증감률, 비율 계산'}
                    </p>
                </div>

                <div className="flex gap-2 mb-6 overflow-x-auto">
                    <button
                        onClick={() => setMode('basic')}
                        className={`px-6 py-3 rounded-lg font-medium transition-colors whitespace-nowrap ${mode === 'basic'
                                ? 'bg-green-500 text-white'
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                            }`}
                    >
                        {isEn ? 'Y% of X' : 'X의 Y%'}
                    </button>
                    <button
                        onClick={() => setMode('change')}
                        className={`px-6 py-3 rounded-lg font-medium transition-colors whitespace-nowrap ${mode === 'change'
                                ? 'bg-green-500 text-white'
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                            }`}
                    >
                        {isEn ? 'Percent Change' : '증감률 계산'}
                    </button>
                    <button
                        onClick={() => setMode('ratio')}
                        className={`px-6 py-3 rounded-lg font-medium transition-colors whitespace-nowrap ${mode === 'ratio'
                                ? 'bg-green-500 text-white'
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                            }`}
                    >
                        {isEn ? 'Percentage Ratio' : '비율 계산'}
                    </button>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
                    {mode === 'basic' && (
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                                {isEn ? 'Calculate Y% of X' : 'X의 Y% 계산'}
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        {isEn ? 'Total Value (X)' : '전체 값 (X)'}
                                    </label>
                                    <input
                                        type="number"
                                        value={basicX}
                                        onChange={(e) => setBasicX(e.target.value)}
                                        placeholder={isEn ? "e.g. 100" : "예: 100"}
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        {isEn ? 'Percentage (Y%)' : '퍼센트 (Y%)'}
                                    </label>
                                    <input
                                        type="number"
                                        value={basicY}
                                        onChange={(e) => setBasicY(e.target.value)}
                                        placeholder={isEn ? "e.g. 20" : "예: 20"}
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                                    />
                                </div>
                                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
                                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">{isEn ? 'Result' : '결과'}</div>
                                    <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                                        {calculateBasic() || '0'}
                                    </div>
                                    {basicX && basicY && (
                                        <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                                            {isEn ? `${basicY}% of ${basicX} = ${calculateBasic()}` : `${basicX}의 ${basicY}% = ${calculateBasic()}`}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {mode === 'change' && (
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                                {isEn ? 'Percent Change' : '증감률 계산'}
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        {isEn ? 'Old Value' : '이전 값'}
                                    </label>
                                    <input
                                        type="number"
                                        value={changeFrom}
                                        onChange={(e) => setChangeFrom(e.target.value)}
                                        placeholder={isEn ? "e.g. 100" : "예: 100"}
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        {isEn ? 'New Value' : '현재 값'}
                                    </label>
                                    <input
                                        type="number"
                                        value={changeTo}
                                        onChange={(e) => setChangeTo(e.target.value)}
                                        placeholder={isEn ? "e.g. 120" : "예: 120"}
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                                    />
                                </div>
                                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">{isEn ? 'Change (%)' : '증감률'}</div>
                                            <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                                                {calculateChange().percent || '0'}%
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">{isEn ? 'Difference' : '차이'}</div>
                                            <div className="text-3xl font-bold text-gray-900 dark:text-white">
                                                {calculateChange().diff || '0'}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {mode === 'ratio' && (
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                                {isEn ? 'Percentage Ratio' : '비율 계산'}
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        {isEn ? 'Part Value' : '부분 값'}
                                    </label>
                                    <input
                                        type="number"
                                        value={ratioPart}
                                        onChange={(e) => setRatioPart(e.target.value)}
                                        placeholder={isEn ? "e.g. 20" : "예: 20"}
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        {isEn ? 'Whole Value' : '전체 값'}
                                    </label>
                                    <input
                                        type="number"
                                        value={ratioWhole}
                                        onChange={(e) => setRatioWhole(e.target.value)}
                                        placeholder={isEn ? "e.g. 100" : "예: 100"}
                                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                                    />
                                </div>
                                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6">
                                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">{isEn ? 'Ratio' : '비율'}</div>
                                    <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                                        {calculateRatio() || '0'}%
                                    </div>
                                    {ratioPart && ratioWhole && (
                                        <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                                            {isEn 
                                                ? `${ratioPart} is ${calculateRatio()}% of ${ratioWhole}` 
                                                : `${ratioPart}은(는) ${ratioWhole}의 ${calculateRatio()}%`}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <ShareButtons />
                <ToolGuide
                    title={isEn ? "Percent Calculator Guide" : "퍼센트 계산기 사용 가이드"}
                    intro={isEn 
                        ? "This simple calculator allows you to compute Y% of X, percent changes over time, and regular ratios seamlessly. Ideal for calculating shopping discounts, investment yields, math homework, or sales tax."
                        : "퍼센트 계산기는 세 가지 모드로 다양한 백분율 계산을 지원합니다. 수학 과제, 쇼핑 할인, 투자 수익률, 시험 점수 비율 계산 등에 활용하세요."}
                    steps={isEn ? [
                        'Select the calculation mode from the top tabs.',
                        '"Y% of X" Mode: Simply enter Total(X) and Percentage(Y).',
                        '"Percent Change": Enter Old value and New value to find out growth or shrink %.',
                        '"Percentage Ratio": Enter Part value and Whole value to find its proportion.',
                        'The computed results updates automatically below.'
                    ] : [
                        '상단 탭에서 계산 모드를 선택합니다.',
                        '"X의 Y%" 모드: 전체값(X)과 퍼센트(Y)를 입력하면 값을 계산합니다.',
                        '"증감률" 모드: 이전 값과 현재 값을 입력하면 변화율(%)을 계산합니다.',
                        '"비율" 모드: 부분 값과 전체 값을 입력하면 퍼센트 비율을 계산합니다.',
                        '결과가 즉시 자동 표시됩니다.',
                    ]}
                    tips={isEn ? [
                        '"Y% of X" example: What is 30% of $3,000? -> 900.',
                        '"Change" example: Stock goes from $100 to $120 -> +20% change.',
                        '"Ratio" example: 12 passes out of 30 total -> 40%.',
                        'For explicit store discounts, you can also use our specific Discount Calculator.'
                    ] : [
                        '"X의 Y%" 예시: 월급 3,000,000원의 30%는? → 3000000의 30% = 900,000원',
                        '"증감률" 예시: 주가가 10,000원에서 12,000원이 되면? → 증감률 +20%',
                        '"비율" 예시: 반 30명 중 12명 합격 시 합격률? → 12는 30의 40%',
                        '할인율 계산은 "할인율 계산기" 도구가 더 특화되어 있습니다.',
                    ]}
                    faqs={faqs}
                />
            </div>
        </div>
    );
};

export default PercentCalculator;
