import React, { useState, useEffect } from 'react';
import { Share2, RefreshCw, Circle, MousePointer2, Volume2, VolumeX } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { useLanguage } from '../context/LanguageContext';

const BubbleWrap = () => {
    const { lang } = useLanguage();
    const isEn = lang === 'en';
    const [bubbles, setBubbles] = useState([]);
    const [poppedCount, setPoppedCount] = useState(0);
    const [soundEnabled, setSoundEnabled] = useState(true);

    const gridSize = 60; // Total bubbles

    useEffect(() => {
        resetBubbles();
    }, []);

    const resetBubbles = () => {
        setBubbles(Array(gridSize).fill(false));
    };

    const resetAll = () => {
        resetBubbles();
        setPoppedCount(0);
    };

    const playPopSound = () => {
        if (!soundEnabled) return;
        // Subtle haptic feedback if available
        if (navigator.vibrate) {
            navigator.vibrate(20);
        }
    };

    const handlePop = (index) => {
        if (bubbles[index]) return; // Already popped

        const newBubbles = [...bubbles];
        newBubbles[index] = true;
        setBubbles(newBubbles);
        setPoppedCount(prev => prev + 1);
        playPopSound();
    };

    const shareResult = () => {
        const text = isEn 
            ? `I popped ${poppedCount} bubbles! Stress relieved! 🫧` 
            : `나는 뽁뽁이를 ${poppedCount}개 터뜨렸습니다! 스트레스 해소 완료!`;
        if (navigator.share) {
            navigator.share({
                title: isEn ? 'Infinite Bubble Wrap' : '무한 뽁뽁이',
                text: text,
                url: window.location.href,
            });
        } else {
            alert(isEn ? 'Link copied to clipboard!' : '링크가 복사되었습니다!');
            navigator.clipboard.writeText(window.location.href);
        }
    };

    const toolFaqs = isEn ? [
        { q: "What is the purpose of the Bubble Wrap game?", a: "It provides a sensory experience similar to popping real air caps, helping to relieve stress and improve focus through tactile and visual feedback." },
        { q: "Can I pop them infinitely?", a: "Yes! You can refill the sheet as many times as you like. Your total pop count will keep tracking during your session." },
        { q: "Is there a haptic version?", a: "On supported mobile devices, you'll feel a subtle vibration every time you pop a bubble for a more realistic feel." }
    ] : [
        { q: "무한 뽁뽁이 게임의 목적은 무엇인가요?", a: "뽁뽁이(에어캡)를 터뜨리는 시각적, 촉각적 경험을 통해 스트레스를 해소하고 심리적 안정을 얻는 것입니다." },
        { q: "계속해서 터뜨릴 수 있나요?", a: "네! '새 뽁뽁이 채우기' 버튼을 통해 무한히 즐길 수 있으며, 전체 카운트는 세션 동안 계속 누적됩니다." }
    ];

    const toolSteps = isEn ? [
        "Click or tap any of the blue bubbles on the screen to pop them.",
        "Enjoy the satisfaction of the popping animation and tactile feedback.",
        "When the sheet is full, click 'Refill Sheet' to reset the bubbles.",
        "Challenge yourself to reach a high pop count or just relax!"
    ] : [
        "화면에 표시된 뽁뽁이들을 자유롭게 클릭하거나 터치하여 터뜨립니다.",
        "터지는 애니메이션과 효과를 즐기며 스트레스를 날립니다.",
        "모두 터뜨렸다면 '새 뽁뽁이 채우기' 버튼으로 초기화할 수 있습니다.",
        "카운트 기록을 확인하며 자신만의 힐링 시간을 가져보세요."
    ];

    const toolTips = isEn ? [
        "Use this tool during study or work breaks to clear your mind.",
        "On mobile, you can use multiple fingers to pop bubbles even faster.",
        "The light reflection on the bubbles changes as you move, adding to the realism."
    ] : [
        "업무나 공부 중 집중력이 떨어질 때 잠시 머리를 식히는 용도로 활용해보세요.",
        "모바일 환경에서 여러 손가락을 동시에 사용하면 더 경쾌하게 터뜨릴 수 있습니다.",
        "아무 생각 없이 터지는 모습에만 집중하면 명상 효과를 얻을 수 있습니다."
    ];

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <SEO
                title={isEn ? "Infinite Bubble Wrap | Stress Relief Fidget Toy | Tool Hive" : "무한 뽁뽁이 | 온라인 뽁뽁이 게임 for 스트레스 해소 | Tool Hive"}
                description={isEn ? "Pop bubbles infinitely to relieve stress! A free online virtual bubble wrap simulation with realistic feedback. Perfect for focus and relaxation." : "뽁! 뽁! 소리 나는 무한 뽁뽁이로 스트레스를 날려버리세요. 언제 어디서나 즐기는 무료 온라인 뽁뽁이 시뮬레이션."}
                keywords={isEn ? "bubble wrap, pop it, fidget toy, stress relief game, focus tool" : "뽁뽁이, 무한뽁뽁이, 스트레스해소, 피젯토이, 팝잇, popit"}
                category="Luck/Fun"
                faqs={toolFaqs}
                steps={toolSteps}
            />

            <div className="text-center mb-12">
                <div className="inline-block p-4 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-6">
                    <Circle className="w-12 h-12 text-blue-500 animate-pulse" />
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 tracking-tighter italic uppercase">
                    {isEn ? 'Infinite Bubble Wrap' : '무한 뽁뽁이'}
                </h1>
                <p className="text-xl text-muted-foreground font-medium italic">
                    {isEn ? 'Click away your stress, one pop at a time' : '아무 생각 없이 터뜨려보세요!'}
                </p>
                <div className="mt-8 inline-flex items-center bg-blue-500 text-white rounded-[2rem] px-8 py-3 shadow-xl transform -rotate-1">
                    <span className="font-black border-r border-white/20 pr-4 mr-4 uppercase text-xs tracking-widest">{isEn ? 'POP COUNT' : '카운트'}</span>
                    <span className="font-black text-3xl font-mono">{poppedCount}</span>
                </div>
            </div>

            <div className="max-w-xl mx-auto bg-slate-200 dark:bg-slate-800/80 p-8 md:p-12 rounded-[3rem] shadow-2xl border-4 border-slate-300 dark:border-slate-700 mb-12 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent pointer-events-none opacity-20" />
                <div className="grid grid-cols-6 sm:grid-cols-8 gap-4 md:gap-6 justify-items-center relative z-10">
                    {bubbles.map((popped, index) => (
                        <button
                            key={index}
                            onClick={() => handlePop(index)}
                            className={`
                                relative w-12 h-12 md:w-14 md:h-14 rounded-full transition-all duration-150 outline-none
                                ${popped
                                    ? 'bg-slate-300 dark:bg-slate-700 scale-90 shadow-inner translate-y-1'
                                    : 'bg-gradient-to-tr from-blue-400 via-blue-500 to-indigo-500 shadow-[0_8px_0_rgb(37,99,235)] hover:shadow-[0_4px_0_rgb(37,99,235)] hover:translate-y-1 active:shadow-none active:translate-y-2 cursor-pointer'
                                }
                            `}
                            aria-label="Pop bubble"
                        >
                            {!popped && (
                                <>
                                    <div className="absolute top-1.5 left-2 w-4 h-2 bg-white opacity-40 rounded-full filter blur-[1px]"></div>
                                    <div className="absolute bottom-1.5 right-2 w-2 h-2 bg-white opacity-20 rounded-full filter blur-[1px]"></div>
                                </>
                            )}
                            {popped && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-8 h-8 rounded-full border-2 border-slate-400 dark:border-slate-500 opacity-20" />
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button
                    onClick={resetBubbles}
                    className="flex-1 w-full sm:w-auto flex items-center justify-center px-8 py-5 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-2xl font-black text-lg hover:scale-105 transition-all shadow-xl border-2 border-slate-200 dark:border-slate-700 active:scale-95 italic uppercase"
                >
                    <RefreshCw className="w-6 h-6 mr-3" />
                    {isEn ? 'Refill Sheet' : '새 뽁뽁이용지'}
                </button>
                <button
                    onClick={resetAll}
                    className="flex-1 w-full sm:w-auto flex items-center justify-center px-8 py-5 bg-rose-100 hover:bg-rose-200 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-2xl font-black text-lg transition-all active:scale-95 italic uppercase"
                >
                    <RefreshCw className="w-6 h-6 mr-3" />
                    {isEn ? 'Reset Count' : '카운트 리셋'}
                </button>
                <button
                    onClick={shareResult}
                    className="flex-1 w-full sm:w-auto flex items-center justify-center px-8 py-5 bg-primary text-white rounded-2xl font-black text-lg hover:scale-105 transition-all shadow-2xl shadow-primary/20 active:scale-95 italic uppercase"
                >
                    <Share2 className="w-6 h-6 mr-3" />
                    {isEn ? 'Broadcast' : '결과 공유'}
                </button>
            </div>

            <div className="mt-20">
                <ToolGuide
                    title={isEn ? "The Art of Relaxation" : "무한 뽁뽁이 안내"}
                    intro={isEn ? "Pop, pop, pop! Infinite Bubble Wrap is designed for those moments when you need a mental palate cleanser. Whether it's stress from work or just a need to keep your fingers busy, our virtual simulation provides the most satisfying experience without the plastic waste." : "뽁! 뽁! 소리 나는 무한 뽁뽁이로 스트레스를 날려버리세요. 언제 어디서나 즐기는 무료 온라인 뽁뽁이 시뮬레이션."}
                    steps={toolSteps}
                    tips={toolTips}
                    faqs={toolFaqs}
                />
            </div>
        </div>
    );
};

export default BubbleWrap;
