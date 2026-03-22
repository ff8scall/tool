import React, { useState } from 'react';
import { RefreshCw, Sparkles } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import ShareButtons from '../components/ShareButtons';
import RelatedTools from '../components/RelatedTools';

const LottoGenerator = () => {
    const [numbers, setNumbers] = useState([]);
    const [history, setHistory] = useState([]);

    const generateNumbers = () => {
        const newNumbers = [];
        while (newNumbers.length < 6) {
            const num = Math.floor(Math.random() * 45) + 1;
            if (!newNumbers.includes(num)) {
                newNumbers.push(num);
            }
        }
        newNumbers.sort((a, b) => a - b);
        setNumbers(newNumbers);
        setHistory(prev => [newNumbers, ...prev.slice(0, 4)]);
    };

    const getNumberColor = (num) => {
        if (num <= 10) return 'bg-yellow-500';
        if (num <= 20) return 'bg-blue-500';
        if (num <= 30) return 'bg-red-500';
        if (num <= 40) return 'bg-gray-600';
        return 'bg-green-500';
    };

    const lottoFaqs = [
        { q: "로또 번호 생성은 무료인가요?", a: "네, 본 서비스는 100% 무료이며 제한 없이 번호를 생성하실 수 있습니다." },
        { q: "생성된 번호의 당첨 확률은 어떤가요?", a: "모든 번호 조합은 수학적으로 동일한 8,145,060분의 1의 확률을 가집니다." }
    ];

    const lottoSteps = [
        "'번호 생성하기' 버튼을 클릭하세요.",
        "생성된 6개의 숫자를 확인하세요. 번호는 자동으로 정렬됩니다.",
        "마음에 드는 조합이 나올 때까지 반복해서 생성할 수 있습니다."
    ];

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <SEO
                title="무료 로또 번호 생성기 | 2026 로또 명당 번호 추출 및 당첨 확률 분석"
                description="오늘의 행운을 잡으세요! 1부터 45까지 무작위로 추출되는 무료 온라인 로또 번호 생성기. 역대 당첨 확률 정보와 번호 색상별 의미, 책임 있는 로또 구매 가이드를 확인하세요."
                keywords="로또번호생성기, 로또자동번호, 로또당첨번호, 무료로또번호, 행운의숫자, 로또확률, 로또명당번호"
                category="운세/재미"
                faqs={lottoFaqs}
                steps={lottoSteps}
            />

            <header className="text-center space-y-2">
                <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
                    <Sparkles className="w-8 h-8 text-yellow-500" />
                    로또 번호 생성기
                </h1>
                <p className="text-muted-foreground">
                    행운의 번호를 생성해보세요!
                </p>
            </header>

            {/* Generate Button */}
            <div className="flex justify-center">
                <button
                    onClick={generateNumbers}
                    className="flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-bold text-lg hover:brightness-110 transition-all shadow-lg hover:shadow-xl"
                >
                    <RefreshCw className="w-6 h-6" />
                    번호 생성하기
                </button>
            </div>

            {/* Current Numbers */}
            {numbers.length > 0 && (
                <div className="bg-card border border-border rounded-xl p-8 shadow-lg">
                    <h2 className="text-xl font-bold mb-4 text-center">생성된 번호</h2>
                    <div className="flex justify-center gap-3 flex-wrap">
                        {numbers.map((num, idx) => (
                            <div
                                key={idx}
                                className={`w-16 h-16 rounded-full ${getNumberColor(num)} flex items-center justify-center text-white font-bold text-2xl shadow-md animate-fade-in`}
                                style={{ animationDelay: `${idx * 0.1}s` }}
                            >
                                {num}
                            </div>
                        ))}
                    </div>

                    {/* Share Buttons */}
                    <div className="mt-4">
                        <ShareButtons
                            title="행운의 로또 번호 생성!"
                            description={`생성된 번호: ${numbers.join(', ')}`}
                        />
                    </div>
                </div>
            )}

            {/* History */}
            {history.length > 0 && (
                <div className="bg-card border border-border rounded-xl p-6">
                    <h2 className="text-lg font-bold mb-4">생성 기록</h2>
                    <div className="space-y-3">
                        {history.map((nums, idx) => (
                            <div key={idx} className="flex gap-2 items-center">
                                <span className="text-sm text-muted-foreground w-8">#{idx + 1}</span>
                                <div className="flex gap-2 flex-wrap">
                                    {nums.map((num, numIdx) => (
                                        <div
                                            key={numIdx}
                                            className={`w-10 h-10 rounded-full ${getNumberColor(num)} flex items-center justify-center text-white font-bold text-sm`}
                                        >
                                            {num}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Educational Content */}
            <div className="space-y-6">
                {/* 로또 번호 생성기란? */}
                <div className="bg-muted/30 rounded-xl p-6">
                    <h3 className="font-bold text-lg mb-4">🎰 로또 번호 생성기란?</h3>
                    <div className="space-y-3 text-sm text-muted-foreground">
                        <p>
                            로또 번호 생성기는 1부터 45까지의 숫자 중 6개를 <strong className="text-foreground">완전히 무작위</strong>로
                            선택해주는 도구입니다. 컴퓨터의 난수 생성 알고리즘을 사용하여 공정하고 예측 불가능한 번호 조합을 만들어냅니다.
                        </p>
                        <div className="bg-background border border-border rounded-lg p-4 mt-4">
                            <p className="font-semibold text-foreground mb-2">번호 색상 의미</p>
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-yellow-500"></div>
                                    <span className="text-xs">1-10</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-blue-500"></div>
                                    <span className="text-xs">11-20</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-red-500"></div>
                                    <span className="text-xs">21-30</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-gray-600"></div>
                                    <span className="text-xs">31-40</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-green-500"></div>
                                    <span className="text-xs">41-45</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 사용 방법 */}
                <div className="bg-muted/30 rounded-xl p-6">
                    <h3 className="font-bold text-lg mb-4">📝 사용 방법</h3>
                    <div className="space-y-3 text-sm text-muted-foreground">
                        <div className="flex items-start gap-3">
                            <span className="text-2xl">1️⃣</span>
                            <div>
                                <p className="font-semibold text-foreground">"번호 생성하기" 버튼 클릭</p>
                                <p>버튼을 클릭할 때마다 새로운 6개의 번호가 생성됩니다.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-2xl">2️⃣</span>
                            <div>
                                <p className="font-semibold text-foreground">생성된 번호 확인</p>
                                <p>번호는 자동으로 오름차순 정렬되어 표시됩니다.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="text-2xl">3️⃣</span>
                            <div>
                                <p className="font-semibold text-foreground">마음에 드는 번호 선택</p>
                                <p>여러 번 생성해보고 마음에 드는 조합을 선택하세요. 최근 5개 기록이 저장됩니다.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 당첨 확률 */}
                <div className="bg-muted/30 rounded-xl p-6">
                    <h3 className="font-bold text-lg mb-4">📊 로또 당첨 확률</h3>
                    <div className="space-y-3 text-sm text-muted-foreground">
                        <p>
                            로또 6/45의 1등 당첨 확률은 <strong className="text-foreground">약 814만분의 1</strong>입니다.
                            이는 45개의 숫자 중 6개를 선택하는 모든 경우의 수인 8,145,060가지 중 하나를 맞춰야 하기 때문입니다.
                        </p>
                        <div className="bg-background border border-border rounded-lg p-4">
                            <p className="font-semibold text-foreground mb-2">등수별 당첨 확률</p>
                            <ul className="space-y-1 list-disc list-inside ml-2">
                                <li><strong className="text-foreground">1등</strong> (6개 일치): 1/8,145,060</li>
                                <li><strong className="text-foreground">2등</strong> (5개 + 보너스): 1/1,357,510</li>
                                <li><strong className="text-foreground">3등</strong> (5개 일치): 1/35,724</li>
                                <li><strong className="text-foreground">4등</strong> (4개 일치): 1/733</li>
                                <li><strong className="text-foreground">5등</strong> (3개 일치): 1/45</li>
                            </ul>
                        </div>
                        <div className="bg-blue-500/10 border border-blue-500/50 rounded-lg p-4 mt-4">
                            <p className="font-semibold text-blue-600 dark:text-blue-400 mb-1">💡 참고</p>
                            <p className="text-xs">
                                모든 번호 조합은 동일한 확률을 가집니다. "1, 2, 3, 4, 5, 6"과 "7, 13, 21, 28, 35, 42"는
                                당첨 확률이 똑같습니다. 특정 패턴이나 번호가 더 유리하다는 것은 미신입니다.
                            </p>
                        </div>
                    </div>
                </div>

                {/* 주의사항 */}
                <div className="bg-yellow-500/10 border border-yellow-500/50 rounded-xl p-6">
                    <h3 className="font-bold text-lg mb-4 text-yellow-600 dark:text-yellow-400">⚠️ 주의사항</h3>
                    <div className="space-y-3 text-sm text-muted-foreground">
                        <div className="flex items-start gap-2">
                            <span>•</span>
                            <p>
                                <strong className="text-foreground">랜덤 생성의 의미</strong>:
                                이 도구는 완전히 무작위로 번호를 생성합니다. 과거 당첨 번호, 통계, 패턴 등을 전혀 고려하지 않습니다.
                            </p>
                        </div>
                        <div className="flex items-start gap-2">
                            <span>•</span>
                            <p>
                                <strong className="text-foreground">당첨 보장 불가</strong>:
                                어떤 번호 조합도 당첨을 보장하지 않습니다. 로또는 순수한 확률 게임입니다.
                            </p>
                        </div>
                        <div className="flex items-start gap-2">
                            <span>•</span>
                            <p>
                                <strong className="text-foreground">책임있는 구매</strong>:
                                로또는 여가 활동으로 즐기세요. 생활비나 저축금으로 과도하게 구매하지 마세요.
                            </p>
                        </div>
                        <div className="flex items-start gap-2">
                            <span>•</span>
                            <p>
                                <strong className="text-foreground">도박 중독 예방</strong>:
                                로또 구매가 습관이 되거나 생활에 지장을 준다면 전문가의 도움을 받으세요.
                            </p>
                        </div>
                        <div className="bg-background border border-border rounded-lg p-3 mt-4">
                            <p className="text-xs">
                                <strong className="text-foreground">도박 문제 상담</strong>: 한국도박문제관리센터 ☎ 1336 (24시간 무료 상담)
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <RelatedTools relatedIds={['compound-interest', 'loan', 'salary-calc']} />
        \n            <ToolGuide
                title="로또 번호 생성기"
                intro="행운의 로또 번호 자동 생성"
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

export default LottoGenerator;
