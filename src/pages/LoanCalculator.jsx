import React, { useState, useEffect } from 'react';
import { Calculator, DollarSign, Calendar, Percent } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { useLanguage } from '../context/LanguageContext';

const LoanCalculator = () => {
    const { lang } = useLanguage();
    const isEn = lang === 'en';
    const [principal, setPrincipal] = useState('');
    const [rate, setRate] = useState('');
    const [term, setTerm] = useState('');
    const [type, setType] = useState('equal-payment');
    const [result, setResult] = useState(null);

    const calculateLoan = () => {
        if (!principal || !rate || !term) return;

        const p = parseFloat(principal);
        const r = parseFloat(rate) / 100 / 12;
        const n = parseFloat(term) * 12;

        let monthlyPayment = 0;
        let totalInterest = 0;
        let totalPayment = 0;

        if (type === 'equal-payment') {
            monthlyPayment = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
            totalPayment = monthlyPayment * n;
            totalInterest = totalPayment - p;
        } else {
            const monthlyPrincipal = p / n;
            let currentBalance = p;
            let interestSum = 0;
            for (let i = 0; i < n; i++) {
                const interest = currentBalance * r;
                interestSum += interest;
                currentBalance -= monthlyPrincipal;
            }
            totalInterest = interestSum;
            totalPayment = p + totalInterest;
            monthlyPayment = totalPayment / n;
        }

        setResult({
            monthlyPayment: Math.round(monthlyPayment),
            totalInterest: Math.round(totalInterest),
            totalPayment: Math.round(totalPayment)
        });
    };

    useEffect(() => {
        calculateLoan();
    }, [principal, rate, term, type]);

    const formatMoney = (num) => {
        return new Intl.NumberFormat(isEn ? 'en-US' : 'ko-KR').format(num);
    };

    const faqs = isEn ? [
        { q: 'What is the difference between Amortized and Equal Principal repayment?', a: 'Amortized (Equal Payment) means you pay the same amount every month, making budgeting easier. Equal Principal means you pay the same amount of principal every month, so interest decreases over time, resulting in lower total interest but higher initial payments.' },
        { q: 'How is the monthly payment calculated?', a: 'It is based on the loan amount, interest rate, and term using standard financial formulas for either equal total payments or equal principal installments.' },
        { q: 'Is this calculator result official?', a: 'No, this is an estimate for planning purposes. Actual bank calculations may vary slightly based on specific rounding rules and compounding frequencies.' }
    ] : [
        { q: '원리금균등상환과 원금균등상환의 차이는 무엇인가요?', a: '원리금균등상환은 매달 동일한 금액(원금+이자)을 납부하는 방식으로, 예산 계획이 쉽습니다. 원금균등상환은 매달 동일한 원금을 납부하고 이자는 줄어드는 방식으로, 총 이자 부담이 적지만 초기 납입금이 더 높습니다. 대부분의 주택담보대출은 원리금균등상환 방식을 사용합니다.' },
        { q: '대출 이자율은 어디서 확인할 수 있나요?', a: '은행별 대출금리는 각 은행 홈페이지, 금융감독원 금융상품통합비교공시(fine.fss.or.kr), 또는 각 은행 앱에서 확인할 수 있습니다. 신용등급, 담보 여부, 대출 종류에 따라 금리가 크게 다를 수 있습니다.' },
        { q: '이 계산기 결과가 실제 은행과 다를 수 있나요?', a: '네, 이 계산기는 단순화된 표준 공식을 사용하므로 실제 은행의 납입금과 소폭 차이가 있을 수 있습니다. 실제 대출 시에는 반드시 은행에서 정확한 상환 스케줄을 확인하세요.' },
    ];

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <SEO
                title={t('tools.loan.title')}
                description={t('tools.loan.description')}
                keywords={isEn ? "loan calculator, interest calculator, monthly payment, mortgage, credit loan" : "대출계산기, 이자계산기, 대출이자계산, 원리금균등계산, 원금균등계산"}
                faqs={faqs}
            />

            <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold text-text-primary flex items-center justify-center gap-3">
                    <Calculator className="w-8 h-8 text-primary" />
                    {isEn ? 'Loan Calculator' : '대출 이자 계산기'}
                </h1>
                <p className="text-text-secondary">
                    {isEn ? 'Enter loan amount, interest rate, and term to see your monthly payments.' : '대출금액 · 이율 · 기간을 입력하면 월 납입금과 총 이자를 즉시 계산합니다.'}
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                <div className="card p-6 space-y-6 h-fit bg-card border border-border rounded-xl">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-text-secondary">{isEn ? 'Loan Amount' : '대출 금액 (원)'}</label>
                        <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="number"
                                value={principal}
                                onChange={(e) => setPrincipal(e.target.value)}
                                placeholder={isEn ? "e.g. 100000" : "예: 100000000 (1억)"}
                                className="w-full pl-10 pr-3 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary outline-none"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-text-secondary">{isEn ? 'Annual Interest Rate (%)' : '연 이자율 (%)'}</label>
                        <div className="relative">
                            <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="number"
                                value={rate}
                                onChange={(e) => setRate(e.target.value)}
                                placeholder="예: 3.5"
                                className="w-full pl-10 pr-3 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary outline-none"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-text-secondary">{isEn ? 'Loan Term (Years)' : '대출 기간 (년)'}</label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="number"
                                value={term}
                                onChange={(e) => setTerm(e.target.value)}
                                placeholder="예: 30"
                                className="w-full pl-10 pr-3 py-2 border border-border rounded-lg bg-background focus:ring-2 focus:ring-primary outline-none"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-text-secondary">{isEn ? 'Repayment Type' : '상환 방식'}</label>
                        <div className="grid grid-cols-2 gap-2 p-1 bg-muted rounded-lg border border-border">
                            <button
                                onClick={() => setType('equal-payment')}
                                className={`py-2 px-4 rounded-md text-sm font-medium transition-all ${type === 'equal-payment'
                                    ? 'bg-primary text-primary-foreground shadow-sm'
                                    : 'text-text-secondary hover:text-text-primary'
                                    }`}
                            >
                                {isEn ? 'Amortized' : '원리금균등'}
                            </button>
                            <button
                                onClick={() => setType('equal-principal')}
                                className={`py-2 px-4 rounded-md text-sm font-medium transition-all ${type === 'equal-principal'
                                    ? 'bg-primary text-primary-foreground shadow-sm'
                                    : 'text-text-secondary hover:text-text-primary'
                                    }`}
                            >
                                {isEn ? 'Equal Principal' : '원금균등'}
                            </button>
                        </div>
                        <p className="text-xs text-text-tertiary mt-1">
                            {type === 'equal-payment'
                                ? (isEn ? 'Pay the same total amount every month. Most common.' : '매월 동일한 금액(원금+이자)을 상환합니다. 가장 일반적인 방식.')
                                : (isEn ? 'Pay fixed principal; interest decreases over time. Lower total interest.' : '매월 동일한 원금을 상환하며, 이자는 줄어듭니다. 총 이자 부담이 적습니다.')}
                        </p>
                    </div>
                </div>

                <div className="card p-8 bg-card border border-primary/20 rounded-xl flex flex-col justify-center space-y-8 shadow-sm">
                    <div className="text-center space-y-2">
                        <p className="text-text-secondary">{isEn ? 'Estimated Monthly Payment' : '월 예상 납입금'}</p>
                        <div className="text-4xl font-bold text-primary">
                            {result ? formatMoney(result.monthlyPayment) : '0'}
                            <span className="text-xl text-text-tertiary ml-1 font-normal">{isEn ? '' : '원'}</span>
                        </div>
                    </div>

                    <div className="space-y-4 pt-8 border-t border-border">
                        <div className="flex justify-between items-center text-foreground">
                            <span className="text-text-secondary">{isEn ? 'Total Principal' : '총 대출 원금'}</span>
                            <span className="font-semibold">{principal ? formatMoney(principal) : '0'} {isEn ? '' : '원'}</span>
                        </div>
                        <div className="flex justify-between items-center text-primary">
                            <span>{isEn ? 'Total Interest' : '총 이자액'}</span>
                            <span className="font-semibold">+ {result ? formatMoney(result.totalInterest) : '0'} {isEn ? '' : '원'}</span>
                        </div>
                        <div className="flex justify-between items-center pt-4 border-t border-border text-lg font-bold text-foreground">
                            <span>{isEn ? 'Total Repayment' : '총 상환 금액'}</span>
                            <span>{result ? formatMoney(result.totalPayment) : '0'} {isEn ? '' : '원'}</span>
                        </div>
                    </div>
                </div>
            </div>

            <ToolGuide
                title={isEn ? "Loan Calculator Guide" : "대출 이자 계산기 사용 가이드"}
                intro={isEn ? "Calculate your loan payments and plan your finances effectively." : "대출금액, 연 이자율, 대출 기간을 입력하면 월 납입금과 총 이자를 계산해 드립니다."}
                steps={isEn ? [
                    "Input the 'Loan Amount' you plan to borrow.",
                    "Enter the 'Annual Interest Rate' offered by your bank.",
                    "Specify the 'Loan Term' in years.",
                    "Select your preferred 'Repayment Type'.",
                    "View your estimated monthly payment and total costs instantly."
                ] : [
                    '"대출 금액" 에 빌릴 금액을 원화로 입력합니다. (예: 1억 = 100000000)',
                    '"연 이자율(%)" 에 은행에서 안내받은 연 금리를 입력합니다. (예: 3.5)',
                    '"대출 기간(년)" 에 상환 기간을 입력합니다. (예: 30)',
                    '"상환 방식" 을 원리금균등(매달 같은 금액) 또는 원금균등(원금 고정, 이자 감소) 중 선택합니다.',
                    '우측 결과 카드에서 월 납입금, 총 이자, 총 상환금이 즉시 표시됩니다.',
                ]}
                tips={isEn ? [
                    "Even a 0.5% difference in interest rate can save thousands over time.",
                    "Shorter terms result in higher monthly payments but lower total interest.",
                    "Equal Principal repayment reduces total interest faster than Amortized payments.",
                    "Check with your actual lender for an official repayment schedule."
                ] : [
                    '이자율이 0.5%만 달라져도 장기 대출에서는 수백만~수천만 원 차이가 납니다.',
                    '대출 기간이 짧을수록 월 납입금은 늘지만 총 이자는 크게 줄어듭니다.',
                    '원금균등은 초기 납입 부담이 크지만 총 이자가 원리금균등보다 적습니다.',
                ]}
                faqs={faqs}
            />
        </div>
    );
};

export default LoanCalculator;
