import React, { useState, useEffect, useRef } from 'react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { Brain, Play, ArrowRight, RefreshCw, CheckCircle2, XCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const NumberMemory = () => {
    const { lang, t } = useLanguage();
    const isEn = lang === 'en';
    const [level, setLevel] = useState(1);
    const [number, setNumber] = useState('');
    const [userInput, setUserInput] = useState('');
    const [gameState, setGameState] = useState('start'); // start, showing, input, result, gameover
    const [timeLeft, setTimeLeft] = useState(0);

    const inputRef = useRef(null);

    const generateNumber = (length) => {
        let result = '';
        for (let i = 0; i < length; i++) {
            result += Math.floor(Math.random() * 10);
        }
        return result;
    };

    const startGame = () => {
        setLevel(1);
        startLevel(1);
    };

    const startLevel = (lvl) => {
        const newNumber = generateNumber(lvl);
        setNumber(newNumber);
        setGameState('showing');
        setUserInput('');

        const showTime = 1000 + (lvl * 500);
        setTimeLeft(showTime / 1000);

        const startTime = Date.now();
        const interval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const remaining = Math.max(0, showTime - elapsed);
            setTimeLeft(remaining / 1000);

            if (remaining === 0) {
                clearInterval(interval);
                setGameState('input');
                setTimeout(() => inputRef.current?.focus(), 100);
            }
        }, 50);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (userInput === number) {
            setGameState('result');
        } else {
            setGameState('gameover');
        }
    };

    const nextLevel = () => {
        setLevel(prev => prev + 1);
        startLevel(level + 1);
    };

    const toolFaqs = isEn ? [
        { q: "What is a good score for Number Memory?", a: "The average adult can remember 7 to 9 digits. Scores above 12 are considered exceptional and indicate strong short-term memory." },
        { q: "How long are the numbers shown?", a: "The time starts at 1.5 seconds for the first level and increases by 0.5 seconds for every additional digit." },
        { q: "Can I use 'chunking' to improve my score?", a: "Yes, grouping numbers into smaller sets (like phone numbers) is a proven technique to store more information in your working memory." }
    ] : [
        { q: "보통 몇 자리까지 기억하면 잘하는 건가요?", a: "일반적으로 성인의 단기 기억력은 7~9자리 내외입니다. 12자리 이상 기억한다면 매우 뛰어난 수준이라고 볼 수 있습니다." },
        { q: "숫자가 노출되는 기준이 무엇인가요?", a: "기본 1초에 자릿수당 0.5초가 추가되어, 레벨이 올라갈수록 숫자를 읽을 수 있는 시간도 조금씩 늘어납니다." },
        { q: "기억력을 높이는 팁이 있나요?", a: "숫자를 3~4개씩 끊어서 '묶음(Chunking)'으로 외우면 뇌가 정보를 훨씬 효율적으로 저장할 수 있습니다." }
    ];

    return (
        <div className="max-w-2xl mx-auto space-y-8 px-4">
            <SEO
                title={t('tools.number-memory.title')}
                description={t('tools.number-memory.description')}
                keywords={isEn ? "number memory test, brain games, short term memory, chimpanzee test, cognitive training" : "기억력, memory, test, 숫자 기억, chimp test, brain"}
                faqs={toolFaqs}
            />

            <div className="text-center space-y-4">
                <h1 className="text-4xl font-black text-gray-900 dark:text-white flex items-center justify-center gap-4 italic tracking-tight">
                    <Brain className="w-10 h-10 text-rose-500" />
                    {isEn ? 'NUMBER MEMORY' : '숫자 기억하기'}
                </h1>
                <p className="text-muted-foreground font-medium">
                    {isEn ? 'Remember the sequence and type it back correctly.' : '화면에 나타나는 숫자를 기억한 뒤 똑같이 입력하세요.'}
                </p>
            </div>

            <div className="bg-card border-2 border-border/50 rounded-3xl p-8 min-h-[460px] flex flex-col items-center justify-center text-center space-y-8 shadow-xl relative overflow-hidden">
                {gameState === 'start' && (
                    <div className="space-y-8 animate-in fade-in zoom-in duration-500">
                        <div className="relative">
                            <Brain className="w-24 h-24 text-rose-500/20 absolute -top-4 -left-4 animate-pulse" />
                            <div className="text-8xl relative z-10">🧠</div>
                        </div>
                        <div className="space-y-3">
                            <h2 className="text-3xl font-black text-foreground uppercase tracking-widest">{isEn ? 'Memory Challenge' : '기억력 테스트'}</h2>
                            <p className="text-muted-foreground font-medium leading-relaxed max-w-sm mx-auto">
                                {isEn 
                                    ? 'A sequence of numbers will appear briefly. Type them back when they disappear. Each level adds an extra digit.' 
                                    : '숫자가 화면에 잠시 나타납니다. 숫자를 기억했다가 사라지면 입력하세요. 단계가 올라갈수록 숫자가 길어집니다.'}
                            </p>
                        </div>
                        <button
                            onClick={startGame}
                            className="bg-primary hover:bg-primary/90 text-primary-foreground px-14 py-5 rounded-2xl text-xl font-black shadow-2xl shadow-primary/20 transition-all hover:scale-105 active:scale-95 uppercase tracking-tighter"
                        >
                            {isEn ? 'START TEST' : '시작하기'}
                        </button>
                    </div>
                )}

                {gameState === 'showing' && (
                    <div className="space-y-10 w-full animate-in fade-in duration-300">
                        <div className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-black tracking-widest uppercase">
                            Level {level}
                        </div>
                        <div className="text-6xl md:text-9xl font-black tracking-[0.2em] font-mono text-foreground drop-shadow-sm break-all">
                            {number}
                        </div>
                        <div className="w-full max-w-md mx-auto h-3 bg-secondary rounded-full overflow-hidden shadow-inner">
                            <div
                                className="h-full bg-primary transition-all duration-75 ease-linear shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                                style={{ width: `${(timeLeft / (1 + level * 0.5)) * 100}%` }}
                            />
                        </div>
                    </div>
                )}

                {gameState === 'input' && (
                    <form onSubmit={handleSubmit} className="space-y-8 w-full max-w-sm animate-in zoom-in-95 duration-200">
                        <div className="text-muted-foreground font-black uppercase tracking-widest text-sm">{isEn ? 'What was the number?' : '어떤 숫자였나요?'}</div>
                        <input
                            ref={inputRef}
                            type="number"
                            pattern="[0-9]*"
                            inputMode="numeric"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            className="w-full bg-muted/50 border-4 border-border/50 rounded-2xl text-center text-5xl tracking-[0.2em] font-mono font-black py-8 focus:ring-8 focus:ring-primary/10 focus:border-primary outline-none transition-all shadow-inner"
                            placeholder="..."
                            autoFocus
                        />
                        <button type="submit" className="w-full bg-primary text-primary-foreground py-5 rounded-2xl text-xl font-black shadow-xl shadow-primary/10 hover:scale-105 active:scale-95 transition-all">
                            {isEn ? 'CHECK RESULT' : '확인'}
                        </button>
                    </form>
                )}

                {gameState === 'result' && (
                    <div className="space-y-8 animate-in zoom-in duration-300">
                        <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-green-500/20">
                            <CheckCircle2 className="w-16 h-16 text-green-500" />
                        </div>
                        <h2 className="text-4xl font-black text-green-600 italic tracking-tighter">{isEn ? 'CORRECT!' : '정답입니다!'}</h2>
                        <div className="text-muted-foreground font-bold text-lg">
                            {isEn ? 'Number' : '숫자'}: <span className="font-mono text-2xl font-black text-foreground underline decoration-green-500 underline-offset-8">{number}</span>
                        </div>
                        <button
                            onClick={nextLevel}
                            className="bg-slate-900 text-white px-10 py-5 rounded-2xl text-xl font-black flex items-center gap-3 mx-auto shadow-2xl transition-all hover:scale-105 active:scale-95"
                        >
                            {isEn ? `GO TO LEVEL ${level + 1}` : `다음 레벨 (${level + 1})`} <ArrowRight className="w-6 h-6" />
                        </button>
                    </div>
                )}

                {gameState === 'gameover' && (
                    <div className="space-y-8 animate-in zoom-in duration-300">
                        <div className="w-24 h-24 bg-rose-500/20 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-rose-500/20">
                            <XCircle className="w-16 h-16 text-rose-500" />
                        </div>
                        <h2 className="text-4xl font-black text-rose-600 italic tracking-tighter">{isEn ? 'WRONG!' : '틀렸습니다!'}</h2>

                        <div className="grid grid-cols-2 gap-px bg-border/50 border-2 border-border/50 rounded-3xl overflow-hidden shadow-lg w-full max-w-sm mx-auto">
                            <div className="bg-muted/30 p-6 text-left">
                                <div className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mb-1">{isEn ? 'Answer' : '정답'}</div>
                                <div className="text-2xl font-mono font-black text-green-600 break-all">{number}</div>
                            </div>
                            <div className="bg-muted/30 p-6 text-left border-l-2 border-border/50">
                                <div className="text-[10px] text-muted-foreground font-black uppercase tracking-widest mb-1">{isEn ? 'Your Input' : '입력'}</div>
                                <div className="text-2xl font-mono font-black text-rose-600 line-through decoration-rose-500/50 break-all">{userInput || '...'}</div>
                            </div>
                        </div>

                        <div className="text-2xl font-black uppercase tracking-widest">
                            {isEn ? 'Final Level' : '최종 레벨'}: <span className="text-primary text-4xl italic">{level}</span>
                        </div>

                        <button
                            onClick={startGame}
                            className="bg-primary text-primary-foreground px-10 py-5 rounded-2xl text-xl font-black flex items-center gap-3 mx-auto shadow-2xl transition-all hover:scale-105 active:scale-95"
                        >
                            <RefreshCw className="w-6 h-6" />
                            {isEn ? 'TRY AGAIN' : '다시 도전'}
                        </button>
                    </div>
                )}
            </div>

            <div className="bg-slate-100 dark:bg-slate-900/50 p-8 rounded-3xl border border-border shadow-sm">
                <h3 className="text-lg font-black mb-6 flex items-center gap-3">
                    <RefreshCw size={22} className="text-primary" />
                    {isEn ? "How it Works" : "게임 방식"}
                </h3>
                <ul className="grid sm:grid-cols-2 gap-6 text-sm font-medium text-muted-foreground">
                    <li className="flex gap-4">
                        <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black shrink-0">1</span>
                        {isEn ? "A number sequence is displayed on the screen for a limited time." : "화면에 무작위 숫자가 일정 시간 동안 나타납니다."}
                    </li>
                    <li className="flex gap-4">
                        <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black shrink-0">2</span>
                        {isEn ? "Memorize the digits before the progress bar reaches zero." : "진행 표시줄이 다 줄어들기 전까지 숫자를 최대한 외웁니다."}
                    </li>
                    <li className="flex gap-4">
                        <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black shrink-0">3</span>
                        {isEn ? "Input the number correctly to advance to the next level." : "숫자가 사라지면 입력 창에 동일하게 기입하고 확인 버튼을 누릅니다."}
                    </li>
                    <li className="flex gap-4">
                        <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-black shrink-0">4</span>
                        {isEn ? "Each level increases the difficulty by adding one more digit." : "레벨이 올라갈수록 숫자의 자릿수가 하나씩 늘어나며 난이도가 높아집니다."}
                    </li>
                </ul>
            </div>

            <ToolGuide
                title={isEn ? "The Science of Number Memory" : "숫자 기억력 테스트 완벽 가이드"}
                intro={isEn ? "Number Memory tests your visual short-term memory, often associated with the 'magic number seven'. It measures your ability to store and recall abstract information in your working memory, a critical component of fluid intelligence." : "이 테스트는 인간의 단기 기억 용량을 측정하는 '침팬지 테스트'에서 영감을 받았습니다. 현대인의 뇌는 수많은 디지털 정보에 노출되어 있어 순간적인 집중력과 기억력이 저하되기 쉽습니다. 매일 조금씩 이 게임을 즐기는 것만으로도 두뇌의 인지 기능을 자극하고 집중력을 향상하는 데 큰 도움이 됩니다."}
                steps={isEn ? [
                    "Click 'START TEST' to enter Level 1.",
                    "Look closely at the number while the blue progress bar is filling.",
                    "When the input box appears, type the exactly same digits.",
                    "If correct, proceed to higher levels with longer numbers.",
                    "Try to reach Level 10+, which exceeds most average adults' capacity."
                ] : [
                    "화면 중앙의 '시작하기' 버튼을 눌러 레벨 1부터 시작합니다.",
                    "푸른색 진행 바가 줄어드는 동안 화면에 나타난 숫자를 집중해서 외웁니다.",
                    "숫자가 사라지고 입력 칸이 나타나면 외웠던 숫자를 그대로 입력합니다.",
                    "정답이면 다음 레벨로 넘어가며, 자릿수가 한 자리 더 추가됩니다.",
                    "오답을 입력하기 전까지 게임이 계속되며, 자신의 최고 기록을 확인합니다."
                ]}
                tips={isEn ? [
                    "Phonological Loop: Repeat the numbers out loud or in your head as a rhythmic sound.",
                    "Visual Snap: Imagine the layout of the numbers on a keypad for better retention.",
                    "Concentration: Ensure you are in a quiet environment without distractions.",
                    "Don't panic: If you miss a digit, focus on the remaining ones to make an educated guess."
                ] : [
                    "소리 내어 읽기: 숫자를 입 밖으로 내어 읽거나 마음속으로 리듬감 있게 반복하면 훨씬 잘 외워집니다.",
                    "이미지화: 숫자의 생김새나 키패드에서의 위치를 하나의 그림처럼 머릿속에 찍어두세요.",
                    "끊어서 외우기: 숫자가 길어지면 3개 또는 4개씩 끊어서 그룹을 지어 외워보세요.",
                    "집중력 유지: 주변 소음이 없는 조용한 곳에서 테스트하면 평소보다 더 높은 기록을 낼 수 있습니다."
                ]}
                faqs={toolFaqs}
            />
        </div>
    );
};

export default NumberMemory;
