import React, { useState, useEffect } from 'react';
import { DollarSign, Info, PieChart as PieChartIcon, TrendingUp, Wallet, ShieldCheck, HeartPulse } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import ShareButtons from '../components/ShareButtons';
import { useLanguage } from '../context/LanguageContext';

const SalaryCalculator = () => {
    const { lang } = useLanguage();
    const isEn = lang === 'en';
    const [year, setYear] = useState('2025');
    const [annualSalary, setAnnualSalary] = useState('');
    const [nonTaxable, setNonTaxable] = useState('200,000');
    const [dependents, setDependents] = useState(1);
    const [result, setResult] = useState(null);

    useEffect(() => {
        calculateTakeHome();
    }, [annualSalary, nonTaxable, dependents, year]);

    const handleNumberInput = (setter) => (e) => {
        const value = e.target.value;
        const numStr = value.replace(/[^0-9]/g, '');
        if (!numStr) {
            setter('');
            return;
        }
        const formatted = parseInt(numStr).toLocaleString();
        setter(formatted);
    };

    const calculateTakeHome = () => {
        const cleanNumber = (val) => {
            if (!val) return 0;
            const str = String(val).replace(/[^0-9]/g, '');
            const num = parseFloat(str);
            return isNaN(num) ? 0 : num;
        };

        const salary = cleanNumber(annualSalary);

        if (!salary) {
            setResult(null);
            return;
        }

        const monthlySalary = salary / 12;
        const monthlyNonTaxable = cleanNumber(nonTaxable);
        const monthlyTaxable = Math.max(0, monthlySalary - monthlyNonTaxable);

        let pensionRate = 0.045;
        let healthRate = 0.03545;
        let longTermRate = 0.1295;
        let empRate = 0.009;
        let pensionLimit = 265500;

        const nationalPension = Math.min(monthlyTaxable * pensionRate, pensionLimit);
        const healthInsurance = monthlyTaxable * healthRate;
        const longTermCare = healthInsurance * longTermRate;
        const employmentInsurance = monthlyTaxable * empRate;

        const totalInsurance = nationalPension + healthInsurance + longTermCare + employmentInsurance;

        let incomeTax = 0;
        const depCount = dependents || 1;
        const standardIncome = monthlyTaxable - totalInsurance - ((depCount - 1) * 150000);

        if (standardIncome > 1060000) {
            if (standardIncome <= 2060000) incomeTax = (standardIncome - 1060000) * 0.06;
            else if (standardIncome <= 4060000) incomeTax = 60000 + (standardIncome - 2060000) * 0.15;
            else if (standardIncome <= 8060000) incomeTax = 360000 + (standardIncome - 4060000) * 0.24;
            else incomeTax = 1320000 + (standardIncome - 8060000) * 0.35;
        }
        incomeTax = Math.max(0, incomeTax);

        const localIncomeTax = incomeTax * 0.1;
        const totalDeduction = totalInsurance + incomeTax + localIncomeTax;
        const takeHome = monthlySalary - totalDeduction;

        setResult({
            monthlySalary,
            monthlyNonTaxable,
            nationalPension,
            healthInsurance,
            longTermCare,
            employmentInsurance,
            totalInsurance,
            incomeTax,
            localIncomeTax,
            totalDeduction,
            takeHome,
            annualTakeHome: takeHome * 12
        });
    };

    const DonutChart = ({ data }) => {
        const total = data.reduce((acc, item) => acc + (item.value || 0), 0);

        if (!total || isNaN(total) || total <= 0) {
            return (
                <div className="relative w-48 h-48 mx-auto">
                    <div className="w-full h-full rounded-full bg-muted/20"></div>
                    <div className="absolute inset-0 m-auto w-32 h-32 bg-card rounded-full flex items-center justify-center flex-col">
                        <span className="text-xs text-muted-foreground">{isEn ? 'No Data' : '데이터 없음'}</span>
                    </div>
                </div>
            );
        }

        let currentAngle = 0;
        const gradientParts = data.map(item => {
            const val = item.value || 0;
            const percentage = (val / total) * 100;
            const start = currentAngle;
            currentAngle += percentage;
            return `${item.color} ${start}% ${currentAngle}%`;
        });

        const gradient = `conic-gradient(${gradientParts.join(', ')})`;
        const percentage = Math.round(((data[0].value || 0) / total) * 100);

        return (
            <div className="relative w-48 h-48 mx-auto">
                <div
                    className="w-full h-full rounded-full shadow-inner"
                    style={{ background: gradient }}
                ></div>
                <div className="absolute inset-0 m-auto w-32 h-32 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center flex-col shadow-lg border border-gray-50 dark:border-gray-700">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{isEn ? 'Net Ratio' : '실수령 비율'}</span>
                    <span className="font-black text-2xl text-gray-800 dark:text-white">
                        {percentage}%
                    </span>
                </div>
            </div>
        );
    };

    const formatKoreanNumber = (numStr) => {
        if (!numStr) return '';
        const n = parseInt(String(numStr).replace(/[^0-9]/g, ''));
        if (isNaN(n) || n === 0) return '';
        if (n < 10000) return `${n.toLocaleString()}${isEn ? ' KRW' : '원'}`;

        if (isEn) return `${n.toLocaleString()} KRW`;

        const unit = 10000;
        const man = Math.floor(n / unit);
        const remainder = n % unit;

        return `${man.toLocaleString()}만원${remainder > 0 ? ` ${remainder.toLocaleString()}원` : ''}`;
    };

    const toolFaqs = isEn ? [
        { q: "What is the 2025 minimum wage and salary changes?", a: "The 2025 minimum hourly wage is 10,030 KRW. Social insurance rates have been frozen, so the net pay for the same gross salary remains similar to 2024." },
        { q: "What is included in non-taxable amount?", a: "The most common item is meal allowance (up to 200,000 KRW/month). Others include vehicle subsidies, childcare allowances, etc. Higher non-taxable amounts reduce your taxes and insurance premiums." },
        { q: "How are dependents defined?", a: "Includes yourself, and spouses, parents, or children with annual income below 1 million KRW. Each dependent grants a deduction that increases your take-home pay." }
    ] : [
        { "q": "2025년 최저임금과 연봉 실수령액에 변화가 있나요?", "a": "2025년 최저시급은 10,030원으로 결정되었으며, 4대보험 요율은 국민들의 부담을 고려하여 2024년과 동일하게 전면 동결되었습니다." },
        { "q": "비과세액에는 어떤 것들이 포함되나요?", "a": "식대(월 최대 20만원), 자가운전보조금(월 20만원), 자녀보육수당(월 20만원) 등이 포함될 수 있습니다." },
        { "q": "부양가족 기준은 어떻게 되나요?", "a": "본인 및 연간 소득금액이 100만원 이하인 배우자, 부모, 자녀 등이 포함될 수 있습니다." }
    ];

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 space-y-12">
            <SEO
                title={isEn ? "2025 Salary Net Pay Calculator (Korea) - Tax & Insurance" : "2025년 연봉 실수령액 계산기 | 월급 세금 및 4대보험 자동 계산"}
                description={isEn ? "Calculate your actual take-home pay in Korea for 2025. Includes 4 major insurances, income tax, meal allowance, and dependent deductions." : "2025년 동결된 최신 4대보험 요율과 소득세를 반영한 연봉 실수령액 계산기입니다."}
                keywords={isEn ? "salary calculator korea, net pay calculator, korea income tax, 4 major insurances korea, paycheck analysis" : "연봉실수령액계산기, 2025연봉계산기, 월급계산기, 4대보험계산, 소득세계산, 비과세식대"}
                category="finance"
                faqs={toolFaqs}
            />

            <header className="text-center space-y-6 mb-12">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-600 rounded-3xl shadow-xl shadow-emerald-200 dark:shadow-none mb-4 rotate-3">
                    <DollarSign size={40} className="text-white" />
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
                    {isEn ? 'Salary Net Pay Calculator' : '연봉 실수령액 계산기'}
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-medium">
                    {isEn ? '2025 Updated! Calculate your real monthly take-home pay after taxes and insurance in Korea.' : '2025년 최신 요율 반영! 세금과 보험료를 뺀 진짜 내 월급을 스마트하게 분석합니다.'}
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Input Section */}
                <div className="lg:col-span-5 space-y-6">
                    <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl border border-gray-100 dark:border-gray-700">
                        <h2 className="font-black text-xl text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                            <Wallet className="text-emerald-600" />
                            {isEn ? 'Salary Details' : '급여 정보 입력'}
                        </h2>

                        <div className="space-y-8">
                            <div className="group">
                                <label className="block text-sm font-black text-gray-400 uppercase tracking-widest mb-3">{isEn ? 'Tax Year' : '기준 연도'}</label>
                                <select
                                    value={year}
                                    onChange={(e) => setYear(e.target.value)}
                                    className="w-full bg-gray-50 dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-700 rounded-2xl p-4 font-bold text-gray-700 dark:text-white focus:border-emerald-500 outline-none transition-all"
                                >
                                    <option value="2026">{isEn ? '2026 (Est.)' : '2026년 (예상)'}</option>
                                    <option value="2025">{isEn ? '2025 (Latest)' : '2025년 (최신 소득세 반영)'}</option>
                                    <option value="2024">2024</option>
                                </select>
                            </div>

                            <div className="group">
                                <label className="block text-sm font-black text-gray-400 uppercase tracking-widest mb-3">{isEn ? 'Annual Salary (Gross)' : '연봉 (세전)'}</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        inputMode="numeric"
                                        value={annualSalary}
                                        onChange={handleNumberInput(setAnnualSalary)}
                                        placeholder={isEn ? "e.g. 45,000,000" : "예: 45,000,000"}
                                        className="w-full bg-gray-50 dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-700 rounded-2xl p-4 font-black text-2xl text-emerald-700 dark:text-emerald-400 focus:border-emerald-500 outline-none transition-all pr-12"
                                    />
                                    <span className="absolute right-5 top-1/2 -translate-y-1/2 font-black text-gray-400">{isEn ? 'KRW' : '원'}</span>
                                </div>
                                {annualSalary && (
                                    <p className="mt-2 pl-2 text-sm font-bold text-emerald-600 flex items-center gap-2">
                                        <TrendingUp size={14} />
                                        {formatKoreanNumber(annualSalary)}
                                    </p>
                                )}
                            </div>

                            <div className="group">
                                <div className="flex items-center justify-between mb-3">
                                    <label className="text-sm font-black text-gray-400 uppercase tracking-widest leading-none">{isEn ? 'Monthly Non-taxable' : '월 비과세액'}</label>
                                    <div className="group/tips relative">
                                        <Info size={16} className="text-gray-300 cursor-help" />
                                        <div className="absolute right-0 bottom-full mb-3 w-64 p-4 bg-gray-900 text-white text-xs rounded-2xl shadow-2xl opacity-0 invisible group-hover/tips:opacity-100 group-hover/tips:visible transition-all z-50 leading-relaxed font-medium">
                                            {isEn ? 'Amount not subject to tax, like meal allowance (200k) or vehicle subsidies (200k).' : '식대(20만원), 차량보조금(20만원) 등 세금이 붙지 않는 금액입니다.'}
                                        </div>
                                    </div>
                                </div>
                                <div className="relative">
                                    <input
                                        type="text"
                                        inputMode="numeric"
                                        value={nonTaxable}
                                        onChange={handleNumberInput(setNonTaxable)}
                                        className="w-full bg-gray-50 dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-700 rounded-2xl p-4 font-bold text-gray-700 dark:text-white focus:border-emerald-500 outline-none transition-all pr-12"
                                    />
                                    <span className="absolute right-5 top-1/2 -translate-y-1/2 font-bold text-gray-400">{isEn ? 'KRW' : '원'}</span>
                                </div>
                            </div>

                            <div className="group">
                                <div className="flex items-center justify-between mb-2">
                                    <label className="text-sm font-black text-gray-400 uppercase tracking-widest">{isEn ? 'No. of Dependents' : '부양가족 수 (본인포함)'}</label>
                                    <span className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 px-3 py-1 rounded-full font-black text-sm">
                                        {dependents} {isEn ? 'Persons' : '명'}
                                    </span>
                                </div>
                                <input
                                    type="range"
                                    min="1"
                                    max="10"
                                    value={dependents}
                                    onChange={(e) => setDependents(parseInt(e.target.value))}
                                    className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-emerald-600 mb-2"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Result Section */}
                <div className="lg:col-span-7 space-y-6">
                    {result ? (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                            {/* Main Result Card */}
                            <div className="bg-white dark:bg-gray-800 rounded-[2.5rem] p-1 shadow-2xl overflow-hidden group border border-border">
                                <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-[2.3rem] p-10 text-white relative overflow-hidden">
                                    <div className="absolute -top-24 -right-24 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-1000"></div>
                                    <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-emerald-400 opacity-20 rounded-full blur-3xl"></div>
                                    
                                    <div className="relative z-10 text-center">
                                        <h3 className="text-emerald-200 font-black text-sm uppercase tracking-[0.3em] mb-4">{isEn ? 'Monthly Net Pay' : '예상 월 실수령액'}</h3>
                                        <div className="flex items-center justify-center gap-2 mb-4">
                                            <span className="text-5xl md:text-7xl font-black tabular-nums tracking-tighter">
                                                {Math.floor(result.takeHome).toLocaleString()}
                                            </span>
                                            <span className="text-xl md:text-2xl font-black text-emerald-200">{isEn ? 'KRW' : '원'}</span>
                                        </div>
                                        <div className="inline-flex items-center gap-2 px-6 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/10">
                                            <span className="text-emerald-100 text-sm font-bold">{isEn ? 'Annual Net Pay' : '연간 총 실수령'}</span>
                                            <span className="font-black text-white">{Math.floor(result.annualTakeHome).toLocaleString()}{isEn ? ' KRW' : '원'}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Chart Card */}
                                <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-100 dark:border-gray-700 shadow-xl flex flex-col items-center">
                                    <h3 className="font-black text-gray-900 dark:text-white mb-8 self-start flex items-center gap-2">
                                        <PieChartIcon className="text-emerald-600" size={20} />
                                        {isEn ? 'Wage Structure' : '내 급여 구조 파악'}
                                    </h3>
                                    <DonutChart
                                        data={[
                                            { name: isEn ? 'Net' : '실수령액', value: result.takeHome, color: '#059669' },
                                            { name: isEn ? 'Insurance' : '4대보험', value: result.totalInsurance, color: '#3b82f6' },
                                            { name: isEn ? 'Tax' : '직속세', value: result.incomeTax + result.localIncomeTax, color: '#ef4444' }
                                        ]}
                                    />
                                    <div className="grid grid-cols-3 gap-4 mt-10 w-full px-2">
                                        <div className="text-center">
                                            <div className="w-2 h-2 bg-emerald-600 rounded-full mx-auto mb-2"></div>
                                            <p className="text-[10px] font-black text-gray-400 uppercase">{isEn ? 'Net' : '실수령'}</p>
                                        </div>
                                        <div className="text-center">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full mx-auto mb-2"></div>
                                            <p className="text-[10px] font-black text-gray-400 uppercase">{isEn ? 'Insurance' : '보험'}</p>
                                        </div>
                                        <div className="text-center">
                                            <div className="w-2 h-2 bg-red-500 rounded-full mx-auto mb-2"></div>
                                            <p className="text-[10px] font-black text-gray-400 uppercase">{isEn ? 'Tax' : '세금'}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Detailed Breakdown Card */}
                                <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-100 dark:border-gray-700 shadow-xl">
                                    <h3 className="font-black text-gray-900 dark:text-white mb-6 underline underline-offset-4 decoration-emerald-500">{isEn ? 'Deduction Breakdown' : '항목별 공제 상세'}</h3>
                                    
                                    <div className="space-y-5">
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between text-[11px] font-black text-gray-400 tracking-widest uppercase">
                                                <span className="flex items-center gap-2"><ShieldCheck size={14} className="text-blue-500" /> {isEn ? 'Social Insurances' : '4대 사회보험'}</span>
                                                <span className="text-blue-600">-{Math.floor(result.totalInsurance).toLocaleString()}</span>
                                            </div>
                                            <div className="pl-6 space-y-2">
                                                <div className="flex justify-between text-xs font-bold text-gray-500">
                                                    <span>{isEn ? 'National Pension' : '국민연금'}</span>
                                                    <span>{Math.floor(result.nationalPension).toLocaleString()}</span>
                                                </div>
                                                <div className="flex justify-between text-xs font-bold text-gray-500">
                                                    <span>{isEn ? 'Health Insurance' : '건강보험'}</span>
                                                    <span>{Math.floor(result.healthInsurance).toLocaleString()}</span>
                                                </div>
                                                <div className="flex justify-between text-xs font-bold text-gray-500">
                                                    <span>{isEn ? 'Long-term Care' : '장기요양'}</span>
                                                    <span>{Math.floor(result.longTermCare).toLocaleString()}</span>
                                                </div>
                                                <div className="flex justify-between text-xs font-bold text-gray-500">
                                                    <span>{isEn ? 'Employment Ins.' : '고용보험'}</span>
                                                    <span>{Math.floor(result.employmentInsurance).toLocaleString()}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-3 pt-2">
                                            <div className="flex items-center justify-between text-[11px] font-black text-gray-400 tracking-widest uppercase">
                                                <span className="flex items-center gap-2"><HeartPulse size={14} className="text-red-500" /> {isEn ? 'Income Taxes' : '소득세'}</span>
                                                <span className="text-red-600">-{Math.floor(result.incomeTax + result.localIncomeTax).toLocaleString()}</span>
                                            </div>
                                            <div className="pl-6 space-y-2">
                                                <div className="flex justify-between text-xs font-bold text-gray-500">
                                                    <span>{isEn ? 'National Income Tax' : '근로소득세'}</span>
                                                    <span>{Math.floor(result.incomeTax).toLocaleString()}</span>
                                                </div>
                                                <div className="flex justify-between text-xs font-bold text-gray-500">
                                                    <span>{isEn ? 'Local Income Tax' : '지방소득세'}</span>
                                                    <span>{Math.floor(result.localIncomeTax).toLocaleString()}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pt-4 border-t-2 border-dashed border-gray-100 dark:border-gray-700 mt-4">
                                            <div className="flex justify-between items-center font-black">
                                                <span className="text-gray-400 text-xs uppercase">{isEn ? 'Total Deduction' : '공제 총액'}</span>
                                                <span className="text-xl text-gray-800 dark:text-gray-200">-{Math.floor(result.totalDeduction).toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-full min-h-[500px] flex flex-col items-center justify-center p-12 text-center bg-gray-50/50 dark:bg-gray-900/30 rounded-[3rem] border-4 border-dashed border-gray-100 dark:border-gray-800">
                            <div className="p-6 bg-white dark:bg-gray-800 rounded-3xl shadow-lg mb-6">
                                <DollarSign size={48} className="text-gray-200" />
                            </div>
                            <h3 className="text-xl font-black text-gray-300 mb-2">{isEn ? 'No Data' : '데이터가 없습니다'}</h3>
                            <p className="text-gray-400 max-w-sm font-medium leading-relaxed">
                                {isEn ? 'Enter your annual salary on the left to generate a detailed net pay report.' : '좌측 폼에 연봉 정보를 입력하시면 상세한 실수령액 분석 리포트가 생성됩니다.'}
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <ShareButtons />

            <div className="pt-12">
                <ToolGuide
                    title={isEn ? "How to Calculate Korean Salary Net Pay" : "연봉 실수령액 계산 가이드"}
                    intro={isEn ? "This calculator estimates your actual monthly deposit after deducting legally required social insurances and income taxes in South Korea." : "연봉 실수령액 계산기는 세전 연봉에서 법적으로 정해진 4대 보험료와 세금을 차감한 실제 입금액을 시뮬레이션해 드립니다."}
                    steps={isEn ? [
                        "Enter your total annual gross salary as per your contract.",
                        "Input non-taxable allowances like meal support (max 200k/mo).",
                        "Select the number of dependents including yourself.",
                        "Review the monthly breakdown and structural chart."
                    ] : [
                        "계약상의 총 연봉 금액(세전)을 입력합니다.",
                        "식대 등 비과세 수당이 있다면 해당 금액을 기입합니다.",
                        "부양가족 수를 선택하면 자동으로 소득세가 계산됩니다.",
                        "실시간으로 계산된 월 실수령액과 상세 공제 내역을 확인합니다."
                    ]}
                    tips={isEn ? [
                        "Check your payslip for 'Non-taxable' (비과세) items to be more accurate.",
                        "Meal allowance limit increased to 200,000 KRW recently.",
                        "This tool reflects the latest 2025 frozen insurance rates."
                    ] : [
                        "월급 명세서에서 '비과세' 항목을 확인하여 입력하면 더 정확합니다.",
                        "식대 비과세 한도가 월 20만원으로 상향되었습니다.",
                        "2025년 동결된 보험 요율을 반영하고 있습니다."
                    ]}
                    faqs={toolFaqs}
                />
            </div>
        </div>
    );
};

export default SalaryCalculator;
