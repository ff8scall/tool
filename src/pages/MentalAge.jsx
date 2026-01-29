import React, { useState, useRef, useCallback } from 'react';
import { Smile, Zap, Coffee, Brain, Heart, Sparkles, Check, Info, User, Star } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import ShareableResult from '../components/ShareableResult';

const MentalAge = () => {
    const [step, setStep] = useState(0); // 0: Start, 1: Quiz, 2: Result
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [totalScore, setTotalScore] = useState(0);
    const resultRef = useRef(null);

    const questions = [
        {
            q: "새로운 최신 유행어(신조어)를 들었을 때 당신의 반응은?",
            options: [
                { text: "보자마자 바로 뜻을 알고 사용한다", score: 1 },
                { text: "검색해보고 '아~' 하며 이해한다", score: 3 },
                { text: "무슨 말인지 도무지 모르겠고 관심 없다", score: 5 },
                { text: "말투가 그게 뭐냐며 혀를 찬다", score: 7 }
            ],
            icon: Zap
        },
        {
            q: "주말에 가장 선호하는 휴식 방법은?",
            options: [
                { text: "하루 종일 게임하거나 유튜브 쇼츠 보기", score: 1 },
                { text: "핫플레이스 카페에 나가서 사진 찍기", score: 2 },
                { text: "밀린 집안일을 하고 조용히 독서하기", score: 4 },
                { text: "등산을 가거나 약수터에 다녀오기", score: 6 }
            ],
            icon: Coffee
        },
        {
            q: "이상형을 볼 때 가장 중요하게 생각하는 조건은?",
            options: [
                { text: "얼굴! 무조건 잘생기고 예뻐야 함", score: 1 },
                { text: "나랑 코드가 잘 맞고 재밌는 사람", score: 2 },
                { text: "가치관이 올바르고 성실한 사람", score: 4 },
                { text: "가정적이고 편안함을 주는 사람", score: 6 }
            ],
            icon: Heart
        },
        {
            q: "음식을 주문할 때 당신의 스타일은?",
            options: [
                { text: "SNS에서 핫한 신메뉴나 마라탕!", score: 1 },
                { text: "무난하게 베스트 메뉴나 추천 메뉴", score: 2 },
                { text: "늘 먹던 안전하고 익은 메뉴", score: 4 },
                { text: "뜨끈한 국밥이나 백반이 최고지", score: 6 }
            ],
            icon: Smile
        },
        {
            q: "주변에서 당신에게 자주 하는 말은?",
            options: [
                { text: "너 진짜 철 안 든다!", score: 1 },
                { text: "너 은근히 센스 있다?", score: 2 },
                { text: "너 참 생각이 깊고 어른스럽네", score: 5 },
                { text: "너 가끔 잔소리가 너무 심해", score: 7 }
            ],
            icon: User
        },
        {
            q: "당신의 노래방 애창곡 스타일은?",
            options: [
                { text: "아이돌 최신 곡이나 챌린지 댄스 곡", score: 1 },
                { text: "오디션 프로그램에서 나온 힙한 노래", score: 2 },
                { text: "감성 터지는 정통 발라드", score: 4 },
                { text: "흥겨운 트로트나 90년대 명곡", score: 6 }
            ],
            icon: Star
        },
        {
            q: "인터넷 기사를 볼 때 가장 먼저 클릭하는 분야는?",
            options: [
                { text: "연예/엔터/유머 게시판", score: 1 },
                { text: "IT/테크/트렌드", score: 2 },
                { text: "정치/경제/사회 이슈", score: 5 },
                { text: "건강/꿀팁/부동산", score: 7 }
            ],
            icon: Info
        },
        {
            q: "갑자기 1억이 생긴다면 가장 먼저 하고 싶은 일은?",
            options: [
                { text: "슈퍼카 사고 파티하기", score: 1 },
                { text: "세계 일주 여행 떠나기", score: 2 },
                { text: "적금 넣고 대출 갚기", score: 5 },
                { text: "가족들 용돈 주고 기부하기", score: 7 }
            ],
            icon: Sparkles
        },
        {
            q: "친구와의 약속 장소에 10분 늦었을 때 당신은?",
            options: [
                { text: "미안미안! 택시 타고 날아가는 중!", score: 2 },
                { text: "정중하게 사과하고 상황을 설명한다", score: 4 },
                { text: "친구 기분을 살피며 커피를 산다", score: 5 },
                { text: "약속 시간 좀 늦을 수도 있지 뭘 그래?", score: 7 }
            ],
            icon: Clock
        },
        {
            q: "TV 리모컨을 잡았을 때 주로 멈추는 채널은?",
            options: [
                { text: "만화나 애니메이션", score: 1 },
                { text: "박진감 넘치는 예능 프로그램", score: 2 },
                { text: "시사 프로그램이나 뉴스", score: 6 },
                { text: "나는 자연인이다 등 다큐멘터리", score: 8 }
            ],
            icon: Moon
        }
    ];

    const results = [
        { age: "8세", name: "순수한 무공해 꿈나무", title: "호기심 가득한 골목대장", desc: "당신은 세상을 편견 없이 바라보는 맑은 영혼의 소유자입니다. 작은 것에도 크게 감동하고 웃을 줄 아는 당신은 주변 사람들에게 긍정적인 에너지를 전파합니다. 가끔은 너무 천진난만해서 철없다는 소리를 듣기도 하지만, 그 순수함이 당신이 가진 최고의 매력입니다!", color: "from-yellow-400 to-orange-400", emoji: "🐣" },
        { age: "17세", name: "열정 가득 질풍노도", title: "자유로운 영혼의 소년/소녀", desc: "트렌드에 민감하고 새로운 도전을 즐기는 당신은 마음만은 언제나 10대 사춘기! 끊임없이 무언가에 열광하고 에너지를 쏟을 곳을 찾아다닙니다. 지루한 일상을 견디기 힘들어하며, 언제나 재미있는 일을 찾아 모험을 떠날 준비가 되어 있습니다.", color: "from-green-400 to-teal-500", emoji: "🛹" },
        { age: "28세", name: "갓생 사는 열혈 청년", title: "현실과 열정 사이의 프로페셔널", desc: "사회생활에 최적화된 정신력을 지닌 당신! 적당히 눈치도 보면서 내 실속은 확실히 챙기는 똑쟁이 스타일입니다. 때로는 번아웃이 오기도 하지만, 주말의 작은 보상으로 다시 일어설 줄 아는 건강한 정신의 소유자입니다.", color: "from-blue-500 to-indigo-600", emoji: "💼" },
        { age: "45세", name: "노련한 인생 베테랑", title: "산전수전 다 겪은 지혜의 리더", desc: "웬만한 일에는 눈 하나 깜짝하지 않는 강건한 멘탈의 소유자입니다. 말하기보다는 들어주는 법을 알고, 감정보다는 이성적으로 상황을 판단합니다. 당신의 조언을 구하는 사람이 주변에 많으며, 조직 내에서 든든한 버팀목 역할을 수행합니다.", color: "from-purple-600 to-slate-700", emoji: "🍷" },
        { age: "65세", name: "통달한 인생의 대선비", title: "세상만사 다 부질없다, 무소유 현자", desc: "이미 인생의 진리를 깨닫고 해탈의 경지에 오르셨군요? 경쟁이나 소음보다는 조용한 평화를 선호하며, 남들의 시선보다는 나의 내면의 소리에 집중합니다. 가끔은 주변 친구들이 '너랑 얘기하면 절에 온 것 같아'라고 할지도 모르겠네요.", color: "from-stone-600 to-slate-900", emoji: "🍵" }
    ];

    const handleAnswer = (score) => {
        setTotalScore(totalScore + score);
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setStep(2);
        }
    };

    const getFinalResult = () => {
        const avgScore = totalScore / questions.length;
        if (avgScore <= 1.5) return results[0];
        if (avgScore <= 2.5) return results[1];
        if (avgScore <= 4.5) return results[2];
        if (avgScore <= 6.5) return results[3];
        return results[4];
    };

    const currentResult = step === 2 ? getFinalResult() : null;

    const saveAsImage = useCallback(async () => {
        if (!resultRef.current) return;
        try {
            const dataUrl = await domToPng(resultRef.current, {
                backgroundColor: '#ffffff',
                scale: 2
            });
            const link = document.createElement('a');
            link.download = `tool-hive-mental-age.png`;
            link.href = dataUrl;
            link.click();
        } catch (err) {
            console.error('Image saving failed:', err);
        }
    }, []);

    const mentalFaqs = [
        { q: "정신 연령은 어떻게 측정되나요?", a: "사용자가 선택하는 가치관, 생활 습관, 유행에 대한 반응성 등을 수치화하여 분석합니다. 보수적이거나 안정적인 선택을 할수록 연령이 높게 측정되며, 개방적이고 감각적인 선택을 할수록 연령이 낮게 측정됩니다." },
        { q: "실제 나이와 다르게 나오는 이유는 무엇인가요?", a: "정신 연령은 '마음의 태도'를 의미합니다. 나이가 들어도 호기심을 잃지 않으면 젊게 나올 수 있고, 어리더라도 생각이 깊고 중후하면 높게 나올 수 있습니다." },
        { q: "결과가 너무 높게 나왔는데 어떡하죠?", a: "걱정 마세요! 그만큼 당신이 성숙하고 지혜롭다는 증거입니다. 오늘 하루는 조금 유치한 취미를 즐기며 보상을 주는 건 어떨까요?" }
    ];

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 space-y-12 mb-20 lowercase-none">
            <SEO
                title="무료 정신 연령 테스트 | 나의 마음 나이는 몇 살?"
                description="나는 잼민이일까, 꼰대일까? 간단한 설문을 통해 나의 정신 건강 연령을 테스트해보세요. 인스타그램에서 핫한 정신 연령 진단기."
                keywords="정신연령테스트, 정신나이테스트, 심리테스트, 꼰대테스트, 정신연령측정, 무료진단"
                category="운세/재미"
                faqs={mentalFaqs}
                steps={["테스트 시작 버튼을 누릅니다.", "나의 솔직한 생각과 가장 가까운 보기를 선택합니다.", "10가지 질문에 답하면 분석이 시작됩니다.", "도출된 정신 연령과 캐릭터를 확인하고 이미지를 공유합니다."]}
            />

            {step === 0 && (
                <div className="text-center space-y-8 py-20 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-[3rem] border border-white shadow-xl animate-in fade-in duration-1000">
                    <div className="inline-flex p-6 rounded-full bg-white shadow-lg text-indigo-600 mb-4 animate-bounce">
                        <Brain size={64} />
                    </div>
                    <div className="space-y-4">
                        <h1 className="text-4xl md:text-6xl font-black text-slate-800 tracking-tighter">정신 연령 테스트</h1>
                        <p className="text-xl text-slate-500 max-w-xl mx-auto font-medium">
                            민증 나이는 속여도 마음 나이는 못 속인다!<br /> 당신의 진짜 정신 연령을 확인해보세요.
                        </p>
                    </div>
                    <button
                        onClick={() => setStep(1)}
                        className="px-12 py-5 bg-indigo-600 text-white rounded-full text-2xl font-black hover:scale-110 active:scale-95 transition-all shadow-2xl shadow-indigo-600/30"
                    >
                        테스트 시작!
                    </button>
                    <div className="flex justify-center gap-8 text-sm text-slate-400 font-bold uppercase tracking-widest">
                        <span># 10 Questions</span>
                        <span># Instant Result</span>
                    </div>
                </div>
            )}

            {step === 1 && (
                <div className="space-y-8 animate-in slide-in-from-bottom-10 duration-500">
                    <div className="flex flex-col gap-3">
                        <div className="flex justify-between items-end">
                            <span className="text-xs font-black text-indigo-500 uppercase tracking-widest">Analyzing Mindset...</span>
                            <span className="text-2xl font-black text-slate-300">{currentQuestion + 1} <span className="text-sm opacity-50">/ {questions.length}</span></span>
                        </div>
                        <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden p-1 shadow-inner">
                            <div
                                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500 ease-out shadow-lg"
                                style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                            ></div>
                        </div>
                    </div>

                    <div className="bg-white border-4 border-slate-50 rounded-[3rem] p-8 md:p-12 space-y-10 shadow-2xl">
                        <h2 className="text-2xl md:text-4xl font-black leading-tight text-slate-800">
                            {questions[currentQuestion].q}
                        </h2>

                        <div className="grid grid-cols-1 gap-4">
                            {questions[currentQuestion].options.map((option, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleAnswer(option.score)}
                                    className="p-6 md:p-8 text-left rounded-2xl border-2 border-slate-100 hover:border-indigo-500 hover:bg-indigo-50 transition-all group flex items-center justify-between"
                                >
                                    <span className="text-lg md:text-xl font-bold text-slate-600 group-hover:text-indigo-700 transition-colors">{option.text}</span>
                                    <Check className="w-6 h-6 text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {step === 2 && currentResult && (
                <div className="animate-in zoom-in-90 duration-700">
                    <ShareableResult
                        title="나의 정신 연령 테스트 결과"
                        onRestart={() => { setStep(0); setCurrentQuestion(0); setTotalScore(0); }}
                    >
                        <div className="relative space-y-12 text-center">
                            <div className="space-y-4">
                                <span className="px-6 py-2 bg-slate-100 text-slate-500 rounded-full text-xs font-black tracking-widest uppercase">TEST RESULT</span>
                                <div className="text-8xl md:text-9xl font-black bg-gradient-to-br from-indigo-600 to-purple-600 bg-clip-text text-transparent tracking-tighter leading-none py-4">
                                    {currentResult.age}
                                </div>
                                <h2 className="text-3xl md:text-5xl font-black text-slate-800 leading-tight">
                                    "{currentResult.name}"
                                </h2>
                            </div>

                            <div className={`p-8 md:p-12 rounded-[3.5rem] bg-gradient-to-br ${currentResult.color} text-white shadow-2xl transform -rotate-1`}>
                                <div className="text-6xl mb-6">{currentResult.emoji}</div>
                                <div className="text-xl md:text-2xl font-black mb-4 flex items-center justify-center gap-3">
                                    <Sparkles size={28} /> {currentResult.title}
                                </div>
                                <p className="text-lg md:text-xl opacity-90 leading-relaxed font-bold break-keep">
                                    {currentResult.desc}
                                </p>
                            </div>

                            <div className="pt-4 flex flex-col items-center">
                                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Mind Aging Lab | Verified Report</div>
                            </div>
                        </div>
                    </ShareableResult>
                </div>
            )}

            <ToolGuide
                title="정신 연령 테스트 가이드"
                intro="정신 연령 테스트(Mental Age Test)는 개인의 성격적 특성, 사회적 상호작용 방식, 유행에 대한 수용도 등을 분석하여 심리적인 성숙도를 측정하는 도구입니다."
                steps={["'테스트 시작' 버튼을 클릭합니다.", "주어지는 10가지 일상적인 질문에 가장 솔직하게 답합니다.", "가장 먼저 떠오르는 답을 정하는 것이 정확도가 높습니다.", "분석된 정신 연령과 맞춤 코멘트를 확인합니다."]}
                tips={[
                    "실제 나이보다 높게 나왔다고 해서 걱정하지 마세요. 그만큼 세상을 넓고 깊게 보고 있다는 뜻입니다.",
                    "결과가 너무 어리게 나왔다면 당신은 여전히 세상에 대한 호기심과 에너지가 넘치는 분입니다.",
                    "친구들과 결과를 비교해보며 누구의 마인드가 가장 '힙'한지 확인해보는 것도 큰 즐거움입니다."
                ]}
                faqs={mentalFaqs}
            />
        </div>
    );
};

export default MentalAge;
