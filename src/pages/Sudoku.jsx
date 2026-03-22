import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Share2, RotateCcw, Lightbulb, Trophy, Home as HomeIcon, ChevronRight } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import useShareCanvas from '../hooks/useShareCanvas';

// Sudoku Logical Helpers
const isValidMove = (board, row, col, num) => {
    for (let i = 0; i < 9; i++) {
        if (board[row][i] === num) return false;
        if (board[i][col] === num) return false;
    }
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[startRow + i][startCol + j] === num) return false;
        }
    }
    return true;
};

const solveSudoku = (board) => {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
                for (let num = 1; num <= 9; num++) {
                    if (isValidMove(board, row, col, num)) {
                        board[row][col] = num;
                        if (solveSudoku(board)) return true;
                        board[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
};

const generateSudoku = (difficulty) => {
    // Start with empty board
    const board = Array(9).fill(null).map(() => Array(9).fill(0));

    // Fill diagonal 3x3 blocks (they are independent)
    const fillDiagonal = () => {
        for (let i = 0; i < 9; i += 3) {
            fillBlock(i, i);
        }
    }
    const fillBlock = (row, col) => {
        let nums = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                const idx = Math.floor(Math.random() * nums.length);
                board[row + i][col + j] = nums[idx];
                nums.splice(idx, 1);
            }
        }
    }

    fillDiagonal();
    solveSudoku(board);

    const solution = board.map(row => [...row]);

    // Remove numbers based on difficulty
    let attempts = difficulty === 'easy' ? 30 : difficulty === 'medium' ? 45 : 60;
    while (attempts > 0) {
        const row = Math.floor(Math.random() * 9);
        const col = Math.floor(Math.random() * 9);
        if (board[row][col] !== 0) {
            board[row][col] = 0;
            attempts--;
        }
    }

    return { puzzle: board, solution };
};

const Sudoku = () => {
    const [board, setBoard] = useState(Array(9).fill(null).map(() => Array(9).fill(0)));
    const [initialBoard, setInitialBoard] = useState(Array(9).fill(null).map(() => Array(9).fill(0)));
    const [solution, setSolution] = useState(Array(9).fill(null).map(() => Array(9).fill(0)));
    const [selected, setSelected] = useState({ row: -1, col: -1 });
    const [difficulty, setDifficulty] = useState('easy');
    const [timer, setTimer] = useState(0);
    const [isWon, setIsWon] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [hints, setHints] = useState(3);
    const timerRef = useRef(null);
    const containerRef = useRef(null);
    const { shareCanvas } = useShareCanvas();

    const startNewGame = useCallback((level = difficulty) => {
        const { puzzle, solution: solved } = generateSudoku(level);
        setBoard(puzzle.map(row => [...row]));
        setInitialBoard(puzzle.map(row => [...row]));
        setSolution(solved);
        setDifficulty(level);
        setTimer(0);
        setIsWon(false);
        setIsPaused(false);
        setHints(3);
        setSelected({ row: -1, col: -1 });
    }, [difficulty]);

    useEffect(() => {
        startNewGame();
    }, []);

    // Timer logic
    useEffect(() => {
        if (!isWon && !isPaused) {
            timerRef.current = setInterval(() => {
                setTimer(prev => prev + 1);
            }, 1000);
        } else {
            clearInterval(timerRef.current);
        }
        return () => clearInterval(timerRef.current);
    }, [isWon, isPaused]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleCellClick = (row, col) => {
        if (isWon) return;
        setSelected({ row, col });
    };

    const handleNumberInput = (num) => {
        if (isWon || selected.row === -1) return;
        if (initialBoard[selected.row][selected.col] !== 0) return;

        const newBoard = board.map(row => [...row]);
        newBoard[selected.row][selected.col] = num;
        setBoard(newBoard);

        // Check if won
        if (checkWin(newBoard)) {
            setIsWon(true);
        }
    };

    const checkWin = (currentBoard) => {
        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                if (currentBoard[r][c] !== solution[r][c]) return false;
            }
        }
        return true;
    };

    const useHint = () => {
        if (hints <= 0 || isWon || selected.row === -1) return;
        if (initialBoard[selected.row][selected.col] !== 0) return;

        const newBoard = board.map(row => [...row]);
        newBoard[selected.row][selected.col] = solution[selected.row][selected.col];
        setBoard(newBoard);
        setHints(prev => prev - 1);

        if (checkWin(newBoard)) {
            setIsWon(true);
        }
    };

    // Keyboard support
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key >= '1' && e.key <= '9') handleNumberInput(parseInt(e.key));
            if (e.key === '0' || e.key === 'Backspace') handleNumberInput(0);
            if (e.key === 'ArrowUp') setSelected(prev => ({ ...prev, row: Math.max(0, prev.row - 1) }));
            if (e.key === 'ArrowDown') setSelected(prev => ({ ...prev, row: Math.min(8, prev.row + 1) }));
            if (e.key === 'ArrowLeft') setSelected(prev => ({ ...prev, col: Math.max(0, prev.col - 1) }));
            if (e.key === 'ArrowRight') setSelected(prev => ({ ...prev, col: Math.min(8, prev.col + 1) }));
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selected, board, solution, isWon]);

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <SEO
                title="스도쿠 - 클래식 로직 퍼즐"
                description="다양한 난이도의 클래식 스도쿠를 즐겨보세요. 두뇌를 단련하고 기록을 세워 공유해보세요!"
                keywords="스도쿠, sudoku, 로직퍼즐, 퍼즐게임, 두뇌게임, 무료게임"
                category="게임"
            />

            <div className="flex flex-col md:flex-row items-start gap-8" ref={containerRef}>
                {/* Left Side: Information and Controls */}
                <div className="w-full md:w-64 space-y-6">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold">스도쿠</h1>
                        <p className="text-muted-foreground text-sm">클래식 숫자 로직 퍼즐</p>
                    </div>

                    <div className="bg-card border border-border rounded-2xl p-4 shadow-sm space-y-4">
                        <div className="flex justify-between items-center text-sm font-medium">
                            <span className="text-muted-foreground">난이도</span>
                            <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-md uppercase text-xs font-bold">
                                {difficulty === 'easy' ? '쉬움' : difficulty === 'medium' ? '보통' : '어려움'}
                            </span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-muted-foreground text-sm font-medium">시간</span>
                            <span className="text-xl font-mono font-bold">{formatTime(timer)}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-2">
                        <button
                            onClick={() => startNewGame('easy')}
                            className={`py-2 rounded-xl text-sm font-bold transition-all ${difficulty === 'easy' ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'}`}
                        >
                            쉬움
                        </button>
                        <button
                            onClick={() => startNewGame('medium')}
                            className={`py-2 rounded-xl text-sm font-bold transition-all ${difficulty === 'medium' ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'}`}
                        >
                            보통
                        </button>
                        <button
                            onClick={() => startNewGame('hard')}
                            className={`py-2 rounded-xl text-sm font-bold transition-all ${difficulty === 'hard' ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'}`}
                        >
                            어려움
                        </button>
                    </div>

                    <div className="pt-4 space-y-2">
                        <button
                            onClick={() => startNewGame()}
                            className="w-full py-3 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-700 transition-colors flex items-center justify-center gap-2"
                        >
                            <RotateCcw size={18} /> 새 게임
                        </button>
                        <button
                            onClick={useHint}
                            className={`w-full py-3 rounded-xl font-bold transition-colors flex items-center justify-center gap-2 ${hints > 0 ? 'bg-yellow-500 hover:bg-yellow-600 text-black' : 'bg-muted text-muted-foreground shadow-none'}`}
                            disabled={hints <= 0}
                        >
                            <Lightbulb size={18} /> 힌트 ({hints})
                        </button>
                    </div>
                </div>

                {/* Right Side: Sudoku Board */}
                <div className="flex-1 w-full flex flex-col items-center">
                    <div className="bg-slate-900 p-1 md:p-3 rounded-2xl shadow-2xl border-4 border-slate-800 w-full max-w-[440px]">
                        <div className="grid grid-cols-9 gap-[1px] md:gap-1 bg-slate-800 border border-slate-700 aspect-square">
                            {board.map((row, rIdx) =>
                                row.map((cell, cIdx) => {
                                    const isSelected = selected.row === rIdx && selected.col === cIdx;
                                    const isInitial = initialBoard[rIdx][cIdx] !== 0;
                                    const isWrong = cell !== 0 && cell !== solution[rIdx][cIdx];
                                    const isSameNum = cell !== 0 && cell === board[selected.row]?.[selected.col];
                                    const isInSameArea = (rIdx === selected.row || cIdx === selected.col ||
                                        (Math.floor(rIdx / 3) === Math.floor(selected.row / 3) &&
                                            Math.floor(cIdx / 3) === Math.floor(selected.col / 3)));

                                    return (
                                        <div
                                            key={`${rIdx}-${cIdx}`}
                                            onClick={() => handleCellClick(rIdx, cIdx)}
                                            className={`
                                                relative flex items-center justify-center text-lg md:text-2xl font-bold cursor-pointer transition-all aspect-square
                                                ${(rIdx + 1) % 3 === 0 && rIdx !== 8 ? 'border-b-2 border-slate-600' : ''}
                                                ${(cIdx + 1) % 3 === 0 && cIdx !== 8 ? 'border-r-2 border-slate-600' : ''}
                                                ${isSelected ? 'bg-primary text-primary-foreground scale-105 z-10 rounded-sm' :
                                                    isSameNum ? 'bg-primary/20 text-primary' :
                                                        isInSameArea ? 'bg-slate-800/80 text-white' : 'bg-slate-900 text-white'}
                                            `}
                                        >
                                            <span className={`
                                                ${isInitial ? 'text-slate-400 font-black' :
                                                    isWrong ? 'text-rose-500' :
                                                        isSelected ? 'text-white' : 'text-blue-400'}
                                            `}>
                                                {cell !== 0 ? cell : ''}
                                            </span>
                                        </div>
                                    )
                                })
                            )}
                        </div>
                    </div>

                    {/* Numeric Pad */}
                    <div className="grid grid-cols-5 md:grid-cols-9 gap-2 mt-8 w-full max-w-[440px]">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => (
                            <button
                                key={num}
                                onClick={() => handleNumberInput(num)}
                                className="h-12 md:h-14 bg-card border border-border rounded-xl font-bold text-lg hover:bg-primary hover:text-primary-foreground transition-all active:scale-95 shadow-sm"
                            >
                                {num}
                            </button>
                        ))}
                        <button
                            onClick={() => handleNumberInput(0)}
                            className="h-12 md:h-14 bg-slate-200 dark:bg-slate-800 col-span-2 md:col-span-1 border border-border rounded-xl font-bold text-sm md:text-xs hover:bg-rose-500 hover:text-white transition-colors"
                        >
                            삭제
                        </button>
                    </div>

                    {/* Win Overlay */}
                    {isWon && (
                        <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-md z-[100] flex flex-col items-center justify-center p-8 text-center animate-in zoom-in duration-300">
                            <div className="w-24 h-24 bg-yellow-500/20 rounded-full flex items-center justify-center mb-6">
                                <Trophy size={48} className="text-yellow-500" />
                            </div>
                            <h2 className="text-4xl font-black text-white mb-2">축하합니다!</h2>
                            <p className="text-slate-400 mb-8">{difficulty.toUpperCase()} 난이도를 {formatTime(timer)} 만에 해결하셨습니다!</p>

                            <div className="flex flex-col gap-3 w-full max-w-[280px]">
                                <button
                                    onClick={() => startNewGame()}
                                    className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl shadow-lg transition-transform active:scale-95 flex items-center justify-center gap-2"
                                >
                                    <RotateCcw size={18} /> 새로운 퍼즐 도전
                                </button>
                                <button
                                    onClick={() => shareCanvas(containerRef.current, '스도쿠', formatTime(timer))}
                                    className="w-full py-3 bg-slate-700 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
                                >
                                    <Share2 size={18} /> 결과 공유하기
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <ToolGuide
                title="스도쿠 규칙 및 퍼즐 공략 가이드"
                intro="가로, 세로, 그리고 3x3 격자 안에 1부터 9까지의 숫자를 중복 없이 채워 넣는 클래식 논리 퍼즐입니다. 논리적 사고력과 집중력을 기르는 데 탁월한 두뇌 게임입니다."
                steps={[
                    "게임의 난이도(쉬움, 보통, 어려움)를 선택하여 퍼즐을 생성합니다.",
                    "빈 칸을 클릭하고 하단의 숫자 패드나 키보드를 이용해 1~9 사이의 숫자를 입력합니다.",
                    "모든 가로/세로 줄과 3x3 박스에 숫자가 중복되지 않도록 채워나갑니다.",
                    "막힐 때는 '힌트' 버튼을 눌러 정답 숫자를 확인하거나, '삭제' 버튼으로 잘못된 숫자를 지웁니다."
                ]}
                tips={[
                    "한 줄이나 박스에 숫자가 많이 채워진 곳부터 공략하는 것이 유리합니다.",
                    "특정 칸에 들어갈 수 있는 숫자가 단 하나뿐인 '싱글' 포인트를 먼저 찾아보세요.",
                    "숫자를 클릭하면 해당 숫자와 같은 행/열이 하이라이트 되어 추론을 돕습니다."
                ]}
                faqs={[
                    {
                        q: "난이도별 차이가 무엇인가요?",
                        a: "'쉬움'은 힌트 숫자가 많고, '어려움'으로 갈수록 비어있는 칸이 많아져 복합적인 논리 추론이 필요합니다."
                    },
                    {
                        q: "게임 도중 실수를 하면 어떻게 하나요?",
                        a: "잘못 입력한 숫자는 빨간색으로 표시되거나, 힌트와 대조하여 직접 수정할 수 있습니다."
                    }
                ]}
            />
        </div>
    );
};

export default Sudoku;
