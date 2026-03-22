import React, { useState, useEffect, useCallback, useRef } from 'react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { RefreshCw, Trophy, Share2 } from 'lucide-react';
import useUserPreferences from '../hooks/useUserPreferences';
import useShareCanvas from '../hooks/useShareCanvas';
import { useLanguage } from '../context/LanguageContext';

const Game2048 = () => {
    const { lang } = useLanguage();
    const isEn = lang === 'en';
    const [grid, setGrid] = useState(Array(4).fill().map(() => Array(4).fill(0)));
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [won, setWon] = useState(false);
    const { addRecentTool } = useUserPreferences();
    const { shareCanvas } = useShareCanvas();
    const containerRef = useRef(null);

    const touchStart = useRef({ x: 0, y: 0 });
    const touchEnd = useRef({ x: 0, y: 0 });

    useEffect(() => {
        addRecentTool('2048');
        const saved = localStorage.getItem('tool-hive-2048-highscore');
        if (saved) setHighScore(parseInt(saved, 10));
        initializeGame();
    }, []);

    const initializeGame = () => {
        let newGrid = Array(4).fill().map(() => Array(4).fill(0));
        addRandomTile(newGrid);
        addRandomTile(newGrid);
        setGrid(newGrid);
        setScore(0);
        setGameOver(false);
        setWon(false);
    };

    useEffect(() => {
        if (score > highScore) {
            setHighScore(score);
            localStorage.setItem('tool-hive-2048-highscore', score);
        }
    }, [score]);

    const addRandomTile = (gridCopy) => {
        let available = [];
        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 4; c++) {
                if (gridCopy[r][c] === 0) available.push({ r, c });
            }
        }
        if (available.length > 0) {
            const randomCell = available[Math.floor(Math.random() * available.length)];
            gridCopy[randomCell.r][randomCell.c] = Math.random() < 0.9 ? 2 : 4;
        }
    };

    const slide = (row) => {
        let arr = row.filter(val => val);
        let missing = 4 - arr.length;
        let zeros = Array(missing).fill(0);
        return arr.concat(zeros);
    };

    const combine = (row, scoreRef) => {
        for (let i = 0; i < 3; i++) {
            if (row[i] !== 0 && row[i] === row[i + 1]) {
                row[i] *= 2;
                row[i + 1] = 0;
                scoreRef.current += row[i];
                if (row[i] === 2048) setWon(true);
            }
        }
        return row;
    };

    const operate = (row, scoreRef) => {
        row = slide(row);
        row = combine(row, scoreRef);
        row = slide(row);
        return row;
    };

    const move = useCallback((direction) => {
        if (gameOver) return;

        setGrid(currentGrid => {
            let newGrid = JSON.parse(JSON.stringify(currentGrid));
            let scoreRef = { current: 0 };
            let changed = false;

            if (direction === 'left' || direction === 'right') {
                for (let r = 0; r < 4; r++) {
                    let row = newGrid[r];
                    if (direction === 'right') row.reverse();
                    let newRow = operate(row, scoreRef);
                    if (direction === 'right') newRow.reverse();

                    if (JSON.stringify(newGrid[r]) !== JSON.stringify(newRow)) changed = true;
                    newGrid[r] = newRow;
                }
            } else if (direction === 'up' || direction === 'down') {
                for (let c = 0; c < 4; c++) {
                    let col = [newGrid[0][c], newGrid[1][c], newGrid[2][c], newGrid[3][c]];
                    if (direction === 'down') col.reverse();
                    let newCol = operate(col, scoreRef);
                    if (direction === 'down') newCol.reverse();

                    for (let r = 0; r < 4; r++) {
                        if (newGrid[r][c] !== newCol[r]) changed = true;
                        newGrid[r][c] = newCol[r];
                    }
                }
            }

            if (changed) {
                addRandomTile(newGrid);
                setScore(s => s + scoreRef.current);

                let movesAvailable = false;
                for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) if (newGrid[r][c] === 0) movesAvailable = true;

                if (!movesAvailable) {
                    for (let r = 0; r < 4; r++) {
                        for (let c = 0; c < 4; c++) {
                            if (c < 3 && newGrid[r][c] === newGrid[r][c + 1]) movesAvailable = true;
                            if (r < 3 && newGrid[r][c] === newGrid[r + 1][c]) movesAvailable = true;
                        }
                    }
                }

                if (!movesAvailable) setGameOver(true);
                return newGrid;
            }

            return currentGrid;
        });
    }, [gameOver]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            switch (e.key) {
                case 'ArrowLeft':
                case 'a':
                case 'A':
                    e.preventDefault(); move('left'); break;
                case 'ArrowRight':
                case 'd':
                case 'D':
                    e.preventDefault(); move('right'); break;
                case 'ArrowUp':
                case 'w':
                case 'W':
                    e.preventDefault(); move('up'); break;
                case 'ArrowDown':
                case 's':
                case 'S':
                    e.preventDefault(); move('down'); break;
                default: break;
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [move]);

    const handleTouchStart = (e) => {
        touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const handleTouchEnd = (e) => {
        touchEnd.current = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
        const dx = touchEnd.current.x - touchStart.current.x;
        const dy = touchEnd.current.y - touchStart.current.y;

        if (Math.abs(dx) > Math.abs(dy)) {
            if (Math.abs(dx) > 30) {
                if (dx > 0) move('right');
                else move('left');
            }
        } else {
            if (Math.abs(dy) > 30) {
                if (dy > 0) move('down');
                else move('up');
            }
        }
    };

    const getCellClass = (value) => {
        const base = "w-full h-full rounded-lg flex items-center justify-center font-bold transition-all duration-200 select-none shadow-sm text-slate-800";
        switch (value) {
            case 0: return "bg-gray-200/50";
            case 2: return `${base} bg-[#eee4da] text-2xl`;
            case 4: return `${base} bg-[#ede0c8] text-2xl`;
            case 8: return `${base} bg-[#f2b179] text-white text-3xl`;
            case 16: return `${base} bg-[#f59563] text-white text-3xl`;
            case 32: return `${base} bg-[#f67c5f] text-white text-3xl`;
            case 64: return `${base} bg-[#f65e3b] text-white text-3xl`;
            case 128: return `${base} bg-[#edcf72] text-white text-4xl shadow-md`;
            case 256: return `${base} bg-[#edcc61] text-white text-4xl shadow-md`;
            case 512: return `${base} bg-[#edc850] text-white text-4xl shadow-md`;
            case 1024: return `${base} bg-[#edc53f] text-white text-3xl shadow-lg`;
            case 2048: return `${base} bg-[#edc22e] text-white text-3xl shadow-xl border-4 border-yellow-300`;
            default: return `${base} bg-black text-white text-2xl`;
        }
    };

    const toolFaqs = isEn ? [
        { q: "How do I play 2048?", a: "Swipe (up, down, left, right) or use arrow keys to move the tiles. When two tiles with the same number touch, they merge into one with the total value." },
        { q: "What is the goal of the game?", a: "The ultimate goal is to create a tile with the number 2048, though you can continue playing for high scores after reaching it." },
        { q: "Is there a winning strategy?", a: "Many players find success by keeping their largest tile in one of the corners and building others around it sequentially." }
    ] : [
        { q: "2048 게임은 어떻게 하는 것인가요?", a: "가로, 세로로 타일들을 밀면 숫자들이 한쪽으로 쏠립니다. 이때 같은 숫자 두 개가 부딪히면 하나로 합쳐지며 숫자가 두 배가 됩니다." },
        { q: "게임의 최종 목표는 무엇인가요?", a: "숫자를 계속 합쳐서 '2048'이 적힌 타일을 만드는 것이 목표입니다. 2048을 만든 후에도 계속해서 더 높은 점수에 도전할 수 있습니다." },
        { q: "고득점을 위한 팁이 있나요?", a: "가장 높은 숫자의 타일을 한쪽 구석(예: 왼쪽 하단)에 고정시키고, 나머지 타일들을 그 주변으로 차곡차곡 쌓아가는 전략이 효과적입니다." }
    ];

    return (
        <div className="max-w-md mx-auto space-y-6 select-none touch-none px-4" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} ref={containerRef}>
            <SEO
                title={isEn ? "2048 Game - Master the Number Puzzle | Tool Hive" : "2048 게임 - 전설적인 숫자 퍼즐 | Tool Hive"}
                description={isEn ? "Play the addictive 2048 tile puzzle game online. Merge numbers, reach the 2048 tile, and challenge your high score. Fun, free, and optimized for mobile." : "전설적인 숫자 퍼즐 게임 2048. 같은 숫자를 합쳐 2048을 만들어보세요!"}
                keywords={isEn ? "2048 game, number puzzle, math games online, addictive games, logic puzzles" : "2048, 게임, 퍼즐, 숫자게임, puzzle, game"}
                faqs={toolFaqs}
            />

            <div className="flex flex-col items-center">
                <div className="flex justify-between w-full items-center mb-6">
                    <h2 className="text-4xl font-extrabold text-slate-700 dark:text-slate-200">2048</h2>
                    <div className="flex gap-2">
                        <div className="bg-gray-200 dark:bg-gray-800 rounded-md px-4 py-1 text-center">
                            <div className="text-[10px] font-bold text-gray-500 uppercase">{isEn ? 'Score' : '점수'}</div>
                            <div className="font-bold text-lg">{score}</div>
                        </div>
                        <div className="bg-gray-200 dark:bg-gray-800 rounded-md px-4 py-1 text-center">
                            <div className="text-[10px] font-bold text-gray-500 uppercase">{isEn ? 'Best' : '최고'}</div>
                            <div className="font-bold text-lg">{highScore}</div>
                        </div>
                    </div>
                </div>

                <div className="relative bg-[#bbada0] p-2 rounded-xl w-full aspect-square max-w-[400px]">
                    {/* Game Over Overlay */}
                    {gameOver && (
                        <div className="absolute inset-0 z-10 bg-white/70 dark:bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center rounded-xl animate-in fade-in">
                            <h3 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">{isEn ? 'Game Over!' : '게임 종료!'}</h3>
                            <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">{isEn ? 'Final Score' : '최종 점수'}: {score}</p>
                            <button onClick={initializeGame} className="bg-slate-800 text-white px-6 py-3 rounded-lg font-bold hover:scale-105 transition-transform">
                                {isEn ? 'Try Again' : '다시 도전하기'}
                            </button>
                            <button onClick={() => shareCanvas(containerRef.current, '2048', score)} className="bg-slate-600 text-white px-6 py-3 rounded-lg font-bold hover:scale-105 transition-transform mt-3 flex items-center gap-2">
                                <Share2 size={18} /> {isEn ? 'Share Result' : '결구 공유하기'}
                            </button>
                        </div>
                    )}

                    {/* Win Overlay */}
                    {won && !gameOver && (
                        <div className="absolute inset-0 z-10 bg-yellow-500/50 backdrop-blur-sm flex flex-col items-center justify-center rounded-xl animate-in fade-in">
                            <h3 className="text-4xl font-black text-white mb-2 drop-shadow-md">{isEn ? 'You Win!' : '우승!'}</h3>
                            <p className="text-lg text-white mb-6 font-bold">{isEn ? 'Reached the 2048 tile!' : '2048을 만들었습니다!'}</p>
                            <div className="flex gap-2">
                                <button onClick={() => setWon(false)} className="bg-white text-yellow-600 px-6 py-3 rounded-lg font-bold hover:scale-105 transition-transform shadow-lg">
                                    {isEn ? 'Keep Going' : '계속 하기'}
                                </button>
                                <button onClick={initializeGame} className="bg-slate-800 text-white px-6 py-3 rounded-lg font-bold hover:scale-105 transition-transform shadow-lg">
                                    {isEn ? 'New Game' : '새 게임'}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Grid */}
                    <div className="grid grid-cols-4 grid-rows-4 gap-2 w-full h-full">
                        {grid.map((row, r) => (
                            row.map((val, c) => (
                                <div key={`${r}-${c}`} className={getCellClass(val)}>
                                    {val > 0 ? val : ''}
                                </div>
                            ))
                        ))}
                    </div>
                </div>

                {/* Controls Info */}
                <div className="mt-8 flex justify-between items-center w-full max-w-[400px]">
                    <div className="text-sm text-gray-500">
                        <strong>{isEn ? 'How to Play' : '방법'}:</strong> {isEn ? 'Use Arrow Keys or Swipe to move tiles.' : '방향키나 터치로 타일을 미세요.'}
                    </div>
                    <button
                        onClick={initializeGame}
                        className="p-2 bg-slate-200 dark:bg-slate-800 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
                        title={isEn ? "New Game" : "새 게임"}
                    >
                        <RefreshCw className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                    </button>
                </div>
            </div>

            <ToolGuide
                title={isEn ? "2048 Mastery Guide" : "2048 게임 완벽 정복 가이드"}
                intro={isEn ? "Simple to learn, hard to master. 2048 is a sliding tile puzzle game where you combine matching numbers to reach the ultimate 2048 goal. It requires foresight, planning, and a bit of luck." : "2048은 전 세계적으로 선풍적인 인기를 끈 숫자 퍼즐 게임입니다. 같은 숫자가 적힌 타일들을 하나로 합쳐 점수를 높이고, 최종적으로 '2048'이라는 숫자를 만드는 것이 목표입니다. 간단한 규칙 속에 고도의 전략이 숨어있는 두뇌 게임을 즐겨보세요."}
                steps={isEn ? [
                    "Swipe or use keyboard arrow keys to move all tiles in one direction.",
                    "When two tiles with the same number collide, they merge into one.",
                    "New tiles (2 or 4) spawn in empty spots after every move.",
                    "The game ends when the grid is full and no more merges are possible.",
                    "Don't stop at 2048; keep merging to see how high you can score!"
                ] : [
                    "방향키(↑, ↓, ←, →) 또는 화면을 밀어 타일을 상하좌우 한쪽 방향으로 몰아넣습니다.",
                    "이때 같은 숫자가 적힌 두 타일이 만나면 하나의 타일로 합쳐지며 숫자가 두 배가 됩니다.",
                    "매 이동마다 빈 공간에 새로운 2 또는 4 타일이 무작위로 생성됩니다.",
                    "모든 칸이 타일로 가득 차고 더 이상 합칠 수 있는 숫자가 없을 때 게임이 종료됩니다.",
                    "2048 타일을 만든 이후에도 게임을 계속 진행하여 최고 기록을 경신할 수 있습니다."
                ]}
                tips={isEn ? [
                    "Corner Strategy: Keep your highest number in a single corner (e.g., bottom-left).",
                    "Avoid moving up (or whichever direction moves tiles away from your corner).",
                    "Keep rows or columns organized by keeping numbers in descending order.",
                    "Focus on making merges that clear up space to avoid getting boxed in."
                ] : [
                    "구석 전략: 가장 높은 숫자의 타일을 왼쪽 아래나 오른쪽 위 등 한쪽 구석에 고정시키세요.",
                    "고정시킨 방향의 반대 방향(예: 아래면 위로)으로는 가급적 움직이지 않는 것이 유리합니다.",
                    "인접한 칸에 큰 숫자부터 작은 숫자 순서대로 배치되도록 유도하세요.",
                    "한 번의 움직임으로 여러 타일을 합칠 수 있는 기회를 노려 공간을 확보하세요."
                ]}
                faqs={toolFaqs}
            />
        </div>
    );
};

export default Game2048;
