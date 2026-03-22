import React, { useState, useEffect, useRef } from 'react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { Brain, Play, ArrowRight, RefreshCw, CheckCircle2, XCircle } from 'lucide-react';

const NumberMemory = () => {
    const [level, setLevel] = useState(1);
    const [number, setNumber] = useState('');
    const [userInput, setUserInput] = useState('');
    const [gameState, setGameState] = useState('start'); // start, showing, input, result, gameover
    const [timeLeft, setTimeLeft] = useState(0);

    const inputRef = useRef(null);

    const generateNumber = (length) => {
        let result = '';
        for (let i = 0; i < length; i++) {
            result += Math.floor(Math.random() * 10);
        }
        return result;
    };

    const startGame = () => {
        setLevel(1);
        startLevel(1);
    };

    const startLevel = (lvl) => {
        const newNumber = generateNumber(lvl);
        setNumber(newNumber);
        setGameState('showing');
        setUserInput('');

        // Show time depends on length (1s + 0.5s per digit)
        const showTime = 1000 + (lvl * 500);
        setTimeLeft(showTime / 1000);

        // Progress bar animation
        const startTime = Date.now();
        const interval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const remaining = Math.max(0, showTime - elapsed);
            setTimeLeft(remaining / 1000);

            if (remaining === 0) {
                clearInterval(interval);
                setGameState('input');
                setTimeout(() => inputRef.current?.focus(), 100);
            }
        }, 50);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (userInput === number) {
            setGameState('result');
        } else {
            setGameState('gameover');
        }
    };

    const nextLevel = () => {
        setLevel(prev => prev + 1);
        startLevel(level + 1);
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <SEO
                title="숫자 기억하기 - 침팬지 테스트"
                description="잠깐 나타나는 숫자를 기억해서 입력하세요. 당신의 순간 기억력은 몇 단계인가요?"
                keywords={['기억력', 'memory', 'test', '숫자 기억', 'chimp test', 'brain']}
            />

            <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-3">
                    <Brain className="w-8 h-8 text-pink-500" />
                    숫자 기억하기
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    화면에 나타나는 숫자를 기억한 뒤 똑같이 입력하세요.
                </p>
            </div>

            <div className="card p-8 min-h-[400px] flex flex-col items-center justify-center text-center space-y-8">
                {gameState === 'start' && (
                    <div className="space-y-6 animate-fade-in">
                        <div className="text-6xl">🧠</div>
                        <h2 className="text-2xl font-bold">기억력 테스트</h2>
                        <p className="text-gray-500">
                            숫자가 화면에 잠시 나타납니다.<br />
                            숫자를 기억했다가 사라지면 입력하세요.<br />
                            단계가 올라갈수록 숫자가 길어집니다.
                        </p>
                        <button
                            onClick={startGame}
                            className="btn btn-primary btn-lg px-12"
                        >
                            시작하기
                        </button>
                    </div>
                )}

                {gameState === 'showing' && (
                    <div className="space-y-8 w-full animate-fade-in">
                        <div className="text-gray-500 font-medium">Level {level}</div>
                        <div className="text-6xl md:text-8xl font-bold tracking-widest font-mono">
                            {number}
                        </div>
                        <div className="w-full max-w-md mx-auto h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-blue-500 transition-all duration-75 ease-linear"
                                style={{ width: `${(timeLeft / (1 + level * 0.5)) * 100}%` }}
                            />
                        </div>
                    </div>
                )}

                {gameState === 'input' && (
                    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md animate-fade-in">
                        <div className="text-gray-500 font-medium">어떤 숫자였나요?</div>
                        <input
                            ref={inputRef}
                            type="number" // Changed to number for mobile keypad
                            pattern="[0-9]*"
                            inputMode="numeric"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            className="input w-full text-center text-4xl tracking-widest font-mono py-4"
                            placeholder="숫자 입력"
                            autoFocus
                        />
                        <button type="submit" className="btn btn-primary w-full py-4 text-lg">
                            확인
                        </button>
                    </form>
                )}

                {gameState === 'result' && (
                    <div className="space-y-6 animate-fade-in">
                        <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto" />
                        <h2 className="text-2xl font-bold text-green-600">정답입니다!</h2>
                        <div className="text-gray-500">
                            숫자: <span className="font-mono font-bold text-gray-900 dark:text-white">{number}</span>
                        </div>
                        <button
                            onClick={nextLevel}
                            className="btn btn-primary btn-lg px-8 flex items-center gap-2 mx-auto"
                        >
                            다음 레벨 ({level + 1}) <ArrowRight className="w-5 h-5" />
                        </button>
                    </div>
                )}

                {gameState === 'gameover' && (
                    <div className="space-y-6 animate-fade-in">
                        <XCircle className="w-20 h-20 text-red-500 mx-auto" />
                        <h2 className="text-2xl font-bold text-red-600">틀렸습니다!</h2>

                        <div className="grid grid-cols-2 gap-8 text-left bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
                            <div>
                                <div className="text-sm text-gray-500 mb-1">정답</div>
                                <div className="text-xl font-mono font-bold text-green-600">{number}</div>
                            </div>
                            <div>
                                <div className="text-sm text-gray-500 mb-1">입력</div>
                                <div className="text-xl font-mono font-bold text-red-600 line-through decoration-2">{userInput}</div>
                            </div>
                        </div>

                        <div className="text-xl font-bold">
                            최종 레벨: <span className="text-blue-500">{level}</span>
                        </div>

                        <button
                            onClick={startGame}
                            className="btn btn-primary btn-lg px-8 flex items-center gap-2 mx-auto"
                        >
                            <RefreshCw className="w-5 h-5" />
                            다시 도전
                        </button>
                    </div>
                )}
            </div>
        \n            <ToolGuide
                title="숫자 기억하기"
                intro="순간 기억력 테스트 (침팬지 테스트)"
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

export default NumberMemory;
