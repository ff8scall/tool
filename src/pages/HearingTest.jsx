import React, { useState, useEffect, useRef } from 'react';

import { Share2, RefreshCw, Volume2, Ear, Play, Square, AlertTriangle } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';

const HearingTest = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentFreq, setCurrentFreq] = useState(null);
    const [maxFreqHeard, setMaxFreqHeard] = useState(0);
    const [volume, setVolume] = useState(50);
    const audioContextRef = useRef(null);
    const oscillatorRef = useRef(null);
    const gainNodeRef = useRef(null);

    const frequencies = [
        { hz: 8000, age: "모두", desc: "누구나 들을 수 있는 소리" },
        { hz: 10000, age: "60대 이하", desc: "60대 정도의 청력" },
        { hz: 12000, age: "50대 이하", desc: "50대 정도의 청력" },
        { hz: 14000, age: "40대 이하", desc: "40대 정도의 청력" },
        { hz: 15000, age: "30대 이하", desc: "30대 정도의 청력" },
        { hz: 16000, age: "24대 이하", desc: "20대 중반 정도의 청력" },
        { hz: 17000, age: "20대 이하", desc: "갓 성인이 된 청력" },
        { hz: 18000, age: "10대 이하", desc: "모기 소리도 듣는 틴에이저 청력" },
        { hz: 19000, age: "외계인?", desc: "초인적인 청력 (혹은 박쥐)" }
    ];

    useEffect(() => {
        
    const toolFaqs = [
        {
            "q": "청력 나이 테스트는 정확한가요?",
            "a": "주파수(Hz)에 따른 가청 범위를 확인하는 원리입니다. 다만 스마트폰 기기나 이어폰의 성능에 따라 정확도가 달라질 수 있습니다."
        },
        {
            "q": "아무 소리도 들리지 않아요.",
            "a": "볼륨이 작거나 스피커 성능 한계일 수 있습니다. 본인의 실제 귀 나이가 주파수를 듣지 못하는 나이대일 수도 있습니다."
        }
    ];
    const toolSteps = [
        "주변 소음이 적은 조용한 곳으로 이동하여 이어폰 혹은 헤드셋을 착용합니다.",
        "가장 낮은 주파수부터 재생 버튼을 눌러 소리가 들리는지 확인합니다.",
        "들리지 않는 주파수가 나오면 멈추고 해당 주파수에 해당하는 청력 나이를 확인합니다."
    ];
    const toolTips = [
        "갑자기 큰 소리가 날 수 있으니 기기 볼륨을 30~50% 정도로 먼저 설정 후 테스트하세요.",
        "정확한 청력 검사는 반드시 이비인후과 전문의를 통해 진행해야 합니다."
    ];

    return () => stopSound();
    }, []);

    const startSound = (hz) => {
        if (isPlaying) stopSound();

        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) {
            alert("이 브라우저는 오디오 기능을 지원하지 않습니다.");
            return;
        }

        const ctx = new AudioContext();
        audioContextRef.current = ctx;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(hz, ctx.currentTime);

        // Volume control
        gain.gain.setValueAtTime(volume / 100 * 0.1, ctx.currentTime); // Reduce max gain for safety

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        oscillatorRef.current = osc;
        gainNodeRef.current = gain;

        setIsPlaying(true);
        setCurrentFreq(hz);
    };

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

    const handleHear = (hz) => {
        if (hz > maxFreqHeard) {
            setMaxFreqHeard(hz);
        }
    };

    const getResult = () => {
        if (maxFreqHeard === 0) return { title: "테스트 시작 전", desc: "버튼을 눌러 테스트를 진행해주세요." };
        const result = frequencies.find(f => f.hz === maxFreqHeard);
        return {
            title: `당신의 귀 나이는: ${result.age}`,
            desc: `최대 ${result.hz}Hz까지 들을 수 있습니다. ${result.desc}`
        };
    };

    const shareResult = () => {
        const result = getResult();
        if (navigator.share) {
            navigator.share({
                title: '청력 나이 테스트',
                text: `${result.title} (${maxFreqHeard}Hz 성공) - 유틸리티 허브`,
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
                title="청력 나이 테스트 | 내 귀는 몇 살일까?"
                description="고주파 소리로 측정하는 나의 신체 나이! 10대만 들을 수 있는 소리가 있다? 재미로 보는 청력 테스트."
                keywords="청력테스트, 귀나이, 고주파테스트, 신체나이, 청력나이, hearing test"
                category="건강"
                faqs={toolFaqs}
                steps={toolSteps}
            />

            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4 animate-fade-in">
                    👂 청력 나이 테스트
                </h1>
                <p className="text-xl text-gray-600 dark:text-gray-300">
                    당신의 귀는 얼마나 젊은가요? 고주파 소리를 들어보세요.
                </p>
                <div className="mt-4 flex items-center justify-center text-sm text-yellow-600 bg-yellow-100 px-4 py-2 rounded-lg mx-auto max-w-md">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    <span>볼륨을 너무 크게 하지 마세요. 귀 건강에 해로울 수 있습니다.</span>
                </div>
            </div>

            <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden p-8 transition-all duration-300">

                {/* Volume Control */}
                <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl flex items-center gap-4">
                    <Volume2 className="text-gray-500" />
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={volume}
                        onChange={(e) => {
                            setVolume(e.target.value);
                            if (gainNodeRef.current) {
                                gainNodeRef.current.gain.setValueAtTime(e.target.value / 100 * 0.1, audioContextRef.current.currentTime);
                            }
                        }}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-600 accent-indigo-500"
                    />
                    <span className="text-sm font-bold text-gray-500 w-12 text-right">{volume}%</span>
                </div>

                <div className="space-y-4">
                    {frequencies.map((item) => (
                        <div key={item.hz} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-650 transition-colors">
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-lg text-gray-800 dark:text-white">{item.age}</span>
                                    <span className="text-xs px-2 py-0.5 bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 rounded-full font-mono">{item.hz}Hz</span>
                                </div>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{item.desc}</p>
                            </div>

                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => currentFreq === item.hz ? stopSound() : startSound(item.hz)}
                                    className={`p-3 rounded-full transition-all active:scale-95 ${currentFreq === item.hz
                                            ? 'bg-red-500 text-white shadow-lg shadow-red-500/30'
                                            : 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400 hover:bg-indigo-200 dark:hover:bg-indigo-900/50'
                                        }`}
                                >
                                    {currentFreq === item.hz ? <Square fill="currentColor" className="w-5 h-5" /> : <Play fill="currentColor" className="w-5 h-5" />}
                                </button>

                                <button
                                    onClick={() => handleHear(item.hz)}
                                    className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border-2 ${maxFreqHeard >= item.hz
                                            ? 'bg-green-500 border-green-500 text-white'
                                            : 'border-gray-200 dark:border-gray-600 text-gray-500 hover:border-green-500 hover:text-green-500'
                                        }`}
                                >
                                    들림!
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {maxFreqHeard > 0 && (
                    <div className="mt-8 text-center animate-scale-in bg-indigo-50 dark:bg-indigo-900/20 p-6 rounded-2xl border border-indigo-100 dark:border-indigo-800">
                        <Ear className="w-12 h-12 text-indigo-500 mx-auto mb-3" />
                        <h3 className="text-2xl font-bold text-indigo-900 dark:text-indigo-100 mb-2">
                            {getResult().title}
                        </h3>
                        <p className="text-indigo-700 dark:text-indigo-300 mb-6">
                            {getResult().desc}
                        </p>

                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={() => { stopSound(); setMaxFreqHeard(0); }}
                                className="flex items-center px-5 py-2.5 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-xl font-bold border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
                            >
                                <RefreshCw className="w-4 h-4 mr-2" />
                                리셋
                            </button>
                            <button
                                onClick={shareResult}
                                className="flex items-center px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-md transition-all"
                            >
                                <Share2 className="w-4 h-4 mr-2" />
                                결과 공유
                            </button>
                        </div>
                    </div>
                )}
            </div>
        
            <div className="mt-12">
                <ToolGuide
                    title="청력 나이 테스트 안내"
                    intro="고주파 소리로 측정하는 나의 신체 나이! 10대만 들을 수 있는 소리가 있다? 재미로 보는 청력 테스트."
                    steps={toolSteps}
                    tips={toolTips}
                    faqs={toolFaqs}
                />
            </div>
        </div>
    );
};

export default HearingTest;
