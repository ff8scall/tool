import React, { useState } from 'react';
import { Calculator, Calendar, Info } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import ShareButtons from '../components/ShareButtons';

const SeveranceCalculator = () => {
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
            setError('재직 기간이 1년 미만인 경우 법정 퇴직금이 발생하지 않습니다. (1년 이상 근속 시 지급)');
            setResult(null);
            return;
        }

        const dailyWage = parseFloat(avgSalary) / 30;
        const severancePay = dailyWage * 30 * (totalDays / 365);

        setResult({ totalDays, severancePay });
    };

    const faqs = [
        { q: '퇴직금을 받으려면 얼마나 근무해야 하나요?', a: '근로기준법상 계속 근로 기간이 1년 이상이고, 4주 평균 주 15시간 이상 근무한 경우 퇴직금을 받을 수 있습니다. 단, 아르바이트나 계약직도 위 조건을 충족하면 퇴직금이 발생합니다.' },
        { q: '퇴직금 계산 공식은 무엇인가요?', a: '퇴직금 = 1일 평균임금 × 30일 × (재직일수 ÷ 365일)\n1일 평균임금 = 최근 3개월 임금 총액 ÷ 3개월간 총 일수\n이 계산기는 월 평균 급여 ÷ 30일로 간이 계산하므로 실제와 소폭 다를 수 있습니다.' },
        { q: '평균임금에는 어떤 항목이 포함되나요?', a: '기본급, 각종 수당(연장·야간·휴일근로), 상여금의 3/12 등이 포함됩니다. 복리후생비(식대, 교통비 등)는 취업규칙에 따라 다를 수 있습니다. 정확한 평균임금은 고용부 퇴직금 계산기를 활용하거나 전문가 상담을 권장합니다.' },
        { q: '퇴직금은 언제, 어떻게 받나요?', a: '퇴직금은 퇴직 후 14일 이내에 지급해야 합니다(당사자 합의 시 연장 가능). IRP(개인형 퇴직연금) 계좌로 이체되며, 55세 이전 중도 인출 시 세금이 부과됩니다.' },
        { q: 'DC형·DB형 퇴직연금은 퇴직금과 다른가요?', a: 'DB형(확정급여형)은 퇴직 시 근속연수와 평균임금으로 계산해 회사가 지급합니다. DC형(확정기여형)은 회사가 매년 임금의 1/12을 IRP에 적립합니다. 이 계산기는 법정 퇴직금(미적립 기업) 기준이며, DC형은 적립 잔액이 퇴직급여가 됩니다.' },
    ];

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <SEO
                title="퇴직금 계산기 | 입사일 퇴사일 입력으로 예상 퇴직금 조회"
                description="입사일, 퇴사일, 평균 월급을 입력하면 법정 퇴직금을 즉시 계산합니다. 2025년 최신 공식 반영. 재직기간 1년 이상 여부도 확인하세요."
                keywords="퇴직금계산기, 예상퇴직금계산, 퇴직금공식, 퇴직금조회, 재직기간계산, 퇴직금얼마, 1년미만퇴직금"
                faqs={faqs}
            />

            <header className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mb-2">
                    <Calculator className="w-8 h-8 text-primary" />
                </div>
                <h1 className="text-3xl font-bold">퇴직금 계산기</h1>
                <p className="text-muted-foreground">
                    입사일, 퇴사일, 월 평균 급여를 입력하면 예상 퇴직금을 즉시 계산합니다.
                </p>
            </header>

            <div className="card p-6 space-y-6">
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">최근 3개월 월 평균 급여 (세전)</label>
                        <div className="relative">
                            <input
                                type="number"
                                value={avgSalary}
                                onChange={(e) => setAvgSalary(e.target.value)}
                                placeholder="예: 3000000"
                                className="input w-full pr-8"
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">원</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            * 기본급 + 각종 수당을 포함한 세전 금액을 입력하세요.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium flex items-center gap-2">
                                <Calendar className="w-4 h-4" /> 입사일
                            </label>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="input w-full"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium flex items-center gap-2">
                                <Calendar className="w-4 h-4" /> 퇴사일 (마지막 근무일)
                            </label>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="input w-full"
                            />
                        </div>
                    </div>

                    <button
                        onClick={calculateSeverance}
                        className="btn btn-primary w-full py-4 text-lg font-bold"
                    >
                        퇴직금 계산하기
                    </button>
                </div>

                {error && (
                    <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-700 dark:text-red-400 text-sm">
                        ⚠️ {error}
                    </div>
                )}

                {result && (
                    <div className="mt-6 p-6 bg-primary/5 rounded-xl border border-primary/10 text-center space-y-4 animate-fade-in">
                        <div>
                            <h3 className="text-sm font-medium text-muted-foreground mb-1">총 재직 기간</h3>
                            <p className="text-lg font-bold text-foreground">
                                {Math.floor(result.totalDays / 365)}년 {result.totalDays % 365}일 (총 {result.totalDays}일)
                            </p>
                        </div>
                        <div className="w-full h-px bg-border"></div>
                        <div>
                            <h3 className="text-sm font-medium text-muted-foreground mb-1">예상 퇴직금</h3>
                            <p className="text-4xl font-bold text-primary">
                                {Math.floor(result.severancePay).toLocaleString()}원
                            </p>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            * 실제 퇴직금은 평균임금 산정 방식에 따라 차이가 있을 수 있습니다. (간이 계산 기준)
                        </p>
                    </div>
                )}
            </div>

            <div className="bg-muted/30 rounded-xl p-6 text-sm text-muted-foreground space-y-2">
                <h3 className="font-bold text-foreground flex items-center gap-2">
                    <Info className="w-4 h-4" /> 퇴직금 지급 기준 (근로기준법 제34조)
                </h3>
                <ul className="list-disc list-inside space-y-1 ml-1">
                    <li>계속근로기간이 <strong>1년 이상</strong>이어야 합니다.</li>
                    <li>4주간을 평균하여 1주간의 소정근로시간이 <strong>15시간 이상</strong>이어야 합니다.</li>
                    <li>퇴직금 = 1일 평균임금 × 30일 × (재직일수 ÷ 365일)</li>
                    <li>퇴직 후 <strong>14일 이내</strong> 지급이 원칙입니다.</li>
                </ul>
            </div>

            <ShareButtons />

            <ToolGuide
                title="퇴직금 계산기 사용 가이드"
                intro="퇴직금 계산기는 입사일, 퇴사일, 최근 3개월 월 평균 급여를 입력하면 법정 퇴직금 예상액을 즉시 계산합니다. 이직, 퇴사 전 미리 퇴직금 규모를 파악하고 재정 계획을 세워보세요."
                steps={[
                    '"최근 3개월 월 평균 급여" 에 세전 월급을 입력합니다. (기본급 + 수당 합산)',
                    '"입사일" 에 실제 첫 출근일을 입력합니다.',
                    '"퇴사일" 에 마지막 근무일을 입력합니다.',
                    '"퇴직금 계산하기" 버튼을 클릭합니다.',
                    '총 재직 기간과 예상 퇴직금이 결과 카드에 표시됩니다.',
                ]}
                tips={[
                    '재직 기간이 1년 미만이면 법정 퇴직금이 발생하지 않습니다.',
                    '상여금이나 연차수당이 있다면 평균임금에 포함되어야 정확한 계산이 가능합니다.',
                    '퇴직금은 퇴직 후 IRP(개인형 퇴직연금) 계좌로 수령하면 과세이연 혜택이 있습니다.',
                    '회사가 DC형 퇴직연금을 운영한다면, 이미 적립된 금액이 퇴직급여가 됩니다.',
                ]}
                faqs={faqs}
            />
        </div>
    );
};

export default SeveranceCalculator;
