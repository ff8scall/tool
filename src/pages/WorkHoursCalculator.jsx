import React, { useState } from 'react';
import { Clock, Calculator as CalcIcon, Info, TrendingUp } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import ShareButtons from '../components/ShareButtons';
import { useLanguage } from '../context/LanguageContext';

const WorkHoursCalculator = () => {
    const { lang } = useLanguage();
    const isEn = lang === 'en';
    const [startTime, setStartTime] = useState('09:00');
    const [endTime, setEndTime] = useState('18:00');
    const [breakTime, setBreakTime] = useState(60);
    const [hourlyWage, setHourlyWage] = useState('');
    const [workDays, setWorkDays] = useState(20);

    const calculateHours = () => {
        const [startHour, startMin] = startTime.split(':').map(Number);
        const [endHour, endMin] = endTime.split(':').map(Number);

        const startMinutes = startHour * 60 + startMin;
        const endMinutes = endHour * 60 + endMin;

        let totalMinutes = endMinutes - startMinutes;
        if (totalMinutes < 0) totalMinutes += 24 * 60; // Over midnight

        totalMinutes -= breakTime;
        totalMinutes = Math.max(0, totalMinutes);

        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;

        return { hours, minutes, totalMinutes };
    };

    const { hours, minutes, totalMinutes } = calculateHours();
    const dailyWage = hourlyWage ? (totalMinutes / 60 * parseFloat(hourlyWage.replace(/,/g, ''))) : 0;
    const monthlyWage = dailyWage * workDays;

    const faqs = isEn ? [
        { q: "What is the 2025 minimum wage in Korea?", a: "The 2025 minimum hourly wage is 10,030 KRW. Use this as your baseline for hourly wage input." },
        { q: "How is overtime calculated?", a: "Standard overtime generally pays 150% of the normal hourly wage. Night shifts (22:00-06:00) also pay 150%. This tool provides a simple base calculation." },
        { q: "Does this include taxes?", a: "No, this tool calculates the gross pay (before tax and insurance). For net pay, use the Salary Calculator." }
    ] : [
        { q: '주휴수당이 뭔가요?', a: '주 15시간 이상 근무 시 1주일에 1일분의 유급휴일 수당을 받을 권리입니다.' },
        { q: '야간 근무 시 시급은 어떻게 계산하나요?', a: '야간(22:00~06:00) 근무 시 통상임금의 50%를 가산하여 지급해야 합니다.' },
        { q: '2025년 최저임금 월 환산은 얼마인가요?', a: '2025년 최저시급 10,030원 × 월 209시간(주휴 포함) = 2,096,270원입니다.' }
    ];

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 space-y-12">
            <SEO
                title={isEn ? "Work Hours & Salary Calculator - Daily/Monthly Income" : "근무 시간 계산기 | 시급 계산, 일급 월급 자동 계산"}
                description={isEn ? "Calculate your actual working hours and estimated salary based on check-in/out times, break time, and hourly rate. 2025 Updated." : "출근·퇴근 시간과 휴게 시간을 입력하면 실제 근무 시간과 일급·월급을 자동 계산합니다."}
                keywords={isEn ? "work hours calculator, wage calculator, salary estimator, hourly to monthly, korea labor law, shift calculator" : "근무시간계산기, 시급계산기, 일급계산, 월급계산, 근로시간계산, 알바시급계산"}
                faqs={faqs}
            />

            <header className="text-center space-y-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl shadow-lg mb-2">
                    <Clock size={32} className="text-white" />
                </div>
                <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">
                    {isEn ? 'Work Hours & Salary' : '근무 시간 계산기'}
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-400 font-medium max-w-xl mx-auto">
                    {isEn ? 'Calculate your daily working time and estimated monthly income with ease.' : '출퇴근 시간으로 근무 시간과 월급을 계산하세요.'}
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Input Card */}
                <div className="lg:col-span-5 bg-white dark:bg-gray-800 rounded-[2rem] p-8 shadow-xl border border-gray-100 dark:border-gray-700 space-y-8">
                    <div className="flex items-center gap-3 mb-2">
                        <CalcIcon size={20} className="text-blue-600" />
                        <h2 className="font-black text-lg text-gray-800 dark:text-gray-200 uppercase tracking-widest">{isEn ? 'Shift Details' : '근무 상세 설정'}</h2>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">{isEn ? 'Check-in' : '출근 시간'}</label>
                            <input
                                type="time"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                                className="w-full bg-gray-50 dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-700 rounded-xl p-4 font-bold text-gray-700 dark:text-white focus:border-blue-500 outline-none transition-all"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">{isEn ? 'Check-out' : '퇴근 시간'}</label>
                            <input
                                type="time"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                                className="w-full bg-gray-50 dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-700 rounded-xl p-4 font-bold text-gray-700 dark:text-white focus:border-blue-500 outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">{isEn ? 'Break Time' : '휴게 시간'}</label>
                            <span className="text-xs font-black text-blue-600">{breakTime} {isEn ? 'Min' : '분'}</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="240"
                            step="10"
                            value={breakTime}
                            onChange={(e) => setBreakTime(parseInt(e.target.value))}
                            className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                        />
                    </div>

                    <div className="space-y-4 pt-4 border-t border-gray-50 dark:border-gray-700">
                        <div className="space-y-2">
                            <label className="text-xs font-black text-gray-400 uppercase tracking-widest">{isEn ? 'Hourly Wage' : '시급'}</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    inputMode="numeric"
                                    value={hourlyWage}
                                    onChange={(e) => {
                                        const val = e.target.value.replace(/[^0-9]/g, '');
                                        setHourlyWage(val ? parseInt(val).toLocaleString() : '');
                                    }}
                                    placeholder={isEn ? "e.g. 10,030" : "예: 10,030"}
                                    className="w-full bg-gray-50 dark:bg-gray-900 border-2 border-gray-100 dark:border-gray-700 rounded-xl p-4 font-black text-xl text-blue-700 dark:text-blue-400 focus:border-blue-500 outline-none transition-all pr-12"
                                />
                                <span className="absolute right-5 top-1/2 -translate-y-1/2 font-black text-gray-400">{isEn ? 'KRW' : '원'}</span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <label className="text-xs font-black text-gray-400 uppercase tracking-widest">{isEn ? 'Monthly Work Days' : '월 근무일수'}</label>
                                <span className="text-xs font-black text-blue-600">{workDays} {isEn ? 'Days' : '일'}</span>
                            </div>
                            <input
                                type="range"
                                min="1"
                                max="31"
                                value={workDays}
                                onChange={(e) => setWorkDays(parseInt(e.target.value))}
                                className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
                            />
                        </div>
                    </div>
                </div>

                {/* Result Section */}
                <div className="lg:col-span-7 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Daily Hours Card */}
                        <div className="bg-white dark:bg-gray-800 rounded-[2rem] p-8 shadow-xl border border-gray-100 dark:border-gray-700 flex flex-col justify-between overflow-hidden relative group">
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-50 dark:bg-blue-900/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700"></div>
                            <div className="relative z-10">
                                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">{isEn ? 'Daily Work Time' : '일일 근무 시간'}</h3>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-5xl font-black text-gray-900 dark:text-white tabular-nums">{hours}</span>
                                    <span className="text-lg font-bold text-gray-400 uppercase">{isEn ? 'Hr' : '시간'}</span>
                                    {minutes > 0 && (
                                        <>
                                            <span className="text-5xl font-black text-gray-900 dark:text-white tabular-nums ml-2">{minutes}</span>
                                            <span className="text-lg font-bold text-gray-400 uppercase">{isEn ? 'Min' : '분'}</span>
                                        </>
                                    )}
                                </div>
                                <p className="text-xs font-bold text-blue-600 mt-4 flex items-center gap-1">
                                    <TrendingUp size={14} />
                                    {isEn ? 'Total' : '총'} {totalMinutes} {isEn ? 'Minutes' : '분'}
                                </p>
                            </div>
                        </div>

                        {/* Daily Wage Card */}
                        <div className="bg-white dark:bg-gray-800 rounded-[2rem] p-8 shadow-xl border border-gray-100 dark:border-gray-700 flex flex-col justify-between overflow-hidden relative group">
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-50 dark:bg-emerald-900/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700"></div>
                            <div className="relative z-10">
                                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">{isEn ? 'Daily Wage' : '일일 급여 (일급)'}</h3>
                                {hourlyWage ? (
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-5xl font-black text-gray-900 dark:text-white tabular-nums">{Math.floor(dailyWage).toLocaleString()}</span>
                                        <span className="text-lg font-bold text-gray-400 uppercase">{isEn ? 'KRW' : '원'}</span>
                                    </div>
                                ) : (
                                    <p className="text-gray-300 font-bold py-2">{isEn ? 'Enter valid wage' : '시급을 입력하세요'}</p>
                                )}
                            </div>
                        </div>

                        {/* Monthly Total Card */}
                        <div className="md:col-span-2 bg-gradient-to-br from-blue-600 to-blue-800 rounded-[2.5rem] p-10 shadow-2xl shadow-blue-200 dark:shadow-none relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                            <div className="relative z-10 text-center space-y-4">
                                <h3 className="text-blue-100 font-black text-sm uppercase tracking-[0.3em]">{isEn ? 'Estimated Monthly Salary' : '예상 월 급여 총액'}</h3>
                                <div className="flex items-center justify-center gap-2">
                                    <span className="text-6xl md:text-7xl font-black text-white tabular-nums tracking-tighter">
                                        {Math.floor(monthlyWage).toLocaleString()}
                                    </span>
                                    <span className="text-2xl font-black text-blue-200">{isEn ? 'KRW' : '원'}</span>
                                </div>
                                <div className="inline-flex items-center gap-2 px-6 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/10 text-white text-sm font-bold">
                                    <span>{isEn ? `Based on ${workDays} working days` : `월 ${workDays}일 근무 기준`}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-blue-50/50 dark:bg-gray-900/50 rounded-2xl p-6 border border-blue-100 dark:border-gray-700">
                        <h4 className="flex items-center gap-2 text-blue-700 dark:text-blue-400 font-black text-xs uppercase tracking-widest mb-4">
                            <Info size={16} />
                            {isEn ? 'Calculation Rules in Korea' : '대한민국 근로기준법 주요 사항'}
                        </h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2 text-xs font-medium text-gray-500 dark:text-gray-400 list-disc list-inside">
                            <li>{isEn ? '2025 Min. Wage: 10,030 KRW' : '2025년 최저시급: 10,030원'}</li>
                            <li>{isEn ? 'Night shift (22-06): +50% pay' : '야간 근로(22~06시): 50% 가산'}</li>
                            <li>{isEn ? 'Standard week: 40h (Total 209h)' : '주 40시간(월 209시간) 기준'}</li>
                            <li>{isEn ? 'Break: 30m per 4h / 1h per 8h' : '4시간당 30분 유급휴게 의무'}</li>
                        </ul>
                    </div>
                </div>
            </div>

            <ShareButtons />

            <ToolGuide
                title={isEn ? "Shift Calculator Guide" : "근무 시간 계산기 사용 가이드"}
                intro={isEn ? "Get an accurate estimation of your earnings. This tool computes both shift duration and expected monthly income based on your hourly rate." : "출퇴근 시간과 시급을 입력하여 정확한 근무 시간과 예상 수입을 확인하세요."}
                steps={isEn ? [
                    "Input your shift start and end times (24h format).",
                    "Subtract your break time (e.g. 60m for lunch).",
                    "Enter your hourly rate (Min. 10,030 KRW for 2025).",
                    "Adjust the number of work days per month to see your estimate."
                ] : [
                    "출근 시간과 퇴근 시간을 24시간 형식으로 입력합니다.",
                    "휴게 시간(분 단위)을 입력합니다. (예: 점심 1시간 = 60분)",
                    "시급과 월 근무일수를 설정합니다.",
                    "결과 카드에서 일급과 예상 월급을 확인합니다."
                ]}
                tips={isEn ? [
                    "This tool calculates 'Gross Pay' before taxes and insurance.",
                    "Weekly holiday pay (Ju-hyu) should be calculated separately if not included in rate.",
                    "For night shifts crossing midnight, the tool handles 'Over midnight' automatically."
                ] : [
                    "이 계산기는 4대보험 및 세금을 공제하기 전인 '세전' 금액을 보여줍니다.",
                    "주 15시간 이상 근무 시 발생하는 주휴수당은 별도 계산이 필요합니다.",
                    "자정이 넘는 야간 근무 시간도 자동으로 인식하여 계산합니다."
                ]}
                faqs={faqs}
            />
        </div>
    );
};

export default WorkHoursCalculator;
