import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { Bomb, Flag, RefreshCw, Trophy, AlertTriangle, Share2 } from 'lucide-react';
import useShareCanvas from '../hooks/useShareCanvas';
import { useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';

const Minesweeper = () => {
    const { lang } = useLanguage();
    const isEn = lang === 'en';
    const [grid, setGrid] = useState([]);
    const [gameState, setGameState] = useState('waiting'); // waiting, playing, won, lost
    const [mineCount, setMineCount] = useState(10);
    const [flagCount, setFlagCount] = useState(0);
    const [difficulty, setDifficulty] = useState('beginner'); // beginner, intermediate, expert
    const [timer, setTimer] = useState(0);
    const { shareCanvas } = useShareCanvas();
    const containerRef = useRef(null);

    // Configuration
    const configs = {
        beginner: { rows: 9, cols: 9, mines: 10 },
        intermediate: { rows: 16, cols: 16, mines: 40 },
        expert: { rows: 16, cols: 30, mines: 99 }
    };

    useEffect(() => {
        initGame();
    }, [difficulty]);

    useEffect(() => {
        let interval;
        if (gameState === 'playing') {
            interval = setInterval(() => {
                setTimer(t => t + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [gameState]);

    const initGame = () => {
        const { rows, cols, mines } = configs[difficulty];
        const newGrid = [];
        for (let r = 0; r < rows; r++) {
            const row = [];
            for (let c = 0; c < cols; c++) {
                row.push({
                    row: r,
                    col: c,
                    isMine: false,
                    isRevealed: false,
                    isFlagged: false,
                    neighborMines: 0
                });
            }
            newGrid.push(row);
        }
        setGrid(newGrid);
        setMineCount(mines);
        setFlagCount(0);
        setGameState('waiting');
        setTimer(0);
    };

    const placeMines = (firstRow, firstCol) => {
        const { rows, cols, mines } = configs[difficulty];
        const newGrid = [...grid];
        let minesPlaced = 0;

        while (minesPlaced < mines) {
            const r = Math.floor(Math.random() * rows);
            const c = Math.floor(Math.random() * cols);

            if (!newGrid[r][c].isMine && (Math.abs(r - firstRow) > 1 || Math.abs(c - firstCol) > 1)) {
                newGrid[r][c].isMine = true;
                minesPlaced++;
            }
        }

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                if (!newGrid[r][c].isMine) {
                    let count = 0;
                    for (let i = -1; i <= 1; i++) {
                        for (let j = -1; j <= 1; j++) {
                            if (r + i >= 0 && r + i < rows && c + j >= 0 && c + j < cols) {
                                if (newGrid[r + i][c + j].isMine) count++;
                            }
                        }
                    }
                    newGrid[r][c].neighborMines = count;
                }
            }
        }
        setGrid(newGrid);
    };

    const revealCell = (r, c) => {
        if (gameState === 'lost' || gameState === 'won') return;
        if (grid[r][c].isFlagged || grid[r][c].isRevealed) return;

        const newGrid = [...grid];

        if (gameState === 'waiting') {
            placeMines(r, c);
            setGameState('playing');
        }

        if (newGrid[r][c].isMine) {
            newGrid[r][c].isRevealed = true;
            revealAllMines(newGrid);
            setGameState('lost');
            setGrid(newGrid);
            return;
        }

        const revealRecursive = (row, col) => {
            if (row < 0 || row >= configs[difficulty].rows || col < 0 || col >= configs[difficulty].cols) return;
            if (newGrid[row][col].isRevealed || newGrid[row][col].isFlagged) return;

            newGrid[row][col].isRevealed = true;

            if (newGrid[row][col].neighborMines === 0) {
                for (let i = -1; i <= 1; i++) {
                    for (let j = -1; j <= 1; j++) {
                        revealRecursive(row + i, col + j);
                    }
                }
            }
        };

        revealRecursive(r, c);
        setGrid(newGrid);
        checkWin(newGrid);
    };

    const toggleFlag = (e, r, c) => {
        e.preventDefault();
        if (gameState === 'lost' || gameState === 'won') return;
        if (grid[r][c].isRevealed) return;

        const newGrid = [...grid];
        if (!newGrid[r][c].isFlagged && flagCount >= mineCount) return;

        newGrid[r][c].isFlagged = !newGrid[r][c].isFlagged;
        setGrid(newGrid);
        setFlagCount(prev => newGrid[r][c].isFlagged ? prev + 1 : prev - 1);
    };

    const revealAllMines = (currentGrid) => {
        currentGrid.forEach(row => {
            row.forEach(cell => {
                if (cell.isMine) cell.isRevealed = true;
            });
        });
    };

    const checkWin = (currentGrid) => {
        const { rows, cols, mines } = configs[difficulty];
        let revealedCount = 0;
        currentGrid.forEach(row => {
            row.forEach(cell => {
                if (cell.isRevealed) revealedCount++;
            });
        });

        if (revealedCount === (rows * cols - mines)) {
            setGameState('won');
            setFlagCount(mines);
        }
    };

    const getCellColor = (count) => {
        const colors = [
            '', 'text-blue-500', 'text-green-500', 'text-red-500', 'text-purple-500',
            'text-yellow-600', 'text-pink-500', 'text-gray-700', 'text-gray-900'
        ];
        return colors[count] || '';
    };

    const toolFaqs = isEn ? [
        { q: "What do the numbers mean?", a: "Each number indicates how many mines are hiding in the 8 surrounding neighbor cells." },
        { q: "How do I place a flag?", a: "Right-click on a cell (or long-press on mobile) to mark it as a containing mine." },
        { q: "Does the first click matter?", a: "In this version, the first cell you click is guaranteed to be safe and will not contain a mine." }
    ] : [
        { q: "숫자들은 무엇을 의미하나요?", a: "해당 칸을 둘러싼 주변 8칸 내에 숨겨진 지뢰의 총 개수를 나타냅니다." },
        { q: "깃발은 어떻게 꽂나요?", a: "지뢰가 확실시되는 칸에서 마우스 우클릭(또는 모바일 길게 누르기)을 하면 깃발을 꽂아 표시할 수 있습니다." },
        { q: "첫 클릭에 바로 죽을 수도 있나요?", a: "이 게임 버전에서는 사용자의 첫 번째 클릭이 지뢰가 되지 않도록 안전하게 처리되었습니다." }
    ];

    return (
        <div className="max-w-4xl mx-auto space-y-6 select-none px-4" ref={containerRef}>
            <SEO
                title={isEn ? "Play Minesweeper Online - Classic Logic Puzzle | Tool Hive" : "지뢰찾기 (Minesweeper) - 고전 명작 퍼즐 | Tool Hive"}
                description={isEn ? "Play the classic Minesweeper puzzle game online. Use logic to flag mines and clear the grid. Multiple difficulty levels available for free." : "지뢰를 피해 모든 칸을 열어보세요! 논리적인 추리로 지뢰의 위치를 찾아내는 고전 명작 게임입니다."}
                keywords={isEn ? "minesweeper online, logic puzzle games, classic windows games, free puzzles, brain games" : "지뢰찾기, minesweeper, 퍼즐, 두뇌게임, 고전게임"}
                faqs={toolFaqs}
            />

            <div className="text-center space-y-4">
                <h1 className="text-4xl font-black text-gray-900 dark:text-white flex items-center justify-center gap-4 italic tracking-tight">
                    <Bomb className="w-10 h-10 text-rose-500" />
                    {isEn ? 'MINESWEEPER' : '지뢰찾기'}
                </h1>
                <p className="text-muted-foreground font-medium">
                    {isEn ? 'Use logic to clear the grid without hitting a mine!' : '지뢰를 피해 모든 안전한 칸을 찾아내세요!'}
                </p>
            </div>

            <div className="flex justify-center flex-wrap gap-2">
                {['beginner', 'intermediate', 'expert'].map((diff) => (
                    <button
                        key={diff}
                        onClick={() => setDifficulty(diff)}
                        className={`px-6 py-2 rounded-xl text-sm font-black uppercase tracking-widest transition-all ${difficulty === diff
                            ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105'
                            : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                            }`}
                    >
                        {isEn ? diff : (diff === 'beginner' ? '초급' : diff === 'intermediate' ? '중급' : '고급')}
                    </button>
                ))}
            </div>

            <div className="flex flex-col items-center gap-8">
                <div className="p-8 bg-slate-200 dark:bg-slate-700 rounded-3xl shadow-2xl border-4 border-slate-300 dark:border-slate-600">
                    <div className="flex flex-col items-center gap-6">
                        <div className="flex justify-between items-center w-full bg-slate-800 p-4 rounded-xl border-t-4 border-l-4 border-slate-900 border-b-slate-600 border-r-slate-600 shadow-inner">
                            <div className="font-mono text-3xl text-red-500 bg-black px-3 py-1 rounded-md border border-red-900/30">
                                {String(mineCount - flagCount).padStart(3, '0')}
                            </div>

                            <button
                                onClick={initGame}
                                className="bg-slate-300 hover:bg-white p-2 rounded-lg border-b-4 border-slate-500 active:border-b-0 active:translate-y-1 transition-all text-3xl h-14 w-14 flex items-center justify-center"
                            >
                                {gameState === 'won' ? '😎' : gameState === 'lost' ? '😵' : '🙂'}
                            </button>

                            <div className="font-mono text-3xl text-red-500 bg-black px-3 py-1 rounded-md border border-red-900/30">
                                {String(Math.min(999, timer)).padStart(3, '0')}
                            </div>
                        </div>

                        <div
                            className="bg-slate-400 dark:bg-slate-800 p-2 rounded-lg border-t-4 border-l-4 border-slate-500 dark:border-slate-900 border-b-slate-100 dark:border-slate-700 select-none overflow-auto max-w-full"
                            onContextMenu={(e) => e.preventDefault()}
                        >
                            {grid.map((row, r) => (
                                <div key={r} className="flex">
                                    {row.map((cell, c) => (
                                        <div
                                            key={c}
                                            onClick={() => revealCell(r, c)}
                                            onContextMenu={(e) => toggleFlag(e, r, c)}
                                            className={`
                                                w-8 h-8 md:w-9 md:h-9 flex items-center justify-center text-lg font-black cursor-pointer border
                                                ${cell.isRevealed
                                                    ? 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700'
                                                    : 'bg-slate-300 dark:bg-slate-500 border-t-slate-50 border-l-slate-50 border-b-slate-500 border-r-slate-500 hover:bg-slate-200 dark:hover:bg-slate-400'
                                                }
                                            `}
                                        >
                                            {cell.isRevealed ? (
                                                cell.isMine ? (
                                                    <Bomb className="w-5 h-5 text-black dark:text-white fill-current" />
                                                ) : (
                                                    <span className={getCellColor(cell.neighborMines)}>
                                                        {cell.neighborMines > 0 ? cell.neighborMines : ''}
                                                    </span>
                                                )
                                            ) : cell.isFlagged ? (
                                                <Flag className="w-5 h-5 text-rose-500 fill-current drop-shadow-sm" />
                                            ) : null}
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {gameState === 'won' && (
                    <div className="text-center animate-in zoom-in duration-300 p-8 rounded-3xl bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 shadow-xl max-w-sm w-full">
                        <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                        <h2 className="text-3xl font-black text-green-600 mb-2 uppercase tracking-tight">{isEn ? 'VICTORY!' : '성공하셨습니다!'}</h2>
                        <p className="text-gray-500 dark:text-gray-400 font-bold mb-6">{isEn ? 'Record' : '기록'}: {timer}{isEn ? 's' : '초'}</p>
                        <button
                            onClick={() => shareCanvas(containerRef.current, 'Minesweeper', `${timer}s`)}
                            className="w-full py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl font-black transition-all shadow-lg flex items-center justify-center gap-3"
                        >
                            <Share2 size={22} /> {isEn ? 'SHARE RECORD' : '결과 공유하기'}
                        </button>
                    </div>
                )}

                {gameState === 'lost' && (
                    <div className="text-center animate-shake p-6 rounded-3xl bg-rose-50 dark:bg-rose-900/20 border-2 border-rose-200 dark:border-rose-800 shadow-xl max-w-sm w-full">
                        <AlertTriangle className="w-16 h-16 text-rose-500 mx-auto mb-4" />
                        <h2 className="text-3xl font-black text-rose-600 mb-6 uppercase tracking-tight">{isEn ? 'BOOM!' : '폭발했습니다!'}</h2>
                        <button
                            onClick={initGame}
                            className="w-full py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl font-black transition-all shadow-lg flex items-center justify-center gap-3"
                        >
                            <RefreshCw size={22} /> {isEn ? 'TRY AGAIN' : '다시 시도하기'}
                        </button>
                    </div>
                )}
            </div>

            <div className="bg-muted/30 p-8 rounded-3xl border border-border shadow-sm">
                <h3 className="text-lg font-black mb-6 flex items-center gap-3">
                    <RotateCcw size={22} className="text-primary" />
                    {isEn ? "Controls" : "조작 방법"}
                </h3>
                <div className="grid sm:grid-cols-2 gap-8 text-sm font-medium">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <span className="px-3 py-1 bg-white dark:bg-slate-800 border rounded shadow-sm">L-Click</span>
                            <span>{isEn ? "Reveal cell" : "칸 열기"}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="px-3 py-1 bg-white dark:bg-slate-800 border rounded shadow-sm">R-Click</span>
                            <span>{isEn ? "Place/Remove Flag" : "깃발 꽂기/해제"}</span>
                        </div>
                    </div>
                    <div className="bg-white/50 dark:bg-slate-900/50 p-4 rounded-xl border border-dashed border-slate-300">
                        <p className="text-xs text-muted-foreground leading-relaxed">
                            {isEn 
                                ? "💡 Mobile Tip: Long-press on a cell to place a flag. Note that some browsers may behave differently." 
                                : "💡 모바일 팁: 칸을 길게 누르면(Long-press) 깃발을 꽂을 수 있습니다. 브라우저 설정에 따라 다를 수 있으니 확인해 보세요."}
                        </p>
                    </div>
                </div>
            </div>

            <ToolGuide
                title={isEn ? "Mastering Minesweeper: The Essential Guide" : "지뢰찾기 전략 및 게임 가이드"}
                intro={isEn ? "Minesweeper is a classic single-player puzzle game. The objective is to clear a rectangular board containing hidden 'mines' without detonating any of them, with help from clues about the number of neighboring mines in each field." : "추억의 윈도우 기본 게임, 지뢰찾기(Minesweeper)를 웹에서 바로 즐겨보세요. 논리적인 추론을 통해 지뢰의 위치를 파악하고, 모든 안전한 구역을 확보해나가는 재미를 제공합니다. 초급부터 고급까지 다양한 난이도에서 자신의 순위권 기록에 도전해보세요."}
                steps={isEn ? [
                    "Choose between Beginner, Intermediate, or Expert difficulty.",
                    "Click any cell to start the game. The first click is always safe.",
                    "Look at the numbers to deduce where mines are hidden.",
                    "Right-click suspicious cells to plant a flag (prevents accidental clicks).",
                    "Clear all cells that don't contain mines to win the game!"
                ] : [
                    "자신의 숙련도에 맞는 난이도(초급, 중급, 고급)를 선택합니다.",
                    "무작위로 칸을 하나 선택해 클릭하여 게임을 시작합니다. (첫 칸은 지뢰가 아닙니다)",
                    "숫자가 나타나면 해당 숫자 주위 8개 칸에 숨겨진 지뢰 개수를 파악합니다.",
                    "지뢰가 확실한 곳은 우클릭으로 깃발을 꽂아 실수로 누르지 않게 방지합니다.",
                    "지뢰를 제외한 모든 빈 칸을 안전하게 열면 승리합니다."
                ]}
                tips={isEn ? [
                    "Numbers are clues: A '1' means there is exactly one mine in the 8 neighbors.",
                    "Use the corner strategy: Corners often provide key logic points for deduction.",
                    "Flag carefully: Misplaced flags can lead to confusing logic errors later.",
                    "When stuck, look for groups of cells that must contain a certain number of mines."
                ] : [
                    "숫자 활용: '1'은 주변 8칸 중 지뢰가 딱 하나 있다는 뜻입니다. 이를 교차 검증하며 위치를 찾으세요.",
                    "절박한 상황에서 찍기: 모든 곳이 추론 불가능할 때는 확률적으로 빈 공간일 것 같은 곳을 선택해야 할 수도 있습니다.",
                    "깃발 활용: 깃발은 숫자 계산을 훨씬 명확하게 만들어주므로 적극적으로 사용하세요.",
                    "실수는 금물: 지뢰찾기는 단 한 번의 실수로 끝나기 때문에 매 클릭마다 신중해야 합니다."
                ]}
                faqs={toolFaqs}
            />
        </div>
    );
};

export default Minesweeper;
