import React, { useState, useEffect, useRef } from 'react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { Activity, Calendar, Info, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import ShareButtons from '../components/ShareButtons';
import { useLanguage } from '../context/LanguageContext';

const Biorhythm = () => {
    const { lang } = useLanguage();
    const isEn = lang === 'en';
    const [birthDate, setBirthDate] = useState('');
    const [targetDate, setTargetDate] = useState(new Date().toISOString().split('T')[0]);
    const [bioData, setBioData] = useState(null);
    const canvasRef = useRef(null);

    const calculateBiorhythm = () => {
        if (!birthDate || !targetDate) return;

        const birth = new Date(birthDate);
        const target = new Date(targetDate);

        // Calculate days lived
        const diffTime = Math.abs(target - birth);
        const daysLived = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        // Cycles: Physical 23, Emotional 28, Intellectual 33
        const physical = Math.sin((2 * Math.PI * daysLived) / 23) * 100;
        const emotional = Math.sin((2 * Math.PI * daysLived) / 28) * 100;
        const intellectual = Math.sin((2 * Math.PI * daysLived) / 33) * 100;

        setBioData({
            physical,
            emotional,
            intellectual,
            daysLived
        });

        // Draw chart after state update
        setTimeout(() => {
            if (canvasRef.current) {
                drawChart(birth, target);
            }
        }, 10);
    };

    useEffect(() => {
        calculateBiorhythm();
    }, [birthDate, targetDate]);

    const drawChart = (birth, target) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        const centerY = height / 2;

        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Draw grid
        ctx.strokeStyle = '#e5e7eb'; // gray-200
        ctx.lineWidth = 1;

        // Center line (0%)
        ctx.beginPath();
        ctx.moveTo(0, centerY);
        ctx.lineTo(width, centerY);
        ctx.stroke();

        // Target date line (Center vertical)
        ctx.strokeStyle = '#9ca3af'; // gray-400
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(width / 2, 0);
        ctx.lineTo(width / 2, height);
        ctx.stroke();
        ctx.setLineDash([]);

        // Draw curves
        const daysRange = 15; // +/- 15 days
        const pixelsPerDay = width / (daysRange * 2);

        const drawWave = (cycle, color) => {
            ctx.beginPath();
            ctx.strokeStyle = color;
            ctx.lineWidth = 2;

            for (let i = -daysRange; i <= daysRange; i++) {
                const dayOffset = i;
                const currentTarget = new Date(target);
                currentTarget.setDate(target.getDate() + dayOffset);

                const diffTime = Math.abs(currentTarget - birth);
                const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                const value = Math.sin((2 * Math.PI * days) / cycle);
                const x = (width / 2) + (dayOffset * pixelsPerDay);
                const y = centerY - (value * (height / 2 - 20)); // Scale to fit height with padding

                if (i === -daysRange) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.stroke();
        };

        drawWave(23, '#22c55e'); // Green (Physical)
        drawWave(28, '#ef4444'); // Red (Emotional)
        drawWave(33, '#3b82f6'); // Blue (Intellectual)
    };

    const getStatus = (value) => {
        if (value > 80) return { label: isEn ? 'Peak' : '최고조', icon: TrendingUp, color: 'text-green-600 bg-green-100' };
        if (value > 20) return { label: isEn ? 'High' : '고조기', icon: TrendingUp, color: 'text-blue-600 bg-blue-100' };
        if (value < -80) return { label: isEn ? 'Trough' : '최저조', icon: TrendingDown, color: 'text-red-600 bg-red-100' };
        if (value < -20) return { label: isEn ? 'Low' : '저조기', icon: TrendingDown, color: 'text-orange-600 bg-orange-100' };
        return { label: isEn ? 'Transition' : '전환기', icon: Minus, color: 'text-gray-600 bg-gray-100' };
    };

    const faqs = isEn ? [
        { q: "What is a Biorhythm?", a: "A biorhythm is an attempt to predict various aspects of a person's life through simple mathematical cycles. The theory states that a person's life is influenced by rhythmic biological cycles that affect their ability in various domains, such as mental, physical, and emotional." },
        { q: "What do the three cycles represent?", a: "Physical (23 days) affects coordination, strength, and health. Emotional (28 days) affects creativity, sensitivity, and mood. Intellectual (33 days) affects memory, alertness, and logical reasoning." },
        { q: "Are transition days important?", a: "Transition days (when the line crosses the zero mark) are often considered 'critical' days where one might be more prone to accidents or emotional instability." }
    ] : [
        { "q": "바이오리듬이란 무엇인까요?", "a": "신체, 감성, 지성 3가지 주기가 태어난 순간부터 일정한 패턴으로 반복된다는 이론입니다." },
        { "q": "전환기란 무엇인가요?", "a": "리듬이 (+)에서 (-)로, 또는 그 반대로 교차하는 날을 말하며 에너지가 불안정한 시기로 봅니다." },
        { "q": "이 결과는 과학적 근거가 있나요?", "a": "바이오리듬은 통계적 경향성을 보여주는 참고 도구로, 오늘의 컨디션을 가볍게 체크하는 용도로 즐겨주세요." }
    ];

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <SEO
                title={isEn ? "Biorhythm Calculator - Physical, Emotional, Intellectual Cycles" : "무료 바이오리듬 계산기 - 신체, 감성, 지성 리듬 | Utility Hub"}
                description={isEn ? "Calculate your biorhythm based on your birth date. Track your condition trends with our visual chart." : "생년월일만 입력하면 오늘의 신체, 감성, 지성 바이오리듬을 무료로 확인할 수 있습니다."}
                keywords={isEn ? "biorhythm, physical cycle, emotional rhythm, intellectual cycle, health tool" : "바이오리듬, 신체리듬, 감성리듬, 지성리듬, 컨디션체크"}
                faqs={faqs}
            />

            <div className="text-center space-y-4 py-6">
                <div className="inline-flex items-center justify-center p-3 bg-green-100 dark:bg-green-900/30 rounded-full mb-2">
                    <Activity className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-600">
                    {isEn ? 'Biorhythm' : '바이오리듬'}
                </h1>
                <p className="text-muted-foreground">
                    {isEn ? 'Predict your daily physical, emotional, and intellectual status.' : '나의 신체, 감성, 지성 리듬을 확인하고 하루를 계획해보세요.'}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Inputs */}
                <div className="md:col-span-1 space-y-6">
                    <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                            <Calendar className="w-5 h-5" />
                            {isEn ? 'Date Input' : '날짜 입력'}
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">{isEn ? 'Birth Date' : '생년월일'}</label>
                                <input
                                    type="date"
                                    value={birthDate}
                                    onChange={(e) => setBirthDate(e.target.value)}
                                    className="w-full p-2 border border-border rounded-lg bg-background"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">{isEn ? 'Reference Date' : '기준일'}</label>
                                <input
                                    type="date"
                                    value={targetDate}
                                    onChange={(e) => setTargetDate(e.target.value)}
                                    className="w-full p-2 border border-border rounded-lg bg-background"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Legend */}
                    <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                            <Info className="w-5 h-5" />
                            {isEn ? 'Legend' : '범례'}
                        </h3>
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded-full bg-green-500"></div>
                                <span className="text-sm">{isEn ? 'Physical (23d) - Stamina' : '신체 (23일 주기) - 체력, 건강'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded-full bg-red-500"></div>
                                <span className="text-sm">{isEn ? 'Emotional (28d) - Mood' : '감성 (28일 주기) - 기분, 신경'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                                <span className="text-sm">{isEn ? 'Intellectual (33d) - Focus' : '지성 (33일 주기) - 두뇌, 집중력'}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Chart Area */}
                <div className="md:col-span-2 space-y-6">
                    {bioData ? (
                        <>
                            {/* Daily Status */}
                            <div className="grid grid-cols-3 gap-4">
                                {[
                                    { label: isEn ? 'Physical' : '신체', value: bioData.physical, color: 'text-green-600', bg: 'bg-green-50' },
                                    { label: isEn ? 'Emotional' : '감성', value: bioData.emotional, color: 'text-red-600', bg: 'bg-red-50' },
                                    { label: isEn ? 'Intellectual' : '지성', value: bioData.intellectual, color: 'text-blue-600', bg: 'bg-blue-50' }
                                ].map((item) => {
                                    const status = getStatus(item.value);
                                    const StatusIcon = status.icon;
                                    return (
                                        <div key={item.label} className={`rounded-xl p-4 border text-center ${item.bg} dark:bg-opacity-10 shadow-sm transition-transform hover:scale-105`}>
                                            <div className="text-xs text-muted-foreground mb-1 font-medium">{item.label}</div>
                                            <div className={`text-2xl font-bold mb-1 ${item.color}`}>
                                                {Math.round(item.value)}%
                                            </div>
                                            <div className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${status.color}`}>
                                                <StatusIcon className="w-3 h-3" />
                                                {status.label}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Chart */}
                            <div className="bg-card border border-border rounded-xl p-6 shadow-sm overflow-hidden">
                                <h3 className="font-bold text-lg mb-4 text-center">{isEn ? 'Biorhythm Graph (±15 days)' : '바이오리듬 그래프 (±15일)'}</h3>
                                <div className="relative w-full overflow-x-auto">
                                    <canvas
                                        ref={canvasRef}
                                        width={600}
                                        height={300}
                                        className="w-full h-auto min-w-[500px]"
                                    />
                                </div>
                                <p className="text-center text-xs text-muted-foreground mt-2">
                                    {isEn ? `The dashed line is the reference date (${targetDate}).` : `가운데 점선이 기준일(${targetDate})입니다.`}
                                </p>
                            </div>
                        </>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center bg-muted/30 rounded-xl border border-dashed border-border p-12 text-center">
                            <Activity className="w-16 h-16 text-muted-foreground/50 mb-4" />
                            <h3 className="text-xl font-bold text-muted-foreground">{isEn ? 'Enter Birth Date' : '생년월일을 입력해주세요'}</h3>
                            <p className="text-muted-foreground/80">
                                {isEn ? 'Select your birth date on the left to analyze your rhythms.' : '좌측에서 생년월일을 선택하면 바이오리듬이 분석됩니다.'}
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-8">
                <ShareButtons
                    title={isEn ? "Free Biorhythm Calculator" : "무료 바이오리듬 계산기"}
                    description={isEn ? "Track your physical, emotional, and intellectual status daily!" : "오늘 나의 신체, 감성, 지성 리듬은 어떨까요? 무료로 확인해보세요!"}
                />
            </div>

            <ToolGuide
                title={isEn ? "Biorhythm Guide" : "바이오리듬 가이드"}
                intro={isEn ? "Understand the biological cycles that influence your daily life." : "신체/감성/지성 리듬 확인 도구입니다."}
                steps={isEn ? [
                    "Select your 'Birth Date' accurately.",
                    "Choose a 'Reference Date' (usually today).",
                    "Check your daily score for each category.",
                    "Observe the trend chart to plan for upcoming peaks or lows."
                ] : [
                    "정확한 생년월일을 선택하세요.",
                    "보고 싶은 기준일을 선택합니다. (기본은 오늘)",
                    "오늘의 신체, 감성, 지성 점수를 확인합니다.",
                    "그래프를 통해 앞으로 15일간의 컨디션 변화를 확인해보세요."
                ]}
                tips={isEn ? [
                    "Physical Peak: Great for sports or intense physical activities.",
                    "Emotional Transition: Be mindful of your relationships and mood swings.",
                    "Intellectual Low: Maybe double-check your work or avoid complex decisions.",
                    "Biorhythms are best used for self-reflection and general awareness."
                ] : [
                    "신체 최고조: 운동이나 격렬한 활동을 하기에 가장 좋은 날입니다.",
                    "감성 전환기: 기분이 급변하거나 예민해질 수 있으니 대인관계에 유의하세요.",
                    "지성 저조기: 중요한 결정이나 복잡한 업무는 다시 한번 검토해보는 것이 좋습니다."
                ]}
                faqs={faqs}
            />
        </div>
    );
};

export default Biorhythm;
