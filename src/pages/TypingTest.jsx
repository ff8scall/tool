import React, { useState, useEffect, useRef } from 'react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { Keyboard, RefreshCw, Trophy, Timer, Globe, History, Trash2 } from 'lucide-react';
import ShareButtons from '../components/ShareButtons';

const ENGLISH_SENTENCES = [
    "the quick brown fox jumps over the lazy dog",
    "pack my box with five dozen liquor jugs",
    "how vexingly quick daft zebras jump",
    "sphinx of black quartz judge my vow",
    "two driven jocks help fax my big quiz",
    "life is like a box of chocolates",
    "may the force be with you",
    "to be or not to be that is the question",
    "all that glitters is not gold",
    "a journey of a thousand miles begins with a single step",
    "actions speak louder than words",
    "beauty is in the eye of the beholder",
    "better late than never",
    "birds of a feather flock together",
    "cleanliness is next to godliness",
    "early to bed and early to rise makes a man healthy wealthy and wise",
    "practice makes perfect",
    "where there is a will there is a way",
    "time flies like an arrow",
    "knowledge is power"
];

const KOREAN_SENTENCES = [
    "가는 말이 고와야 오는 말이 곱다",
    "고생 끝에 낙이 온다",
    "백문이 불여일견이다",
    "천리 길도 한 걸음부터 시작한다",
    "세 살 버릇 여든까지 간다",
    "티끌 모아 태산이다",
    "낮말은 새가 듣고 밤말은 쥐가 듣는다",
    "원숭이도 나무에서 떨어진다",
    "소 잃고 외양간 고친다",
    "우물 안 개구리다",
    "하늘이 무너져도 솟아날 구멍이 있다",
    "호랑이도 제 말 하면 온다",
    "금강산도 식후경이다",
    "개천에서 용 난다",
    "누워서 떡 먹기다",
    "돌다리도 두들겨 보고 건너라",
    "열 번 찍어 안 넘어가는 나무 없다",
    "콩 심은 데 콩 나고 팥 심은 데 팥 난다",
    "말 한마디에 천 냥 빚을 갚는다",
    "빈 수레가 요란하다"
];

