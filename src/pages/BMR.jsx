import React, { useState } from 'react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { Heart, Info, RefreshCw, Flame } from 'lucide-react';
import ShareButtons from '../components/ShareButtons';

const BMR = () => {
    const [gender, setGender] = useState('male');
    const [age, setAge] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [activity, setActivity] = useState('1.2');
    const [result, setResult] = useState(null);

    const calculateBMR = () => {
        if (!age || !height || !weight) return;

        const w = parseFloat(weight);
        const h = parseFloat(height);
        const a = parseFloat(age);

        // Mifflin-St Jeor Equation (More accurate than Harris-Benedict)
        let bmrValue = (10 * w) + (6.25 * h) - (5 * a);
        if (gender === 'male') {
            bmrValue += 5;
        } else {
            bmrValue -= 161;
        }

        const tdeeValue = bmrValue * parseFloat(activity);

        setResult({
            bmr: Math.round(bmrValue),
            tdee: Math.round(tdeeValue)
        });
    };

    const reset = () => {
        setAge('');
        setHeight('');
        setWeight('');
        setResult(null);
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <SEO
                title="BMR 기초대사량 계산기 - 하루 권장 칼로리 | Utility Hub"
                description="나의 기초대사량(BMR)과 활동 대사량(TDEE)을 계산하여 하루 권장 칼로리를 확인해보세요."
                keywords="BMR계산기, 기초대사량, 활동대사량, TDEE, 칼로리계산, 다이어트"
            />

            <div className="text-center space-y-4 py-6">
                <div className="inline-flex items-center justify-center p-3 bg-orange-100 dark:bg-orange-900/30 rounded-full mb-2">
                    <Flame className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                </div>
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-red-500">
                    기초대사량(BMR) 계산기
                </h1>
                <p className="text-muted-foreground">
                    숨만 쉬어도 소비되는 에너지와 하루 총 소비 칼로리를 계산합니다.
                </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-6">
                {/* 성별 선택 */}
                <div className="flex gap-4">
                    <button
                        onClick={() => setGender('male')}
                        className={`flex-1 py-3 rounded-xl border-2 font-bold transition-all ${gender === 'male'
                                ? 'border-blue-500 bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                                : 'border-border text-muted-foreground hover:bg-accent'
                            }`}
                    >
                        남성
                    </button>
                    <button
                        onClick={() => setGender('female')}
                        className={`flex-1 py-3 rounded-xl border-2 font-bold transition-all ${gender === 'female'
                                ? 'border-pink-500 bg-pink-50 text-pink-600 dark:bg-pink-900/20 dark:text-pink-400'
                                : 'border-border text-muted-foreground hover:bg-accent'
                            }`}
                    >
                        여성
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium">나이 (세)</label>
                        <input
                            type="number"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            placeholder="25"
                            className="w-full p-3 border border-border rounded-xl bg-background focus:ring-2 focus:ring-orange-500 outline-none"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium">신장 (cm)</label>
                        <input
                            type="number"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            placeholder="175"
                            className="w-full p-3 border border-border rounded-xl bg-background focus:ring-2 focus:ring-orange-500 outline-none"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-sm font-medium">체중 (kg)</label>
                        <input
                            type="number"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            placeholder="70"
                            className="w-full p-3 border border-border rounded-xl bg-background focus:ring-2 focus:ring-orange-500 outline-none"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="block text-sm font-medium">활동량 수준</label>
                    <select
                        value={activity}
                        onChange={(e) => setActivity(e.target.value)}
                        className="w-full p-3 border border-border rounded-xl bg-background focus:ring-2 focus:ring-orange-500 outline-none"
                    >
                        <option value="1.2">활동 거의 없음 (운동 안 함)</option>
                        <option value="1.375">가벼운 활동 (주 1~3회 운동)</option>
                        <option value="1.55">보통 활동 (주 3~5회 운동)</option>
                        <option value="1.725">많은 활동 (주 6~7회 운동)</option>
                        <option value="1.9">매우 많은 활동 (선수급 운동)</option>
                    </select>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={calculateBMR}
                        className="flex-1 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-orange-500/20"
                    >
                        계산하기
                    </button>
                    <button
                        onClick={reset}
                        className="px-4 py-3 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-xl transition-colors"
                    >
                        <RefreshCw className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {result && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4">
                    {/* BMR Result */}
                    <div className="bg-card border border-border rounded-xl p-6 shadow-sm text-center space-y-2">
                        <div className="inline-flex p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400 mb-2">
                            <Heart className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-medium text-muted-foreground">기초대사량 (BMR)</h3>
                        <div className="text-4xl font-bold text-foreground">
                            {result.bmr.toLocaleString()} <span className="text-lg font-medium text-muted-foreground">kcal</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                            아무것도 안 하고 숨만 쉴 때 소비되는 에너지
                        </p>
                    </div>

                    {/* TDEE Result */}
                    <div className="bg-card border border-border rounded-xl p-6 shadow-sm text-center space-y-2 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10"></div>
                        <div className="relative">
                            <div className="inline-flex p-3 bg-orange-100 dark:bg-orange-900/30 rounded-full text-orange-600 dark:text-orange-400 mb-2">
                                <Flame className="w-6 h-6" />
                            </div>
                            <h3 className="text-lg font-medium text-muted-foreground">하루 총 소비량 (TDEE)</h3>
                            <div className="text-4xl font-bold text-orange-600 dark:text-orange-400">
                                {result.tdee.toLocaleString()} <span className="text-lg font-medium text-muted-foreground">kcal</span>
                            </div>
                            <p className="text-xs text-muted-foreground">
                                현재 활동량을 고려한 하루 총 에너지 소비량
                            </p>
                        </div>
                    </div>

                    <div className="md:col-span-2 bg-muted/50 p-4 rounded-xl text-sm text-muted-foreground flex gap-3">
                        <Info className="w-5 h-5 shrink-0 mt-0.5" />
                        <div>
                            <p className="font-bold mb-1">다이어트 팁</p>
                            <ul className="list-disc pl-4 space-y-1">
                                <li>체중 감량: 하루 총 소비량(TDEE)보다 <strong>300~500kcal 적게</strong> 섭취하세요.</li>
                                <li>체중 증량: 하루 총 소비량(TDEE)보다 <strong>300~500kcal 많이</strong> 섭취하세요.</li>
                                <li>근육 유지: 하루 총 소비량과 비슷하게 섭취하며 단백질 비중을 높이세요.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}

            <div className="mt-8">
                <ShareButtons
                    title="기초대사량(BMR) 계산기"
                    description="나의 기초대사량과 하루 권장 칼로리를 확인해보세요!"
                />
            </div>
        \n            <ToolGuide
                title="BMR 계산기"
                intro="기초대사량 및 하루 권장 칼로리 계산"
                steps={[
                    "원하시는 옵션이나 값을 화면에 안내된 순서대로 정확하게 기입해 주세요.",
                    "제시된 항목과 보기를 꼼꼼하게 살펴보고 본인에게 맞는 것을 선택합니다.",
                    "모든 입력을 완료한 후 결과 화면에서 계산된 수치나 분석된 내용을 확인합니다.",
                    "결과가 마음에 든다면 캡처하거나 공유하기 버튼을 눌러 지인들에게 공유해보세요!"
                ]}
                tips={[
                    "결과값이 예상과 다르다면 입력한 숫자나 단위를 한 번 더 확인해보는 것이 좋습니다.",
                    "제공되는 다양한 부가 옵션을 함께 활용하면 훨씬 구체적인 형태의 맞춤형 결과를 얻을 수 있습니다.",
                    "모바일과 데스크톱 환경 모두에 완벽하게 최적화되어 있으니 언제 어디서든 편리하게 이용해 보세요."
                ]}
                faqs={[
                    { "q": "이 도구들은 정말로 모두 무료인가요?", "a": "네! Tool Hive에서 제공하는 모든 도구 모음과 심리 테스트들은 가입 등의 번거로운 절차 없이 누구나 100% 무료로 무제한 사용할 수 있습니다." },
                    { "q": "제가 입력한 개인적인 정보 데이터가 서버에 남나요?", "a": "아니요, 사용자가 입력하는 이름, 숫자, 금액 등의 모든 데이터는 방문자의 기기 내 브라우저에서만 실시간으로 연산되며 어떠한 경우에도 외부 서버로 전송되거나 저장되지 않으므로 안심하셔도 됩니다." },
                    { "q": "버튼을 눌러도 반응이 없거나 에러가 생깁니다.", "a": "브라우저의 일시적인 캐시 문제일 수 있습니다. 키보드의 F5 버튼을 누르거나 새로고침을 진행한 후 다시 시도해 보시길 권장하며, 문제가 계속된다면 다른 브라우저 앱을 이용해 보세요." }
                ]}
            />
        </div>
    );
};

export default BMR;
