import React, { useState, useEffect, useRef } from 'react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { Timer, Play, Pause, RotateCcw, Coffee, Briefcase, Settings, Volume2, VolumeX, Vibrate, VibrateOff, History, Target, CheckCircle, X, Moon } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const PomodoroTimer = () => {
    const { lang, t } = useLanguage();
    const isEn = lang === 'en';

    // --- State ---
    const [mode, setMode] = useState('work'); // 'work', 'break', 'longBreak'
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [sessions, setSessions] = useState(0); // Completed work sessions today

    // Settings (Persisted)
    const [customTimes, setCustomTimes] = useState(() => JSON.parse(localStorage.getItem('pomo_times') || '{"work": 25, "break": 5, "longBreak": 15}'));
    const [autoStart, setAutoStart] = useState(() => JSON.parse(localStorage.getItem('pomo_autoStart') || 'false'));
    const [goal, setGoal] = useState(() => JSON.parse(localStorage.getItem('pomo_goal') || '8'));
    const [soundEnabled, setSoundEnabled] = useState(() => JSON.parse(localStorage.getItem('pomo_sound') || 'true'));
    const [vibrationEnabled, setVibrationEnabled] = useState(() => JSON.parse(localStorage.getItem('pomo_vibration') || 'true'));

    // History (Persisted)
    const [history, setHistory] = useState(() => JSON.parse(localStorage.getItem('pomo_history') || '[]'));

    const [showSettings, setShowSettings] = useState(false);
    const [showHistory, setShowHistory] = useState(false);

    const timerRef = useRef(null);
    const audioRef = useRef(new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3')); // Simple bell sound

    // --- Effects ---

    // Persist Settings
    useEffect(() => {
        localStorage.setItem('pomo_times', JSON.stringify(customTimes));
        localStorage.setItem('pomo_autoStart', JSON.stringify(autoStart));
        localStorage.setItem('pomo_goal', JSON.stringify(goal));
        localStorage.setItem('pomo_sound', JSON.stringify(soundEnabled));
        localStorage.setItem('pomo_vibration', JSON.stringify(vibrationEnabled));
        localStorage.setItem('pomo_history', JSON.stringify(history));
    }, [customTimes, autoStart, goal, soundEnabled, vibrationEnabled, history]);

    // Request Notification Permission
    useEffect(() => {
        if (Notification.permission !== 'granted') {
            Notification.requestPermission();
        }
    }, []);

    // Timer Logic
    useEffect(() => {
        if (isActive && timeLeft > 0) {
            timerRef.current = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            handleTimerComplete();
        }

        return () => clearInterval(timerRef.current);
    }, [isActive, timeLeft]);

    // --- Handlers ---

    const handleTimerComplete = () => {
        clearInterval(timerRef.current);
        setIsActive(false);

        // Sound & Vibration
        if (soundEnabled) {
            audioRef.current.play().catch(e => console.log('Audio play failed', e));
        }
        if (vibrationEnabled && navigator.vibrate) {
            navigator.vibrate([200, 100, 200]);
        }

        // Notification
        if (Notification.permission === 'granted') {
            const titleEn = mode === 'work' ? 'Focus Session Finished!' : 'Break Time Over!';
            const bodyEn = mode === 'work'
                ? 'Great job! Take a short break, you deserve it.'
                : 'Break is over. Ready to focus again?';
            
            const titleKo = mode === 'work' ? '집중 시간 종료!' : '휴식 종료!';
            const bodyKo = mode === 'work'
                ? '수고하셨습니다! 잠시 휴식을 취하세요.'
                : '휴식이 끝났습니다. 다시 집중해볼까요?';

            new Notification(isEn ? titleEn : titleKo, { body: isEn ? bodyEn : bodyKo, icon: '/favicon.ico' });
        }

        // Log History (Only for work sessions)
        if (mode === 'work') {
            const newSession = {
                id: Date.now(),
                date: new Date().toISOString(),
                duration: customTimes.work
            };
            setHistory(prev => [newSession, ...prev]);
            setSessions(prev => prev + 1);
        }

        // Auto-cycle Logic
        if (autoStart) {
            let nextMode = 'work';
            if (mode === 'work') {
                // Suggest long break every 4 sessions
                if ((sessions + 1) % 4 === 0) {
                    nextMode = 'longBreak';
                } else {
                    nextMode = 'break';
                }
            }
            switchMode(nextMode);
            setIsActive(true);
        } else {
            if (mode === 'work') {
                if ((sessions + 1) % 4 === 0) {
                    switchMode('longBreak');
                } else {
                    switchMode('break');
                }
            } else {
                switchMode('work');
            }
        }
    };

    const toggleTimer = () => setIsActive(!isActive);

    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(customTimes[mode] * 60);
    };

    const switchMode = (newMode) => {
        setMode(newMode);
        setIsActive(false);
        setTimeLeft(customTimes[newMode] * 60);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const updateCustomTime = (key, value) => {
        const numVal = parseInt(value) || 1;
        setCustomTimes(prev => ({ ...prev, [key]: numVal }));
        // If currently in that mode and not active, update display
        if (mode === key && !isActive) {
            setTimeLeft(numVal * 60);
        }
    };

    const clearHistory = () => {
        if (confirm(isEn ? 'Are you sure you want to clear all history?' : '기록을 초기화하시겠습니까?')) {
            setHistory([]);
            setSessions(0);
        }
    };

    // Calculate progress for circle
    const totalTime = customTimes[mode] * 60;
    const progress = ((totalTime - timeLeft) / totalTime) * 100;

    // Get today's sessions
    const todaySessions = history.filter(h => new Date(h.date).toDateString() === new Date().toDateString()).length;

    const keywordsText = isEn ? "pomodoro timer, productivity timer, focus tool, tomato timer, pomodoro app" : "포모도로, pomodoro, 타이머, 집중, 생산성, 공부";

    const faqs = isEn ? [
        {
            q: "Why is 25 minutes completely optimal for focus?",
            a: "The length is generally structured based on typical human cognitive attention limits. It's concise enough not to exhaust heavily but long enough to dive deep into flow states."
        },
        {
            q: "Can I do other tasks on the break screen?",
            a: "Usually, walking around passively releasing tension helps recover cognitive load best! Stretching is way more effective than checking another screen."
        }
    ] : [
        { "q": "25분이 너무 짧은 것 같아요.", "a": "뇌의 집중 한계 시간을 고려한 설정입니다. 필요시 설정을 통해 시간을 늘릴 수 있습니다." },
        { "q": "휴식 시간에 업무 메일을 확인해도 되나요?", "a": "휴식은 뇌를 쉬게 하는 시간입니다. 업무와 관련된 활동은 피하는 것이 좋습니다." }
    ];

    const steps = isEn ? [
        "Pick exactly a task you want seamlessly completed.",
        "Use 'Focus' mode and begin a 25-minute timer instantly by clicking start.",
        "Work purely exclusively entirely until the auditory sound notifies you it's done.",
        "Hit the short 'Break' mode freely to relax for about 5 minutes before heading back."
    ] : [
        "수행할 작업을 정하고 타이머를 25분으로 설정합니다.",
        "타이머가 작동하는 동안 오직 해당 작업에만 완전히 몰입합니다.",
        "25분이 지나 알람이 울리면 5분 동안 짧은 휴식을 취합니다.",
        "이 과정을 4번 반복한 후, 15~30분 정도의 긴 휴식을 가집니다."
    ];

    return (
        <div className="max-w-lg mx-auto space-y-6 pb-12">
            <SEO
                title={t('tools.pomodoro-timer.title')}
                description={t('tools.pomodoro-timer.description')}
                keywords={keywordsText}
                category="productivity"
                faqs={faqs}
                steps={steps}
            />

            {/* Header */}
            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold text-foreground flex items-center justify-center gap-3">
                    <Timer className="w-8 h-8 text-primary" />
                    {isEn ? 'Pomodoro Timer' : '포모도로 타이머'}
                </h1>
                <p className="text-muted-foreground text-sm">
                    {isEn ? 'Maximize productivity dynamically through 25-minute sprints.' : '25분 집중, 5분 휴식으로 생산성을 극대화하세요.'}
                </p>
            </div>

            <div className="card p-6 md:p-8 space-y-8 relative border-2 border-border/50 bg-card/60 backdrop-blur-md">
                {/* Top Controls (Settings, History) */}
                <div className="absolute top-4 right-4 flex gap-2">
                    <button
                        onClick={() => setShowHistory(true)}
                        className="p-2 border border-border rounded-full hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors focus:ring-2 focus:ring-primary/20 outline-none"
                        title={isEn ? "History" : "기록"}
                    >
                        <History className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => setShowSettings(true)}
                        className="p-2 border border-border rounded-full hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors focus:ring-2 focus:ring-primary/20 outline-none"
                        title={isEn ? "Settings" : "설정"}
                    >
                        <Settings className="w-5 h-5" />
                    </button>
                </div>

                {/* Mode Switcher */}
                <div className="flex justify-center gap-2 bg-secondary/50 p-1.5 rounded-full w-fit mx-auto mt-6">
                    {[
                        { id: 'work', label: isEn ? 'Focus' : '집중', icon: Briefcase, color: 'text-rose-500', bg: 'bg-rose-500/10 border-rose-500/20' },
                        { id: 'break', label: isEn ? 'Break' : '휴식', icon: Coffee, color: 'text-emerald-500', bg: 'bg-emerald-500/10 border-emerald-500/20' },
                        { id: 'longBreak', label: isEn ? 'Long Break' : '긴 휴식', icon: Moon, color: 'text-indigo-500', bg: 'bg-indigo-500/10 border-indigo-500/20' },
                    ].map((m) => (
                        <button
                            key={m.id}
                            onClick={() => switchMode(m.id)}
                            className={`px-4 py-2 rounded-full text-sm font-bold transition-all flex items-center gap-2 border border-transparent ${mode === m.id
                                ? `${m.bg} ${m.color} shadow-sm`
                                : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                                }`}
                        >
                            <m.icon className={`w-4 h-4 ${mode === m.id ? m.color : ''}`} />
                            <span className="hidden sm:inline">{m.label}</span>
                        </button>
                    ))}
                </div>

                {/* Timer Display */}
                <div className="relative w-72 h-72 mx-auto flex items-center justify-center">
                    {/* Circular Progress */}
                    <svg className="absolute w-full h-full transform -rotate-90">
                        <circle
                            cx="144"
                            cy="144"
                            r="130"
                            stroke="currentColor"
                            strokeWidth="8"
                            fill="transparent"
                            className="text-secondary opacity-50"
                        />
                        <circle
                            cx="144"
                            cy="144"
                            r="130"
                            stroke="currentColor"
                            strokeWidth="12"
                            fill="transparent"
                            strokeDasharray={2 * Math.PI * 130}
                            strokeDashoffset={2 * Math.PI * 130 * (1 - progress / 100)}
                            className={`transition-all duration-1000 origin-center ${mode === 'work' ? 'text-rose-500 drop-shadow-[0_0_8px_rgba(244,63,94,0.4)]' :
                                    mode === 'break' ? 'text-emerald-500 drop-shadow-[0_0_8px_rgba(16,185,129,0.4)]' : 'text-indigo-500 drop-shadow-[0_0_8px_rgba(99,102,241,0.4)]'
                                }`}
                            strokeLinecap="round"
                        />
                    </svg>

                    {/* Time Text */}
                    <div className={`text-7xl font-bold font-mono tracking-tighter z-10 drop-shadow-sm ${
                            mode === 'work' ? 'text-rose-600 dark:text-rose-400' :
                            mode === 'break' ? 'text-emerald-600 dark:text-emerald-400' : 'text-indigo-600 dark:text-indigo-400'
                        }`}>
                        {formatTime(timeLeft)}
                    </div>
                </div>

                {/* Controls */}
                <div className="flex justify-center gap-4 mt-8">
                    <button
                        onClick={toggleTimer}
                        className={`px-12 py-4 rounded-2xl flex items-center gap-3 text-xl font-black shadow-lg hover:-translate-y-1 active:scale-[0.98] transition-all duration-200 ${isActive
                            ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-amber-500/25 border-b-4 border-amber-600/50'
                            : mode === 'work' ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-rose-500/25 border-b-4 border-rose-600/50' :
                              mode === 'break' ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/25 border-b-4 border-emerald-600/50' :
                              'bg-indigo-500 hover:bg-indigo-600 text-white shadow-indigo-500/25 border-b-4 border-indigo-600/50'
                            }`}
                    >
                        {isActive ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current" />}
                        {isActive ? (isEn ? 'Pause' : '일시정지') : (isEn ? 'Start' : '시작')}
                    </button>

                    <button
                        onClick={resetTimer}
                        className="p-4 rounded-2xl border-2 border-border/50 bg-secondary/20 hover:bg-secondary/80 text-muted-foreground hover:text-foreground transition-all duration-200 active:scale-95 flex items-center justify-center shadow-sm"
                        title={isEn ? "Reset Timer" : "리셋"}
                    >
                        <RotateCcw className="w-7 h-7" />
                    </button>
                </div>

                {/* Goal Progress */}
                <div className="flex items-center justify-center gap-8 pt-6 border-t border-border/30 mt-8">
                    <div className="text-center bg-secondary/30 px-6 py-3 rounded-2xl w-full max-w-xs">
                        <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                            {isEn ? 'Daily Focus Goal' : '오늘의 목표'}
                        </div>
                        <div className="flex items-center gap-3 justify-center">
                            <Target className={`w-5 h-5 ${todaySessions >= goal ? "text-green-500" : "text-primary"}`} />
                            <span className="text-2xl font-black tracking-tight">{todaySessions} <span className="text-muted-foreground text-lg italic font-medium">/ {goal}</span></span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Settings Modal */}
            {showSettings && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-card w-full max-w-md rounded-2xl shadow-2xl p-6 space-y-6 border border-border">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <Settings className="w-5 h-5 text-primary" /> {isEn ? 'Settings' : '설정'}
                            </h2>
                            <button onClick={() => setShowSettings(false)} className="p-1 hover:bg-secondary rounded-full text-muted-foreground hover:text-foreground transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="space-y-6">
                            {/* Time Settings */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">{isEn ? 'Timer Lengths (Minutes)' : '시간 설정 (분)'}</h3>
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-rose-500 flex justify-center">{isEn ? 'Focus' : '집중'}</label>
                                        <input
                                            type="number"
                                            value={customTimes.work}
                                            onChange={(e) => updateCustomTime('work', e.target.value)}
                                            className="w-full py-3 px-2 rounded-xl border border-rose-200 dark:border-rose-900 bg-rose-50 dark:bg-rose-900/10 text-center font-bold text-lg text-rose-600 dark:text-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-500"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-emerald-500 flex justify-center">{isEn ? 'Break' : '휴식'}</label>
                                        <input
                                            type="number"
                                            value={customTimes.break}
                                            onChange={(e) => updateCustomTime('break', e.target.value)}
                                            className="w-full py-3 px-2 rounded-xl border border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-900/10 text-center font-bold text-lg text-emerald-600 dark:text-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-indigo-500 flex justify-center">{isEn ? 'Long Break' : '긴 휴식'}</label>
                                        <input
                                            type="number"
                                            value={customTimes.longBreak}
                                            onChange={(e) => updateCustomTime('longBreak', e.target.value)}
                                            className="w-full py-3 px-2 rounded-xl border border-indigo-200 dark:border-indigo-900 bg-indigo-50 dark:bg-indigo-900/10 text-center font-bold text-lg text-indigo-600 dark:text-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Goal Setting */}
                            <div className="space-y-3 pt-2">
                                <label className="text-sm font-bold text-muted-foreground uppercase tracking-wider">{isEn ? 'Daily Target Sessions' : '일일 목표 세션'}</label>
                                <div className="flex items-center gap-4 bg-secondary/30 p-4 rounded-xl border border-border/50">
                                    <input
                                        type="range"
                                        min="1"
                                        max="20"
                                        value={goal}
                                        onChange={(e) => setGoal(parseInt(e.target.value))}
                                        className="flex-1 accent-primary"
                                    />
                                    <span className="font-black w-8 text-center text-xl text-primary">{goal}</span>
                                </div>
                            </div>

                            {/* Toggles */}
                            <div className="space-y-4 pt-2">
                                <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-2">{isEn ? 'Preferences' : '기타 설정'}</h3>
                                
                                <div className="flex items-center justify-between p-3 rounded-xl hover:bg-secondary/30 transition-colors">
                                    <span className="text-sm font-bold">{isEn ? 'Auto-start next phase' : '자동으로 다음 단계 시작'}</span>
                                    <button
                                        onClick={() => setAutoStart(!autoStart)}
                                        className={`w-12 h-6 rounded-full transition-colors relative ${autoStart ? 'bg-primary' : 'bg-secondary border border-border'}`}
                                    >
                                        <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${autoStart ? 'translate-x-6' : ''}`} />
                                    </button>
                                </div>
                                <div className="flex items-center justify-between p-3 rounded-xl hover:bg-secondary/30 transition-colors">
                                    <span className="text-sm font-bold flex items-center gap-2 text-foreground">
                                        {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-500" /> : <VolumeX className="w-4 h-4 text-muted-foreground" />}
                                        {isEn ? 'Sound Notifications' : '소리 알림'}
                                    </span>
                                    <button
                                        onClick={() => setSoundEnabled(!soundEnabled)}
                                        className={`w-12 h-6 rounded-full transition-colors relative ${soundEnabled ? 'bg-primary' : 'bg-secondary border border-border'}`}
                                    >
                                        <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${soundEnabled ? 'translate-x-6' : ''}`} />
                                    </button>
                                </div>
                                <div className="flex items-center justify-between p-3 rounded-xl hover:bg-secondary/30 transition-colors">
                                    <span className="text-sm font-bold flex items-center gap-2 text-foreground">
                                        {vibrationEnabled ? <Vibrate className="w-4 h-4 text-indigo-500" /> : <VibrateOff className="w-4 h-4 text-muted-foreground" />}
                                        {isEn ? 'Vibration Alert' : '진동 알림'}
                                    </span>
                                    <button
                                        onClick={() => setVibrationEnabled(!vibrationEnabled)}
                                        className={`w-12 h-6 rounded-full transition-colors relative ${vibrationEnabled ? 'bg-primary' : 'bg-secondary border border-border'}`}
                                    >
                                        <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${vibrationEnabled ? 'translate-x-6' : ''}`} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* History Modal */}
            {showHistory && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-card w-full max-w-md rounded-2xl shadow-2xl p-6 space-y-4 max-h-[80vh] flex flex-col border border-border">
                        <div className="flex justify-between items-center mb-2">
                            <h2 className="text-xl font-bold flex items-center gap-2">
                                <History className="w-5 h-5 text-primary" /> {isEn ? 'Focus History' : '기록'}
                            </h2>
                            <button onClick={() => setShowHistory(false)} className="p-1 hover:bg-secondary rounded-full text-muted-foreground hover:text-foreground transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
                            {history.length === 0 ? (
                                <div className="text-center text-muted-foreground py-12 flex flex-col items-center gap-3">
                                    <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
                                        <History className="w-8 h-8 opacity-50" />
                                    </div>
                                    <p className="font-medium">
                                        {isEn ? "No records yet." : "아직 기록이 없습니다."}<br />
                                        <span className="text-sm opacity-70">{isEn ? "Complete a session to log it here!" : "첫 번째 세션을 완료해보세요!"}</span>
                                    </p>
                                </div>
                            ) : (
                                history.map((session) => (
                                    <div key={session.id} className="flex justify-between items-center p-4 bg-secondary/30 hover:bg-secondary/50 transition-colors border border-border/50 rounded-xl group">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-full">
                                                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                                            </div>
                                            <div className="text-sm">
                                                <div className="font-bold text-foreground">{new Date(session.date).toLocaleDateString()}</div>
                                                <div className="text-xs font-medium text-muted-foreground">{new Date(session.date).toLocaleTimeString()}</div>
                                            </div>
                                        </div>
                                        <div className="font-mono font-black text-primary bg-primary/10 px-3 py-1 rounded-lg">
                                            {session.duration}{isEn ? 'm' : '분'}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {history.length > 0 && (
                            <button
                                onClick={clearHistory}
                                className="w-full py-3 mt-4 text-sm font-bold text-red-500 bg-red-50/50 hover:bg-red-100 dark:bg-red-900/10 dark:hover:bg-red-900/30 rounded-xl transition-colors border border-red-100 dark:border-red-900/50"
                            >
                                {isEn ? 'Clear History' : '기록 초기화'}
                            </button>
                        )}
                    </div>
                </div>
            )}

            <ToolGuide
                title={isEn ? "Effective Pomodoro Working Strategy" : "효율적인 시간 관리를 위한 포모도로 가이드"}
                intro={isEn 
                    ? "The Pomodoro Technique is highly recognized for massively scaling concentration efficiency via structured workflow bounds." 
                    : "프란체스코 시릴로가 제안한 포모도로 기법은 집중력을 극대화하는 시간 관리법입니다. 25분 집중과 5분 휴식을 반복하여 업무 효율을 높여보세요."}
                steps={steps}
                tips={isEn ? [
                    "Silence device distractions prior to dedicating deep focus inside a cycle bounds.",
                    "If you ever feel burnout, modify timings easily inside our parameters via settings dial.",
                    "Drink plenty of water precisely when the timeout alarm starts resonating."
                ] : [
                    "집중 시간에는 스마트폰 알림 등 모든 방해 요소를 차단하세요.",
                    "5분 휴식 시에는 화면을 보지 않고 스트레칭이나 물 마시기를 권장합니다.",
                    "자신의 컨디션에 따라 집중 시간을 50분, 휴식을 10분으로 조정해 보세요."
                ]}
                faqs={faqs}
            />
        </div>
    );
};

export default PomodoroTimer;