const TypingTest = () => {
    const [language, setLanguage] = useState('korean');
    const [text, setText] = useState('');
    const [input, setInput] = useState('');
    const [startTime, setStartTime] = useState(null);
    const [wpm, setWpm] = useState(0);
    const [accuracy, setAccuracy] = useState(100);
    const [isFinished, setIsFinished] = useState(false);
    const [scoreHistory, setScoreHistory] = useState([]);
    const [bestWpm, setBestWpm] = useState(() => {
        return parseInt(localStorage.getItem(`typing-best-wpm-${language}`)) || 0;
    });

    const inputRef = useRef(null);

    // Load history
    useEffect(() => {
        const savedHistory = localStorage.getItem('typingTestHistory');
        if (savedHistory) {
            setScoreHistory(JSON.parse(savedHistory));
        }
    }, []);

    useEffect(() => {
        resetGame();
    }, [language]);

    useEffect(() => {
        const saved = parseInt(localStorage.getItem(`typing-best-wpm-${language}`)) || 0;
        setBestWpm(saved);
    }, [language]);

    const resetGame = () => {
        const sentences = language === 'english' ? ENGLISH_SENTENCES : KOREAN_SENTENCES;
        const randomIndex = Math.floor(Math.random() * sentences.length);
        setText(sentences[randomIndex]);
        setInput('');
        setStartTime(null);
        setWpm(0);
        setAccuracy(100);
        setIsFinished(false);
        setTimeout(() => inputRef.current?.focus(), 100);
    };

    const handleChange = (e) => {
        const value = e.target.value;

        if (!startTime) {
            setStartTime(Date.now());
        }

        setInput(value);

        // Calculate Accuracy
        let correctChars = 0;
        for (let i = 0; i < value.length; i++) {
            if (value[i] === text[i]) correctChars++;
        }
        const acc = value.length > 0 ? Math.round((correctChars / value.length) * 100) : 100;
        setAccuracy(acc);

        // Check if finished - must match exactly
        if (value === text) {
            finishGame(value);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (isFinished) {
                resetGame();
            }
        }
    };

    const finishGame = (finalInput) => {
        const endTime = Date.now();
        const timeInMinutes = (endTime - startTime) / 60000;

        // For Korean, count characters; for English, count words
        let calculatedWpm;
        if (language === 'korean') {
            const chars = text.length;
            calculatedWpm = Math.round((chars / timeInMinutes) / 5);
        } else {
            const words = text.split(' ').length;
            calculatedWpm = Math.round(words / timeInMinutes);
        }

        // Final accuracy check
        let correctChars = 0;
        for (let i = 0; i < finalInput.length; i++) {
            if (finalInput[i] === text[i]) correctChars++;
        }
        const finalAccuracy = Math.round((correctChars / text.length) * 100);

        setWpm(calculatedWpm);
        setAccuracy(finalAccuracy);
        setIsFinished(true);

        // Save to history
        const newRecord = {
            id: Date.now(),
            date: new Date().toLocaleString(),
            wpm: calculatedWpm,
            accuracy: finalAccuracy,
            language: language === 'english' ? '영어' : '한글'
        };

        const newHistory = [newRecord, ...scoreHistory].slice(0, 50);
        setScoreHistory(newHistory);
        localStorage.setItem('typingTestHistory', JSON.stringify(newHistory));

        if (calculatedWpm > bestWpm && finalAccuracy >= 90) {
            setBestWpm(calculatedWpm);
            localStorage.setItem(`typing-best-wpm-${language}`, calculatedWpm);
        }
    };

    const clearHistory = () => {
        if (window.confirm('기록을 모두 삭제하시겠습니까?')) {
            setScoreHistory([]);
            localStorage.removeItem('typingTestHistory');
        }
    };

    const renderText = () => {
        return text.split('').map((char, index) => {
            let color = 'text-gray-400';
            if (index < input.length) {
                color = input[index] === char ? 'text-green-500' : 'text-red-500 bg-red-100 dark:bg-red-900/30';
            } else if (index === input.length) {
                color = 'text-gray-900 dark:text-white bg-yellow-200 dark:bg-yellow-900/50';
            }
            return (
                <span key={index} className={`font-mono text-2xl ${color}`}>
                    {char}
                </span>
            );
        });
    };

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <SEO
                title="타자 속도 테스트 - 영어/한글 타자 연습 | Utility Hub"
                description="나의 타자 속도(WPM)를 측정해보세요. 영어와 한글 모드를 지원하며 정확도와 속도를 실시간으로 분석해드립니다."
                keywords="타자연습, 영타연습, 한타연습, WPM, 타자속도, 타이핑테스트"
            />

            <div className="text-center space-y-4 py-6">
                <div className="inline-flex items-center justify-center p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mb-2">
                    <Keyboard className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
                    타자 속도 테스트
                </h1>
                <p className="text-muted-foreground">
                    제시된 문장을 빠르고 정확하게 입력하여 WPM(분당 단어수)을 측정하세요.
                </p>
            </div>

            {/* Language Selector */}
            <div className="flex justify-center gap-2">
                <button
                    onClick={() => setLanguage('english')}
                    className={`px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${language === 'english'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                        }`}
                >
                    <Globe className="w-4 h-4" />
                    English
                </button>
                <button
                    onClick={() => setLanguage('korean')}
                    className={`px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${language === 'korean'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                        }`}
                >
                    <Globe className="w-4 h-4" />
                    한국어
                </button>
            </div>

            <div className="bg-card border border-border rounded-xl p-8 shadow-sm space-y-6">
                {/* Stats */}
                <div className="flex justify-center gap-8 mb-4">
                    <div className="text-center">
                        <div className="text-sm text-muted-foreground font-medium mb-1">WPM</div>
                        <div className="text-3xl font-bold text-primary">{isFinished ? wpm : (startTime ? '...' : 0)}</div>
                    </div>
                    <div className="text-center">
                        <div className="text-sm text-muted-foreground font-medium mb-1">정확도</div>
                        <div className={`text-3xl font-bold ${accuracy < 90 ? 'text-red-500' : 'text-green-500'}`}>
                            {accuracy}%
                        </div>
                    </div>
                    {bestWpm > 0 && (
                        <div className="text-center opacity-60">
                            <div className="text-sm text-muted-foreground font-medium mb-1">최고 기록</div>
                            <div className="text-3xl font-bold">{bestWpm}</div>
                        </div>
                    )}
                </div>

                {/* Text Display */}
                <div className="p-6 bg-muted/30 rounded-xl leading-relaxed min-h-[100px] flex items-center justify-center text-center">
                    <div className="whitespace-pre-wrap break-words">
                        {renderText()}
                    </div>
                </div>

                {/* Input */}
                <div className="space-y-4">
                    <input
                        ref={inputRef}
                        type="text"
                        value={input}
                        onChange={isFinished ? undefined : handleChange}
                        onKeyDown={handleKeyDown}
                        className="input w-full text-lg text-center font-mono"
                        placeholder={isFinished ? "완료! Enter를 눌러 다음 문장으로" : "여기에 입력하세요..."}
                        autoComplete="off"
                        spellCheck="false"
                        readOnly={isFinished}
                    />

                    {isFinished && (
                        <div className="space-y-4">
                            <div className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl text-center space-y-2">
                                <Trophy className="w-12 h-12 mx-auto text-yellow-500" />
                                <h3 className="text-2xl font-bold">완료!</h3>
                                <p className="text-lg">
                                    <span className="font-bold text-primary">{wpm} WPM</span> • <span className={accuracy >= 90 ? 'text-green-500' : 'text-red-500'}>{accuracy}% 정확도</span>
                                </p>
                                {wpm > bestWpm && accuracy >= 90 && (
                                    <p className="text-sm text-green-600 dark:text-green-400 font-medium">🎉 새로운 최고 기록!</p>
                                )}
                                <p className="text-sm text-gray-500">Enter를 눌러 다음 문장으로</p>
                            </div>

                            <ShareButtons
                                title={`타자 속도 테스트 결과: ${wpm} WPM (정확도 ${accuracy}%)`}
                                text={`타자 속도 테스트에서 ${wpm} WPM을 기록했습니다! 당신도 도전해보세요!`}
                            />
                        </div>
                    )}

                    {!isFinished && (
                        <button
                            onClick={resetGame}
                            className="btn btn-ghost w-full flex items-center justify-center gap-2"
                        >
                            <RefreshCw className="w-5 h-5" />
                            새 문장
                        </button>
                    )}
                </div>
            </div>

            {/* History Section */}
            {scoreHistory.length > 0 && (
                <div className="card p-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold flex items-center gap-2">
                            <History className="w-5 h-5" />
                            최근 기록
                        </h3>
                        <button
                            onClick={clearHistory}
                            className="text-sm text-red-500 hover:text-red-600 flex items-center gap-1"
                        >
                            <Trash2 className="w-4 h-4" />
                            기록 초기화
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th className="px-4 py-3">시간</th>
                                    <th className="px-4 py-3">언어</th>
                                    <th className="px-4 py-3">WPM</th>
                                    <th className="px-4 py-3">정확도</th>
                                </tr>
                            </thead>
                            <tbody>
                                {scoreHistory.slice(0, 10).map((record) => (
                                    <tr key={record.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="px-4 py-3">{record.date}</td>
                                        <td className="px-4 py-3">
                                            <span className={`px-2 py-1 rounded text-xs font-bold ${record.language === '영어' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                                                }`}>
                                                {record.language}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 font-bold text-blue-600 dark:text-blue-400 font-mono">{record.wpm}</td>
                                        <td className="px-4 py-3 text-green-600 dark:text-green-400">{record.accuracy}%</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Info */}
            <div className="bg-muted/30 rounded-xl p-6 space-y-2 text-sm">
                <h3 className="font-bold text-base">💡 팁</h3>
                <ul className="space-y-1 text-muted-foreground list-disc list-inside">
                    <li>정확도를 유지하면서 속도를 높이세요</li>
                    <li>손가락 위치를 올바르게 유지하세요 (홈 포지션)</li>
                    <li>화면을 보고 타이핑하세요 (키보드를 보지 마세요)</li>
                    <li>완료 후 Enter를 눌러 바로 다음 문장으로 넘어갈 수 있습니다</li>
                </ul>
            </div>
        \n            <ToolGuide
                title="타자 속도 테스트"
                intro="한글/영어 타자 속도(WPM)와 정확도 측정"
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

export default TypingTest;
