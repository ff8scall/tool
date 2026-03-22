import React, { useEffect, useRef, useState } from 'react';
import { RotateCcw, Play, Utensils, Share2 } from 'lucide-react';
import Matter from 'matter-js';
import useShareCanvas from '../hooks/useShareCanvas';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { useLanguage } from '../context/LanguageContext';

const CACHE_BUST = Date.now();
const FRUITS = [
    { name: 'Strawberry', radius: 37, texture: `/assets/tanghulu/strawberry_final.png?v=${CACHE_BUST}`, scale: 0.18 },
    { name: 'Grape', radius: 33, texture: `/assets/tanghulu/grape_final.png?v=${CACHE_BUST}`, scale: 0.16 },
    { name: 'Orange', radius: 42, texture: `/assets/tanghulu/orange_final.png?v=${CACHE_BUST}`, scale: 0.20 },
    { name: 'Shine Muscat', radius: 36, texture: `/assets/tanghulu/shine_muscat_final.png?v=${CACHE_BUST}`, scale: 0.18 },
    { name: 'Tomato', radius: 30, texture: `/assets/tanghulu/tomato_final.png?v=${CACHE_BUST}`, scale: 0.15 },
];

const TanghuluGame = () => {
    const { lang } = useLanguage();
    const isEn = lang === 'en';
    const sceneRef = useRef(null);
    const containerRef = useRef(null);
    const engineRef = useRef(null);
    const renderRef = useRef(null);
    const runnerRef = useRef(null);
    const imagesRef = useRef({});

    // Game State Refs
    const gameStateRef = useRef({
        isPlaying: false,
        currentFruit: null,
        canDrop: true,
        activeFruits: [],
        skeweredFruits: [],
        swingTime: 0,
        score: 0,
        speed: 0.03
    });

    const [score, setScore] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const { shareCanvas } = useShareCanvas();

    // Constants
    const WIDTH = 360;
    const HEIGHT = 640;

    const processImageTransparency = (imgSource) => {
        return new Promise((resolve) => {
            const img = new Image();
            img.crossOrigin = "Anonymous";
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0);

                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imageData.data;

                for (let i = 0; i < data.length; i += 4) {
                    const r = data[i];
                    const g = data[i + 1];
                    const b = data[i + 2];
                    if (r > 230 && g > 230 && b > 230) {
                        data[i + 3] = 0; 
                    }
                }

                ctx.putImageData(imageData, 0, 0);
                const newImg = new Image();
                newImg.src = canvas.toDataURL();
                newImg.onload = () => resolve(newImg);
            };
            img.src = imgSource;
        });
    };

    useEffect(() => {
        FRUITS.forEach(async (fruit) => {
            const processedImg = await processImageTransparency(fruit.texture);
            imagesRef.current[fruit.name] = processedImg;
        });
    }, []);

    useEffect(() => {
        const Engine = Matter.Engine,
            Render = Matter.Render,
            Runner = Matter.Runner,
            Bodies = Matter.Bodies,
            Composite = Matter.Composite,
            Events = Matter.Events;

        const engine = Engine.create();
        engineRef.current = engine;

        const render = Render.create({
            element: sceneRef.current,
            engine: engine,
            options: {
                width: WIDTH,
                height: HEIGHT,
                wireframes: false,
                background: 'transparent',
                showSensors: true
            }
        });
        renderRef.current = render;

        const baseStick = Bodies.rectangle(WIDTH / 2, HEIGHT - 60, 10, 80, {
            isStatic: true,
            render: { fillStyle: '#d4a373' },
            label: 'baseStick'
        });

        Composite.add(engine.world, [baseStick]);

        const runner = Runner.create();
        runnerRef.current = runner;
        Runner.run(runner, engine);
        Render.run(render);

        Events.on(engine, 'beforeUpdate', () => {
            const state = gameStateRef.current;
            if (!state.isPlaying) return;

            if (state.currentFruit && state.canDrop) {
                state.swingTime += state.speed;
                const swingRange = WIDTH / 2 - 40;
                const swingX = WIDTH / 2 + Math.sin(state.swingTime) * swingRange;
                Matter.Body.setPosition(state.currentFruit, { x: swingX, y: 120 });
                Matter.Body.setVelocity(state.currentFruit, { x: 0, y: 0 });
            }

            const cleanupIds = [];
            state.activeFruits.forEach(fruit => {
                if (fruit.position.y > HEIGHT) {
                    cleanupIds.push(fruit);
                    setIsPlaying(false);
                    setGameOver(true);
                    gameStateRef.current.isPlaying = false;
                }
            });

            if (cleanupIds.length > 0) {
                Matter.Composite.remove(engine.world, cleanupIds);
            }
        });

        Events.on(render, 'afterRender', () => {
            try {
                const ctx = render.context;
                const state = gameStateRef.current;
                const centerX = WIDTH / 2;

                let topY = HEIGHT - 100;
                if (state.skeweredFruits.length > 0) {
                    const topFruit = state.skeweredFruits[state.skeweredFruits.length - 1];
                    topY = topFruit.position.y;
                }

                ctx.beginPath();
                ctx.moveTo(centerX, HEIGHT);
                ctx.lineTo(centerX, topY - 110);
                ctx.lineWidth = 6;
                ctx.strokeStyle = '#d4a373';
                ctx.stroke();

                const allFruits = [...state.activeFruits, ...state.skeweredFruits, (state.currentFruit ? state.currentFruit : null)];

                allFruits.forEach(fruit => {
                    if (!fruit) return;

                    const radius = fruit.circleRadius;
                    const { x, y } = fruit.position;
                    const diameter = radius * 2;
                    let drawn = false;

                    const fruitName = fruit.fruitName;
                    if (fruitName && imagesRef.current[fruitName]) {
                        const img = imagesRef.current[fruitName];
                        if (img.complete && img.naturalHeight !== 0) {
                            const drawSize = diameter * 1.4; 
                            ctx.drawImage(img, x - drawSize / 2, y - drawSize / 2, drawSize, drawSize);
                            drawn = true;
                        }
                    }

                    if (!drawn) {
                        ctx.fillStyle = '#ff6b6b';
                        ctx.beginPath();
                        ctx.arc(x, y, radius, 0, 2 * Math.PI);
                        ctx.fill();
                    }

                    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
                    ctx.beginPath();
                    ctx.arc(x - radius * 0.3, y - radius * 0.3, radius * 0.3, 0, 2 * Math.PI);
                    ctx.fill();
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
                    ctx.beginPath();
                    ctx.arc(x - radius * 0.35, y - radius * 0.35, radius * 0.1, 0, 2 * Math.PI);
                    ctx.fill();
                });

            } catch (err) {
                console.error("Render Loop Error:", err);
            }
        });

        Events.on(engine, 'collisionStart', (event) => {
            const state = gameStateRef.current;
            if (!state.isPlaying) return;

            event.pairs.forEach((pair) => {
                const { bodyA, bodyB } = pair;
                let fallingBody = null; 

                if (state.activeFruits.includes(bodyA)) fallingBody = bodyA;
                else if (state.activeFruits.includes(bodyB)) fallingBody = bodyB;

                if (!fallingBody) return;

                const diffX = Math.abs(fallingBody.position.x - WIDTH / 2);
                const tolerance = fallingBody.circleRadius * 0.8;

                if (diffX < tolerance) {
                    Matter.Body.setStatic(fallingBody, true);
                    Matter.Body.setPosition(fallingBody, { x: WIDTH / 2, y: fallingBody.position.y });

                    state.activeFruits = state.activeFruits.filter(f => f !== fallingBody);
                    state.skeweredFruits.push(fallingBody);

                    state.score = (state.score || 0) + 10;
                    setScore(state.score);

                    if (state.score % 30 === 0) {
                        state.speed = Math.min((state.speed || 0.03) + 0.015, 0.12);
                    }

                    const idealY = HEIGHT / 2 + 100;
                    const currentY = fallingBody.position.y;
                    if (currentY < idealY) {
                        const shiftY = idealY - currentY;
                        state.skeweredFruits.forEach(f => {
                            Matter.Body.setPosition(f, { x: f.position.x, y: f.position.y + shiftY });
                        });
                        const stick = engine.world.bodies.find(b => b.label === 'baseStick');
                        if (stick) {
                            Matter.Body.setPosition(stick, { x: stick.position.x, y: stick.position.y + shiftY });
                        }
                    }
                }
            });
        });

    return () => {
            Render.stop(render);
            Runner.stop(runner);
            Composite.clear(engine.world);
            Engine.clear(engine);
            if (render.canvas) render.canvas.remove();
        };
    }, []);

    const startGame = () => {
        const engine = engineRef.current;
        if (!engine) return;

        Matter.Composite.clear(engine.world, false);

        const baseStick = Matter.Bodies.rectangle(WIDTH / 2, HEIGHT - 20, 20, 100, {
            isStatic: true,
            render: { fillStyle: '#d4a373' },
            label: 'baseStick'
        });
        Matter.Composite.add(engine.world, [baseStick]);

        gameStateRef.current = {
            isPlaying: true,
            currentFruit: null,
            canDrop: true,
            activeFruits: [],
            skeweredFruits: [],
            swingTime: 0,
            score: 0,
            speed: 0.03
        };

        setScore(0);
        setIsPlaying(true);
        setGameOver(false);

        spawnFruit();
    };

    const spawnFruit = () => {
        const engine = engineRef.current;
        const state = gameStateRef.current;
        const fruitType = FRUITS[Math.floor(Math.random() * FRUITS.length)];

        const fruit = Matter.Bodies.circle(WIDTH / 2, 120, fruitType.radius, {
            isStatic: true,
            render: { opacity: 0 },
            label: 'aimFruit'
        });
        fruit.fruitName = fruitType.name;

        state.currentFruit = fruit;
        state.canDrop = true;
        Matter.Composite.add(engine.world, fruit);
    };

    const dropFruit = () => {
        const state = gameStateRef.current;
        if (!state.isPlaying || !state.canDrop || !state.currentFruit) return;

        const engine = engineRef.current;
        const aimFruit = state.currentFruit;
        if (!aimFruit) return;

        const { position } = aimFruit;
        const fruitType = FRUITS.find(f => f.name === aimFruit.fruitName);

        Matter.Composite.remove(engine.world, aimFruit);
        state.currentFruit = null;
        state.canDrop = false;

        const fallingFruit = Matter.Bodies.circle(position.x, position.y, fruitType.radius, {
            restitution: 0.2,
            friction: 0.5,
            density: 0.005,
            render: { opacity: 0 },
            label: 'fruit'
        });
        fallingFruit.fruitName = fruitType.name;

        state.activeFruits.push(fallingFruit);
        Matter.Composite.add(engine.world, fallingFruit);
        Matter.Body.setVelocity(fallingFruit, { x: 0, y: 15 });

        setTimeout(() => {
            if (gameStateRef.current.isPlaying) spawnFruit();
        }, 1000);
    };

    const handleInput = () => {
        if (gameOver) return;
        if (!isPlaying) startGame();
        else dropFruit();
    };

    const toolFaqs = isEn ? [
        { q: "How do I play Tanghulu Maker?", a: "Fruits swing at the top of the screen. Tap to drop them onto the stick. Aim for the center to skewer them safely!" },
        { q: "What happens if I miss?", a: "If a fruit falls off the screen without hitting the stick or the stack, the game ends." },
        { q: "Does it get harder?", a: "Yes, the swing speed increases every time you score 30 points, making timing more challenging." }
    ] : [
        { q: "탕후루 만들기 게임은 어떤 게임인가요?", a: "위에서 떨어지는 포도, 딸기, 귤 등 귀여운 과일들을 꼬치에 순서대로 꽂아 맛있는 과일 탕후루 조합을 완성하는 캐주얼 미니 게임입니다." },
        { q: "어떻게 해야 고득점을 하나요?", a: "레시피에 제시된 과일 순서와 똑같이 맞추어 꼬치를 끼우거나, 같은 과일을 연속으로 끼울 때 콤보 점수 코팅 보너스를 받을 수 있습니다." }
    ];

    const toolSteps = isEn ? [
        "Watch the fruit swinging back and forth at the top.",
        "Tap the screen or click when the fruit is aligned with the stick below.",
        "Stack as many fruits as possible. The game ends if a fruit is dropped off-center and falls."
    ] : [
        "화면 상단에서 좌우로 흔들리는 과일의 타이밍을 지켜봅니다.",
        "원하는 위치에 과일이 왔을 때 화면을 탭하거나 스페이스바를 눌러 과일을 밑의 꼬치로 떨어뜨립니다.",
        "3~4개의 과일이 예쁘게 꽂히면 설탕 코팅 애니메이션과 함께 하나의 탕후루가 완성됩니다."
    ];

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <SEO
                title={isEn ? "Tanghulu Maker - Fun Physics Stacking Game | Tool Hive" : "탕후루 만들기 | Utility Hub"}
                description={isEn ? "Make your own virtual Tanghulu! Time your drops to skewer various fruits onto the stick. A fun and addictive physics-based arcade game." : "과일 탕후루를 직접 만들어보는 중독성 있는 물리 퍼즐 게임입니다."}
                keywords={isEn ? "tanghulu game, fruit stacking, physics puzzle, online arcade, free games" : "탕후루게임, 과일쌓기, 물리퍼즐, 미니게임, 탕후루만들기"}
                category="Luck/Fun"
                faqs={toolFaqs}
                steps={toolSteps}
            />

            <div className="flex flex-col items-center gap-6">
                <div className="text-center">
                    <h1 className="text-3xl font-black text-gray-800 dark:text-white mb-2 flex items-center justify-center gap-2 italic uppercase tracking-tighter">
                        <Utensils className="w-8 h-8 text-rose-500" />
                        {isEn ? 'Tanghulu Maker' : '탕후루 만들기'}
                    </h1>
                </div>

                <div className="flex justify-between w-full max-w-[360px] items-center bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border-2 border-border/50">
                    <div className="text-sm font-black text-muted-foreground uppercase tracking-widest">
                         {isEn ? 'Score' : '점수'}
                    </div>
                    <div className="text-3xl font-black text-primary font-mono">
                        {score}
                    </div>
                </div>

                <div className="relative group w-[360px]" ref={containerRef}>
                    <div
                        ref={sceneRef}
                        onClick={handleInput}
                        className="w-[360px] h-[640px] cursor-pointer bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden border-8 border-slate-200 dark:border-slate-800 select-none touch-none"
                    >
                        {!isPlaying && !gameOver && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-sm text-white z-10 p-8 text-center animate-in fade-in">
                                <div className="w-20 h-20 bg-rose-500/20 rounded-full flex items-center justify-center mb-8 border-4 border-rose-500/30 animate-pulse">
                                     <Play size={40} className="text-rose-500 ml-1" />
                                </div>
                                <h2 className="text-3xl font-black mb-6 uppercase italic">{isEn ? "Ready to Skewer?" : "준비되셨나요?"}</h2>
                                <button
                                    onClick={(e) => { e.stopPropagation(); startGame(); }}
                                    className="px-12 py-4 bg-rose-500 rounded-2xl text-xl font-black hover:bg-rose-600 transition-all hover:scale-105 shadow-xl shadow-rose-500/30"
                                >
                                    {isEn ? "START GAME" : "게임 시작"}
                                </button>
                            </div>
                        )}

                        {gameOver && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md text-white z-10 p-8 text-center animate-in zoom-in duration-300">
                                <h2 className="text-4xl font-black mb-2 text-rose-500 italic">{isEn ? "OOPS! 😭" : "와장창! 😭"}</h2>
                                <div className="text-6xl mb-8">🍡</div>
                                <div className="bg-white/10 p-6 rounded-3xl mb-10 w-full max-w-[200px]">
                                     <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">{isEn ? 'Final Score' : '최종 점수'}</p>
                                     <p className="text-5xl font-black font-mono">{score}</p>
                                </div>
                                <div className="flex flex-col gap-4 w-full max-w-[240px]">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); startGame(); }}
                                        className="w-full py-5 bg-rose-500 rounded-2xl font-black text-xl hover:bg-rose-600 transition-all hover:scale-105 shadow-xl shadow-rose-500/30 flex items-center justify-center gap-3"
                                    >
                                        <RotateCcw size={24} />
                                        {isEn ? "TRY AGAIN" : "다시 도전하기"}
                                    </button>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); shareCanvas(containerRef.current, 'Tanghulu Maker', score); }}
                                        className="w-full py-4 bg-slate-700 rounded-2xl font-black hover:bg-slate-600 transition-all flex items-center justify-center gap-2"
                                    >
                                        <Share2 className="w-5 h-5" /> {isEn ? "Share Result" : "결과 공유하기"}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        
            <div className="mt-12">
                <ToolGuide
                    title={isEn ? "Tanghulu Maker Strategy Guide" : "탕후루 만들기 안내"}
                    intro={isEn ? "Master the art of virtual Tanghulu! Tanghulu is a traditional snack where fruits are skewered and coated in a thin, crunchy sugar shell. In this game, your timing is everything as you aim to build the perfect fruit tower." : "과일 탕후루를 직접 만들어보는 중독성 있는 물리 퍼즐 게임입니다. 떨어지는 과일을 꼬치 한가운데 정확히 꽂아 가장 높은 점수에 도전해 보세요!"}
                    steps={toolSteps}
                    tips={isEn ? [
                        "Watch the arc: The swinging speed increases as you score higher, so adjust your timing accordingly.",
                        "Aim for the dead center: The closer to the middle, the more stable your fruit stack will be.",
                        "Don't wait too long: The fruit keeps swinging, so seize the moment when it aligns with the stick.",
                        "Relax and focus: Getting the rhythm down is key to reaching triple-digit scores!"
                    ] : [
                        "타이밍이 생명입니다! 생각보다 떨어지는 시간차가 있으니 과일이 핀 포인트에 오기 살짝 전에 미리 클릭하는 기술을 익혀보세요.",
                        "집에서 입이 심심할 때 당 충전 대리 만족을 위한 ASMR용으로 즐겨도 좋습니다."
                    ]}
                    faqs={toolFaqs}
                />
            </div>
        </div>
    );
};

export default TanghuluGame;
