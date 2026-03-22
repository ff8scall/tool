import React, { useState, useRef, useCallback } from 'react';
import { Download, Share2, RefreshCw, Brain, Sparkles, Heart, Coffee, DollarSign, Plane, Utensils, Music, Gamepad2, Moon, Star, Shield, Zap } from 'lucide-react';
import { domToPng } from 'modern-screenshot';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { useLanguage } from '../context/LanguageContext';

const BrainStructure = () => {
    const { lang } = useLanguage();
    const isEn = lang === 'en';
    const [name, setName] = useState('');
    const [step, setStep] = useState(0); // 0: Input, 1: Loading, 2: Result
    const resultRef = useRef(null);

    const keywordsKo = [
        { text: "잠(Sleep)", icon: Moon, color: "bg-blue-200 text-blue-700" },
        { text: "돈(Money)", icon: DollarSign, color: "bg-green-200 text-green-700" },
        { text: "연애(Love)", icon: Heart, color: "bg-red-200 text-red-700" },
        { text: "퇴사(Quit)", icon: Zap, color: "bg-orange-200 text-orange-700" },
        { text: "배고픔(Hungry)", icon: Utensils, color: "bg-amber-200 text-amber-700" },
        { text: "여행(Travel)", icon: Plane, color: "bg-teal-200 text-teal-700" },
        { text: "게임(Game)", icon: Gamepad2, color: "bg-indigo-200 text-indigo-700" },
        { text: "커피(Coffee)", icon: Coffee, color: "bg-stone-200 text-stone-700" },
        { text: "멍때리기(Blank)", icon: Star, color: "bg-slate-200 text-slate-700" },
        { text: "로또(Lotto)", icon: Sparkles, color: "bg-yellow-200 text-yellow-700" },
        { text: "성공(Success)", icon: Shield, color: "bg-violet-200 text-violet-700" },
        { text: "덕질(Fan)", icon: Music, color: "bg-pink-200 text-pink-700" },
        { text: "운동(Workout)", icon: Zap, color: "bg-lime-200 text-lime-700" },
        { text: "귀차니즘(Laziness)", icon: Moon, color: "bg-gray-200 text-gray-700" },
        { text: "가족(Family)", icon: Heart, color: "bg-rose-200 text-rose-700" },
        { text: "쇼핑(Shopping)", icon: DollarSign, color: "bg-fuchsia-200 text-fuchsia-700" }
    ];

    const keywordsEn = [
        { text: "Sleep", icon: Moon, color: "bg-blue-200 text-blue-700" },
        { text: "Money", icon: DollarSign, color: "bg-green-200 text-green-700" },
        { text: "Love", icon: Heart, color: "bg-red-200 text-red-700" },
        { text: "Quit Job", icon: Zap, color: "bg-orange-200 text-orange-700" },
        { text: "Hungry", icon: Utensils, color: "bg-amber-200 text-amber-700" },
        { text: "Travel", icon: Plane, color: "bg-teal-200 text-teal-700" },
        { text: "Gaming", icon: Gamepad2, color: "bg-indigo-200 text-indigo-700" },
        { text: "Coffee", icon: Coffee, color: "bg-stone-200 text-stone-700" },
        { text: "Blank Mind", icon: Star, color: "bg-slate-200 text-slate-700" },
        { text: "Jackpot", icon: Sparkles, color: "bg-yellow-200 text-yellow-700" },
        { text: "Success", icon: Shield, color: "bg-violet-200 text-violet-700" },
        { text: "Fandom", icon: Music, color: "bg-pink-200 text-pink-700" },
        { text: "Workout", icon: Zap, color: "bg-lime-200 text-lime-700" },
        { text: "Laziness", icon: Moon, color: "bg-gray-200 text-gray-700" },
        { text: "Family", icon: Heart, color: "bg-rose-200 text-rose-700" },
        { text: "Shopping", icon: DollarSign, color: "bg-fuchsia-200 text-fuchsia-700" }
    ];

    const keywords = isEn ? keywordsEn : keywordsKo;

    const [brainData, setBrainData] = useState([]);

    const generateBrain = () => {
        if (!name.trim()) return;
        setStep(1);

        setTimeout(() => {
            let hash = 0;
            for (let i = 0; i < name.length; i++) {
                hash = name.charCodeAt(i) + ((hash << 5) - hash);
            }

            const selected = [];
            const tempKeywords = [...keywords];
            const count = 5 + (Math.abs(hash) % 3); // 5-7 keywords

            for (let i = 0; i < count; i++) {
                const subHash = Math.abs(hash + i * 37) % tempKeywords.length;
                selected.push({
                    ...tempKeywords[subHash],
                    size: 15 + (Math.abs(hash + i * 13) % 25), // 15-40%
                    x: 10 + (Math.abs(hash + i * 29) % 70), // 10-80%
                    y: 15 + (Math.abs(hash + i * 41) % 65)  // 15-80%
                });
                tempKeywords.splice(subHash, 1);
            }

            const total = selected.reduce((sum, k) => sum + k.size, 0);
            selected.forEach(k => k.percent = Math.round((k.size / total) * 100));

            setBrainData(selected);
            setStep(2);
        }, 1200);
    };

    const saveAsImage = useCallback(async () => {
        if (!resultRef.current) return;
        try {
            const dataUrl = await domToPng(resultRef.current, {
                backgroundColor: '#ffffff',
                scale: 2
            });
            const link = document.createElement('a');
            link.download = `tool-hive-brain-${name}.png`;
            link.href = dataUrl;
            link.click();
        } catch (err) {
            console.error('Image saving failed:', err);
        }
    }, [name]);

    const brainFaqsEn = [
        { q: "How does the brain structure analysis work?", a: "It uses a geometric algorithm (Hashing) based on the unique numerical value extracted from the name provided, visualizing which interest keywords are likely dominating your brain right now." },
        { q: "Does the result stay the same every time?", a: "Yes, for the same name, the same brain structure is designed to be derived no matter when or where it is entered. The energy contained in a name does not change!" },
        { q: "The keywords in the result match my actual concerns!", a: "Amazing, isn't it? It is composed so that the most relatable keywords are placed by combining a database of numerous users with the symbolism of names." }
    ];

    const brainFaqsKo = [
        { q: "뇌 구조 분석은 어떤 원리로 이루어지나요?", a: "입력된 이름에서 추출한 고유한 수치값을 기하학적 알고리즘(Hashing)에 대입하여, 여러 관심사 키워드 중 현재 당신의 뇌를 지배하고 있을 확률이 높은 것들을 시각화해 드립니다." },
        { q: "매번 결과가 똑같이 나오나요?", a: "네, 동일한 이름이라면 언제 어디서 입력해도 항상 똑같은 뇌 구조가 도출되도록 설계되어 있습니다. 이름에 담긴 기운은 변하지 않으니까요!" },
        { q: "결과에 나온 키워드가 실제 고민과 잘 맞아요!", a: "신기하죠? 수많은 사용자의 데이터베이스와 이름의 상징성을 결합하여 가장 공감 가는 키워드가 배치되도록 구성되어 있습니다." }
    ];

    const brainFaqs = isEn ? brainFaqsEn : brainFaqsKo;

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 space-y-12 mb-20">
            <SEO
                title={isEn ? "My Brain Structure Analyzer | Mind Map Test by Name | Tool Hive" : "나의 뇌 구조 분석기 | 이름으로 보는 머릿속 생각 테스트 | Tool Hive"}
                description={isEn ? "What's on your mind right now? Simply enter your name to analyze the 6 thought keywords currently occupying your brain. Instagram brain structure image generator." : "나는 지금 무슨 생각을 하고 있을까? 이름만 넣으면 현재 나의 뇌를 차지하는 6가지 생각 키워드를 분석해 드립니다. 인스타 뇌구조 이미지 생성기."}
                keywords={isEn ? "brain structure analysis, brain structure test, thoughts in mind, name test, psychological test, free analysis, viral tool" : "뇌구조분석, 뇌구조테스트, 머릿속생각, 이름테스트, 심리테스트, 무료분석, 바이럴도구"}
                category={isEn ? "Fun" : "운세/재미"}
                faqs={brainFaqs}
                steps={isEn ? ["Enter the name you want to analyze.", "Click the 'Analyze My Mind' button.", "Wait for the name's energy to be converted into a brain structure map.", "Save the derived image and show it off on social media!"] : ["분석하고 싶은 이름을 입력합니다.", "'내 머릿속 분석하기' 버튼을 클릭합니다.", "이름이 가진 에너지가 뇌 구조 지도로 변환되는 것을 기다립니다.", "도출된 뇌 구조 이미지를 저장하여 SNS에 자랑해보세요!"]}
            />

            {step === 0 && (
                <div className="text-center space-y-12 py-20 bg-gradient-to-br from-pink-50 to-indigo-50 rounded-[4rem] border border-white shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_120%,rgba(99,102,241,0.1),transparent)] pointer-events-none"></div>

                    <div className="flex justify-center relative">
                        <div className="w-24 h-24 bg-white rounded-3xl shadow-xl flex items-center justify-center text-indigo-600 animate-in zoom-in duration-500 transform group-hover:rotate-12 transition-transform">
                            <Brain size={48} />
                        </div>
                        <div className="absolute -top-4 -right-4 p-3 bg-red-400 text-white rounded-full shadow-lg animate-bounce duration-[2000ms]">
                            <Heart size={20} fill="white" />
                        </div>
                    </div>

                    <div className="space-y-4 px-6">
                        <h1 className="text-4xl md:text-6xl font-black text-slate-800 tracking-tighter">{isEn ? 'My Brain Structure Report' : '나의 뇌 구조 분석 리포트'}</h1>
                        <p className="text-lg md:text-xl text-slate-500 font-medium max-w-lg mx-auto leading-relaxed">
                            {isEn ? "The reality in your head you didn't even know!" : "나도 몰랐던 내 머릿속 실체!"}<br /> 
                            {isEn ? "What thoughts are fragmented in your brain right now?" : "당신의 뇌에는 지금 어떤 생각들이 조각조각 있을까요?"}
                        </p>
                    </div>

                    <div className="max-w-sm mx-auto space-y-6">
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder={isEn ? "Enter name to analyze" : "분석할 이름을 입력하세요"}
                            className="w-full px-8 py-5 rounded-[2rem] border-4 border-white focus:border-indigo-300 focus:outline-none text-xl font-black transition-all shadow-inner bg-white/80"
                            maxLength={10}
                        />
                        <button
                            onClick={generateBrain}
                            disabled={!name.trim()}
                            className="w-full py-5 bg-indigo-600 text-white rounded-[2rem] text-xl font-black hover:bg-indigo-700 hover:scale-[1.05] active:scale-95 disabled:opacity-50 transition-all shadow-2xl shadow-indigo-600/30 flex items-center justify-center gap-2"
                        >
                            {isEn ? 'Analyze My Mind' : '내 머릿속 분석하기'} <Sparkles size={24} />
                        </button>
                    </div>
                </div>
            )}

            {step === 1 && (
                <div className="min-h-[400px] flex flex-col items-center justify-center space-y-8 animate-in fade-in duration-1000">
                    <div className="relative">
                        <div className="w-32 h-32 border-[12px] border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
                        <Brain size={40} className="absolute inset-0 m-auto text-indigo-200 animate-pulse" />
                    </div>
                    <div className="text-center">
                        <p className="text-2xl font-black text-indigo-600 mb-2">{isEn ? 'Activating neurons & matching data...' : '뉴런 활성화 및 데이터 매칭 중...'}</p>
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Processing Neural Patterns for {name}</p>
                    </div>
                </div>
            )}

            {step === 2 && brainData && (
                <div className="space-y-12 animate-in zoom-in-95 duration-500">
                    <div
                        ref={resultRef}
                        className="bg-white border-[12px] border-indigo-50 rounded-[4rem] p-10 md:p-16 shadow-2xl relative overflow-hidden flex flex-col items-center"
                    >
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.05),transparent)] pointer-events-none"></div>

                        <div className="relative w-full text-center space-y-10">
                            <div className="space-y-3">
                                <span className="px-5 py-1.5 bg-indigo-600 text-white rounded-full text-xs font-black tracking-widest uppercase">OFFICIAL REPORT</span>
                                <h2 className="text-3xl md:text-5xl font-black text-slate-800">
                                    {isEn ? <><span className="text-indigo-600">{name}'s</span> Current Brain Map</> : <><span className="text-indigo-600">{name}</span>님의 현재 뇌 구조</>}
                                </h2>
                            </div>

                            <div className="relative w-full aspect-[4/3] max-w-xl mx-auto bg-slate-50/50 rounded-[3rem] border border-slate-100 flex items-center justify-center overflow-hidden">
                                <div className="absolute w-[85%] h-[80%] bg-white rounded-[50%_50%_45%_45%_/55%_55%_40%_40%] shadow-[inset_0_0_80px_rgba(99,102,241,0.1)] border-4 border-indigo-100/50"></div>

                                {brainData.map((data, i) => (
                                    <div
                                        key={i}
                                        className={`absolute flex flex-col items-center justify-center rounded-full shadow-lg ${data.color} p-4 transition-transform hover:scale-110 duration-300 animate-in zoom-in duration-700 delay-[${i * 100}ms]`}
                                        style={{
                                            width: `${data.percent * 1.8 + 60}px`,
                                            height: `${data.percent * 1.8 + 60}px`,
                                            left: `${data.x}%`,
                                            top: `${data.y}%`,
                                            transform: 'translate(-50%, -50%)'
                                        }}
                                    >
                                        {React.createElement(data.icon, { size: Math.min(data.percent + 15, 32), className: "mb-1" })}
                                        <span className="font-black text-center leading-tight whitespace-nowrap" style={{ fontSize: `${Math.min(data.percent / 2 + 10, 20)}px` }}>
                                            {data.text}
                                        </span>
                                        <span className="text-[10px] opacity-70 font-bold">{data.percent}%</span>
                                    </div>
                                ))}
                            </div>

                            <div className="bg-indigo-50/50 p-8 rounded-[2.5rem] border border-indigo-100/50">
                                <h4 className="font-black text-indigo-600 mb-2">{isEn ? 'ANALYTICAL FINDINGS' : '분석 소견'}</h4>
                                <p className="text-lg md:text-xl font-bold text-slate-700 leading-relaxed break-keep">
                                    {isEn ? (
                                        <>Currently, <span className="text-indigo-600">[{brainData[0]?.text}]</span> occupies the largest part of {name}'s mind! Especially, thoughts about <span className="text-slate-500">{brainData[1]?.text}</span> and <span className="text-slate-500">{brainData[2]?.text}</span> overlap, creating complex neural interactions.</>
                                    ) : (
                                        <>현재 {name}님의 머릿속은 <span className="text-indigo-600">[{brainData[0]?.text}]</span>(이)가 가장 큰 비중을 차지하고 있네요! 특히 <span className="text-slate-500">{brainData[1]?.text}</span>과(와) <span className="text-slate-500">{brainData[2]?.text}</span>에 대한 생각이 교차하며 복합적인 뉴런 상호작용이 일어나고 있습니다.</>
                                    )}
                                </p>
                            </div>

                            <div className="pt-8 flex flex-col items-center gap-2">
                                <div className="text-2xl font-black text-slate-200 tracking-[0.5em] uppercase">TOOL HIVE | BRAIN LAB</div>
                                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Quantum Personality Hash v1.02</div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4">
                        <button
                            onClick={saveAsImage}
                            className="px-10 py-5 bg-indigo-600 text-white rounded-full font-black text-xl hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-indigo-600/30 flex items-center gap-3"
                        >
                            <Download size={24} /> {isEn ? 'Save Report Image' : '리포트 이미지 저장'}
                        </button>
                        <button
                            onClick={() => {
                                alert(isEn ? 'Link copied!' : '전용 링크가 복사되었습니다!');
                                navigator.clipboard.writeText(window.location.href);
                            }}
                            className="px-10 py-5 bg-white text-slate-700 rounded-full font-black text-xl hover:scale-105 active:scale-95 transition-all border-4 border-slate-50 shadow-lg flex items-center gap-3"
                        >
                            <Share2 size={24} /> {isEn ? 'Share with Friends' : '친구에게 공유'}
                        </button>
                        <button
                            onClick={() => setStep(0)}
                            className="px-10 py-5 bg-slate-100 text-slate-400 rounded-full font-black text-xl hover:text-indigo-600 transition-colors"
                        >
                            <RefreshCw size={24} /> {isEn ? 'Analyze Another Name' : '다른 이름 분석'}
                        </button>
                    </div>
                </div>
            )}

            <ToolGuide
                title={isEn ? "Brain Structure Analysis Guide" : "뇌 구조 분석 가이드"}
                intro={isEn ? "My Brain Structure Report is a fun tool that displays keywords the user currently values or is preoccupied with in a topographic map format, based on the unique energy value of their name." : "나의 뇌 구조 분석(My Brain Structure Report)은 이름이 가진 고유한 에너지값을 기반으로 현재 사용자가 가장 가치 있게 느끼거나 몰두하고 있을 법한 키워드들을 지형도 형식으로 보여주는 재미 도구입니다."}
                steps={isEn ? ["Enter your name or a friend's name to analyze.", "Click 'Analyze' to generate data using AI hashing techniques.", "Check each area and proportion of the brain map.", "Use the share function to let friends know your current 'state'!"] : ["본인의 이름이나 분석하고 싶은 친구의 이름을 넣습니다.", "'분석하기' 버튼을 누르면 인공지능 해싱 기법으로 데이터가 생성됩니다.", "도출된 뇌 지도의 각 영역과 비중을 확인합니다.", "공유하기 기능을 통해 현재 나의 '상태'를 친구들에게 알려보세요!"]}
                tips={isEn ? [
                    "We recommend entering your full name including the surname for accurate energy measurement.",
                    "Beyond simple fun, use it as an opportunity to look back on what you've been neglecting lately.",
                    "It becomes a great conversation starter with coworkers or friends to guess each other's minds."
                ] : [
                    "정확한 기운 측정을 위해 성을 포함한 전체 이름을 입력하는 것을 추천합니다.",
                    "단순한 재미를 넘어, 내가 최근 무엇에 소홀했는지 돌아보는 기회로 삼아보세요.",
                    "직장 동료나 친구들과 함께하면 서로의 머릿속을 유추해보는 즐거운 대화 소재가 됩니다."
                ]}
                faqs={brainFaqs}
            />
        </div>
    );
};

export default BrainStructure;
