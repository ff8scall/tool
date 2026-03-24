import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Share2, Trophy, RotateCcw, Play, ArrowDown } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import useShareCanvas from '../hooks/useShareCanvas';
import { useLanguage } from '../context/LanguageContext';

const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 600;
const BLOCK_HEIGHT = 40;
const INITIAL_WIDTH = 200;
const INITIAL_SPEED = 2.5;
const SPEED_INCREMENT = 0.05;

const TowerStacker = () => {
    const { lang, t } = useLanguage();
    const isEn = lang === 'en';
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const requestRef = useRef();
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(
        parseInt(localStorage.getItem('stacker-high-score') || '0')
    );
    const [gameState, setGameState] = useState('idle'); 
    const { shareCanvas } = useShareCanvas();

    const stateRef = useRef({
        blocks: [],
        currentBlock: { x: 0, y: 0, w: INITIAL_WIDTH, speed: INITIAL_SPEED, dir: 1 },
        cameraY: 0,
        targetCameraY: 0,
        hue: 200,
    });

    const initGame = useCallback(() => {
        stateRef.current = {
            blocks: [
                { x: (CANVAS_WIDTH - INITIAL_WIDTH) / 2, y: CANVAS_HEIGHT - BLOCK_HEIGHT, w: INITIAL_WIDTH, color: 'hsl(200, 70%, 50%)' }
            ],
            currentBlock: {
                x: 0,
                y: CANVAS_HEIGHT - BLOCK_HEIGHT * 2,
                w: INITIAL_WIDTH,
                speed: INITIAL_SPEED,
                dir: 1
            },
            cameraY: 0,
            targetCameraY: 0,
            hue: 200,
        };
        setScore(0);
        setGameState('playing');
    }, []);

    const handleAction = useCallback(() => {
        if (gameState === 'idle') {
            initGame();
            return;
        }
        if (gameState !== 'playing') return;

        const { blocks, currentBlock, hue } = stateRef.current;
        const lastBlock = blocks[blocks.length - 1];

        const delta = currentBlock.x - lastBlock.x;
        const overlap = currentBlock.w - Math.abs(delta);

        if (overlap <= 0) {
            setGameState('gameover');
            return;
        }

        let newWidth = overlap;
        let finalX = delta > 0 ? lastBlock.x + delta : currentBlock.x;

        if (Math.abs(delta) < 5) {
            newWidth = lastBlock.w;
            finalX = lastBlock.x;
        }

        const newBlock = {
            x: finalX,
            y: currentBlock.y,
            w: newWidth,
            color: `hsl(${hue}, 70%, 50%)`
        };
        stateRef.current.blocks.push(newBlock);

        const newScore = blocks.length;
        setScore(newScore);
        if (newScore > highScore) {
            setHighScore(newScore);
            localStorage.setItem('stacker-high-score', newScore.toString());
        }

        const nextY = currentBlock.y - BLOCK_HEIGHT;
        const nextSpeed = INITIAL_SPEED + (newScore * SPEED_INCREMENT);
        stateRef.current.currentBlock = {
            x: Math.random() > 0.5 ? -newWidth : CANVAS_WIDTH,
            y: nextY,
            w: newWidth,
            speed: nextSpeed,
            dir: finalX < 0 ? 1 : (finalX + newWidth > CANVAS_WIDTH ? -1 : (Math.random() > 0.5 ? 1 : -1))
        };

        stateRef.current.hue = (hue + 10) % 360;

        if (newScore > 5) {
            stateRef.current.targetCameraY = (newScore - 5) * BLOCK_HEIGHT;
        }
    }, [gameState, highScore, initGame]);

    const animate = useCallback((time) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const state = stateRef.current;

        if (gameState === 'playing') {
            state.currentBlock.x += state.currentBlock.speed * state.currentBlock.dir;
            if (state.currentBlock.x + state.currentBlock.w > CANVAS_WIDTH) {
                state.currentBlock.dir = -1;
            } else if (state.currentBlock.x < 0) {
                state.currentBlock.dir = 1;
            }
        }

        state.cameraY += (state.targetCameraY - state.cameraY) * 0.1;

        ctx.fillStyle = '#f8fafc'; 
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        ctx.save();
        ctx.translate(0, state.cameraY);

        state.blocks.forEach((b, i) => {
            ctx.fillStyle = b.color.replace('50%', '40%');
            ctx.fillRect(b.x + 4, b.y + 4, b.w, BLOCK_HEIGHT);

            ctx.fillStyle = b.color;
            ctx.fillRect(b.x, b.y, b.w, BLOCK_HEIGHT);

            ctx.fillStyle = 'rgba(255,255,255,0.2)';
            ctx.fillRect(b.x, b.y, b.w, 4);
        });

        if (gameState === 'playing') {
            const b = state.currentBlock;
            ctx.fillStyle = `hsl(${state.hue}, 70%, 50%)`;
            ctx.fillRect(b.x, b.y, b.w, BLOCK_HEIGHT);
            ctx.fillStyle = 'rgba(255,255,255,0.2)';
            ctx.fillRect(b.x, b.y, b.w, 4);
        }

        ctx.restore();

        requestRef.current = requestAnimationFrame(animate);
    }, [gameState]);

    useEffect(() => {
        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current);
    }, [animate]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.code === 'Space' || e.code === 'Enter') {
                e.preventDefault();
                handleAction();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleAction]);

    const stackFaqs = isEn ? [
        { q: "Is Tower Stacker free?", a: "Yes, it is a 100% free HTML5 game that runs directly in your browser." },
        { q: "Can I play on mobile?", a: "Absolutely! The game is optimized for touch controls and works perfectly on smartphones and tablets." },
        { q: "Is there a perfect bonus?", a: "Yes, if you line up the blocks perfectly, you keep the full width of the block for the next floor." }
    ] : [
        { q: "탑 쌓기 게임은 무료인가요?", a: "네, 브라우저에서 즉시 실행 가능한 100% 무료 HTML5 게임입니다." },
        { q: "모바일에서도 플레이 가능한가요?", a: "네, 터치 조작에 최적화되어 있어 스마트폰에서도 원활하게 즐기실 수 있습니다." },
        { q: "완벽하게 쌓으면 보너스가 있나요?", a: "네, 아래 블록과 거의 일치하게 쌓으면 블록 크기가 줄어들지 않는 혜택이 있습니다." }
    ];

    const stackSteps = isEn ? [
        "Click the screen or press the Spacebar to drop/place the block.",
        "Align the moving block with the one below to prevent it from shrinking.",
        "The game ends if you miss the stack completely and the block falls off."
    ] : [
        "화면을 클릭하거나 스페이스바를 눌러 블록을 떨어뜨리세요.",
        "아래 블록과 정확히 일치하게 쌓아야 크기가 줄어들지 않습니다.",
        "블록이 밖으로 벗어나면 게임이 종료됩니다."
    ];

    return (
        <div className="max-w-4xl mx-auto space-y-8 px-4">
            <SEO
                title={t('tools.tower-stacker.title')}
                description={t('tools.tower-stacker.description')}
                keywords={isEn ? "tower stacker, block stack, reaction game, online puzzle, free mini games" : "탑쌓기게임, 타워스태커, 블록쌓기, 온라인게임, 무료미니게임, 중독성게임, 퍼즐게임"}
                category="Luck/Fun"
                faqs={stackFaqs}
                steps={stackSteps}
            />

            <div className="text-center space-y-2">
                <h1 className="text-3xl font-black italic uppercase tracking-tighter text-gray-800 dark:text-white">
                     {isEn ? 'Tower Stacker' : '탑 쌓기'}
                </h1>
                <p className="text-muted-foreground font-medium">
                    {isEn ? 'Click or press Space to stack blocks' : '화면에 클릭하거나 스페이스바를 눌러 블록을 쌓으세요'}
                </p>
            </div>

            <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-6 rounded-2xl border-2 border-border/50 shadow-xl">
                <div className="flex items-center gap-6">
                    <div className="text-center">
                        <div className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-1">{isEn ? 'Current floor' : '현재 층수'}</div>
                        <div className="text-3xl font-black text-primary font-mono">{score}F</div>
                    </div>
                    <div className="w-px h-10 bg-border/50" />
                    <div className="text-center">
                        <div className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-1 flex items-center justify-center gap-1">
                            <Trophy size={14} className="text-yellow-500" /> {isEn ? 'Best Rec' : '최고 기록'}
                        </div>
                        <div className="text-3xl font-black font-mono">{highScore}F</div>
                    </div>
                </div>
                <button
                    onClick={initGame}
                    className="p-4 bg-secondary/80 hover:bg-secondary rounded-2xl transition-all hover:scale-105"
                >
                    <RotateCcw size={20} className="text-foreground/70" />
                </button>
            </div>

            <div
                className="relative group flex flex-col items-center cursor-pointer touch-manipulation"
                ref={containerRef}
                onClick={handleAction}
            >
                <div className="relative bg-white rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-slate-100 dark:border-slate-800 h-[500px] w-full max-w-[400px]">
                    <canvas
                        ref={canvasRef}
                        width={CANVAS_WIDTH}
                        height={CANVAS_HEIGHT}
                        className="block w-full h-full object-cover"
                    />

                    {/* Overlays */}
                    {gameState === 'idle' && (
                        <div className="absolute inset-0 bg-white/60 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500">
                            <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-10 border-4 border-primary/30 animate-bounce">
                                <ArrowDown size={40} className="text-primary" />
                            </div>
                            <h2 className="text-3xl font-black mb-8 text-slate-800 uppercase italic">{isEn ? "Go Higher!" : "더 높이!"}</h2>
                            <button
                                onClick={(e) => { e.stopPropagation(); initGame(); }}
                                className="px-12 py-5 bg-primary text-primary-foreground font-black rounded-2xl shadow-xl shadow-primary/30 hover:scale-105 transition-transform active:scale-95 text-xl"
                            >
                                {isEn ? "START NOW" : "시작하기"}
                            </button>
                        </div>
                    )}

                    {gameState === 'gameover' && (
                        <div className="absolute inset-0 bg-slate-900/95 backdrop-blur-xl flex flex-col items-center justify-center p-8 text-center animate-in zoom-in duration-300">
                             <h2 className="text-5xl font-black text-rose-500 mb-2 italic tracking-tighter">{isEn ? 'FAILED' : '게임 종료'}</h2>
                            <p className="text-slate-500 font-bold mb-8 uppercase tracking-widest">{isEn ? "You missed it!" : "블록을 놓쳤습니다!"}</p>

                            <div className="bg-white/10 p-8 rounded-3xl mb-10 w-full max-w-[240px] shadow-inner border border-white/10">
                                <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">{isEn ? 'Final Height' : '최종 높이'}</div>
                                <div className="text-6xl font-black text-white font-mono">{score}<span className="text-xl italic opacity-50">F</span></div>
                            </div>

                            <div className="flex flex-col gap-4 w-full max-w-[240px]">
                                <button
                                    onClick={(e) => { e.stopPropagation(); initGame(); }}
                                    className="w-full py-5 bg-primary text-primary-foreground font-black rounded-2xl transition-all flex items-center justify-center gap-3 shadow-xl shadow-primary/30 text-lg"
                                >
                                    <RotateCcw size={24} />
                                    {isEn ? "TRY AGAIN" : "다시 도전하기"}
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); shareCanvas(containerRef.current, 'Tower Stacker', `${score}F`); }}
                                    className="w-full py-4 bg-slate-700 hover:bg-slate-600 text-white font-black rounded-2xl transition-all flex items-center justify-center gap-2"
                                >
                                    <Share2 size={18} />
                                    {isEn ? "Share Result" : "결과 공유하기"}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <ToolGuide title={isEn ? "Tower Stacker Master Guide" : "탑 쌓기 (Tower Stacker) 이용 가이드"}
                intro={isEn ? "Tower Stacker is a classic arcade game that tests your focus and precise timing. Simple as it looks, the challenge intensifies as floors rise, speeds increase, and your tower narrows. Challenge yourself to reach new heights!" : "탑 쌓기는 고도의 집중력과 타이밍이 필요한 클래식 아케이드 게임입니다. 단순해 보이지만 층수가 높아질수록 빨라지는 속도와 좁아지는 블록 사이에서 한계에 도전해보세요. 친구들과 최고 기록을 공유하며 누가 가장 높은 건물을 올렸는지 내기하기에도 좋습니다."}
                steps={stackSteps}
                tips={isEn ? [
                    "Precision first: In early levels, focus on perfect alignment before speed picks up.",
                    "Perfect bonus: Lining up a block perfectly keeps its full width, crucial for long runs.",
                    "Get into the rhythm: Try to internalize the back-and-forth swing timing.",
                    "Higher stakes: As you climb, the blocks move faster, so anticipate the drop slightly earlier."
                ] : [
                    "초반에는 속도가 비교적 느리므로 최대한 아래 블록과 완벽하게 일치시키는 것이 중요합니다.",
                    "완벽하게 일치시키면(Perfect) 블록 크기가 줄어들지 않아 후반부에 훨씬 유리해집니다.",
                    "리듬감을 타는 것이 중요합니다. 블록이 벽에 부딪히는 소리나 타이밍을 몸으로 익혀보세요.",
                    "시선은 블록의 정중앙보다 블록의 앞쪽 모서리에 집중하는 것이 타이밍을 잡기 더 쉽습니다."
                ]}
                faqs={stackFaqs}
            />
        </div>
    );
};
export default TowerStacker;
