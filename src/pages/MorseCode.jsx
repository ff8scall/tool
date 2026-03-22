import React, { useState, useRef, useEffect } from 'react';

import { Copy, Volume2, RotateCcw, ArrowRightLeft, Radio } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';

const MorseCode = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [mode, setMode] = useState('textToMorse'); // textToMorse, morseToText
    const [isPlaying, setIsPlaying] = useState(false);
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
        const text = input.trim().toUpperCase();
        if (mode === 'textToMorse') {
            const result = text.split('').map(char => morseTable[char] || char).join(' ');
            setOutput(result);
        } else {
            // Morse to Text
            // Handle slashes as spaces
            const result = text.split(' ').map(code => {
                if (code === '/') return ' ';
                return reverseMorseTable[code] || '?';
            }).join('');
            setOutput(result);
        }
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

        const dotDuration = 0.06; // s
        let currentTime = ctx.currentTime;

        const codes = output.split('');

        for (const char of codes) {
            if (char === '.' || char === '-') {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();

                osc.frequency.value = 600; // Hz
                osc.connect(gain);
                gain.connect(ctx.destination);

                const duration = char === '.' ? dotDuration : dotDuration * 3;

                osc.start(currentTime);
                osc.stop(currentTime + duration);

                // Attack/Decay to avoid clicking
                gain.gain.setValueAtTime(0, currentTime);
                gain.gain.linearRampToValueAtTime(1, currentTime + 0.01);
                gain.gain.setValueAtTime(1, currentTime + duration - 0.01);
                gain.gain.linearRampToValueAtTime(0, currentTime + duration);

                currentTime += duration + dotDuration; // Sound + Gap
            } else if (char === ' ') {
                currentTime += dotDuration * 3; // Gap between letters
            } else if (char === '/') {
                currentTime += dotDuration * 7; // Gap between words
            }
        }

        setTimeout(() => {
            setIsPlaying(false);
        }, (currentTime - ctx.currentTime) * 1000);
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        alert('복사되었습니다!');
    };

    const swapMode = () => {
        setMode(prev => prev === 'textToMorse' ? 'morseToText' : 'textToMorse');
        setInput(output); // Swap content roughly
        setOutput(input);
    };

    
    const toolFaqs = [
        {
            "q": "모스 부호 번역기는 한글도 지원하나요?",
            "a": "국제 표준 규격에 따라 주로 영어 알파벳과 숫자를 모스 부호로 변환합니다."
        },
        {
            "q": "소리로 재생 가능한가요?",
            "a": "네! 번역된 모스 부호를 '삐-' 하는 비프음(Beep) 소리로 직접 들어보는 오디오 재생 기능을 지원합니다."
        }
    ];
    const toolSteps = [
        "알파벳이나 숫자 텍스트를 상단 박스에 입력합니다.",
        "자동으로 점(.)과 선(-)으로 이루어진 모스 부호로 하단에 변환됩니다.",
        "스피커 아이콘을 눌러 모스 부호의 길고 짧은 박자를 소리로 직접 들어봅니다."
    ];
    const toolTips = [
        "SOS (... --- ...) 와 같이 영화나 실생활에서 쓰이는 구조 신호를 모스 부호와 소리로 익혀두면 유용합니다.",
        "친구끼리 비밀 메시지를 모스 부호 텍스트로 바꾸어 전송하는 암호 편지 놀이를 해보세요."
    ];

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <SEO
                title="모스 부호 번역기 | 텍스트 ↔ 모스 부호 변환 및 사운드 재생 도구"
                description="영문 텍스트를 모스 부호로 즉시 변환하거나, 모스 부호를 다시 텍스트로 복구하세요. 실제 비프음 사운드 재생 기능을 통해 모스 부호를 직접 들어보고 익힐 수 있습니다."
                keywords="모스부호번역기, morse code translator, 모스부호변환, SOS부호, CW통신, 암호문만들기, 모스부호듣기"
                category="text"
                faqs={toolFaqs}
                steps={toolSteps}
            />

            <div className="text-center mb-10">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4 animate-fade-in">
                    📡 모스 부호 번역기
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                    텍스트 ↔ 모스 부호 변환 및 사운드 재생
                </p>
            </div>

            <div className="max-w-3xl mx-auto">
                {/* Controls */}
                <div className="flex justify-center mb-6">
                    <button
                        onClick={swapMode}
                        className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg text-sm font-bold transition-all"
                    >
                        <ArrowRightLeft className="w-4 h-4 mr-2" />
                        {mode === 'textToMorse' ? '텍스트 → 모스 부호' : '모스 부호 → 텍스트'}
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
                    {/* Input */}
                    <div className="flex flex-col h-64 bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
                        <div className="p-4 bg-gray-50 dark:bg-gray-700/50 font-bold text-gray-600 dark:text-gray-300 border-b border-gray-100 dark:border-gray-700 flex justify-between">
                            <span>{mode === 'textToMorse' ? '입력 (Text)' : '입력 (Morse)'}</span>
                            <button onClick={() => setInput('')}><RotateCcw className="w-4 h-4" /></button>
                        </div>
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={mode === 'textToMorse' ? "여기에 내용을 입력하세요 (영어/숫자)" : "모스 부호를 입력하세요 (예: ... --- ...)"}
                            className="flex-1 p-4 resize-none focus:outline-none bg-transparent dark:text-white text-lg font-mono"
                        ></textarea>
                    </div>

                    {/* Output */}
                    <div className="flex flex-col h-64 bg-indigo-50 dark:bg-indigo-900/20 rounded-2xl shadow-lg overflow-hidden border border-indigo-100 dark:border-indigo-800">
                        <div className="p-4 bg-indigo-100 dark:bg-indigo-900/40 font-bold text-indigo-700 dark:text-indigo-300 border-b border-indigo-200 dark:border-indigo-800 flex justify-between">
                            <span>{mode === 'textToMorse' ? '결과 (Morse)' : '결과 (Text)'}</span>
                            <button onClick={() => copyToClipboard(output)}><Copy className="w-4 h-4" /></button>
                        </div>
                        <div className="flex-1 p-4 overflow-auto text-lg font-mono text-gray-800 dark:text-white break-words whitespace-pre-wrap">
                            {output || <span className="text-gray-400 italic">결과가 여기에 표시됩니다</span>}
                        </div>
                    </div>


                </div>

                {/* Play Button */}
                <div className="mt-6 flex justify-center">
                    <button
                        onClick={playSound}
                        disabled={!output || isPlaying}
                        className={`
                            px-8 py-4 rounded-2xl font-bold text-xl flex items-center shadow-lg transition-all
                            ${isPlaying
                                ? 'bg-gray-400 cursor-not-allowed text-white'
                                : 'bg-indigo-600 hover:bg-indigo-700 text-white hover:-translate-y-1'
                            }
                        `}
                    >
                        <Volume2 className={`w-6 h-6 mr-2 ${isPlaying ? 'animate-pulse' : ''}`} />
                        {isPlaying ? '재생 중...' : '소리로 듣기'}
                    </button>
                </div>

                {/* Cheat Sheet */}
                <div className="mt-12 bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-2 mb-4 text-gray-500">
                        <Radio className="w-5 h-5" />
                        <span className="font-bold text-sm uppercase">Morse Code Reference</span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 text-sm font-mono">
                        {Object.entries(morseTable).map(([char, code]) => (
                            <div key={char} className="flex justify-between px-3 py-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                <span className="font-bold text-indigo-600 dark:text-indigo-400">{char}</span>
                                <span className="text-gray-600 dark:text-gray-400">{code}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            
        
            <div className="mt-12">
                <ToolGuide
                    title="모스 부호 번역기 안내"
                    intro="텍스트를 모스 부호로, 모스 부호를 텍스트로 변환하세요. 소리로 들어볼 수도 있습니다. SOS 구조 신호부터 비밀 메시지까지."
                    steps={toolSteps}
                    tips={toolTips}
                    faqs={toolFaqs}
                />
            </div>
        </div>
    );
};

export default MorseCode;
