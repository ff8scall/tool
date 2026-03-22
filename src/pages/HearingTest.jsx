import React, { useState, useEffect, useRef } from 'react';
import { Share2, RefreshCw, Volume2, Ear, Play, Square, AlertTriangle, Zap } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { useLanguage } from '../context/LanguageContext';

const HearingTest = () => {
    const { lang } = useLanguage();
    const isEn = lang === 'en';
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentFreq, setCurrentFreq] = useState(null);
    const [maxFreqHeard, setMaxFreqHeard] = useState(0);
    const [volume, setVolume] = useState(50);
    const audioContextRef = useRef(null);
    const oscillatorRef = useRef(null);
    const gainNodeRef = useRef(null);

    const frequencies = [
        { hz: 8000, age: isEn ? "Everyone" : "모두", desc: isEn ? "Audible for almost everyone" : "누구나 들을 수 있는 소리" },
        { hz: 10000, age: isEn ? "Under 60s" : "60대 이하", desc: isEn ? "Typical hearing for age 60" : "60대 정도의 청력" },
        { hz: 12000, age: isEn ? "Under 50s" : "50대 이하", desc: isEn ? "Typical hearing for age 50" : "50대 정도의 청력" },
        { hz: 14000, age: isEn ? "Under 40s" : "40대 이하", desc: isEn ? "Typical hearing for age 40" : "40대 정도의 청력" },
        { hz: 15000, age: isEn ? "Under 30s" : "30대 이하", desc: isEn ? "Typical hearing for age 30" : "30대 정도의 청력" },
        { hz: 16000, age: isEn ? "Under 25s" : "24대 이하", desc: isEn ? "Typical hearing for age 24" : "20대 중반 정도의 청력" },
        { hz: 17000, age: isEn ? "Under 20s" : "20대 이하", desc: isEn ? "Typical hearing for teenagers/young adults" : "갓 성인이 된 청력" },
        { hz: 18000, age: isEn ? "Teenagers" : "10대 이하", desc: isEn ? "High-pitched sounds only young ears catch" : "모기 소리도 듣는 틴에이저 청력" },
        { hz: 19000, age: isEn ? "Alien?" : "외계인?", desc: isEn ? "Superhuman hearing (or you're a bat)" : "초인적인 청력 (혹은 박쥐)" }
    ];

    const stopSound = () => {
        if (oscillatorRef.current) {
            oscillatorRef.current.stop();
            oscillatorRef.current.disconnect();
        }
        if (gainNodeRef.current) {
            gainNodeRef.current.disconnect();
        }
        if (audioContextRef.current) {
            audioContextRef.current.close();
        }

        oscillatorRef.current = null;
        gainNodeRef.current = null;
        audioContextRef.current = null;
        setIsPlaying(false);
        setCurrentFreq(null);
    };

    useEffect(() => {
        return () => stopSound();
    }, []);

    const startSound = (hz) => {
        if (isPlaying) stopSound();

        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) {
            alert(isEn ? "Your browser does not support audio features." : "이 브라우저는 오디오 기능을 지원하지 않습니다.");
            return;
        }

        const ctx = new AudioContext();
        audioContextRef.current = ctx;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(hz, ctx.currentTime);

        // Volume control - limiting for safety
        gain.gain.setValueAtTime(volume / 100 * 0.05, ctx.currentTime); 

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        oscillatorRef.current = osc;
        gainNodeRef.current = gain;

        setIsPlaying(true);
        setCurrentFreq(hz);
    };

    const handleHear = (hz) => {
        if (hz > maxFreqHeard) {
            setMaxFreqHeard(hz);
        }
    };

    const getResult = () => {
        if (maxFreqHeard === 0) return { title: isEn ? "Initial Analysis" : "테스트 시작 전", desc: isEn ? "Click the play buttons to test your ears." : "버튼을 눌러 테스트를 진행해주세요." };
        const result = frequencies.find(f => f.hz === maxFreqHeard);
        return {
            title: isEn ? `Ear Age: ${result.age}` : `당신의 귀 나이는: ${result.age}`,
            desc: isEn ? `You can hear up to ${result.hz}Hz. ${result.desc}` : `최대 ${result.hz}Hz까지 들을 수 있습니다. ${result.desc}`
        };
    };

    const shareResult = () => {
        const result = getResult();
        const text = isEn 
            ? `My ear age result: ${result.age} (${maxFreqHeard}Hz successful) | Tool Hive` 
            : `${result.title} (${maxFreqHeard}Hz 성공) - 유틸리티 허브`;
        if (navigator.share) {
            navigator.share({
                title: isEn ? 'Hearing Age Test' : '청력 나이 테스트',
                text: text,
                url: window.location.href,
            });
        } else {
            alert(isEn ? 'Link copied to clipboard!' : '링크가 복사되었습니다!');
            navigator.clipboard.writeText(window.location.href);
        }
    };

    const toolFaqs = isEn ? [
        { q: "Is this hearing test accurate?", a: "This test measures your audible frequency range (Hz). While it provides a good estimate, hardware quality (speakers/headphones) can affect results." },
        { q: "I can't hear anything.", a: "Check your device volume. Also, as we age, the hair cells in our inner ear degrade, making high-pitched sounds impossible to hear." },
        { q: "What is the frequency of a mosquito?", a: "Mosquito buzz is typically around 17,000Hz to 18,000Hz, which is why teenagers are often more annoyed by them than adults." }
    ] : [
        { q: "청력 나이 테스트는 정확한가요?", a: "주파수(Hz)에 따른 가청 범위를 확인하는 원리입니다. 다만 스마트폰 기기나 이어폰의 성능에 따라 정확도가 달라질 수 있습니다." },
        { q: "아무 소리도 들리지 않아요.", a: "볼륨이 작거나 스피커 성능 한계일 수 있습니다. 혹은 실제 청력이 해당 고주파를 듣지 못하는 단계일 수 있습니다." }
    ];

    const toolSteps = isEn ? [
        "Move to a quiet environment and wear headphones or earphones.",
        "Set your device volume to a comfortable level (around 30-50%).",
        "Start playing from the lowest frequency (8,000Hz) and move up.",
        "Click 'I Hear It!' for each level you can audible perceive."
    ] : [
        "주변 소음이 적은 조용한 곳으로 이동하여 이어폰 혹은 헤드셋을 착용합니다.",
        "기기 볼륨을 30~50% 정도로 먼저 설정 후 테스트하세요.",
        "가장 낮은 주파수부터 재생 버튼을 눌러 소리가 들리는지 확인합니다.",
        "소리가 들린다면 '들림!' 버튼을 눌러 기록을 저장합니다."
    ];

    const toolTips = isEn ? [
        "Warning: Avoid using maximum volume as high-frequency sounds can be harsh.",
        "This is for entertainment purposes. See an ENT professional for a clinical audiogram.",
        "If you hear a 'pop' but no continuous tone, it might be speaker distortion rather than the actual frequency."
    ] : [
        "갑자기 큰 소리가 날 수 있으니 너무 높은 볼륨での 테스트는 권장하지 않습니다.",
        "정확한 청력 검사는 반드시 이비인후과 전문의를 통해 진행해야 합니다.",
        "귀 건강을 위해 무리하게 높은 볼륨을 올리지 마세요."
    ];

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <SEO
                title={isEn ? "Hearing Age Test | High Frequency Audit Quiz | Tool Hive" : "청력 나이 테스트 | 내 귀는 몇 살일까? | Tool Hive"}
                description={isEn ? "Measure your hearing age using high-frequency sounds. Find out if you have 'teenager ears' or 'bat hearing' in this fun sonic test." : "고주파 소리로 측정하는 나의 신체 나이! 10대만 들을 수 있는 소리가 있다? 재미로 보는 청력 테스트."}
                keywords={isEn ? "hearing test, ear age, frequency test, high pitch test, sonic age" : "청력테스트, 귀나이, 고주파테스트, 신체나이, 청력나이, hearing test"}
                category="Health/Body"
                faqs={toolFaqs}
                steps={toolSteps}
            />

            <div className="text-center mb-12">
                <div className="inline-block p-4 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mb-6">
                    <Ear size={48} className="text-indigo-600 dark:text-indigo-400" />
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 tracking-tighter italic uppercase">
                    {isEn ? 'The Hearing Age' : '청력 나이 테스트'}
                </h1>
                <p className="text-xl text-muted-foreground font-medium italic">
                    {isEn ? 'How young are your ears? Test high-frequency perception.' : '당신의 귀는 얼마나 젊은가요? 고주파 소리를 들어보세요.'}
                </p>
                <div className="mt-8 flex items-center justify-center text-sm font-black text-rose-600 bg-rose-100 dark:bg-rose-900/30 px-6 py-3 rounded-2xl mx-auto max-w-md italic uppercase tracking-tight">
                    <AlertTriangle className="w-5 h-5 mr-3" />
                    <span>{isEn ? 'Warning: Use moderate volume for safety.' : '주의: 볼륨을 너무 크게 하지 마세요.'}</span>
                </div>
            </div>

            <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 rounded-[3rem] shadow-2xl overflow-hidden p-10 border-4 border-slate-100 dark:border-slate-700 transition-all">
                {/* Volume HUD */}
                <div className="mb-10 p-6 bg-slate-50 dark:bg-slate-900/50 rounded-3xl flex items-center gap-6">
                    <Volume2 className="text-slate-400" />
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={volume}
                        onChange={(e) => {
                            setVolume(e.target.value);
                            if (gainNodeRef.current) {
                                gainNodeRef.current.gain.setValueAtTime(e.target.value / 100 * 0.05, audioContextRef.current.currentTime);
                            }
                        }}
                        className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                    />
                    <span className="text-sm font-black text-slate-500 w-16 text-right font-mono italic">{volume}%</span>
                </div>

                <div className="space-y-4">
                    {frequencies.map((item) => (
                        <div key={item.hz} className={`flex items-center justify-between p-5 rounded-[2rem] transition-all group ${currentFreq === item.hz ? 'bg-indigo-50 dark:bg-indigo-900/20 ring-2 ring-indigo-500' : 'bg-slate-50 dark:bg-slate-900/50 hover:bg-white dark:hover:bg-slate-700 border-2 border-transparent hover:border-indigo-200'}`}>
                            <div className="flex-1">
                                <div className="flex items-center gap-3">
                                    <span className="font-black text-xl text-slate-800 dark:text-white italic uppercase tracking-tight">{item.age}</span>
                                    <span className="text-[10px] px-3 py-1 bg-indigo-500 text-white rounded-full font-black italic tracking-widest">{item.hz}HZ</span>
                                </div>
                                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1 italic">{item.desc}</p>
                            </div>

                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => currentFreq === item.hz ? stopSound() : startSound(item.hz)}
                                    className={`w-14 h-14 rounded-full flex items-center justify-center transition-all active:scale-95 shadow-lg ${currentFreq === item.hz
                                            ? 'bg-rose-500 text-white animate-pulse'
                                            : 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-slate-600'
                                        }`}
                                >
                                    {currentFreq === item.hz ? <Square fill="currentColor" className="w-6 h-6" /> : <Play fill="currentColor" className="w-6 h-6 ml-1" />}
                                </button>

                                <button
                                    onClick={() => handleHear(item.hz)}
                                    className={`px-6 py-4 rounded-2xl text-xs font-black italic uppercase tracking-widest transition-all border-4 ${maxFreqHeard >= item.hz
                                            ? 'bg-green-500 border-green-500 text-white shadow-xl shadow-green-500/20'
                                            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 hover:border-green-500 hover:text-green-500 hover:bg-green-50'
                                        }`}
                                >
                                    {isEn ? "I Hear It!" : "들림!"}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {maxFreqHeard > 0 && (
                    <div className="mt-12 text-center animate-in zoom-in duration-500 bg-gradient-to-br from-indigo-500 to-purple-600 p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Zap size={120} className="text-white" />
                        </div>
                        <Ear className="w-16 h-16 text-white/50 mx-auto mb-6" />
                        <h3 className="text-3xl font-black text-white italic tracking-tighter uppercase mb-2">
                            {getResult().title}
                        </h3>
                        <p className="text-white/80 font-medium italic mb-10 text-lg">
                            {getResult().desc}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                            <button
                                onClick={() => { stopSound(); setMaxFreqHeard(0); }}
                                className="flex-1 flex items-center justify-center px-8 py-5 bg-white/10 backdrop-blur-md text-white rounded-2xl font-black text-lg border-2 border-white/20 hover:bg-white/20 transition-all active:scale-95 italic uppercase"
                            >
                                <RefreshCw className="w-5 h-5 mr-3" />
                                {isEn ? 'RECALIBRATE' : '리셋'}
                            </button>
                            <button
                                onClick={shareResult}
                                className="flex-1 flex items-center justify-center px-8 py-5 bg-white text-indigo-600 rounded-2xl font-black text-lg hover:scale-105 transition-all shadow-xl active:scale-95 italic uppercase"
                            >
                                <Share2 className="w-5 h-5 mr-3" />
                                {isEn ? 'BROADCAST' : '결과 공유'}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        
            <div className="mt-20">
                <ToolGuide
                    title={isEn ? "The Auditory Spectrum" : "청력 나이 테스트 안내"}
                    intro={isEn ? "Human hearing typically ranges from 20Hz to 20,000Hz. However, aging and noise exposure cause us to lose sensitivity starting from the high frequencies. This digital audiogram allows you to map your auditory threshold and determine if your 'Ear Age' matches your biological age." : "고주파 소리로 측정하는 나의 신체 나이! 10대만 들을 수 있는 소리가 있다? 재미로 보는 청력 테스트."}
                    steps={toolSteps}
                    tips={toolTips}
                    faqs={toolFaqs}
                />
            </div>
        </div>
    );
};

export default HearingTest;
