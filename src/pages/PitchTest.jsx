import React, { useState, useEffect, useRef } from 'react';
import { Share2, RefreshCw, Music, Play, Volume2, Trophy, Zap } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { useLanguage } from '../context/LanguageContext';

const PitchTest = () => {
    const { lang } = useLanguage();
    const isEn = lang === 'en';
    const [gameState, setGameState] = useState('start'); // start, playing, result
    const [currentNote, setCurrentNote] = useState(null);
    const [score, setScore] = useState(0);
    const [round, setRound] = useState(1);
    const [feedback, setFeedback] = useState(null); // 'correct', 'wrong'
    const audioContextRef = useRef(null);

    const notes = [
        { name: 'C', label: isEn ? 'Do' : '도', sub: 'C', freq: 261.63 },
        { name: 'D', label: isEn ? 'Re' : '레', sub: 'D', freq: 293.66 },
        { name: 'E', label: isEn ? 'Mi' : '미', sub: 'E', freq: 329.63 },
        { name: 'F', label: isEn ? 'Fa' : '파', sub: 'F', freq: 349.23 },
        { name: 'G', label: isEn ? 'Sol' : '솔', sub: 'G', freq: 392.00 },
        { name: 'A', label: isEn ? 'La' : '라', sub: 'A', freq: 440.00 },
        { name: 'B', label: isEn ? 'Si' : '시', sub: 'B', freq: 493.88 },
        { name: 'C2', label: isEn ? 'Do (↑)' : '도(↑)', sub: 'C5', freq: 523.25 }
    ];

    const totalRounds = 10;

    const playTone = (freq, duration = 0.5) => {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;

        if (!audioContextRef.current) {
            audioContextRef.current = new AudioContext();
        }

        const ctx = audioContextRef.current;
        if (ctx.state === 'suspended') {
            ctx.resume();
        }

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        gain.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + duration);
        osc.stop(ctx.currentTime + duration);
    };

    const startGame = () => {
        setGameState('playing');
        setScore(0);
        setRound(1);
        setFeedback(null);
        nextRound();
    };

    const nextRound = () => {
        const randomNote = notes[Math.floor(Math.random() * notes.length)];
        setCurrentNote(randomNote);
        setTimeout(() => playTone(randomNote.freq, 1), 500);
    };

    const handleGuess = (note) => {
        if (feedback) return;

        playTone(note.freq, 0.3); // Feedback sound

        if (note.name === currentNote.name) {
            setScore(prev => prev + 1);
            setFeedback('correct');
        } else {
            setFeedback('wrong');
        }

        setTimeout(() => {
            if (round < totalRounds) {
                setRound(prev => prev + 1);
                setFeedback(null);
                nextRound();
            } else {
                setGameState('result');
            }
        }, 1000);
    };

    const replayNote = () => {
        if (currentNote) {
            playTone(currentNote.freq, 1);
        }
    };

    const getRank = (finalScore) => {
        if (finalScore === 10) return { title: isEn ? "Absolute Maestro" : "절대음감 마에스트로", desc: isEn ? "Perfect score! Your ears are a musical instrument." : "완벽합니다! 당신의 귀는 악기와 같습니다.", color: "text-purple-600" };
        if (finalScore >= 8) return { title: isEn ? "Elite Musician" : "엘리트 음악가", desc: isEn ? "Incredible pitch perception! You have musical talent." : "상당한 음감을 가지고 계시군요!", color: "text-blue-600" };
        if (finalScore >= 5) return { title: isEn ? "Music Enthusiast" : "음악 애호가", desc: isEn ? "Average sense of pitch. Practice makes perfect." : "평균적인 음감입니다. 연습하면 더 좋아질 수 있어요.", color: "text-green-600" };
        return { title: isEn ? "Tone Deaf?" : "음치 탈출 시급", desc: isEn ? "Maybe you were just unlucky. Try focusing on the foundation note." : "혹시 노래방에서 마이크 뺏기시나요? 😅", color: "text-slate-500" };
    };

    const shareResult = () => {
        const rank = getRank(score);
        const text = isEn 
            ? `My pitch score: ${score}/${totalRounds} pts! Rank: ${rank.title} | Tool Hive` 
            : `나의 음감 점수는 ${score}/${totalRounds}점! 등급: ${rank.title} - 유틸리티 허브`;
        if (navigator.share) {
            navigator.share({
                title: isEn ? 'Absolute Pitch Test' : '절대음감 테스트',
                text: text,
                url: window.location.href,
            });
        } else {
            alert(isEn ? 'Link copied to clipboard!' : '링크가 복사되었습니다!');
            navigator.clipboard.writeText(window.location.href);
        }
    };

    const toolFaqs = isEn ? [
        { q: "What is Absolute Pitch?", a: "Also known as perfect pitch, it's the ability to identify a musical note by name without any reference tone." },
        { q: "Can I improve my pitch with this test?", a: "Yes. Regular training in ear perception can strengthen the connections between sounds and their names in your auditory memory." },
        { q: "Should I use headphones?", a: "Yes. High-quality audio output ensures that you hear the precise fundamental frequency without interference or distortion." }
    ] : [
        { q: "절대음감 테스트는 어떻게 진행되나요?", a: "피아노 건반 소리 등 특정 음고(Pitch)를 들려주면, 아무런 기준 음 도움 없이 그 소리가 어떤 계이름인지 맞추는 테스트입니다." },
        { q: "모바일 환경에서도 잘 되나요?", a: "네, 오디오 재생이 가능한 스마트폰 환경이라면 누구나 이어폰을 꽂고 테스트를 즐길 수 있습니다." }
    ];

    const toolSteps = isEn ? [
        "Click the Start button and prepare to listen to a single musical tone.",
        "A synthesized piano-like sound will play once for each round.",
        "Choose the note name (Do, Re, Mi, etc.) that matches what you just heard.",
        "Check your score after 10 rounds to see your pitch ranking."
    ] : [
        "볼륨을 적절히 조절하고 플레이 버튼을 눌러 첫 번째 음을 듣습니다.",
        "도, 레, 미, 파, 솔, 라, 시 중 방금 들은 음과 똑같다고 생각하는 건반 버튼을 누릅니다.",
        "정답 여부를 확인하고 다음 라운드로 넘어가 10문제를 모두 풉니다.",
        "최종 점수에 따른 본인의 음감 등급과 코멘트를 확인합니다."
    ];

    const toolTips = isEn ? [
        "Try to sing the note after hearing it to reinforce the pitch in your brain.",
        "Close your eyes while listening to minimize visual distractions.",
        "If you missed the sound, click the speaker icon in the center to replay the current note."
    ] : [
        "소음에 방해받지 않도록 조용한 환경에서 혹은 이어폰을 착용하고 테스트에 임하세요.",
        "눈을 감고 소리에만 집중하면 좀 더 명확하게 계이름이 떠오를 수 있습니다.",
        "아이콘을 누르면 소리를 다시 들을 수 있으니 놓쳤다면 다시 들어보세요."
    ];

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <SEO
                title={isEn ? "Absolute Pitch Test | Perfect Pitch Audit Quiz | Tool Hive" : "절대음감 테스트 | 도레미파솔라시도 맞추기 | Tool Hive"}
                description={isEn ? "Test your musical ear and discover if you have absolute or relative pitch. Identify notes blindly in this fun musical perception challenge." : "들려주는 음의 계이름을 맞춰보세요. 나는 절대음감일까 상대음감일까? 재미있는 음감 테스트 게임."}
                keywords={isEn ? "absolute pitch, perfect pitch test, musical ear, note recognition, pitch perception" : "절대음감, 상대음감, 음감테스트, 청음, 계이름맞추기, pitch test"}
                category="Luck/Fun"
                faqs={toolFaqs}
                steps={toolSteps}
            />

            <div className="text-center mb-10">
                <div className="inline-block p-4 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mb-6">
                    <Music size={48} className="text-indigo-600 dark:text-indigo-400" />
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 tracking-tighter italic uppercase">
                    {isEn ? 'Sonic Pitch Mastery' : '절대 음감 테스트'}
                </h1>
                <p className="text-xl text-muted-foreground font-medium italic">
                    {isEn ? "Identify the soul of the sound. What's the note?" : "들려주는 음의 계이름을 맞춰보세요."}
                </p>
            </div>

            <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 rounded-[3rem] shadow-2xl p-10 border-4 border-slate-100 dark:border-slate-700 transition-all min-h-[500px] flex flex-col justify-center items-center relative overflow-hidden">
                
                {gameState === 'start' && (
                    <div className="text-center z-10 animate-in zoom-in duration-500">
                        <Zap size={80} className="text-yellow-500 mx-auto mb-8 animate-bounce" />
                        <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-6 italic tracking-tighter uppercase">{isEn ? 'Ready for Audio?' : '준비되셨나요?'}</h2>
                        <p className="text-lg text-muted-foreground mb-10 font-medium italic">
                            {isEn ? 'High-quality headphones are recommended for best precision.' : '조용한 곳에서 스피커나 이어폰을 사용해주세요. 총 10문제가 출제됩니다.'}
                        </p>
                        <button
                            onClick={startGame}
                            className="w-full max-w-xs py-6 bg-slate-900 text-white rounded-2xl font-black text-2xl hover:scale-105 transition-all shadow-xl active:scale-95 italic uppercase flex items-center justify-center gap-3 mx-auto"
                        >
                            <Play fill="currentColor" />
                            {isEn ? 'INITIALIZE TEST' : '테스트 시작'}
                        </button>
                    </div>
                )}

                {gameState === 'playing' && (
                    <div className="w-full z-10 animate-in fade-in duration-500">
                        <div className="flex justify-between items-center mb-10 px-6 py-3 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border-2 border-border/50">
                            <div className="text-center">
                                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest block italic">{isEn ? 'ROUND' : '라운드'}</span>
                                <span className="text-2xl font-black text-slate-800 dark:text-white italic">{round} / {totalRounds}</span>
                            </div>
                            <div className="text-center">
                                <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest block italic">{isEn ? 'SCORE' : '점수'}</span>
                                <span className="text-2xl font-black text-indigo-500 italic font-mono">{score}</span>
                            </div>
                        </div>

                        <div className="text-center mb-12">
                            <button
                                onClick={replayNote}
                                className="w-40 h-40 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:hover:bg-indigo-900/50 rounded-full flex items-center justify-center mx-auto transition-all transform active:scale-95 shadow-inner border-4 border-white dark:border-slate-700 relative group"
                            >
                                <Volume2 className="w-20 h-20 text-indigo-500 group-hover:scale-110 transition-transform" />
                                <div className="absolute inset-0 rounded-full border-4 border-indigo-200 dark:border-indigo-500/20 animate-ping opacity-20"></div>
                            </button>
                            <p className="mt-6 text-slate-400 text-xs font-black uppercase tracking-widest italic">{isEn ? 'Tap to replay note' : '아이콘을 누르면 다시 들을 수 있습니다'}</p>
                        </div>

                        {feedback && (
                            <div className={`text-center mb-8 font-black text-3xl italic tracking-tighter animate-in bounce-in duration-300 ${feedback === 'correct' ? 'text-green-500' : 'text-rose-500'}`}>
                                {feedback === 'correct' ? (isEn ? 'PERFECT! ⭕' : '정답입니다! ⭕') : (isEn ? `WRONG! ANSWER: ${currentNote.label} ❌` : `땡! 정답은 ${currentNote.label} ❌`)}
                            </div>
                        )}

                        <div className="grid grid-cols-4 gap-4">
                            {notes.map((note) => (
                                <button
                                    key={note.name}
                                    onClick={() => handleGuess(note)}
                                    disabled={feedback !== null}
                                    className={`
                                        relative py-8 rounded-[2rem] font-black text-2xl italic transition-all shadow-xl group border-4
                                        ${note.name.includes('C2') ? 'col-span-4 bg-slate-900 text-white border-transparent' : 'bg-white dark:bg-slate-700 border-slate-100 dark:border-slate-600 text-slate-800 dark:text-white hover:border-indigo-500 hover:text-indigo-600'}
                                        ${feedback ? 'opacity-50' : 'active:scale-95'}
                                    `}
                                >
                                    {note.label}
                                    <span className="absolute bottom-2 right-4 text-[10px] text-slate-400 font-black italic">{note.sub}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {gameState === 'result' && (
                    <div className="text-center z-10 animate-in zoom-in duration-500 w-full p-6">
                        <Trophy size={80} className="text-yellow-500 mx-auto mb-8 drop-shadow-[0_0_20px_rgba(234,179,8,0.3)]" />
                        
                        <div className="py-8">
                            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest block italic mb-2">{isEn ? 'TOTAL PERFORMANCE' : '최종 점수'}</span>
                            <div className="text-8xl font-black text-indigo-500 italic tracking-tighter mb-4">
                                {score} <span className="text-3xl text-slate-400">/ {totalRounds}</span>
                            </div>
                        </div>

                        <div className="bg-slate-50 dark:bg-slate-900/50 p-10 rounded-[2.5rem] border-2 border-border/50 mb-10">
                            <h3 className={`text-3xl font-black mb-3 italic tracking-tight ${getRank(score).color}`}>
                                {getRank(score).title}
                            </h3>
                            <p className="text-slate-600 dark:text-slate-400 font-medium italic">
                                {getRank(score).desc}
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={startGame}
                                className="flex-1 flex items-center justify-center px-8 py-5 bg-slate-900 text-white rounded-2xl font-black text-lg hover:scale-105 transition-all shadow-xl active:scale-95 italic uppercase"
                            >
                                <RefreshCw className="w-6 h-6 mr-3" />
                                {isEn ? 'RESTART' : '다시하기'}
                            </button>
                            <button
                                onClick={shareResult}
                                className="flex-1 flex items-center justify-center px-8 py-5 bg-primary text-white rounded-2xl font-black text-lg hover:scale-105 transition-all shadow-xl shadow-primary/20 active:scale-95 italic uppercase"
                            >
                                <Share2 className="w-6 h-6 mr-3" />
                                {isEn ? 'BROADCAST' : '결과 공유'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        
            <div className="mt-20">
                <ToolGuide
                    title={isEn ? "The Pitch Mastery Guide" : "절대음감 테스트 안내"}
                    intro={isEn ? "Absolute pitch is not just about musical talent; it's about the brain's ability to categorize sonic information. This test uses pure synthetic frequencies to evaluate your internal baseline and provides a standardized audit of your musical perception skills. Perfect for aspiring musicians and music enthusiasts alike." : "들려주는 음의 계이름을 맞춰보세요. 나는 절대음감일까 상대음감일까? 재미있는 음감 테스트 게임."}
                    steps={toolSteps}
                    tips={toolTips}
                    faqs={toolFaqs}
                />
            </div>
        </div>
    );
};

export default PitchTest;
