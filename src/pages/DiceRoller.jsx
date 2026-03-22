import React, { useState } from 'react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { Dices, RotateCcw, History } from 'lucide-react';
import ShareButtons from '../components/ShareButtons';

const DiceRoller = () => {
    const [diceType, setDiceType] = useState(6);
    const [diceCount, setDiceCount] = useState(1);
    const [results, setResults] = useState([]);
    const [isRolling, setIsRolling] = useState(false);
    const [history, setHistory] = useState([]);

    const diceTypes = [
        { value: 4, name: 'D4', color: 'bg-red-500' },
        { value: 6, name: 'D6', color: 'bg-blue-500' },
        { value: 8, name: 'D8', color: 'bg-green-500' },
        { value: 10, name: 'D10', color: 'bg-yellow-500' },
        { value: 12, name: 'D12', color: 'bg-purple-500' },
        { value: 20, name: 'D20', color: 'bg-pink-500' },
        { value: 100, name: 'D100', color: 'bg-indigo-500' }
    ];

    const rollDice = () => {
        setIsRolling(true);

        // 애니메이션 효과
        setTimeout(() => {
            const newResults = [];
            for (let i = 0; i < diceCount; i++) {
                newResults.push(Math.floor(Math.random() * diceType) + 1);
            }
            setResults(newResults);

            // 히스토리에 추가
            const sum = newResults.reduce((a, b) => a + b, 0);
            setHistory(prev => [{
                type: diceType,
                count: diceCount,
                results: newResults,
                sum: sum,
                time: new Date().toLocaleTimeString('ko-KR')
            }, ...prev.slice(0, 9)]);

            setIsRolling(false);
        }, 500);
    };

    const getTotal = () => {
        return results.reduce((sum, val) => sum + val, 0);
    };

    const getDiceColor = () => {
        return diceTypes.find(d => d.value === diceType)?.color || 'bg-gray-500';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <SEO
                title="주사위 굴리기 - D4, D6, D8, D10, D12, D20, D100"
                description="다양한 면의 주사위를 온라인에서 굴려보세요. D4부터 D100까지 지원하며 여러 개를 동시에 굴릴 수 있습니다."
                keywords={['주사위', 'dice', 'roller', 'd20', 'd6', 'rpg']}
                path="/dice-roller"
            />

            <div className="container mx-auto px-4 py-8 max-w-6xl">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl mb-4 shadow-lg">
                        <Dices className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                        주사위 굴리기
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        D4, D6, D8, D10, D12, D20, D100 주사위
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Panel */}
                    <div className="lg:col-span-2">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-6">
                            {/* Dice Type Selection */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                    주사위 종류
                                </label>
                                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                                    {diceTypes.map((dice) => (
                                        <button
                                            key={dice.value}
                                            onClick={() => setDiceType(dice.value)}
                                            className={`px-4 py-3 rounded-lg font-bold transition-all ${diceType === dice.value
                                                    ? `${dice.color} text-white shadow-lg scale-105`
                                                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                                                }`}
                                        >
                                            {dice.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Dice Count */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                                    주사위 개수: {diceCount}개
                                </label>
                                <input
                                    type="range"
                                    min="1"
                                    max="10"
                                    value={diceCount}
                                    onChange={(e) => setDiceCount(parseInt(e.target.value))}
                                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                                />
                                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                                    <span>1</span>
                                    <span>5</span>
                                    <span>10</span>
                                </div>
                            </div>

                            {/* Roll Button */}
                            <button
                                onClick={rollDice}
                                disabled={isRolling}
                                className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${isRolling
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : `${getDiceColor()} hover:shadow-xl hover:scale-105`
                                    } text-white`}
                            >
                                {isRolling ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <RotateCcw className="w-5 h-5 animate-spin" />
                                        굴리는 중...
                                    </span>
                                ) : (
                                    '🎲 주사위 굴리기'
                                )}
                            </button>
                        </div>

                        {/* Results */}
                        {results.length > 0 && (
                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                                    결과
                                </h2>

                                {/* Individual Results */}
                                <div className="grid grid-cols-5 sm:grid-cols-10 gap-3 mb-6">
                                    {results.map((result, index) => (
                                        <div
                                            key={index}
                                            className={`aspect-square ${getDiceColor()} rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-lg ${isRolling ? 'animate-bounce' : 'animate-pulse'
                                                }`}
                                            style={{ animationDelay: `${index * 0.1}s` }}
                                        >
                                            {result}
                                        </div>
                                    ))}
                                </div>

                                {/* Total */}
                                <div className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl p-6 text-center">
                                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                        합계
                                    </div>
                                    <div className="text-5xl font-bold text-purple-600 dark:text-purple-400">
                                        {getTotal()}
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                                        {diceCount}D{diceType}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* History Panel */}
                    <div className="lg:col-span-1">
                        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 sticky top-4">
                            <div className="flex items-center gap-2 mb-4">
                                <History className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                                    히스토리
                                </h2>
                            </div>

                            {history.length === 0 ? (
                                <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-8">
                                    아직 기록이 없습니다
                                </p>
                            ) : (
                                <div className="space-y-3 max-h-[600px] overflow-y-auto">
                                    {history.map((record, index) => (
                                        <div
                                            key={index}
                                            className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-sm"
                                        >
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="font-bold text-gray-900 dark:text-white">
                                                    {record.count}D{record.type}
                                                </span>
                                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                                    {record.time}
                                                </span>
                                            </div>
                                            <div className="flex flex-wrap gap-1 mb-2">
                                                {record.results.map((r, i) => (
                                                    <span
                                                        key={i}
                                                        className="px-2 py-1 bg-white dark:bg-gray-600 rounded text-xs font-mono"
                                                    >
                                                        {r}
                                                    </span>
                                                ))}
                                            </div>
                                            <div className="text-right font-bold text-purple-600 dark:text-purple-400">
                                                합계: {record.sum}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {history.length > 0 && (
                                <button
                                    onClick={() => setHistory([])}
                                    className="w-full mt-4 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-sm"
                                >
                                    히스토리 지우기
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <ShareButtons />
                </div>
            </div>
        \n            <ToolGuide
                title="주사위 굴리기"
                intro="D4, D6, D8, D10, D12, D20, D100 주사위"
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

export default DiceRoller;
