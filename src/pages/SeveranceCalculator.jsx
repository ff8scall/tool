import React, { useState } from 'react';
import { Calculator, Calendar, Info } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import ShareButtons from '../components/ShareButtons';
import { useLanguage } from '../context/LanguageContext';

const SeveranceCalculator = () => {
    const { lang } = useLanguage();
    const isEn = lang === 'en';
    const [avgSalary, setAvgSalary] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const calculateSeverance = () => {
        setError('');
        if (!avgSalary || !startDate || !endDate) return;

        const start = new Date(startDate);
        const end = new Date(endDate);

        const diffTime = Math.abs(end - start);
        const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

        if (totalDays < 365) {
            setError(isEn 
                ? 'Statutory severance pay is only provided for continuous service of 1 year or more.' 
                : '재직 기간이 1년 미만인 경우 법정 퇴직금이 발생하지 않습니다. (1년 이상 근속 시 지급)');
            setResult(null);
            return;
        }

        const dailyWage = parseFloat(avgSalary.replace(/,/g, '')) / 30;
        const severancePay = dailyWage * 30 * (totalDays / 365);

        setResult({ totalDays, severancePay });
    };

    const faqs = isEn ? [
        { q: "Who is eligible for severance pay in Korea?", a: "Employees who have worked continuously for at least 1 year and average 15+ hours per week are eligible, including part-time and contract workers." },
        { q: "What is the calculation formula?", a: "Severance = (Avg. Daily Wage x 30 days) x (Total Service Days / 365). Avg. Daily Wage is usually total wages of the last 3 months divided by total days in that period." },
        { q: "When will I receive it?", a: "It must be paid within 14 days of resignation. Generally, it's transferred to an IRP (Individual Retirement Pension) account." }
    ] : [
        { q: '퇴직금을 받으려면 얼마나 근무해야 하나요?', a: '계속 근로 기간이 1년 이상이고, 4주 평균 주 15시간 이상 근무한 경우 퇴직금을 받을 수 있습니다.' },
        { q: '퇴직금 계산 공식은 무엇인가요?', a: '퇴직금 = 1일 평균임금 × 30일 × (재직일수 ÷ 365일)' },
        { q: '퇴직금은 언제 받나요?', a: '퇴직 후 14일 이내에 지급해야 합니다.' }
    ];

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <SEO
                title={isEn ? "Severance Pay Calculator (Korea) - Estimate Your Retirement Pay" : "퇴직금 계산기 | 입사일 퇴사일 입력으로 예상 퇴직금 조회"}
                description={isEn ? "Calculate your expected statutory severance pay in South Korea based on service period and average salary. 2025 Updated." : "입사일, 퇴사일, 평균 월급을 입력하면 법정 퇴직금을 즉시 계산합니다."}
                keywords={isEn ? "severance pay calculator korea, toejikgeum calculator, retirement pay korea, labor law korea" : "퇴직금계산기, 예상퇴직금계산, 퇴직금공식, 퇴직금조회, 재직기간계산"}
                faqs={faqs}
            />

            <header className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-2">
                    <Calculator className="w-8 h-8 text-primary" />
                </div>
                <h1 className="text-3xl font-bold">{isEn ? 'Severance Pay Calculator' : '퇴직금 계산기'}</h1>
                <p className="text-muted-foreground">
                    {isEn ? 'Estimate your statutory severance pay based on joining/leaving dates and salary.' : '입사일, 퇴사일, 월 평균 급여를 입력하면 예상 퇴직금을 즉시 계산합니다.'}
                </p>
            </header>

            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-6">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">{isEn ? 'Avg. Monthly Salary (Gross, Last 3 months)' : '최근 3개월 월 평균 급여 (세전)'}</label>
                        <div className="relative">
                            <input
                                type="text"
                                inputMode="numeric"
                                value={avgSalary}
                                onChange={(e) => {
                                    const val = e.target.value.replace(/[^0-9]/g, '');
                                    setAvgSalary(val ? parseInt(val).toLocaleString() : '');
                                }}
                                placeholder={isEn ? "e.g. 3,000,000" : "예: 3,000,000"}
                                className="w-full bg-background border border-border rounded-lg p-3 font-bold text-lg pr-12 focus:ring-2 focus:ring-primary focus:outline-none transition-all"
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-bold">{isEn ? 'KRW' : '원'}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            {isEn ? '* Include base salary and variable bonuses before tax.' : '* 기본급 + 각종 수당을 포함한 세전 금액을 입력하세요.'}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-primary" /> {isEn ? 'Start Date' : '입사일'}
                            </label>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="w-full bg-background border border-border rounded-lg p-3 focus:ring-2 focus:ring-primary focus:outline-none transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-primary" /> {isEn ? 'End Date (Last working day)' : '퇴사일 (마지막 근무일)'}
                            </label>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="w-full bg-background border border-border rounded-lg p-3 focus:ring-2 focus:ring-primary focus:outline-none transition-all"
                            />
                        </div>
                    </div>

                    <button
                        onClick={calculateSeverance}
                        className="w-full bg-primary text-primary-foreground font-black py-4 rounded-xl hover:brightness-110 shadow-lg shadow-primary/20 transition-all text-lg"
                    >
                        {isEn ? 'Calculate Now' : '퇴직금 계산하기'}
                    </button>
                </div>

                {error && (
                    <div className="p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-xl text-orange-700 dark:text-orange-400 text-sm font-medium flex items-center gap-2">
                        <Info className="w-4 h-4 shrink-0" /> {error}
                    </div>
                )}

                {result && (
                    <div className="mt-8 p-8 bg-primary/5 rounded-2xl border border-primary/10 text-center space-y-6 animate-in zoom-in-95 duration-500">
                        <div>
                            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">{isEn ? 'Total Employment Period' : '총 재직 기간'}</h3>
                            <p className="text-2xl font-black text-foreground">
                                {isEn 
                                    ? `${Math.floor(result.totalDays / 365)} Years ${result.totalDays % 365} Days` 
                                    : `${Math.floor(result.totalDays / 365)}년 ${result.totalDays % 365}일`}
                                <span className="text-sm text-muted-foreground ml-2">({isEn ? 'Total' : '총'} {result.totalDays} {isEn ? 'Days' : '일'})</span>
                            </p>
                        </div>
                        <div className="w-full h-px bg-border max-w-[100px] mx-auto"></div>
                        <div>
                            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">{isEn ? 'Estimated Severance Pay' : '예상 퇴직금'}</h3>
                            <p className="text-5xl font-black text-primary">
                                {Math.floor(result.severancePay).toLocaleString()}
                                <span className="text-xl ml-1 font-black">{isEn ? ' KRW' : '원'}</span>
                            </p>
                        </div>
                        <p className="text-[10px] text-muted-foreground max-w-sm mx-auto">
                            {isEn 
                                ? '* This is an estimate. Actual amount depends on specific average wage calculations by your employer.' 
                                : '* 실제 퇴직금은 평균임금 산정 방식에 따라 차이가 있을 수 있습니다.'}
                        </p>
                    </div>
                )}
            </div>

            <div className="bg-muted/30 rounded-2xl p-6 text-sm text-muted-foreground space-y-3 border border-border shadow-inner">
                <h3 className="font-bold text-foreground flex items-center gap-2">
                    <Info className="w-4 h-4 text-primary" /> {isEn ? 'Korean Severance Criteria' : '퇴직금 지급 기준 (근로기준법 제34조)'}
                </h3>
                <ul className="list-disc list-inside space-y-1.5 ml-1 font-medium">
                    <li>{isEn ? 'Service period must be continuous for 1 year or more.' : '계속근로기간이 1년 이상이어야 합니다.'}</li>
                    <li>{isEn ? 'Average weekly hours must be 15 or more.' : '4주간 평균 주간 소정근로시간이 15시간 이상이어야 합니다.'}</li>
                    <li>{isEn ? 'Calculated as: (Avg. daily wage x 30) x (Service days / 365).' : '퇴직금 = 1일 평균임금 × 30일 × (재직일수 ÷ 365일)'}</li>
                    <li>{isEn ? 'Must be paid within 14 days of resignation.' : '퇴직 후 14일 이내 지급이 원칙입니다.'}</li>
                </ul>
            </div>

            <ShareButtons />

            <ToolGuide
                title={isEn ? "Severance Pay Calculation Guide" : "퇴직금 계산기 사용 가이드"}
                intro={isEn ? "Plan your financial future. This tool helps you estimate your severance package before you resign." : "퇴직 전 퇴직금 규모를 파악하고 재정 계획을 세워보세요."}
                steps={isEn ? [
                    "Input your average gross salary for the last 3 months.",
                    "Select your exact start and end dates.",
                    "Press calculate to see the total service period and amount.",
                    "Consult the legal criteria section below for detailed rules."
                ] : [
                    "세전 월급(3개월 평균)을 입력합니다.",
                    "입사일과 퇴사일을 정확히 선택합니다.",
                    "계산하기 버튼을 클릭합니다.",
                    "결과 카드에서 재직 기간과 금액을 확인합니다."
                ]}
                tips={isEn ? [
                    "Bonus and unused leave pay should be included for accuracy.",
                    "If you worked less than a year, no legal severance is due.",
                    "Receiving it via an IRP account may defer taxes."
                ] : [
                    "상여금이 있다면 평균임금에 포함해야 정확합니다.",
                    "1년 미만 근무 시 법정 퇴직금이 없습니다.",
                    "IRP 계좌로 수령 시 과세이연 혜택이 있습니다."
                ]}
                faqs={faqs}
            />
        </div>
    );
};

export default SeveranceCalculator;
