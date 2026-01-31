import React, { useState, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Download, RefreshCw, Info, Share2 } from 'lucide-react';
import { domToPng } from 'modern-screenshot';

const MandalartPlanner = () => {
    // Main goal state
    const [mainGoal, setMainGoal] = useState('');

    // Sub goals state (8 items)
    const [subGoals, setSubGoals] = useState(Array(8).fill(''));

    // Detailed tasks state (8 groups of 8 items)
    const [tasks, setTasks] = useState(Array(8).fill(Array(8).fill('')));

    const containerRef = useRef(null);
    const [isCapturing, setIsCapturing] = useState(false);

    // Colors for each section to differentiate them visually
    const sectionColors = [
        'bg-red-50', 'bg-orange-50', 'bg-lime-50',
        'bg-green-50', 'bg-cyan-50', 'bg-blue-50',
        'bg-violet-50', 'bg-fuchsia-50'
    ];

    const borderColors = [
        'border-red-200', 'border-orange-200', 'border-lime-200',
        'border-green-200', 'border-cyan-200', 'border-blue-200',
        'border-violet-200', 'border-fuchsia-200'
    ];

    const headerColors = [
        'bg-red-100 text-red-800', 'bg-orange-100 text-orange-800', 'bg-lime-100 text-lime-800',
        'bg-green-100 text-green-800', 'bg-cyan-100 text-cyan-800', 'bg-blue-100 text-blue-800',
        'bg-violet-100 text-violet-800', 'bg-fuchsia-100 text-fuchsia-800'
    ];

    // Helper to update specific task
    const updateTask = (groupIndex, taskIndex, value) => {
        const newTasks = [...tasks];
        const newGroup = [...newTasks[groupIndex]];
        newGroup[taskIndex] = value;
        newTasks[groupIndex] = newGroup;
        setTasks(newTasks);
    };

    const handleDownload = async () => {
        if (!containerRef.current) return;

        try {
            setIsCapturing(true);
            const dataUrl = await domToPng(containerRef.current, {
                scale: 2,
                backgroundColor: '#ffffff',
            });

            const link = document.createElement('a');
            link.download = 'mandalart-plan.png';
            link.href = dataUrl;
            link.click();
        } catch (err) {
            console.error('Failed to save image:', err);
            alert('이미지 저장에 실패했습니다.');
        } finally {
            setIsCapturing(false);
        }
    };

    const handleReset = () => {
        if (window.confirm('모든 내용을 초기화하시겠습니까?')) {
            setMainGoal('');
            setSubGoals(Array(8).fill(''));
            setTasks(Array(8).fill(Array(8).fill('')));
        }
    };

    // Render a 3x3 grid for a specific section
    // type: 'center' | 'surround'
    // index: 0-7 for surround sections (starts top-left, clockwise)
    const renderGridSection = (type, index = 0) => {
        if (type === 'center') {
            return (
                <div className="grid grid-cols-3 gap-1 p-1 bg-white border-2 border-gray-800 aspect-square">
                    {/* Top Row: Sub Goals 0, 1, 2 */}
                    {[0, 1, 2].map(i => (
                        <div key={`center-top-${i}`} className={`flex items-center justify-center p-1 text-center text-xs sm:text-sm font-medium ${headerColors[i]} rounded`}>
                            <input
                                type="text"
                                value={subGoals[i]}
                                onChange={(e) => {
                                    const newSubGoals = [...subGoals];
                                    newSubGoals[i] = e.target.value;
                                    setSubGoals(newSubGoals);
                                }}
                                placeholder={`목표 ${i + 1}`}
                                className="w-full h-full text-center bg-transparent outline-none resize-none placeholder-opacity-50"
                            />
                        </div>
                    ))}

                    {/* Middle Row: Sub Goal 7, Main Goal, Sub Goal 3 */}
                    <div className={`flex items-center justify-center p-1 text-center text-xs sm:text-sm font-medium ${headerColors[7]} rounded`}>
                        <input
                            type="text"
                            value={subGoals[7]}
                            onChange={(e) => {
                                const newSubGoals = [...subGoals];
                                newSubGoals[7] = e.target.value;
                                setSubGoals(newSubGoals);
                            }}
                            placeholder="목표 8"
                            className="w-full h-full text-center bg-transparent outline-none resize-none placeholder-opacity-50"
                        />
                    </div>

                    <div className="flex items-center justify-center p-1 text-center font-bold text-sm sm:text-base bg-gray-800 text-white rounded relative group">
                        <textarea
                            value={mainGoal}
                            onChange={(e) => setMainGoal(e.target.value)}
                            placeholder="최종 목표"
                            className="w-full h-full text-center bg-transparent outline-none resize-none flex items-center justify-center pt-2 sm:pt-4 placeholder-gray-400 overflow-hidden"
                            style={{ minHeight: '100%' }}
                        />
                    </div>

                    <div className={`flex items-center justify-center p-1 text-center text-xs sm:text-sm font-medium ${headerColors[3]} rounded`}>
                        <input
                            type="text"
                            value={subGoals[3]}
                            onChange={(e) => {
                                const newSubGoals = [...subGoals];
                                newSubGoals[3] = e.target.value;
                                setSubGoals(newSubGoals);
                            }}
                            placeholder="목표 4"
                            className="w-full h-full text-center bg-transparent outline-none resize-none placeholder-opacity-50"
                        />
                    </div>

                    {/* Bottom Row: Sub Goals 6, 5, 4 */}
                    {[6, 5, 4].map(i => (
                        <div key={`center-bottom-${i}`} className={`flex items-center justify-center p-1 text-center text-xs sm:text-sm font-medium ${headerColors[i]} rounded`}>
                            <input
                                type="text"
                                value={subGoals[i]}
                                onChange={(e) => {
                                    const newSubGoals = [...subGoals];
                                    newSubGoals[i] = e.target.value;
                                    setSubGoals(newSubGoals);
                                }}
                                placeholder={`목표 ${i + 1}`}
                                className="w-full h-full text-center bg-transparent outline-none resize-none placeholder-opacity-50"
                            />
                        </div>
                    ))}
                </div>
            );
        } else {
            // Surrounding grids
            // The center cell of this grid is the subGoal[index]
            // The surrounding 8 cells are tasks[index][0~7]
            return (
                <div className={`grid grid-cols-3 gap-1 p-1 bg-white border border-gray-300 aspect-square ${sectionColors[index]}`}>
                    {/* Row 1 */}
                    {[0, 1, 2].map(tMsgIdx => (
                        <div key={`task-${index}-${tMsgIdx}`} className="flex items-center justify-center p-0.5">
                            <textarea
                                value={tasks[index][tMsgIdx]}
                                onChange={(e) => updateTask(index, tMsgIdx, e.target.value)}
                                className="w-full h-full text-[10px] sm:text-xs text-center bg-white/50 border border-gray-100 rounded focus:bg-white focus:border-blue-300 outline-none resize-none p-1"
                            />
                        </div>
                    ))}

                    {/* Row 2 */}
                    <div className="flex items-center justify-center p-0.5">
                        <textarea
                            value={tasks[index][7]}
                            onChange={(e) => updateTask(index, 7, e.target.value)}
                            className="w-full h-full text-[10px] sm:text-xs text-center bg-white/50 border border-gray-100 rounded focus:bg-white focus:border-blue-300 outline-none resize-none p-1"
                        />
                    </div>

                    {/* Center of Sub Grid (ReadOnly from Main Grid) */}
                    <div className={`flex items-center justify-center p-1 text-center text-xs sm:text-sm font-bold ${headerColors[index]} rounded select-none overflow-hidden break-words`}>
                        <div className="flex items-center justify-center h-full w-full break-keep">
                            {subGoals[index] || `목표 ${index + 1}`}
                        </div>
                    </div>

                    <div className="flex items-center justify-center p-0.5">
                        <textarea
                            value={tasks[index][3]}
                            onChange={(e) => updateTask(index, 3, e.target.value)}
                            className="w-full h-full text-[10px] sm:text-xs text-center bg-white/50 border border-gray-100 rounded focus:bg-white focus:border-blue-300 outline-none resize-none p-1"
                        />
                    </div>

                    {/* Row 3 */}
                    {[6, 5, 4].map(tMsgIdx => (
                        <div key={`task-${index}-${tMsgIdx}`} className="flex items-center justify-center p-0.5">
                            <textarea
                                value={tasks[index][tMsgIdx]}
                                onChange={(e) => updateTask(index, tMsgIdx, e.target.value)}
                                className="w-full h-full text-[10px] sm:text-xs text-center bg-white/50 border border-gray-100 rounded focus:bg-white focus:border-blue-300 outline-none resize-none p-1"
                            />
                        </div>
                    ))}
                </div>
            );
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <Helmet>
                <title>만다라트 계획표 만들기 - Tool Hive</title>
                <meta name="description" content="오타니 쇼헤이의 목표 달성 비법, 만다라트 계획표를 온라인에서 쉽게 작성하고 이미지로 저장하세요." />
            </Helmet>

            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                    만다라트 계획표 (Mandalart Planner)
                </h1>
                <p className="text-gray-600 dark:text-gray-300">
                    중심 목표를 달성하기 위한 8가지 세부 목표와 실천 행동을 정리해보세요.
                </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 sm:p-6 mb-8">
                <div className="flex justify-end gap-2 mb-4">
                    <button
                        onClick={handleReset}
                        className="flex items-center px-3 py-1.5 text-sm md:text-base md:px-4 md:py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        초기화
                    </button>
                    <button
                        onClick={handleDownload}
                        disabled={isCapturing}
                        className="flex items-center px-3 py-1.5 text-sm md:text-base md:px-4 md:py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50"
                    >
                        <Download className="w-4 h-4 mr-2" />
                        이미지 저장
                    </button>
                </div>

                {/* The Grid Container */}
                <div className="overflow-x-auto pb-4">
                    <div
                        ref={containerRef}
                        className="grid grid-cols-3 gap-1 md:gap-2 bg-white p-2 md:p-4 min-w-[600px] aspect-square mx-auto border border-gray-200"
                    >
                        {/* 
                    Grid Layout:
                    0 1 2
                    7 C 3
                    6 5 4
                    To match the visual flow, we place them in order 0, 1, 2, 7, Center, 3, 6, 5, 4
                */}
                        {renderGridSection('surround', 0)}
                        {renderGridSection('surround', 1)}
                        {renderGridSection('surround', 2)}

                        {renderGridSection('surround', 7)}
                        {renderGridSection('center')}
                        {renderGridSection('surround', 3)}

                        {renderGridSection('surround', 6)}
                        {renderGridSection('surround', 5)}
                        {renderGridSection('surround', 4)}
                    </div>
                </div>

                <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 flex items-center">
                        <Info className="w-5 h-5 mr-2 text-blue-500" />
                        작성 팁
                    </h3>
                    <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300 space-y-1">
                        <li>가운데 <strong>최종 목표</strong>를 먼저 입력하세요.</li>
                        <li>최종 목표를 둘러싼 8개의 <strong>세부 목표</strong>가 자동으로 바깥쪽 그리드의 중심으로 복사됩니다.</li>
                        <li>각 세부 목표를 달성하기 위한 <strong>구체적인 행동 계획</strong>을 바깥쪽 칸에 채워주세요.</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default MandalartPlanner;
