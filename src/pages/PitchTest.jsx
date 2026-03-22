import React, { useState, useEffect, useRef } from 'react';

import { Share2, RefreshCw, Music, Play, Volume2 } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';

const PitchTest = () => {
    const [gameState, setGameState] = useState('start'); // start, playing, result
    const [currentNote, setCurrentNote] = useState(null);
    const [score, setScore] = useState(0);
    const [round, setRound] = useState(1);
    const [feedback, setFeedback] = useState(null); // 'correct', 'wrong'
    const audioContextRef = useRef(null);

    const notes = [
        { name: 'C', label: '도', freq: 261.63 },
        { name: 'D', label: '레', freq: 293.66 },
        { name: 'E', label: '미', freq: 329.63 },
        { name: 'F', label: '파', freq: 349.23 },
        { name: 'G', label: '솔', freq: 392.00 },
        { name: 'A', label: '라', freq: 440.00 },
        { name: 'B', label: '시', freq: 493.88 },
        { name: 'C2', label: '도(↑)', freq: 523.25 }
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
        if (finalScore === 10) return { title: "절대음감 마에스트로", desc: "완벽합니다! 당신의 귀는 악기와 같습니다.", color: "text-purple-600" };
        if (finalScore >= 8) return { title: "엘리트 음악가", desc: "상당한 음감을 가지고 계시군요!", color: "text-blue-600" };
        if (finalScore >= 5) return { title: "음악 애호가", desc: "평균적인 음감입니다. 연습하면 더 좋아질 수 있어요.", color: "text-green-600" };
        return { title: "음치 탈출 시급", desc: "혹시 노래방에서 마이크 뺏기시나요? 😅", color: "text-gray-500" };
    };

    const shareResult = () => {
        const rank = getRank(score);
        if (navigator.share) {
            navigator.share({
                title: '절대음감 테스트',
                text: `나의 음감 점수는 ${score}/${totalRounds}점! 등급: ${rank.title} - 유틸리티 허브`,
                url: window.location.href,
            });
        } else {
            alert('링크가 복사되었습니다!');
            navigator.clipboard.writeText(window.location.href);
        }
    };

    
    const toolFaqs = [
        {
            "q": "절대음감 테스트는 어떻게 진행되나요?",
            "a": "피아노 건반 소리 등 특정 음고(Pitch)를 들려주면, 아무런 기준 음 도움 없이 그 소리가 어떤 계이름인지 맞추는 테스트입니다."
        },
        {
            "q": "모바일 환경에서도 잘 되나요?",
            "a": "네, 오디오 재생이 가능한 스마트폰 환경이라면 누구나 이어폰을 꽂고 테스트를 즐길 수 있습니다."
        }
    ];
    const toolSteps = [
        "볼륨을 적절히 조절하고 플레이 버튼을 눌러 첫 번째 음을 듣습니다.",
        "도, 레, 미, 파, 솔, 라, 시 중 방금 들은 음과 똑같다고 생각하는 건반 버튼을 누릅니다.",
        "정답 여부와 해설을 확인하고 점점 어려워지는 다음 라운드에 도전합니다."
    ];
    const toolTips = [
        "소음에 방해받지 않도록 조용한 환경에서 혹은 이어폰을 착용하고 테스트에 임하세요.",
        "화음이 들려올 때는 가장 베이스가 되는 밑음이나 가장 높은 탑노트를 집중해서 들어보세요."
    ];

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <SEO
                title="절대음감 테스트 | 도레미파솔라시도 맞추기"
                description="들려주는 음의 계이름을 맞춰보세요. 나는 절대음감일까 상대음감일까? 재미있는 음감 테스트 게임."
                keywords="절대음감, 상대음감, 음감테스트, 청음, 계이름맞추기, pitch test"
                category="게임"
                faqs={toolFaqs}
                steps={toolSteps}
            />

            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4 animate-fade-in">
                    🎹 절대음감 테스트
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                    들려주는 음의 계이름을 맞춰보세요. (총 {totalRounds}문제)
                </p>
            </div>

            <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden p-8 transition-all duration-300 min-h-[400px] flex flex-col justify-center items-center">

                {gameState === 'start' && (
                    <div className="text-center animate-fade-in">
                        <Music className="w-24 h-24 text-indigo-500 mx-auto mb-6" />
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">준비되셨나요?</h2>
                        <p className="text-gray-600 dark:text-gray-400 mb-8">
                            조용한 곳에서 스피커나 이어폰을 사용해주세요.
                        </p>
                        <button
                            onClick={startGame}
                            className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white text-xl font-bold rounded-2xl shadow-lg transition-all transform hover:-translate-y-1 flex items-center mx-auto"
                        >
                            <Play className="w-6 h-6 mr-2" fill="currentColor" />
                            테스트 시작
                        </button>
                    </div>
                )}

                {gameState === 'playing' && (
                    <div className="w-full animate-fade-in">
                        <div className="flex justify-between items-center mb-8 px-4">
                            <span className="font-bold text-gray-500">ROUND {round}/{totalRounds}</span>
                            <span className="font-bold text-indigo-500">SCORE {score}</span>
                        </div>

                        <div className="text-center mb-10">
                            <button
                                onClick={replayNote}
                                className="w-32 h-32 bg-indigo-100 hover:bg-indigo-200 dark:bg-indigo-900/30 dark:hover:bg-indigo-900/50 rounded-full flex items-center justify-center mx-auto transition-all transform active:scale-95 shadow-inner mb-4"
                            >
                                <Volume2 className="w-16 h-16 text-indigo-600 dark:text-indigo-400" />
                            </button>
                            <p className="text-gray-500 text-sm">아이콘을 누르면 소리를 다시 들을 수 있습니다</p>
                        </div>

                        {feedback && (
                            <div className={`text-center mb-6 font-bold text-xl animate-bounce ${feedback === 'correct' ? 'text-green-500' : 'text-red-500'}`}>
                                {feedback === 'correct' ? '정답입니다! ⭕' : `땡! 정답은 ${currentNote.label} ❌`}
                            </div>
                        )}

                        <div className="grid grid-cols-4 gap-3">
                            {notes.map((note) => (
                                <button
                                    key={note.name}
                                    onClick={() => handleGuess(note)}
                                    disabled={feedback !== null}
                                    className={`
                                        py-6 rounded-xl font-bold text-lg transition-all shadow-md
                                        ${note.name.includes('C2') ? 'col-span-4 bg-indigo-100 text-indigo-800' : 'bg-white border-2 border-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-600'}
                                        active:scale-95 active:bg-indigo-200
                                    `}
                                >
                                    {note.label}
                                    <span className="block text-xs text-gray-400 font-normal">{note.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {gameState === 'result' && (
                    <div className="text-center animate-scale-in w-full">
                        <Music className="w-20 h-20 text-indigo-500 mx-auto mb-6" />

                        <div className="mb-8">
                            <span className="text-gray-500 dark:text-gray-400">최종 점수</span>
                            <div className="text-6xl font-black text-indigo-600 dark:text-indigo-400 my-2">
                                {score} <span className="text-2xl text-gray-400 font-bold">/ {totalRounds}</span>
                            </div>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-700/50 p-6 rounded-2xl mb-8">
                            <h3 className={`text-2xl font-bold mb-2 ${getRank(score).color}`}>
                                {getRank(score).title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300">
                                {getRank(score).desc}
                            </p>
                        </div>

                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={startGame}
                                className="flex items-center px-6 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-xl font-bold transition-all"
                            >
                                <RefreshCw className="w-5 h-5 mr-2" />
                                다시하기
                            </button>
                            <button
                                onClick={shareResult}
                                className="flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-500/30 transition-all transform hover:-translate-y-1"
                            >
                                <Share2 className="w-5 h-5 mr-2" />
                                결과 공유
                            </button>
                        </div>
                    </div>
                )}
            </div>

            
        
            <div className="mt-12">
                <ToolGuide
                    title="절대음감 테스트 안내"
                    intro="들려주는 음의 계이름을 맞춰보세요. 나는 절대음감일까 상대음감일까? 재미있는 음감 테스트 게임."
                    steps={toolSteps}
                    tips={toolTips}
                    faqs={toolFaqs}
                />
            </div>
        </div>
    );
};

export default PitchTest;
