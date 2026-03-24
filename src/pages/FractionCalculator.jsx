import React, { useState } from 'react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { Divide } from 'lucide-react';
import ShareButtons from '../components/ShareButtons';
import { useLanguage } from '../context/LanguageContext';

const FractionCalculator = () => {
    const { lang, t } = useLanguage();
    const isEn = lang === 'en';

    const [num1, setNum1] = useState('');
    const [den1, setDen1] = useState('');
    const [num2, setNum2] = useState('');
    const [den2, setDen2] = useState('');
    const [operation, setOperation] = useState('+');
    const [decimal, setDecimal] = useState('');

    // Greatest Common Divisor (GCD)
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

    // Simplify fraction
    const simplify = (numerator, denominator) => {
        if (denominator === 0) return { num: 0, den: 1 };
        const divisor = gcd(numerator, denominator);
        let num = numerator / divisor;
        let den = denominator / divisor;

        // Move negative sign to numerator
        if (den < 0) {
            num = -num;
            den = -den;
        }

        return { num, den };
    };

    // Calculate fractions
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

    // Convert decimal to fraction
    const decimalToFraction = () => {
        if (!decimal) return { num: 0, den: 1 };
        const dec = parseFloat(decimal);
        const decimalStr = decimal.toString();
        const decimalPlaces = (decimalStr.includes('.') ? decimalStr.split('.')[1].length : 0);
        const denominator = Math.pow(10, decimalPlaces);
        const numerator = dec * denominator;
        return simplify(Math.round(numerator), denominator);
    };

    const result = calculate();
    const decResult = decimalToFraction();

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <SEO
                title={t('tools.fraction-calculator.title')}
                description={t('tools.fraction-calculator.description')}
                keywords={isEn ? "fraction calculator, fraction to decimal, simplify fraction, math tool" : "분수계산기, 기약분수변환, 소수분수변환, 분수사칙연산"}
            />

            <div className="text-center space-y-4 py-4">
                <div className="inline-flex items-center justify-center p-3 bg-violet-100 dark:bg-violet-900/30 rounded-2xl text-violet-600 dark:text-violet-400 mb-2 border border-violet-200 dark:border-violet-800">
                    <Divide className="w-8 h-8" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {isEn ? 'Fraction Calculator' : '분수 계산기'}
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    {isEn ? 'Perform operations with fractions and simplify automatically.' : '분수 사칙연산 및 기약분수 변환'}
                </p>
            </div>

            {/* Fraction Operations */}
            <div className="bg-card border border-border rounded-2xl shadow-sm p-6 md:p-8">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <span className="w-1 h-5 bg-violet-500 rounded-full"></span>
                    {isEn ? 'Arithmetic Operations' : '분수 사칙연산'}
                </h2>

                <div className="flex items-center justify-center gap-4 mb-8 flex-wrap">
                    {/* First Fraction */}
                    <div className="flex flex-col items-center">
                        <input
                            type="number"
                            value={num1}
                            onChange={(e) => setNum1(e.target.value)}
                            placeholder={isEn ? 'Num' : '분자'}
                            className="w-20 md:w-24 px-3 py-2 text-center border border-border rounded-lg focus:ring-2 focus:ring-violet-500 bg-background mb-1 font-bold"
                        />
                        <div className="w-20 md:w-24 h-0.5 bg-gray-400 dark:bg-gray-600 my-1"></div>
                        <input
                            type="number"
                            value={den1}
                            onChange={(e) => setDen1(e.target.value)}
                            placeholder={isEn ? 'Den' : '분모'}
                            className="w-20 md:w-24 px-3 py-2 text-center border border-border rounded-lg focus:ring-2 focus:ring-violet-500 bg-background mt-1 font-bold"
                        />
                    </div>

                    {/* Operator */}
                    <select
                        value={operation}
                        onChange={(e) => setOperation(e.target.value)}
                        className="px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-violet-500 bg-background text-xl font-bold"
                    >
                        <option value="+">+</option>
                        <option value="-">−</option>
                        <option value="*">×</option>
                        <option value="/">÷</option>
                    </select>

                    {/* Second Fraction */}
                    <div className="flex flex-col items-center">
                        <input
                            type="number"
                            value={num2}
                            onChange={(e) => setNum2(e.target.value)}
                            placeholder={isEn ? 'Num' : '분자'}
                            className="w-20 md:w-24 px-3 py-2 text-center border border-border rounded-lg focus:ring-2 focus:ring-violet-500 bg-background mb-1 font-bold"
                        />
                        <div className="w-20 md:w-24 h-0.5 bg-gray-400 dark:bg-gray-600 my-1"></div>
                        <input
                            type="number"
                            value={den2}
                            onChange={(e) => setDen2(e.target.value)}
                            placeholder={isEn ? 'Den' : '분모'}
                            className="w-20 md:w-24 px-3 py-2 text-center border border-border rounded-lg focus:ring-2 focus:ring-violet-500 bg-background mt-1 font-bold"
                        />
                    </div>

                    <span className="text-3xl text-gray-400">=</span>

                    {/* Result */}
                    <div className="flex flex-col items-center bg-violet-50 dark:bg-violet-900/20 px-6 py-4 rounded-xl border border-violet-100 dark:border-violet-900/30">
                        <div className="text-2xl font-black text-violet-600 dark:text-violet-400">
                            {result.num}
                        </div>
                        <div className="w-16 h-0.5 bg-violet-400 dark:bg-violet-600 my-2"></div>
                        <div className="text-2xl font-black text-violet-600 dark:text-violet-400">
                            {result.den}
                        </div>
                    </div>
                </div>

                {num1 && den1 && num2 && den2 && result.den !== 1 && (
                    <div className="text-sm font-medium text-gray-600 dark:text-gray-400 text-center">
                        {isEn ? 'Decimal Equivalent:' : '소수 값:'} <span className="text-violet-600 font-bold">{(result.num / result.den).toFixed(4)}</span>
                    </div>
                )}
            </div>

            {/* Decimal to Fraction */}
            <div className="bg-card border border-border rounded-2xl shadow-sm p-6 md:p-8">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <span className="w-1 h-5 bg-violet-500 rounded-full"></span>
                    {isEn ? 'Decimal to Fraction' : '소수 → 분수 변환'}
                </h2>

                <div className="flex items-center justify-center gap-4 flex-wrap">
                    <input
                        type="number"
                        step="any"
                        value={decimal}
                        onChange={(e) => setDecimal(e.target.value)}
                        placeholder={isEn ? "Enter decimal (e.g. 0.75)" : "소수 입력 (예: 0.75)"}
                        className="flex-1 min-w-[200px] px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-violet-500 bg-background font-bold"
                    />

                    <span className="text-2xl text-gray-400">=</span>

                    <div className="flex flex-col items-center bg-violet-50 dark:bg-violet-900/20 px-6 py-4 rounded-xl border border-violet-100 dark:border-violet-900/30">
                        <div className="text-2xl font-black text-violet-600 dark:text-violet-400">
                            {decResult.num}
                        </div>
                        <div className="w-16 h-0.5 bg-violet-400 dark:bg-violet-600 my-2"></div>
                        <div className="text-2xl font-black text-violet-600 dark:text-violet-400">
                            {decResult.den}
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-muted/30 border border-border rounded-xl p-6 text-sm text-muted-foreground space-y-3">
                <h3 className="font-bold text-foreground flex items-center gap-2 underline underline-offset-4 decoration-violet-500">💡 {isEn ? 'Calculator Tips' : '계산기 활용 팁'}</h3>
                <ul className="space-y-1 list-disc list-inside">
                    <li>{isEn ? 'Results are automatically simplified to their lowest terms.' : '모든 결과값은 자동으로 기약분수로 변환되어 출력됩니다.'}</li>
                    <li>{isEn ? 'Denominators cannot be zero.' : '분모가 0인 상태로는 계산할 수 없습니다.'}</li>
                    <li>{isEn ? 'Example: 1/2 + 1/3 = 5/6.' : '예: 1/2 + 1/3을 입력하면 즉시 5/6이라는 결과가 나옵니다.'}</li>
                </ul>
            </div>

            <ShareButtons />

            <ToolGuide
                title={isEn ? "Fraction Computation Guide" : "분수 계산기 활용 가이드"}
                intro={isEn 
                    ? "Effortlessly solve complex fraction additions, subtractions, and conversions." 
                    : "두 분수의 덧셈, 뺄셈, 곱셈, 나눗셈을 원터치로 해결해주는 도구입니다."}
                steps={isEn ? [
                    "Input the numerator and denominator for the fractions.",
                    "Select the math operator (+, -, *, /).",
                    "The simplified result appears automatically.",
                    "Use the bottom converter for decimal-to-fraction translation."
                ] : [
                    "상단 사칙연산 섹션에서 첫 번째 분수와 두 번째 분수의 값을 기입합니다.",
                    "원하는 사칙연산 기호(+, -, *, /)를 선택하세요.",
                    "화면 우측에 자동으로 계산된 기약분수 결과가 나타납니다.",
                    "소수 변환 기능을 통해 일반 숫자를 분수 형태로도 쉽게 바꿀 수 있습니다."
                ]}
                tips={isEn ? [
                    "GCD is used to ensure the simplest form.",
                    "Use minus sign in numerator for negative fractions.",
                    "Common decimals: 0.5 = 1/2, 0.25 = 1/4."
                ] : [
                    "분모에 0을 입력하면 결과가 제대로 나오지 않으니 주의하세요.",
                    "음수 분수 계산이 필요하다면 분자 입력칸에 마이너스(-)를 붙여 입력하면 됩니다.",
                    "요리나 베이킹 시 재료 비율을 맞출 때 활용해보세요."
                ]}
                faqs={isEn ? [
                    { q: "What is a simplified fraction?", a: "A fraction where the numerator and denominator share no common factors other than 1." },
                    { q: "Can I use negative numbers?", a: "Yes, use a minus sign in the numerator." }
                ] : [
                    { "q": "기약분수란 무엇인가요?", "a": "분자와 분모가 1 이외의 공약수를 가지지 않는 상태의 분수를 말합니다." },
                    { "q": "대분수 입력도 가능한가요?", "a": "대분수는 가분수로 고쳐서 입력하셔야 합니다." }
                ]}
            />
        </div>
    );
};

export default FractionCalculator;
