import React, { useState, useEffect, useRef } from 'react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { Target, RefreshCw, History, AlertCircle, Settings } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const NumberBaseball = () => {
    const { lang } = useLanguage();
    const isEn = lang === 'en';
    const [digitCount, setDigitCount] = useState(3); // 3 or 4
    const [targetNumber, setTargetNumber] = useState('');
    const [input, setInput] = useState('');
    const [logs, setLogs] = useState([]);
    const [gameState, setGameState] = useState('playing'); // playing, won, lost
    const [attempts, setAttempts] = useState(0);
    const [maxAttempts] = useState(10);
    const inputRef = useRef(null);

    useEffect(() => {
        startNewGame();
    }, [digitCount]);

    const generateNumber = () => {
        const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        const result = [];

        for (let i = 0; i < digitCount; i++) {
            const index = Math.floor(Math.random() * numbers.length);
            result.push(numbers[index]);
            numbers.splice(index, 1);
        }

        return result.join('');
    };

    const startNewGame = () => {
        setTargetNumber(generateNumber());
        setLogs([]);
        setGameState('playing');
        setAttempts(0);
        setInput('');
        setTimeout(() => inputRef.current?.focus(), 100);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (gameState !== 'playing') return;

        if (input.length !== digitCount) {
            alert(isEn ? `Please enter ${digitCount} digits.` : `${digitCount}자리 숫자를 입력해주세요.`);
            return;
        }

        if (new Set(input).size !== digitCount) {
            alert(isEn ? 'Please enter unique digits.' : '중복되지 않는 숫자를 입력해주세요.');
            return;
        }

        const newAttempts = attempts + 1;
        setAttempts(newAttempts);

        let strikes = 0;
        let balls = 0;

        for (let i = 0; i < digitCount; i++) {
            if (input[i] === targetNumber[i]) {
                strikes++;
            } else if (targetNumber.includes(input[i])) {
                balls++;
            }
        }

        const result = {
            attempt: newAttempts,
            guess: input,
            strikes,
            balls
        };

        setLogs([result, ...logs]);
        setInput('');

        if (strikes === digitCount) {
            setGameState('won');
        } else if (newAttempts >= maxAttempts) {
            setGameState('lost');
        }
    };

    const handleInputChange = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, '');
        if (value.length <= digitCount) {
            setInput(value);
        }
    };

    const toggleDigitCount = (count) => {
        if (count === digitCount) return;
        const confirmMsg = isEn 
            ? 'Changing difficulty will reset the current game. Continue?' 
            : '난이도를 변경하면 현재 게임이 초기화됩니다. 계속하시겠습니까?';
        if (window.confirm(confirmMsg)) {
            setDigitCount(count);
        }
    };

    const toolFaqs = isEn ? [
        { q: "What is a 'Strike'?", a: "A strike means one of your numbers is correct and is in the correct position." },
        { q: "What is a 'Ball'?", a: "A ball means one of your numbers is correct but it is in the wrong position." },
        { q: "Can the target number start with 0?", a: "Yes, the target number can be any combination of unique digits from 0-9, including starting with 0." }
    ] : [
        { q: "스트라이크와 볼의 차이가 무엇인가요?", a: "숫자와 자릿수가 모두 맞으면 스트라이크, 숫자는 맞지만 자릿수가 틀리면 볼입니다." },
        { q: "숫자가 0으로 시작할 수도 있나요?", a: "네, 0부터 9까지의 숫자 중 중복 없이 뽑기 때문에 0으로 시작하는 숫자도 포함될 수 있습니다." },
        { q: "힌트를 얻는 팁이 있나요?", a: "처음에는 123, 456과 같이 겹치지 않는 숫자들로 스트라이크/볼 여부를 파악하며 숫자의 범위를 좁혀가는 것이 유리합니다." }
    ];

    return (
        <div className="max-w-2xl mx-auto space-y-6 px-4">
            <SEO
                title={isEn ? "Number Baseball - Classic Mind Puzzle | Tool Hive" : "숫자 야구 게임 (Number Baseball) - 추억의 두뇌 게임 | Tool Hive"}
                description={isEn ? "Play the classic Number Baseball (Bulls and Cows) game online. Guess the secret sequence using strike and ball clues. Fun brain training for all ages." : "컴퓨터가 생각한 숫자를 맞춰보세요! 3자리 또는 4자리 모드를 선택할 수 있습니다."}
                keywords={isEn ? "number baseball, bulls and cows, guessing game, logic puzzle, brain test" : "숫자야구, number baseball, bulls and cows, 두뇌게임, 추리"}
                faqs={toolFaqs}
            />

            <div className="text-center space-y-4">
                <h1 className="text-4xl font-black text-gray-900 dark:text-white flex items-center justify-center gap-4 italic tracking-tight">
                    <Target className="w-10 h-10 text-emerald-500" />
                    {isEn ? 'NUMBER BASEBALL' : '숫자 야구'}
                </h1>
                <p className="text-muted-foreground font-medium">
                    {isEn ? 'Guess the hidden unique digits from 0 to 9.' : '0~9 사이의 서로 다른 숫자를 맞춰보세요.'}
                </p>
            </div>

            <div className="flex justify-center gap-2">
                <button
                    onClick={() => toggleDigitCount(3)}
                    className={`px-6 py-2.5 rounded-xl text-sm font-black transition-all ${digitCount === 3
                            ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20 scale-105'
                            : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                        }`}
                >
                    {isEn ? '3 DIGITS' : '3자리 (보통)'}
                </button>
                <button
                    onClick={() => toggleDigitCount(4)}
                    className={`px-6 py-2.5 rounded-xl text-sm font-black transition-all ${digitCount === 4
                            ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20 scale-105'
                            : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                        }`}
                >
                    {isEn ? '4 DIGITS' : '4자리 (어려움)'}
                </button>
            </div>

            <div className="bg-card border-2 border-border/50 rounded-3xl p-8 shadow-xl space-y-8">
                <div className="flex justify-between items-center bg-muted/30 p-4 rounded-2xl">
                    <div className="text-lg font-black uppercase tracking-widest text-muted-foreground">
                        {isEn ? 'Attempts' : '시도'}: <span className={`text-2xl font-mono ${attempts >= maxAttempts - 2 ? 'text-rose-500' : 'text-primary'}`}>
                            {attempts}
                        </span> <span className="text-sm opacity-50">/ {maxAttempts}</span>
                    </div>
                    <button
                        onClick={startNewGame}
                        className="flex items-center gap-2 px-4 py-2 bg-secondary/50 hover:bg-secondary rounded-xl text-xs font-bold transition-all active:scale-95"
                    >
                        <RefreshCw className="w-4 h-4" />
                        {isEn ? 'NEW GAME' : '새 게임'}
                    </button>
                </div>

                <div className="flex flex-col items-center space-y-6">
                    {gameState === 'playing' ? (
                        <form onSubmit={handleSubmit} className="w-full max-w-xs flex gap-3">
                            <input
                                ref={inputRef}
                                type="text"
                                inputMode="numeric"
                                value={input}
                                onChange={handleInputChange}
                                className="flex-1 bg-muted/50 border-2 border-border/50 rounded-2xl text-center text-3xl tracking-[0.5em] font-mono font-black py-4 focus:ring-4 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-inner"
                                placeholder={digitCount === 3 ? "123" : "1234"}
                                disabled={gameState !== 'playing'}
                            />
                            <button
                                type="submit"
                                className="px-8 bg-primary text-primary-foreground rounded-2xl font-black text-lg transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20 disabled:grayscale disabled:opacity-50"
                                disabled={input.length !== digitCount}
                            >
                                {isEn ? 'THROW!' : '던지기!'}
                            </button>
                        </form>
                    ) : (
                        <div className={`text-center p-10 rounded-3xl w-full animate-in zoom-in-95 duration-300 ${gameState === 'won' ? 'bg-green-100 dark:bg-green-900/30' : 'bg-rose-100 dark:bg-rose-900/30'
                            }`}>
                            <div className="text-3xl font-black mb-4 italic tracking-tighter">
                                {gameState === 'won' ? '🎉 HOME RUN!' : '😭 STRIKE OUT!'}
                            </div>
                            <div className="text-muted-foreground font-bold mb-8">
                                {isEn ? 'The answer was' : '정답은'} <span className="text-2xl font-black font-mono text-foreground mx-2 tracking-widest">{targetNumber}</span>
                            </div>
                            <button onClick={startNewGame} className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black hover:scale-105 active:scale-95 shadow-xl transition-all">
                                {isEn ? 'PLAY AGAIN' : '다시 도전하기'}
                            </button>
                        </div>
                    )}
                </div>

                <div className="space-y-4">
                    <div className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-muted-foreground px-2">
                        <History className="w-4 h-4" />
                        {isEn ? 'MATCH HISTORY' : '기록'}
                    </div>
                    <div className="bg-muted/30 border-2 border-border/50 rounded-2xl p-6 min-h-[300px] max-h-[400px] overflow-y-auto space-y-3 shadow-inner">
                        {logs.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground/50 py-12">
                                <Target className="w-12 h-12 mb-4 opacity-20" />
                                <p className="font-bold">{isEn ? 'Enter a number to start!' : '숫자를 입력해서 게임을 시작하세요!'}</p>
                            </div>
                        ) : (
                            logs.map((log, idx) => (
                                <div key={idx} className="flex items-center justify-between bg-card hover:bg-secondary/20 border border-border/50 p-4 rounded-xl shadow-sm transition-all animate-in slide-in-from-top-2">
                                    <div className="flex items-center gap-6">
                                        <span className="text-xs text-muted-foreground font-black font-mono w-6">#{log.attempt}</span>
                                        <span className="text-2xl font-black font-mono tracking-[0.2em]">{log.guess}</span>
                                    </div>
                                    <div className="flex gap-3 font-black text-sm">
                                        {log.strikes > 0 && (
                                            <span className="px-3 py-1 bg-green-100 text-green-600 rounded-lg border border-green-200">{log.strikes} S</span>
                                        )}
                                        {log.balls > 0 && (
                                            <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-lg border border-blue-200">{log.balls} B</span>
                                        )}
                                        {log.strikes === 0 && log.balls === 0 && (
                                            <span className="px-3 py-1 bg-rose-100 text-rose-600 rounded-lg border border-rose-200">OUT</span>
                                        )}
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            <div className="bg-primary/5 border border-primary/20 p-8 rounded-3xl space-y-4">
                <div className="flex items-center gap-3 font-black text-primary uppercase tracking-widest text-sm">
                    <AlertCircle className="w-5 h-5" />
                    {isEn ? 'Game Rules' : '게임 규칙'}
                </div>
                <ul className="grid sm:grid-cols-2 gap-4 text-sm font-medium text-muted-foreground">
                    <li className="flex gap-3">
                        <span className="text-green-500 font-black">S</span>
                        {isEn ? "Strike: Correct digit in the correct position." : "스트라이크(S): 숫자와 위치가 모두 맞음"}
                    </li>
                    <li className="flex gap-3">
                        <span className="text-blue-500 font-black">B</span>
                        {isEn ? "Ball: Correct digit in the wrong position." : "볼(B): 숫자는 맞지만 위치가 다름"}
                    </li>
                    <li className="flex gap-3">
                        <span className="text-rose-500 font-black">OUT</span>
                        {isEn ? "No digits match at all." : "아웃(OUT): 맞는 숫자가 하나도 없음"}
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary font-black">!</span>
                        {isEn ? `Guess ${digitCount} unique digits in 10 attempts.` : `10번의 기회 안에 ${digitCount}자리 숫자를 맞춰야 합니다.`}
                    </li>
                </ul>
            </div>

            <ToolGuide
                title={isEn ? "How to Win at Number Baseball" : "숫자 야구 추리 가이드"}
                intro={isEn ? "Number Baseball (also known as Bulls and Cows) is a logic-based code-breaking game. Your goal is to deduce the computer's secret sequence of digits using Strike and Ball clues provided after each guess." : "전략적인 두뇌 싸움, 숫자 야구 게임입니다. 컴퓨터가 정한 무작위 숫자를 스트라이크와 볼 힌트만을 이용해 맞혀보세요. 정보가 누적될수록 경우의 수를 좁혀나가는 논리적 쾌감을 무료로 경험하실 수 있습니다."}
                steps={isEn ? [
                    "Choose between 3-digit (Normal) or 4-digit (Hard) mode.",
                    "Input a sequence of unique digits and click 'THROW!'.",
                    "Check the Strike (S) and Ball (B) results in your match history.",
                    "Repeat the process, using logic to eliminate impossible combinations.",
                    "Find the exact number within 10 attempts to win!"
                ] : [
                    "먼저 게임의 난이도(3자리 또는 4자리)를 선택합니다.",
                    "중복되지 않는 숫자를 입력 칸에 기입하고 '던지기!' 버튼을 누릅니다.",
                    "기록 창에 표시되는 스트라이크(S)와 볼(B) 개수를 확인합니다.",
                    "이전 기록들을 토대로 어떤 숫자가 포함되었고 어느 자리에 있는지 추리합니다.",
                    "10번의 아웃 카운트가 다 차기 전에 정답 번호를 정확히 맞추면 승리합니다."
                ]}
                tips={isEn ? [
                    "Start with distinct numbers (e.g., 123) to quickly test as many digits as possible.",
                    "When you get an 'OUT', you can safely eliminate all those numbers from future guesses.",
                    "Pay attention to the position of digits when you get Strikes; they are your most valuable clues.",
                    "Record-keeping is key: Compare your new results with previous ones to find logical overlaps."
                ] : [
                    "처음에는 123, 456, 789와 같이 숫자가 겹치지 않는 조합으로 던져 숫자의 범위를 좁히세요.",
                    "아웃(OUT)이 나온 숫자는 과감하게 머릿속에서 지우고 다음 추리를 진행합니다.",
                    "스트라이크(S)가 나왔을 때는 해당 자릿수의 숫자를 고정하고 다른 숫자를 바꿔가며 확인하세요.",
                    "추리가 막힐 때는 과거 기록들을 찬찬히 톺아보며 모순되는 경우의 수를 하나씩 제거해나가세요."
                ]}
                faqs={toolFaqs}
            />
        </div>
    );
};

export default NumberBaseball;
