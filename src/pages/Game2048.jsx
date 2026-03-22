import React, { useState, useEffect, useCallback, useRef } from 'react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { RefreshCw, Trophy, Share2 } from 'lucide-react';
import useUserPreferences from '../hooks/useUserPreferences';
import useShareCanvas from '../hooks/useShareCanvas';

const Game2048 = () => {
    const [grid, setGrid] = useState(Array(4).fill().map(() => Array(4).fill(0)));
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [won, setWon] = useState(false);
    const { addRecentTool } = useUserPreferences();
    const { shareCanvas } = useShareCanvas();
    const containerRef = useRef(null);

    // Touch handling refs
    const touchStart = useRef({ x: 0, y: 0 });
    const touchEnd = useRef({ x: 0, y: 0 });

    useEffect(() => {
        addRecentTool('2048');
        const saved = localStorage.getItem('tool-hive-2048-highscore');
        if (saved) setHighScore(parseInt(saved, 10));

        // Initial spawn
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

    // Save High Score
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

    // Game Logic Helpers
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

    const rotateGrid = (grid) => {
        let newGrid = Array(4).fill().map(() => Array(4).fill(0));
        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 4; c++) {
                newGrid[c][r] = grid[r][c];
            }
        }
        return newGrid;
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
                // To reuse logic, rotate grid, process as left/right, rotate back
                // Or just process columns
                // Let's manually process columns for simplicity or rotate
                // Rotate is cleaner logic reuse
                // 90deg?
                // Let's just do manual column processing
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

                // Check Game Over
                let movesAvailable = false;
                // Check empty
                for (let r = 0; r < 4; r++) for (let c = 0; c < 4; c++) if (newGrid[r][c] === 0) movesAvailable = true;

                if (!movesAvailable) {
                    // Check adjacent merges
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
    }, [gameOver]); // Include internal helpers if needed, but they are defined outside or safe

    // Keyboard Listeners
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

    // Touch Logic
    const handleTouchStart = (e) => {
        touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const handleTouchEnd = (e) => {
        touchEnd.current = { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };

        const dx = touchEnd.current.x - touchStart.current.x;
        const dy = touchEnd.current.y - touchStart.current.y;

        if (Math.abs(dx) > Math.abs(dy)) {
            // Horizontal
            if (Math.abs(dx) > 30) {
                if (dx > 0) move('right');
                else move('left');
            }
        } else {
            // Vertical
            if (Math.abs(dy) > 30) {
                if (dy > 0) move('down');
                else move('up');
            }
        }
    };

    // Styling
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

    return (
        <div className="max-w-md mx-auto space-y-6 select-none touch-none" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} ref={containerRef}>
            {/* Prevent default touch actions usually needed on body, but simple event handlers here work well */}
            <SEO
                title="2048 게임 - Tool Hive"
                description="전설적인 숫자 퍼즐 게임 2048. 같은 숫자를 합쳐 2048을 만들어보세요!"
                keywords="2048, 게임, 퍼즐, 숫자게임, puzzle, game"
            />

            <div className="flex flex-col items-center">
                <div className="flex justify-between w-full items-center mb-6">
                    <h2 className="text-4xl font-extrabold text-slate-700 dark:text-slate-200">2048</h2>
                    <div className="flex gap-2">
                        <div className="bg-gray-200 dark:bg-gray-800 rounded-md px-4 py-1 text-center">
                            <div className="text-[10px] font-bold text-gray-500 uppercase">Score</div>
                            <div className="font-bold text-lg">{score}</div>
                        </div>
                        <div className="bg-gray-200 dark:bg-gray-800 rounded-md px-4 py-1 text-center">
                            <div className="text-[10px] font-bold text-gray-500 uppercase">Best</div>
                            <div className="font-bold text-lg">{highScore}</div>
                        </div>
                    </div>
                </div>

                <div className="relative bg-[#bbada0] p-2 rounded-xl w-full aspect-square max-w-[400px]">
                    {/* Game Over Overlay */}
                    {gameOver && (
                        <div className="absolute inset-0 z-10 bg-white/70 dark:bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center rounded-xl animate-in fade-in">
                            <h3 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">Game Over!</h3>
                            <p className="text-lg text-slate-600 dark:text-slate-300 mb-6">최종 점수: {score}</p>
                            <button onClick={initializeGame} className="bg-slate-800 text-white px-6 py-3 rounded-lg font-bold hover:scale-105 transition-transform">
                                다시 도전하기
                            </button>
                            <button onClick={() => shareCanvas(containerRef.current, '2048', score)} className="bg-slate-600 text-white px-6 py-3 rounded-lg font-bold hover:scale-105 transition-transform mt-3 flex items-center gap-2">
                                <Share2 size={18} /> 결과 공유하기
                            </button>
                        </div>
                    )}

                    {/* Win Overlay */}
                    {won && !gameOver && (
                        <div className="absolute inset-0 z-10 bg-yellow-500/50 backdrop-blur-sm flex flex-col items-center justify-center rounded-xl animate-in fade-in">
                            <h3 className="text-4xl font-black text-white mb-2 drop-shadow-md">You Win!</h3>
                            <p className="text-lg text-white mb-6 font-bold">2048을 만들었습니다!</p>
                            <div className="flex gap-2">
                                <button onClick={() => setWon(false)} className="bg-white text-yellow-600 px-6 py-3 rounded-lg font-bold hover:scale-105 transition-transform shadow-lg">
                                    계속 하기
                                </button>
                                <button onClick={initializeGame} className="bg-slate-800 text-white px-6 py-3 rounded-lg font-bold hover:scale-105 transition-transform shadow-lg">
                                    새 게임
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
                        <strong>방법:</strong> 방향키나 터치로 타일을 미세요.
                    </div>
                    <button
                        onClick={initializeGame}
                        className="p-2 bg-slate-200 dark:bg-slate-800 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
                        title="새 게임"
                    >
                        <RefreshCw className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                    </button>
                </div>
            </div>
        \n            <ToolGuide
                title="2048"
                intro="숫자를 합쳐 2048을 만드는 레전드 퍼즐"
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

export default Game2048;
