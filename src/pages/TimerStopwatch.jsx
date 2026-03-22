import React, { useState, useEffect, useRef } from 'react';
import { Clock, Play, Pause, RotateCcw } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { useLanguage } from '../context/LanguageContext';

const TimerStopwatch = () => {
    const { lang, t } = useLanguage();
    const isEn = lang === 'en';

    const [mode, setMode] = useState('timer'); // timer or stopwatch
    const [timerMinutes, setTimerMinutes] = useState(5);
    const [timerSeconds, setTimerSeconds] = useState(0);
    const [timeLeft, setTimeLeft] = useState(300); // seconds
    const [isRunning, setIsRunning] = useState(false);

    const [stopwatchTime, setStopwatchTime] = useState(0);
    const intervalRef = useRef(null);

    useEffect(() => {
        if (mode === 'timer' && isRunning && timeLeft > 0) {
            intervalRef.current = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        setIsRunning(false);
                        // 알림음 (선택사항)
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } else if (mode === 'stopwatch' && isRunning) {
            intervalRef.current = setInterval(() => {
                setStopwatchTime(prev => prev + 10);
            }, 10);
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [mode, isRunning, timeLeft]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const formatStopwatch = (milliseconds) => {
        const mins = Math.floor(milliseconds / 60000);
        const secs = Math.floor((milliseconds % 60000) / 1000);
        const ms = Math.floor((milliseconds % 1000) / 10);
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
    };

    const startTimer = () => {
        const total = timerMinutes * 60 + timerSeconds;
        setTimeLeft(total);
        setIsRunning(true);
    };

    const resetTimer = () => {
        setIsRunning(false);
        setTimeLeft(timerMinutes * 60 + timerSeconds);
    };

    const resetStopwatch = () => {
        setIsRunning(false);
        setStopwatchTime(0);
    };

    const titleText = isEn ? "Online Timer & Stopwatch | Utility Hub" : "타이머 및 스톱워치 - Utility Hub";
    const descText = isEn 
        ? "Use our free online timer and stopwatch. Perfect for studying, workouts, and time tracking." 
        : "온라인 타이머와 스톱워치를 사용하세요. 집중 타이머, 시간 측정, 운동 타이머 등 다양한 용도로 활용하세요.";
    const keywordsText = isEn 
        ? "online timer, stopwatch, time tracker, focus timer, countdown" 
        : "온라인 타이머, 스톱워치, 시간 측정, 집중 타이머, 카운트다운";

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <SEO
                title={titleText}
                description={descText}
                keywords={keywordsText}
            />

            <header className="text-center space-y-2">
                <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
                    <Clock className="w-8 h-8 text-primary" />
                    {isEn ? 'Timer & Stopwatch' : '타이머 & 스톱워치'}
                </h1>
                <p className="text-muted-foreground">
                    {isEn ? 'Track and manage your time seamlessly' : '시간을 측정하고 관리하세요'}
                </p>
            </header>

            <div className="flex justify-center gap-2">
                <button
                    onClick={() => {
                        setMode('timer');
                        setIsRunning(false);
                    }}
                    className={`px-8 py-3 rounded-lg font-bold transition-all ${mode === 'timer'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-secondary hover:bg-accent'
                        }`}
                >
                    {isEn ? 'Timer' : '타이머'}
                </button>
                <button
                    onClick={() => {
                        setMode('stopwatch');
                        setIsRunning(false);
                    }}
                    className={`px-8 py-3 rounded-lg font-bold transition-all ${mode === 'stopwatch'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-secondary hover:bg-accent'
                        }`}
                >
                    {isEn ? 'Stopwatch' : '스톱워치'}
                </button>
            </div>

            {mode === 'timer' ? (
                <div className="bg-card border border-border rounded-xl p-8 space-y-6">
                    {!isRunning && timeLeft === (timerMinutes * 60 + timerSeconds) && (
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-2">{isEn ? 'Minutes' : '분'}</label>
                                <input
                                    type="number"
                                    min="0"
                                    max="59"
                                    value={timerMinutes}
                                    onChange={(e) => setTimerMinutes(parseInt(e.target.value) || 0)}
                                    className="w-full px-4 py-3 text-center text-2xl bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2">{isEn ? 'Seconds' : '초'}</label>
                                <input
                                    type="number"
                                    min="0"
                                    max="59"
                                    value={timerSeconds}
                                    onChange={(e) => setTimerSeconds(parseInt(e.target.value) || 0)}
                                    className="w-full px-4 py-3 text-center text-2xl bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                />
                            </div>
                        </div>
                    )}

                    <div className="text-center">
                        <div className="text-8xl font-bold text-primary mb-8">
                            {formatTime(timeLeft)}
                        </div>
                        <div className="flex justify-center gap-3">
                            {!isRunning ? (
                                <button
                                    onClick={startTimer}
                                    className="flex items-center gap-2 px-8 py-4 bg-green-600 text-white rounded-lg font-bold hover:brightness-110 transition-all"
                                >
                                    <Play className="w-5 h-5" />
                                    {isEn ? 'Start' : '시작'}
                                </button>
                            ) : (
                                <button
                                    onClick={() => setIsRunning(false)}
                                    className="flex items-center gap-2 px-8 py-4 bg-yellow-600 text-white rounded-lg font-bold hover:brightness-110 transition-all"
                                >
                                    <Pause className="w-5 h-5" />
                                    {isEn ? 'Pause' : '일시정지'}
                                </button>
                            )}
                            <button
                                onClick={resetTimer}
                                className="flex items-center gap-2 px-8 py-4 bg-secondary hover:bg-accent rounded-lg font-bold transition-all"
                            >
                                <RotateCcw className="w-5 h-5" />
                                {isEn ? 'Reset' : '초기화'}
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="bg-card border border-border rounded-xl p-8 space-y-6">
                    <div className="text-center">
                        <div className="text-8xl font-bold text-primary mb-8">
                            {formatStopwatch(stopwatchTime)}
                        </div>
                        <div className="flex justify-center gap-3">
                            {!isRunning ? (
                                <button
                                    onClick={() => setIsRunning(true)}
                                    className="flex items-center gap-2 px-8 py-4 bg-green-600 text-white rounded-lg font-bold hover:brightness-110 transition-all"
                                >
                                    <Play className="w-5 h-5" />
                                    {isEn ? 'Start' : '시작'}
                                </button>
                            ) : (
                                <button
                                    onClick={() => setIsRunning(false)}
                                    className="flex items-center gap-2 px-8 py-4 bg-yellow-600 text-white rounded-lg font-bold hover:brightness-110 transition-all"
                                >
                                    <Pause className="w-5 h-5" />
                                    {isEn ? 'Pause' : '정지'}
                                </button>
                            )}
                            <button
                                onClick={resetStopwatch}
                                className="flex items-center gap-2 px-8 py-4 bg-secondary hover:bg-accent rounded-lg font-bold transition-all"
                            >
                                <RotateCcw className="w-5 h-5" />
                                {isEn ? 'Reset' : '초기화'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="bg-muted/30 rounded-xl p-6 text-sm text-muted-foreground">
                <h3 className="font-bold text-foreground mb-2">💡 {isEn ? 'Usage Tips' : '사용 팁'}</h3>
                <ul className="space-y-1 list-disc list-inside">
                    <li>{isEn ? 'Timer: Great for managing focus sessions, cooking, or workouts.' : '타이머: 집중 시간 관리, 요리, 운동 등에 활용하세요'}</li>
                    <li>{isEn ? 'Stopwatch: Ideal for recording run times or tracking work durations.' : '스톱워치: 운동 기록, 작업 시간 측정 등에 사용하세요'}</li>
                    <li>{isEn ? 'Pomodoro Technique: Try 25 minutes of focus + 5 minutes of rest.' : '포모도로 기법: 25분 집중 + 5분 휴식을 반복하세요'}</li>
                </ul>
            </div>
            
            <ToolGuide
                title={isEn ? "Timer & Stopwatch" : "타이머/스톱워치"}
                intro={isEn ? "An easy-to-use online timer and stopwatch tool." : "온라인 타이머 및 스톱워치"}
                steps={isEn ? [
                    "Select between Timer or Stopwatch modes using the top tabs.",
                    "If Timer, enter your desired Minutes and Seconds.",
                    "Click Start to commence tracking.",
                    "Click Pause to hold the time, or Reset to start over."
                ] : [
                    "원하시는 옵션이나 값을 화면에 안내된 순서대로 정확하게 기입해 주세요.",
                    "제시된 항목과 보기를 꼼꼼하게 살펴보고 본인에게 맞는 것을 선택합니다.",
                    "모든 입력을 완료한 후 결과 화면에서 계산된 수치나 분석된 내용을 확인합니다.",
                    "결과가 마음에 든다면 캡처하거나 공유하기 버튼을 눌러 지인들에게 공유해보세요!"
                ]}
                tips={isEn ? [
                    "Do not fully close the browser tab or the timer will be reset.",
                    "If you lock your screen, some mobile browsers might pause execution to save battery."
                ] : [
                    "결과값이 예상과 다르다면 입력한 숫자나 단위를 한 번 더 확인해보는 것이 좋습니다.",
                    "제공되는 다양한 부가 옵션을 함께 활용하면 훨씬 구체적인 형태의 맞춤형 결과를 얻을 수 있습니다.",
                    "모바일과 데스크톱 환경 모두에 완벽하게 최적화되어 있으니 언제 어디서든 편리하게 이용해 보세요."
                ]}
                faqs={isEn ? [
                    { q: "Is the timer accurate?", a: "Yes, it hooks into the browser's high-precision timing API to ensure accuracy down to the millisecond." },
                    { q: "Does the timer run in the background?", a: "It will continue to calculate correctly once you return to the tab, but visual updates may be slowed down by the browser to save memory." }
                ] : [
                    { "q": "이 도구들은 정말로 모두 무료인가요?", "a": "네! Tool Hive에서 제공하는 모든 도구 모음과 심리 테스트들은 가입 등의 번거로운 절차 없이 누구나 100% 무료로 무제한 사용할 수 있습니다." },
                    { "q": "제가 입력한 개인적인 정보 데이터가 서버에 남나요?", "a": "아니요, 사용자가 입력하는 이름, 숫자, 금액 등의 모든 데이터는 방문자의 기기 내 브라우저에서만 실시간으로 연산되며 어떠한 경우에도 외부 서버로 전송되거나 저장되지 않으므로 안심하셔도 됩니다." },
                    { "q": "버튼을 눌러도 반응이 없거나 에러가 생깁니다.", "a": "브라우저의 일시적인 캐시 문제일 수 있습니다. 키보드의 F5 버튼을 누르거나 새로고침을 진행한 후 다시 시도해 보시길 권장하며, 문제가 계속된다면 다른 브라우저 앱을 이용해 보세요." }
                ]}
            />
        </div>
    );
};

export default TimerStopwatch;
