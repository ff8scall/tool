import React, { useState, useEffect, useRef } from 'react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { Keyboard, RefreshCw, Trophy, Timer, Globe, History, Trash2 } from 'lucide-react';
import ShareButtons from '../components/ShareButtons';
import { useLanguage } from '../context/LanguageContext';

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
    const { lang, t: translate } = useLanguage();
    const isEn = lang === 'en';
    const [language, setLanguage] = useState(isEn ? 'english' : 'korean');
    const [text, setText] = useState('');
    const [input, setInput] = useState('');
    const [startTime, setStartTime] = useState(null);
    const [wpm, setWpm] = useState(0);
    const [accuracy, setAccuracy] = useState(100);
    const [isFinished, setIsFinished] = useState(false);
    const [scoreHistory, setScoreHistory] = useState([]);
    const [bestWpm, setBestWpm] = useState(() => {
        return parseInt(localStorage.getItem(`typing-best-wpm-${isEn ? 'english' : 'korean'}`)) || 0;
    });

    const inputRef = useRef(null);

    // Initial language sync
    useEffect(() => {
        setLanguage(isEn ? 'english' : 'korean');
    }, [isEn]);

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
            language: language === 'english' ? (isEn ? 'English' : '영어') : (isEn ? 'Korean' : '한글')
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
        const confirmMsg = isEn ? 'Are you sure you want to clear your history?' : '기록을 모두 삭제하시겠습니까?';
        if (window.confirm(confirmMsg)) {
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

    const toolFaqs = isEn ? [
        { q: "What is a good WPM score?", a: "The average typing speed is around 40 WPM. Professional typists usually score 70-120 WPM." },
        { q: "How is WPM calculated for Korean?", a: "Since Korean uses characters (Jamo) structure, we use the standard conversion where 5 characters roughly equal 1 word for consistent measurement." },
        { q: "My accuracy is low, what should I do?", a: "Slow down and focus on matching every character. Speed will naturally improve as your muscle memory develops with high accuracy." }
    ] : [
        { q: "좋은 타자 속도는 어느 정도인가요?", a: "일반인의 평균 속도는 40 WPM 정도로, 전문 타이피스트나 고수들은 보통 70~120 WPM(한글 기준 300~500타) 이상의 기록을 보입니다." },
        { q: "한글 WPM은 어떻게 계산되나요?", a: "한국어는 문자 구조가 다르기 때문에, 표준 변환 방식에 따라 5글자를 1단어로 환산하여 영타와 비교 가능한 수치로 제공합니다." },
        { q: "정확도가 낮게 나와요. 어떻게 해야 하나요?", a: "속도보다는 정확한 입력을 우선시하며 천천히 연습하세요. 정확한 타이핑 습관이 들면 속도는 자연스럽게 따라옵니다." }
    ];

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <SEO
                title={isEn ? "Typing Speed Test - Test Your WPM Online" : "타자 속도 테스트 - 영어/한글 타자 연습 | Utility Hub"}
                description={isEn ? "How fast can you type? Test your WPM (Words Per Minute) in English and Korean. Track your progress and improve accuracy." : "나의 타자 속도(WPM)를 측정해보세요. 영어와 한글 모드를 지원하며 정확도와 속도를 실시간으로 분석해드립니다."}
                keywords={isEn ? "typing test, wpm test, typing speed, touch typing practice" : "타자연습, 영타연습, 한타연습, WPM, 타자속도, 타이핑테스트"}
                faqs={toolFaqs}
            />

            <div className="text-center space-y-4 py-6">
                <div className="inline-flex items-center justify-center p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mb-2">
                    <Keyboard className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
                    {isEn ? 'Typing Speed Test' : '타자 속도 테스트'}
                </h1>
                <p className="text-muted-foreground">
                    {isEn ? 'Measure your WPM by typing the sentences as fast and accurately as possible.' : '제시된 문장을 빠르고 정확하게 입력하여 WPM(분당 단어수)을 측정하세요.'}
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
                        <div className="text-sm text-muted-foreground font-medium mb-1">{isEn ? 'Accuracy' : '정확도'}</div>
                        <div className={`text-3xl font-bold ${accuracy < 90 ? 'text-red-500' : 'text-green-500'}`}>
                            {accuracy}%
                        </div>
                    </div>
                    {bestWpm > 0 && (
                        <div className="text-center opacity-60">
                            <div className="text-sm text-muted-foreground font-medium mb-1">{isEn ? 'Best' : '최고 기록'}</div>
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
                        placeholder={isFinished ? (isEn ? "Done! Press Enter for next" : "완료! Enter를 눌러 다음 문장으로") : (isEn ? "Type here..." : "여기에 입력하세요...")}
                        autoComplete="off"
                        spellCheck="false"
                        readOnly={isFinished}
                    />

                    {isFinished && (
                        <div className="space-y-4">
                            <div className="p-6 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl text-center space-y-2">
                                <Trophy className="w-12 h-12 mx-auto text-yellow-500" />
                                <h3 className="text-2xl font-bold">{isEn ? 'Finished!' : '완료!'}</h3>
                                <p className="text-lg">
                                    <span className="font-bold text-primary">{wpm} WPM</span> • <span className={accuracy >= 90 ? 'text-green-500' : 'text-red-500'}>{accuracy}% {isEn ? 'Accuracy' : '정확도'}</span>
                                </p>
                                {wpm > bestWpm && accuracy >= 90 && (
                                    <p className="text-sm text-green-600 dark:text-green-400 font-medium">{isEn ? "🎉 New Personal Best!" : "🎉 새로운 최고 기록!"}</p>
                                )}
                                <p className="text-sm text-gray-500">{isEn ? "Press Enter for next sentence" : "Enter를 눌러 다음 문장으로"}</p>
                            </div>

                            <ShareButtons
                                title={isEn ? `Typing Speed Result: ${wpm} WPM` : `타자 속도 테스트 결과: ${wpm} WPM (정확도 ${accuracy}%)`}
                                text={isEn ? `I scored ${wpm} WPM on Typing Test! Challenge yourself!` : `타자 속도 테스트에서 ${wpm} WPM을 기록했습니다! 당신도 도전해보세요!`}
                            />
                        </div>
                    )}

                    {!isFinished && (
                        <button
                            onClick={resetGame}
                            className="btn btn-ghost w-full flex items-center justify-center gap-2"
                        >
                            <RefreshCw className="w-5 h-5" />
                            {isEn ? 'New Sentence' : '새 문장'}
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
                            {isEn ? 'Recent History' : '최근 기록'}
                        </h3>
                        <button
                            onClick={clearHistory}
                            className="text-sm text-red-500 hover:text-red-600 flex items-center gap-1"
                        >
                            <Trash2 className="w-4 h-4" />
                            {isEn ? 'Clear History' : '기록 초기화'}
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th className="px-4 py-3">{isEn ? 'Date' : '시간'}</th>
                                    <th className="px-4 py-3">{isEn ? 'Language' : '언어'}</th>
                                    <th className="px-4 py-3">WPM</th>
                                    <th className="px-4 py-3">{isEn ? 'Accuracy' : '정확도'}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {scoreHistory.slice(0, 10).map((record) => (
                                    <tr key={record.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="px-4 py-3">{record.date}</td>
                                        <td className="px-4 py-3">
                                            <span className={`px-2 py-1 rounded text-xs font-bold ${record.language === 'English' || record.language === '영어' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
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
                <h3 className="font-bold text-base">💡 {isEn ? 'Tips' : '팁'}</h3>
                <ul className="space-y-1 text-muted-foreground list-disc list-inside">
                    <li>{isEn ? 'Maintain accuracy while increasing speed' : '정확도를 유지하면서 속도를 높이세요'}</li>
                    <li>{isEn ? 'Keep your fingers in the correct home position' : '손가락 위치를 올바르게 유지하세요 (홈 포지션)'}</li>
                    <li>{isEn ? 'Try not to look at the keyboard while typing' : '화면을 보고 타이핑하세요 (키보드를 보지 마세요)'}</li>
                    <li>{isEn ? 'Press Enter to move to the next sentence immediately' : '완료 후 Enter를 눌러 바로 다음 문장으로 넘어갈 수 있습니다'}</li>
                </ul>
            </div>

            <ToolGuide
                title={isEn ? "Master Your Typing Speed" : "타자 속도 테스트 가이드"}
                intro={isEn ? "WPM stands for Words Per Minute. It is the global standard for measuring typing speed. This tool helps you measure both your speed and accuracy in English and Korean." : "WPM(분당 단어수)은 타자 속도를 측정하는 세계적인 표준 지표입니다. 이 도구를 통해 영어와 한글 모두에서 자신의 타이핑 실력을 객관적으로 확인해보세요."}
                steps={isEn ? [
                    "Choose between English and Korean language modes.",
                    "The timer starts automatically when you type the first character.",
                    "Match the text displayed in the colored box accurately.",
                    "Correct errors immediately as highlighted in red to proceed.",
                    "Finish the entire sentence to see your final WPM and accuracy."
                ] : [
                    "연습하고 싶은 언어(한국어/English)를 먼저 선택합니다.",
                    "첫 글자를 입력하는 순간부터 타이머가 자동으로 시작됩니다.",
                    "제시된 문장과 똑같이 입력하세요. 오타는 빨간색으로 표시됩니다.",
                    "오타가 나면 수정한 후 다음 글자로 진행할 수 있습니다.",
                    "문장 전체를 정확히 입력하면 최종 WPM과 정확도가 계산됩니다."
                ]}
                tips={isEn ? [
                    "Proper posture and hand placement are key to long-term speed improvement.",
                    "Practice 'Touch Typing' where you only look at the screen, not your hands.",
                    "Don't sacrifice accuracy for speed; it's harder to unlearn bad habits.",
                    "Consistent daily practice of even 10 minutes can yield significant results."
                ] : [
                    "바른 자세와 올바른 손가락 배치가 속도 향상의 지름길입니다.",
                    "키보드를 보지 않고 화면만 보고 치는 '맹타' 연습을 병행하세요.",
                    "속도에 눈이 멀어 정확도를 무시하면 오히려 실력이 정체될 수 있습니다.",
                    "매일 조금씩이라도 꾸준히 연습하는 것이 가장 효과적입니다."
                ]}
                faqs={toolFaqs}
            />
        </div>
    );
};

export default TypingTest;
