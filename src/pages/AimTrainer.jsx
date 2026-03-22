import React, { useState, useEffect, useRef } from 'react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { Crosshair, Play, RefreshCw, Target, Clock, Settings, History, Trash2, Share2 } from 'lucide-react';
import useShareCanvas from '../hooks/useShareCanvas';
import { useLanguage } from '../context/LanguageContext';

const AimTrainer = () => {
    const { lang } = useLanguage();
    const isEn = lang === 'en';
    const [isPlaying, setIsPlaying] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [isCountingDown, setIsCountingDown] = useState(false);
    const [countDown, setCountDown] = useState(3);
    const [targets, setTargets] = useState([]);
    const [score, setScore] = useState(0);
    const [misses, setMisses] = useState(0);
    const [duration, setDuration] = useState(20); // Default 20s
    const [difficulty, setDifficulty] = useState('normal'); // easy, normal, hard
    const [timeLeft, setTimeLeft] = useState(20);
    const [avgTime, setAvgTime] = useState(0);
    const [history, setHistory] = useState([]);
    const { shareCanvas } = useShareCanvas();

    const containerRef = useRef(null);
    const lastClickTime = useRef(0);
    const reactionTimes = useRef([]);

    useEffect(() => {
        // Load history from localStorage
        const savedHistory = localStorage.getItem('aimTrainerHistory');
        if (savedHistory) {
            setHistory(JSON.parse(savedHistory));
        }
    }, []);

    useEffect(() => {
        let interval;
        if (isPlaying && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && isPlaying) {
            finishGame();
        }
        return () => clearInterval(interval);
    }, [isPlaying, timeLeft]);

    // Reset timer when duration changes
    useEffect(() => {
        if (!isPlaying && !isCountingDown) {
            setTimeLeft(duration);
        }
    }, [duration]);

    // Countdown Effect (Faster: 0.5s interval)
    useEffect(() => {
        let interval;
        if (isCountingDown && countDown > 0) {
            interval = setInterval(() => {
                setCountDown((prev) => prev - 1);
            }, 500); // Faster countdown
        } else if (isCountingDown && countDown === 0) {
            setIsCountingDown(false);
            realStartGame();
        }
        return () => clearInterval(interval);
    }, [isCountingDown, countDown]);

    const startCountdown = () => {
        setIsPlaying(false); // Ensure game is stopped
        setIsFinished(false);
        setIsCountingDown(true);
        setCountDown(3);
        setTargets([]); // Clear targets
    };

    const realStartGame = () => {
        setIsPlaying(true);
        setScore(0);
        setMisses(0);
        setTimeLeft(duration);
        setTargets([]);
        reactionTimes.current = [];
        lastClickTime.current = Date.now();
        spawnTarget();
    };

    const finishGame = () => {
        setIsPlaying(false);
        setIsFinished(true);

        let currentAvgTime = 0;
        // Calculate average reaction time
        if (reactionTimes.current.length > 0) {
            const sum = reactionTimes.current.reduce((a, b) => a + b, 0);
            currentAvgTime = Math.round(sum / reactionTimes.current.length);
            setAvgTime(currentAvgTime);
        } else {
            setAvgTime(0);
        }

        // Save to history
        const newRecord = {
            id: Date.now(),
            date: new Date().toLocaleString(),
            score: score,
            accuracy: score + misses > 0 ? Math.round((score / (score + misses)) * 100) : 0,
            avgTime: currentAvgTime,
            difficulty: difficulty,
            duration: duration
        };

        const newHistory = [newRecord, ...history].slice(0, 50); // Keep last 50
        setHistory(newHistory);
        localStorage.setItem('aimTrainerHistory', JSON.stringify(newHistory));
    };

    const spawnTarget = () => {
        if (!containerRef.current) return;

        const container = containerRef.current;

        // Determine size based on difficulty
        let minSize, maxSize;
        switch (difficulty) {
            case 'easy':
                minSize = 60;
                maxSize = 100;
                break;
            case 'hard':
                minSize = 25;
                maxSize = 45;
                break;
            case 'normal':
            default:
                minSize = 40;
                maxSize = 75;
                break;
        }

        const size = Math.random() * (maxSize - minSize) + minSize;
        const x = Math.random() * (container.clientWidth - size - 20) + 10;
        const y = Math.random() * (container.clientHeight - size - 20) + 10;

        const newTarget = {
            id: Date.now(),
            x,
            y,
            size,
            createdAt: Date.now()
        };

        setTargets([newTarget]);
    };

    const handleTargetClick = (e, id) => {
        e.stopPropagation();
        const now = Date.now();
        const reaction = now - lastClickTime.current;
        reactionTimes.current.push(reaction);
        lastClickTime.current = now;

        setScore(prev => prev + 1);
        spawnTarget();
    };

    const handleMiss = () => {
        if (isPlaying) {
            setMisses(prev => prev + 1);
            setScore(prev => Math.max(0, prev - 1)); // Penalty
        }
    };

    const handleDurationChange = (sec) => {
        setDuration(sec);
    };

    const handleDifficultyChange = (diff) => {
        setDifficulty(diff);
    };

    const clearHistory = () => {
        const confirmMsg = isEn ? 'Are you sure you want to clear your history?' : '기록을 모두 삭제하시겠습니까?';
        if (window.confirm(confirmMsg)) {
            setHistory([]);
            localStorage.removeItem('aimTrainerHistory');
        }
    };

    const accuracy = score + misses > 0
        ? Math.round((score / (score + misses)) * 100)
        : 0;

    const getDifficultyLabel = (diff) => {
        switch (diff) {
            case 'easy': return isEn ? 'Easy' : '쉬움';
            case 'normal': return isEn ? 'Normal' : '보통';
            case 'hard': return isEn ? 'Hard' : '어려움';
            default: return diff;
        }
    };

    const toolFaqs = isEn ? [
        { q: "How can I improve my aim accuracy?", a: "Practice regularly with 'Small' targets (Hard mode) and focus on smooth movements rather than raw speed at first. Accuracy will naturally lead to speed." },
        { q: "What should my DPI settings be?", a: "Most pro gamers use between 400 and 800 DPI for precision, but it depends on your comfort and screen resolution." },
        { q: "Is there a penalty for missing?", a: "Yes, every miss increases your miss count and deducts 1 point from your active score to encourage precision over spamming clicks." }
    ] : [
        { q: "에임 정확도를 높이려면 어떻게 해야 하나요?", a: "먼저 '쉬움' 보다는 '어려움' 모드에서 작은 타겟을 정확하게 맞히는 연습을 하세요. 정확도가 올라가면 속도는 자연스럽게 따라옵니다." },
        { q: "마우스 DPI 설정은 어느 정도가 적당한가요?", a: "대부분의 FPS 프로게이머들은 400~800 DPI 사이의 저감도를 선호하지만, 본인의 손목 가동 범위와 모니터 해상도에 맞춰 조절하는 것이 가장 좋습니다." },
        { q: "빗나가면 어떤 불이익이 있나요?", a: "타겟이 아닌 화면을 클릭할 경우 '미스'로 처리되어 점수가 1점 감점됩니다. 무작정 빨리 누르기보다 정확하게 누르는 것이 높은 점수의 비결입니다." }
    ];

    return (
        <div className="max-w-4xl mx-auto space-y-8 select-none">
            <SEO
                title={isEn ? "Aim Trainer - FPS Mouse Accuracy Practice" : "에임 트레이너 - 마우스 정확도 연습 | Utility Hub"}
                description={isEn ? "Sharpen your shooting skills with our professional Aim Trainer. Improve your reaction time and mouse precision for FPS games like Valorant and CS:GO." : "움직이는 타겟을 빠르고 정확하게 클릭하여 에임 실력을 향상시키세요. FPS 게이머를 위한 필수 연습 도구입니다."}
                keywords={isEn ? "aim trainer, mouse accuracy, fps practice, reaction time trainer, aim lab online" : "에임, aim, fps, 정확도, 마우스 연습, trainer"}
                faqs={toolFaqs}
            />

            <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center p-3 bg-red-100 dark:bg-red-900/30 rounded-full mb-2">
                    <Crosshair className="w-8 h-8 text-red-600 dark:text-red-400" />
                </div>
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-rose-600">
                    {isEn ? 'Aim Trainer' : '에임 트레이너'}
                </h1>
                <p className="text-muted-foreground">
                    {isEn ? 'Click targets quickly and accurately! One point lost per miss.' : '타겟을 빠르고 정확하게 클릭하세요! (빗나가면 감점)'}
                </p>
            </div>

            {/* Controls Bar */}
            <div className="flex flex-col lg:flex-row justify-center items-center gap-6 bg-card dark:bg-gray-800/50 p-6 rounded-3xl shadow-xl border border-border/50">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full lg:w-auto">
                    {/* Duration Selector */}
                    <div className="flex items-center gap-4 bg-secondary/30 p-2 pr-4 rounded-2xl">
                        <div className="p-2 bg-white dark:bg-gray-700 rounded-xl shadow-sm text-primary">
                            <Clock className="w-5 h-5" />
                        </div>
                        <div className="flex gap-1">
                            {[10, 20, 30].map((sec) => (
                                <button
                                    key={sec}
                                    onClick={() => handleDurationChange(sec)}
                                    className={`px-4 py-2 rounded-xl text-sm font-black transition-all ${duration === sec
                                        ? 'bg-primary text-white shadow-md'
                                        : 'text-muted-foreground hover:bg-secondary'
                                        }`}
                                >
                                    {sec}{isEn ? 's' : '초'}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Difficulty Selector */}
                    <div className="flex items-center gap-4 bg-secondary/30 p-2 pr-4 rounded-2xl">
                        <div className="p-2 bg-white dark:bg-gray-700 rounded-xl shadow-sm text-blue-500">
                            <Settings className="w-5 h-5" />
                        </div>
                        <div className="flex gap-1">
                            {['easy', 'normal', 'hard'].map((diff) => (
                                <button
                                    key={diff}
                                    onClick={() => handleDifficultyChange(diff)}
                                    className={`px-4 py-2 rounded-xl text-sm font-black transition-all ${difficulty === diff
                                        ? 'bg-blue-500 text-white shadow-md'
                                        : 'text-muted-foreground hover:bg-secondary'
                                        }`}
                                >
                                    {getDifficultyLabel(diff)}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Start Button */}
                <button
                    onClick={startCountdown}
                    className={`shrink-0 h-16 px-10 rounded-2xl text-xl font-black text-white shadow-xl transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3 ${isPlaying
                        ? 'bg-orange-500'
                        : 'bg-primary'
                        }`}
                >
                    {isPlaying ? (
                        <>
                            <RefreshCw className="w-6 h-6 animate-spin-once" />
                            {isEn ? 'Restart' : '다시 시작'}
                        </>
                    ) : (
                        <>
                            <Play className="w-6 h-6 fill-current" />
                            {isFinished ? (isEn ? 'Retry' : '다시 하기') : (isEn ? 'START' : '게임 시작')}
                        </>
                    )}
                </button>
            </div>

            <div className="card border-2 border-border/50 p-6 space-y-8 shadow-2xl relative overflow-hidden">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-secondary/20 p-4 rounded-2xl border border-border/50">
                        <div className="text-secondary-foreground/60 text-[10px] font-black uppercase tracking-widest mb-1">{isEn ? 'Timer' : '남은 시간'}</div>
                        <div className={`text-2xl font-black font-mono ${timeLeft <= 5 && isPlaying ? 'text-red-500 animate-pulse' : ''}`}>{timeLeft}s</div>
                    </div>
                    <div className="bg-secondary/20 p-4 rounded-2xl border border-border/50">
                        <div className="text-secondary-foreground/60 text-[10px] font-black uppercase tracking-widest mb-1">{isEn ? 'Score' : '점수'}</div>
                        <div className="text-2xl font-black font-mono text-blue-500">{score}</div>
                    </div>
                    <div className="bg-secondary/20 p-4 rounded-2xl border border-border/50">
                        <div className="text-secondary-foreground/60 text-[10px] font-black uppercase tracking-widest mb-1">{isEn ? 'Accuracy' : '정확도'}</div>
                        <div className="text-2xl font-black font-mono text-green-500">{accuracy}%</div>
                    </div>
                    <div className="bg-secondary/20 p-4 rounded-2xl border border-border/50">
                        <div className="text-secondary-foreground/60 text-[10px] font-black uppercase tracking-widest mb-1">{isEn ? 'Avg Time' : '평균 속도'}</div>
                        <div className="text-2xl font-black font-mono text-purple-500">{avgTime || '-'} <span className="text-xs">ms</span></div>
                    </div>
                </div>

                {/* Game Area */}
                <div
                    ref={containerRef}
                    onMouseDown={handleMiss}
                    className="relative h-[500px] bg-slate-900 rounded-3xl overflow-hidden cursor-crosshair shadow-inner ring-4 ring-slate-800"
                >
                    {!isPlaying && !isFinished && !isCountingDown && score === 0 && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/40 backdrop-blur-sm z-10 transition-all">
                            <Target className="w-16 h-16 text-white/20 mb-4 animate-pulse" />
                            <div className="text-white text-xl font-black uppercase tracking-widest">
                                {isEn ? "Press 'START' to Play" : "게임 시작 버튼을 눌러주세요!"}
                            </div>
                        </div>
                    )}

                    {isCountingDown && (
                        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/90 z-20">
                            <div className="text-9xl font-black text-white animate-ping">
                                {countDown > 0 ? countDown : ''}
                            </div>
                        </div>
                    )}

                    {isFinished && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/95 z-10 text-white space-y-8 animate-in fade-in duration-500 p-6">
                            <div className="space-y-2 text-center">
                                <Trophy className="w-16 h-16 text-yellow-500 mx-auto drop-shadow-lg mb-2" />
                                <div className="text-4xl font-black uppercase tracking-tighter italic">{isEn ? 'TRAINING COMPLETE!' : '훈련 종료!'}</div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-10 w-full max-w-md">
                                <div className="text-center group">
                                    <div className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-1 group-hover:text-blue-400 transition-colors uppercase">{isEn ? 'Final Score' : '최종 점수'}</div>
                                    <div className="text-6xl font-black text-blue-400 font-mono tracking-tighter">{score}</div>
                                </div>
                                <div className="text-center group">
                                    <div className="text-gray-500 text-[10px] font-black uppercase tracking-widest mb-1 group-hover:text-green-400 transition-colors uppercase">{isEn ? 'Accuracy' : '정확도'}</div>
                                    <div className="text-6xl font-black text-green-400 font-mono tracking-tighter">{accuracy}%</div>
                                </div>
                            </div>

                            <div className="text-xl text-gray-400 font-medium">
                                {isEn ? 'Avg Reaction Time:' : '평균 반응 속도:'} <span className="text-purple-400 font-black">{avgTime}ms</span>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
                                <button
                                    onClick={(e) => { e.stopPropagation(); startCountdown(); }}
                                    className="flex-1 bg-primary px-8 py-4 rounded-2xl font-black text-lg hover:scale-105 transition-all flex items-center justify-center gap-2 shadow-lg"
                                >
                                    <RefreshCw className="w-6 h-6" />
                                    {isEn ? 'Try Again' : '다시 도전'}
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); shareCanvas(containerRef.current, 'Aim Trainer', score); }}
                                    className="flex-1 bg-slate-700 px-8 py-4 rounded-2xl font-black text-lg hover:bg-slate-600 transition-all flex items-center justify-center gap-2 shadow-lg"
                                >
                                    <Share2 className="w-6 h-6" /> 
                                    {isEn ? 'Share' : '공유하기'}
                                </button>
                            </div>
                        </div>
                    )}

                    {isPlaying && targets.map(target => (
                        <div
                            key={target.id}
                            onMouseDown={(e) => handleTargetClick(e, target.id)}
                            className="absolute rounded-full bg-red-600 border-[6px] border-white shadow-2xl flex items-center justify-center cursor-pointer group active:scale-90 transition-transform"
                            style={{
                                left: target.x,
                                top: target.y,
                                width: target.size,
                                height: target.size,
                            }}
                        >
                            <div className="w-4/5 h-4/5 rounded-full border-[4px] border-white/50 bg-red-600 flex items-center justify-center">
                                <div className="w-1/2 h-1/2 rounded-full bg-white shadow-sm" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* History Section */}
                {history.length > 0 && (
                    <div className="space-y-4 pt-4 border-t border-border">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-black flex items-center gap-2 uppercase tracking-tight">
                                <History className="w-5 h-5 text-primary" />
                                {isEn ? 'Recent Training' : '최근 훈련 기록'}
                            </h3>
                            <button
                                onClick={clearHistory}
                                className="text-xs font-black text-red-500 hover:opacity-80 flex items-center gap-1 transition-opacity"
                            >
                                <Trash2 className="w-4 h-4" />
                                {isEn ? 'Clear All' : '기록 초기화'}
                            </button>
                        </div>
                        <div className="overflow-x-auto rounded-2xl border border-border shadow-sm">
                            <table className="w-full text-sm text-center">
                                <thead className="text-[10px] font-black text-muted-foreground uppercase bg-secondary/50">
                                    <tr>
                                        <th className="px-4 py-4">{isEn ? 'Date' : '날짜'}</th>
                                        <th className="px-4 py-4">{isEn ? 'Difficulty' : '난이도'}</th>
                                        <th className="px-4 py-4">{isEn ? 'Duration' : '설정 시간'}</th>
                                        <th className="px-4 py-4">{isEn ? 'Score' : '점수'}</th>
                                        <th className="px-4 py-4">{isEn ? 'Accuracy' : '정확도'}</th>
                                        <th className="px-4 py-4">{isEn ? 'Reaction' : '평균 반응'}</th>
                                    </tr>
                                </thead>
                                <tbody className="font-bold">
                                    {history.map((record) => (
                                        <tr key={record.id} className="bg-card border-b border-border hover:bg-secondary/10 transition-colors">
                                            <td className="px-4 py-4 text-muted-foreground">{record.date.split(',')[0]}</td>
                                            <td className="px-4 py-4">
                                                <span className={`px-3 py-1 rounded-lg text-[10px] uppercase font-black ${record.difficulty === 'easy' ? 'bg-green-100 text-green-700' :
                                                    record.difficulty === 'hard' ? 'bg-red-100 text-red-700' :
                                                        'bg-blue-100 text-blue-700'
                                                    }`}>
                                                    {getDifficultyLabel(record.difficulty)}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4 text-muted-foreground">{record.duration}s</td>
                                            <td className="px-4 py-4 text-blue-600 font-mono text-lg">{record.score}</td>
                                            <td className="px-4 py-4 text-green-600 font-mono text-lg">{record.accuracy}%</td>
                                            <td className="px-4 py-4 text-purple-600 font-mono text-lg">{record.avgTime}ms</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>

            <ToolGuide
                title={isEn ? "How to Use Aim Trainer" : "에임 트레이너 연습 가이드"}
                intro={isEn ? "Master your mouse precision and reaction speed with our Aim Trainer. Designed for FPS gamers, this tool helps you develop the muscle memory needed for competitive play." : "에임 트레이너는 마우스 정확도 및 반응 속도를 체계적으로 훈련할 수 있도록 설계된 도구입니다. 리드미컬한 클릭과 정확한 조준을 통해 FPS 게임 실력을 비약적으로 향상시켜 보세요."}
                steps={isEn ? [
                    "Choose your training duration and difficulty level (target size).",
                    "Click 'START' and wait for the countdown to hit zero.",
                    "Click the red targets as they appear on the screen.",
                    "Avoid clicking the background; misses will deduct points from your score.",
                    "Analyze your accuracy and average reaction time after the session."
                ] : [
                    "연습할 시간(10~30초)과 난이도(타켓 크기)를 선택합니다.",
                    "'게임 시작' 버튼을 누르면 카운트다운 후 타겟이 나타납니다.",
                    "나타나는 붉은색 타겟의 정중앙을 최대한 빠르고 정확하게 클릭하세요.",
                    "배경을 잘못 클릭하면 점수가 깎이고 미스 카운트가 올라가므로 주의해야 합니다.",
                    "게임 종료 후 나타나는 정확도와 평균 반응 시간 데이터를 확인하고 기록을 갱신해 보세요."
                ]}
                tips={isEn ? [
                    "Focus on 'Smoothness' over speed initially. Precision naturally evolves into speed.",
                    "Proper seating and a consistent mouse grip (Palm, Claw, or Fingertip) are crucial.",
                    "Practice on 'Hard' mode with smaller targets to sharpen your micro-adjustments.",
                    "Keep your eyes on the center of the screen and use your peripheral vision to spot new targets."
                ] : [
                    "무작정 빨리 누르기보다 정확하게 맞히는 습관을 먼저 들이는 것이 실력 향상에 더 유리합니다.",
                    "손목만 사용하는 것보다 팔 전체를 활용하는 고감도/저감도 연습을 병행해 보세요.",
                    "작은 타겟이 나오는 '어려움' 난이도에서 미세 조준 실력을 기를 수 있습니다.",
                    "매일 10분 정도의 꾸준한 연습이 뇌와 손의 근육 기억(Muscle Memory) 형성에 큰 도움이 됩니다."
                ]}
                faqs={toolFaqs}
            />

        </div>
    );
};

export default AimTrainer;
