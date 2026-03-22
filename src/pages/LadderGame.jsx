import React, { useState, useEffect, useRef } from 'react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { GitCommit, Play, Plus, RefreshCw, Trash2, Users } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const LadderGame = () => {
    const { lang } = useLanguage();
    const isEn = lang === 'en';
    const [players, setPlayers] = useState(['A', 'B', 'C', 'D']);
    const [results, setResults] = useState(isEn ? ['1st', '2nd', '3rd', 'Fail'] : ['1등', '2등', '3등', '꽝']);
    const [isPlaying, setIsPlaying] = useState(false);
    const [ladder, setLadder] = useState([]);
    const [currentPath, setCurrentPath] = useState([]);
    const [selectedPlayer, setSelectedPlayer] = useState(null);

    const canvasRef = useRef(null);
    const animationRef = useRef(null);

    const colors = [
        '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4',
        '#FFEEAD', '#D4A5A5', '#9B59B6', '#3498DB'
    ];

    const generateLadder = () => {
        const count = players.length;
        const steps = 10; 
        const newLadder = [];

        for (let i = 0; i < steps; i++) {
            const row = Array(count - 1).fill(false);
            for (let j = 0; j < count - 1; j++) {
                if (Math.random() > 0.5 && (j === 0 || !row[j - 1])) {
                    row[j] = true;
                }
            }
            newLadder.push(row);
        }
        setLadder(newLadder);
        setIsPlaying(false);
        setCurrentPath([]);
        setSelectedPlayer(null);
    };

    useEffect(() => {
        generateLadder();
    }, [players.length]);

    useEffect(() => {
        drawLadder();
    }, [ladder, players, results, currentPath, selectedPlayer]);

    const drawLadder = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        const count = players.length;
        const colWidth = width / count;
        const rowHeight = (height - 100) / ladder.length;
        const startY = 50;

        ctx.clearRect(0, 0, width, height);
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';

        for (let i = 0; i < count; i++) {
            const x = colWidth * i + colWidth / 2;
            ctx.strokeStyle = '#ddd';
            ctx.beginPath();
            ctx.moveTo(x, startY);
            ctx.lineTo(x, height - 50);
            ctx.stroke();
        }

        ladder.forEach((row, r) => {
            const y = startY + (r + 1) * rowHeight - rowHeight / 2;
            row.forEach((hasLine, c) => {
                if (hasLine) {
                    const x1 = colWidth * c + colWidth / 2;
                    const x2 = colWidth * (c + 1) + colWidth / 2;
                    ctx.strokeStyle = '#ddd';
                    ctx.beginPath();
                    ctx.moveTo(x1, y);
                    ctx.lineTo(x2, y);
                    ctx.stroke();
                }
            });
        });

        if (currentPath.length > 0 && selectedPlayer !== null) {
            ctx.strokeStyle = colors[selectedPlayer % colors.length];
            ctx.lineWidth = 4;
            ctx.beginPath();
            const startX = colWidth * selectedPlayer + colWidth / 2;
            ctx.moveTo(startX, startY);

            currentPath.forEach(point => {
                const x = colWidth * point.col + colWidth / 2;
                const y = startY + point.row * rowHeight + (point.type === 'vertical' ? 0 : rowHeight / 2);
                ctx.lineTo(x, y);
            });
            ctx.stroke();
        }
    };

    const startPath = (playerIndex) => {
        if (isPlaying) return;

        setSelectedPlayer(playerIndex);
        setIsPlaying(true);

        const count = players.length;
        const fullPath = [];
        let c = playerIndex;

        fullPath.push({ x: c, y: 0 });

        for (let r = 0; r < ladder.length; r++) {
            fullPath.push({ x: c, y: r + 0.5 });
            if (c > 0 && ladder[r][c - 1]) {
                c--;
                fullPath.push({ x: c, y: r + 0.5 });
            } else if (c < count - 1 && ladder[r][c]) {
                c++;
                fullPath.push({ x: c, y: r + 0.5 });
            }
            fullPath.push({ x: c, y: r + 1 });
        }

        let step = 0;
        const drawStep = () => {
            if (step < fullPath.length) {
                const canvas = canvasRef.current;
                if (!canvas) return;
                const width = canvas.width;
                const height = canvas.height;
                const colWidth = width / count;
                const rowHeight = (height - 100) / ladder.length;
                const startY = 50;

                const ctx = canvas.getContext('2d');
                ctx.strokeStyle = colors[playerIndex % colors.length];
                ctx.lineWidth = 4;
                ctx.beginPath();

                const prev = fullPath[Math.max(0, step - 1)];
                const curr = fullPath[step];

                const getX = (c) => colWidth * c + colWidth / 2;
                const getY = (r) => startY + r * rowHeight;

                if (step === 0) {
                    ctx.moveTo(getX(curr.x), 50);
                } else {
                    ctx.moveTo(getX(prev.x), getY(prev.y));
                    ctx.lineTo(getX(curr.x), getY(curr.y));
                }
                ctx.stroke();

                step++;
                animationRef.current = requestAnimationFrame(drawStep);
            } else {
                setIsPlaying(false);
            }
        };

        drawLadder();
        drawStep();
    };

    const updatePlayer = (idx, value) => {
        const newPlayers = [...players];
        newPlayers[idx] = value;
        setPlayers(newPlayers);
    };

    const updateResult = (idx, value) => {
        const newResults = [...results];
        newResults[idx] = value;
        setResults(newResults);
    };

    const addMember = () => {
        if (players.length < 8) {
            setPlayers([...players, String.fromCharCode(65 + players.length)]);
            setResults([...results, isEn ? 'Fail' : '꽝']);
        }
    };

    const removeMember = () => {
        if (players.length > 2) {
            setPlayers(players.slice(0, -1));
            setResults(results.slice(0, -1));
        }
    };

    const toolFaqs = isEn ? [
        { q: "How many players can participate?", a: "You can have between 2 and 8 players in a single game." },
        { q: "Is the ladder generated randomly each time?", a: "Yes, clicking the 'Regenerate Ladder' button will create a completely new random path configuration." },
        { q: "Can I customize the results?", a: "Absolutely! You can type anything into the result boxes at the bottom, such as prizes, penalties, or chores." }
    ] : [
        { q: "최대 인원은 몇 명인가요?", a: "최소 2명에서 최대 8명까지 참가 인원을 조정하여 게임을 즐길 수 있습니다." },
        { q: "사다리 모양을 바꿀 수 있나요?", a: "'사다리 재생성' 버튼을 누르면 매번 새로운 형태의 무작위 사다리가 생성됩니다." },
        { q: "결과 항목에 무엇을 적으면 좋나요?", a: "간식 내기, 설거지 당번, 벌칙 내용 등 상황에 맞는 다양한 항목을 자유롭게 기입하여 활용해 보세요." }
    ];

    return (
        <div className="max-w-4xl mx-auto space-y-8 select-none px-4">
            <SEO
                title={isEn ? "Ladder Game - Fun Random Matching | Tool Hive" : "사다리 타기 (Ghost Leg) - 랜덤 매칭 게임 | Tool Hive"}
                description={isEn ? "Make decisions fun with the Ghost Leg (Ladder Game). Enter players and results, then follow the falling path to see who gets what! Perfect for group bets and chores." : "참가자와 벌칙을 입력하고 사다리를 타보세요! 간식 내기, 당번 정하기에 딱 좋은 사다리 게임입니다."}
                keywords={isEn ? "ladder game, ghost leg, random matching, decision maker, fun betting games" : "사다리, ladder, game, 내기, 복불복, random"}
                faqs={toolFaqs}
            />

            <div className="text-center space-y-4">
                <h1 className="text-4xl font-black text-gray-900 dark:text-white flex items-center justify-center gap-4 italic tracking-tighter">
                    <GitCommit className="w-10 h-10 text-emerald-500 rotate-90" />
                    {isEn ? 'LADDER GAME' : '사다리 타기'}
                </h1>
                <p className="text-muted-foreground font-medium">
                    {isEn ? 'Enter players and results, then click a vertical line to start!' : '참가자와 결과를 입력하고 이름을 클릭해서 사다리를 타보세요!'}
                </p>
            </div>

            <div className="bg-card border-2 border-border/50 rounded-3xl p-8 shadow-xl space-y-8">
                {/* Controls */}
                <div className="flex flex-wrap justify-center gap-3">
                    <button onClick={addMember} className="flex items-center gap-2 px-5 py-2.5 bg-secondary hover:bg-secondary/80 rounded-xl text-sm font-bold transition-all active:scale-95" disabled={players.length >= 8}>
                        <Plus size={18} /> {isEn ? 'Add Player' : '인원 추가'}
                    </button>
                    <button onClick={removeMember} className="flex items-center gap-2 px-5 py-2.5 bg-secondary hover:bg-secondary/80 rounded-xl text-sm font-bold transition-all active:scale-95" disabled={players.length <= 2}>
                        <Trash2 size={18} /> {isEn ? 'Remove Player' : '인원 제거'}
                    </button>
                    <button onClick={generateLadder} className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-bold transition-all shadow-lg shadow-primary/20 active:scale-95">
                        <RefreshCw size={18} /> {isEn ? 'Regenerate' : '사다리 재생성'}
                    </button>
                </div>

                {/* Game Area */}
                <div className="relative overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-600">
                    <div className="min-w-[600px] flex flex-col px-4">
                        {/* Top Inputs (Players) */}
                        <div className="flex justify-around mb-4 gap-2">
                            {players.map((player, idx) => (
                                <input
                                    key={`p-${idx}`}
                                    type="text"
                                    value={player}
                                    onChange={(e) => updatePlayer(idx, e.target.value)}
                                    className="w-20 bg-muted/50 border-2 border-border/50 rounded-xl text-center text-sm font-black p-2 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                                    placeholder={isEn ? `Player ${idx + 1}` : `참가자 ${idx + 1}`}
                                />
                            ))}
                        </div>

                        {/* Start Buttons */}
                        <div className="flex justify-around mb-2">
                            {players.map((_, idx) => (
                                <button
                                    key={`btn-${idx}`}
                                    onClick={() => startPath(idx)}
                                    disabled={isPlaying}
                                    className={`
                                        w-10 h-10 rounded-2xl flex items-center justify-center text-white font-black transition-all hover:scale-110 active:scale-90 shadow-lg
                                        ${isPlaying ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:rotate-12'}
                                    `}
                                    style={{ backgroundColor: colors[idx % colors.length] }}
                                >
                                    ▼
                                </button>
                            ))}
                        </div>

                        {/* Canvas */}
                        <div className="relative group">
                            <canvas
                                ref={canvasRef}
                                width={800}
                                height={440}
                                className="w-full h-[360px] bg-slate-50 dark:bg-slate-900/50 rounded-3xl border-4 border-slate-100 dark:border-slate-800 shadow-inner my-4"
                            />
                        </div>

                        {/* Bottom Inputs (Results) */}
                        <div className="flex justify-around mt-4 gap-2">
                            {results.map((result, idx) => (
                                <input
                                    key={`r-${idx}`}
                                    type="text"
                                    value={result}
                                    onChange={(e) => updateResult(idx, e.target.value)}
                                    className="w-20 bg-muted/50 border-2 border-border/50 rounded-xl text-center text-sm font-black p-2 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                                    placeholder={isEn ? `Result ${idx + 1}` : `결과 ${idx + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <ToolGuide
                title={isEn ? "How to Use the Ladder Game" : "사다리 타기 완벽 가이드"}
                intro={isEn ? "The Ladder Game, also known as 'Ghost Leg', is a classic random selection game. It's the perfect way to fairly distribute chores, prizes, or decide who should pay for snacks without any bias." : "간단하지만 가장 공평한 결정 도구, 사다리 타기(Ghost Leg) 게임입니다. 인원수와 결과 항목을 자유롭게 설정하여 복불복 상황을 즐길 수 있습니다. 깔끔한 애니메이션과 함께 직관적인 인터페이스로 제작되었습니다."}
                steps={isEn ? [
                    "Adjust the number of players using the 'Add' or 'Remove' buttons.",
                    "Type the names of participants in the top input boxes.",
                    "Enter possible results (prizes, penalties, etc.) in the bottom input boxes.",
                    "Generate a new ladder pattern with the 'Regenerate' button if desired.",
                    "Click the colored arrow button at the top to start a player's path."
                ] : [
                    "상단의 '인원 추가/제거' 버튼을 사용해 전체 참가 인원을 조절합니다.",
                    "위쪽 입력 칸에 친구들의 이름이나 별명을 기입하세요.",
                    "아래쪽 입력 칸에는 '점심 쏘기', '설거지 당번' 등 원하는 결과를 입력합니다.",
                    "준비가 되었다면 각 이름 아래에 있는 화살표 버튼(▼)을 눌러 사다리 타기를 시작합니다.",
                    "선택한 경로가 애니메이션으로 그려지며 최종적으로 도착한 결과를 확인합니다."
                ]}
                tips={isEn ? [
                    "You can test paths multiple times to see different results for each player.",
                    "Shuffle the names or results manually for an even more random experience.",
                    "This tool is fully optimized for touch screens; great for using at dinner or office parties.",
                    "Try using emojis in the result boxes for a fun visual flair!"
                ] : [
                    "사다리는 생성 시마다 무작위로 그려지므로 공명정대한 결과를 보장합니다.",
                    "결과 창에 이모지를 활용하면 시각적으로 훨씬 재미있는 결과 화면을 만들 수 있습니다.",
                    "모바일 환경에서도 부드럽게 작동하므로 회식 자리나 모임에서 스마트폰으로 편리하게 활용하세요.",
                    "연속해서 게임을 진행할 경우 '사다리 재생성'을 눌러 새로운 확률 구도를 만드세요."
                ]}
                faqs={toolFaqs}
            />
        </div>
    );
};

export default LadderGame;
