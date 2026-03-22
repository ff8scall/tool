import React, { useState } from 'react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { Divide } from 'lucide-react';
import ShareButtons from '../components/ShareButtons';

const FractionCalculator = () => {
    const [num1, setNum1] = useState('');
    const [den1, setDen1] = useState('');
    const [num2, setNum2] = useState('');
    const [den2, setDen2] = useState('');
    const [operation, setOperation] = useState('+');
    const [decimal, setDecimal] = useState('');

    // 최대공약수 (GCD)
    const gcd = (a, b) => {
        a = Math.abs(a);
        b = Math.abs(b);
        while (b !== 0) {
            const temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    };

    // 기약분수로 변환
    const simplify = (numerator, denominator) => {
        if (denominator === 0) return { num: 0, den: 1 };
        const divisor = gcd(numerator, denominator);
        let num = numerator / divisor;
        let den = denominator / divisor;

        // 분모가 음수면 분자로 이동
        if (den < 0) {
            num = -num;
            den = -den;
        }

        return { num, den };
    };

    // 분수 계산
    const calculate = () => {
        const n1 = parseInt(num1) || 0;
        const d1 = parseInt(den1) || 1;
        const n2 = parseInt(num2) || 0;
        const d2 = parseInt(den2) || 1;

        let resultNum, resultDen;

        switch (operation) {
            case '+':
                resultNum = n1 * d2 + n2 * d1;
                resultDen = d1 * d2;
                break;
            case '-':
                resultNum = n1 * d2 - n2 * d1;
                resultDen = d1 * d2;
                break;
            case '*':
                resultNum = n1 * n2;
                resultDen = d1 * d2;
                break;
            case '/':
                resultNum = n1 * d2;
                resultDen = d1 * n2;
                break;
            default:
                return { num: 0, den: 1 };
        }

        return simplify(resultNum, resultDen);
    };
    // 소수를 분수로 변환
    const decimalToFraction = () => {
        if (!decimal) return { num: 0, den: 1 };
        const dec = parseFloat(decimal);
        const decimalPlaces = (decimal.split('.')[1] || '').length;
        const denominator = Math.pow(10, decimalPlaces);
        const numerator = dec * denominator;
        return simplify(Math.round(numerator), denominator);
    };
    const result = calculate();
    const decResult = decimalToFraction();

    return (
        <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <SEO
                title="분수 계산기 | 분수 사칙연산, 기약분수 변환, 소수 변환"
                description="분수 덧셈·뺄셈·곱셈·나눗셈 계산, 기약분수 자동 변환, 소수를 분수로 변환하는 계산기입니다. 수학 숙제, 요리 재료 계량 분수 계산에 활용하세요."
                keywords="분수계산기, 기약분수변환, 소수분수변환, 분수덧셈, 분수곱셈, 분수나눗셈, 분수사칙연산"
                path="/fraction-calculator"
            />

            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
                        <Divide className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                        분수 계산기
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        분수 사칙연산 및 기약분수 변환
                    </p>
                </div>

                {/* 분수 사칙연산 */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                        분수 사칙연산
                    </h2>

                    <div className="flex items-center gap-4 mb-6 flex-wrap">
                        {/* 첫 번째 분수 */}
                        <div className="flex flex-col items-center">
                            <input
                                type="number"
                                value={num1}
                                onChange={(e) => setNum1(e.target.value)}
                                placeholder="분자"
                                className="w-24 px-3 py-2 text-center border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 dark:bg-gray-700 dark:text-white mb-1"
                            />
                            <div className="w-24 h-0.5 bg-gray-400 dark:bg-gray-500 my-1"></div>
                            <input
                                type="number"
                                value={den1}
                                onChange={(e) => setDen1(e.target.value)}
                                placeholder="분모"
                                className="w-24 px-3 py-2 text-center border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 dark:bg-gray-700 dark:text-white mt-1"
                            />
                        </div>

                        {/* 연산자 */}
                        <select
                            value={operation}
                            onChange={(e) => setOperation(e.target.value)}
                            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 dark:bg-gray-700 dark:text-white text-2xl"
                        >
                            <option value="+">+</option>
                            <option value="-">−</option>
                            <option value="*">×</option>
                            <option value="/">÷</option>
                        </select>

                        {/* 두 번째 분수 */}
                        <div className="flex flex-col items-center">
                            <input
                                type="number"
                                value={num2}
                                onChange={(e) => setNum2(e.target.value)}
                                placeholder="분자"
                                className="w-24 px-3 py-2 text-center border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 dark:bg-gray-700 dark:text-white mb-1"
                            />
                            <div className="w-24 h-0.5 bg-gray-400 dark:bg-gray-500 my-1"></div>
                            <input
                                type="number"
                                value={den2}
                                onChange={(e) => setDen2(e.target.value)}
                                placeholder="분모"
                                className="w-24 px-3 py-2 text-center border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 dark:bg-gray-700 dark:text-white mt-1"
                            />
                        </div>

                        <span className="text-3xl text-gray-400">=</span>

                        {/* 결과 */}
                        <div className="flex flex-col items-center bg-violet-50 dark:bg-violet-900/20 px-6 py-4 rounded-lg">
                            <div className="text-2xl font-bold text-violet-600 dark:text-violet-400">
                                {result.num}
                            </div>
                            <div className="w-16 h-0.5 bg-violet-400 dark:bg-violet-500 my-1"></div>
                            <div className="text-2xl font-bold text-violet-600 dark:text-violet-400">
                                {result.den}
                            </div>
                        </div>
                    </div>

                    {result.den !== 1 && (
                        <div className="text-sm text-gray-600 dark:text-gray-400 text-center">
                            소수: {(result.num / result.den).toFixed(4)}
                        </div>
                    )}
                </div>

                {/* 소수 → 분수 변환 */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                        소수 → 분수 변환
                    </h2>

                    <div className="flex items-center gap-4 flex-wrap">
                        <input
                            type="number"
                            step="0.01"
                            value={decimal}
                            onChange={(e) => setDecimal(e.target.value)}
                            placeholder="소수 입력 (예: 0.75)"
                            className="flex-1 min-w-[200px] px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 dark:bg-gray-700 dark:text-white"
                        />

                        <span className="text-2xl text-gray-400">=</span>

                        <div className="flex flex-col items-center bg-violet-50 dark:bg-violet-900/20 px-6 py-4 rounded-lg">
                            <div className="text-2xl font-bold text-violet-600 dark:text-violet-400">
                                {decResult.num}
                            </div>
                            <div className="w-16 h-0.5 bg-violet-400 dark:bg-violet-500 my-1"></div>
                            <div className="text-2xl font-bold text-violet-600 dark:text-violet-400">
                                {decResult.den}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 참고 정보 */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-3">참고</h3>
                    <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                        <p>• 결과는 자동으로 기약분수로 변환됩니다</p>
                        <p>• 분모가 0인 경우 계산할 수 없습니다</p>
                        <p>• 예시: 1/2 + 1/3 = 5/6</p>
                    </div>
                </div>

                <div className="mt-8"><ShareButtons />
                <ToolGuide
                    title="분수 계산기 사용 가이드"
                    intro="분수 계산기는 두 분수의 덧셈·뺄셈·곱셈·나눗셈을 계산하고, 결과를 자동으로 기약분수로 변환합니다. 소수를 분수로 변환하는 기능도 제공합니다."
                    steps={[
                        '"분수 사칙연산" 섹션에서 첫 번째 분수(분자/분모)를 입력합니다.',
                        '연산자(+, −, ×, ÷)를 선택합니다.',
                        '두 번째 분수(분자/분모)를 입력합니다.',
                        '결과가 자동으로 기약분수로 표시됩니다.',
                        '"소수 → 분수 변환" 에서 소수(예: 0.75)를 입력하면 분수(3/4)로 변환됩니다.',
                    ]}
                    tips={[
                        '1/2 + 1/3을 입력하면 자동으로 5/6으로 계산됩니다.',
                        '음수 분수는 분자에 마이너스를 입력하면 됩니다. (예: 분자 -1, 분모 3 = -1/3)',
                        '소수 0.5 = 1/2, 0.25 = 1/4, 0.75 = 3/4, 0.333... = 1/3.',
                        '요리 레시피에서 재료를 절반으로 줄이거나 두 배로 늘릴 때 분수 계산이 유용합니다.',
                    ]}
                    faqs={[
                        { q: '기약분수란 무엇인가요?', a: '분자와 분모의 공약수가 1인 분수입니다. 예: 4/8 → 1/2 (최대공약수 4로 약분). 이 계산기는 결과를 자동으로 기약분수로 변환합니다.' },
                        { q: '분수를 소수로 바꾸려면?', a: '분자 ÷ 분모 = 소수. 예: 3/4 = 0.75. 결과 분수 아래 소수값이 자동으로 표시됩니다.' },
                        { q: '대분수(1과 2분의 1)는 어떻게 입력하나요?', a: '이 계산기는 가분수 형태로 입력해야 합니다. 1과 1/2 = 3/2. 분자에 3, 분모에 2를 입력하세요.' },
                    ]}
                />
            </div>
        </div>
        </div>
    );
};
export default FractionCalculator;


