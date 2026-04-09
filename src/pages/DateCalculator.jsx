import React, { useState } from 'react';
import { Calendar, Clock, ArrowRight, Briefcase } from 'lucide-react';
import { format, addDays, subDays, differenceInDays, parseISO, eachDayOfInterval, isWeekend } from 'date-fns';
import { ko, enUS } from 'date-fns/locale';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { useLanguage } from '../context/LanguageContext';

const DateCalculator = () => {
    const { lang, t } = useLanguage();
    const isEn = lang === 'en';
    const dateLocale = isEn ? enUS : ko;
    const [activeTab, setActiveTab] = useState('dday'); // 'dday', 'calc', or 'business'

    // D-Day State
    const [targetDate, setTargetDate] = useState('');
    const [dDayResult, setDDayResult] = useState(null);

    // Date Calc State
    const [startDate, setStartDate] = useState('');
    const [daysToCalc, setDaysToCalc] = useState('');
    const [calcType, setCalcType] = useState('add'); // 'add' or 'sub'
    const [calcResult, setCalcResult] = useState(null);

    // Business Day State
    const [businessStartDate, setBusinessStartDate] = useState('');
    const [businessEndDate, setBusinessEndDate] = useState('');
    const [businessDayResult, setBusinessDayResult] = useState(null);

    // Calculate D-Day
    const calculateDDay = () => {
        if (!targetDate) return;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const target = parseISO(targetDate);
        target.setHours(0, 0, 0, 0);

        const diff = differenceInDays(target, today);
        setDDayResult(diff);
    };

    // Calculate Date (Add/Sub)
    const calculateDate = () => {
        if (!startDate || !daysToCalc) return;
        const start = parseISO(startDate);
        const days = parseInt(daysToCalc, 10);

        let result;
        if (calcType === 'add') {
            result = addDays(start, days);
        } else {
            result = subDays(start, days);
        }
        setCalcResult(result);
    };

    // Calculate Business Days (excluding weekends)
    const calculateBusinessDays = () => {
        if (!businessStartDate || !businessEndDate) return;

        const start = parseISO(businessStartDate);
        const end = parseISO(businessEndDate);

        // Ensure start is before end
        const [earlierDate, laterDate] = start <= end ? [start, end] : [end, start];

        // Get all days in the interval
        const allDays = eachDayOfInterval({ start: earlierDate, end: laterDate });

        // Filter out weekends
        const businessDays = allDays.filter(day => !isWeekend(day));

        // Total days including weekends
        const totalDays = differenceInDays(laterDate, earlierDate) + 1;
        const weekendDays = totalDays - businessDays.length;

        setBusinessDayResult({
            totalDays,
            businessDays: businessDays.length,
            weekendDays,
            isReversed: start > end
        });
    };

    const faqs = isEn ? [
        {
            q: "Does the date calculation include the start date?",
            a: "D-Day calculation shows the relative difference from today. For Date Addition/Subtraction, it calculates the landing date after moving the specified number of days."
        },
        {
            q: "Are public holidays included in the business day calculation?",
            a: "Currently, this calculator only excludes Saturdays and Sundays. Public holidays vary by country and are included in the results."
        }
    ] : [
        {
            q: "날짜 계산 시 시작일도 포함되나요?",
            a: "D-Day 계산의 경우 오늘을 기준으로 상대적인 차이를 보여주며, 날짜 더하기/빼기는 입력한 일수만큼 이동한 날짜를 보여줍니다."
        },
        {
            q: "근무일 계산에 법정 공휴일도 포함되나요?",
            a: "현재 계산기는 토요일과 일요일만 제외하며, 변동이 잦은 법정 공휴일은 포함되어 계산됩니다."
        }
    ];

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <SEO
                title={t('tools.date.title')}
                description={t('tools.date.description')}
                keywords={isEn ? "D-Day calculation, date calculator, anniversary calc, add days, subtract days, business days, working days" : "D-Day 계산, 날짜 계산, 기념일 계산, 날짜 더하기, 날짜 빼기, 근무일 계산, 영업일 계산"}
                faqs={faqs}
            />

            <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold text-text-primary flex items-center justify-center gap-3">
                    <Calendar className="w-8 h-8 text-primary" />
                    {isEn ? 'D-Day & Date Calculator' : 'D-Day 및 날짜 계산기'}
                </h1>
                <p className="text-text-secondary">
                    {isEn ? 'Check remaining days until important events or calculate specific dates.' : '중요한 날까지 남은 날짜를 확인하거나, 특정 날짜를 계산해보세요.'}
                </p>
            </div>

            {/* Tabs */}
            <div className="flex justify-center gap-2 sm:gap-4 mb-8 flex-wrap">
                <button
                    onClick={() => setActiveTab('dday')}
                    className={`px-4 sm:px-6 py-2 rounded-full font-medium transition-all text-sm sm:text-base ${activeTab === 'dday'
                        ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                        : 'bg-bg-card text-text-secondary hover:bg-bg-card-hover'
                        }`}
                >
                    {isEn ? 'D-Day Calc' : 'D-Day 계산'}
                </button>
                <button
                    onClick={() => setActiveTab('calc')}
                    className={`px-4 sm:px-6 py-2 rounded-full font-medium transition-all text-sm sm:text-base ${activeTab === 'calc'
                        ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                        : 'bg-bg-card text-text-secondary hover:bg-bg-card-hover'
                        }`}
                >
                    {isEn ? 'Add/Sub Dates' : '날짜 더하기/빼기'}
                </button>
                <button
                    onClick={() => setActiveTab('business')}
                    className={`px-4 sm:px-6 py-2 rounded-full font-medium transition-all text-sm sm:text-base flex items-center gap-1.5 ${activeTab === 'business'
                        ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                        : 'bg-bg-card text-text-secondary hover:bg-bg-card-hover'
                        }`}
                >
                    <Briefcase className="w-4 h-4" />
                    {isEn ? 'Business Days' : '근무일 계산'}
                </button>
            </div>

            <div className="card p-8 min-h-[400px] flex flex-col justify-center">
                {activeTab === 'dday' ? (
                    <div className="space-y-8">
                        <div className="space-y-2">
                            <label className="block text-sm font-medium text-text-secondary">{isEn ? 'Select Target Date' : '목표 날짜 선택'}</label>
                            <input
                                type="date"
                                value={targetDate}
                                onChange={(e) => {
                                    setTargetDate(e.target.value);
                                }}
                                className="input text-lg"
                            />
                        </div>

                        <button
                            onClick={calculateDDay}
                            className="btn btn-primary w-full"
                        >
                            {isEn ? 'Calculate' : '계산하기'}
                        </button>

                        {dDayResult !== null && (
                            <div className="text-center space-y-2 pt-8 border-t border-border-color">
                                <p className="text-text-secondary">
                                    {isEn ? `Until ${targetDate}` : `${targetDate} 까지`}
                                </p>
                                <div className="text-5xl font-bold text-primary">
                                    {dDayResult === 0 ? 'D-Day' : dDayResult > 0 ? `D-${dDayResult}` : `D+${Math.abs(dDayResult)}`}
                                </div>
                                <p className="text-sm text-text-tertiary">
                                    {dDayResult > 0 
                                        ? (isEn ? `${dDayResult} days left` : `${dDayResult}일 남았습니다.`) 
                                        : dDayResult < 0 
                                            ? (isEn ? `${Math.abs(dDayResult)} days passed` : `${Math.abs(dDayResult)}일 지났습니다.`) 
                                            : (isEn ? 'Right now!' : '오늘입니다!')}
                                </p>
                            </div>
                        )}
                    </div>
                ) : activeTab === 'calc' ? (
                    <div className="space-y-8">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-text-secondary">{isEn ? 'Base Date' : '기준 날짜'}</label>
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)}
                                    className="input"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-text-secondary">{isEn ? 'Days' : '계산할 일수'}</label>
                                <input
                                    type="number"
                                    value={daysToCalc}
                                    onChange={(e) => setDaysToCalc(e.target.value)}
                                    placeholder={isEn ? "e.g. 100" : "예: 100"}
                                    className="input"
                                />
                            </div>
                        </div>

                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => setCalcType('add')}
                                className={`flex-1 py-3 rounded-xl border transition-all ${calcType === 'add'
                                    ? 'border-primary bg-primary/10 text-primary'
                                    : 'border-border-color hover:border-primary/50'
                                    }`}
                            >
                                {isEn ? 'Add (+)' : '더하기 (+)'}
                            </button>
                            <button
                                onClick={() => setCalcType('sub')}
                                className={`flex-1 py-3 rounded-xl border transition-all ${calcType === 'sub'
                                    ? 'border-primary bg-primary/10 text-primary'
                                    : 'border-border-color hover:border-primary/50'
                                    }`}
                            >
                                {isEn ? 'Subtract (-)' : '빼기 (-)'}
                            </button>
                        </div>

                        <button
                            onClick={calculateDate}
                            className="btn btn-primary w-full"
                        >
                            {isEn ? 'Calculate' : '계산하기'}
                        </button>

                        {calcResult && (
                            <div className="text-center pt-8 border-t border-border-color">
                                <p className="text-text-secondary mb-2">{isEn ? 'Result' : '계산 결과'}</p>
                                <div className="text-3xl font-bold text-primary">
                                    {format(calcResult, isEn ? 'MMM d, yyyy (EEE)' : 'yyyy년 M월 d일 (EEE)', { locale: dateLocale })}
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="space-y-8">
                        <div className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-lg p-4">
                            <p className="text-sm text-blue-800 dark:text-blue-200">
                                <Briefcase className="w-4 h-4 inline mr-2" />
                                {isEn ? 'Calculates net working days excluding weekends (Sat/Sun).' : '주말(토요일, 일요일)을 제외한 순수 근무일/영업일을 계산합니다.'}
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-text-secondary">{isEn ? 'Start Date' : '시작 날짜'}</label>
                                <input
                                    type="date"
                                    value={businessStartDate}
                                    onChange={(e) => setBusinessStartDate(e.target.value)}
                                    className="input"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-text-secondary">{isEn ? 'End Date' : '종료 날짜'}</label>
                                <input
                                    type="date"
                                    value={businessEndDate}
                                    onChange={(e) => setBusinessEndDate(e.target.value)}
                                    className="input"
                                />
                            </div>
                        </div>

                        <button
                            onClick={calculateBusinessDays}
                            className="btn btn-primary w-full"
                        >
                            {isEn ? 'Calculate Working Days' : '근무일 계산하기'}
                        </button>

                        {businessDayResult && (
                            <div className="space-y-6 pt-8 border-t border-border-color">
                                <div className="text-center">
                                    <p className="text-text-secondary mb-2">{isEn ? 'Total Working Days' : '총 근무일/영업일'}</p>
                                    <div className="text-5xl font-bold text-primary">
                                        {businessDayResult.businessDays}{isEn ? ' days' : '일'}
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-4 pt-4">
                                    <div className="text-center p-4 bg-muted/30 rounded-lg">
                                        <p className="text-xs text-muted-foreground mb-1">{isEn ? 'Total' : '전체 일수'}</p>
                                        <p className="text-2xl font-bold">{businessDayResult.totalDays}{isEn ? 'd' : '일'}</p>
                                    </div>
                                    <div className="text-center p-4 bg-green-50 dark:bg-green-950/30 rounded-lg">
                                        <p className="text-xs text-green-600 dark:text-green-400 mb-1">{isEn ? 'Work' : '근무일'}</p>
                                        <p className="text-2xl font-bold text-green-600 dark:text-green-400">{businessDayResult.businessDays}{isEn ? 'd' : '일'}</p>
                                    </div>
                                    <div className="text-center p-4 bg-red-50 dark:bg-red-950/30 rounded-lg">
                                        <p className="text-xs text-red-600 dark:text-red-400 mb-1">{isEn ? 'Weekend' : '주말'}</p>
                                        <p className="text-2xl font-bold text-red-600 dark:text-red-400">{businessDayResult.weekendDays}{isEn ? 'd' : '일'}</p>
                                    </div>
                                </div>

                                <p className="text-xs text-center text-muted-foreground">
                                    {isEn ? '* Holidays are included. Only weekends (Sat/Sun) are excluded.' : '* 공휴일은 포함되어 있습니다. 주말(토/일)만 제외됩니다.'}
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <ShareButtons />

            <ToolGuide
                title={isEn ? "Date & D-Day Calculator Guide" : "날짜 및 D-Day 계산 활용 가이드"}
                intro={isEn 
                    ? "A tool to check the remaining time until important dates such as anniversaries or exam dates, or to calculate specific days before and after. It also provides a business day calculation for professionals."
                    : "기념일, 시험일 등 중요한 날짜까지 남은 시간을 확인하거나, 특정 날짜로부터 며칠 전후를 계산할 수 있는 도구입니다. 직장인을 위한 근무일 계산 기능도 제공합니다."}
                steps={isEn ? [
                    "D-Day: Select a target date to see the remaining days from today instantly.",
                    "Add/Subtract: Enter a base date and number of days, choose 'Add' or 'Subtract' to find the result date.",
                    "Business Days: Calculate actual working days excluding weekends (Sat, Sun) for project planning."
                ] : [
                    "D-Day: 확인하고 싶은 목표 날짜를 선택하면 오늘로부터 남은 일수가 즉시 계산됩니다.",
                    "날짜 더하기/빼기: 기준일과 일수를 입력하고 '더하기' 또는 '빼기'를 선택하여 결과 날짜를 구합니다.",
                    "근무일 계산: 두 날짜 사이의 주말(토, 일)을 제외한 실제 영업일수를 계산하여 프로젝트 마감일 산출 등에 활용합니다."
                ]}
                tips={isEn ? [
                    "Plan events by pre-calculating couple anniversaries (100 days, 1 year, etc.).",
                    "Add shortcuts to your home screen for discharge dates, due dates, or exam D-days for quick access.",
                    "Get accurate reference dates for official document writing."
                ] : [
                    "커플들의 기념일(100일, 1년 등)을 미리 계산하여 일정을 계획해보세요.",
                    "전역일, 출산 예정일, 시험 디데이 등을 홈 화면에 바로가기로 추가해두면 편리합니다.",
                    "공문서 작성 시 날짜 계산이 필요할 때 정확한 기준을 제공합니다."
                ]}
                faqs={faqs}
            />
        </div>
    );
};

export default DateCalculator;
