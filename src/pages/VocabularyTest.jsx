import React, { useState } from 'react';
import { Share2, RefreshCw, BookOpen, Scroll, CheckCircle2, XCircle } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { useLanguage } from '../context/LanguageContext';

const VocabularyTest = () => {
    const { lang, t } = useLanguage();
    const isEn = lang === 'en';
    const [gameState, setGameState] = useState('start'); // start, playing, result
    const [score, setScore] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);

    const questions = [
        {
            question: "'심심한 사과'의 '심심하다'의 뜻은?",
            options: ["지루하고 재미없다", "마음의 표현 정도가 깊고 간절하다", "음식 맛이 싱겁다", "하는 일이 없어 무료하다"],
            answer: "마음의 표현 정도가 깊고 간절하다",
            desc: "'심심(甚深)'은 매우 깊다는 뜻입니다."
        },
        {
            question: "'사흘'은 며칠을 의미할까요?",
            options: ["3일", "4일", "5일", "30일"],
            answer: "3일",
            desc: "하루, 이틀, 사흘(3일), 나흘(4일)... 순서입니다. 4일은 나흘입니다."
        },
        {
            question: "'금일'의 뜻은?",
            options: ["금요일", "오늘", "내일", "어제"],
            answer: "오늘",
            desc: "'금일(今日)'은 '오늘'을 뜻하는 한자어입니다."
        },
        {
            question: "'고지식하다'의 뜻은?",
            options: ["지식이 높고 풍부하다", "성품이 곧고 융통성이 없다", "높은 자리에 있다", "옛날 지식만 안다"],
            answer: "성품이 곧고 융통성이 없다",
            desc: "성질이 외골수라 융통성이 없다는 뜻입니다. 지식이 많다는 뜻이 아닙니다."
        },
        {
            question: "'무료하다'의 뜻은?",
            options: ["돈을 내지 않아도 된다", "흥미가 없어 심심하고 지루하다", "없어서 부족하다", "매우 바쁘다"],
            answer: "흥미가 없어 심심하고 지루하다",
            desc: "지루함을 뜻할 때는 '무료(無聊)'를 씁니다. 공짜는 '무료(無料)'입니다."
        },
        {
            question: "'결재'와 '결제'의 차이로 올바른 것은?",
            options: ["부장님께 서류를 결제 받다", "신용카드로 결재하다", "부장님께 서류를 결재 받다", "둘 다 같은 말이다"],
            answer: "부장님께 서류를 결재 받다",
            desc: "상사에게 안건을 허가받는 것은 '결재(決裁)', 대금을 치르는 것은 '결제(決濟)'입니다."
        },
        {
            question: "'과반수'의 올바른 쓰임은?",
            options: ["과반수 이상 찬성", "과반수 이하 찬성", "과반수 찬성", "과반수 넘게 찬성"],
            answer: "과반수 찬성",
            desc: "'과반수(過半數)'는 이미 '반을 넘은 수'라는 뜻이므로 '이상', '넘게'와 같이 쓰는 것은 겹말(중복)입니다."
        },
        {
            question: "'일취월장'의 뜻은?",
            options: ["해가 지고 달이 뜸", "날마다 달마다 발전함", "일찍 취직해서 돈을 범", "한 달 동안 장사를 함"],
            answer: "날마다 달마다 발전함",
            desc: "날로 달로 발전하거나 성장한다는 뜻입니다."
        },
        {
            question: "'우천 시'는 언제일까요?",
            options: ["소(牛)가 밭을 갈 때", "비가 올 때", "날씨가 더울 때", "오른쪽으로 갈 때"],
            answer: "비가 올 때",
            desc: "'우천(雨天)'은 비가 오는 날씨를 뜻합니다."
        },
        {
            question: "'미운털이 박히다'의 뜻은?",
            options: ["몸에 털이 많이 나다", "누구에게 미움을 받게 되다", "머리카락이 빠지다", "박혀있는 털을 뽑다"],
            answer: "누구에게 미움을 받게 되다",
            desc: "남에게 미움을 받을 만한 짓을 하여 미움의 대상이 되는 것을 비유적으로 이르는 말입니다."
        }
    ];

    const startGame = () => {
        setGameState('playing');
        setScore(0);
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
        setIsCorrect(null);
    };

    const handleAnswer = (choice) => {
        if (selectedAnswer) return;

        setSelectedAnswer(choice);
        const correct = choice === questions[currentQuestionIndex].answer;
        setIsCorrect(correct);

        if (correct) {
            setScore(prev => prev + 1);
        }

        setTimeout(() => {
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(prev => prev + 1);
                setSelectedAnswer(null);
                setIsCorrect(null);
            } else {
                setGameState('result');
            }
        }, 2000);
    };

    const getRank = (finalScore) => {
        if (isEn) {
            if (finalScore === 10) return { title: "Vocab God", desc: "You are a walking dictionary! Perfect literacy.", color: "text-purple-600" };
            if (finalScore >= 8) return { title: "Language Wizard", desc: "You have a command of high-level vocabulary.", color: "text-blue-600" };
            if (finalScore >= 5) return { title: "Daily Speaker", desc: "Good enough for daily communication.", color: "text-green-600" };
            return { title: "Reading Needed", desc: "How about picking up a book sometime? 😊", color: "text-orange-500" };
        } else {
            if (finalScore === 10) return { title: "어휘력 대왕", desc: "걸어다니는 국어사전이시군요!", color: "text-purple-600" };
            if (finalScore >= 8) return { title: "언어의 마술사", desc: "상당히 높은 어휘력을 가지고 계십니다.", color: "text-blue-600" };
            if (finalScore >= 5) return { title: "평범한 시민", desc: "일상 소통에 문제없는 수준입니다.", color: "text-green-600" };
            return { title: "문해력 요정", desc: "책을 조금 더 가까이 해보는 건 어떨까요? 😊", color: "text-orange-500" };
        }
    };

    const shareResult = () => {
        const rank = getRank(score);
        const text = isEn ? `My Korean Literacy score: ${score} (${rank.title})` : `나의 어휘력 점수: ${score}점 (${rank.title}) - 유틸리티 허브`;
        if (navigator.share) {
            navigator.share({
                title: isEn ? 'Korean Literacy Test' : '문해력 테스트',
                text: text,
                url: window.location.href,
            });
        } else {
            alert(isEn ? 'Link copied!' : '링크가 복사되었습니다!');
            navigator.clipboard.writeText(window.location.href);
        }
    };

    const toolFaqs = isEn ? [
        { q: "Why is literacy testing important?", a: "Even native speakers often get confused by formal vocabulary or idioms. Testing helps reduce communication errors." },
        { q: "Are modern internet terms included?", a: "No, this test focuses on standard Korean words and idioms that are essential for professional and academic life." },
        { q: "Can non-native speakers take this?", a: "It's highly recommended for advanced learners who want to understand the nuances of the Korean language." }
    ] : [
        { q: "문해력(어휘력) 테스트는 왜 필요한가요?", a: "실생활에 자주 쓰이는 사자성어와 한자어의 정확한 쓰임새는 커뮤니케이션 오류를 막아주는 필수 교훈이기 때문입니다." },
        { q: "요즘 논란이 되었던 단어들도 나오나요?", a: "'심심한 사과', '사흘' 등 SNS에서 화제가 되었던 필수 문해력 단어들이 포함되어 있습니다." }
    ];

    const toolSteps = isEn ? [
        "Read the question carefully and identify the target word.",
        "Choose the most appropriate meaning from the four options provided.",
        "Review the detailed explanation after each question to learn more.",
        "Check your final results and see your rank in the literacy ladder."
    ] : [
        "문제의 문맥을 파악하고 비어 있는 핵심 단어의 의미를 생각합니다.",
        "제시된 보기 4개 중에서 가장 적절한 뜻 혹은 쓰임을 선택합니다.",
        "각 문제 직후에 나오는 정답 해설을 통해 어휘 지식뿐만 아니라 배경 상식까지 넓힙니다.",
        "모든 테스트가 끝나면 본인의 등급과 상위 점수 여부를 확인합니다."
    ];

    const toolTips = isEn ? [
        "Try to infer the meaning from the Hanja (Chinese characters) roots if you know them.",
        "Many of these terms appear in news articles and formal documents, so they are very practical.",
        "Don't search online while testing; see what you truly know first!"
    ] : [
        "한자어의 경우 한자의 뜻을 유추해보면 정답 확률이 높아집니다.",
        "만점을 목표로 하기보다 내가 몰랐던 단어를 하나 더 알아간다는 학습의 목적으로 접근하세요.",
        "공부가 끝난 후에는 배운 단어를 직접 사용하여 문장을 만들어보는 것이 가장 효과적입니다."
    ];

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <SEO
                title={t('tools.vocabulary-test.title')}
                description={t('tools.vocabulary-test.description')}
                keywords={isEn ? "vocabulary quiz, korean literacy, word power, language test, idioms quiz" : "어휘력테스트, 문해력퀴즈, 국어실력, 단어맞추기, 상식퀴즈, 어휘력검사, 문해력테스트"}
                faqs={toolFaqs}
                steps={toolSteps}
            />

            <div className="text-center mb-10">
                <div className="inline-block p-4 bg-emerald-500/10 rounded-full mb-6">
                    <BookOpen size={48} className="text-emerald-600" />
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4 uppercase tracking-tight italic">
                    {isEn ? 'K-LITERACY CHALLENGE' : '문해력 테스트'}
                </h1>
                <p className="text-xl text-muted-foreground font-medium italic">
                    {isEn ? 'Do you truly understand the words you use?' : '심심한 사과? 사흘? 당신의 어휘력은 안녕한가요?'}
                </p>
            </div>

            <div className="max-w-xl mx-auto bg-card dark:bg-slate-800 rounded-[2.5rem] shadow-2xl overflow-hidden p-10 border-4 border-border/50 transition-all min-h-[450px] flex flex-col justify-center">

                {gameState === 'start' && (
                    <div className="text-center animate-in fade-in zoom-in-95 duration-500 w-full space-y-8">
                        <div className="relative inline-block">
                            <Scroll size={100} className="text-emerald-500 opacity-20" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <BookOpen size={60} className="text-emerald-600 drop-shadow-lg" />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-3xl font-black text-foreground uppercase tracking-tight">{isEn ? 'Vocab Diagnosis' : '어휘력 진단 고사'}</h2>
                            <p className="text-muted-foreground font-bold leading-relaxed italic border-x-4 border-emerald-500/20 px-4">
                                {isEn ? "Is 'shim-shim-han' boring? Is 'sa-heul' 4 days? Test your true depth in the Korean language across 10 vital questions." : "최근 이슈가 되는 문해력 논란! 제대로 알고 쓰고 있을까요? 총 10문제로 확인해보세요."}
                            </p>
                        </div>
                        <button
                            onClick={startGame}
                            className="w-full py-6 bg-gradient-to-r from-emerald-600 to-teal-500 text-white text-2xl font-black rounded-3xl shadow-2xl shadow-emerald-500/20 hover:scale-105 transition-all active:scale-95 uppercase tracking-widest italic"
                        >
                            {isEn ? 'BEGIN EXAM' : '테스트 시작'}
                        </button>
                    </div>
                )}

                {gameState === 'playing' && (
                    <div className="animate-in fade-in duration-300 w-full space-y-8">
                        <div className="flex justify-between items-center bg-muted/30 p-4 rounded-2xl border border-border/10 shadow-inner">
                            <span className="text-xs font-black uppercase tracking-widest text-emerald-600 bg-emerald-500/10 px-3 py-1.5 rounded-full">
                                {isEn ? 'Q' : '문제'} {currentQuestionIndex + 1} / {questions.length}
                            </span>
                            <span className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground">
                                {isEn ? 'PTS' : '점수'}: {score}
                            </span>
                        </div>

                        <div className="mb-2 text-center bg-emerald-500/5 dark:bg-emerald-500/10 p-10 rounded-[2.5rem] border-4 border-emerald-500/20 shadow-inner group">
                            <h2 className="text-2xl md:text-3xl font-black text-foreground leading-tight tracking-tight break-keep italic group-hover:text-emerald-600 transition-colors">
                                {questions[currentQuestionIndex].question}
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 gap-3">
                            {questions[currentQuestionIndex].options.map((option, index) => {
                                const isSelected = selectedAnswer === option;
                                const isAnswer = option === questions[currentQuestionIndex].answer;

                                let btnStyle = "bg-muted/40 hover:bg-muted/60 text-foreground border-4 border-transparent shadow-sm";

                                if (selectedAnswer) {
                                    if (isSelected) {
                                        btnStyle = isCorrect
                                            ? "bg-green-500 border-green-600 text-white shadow-xl shadow-green-500/20 scale-105"
                                            : "bg-rose-500 border-rose-600 text-white shadow-xl shadow-rose-500/20";
                                    } else if (isAnswer) {
                                        btnStyle = "bg-green-500/20 border-green-500/50 text-green-600";
                                    } else {
                                        btnStyle = "opacity-20 grayscale pointer-events-none";
                                    }
                                }

                                return (
                                    <button
                                        key={index}
                                        onClick={() => handleAnswer(option)}
                                        disabled={selectedAnswer !== null}
                                        className={`w-full py-5 rounded-3xl text-xl font-black transition-all transform active:scale-95 italic ${btnStyle}`}
                                    >
                                        <div className="flex items-center justify-between px-6">
                                            <span>{option}</span>
                                            {selectedAnswer && isAnswer && <CheckCircle2 size={20} />}
                                            {selectedAnswer && isSelected && !isCorrect && <XCircle size={20} />}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        {selectedAnswer && (
                            <div className="mt-6 p-8 bg-muted/30 rounded-[2rem] border-2 border-dashed border-emerald-500/30 animate-in slide-in-from-bottom-4 duration-500">
                                <p className="font-black text-xs uppercase tracking-widest text-emerald-600 mb-2 flex items-center gap-2">
                                    <Star size={14} fill="currentColor" /> {isEn ? 'INSIGHT' : '해설'}
                                </p>
                                <p className="text-muted-foreground font-bold italic leading-relaxed">
                                    {questions[currentQuestionIndex].desc}
                                </p>
                            </div>
                        )}
                    </div>
                )}

                {gameState === 'result' && (
                    <div className="text-center animate-in zoom-in-95 duration-500 w-full space-y-10">
                        <div className="relative inline-block">
                            <Scroll size={120} className="text-emerald-500 opacity-20" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Trophy size={80} className="text-yellow-500 drop-shadow-[0_0_20px_rgba(234,179,8,0.3)] animate-bounce" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h2 className="text-5xl font-black text-foreground italic uppercase tracking-tighter">{isEn ? 'EVALUATION OVER!' : '테스트 종료!'}</h2>
                            <p className="text-xs font-black uppercase tracking-[0.3em] text-muted-foreground italic">{isEn ? 'Final Vocabulary Score' : '최종 어휘 수준'}</p>
                        </div>

                        <div className="text-9xl font-black text-emerald-600 drop-shadow-lg flex items-baseline justify-center gap-4 italic tracking-tighter">
                            {score} <span className="text-4xl text-muted font-bold tracking-normal italic">/ {questions.length}</span>
                        </div>

                        <div className="bg-card p-10 rounded-[3rem] border-4 border-border shadow-xl transform rotate-1">
                            <h3 className={`text-4xl font-black mb-3 italic tracking-tighter uppercase ${getRank(score).color}`}>
                                {getRank(score).title}
                            </h3>
                            <p className="font-bold text-muted-foreground leading-relaxed italic">
                                "{getRank(score).desc}"
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-6 pt-6">
                            <button
                                onClick={startGame}
                                className="flex-1 flex items-center justify-center px-10 py-6 bg-slate-900 text-white rounded-[2rem] font-black text-xl hover:scale-105 transition-all shadow-2xl active:scale-95"
                            >
                                <RefreshCw size={28} className="mr-4" />
                                {isEn ? 'RE-STUDY' : '다시하기'}
                            </button>
                            <button
                                onClick={shareResult}
                                className="flex-1 flex items-center justify-center px-10 py-6 bg-emerald-600 text-white rounded-[2rem] font-black text-xl hover:scale-105 transition-all shadow-2xl shadow-emerald-500/20 active:scale-95"
                            >
                                <Share2 size={28} className="mr-4" />
                                {isEn ? 'PUBLISH' : '결과 공유'}
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <div className="mt-24">
                <ToolGuide
                    title={isEn ? "The Literacy Master Guide" : "문해력 테스트 완벽 가이드"}
                    intro={isEn ? "Language is the most powerful tool for communication. This test focuses on vital Korean vocabulary and idioms that establish clarity and authority in your speech and writing. Reflect on your results and keep expanding your lexicon." : "심심한 사과? 금일? 사흘? 언어의 정확한 뜻을 아는 것은 타인과의 오해 없는 소통을 위한 기초 공사입니다. 본 테스트는 실생활과 미디어에서 자주 혼용되거나 잘못 쓰이는 어휘들을 선별하여, 여러분의 언어 수준을 객관적으로 점검할 수 있도록 설계되었습니다."}
                    steps={toolSteps}
                    tips={toolTips}
                    faqs={toolFaqs}
                />
            </div>
        </div>
    );
};

export default VocabularyTest;
