import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Share2, Trophy, RotateCcw, Play, Pause, ChevronLeft, ChevronRight, ChevronUp, ChevronDown, Gamepad2 } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import useShareCanvas from '../hooks/useShareCanvas';
import { useLanguage } from '../context/LanguageContext';

const GRID_SIZE = 20;
const INITIAL_SPEED = 150;
const MIN_SPEED = 60;
const SPEED_INCREMENT = 2;

const SnakeGame = () => {
    const { lang, t } = useLanguage();
    const isEn = lang === 'en';
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
    const [food, setFood] = useState({ x: 15, y: 15 });
    const [direction, setDirection] = useState('RIGHT');
    const [nextDirection, setNextDirection] = useState('RIGHT');
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(
        parseInt(localStorage.getItem('snake-high-score') || '0')
    );
    const [gameState, setGameState] = useState('idle'); // idle, playing, paused, gameover
    const [speed, setSpeed] = useState(INITIAL_SPEED);
    const { shareCanvas } = useShareCanvas();

    // Initialize Game
    const initGame = useCallback(() => {
        setSnake([{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }]);
        setFood(getRandomFood({ x: 10, y: 10 }));
        setDirection('RIGHT');
        setNextDirection('RIGHT');
        setScore(0);
        setSpeed(INITIAL_SPEED);
        setGameState('playing');
    }, []);

    const getRandomFood = (head) => {
        let newFood;
        while (true) {
            newFood = {
                x: Math.floor(Math.random() * GRID_SIZE),
                y: Math.floor(Math.random() * GRID_SIZE)
            };
            const isOnSnake = snake.some(segment => segment.x === newFood.x && segment.y === newFood.y);
            const isOnHead = head && head.x === newFood.x && head.y === newFood.y;
            if (!isOnSnake && !isOnHead) break;
        }
        return newFood;
    };

    const moveSnake = useCallback(() => {
        if (gameState !== 'playing') return;

        setDirection(nextDirection);
        const head = { ...snake[0] };

        switch (nextDirection) {
            case 'UP': head.y -= 1; break;
            case 'DOWN': head.y += 1; break;
            case 'LEFT': head.x -= 1; break;
            case 'RIGHT': head.x += 1; break;
            default: break;
        }

        // Collision Check (Walls)
        if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
            handleGameOver();
            return;
        }

        // Collision Check (Self)
        if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
            handleGameOver();
            return;
        }

        const newSnake = [head, ...snake];

        // Food Check
        if (head.x === food.x && head.y === food.y) {
            setScore(prev => {
                const newScore = prev + 10;
                if (newScore > highScore) {
                    setHighScore(newScore);
                    localStorage.setItem('snake-high-score', newScore.toString());
                }
                return newScore;
            });
            setFood(getRandomFood(head));
            setSpeed(prev => Math.max(MIN_SPEED, prev - SPEED_INCREMENT));
        } else {
            newSnake.pop();
        }

        setSnake(newSnake);
    }, [snake, food, nextDirection, gameState, highScore]);

    const handleGameOver = () => {
        setGameState('gameover');
    };

    // Game Loop
    useEffect(() => {
        if (gameState === 'playing') {
            const interval = setInterval(moveSnake, speed);
            return () => clearInterval(interval);
        }
    }, [moveSnake, gameState, speed]);

    // Keyboard Input
    useEffect(() => {
        const handleKeyDown = (e) => {
            switch (e.key) {
                case 'ArrowUp':
                    if (direction !== 'DOWN') setNextDirection('UP');
                    break;
                case 'ArrowDown':
                    if (direction !== 'UP') setNextDirection('DOWN');
                    break;
                case 'ArrowLeft':
                    if (direction !== 'RIGHT') setNextDirection('LEFT');
                    break;
                case 'ArrowRight':
                    if (direction !== 'LEFT') setNextDirection('RIGHT');
                    break;
                case ' ': // Space to pause/start
                    if (gameState === 'playing') setGameState('paused');
                    else if (gameState === 'paused' || gameState === 'idle') setGameState('playing');
                    break;
                default: break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [direction, gameState]);

    // Rendering
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        const cellSize = width / GRID_SIZE;

        // Clear
        ctx.fillStyle = '#0f172a'; // slate-900
        ctx.fillRect(0, 0, width, height);

        // Draw Grid
        ctx.strokeStyle = '#1e293b'; 
        ctx.lineWidth = 0.5;
        for (let i = 0; i <= GRID_SIZE; i++) {
            ctx.beginPath();
            ctx.moveTo(i * cellSize, 0);
            ctx.lineTo(i * cellSize, height);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(0, i * cellSize);
            ctx.lineTo(width, i * cellSize);
            ctx.stroke();
        }

        // Draw Food
        ctx.fillStyle = '#f43f5e'; 
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#f43f5e';
        ctx.beginPath();
        ctx.arc(
            food.x * cellSize + cellSize / 2,
            food.y * cellSize + cellSize / 2,
            cellSize / 2.5,
            0,
            Math.PI * 2
        );
        ctx.fill();
        ctx.shadowBlur = 0;

        // Draw Snake
        snake.forEach((segment, index) => {
            const isHead = index === 0;
            ctx.fillStyle = isHead ? '#10b981' : '#34d399'; 

            if (isHead) {
                ctx.shadowBlur = 10;
                ctx.shadowColor = '#10b981';
            }

            const r = cellSize / 4;
            const x = segment.x * cellSize + 1;
            const y = segment.y * cellSize + 1;
            const w = cellSize - 2;
            const h = cellSize - 2;

            ctx.beginPath();
            ctx.moveTo(x + r, y);
            ctx.arcTo(x + w, y, x + w, y + h, r);
            ctx.arcTo(x + w, y + h, x, y + h, r);
            ctx.arcTo(x, y + h, x, y, r);
            ctx.arcTo(x, y, x + w, y, r);
            ctx.closePath();
            ctx.fill();
            ctx.shadowBlur = 0;

            if (isHead) {
                ctx.fillStyle = 'white';
                const eyeSize = cellSize / 8;
                const offset = cellSize / 4;

                let eye1 = { x: 0, y: 0 };
                let eye2 = { x: 0, y: 0 };

                if (direction === 'RIGHT') {
                    eye1 = { x: x + w - offset, y: y + offset };
                    eye2 = { x: x + w - offset, y: y + h - offset };
                } else if (direction === 'LEFT') {
                    eye1 = { x: x + offset, y: y + offset };
                    eye2 = { x: x + offset, y: y + h - offset };
                } else if (direction === 'UP') {
                    eye1 = { x: x + offset, y: y + offset };
                    eye2 = { x: x + w - offset, y: y + offset };
                } else {
                    eye1 = { x: x + offset, y: y + h - offset };
                    eye2 = { x: x + w - offset, y: y + h - offset };
                }

                ctx.beginPath();
                ctx.arc(eye1.x, eye1.y, eyeSize, 0, Math.PI * 2);
                ctx.arc(eye2.x, eye2.y, eyeSize, 0, Math.PI * 2);
                ctx.fill();
            }
        });
    }, [snake, food, direction]);

    const toolFaqs = isEn ? [
        { q: "How do I control the snake?", a: "On desktop, use your keyboard arrow keys or WASD. On mobile, use the on-screen directional buttons." },
        { q: "Does the speed increase?", a: "Yes, every time you eat a piece of food (ruby), the snake grows longer and the speed increases slightly." },
        { q: "What causes game over?", a: "The game ends if you hit the walls or collide with your own tail." }
    ] : [
        { q: "뱀은 어떻게 조종하나요?", a: "데스크톱에서는 키보드 방향키를 사용하고, 모바일에서는 화면 하단의 방향 버튼을 터치하여 조종할 수 있습니다." },
        { q: "속도가 점점 빨라지나요?", a: "네, 먹이(루비)를 먹을수록 뱀의 길이가 길어지며 이동 속도가 조금씩 빨라집니다." },
        { q: "벽에 닿으면 바로 죽나요?", a: "네, 상자 테두리 벽이나 자신의 몸통에 부딪히면 게임이 종료됩니다." }
    ];

    return (
        <div className="max-w-2xl mx-auto space-y-8 px-4">
            <SEO
                title={t('tools.snake-game.title')}
                description={t('tools.snake-game.description')}
                keywords={isEn ? "classic snake game, retro arcade, free online game, snake puzzle" : "뱀게임, 스네이크게임, 클래식게임, 고전게임, 무료미니게임, 심심풀이게임"}
                faqs={toolFaqs}
            />

            <div className="text-center space-y-4">
                <h1 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-green-600 italic">
                    {isEn ? 'Classic Snake' : '스네이크 게임'}
                </h1>
                <p className="text-muted-foreground font-medium">
                    {isEn ? 'Use Arrow Keys to control the snake' : '키보드 방향키를 사용하여 뱀을 조종하세요'}
                </p>
            </div>

            <div className="flex justify-between items-center bg-card p-6 rounded-2xl border-2 border-border/50 shadow-xl">
                <div className="flex items-center gap-6">
                    <div className="text-center">
                        <div className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-1">{isEn ? 'SCORE' : '점수'}</div>
                        <div className="text-3xl font-mono font-black text-primary">{score}</div>
                    </div>
                    <div className="w-px h-10 bg-border/50" />
                    <div className="text-center">
                        <div className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-1 flex items-center gap-1 justify-center">
                            <Trophy size={12} className="text-yellow-500" /> {isEn ? 'BEST' : '최고'}
                        </div>
                        <div className="text-3xl font-mono font-black">{highScore}</div>
                    </div>
                </div>
                <div className="flex gap-3">
                    {gameState === 'playing' ? (
                        <button
                            onClick={() => setGameState('paused')}
                            className="p-4 bg-secondary/50 hover:bg-secondary rounded-xl transition-all active:scale-95"
                        >
                            <Pause size={24} />
                        </button>
                    ) : (gameState === 'paused' || gameState === 'idle') ? (
                        <button
                            onClick={() => setGameState('playing')}
                            className="p-4 bg-primary text-primary-foreground rounded-xl transition-all active:scale-95 shadow-lg shadow-primary/20"
                        >
                            <Play size={24} />
                        </button>
                    ) : null}
                    <button
                        onClick={initGame}
                        className="p-4 bg-secondary/50 hover:bg-secondary rounded-xl transition-all active:scale-95"
                        title={isEn ? "New Game" : "새 게임"}
                    >
                        <RotateCcw size={24} />
                    </button>
                </div>
            </div>

            <div className="relative group flex flex-col items-center" ref={containerRef}>
                <div className="relative bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border-[12px] border-slate-800 ring-4 ring-slate-700/50">
                    <canvas
                        ref={canvasRef}
                        width={400}
                        height={400}
                        className="block max-w-full h-auto"
                        style={{ aspectRatio: '1/1' }}
                    />

                    {/* Overlays */}
                    {gameState === 'idle' && (
                        <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-500">
                            <div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mb-8 animate-pulse border-4 border-emerald-500/30">
                                <Play size={48} className="text-emerald-500 ml-2" />
                            </div>
                            <h2 className="text-3xl font-black text-white mb-6 uppercase tracking-tighter italic">
                                {isEn ? "Are you ready?" : "준비되셨나요?"}
                            </h2>
                            <button
                                onClick={initGame}
                                className="px-12 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-black rounded-2xl transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-emerald-500/40"
                            >
                                {isEn ? "START GAME" : "시작하기"}
                            </button>
                            <p className="mt-6 text-xs font-bold text-slate-500 uppercase tracking-widest leading-loose">
                                {isEn ? "Press SPACE to start" : "또는 스페이스바를 누르세요"}
                            </p>
                        </div>
                    )}

                    {gameState === 'paused' && (
                        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm flex flex-col items-center justify-center animate-in fade-in duration-200">
                             <div className="p-6 bg-white/10 rounded-3xl mb-6 backdrop-blur-xl border border-white/20">
                                <Pause size={48} className="text-white fill-white" />
                            </div>
                            <h2 className="text-3xl font-black text-white mb-8 uppercase tracking-widest">{isEn ? "PAUSED" : "일시 정지"}</h2>
                            <button
                                onClick={() => setGameState('playing')}
                                className="px-10 py-4 bg-white text-slate-900 font-black rounded-2xl hover:bg-slate-100 transition-all hover:scale-110 active:scale-95"
                            >
                                {isEn ? "CONTINUE" : "계속하기"}
                            </button>
                        </div>
                    )}

                    {gameState === 'gameover' && (
                         <div className="absolute inset-0 bg-slate-900/95 backdrop-blur-xl flex flex-col items-center justify-center p-8 text-center animate-in zoom-in duration-300">
                            <h2 className="text-5xl font-black text-rose-500 mb-2 italic tracking-tighter">{isEn ? 'GAME OVER' : '게임 종료'}</h2>
                            <p className="text-slate-500 font-bold mb-8 uppercase tracking-widest">{isEn ? "Well Played!" : "수고하셨습니다!"}</p>

                            <div className="bg-slate-800/40 border border-slate-700 rounded-3xl p-8 mb-10 w-full max-w-[260px] shadow-inner">
                                <div className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-2">{isEn ? "Final Score" : "최종 점수"}</div>
                                <div className="text-6xl font-mono font-black text-white">{score}</div>
                            </div>

                            <div className="flex flex-col gap-4 w-full max-w-[260px]">
                                <button
                                    onClick={initGame}
                                    className="w-full py-5 bg-emerald-500 hover:bg-emerald-600 text-white font-black rounded-2xl transition-all flex items-center justify-center gap-3 shadow-2xl shadow-emerald-500/40 hover:scale-105 active:scale-95"
                                >
                                    <RotateCcw size={24} />
                                    {isEn ? "TRY AGAIN" : "다시 도전하기"}
                                </button>
                                <button
                                    onClick={() => shareCanvas(containerRef.current, 'Snake Game', score)}
                                    className="w-full py-4 bg-slate-700 hover:bg-slate-600 text-white font-black rounded-2xl transition-all flex items-center justify-center gap-3"
                                >
                                    <Share2 size={20} />
                                    {isEn ? "SHARE RESULT" : "결과 공유하기"}
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Mobile Controls */}
                <div className="grid grid-cols-3 gap-3 mt-10 md:hidden">
                    <div />
                    <button
                        onMouseDown={() => direction !== 'DOWN' && setNextDirection('UP')}
                        className="w-16 h-16 bg-slate-800 border-2 border-slate-700 rounded-2xl flex items-center justify-center active:bg-slate-700 shadow-lg"
                    >
                        <ChevronUp size={40} className="text-white" />
                    </button>
                    <div />
                    <button
                        onMouseDown={() => direction !== 'RIGHT' && setNextDirection('LEFT')}
                        className="w-16 h-16 bg-slate-800 border-2 border-slate-700 rounded-2xl flex items-center justify-center active:bg-slate-700 shadow-lg"
                    >
                        <ChevronLeft size={40} className="text-white" />
                    </button>
                    <button
                        onMouseDown={() => direction !== 'UP' && setNextDirection('DOWN')}
                        className="w-16 h-16 bg-slate-800 border-2 border-slate-700 rounded-2xl flex items-center justify-center active:bg-slate-700 shadow-lg"
                    >
                        <ChevronDown size={40} className="text-white" />
                    </button>
                    <button
                        onMouseDown={() => direction !== 'LEFT' && setNextDirection('RIGHT')}
                        className="w-16 h-16 bg-slate-800 border-2 border-slate-700 rounded-2xl flex items-center justify-center active:bg-slate-700 shadow-lg"
                    >
                        <ChevronRight size={40} className="text-white" />
                    </button>
                </div>
            </div>

            <div className="bg-card border-2 border-border/30 rounded-3xl p-8 shadow-sm">
                <h3 className="text-lg font-black mb-6 flex items-center gap-3">
                    <Gamepad2 size={22} className="text-primary" />
                    {isEn ? "How to Play" : "게임 방법"}
                </h3>
                <ul className="grid sm:grid-cols-2 gap-4 text-sm font-medium text-muted-foreground">
                    <li className="flex gap-3">
                        <span className="text-primary font-bold">1.</span>
                        {isEn ? "Use arrow keys or buttons to change the snake's direction." : "상하좌우 방향키 또는 하단 버튼을 눌러 뱀의 방향을 전환하세요."}
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary font-bold">2.</span>
                        {isEn ? "Eat red rubies to grow longer and earn 10 points each." : "빨간색 루비를 먹으면 몸이 길어지고 10점을 획득합니다."}
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary font-bold">3.</span>
                        {isEn ? "The speed increases slightly for every ruby consumed." : "루비를 먹을수록 뱀의 이동 속도가 조금씩 빨라집니다."}
                    </li>
                    <li className="flex gap-3">
                        <span className="text-primary font-bold">4.</span>
                        {isEn ? "The game ends if you hit the wall or your own body." : "벽에 부딪히거나 자신의 몸통에 닿으면 게임이 종료됩니다."}
                    </li>
                </ul>
            </div>

            <ToolGuide
                title={isEn ? "Classic Snake Game Guide" : "스네이크 게임 완벽 가이드"}
                intro={isEn ? "Enjoy the legendary classic Snake Game right in your browser. This version features smooth controls, progressive difficulty, and a sleek modern design, perfectly optimized for both desktop and mobile devices." : "추억의 고전 게임인 스네이크(Snake)를 최신 웹 기술로 재해석했습니다. 먹이를 먹으며 몸집을 불리고, 점점 빨라지는 속도에 맞춰 순발력을 테스트해보세요. 깔끔한 디자인과 부드러운 조작감을 무료로 즐기실 수 있습니다."}
                steps={isEn ? [
                    "Press the Start button or Spacebar to begin characters moving.",
                    "Guide the snake to the red food items using Arrow Keys or WASD.",
                    "Avoid hitting the dark blue walls of the grid.",
                    "Be careful not to cross into your own tail as you grow longer.",
                    "Check your high score and share with others when the game ends."
                ] : [
                    "시작하기 버튼이나 스페이스바를 눌러 게임을 시작합니다.",
                    "방향키(↑, ↓, ←, →)를 이용해 뱀을 조종하여 빨간색 루비(먹이)를 얻으세요.",
                    "상자 바깥 테두리 벽에 부딪히지 않도록 주의하세요.",
                    "몸이 길어질수록 자신의 꼬리에 닿지 않도록 공간을 잘 활용해야 합니다.",
                    "게임이 종료되면 최종 점수를 확인하고 친구들과 기록을 경쟁해보세요."
                ]}
                tips={isEn ? [
                    "Try to stay near the center during early game to give yourself more space.",
                    "Plan your path to avoid trapping yourself in a corner as the snake gets longer.",
                    "Use short, precise taps for turning instead of holding the keys down.",
                    "As speed increases, stay calm and keep your movements rhythmic."
                ] : [
                    "초반에는 중앙 근처에서 활동하며 방향 전환에 익숙해지는 것이 좋습니다.",
                    "뱀의 몸집이 커질수록 구석진 공간보다는 중앙의 넓은 곳을 확보하세요.",
                    "꼬리가 길어지면 자루처럼 말려들어가지 않도록 지그재그로 이동하는 법을 익히세요.",
                    "속도가 빨라질수록 급격한 방향 전환보다는 미리 앞길을 예상하여 움직이세요."
                ]}
                faqs={toolFaqs}
            />
        </div>
    );
};

export default SnakeGame;
