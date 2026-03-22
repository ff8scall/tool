import React, { useState } from 'react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { Percent, Calculator, TrendingDown, RefreshCw } from 'lucide-react';
import ShareButtons from '../components/ShareButtons';

const DiscountCalculator = () => {
    const [originalPrice, setOriginalPrice] = useState('');
    const [discountPercent, setDiscountPercent] = useState('');
    const [finalPrice, setFinalPrice] = useState('');
    const [savings, setSavings] = useState(0);
    const [mode, setMode] = useState('forward'); // forward or reverse

    const formatNumber = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    const parseNumber = (str) => {
        return parseFloat(str.replace(/,/g, '')) || 0;
    };

    const calculateForward = (price, discount) => {
        const p = parseNumber(price);
        const d = parseFloat(discount) || 0;

        if (p > 0 && d >= 0 && d <= 100) {
            const discountAmount = p * (d / 100);
            const final = p - discountAmount;
            setFinalPrice(formatNumber(Math.round(final)));
            setSavings(Math.round(discountAmount));
        } else {
            setFinalPrice('');
            setSavings(0);
        }
    };

    const calculateReverse = (price, final) => {
        const p = parseNumber(price);
        const f = parseNumber(final);

        if (p > 0 && f > 0 && f < p) {
            const discountAmount = p - f;
            const percent = (discountAmount / p) * 100;
            setDiscountPercent(percent.toFixed(1));
            setSavings(Math.round(discountAmount));
        } else {
            setDiscountPercent('');
            setSavings(0);
        }
    };

    const handleOriginalPriceChange = (value) => {
        setOriginalPrice(value);
        if (mode === 'forward') {
            calculateForward(value, discountPercent);
        } else {
            calculateReverse(value, finalPrice);
        }
    };

    const handleDiscountChange = (value) => {
        setDiscountPercent(value);
        if (mode === 'forward') {
            calculateForward(originalPrice, value);
        }
    };

    const handleFinalPriceChange = (value) => {
        setFinalPrice(value);
        if (mode === 'reverse') {
            calculateReverse(originalPrice, value);
        }
    };

    const applyPreset = (percent) => {
        setMode('forward');
        setDiscountPercent(percent.toString());
        calculateForward(originalPrice, percent);
    };

    const reset = () => {
        setOriginalPrice('');
        setDiscountPercent('');
        setFinalPrice('');
        setSavings(0);
    };

    const switchMode = () => {
        setMode(mode === 'forward' ? 'reverse' : 'forward');
        setDiscountPercent('');
        setFinalPrice('');
        setSavings(0);
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <SEO
                title="할인율 계산기 | 세일 가격 계산, 역할인율 계산"
                description="원가와 할인율을 입력하면 최종 가격을 즉시 계산합니다. 반대로 원가와 실제 구매가를 입력하면 할인율도 자동 계산합니다. 쇼핑 중 빠른 가격 확인에 활용하세요."
                keywords="할인율계산기, 세일가격계산, 할인가계산, 역할인율계산, 쇼핑계산기, 퍼센트계산기, 가격할인계산"
            />

            <div className="text-center space-y-4 py-6">
                <div className="inline-flex items-center justify-center p-3 bg-red-100 dark:bg-red-900/30 rounded-full mb-2">
                    <Percent className="w-8 h-8 text-red-600 dark:text-red-400" />
                </div>
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-pink-600">
                    할인율 계산기
                </h1>
                <p className="text-muted-foreground">
                    원가와 할인율을 입력하면 최종 가격을 계산해드립니다.
                </p>
            </div>

            {/* Mode Switch */}
            <div className="flex justify-center gap-2">
                <button
                    onClick={() => setMode('forward')}
                    className={`px-6 py-2 rounded-lg font-medium transition-colors ${mode === 'forward'
                            ? 'bg-red-500 text-white'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                        }`}
                >
                    할인율 → 최종가격
                </button>
                <button
                    onClick={() => setMode('reverse')}
                    className={`px-6 py-2 rounded-lg font-medium transition-colors ${mode === 'reverse'
                            ? 'bg-red-500 text-white'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                        }`}
                >
                    최종가격 → 할인율
                </button>
            </div>

            <div className="card p-8 space-y-6">
                {/* Original Price */}
                <div>
                    <label className="block text-sm font-medium mb-2">원가</label>
                    <div className="relative">
                        <input
                            type="text"
                            value={originalPrice}
                            onChange={(e) => handleOriginalPriceChange(e.target.value)}
                            className="input w-full text-right pr-12 text-lg"
                            placeholder="0"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">원</span>
                    </div>
                </div>

                {mode === 'forward' ? (
                    <>
                        {/* Discount Percent */}
                        <div>
                            <label className="block text-sm font-medium mb-2">할인율</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    value={discountPercent}
                                    onChange={(e) => handleDiscountChange(e.target.value)}
                                    className="input w-full text-right pr-12 text-lg"
                                    placeholder="0"
                                    min="0"
                                    max="100"
                                    step="0.1"
                                />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                            </div>

                            {/* Preset Buttons */}
                            <div className="grid grid-cols-4 gap-2 mt-3">
                                {[10, 20, 30, 50].map((percent) => (
                                    <button
                                        key={percent}
                                        onClick={() => applyPreset(percent)}
                                        className="btn btn-ghost text-sm py-2"
                                    >
                                        {percent}%
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Final Price (Result) */}
                        <div>
                            <label className="block text-sm font-medium mb-2">최종 가격</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={finalPrice}
                                    readOnly
                                    className="input w-full text-right pr-12 text-lg font-bold bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400"
                                    placeholder="0"
                                />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-green-600 dark:text-green-400">원</span>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        {/* Final Price (Input) */}
                        <div>
                            <label className="block text-sm font-medium mb-2">최종 가격</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={finalPrice}
                                    onChange={(e) => handleFinalPriceChange(e.target.value)}
                                    className="input w-full text-right pr-12 text-lg"
                                    placeholder="0"
                                />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">원</span>
                            </div>
                        </div>

                        {/* Discount Percent (Result) */}
                        <div>
                            <label className="block text-sm font-medium mb-2">할인율</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={discountPercent}
                                    readOnly
                                    className="input w-full text-right pr-12 text-lg font-bold bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400"
                                    placeholder="0"
                                />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-green-600 dark:text-green-400">%</span>
                            </div>
                        </div>
                    </>
                )}

                {/* Savings Display */}
                {savings > 0 && (
                    <div className="p-4 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 rounded-xl border border-red-200 dark:border-red-800">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <TrendingDown className="w-5 h-5 text-red-600 dark:text-red-400" />
                                <span className="font-medium text-gray-700 dark:text-gray-300">절약 금액</span>
                            </div>
                            <span className="text-2xl font-bold text-red-600 dark:text-red-400">
                                {formatNumber(savings)}원
                            </span>
                        </div>
                    </div>
                )}

                {/* Reset Button */}
                <button
                    onClick={reset}
                    className="btn btn-ghost w-full flex items-center justify-center gap-2"
                >
                    <RefreshCw className="w-5 h-5" />
                    초기화
                </button>
            </div>

            {/* Info */}
            <div className="bg-muted/30 rounded-xl p-6 space-y-2 text-sm">
                <h3 className="font-bold text-base flex items-center gap-2">
                    <Calculator className="w-4 h-4" />
                    사용 방법
                </h3>
                <ul className="space-y-1 text-muted-foreground list-disc list-inside">
                    <li><strong>할인율 → 최종가격:</strong> 원가와 할인율을 입력하면 최종 가격 계산</li>
                    <li><strong>최종가격 → 할인율:</strong> 원가와 최종 가격을 입력하면 할인율 계산</li>
                    <li>프리셋 버튼(10%, 20%, 30%, 50%)으로 빠른 계산</li>
                    <li>쉼표로 구분된 금액 표시</li>
                </ul>
            </div>

            <ShareButtons />
        
            <ToolGuide
title="할인율 계산기 사용 가이드"
                intro="할인율 계산기는 쇼핑 중 할인 가격을 빠르게 계산하거나, 역으로 실제 할인율을 파악하는 두 가지 모드를 지원합니다. 온라인·오프라인 쇼핑, 세일 기간 할인 비교에 활용하세요."
                steps={[
                    '상단 탭에서 모드를 선택합니다: "할인율 → 최종가격" 또는 "최종가격 → 할인율".',
                    '"원가" 에 정가(할인 전 가격)를 입력합니다.',
                    '모드에 따라 "할인율(%)" 또는 "최종 가격"을 입력합니다.',
                    '절약 금액과 결과가 자동으로 계산됩니다.',
                    '10%, 20%, 30%, 50% 프리셋 버튼으로 빠르게 계산할 수 있습니다.',
                ]}
                tips={[
                    '"최종가격 → 할인율" 모드: 쇼핑몰에서 원가와 판매가를 입력하면 실제 할인율을 역산할 수 있습니다.',
                    '블랙프라이데이, 연말 세일 시 여러 상품의 할인율을 비교해 최대 절약 상품을 찾아보세요.',
                    '쿠폰(10%) + 추가 할인(5%) 등 중복 할인 계산 시, 최종가를 기준으로 재계산하세요.',
                    '부가세(VAT) 포함 여부를 확인하세요. 공급가에 10% 부가세가 추가된 금액이 실제 결제 금액입니다.',
                ]}
                faqs={[
                    { q: '30% 할인된 상품이 실제로 얼마인가요?', a: '원가에 0.7을 곱하면 됩니다. 예: 50,000원의 30% 할인 = 50,000 × 0.7 = 35,000원. 또는 이 도구에 50000과 30을 입력하세요.' },
                    { q: '할인율 역산이 왜 필요한가요?', a: '쇼핑몰에서 "원{가} 100,000원 → 판매가 73,000원"처럼 표기할 때, 실제 할인율이 정확히 몇 %인지 확인할 수 있습니다. "최종가격 → 할인율" 모드에서 100000과 73000을 입력하면 27%임을 알 수 있습니다.' },
                    { q: '여러 할인이 중복 적용될 때는 어떻게 계산하나요?', a: '중복 할인은 각 단계를 순서대로 계산해야 합니다. 예: 10만 원에 10% 할인 → 9만 원, 다시 5% 할인 → 85,500원. 단순히 15% 할인(85,000원)과는 다릅니다.' },
                ]}
            />
        </div>
    );
};

export default DiscountCalculator;


