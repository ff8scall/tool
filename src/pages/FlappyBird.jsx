import React, { useEffect, useRef, useState, useCallback } from 'react';
import { RefreshCw, Play, Trophy, Share2 } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import useShareCanvas from '../hooks/useShareCanvas';
import { useLanguage } from '../context/LanguageContext';

const FlappyBird = () => {
    const { lang } = useLanguage();
    const isEn = lang === 'en';
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const { shareCanvas } = useShareCanvas();

    // Game constants
    const GRAVITY = 0.02;
    const JUMP_STRENGTH = -1.5; 
    const PIPE_SPEED = 1.5; 
    const PIPE_SPAWN_RATE = 1500; 
    const PIPE_GAP = 208; 
    // mutable refs for dynamic difficulty
    const pipeSpeedRef = useRef(PIPE_SPEED);
    const pipeGapRef = useRef(PIPE_GAP);

    // Game state refs (for loop performance)
    const birdRef = useRef({ y: 300, velocity: 0, radius: 12 });
    const pipesRef = useRef([]);
    const requestRef = useRef();
    const lastTimeRef = useRef(0);
    const scoreRef = useRef(0);

    useEffect(() => {
        const savedBest = localStorage.getItem('flappy-bird-best');
        if (savedBest) setBestScore(parseInt(savedBest));
    }, []);

    const resetGame = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        birdRef.current = {
            y: canvas.height * 0.4,
            velocity: 0, 
            radius: 12
        };
        // reset dynamic difficulty refs
        pipeSpeedRef.current = PIPE_SPEED;
        pipeGapRef.current = PIPE_GAP;
        // reset game state
        pipesRef.current = [];
        scoreRef.current = 0;
        setScore(0);
        setGameOver(false);
        setIsPlaying(true);
        lastTimeRef.current = performance.now();
    }, []);

    const jump = useCallback(() => {
        if (gameOver) return;
        if (!isPlaying) {
            resetGame();
            return;
        }
        birdRef.current.velocity = JUMP_STRENGTH;
    }, [gameOver, isPlaying, resetGame]);

    const updateGame = useCallback((time) => {
        if (!isPlaying || gameOver) {
            if (!gameOver) requestRef.current = requestAnimationFrame(updateGame);
            return;
        }

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        
        // 1. Update Bird
        birdRef.current.velocity += GRAVITY;
        birdRef.current.y += birdRef.current.velocity;

        // Floor/Ceiling collision
        if (birdRef.current.y + birdRef.current.radius > canvas.height - 20 || birdRef.current.y - birdRef.current.radius < 0) {
            setGameOver(true);
            setIsPlaying(false);
            updateBestScore();
        }

        // 2. Update Pipes
        if (pipesRef.current.length === 0 || canvas.width - pipesRef.current[pipesRef.current.length - 1].x > 300) {
            const minPipeHeight = 50;
            const maxPipeHeight = canvas.height - pipeGapRef.current - minPipeHeight - 20; 
            const topHeight = Math.floor(Math.random() * (maxPipeHeight - minPipeHeight + 1)) + minPipeHeight;

            pipesRef.current.push({
                x: canvas.width,
                topHeight: topHeight,
                passed: false
            });
        }

        pipesRef.current.forEach(pipe => {
            pipe.x -= pipeSpeedRef.current;
        });

        // Remove off-screen pipes
        if (pipesRef.current.length > 0 && pipesRef.current[0].x < -60) {
            pipesRef.current.shift();
        }

        // 3. Collision Detection & Scoring
        pipesRef.current.forEach(pipe => {
            const hitBoxPadding = 10; 
            const birdLeft = 50 - birdRef.current.radius + hitBoxPadding;
            const birdRight = 50 + birdRef.current.radius - hitBoxPadding;
            const birdTop = birdRef.current.y - birdRef.current.radius + hitBoxPadding;
            const birdBottom = birdRef.current.y + birdRef.current.radius - hitBoxPadding;

            const pipeLeft = pipe.x;
            const pipeRight = pipe.x + 60; 
            const topPipeBottom = pipe.topHeight;
            const bottomPipeTop = pipe.topHeight + pipeGapRef.current;

            if (birdRight > pipeLeft && birdLeft < pipeRight) {
                if (birdTop < topPipeBottom || birdBottom > bottomPipeTop) {
                    setGameOver(true);
                    setIsPlaying(false);
                    updateBestScore();
                }
            }

            if (!pipe.passed && birdLeft > pipeRight) {
                pipe.passed = true;
                scoreRef.current += 1;
                setScore(curr => curr + 1);
                if (scoreRef.current % 10 === 0) {
                    pipeSpeedRef.current *= 1.05; 
                    pipeGapRef.current *= 0.95;   
                }
            }
        });

        draw(ctx);
        lastTimeRef.current = time;
        requestRef.current = requestAnimationFrame(updateGame);
    }, [isPlaying, gameOver]);

    const draw = (ctx) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Background
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, '#60a5fa'); 
        gradient.addColorStop(1, '#93c5fd'); 
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Pipes
        ctx.fillStyle = '#22c55e'; 
        ctx.strokeStyle = '#15803d'; 
        ctx.lineWidth = 2;

        pipesRef.current.forEach(pipe => {
            ctx.fillRect(pipe.x, 0, 60, pipe.topHeight);
            ctx.strokeRect(pipe.x, 0, 60, pipe.topHeight);

            ctx.fillRect(pipe.x, pipe.topHeight + pipeGapRef.current, 60, canvas.height - (pipe.topHeight + pipeGapRef.current) - 20); 
            ctx.strokeRect(pipe.x, pipe.topHeight + pipeGapRef.current, 60, canvas.height - (pipe.topHeight + pipeGapRef.current) - 20);

            ctx.fillStyle = '#4ade80'; 
            ctx.fillRect(pipe.x - 2, pipe.topHeight - 20, 64, 20);
            ctx.strokeRect(pipe.x - 2, pipe.topHeight - 20, 64, 20);

            ctx.fillRect(pipe.x - 2, pipe.topHeight + pipeGapRef.current, 64, 20);
            ctx.strokeRect(pipe.x - 2, pipe.topHeight + pipeGapRef.current, 64, 20);

            ctx.fillStyle = '#22c55e'; 
        });

        // Floor
        ctx.fillStyle = '#d97706'; 
        ctx.fillRect(0, canvas.height - 20, canvas.width, 20);
        ctx.fillStyle = '#4ade80'; 
        ctx.fillRect(0, canvas.height - 25, canvas.width, 5);

        // Bird
        ctx.beginPath();
        ctx.arc(50, birdRef.current.y, birdRef.current.radius, 0, Math.PI * 2);
        ctx.fillStyle = '#fbbf24'; 
        ctx.fill();
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(58, birdRef.current.y - 5, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.fill();
        ctx.beginPath();
        ctx.arc(60, birdRef.current.y - 5, 2, 0, Math.PI * 2);
        ctx.fillStyle = '#000';
        ctx.fill();

        ctx.beginPath();
        ctx.ellipse(45, birdRef.current.y + 5, 8, 5, -0.2, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(60, birdRef.current.y + 2);
        ctx.lineTo(70, birdRef.current.y + 5);
        ctx.lineTo(62, birdRef.current.y + 10);
        ctx.fillStyle = '#ef4444'; 
        ctx.fill();
    };

    const updateBestScore = () => {
        if (scoreRef.current > bestScore) {
            setBestScore(scoreRef.current);
            localStorage.setItem('flappy-bird-best', scoreRef.current.toString());
        }
    };

    useEffect(() => {
        requestRef.current = requestAnimationFrame(updateGame);
        return () => cancelAnimationFrame(requestRef.current);
    }, [updateGame]);

    useEffect(() => {
        if (!isPlaying && !gameOver && canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');
            const gradient = ctx.createLinearGradient(0, 0, 0, canvasRef.current.height);
            gradient.addColorStop(0, '#60a5fa');
            gradient.addColorStop(1, '#93c5fd');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);

            ctx.fillStyle = '#d97706';
            ctx.fillRect(0, canvasRef.current.height - 20, canvasRef.current.width, 20);

            ctx.beginPath();
            ctx.arc(canvasRef.current.width / 2, canvasRef.current.height / 2, 20, 0, Math.PI * 2);
            ctx.fillStyle = '#fbbf24';
            ctx.fill();
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 3;
            ctx.stroke();

            ctx.fillStyle = 'white';
            ctx.font = 'bold 30px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(isEn ? "Flappy Bird" : "파닥파닥 버드", canvasRef.current.width / 2, canvasRef.current.height / 2 - 50);

            ctx.font = '20px sans-serif';
            ctx.fillText(isEn ? "Click to Start" : "클릭해서 시작하기", canvasRef.current.width / 2, canvasRef.current.height / 2 + 50);
        }
    }, [isPlaying, gameOver, isEn]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.code === 'Space') {
                e.preventDefault(); 
                jump();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [jump]);

    const toolFaqs = isEn ? [
        { q: "Is the game free?", a: "Yes, Flappy Bird on Tool Hive is 100% free to play without any registration." },
        { q: "Does the difficulty change?", a: "Yes, every 10 points, the pipe speed increases slightly and the gap becomes narrower." },
        { q: "Are my high scores saved?", a: "Your personal best score is saved locally on your browser so you can challenge yourself next time." }
    ] : [
        { q: "게임은 무료인가요?", a: "네! 유틸리티 허브의 모든 게임은 별도의 가입 없이 100% 무료로 즐기실 수 있습니다." },
        { q: "난이도가 점점 높아지나요?", a: "네, 10점을 획득할 때마다 장애물의 이동 속도가 빨라지거나 간격이 좁아질 수 있습니다." },
        { q: "최고 기록이 저장되나요?", a: "네, 브라우저의 로컬 스토리지를 통해 본인의 최고 기록이 자동으로 저장됩니다." }
    ];

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <SEO
                title={isEn ? "Flappy Bird - Fast Reaction Game Online | Tool Hive" : "파닥파닥 버드 - 유틸리티 허브"}
                description={isEn ? "Play the addictive Flappy Bird game online. Fly through gaps, avoid pipes, and challenge your friends to beat your high score!" : "중독성 있는 파닥파닥 버드 게임을 즐겨보세요! 얼마나 멀리 날아갈 수 있을까요?"}
                keywords={isEn ? "flappy bird, arcade game, reaction game, online mini games, bird fly game" : "플래피버드, 게임, 미니게임, 파닥파닥, flappy bird"}
                faqs={toolFaqs}
            />

            <div className="text-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                    {isEn ? "Flappy Bird Challenge" : "파닥파닥 버드"}
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                    {isEn ? "Click the screen or press SPACE to fly!" : "화면을 클릭하거나 스페이스바를 눌러 새를 날리세요!"}
                </p>
            </div>

            <div className="flex flex-col items-center">
                <div className="flex gap-8 mb-4">
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg flex flex-col items-center min-w-[120px]">
                        <span className="text-gray-500 dark:text-gray-400 text-sm font-medium uppercase tracking-wider">{isEn ? 'Score' : '점수'}</span>
                        <span className="text-4xl font-black text-blue-500">{score}</span>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg flex flex-col items-center min-w-[120px]">
                        <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-sm font-medium uppercase tracking-wider">
                            <Trophy size={14} className="text-yellow-500" />
                            <span>{isEn ? 'Best' : '최고'}</span>
                        </div>
                        <span className="text-4xl font-black text-yellow-500">{bestScore}</span>
                    </div>
                </div>

                <div className="relative group" ref={containerRef}>
                    <canvas
                        ref={canvasRef}
                        width={400}
                        height={600}
                        onClick={jump}
                        className="bg-sky-300 rounded-xl shadow-2xl cursor-pointer select-none touch-manipulation max-w-full"
                        style={{ maxHeight: '70vh' }}
                    />

                    {gameOver && (
                        <div className="absolute inset-0 bg-black/50 rounded-xl flex flex-col items-center justify-center p-6 backdrop-blur-sm">
                            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl text-center transform scale-110 transition-transform">
                                <h2 className="text-3xl font-black text-gray-800 dark:text-white mb-2">GAME OVER</h2>
                                <div className="flex flex-col gap-1 mb-6">
                                    <span className="text-gray-500 dark:text-gray-400">{isEn ? 'Final Score' : '최종 점수'}</span>
                                    <span className="text-5xl font-bold text-blue-500">{score}</span>
                                </div>

                                <button
                                    onClick={resetGame}
                                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white rounded-xl font-bold text-lg transition-colors shadow-lg hover:shadow-blue-500/30"
                                >
                                    <RefreshCw size={24} />
                                    {isEn ? 'Try Again' : '다시 시작'}
                                </button>
                                <button
                                    onClick={() => shareCanvas(containerRef.current, 'Flappy Bird', score)}
                                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-xl font-bold text-lg transition-colors shadow-lg mt-3"
                                >
                                    <Share2 size={24} />
                                    {isEn ? 'Share Result' : '결과 공유하기'}
                                </button>
                            </div>
                        </div>
                    )}

                    {!isPlaying && !gameOver && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="bg-black/20 p-4 rounded-full backdrop-blur-[2px] animate-pulse">
                                <Play size={48} className="text-white fill-white opacity-90" />
                            </div>
                        </div>
                    )}
                </div>

                <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
                    {isEn ? "Tip: You can use 'Space' key on PC." : "Tip: PC에서는 Space 키를 사용할 수 있습니다."}
                </div>
            </div>

            <ToolGuide
                title={isEn ? "Flappy Bird Master Guide" : "파닥파닥 버드 게임 가이드"}
                intro={isEn ? "Survive as long as possible while flying through gaps between obstacles! This game tests your timing and focus in a simple but addictive arcade format." : "장애물을 피해 최대한 멀리 날아가세요! 간단한 조작으로 누구나 즐길 수 있지만, 높은 점수를 얻으려면 정교한 타이밍 조절이 필수인 중독성 강한 아케이드 게임입니다."}
                steps={isEn ? [
                    "Click the screen or press the Spacebar to make the bird flap its wings.",
                    "Gravity will pull the bird down naturally, so keep clicking to stay airborne.",
                    "Pass through the gaps between the green pipes to earn points.",
                    "The game ends if the bird hits a pipe or the ground."
                ] : [
                    "화면을 클릭하거나 스페이스바를 눌러 새의 날개짓을 유도합니다.",
                    "중력에 의해 아래로 떨어지므로, 적절한 타이밍에 클릭하여 고도를 유지하세요.",
                    "파이프 사이의 좁은 틈을 안전하게 통과하면 점수가 올라갑니다.",
                    "파이프에 부딪히거나 바닥에 닿으면 게임이 종료되니 주의하세요."
                ]}
                tips={isEn ? [
                    "Try to maintain a steady rhythm rather than panic-clicking.",
                    "Stay near the center of the gap to give yourself room for error.",
                    "On mobile, use light taps for better control sensitivity.",
                    "Remember that the bird falls faster the longer you wait between clicks."
                ] : [
                    "급하게 여러 번 누르는 것보다 일정한 리듬을 유지하며 날개짓하는 것이 유리합니다.",
                    "파이프의 중앙 부분에 가깝게 위치하도록 미리 고도를 조절하세요.",
                    "모바일 환경에서는 손가락 끝으로 가볍게 터치하여 반응 속도를 높이세요.",
                    "점수가 높아질수록 장애물이 빨라지므로 더 높은 집중력이 요구됩니다."
                ]}
                faqs={toolFaqs}
            />
        </div>
    );
};

export default FlappyBird;
