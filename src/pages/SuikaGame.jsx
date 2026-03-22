import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { RefreshCw, Trophy, AlertTriangle, Share2 } from 'lucide-react';
import useUserPreferences from '../hooks/useUserPreferences';
import useShareCanvas from '../hooks/useShareCanvas';
import { useLanguage } from '../context/LanguageContext';

const SuikaGame = () => {
    const { lang } = useLanguage();
    const isEn = lang === 'en';
    const sceneRef = useRef(null);
    const containerRef = useRef(null);
    const engineRef = useRef(null);
    const renderRef = useRef(null);
    const runnerRef = useRef(null);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [nextFruit, setNextFruit] = useState(null);
    const [highScore, setHighScore] = useState(0);
    const { addRecentTool } = useUserPreferences();
    const { shareCanvas } = useShareCanvas();

    // Fruit definitions
    const FRUITS = [
        { label: 'cherry', radius: 15, color: '#FF0000', emoji: '🍒', score: 2 },
        { label: 'strawberry', radius: 25, color: '#FF4444', emoji: '🍓', score: 4 },
        { label: 'grape', radius: 35, color: '#AA44FF', emoji: '🍇', score: 8 },
        { label: 'tangerine', radius: 45, color: '#FFAA00', emoji: '🍊', score: 16 },
        { label: 'lemon', radius: 55, color: '#FFFF00', emoji: '🍋', score: 32 },
        { label: 'peach', radius: 65, color: '#FFCCCC', emoji: '🍑', score: 64 },
        { label: 'pineapple', radius: 75, color: '#FFFF44', emoji: '🍍', score: 128 },
        { label: 'melon', radius: 85, color: '#AAFF44', emoji: '🍈', score: 256 },
        { label: 'watermelon', radius: 95, color: '#44FF44', emoji: '🍉', score: 512 },
        { label: 'coconut', radius: 105, color: '#AA8844', emoji: '🥥', score: 1024 },
        { label: 'star', radius: 120, color: '#FFDD00', emoji: '⭐', score: 2048 },
    ];

    // Load High Score
    useEffect(() => {
        addRecentTool('suika-game');
        const saved = localStorage.getItem('tool-hive-suika-highscore');
        if (saved) setHighScore(parseInt(saved, 10));
    }, []);

    // Save High Score
    useEffect(() => {
        if (score > highScore) {
            setHighScore(score);
            localStorage.setItem('tool-hive-suika-highscore', score);
        }
    }, [score, highScore]);

    const initGame = () => {
        if (!sceneRef.current) return;

        // Cleanup existing
        if (engineRef.current) {
            if (runnerRef.current) Matter.Runner.stop(runnerRef.current);
            if (renderRef.current && renderRef.current.cancel) {
                cancelAnimationFrame(renderRef.current.frameId);
            }
            Matter.World.clear(engineRef.current.world);
            Matter.Engine.clear(engineRef.current);
        }

        // Setup Matter.js Engine
        const { Engine, Runner, Bodies, Composite, Events } = Matter;

        const engine = Engine.create();
        engineRef.current = engine;

        // Mobile responsive dimensions
        const width = Math.min(window.innerWidth - 32, 450);
        const height = 650;

        // Setup Canvas manually
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.touchAction = 'none';

        sceneRef.current.innerHTML = '';
        sceneRef.current.appendChild(canvas);

        const ctx = canvas.getContext('2d');

        // Collision Categories
        const defaultCategory = 0x0001,
            sensorCategory = 0x0002, // Sensor
            fruitCategory = 0x0004;

        // Create Walls
        const wallOptions = {
            isStatic: true,
            label: 'wall',
            render: { fillStyle: '#94a3b8' },
            restitution: 0.2,
            friction: 0.1,
            collisionFilter: { mask: fruitCategory } // Walls collide with fruits
        };

        const ground = Bodies.rectangle(width / 2, height + 30, width + 200, 60, wallOptions);
        const leftWall = Bodies.rectangle(-30, height / 2, 60, height * 2, wallOptions);
        const rightWall = Bodies.rectangle(width + 30, height / 2, 60, height * 2, wallOptions);

        // Top "Danger Line" Sensor
        const topSensor = Bodies.rectangle(width / 2, 100, width, 5, {
            isStatic: true,
            isSensor: true,
            label: 'topSensor',
            collisionFilter: {
                category: sensorCategory,
                mask: 0 // Do not collide with anything
            }
        });

        Composite.add(engine.world, [ground, leftWall, rightWall, topSensor]);

        // Input Handling State
        let currentDropper = null;
        let isDropping = false;

        // Initial fruit setup
        let nextFruitIndex = Math.floor(Math.random() * 3);
        setNextFruit(FRUITS[nextFruitIndex]);

        // Helper to spawn a new dropper fruit
        const spawnDropper = () => {
            isDropping = false;

            const fruitInfo = FRUITS[nextFruitIndex];
            currentDropper = Bodies.circle(width / 2, 50, fruitInfo.radius, {
                isStatic: true,
                render: {
                    fillStyle: fruitInfo.color,
                },
                label: `fruit_${nextFruitIndex}`,
                collisionFilter: {
                    category: fruitCategory,
                    mask: defaultCategory | fruitCategory
                },
                sleepThreshold: -1 // Prevent sleeping
            });
            currentDropper.fruitIndex = nextFruitIndex;
            currentDropper.createdAt = Date.now(); // Add timestamp for game over safety
            Composite.add(engine.world, currentDropper);

            // Prepare next fruit
            nextFruitIndex = Math.floor(Math.random() * 3);
            setNextFruit(FRUITS[nextFruitIndex]);
        };

        spawnDropper();

        // Custom Render Loop
        const renderLoop = () => {
            if (!ctx) return;

            // Clear Canvas
            ctx.fillStyle = '#f8fafc';
            ctx.fillRect(0, 0, width, height);

            // Draw Danger Line (Styled)
            const dangerY = 100;
            ctx.beginPath();
            ctx.moveTo(0, dangerY);
            ctx.lineTo(width, dangerY);
            ctx.setLineDash([10, 10]); // Dashed line
            ctx.strokeStyle = '#FF6B6B'; // Soft red
            ctx.lineWidth = 3;
            ctx.stroke();
            ctx.setLineDash([]); // Reset dash

            // Danger Label
            const labelText = isEn ? "⚠️ WARNING ⚠️" : "⚠️ 경고 ⚠️";
            ctx.font = "bold 14px Pretendard, sans-serif";
            
            ctx.fillStyle = "rgba(255, 107, 107, 0.1)";
            ctx.fillRect(0, dangerY - 25, width, 25);

            ctx.fillStyle = "#FF6B6B";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(labelText, width / 2, dangerY - 12);

            // Fetch all bodies
            const bodies = Composite.allBodies(engine.world);

            bodies.forEach(body => {
                if (body.render.visible === false) return;

                ctx.beginPath();
                const vertices = body.vertices;
                ctx.moveTo(vertices[0].x, vertices[0].y);
                for (let j = 1; j < vertices.length; j += 1) {
                    ctx.lineTo(vertices[j].x, vertices[j].y);
                }
                ctx.lineTo(vertices[0].x, vertices[0].y);
                ctx.closePath();

                ctx.fillStyle = body.render.fillStyle || '#000000';
                ctx.fill();

                ctx.strokeStyle = 'rgba(0,0,0,0.2)'; // Subtle border
                ctx.lineWidth = 1;
                ctx.stroke();

                if (body.label && body.label.startsWith('fruit_')) {
                    if (Math.abs(body.position.x) < 1 && Math.abs(body.position.y) < 1) {
                        Composite.remove(engine.world, body);
                        return;
                    }

                    const index = parseInt(body.label.split('_')[1]);
                    const fruit = FRUITS[index];
                    if (fruit) {
                        ctx.save();
                        ctx.translate(body.position.x, body.position.y);
                        ctx.rotate(body.angle || 0);

                        ctx.font = `${fruit.radius * 1.2}px Arial`;
                        ctx.fillStyle = '#000000';
                        ctx.textAlign = "center";
                        ctx.textBaseline = "middle";
                        ctx.fillText(fruit.emoji, 0, fruit.radius * 0.15);

                        ctx.restore();
                    }
                }
            });

            renderRef.current = { frameId: requestAnimationFrame(renderLoop), cancel: true };
        };

        renderLoop();

        // Collision Logic
        Events.on(engine, 'collisionStart', (event) => {
            const pairs = event.pairs;
            for (let i = 0; i < pairs.length; i++) {
                const pair = pairs[i];
                const { bodyA, bodyB } = pair;

                if (bodyA.label && bodyB.label && bodyA.label.startsWith('fruit_') && bodyB.label.startsWith('fruit_')) {
                    const indexA = parseInt(bodyA.label.split('_')[1]);
                    const indexB = parseInt(bodyB.label.split('_')[1]);

                    if (indexA === indexB && indexA < FRUITS.length - 1) {
                        const newMidPoint = {
                            x: (bodyA.position.x + bodyB.position.x) / 2,
                            y: (bodyA.position.y + bodyB.position.y) / 2
                        };

                        Composite.remove(engine.world, [bodyA, bodyB]);

                        const nextIndex = indexA + 1;
                        const nxtFrt = FRUITS[nextIndex];

                        const newBody = Bodies.circle(newMidPoint.x, newMidPoint.y, nxtFrt.radius, {
                            render: { fillStyle: nxtFrt.color },
                            label: `fruit_${nextIndex}`,
                            restitution: 0.2,
                            collisionFilter: {
                                category: fruitCategory,
                                mask: defaultCategory | fruitCategory
                            }
                        });
                        newBody.fruitIndex = nextIndex;
                        newBody.createdAt = Date.now();
                        Composite.add(engine.world, newBody);

                        setScore(prev => prev + nxtFrt.score);
                    }
                }
            }
        });

        // Game Over Check
        const checkGameOverInterval = setInterval(() => {
            if (gameOver) return;
            const bodies = Composite.allBodies(engine.world);
            const fruits = bodies.filter(b => b.label && b.label.startsWith('fruit_') && !b.isStatic);

            for (const fruit of fruits) {
                if (fruit.position.y < 100 && Math.abs(fruit.velocity.y) < 0.2) {
                    if (fruit.createdAt && Date.now() - fruit.createdAt < 2000) continue;

                    if (!fruit.isStatic) {
                        setGameOver(true);
                        Matter.Runner.stop(runnerRef.current);
                        cancelAnimationFrame(renderRef.current.frameId);
                    }
                }
            }
        }, 1000);

        // Input Functions
        const handleInputMove = (clientX) => {
            const rect = canvas.getBoundingClientRect();
            if (rect.width === 0) return;

            const scaleX = width / rect.width;
            const x = (clientX - rect.left) * scaleX;

            if (currentDropper && !isDropping) {
                if (!Number.isFinite(x) || isNaN(x)) return;

                const radius = currentDropper.circleRadius || 20;
                const safePadding = 5;
                const minX = radius + safePadding;
                const maxX = width - radius - safePadding;

                const clampedX = Math.max(minX, Math.min(maxX, x));

                Matter.Body.setPosition(currentDropper, { x: clampedX, y: 50 });
            }
        };

        const handleInputEnd = () => {
            if (currentDropper && !isDropping) {
                isDropping = true;

                let dropX = currentDropper.position.x;
                const dropY = 50;

                if (Math.abs(dropX) < 1) dropX = width / 2;

                const radius = currentDropper.circleRadius || 20;
                const minX = radius + 5;
                const maxX = width - radius - 5;
                dropX = Math.max(minX, Math.min(maxX, dropX));

                Composite.remove(engine.world, currentDropper);

                const nextIndex = currentDropper.fruitIndex;
                const fruitInfo = FRUITS[nextIndex];

                const fallingFruit = Bodies.circle(dropX, dropY, fruitInfo.radius, {
                    isStatic: false,
                    isSleeping: false,
                    render: { fillStyle: fruitInfo.color },
                    label: `fruit_${nextIndex}`,
                    restitution: 0.2,
                    friction: 0.1,
                    density: 0.001,
                    collisionFilter: {
                        category: fruitCategory,
                        mask: defaultCategory | fruitCategory
                    }
                });
                fallingFruit.fruitIndex = nextIndex;
                fallingFruit.createdAt = Date.now();

                Composite.add(engine.world, fallingFruit);
                Matter.Body.setVelocity(fallingFruit, { x: 0, y: 5 });

                currentDropper = null;
                setTimeout(() => {
                    if (!gameOver) spawnDropper();
                }, 600);
            }
        };

        // Listeners
        const onMouseMove = (e) => handleInputMove(e.clientX);
        const onMouseUp = () => handleInputEnd();

        const onTouchMove = (e) => {
            if (e.cancelable) e.preventDefault();
            if (e.touches[0]) handleInputMove(e.touches[0].clientX);
        };
        const onTouchStart = (e) => {
            if (e.cancelable) e.preventDefault();
            if (e.touches[0]) handleInputMove(e.touches[0].clientX);
        };
        const onTouchEnd = (e) => {
            if (e.cancelable) e.preventDefault();
            handleInputEnd();
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);

        canvas.addEventListener('touchmove', onTouchMove, { passive: false });
        canvas.addEventListener('touchstart', onTouchStart, { passive: false });
        canvas.addEventListener('touchend', onTouchEnd);

        // Run Physics Engine
        const runner = Runner.create();
        runnerRef.current = runner;
        Runner.run(runner, engine);

        return () => {
            clearInterval(checkGameOverInterval);
            if (renderRef.current && renderRef.current.cancel) cancelAnimationFrame(renderRef.current.frameId);

            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
            canvas.removeEventListener('touchmove', onTouchMove);
            canvas.removeEventListener('touchstart', onTouchStart);
            canvas.removeEventListener('touchend', onTouchEnd);

            Matter.Runner.stop(runner);
            Matter.World.clear(engine.world);
            Matter.Engine.clear(engine);
        };
    };

    const restartGame = () => {
        setScore(0);
        setGameOver(false);
    };

    useEffect(() => {
        initGame();
        return () => {
            if (runnerRef.current) Matter.Runner.stop(runnerRef.current);
            if (renderRef.current && renderRef.current.cancel) cancelAnimationFrame(renderRef.current.frameId);
            if (engineRef.current) {
                Matter.World.clear(engineRef.current.world);
                Matter.Engine.clear(engineRef.current);
            }
        };
    }, [gameOver]);

    const toolFaqs = isEn ? [
        { q: "How do I make a watermelon?", a: "Merge two melons (🍈). Merging two fruits always results in the next level fruit. The final goal is to merge two watermelons for the max score." },
        { q: "Is there a time limit?", a: "No, you can take as much time as you want to aim. Strategic placement is more important than speed." },
        { q: "What happens if a fruit touches the line?", a: "If a fruit stays above the red dotted line for more than a few seconds, it's game over. Try to keep the stack low!" }
    ] : [
        { q: "수박은 어떻게 만드나요?", a: "멜론(🍈) 2개를 합치면 수박이 됩니다. 과일을 계속 합치다 보면 더 큰 과일이 되고 점수도 올라갑니다." },
        { q: "시간 제한이 따로 있나요?", a: "아니요, 시간 제한은 없으므로 천천히 조준하여 과일을 떨어뜨릴 위치를 결정할 수 있습니다." },
        { q: "빨간 선 위로 올라오면 무조건 종료인가요?", a: "과일이 빨간 점선 위로 올라온 채로 일정 시간이 지나면 게임 오버가 됩니다. 최대한 아래쪽 공간을 효율적으로 사용하세요." }
    ];

    return (
        <div className="max-w-4xl mx-auto space-y-8 px-4">
            <SEO
                title={isEn ? "Suika Game - Merge Fruit Puzzle | Play Free Online" : "수박 게임 (Suika Game) - 과일 합치기 퍼즐 | Utility Hub"}
                description={isEn ? "Play the trending Suika Game (Watermelon Game) online for free! Merge identical fruits to create a giant watermelon. Challenge your high score in this addictive physics puzzle." : "같은 과일을 합쳐 더 큰 과일을 만드는 중독성 있는 퍼즐 게임. 최고 점수에 도전하세요!"}
                keywords={isEn ? "suika game, watermelon game, fruit merge, physics puzzle, online games" : "수박게임, 머지퍼즐, 게임, 퍼즐, 과일합치기, 웹게임"}
                faqs={toolFaqs}
            />

            <div className="flex flex-col items-center">
                <h1 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-emerald-600 mb-8 py-2">
                    {isEn ? 'Suika Game' : '수박 게임'}
                </h1>

                <div className="flex flex-col sm:flex-row gap-6 mb-8 w-full max-w-md">
                    <div className="flex-1 bg-card border-2 border-border/50 rounded-2xl px-6 py-4 text-center shadow-lg">
                        <div className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-1">{isEn ? 'Score' : '현재 점수'}</div>
                        <div className="text-3xl font-black text-primary font-mono">{score}</div>
                    </div>
                    <div className="flex-1 bg-card border-2 border-border/50 rounded-2xl px-6 py-4 text-center shadow-lg">
                        <div className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-1 flex items-center justify-center gap-1">
                            <Trophy className="w-3 h-3 text-yellow-500" /> {isEn ? 'High Score' : '최고 기록'}
                        </div>
                        <div className="text-3xl font-black text-foreground font-mono">{highScore}</div>
                    </div>
                </div>

                <div className="flex items-center gap-3 mb-6 bg-secondary/30 px-6 py-2 rounded-full border border-border/50 text-sm font-bold text-muted-foreground">
                    <span>{isEn ? 'Next Fruit:' : '다음 과일:'}</span>
                    <div className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center text-xl shadow-inner border border-border">
                        {nextFruit ? nextFruit.emoji : '?'}
                    </div>
                </div>

                <div className="relative group w-fit" ref={containerRef}>
                    <div
                        ref={sceneRef}
                        className="border-8 border-slate-200 dark:border-slate-800 rounded-[2.5rem] overflow-hidden bg-slate-50 dark:bg-slate-900 cursor-pointer shadow-2xl touch-none select-none"
                        style={{ maxWidth: '100%', maxHeight: '80vh', minHeight: '650px' }}
                    ></div>

                    {gameOver && (
                        <div className="absolute inset-0 bg-black/70 backdrop-blur-md flex flex-col items-center justify-center p-8 text-white rounded-[2rem] animate-in zoom-in duration-300">
                            <AlertTriangle className="w-20 h-20 text-red-500 mb-4 animate-bounce" />
                            <h3 className="text-4xl font-black mb-4 uppercase italic tracking-tighter">{isEn ? 'Game Over!' : '게임 오버!'}</h3>
                            <div className="text-center mb-10">
                                <p className="text-gray-400 text-xs font-black uppercase tracking-widest mb-1">{isEn ? 'Final Result' : '최종 점수'}</p>
                                <p className="text-6xl font-black text-white font-mono">{score}</p>
                            </div>
                            
                            <div className="flex flex-col gap-4 w-full max-w-xs">
                                <button
                                    onClick={restartGame}
                                    className="flex items-center justify-center gap-3 px-8 py-5 bg-primary text-white rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-xl"
                                >
                                    <RefreshCw className="w-6 h-6" /> {isEn ? 'Play Again' : '다시 시작'}
                                </button>
                                <button
                                    onClick={() => shareCanvas(containerRef.current, 'Suika Game', score)}
                                    className="flex items-center justify-center gap-3 px-8 py-5 bg-slate-700 text-white rounded-2xl font-black text-lg hover:bg-slate-600 transition-all shadow-xl"
                                >
                                    <Share2 className="w-6 h-6" /> {isEn ? 'Share Result' : '결과 공유하기'}
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                <div className="mt-12 flex flex-wrap justify-center gap-4 max-w-xl">
                    {FRUITS.map((fruit, idx) => (
                        <div key={idx} className="flex flex-col items-center group">
                            <div className="text-2xl hover:scale-125 transition-transform cursor-help" title={fruit.label}>
                                {fruit.emoji}
                            </div>
                            {idx < FRUITS.length - 1 && <span className="text-muted-foreground/20 font-black">→</span>}
                        </div>
                    ))}
                </div>
            </div>

            <ToolGuide
                title={isEn ? "Suika Game - Ultimate Guide" : "수박 게임 상세 가이드"}
                intro={isEn ? "Suika Game (also known as Watermelon Game) is a viral physics-based merge puzzle. Your objective is simple: stack and merge identical fruits to create larger varieties, eventually reaching the giant watermelon without crossing the red danger line." : "수박 게임(Suika Game)은 중독성 강한 물리 기반 머지 퍼즐 게임입니다. 과일을 상단에서 떨어뜨려 공간을 효율적으로 채우고, 같은 과일을 합쳐 더 큰 과일을 만드는 것이 목표입니다. 최종 단계인 거대 수박을 만들어 최고 점수에 도전해 보세요!"}
                steps={isEn ? [
                    "Move your mouse (or finger) to adjust the fruit's position at the top.",
                    "Click or tap to drop the fruit into the container.",
                    "Fruits of the same type will automatically merge into a larger fruit upon contact.",
                    "Strategize your drops to prevent smaller fruits from being trapped underneath larger ones.",
                    "Monitor the top red dotted line; if a fruit crosses it and stays there, the game ends."
                ] : [
                    "마우스나 손가락을 좌우로 움직여 과일을 떨어뜨릴 위치를 정합니다.",
                    "클릭하거나 손을 떼면 과일이 상자 안으로 떨어집니다.",
                    "같은 종류의 과일끼리 닿으면 자동으로 다음 단계의 더 큰 과일로 합쳐집니다.",
                    "과일이 계속 쌓여 상단 빨간 점선을 넘어가면 게임이 종료되니 주의하세요.",
                    "작은 과일들이 큰 과일 사이에 갇히지 않도록 전략적으로 배치하는 것이 고득점의 비결입니다."
                ]}
                tips={isEn ? [
                    "Physics is your friend: use the weight and roll of larger fruits to push smaller ones together.",
                    "Keep the stack balanced: Avoid letting one side grow too much taller than the other.",
                    "Think two steps ahead: Pay attention to the 'Next' fruit and plan where it will land.",
                    "Wall bounces: You can sometimes use the side walls to roll fruits into tight spots."
                ] : [
                    "물리 법칙 활용: 과일의 굴러가는 반동을 이용해 멀리 있는 과일을 합칠 수 있습니다.",
                    "무게 중심 잡기: 한쪽으로 과일이 치우치지 않게 골고루 쌓는 것이 안정적입니다.",
                    "다음 과일 확인: 우측 상단에 표시되는 다음 과일을 미리 확인하고 낙하 지점을 결정하세요.",
                    "틈새 공략: 작은 체리나 딸기 등을 구석에 몰아넣어 공간을 확보하는 것이 좋습니다."
                ]}
                faqs={toolFaqs}
            />
        </div>
    );
};

export default SuikaGame;
