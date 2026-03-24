import React, { useRef, useEffect, useCallback, useState } from 'react';
import { Rocket, Trophy, Play, RotateCcw, Share2 } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import useShareCanvas from '../hooks/useShareCanvas';
import { useLanguage } from '../context/LanguageContext';

/**
 * Missile Dodge Game (미사일 피하기)
 * Fixed size canvas within a responsive container.
 */
const MissileDodge = () => {
    const { lang, t } = useLanguage();
    const isEn = lang === 'en';
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const planeRef = useRef({ x: 200, y: 500, width: 40, height: 40 });
    const missilesRef = useRef([]);
    const requestRef = useRef();
    const lastTimeRef = useRef(0);
    const spawnTimerRef = useRef(0);
    const { shareCanvas } = useShareCanvas();

    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [moveDir, setMoveDir] = useState(0); // -1 left, 1 right, 0 none

    // Constants
    const CANVAS_WIDTH = 400;
    const CANVAS_HEIGHT = 600;
    const PLANE_WIDTH = 40;
    const PLANE_HEIGHT = 40;
    const PLANE_SPEED = 6;
    const MISSILE_WIDTH = 15;
    const MISSILE_HEIGHT = 35;
    const INITIAL_SPAWN_RATE = 1000; // ms
    const GRAVITY = 3;

    // Load best score
    useEffect(() => {
        const saved = localStorage.getItem('missile-dodge-best');
        if (saved) setBestScore(parseInt(saved, 10));
    }, []);

    const resetGame = useCallback(() => {
        planeRef.current = {
            x: CANVAS_WIDTH / 2 - PLANE_WIDTH / 2,
            y: CANVAS_HEIGHT - 80,
            width: PLANE_WIDTH,
            height: PLANE_HEIGHT,
        };
        missilesRef.current = [];
        spawnTimerRef.current = 0;
        setScore(0);
        setGameOver(false);
        setIsPlaying(true);
        setMoveDir(0);
        lastTimeRef.current = performance.now();
    }, []);

    const spawnMissile = useCallback(() => {
        const x = Math.random() * (CANVAS_WIDTH - MISSILE_WIDTH);
        missilesRef.current.push({
            x,
            y: -MISSILE_HEIGHT,
            width: MISSILE_WIDTH,
            height: MISSILE_HEIGHT,
            speed: GRAVITY + Math.random() * 2 // slightly varied speeds
        });
    }, []);

    const updateGame = useCallback((time) => {
        if (!isPlaying || gameOver) return;

        const deltaTime = time - lastTimeRef.current;
        lastTimeRef.current = time;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        // 1. Clear
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

        // 2. Spawn Missiles
        spawnTimerRef.current += deltaTime;
        const currentSpawnRate = Math.max(300, INITIAL_SPAWN_RATE - (score * 10)); // Faster as score increases
        if (spawnTimerRef.current > currentSpawnRate) {
            spawnMissile();
            spawnTimerRef.current = 0;
        }

        // 3. Move Plane
        if (moveDir !== 0) {
            planeRef.current.x += moveDir * PLANE_SPEED;
            // Bound check
            if (planeRef.current.x < 0) planeRef.current.x = 0;
            if (planeRef.current.x > CANVAS_WIDTH - PLANE_WIDTH)
                planeRef.current.x = CANVAS_WIDTH - PLANE_WIDTH;
        }

        // 4. Draw Plane
        ctx.fillStyle = '#60A5FA'; // Light blue
        ctx.beginPath();
        // Simple jet shape
        const { x, y } = planeRef.current;
        ctx.moveTo(x + PLANE_WIDTH / 2, y);
        ctx.lineTo(x, y + PLANE_HEIGHT);
        ctx.lineTo(x + PLANE_WIDTH, y + PLANE_HEIGHT);
        ctx.closePath();
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#60A5FA';
        ctx.fill();
        ctx.shadowBlur = 0;

        // 5. Update & Draw Missiles
        ctx.fillStyle = '#F87171'; // Red
        missilesRef.current = missilesRef.current.filter(m => {
            m.y += m.speed;

            // Draw
            ctx.fillRect(m.x, m.y, m.width, m.height);

            // Score if passed
            if (m.y > CANVAS_HEIGHT) {
                setScore(s => s + 1);
                return false;
            }

            // Collision Check
            const p = planeRef.current;
            const hitPadding = 5;
            if (
                p.x + hitPadding < m.x + m.width &&
                p.x + p.width - hitPadding > m.x &&
                p.y + hitPadding < m.y + m.height &&
                p.y + p.height - hitPadding > m.y
            ) {
                setGameOver(true);
                setIsPlaying(false);
                if (score + 1 > bestScore) {
                    setBestScore(score + 1);
                    localStorage.setItem('missile-dodge-best', score + 1);
                }
            }
            return true;
        });

        requestRef.current = requestAnimationFrame(updateGame);
    }, [isPlaying, gameOver, score, bestScore, spawnMissile, moveDir]);

    useEffect(() => {
        if (isPlaying && !gameOver) {
            requestRef.current = requestAnimationFrame(updateGame);
        }
        return () => cancelAnimationFrame(requestRef.current);
    }, [isPlaying, gameOver, updateGame]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowLeft') setMoveDir(-1);
            if (e.key === 'ArrowRight') setMoveDir(1);
            if (e.key === ' ' && !isPlaying) resetGame();
        };
        const handleKeyUp = (e) => {
            if (e.key === 'ArrowLeft' && moveDir === -1) setMoveDir(0);
            if (e.key === 'ArrowRight' && moveDir === 1) setMoveDir(0);
        };
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [isPlaying, moveDir, resetGame]);

    const toolFaqs = isEn ? [
        { q: "How do I play Missile Dodge?", a: "Use your Left and Right arrow keys to move your spacecraft. Avoid the red missiles falling from the top. Every missile that passes you increases your score." },
        { q: "Does the game get harder?", a: "Yes, as your score increases, the interval between missile spawns decreases, making the rain more intense." },
        { q: "Can I play on mobile?", a: "Yes, you can tap the on-screen buttons to fly your mission even on the go." }
    ] : [
        { q: "미사일 피하기는 어떻게 플레이하나요?", a: "좌우 방향키를 사용하여 비행기를 움직여보세요. 위에서 떨어지는 붉은 미사일을 피하면 됩니다." },
        { q: "점수가 오르면 더 어려워지나요?", a: "네, 점수가 올라갈수록 미사일이 생성되는 간격이 짧아져 피하기가 더 까다로워집니다." },
        { q: "모바일에서도 가능한가요?", a: "네, 모바일 기기에서도 화면의 버튼을 터치하여 간편하게 플레이할 수 있습니다." }
    ];

    const toolSteps = isEn ? [
        "Click the 'Engage Mission' button to start the game.",
        "Use the Left and Right arrow keys (or on-screen buttons) to maneuver.",
        "Avoid any contact with red missiles falling from above.",
        "If you are hit, the mission ends. Try to beat your personal best!"
    ] : [
        "'작전 시작' 버튼을 눌러 비행 통제를 시작합니다.",
        "키보드의 좌우 방향키 혹은 화면 하단의 큰 버튼을 터치하여 움직입니다.",
        "붉은색 미사일은 충돌 즉시 폭발하므로 틈새를 정교하게 파고들어 피하세요.",
        "충돌 시 작전이 종료되며, 획득한 최종 점수를 친구들에게 공유해보세요!"
    ];

    const toolTips = isEn ? [
        "Focus on the missiles near the center of the screen to anticipate their paths.",
        "Make micro-adjustments rather than holding the direction keys too long.",
        "As the score goes up, the missiles spawn faster. Keep your focus high!",
        "Use the side walls effectively to roll away from dense clusters."
    ] : [
        "화면 상단보다는 비행기 주변 1/3 지점에 시선을 두면 미사일 궤적을 예측하기 쉽습니다.",
        "조금씩 끊어서 이동하는 미세 조종법이 대량의 미사일을 피할 때 유리합니다.",
        "점수가 높아질수록 미사일 사이의 간격이 좁아지니 미리 한쪽 공간을 확보하세요.",
        "모바일 터치 조작 시에는 리드미컬하게 버튼을 눌러 관성을 제어하는 것이 좋습니다."
    ];

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 p-4">
            <SEO
                title={t('tools.missile-dodge.title')}
                description={t('tools.missile-dodge.description')}
                keywords={isEn ? "missile dodge, reflex game, survival game, arcade game, avoid game" : "미사일피하기, 게임, 플래시게임, dodge game, missile dodge"}
                faqs={toolFaqs}
                steps={toolSteps}
            />

            <div className="max-w-md w-full bg-slate-800 rounded-[2.5rem] p-6 shadow-2xl border-4 border-slate-700/50">
                <div className="flex justify-between items-center mb-6 px-2">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-500/20 rounded-xl">
                            <Rocket className="text-blue-400" size={24} />
                        </div>
                        <h1 className="text-2xl font-black text-white italic tracking-tighter uppercase italic">{isEn ? 'Missile Dodge' : '미사일 피하기'}</h1>
                    </div>
                    <div className="flex flex-col items-end">
                        <div className="text-slate-500 text-[9px] uppercase font-black tracking-widest leading-none mb-1">{isEn ? 'Best Score' : '최고 기록'}</div>
                        <div className="text-yellow-400 font-black flex items-center gap-1 text-xl italic">
                            <Trophy size={16} className="fill-current" />
                            {bestScore}
                        </div>
                    </div>
                </div>

                <div
                    ref={containerRef}
                    className="relative bg-black rounded-3xl overflow-hidden shadow-2xl border-2 border-slate-700 mx-auto"
                    style={{ width: CANVAS_WIDTH, height: CANVAS_HEIGHT }}
                >
                    <canvas
                        ref={canvasRef}
                        width={CANVAS_WIDTH}
                        height={CANVAS_HEIGHT}
                        className="block bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950"
                    />

                    {/* Dashboard */}
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-slate-900/60 backdrop-blur-md px-6 py-2 rounded-2xl border border-white/10 shadow-xl">
                        <span className="text-3xl font-black text-white italic font-mono">{score}</span>
                    </div>

                    {/* Start/GameOver Overlays */}
                    {!isPlaying && (
                        <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-300">
                            {gameOver ? (
                                <div className="space-y-6 animate-in zoom-in-95 duration-500">
                                    <div className="w-24 h-24 bg-rose-500/20 rounded-full flex items-center justify-center mx-auto border-2 border-rose-500/30 shadow-2xl shadow-rose-500/20 animate-pulse">
                                        <RotateCcw className="text-rose-500" size={48} />
                                    </div>
                                    <div className="space-y-1">
                                        <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter">{isEn ? 'Mission Failed' : '작전 실패'}</h2>
                                        <p className="text-slate-400 font-black uppercase text-xs tracking-widest">{isEn ? 'Your Performance' : '최종 비행 점수'}</p>
                                    </div>
                                    <div className="text-6xl font-black text-white font-mono italic">{score}</div>
                                    
                                    <div className="flex flex-col gap-3 w-full max-w-[240px] mx-auto pt-4">
                                        <button
                                            onClick={resetGame}
                                            className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl transition-all shadow-xl shadow-blue-600/20 active:scale-95 flex items-center justify-center gap-2 uppercase italic tracking-wider"
                                        >
                                            <RotateCcw size={20} />
                                            {isEn ? 'Retry (Space)' : '재도전 (Space)'}
                                        </button>
                                        <button
                                            onClick={() => shareCanvas(containerRef.current, isEn ? 'Missile Dodge' : '미사일 피하기', score)}
                                            className="w-full py-3 bg-slate-700 hover:bg-slate-600 text-white font-black rounded-2xl transition-all flex items-center justify-center gap-2 uppercase text-sm tracking-widest"
                                        >
                                            <Share2 size={16} />
                                            {isEn ? 'Share Intel' : '결과 공유하기'}
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-6 animate-in zoom-in-95 duration-500">
                                    <div className="w-24 h-24 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto border-2 border-blue-500/30 shadow-2xl shadow-blue-500/20">
                                        <Play className="text-blue-400 ml-1" size={48} fill="currentColor" />
                                    </div>
                                    <div className="space-y-1">
                                        <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter">{isEn ? 'Ready for Takeoff?' : '이륙 준비 완료?'}</h2>
                                        <p className="text-slate-400 font-medium">{isEn ? 'Dodge missiles using Arrow keys (←→)' : '방향키(←→)를 움직여 미사일을 피하세요!'}</p>
                                    </div>
                                    <button
                                        onClick={resetGame}
                                        className="w-full py-5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black rounded-3xl transition-all shadow-2xl shadow-blue-600/30 flex items-center justify-center gap-3 uppercase tracking-widest italic animate-pulse"
                                    >
                                        <Play size={24} fill="currentColor" />
                                        {isEn ? 'Engage Mission' : '작전 시작'}
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4">
                    <button 
                        onMouseDown={() => setMoveDir(-1)}
                        onMouseUp={() => setMoveDir(0)}
                        onMouseLeave={() => setMoveDir(0)}
                        onTouchStart={() => setMoveDir(-1)}
                        onTouchEnd={() => setMoveDir(0)}
                        className="bg-slate-900 border-2 border-slate-700/50 hover:bg-slate-800 p-6 rounded-[2rem] text-center transition-all active:scale-95 active:bg-blue-500/10 active:border-blue-500/50 group"
                    >
                        <div className="text-blue-500/40 font-black uppercase tracking-widest text-[10px] mb-2 group-active:text-blue-400">{isEn ? 'Port' : '좌현'}</div>
                        <div className="text-white font-black text-2xl">←</div>
                    </button>
                    <button 
                        onMouseDown={() => setMoveDir(1)}
                        onMouseUp={() => setMoveDir(0)}
                        onMouseLeave={() => setMoveDir(0)}
                        onTouchStart={() => setMoveDir(1)}
                        onTouchEnd={() => setMoveDir(0)}
                        className="bg-slate-900 border-2 border-slate-700/50 hover:bg-slate-800 p-6 rounded-[2rem] text-center transition-all active:scale-95 active:bg-blue-500/10 active:border-blue-500/50 group"
                    >
                        <div className="text-blue-500/40 font-black uppercase tracking-widest text-[10px] mb-2 group-active:text-blue-400">{isEn ? 'Starboard' : '우현'}</div>
                        <div className="text-white font-black text-2xl">→</div>
                    </button>
                </div>
            </div>

            <div className="mt-16 w-full max-w-4xl">
                <ToolGuide
                    title={isEn ? "Missile Dodge Survival Guide" : "미사일 피하기 작전 지침서"}
                    intro={isEn ? "Test your cockpit reflexes in this high-intensity arcade survival game. Navigate your spacecraft through a rain of hostile missiles to secure the highest possible mission time." : "끊임없이 쏟아지는 적의 미사일을 피하며 살아남아야 하는 고전 아케이드 스타일의 게임입니다. 침착한 조종과 민첩한 순발력으로 최고 기록을 경신하고 전 세계 조종사들과 경쟁해 보세요!"}
                    steps={toolSteps}
                    tips={toolTips}
                    faqs={toolFaqs}
                />
            </div>
        </div>
    );
};

export default MissileDodge;
