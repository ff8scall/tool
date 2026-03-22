import React, { useState, useRef, useEffect } from 'react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { Zap, RotateCcw, Trophy } from 'lucide-react';
import ShareButtons from '../components/ShareButtons';

const ReactionTest = () => {
    const [gameState, setGameState] = useState('waiting'); // waiting, ready, now, result, too-early
    const [startTime, setStartTime] = useState(0);
    const [reactionTime, setReactionTime] = useState(null);
    const [bestScore, setBestScore] = useState(() => {
        return parseInt(localStorage.getItem('reaction-best')) || null;
    });

    const timeoutRef = useRef(null);

    const startGame = () => {
        setGameState('ready');
        setReactionTime(null);

        const randomDelay = Math.floor(Math.random() * 3000) + 2000; // 2-5 seconds

        timeoutRef.current = setTimeout(() => {
            setGameState('now');
            setStartTime(Date.now());
        }, randomDelay);
    };

    const handleClick = () => {
        if (gameState === 'waiting' || gameState === 'result' || gameState === 'too-early') {
            startGame();
        } else if (gameState === 'ready') {
            clearTimeout(timeoutRef.current);
            setGameState('too-early');
        } else if (gameState === 'now') {
            const endTime = Date.now();
            const time = endTime - startTime;
            setReactionTime(time);
            setGameState('result');

            if (!bestScore || time < bestScore) {
                setBestScore(time);
                localStorage.setItem('reaction-best', time);
            }
        }
    };

    useEffect(() => {
        return () => clearTimeout(timeoutRef.current);
    }, []);

    const getMessage = () => {
        switch (gameState) {
            case 'waiting': return '화면을 클릭하여 시작하세요';
            case 'ready': return '초록색이 되면 클릭하세요!';
            case 'now': return '클릭!!!';
            case 'result': return `${reactionTime}ms`;
            case 'too-early': return '너무 빨라요! 다시 시도하세요';
            default: return '';
        }
    };

    const getBgColor = () => {
        switch (gameState) {
            case 'waiting': return 'bg-blue-500 hover:bg-blue-600';
            case 'ready': return 'bg-red-500';
            case 'now': return 'bg-green-500';
            case 'result': return 'bg-blue-500 hover:bg-blue-600';
            case 'too-early': return 'bg-blue-500 hover:bg-blue-600';
            default: return 'bg-blue-500';
        }
    };

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <SEO
                title="반응속도 테스트 - 순발력 게임 | Utility Hub"
                description="나의 반응속도는 몇 ms일까요? 초록색 화면이 뜰 때 클릭하여 순발력을 테스트해보세요."
                keywords="반응속도, 순발력테스트, 미니게임, 반응속도테스트"
            />

            <div className="text-center space-y-4 py-6">
                <div className="inline-flex items-center justify-center p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-full mb-2">
                    <Zap className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
                </div>
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-orange-500">
                    반응속도 테스트
                </h1>
                <p className="text-muted-foreground">
                    화면 색상이 초록색으로 바뀌는 순간 최대한 빠르게 클릭하세요!
                </p>
            </div>

            <div
                className={`
                    relative w-full aspect-video md:aspect-[2/1] rounded-2xl shadow-xl 
                    flex flex-col items-center justify-center text-white cursor-pointer 
                    transition-all duration-200 select-none
                    ${getBgColor()}
                `}
                onMouseDown={handleClick}
                onTouchStart={(e) => { e.preventDefault(); handleClick(); }}
            >
                {gameState === 'waiting' && <Zap className="w-16 h-16 mb-4 animate-pulse" />}
                {gameState === 'ready' && <div className="text-6xl font-bold mb-4">...</div>}
                {gameState === 'now' && <div className="text-6xl font-bold mb-4">CLICK!</div>}
                {gameState === 'result' && <div className="text-6xl font-bold mb-4">{reactionTime}ms</div>}
                {gameState === 'too-early' && <div className="text-6xl font-bold mb-4">Wait!</div>}

                <h2 className="text-3xl md:text-4xl font-bold text-center px-4 drop-shadow-md">
                    {getMessage()}
                </h2>

                {gameState === 'result' && (
                    <p className="mt-4 text-lg opacity-90">클릭하여 다시 시작</p>
                )}
            </div>

            {bestScore && (
                <div className="flex justify-center">
                    <div className="bg-card border border-border px-8 py-4 rounded-xl shadow-sm flex items-center gap-4">
                        <div className="p-2 bg-yellow-100 dark:bg-yellow-900/30 rounded-full">
                            <Trophy className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                        </div>
                        <div className="text-center">
                            <div className="text-sm text-muted-foreground font-medium">최고 기록</div>
                            <div className="text-2xl font-bold">{bestScore}ms</div>
                        </div>
                    </div>
                </div>
            )}

            <div className="mt-8">
                <ShareButtons
                    title="반응속도 테스트"
                    description={`제 반응속도는 ${bestScore ? bestScore + 'ms' : '측정 중'} 입니다! 당신의 순발력은?`}
                />
            </div>
        \n            <ToolGuide
                title="반응속도 테스트"
                intro="나의 순발력은 몇 ms? 반응속도 측정 게임"
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

export default ReactionTest;
