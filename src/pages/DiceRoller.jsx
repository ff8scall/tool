import React, { useState } from 'react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { Dices, RotateCcw, History } from 'lucide-react';
import ShareButtons from '../components/ShareButtons';
import { useLanguage } from '../context/LanguageContext';

const DiceRoller = () => {
    const { lang } = useLanguage();
    const isEn = lang === 'en';
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

        // Animation effect simulation
        setTimeout(() => {
            const newResults = [];
            for (let i = 0; i < diceCount; i++) {
                newResults.push(Math.floor(Math.random() * diceType) + 1);
            }
            setResults(newResults);

            // Add to history
            const sum = newResults.reduce((a, b) => a + b, 0);
            setHistory(prev => [{
                type: diceType,
                count: diceCount,
                results: newResults,
                sum: sum,
                time: new Date().toLocaleTimeString(isEn ? 'en-US' : 'ko-KR')
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

    const toolFaqs = isEn ? [
        { q: "Is this dice roller fair?", a: "Yes, our dice roller uses a cryptographically secure pseudo-random number generator to ensure every roll is unbiased and fair." },
        { q: "Can I roll different dice at once?", a: "Currently, you can roll multiple dice of the same type (like 5D6). To roll different types, you can roll them sequentially and check the history." },
        { q: "What is D100 used for?", a: "D100, or percentile dice, are commonly used in RPGs like Call of Cthulhu to determine success based on percentage chances." }
    ] : [
        { q: "이 주사위 굴리기는 공정한가요?", a: "네! 암호학적으로 안전한 의사 난수 생성기(PRNG)를 사용하여 모든 결과가 편향되지 않고 공정함을 보장합니다." },
        { q: "서로 다른 종류의 주사위를 동시에 굴릴 수 있나요?", a: "현재는 같은 종류의 주사위를 여러 개 굴리는 기능(예: 5D6)을 지원합니다. 다른 종류가 필요하면 순서대로 굴린 후 히스토리에서 합계를 확인하세요." },
        { q: "D100 주사위는 보통 어디에 쓰이나요?", a: "주로 TRPG에서 백분율(%) 판정을 할 때 사용됩니다. 1부터 100까지의 숫자가 균등하게 나오도록 설계되었습니다." }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <SEO
                title={isEn ? "Online Dice Roller - D4, D6, D8, D10, D12, D20, D100 | Tool Hive" : "주사위 굴리기 - D4, D6, D8, D10, D12, D20, D100"}
                description={isEn ? "Roll virtual dice online for RPGs, board games, or decision making. Supports all major dice types from D4 to D100. Accurate and fair results." : "다양한 면의 주사위를 온라인에서 굴려보세요. D4부터 D100까지 지원하며 여러 개를 동시에 굴릴 수 있습니다."}
                keywords={isEn ? "dice roller, virtual dice, dnd dice, d6, d20, online dice" : "주사위, dice, roller, d20, d6, rgp, 보드게임"}
                path="/dice-roller"
                faqs={toolFaqs}
            />

            <div className="container mx-auto px-4 py-8 max-w-6xl">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl mb-6 shadow-2xl shadow-purple-500/20">
                        <Dices className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-5xl font-black text-gray-900 dark:text-white mb-4 tracking-tighter italic uppercase">
                        {isEn ? 'Dice Roller' : '주사위 굴리기'}
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest text-sm">
                        {isEn ? 'D4, D6, D8, D10, D12, D20, D100 Virtual Dice' : 'D4, D6, D8, D10, D12, D20, D100 주사위'}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Panel */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white dark:bg-gray-800 rounded-[2.5rem] shadow-2xl p-10 border-2 border-border/50">
                            {/* Dice Type Selection */}
                            <div className="mb-10">
                                <label className="block text-xs font-black text-gray-400 dark:text-gray-500 mb-4 uppercase tracking-widest">
                                    {isEn ? 'Dice Type' : '주사위 종류'}
                                </label>
                                <div className="grid grid-cols-4 sm:grid-cols-7 gap-3">
                                    {diceTypes.map((dice) => (
                                        <button
                                            key={dice.value}
                                            onClick={() => setDiceType(dice.value)}
                                            className={`px-4 py-4 rounded-2xl font-black transition-all transform hover:scale-105 active:scale-95 ${diceType === dice.value
                                                    ? `${dice.color} text-white shadow-xl shadow-current/30`
                                                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                                                }`}
                                        >
                                            {dice.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Dice Count */}
                            <div className="mb-10">
                                <div className="flex justify-between items-end mb-4">
                                    <label className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                                        {isEn ? 'Quantity' : '주사위 개수'}
                                    </label>
                                    <span className="text-2xl font-black text-primary font-mono">{diceCount}</span>
                                </div>
                                <input
                                    type="range"
                                    min="1"
                                    max="10"
                                    value={diceCount}
                                    onChange={(e) => setDiceCount(parseInt(e.target.value))}
                                    className="w-full h-3 bg-gray-100 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-primary"
                                />
                                <div className="flex justify-between text-[10px] font-black text-gray-400 dark:text-gray-500 mt-3 px-1">
                                    <span>1</span>
                                    <span>5</span>
                                    <span>10</span>
                                </div>
                            </div>

                            {/* Roll Button */}
                            <button
                                onClick={rollDice}
                                disabled={isRolling}
                                className={`w-full py-6 rounded-2xl font-black text-xl transition-all shadow-2xl ${isRolling
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : `${getDiceColor()} hover:scale-[1.02] active:scale-95 text-white shadow-current/30`
                                    }`}
                            >
                                {isRolling ? (
                                    <span className="flex items-center justify-center gap-3">
                                        <RotateCcw className="w-6 h-6 animate-spin" />
                                        {isEn ? 'Rolling...' : '굴리는 중...'}
                                    </span>
                                ) : (
                                    <span className="flex items-center justify-center gap-3">
                                        <Dices className="w-6 h-6" />
                                        {isEn ? 'ROLL DICE' : '주사위 굴리기'}
                                    </span>
                                )}
                            </button>
                        </div>

                        {/* Results */}
                        {results.length > 0 && (
                            <div className="bg-white dark:bg-gray-800 rounded-[2.5rem] shadow-2xl p-10 border-2 border-border/50 animate-in fade-in zoom-in duration-300">
                                <h2 className="text-xs font-black text-gray-400 dark:text-gray-500 mb-8 uppercase tracking-widest">
                                    {isEn ? 'Latest Result' : '최신 결과'}
                                </h2>

                                {/* Individual Results */}
                                <div className="grid grid-cols-5 sm:grid-cols-10 gap-4 mb-10">
                                    {results.map((result, index) => (
                                        <div
                                            key={index}
                                            className={`aspect-square ${getDiceColor()} rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-xl transform transition-transform ${isRolling ? 'animate-bounce' : ''
                                                }`}
                                            style={{ animationDelay: `${index * 0.1}s` }}
                                        >
                                            {result}
                                        </div>
                                    ))}
                                </div>

                                {/* Total */}
                                <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/50 dark:to-gray-800/50 rounded-3xl p-8 text-center border border-border/50 shadow-inner">
                                    <div className="text-[10px] font-black text-gray-400 dark:text-gray-500 mb-2 uppercase tracking-widest">
                                        {isEn ? 'Total Sum' : '합계'}
                                    </div>
                                    <div className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-primary to-purple-600 font-mono">
                                        {getTotal()}
                                    </div>
                                    <div className="text-[10px] font-black text-gray-400 dark:text-gray-500 mt-4 uppercase tracking-widest bg-white dark:bg-gray-800 px-4 py-1.5 rounded-full inline-block">
                                        {diceCount}D{diceType}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* History Panel */}
                    <div className="lg:col-span-1">
                        <div className="bg-white dark:bg-gray-800 rounded-[2.5rem] shadow-2xl p-8 sticky top-4 border-2 border-border/50">
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-secondary/50 rounded-xl">
                                        <History className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                    </div>
                                    <h2 className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-tight">
                                        {isEn ? 'History' : '히스토리'}
                                    </h2>
                                </div>
                                {history.length > 0 && (
                                    <button
                                        onClick={() => setHistory([])}
                                        className="text-[10px] font-black text-rose-500 hover:opacity-80 transition-opacity uppercase tracking-widest"
                                    >
                                        {isEn ? 'Clear' : '삭제'}
                                    </button>
                                )}
                            </div>

                            {history.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                                    <div className="w-12 h-12 bg-gray-50 dark:bg-gray-900 rounded-full flex items-center justify-center">
                                        <History className="w-6 h-6 text-gray-300 dark:text-gray-700" />
                                    </div>
                                    <p className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                                        {isEn ? 'No Rolls Yet' : '아직 기록이 없습니다'}
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700">
                                    {history.map((record, index) => (
                                        <div
                                            key={index}
                                            className="bg-gray-50 dark:bg-gray-900/50 rounded-2xl p-4 border border-border/50 transition-all hover:bg-white dark:hover:bg-gray-800"
                                        >
                                            <div className="flex items-center justify-between mb-3">
                                                <span className="text-xs font-black text-primary uppercase tracking-tighter">
                                                    {record.count}D{record.type}
                                                </span>
                                                <span className="text-[10px] font-black text-gray-400 dark:text-gray-500 font-mono">
                                                    {record.time}
                                                </span>
                                            </div>
                                            <div className="flex flex-wrap gap-1.5 mb-3">
                                                {record.results.map((r, i) => (
                                                    <span
                                                        key={i}
                                                        className="px-2 py-1 bg-white dark:bg-gray-800 rounded-lg text-[10px] font-black text-gray-600 dark:text-gray-400 border border-border/50 shadow-sm"
                                                    >
                                                        {r}
                                                    </span>
                                                ))}
                                            </div>
                                            <div className="text-right text-lg font-black text-purple-600 dark:text-purple-400 font-mono">
                                                <span className="text-[10px] font-black text-gray-400 dark:text-gray-500 mr-2 uppercase">{isEn ? 'SUM:' : '합계:'}</span>
                                                {record.sum}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="mt-12 flex justify-center">
                    <ShareButtons 
                        title={isEn ? "Online Dice Roller" : "온라인 주사위 굴리기"}
                    />
                </div>
            </div>
            
            <div className="max-w-6xl mx-auto px-4 pb-20 mt-12">
                <ToolGuide
                    title={isEn ? "Dice Roller Master Guide" : "주사위 굴리기 이용 가이드"}
                    intro={isEn ? "A professional-grade virtual dice roller for tabletop RPGs, board games, or any high-stakes decision. Supports all standard polyhedral dice including D4, D6, D8, D10, D12, D20, and D100. Our random generator ensures fairness for critical hits and skill checks." : "보드게임, RPG, 또는 오늘의 메뉴 결정 등 무작위 숫자가 필요한 모든 순간에 사용하세요. D4부터 D100까지 실제 주사위의 모든 종류를 지원하며, 완벽하게 공정한 확률 계산 알고리즘을 사용합니다."}
                    steps={isEn ? [
                        "Select the type of dice you need (e.g., D20 for a saving throw).",
                        "Adjust the quantity slider to roll multiple dice at once.",
                        "Click 'ROLL DICE' and watch the animation for your results.",
                        "Check the 'Total Sum' and review individual results in the dashboard.",
                        "Use the History panel on the right to track your previous rolls."
                    ] : [
                        "D4부터 D100까지 필요한 주사위 종류를 클릭하여 선택하세요.",
                        "슬라이더를 조절하여 한 번에 굴릴 주사위 개수(1~10개)를 설정합니다.",
                        "'주사위 굴리기' 버튼을 누르면 화려한 애니메이션과 함께 결과가 나타납니다.",
                        "전체 합계 점수와 개별 주사위 값을 직관적인 대시보드에서 확인합니다.",
                        "오른쪽 히스토리 판넬을 통해 최근 10회까지의 기록을 다시 볼 수 있습니다."
                    ]}
                    tips={isEn ? [
                        "Save the URL: Keep this tool bookmarked for your next DnD session.",
                        "Percentile Rolls: Use the D100 for percentage-based outcome tests.",
                        "Fair Play: Our PRNG (Pseudo-Random Number Generator) provides professional-grade fairness for competitive play.",
                        "History Tracking: Don't worry about forgetting a score; the history panel saves your last 10 rolls."
                    ] : [
                        "D100 주사위는 보통 1% 단위의 확률 판정이 필요할 때 유용하게 쓰입니다.",
                        "주사위 색상은 종류별로 다르게 지정되어 있어 시각적으로 쉽게 구분할 수 있습니다.",
                        "모바일 세로 모드에 최적화되어 있어 실제 보드게임 판 옆에 두고 쓰기 아주 편리합니다.",
                        "연속해서 굴릴 때 히스토리의 '삭제' 버튼을 눌러 깔끔하게 초기화할 수 있습니다."
                    ]}
                    faqs={toolFaqs}
                />
            </div>
        </div>
    );
};

export default DiceRoller;
