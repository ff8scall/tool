import React, { useState, useEffect, useRef } from 'react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { Disc, Plus, Trash2, RotateCw, Trophy } from 'lucide-react';

const Roulette = () => {
    const [items, setItems] = useState(['짜장면', '짬뽕', '볶음밥', '탕수육']);
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
        // Draw pointer (pointing left from the right edge)
        ctx.beginPath();
        ctx.moveTo(centerX + radius - 10, centerY); // Tip pointing left (inwards)
        ctx.lineTo(centerX + radius + 10, centerY - 10); // Top right
        ctx.lineTo(centerX + radius + 10, centerY + 10); // Bottom right
        ctx.fillStyle = '#333';
        ctx.fill();
    };

    const spin = () => {
        if (isSpinning || items.length < 2) return;

        setIsSpinning(true);
        setWinner(null);

        const spinDuration = 3000; // 3 seconds
        const startRotation = rotation;
        const totalRotation = startRotation + (Math.random() * 10 + 10) * Math.PI; // Random spins
        const startTime = Date.now();

        const animate = () => {
            const now = Date.now();
            const elapsed = now - startTime;

            if (elapsed < spinDuration) {
                // Ease out cubic
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

        // Normalize rotation to 0-2PI
        const normalizedRotation = finalRotation % (2 * Math.PI);

        // The pointer is at 0 degrees (right side), but we draw starting from 0.
        // We need to find which segment intersects with angle 0.
        // Actually, simpler logic: 
        // The wheel rotates clockwise. The pointer is fixed at 0 (3 o'clock).
        // We need to find the index where:
        // (index * arc + rotation) % 2PI contains 0 (or 2PI)

        // Let's use a simpler visual check logic or just math
        // Angle of pointer relative to wheel start = -rotation
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

    return (
        <div className="max-w-4xl mx-auto space-y-6 select-none">
            <SEO
                title="돌림판 돌리기 - 랜덤 추첨 게임"
                description="점심 메뉴, 벌칙 정하기 등 결정이 필요할 때 돌림판을 돌려보세요! 쉽고 간편한 온라인 룰렛 게임입니다."
                keywords={['돌림판', '룰렛', 'roulette', '랜덤', '추첨', '복불복']}
            />

            <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-3">
                    <Disc className="w-8 h-8 text-purple-500" />
                    돌림판 돌리기
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    무엇을 고를지 고민될 때 돌려보세요!
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 items-start">
                {/* Wheel Section */}
                <div className="card p-6 flex flex-col items-center space-y-6">
                    <div className="relative">
                        <canvas
                            ref={canvasRef}
                            width={320}
                            height={320}
                            className="max-w-full"
                        />
                        {/* Pointer Triangle (CSS fallback if canvas drawing fails, but canvas has it) */}
                        <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 w-0 h-0 border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent border-r-[20px] border-r-gray-800 rotate-180 hidden" />
                    </div>

                    {winner && !isSpinning && (
                        <div className="text-center animate-bounce">
                            <div className="text-gray-500 text-sm mb-1">당첨!</div>
                            <div className="text-3xl font-bold text-purple-600 flex items-center justify-center gap-2">
                                <Trophy className="w-6 h-6" />
                                {winner}
                            </div>
                        </div>
                    )}

                    <button
                        onClick={spin}
                        disabled={isSpinning || items.length < 2}
                        className="btn btn-primary btn-lg w-full flex items-center justify-center gap-2"
                    >
                        <RotateCw className={`w-6 h-6 ${isSpinning ? 'animate-spin' : ''}`} />
                        {isSpinning ? '돌아가는 중...' : '돌리기!'}
                    </button>
                </div>

                {/* Controls Section */}
                <div className="card p-6 space-y-6">
                    <h3 className="font-bold text-lg">항목 설정 ({items.length}/12)</h3>

                    <form onSubmit={addItem} className="flex gap-2">
                        <input
                            type="text"
                            value={newItem}
                            onChange={(e) => setNewItem(e.target.value)}
                            placeholder="항목 추가 (예: 치킨)"
                            className="input flex-1"
                            maxLength={10}
                            disabled={items.length >= 12}
                        />
                        <button
                            type="submit"
                            className="btn btn-secondary"
                            disabled={!newItem.trim() || items.length >= 12}
                        >
                            <Plus className="w-5 h-5" />
                        </button>
                    </form>

                    <div className="space-y-2 max-h-[300px] overflow-y-auto">
                        {items.map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-4 h-4 rounded-full"
                                        style={{ backgroundColor: colors[idx % colors.length] }}
                                    />
                                    <span className="font-medium">{item}</span>
                                </div>
                                {items.length > 2 && (
                                    <button
                                        onClick={() => removeItem(idx)}
                                        className="text-gray-400 hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>

                    {items.length < 2 && (
                        <div className="text-red-500 text-sm text-center">
                            최소 2개의 항목이 필요합니다.
                        </div>
                    )}
                </div>
            </div>
        \n            <ToolGuide
                title="돌림판 돌리기"
                intro="랜덤 추첨을 위한 룰렛 게임"
                steps={[
                    "원하시는 옵션이나 값을 화면에 안내된 순서대로 정확하게 기입해 주세요.",
                    "제시된 항목과 보기를 꼼꼼하게 살펴보고 본인에게 맞는 것을 선택합니다.",
                    "모든 입력을 완료한 후 결과 화면에서 계산된 수치나 분석된 내용을 확인합니다.",
                    "결과가 마음에 든다면 캡처하거나 공유하기 버튼을 눌러 지인들에게 공유해보세요!"
                ]}
                tips={[
                    "결과값이 예상과 다르다면 입력한 숫자나 단위를 한 번 더 확인해보는 것이 좋습니다.",
                    "제공되는 다양한 부가 옵션을 함께 활용하면 훨씬 구체적인 형태의 맞춤형 결과를 얻을 수 있습니다.",
                    "모바일과 데스크톱 환경 모두에 완벽하게 최적화되어 있으니 언제 어디서든 편리하게 이용해 보세요."
                ]}
                faqs={[
                    { "q": "이 도구들은 정말로 모두 무료인가요?", "a": "네! Tool Hive에서 제공하는 모든 도구 모음과 심리 테스트들은 가입 등의 번거로운 절차 없이 누구나 100% 무료로 무제한 사용할 수 있습니다." },
                    { "q": "제가 입력한 개인적인 정보 데이터가 서버에 남나요?", "a": "아니요, 사용자가 입력하는 이름, 숫자, 금액 등의 모든 데이터는 방문자의 기기 내 브라우저에서만 실시간으로 연산되며 어떠한 경우에도 외부 서버로 전송되거나 저장되지 않으므로 안심하셔도 됩니다." },
                    { "q": "버튼을 눌러도 반응이 없거나 에러가 생깁니다.", "a": "브라우저의 일시적인 캐시 문제일 수 있습니다. 키보드의 F5 버튼을 누르거나 새로고침을 진행한 후 다시 시도해 보시길 권장하며, 문제가 계속된다면 다른 브라우저 앱을 이용해 보세요." }
                ]}
            />
        </div>
    );
};

export default Roulette;
