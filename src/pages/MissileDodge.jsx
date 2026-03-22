import React, { useRef, useEffect, useCallback, useState } from 'react';
import { Gamepad2, Rocket, Trophy, Play, RotateCcw, Share2 } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import useShareCanvas from '../hooks/useShareCanvas';

/**
 * Missile Dodge Game (미사일 피하기)
 * Fixed size canvas within a responsive container.
 */
const MissileDodge = () => {
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

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 p-4">
            <SEO
                title="미사일 피하기 - 유틸리티 허브"
                description="하늘에서 떨어지는 미사일을 피하고 가장 오래 살아남으세요!"
                keywords="미사일피하기, 게임, 플래시게임, dodge game, missile dodge"
            />

            <div className="max-w-md w-full bg-slate-800 rounded-3xl p-6 shadow-2xl border border-slate-700">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2">
                        <Rocket className="text-blue-400" size={24} />
                        <h1 className="text-2xl font-bold text-white">미사일 피하기</h1>
                    </div>
                    <div className="flex flex-col items-end">
                        <div className="text-slate-400 text-xs uppercase font-semibold">Best Score</div>
                        <div className="text-yellow-400 font-bold flex items-center gap-1 text-xl">
                            <Trophy size={18} />
                            {bestScore}
                        </div>
                    </div>
                </div>

                <div
                    ref={containerRef}
                    className="relative bg-slate-950 rounded-2xl overflow-hidden shadow-inner border border-slate-700 mx-auto"
                    style={{ width: CANVAS_WIDTH, height: CANVAS_HEIGHT }}
                >
                    <canvas
                        ref={canvasRef}
                        width={CANVAS_WIDTH}
                        height={CANVAS_HEIGHT}
                        className="block bg-gradient-to-b from-slate-950 to-indigo-950"
                    />

                    {/* Dashboard */}
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-slate-900/80 backdrop-blur-sm px-4 py-1 rounded-full border border-slate-700">
                        <span className="text-2xl font-black text-white">{score}</span>
                    </div>

                    {/* Start/GameOver Overlays */}
                    {!isPlaying && (
                        <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm flex flex-col items-center justify-center p-8 text-center">
                            {gameOver ? (
                                <>
                                    <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mb-4 border border-red-500/30">
                                        <RotateCcw className="text-red-400" size={40} />
                                    </div>
                                    <h2 className="text-3xl font-black text-white mb-2 uppercase tracking-tighter">Mission Failed</h2>
                                    <p className="text-slate-400 mb-8 font-medium">최종 점수: <span className="text-white">{score}</span></p>
                                    <button
                                        onClick={resetGame}
                                        className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-900/50 flex items-center justify-center gap-2"
                                    >
                                        <RotateCcw size={20} />
                                        재도전 (Space)
                                    </button>
                                    <button
                                        onClick={() => shareCanvas(containerRef.current, '미사일 피하기', score)}
                                        className="w-full py-4 bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 mt-3"
                                    >
                                        <Share2 size={20} />
                                        결과 공유하기
                                    </button>
                                </>
                            ) : (
                                <>
                                    <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mb-4 border border-blue-500/30">
                                        <Play className="text-blue-400 ml-1" size={40} />
                                    </div>
                                    <h2 className="text-3xl font-black text-white mb-2 uppercase tracking-tighter">Ready to Fly?</h2>
                                    <p className="text-slate-400 mb-8 font-medium">방향키(←→)로 미사일을 피하세요!</p>
                                    <button
                                        onClick={resetGame}
                                        className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-900/50 flex items-center justify-center gap-2 uppercase tracking-widest"
                                    >
                                        <Play size={20} />
                                        Start Mission
                                    </button>
                                </>
                            )}
                        </div>
                    )}
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-700/50 text-center">
                        <div className="text-slate-500 text-[10px] font-bold uppercase mb-1">Move Left</div>
                        <div className="text-white font-medium text-sm">Arrow Left</div>
                    </div>
                    <div className="bg-slate-900/50 p-3 rounded-xl border border-slate-700/50 text-center">
                        <div className="text-slate-500 text-[10px] font-bold uppercase mb-1">Move Right</div>
                        <div className="text-white font-medium text-sm">Arrow Right</div>
                    </div>
                </div>
            </div>
        \n            <ToolGuide
                title="미사일 피하기"
                intro="날아오는 미사일을 피해서 살아남으세요!"
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

export default MissileDodge;
