import React, { useState, useEffect, useRef } from 'react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { Disc, Plus, Trash2, RotateCw, Trophy } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Roulette = () => {
    const { lang, t } = useLanguage();
    const isEn = lang === 'en';
    const [items, setItems] = useState(isEn ? ['Pizza', 'Burger', 'Tacos', 'Sushi'] : ['짜장면', '짬뽕', '볶음밥', '탕수육']);
    const [newItem, setNewItem] = useState('');
    const [isSpinning, setIsSpinning] = useState(false);
    const [winner, setWinner] = useState(null);
    const [rotation, setRotation] = useState(0);

    const canvasRef = useRef(null);

    const colors = [
        '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4',
        '#FFEEAD', '#D4A5A5', '#9B59B6', '#3498DB'
    ];

    useEffect(() => {
        drawWheel();
    }, [items, rotation]);

    const drawWheel = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = canvas.width / 2 - 10;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const total = items.length;
        const arc = (2 * Math.PI) / total;

        // Draw segments
        items.forEach((item, i) => {
            const angle = i * arc + rotation;

            ctx.beginPath();
            ctx.fillStyle = colors[i % colors.length];
            ctx.moveTo(centerX, centerY);
            ctx.arc(centerX, centerY, radius, angle, angle + arc);
            ctx.lineTo(centerX, centerY);
            ctx.fill();
            ctx.stroke();

            // Draw text
            ctx.save();
            ctx.translate(centerX, centerY);
            ctx.rotate(angle + arc / 2);
            ctx.textAlign = 'right';
            ctx.fillStyle = '#fff';
            ctx.font = 'bold 16px Arial';
            ctx.fillText(item, radius - 20, 6);
            ctx.restore();
        });

        // Draw center circle
        ctx.beginPath();
        ctx.arc(centerX, centerY, 20, 0, 2 * Math.PI);
        ctx.fillStyle = '#fff';
        ctx.fill();
        ctx.stroke();

        // Draw pointer
        ctx.beginPath();
        ctx.moveTo(centerX + radius - 10, centerY); 
        ctx.lineTo(centerX + radius + 10, centerY - 10);
        ctx.lineTo(centerX + radius + 10, centerY + 10);
        ctx.fillStyle = '#333';
        ctx.fill();
    };

    const spin = () => {
        if (isSpinning || items.length < 2) return;

        setIsSpinning(true);
        setWinner(null);

        const spinDuration = 3000;
        const startRotation = rotation;
        const totalRotation = startRotation + (Math.random() * 10 + 10) * Math.PI;
        const startTime = Date.now();

        const animate = () => {
            const now = Date.now();
            const elapsed = now - startTime;

            if (elapsed < spinDuration) {
                const t = elapsed / spinDuration;
                const easeOut = 1 - Math.pow(1 - t, 3);
                const currentRotation = startRotation + (totalRotation - startRotation) * easeOut;

                setRotation(currentRotation);
                requestAnimationFrame(animate);
            } else {
                setRotation(totalRotation);
                setIsSpinning(false);
                calculateWinner(totalRotation);
            }
        };

        requestAnimationFrame(animate);
    };

    const calculateWinner = (finalRotation) => {
        const total = items.length;
        const arc = (2 * Math.PI) / total;
        const normalizedRotation = finalRotation % (2 * Math.PI);

        let pointerAngle = (2 * Math.PI - normalizedRotation) % (2 * Math.PI);
        if (pointerAngle < 0) pointerAngle += 2 * Math.PI;

        const index = Math.floor(pointerAngle / arc);
        setWinner(items[index]);
    };

    const addItem = (e) => {
        e.preventDefault();
        if (newItem.trim() && items.length < 12) {
            setItems([...items, newItem.trim()]);
            setNewItem('');
        }
    };

    const removeItem = (index) => {
        if (items.length > 2) {
            const newItems = items.filter((_, i) => i !== index);
            setItems(newItems);
        }
    };

    const toolFaqs = isEn ? [
        { q: "How many choices can I add to the wheel?", a: "You can add between 2 and 12 items to be spun." },
        { q: "Can I save my wheel configuration?", a: "Currently, the setup resets if you reload the page. We are working on a persistence feature for future updates." },
        { q: "Is the wheel outcome truly random?", a: "Yes, the winning segment is calculated based on a random spin force and arc math, ensuring an unbiased result." }
    ] : [
        { q: "항목은 최대 몇 개까지 추가할 수 있나요?", a: "최소 2개에서 최대 12개까지 항목을 설정하여 돌릴 수 있습니다." },
        { q: "한글 입력 시 글자 제한이 있나요?", a: "각 항목당 최대 10자까지 입력 가능하며, 긴 단어보다는 짧고 명확한 단어를 추천합니다." },
        { q: "추첨 결과가 정말 무작위인가요?", a: "네, 각도 연산과 렌덤 함수를 결합하여 매번 돌릴 때마다 공정한 확률로 당첨자가 결정됩니다." }
    ];

    return (
        <div className="max-w-4xl mx-auto space-y-8 select-none px-4 pb-20 mt-8">
            <SEO
                title={t('tools.roulette.title')}
                description={t('tools.roulette.description')}
                keywords={isEn ? "spin the wheel, wheel spinner, random picker, online roulette, decision maker" : "돌림판, 룰렛, roulette, 랜덤, 추첨, 복불복"}
                faqs={toolFaqs}
            />

            <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center p-4 bg-purple-100 dark:bg-purple-900/30 rounded-3xl mb-2">
                    <Disc className="w-10 h-10 text-purple-600 dark:text-purple-400" />
                </div>
                <h1 className="text-4xl font-black text-gray-900 dark:text-white flex items-center justify-center gap-4 italic tracking-tighter uppercase">
                    {isEn ? 'Spin the Wheel' : '돌림판 돌리기'}
                </h1>
                <p className="text-muted-foreground font-medium">
                    {isEn ? 'Stuck with a choice? Let the wheel decide!' : '무엇을 고를지 고민될 때 돌려보세요!'}
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-10 items-start">
                {/* Wheel Section */}
                <div className="bg-card border-2 border-border/50 p-10 rounded-[2.5rem] shadow-2xl flex flex-col items-center space-y-8 transition-all hover:border-purple-500/30">
                    <div className="relative group">
                        <div className="absolute -inset-4 bg-purple-500/5 rounded-full blur-2xl group-hover:bg-purple-500/10 transition-all" />
                        <canvas
                            ref={canvasRef}
                            width={320}
                            height={320}
                            className="max-w-full relative drop-shadow-2xl"
                        />
                    </div>

                    {winner && !isSpinning && (
                        <div className="text-center animate-in zoom-in duration-300">
                            <div className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">{isEn ? 'WINNER!' : '당첨!'}</div>
                            <div className="text-4xl font-black text-purple-600 flex items-center justify-center gap-3 drop-shadow-sm italic">
                                <Trophy className="w-8 h-8 text-yellow-500" />
                                {winner}
                            </div>
                        </div>
                    )}

                    <button
                        onClick={spin}
                        disabled={isSpinning || items.length < 2}
                        className={`w-full py-5 rounded-2xl font-black text-xl transition-all flex items-center justify-center gap-3 shadow-xl ${isSpinning 
                            ? 'bg-gray-400 opacity-80 cursor-not-allowed' 
                            : 'bg-primary text-primary-foreground hover:scale-105 active:scale-95 shadow-primary/30'}`}
                    >
                        <RotateCw className={`w-6 h-6 ${isSpinning ? 'animate-spin' : ''}`} />
                        {isSpinning ? (isEn ? 'SPINNING...' : '돌아가는 중...') : (isEn ? 'SPIN NOW' : '돌리기!')}
                    </button>
                </div>

                {/* Controls Section */}
                <div className="bg-card border-2 border-border/50 p-10 rounded-[2.5rem] shadow-2xl space-y-8 h-full">
                    <div>
                        <h3 className="text-sm font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-6">
                             {isEn ? 'Configure Options' : '항목 설정'} ({items.length}/12)
                        </h3>

                        <form onSubmit={addItem} className="flex gap-2 mb-8">
                            <input
                                type="text"
                                value={newItem}
                                onChange={(e) => setNewItem(e.target.value)}
                                placeholder={isEn ? "Add item (e.g. Tacos)" : "항목 추가 (예: 치킨)"}
                                className="w-full bg-muted/50 border-2 border-border/50 rounded-xl px-5 py-3 font-bold focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
                                maxLength={10}
                                disabled={items.length >= 12}
                            />
                            <button
                                type="submit"
                                className="bg-secondary hover:bg-secondary/80 p-3 rounded-xl transition-all active:scale-90"
                                disabled={!newItem.trim() || items.length >= 12}
                            >
                                <Plus className="w-6 h-6" />
                            </button>
                        </form>

                        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700">
                            {items.map((item, idx) => (
                                <div key={idx} className="flex items-center justify-between bg-muted/30 p-4 rounded-xl border border-transparent hover:border-border transition-all">
                                    <div className="flex items-center gap-4">
                                        <div
                                            className="w-4 h-4 rounded-full shadow-inner"
                                            style={{ backgroundColor: colors[idx % colors.length] }}
                                        />
                                        <span className="font-black text-gray-700 dark:text-gray-200">{item}</span>
                                    </div>
                                    {items.length > 2 && (
                                        <button
                                            onClick={() => removeItem(idx)}
                                            className="text-gray-400 hover:text-rose-500 hover:rotate-90 transition-all p-1"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>

                        {items.length < 2 && (
                            <div className="text-rose-500 text-xs font-black text-center mt-6 animate-pulse uppercase tracking-widest">
                                {isEn ? 'Minimum 2 items required' : '최소 2개의 항목이 필요합니다.'}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="mt-12">
                <ToolGuide
                    title={isEn ? "How to Use the Wheel Spinner" : "돌림판 돌리기 이용 안내"}
                    intro={isEn ? "The Wheel Spinner (Roulette) is the ultimate decision-making tool. Whether it is choosing a lunch menu, picking a lucky winner, or assigning chores, our virtual wheel provides a fair and fun way to randomize outcomes." : "어떤 결정을 내려야 할지 막막할 때 가장 재미있게 고를 수 있는 방법, 바로 돌림판 룰렛입니다. 점심 메뉴 고르기부터 벌칙 당첨자 추첨까지, 다양한 상황에서 공정하고 재미있게 활용해 보세요."}
                    steps={isEn ? [
                        "Enter the choices you want to decide between in the 'Add item' field.",
                        "Add up to 12 items. You can remove items using the trash icon.",
                        "Once ready, click the 'SPIN NOW' button to start the wheel.",
                        "Wait for the wheel to slow down and reveal the winner segment at the pointer.",
                        "Celebrate the decision and spin again if needed!"
                    ] : [
                        "오른쪽 설정 칸에 고민 중인 선택지들을 하나하나 입력합니다.",
                        "최대 12개까지 입력 가능하며, 잘못 입력한 경우 휴지통 아이콘으로 삭제할 수 있습니다.",
                        "항목 입력이 끝나면 왼쪽의 '돌리기!' 버튼을 눌러 돌림판을 회전시킵니다.",
                        "회전이 멈추면 화살표가 가리키는 최종 당첨 항목이 화면에 나타납니다.",
                        "결과가 마음에 들지 않는다면 항목을 수정하고 다시 돌려보세요!"
                    ]}
                    tips={isEn ? [
                        "Visual Fun: The wheel automatically assigns vibrant colors to each segment.",
                        "Quick Decisions: Use it for party games, office chores, or just choosing a restaurant.",
                        "Mobile Friendly: Works great on smartphones; just tap the spin button at your dinner table.",
                        "Fairness: Every segment has an equal chance based on its arc percentage."
                    ] : [
                        "결정 장애가 있는 친구들과 모였을 때 스마트폰으로 함께 즐기기 좋습니다.",
                        "글자 수가 너무 길면 돌림판에서 잘릴 수 있으니 가급적 핵심 단어만 입력하세요.",
                        "색상이 자동으로 배정되어 시각적으로 구분하기 매우 편리합니다.",
                        "새로운 결정을 원할 때마다 무제한으로 돌림판 내용을 바꿔가며 사용할 수 있습니다."
                    ]}
                    faqs={toolFaqs}
                />
            </div>
        </div>
    );
};

export default Roulette;
