import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Share2, Trophy, RotateCcw, Play, ArrowDown } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import useShareCanvas from '../hooks/useShareCanvas';

const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 600;
const BLOCK_HEIGHT = 40;
const INITIAL_WIDTH = 200;
const INITIAL_SPEED = 2.5;
const SPEED_INCREMENT = 0.05;

const TowerStacker = () => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const requestRef = useRef();
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(
        parseInt(localStorage.getItem('stacker-high-score') || '0')
    );
    const [gameState, setGameState] = useState('idle'); // idle, playing, gameover
    const { shareCanvas } = useShareCanvas();

    // Game state refs (to avoid stale closures in RAF)
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

        // Calculate overlap
        const delta = currentBlock.x - lastBlock.x;
        const overlap = currentBlock.w - Math.abs(delta);

        if (overlap <= 0) {
            setGameState('gameover');
            return;
        }

        // Perfect match bonus (if delta is very small)
        let newWidth = overlap;
        let finalX = delta > 0 ? lastBlock.x + delta : currentBlock.x;

        if (Math.abs(delta) < 5) {
            newWidth = lastBlock.w;
            finalX = lastBlock.x;
            // Visual feedback for perfect could be added
        }

        // Add block to stack
        const newBlock = {
            x: finalX,
            y: currentBlock.y,
            w: newWidth,
            color: `hsl(${hue}, 70%, 50%)`
        };
        stateRef.current.blocks.push(newBlock);

        // Update score
        const newScore = blocks.length - 1;
        setScore(newScore);
        if (newScore > highScore) {
            setHighScore(newScore);
            localStorage.setItem('stacker-high-score', newScore.toString());
        }

        // Prepare next block
        const nextY = currentBlock.y - BLOCK_HEIGHT;
        const nextSpeed = INITIAL_SPEED + (newScore * SPEED_INCREMENT);
        stateRef.current.currentBlock = {
            x: Math.random() > 0.5 ? -newWidth : CANVAS_WIDTH,
            y: nextY,
            w: newWidth,
            speed: nextSpeed,
            dir: finalX < 0 ? 1 : (finalX + newWidth > CANVAS_WIDTH ? -1 : (Math.random() > 0.5 ? 1 : -1))
        };

        // Update color
        stateRef.current.hue = (hue + 10) % 360;

        // Update camera
        if (newScore > 5) {
            stateRef.current.targetCameraY = (newScore - 5) * BLOCK_HEIGHT;
        }
    }, [gameState, highScore, initGame]);

    const animate = useCallback((time) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const state = stateRef.current;

        // Move current block
        if (gameState === 'playing') {
            state.currentBlock.x += state.currentBlock.speed * state.currentBlock.dir;
            if (state.currentBlock.x + state.currentBlock.w > CANVAS_WIDTH) {
                state.currentBlock.dir = -1;
            } else if (state.currentBlock.x < 0) {
                state.currentBlock.dir = 1;
            }
        }

        // Smooth camera
        state.cameraY += (state.targetCameraY - state.cameraY) * 0.1;

        // Clear
        ctx.fillStyle = '#f8fafc'; // slate-50
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        ctx.save();
        ctx.translate(0, state.cameraY);

        // Draw blocks
        state.blocks.forEach((b, i) => {
            // Draw shadow/side for 3D effect
            ctx.fillStyle = b.color.replace('50%', '40%');
            ctx.fillRect(b.x + 4, b.y + 4, b.w, BLOCK_HEIGHT);

            // Draw main block
            ctx.fillStyle = b.color;
            ctx.fillRect(b.x, b.y, b.w, BLOCK_HEIGHT);

            // Highlight top
            ctx.fillStyle = 'rgba(255,255,255,0.2)';
            ctx.fillRect(b.x, b.y, b.w, 4);
        });

        // Draw current moving block
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

    const stackFaqs = [
        { q: "탑 쌓기 게임은 무료인가요?", a: "네, 브라우저에서 즉시 실행 가능한 100% 무료 HTML5 게임입니다." },
        { q: "모바일에서도 플레이 가능한가요?", a: "네, 터치 조작에 최적화되어 있어 스마트폰에서도 원활하게 즐기실 수 있습니다." }
    ];

    const stackSteps = [
        "화면을 클릭하거나 스페이스바를 눌러 블록을 떨어뜨리세요.",
        "아래 블록과 정확히 일치하게 쌓아야 크기가 줄어들지 않습니다.",
        "블록이 밖으로 벗어나면 게임이 종료됩니다."
    ];

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <SEO
                title="무료 온라인 탑 쌓기 게임 | 타워 스태커 중독성 퍼즐"
                description="아슬아슬한 긴장감! 하늘 끝까지 블록을 쌓아 올리는 온라인 탑 쌓기 게임입니다. 높은 점수에 도전하고 친구들과 기록을 공유해보세요."
                keywords="탑쌓기게임, 타워스태커, 블록쌓기, 온라인게임, 무료미니게임, 중독성게임, 퍼즐게임"
                category="게임"
                faqs={stackFaqs}
                steps={stackSteps}
            />

            <div className="text-center space-y-2">
                <h1 className="text-3xl font-bold">탑 쌓기</h1>
                <p className="text-muted-foreground">화면을 클릭하거나 스페이스바를 눌러 블록을 쌓으세요</p>
            </div>

            <div className="flex justify-between items-center bg-card p-4 rounded-xl border border-border shadow-sm">
                <div className="flex items-center gap-6">
                    <div className="text-center">
                        <div className="text-xs text-muted-foreground uppercase font-bold">현재 층수</div>
                        <div className="text-3xl font-black text-primary">{score}F</div>
                    </div>
                    <div className="text-center">
                        <div className="text-xs text-muted-foreground uppercase font-bold flex items-center gap-1">
                            <Trophy size={14} className="text-yellow-500" /> 최고 기록
                        </div>
                        <div className="text-3xl font-black">{highScore}F</div>
                    </div>
                </div>
                <button
                    onClick={initGame}
                    className="p-3 bg-secondary hover:bg-secondary/80 rounded-xl transition-colors"
                >
                    <RotateCcw size={20} />
                </button>
            </div>

            <div
                className="relative group flex flex-col items-center cursor-pointer touch-manipulation"
                ref={containerRef}
                onClick={handleAction}
            >
                <div className="relative bg-white rounded-3xl overflow-hidden shadow-2xl border-8 border-slate-100 dark:border-slate-800 h-[500px] w-full max-w-[400px]">
                    <canvas
                        ref={canvasRef}
                        width={CANVAS_WIDTH}
                        height={CANVAS_HEIGHT}
                        className="block w-full h-full object-cover"
                    />

                    {/* Overlays */}
                    {gameState === 'idle' && (
                        <div className="absolute inset-0 bg-white/40 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500">
                            <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-6 animate-bounce">
                                <ArrowDown size={40} className="text-primary" />
                            </div>
                            <h2 className="text-2xl font-bold mb-4 text-slate-800">탑을 높이 쌓아보세요!</h2>
                            <button
                                onClick={(e) => { e.stopPropagation(); initGame(); }}
                                className="px-10 py-4 bg-primary text-primary-foreground font-black rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 transition-transform active:scale-95"
                            >
                                시작하기
                            </button>
                        </div>
                    )}

                    {gameState === 'gameover' && (
                        <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center animate-in zoom-in duration-300">
                            <div className="text-rose-500 mb-2">
                                <Trophy size={64} className="mx-auto opacity-20 absolute -translate-y-4 -translate-x-4 scale-150 rotate-12" />
                                <h2 className="text-5xl font-black relative">FAILED</h2>
                            </div>
                            <p className="text-slate-400 mb-8">블록을 놓쳤습니다!</p>

                            <div className="bg-white/10 rounded-3xl p-8 mb-8 w-full max-w-[240px]">
                                <div className="text-xs text-slate-500 font-bold uppercase mb-1">최종 높이</div>
                                <div className="text-5xl font-black text-white">{score}<span className="text-xl">F</span></div>
                            </div>

                            <div className="flex flex-col gap-3 w-full max-w-[240px]">
                                <button
                                    onClick={(e) => { e.stopPropagation(); initGame(); }}
                                    className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
                                >
                                    <RotateCcw size={20} />
                                    다시 도전하기
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); shareCanvas(containerRef.current, '탑 쌓기', `${score}층`); }}
                                    className="w-full py-3 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2"
                                >
                                    <Share2 size={18} />
                                    결과 공유하기
                                </button>
                            </div>
                        </div>
                    )}
                
            

                </div>

            </div>

            <ToolGuide title="탑 쌓기 (Tower Stacker)"
                intro="탑 쌓기는 고도의 집중력과 타이밍이 필요한 클래식 아케이드 게임입니다. 단순해 보이지만 층수가 높아질수록 빨라지는 속도와 좁아지는 블록 사이에서 한계에 도전해보세요. 친구들과 최고 기록을 공유하며 누가 가장 높은 건물을 올렸는지 내기하기에도 좋습니다."
                steps={[
                    "게임 시작 버튼을 누르거나 화면을 클릭하여 첫 번째 블록을 배치합니다.",
                    "좌우로 움직이는 다음 블록이 아래 블록과 정확히 일치할 때 클릭하세요.",
                    "아래 블록을 벗어난 부분은 자동으로 잘려나가며 탑의 크기가 줄어듭니다.",
                    "한 조각이라도 올리지 못하고 블록이 공중으로 떨어지면 게임이 종료됩니다."
                ]}
                tips={[
                    "초반에는 속도가 비교적 느리므로 최대한 아래 블록과 완벽하게 일치시키는 것이 중요합니다.",
                    "완벽하게 일치시키면(Perfect) 블록 크기가 줄어들지 않아 후반부에 훨씬 유리해집니다.",
                    "리듬감을 타는 것이 중요합니다. 블록이 벽에 부딪히는 소리나 타이밍을 몸으로 익혀보세요.",
                    "시선은 블록의 정중앙보다 블록의 앞쪽 모서리에 집중하는 것이 타이밍을 잡기 더 쉽습니다."
                ]}
                faqs={[
                    { q: "모바일에서도 플레이가 가능한가요?", a: "네, 터치 인터페이스에 최적화되어 있어 모바일 브라우저에서도 클릭만으로 즐거운 플레이가 가능합니다." },
                    { q: "최고 기록은 저장되나요?", a: "브라우저의 로컬 스토리지를 사용하여 여러분의 최고 기록(High Score)을 안전하게 보관합니다." },
                    { q: "게임 중 멈추고 싶을 때는 어떻게 하나요?", a: "탑 쌓기는 실시간 타이밍 게임으로 일시정지 기능은 없지만, 한 게임이 매우 짧아 긴장감 있게 즐기실 수 있습니다." },
                    { q: "완벽하게 쌓으면(Perfect) 보너스가 있나요?", a: "네, 현재 코드에서는 블록 크기가 줄어들지 않는 혜택이 있어 장기적인 기록 갱신에 필수적입니다." }
                ]}
            />
        </div>
    );
};
export default TowerStacker;
