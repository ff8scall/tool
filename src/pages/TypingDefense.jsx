import React, { useState, useEffect, useRef } from 'react';

import { Share2, RefreshCw, Keyboard, Heart, Play, Trophy, Crosshair } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';

const TypingDefense = () => {
    const [gameState, setGameState] = useState('start'); // start, playing, gameover
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(5);
    const [words, setWords] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef(null);
    const gameLoopRef = useRef(null);
    const lastSpawnRef = useRef(0);
    const spawnRateRef = useRef(2000); // Initial spawn rate ms

    // Dictionary
    const wordList = [
        "사과", "바나나", "포도", "딸기", "수박", "자동차", "비행기", "기차",
        "컴퓨터", "마우스", "키보드", "모니터", "책상", "의자", "학교", "병원",
        "경찰서", "소방서", "우체국", "도서관", "대한민국", "미국", "일본", "중국",
        "호랑이", "사자", "토끼", "강아지", "고양이", "독수리", "거북이", "유틸리티",
        "개발자", "코딩", "알고리즘", "데이터", "서버", "클라우드", "인공지능",
        "블록체인", "메타버스", "자바스크립트", "파이썬", "리액트", "프레임워크",
        "사랑해", "고마워", "미안해", "행복해", "즐거워", "안녕하세요", "반갑습니다",
        "동해물과", "백두산이", "마르고", "닳도록", "하느님이", "보우하사", "우리나라", "만세"
    ];

    const spawnWord = () => {
        const text = wordList[Math.floor(Math.random() * wordList.length)];
        const id = Date.now() + Math.random();
        // Random x position (0 to 90%)
        const left = Math.floor(Math.random() * 80) + 10;
        setWords(prev => [...prev, { id, text, left, top: 0 }]);
    };

    const startGame = () => {
        setGameState('playing');
        setScore(0);
        setLives(5);
        setWords([]);
        setInputValue('');
        lastSpawnRef.current = Date.now();
        spawnRateRef.current = 2000;

        // Focus input
        setTimeout(() => inputRef.current?.focus(), 100);
    };

    const stopGame = () => {
        setGameState('gameover');
        if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current);
    };

    useEffect(() => {
        if (gameState !== 'playing') return;

        const loop = () => {
            const now = Date.now();

            // Spawn logic
            if (now - lastSpawnRef.current > spawnRateRef.current) {
                spawnWord();
                lastSpawnRef.current = now;
                // Increase difficulty
                spawnRateRef.current = Math.max(800, spawnRateRef.current - 20);
            }

            // Move words
            setWords(prevWords => {
                const newWords = [];
                let damage = 0;

                prevWords.forEach(word => {
                    // fall speed based on score?
                    const speed = 0.5 + (score > 100 ? 0.3 : 0) + (score > 300 ? 0.5 : 0);
                    const newTop = word.top + speed;

                    if (newTop > 90) { // Reached bottom (assumed 100% height container)
                        damage++;
                    } else {
                        newWords.push({ ...word, top: newTop });
                    }
                });

                if (damage > 0) {
                    setLives(prev => {
                        const newLives = prev - damage;
                        if (newLives <= 0) {
                            stopGame();
                            return 0;
                        }
                        return newLives;
                    });
                }

                return newWords;
            });

            if (gameState === 'playing') {
                gameLoopRef.current = requestAnimationFrame(loop);
            }
        };

        gameLoopRef.current = requestAnimationFrame(loop);

        
    const toolFaqs = [
        {
            "q": "타자 디펜스(베네치아/산성비) 게임은 어떤 규칙인가요?",
            "a": "하늘에서 내려오는 각종 단어들이 바닥 유리에 닿기 전에, 그 단어를 키보드로 정확히 입력하고 엔터를 쳐서 박살내는 추억의 게임입니다."
        },
        {
            "q": "단어의 난이도는 어떻게 조절되나요?",
            "a": "레벨이 상승함에 따라 단어의 글자 수가 길어지고(사자성어, 긴 영어 단어 등), 단어가 쏟아지는 속도가 점점 더 잔인하게 빨라집니다."
        }
    ];
    const toolSteps = [
        "게임을 시작하고 내려오는 단어 하나를 타겟팅합니다.",
        "입력창에 오타 없이 단어를 타이핑 한 뒤 엔터(Enter) 키로 발사합니다.",
        "바닥에 단어가 닿아 생명력이 닳기 전 모든 단어를 격추하여 베네치아를 수호하세요."
    ];
    const toolTips = [
        "여러 단어가 동시에 내려올 경우 가장 바닥에 근접한 단어부터 최우선으로 타겟팅하는 침착함이 생명입니다.",
        "독수리 타법보다는 양손을 키보드 기준선에 가지런히 올리는 정석 타건 연습을 하기 가장 좋은 훌륭한 교육용 소프트웨어입니다."
    ];

    return () => cancelAnimationFrame(gameLoopRef.current);
    }, [gameState, score]); // lives is handled inside local scope or ref check if needed, but setState function form is safe

    const handleInput = (e) => {
        const val = e.target.value;
        setInputValue(val);

        // Check matching word
        const matchedIndex = words.findIndex(w => w.text === val.trim());
        if (matchedIndex !== -1) {
            // Destroy word
            const destroyedWord = words[matchedIndex];
            setWords(prev => prev.filter((_, i) => i !== matchedIndex));
            setInputValue('');
            setScore(prev => prev + 10 + destroyedWord.text.length); // Bonus for length
        }
    };

    const getRank = (finalScore) => {
        if (finalScore >= 1000) return { title: "타자 신", desc: "손가락이 보이지 않는군요!", color: "text-purple-600" };
        if (finalScore >= 500) return { title: "속기사", desc: "엄청난 속도입니다.", color: "text-blue-600" };
        if (finalScore >= 200) return { title: "고수", desc: "상당한 실력자시군요.", color: "text-green-600" };
        return { title: "초보", desc: "조금 더 연습이 필요해요!", color: "text-gray-500" };
    };

    const shareResult = () => {
        const rank = getRank(score);
        if (navigator.share) {
            navigator.share({
                title: '타자 디펜스 게임',
                text: `나의 방어 점수: ${score}점 (${rank.title}) - 유틸리티 허브`,
                url: window.location.href,
            });
        } else {
            alert('링크가 복사되었습니다!');
            navigator.clipboard.writeText(window.location.href);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <SEO
                title="타자 디펜스 게임 | 떨어지는 단어를 파괴하라!"
                description="단어가 바닥에 닿기 전에 입력해서 파괴하세요! 스릴 넘치는 타자 연습 게임. 당신의 타자 속도와 순발력을 테스트해보세요."
                keywords="타자게임, 한컴타자, 베네치아, 산성비, 타자연습, typing game"
                category="게임"
                faqs={toolFaqs}
                steps={toolSteps}
            />

            <div className="text-center mb-6">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4 animate-fade-in">
                    ⌨️ 타자 디펜스
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                    단어가 바닥에 닿기 전에 입력하여 파괴하세요!
                </p>
            </div>

            <div className="max-w-3xl mx-auto">
                <div className="relative bg-gray-900 border-4 border-gray-700 rounded-3xl shadow-2xl overflow-hidden h-[500px] mb-6">

                    {gameState === 'playing' && (
                        <>
                            {/* HUD */}
                            <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-center bg-gradient-to-b from-black/50 to-transparent z-10 text-white">
                                <div className="flex items-center gap-2 text-xl font-bold">
                                    <Trophy className="text-yellow-400" />
                                    <span>{score}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Heart
                                            key={i}
                                            className={`w-6 h-6 ${i < lives ? 'text-red-500 fill-red-500' : 'text-gray-600'}`}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Game Area */}
                            {words.map(word => (
                                <div
                                    key={word.id}
                                    className="absolute transform -translate-x-1/2 px-3 py-1 bg-white/10 backdrop-blur-sm border border-white/30 rounded-full text-white font-bold text-lg shadow-lg"
                                    style={{
                                        left: `${word.left}%`,
                                        top: `${word.top}%`,
                                        opacity: Math.max(0.2, 1 - word.top / 100) // maybe fade slightly or not
                                    }}
                                >
                                    {word.text}
                                </div>
                            ))}

                            {/* Threat Line */}
                            <div className="absolute bottom-0 w-full h-[10%] bg-gradient-to-t from-red-900/50 to-transparent border-t border-red-500/30"></div>
                        </>
                    )}

                    {gameState === 'start' && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm text-white z-20">
                            <Keyboard className="w-24 h-24 text-blue-400 mb-6 animate-pulse" />
                            <h2 className="text-3xl font-bold mb-4">지구를 지켜라!</h2>
                            <p className="mb-8 text-gray-300">단어가 붉은 선에 닿으면 생명이 줄어듭니다.</p>
                            <button
                                onClick={startGame}
                                className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white text-xl font-bold rounded-2xl shadow-lg transition-transform hover:scale-105 flex items-center"
                            >
                                <Play className="w-6 h-6 mr-2" fill="currentColor" />
                                게임 시작
                            </button>
                        </div>
                    )}

                    {gameState === 'gameover' && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md text-white z-20 animate-scale-in">
                            <Trophy className="w-24 h-24 text-yellow-400 mb-4" />
                            <h2 className="text-4xl font-bold mb-2">Game Over</h2>

                            <div className="text-xl mb-8 text-gray-300">
                                최종 점수: <span className="text-3xl text-yellow-400 font-black">{score}</span>
                                <div className={`text-lg mt-2 font-bold ${getRank(score).color.replace('text-', 'text-')}`}>
                                    {getRank(score).title} - {getRank(score).desc}
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button
                                    onClick={startGame}
                                    className="px-6 py-3 bg-white text-gray-900 font-bold rounded-xl hover:bg-gray-200 transition-colors"
                                >
                                    다시 도전
                                </button>
                                <button
                                    onClick={shareResult}
                                    className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-500 transition-colors"
                                >
                                    결과 공유
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="relative">
                    <input
                        ref={inputRef}
                        type="text"
                        value={inputValue}
                        onChange={handleInput}
                        disabled={gameState !== 'playing'}
                        placeholder={gameState === 'playing' ? "단어를 입력하세요!" : "게임 시작을 눌러주세요"}
                        className="w-full bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white text-2xl font-bold py-4 px-6 rounded-2xl focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 shadow-lg text-center"
                        autoComplete="off"
                        autoFocus
                    />
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <Crosshair className="w-6 h-6" />
                    </div>
                </div>
            </div>

            
        
            <div className="mt-12">
                <ToolGuide
                    title="타자 디펜스 게임 안내"
                    intro="단어가 바닥에 닿기 전에 입력해서 파괴하세요! 스릴 넘치는 타자 연습 게임. 당신의 타자 속도와 순발력을 테스트해보세요."
                    steps={toolSteps}
                    tips={toolTips}
                    faqs={toolFaqs}
                />
            </div>
        </div>
    );
};

export default TypingDefense;
