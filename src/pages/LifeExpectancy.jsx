import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Heart, Activity, Cigarette, Beer, Moon, AlertTriangle, RefreshCw, Share2 } from 'lucide-react';

const LifeExpectancy = () => {
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
        if (step === 1 && !formData.age) return alert('나이를 입력해주세요!');
        setStep(step + 1);
    };

    const calculateLife = () => {
        let baseAge = formData.gender === 'male' ? 80 : 86; // 2024 Korea Avg
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
            title: '성별을 선택해주세요',
            icon: <Heart className="w-12 h-12 text-pink-500 mb-4" />,
            options: [
                { value: 'male', label: '남성', icon: '👦' },
                { value: 'female', label: '여성', icon: '👧' }
            ]
        },
        {
            id: 'age',
            title: '현재 나이를 입력해주세요 (만 나이)',
            icon: <Activity className="w-12 h-12 text-blue-500 mb-4" />,
            type: 'input'
        },
        {
            id: 'smoking',
            title: '흡연을 하시나요?',
            icon: <Cigarette className="w-12 h-12 text-gray-500 mb-4" />,
            options: [
                { value: 'none', label: '비흡연', desc: '피운 적 없음' },
                { value: 'quit', label: '금연 중', desc: '과거엔 피움' },
                { value: 'light', label: '가끔 핌', desc: '하루 반 갑 이하' },
                { value: 'heavy', label: '헤비스모커', desc: '하루 한 갑 이상' }
            ]
        },
        {
            id: 'drinking',
            title: '음주 습관은 어떠신가요?',
            icon: <Beer className="w-12 h-12 text-amber-500 mb-4" />,
            options: [
                { value: 'none', label: '안 마심', desc: '전혀 안 마심' },
                { value: 'moderate', label: '적당히', desc: '주 1~2회 반주' },
                { value: 'heavy', label: '애주가', desc: '주 3회 이상 과음' }
            ]
        },
        {
            id: 'exercise',
            title: '운동은 얼마나 하시나요?',
            icon: <Activity className="w-12 h-12 text-green-500 mb-4" />,
            options: [
                { value: 'none', label: '숨쉬기 운동만', desc: '거의 안 함' },
                { value: 'weekly', label: '주 1~3회', desc: '가벼운 운동' },
                { value: 'daily', label: '꾸준히', desc: '매일 30분 이상' }
            ]
        },
        {
            id: 'sleep',
            title: '평소 수면 질은 어떤가요?',
            icon: <Moon className="w-12 h-12 text-indigo-500 mb-4" />,
            options: [
                { value: 'good', label: '꿀잠 잠', desc: '7시간 이상 숙면' },
                { value: 'bad', label: '피곤함', desc: '불면증 혹은 부족' }
            ]
        },
        {
            id: 'stress',
            title: '평소 스트레스 정도는?',
            icon: <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />,
            options: [
                { value: 'low', label: '평온함', desc: '스트레스 적음' },
                { value: 'normal', label: '보통', desc: '남들 받는 만큼' },
                { value: 'high', label: '폭발 직전', desc: '스트레스 매우 많음' }
            ]
        }
    ];

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            <Helmet>
                <title>기대 수명 계산기 - Tool Hive</title>
                <meta name="description" content="나의 생활 습관을 분석하여 기대 수명과 남은 시간을 계산해보세요." />
            </Helmet>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 min-h-[400px] flex flex-col items-center justify-center text-center transition-all duration-300">
                {step < questions.length ? (
                    // Question Steps
                    <div className="w-full animate-fade-in-up">
                        <div className="mb-8 flex justify-center">
                            {questions[step]?.icon}
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8">
                            {questions[step]?.title}
                        </h2>

                        {questions[step].type === 'input' ? (
                            <div className="flex flex-col items-center gap-4">
                                <input
                                    type="number"
                                    value={formData.age}
                                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                                    onKeyDown={(e) => e.key === 'Enter' && nextStep()}
                                    className="text-4xl font-bold w-32 text-center border-b-2 border-blue-500 outline-none bg-transparent"
                                    placeholder="25"
                                    autoFocus
                                />
                                <button
                                    onClick={nextStep}
                                    className="mt-4 px-8 py-3 bg-blue-500 text-white rounded-full font-bold hover:bg-blue-600 transition-colors"
                                >
                                    다음
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                                {questions[step].options.map((opt) => (
                                    <button
                                        key={opt.value}
                                        onClick={() => handleInput(questions[step].id, opt.value)}
                                        className="p-6 border-2 border-gray-100 dark:border-gray-700 rounded-xl hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-gray-700 transition-all group"
                                    >
                                        <div className="text-xl font-bold mb-1 group-hover:text-blue-600">
                                            {opt.icon && <span className="mr-2">{opt.icon}</span>}
                                            {opt.label}
                                        </div>
                                        {opt.desc && <div className="text-sm text-gray-500 dark:text-gray-400">{opt.desc}</div>}
                                    </button>
                                ))}
                            </div>
                        )}

                        <div className="mt-8 flex gap-2 justify-center">
                            {questions.map((_, i) => (
                                <div
                                    key={i}
                                    className={`w-2 h-2 rounded-full transition-colors ${i === step ? 'bg-blue-500' : 'bg-gray-200'}`}
                                />
                            ))}
                        </div>
                    </div>
                ) : !result ? (
                    // Loading / Calculation Trigger
                    <div className="animate-pulse">
                        <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
                        <div className="text-xl font-bold">결과 분석 중...</div>
                        {setTimeout(calculateLife, 1500) && ""}
                    </div>
                ) : (
                    // Result View
                    <div className="w-full animate-fade-in-up">
                        <div className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-800 text-sm font-bold mb-4">
                            분석 완료
                        </div>
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                            당신의 기대 수명은 <span className="text-blue-600">{result.expectedAge}세</span> 입니다
                        </h2>

                        <div className="my-8 p-6 bg-gray-50 dark:bg-gray-700 rounded-xl">
                            <div className="text-gray-500 mb-2">남은 인생</div>
                            <div className="text-4xl font-extrabold text-gray-800 dark:text-white mb-4">
                                약 {result.remainingDays.toLocaleString()} 일
                            </div>
                            <div className="text-sm text-gray-400">
                                ({result.remainingYears}년)
                            </div>
                        </div>

                        <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                            {result.modifiers > 0
                                ? "건강한 생활 습관 덕분에 평균보다 더 오래 사실 것 같네요! 지금처럼 꾸준히 관리하시면 더 건강하고 활기찬 노후를 보내실 수 있습니다."
                                : "조금만 더 건강에 신경 쓰시면 어떨까요? 술, 담배를 줄이고 운동을 시작하면 기대 수명이 훨씬 늘어날 수 있습니다."}
                        </p>

                        <div className="flex justify-center gap-4">
                            <button
                                onClick={() => {
                                    setStep(0);
                                    setResult(null);
                                    setFormData({ ...formData, age: '' });
                                }}
                                className="flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 font-bold transition-colors"
                            >
                                <RefreshCw className="w-5 h-5 mr-2" />
                                다시 하기
                            </button>
                            <button
                                className="flex items-center px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 font-bold transition-colors"
                                onClick={() => alert('주소가 복사되었습니다!') || navigator.clipboard.writeText(window.location.href)}
                            >
                                <Share2 className="w-5 h-5 mr-2" />
                                공유하기
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LifeExpectancy;
