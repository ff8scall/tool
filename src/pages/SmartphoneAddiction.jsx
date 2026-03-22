import React, { useState } from 'react';

import { Share2, RefreshCw, Smartphone, AlertTriangle, CheckCircle2 } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';

const SmartphoneAddiction = () => {
    const [step, setStep] = useState('intro'); // intro, test, result
    const [checkedItems, setCheckedItems] = useState(new Set());

    const checklist = [
        "스마트폰이 없으면 손이 떨리거나 불안하다.",
        "스마트폰을 하느라 계획한 일(공부/업무)을 미룬 적이 있다.",
        "스마트폰 사용 시간을 줄이려 해봤지만 실패했다.",
        "스마트폰을 하느라 수면 시간이 부족하다.",
        "식사 중에도 스마트폰을 손에서 놓지 않는다.",
        "화장실에 갈 때 스마트폰을 꼭 챙겨간다.",
        "스마트폰 알림 환청을 들은 적이 있다.",
        "스마트폰 배터리가 20% 미만이면 초조하다.",
        "눈이 아프거나 목/손목 통증이 있어도 스마트폰을 계속한다.",
        "사람들과 대화하는 것보다 스마트폰을 보는 게 더 편하다.",
        "스마트폰이 보이지 않으면 당황해서 찾게 된다.",
        "아침에 눈 뜨자마자 스마트폰부터 확인한다.",
        "길을 걸으면서도 스마트폰을 본다 (스몸비).",
        "스마트폰 사용 시간 때문에 주변 사람(가족/친구)과 다툰 적이 있다.",
        "특별한 목적 없이 습관적으로 스마트폰을 켠다."
    ];

    const getResult = (count) => {
        if (count >= 11) return {
            level: '고위험군', color: 'text-red-500', bg: 'bg-red-50', icon: AlertTriangle,
            title: '🚨 스마트폰 중독 고위험',
            desc: "당신은 스마트폰과 한몸이 되었습니다! 일상생활에 심각한 지장을 줄 수 있는 단계입니다. 디지털 디톡스가 시급하며, 전문가의 상담이 필요할 수도 있습니다. 지금 당장 폰을 내려놓고 창밖을 보세요!"
        };
        if (count >= 6) return {
            level: '잠재적 위험', color: 'text-orange-500', bg: 'bg-orange-50', icon: Smartphone,
            title: '⚠️ 스마트폰 중독 위험',
            desc: "스마트폰 의존도가 꽤 높은 상태입니다. 스스로 조절하지 않으면 중독으로 이어질 수 있습니다. 사용 시간을 정해두거나 특정 앱 사용을 제한하는 노력이 필요합니다."
        };
        return {
            level: '양호', color: 'text-green-500', bg: 'bg-green-50', icon: CheckCircle2,
            title: '✅ 건강한 사용 습관',
            desc: "당신은 스마트폰을 아주 현명하게 사용하고 있습니다! 필요할 때만 스마트폰을 이용하며, 디지털 기기에 지배당하지 않는 주체적인 삶을 살고 계시네요. 훌륭합니다!"
        };
    };

    const toggleItem = (index) => {
        const newChecked = new Set(checkedItems);
        if (newChecked.has(index)) {
            newChecked.delete(index);
        } else {
            newChecked.add(index);
        }
        setCheckedItems(newChecked);
    };

    const finishTest = () => {
        setStep('result');
    };

    const resetTest = () => {
        setStep('intro');
        setCheckedItems(new Set());
    };

    const shareResult = () => {
        const result = getResult(checkedItems.size);
        if (navigator.share) {
            navigator.share({
                title: '스마트폰 중독 테스트',
                text: `나의 스마트폰 중독 레벨은? [${result.title}] - Utility Hub`,
                url: window.location.href,
            });
        } else {
            alert('링크가 복사되었습니다!');
            navigator.clipboard.writeText(window.location.href);
        }
    };

    
    const toolFaqs = [
        {
            "q": "스몸비가 무슨 뜻인가요?",
            "a": "스마트폰(Smartphone)과 좀비(Zombie)의 합성어로, 이동 중에도 스마트폰에 시선을 고정한 채 걷는 사람들을 의미합니다."
        },
        {
            "q": "스마트폰 중독 자가진단의 신뢰도는 어느 정도인가요?",
            "a": "일반적인 디지털 중독 진단 척도 문항을 베이스로 사용자가 간단히 체크할 수 있게 구성한 것으로, 자신의 현 상태를 객관적으로 점검하는 훌륭한 참고 지표가 됩니다."
        }
    ];
    const toolSteps = [
        "화장실에 갈 때 폰을 지참하는지, 폰이 없으면 불안한지 등의 체크리스트 항목을 확인합니다.",
        "해당되는 사항에 모두 '네' 혹은 체크박스를 표시합니다.",
        "총점을 기준으로 정상/주의/위험군 중 나의 의존도 상태를 확인합니다."
    ];
    const toolTips = [
        "결과가 위험군으로 나왔다면 하루 1시간 '스마트폰 없는 시간(디지털 디톡스)'을 의도적으로 가져보세요.",
        "잠들기 전 알람만 맞추고 폰을 멀리 두는 습관 하나만으로도 중독 수치를 현저하게 낮출 수 있습니다."
    ];

    return (
        <div className="max-w-2xl mx-auto px-4 py-12">
            <SEO
                title="스마트폰 중독 테스트 | 디지털 디톡스 자가진단"
                description="혹시 나도 스몸비? 스마트폰 중독 자가진단표를 통해 나의 의존도를 확인하고 디지털 건강을 챙겨보세요."
                keywords="스마트폰중독, 디지털디톡스, 스몸비, 자가진단, 중독테스트, smartphone addiction"
                category="건강"
                faqs={toolFaqs}
                steps={toolSteps}
            />

            {step === 'intro' && (
                <div className="text-center animate-fade-in bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl">
                    <Smartphone className="w-24 h-24 text-blue-500 mx-auto mb-6 animate-pulse" />
                    <h1 className="text-3xl md:text-4xl font-black text-gray-800 dark:text-white mb-4">
                        스마트폰 중독 테스트
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                        화장실 갈 때 폰 안 가져가면 불안한가요?<br />
                        하루 종일 폰만 보고 있나요?<br />
                        나의 스마트폰 의존도를 확인해보세요.
                    </p>
                    <button
                        onClick={() => setStep('test')}
                        className="w-full py-4 bg-blue-500 hover:bg-blue-600 text-white text-xl font-bold rounded-2xl shadow-lg transition-transform hover:scale-105"
                    >
                        진단 시작하기
                    </button>
                    <p className="mt-4 text-xs text-gray-400">* 과학기술정보통신부 진단 척도 참고</p>
                </div>
            )}

            {step === 'test' && (
                <div className="animate-fade-in">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
                        해당되는 항목을 모두 선택하세요
                    </h2>

                    <div className="space-y-3 mb-8">
                        {checklist.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => toggleItem(index)}
                                className={`p-4 rounded-xl cursor-pointer transition-all border-2 flex items-center justify-between
                                    ${checkedItems.has(index)
                                        ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-400'
                                        : 'bg-white dark:bg-gray-800 border-transparent hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm'
                                    }
                                `}
                            >
                                <span className={`text-lg font-medium ${checkedItems.has(index) ? 'text-blue-700 dark:text-blue-300' : 'text-gray-700 dark:text-gray-300'}`}>
                                    {item}
                                </span>
                                {checkedItems.has(index) && (
                                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                        <CheckCircle2 className="w-4 h-4 text-white" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="sticky bottom-6 p-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-lg border border-gray-100 dark:border-gray-800">
                        <div className="flex justify-between items-center mb-4">
                            <span className="font-bold text-gray-500 dark:text-gray-400">선택된 항목: {checkedItems.size}개</span>
                        </div>
                        <button
                            onClick={finishTest}
                            className="w-full py-4 bg-gray-800 hover:bg-black dark:bg-white dark:hover:bg-gray-200 text-white dark:text-gray-900 text-xl font-bold rounded-xl transition-all"
                        >
                            결과 확인하기
                        </button>
                    </div>
                </div>
            )}

            {step === 'result' && (
                <div className="animate-scale-in text-center bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl">
                    <div className="mb-6">
                        {getResult(checkedItems.size).icon({ className: `w-24 h-24 mx-auto animate-bounce ${getResult(checkedItems.size).color}` })}
                    </div>

                    <span className="text-gray-500 dark:text-gray-400 font-bold">진단 결과</span>
                    <h2 className={`text-3xl md:text-4xl font-black mt-2 mb-6 ${getResult(checkedItems.size).color}`}>
                        {getResult(checkedItems.size).title}
                    </h2>

                    <div className={`p-6 rounded-2xl mb-8 ${getResult(checkedItems.size).bg} dark:bg-opacity-10 text-left`}>
                        <p className="text-lg text-gray-800 dark:text-gray-200 leading-relaxed font-medium">
                            {getResult(checkedItems.size).desc}
                        </p>
                    </div>

                    <div className="flex gap-4 justify-center">
                        <button
                            onClick={resetTest}
                            className="flex-1 py-4 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-2xl font-bold transition-all flex items-center justify-center gap-2"
                        >
                            <RefreshCw className="w-5 h-5" />
                            다시하기
                        </button>
                        <button
                            onClick={shareResult}
                            className="flex-1 py-4 bg-blue-500 hover:bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-500/30 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-1"
                        >
                            <Share2 className="w-5 h-5" />
                            공유하기
                        </button>
                    </div>
                </div>
            )}
        
            <div className="mt-12">
                <ToolGuide
                    title="스마트폰 중독 테스트 안내"
                    intro="혹시 나도 스몸비? 스마트폰 중독 자가진단표를 통해 나의 의존도를 확인하고 디지털 건강을 챙겨보세요."
                    steps={toolSteps}
                    tips={toolTips}
                    faqs={toolFaqs}
                />
            </div>
        </div>
    );
};

export default SmartphoneAddiction;
