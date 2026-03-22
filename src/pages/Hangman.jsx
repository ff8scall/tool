import React, { useState, useEffect, useCallback } from 'react';
import { Share2, RefreshCw, Undo2, HelpCircle, Trophy, Skull, Info, Sparkles } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { useLanguage } from '../context/LanguageContext';

const Hangman = () => {
    const { lang } = useLanguage();
    const isEn = lang === 'en';

    const engCategories = {
        'Animals': ['TIGER', 'LION', 'ELEPHANT', 'ZEBRA', 'GIRAFFE', 'MONKEY', 'PANDA', 'KANGAROO'],
        'Fruits': ['APPLE', 'BANANA', 'GRAPE', 'STRAWBERRY', 'ORANGE', 'MANGO', 'CHERRY', 'MELON'],
        'Countries': ['KOREA', 'USA', 'JAPAN', 'CHINA', 'FRANCE', 'GERMANY', 'CANADA', 'BRAZIL'],
        'Jobs': ['DOCTOR', 'TEACHER', 'ENGINEER', 'POLICE', 'ARTIST', 'LAWYER', 'CHEF', 'NURSE']
    };

    const korCategories = {
        '동물': ['TIGER', 'LION', 'ELEPHANT', 'ZEBRA', 'GIRAFFE', 'MONKEY', 'PANDA', 'KANGAROO'],
        '과일': ['APPLE', 'BANANA', 'GRAPE', 'STRAWBERRY', 'ORANGE', 'MANGO', 'CHERRY', 'MELON'],
        '나라': ['KOREA', 'USA', 'JAPAN', 'CHINA', 'FRANCE', 'GERMANY', 'CANADA', 'BRAZIL'],
        '직업': ['DOCTOR', 'TEACHER', 'ENGINEER', 'POLICE', 'ARTIST', 'LAWYER', 'CHEF', 'NURSE']
    };

    const categories = isEn ? engCategories : korCategories;

    const drawParts = [
        <line x1="10" y1="250" x2="150" y2="250" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />,
        <line x1="80" y1="250" x2="80" y2="20" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />,
        <line x1="80" y1="20" x2="200" y2="20" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />,
        <line x1="200" y1="20" x2="200" y2="50" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />,
        <circle cx="200" cy="80" r="30" stroke="currentColor" strokeWidth="6" fill="none" />,
        <line x1="200" y1="110" x2="200" y2="170" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />,
        <line x1="200" y1="130" x2="170" y2="160" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />,
        <line x1="200" y1="130" x2="230" y2="160" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />,
        <line x1="200" y1="170" x2="170" y2="220" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />,
        <line x1="200" y1="170" x2="230" y2="220" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />,
        <g>
            <path d="M190 75 L200 85 M200 75 L190 85" stroke="currentColor" strokeWidth="3" />,
            <path d="M200 75 L210 85 M210 75 L200 85" stroke="currentColor" strokeWidth="3" />
        </g>
    ];

    const [gameState, setGameState] = useState('start'); // start, playing, won, lost
    const [word, setWord] = useState('');
    const [category, setCategory] = useState('');
    const [wrongGuesses, setWrongGuesses] = useState(0);
    const [guessedLetters, setGuessedLetters] = useState(new Set());

    const maxWrong = 10; 

    const startGame = (selectedCat) => {
        const words = categories[selectedCat];
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
            const isWon = word.split('').every(char => newGuessed.has(char));
            if (isWon) {
                setGameState('won');
            }
        }
    }, [gameState, guessedLetters, word, wrongGuesses]);

    const keyboard = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');

    useEffect(() => {
        const handleKeyDown = (e) => {
            const char = e.key.toUpperCase();
            if (gameState === 'playing' && /^[A-Z]$/.test(char)) {
                handleGuess(char);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [gameState, handleGuess]);

    const toolFaqs = isEn ? [
        { q: "How do I win the Hangman game?", a: "Guess all the letters in the hidden English word one by one within 10 attempts to win." },
        { q: "What happens on a wrong guess?", a: "Each wrong guess adds a part to the hangman drawing. If the drawing is completed, the game is over." },
        { q: "Can I play on my phone?", a: "Yes! Use the virtual keyboard buttons on the screen to play smoothly on mobile devices." }
    ] : [
        { q: "행맨 게임은 어떻게 이기나요?", a: "숨겨진 영단어의 알파벳을 하나씩 추측하여, 주어진 10번의 기회 안에 단어를 완성하면 승리합니다." },
        { q: "틀리면 어떻게 되나요?", a: "틀린 알파벳을 고를 때마다 행맨의 요소가 하나씩 추가되며, 그림이 완성되면 게임 오버됩니다." }
    ];

    const toolSteps = isEn ? [
        "Select a category to begin the challenge.",
        "Observe the number of underscores to determine the word's length.",
        "Click letters on the virtual keyboard or type using your physical keyboard.",
        "Try to guess commonly used vowels like A, E, I, O first to reveal the word's structure."
    ] : [
        "원하는 주제(Category)를 선택하여 게임을 시작합니다.",
        "빈 칸(Underline)의 개수를 보고 단어의 길이를 파악합니다.",
        "화면의 가상 키보드나 실제 키보드를 사용하여 알파벳을 추측합니다.",
        "사용 가능한 기회(10회) 내에 모든 문자를 맞춰 단어를 완성하세요."
    ];

    const toolTips = isEn ? [
        "Words follow English spelling rules. Common letters like 'E', 'T', and 'A' are often good starting points.",
        "Focus on the category theme to narrow down potential word candidates.",
        "If you lose, the correct word will be revealed so you can learn for the next round!"
    ] : [
        "영어 단어 공부와 순발력을 동시에 기를 수 있는 게임입니다.",
        "E, T, A, O, I 등 영어에서 가장 자주 쓰이는 알파벳부터 공략하는 것이 확률적으로 유리합니다.",
        "틀렸을 때 나오는 정답 단어를 외워두면 다음 판을 이기는 데 도움이 됩니다."
    ];

    const shareResult = () => {
        const title = isEn ? 'Hangman Challenge' : '행맨 게임';
        const resultText = gameState === 'won' ? (isEn ? 'I rescued the word!' : '성공!') : (isEn ? 'I failed...' : '실패...');
        if (navigator.share) {
            navigator.share({
                title: title,
                text: `${resultText} [${category}] word guessing on Tool Hive`,
                url: window.location.href,
            });
        } else {
            alert(isEn ? 'Link copied to clipboard!' : '링크가 복사되었습니다!');
            navigator.clipboard.writeText(window.location.href);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <SEO
                title={isEn ? "Online Hangman Game - Guess the English Word | Tool Hive" : "행맨 게임 | 영어 단어 맞추기 | 추리 게임 | Tool Hive"}
                description={isEn ? "Play the classic Hangman game online! Rescue the word from the gallows by guessing its letters. Great for vocabulary building and brain training." : "교수대 그림이 완성되기 전에 영어 단어를 맞추세요! 스릴 넘치는 단어 추리 게임. 영어 공부도 하고 게임도 즐기세요."}
                keywords={isEn ? "hangman game, word guesser, online hangman, vocabulary builder, spelling game" : "행맨, hangman, 영어단어, 단어게임, 추리게임, 영어공부"}
                category="Game"
                faqs={toolFaqs}
                steps={toolSteps}
            />

            <div className="text-center mb-12">
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-rose-50 dark:bg-rose-900/30 rounded-full text-rose-600 dark:text-rose-400 font-black text-sm uppercase tracking-widest mb-6 border border-rose-100 dark:border-rose-800 animate-in fade-in slide-in-from-top-4 duration-700">
                    <Sparkles size={16} />
                    {isEn ? 'English Vocabulary Survival' : '영어 단어 생존 게임'}
                </div>
                <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white mb-6 uppercase tracking-tighter italic animate-in fade-in duration-1000">
                    {isEn ? 'THE HANGMAN' : '행맨'} <span className="text-rose-600">QUEST</span>
                </h1>
                <p className="text-xl text-muted-foreground font-medium italic">
                    {isEn ? 'Save the word before it is too late!' : '그림이 완성되기 전에 단어를 구출하세요!'}
                </p>
            </div>

            <div className="max-w-5xl mx-auto bg-card dark:bg-slate-800 rounded-[3rem] shadow-2xl border-4 border-border/50 overflow-hidden p-8 transition-all duration-500 min-h-[550px] flex flex-col lg:flex-row gap-10">

                {/* Visual Section */}
                <div className="lg:w-1/3 flex flex-col items-center justify-center bg-muted/50 dark:bg-slate-900/50 rounded-[2rem] p-8 border-4 border-muted relative shadow-inner">
                    <svg height="280" width="220" className="text-foreground transition-all duration-500 overflow-visible">
                        {drawParts[0]}
                        {drawParts.slice(1, wrongGuesses + 1).map((part, i) => React.cloneElement(part, { key: i }))}
                        {gameState === 'lost' && drawParts[10]}
                    </svg>
                    
                    <div className="mt-8 w-full space-y-2">
                        <div className="flex justify-between text-xs font-black uppercase tracking-widest text-muted-foreground">
                            <span>{isEn ? 'LIVES LEFT' : '남은 기회'}</span>
                            <span>{maxWrong - wrongGuesses} / {maxWrong}</span>
                        </div>
                        <div className="h-4 bg-muted rounded-full overflow-hidden border-2 border-border p-0.5">
                            <div 
                                className={`h-full rounded-full transition-all duration-500 ${wrongGuesses > 7 ? 'bg-rose-500' : 'bg-primary'}`}
                                style={{ width: `${((maxWrong - wrongGuesses) / maxWrong) * 100}%` }}
                            />
                        </div>
                    </div>
                </div>

                {/* Game Section */}
                <div className="flex-1 flex flex-col justify-center min-h-[400px]">
                    {gameState === 'start' ? (
                        <div className="text-center animate-in fade-in zoom-in-95 duration-500 w-full">
                            <h2 className="text-2xl font-black text-foreground mb-8 italic uppercase tracking-widest bg-muted/50 py-3 rounded-2xl border-2 border-border">
                                {isEn ? 'SELECT SUBJECT' : '주제를 선택하세요'}
                            </h2>
                            <div className="grid grid-cols-2 gap-4">
                                {Object.keys(categories).map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => startGame(cat)}
                                        className="group relative h-24 sm:h-32 bg-card hover:bg-primary border-4 border-border/50 hover:border-primary rounded-3xl transition-all duration-300 overflow-hidden shadow-lg active:scale-95"
                                    >
                                        <div className="relative z-10 font-black text-xl sm:text-2xl italic uppercase group-hover:text-white transition-colors tracking-tight">
                                           {cat}
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent group-hover:from-white/20 transition-all" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="animate-in fade-in duration-300 w-full flex flex-col items-center">
                            <div className="mb-10 text-center w-full">
                                <span className="inline-block px-6 py-2 bg-indigo-500 text-white rounded-full text-xs font-black uppercase tracking-widest mb-8 italic shadow-lg shadow-indigo-500/20">
                                    {category}
                                </span>

                                <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-2">
                                    {word.split('').map((char, i) => (
                                        <div key={i} className={`w-12 h-16 sm:w-16 sm:h-20 border-b-8 flex items-center justify-center text-4xl sm:text-5xl font-black transition-all duration-500 italic ${guessedLetters.has(char) || gameState === 'lost'
                                                ? (gameState === 'lost' && !guessedLetters.has(char) ? 'border-rose-500 text-rose-500' : 'border-emerald-500 text-foreground')
                                                : 'border-muted-foreground/30 text-transparent'
                                            }`}>
                                            {guessedLetters.has(char) || gameState === 'lost' ? char : ''}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {gameState === 'playing' ? (
                                <div className="grid grid-cols-7 sm:grid-cols-9 lg:grid-cols-7 gap-2 w-full max-w-2xl">
                                    {keyboard.map(char => {
                                        const isGuessed = guessedLetters.has(char);
                                        const isRight = isGuessed && word.includes(char);
                                        
                                        return (
                                            <button
                                                key={char}
                                                onClick={() => handleGuess(char)}
                                                disabled={isGuessed}
                                                className={`aspect-square rounded-xl font-black text-xl transition-all duration-300 shadow-md ${
                                                    isGuessed
                                                        ? isRight 
                                                            ? 'bg-emerald-500 text-white opacity-40 cursor-not-allowed scale-90'
                                                            : 'bg-rose-500 text-white opacity-40 cursor-not-allowed scale-90'
                                                        : 'bg-card text-foreground hover:bg-muted border-b-4 border-border'
                                                }`}
                                            >
                                                {char}
                                            </button>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="text-center animate-in zoom-in-95 duration-500 bg-muted/30 p-10 rounded-[2.5rem] border-4 border-border/50 w-full max-w-md shadow-2xl relative overflow-hidden">
                                     <div className="absolute -top-10 -right-10 opacity-10">
                                        {gameState === 'won' ? <Trophy size={150} /> : <Skull size={150} />}
                                     </div>

                                    <h3 className={`text-4xl sm:text-5xl font-black mb-4 italic uppercase tracking-tighter ${gameState === 'won' ? 'text-emerald-500' : 'text-rose-500'}`}>
                                        {gameState === 'won' ? (isEn ? 'VICTORY!' : '승리했습니다!') : (isEn ? 'GAME OVER' : '패배했습니다')}
                                    </h3>
                                    <div className="space-y-1 mb-8">
                                        <p className="text-xs font-black uppercase text-muted-foreground tracking-widest">{isEn ? 'THE WORD WAS' : '문제 정답'}</p>
                                        <p className="text-4xl font-black text-foreground italic uppercase tracking-widest">{word}</p>
                                    </div>

                                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                        <button
                                            onClick={() => setGameState('start')}
                                            className="grow flex items-center justify-center px-8 py-5 bg-card hover:bg-muted border-4 border-border text-foreground rounded-2xl font-black text-lg transition-all active:scale-95 uppercase tracking-widest italic"
                                        >
                                            <Undo2 className="w-6 h-6 mr-3" />
                                            {isEn ? 'CHANGE SUBJECT' : '다른 주제'}
                                        </button>
                                        <button
                                            onClick={shareResult}
                                            className="grow flex items-center justify-center px-8 py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-lg shadow-2xl shadow-indigo-500/30 transition-all transform active:scale-95 uppercase tracking-widest italic"
                                        >
                                            <Share2 className="w-6 h-6 mr-3" />
                                            {isEn ? 'SHARE' : '결과 공유'}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-24">
                <ToolGuide
                    title={isEn ? "The Hangman Survivor Guide" : "행맨 게임 마스터 가이드"}
                    intro={isEn ? "Hangman is the ultimate test of vocabulary and deductive reasoning. This version focuses on English words to help you learn new terminology while having fun. Your goal is to rescue the character by guessing the secret word before you run out of attempts." : "행맨은 수세기 동안 사랑받아온 고전적인 단어 추리 게임입니다. 본 게임은 영어 단어를 기반으로 제작되어, 게임의 재미와 함께 영단어 학습 효과까지 동시에 누릴 수 있습니다. 교수대 그림이 모두 완성되기 전에 지혜를 발휘하여 단어를 구출해 보세요."}
                    steps={toolSteps}
                    tips={toolTips}
                    faqs={toolFaqs}
                />
            </div>
        </div>
    );
};

export default Hangman;
