import React, { useState } from 'react';
import { Clock, Calculator as CalcIcon } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';

const WorkHoursCalculator = () => {
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
        if (totalMinutes < 0) totalMinutes += 24 * 60; // 다음날로 넘어가는 경우

        totalMinutes -= breakTime;

        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;

        return { hours, minutes, totalMinutes };
    };

    const { hours, minutes, totalMinutes } = calculateHours();
    const dailyWage = hourlyWage ? (totalMinutes / 60 * parseFloat(hourlyWage)) : 0;
    const monthlyWage = dailyWage * workDays;

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <SEO
                title="근무 시간 계산기 | 시급 계산, 일급 월급 자동 계산"
                description="출근·퇴근 시간과 휴게 시간을 입력하면 실제 근무 시간과 일급·월급을 자동 계산합니다. 시급에 근무 시간을 곱해 예상 월급까지 한번에 확인하세요."
                keywords="근무시간계산기, 시급계산기, 일급계산, 월급계산, 근로시간계산, 알바시급계산, 출퇴근시간계산"
            />

            <header className="text-center space-y-2">
                <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
                    <Clock className="w-8 h-8 text-primary" />
                    근무 시간 계산기
                </h1>
                <p className="text-muted-foreground">
                    출퇴근 시간으로 근무 시간과 월급을 계산하세요
                </p>
            </header>

            {/* Input */}
            <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">출근 시간</label>
                        <input
                            type="time"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">퇴근 시간</label>
                        <input
                            type="time"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                            className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">휴게 시간 (분)</label>
                    <input
                        type="number"
                        value={breakTime}
                        onChange={(e) => setBreakTime(parseInt(e.target.value) || 0)}
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">시급 (원)</label>
                        <input
                            type="number"
                            value={hourlyWage}
                            onChange={(e) => setHourlyWage(e.target.value)}
                            placeholder="예: 10000"
                            className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-2">월 근무일수</label>
                        <input
                            type="number"
                            value={workDays}
                            onChange={(e) => setWorkDays(parseInt(e.target.value) || 0)}
                            className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>
                </div>
            </div>

            {/* Results */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-border rounded-xl p-6">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">일일 근무 시간</h3>
                    <p className="text-3xl font-bold text-primary">
                        {hours}시간 {minutes}분
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                        총 {totalMinutes}분
                    </p>
                </div>

                {hourlyWage && (
                    <>
                        <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-border rounded-xl p-6">
                            <h3 className="text-sm font-medium text-muted-foreground mb-2">일급</h3>
                            <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                                {dailyWage.toLocaleString('ko-KR')}원
                            </p>
                        </div>

                        <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-border rounded-xl p-6 md:col-span-2">
                            <h3 className="text-sm font-medium text-muted-foreground mb-2">월급 (예상)</h3>
                            <p className="text-4xl font-bold text-yellow-600 dark:text-yellow-400">
                                {monthlyWage.toLocaleString('ko-KR')}원
                            </p>
                            <p className="text-sm text-muted-foreground mt-2">
                                월 {workDays}일 근무 기준
                            </p>
                        </div>
                    </>
                )}
            </div>

            <div className="bg-muted/30 rounded-xl p-6 text-sm text-muted-foreground">
                <h3 className="font-bold text-foreground mb-2">💡 안내</h3>
                <ul className="space-y-1 list-disc list-inside">
                    <li>2024년 최저시급: 9,860원</li>
                    <li>주 40시간 근무 시 월 209시간 (주휴수당 포함)</li>
                    <li>야간 근무(22:00~06:00)는 통상임금의 50% 가산</li>
                    <li>주휴수당은 별도로 계산해야 합니다.</li>
                </ul>
            
        
            </div>
            <ToolGuide
                title="근무 시간 계산기 사용 가이드"
                intro="근무 시간 계산기는 출근·퇴근 시간과 휴게 시간을 입력하면 실제 근무 시간(시간·분)과 일급·월급을 즉시 계산합니다. 아르바이트부터 정규직까지, 시급을 알고 있다면 예상 급여를 한번에 파악할 수 있습니다."
                steps={[
                    '"출근 시간"과 "퇴근 시간"을 입력합니다. (24시간 형식)',
                    '"휴게 시간(분)"을 입력합니다. 법정 휴게의무: 근무 4시간당 30분, 8시간당 1시간 이상.',
                    '"시급(원)"을 입력하면 일급이 자동 계산됩니다.',
                    '"월 근무일수"를 입력하면 예상 월급이 계산됩니다.',
                    '결과 카드에서 일일 근무 시간과 예상 급여를 확인합니다.',
                ]}
                tips={[
                    '2025년 최저시급: 10,030원. 내 시급이 이보다 낮다면 최저임금 계산기에서 확인하세요.',
                    '야간 근무(22:00~06:00)는 통상임금의 50%가 가산됩니다. 이 계산기는 가산임금은 포함하지 않습니다.',
                    '주 15시간 이상 근무 시 주휴수당이 발생합니다. 월 209시간 기준이 주휴 포함 기준입니다.',
                    '식대, 교통비 등 비과세 항목은 실수령액에 추가로 더해집니다.',
                ]}
                faqs={[
                    { q: '주휴수당이 뭔가요?', a: '주 15시간 이상 근무 시 1주일에 1일분의 유급휴일 수당을 받을 권리입니다. 예: 주 40시간 × 시급 10,030원 = 주휴수당 포함 시 월 약 2,096,270원.' },
                    { q: '야간 근무 시 시급은 어떻게 계산하나요?', a: '야간(22:00~06:00) 근무 시 통상임금의 50%를 가산하여 지급해야 합니다. 시급 10,000원이라면 야간 시간당 15,000원이 됩니다.' },
                    { q: '2025년 최저임금 월 환산은 얼마인가요?', a: '2025년 최저시급 10,030원 × 월 209시간(주 40시간+주휴) = 2,096,270원입니다.' },
                ]}
            />
            </div>
    );
};
export default WorkHoursCalculator;


