import React, { useState, useRef, useEffect } from 'react';
import { Copy, Volume2, RotateCcw, ArrowRightLeft, Radio, Headphones, FileText, Check } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { useLanguage } from '../context/LanguageContext';

const MorseCode = () => {
    const { lang, t } = useLanguage();
    const isEn = lang === 'en';

    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [mode, setMode] = useState('textToMorse'); // textToMorse, morseToText
    const [isPlaying, setIsPlaying] = useState(false);
    const [copied, setCopied] = useState(false);
    const audioContextRef = useRef(null);

    const morseTable = {
        'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
        'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
        'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
        'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
        'Y': '-.--', 'Z': '--..',
        '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....',
        '6': '-....', '7': '--...', '8': '---..', '9': '----.', '0': '-----',
        '.': '.-.-.-', ',': '--..--', '?': '..--..', "'": '.----.', '!': '-.-.--',
        '/': '-..-.', '(': '-.--.', ')': '-.--.-', '&': '.-...', ':': '---...',
        ';': '-.-.-.', '=': '-...-', '+': '.-.-.', '-': '-....-', '_': '..--.-',
        '"': '.-..-.', '$': '...-..-', '@': '.--.-.', ' ': '/'
    };

    const reverseMorseTable = Object.entries(morseTable).reduce((acc, [char, code]) => {
        acc[code] = char;
        return acc;
    }, {});

    useEffect(() => {
        if (!input.trim()) {
            setOutput('');
            return;
        }
        const text = input.trim().toUpperCase();
        if (mode === 'textToMorse') {
            const result = text.split('').map(char => morseTable[char] || char).join(' ');
            setOutput(result);
        } else {
            const result = text.split(' ').map(code => {
                if (code === '/') return ' ';
                return reverseMorseTable[code] || '?';
            }).join('');
            setOutput(result);
        }
        // eslint-disable-next-line
    }, [input, mode]);

    const playSound = async () => {
        if (isPlaying || !output) return;
        setIsPlaying(true);

        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!audioContextRef.current) {
            audioContextRef.current = new AudioContext();
        }
        const ctx = audioContextRef.current;
        if (ctx.state === 'suspended') {
            await ctx.resume();
        }

        const dotDuration = 0.08; 
        let currentTime = ctx.currentTime;

        const codes = output.split('');

        for (const char of codes) {
            if (char === '.' || char === '-') {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();

                osc.frequency.value = 700; 
                osc.connect(gain);
                gain.connect(ctx.destination);

                const duration = char === '.' ? dotDuration : dotDuration * 3;

                osc.start(currentTime);
                osc.stop(currentTime + duration);

                gain.gain.setValueAtTime(0, currentTime);
                gain.gain.linearRampToValueAtTime(0.5, currentTime + 0.01);
                gain.gain.setValueAtTime(0.5, currentTime + duration - 0.01);
                gain.gain.linearRampToValueAtTime(0, currentTime + duration);

                currentTime += duration + dotDuration; 
            } else if (char === ' ') {
                currentTime += dotDuration * 2; 
            } else if (char === '/') {
                currentTime += dotDuration * 4; 
            }
        }

        setTimeout(() => {
            setIsPlaying(false);
        }, (currentTime - ctx.currentTime) * 1000);
    };

    const copyToClipboard = (text) => {
        if (!text) return;
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const swapMode = () => {
        setMode(prev => prev === 'textToMorse' ? 'morseToText' : 'textToMorse');
        setInput(output);
        setOutput(input);
    };

    const titleText = isEn ? "Professional Morse Code Translator | Text ↔ Morse & Audio" : "실시간 모스 부호 번역기 | 텍스트 ↔ 모스 부호 변환 및 사운드 재생";
    const descText = isEn 
        ? "Instantly translate English text into Morse code sequence and listen to the audio Beep signals. Perfect for learning CW communication and cryptographic puzzles." 
        : "영문 텍스트를 모스 부호로 즉시 변환하거나, 모스 부호를 다시 텍스트로 보구하세요. 실제 비프음(Beep) 사운드 재생 기능을 통해 모스 부호를 직접 시뮬레이션할 수 있습니다.";
    const keywordsText = isEn ? "morse code translator, text to morse, listen to morse, cw communication, sos signal, encryption fun" : "모스부호번역기, morse code translator, 모스부호변환, SOS부호, CW통신, 암호문만들기, 모스부호듣기";

    const toolFaqs = isEn ? [
        {
            q: "Does this handle non-Latin character sets?",
            a: "Strictly follows international standards primarily mapping Latin alphabets (A-Z) and digits (0-9). Special symbols are also supported."
        },
        {
            q: "Can I adjust the speed of the audio playback?",
            a: "The playback speed is fixed at an standard rhythmic interval (80ms per dot) for optimal clarity for beginners."
        }
    ] : [
        { "q": "모스 부호 번역기는 한글도 지원하나요?", "a": "국제 표준 규격에 따라 주로 영어 알파벳(A-Z)과 숫자(0-9)를 모스 부호로 변환합니다." },
        { "q": "소리로 재생 가능한가요?", "a": "네! 번역된 모스 부호를 '삐-' 하는 비프음(Beep) 소리로 직접 들어보는 고품질 오디오 재생 기능을 지원합니다." }
    ];

    const toolSteps = isEn ? [
        "Type your alphabetic or numeric source into the primary input container.",
        "Observe the dots (.) and dashes (-) appearing instantly in the results pane.",
        "Click the prominent 'Listen to Morse' badge to hear the rhythmic audio sequence.",
        "Use the Copy button to grab the results for your secret cryptographic logs."
    ] : [
        "알파벳이나 숫자 텍스트를 상단 박스에 입력합니다.",
        "자동으로 점(.)과 선(-)으로 이루어진 모스 부호 페일로드가 하단에 생성됩니다.",
        "하단의 재생 버튼을 눌러 모스 부호의 장단음을 실제 음향으로 들어보세요.",
        "복사 아이콘을 이용하여 결과를 클립보드에 담아 암호 편지 등에 활용하세요."
    ];

    const toolTips = isEn ? [
        "Memorizing the SOS (... --- ...) pattern is a universally recommended emergency skill.",
        "Pass secret messages to your fellow tech enthusiasts by sharing encoded strings.",
        "Encoding happens purely in-memory on your device avoiding external data leaks."
    ] : [
        "SOS (... --- ...) 와 같이 영화나 실생활에서 쓰이는 주요 조난 신호를 익혀두면 생존 기술로 유용합니다.",
        "친구끼리 비밀 메시지를 모스 부호 텍스트로 바꾸어 전송하는 암호 편지 놀이를 즐겨보세요.",
        "학습용으로 사용하실 경우 재생되는 소리의 길이를 유심히 듣고 리듬을 익히는 것이 중요합니다."
    ];

    return (
        <div className="max-w-6xl mx-auto space-y-6 px-4 md:px-0 pb-12">
            <SEO
                title={titleText}
                description={descText}
                keywords={keywordsText}
                category="text"
                faqs={toolFaqs}
                steps={toolSteps}
            />

            <header className="text-center space-y-4">
                <div className="inline-flex items-center justify-center p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl text-indigo-600 dark:text-indigo-400 mb-2 border border-indigo-200 dark:border-indigo-800 shadow-sm">
                    <Radio size={32} />
                </div>
                <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
                    {isEn ? 'Universal Morse Code Translator' : '모스 부호 번역기'}
                </h1>
                <p className="text-muted-foreground text-sm max-w-lg mx-auto leading-relaxed">
                    {isEn ? 'Seamlessly translate text into standard rhythmic pulses and simulate the audio signals locally.' : '영문과 숫자를 정밀한 모스 부호로 변환하고 실제 비프음으로 들어보세요'}
                </p>
            </header>

            <div className="flex justify-center mb-6 pt-4">
                <button
                    onClick={swapMode}
                    className="flex items-center gap-2 px-8 py-3 bg-secondary/80 hover:bg-secondary rounded-2xl text-sm font-black transition-all border border-border shadow-sm active:scale-95"
                >
                    <ArrowRightLeft className="w-4 h-4 text-indigo-600" />
                    {mode === 'textToMorse' ? (isEn ? 'TEXT → MORSE' : '텍스트 → 모스 부호') : (isEn ? 'MORSE → TEXT' : '모스 부호 → 텍스트')}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative">
                {/* Input Panel */}
                <div className="bg-card border border-border rounded-3xl shadow-sm overflow-hidden flex flex-col group hover:border-indigo-500/30 transition-colors">
                    <div className="p-4 bg-secondary/30 font-black text-[10px] text-muted-foreground uppercase tracking-widest border-b border-border flex justify-between items-center h-12">
                        <div className="flex items-center gap-2">
                            <FileText size={14} className="text-indigo-500" />
                            {mode === 'textToMorse' ? (isEn ? 'Source Content' : '입력 소스 (TEXT)') : (isEn ? 'Morse Sequence' : '입력 소스 (MORSE)')}
                        </div>
                        <button 
                            onClick={() => setInput('')}
                            className="p-1.5 hover:bg-background rounded-lg transition-colors"
                        >
                            <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                    </div>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={mode === 'textToMorse' ? (isEn ? "Insert alphanumeric characters..." : "여기에 영어 문장이나 숫자를 입력하세요...") : (isEn ? "Insert dots and dashes (e.g., ... --- ...)" : "모스 부호 코드를 입력하세요...")}
                        className="w-full h-64 p-6 bg-background resize-none focus:outline-none font-mono text-lg leading-relaxed shadow-inner"
                    />
                </div>

                {/* Output Panel */}
                <div className="bg-indigo-500/5 dark:bg-indigo-900/10 border border-indigo-500/10 dark:border-indigo-800 rounded-3xl shadow-sm overflow-hidden flex flex-col">
                    <div className="p-4 bg-indigo-500/10 dark:bg-indigo-900/30 font-black text-[10px] text-indigo-600 dark:text-indigo-400 uppercase tracking-widest border-b border-indigo-500/10 flex justify-between items-center h-12">
                        <div className="flex items-center gap-2">
                            <Headphones size={14} />
                            {mode === 'textToMorse' ? (isEn ? 'Morse Result' : '변환 결과 (MORSE)') : (isEn ? 'Translated Text' : '변환 결과 (TEXT)')}
                        </div>
                        <button 
                            onClick={() => copyToClipboard(output)}
                            className={`p-1.5 px-3 rounded-lg transition-all flex items-center gap-2 text-[10px] font-bold ${copied ? 'bg-green-500 text-white' : 'hover:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300'}`}
                        >
                            {copied ? <Check size={12} /> : <Copy size={12} />}
                            {copied ? (isEn ? 'COPIED' : '복사됨') : (isEn ? 'COPY' : '결과 복사')}
                        </button>
                    </div>
                    <div className="w-full h-64 p-6 overflow-auto font-mono text-xl leading-[1.8] text-foreground/80 break-words whitespace-pre-wrap select-all font-black">
                        {output || <span className="text-muted-foreground/30 font-normal italic text-sm">{isEn ? 'Translation will appear here...' : '이곳에 결과가 실시간으로 표시됩니다.'}</span>}
                    </div>
                </div>
            </div>

            {/* Playback Control Area */}
            <div className="flex justify-center py-4">
                <button
                    onClick={playSound}
                    disabled={!output || isPlaying}
                    className={`
                        group relative flex items-center gap-4 px-12 py-5 rounded-full font-black text-xl shadow-xl transition-all active:scale-95
                        ${isPlaying
                            ? 'bg-slate-400 cursor-not-allowed text-white'
                            : 'bg-indigo-600 hover:bg-indigo-700 text-white hover:shadow-indigo-500/40 hover:-translate-y-1'
                        }
                    `}
                >
                    <div className={`p-2 bg-white/20 rounded-full ${isPlaying ? 'animate-ping' : ''}`}>
                        <Volume2 className="w-6 h-6" />
                    </div>
                    {isPlaying ? (isEn ? 'REPLAYING SIGNALS...' : '신호 재생 중...') : (isEn ? 'LISTEN TO MORSE' : '소리로 신호 듣기')}
                </button>
            </div>

            {/* Reference Table */}
            <div className="bg-card border border-border rounded-[2.5rem] p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-8 border-b border-border/50 pb-4">
                    <Radio className="w-5 h-5 text-indigo-500" />
                    <h3 className="font-black text-sm uppercase tracking-[0.2em] text-muted-foreground">{isEn ? 'International Morse Atlas' : '국제 모스 부호 참조표'}</h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {Object.entries(morseTable).map(([char, code]) => (
                        <div key={char} className="flex justify-between items-center px-4 py-3 bg-secondary/40 hover:bg-secondary rounded-xl border border-border/50 transition-colors group">
                            <span className="font-black text-indigo-600 dark:text-indigo-400 text-base">{char}</span>
                            <span className="font-mono text-xs text-muted-foreground font-black tracking-widest group-hover:text-foreground">{code}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="pt-8">
                <ToolGuide
                    title={isEn ? "Advanced Signal Mastery Guide" : "모스 부호 번역기 상세 가이드"}
                    intro={isEn 
                        ? "Our rhythmic engine strictly adheres to timing standards—ensuring your training remains authentic to historic telegraphy protocols." 
                        : "데이터를 소리로 변환하는 가장 클래식한 방법을 브라우저에서 경험하세요. 학습과 암호화 놀이, 긴급 상황을 위한 구조 신호 연습에 활용 가능합니다."}
                    steps={toolSteps}
                    tips={toolTips}
                    faqs={toolFaqs}
                />
            </div>
        </div>
    );
};

export default MorseCode;
