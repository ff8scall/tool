import React, { useState } from 'react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { Gift, Calendar, Flower, Gem, Sparkles } from 'lucide-react';
import { birthstones, birthFlowers } from '../data/BirthData';
import ShareButtons from '../components/ShareButtons';

const BirthGen = () => {
    const [birthDate, setBirthDate] = useState(new Date().toISOString().split('T')[0]);

    const getBirthData = () => {
        if (!birthDate) return null;
        const date = new Date(birthDate);
        const month = date.getMonth() + 1;
        return {
            month,
            stone: birthstones[month],
            flower: birthFlowers[month]
        };
    };

    const data = getBirthData();

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <SEO
                title="내 탄생석과 탄생화 찾기 - 무료 조회 | Utility Hub"
                description="생일만 입력하면 나의 탄생석과 탄생화, 그리고 그 의미를 무료로 확인할 수 있습니다. 나를 상징하는 보석과 꽃은 무엇일까요?"
                keywords="탄생석, 탄생화, 탄생석조회, 탄생화조회, 생일보석, 생일꽃, 무료운세"
            />

            <div className="text-center space-y-4 py-6">
                <div className="inline-flex items-center justify-center p-3 bg-pink-100 dark:bg-pink-900/30 rounded-full mb-2">
                    <Gift className="w-8 h-8 text-pink-600 dark:text-pink-400" />
                </div>
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-rose-500">
                    탄생석 & 탄생화
                </h1>
                <p className="text-muted-foreground">
                    당신이 태어난 날을 상징하는 보석과 꽃을 찾아보세요.
                </p>
            </div>

            {/* 날짜 선택 */}
            <div className="max-w-md mx-auto bg-card border border-border rounded-xl p-6 shadow-sm">
                <label className="block text-sm font-medium mb-2 flex items-center gap-2 justify-center">
                    <Calendar className="w-4 h-4" />
                    생일 선택
                </label>
                <input
                    type="date"
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                    className="w-full p-3 border border-border rounded-xl bg-background text-center text-lg font-medium focus:ring-2 focus:ring-pink-500 outline-none"
                />
            </div>

            {/* 결과 카드 */}
            {data && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    {/* 탄생석 */}
                    <div className={`rounded-2xl p-8 border-2 ${data.stone.bg} border-opacity-50 flex flex-col items-center text-center space-y-4 shadow-sm`}>
                        <div className="p-4 bg-white dark:bg-gray-800 rounded-full shadow-inner">
                            <Gem className={`w-12 h-12 ${data.stone.color}`} />
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">
                                {data.month}월의 탄생석
                            </h3>
                            <h2 className={`text-3xl font-bold ${data.stone.color}`}>
                                {data.stone.name}
                            </h2>
                        </div>
                        <div className="px-4 py-2 bg-white/50 dark:bg-black/20 rounded-lg">
                            <p className="font-medium text-gray-700 dark:text-gray-200">
                                "{data.stone.meaning}"
                            </p>
                        </div>
                    </div>

                    {/* 탄생화 */}
                    <div className="rounded-2xl p-8 border-2 bg-green-50 border-green-100 dark:bg-green-900/10 dark:border-green-900/30 flex flex-col items-center text-center space-y-4 shadow-sm">
                        <div className="p-4 bg-white dark:bg-gray-800 rounded-full shadow-inner">
                            <Flower className="w-12 h-12 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                            <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-1">
                                {data.month}월의 탄생화
                            </h3>
                            <h2 className="text-3xl font-bold text-green-700 dark:text-green-400">
                                {data.flower.name}
                            </h2>
                        </div>
                        <div className="px-4 py-2 bg-white/50 dark:bg-black/20 rounded-lg">
                            <p className="font-medium text-gray-700 dark:text-gray-200">
                                "{data.flower.meaning}"
                            </p>
                        </div>
                    </div>
                </div>
            )}

            <div className="mt-8">
                <ShareButtons
                    title="나의 탄생석과 탄생화 찾기"
                    description="내 생일을 상징하는 보석과 꽃은 무엇일까요? 무료로 확인해보세요!"
                />
            </div>
        \n            <ToolGuide
                title="탄생석/탄생화"
                intro="월별 탄생석과 탄생화 확인"
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

export default BirthGen;
