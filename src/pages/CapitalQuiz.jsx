import React, { useState, useEffect } from 'react';
import { Share2, RefreshCw, Globe, Flag, MapPin, Trophy, Star } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { useLanguage } from '../context/LanguageContext';

const CapitalQuiz = () => {
    const { lang } = useLanguage();
    const isEn = lang === 'en';
    const [gameState, setGameState] = useState('start'); // start, playing, gameover
    const [score, setScore] = useState(0);
    const [streak, setStreak] = useState(0); 
    const [question, setQuestion] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);

    const countries = [
        { name: "South Korea", nameKr: "대한민국", capital: "서울", capitalEn: "Seoul", flag: "🇰🇷" },
        { name: "USA", nameKr: "미국", capital: "워싱턴 D.C.", capitalEn: "Washington, D.C.", flag: "🇺🇸" },
        { name: "Japan", nameKr: "일본", capital: "도쿄", capitalEn: "Tokyo", flag: "🇯🇵" },
        { name: "China", nameKr: "중국", capital: "베이징", capitalEn: "Beijing", flag: "🇨🇳" },
        { name: "UK", nameKr: "영국", capital: "런던", capitalEn: "London", flag: "🇬🇧" },
        { name: "France", nameKr: "프랑스", capital: "파리", capitalEn: "Paris", flag: "🇫🇷" },
        { name: "Germany", nameKr: "독일", capital: "베를린", capitalEn: "Berlin", flag: "🇩🇪" },
        { name: "Italy", nameKr: "이탈리아", capital: "로마", capitalEn: "Rome", flag: "🇮🇹" },
        { name: "Canada", nameKr: "캐나다", capital: "오타와", capitalEn: "Ottawa", flag: "🇨🇦" },
        { name: "Australia", nameKr: "호주", capital: "캔버라", capitalEn: "Canberra", flag: "🇦🇺" },
        { name: "Russia", nameKr: "러시아", capital: "모스크바", capitalEn: "Moscow", flag: "🇷🇺" },
        { name: "India", nameKr: "인도", capital: "뉴델리", capitalEn: "New Delhi", flag: "🇮🇳" },
        { name: "Brazil", nameKr: "브라질", capital: "브라질리아", capitalEn: "Brasília", flag: "🇧🇷" },
        { name: "Spain", nameKr: "스페인", capital: "마드리드", capitalEn: "Madrid", flag: "🇪🇸" },
        { name: "Vietnam", nameKr: "베트남", capital: "하노이", capitalEn: "Hanoi", flag: "🇻🇳" },
        { name: "Thailand", nameKr: "태국", capital: "방콕", capitalEn: "Bangkok", flag: "🇹🇭" },
        { name: "Turkey", nameKr: "터키", capital: "앙카라", capitalEn: "Ankara", flag: "🇹🇷" },
        { name: "Egypt", nameKr: "이집트", capital: "카이로", capitalEn: "Cairo", flag: "🇪🇬" },
        { name: "Argentina", nameKr: "아르헨티나", capital: "부에노스아이레스", capitalEn: "Buenos Aires", flag: "🇦🇷" },
        { name: "Mexico", nameKr: "멕시코", capital: "멕시코시티", capitalEn: "Mexico City", flag: "🇲🇽" },
        { name: "Indonesia", nameKr: "인도네시아", capital: "자카르타", capitalEn: "Jakarta", flag: "🇮🇩" },
        { name: "Switzerland", nameKr: "스위스", capital: "베른", capitalEn: "Bern", flag: "🇨🇭" },
        { name: "Netherlands", nameKr: "네덜란드", capital: "암스테르담", capitalEn: "Amsterdam", flag: "🇳🇱" },
        { name: "Belgium", nameKr: "벨기에", capital: "브뤼셀", capitalEn: "Brussels", flag: "🇧🇪" },
        { name: "Sweden", nameKr: "스웨덴", capital: "스톡홀름", capitalEn: "Stockholm", flag: "🇸🇪" },
        { name: "Norway", nameKr: "노르웨이", capital: "오슬로", capitalEn: "Oslo", flag: "🇳🇴" },
        { name: "Finland", nameKr: "핀란드", capital: "헬싱키", capitalEn: "Helsinki", flag: "🇫🇮" },
        { name: "Denmark", nameKr: "덴마크", capital: "코펜하겐", capitalEn: "Copenhagen", flag: "🇩🇰" },
        { name: "Poland", nameKr: "폴란드", capital: "바르샤바", capitalEn: "Warsaw", flag: "🇵🇱" },
        { name: "Ukraine", nameKr: "우크라이나", capital: "키이우", capitalEn: "Kyiv", flag: "🇺🇦" },
        { name: "Greece", nameKr: "그리스", capital: "아테네", capitalEn: "Athens", flag: "🇬🇷" },
        { name: "Portugal", nameKr: "포르투갈", capital: "리스본", capitalEn: "Lisbon", flag: "🇵🇹" },
        { name: "Austria", nameKr: "오스트리아", capital: "빈", capitalEn: "Vienna", flag: "🇦🇹" },
        { name: "Hungary", nameKr: "헝가리", capital: "부다페스트", capitalEn: "Budapest", flag: "🇭🇺" },
        { name: "Czech Republic", nameKr: "체코", capital: "프라하", capitalEn: "Prague", flag: "🇨🇿" },
        { name: "Taiwan", nameKr: "대만", capital: "타이베이", capitalEn: "Taipei", flag: "🇹🇼" },
        { name: "Singapore", nameKr: "싱가포르", capital: "싱가포르", capitalEn: "Singapore", flag: "🇸🇬" },
        { name: "Malaysia", nameKr: "말레이시아", capital: "쿠알라룸푸르", capitalEn: "Kuala Lumpur", flag: "🇲🇾" },
        { name: "Philippines", nameKr: "필리핀", capital: "마닐라", capitalEn: "Manila", flag: "🇵🇭" },
        { name: "Saudi Arabia", nameKr: "사우디아라비아", capital: "리야드", capitalEn: "Riyadh", flag: "🇸🇦" },
        { name: "UAE", nameKr: "아랍에미리트", capital: "아부다비", capitalEn: "Abu Dhabi", flag: "🇦🇪" },
        { name: "South Africa", nameKr: "남아공", capital: "프리토리아", capitalEn: "Pretoria", flag: "🇿🇦" },
        { name: "Kenya", nameKr: "케냐", capital: "나이로비", capitalEn: "Nairobi", flag: "🇰🇪" },
        { name: "New Zealand", nameKr: "뉴질랜드", capital: "웰링턴", capitalEn: "Wellington", flag: "🇳🇿" },
        { name: "Chile", nameKr: "칠레", capital: "산티아고", capitalEn: "Santiago", flag: "🇨🇱" },
        { name: "Peru", nameKr: "페루", capital: "리마", capitalEn: "Lima", flag: "🇵🇪" },
        { name: "Colombia", nameKr: "콜롬비아", capital: "보고타", capitalEn: "Bogotá", flag: "🇨🇴" },
        { name: "Mongolia", nameKr: "몽골", capital: "울란바토르", capitalEn: "Ulaanbaatar", flag: "🇲🇳" },
        { name: "Nepal", nameKr: "네팔", capital: "카트만두", capitalEn: "Kathmandu", flag: "🇳🇵" },
        { name: "Uzbekistan", nameKr: "우즈베키스탄", capital: "타슈케트", capitalEn: "Tashkent", flag: "🇺🇿" },
    ];

    const generateQuestion = () => {
        const target = countries[Math.floor(Math.random() * countries.length)];
        const distractors = [];
        while (distractors.length < 3) {
            const random = countries[Math.floor(Math.random() * countries.length)];
            if (random.name !== target.name && !distractors.includes(random)) {
                distractors.push(random);
            }
        }
        const options = [...distractors, target].sort(() => Math.random() - 0.5);
        return { target, options };
    };

    const startGame = () => {
        setGameState('playing');
        setScore(0);
        setStreak(0);
        setSelectedAnswer(null);
        setIsCorrect(null);
        setQuestion(generateQuestion());
    };

    const handleAnswer = (option) => {
        if (selectedAnswer) return;

        setSelectedAnswer(option);
        const correct = option.name === question.target.name;
        setIsCorrect(correct);

        if (correct) {
            setScore(prev => prev + 10 + (streak * 2));
            setStreak(prev => prev + 1);
            setTimeout(() => {
                setSelectedAnswer(null);
                setIsCorrect(null);
                setQuestion(generateQuestion());
            }, 1000);
        } else {
            setTimeout(() => {
                setGameState('gameover');
            }, 1000);
        }
    };

    const getRank = (finalScore) => {
        if (isEn) {
            if (finalScore >= 300) return { title: "Diplomat", desc: "The world is your home! Flawless geographic knowledge.", color: "text-purple-600" };
            if (finalScore >= 200) return { title: "Global Traveler", desc: "Your passport must be full of stamps!", color: "text-blue-600" };
            if (finalScore >= 100) return { title: "Geography Teacher", desc: "You are quite knowledgeable.", color: "text-green-600" };
            if (finalScore >= 50) return { title: "Tourist", desc: "You know the most famous countries.", color: "text-orange-500" };
            return { title: "Homebody", desc: "Time to pack your bags and go abroad!", color: "text-gray-500" };
        } else {
            if (finalScore >= 300) return { title: "외교관", desc: "전 세계를 내 집처럼! 완벽한 지리 지식.", color: "text-purple-600" };
            if (finalScore >= 200) return { title: "세계 여행가", desc: "여권에 도장이 가득하겠군요!", color: "text-blue-600" };
            if (finalScore >= 100) return { title: "지리 선생님", desc: "꽤 박식하시네요.", color: "text-green-600" };
            if (finalScore >= 50) return { title: "관광객", desc: "유명한 나라는 다 아시는군요.", color: "text-orange-500" };
            return { title: "집돌이", desc: "해외 여행 좀 다녀오셔야겠어요!", color: "text-gray-500" };
        }
    };

    const shareResult = () => {
        const rank = getRank(score);
        const text = isEn ? `My World Capital Quiz score is ${score} (Streak: ${streak})! Rank: ${rank.title}` : `나의 점수는 ${score}점 (연속 ${streak}문제 성공)! 등급: ${rank.title} - 유틸리티 허브`;
        if (navigator.share) {
            navigator.share({
                title: isEn ? 'World Capital Quiz' : '세계 수도 퀴즈',
                text: text,
                url: window.location.href,
            });
        } else {
            alert(isEn ? 'Link copied!' : '링크가 복사되었습니다!');
            navigator.clipboard.writeText(window.location.href);
        }
    };

    const toolFaqs = isEn ? [
        { q: "What countries are included?", a: "Countries from all continents are featured, including their flags and capital city names." },
        { q: "What happens if I get it wrong?", a: "In Survival Mode, the game ends immediately if you choose the wrong capital. High tension!" },
        { q: "Can I use this for study?", a: "Absolutely! Playing repeatedly is one of the best ways to memorize world geography and trivia." }
    ] : [
        { q: "수도 퀴즈에는 어떤 나라들이 나오나요?", a: "전 세계 다양한 대륙의 국가들과 그 나라의 국기, 그리고 수도 이름이 문제로 출제됩니다." },
        { q: "모르는 나라가 너무 많아요.", a: "반복해서 풀다 보면 자연스럽게 세계 지리와 상식을 습득할 수 있습니다." }
    ];

    const toolSteps = isEn ? [
        "Check the flag icon and the country name on the card.",
        "Pick the correct capital city from the four options provided.",
        "Maintain your streak to earn bonus points and reach high ranks.",
        "Compete with friends and become a global geography master!"
    ] : [
        "국기 이미지와 나라 이름을 확인합니다.",
        "제시된 보기 중 올바른 수도 이름을 선택합니다.",
        "정답 연승을 유지하며 더 높은 점수와 등급에 도전하세요.",
        "친구들과 상식 대결을 펼치며 지리학사가 되어보세요."
    ];

    const toolTips = isEn ? [
        "Don't confuse Sydney with Canberra (Australia) or New York with Washington, D.C. (USA)!",
        "Watch out for countries with multiple capitals; the most commonly recognized one is usually the answer.",
        "Study flags beforehand to gain an edge in the quiz."
    ] : [
        "미국의 수도는 뉴욕이 아닌 워싱턴 D.C., 호주의 수도는 시드니가 아닌 캔버라입니다! 헷갈리는 국가들을 조심하세요.",
        "수도가 2개 이상인 나라(예: 남아공)는 행정 수도 위주로 출제됩니다.",
        "국기 모양을 함께 외우면 상식을 넓히는 데 더 큰 도움이 됩니다."
    ];

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <style>{`
                @keyframes bounce-short {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                .animate-bounce-short {
                    animation: bounce-short 2s infinite;
                }
            `}</style>
            <SEO
                title={isEn ? "World Capital Quiz - Test Your Global Knowledge | Tool Hive" : "세계 수도 퀴즈 (World Capital Quiz) | 상식 테스트 | Tool Hive"}
                description={isEn ? "Test your knowledge of world geography with our World Capital Quiz. Guess the capitals of various countries, earn streaks, and achieve high ranks. Survival mode starts now!" : "미국의 수도는 뉴욕이 아닙니다! 헷갈리는 세계 각국의 수도를 맞춰보세요. 당신의 상식 레벨을 테스트하는 수도 맞추기 퀴즈."}
                keywords={isEn ? "capital quiz, world geography quiz, flag quiz, geography trivia, learn countries" : "수도퀴즈, 국기퀴즈, 세계지리, 상식퀴즈, 나라수도"}
                faqs={toolFaqs}
                steps={toolSteps}
            />

            <div className="text-center mb-10">
                <div className="inline-block p-4 bg-blue-500/10 rounded-full mb-6">
                    <Globe size={48} className="text-blue-600 animate-pulse" />
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 uppercase tracking-tighter italic">
                    {isEn ? 'K-CAPITAL SURVIVAL' : '세계 수도 퀴즈'}
                </h1>
                <p className="text-xl text-muted-foreground font-medium italic">
                    {isEn ? 'One wrong move and it is Game Over!' : '틀리는 순간 게임 오버! 당신은 몇 문제나 맞출 수 있을까요?'}
                </p>
            </div>

            <div className="max-w-xl mx-auto bg-card dark:bg-slate-800 rounded-[2.5rem] shadow-2xl overflow-hidden p-10 border-4 border-border/50 transition-all min-h-[500px] flex flex-col justify-center items-center relative">
                
                {gameState === 'start' && (
                    <div className="text-center animate-in fade-in zoom-in-95 duration-500 w-full space-y-10">
                        <div className="relative inline-block">
                            <Globe className="w-40 h-40 text-blue-500/20" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Flag className="w-20 h-20 text-blue-600" />
                            </div>
                        </div>
                        
                        <div className="space-y-6">
                            <h2 className="text-3xl font-black text-foreground uppercase tracking-tight">{isEn ? 'Ready to Explore?' : '도전하시겠습니까?'}</h2>
                            <div className="grid grid-cols-1 gap-4">
                                <div className="flex items-center gap-4 p-5 bg-muted/30 rounded-2xl border border-border/10 shadow-inner">
                                    <Star className="text-yellow-500 shrink-0" fill="currentColor" />
                                    <p className="text-sm font-bold text-muted-foreground text-left leading-snug">
                                        {isEn ? 'Identify the capital city for the country shown.' : '국기를 보고 올바른 수도를 보기에서 선택하세요.'}
                                    </p>
                                </div>
                                <div className="flex items-center gap-4 p-5 bg-muted/30 rounded-2xl border border-border/10 shadow-inner">
                                    <Trophy className="text-orange-500 shrink-0" />
                                    <p className="text-sm font-bold text-muted-foreground text-left leading-snug">
                                        {isEn ? 'Earn massive bonus points by keeping a streak.' : '연속 정답(Streak)을 유지하여 추가 보너스를 받으세요.'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={startGame}
                            className="w-full py-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-2xl font-black rounded-3xl shadow-2xl shadow-blue-500/20 hover:scale-105 transition-all active:scale-95 uppercase tracking-widest italic"
                        >
                            {isEn ? 'DEPARTURE' : '퀴즈 시작'}
                        </button>
                    </div>
                )}

                {gameState === 'playing' && question && (
                    <div className="w-full animate-in fade-in duration-300 space-y-10">
                        <div className="flex justify-between items-center bg-muted/30 p-4 rounded-2xl border border-border/10 shadow-inner">
                            <div className="flex items-center gap-2 text-orange-500 font-black italic uppercase tracking-tighter">
                                <span className="text-xl">🔥</span> STREAK: {streak}
                            </div>
                            <div className="text-2xl font-black text-blue-600 italic tracking-tighter">
                                {score} {isEn ? 'PTS' : '점'}
                            </div>
                        </div>

                        <div className="text-center space-y-6 py-4">
                            <div className="text-[10rem] leading-none animate-bounce-short drop-shadow-2xl">
                                {question.target.flag}
                            </div>
                            <div className="space-y-2">
                                <span className="text-xs font-black uppercase tracking-[0.4em] text-muted-foreground block opacity-50">
                                    {isEn ? 'Destination' : '이 나라의 수도는?'}
                                </span>
                                <h2 className="text-5xl font-black text-foreground uppercase tracking-tighter italic">
                                    {isEn ? question.target.name : question.target.nameKr}
                                </h2>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            {question.options.map((option, index) => {
                                const isSelected = selectedAnswer === option;
                                const isTarget = option.name === question.target.name;

                                let btnStyle = "bg-muted/40 hover:bg-muted/60 text-foreground border-4 border-transparent shadow-sm";

                                if (selectedAnswer) {
                                    if (isTarget) {
                                        btnStyle = "bg-green-500 border-green-600 text-white shadow-xl shadow-green-500/20 scale-105 z-10";
                                    } else if (isSelected) {
                                        btnStyle = "bg-rose-500 border-rose-600 text-white shadow-xl shadow-rose-500/20";
                                    } else {
                                        btnStyle = "opacity-20 grayscale pointer-events-none";
                                    }
                                }

                                return (
                                    <button
                                        key={index}
                                        onClick={() => handleAnswer(option)}
                                        disabled={selectedAnswer !== null}
                                        className={`w-full py-5 rounded-3xl text-2xl font-black transition-all transform active:scale-95 italic ${btnStyle}`}
                                    >
                                        {isEn ? option.capitalEn || option.capital : option.capital}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}

                {gameState === 'gameover' && (
                    <div className="text-center animate-in zoom-in-95 duration-500 w-full space-y-10">
                        <div className="relative inline-block">
                            <MapPin size={120} className="text-rose-500 opacity-20" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <XCircle size={80} className="text-rose-600 drop-shadow-xl" />
                            </div>
                        </div>
                        
                        <div className="space-y-2">
                            <h2 className="text-6xl font-black text-foreground italic tracking-tighter uppercase">{isEn ? 'GAME OVER!' : '게임 오버!'}</h2>
                            <p className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground italic">{isEn ? 'Expedition Terminated' : '원정 종료'}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-muted/30 p-6 rounded-3xl border border-border/10 shadow-inner">
                                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground block mb-1">{isEn ? 'Final Score' : '최종 점수'}</span>
                                <div className="text-4xl font-black text-blue-600 italic">{score}</div>
                            </div>
                            <div className="bg-muted/30 p-6 rounded-3xl border border-border/10 shadow-inner">
                                <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground block mb-1">{isEn ? 'Max Streak' : '최대 연승'}</span>
                                <div className="text-4xl font-black text-orange-500 italic">{streak}</div>
                            </div>
                        </div>

                        <div className="bg-card p-8 rounded-[2rem] border-4 border-border shadow-xl transform -rotate-1">
                            <h3 className={`text-4xl font-black mb-3 italic tracking-tighter uppercase ${getRank(score).color}`}>
                                {getRank(score).title}
                            </h3>
                            <p className="font-bold text-muted-foreground leading-relaxed italic">
                                "{getRank(score).desc}"
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 pt-6">
                            <button
                                onClick={startGame}
                                className="flex-1 flex items-center justify-center px-10 py-6 bg-slate-900 text-white rounded-3xl font-black text-xl hover:scale-105 transition-all shadow-2xl active:scale-95"
                            >
                                <RefreshCw size={28} className="mr-3" />
                                {isEn ? 'RETRY' : '다시하기'}
                            </button>
                            <button
                                onClick={shareResult}
                                className="flex-1 flex items-center justify-center px-10 py-6 bg-blue-600 text-white rounded-3xl font-black text-xl hover:scale-105 transition-all shadow-2xl shadow-blue-500/20 active:scale-95"
                            >
                                <Share2 size={28} className="mr-3" />
                                {isEn ? 'SHARE' : '결과 공유'}
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <div className="mt-24">
                <ToolGuide
                    title={isEn ? "The Capital Survival Guide" : "세계 수도 퀴즈 완전 정복"}
                    intro={isEn ? "Discover the world through its capitals. This quiz tests your speed and accuracy in identifying the political hearts of nations. With every correct answer, you learn more about our diverse planet while aiming for the top rank." : "워싱턴 D.C., 캔버라, 오타와... 나라는 잘 알지만 수도는 의외로 헷갈리는 경우가 많습니다. 본 퀴즈는 여러분의 상식 수준을 한 단계 높여주는 지리 교육용 게임으로, 서바이벌 방식으로 긴장감 넘치는 지식 대결을 즐길 수 있습니다."}
                    steps={toolSteps}
                    tips={toolTips}
                    faqs={toolFaqs}
                />
            </div>
        </div>
    );
};

const XCircle = ({ size, className }) => (
    <svg 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="3" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}
    >
        <circle cx="12" cy="12" r="10" />
        <line x1="15" y1="9" x2="9" y2="15" />
        <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
);

export default CapitalQuiz;
