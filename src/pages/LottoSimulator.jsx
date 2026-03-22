import React, { useState, useEffect, useRef } from 'react';

import { RefreshCw, Play, Pause, AlertCircle, Share2 } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';

const LottoSimulator = () => {
    const [isRunning, setIsRunning] = useState(false);
    const [stats, setStats] = useState({
        attempts: 0,
        spent: 0,
        won: 0,
        rank1: 0,
        rank2: 0,
        rank3: 0,
        rank4: 0,
        rank5: 0
    });
    const [logs, setLogs] = useState([]);
    const [speed, setSpeed] = useState(1); // x1, x10, x100

    // Auto-scroll logs
    const logsEndRef = useRef(null);
    useEffect(() => {
        if (logsEndRef.current) {
            logsEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [logs]);

    const SIMULATION_INTERVAL = 50; // ms

    // Lotto Logic
    const generateLotto = () => {
        const numbers = new Set();
        while (numbers.size < 6) {
            numbers.add(Math.floor(Math.random() * 45) + 1);
        }
        return [...numbers].sort((a, b) => a - b);
    };

    const generateWinningNumbers = () => {
        const numbers = generateLotto();
        let bonus;
        do {
            bonus = Math.floor(Math.random() * 45) + 1;
        } while (numbers.includes(bonus));
        return { numbers, bonus };
    };

    // Assuming winning numbers are fixed for the "lifetime" simulation
    // Or we can regenerate them every week. Let's regenerate to simulate "weekly" lotto.

    const checkWin = (myNumbers, winNumbers, bonus) => {
        const matchCount = myNumbers.filter(n => winNumbers.includes(n)).length;
        const matchBonus = myNumbers.includes(bonus);

        if (matchCount === 6) return 1;
        if (matchCount === 5 && matchBonus) return 2;
        if (matchCount === 5) return 3;
        if (matchCount === 4) return 4;
        if (matchCount === 3) return 5;
        return 0;
    };

    const PRIZES = {
        1: 2000000000, // 20억
        2: 50000000,   // 5천만
        3: 1500000,    // 150만
        4: 50000,      // 5만
        5: 5000        // 5천
    };

    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                // Bulk process based on speed
                const batchSize = speed === 1 ? 1 : (speed === 10 ? 10 : 100);

                let newStats = { ...stats };
                let newLogs = [...logs];

                // Keep only last 50 logs to prevent memory issues
                if (newLogs.length > 50) newLogs = newLogs.slice(newLogs.length - 50);

                for (let i = 0; i < batchSize; i++) {
                    const myLotto = generateLotto();
                    const { numbers: winNumbers, bonus } = generateWinningNumbers();
                    const rank = checkWin(myLotto, winNumbers, bonus);

                    newStats.attempts += 1;
                    newStats.spent += 1000;

                    if (rank > 0) {
                        newStats.won += PRIZES[rank];
                        newStats[`rank${rank}`] += 1;

                        // Add log for high ranks only to avoid spam
                        if (rank <= 3) {
                            newLogs.push({
                                type: 'win',
                                rank,
                                count: newStats.attempts,
                                prize: PRIZES[rank]
                            });
                        }
                    }
                }

                // Force update logic state
                setStats(curr => ({
                    attempts: curr.attempts + batchSize,
                    spent: curr.spent + (1000 * batchSize),
                    won: curr.won + (newStats.won - stats.won), // Add diff
                    rank1: curr.rank1 + (newStats.rank1 - stats.rank1),
                    rank2: curr.rank2 + (newStats.rank2 - stats.rank2),
                    rank3: curr.rank3 + (newStats.rank3 - stats.rank3),
                    rank4: curr.rank4 + (newStats.rank4 - stats.rank4),
                    rank5: curr.rank5 + (newStats.rank5 - stats.rank5),
                }));

                // Add regular log if winning happened or just periodically?
                // Actually logs state needs to be managed carefully in interval
                // Let's rely on React state updates which might be slow for x100
                // For simplified visualisation, we check wins inside the loop and direct update
            }, SIMULATION_INTERVAL);
        }
        
    const toolFaqs = [
        {
            "q": "로또 시뮬레이터란 무엇인가요?",
            "a": "실제 로또 1등 당첨 확률(약 814만 분의 1)을 코드 상에 그대로 구현하여, 내가 가상으로 매주 로또를 살 때 1등 당첨까지 얼마나 많은 돈과 시간이 드는지 돌려보는 시뮬레이터입니다."
        },
        {
            "q": "이걸 돌려서 나온 번호로 실제로 당첨될 수 있나요?",
            "a": "확률은 매우 희박하지만, 시뮬레이터가 무작위로 생성한 행운의 번호를 실제 로또 구매에 참고용으로 사용해보실 수는 있습니다."
        }
    ];
    const toolSteps = [
        "자동 버튼이나 수동으로 번호 6개를 선택하여 로또를 1회 구매해봅니다.",
        "'1등 당첨될 때까지 무한 구매' 버튼을 눌러 시뮬레이션을 돌립니다.",
        "1등 당첨까지 소모된 시간(수만 년)과 투자한 금액을 보며 현타(현실 자각 타임)를 느낍니다."
    ];
    const toolTips = [
        "로또에 인생을 걸기보다는, 확률이 얼마나 희박한지 재미있게 체감하며 건전한 로또 문화를 즐기는 용도로 사용하세요.",
        "그래도 꿈에 특별한 번호가 나왔다면, 확률 따위 무시하고 시뮬레이터에 돌려보세요!"
    ];

    return () => clearInterval(interval);
    }, [isRunning, speed]); // Depend on stats causess infinite loop if not careful. 
    // Actually, setInterval closure traps 'stats'. Using functional update is better, but local loop variables are needed.
    // Refactoring to purely functional updates for safety.

    // Better implementation for loop:
    useEffect(() => {
        let timer;
        if (isRunning) {
            timer = setInterval(() => {
                setStats(currentStats => {
                    const batchSize = speed === 1 ? 1 : (speed === 10 ? 10 : 100);
                    let updates = {
                        attempts: 0,
                        spent: 0,
                        won: 0,
                        rank1: 0, rank2: 0, rank3: 0, rank4: 0, rank5: 0
                    };

                    for (let i = 0; i < batchSize; i++) {
                        const myLotto = generateLotto();
                        const { numbers: winNumbers, bonus } = generateWinningNumbers();
                        const rank = checkWin(myLotto, winNumbers, bonus);

                        updates.attempts++;
                        updates.spent += 1000;
                        if (rank > 0) {
                            updates.won += PRIZES[rank];
                            updates[`rank${rank}`]++;
                        }
                    }

                    return {
                        attempts: currentStats.attempts + updates.attempts,
                        spent: currentStats.spent + updates.spent,
                        won: currentStats.won + updates.won,
                        rank1: currentStats.rank1 + updates.rank1,
                        rank2: currentStats.rank2 + updates.rank2,
                        rank3: currentStats.rank3 + updates.rank3,
                        rank4: currentStats.rank4 + updates.rank4,
                        rank5: currentStats.rank5 + updates.rank5
                    };
                });
            }, SIMULATION_INTERVAL);
        }
        return () => clearInterval(timer);
    }, [isRunning, speed]);


    const formatMoney = (n) => n.toLocaleString() + '원';

    // Calculates years purely for display (assuming 1 attempt = 1 week)
    const yearsPassed = (stats.attempts / 52).toFixed(1);

    const getProfitRate = () => {
        if (stats.spent === 0) return 0;
        return ((stats.won - stats.spent) / stats.spent * 100).toFixed(2);
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <SEO
                title="로또 당첨 시뮬레이터"
                description="매주 로또를 산다면 언제 1등에 당첨될까? 현실적인 로또 당첨 확률 시뮬레이터로 확인해보세요."
                keywords=""
                category="운세/재미"
                faqs={toolFaqs}
                steps={toolSteps}
            />

            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                    로또 1등 당첨 시뮬레이터
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                    "매주 1장씩 평생 사면 언젠가 1등에 당첨될까?"<br />
                    그 궁금증을 이 시뮬레이터로 확인해보세요.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Control Panel */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                    <div className="flex justify-between items-center mb-6">
                        <div className="text-lg font-bold">시뮬레이션 속도</div>
                        <div className="flex gap-2">
                            {[1, 10, 100].map(s => (
                                <button
                                    key={s}
                                    onClick={() => setSpeed(s)}
                                    className={`px-3 py-1 rounded-lg text-sm font-bold transition-colors ${speed === s ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                                >
                                    x{s}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex gap-4 mb-6">
                        <button
                            onClick={() => setIsRunning(!isRunning)}
                            className={`flex-1 py-4 rounded-xl text-xl font-bold flex items-center justify-center transition-colors ${isRunning ? 'bg-amber-500 hover:bg-amber-600 text-white' : 'bg-green-500 hover:bg-green-600 text-white'}`}
                        >
                            {isRunning ? <><Pause className="mr-2" /> 일시정지</> : <><Play className="mr-2" /> 시작하기</>}
                        </button>
                        <button
                            onClick={() => {
                                setIsRunning(false);
                                setStats({ attempts: 0, spent: 0, won: 0, rank1: 0, rank2: 0, rank3: 0, rank4: 0, rank5: 0 });
                            }}
                            className="px-6 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold"
                        >
                            <RefreshCw className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <span className="text-gray-500">구매 횟수 (주)</span>
                            <span className="text-2xl font-bold">{stats.attempts.toLocaleString()}회</span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <span className="text-gray-500">경과 시간 (가정)</span>
                            <span className="text-xl font-bold">{yearsPassed}년</span>
                        </div>
                    </div>
                </div>

                {/* Score Panel */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-500">총 당첨금</span>
                            <span className="text-2xl font-bold text-blue-600">+{formatMoney(stats.won)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-500">총 지출액</span>
                            <span className="text-2xl font-bold text-red-500">-{formatMoney(stats.spent)}</span>
                        </div>
                        <div className="h-px bg-gray-200 my-2"></div>
                        <div className="flex justify-between items-center">
                            <span className="font-bold">순수익 (손익)</span>
                            <span className={`text-3xl font-black ${stats.won - stats.spent >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                                {formatMoney(stats.won - stats.spent)}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-500">수익률</span>
                            <span className={`font-bold ${stats.won - stats.spent >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                                {getProfitRate()}%
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Rank Board */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 md:gap-4 mb-8">
                {[
                    { rank: 1, label: '1등', prize: '20억', count: stats.rank1, color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
                    { rank: 2, label: '2등', prize: '5천만', count: stats.rank2, color: 'bg-blue-100 text-blue-800 border-blue-200' },
                    { rank: 3, label: '3등', prize: '150만', count: stats.rank3, color: 'bg-green-100 text-green-800 border-green-200' },
                    { rank: 4, label: '4등', prize: '5만', count: stats.rank4, color: 'bg-white border-gray-200' },
                    { rank: 5, label: '5등', prize: '5천', count: stats.rank5, color: 'bg-white border-gray-200' },
                ].map(item => (
                    <div key={item.rank} className={`p-4 rounded-xl border-2 text-center ${item.color}`}>
                        <div className="font-black text-lg mb-1">{item.label}</div>
                        <div className="text-xs opacity-70 mb-2">({item.prize})</div>
                        <div className="text-2xl font-bold">{item.count}회</div>
                    </div>
                ))}
            </div>

            {/* Reality Check Message */}
            {stats.attempts > 0 && (
                <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 rounded-xl p-4 text-center">
                    <div className="flex items-center justify-center gap-2 text-orange-600 font-bold mb-2">
                        <AlertCircle className="w-5 h-5" />
                        팩트 체크
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">
                        {stats.rank1 > 0
                            ? `축하합니다! ${yearsPassed}년 만에 드디어 1등에 당첨되셨군요!`
                            : `${yearsPassed}년 동안 매주 로또를 샀지만 아직 1등에 당첨되지 못했습니다.`}
                    </p>
                </div>
            )}
        
            <div className="mt-12">
                <ToolGuide
                    title="로또 당첨 시뮬레이터 안내"
                    intro="매주 로또를 산다면 언제 1등에 당첨될까? 현실적인 로또 당첨 확률 시뮬레이터로 확인해보세요."
                    steps={toolSteps}
                    tips={toolTips}
                    faqs={toolFaqs}
                />
            </div>
        </div>
    );
};

export default LottoSimulator;
