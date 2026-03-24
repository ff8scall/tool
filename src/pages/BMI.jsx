import React, { useState } from 'react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { Activity, Info, RefreshCw } from 'lucide-react';
import ShareButtons from '../components/ShareButtons';
import { useLanguage } from '../context/LanguageContext';

const BMI = () => {
    const { t, lang } = useLanguage();
    const isEn = lang === 'en';
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [bmi, setBmi] = useState(null);
    const [status, setStatus] = useState('');

    const calculateBMI = () => {
        if (!height || !weight) return;

        const h = parseFloat(height) / 100; // cm to m
        const w = parseFloat(weight);
        const bmiValue = w / (h * h);
        const roundedBMI = bmiValue.toFixed(1);

        setBmi(roundedBMI);

        if (isEn) {
            if (bmiValue < 18.5) setStatus('Underweight');
            else if (bmiValue < 25) setStatus('Normal');
            else if (bmiValue < 30) setStatus('Overweight');
            else if (bmiValue < 35) setStatus('Obese');
            else setStatus('Severely Obese');
        } else {
            // Korean Standards (KSSO) are slightly stricter
            if (bmiValue < 18.5) setStatus('저체중');
            else if (bmiValue < 23) setStatus('정상');
            else if (bmiValue < 25) setStatus('과체중');
            else if (bmiValue < 30) setStatus('비만');
            else setStatus('고도비만');
        }
    };

    const reset = () => {
        setHeight('');
        setWeight('');
        setBmi(null);
        setStatus('');
    };

    const getStatusColor = (s) => {
        switch (s) {
            case '저체중':
            case 'Underweight': 
                return 'text-blue-500 bg-blue-50 dark:bg-blue-900/20 border-blue-200';
            case '정상':
            case 'Normal':
                return 'text-green-500 bg-green-50 dark:bg-green-900/20 border-green-200';
            case '과체중':
            case 'Overweight':
                return 'text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200';
            case '비만':
            case 'Obese':
                return 'text-orange-500 bg-orange-50 dark:bg-orange-900/20 border-orange-200';
            case '고도비만':
            case 'Severely Obese':
                return 'text-red-500 bg-red-50 dark:bg-red-900/20 border-red-200';
            default: return 'text-gray-500';
        }
    };

    const getGaugePosition = () => {
        if (!bmi) return 0;
        // Map BMI 10-40 to 0-100%
        const val = parseFloat(bmi);
        const pos = ((val - 10) / 30) * 100;
        return Math.min(Math.max(pos, 0), 100);
    };

    const bmiFaqs = isEn ? [
        { q: "Is a high BMI always dangerous?", a: "Not necessarily. People with high muscle mass may have a high BMI. We recommend body fat analysis for accurate diagnosis." },
        { q: "Is my data stored on the server?", a: "No, your height and weight are calculated only inside the browser and are not stored externally." }
    ] : [
        { q: "BMI가 높으면 무조건 위험한가요?", a: "아니요, 근육량이 높은 사람은 체중이 무거워 BMI가 높게 측정될 수 있습니다. 정확한 진단은 체지방 분석을 권장합니다." },
        { q: "계산 결과가 서버에 저장되나요?", a: "아니요, 입력하신 키와 몸무게는 브라우저 내부에서만 계산되며 외부에 저장되지 않습니다." }
    ];

    const bmiSteps = isEn ? [
        "Enter your height (cm) and weight (kg).",
        "Click the 'Calculate' button.",
        "Check your BMI score and weight category."
    ] : [
        "신장(cm)과 체중(kg)을 입력하세요.",
        "'계산하기' 버튼을 클릭하세요.",
        "표시되는 BMI 수치와 비만 단계 결과를 확인하세요."
    ];

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <SEO
                title={t('tools.bmi.title')}
                description={t('tools.bmi.description')}
                keywords={isEn ? "BMI calculator, body mass index, obesity measure, ideal weight calculator, health tool" : "BMI계산기, 비만도측정, 체질량지수계산, 표준체중계산기, 다이어트계산기, 무료건강검사, bmi수치"}
                category={isEn ? "Health" : "건강"}
                faqs={bmiFaqs}
                steps={bmiSteps}
            />

            <div className="text-center space-y-4 py-6">
                <div className="inline-flex items-center justify-center p-3 bg-green-100 dark:bg-green-900/30 rounded-full mb-2">
                    <Activity className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-teal-600">
                    {isEn ? 'BMI Calculator' : 'BMI 비만도 계산기'}
                </h1>
                <p className="text-muted-foreground">
                    {isEn ? 'Check your Body Mass Index and assess your health status.' : '나의 체질량지수(BMI)를 확인하고 건강 상태를 점검해보세요.'}
                </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium">{isEn ? 'Height (cm)' : '신장 (cm)'}</label>
                        <input
                            type="number"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            placeholder="175"
                            className="w-full p-3 border border-border rounded-xl bg-background focus:ring-2 focus:ring-green-500 outline-none"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium">{isEn ? 'Weight (kg)' : '체중 (kg)'}</label>
                        <input
                            type="number"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            placeholder="70"
                            className="w-full p-3 border border-border rounded-xl bg-background focus:ring-2 focus:ring-green-500 outline-none"
                            onKeyDown={(e) => e.key === 'Enter' && calculateBMI()}
                        />
                    </div>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={calculateBMI}
                        className="flex-1 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-green-500/20"
                    >
                        {isEn ? 'Calculate' : '계산하기'}
                    </button>
                    <button
                        onClick={reset}
                        className="px-4 py-3 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-xl transition-colors"
                    >
                        <RefreshCw className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {bmi && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                    <div className={`p-6 rounded-xl border-2 ${getStatusColor(status)} text-center space-y-2`}>
                        <h3 className="text-lg font-medium opacity-80">{isEn ? 'My BMI Score' : '나의 BMI 지수'}</h3>
                        <div className="text-5xl font-bold">{bmi}</div>
                        <div className="text-xl font-bold badge inline-block px-4 py-1 rounded-full bg-white/50 dark:bg-black/20">
                            {status}
                        </div>
                    </div>

                    {/* Gauge Visualization */}
                    <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                        <div className="relative h-4 bg-gray-200 dark:bg-gray-700 rounded-full mb-2 overflow-hidden">
                            <div className="absolute inset-y-0 left-0 w-[28%] bg-blue-400 opacity-50"></div> {/* 저체중 ~18.5 */}
                            <div className="absolute inset-y-0 left-[28%] w-[15%] bg-green-400 opacity-50"></div> {/* 정상 ~23/25 */}
                            <div className="absolute inset-y-0 left-[43%] w-[7%] bg-yellow-400 opacity-50"></div> {/* 과체중 ~25 */}
                            <div className="absolute inset-y-0 left-[50%] w-[17%] bg-orange-400 opacity-50"></div> {/* 비만 ~30 */}
                            <div className="absolute inset-y-0 left-[67%] w-[33%] bg-red-400 opacity-50"></div> {/* 고도비만 30+ */}
                        </div>

                        {/* Indicator */}
                        <div className="relative h-6 -mt-5 mb-6">
                            <div
                                className="absolute top-0 w-4 h-4 bg-black dark:bg-white rounded-full border-2 border-white dark:border-gray-900 shadow-md transition-all duration-500"
                                style={{ left: `calc(${getGaugePosition()}% - 8px)` }}
                            ></div>
                            <div
                                className="absolute top-5 text-xs font-bold transform -translate-x-1/2 transition-all duration-500"
                                style={{ left: `${getGaugePosition()}%` }}
                            >
                                {bmi}
                            </div>
                        </div>

                        <div className="flex justify-between text-xs text-muted-foreground">
                            <span>18.5</span>
                            <span>{isEn ? '25' : '23'}</span>
                            <span>{isEn ? '30' : '25'}</span>
                            <span>{isEn ? '35' : '30'}</span>
                        </div>
                        <div className="flex justify-between text-xs font-medium mt-1">
                            <span className="text-blue-500">{isEn ? 'Under' : '저체중'}</span>
                            <span className="text-green-500 pl-4">{isEn ? 'Normal' : '정상'}</span>
                            <span className="text-yellow-500 pl-2">{isEn ? 'Over' : '과체중'}</span>
                            <span className="text-orange-500 pl-2">{isEn ? 'Obese' : '비만'}</span>
                            <span className="text-red-500">{isEn ? 'Extr.' : '고도'}</span>
                        </div>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl flex gap-3 items-start">
                        <Info className="w-5 h-5 text-blue-500 mt-0.5 shrink-0" />
                        <div className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                            <p className="font-bold">{isEn ? 'What is BMI?' : 'BMI(체질량지수)란?'}</p>
                            <p>{isEn 
                                ? "Body Mass Index (BMI) is a simple index of weight-for-height that is commonly used to classify underweight, overweight and obesity in adults."
                                : "키와 몸무게를 이용하여 비만도를 추정하는 지표입니다. 근육량이 많은 경우 BMI가 높게 나올 수 있으니 참고용으로만 활용하세요."}</p>
                        </div>
                    </div>
                </div>
            )}

            <ToolGuide
                title={isEn ? "BMI (Body Mass Index) Calculator" : "BMI (체질량지수) 계산기"}
                intro={isEn 
                    ? "BMI (Body Mass Index) is a value derived from the mass (weight) and height of a person. It is defined as the body mass divided by the square of the body height, and is expressed in units of kg/m²."
                    : "BMI(Body Mass Index)는 자신의 몸무게(kg)를 키의 제곱(m²)으로 나눈 값으로, 성인의 비만도를 판정하는 가장 보편적인 국제 기준입니다. 질병관리청과 대한비만학회의 가이드를 준수하여 한국인 체형에 맞는 정확한 건강 상태를 제시해 드립니다."}
                steps={bmiSteps}
                tips={isEn ? [
                    "BMI does not distinguish between muscle mass and fat mass. Muscular athletes may have high BMI without being obese.",
                    "Measuring waist circumference along with BMI provides a more accurate assessment of abdominal obesity.",
                    "Maintaining a normal weight (BMI 18.5-24.9) is most effective for preventing chronic diseases.",
                    "It is recommended to weigh yourself in light clothing on an empty stomach for accurate measurement."
                ] : [
                    "BMI는 근육량과 지방량을 구분하지 못합니다. 근육질인 운동선수는 BMI가 높게 나와도 비만이 아닐 수 있습니다.",
                    "허리둘레 측정을 병행하면 복부 비만 여부를 더 정확하게 알 수 있습니다.",
                    "정상 체중(BMI 18.5~22.9) 범위를 유지하는 것이 만성 질환 예방에 가장 효과적입니다.",
                    "정확한 측정을 위해 공복 상태에서 가벼운 옷차림으로 몸무게를 재는 것을 추천합니다."
                ]}
                faqs={isEn ? [
                    { q: "Is a high BMI always dangerous?", a: "Not necessarily. People with high muscle mass (like bodybuilders) can have a 'high' BMI but very low body fat. Consult a professional for a detailed assessment." },
                    { q: "Is the criteria different for Asians?", a: "Yes, some health organizations use different thresholds for Asian populations (e.g., Overweight starting at 23) due to higher risk of metabolic diseases at lower BMI." },
                    { q: "Does the same formula apply to age?", a: "The formula is the same for all adults, but for children and teens, BMI-for-age percentiles are used instead." },
                    { q: "Is my data privacy protected?", a: "Absolutely. Your data never leaves your browser; all calculations are performed locally." }
                ] : [
                    { q: "BMI가 높으면 무조건 위험한가요?", a: "아니요, 근육량이 높은 사람은 체중이 무거워 BMI가 높게 측정될 수 있습니다. 정확한 진단은 체지방 분석(InBody 등)을 권장합니다." },
                    { q: "한국인 기준은 서양인과 다른가요?", a: "네, 아시아인은 비교적 낮은 BMI에서도 당뇨 등 대사 질환 위험이 높아 한국은 23부터 과체중, 25부터 비만으로 규정합니다." },
                    { q: "나이가 들어도 기준이 똑같나요?", a: "성인 남녀 모두 동일한 수식을 사용하지만, 노년기에는 약간의 과체중이 오히려 건강에 이롭다는 연구 결과도 있습니다." },
                    { q: "계산 결과가 서버에 저장되나요?", a: "아니요, 입력하신 키와 몸무게는 브라우저 내부에서만 계산되며 외부로 노출되거나 저장되지 않습니다." }
                ]}
            />

            <div className="mt-8">
                <ShareButtons
                    title={isEn ? "BMI Calculator" : "BMI 비만도 계산기"}
                    description={isEn ? "Check your BMI and health status online for free!" : "내 키와 몸무게로 비만도를 확인해보세요!"}
                />
            </div>
        </div>
    );
};

export default BMI;

