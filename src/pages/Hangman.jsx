import React, { useState, useEffect, useCallback } from 'react';

import { Share2, RefreshCw, Undo2, HelpCircle } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';

const Hangman = () => {
    const categories = {
        '동물': ['호랑이', '고양이', '강아지', '코끼리', '기린', '사자', '펭귄', '판다', '원숭이', '독수리'],
        '과일': ['사과', '바나나', '포도', '딸기', '수박', '오렌지', '키위', '망고', '복숭아', '체리'],
        '나라': ['한국', '미국', '일본', '중국', '호주', '캐나다', '영국', '프랑스', '독일', '이집트'],
        '직업': ['의사', '경찰', '소방관', '요리사', '가수', '배우', '군인', '선생님', '개발자', '변호사']
    };

    // Hangman drawing parts
    const drawParts = [
        // Base
        <line x1="10" y1="250" x2="150" y2="250" stroke="currentColor" strokeWidth="4" />,
        <line x1="80" y1="250" x2="80" y2="20" stroke="currentColor" strokeWidth="4" />,
        <line x1="80" y1="20" x2="200" y2="20" stroke="currentColor" strokeWidth="4" />,
        <line x1="200" y1="20" x2="200" y2="50" stroke="currentColor" strokeWidth="4" />,
        // Head
        <circle cx="200" cy="80" r="30" stroke="currentColor" strokeWidth="4" fill="none" />,
        // Body
        <line x1="200" y1="110" x2="200" y2="170" stroke="currentColor" strokeWidth="4" />,
        // Left Arm
        <line x1="200" y1="130" x2="170" y2="160" stroke="currentColor" strokeWidth="4" />,
        // Right Arm
        <line x1="200" y1="130" x2="230" y2="160" stroke="currentColor" strokeWidth="4" />,
        // Left Leg
        <line x1="200" y1="170" x2="170" y2="220" stroke="currentColor" strokeWidth="4" />,
        // Right Leg
        <line x1="200" y1="170" x2="230" y2="220" stroke="currentColor" strokeWidth="4" />,
        // Face (Dead) - only shown on loss
        <g>
            <path d="M190 75 L200 85 M200 75 L190 85" stroke="currentColor" strokeWidth="2" />,
            <path d="M200 75 L210 85 M210 75 L200 85" stroke="currentColor" strokeWidth="2" />
        </g>
    ];

    const [gameState, setGameState] = useState('start'); // start, playing, won, lost
    const [word, setWord] = useState('');
    const [category, setCategory] = useState('');
    const [scrambledWord, setScrambledWord] = useState([]); // Array of characters: { char, revealed }
    const [wrongGuesses, setWrongGuesses] = useState(0);
    const [guessedLetters, setGuessedLetters] = useState(new Set());

    // Korean Hangul handling is tricky because we usually play Hangman with alphabets.
    // Playing with whole Hangul blocks (e.g., '강', '아', '지') is too easy or hard depending on length.
    // Playing with Jamo (ㄱ, ㅏ, ㅇ...) would be standard Hangman style for Korean.

    // Let's go with Jamo decomposition for a proper Hangman experience!
    // Or keep it simple: Guess the whole Syllable Block.
    // Given the target audience (general), syllable block guessing is easier to implement and play on mobile.
    // BUT common Hangman words are short (2-4 chars), so guessing 1 char reveals 25-50%.
    // To make it fun, let's use a virtual keyboard of all possible syllables? No, that's impossible.
    // Let's use CONSONANTS (Initial Sound) quiz? No.

    // BEST APPROACH: Jamo decomposition is best for "Hangman".
    // But typing Jamo on standard keyboard produces composed chars.
    // Alternative: Provide a set of random syllables to choose from (distractors included)?
    // Or just stick to the classic: Alphabet Hangman with English words.
    // "English Hangman" is a classic for learning.

    // WAIT, User requested "Hangman Game".
    // Let's check typical Korean Hangman. Usually it's English.
    // Let's do English Hangman for better UX and standard gameplay.
    // Re-defining categories to English.

    const engCategories = {
        'Animals': ['TIGER', 'LION', 'ELEPHANT', 'ZEBRA', 'GIRAFFE', 'MONKEY', 'PANDA', 'KANGAROO'],
        'Fruits': ['APPLE', 'BANANA', 'GRAPE', 'STRAWBERRY', 'ORANGE', 'MANGO', 'CHERRY', 'MELON'],
        'Countries': ['KOREA', 'USA', 'JAPAN', 'CHINA', 'FRANCE', 'GERMANY', 'CANADA', 'BRAZIL'],
        'Jobs': ['DOCTOR', 'TEACHER', 'ENGINEER', 'POLICE', 'ARTIST', 'LAWYER', 'CHEF', 'NURSE']
    };

    const maxWrong = 10; // Corresponds to drawParts length minus 1 (Face is extra)

    const startGame = (selectedCat) => {
        const words = engCategories[selectedCat];
        const randomWord = words[Math.floor(Math.random() * words.length)];

        setWord(randomWord);
        setCategory(selectedCat);
        setGuessedLetters(new Set());
        setWrongGuesses(0);
        setGameState('playing');
    };

    const handleGuess = useCallback((letter) => {
        if (gameState !== 'playing' || guessedLetters.has(letter)) return;

        const newGuessed = new Set(guessedLetters);
        newGuessed.add(letter);
        setGuessedLetters(newGuessed);

        if (!word.includes(letter)) {
            const newWrong = wrongGuesses + 1;
            setWrongGuesses(newWrong);
            if (newWrong >= maxWrong) {
                setGameState('lost');
            }
        } else {
            // Check win
            const isWon = word.split('').every(char => newGuessed.has(char));
            if (isWon) {
                setGameState('won');
            }
        }
    }, [gameState, guessedLetters, word, wrongGuesses]);

    // Keyboard layout
    const keyboard = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');

    useEffect(() => {
        const handleKeyDown = (e) => {
            const char = e.key.toUpperCase();
            if (gameState === 'playing' && /^[A-Z]$/.test(char)) {
                handleGuess(char);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        
    const toolFaqs = [
        {
            "q": "행맨 게임은 어떻게 이기나요?",
            "a": "숨겨진 영단어의 알파벳을 하나씩 추측하여, 주어진 기회 (보통 6~7회) 안에 단어를 완성하면 승리합니다."
        },
        {
            "q": "틀리면 어떻게 되나요?",
            "a": "틀린 알파벳을 고를 때마다 행맨(교수대 그림)의 요소가 하나씩 추가되며, 그림이 완성되면 게임 오버됩니다."
        }
    ];
    const toolSteps = [
        "빈 칸의 개수로 단어의 길이를 파악합니다.",
        "모음(A,E,I,O,U)이나 자주 쓰이는 자음을 먼저 눌러 단어를 유추합니다.",
        "기회가 모두 소진되기 전까지 나머지 알파벳을 맞혀 단어를 완성합니다."
    ];
    const toolTips = [
        "영어 단어 공부에도 매우 효과적인 게임입니다.",
        "E, T, A, O, I, N 순서대로 영어에서 가장 자주 쓰이는 알파벳이므로 이 순서로 찍어보는 것이 좋습니다."
    ];

    return () => window.removeEventListener('keydown', handleKeyDown);
    }, [gameState, handleGuess]);

    const shareResult = () => {
        if (navigator.share) {
            navigator.share({
                title: '행맨 게임',
                text: `${gameState === 'won' ? '성공!' : '실패...'} [${category}] 단어 맞추기 - 유틸리티 허브`,
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
                title="행맨 게임 | 영어 단어 맞추기"
                description="교수대 그림이 완성되기 전에 영어 단어를 맞추세요! 스릴 넘치는 단어 추리 게임. 영어 공부도 하고 게임도 즐기세요."
                keywords="행맨, hangman, 영어단어, 단어게임, 추리게임, 영어공부"
                category="게임"
                faqs={toolFaqs}
                steps={toolSteps}
            />

            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4 animate-fade-in">
                    😵 행맨 게임
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                    그림이 완성되기 전에 단어를 구출하세요!
                </p>
            </div>

            <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden p-8 transition-all duration-300 min-h-[500px] flex flex-col md:flex-row gap-8">

                {/* Visual Section */}
                <div className="flex-1 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-2xl p-4 min-h-[300px]">
                    <svg height="300" width="300" className="text-gray-800 dark:text-white">
                        {/* Always show base */}
                        {drawParts[0]}
                        {/* Show parts based on wrong guesses */}
                        {drawParts.slice(1, wrongGuesses + 1).map((part, i) => React.cloneElement(part, { key: i }))}
                        {/* Show face if lost */}
                        {gameState === 'lost' && drawParts[10]}
                    </svg>
                    <div className="mt-4 font-bold text-gray-500">
                        남은 기회: {maxWrong - wrongGuesses}
                    </div>
                </div>

                {/* Game Section */}
                <div className="flex-1 flex flex-col justify-center">
                    {gameState === 'start' ? (
                        <div className="text-center animate-fade-in">
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">주제를 선택하세요</h2>
                            <div className="grid grid-cols-2 gap-4">
                                {Object.keys(engCategories).map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => startGame(cat)}
                                        className="py-6 bg-indigo-100 dark:bg-indigo-900/30 hover:bg-indigo-200 dark:hover:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 font-bold rounded-xl transition-all font-mono text-lg"
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="animate-fade-in w-full">
                            <div className="mb-8 text-center">
                                <span className="inline-block px-3 py-1 bg-gray-200 dark:bg-gray-600 rounded-full text-sm font-bold text-gray-600 dark:text-gray-300 mb-4">
                                    {category}
                                </span>

                                <div className="flex flex-wrap justify-center gap-2 mb-2">
                                    {word.split('').map((char, i) => (
                                        <div key={i} className={`w-10 h-12 md:w-12 md:h-14 border-b-4 flex items-center justify-center text-3xl font-bold transition-all ${guessedLetters.has(char) || gameState === 'lost'
                                                ? (gameState === 'lost' && !guessedLetters.has(char) ? 'border-red-400 text-red-400' : 'border-indigo-500 text-gray-800 dark:text-white')
                                                : 'border-gray-300 dark:border-gray-600 text-transparent'
                                            }`}>
                                            {guessedLetters.has(char) || gameState === 'lost' ? char : '_'}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {gameState === 'playing' ? (
                                <div className="grid grid-cols-7 gap-2">
                                    {keyboard.map(char => {
                                        let statusClass = "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-800 dark:text-white";
                                        if (guessedLetters.has(char)) {
                                            if (word.includes(char)) {
                                                statusClass = "bg-green-500 text-white opacity-50 cursor-not-allowed";
                                            } else {
                                                statusClass = "bg-red-500 text-white opacity-50 cursor-not-allowed";
                                            }
                                        }

                                        return (
                                            <button
                                                key={char}
                                                onClick={() => handleGuess(char)}
                                                disabled={guessedLetters.has(char)}
                                                className={`aspect-square rounded-lg font-bold text-lg transition-all ${statusClass}`}
                                            >
                                                {char}
                                            </button>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="text-center animate-scale-in bg-gray-50 dark:bg-gray-700/50 p-6 rounded-2xl">
                                    <h3 className={`text-3xl font-black mb-2 ${gameState === 'won' ? 'text-green-500' : 'text-red-500'}`}>
                                        {gameState === 'won' ? 'YOU WIN!! 🎉' : 'GAME OVER 💀'}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 mb-6 font-bold text-lg">
                                        정답: {word}
                                    </p>

                                    <div className="flex gap-4 justify-center">
                                        <button
                                            onClick={() => setGameState('start')}
                                            className="flex items-center px-6 py-3 bg-white border border-gray-200 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 text-gray-800 dark:text-white rounded-xl font-bold transition-all"
                                        >
                                            <Undo2 className="w-5 h-5 mr-2" />
                                            다른 주제
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
                    )}
                </div>
            </div>

            
        
            <div className="mt-12">
                <ToolGuide
                    title="행맨 게임 안내"
                    intro="교수대 그림이 완성되기 전에 영어 단어를 맞추세요! 스릴 넘치는 단어 추리 게임. 영어 공부도 하고 게임도 즐기세요."
                    steps={toolSteps}
                    tips={toolTips}
                    faqs={toolFaqs}
                />
            </div>
        </div>
    );
};

export default Hangman;
