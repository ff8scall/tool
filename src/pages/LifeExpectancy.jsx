import React, { useState } from 'react';
import { Heart, Activity, Cigarette, Beer, Moon, AlertTriangle, RefreshCw, Share2 } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import ShareButtons from '../components/ShareButtons';
import { useLanguage } from '../context/LanguageContext';

const LifeExpectancy = () => {
    const { lang, t } = useLanguage();
    const isEn = lang === 'en';
    const [step, setStep] = useState(0);
    const [result, setResult] = useState(null);
    const [formData, setFormData] = useState({
        gender: '',
        age: '',
        smoking: '',
        drinking: '',
        exercise: '',
        sleep: '',
        stress: ''
    });

    const handleInput = (key, value) => {
        setFormData({ ...formData, [key]: value });
        // Auto advance for selection buttons (except age which is text input)
        if (key !== 'age') {
            setTimeout(() => setStep(step + 1), 300);
        }
    };

    const nextStep = () => {
        if (step === 1 && !formData.age) {
            return alert(isEn ? 'Please enter your age!' : '나이를 입력해주세요!');
        }
        setStep(step + 1);
    };

    const calculateLife = () => {
        let baseAge = formData.gender === 'male' ? 80 : 86; // Estimates
        let modifiers = 0;

        // Smoking
        if (formData.smoking === 'heavy') modifiers -= 8;
        else if (formData.smoking === 'light') modifiers -= 4;
        else if (formData.smoking === 'quit') modifiers += 1;
        else modifiers += 2;

        // Drinking
        if (formData.drinking === 'heavy') modifiers -= 5;
        else if (formData.drinking === 'moderate') modifiers -= 2;
        else modifiers += 1;

        // Exercise
        if (formData.exercise === 'daily') modifiers += 4;
        else if (formData.exercise === 'weekly') modifiers += 2;
        else modifiers -= 2;

        // Sleep
        if (formData.sleep === 'good') modifiers += 2;
        else if (formData.sleep === 'bad') modifiers -= 2;

        // Stress
        if (formData.stress === 'high') modifiers -= 4;
        else if (formData.stress === 'low') modifiers += 2;

        const expectedAge = baseAge + modifiers;
        const currentAge = parseInt(formData.age);
        const remainingYears = Math.max(0, expectedAge - currentAge);
        const remainingDays = remainingYears * 365;

        setResult({
            expectedAge,
            remainingYears,
            remainingDays,
            modifiers
        });
        setStep(step + 1);
    };

    const questions = [
        {
            id: 'gender',
            title: isEn ? 'Please select your gender' : '성별을 선택해주세요',
            icon: <Heart className="w-12 h-12 text-pink-500 mb-4" />,
            options: [
                { value: 'male', label: isEn ? 'Male' : '남성', icon: '👦' },
                { value: 'female', label: isEn ? 'Female' : '여성', icon: '👧' }
            ]
        },
        {
            id: 'age',
            title: isEn ? 'Please enter your current age' : '현재 나이를 입력해주세요 (만 나이)',
            icon: <Activity className="w-12 h-12 text-blue-500 mb-4" />,
            type: 'input'
        },
        {
            id: 'smoking',
            title: isEn ? 'Do you smoke?' : '흡연을 하시나요?',
            icon: <Cigarette className="w-12 h-12 text-gray-500 mb-4" />,
            options: [
                { value: 'none', label: isEn ? 'Never' : '비흡연', desc: isEn ? 'Never smoked' : '피운 적 없음' },
                { value: 'quit', label: isEn ? 'Former' : '금연 중', desc: isEn ? 'Quit smoking' : '과거엔 피움' },
                { value: 'light', label: isEn ? 'Light' : '가끔 핌', desc: isEn ? 'Less than half a pack' : '하루 반 갑 이하' },
                { value: 'heavy', label: isEn ? 'Heavy' : '헤비스모커', desc: isEn ? 'More than a pack a day' : '하루 한 갑 이상' }
            ]
        },
        {
            id: 'drinking',
            title: isEn ? 'How often do you drink?' : '음주 습관은 어떠신가요?',
            icon: <Beer className="w-12 h-12 text-amber-500 mb-4" />,
            options: [
                { value: 'none', label: isEn ? 'None' : '안 마심', desc: isEn ? 'Do not drink' : '전혀 안 마심' },
                { value: 'moderate', label: isEn ? 'Moderate' : '적당히', desc: isEn ? '1-2 times a week' : '주 1~2회 반주' },
                { value: 'heavy', label: isEn ? 'Heavy' : '애주가', desc: isEn ? 'Frequent heavy drinking' : '주 3회 이상 과음' }
            ]
        },
        {
            id: 'exercise',
            title: isEn ? 'How often do you exercise?' : '운동은 얼마나 하시나요?',
            icon: <Activity className="w-12 h-12 text-green-500 mb-4" />,
            options: [
                { value: 'none', label: isEn ? 'None' : '숨쉬기 운동만', desc: isEn ? 'Rarely exercise' : '거의 안 함' },
                { value: 'weekly', label: isEn ? 'Weekly' : '주 1~3회', desc: isEn ? 'Light exercise' : '가벼운 운동' },
                { value: 'daily', label: isEn ? 'Daily' : '꾸준히', desc: isEn ? '30+ min every day' : '매일 30분 이상' }
            ]
        },
        {
            id: 'sleep',
            title: isEn ? 'How is your sleep quality?' : '평소 수면 질은 어떤가요?',
            icon: <Moon className="w-12 h-12 text-indigo-500 mb-4" />,
            options: [
                { value: 'good', label: isEn ? 'Good' : '꿀잠 잠', desc: isEn ? '7+ hours of quality sleep' : '7시간 이상 숙면' },
                { value: 'bad', label: isEn ? 'Poor' : '피곤함', desc: isEn ? 'Insomnia or lack of sleep' : '불면증 혹은 부족' }
            ]
        },
        {
            id: 'stress',
            title: isEn ? 'How much stress do you feel?' : '평소 스트레스 정도는?',
            icon: <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />,
            options: [
                { value: 'low', label: isEn ? 'Low' : '평온함', desc: isEn ? 'Calm and steady' : '스트레스 적음' },
                { value: 'normal', label: isEn ? 'Normal' : '보통', desc: isEn ? 'Average stress' : '남들 받는 만큼' },
                { value: 'high', label: isEn ? 'High' : '폭발 직전', desc: isEn ? 'Very high stress levels' : '스트레스 매우 많음' }
            ]
        }
    ];

    const faqs = isEn ? [
        { q: "Is this medically accurate?", a: "This is a reference tool based on general statistical data. It cannot replace a professional medical diagnosis." },
        { q: "How can I improve my results?", a: "Adopting healthier habits like exercising more, quitting smoking, and managing stress will reflect positively in your predicted life expectancy." }
    ] : [
        { "q": "의학적으로 정확한가요?", "a": "기본적인 통계 자료를 바탕으로 한 예측 알고리즘이며, 전문적인 의료 진단을 대체할 수는 없습니다." },
        { "q": "수명이 짧게 나오면 어떻게 하나요?", "a": "운동량을 늘리고 식습관을 개선해보세요. 생활 변화에 따라 기대 수명이 늘어날 수 있습니다." }
    ];

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            <SEO
                title={t('tools.life-expectancy.title')}
                description={t('tools.life-expectancy.description')}
                keywords={isEn ? "life expectancy, health calculator, longevity, habits, wellness" : "기대수명, 건강계산기, 생활습관, 수명테스트"}
                category={isEn ? "Health" : "건강"}
                faqs={faqs}
            />

            <div className="bg-card border border-border rounded-2xl shadow-xl p-8 min-h-[450px] flex flex-col items-center justify-center text-center transition-all duration-300">
                {step < questions.length ? (
                    <div className="w-full animate-in fade-in slide-in-from-bottom-4">
                        <div className="mb-8 flex justify-center">
                            {questions[step]?.icon}
                        </div>
                        <h2 className="text-2xl font-bold text-foreground mb-8">
                            {questions[step]?.title}
                        </h2>

                        {questions[step].type === 'input' ? (
                            <div className="flex flex-col items-center gap-6">
                                <input
                                    type="number"
                                    value={formData.age}
                                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                                    onKeyDown={(e) => e.key === 'Enter' && nextStep()}
                                    className="text-5xl font-bold w-40 text-center border-b-2 border-primary outline-none bg-transparent text-primary"
                                    placeholder="25"
                                    autoFocus
                                />
                                <button
                                    onClick={nextStep}
                                    className="mt-4 px-10 py-3 bg-primary text-primary-foreground rounded-full font-bold hover:brightness-110 transition-all shadow-lg"
                                >
                                    {isEn ? 'Next' : '다음'}
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                                {questions[step].options.map((opt) => (
                                    <button
                                        key={opt.value}
                                        onClick={() => handleInput(questions[step].id, opt.value)}
                                        className="p-6 border-2 border-input rounded-xl hover:border-primary hover:bg-muted transition-all group text-left"
                                    >
                                        <div className="text-xl font-bold mb-1 group-hover:text-primary flex items-center">
                                            {opt.icon && <span className="mr-2">{opt.icon}</span>}
                                            {opt.label}
                                        </div>
                                        {opt.desc && <div className="text-sm text-muted-foreground">{opt.desc}</div>}
                                    </button>
                                ))}
                            </div>
                        )}

                        <div className="mt-12 flex gap-3 justify-center">
                            {questions.map((_, i) => (
                                <div
                                    key={i}
                                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i === step ? 'bg-primary scale-125' : 'bg-muted'}`}
                                />
                            ))}
                        </div>
                    </div>
                ) : !result ? (
                    <div className="flex flex-col items-center animate-pulse">
                        <div className="w-16 h-16 bg-muted rounded-full mb-4"></div>
                        <div className="text-xl font-bold text-muted-foreground">{isEn ? 'Analyzing results...' : '결과 분석 중...'}</div>
                        {setTimeout(calculateLife, 1500) && ""}
                    </div>
                ) : (
                    <div className="w-full animate-in zoom-in-95 fade-in duration-500">
                        <div className="inline-block px-4 py-1 rounded-full bg-green-100 text-green-800 text-xs font-bold mb-4">
                            {isEn ? 'Analysis Complete' : '분석 완료'}
                        </div>
                        <h2 className="text-3xl font-bold text-foreground mb-4 leading-tight">
                            {isEn ? (
                                <>Your Life Expectancy is <span className="text-primary">{result.expectedAge} years old</span></>
                            ) : (
                                <>당신의 기대 수명은 <span className="text-primary">{result.expectedAge}세</span> 입니다</>
                            )}
                        </h2>

                        <div className="my-8 p-8 bg-muted/50 rounded-2xl border border-border">
                            <div className="text-muted-foreground mb-2 text-sm uppercase tracking-wider font-bold">{isEn ? 'Remaining Life' : '남음 인생'}</div>
                            <div className="text-5xl font-extrabold text-foreground mb-2">
                                {isEn ? 'Approx.' : '약'} {result.remainingDays.toLocaleString()} {isEn ? 'Days' : '일'}
                            </div>
                            <div className="text-gray-400 font-medium">
                                ({result.remainingYears} {isEn ? 'Years' : '년'})
                            </div>
                        </div>

                        <p className="text-muted-foreground mb-10 leading-relaxed max-w-lg mx-auto">
                            {result.modifiers > 0
                                ? (isEn ? "Your healthy habits seem to pay off! You are projected to live longer than average. Keep up the great lifestyle!" : "건강한 생활 습관 덕분에 평균보다 더 오래 사실 것 같네요! 지금처럼 꾸준히 관리하세요.")
                                : (isEn ? "Small changes can make a big difference. Reducing alcohol/smoking and increasing activity could significantly add more years to your life." : "조금만 더 건강에 신경 쓰시면 어떨까요? 술, 담배를 줄이고 운동을 시작하면 기대 수명이 늘어날 수 있습니다.")}
                        </p>

                        <div className="flex flex-wrap justify-center gap-4">
                            <button
                                onClick={() => {
                                    setStep(0);
                                    setResult(null);
                                    setFormData({ ...formData, age: '' });
                                }}
                                className="flex items-center px-8 py-3 bg-muted text-foreground rounded-xl hover:bg-muted-foreground/10 font-bold transition-all border border-border"
                            >
                                <RefreshCw className="w-5 h-5 mr-2" />
                                {isEn ? 'Restart' : '다시 하기'}
                            </button>
                            <button
                                className="flex items-center px-8 py-3 bg-primary text-primary-foreground rounded-xl hover:brightness-110 font-bold transition-all shadow-lg"
                                onClick={() => {
                                    navigator.clipboard.writeText(window.location.href);
                                    alert(isEn ? 'Link copied to clipboard!' : '주소가 복사되었습니다!');
                                }}
                            >
                                <Share2 className="w-5 h-5 mr-2" />
                                {isEn ? 'Share Result' : '공유하기'}
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <ShareButtons />

            <div className="mt-12">
                <ToolGuide
                    title={isEn ? "Using the Life Expectancy Calculator" : "기대 수명 계산기 안내"}
                    intro={isEn ? "Understand how your current lifestyle impacts your long-term health and estimated lifespan." : "나의 생활 습관을 분석하여 기대 수명과 남은 시간을 계산해보세요."}
                    steps={isEn ? [
                        "Honestly report your smoking, drinking, and exercise habits.",
                        "Select your sleep quality and daily stress levels.",
                        "View your estimated lifespan and personalized health tips."
                    ] : [
                        "음주 빈도, 흡연 여부, 주간 운동 시간 등을 정직하게 입력합니다.",
                        "수면 시간과 스트레스 정도를 선택합니다.",
                        "나의 남은 예상 수명과 건강 조언을 확인합니다."
                    ]}
                    tips={isEn ? [
                        "If the result is lower than expected, treat it as a wake-up call to start healthy habits today.",
                        "Even small increases in daily movement can add years to your life.",
                        "Regular medical checkups are essential for a long and healthy life."
                    ] : [
                        "수명이 짧게 나왔다면 오늘부터 바로 가벼운 보행이라도 시작해보세요.",
                        "결과창의 건강 개선 팁들을 실생활에 적용해 보세요.",
                        "정기적인 검진은 최고의 장수 비결입니다."
                    ]}
                    faqs={faqs}
                />
            </div>
        </div>
    );
};

export default LifeExpectancy;
