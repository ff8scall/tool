import React, { useState } from 'react';
import { CheckCircle, XCircle, DollarSign, Clock } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import ShareButtons from '../components/ShareButtons';

const MinimumWageCalculator = () => {
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
        const myRate = parseFloat(hourlyRate);
        const isPass = myRate >= minWage;
        const diff = myRate - minWage;
        const monthlyMinWage = minWage * workHours;
        const myMonthlyWage = myRate * workHours;
        setResult({ isPass, diff, minWage, monthlyMinWage, myMonthlyWage });
    };

    const faqs = [
        { q: '2025년 최저임금(최저시급)은 얼마인가요?', a: '2025년 최저임금은 시간급 10,030원입니다. 2024년(9,860원) 대비 170원(약 1.7%) 인상되었습니다. 월 환산액 기준(주 40시간, 월 209시간)으로는 약 2,096,270원입니다.' },
        { q: '주휴수당이란 무엇이고 왜 209시간인가요?', a: '주휴수당은 1주에 15시간 이상 근무 시 주 1회 유급 휴일(8시간)을 보장하는 제도입니다. 주 40시간 근무 기준 월 소정근로 174시간 + 주휴 35시간 = 209시간이 됩니다. 이것이 최저임금 월 환산 기준 시간입니다.' },
        { q: '아르바이트 시급도 최저임금이 적용되나요?', a: '네, 모든 근로자(아르바이트 포함)에게 최저임금이 적용됩니다. 단, 수습 사용 중인 자(1년 이상 근로계약 체결 시 첫 3개월)는 최저임금의 90%까지 감액 지급이 가능합니다.' },
        { q: '최저임금 위반 시 어떻게 되나요?', a: '최저임금 이하를 지급하면 3년 이하 징역 또는 2,000만 원 이하 벌금이 부과될 수 있습니다. 미지급 임금 차액은 청구할 수 있으며, 고용노동부(국번없이 1350)에 신고 가능합니다.' },
        { q: '식대, 교통비 등이 최저임금에 포함되나요?', a: '2024년부터 식대·교통비 등 복리후생비는 최저임금 산입범위에 포함되지 않습니다. 즉, 시급을 계산할 때 순수 기본급과 고정 수당만 포함되어야 합니다.' },
    ];

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <SEO
                title="최저임금 계산기 2025 | 내 시급 최저임금 준수 여부 확인"
                description="2025년 최저시급 10,030원 기준으로 내 시급이 최저임금 기준을 충족하는지 즉시 확인하세요. 월급 환산, 주휴수당 포함 계산 지원."
                keywords="최저임금계산기, 최저시급2025, 2025최저임금, 시급계산기, 최저임금준수, 주휴수당계산, 아르바이트시급"
                faqs={faqs}
            />

            <header className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-2">
                    <DollarSign className="w-8 h-8 text-primary" />
                </div>
                <h1 className="text-3xl font-bold">최저임금 계산기</h1>
                <p className="text-muted-foreground">
                    2025년 최저시급 10,030원 — 내 시급이 기준에 맞는지 확인하세요.
                </p>
            </header>

            <div className="card p-6 space-y-6">
                <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">기준 연도</label>
                            <select
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                                className="input w-full"
                            >
                                <option value="2025">2025년 (10,030원)</option>
                                <option value="2024">2024년 (9,860원)</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">월 근로시간 (주휴 포함)</label>
                            <input
                                type="number"
                                value={workHours}
                                onChange={(e) => setWorkHours(e.target.value)}
                                className="input w-full"
                                placeholder="기본 209시간"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">나의 시급</label>
                        <div className="relative">
                            <input
                                type="number"
                                value={hourlyRate}
                                onChange={(e) => setHourlyRate(e.target.value)}
                                placeholder="예: 11000"
                                className="input w-full pr-8"
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">원</span>
                        </div>
                    </div>

                    <button
                        onClick={calculate}
                        className="btn btn-primary w-full py-4 text-lg font-bold"
                    >
                        확인하기
                    </button>
                </div>

                {result && (
                    <div className={`mt-6 p-6 rounded-xl border text-center space-y-4 animate-fade-in ${result.isPass ? 'bg-green-500/10 border-green-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
                        <div className="flex items-center justify-center gap-2 mb-2">
                            {result.isPass ? (
                                <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                            ) : (
                                <XCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
                            )}
                            <h3 className={`text-2xl font-bold ${result.isPass ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                {result.isPass ? '최저임금 준수 ✅' : '최저임금 미달 ⚠️'}
                            </h3>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="p-3 bg-card rounded-lg border border-border">
                                <span className="text-muted-foreground block mb-1">{year}년 최저시급</span>
                                <span className="font-bold text-lg">{result.minWage.toLocaleString()}원</span>
                            </div>
                            <div className="p-3 bg-card rounded-lg border border-border">
                                <span className="text-muted-foreground block mb-1">나의 시급</span>
                                <span className={`font-bold text-lg ${result.isPass ? 'text-green-600' : 'text-red-600'}`}>
                                    {parseFloat(hourlyRate).toLocaleString()}원
                                </span>
                            </div>
                        </div>

                        <div className="text-sm text-muted-foreground">
                            {result.isPass ? (
                                <p>기준보다 <span className="font-bold text-green-600">+{result.diff.toLocaleString()}원</span> 더 받고 계시네요! 👏</p>
                            ) : (
                                <p>기준보다 <span className="font-bold text-red-600">{result.diff.toLocaleString()}원</span> 부족합니다. 고용노동부(☎1350)에 신고할 수 있습니다.</p>
                            )}
                        </div>

                        <div className="pt-4 border-t border-border/50">
                            <h4 className="font-medium mb-2">월급 환산 (월 {workHours}시간 기준)</h4>
                            <div className="flex justify-between items-center bg-card p-3 rounded-lg border border-border">
                                <span className="text-muted-foreground">예상 월급</span>
                                <span className="font-bold text-xl">{Math.floor(result.myMonthlyWage).toLocaleString()}원</span>
                            </div>
                            <p className="text-xs text-muted-foreground mt-2 text-left">
                                * {year}년 최저임금 월 환산액 (209시간): <strong>{Math.floor(result.minWage * 209).toLocaleString()}원</strong>
                            </p>
                        </div>
                    </div>
                )}
            </div>

            <ShareButtons />

            <ToolGuide
                title="최저임금 계산기 사용 가이드"
                intro="최저임금 계산기는 내 시급이 법정 최저임금 기준을 충족하는지 즉시 확인하고, 월급 환산액을 계산해 드립니다. 알바생, 신입직원, 취업준비생 모두 활용할 수 있습니다."
                steps={[
                    '"기준 연도" 에서 확인할 연도를 선택합니다. (2025년 최저임금: 10,030원)',
                    '"월 근로시간" 을 입력합니다. 주 40시간 근무 시 주휴 포함 209시간이 기본값입니다.',
                    '"나의 시급" 에 받고 있는 시간당 급여를 입력합니다.',
                    '"확인하기" 버튼을 클릭합니다.',
                    '최저임금 준수 여부와 월급 환산액이 즉시 표시됩니다.',
                ]}
                tips={[
                    '주 40시간 근무 기준 2025년 최저임금 월 환산: 10,030원 × 209시간 = 2,096,270원',
                    '단시간 근로자(파트타임)는 근무 시간에 비례해 주휴수당이 적용됩니다. 주 15시간 이상 근무 시 주휴수당이 발생합니다.',
                    '최저임금 미달 시 고용노동부 민원마당(minwon.moel.go.kr) 또는 전화(1350)로 신고 가능합니다.',
                    '식대는 최저임금 산입범위에서 제외되므로, 식대를 제외한 순 시급이 최저기준 이상인지 확인하세요.',
                ]}
                faqs={faqs}
            />
        </div>
    );
};

export default MinimumWageCalculator;
