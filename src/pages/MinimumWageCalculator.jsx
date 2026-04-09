import React, { useState } from 'react';
import { CheckCircle, XCircle, DollarSign, Clock, Info } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import ShareButtons from '../components/ShareButtons';
import { useLanguage } from '../context/LanguageContext';

const MinimumWageCalculator = () => {
    const { lang } = useLanguage();
    const isEn = lang === 'en';
    const [year, setYear] = useState('2025');
    const [hourlyRate, setHourlyRate] = useState('');
    const [workHours, setWorkHours] = useState(209);
    const [result, setResult] = useState(null);

    const MIN_WAGE = {
        '2024': 9860,
        '2025': 10030
    };

    const calculate = () => {
        if (!hourlyRate) return;
        const minWage = MIN_WAGE[year];
        const myRate = parseFloat(hourlyRate.replace(/,/g, ''));
        const isPass = myRate >= minWage;
        const diff = Math.abs(myRate - minWage);
        const monthlyMinWage = minWage * workHours;
        const myMonthlyWage = myRate * workHours;
        setResult({ isPass, diff, minWage, monthlyMinWage, myMonthlyWage });
    };

    const faqs = isEn ? [
        { q: "What is the 2025 minimum wage in Korea?", a: "The 2025 minimum wage is 10,030 KRW per hour, a 1.7% increase from 2024 (9,860 KRW). The monthly equivalent for 209 hours is 2,096,270 KRW." },
        { q: "Why is it based on 209 hours?", a: "It includes 174 regular working hours (40h/week) plus 35 paid weekly holiday hours. This is the standard calculation for full-time employees in Korea." },
        { q: "What if my employer pays less?", a: "Paying less than minimum wage is illegal. You can report violations to the Ministry of Employment and Labor (MoEL) at 1350." }
    ] : [
        { q: '2025년 최저시급은 얼마인가요?', a: '시간급 10,030원입니다. 2024년(9,860원) 대비 170원 인상되었습니다.' },
        { q: '왜 209시간인가요?', a: '주 40시간 근무 기준 월 소정근로 174시간 + 주휴 35시간 = 209시간이 기본입니다.' },
        { q: '알바 시급도 적용되나요?', a: '네, 모든 근로자(아르바이트 포함)에게 최저임금이 적용됩니다.' }
    ];

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <SEO
                title={t('tools.minimum-wage.title')}
                description={t('tools.minimum-wage.description')}
                keywords={isEn ? "minimum wage korea 2025, hourly wage calculator, weekly holiday pay korea, 10030 krw, labor law korea" : "최저임금계산기, 최저시급2025, 2025최저임금, 시급계산기, 주휴수당계산"}
                faqs={faqs}
            />

            <header className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-2">
                    <DollarSign className="w-8 h-8 text-primary" />
                </div>
                <h1 className="text-3xl font-bold">{isEn ? 'Minimum Wage Calculator' : '최저임금 계산기'}</h1>
                <p className="text-muted-foreground">
                    {isEn ? 'Check 2025 Minimum Wage (10,030 KRW) Compliance.' : '2025년 최저시급 10,030원 — 내 시급이 기준에 맞는지 확인하세요.'}
                </p>
            </header>

            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-6">
                <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">{isEn ? 'Policy Year' : '기준 연도'}</label>
                            <select
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                                className="w-full bg-background border border-border rounded-lg p-3 font-bold focus:ring-2 focus:ring-primary focus:outline-none transition-all"
                            >
                                <option value="2025">2025 (10,030 KRW)</option>
                                <option value="2024">2024 (9,860 KRW)</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium flex items-center gap-2">
                                <Clock className="w-4 h-4 text-primary" /> {isEn ? 'Monthly Work Hours' : '월 근로시간 (주휴 포함)'}
                            </label>
                            <input
                                type="number"
                                value={workHours}
                                onChange={(e) => setWorkHours(e.target.value)}
                                className="w-full bg-background border border-border rounded-lg p-3 font-bold focus:ring-2 focus:ring-primary focus:outline-none transition-all"
                                placeholder={isEn ? "Default 209h" : "기본 209시간"}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">{isEn ? 'My Hourly Rate' : '나의 시급'}</label>
                        <div className="relative">
                            <input
                                type="text"
                                inputMode="numeric"
                                value={hourlyRate}
                                onChange={(e) => {
                                    const val = e.target.value.replace(/[^0-9]/g, '');
                                    setHourlyRate(val ? parseInt(val).toLocaleString() : '');
                                }}
                                placeholder={isEn ? "e.g. 11,000" : "예: 11,000"}
                                className="w-full bg-background border border-border rounded-lg p-3 font-bold text-lg pr-12 focus:ring-2 focus:ring-primary focus:outline-none transition-all"
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-bold">{isEn ? 'KRW' : '원'}</span>
                        </div>
                    </div>

                    <button
                        onClick={calculate}
                        className="w-full bg-primary text-primary-foreground font-black py-4 rounded-xl hover:brightness-110 shadow-lg shadow-primary/20 transition-all text-lg"
                    >
                        {isEn ? 'Check Compliance' : '확인하기'}
                    </button>
                </div>

                {result && (
                    <div className={`mt-8 p-8 rounded-2xl border text-center space-y-6 animate-in zoom-in-95 duration-500 ${result.isPass ? 'bg-green-500/10 border-green-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
                        <div className="flex items-center justify-center gap-3">
                            {result.isPass ? (
                                <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
                            ) : (
                                <XCircle className="w-10 h-10 text-red-600 dark:text-red-400" />
                            )}
                            <h3 className={`text-2xl font-black ${result.isPass ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                {result.isPass ? (isEn ? 'Compliance Met ✅' : '최저임금 준수 ✅') : (isEn ? 'Compliance Failed ⚠️' : '최저임금 미달 ⚠️')}
                            </h3>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-card rounded-xl border border-border shadow-sm">
                                <span className="text-[10px] text-muted-foreground block mb-1 uppercase font-bold tracking-wider">{isEn ? 'Min. Wage' : `${year}년 최저시급`}</span>
                                <span className="font-black text-xl">{result.minWage.toLocaleString()}</span>
                            </div>
                            <div className="p-4 bg-card rounded-xl border border-border shadow-sm">
                                <span className="text-[10px] text-muted-foreground block mb-1 uppercase font-bold tracking-wider">{isEn ? 'Your Wage' : '나의 시급'}</span>
                                <span className={`font-black text-xl ${result.isPass ? 'text-green-600' : 'text-red-600'}`}>
                                    {result.myMonthlyWage / workHours ? (result.myMonthlyWage / workHours).toLocaleString() : hourlyRate}
                                </span>
                            </div>
                        </div>

                        <div className="text-sm font-medium">
                            {result.isPass ? (
                                <p className="text-green-700 dark:text-green-400 bg-green-500/5 py-2 rounded-lg">
                                    {isEn ? `You are receiving ` : `기준보다 `}
                                    <span className="font-black underline">+{result.diff.toLocaleString()} KRW</span>
                                    {isEn ? ` more than the minimum rate! 👏` : ` 더 받고 계시네요! 👏`}
                                </p>
                            ) : (
                                <p className="text-red-700 dark:text-red-400 bg-red-500/5 py-2 rounded-lg">
                                    {isEn ? `You are receiving ` : `기준보다 `}
                                    <span className="font-black underline">{result.diff.toLocaleString()} KRW</span>
                                    {isEn ? ` less than the minimum. You can report this to MoEL (☎1350).` : ` 부족합니다. 고용노동부(☎1350)에 신고할 수 있습니다.`}
                                </p>
                            )}
                        </div>

                        <div className="pt-6 border-t border-border/50">
                            <h4 className="text-xs font-bold text-muted-foreground uppercase mb-3">{isEn ? `Monthly Conversion (${workHours}h)` : `월급 환산 (월 ${workHours}시간 기준)`}</h4>
                            <div className="flex justify-between items-center bg-card p-4 rounded-xl border border-border">
                                <span className="font-bold text-muted-foreground">{isEn ? 'Estimated Monthly' : '예상 월급'}</span>
                                <span className="font-black text-2xl text-primary">{Math.floor(result.myMonthlyWage).toLocaleString()} <span className="text-sm">{isEn ? 'KRW' : '원'}</span></span>
                            </div>
                            <p className="text-[10px] text-muted-foreground mt-3 text-left leading-relaxed">
                                {isEn 
                                    ? `* The 209-hour standard includes weekly paid holiday pay (Ju-hyu Sudeang).` 
                                    : `* 209시간 기준은 주휴수당이 포함된 법정 소정근로시간입니다.`}
                            </p>
                        </div>
                    </div>
                )}
            </div>

            <ShareButtons />

            <ToolGuide
                title={isEn ? "Minimum Wage Guide" : "최저임금 계산기 사용 가이드"}
                intro={isEn ? "Verify your hourly rate compliance and see your monthly converted income instantly." : "내 시급이 최저임금 기준을 충족하는지 바로 확인해보세요."}
                steps={isEn ? [
                    "Select the 'Policy Year' (2025: 10,030 KRW).",
                    "Enter your 'Monthly Work Hours' (Includes weekly holiday).",
                    "Input your current 'Hourly Rate'.",
                    "Click check to see if you meet the legal standards."
                ] : [
                    "기준 연도를 선택하세요. (2025년: 10,030원)",
                    "월 근로시간을 입력합니다. (주휴 포함 209시간 권장)",
                    "나의 시급을 입력합니다.",
                    "결과 창에서 준수 여부와 월급 환산을 확인합니다."
                ]}
                tips={isEn ? [
                    "Full-time (40h/week) minimum monthly pay: 2,096,270 KRW (2025).",
                    "Weekly holiday pay occurs if you work 15+ hours per week.",
                    "Probation periods (up to 3 months) may allow 90% of minimum wage."
                ] : [
                    "2025년 월 환산액: 10,030원 × 209시간 = 2,096,270원",
                    "주 15시간 이상 근무 시 주휴수당이 별도로 발생합니다.",
                    "식대는 최저임금 산입 범위에서 제외되니 순수 시급을 확인하세요."
                ]}
                faqs={faqs}
            />
        </div>
    );
};

export default MinimumWageCalculator;
