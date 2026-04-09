import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { useLanguage } from '../context/LanguageContext';

const CompoundInterestCalculator = () => {
    const { lang } = useLanguage();
    const isEn = lang === 'en';
    const [principal, setPrincipal] = useState('10000');
    const [rate, setRate] = useState('5');
    const [years, setYears] = useState('10');
    const [compound, setCompound] = useState('12'); // Monthly compounding

    const calculate = () => {
        const p = parseFloat(principal);
        const r = parseFloat(rate) / 100;
        const t = parseFloat(years);
        const n = parseFloat(compound);

        if (!p || !r || !t || !n) return null;

        // Compound Formula: A = P(1 + r/n)^(nt)
        const amount = p * Math.pow((1 + r / n), n * t);
        const interest = amount - p;

        // Simple Interest (for comparison)
        const simpleInterest = p * r * t;
        const simpleAmount = p + simpleInterest;

        return {
            finalAmount: amount,
            totalInterest: interest,
            simpleAmount,
            simpleInterest,
            difference: amount - simpleAmount
        };
    };

    const result = calculate();

    const formatMoney = (num) => {
        return new Intl.NumberFormat(isEn ? 'en-US' : 'ko-KR', { maximumFractionDigits: 0 }).format(num);
    };

    const faqs = isEn ? [
        { q: 'What is Compound Interest?', a: 'Compound interest is the interest on a loan or deposit calculated based on both the initial principal and the accumulated interest from previous periods.' },
        { q: 'What is the Rule of 72?', a: 'The Rule of 72 is a simple way to determine how long an investment will take to double given a fixed annual rate of interest. Divide 72 by the annual rate of return to get an estimate of how many years it will take for the initial investment to duplicate itself.' },
        { q: 'How does compounding frequency affect my returns?', a: 'The more frequently interest is compounded (daily vs. monthly vs. annually), the higher the final return will be because interest is being earned on previously earned interest more often.' }
    ] : [
        { q: '복리와 단리의 차이는 무엇인가요?', a: '단리는 원금에만 이자가 붙습니다. 복리는 원금+이자에 다시 이자가 붙어 기하급수적으로 증가합니다. 기간이 길수록 복리와 단리의 차이는 커집니다.' },
        { q: '72의 법칙이란?', a: '72를 연이율(%)로 나누면 원금이 2배가 되는 대략적인 기간(년)이 나옵니다. 연 6% → 72÷6 = 12년 후 2배. 연 8% → 9년 후 2배.' },
        { q: '은행 정기예금과 이 계산기를 비교할 수 있나요?', a: '주요 시중은행 정기예금은 연 3~4%대입니다. 원금에 이 이율을 입력하고 복리 주기를 "월복리"로 설정하면 예상 수령액을 계산할 수 있습니다.' },
    ];

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <SEO
                title={t('tools.compound-interest.title')}
                description={t('tools.compound-interest.description')}
                keywords={isEn ? "compound interest, savings calculator, ROI calculator, finance tool" : "복리계산기, 복리이자계산, 단리복리비교, 투자수익계산, 72법칙"}
                faqs={faqs}
            />

            <header className="text-center space-y-2 py-4">
                <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
                    <TrendingUp className="w-8 h-8 text-primary" />
                    {isEn ? 'Compound Interest Calculator' : '복리 계산기'}
                </h1>
                <p className="text-muted-foreground">
                    {isEn ? 'Experience the magic of compounding.' : '복리의 마법을 경험하세요'}
                </p>
            </header>

            {/* Input */}
            <div className="bg-card border border-border rounded-xl p-6 space-y-4 shadow-sm">
                <div>
                    <label className="block text-sm font-medium mb-2">{isEn ? 'Initial Principal' : '원금 (원)'}</label>
                    <input
                        type="number"
                        value={principal}
                        onChange={(e) => setPrincipal(e.target.value)}
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">{isEn ? 'Annual Rate (%)' : '연 이율 (%)'}</label>
                        <input
                            type="number"
                            step="0.1"
                            value={rate}
                            onChange={(e) => setRate(e.target.value)}
                            className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">{isEn ? 'Period (Years)' : '기간 (년)'}</label>
                        <input
                            type="number"
                            value={years}
                            onChange={(e) => setYears(e.target.value)}
                            className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">{isEn ? 'Compounding Interval' : '복리 주기'}</label>
                    <select
                        value={compound}
                        onChange={(e) => setCompound(e.target.value)}
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
                    >
                        <option value="1">{isEn ? 'Annually' : '연 1회'}</option>
                        <option value="2">{isEn ? 'Semi-annually' : '반기 (6개월)'}</option>
                        <option value="4">{isEn ? 'Quarterly' : '분기 (3개월)'}</option>
                        <option value="12">{isEn ? 'Monthly' : '월복리'}</option>
                        <option value="365">{isEn ? 'Daily' : '일복리'}</option>
                    </select>
                </div>
            </div>

            {/* Results */}
            {result && (
                <>
                    <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-8 text-center shadow-inner">
                        <h3 className="text-sm font-medium text-muted-foreground mb-2">{isEn ? 'Final Balance (Compound)' : '최종 금액 (복리)'}</h3>
                        <p className="text-5xl font-bold text-green-600 dark:text-green-400 mb-2">
                            {formatMoney(result.finalAmount)} {isEn ? '' : '원'}
                        </p>
                        <p className="text-muted-foreground">
                            {isEn ? 'Total Interest: ' : '이자: '} {formatMoney(result.totalInterest)} {isEn ? '' : '원'}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                            <h3 className="font-bold mb-4">💰 {isEn ? 'Compound vs Simple' : '복리 vs 단리'}</h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">{isEn ? 'Compound Balance' : '복리 최종 금액'}</span>
                                    <span className="font-bold text-green-600 dark:text-green-400">
                                        {formatMoney(result.finalAmount)} {isEn ? '' : '원'}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">{isEn ? 'Simple Balance' : '단리 최종 금액'}</span>
                                    <span className="font-bold">
                                        {formatMoney(result.simpleAmount)} {isEn ? '' : '원'}
                                    </span>
                                </div>
                                <div className="flex justify-between pt-2 border-t border-border">
                                    <span className="text-muted-foreground">{isEn ? 'Compound Benefit' : '복리 효과'}</span>
                                    <span className="font-bold text-primary">
                                        +{formatMoney(result.difference)} {isEn ? '' : '원'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                            <h3 className="font-bold mb-4">📊 {isEn ? 'Total ROI' : '수익률'}</h3>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">{isEn ? 'Principal' : '원금'}</span>
                                    <span className="font-bold">
                                        {formatMoney(parseFloat(principal))} {isEn ? '' : '원'}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-muted-foreground">{isEn ? 'Total Interest' : '총 이자'}</span>
                                    <span className="font-bold text-green-600 dark:text-green-400">
                                        {formatMoney(result.totalInterest)} {isEn ? '' : '원'}
                                    </span>
                                </div>
                                <div className="flex justify-between pt-2 border-t border-border">
                                    <span className="text-muted-foreground">{isEn ? 'ROI (%)' : '수익률'}</span>
                                    <span className="font-bold text-primary">
                                        {((result.totalInterest / parseFloat(principal)) * 100).toFixed(2)}%
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* Educational Content */}
            <div className="space-y-6">
                <div className="bg-muted/30 rounded-xl p-6">
                    <h3 className="font-bold text-lg mb-4">{isEn ? '💡 What is Compound Interest?' : '💡 복리란?'}</h3>
                    <div className="space-y-3 text-sm text-muted-foreground">
                        <p>
                            {isEn ? (
                                <>
                                    <strong>Compound interest</strong> is interest calculated on the initial principal and also on the accumulated interest of previous periods of a deposit or loan. It can be thought of as "interest on interest," and will make a sum grow at a faster rate than simple interest.
                                </>
                            ) : (
                                <>
                                    <strong className="text-foreground">복리(複利, Compound Interest)</strong>는 원금에 대한 이자뿐만 아니라,
                                    발생한 이자에도 다시 이자가 붙는 방식입니다. 시간이 지날수록 이자가 기하급수적으로 증가하여
                                    단리보다 훨씬 큰 수익을 얻을 수 있습니다.
                                </>
                            )}
                        </p>
                        {isEn && <p>Einstein famously called compound interest the "eighth wonder of the world," saying "He who understands it, earns it; he who doesn't, pays it."</p>}
                    </div>
                </div>

                <div className="bg-muted/30 rounded-xl p-6">
                    <h3 className="font-bold text-lg mb-4">{isEn ? '📐 Compound Interest Formula' : '📐 복리 계산 공식'}</h3>
                    <div className="space-y-4 text-sm text-muted-foreground">
                        <div className="bg-background border border-border rounded-lg p-4 font-mono text-center">
                            <p className="text-lg font-bold text-foreground">A = P(1 + r/n)^(nt)</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div className="bg-background border border-border rounded-lg p-3">
                                <p><strong className="text-foreground">A</strong> = {isEn ? 'Final Amount' : '최종 금액'}</p>
                            </div>
                            <div className="bg-background border border-border rounded-lg p-3">
                                <p><strong className="text-foreground">P</strong> = {isEn ? 'Initial Principal' : '원금'}</p>
                            </div>
                            <div className="bg-background border border-border rounded-lg p-3">
                                <p><strong className="text-foreground">r</strong> = {isEn ? 'Annual Rate (decimal)' : '초기 투자금'}</p>
                            </div>
                            <div className="bg-background border border-border rounded-lg p-3">
                                <p><strong className="text-foreground">n</strong> = {isEn ? 'Compounding Frequency' : '연간 복리 횟수'}</p>
                            </div>
                            <div className="bg-background border border-border rounded-lg p-3 md:col-span-2">
                                <p><strong className="text-foreground">t</strong> = {isEn ? 'Number of Years' : '투자 기간 (년)'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ToolGuide
                title={isEn ? "Compound Interest Guide" : "복리 계산기 사용 가이드"}
                intro={isEn ? "Plan your savings and investments with our compound interest calculator. Witness the potential growth over time." : "복리 계산기는 A = P(1 + r/n)^(nt) 공식을 사용해 원금이 복리로 불어난 최종 금액을 계산합니다."}
                steps={isEn ? [
                    "Enter your 'Initial Principal' amount.",
                    "Input the expected 'Annual Rate (%)'.",
                    "Enter the 'Period' in years.",
                    "Select how often the interest is compounded.",
                    "Review the final balance and comparison with simple interest."
                ] : [
                    '"원금(원)"에 초기 투자금을 입력합니다.',
                    '"연 이율(%)"에 연간 이자율을 입력합니다.',
                    '"기간(년)"에 투자 기간을 입력합니다.',
                    '"복리 주기"를 선택합니다.',
                    '결과 카드에서 복리 최종금액, 총 이자, 단리와의 차이를 확인합니다.',
                ]}
                tips={isEn ? [
                    "The Rule of 72: Divide 72 by your interest rate to see how long it takes to double your money.",
                    "Time is your greatest ally; start early to maximize the compounding effect.",
                    "Reinvesting dividends or interest instead of withdrawing them will significantly boost growth."
                ] : [
                    '"72의 법칙": 72 ÷ 연이율(%) = 원금이 2배가 되는 기간(년).',
                    '같은 이율이라도 복리 주기가 많을수록 최종 수익이 늘어납니다.',
                    '이자소득세(15.4%)를 포함한 실제 수익은 이 계산기 결과보다 줄어듭니다.',
                ]}
                faqs={faqs}
            />
        </div>
    );
};

export default CompoundInterestCalculator;
