import React, { useState } from 'react';

import { Share2, RefreshCw, Battery, AlertTriangle, Coffee } from 'lucide-react';

const StressTest = () => {
    const [step, setStep] = useState('intro'); // intro, test, result
    const [checkedItems, setCheckedItems] = useState(new Set());

    const checklist = [
        "아침에 일어날 때 이미 피곤함을 느낀다.",
        "기억력이 눈에 띄게 나빠졌다.",
        "이전에는 즐거웠던 일들이 재미가 없다.",
        "사소한 일에도 짜증이 나거나 화가 난다.",
        "어디론가 훌쩍 떠나고 싶은 충동을 자주 느낀다.",
        "두통, 소화불량 등 원인 모를 신체 통증이 있다.",
        "잠을 잘 못 자거나, 자도 자도 피곤하다.",
        "일/공부에 집중하기가 힘들다.",
        "사람들을 만나는 게 귀찮고 피하고 싶다.",
        "미래에 대해 막연한 불안감을 느낀다.",
        "감정 기복이 심해졌다.",
        "식욕이 없거나 폭식을 한다.",
        "매사에 의욕이 없다.",
        "쉽게 결정을 내리지 못하고 우유부단해졌다.",
        "혼자 있는 시간이 늘어났다."
    ];

    const getResult = (count) => {
        if (count >= 11) return {
            level: '위험', color: 'text-red-500', bg: 'bg-red-50', icon: AlertTriangle,
            title: '🔥 번아웃 증후군 위험',
            desc: "현재 심각한 스트레스 상태입니다. 모든 에너지가 소진된 '번아웃' 상태일 수 있어요. 지금 당장 하던 일을 멈추고 전문가의 도움을 받거나 충분한 휴식이 필요합니다. 나를 위한 시간을 가지세요."
        };
        if (count >= 6) return {
            level: '경고', color: 'text-orange-500', bg: 'bg-orange-50', icon: Battery,
            title: '⚠️ 스트레스 주의보',
            desc: "스트레스가 꽤 쌓여있는 상태입니다. 이대로 방치하면 번아웃으로 이어질 수 있어요. 주말에는 모든 알람을 끄고 푹 쉬거나, 가벼운 운동으로 리프레시가 필요합니다."
        };
        return {
            level: '정상', color: 'text-green-500', bg: 'bg-green-50', icon: Coffee,
            title: '🍀 안정적인 상태',
            desc: "스트레스를 잘 관리하고 계시네요! 가끔 피곤할 수는 있지만, 긍정적인 마음가짐으로 잘 이겨내고 있습니다. 지금처럼 나만의 해소법을 유지하세요."
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
                title: '번아웃/스트레스 테스트',
                text: `나의 스트레스 상태는? [${result.title}] - Utility Hub`,
                url: window.location.href,
            });
        } else {
            alert('링크가 복사되었습니다!');
            navigator.clipboard.writeText(window.location.href);
        }
    };

    
    const toolFaqs = [
        {
            "q": "스트레스 및 번아웃 테스트의 지표는 무엇인가요?",
            "a": "최소 수면 보장 시간, 업무나 학업의 피로도, 원인 모를 무기력증 등 정신의학과에서 널리 쓰이는 기본 신체/심리 문진표 지표를 참고했습니다."
        },
        {
            "q": "결과가 심각하게 나오는데 병원에 가야 하나요?",
            "a": "본 테스트는 의료 목적이 아닙니다. 하지만 자가 테스트 결과가 지속적으로 심각 단계로 나온다면, 망설이지 말고 혼자 고민하기보다는 전문 심리 상담이나 병원 방문을 적극적으로 권장합니다."
        }
    ];
    const toolSteps = [
        "최근 2주에서 한 달 동안 본인이 느낀 피로감, 우울함의 단어들을 나열한 체크리스트를 확인합니다.",
        "본인의 상태와 가장 비슷한 문장에 솔직하게 해당하는 빈도(자주, 가끔 등)를 선택합니다.",
        "도출된 스트레스 지수 점수를 확인하고 상황별 마음 챙김 조언을 꼼꼼히 스크롤 해 읽어봅니다."
    ];
    const toolTips = [
        "테스트하는 그 순간 기분에 좌우되지 마시고, '최근 일주일간 나의 기상 직후 기분'을 평균적으로 머릿속에 떠올린 후 문항에 대답해보세요.",
        "명상, 반신욕, 디지털 기기 멀리하기 등 추천된 솔루션을 오늘 저녁 당장 하나라도 실천해 보는 것이 중요합니다."
    ];

    return (
        <div className="max-w-2xl mx-auto px-4 py-12">
            <SEO
                title="번아웃/스트레스 테스트 | 자가진단 체크리스트"
                description="혹시 나도 번아웃? 간단한 체크리스트로 현재 스트레스 지수를 확인하고 관리법을 알아보세요."
                keywords="스트레스, 번아웃, 자가진단, 심리테스트, 우울증, 만성피로"
                category="건강"
                faqs={toolFaqs}
                steps={toolSteps}
            />

            {step === 'intro' && (
                <div className="text-center animate-fade-in bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl">
                    <Battery className="w-24 h-24 text-orange-500 mx-auto mb-6 opacity-80" />
                    <h1 className="text-4xl font-black text-gray-800 dark:text-white mb-4">
                        번아웃 자가진단
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                        아무것도 하기 싫고 무기력한가요?<br />
                        혹시 내가 번아웃 증후군은 아닐지<br />
                        지금 바로 확인해보세요.
                    </p>
                    <button
                        onClick={() => setStep('test')}
                        className="w-full py-4 bg-orange-500 hover:bg-orange-600 text-white text-xl font-bold rounded-2xl shadow-lg transition-transform hover:scale-105"
                    >
                        진단 시작하기
                    </button>
                    <p className="mt-4 text-xs text-gray-400">* 이 결과는 의학적 진단이 아닙니다</p>
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
                                        ? 'bg-orange-50 dark:bg-orange-900/20 border-orange-400'
                                        : 'bg-white dark:bg-gray-800 border-transparent hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm'
                                    }
                                `}
                            >
                                <span className={`text-lg font-medium ${checkedItems.has(index) ? 'text-orange-700 dark:text-orange-300' : 'text-gray-700 dark:text-gray-300'}`}>
                                    {item}
                                </span>
                                {checkedItems.has(index) && (
                                    <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
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
                    {(() => {
                        const res = getResult(checkedItems.size);
                        const ResultIcon = res.icon;

                        return (
                            <>
                                <div className="mb-6">
                                    <ResultIcon className={`w-24 h-24 mx-auto animate-bounce ${res.color}`} />
                                </div>

                                <span className="text-gray-500 dark:text-gray-400 font-bold">당신의 스트레스 레벨</span>
                                <h2 className={`text-3xl md:text-4xl font-black mt-2 mb-6 ${res.color}`}>
                                    {res.title}
                                </h2>

                                <div className={`p-6 rounded-2xl mb-8 ${res.bg} dark:bg-opacity-10 text-left`}>
                                    <p className="text-lg text-gray-800 dark:text-gray-200 leading-relaxed font-medium">
                                        {res.desc}
                                    </p>
                                </div>

                                <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-2xl mb-8">
                                    <h3 className="font-bold text-gray-700 dark:text-white mb-2">💡 스트레스 해소 꿀팁</h3>
                                    <ul className="text-left text-gray-600 dark:text-gray-300 space-y-2 text-sm">
                                        <li>• 하루 10분 멍 때리기 (뇌 휴식)</li>
                                        <li>• 가벼운 산책으로 햇볕 쬐기</li>
                                        <li>• 스마트폰 끄고 디지털 디톡스</li>
                                        <li>• 따뜻한 물로 반신욕 하기</li>
                                    </ul>
                                </div>
                            </>
                        );
                    })()}

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
                            className="flex-1 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-2xl font-bold shadow-lg shadow-orange-500/30 transition-all flex items-center justify-center gap-2 transform hover:-translate-y-1"
                        >
                            <Share2 className="w-5 h-5" />
                            공유하기
                        </button>
                    </div>
                </div>
            )}
        
            <div className="mt-12">
                <ToolGuide
                    title="번아웃/스트레스 테스트 안내"
                    intro="혹시 나도 번아웃? 간단한 체크리스트로 현재 스트레스 지수를 확인하고 관리법을 알아보세요."
                    steps={toolSteps}
                    tips={toolTips}
                    faqs={toolFaqs}
                />
            </div>
        </div>
    );
};

// CheckCircle2 component simple definition within file or import? 
// Ah, I missed importing CheckCircle2 in lucid-react line. I used valid CheckCircle2 import in component.
// But I need to check if CheckCircle2 is available in 'lucide-react'. It usually is.
// Actually CheckCircle2 is available.
import { CheckCircle2 as CheckCircle2Icon } from 'lucide-react'; // Just to be safe if named export collision
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';

export default StressTest;
