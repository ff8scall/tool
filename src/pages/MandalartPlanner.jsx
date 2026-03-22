import React, { useState, useRef } from 'react';
import { Download, RefreshCw, Info } from 'lucide-react';
import { domToPng } from 'modern-screenshot';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';

const toolFaqs = [
    {
        "q": "만다라트 플래너란 무엇인가요?",
        "a": "핵심 목표를 중심으로 8개의 세부 목표와 64개의 실행 계획을 시각화하는 목표 설정 기법입니다. 오타니 쇼헤이 선수가 사용하면서 유명해졌습니다."
    },
    {
        "q": "입력한 내용이 자동으로 저장되나요?",
        "a": "브라우저의 로컬 스토리지에 저장되지만, 중요한 계획은 '이미지로 저장' 버튼을 눌러 별도로 보관하는 것을 권장합니다."
    }
];

const toolSteps = [
    "정중앙의 칸에 가장 핵심이 되는 '최종 목표'를 작성합니다.",
    "중앙을 둘러싼 8칸에 최종 목표 달성을 위한 '세부 목표'를 작성합니다.",
    "각 세부 목표를 둘러싼 그리드에 구체적인 '실행 계획'들을 채워 넣습니다.",
    "모든 칸을 채운 뒤 '이미지로 저장' 버튼을 눌러 계획표를 소장하세요."
];

const toolTips = [
    "64칸을 한꺼번에 채우려 하지 마세요. 핵심에서 주변부로 천천히 확장해 나가는 것이 중요합니다.",
    "저장된 이미지를 스마트폰 배경화면으로 설정해 매일 목표를 상기시켜보세요."
];

const MandalartPlanner = () => {
    // Main goal state
    const [mainGoal, setMainGoal] = useState('');

    // Sub goals state (8 items)
    const [subGoals, setSubGoals] = useState(Array(8).fill(''));

    // Detailed tasks state (8 groups of 8 items) - Fixed shared reference issue
    const [tasks, setTasks] = useState(Array.from({ length: 8 }, () => Array(8).fill('')));

    const containerRef = useRef(null);
    const [isCapturing, setIsCapturing] = useState(false);

    // Colors for each section to differentiate them visually
    const sectionColors = [
        'bg-red-50/30', 'bg-orange-50/30', 'bg-lime-50/30',
        'bg-green-50/30', 'bg-cyan-50/30', 'bg-blue-50/30',
        'bg-violet-50/30', 'bg-fuchsia-50/30'
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
            setTasks(Array.from({ length: 8 }, () => Array(8).fill('')));
        }
    };

    // Render a 3x3 grid for a specific section
    const renderGridSection = (type, index = 0) => {
        if (type === 'center') {
            return (
                <div key="grid-center" className="grid grid-cols-3 gap-1 p-1 bg-white border-2 border-gray-800 aspect-square shadow-sm">
                    {/* Top Row: Sub Goals 0, 1, 2 */}
                    {[0, 1, 2].map(i => (
                        <div key={`center-top-${i}`} className={`flex items-center justify-center p-1 text-center text-[10px] sm:text-xs font-medium ${headerColors[i]} rounded`}>
                            <textarea
                                value={subGoals[i]}
                                onChange={(e) => {
                                    const newSubGoals = [...subGoals];
                                    newSubGoals[i] = e.target.value;
                                    setSubGoals(newSubGoals);
                                }}
                                placeholder={`세부목표 ${i + 1}`}
                                className="w-full h-full text-center bg-transparent outline-none resize-none placeholder-opacity-50 text-[10px] sm:text-xs"
                            />
                        </div>
                    ))}

                    {/* Middle Row: Sub Goal 7, Main Goal, Sub Goal 3 */}
                    <div className={`flex items-center justify-center p-1 text-center text-[10px] sm:text-xs font-medium ${headerColors[7]} rounded`}>
                        <textarea
                            value={subGoals[7]}
                            onChange={(e) => {
                                const newSubGoals = [...subGoals];
                                newSubGoals[7] = e.target.value;
                                setSubGoals(newSubGoals);
                            }}
                            placeholder="세부목표 8"
                            className="w-full h-full text-center bg-transparent outline-none resize-none placeholder-opacity-50 text-[10px] sm:text-xs"
                        />
                    </div>

                    <div className="flex items-center justify-center p-1 text-center font-bold text-xs sm:text-sm bg-gray-900 text-white rounded relative group">
                        <textarea
                            value={mainGoal}
                            onChange={(e) => setMainGoal(e.target.value)}
                            placeholder="최종목표"
                            className="w-full h-full text-center bg-transparent outline-none resize-none flex items-center justify-center placeholder-gray-400 overflow-hidden text-xs sm:text-sm leading-tight"
                        />
                    </div>

                    <div className={`flex items-center justify-center p-1 text-center text-[10px] sm:text-xs font-medium ${headerColors[3]} rounded`}>
                        <textarea
                            value={subGoals[3]}
                            onChange={(e) => {
                                const newSubGoals = [...subGoals];
                                newSubGoals[3] = e.target.value;
                                setSubGoals(newSubGoals);
                            }}
                            placeholder="세부목표 4"
                            className="w-full h-full text-center bg-transparent outline-none resize-none placeholder-opacity-50 text-[10px] sm:text-xs"
                        />
                    </div>

                    {/* Bottom Row: Sub Goals 6, 5, 4 */}
                    {[6, 5, 4].map(i => (
                        <div key={`center-bottom-${i}`} className={`flex items-center justify-center p-1 text-center text-[10px] sm:text-xs font-medium ${headerColors[i]} rounded`}>
                            <textarea
                                value={subGoals[i]}
                                onChange={(e) => {
                                    const newSubGoals = [...subGoals];
                                    newSubGoals[i] = e.target.value;
                                    setSubGoals(newSubGoals);
                                }}
                                placeholder={`세부목표 ${i + 1}`}
                                className="w-full h-full text-center bg-transparent outline-none resize-none placeholder-opacity-50 text-[10px] sm:text-xs"
                            />
                        </div>
                    ))}
                </div>
            );
        } else {
            return (
                <div key={`grid-${index}`} className={`grid grid-cols-3 gap-1 p-1 bg-white border border-gray-200 aspect-square ${sectionColors[index]} shadow-sm`}>
                    {/* Row 1 */}
                    {[0, 1, 2].map(tMsgIdx => (
                        <div key={`task-${index}-${tMsgIdx}`} className="flex items-center justify-center p-0.5">
                            <textarea
                                value={tasks[index][tMsgIdx]}
                                onChange={(e) => updateTask(index, tMsgIdx, e.target.value)}
                                className="w-full h-full text-[9px] sm:text-[11px] text-center bg-white/60 border border-gray-100 rounded focus:bg-white focus:border-indigo-300 outline-none resize-none p-1 leading-tight"
                            />
                        </div>
                    ))}

                    {/* Row 2 */}
                    <div key={`task-${index}-7`} className="flex items-center justify-center p-0.5">
                        <textarea
                            value={tasks[index][7]}
                            onChange={(e) => updateTask(index, 7, e.target.value)}
                            className="w-full h-full text-[9px] sm:text-[11px] text-center bg-white/60 border border-gray-100 rounded focus:bg-white focus:border-indigo-300 outline-none resize-none p-1 leading-tight"
                        />
                    </div>

                    {/* Center of Sub Grid (ReadOnly from Main Grid) */}
                    <div key={`task-${index}-center`} className={`flex items-center justify-center p-1 text-center text-[10px] sm:text-xs font-bold ${headerColors[index]} rounded select-none overflow-hidden break-words`}>
                        <div className="flex items-center justify-center h-full w-full break-keep">
                            {subGoals[index] || `세부목표 ${index + 1}`}
                        </div>
                    </div>

                    <div key={`task-${index}-3`} className="flex items-center justify-center p-0.5">
                        <textarea
                            value={tasks[index][3]}
                            onChange={(e) => updateTask(index, 3, e.target.value)}
                            className="w-full h-full text-[9px] sm:text-[11px] text-center bg-white/60 border border-gray-100 rounded focus:bg-white focus:border-indigo-300 outline-none resize-none p-1 leading-tight"
                        />
                    </div>

                    {/* Row 3 */}
                    {[6, 5, 4].map(tMsgIdx => (
                        <div key={`task-${index}-${tMsgIdx}`} className="flex items-center justify-center p-0.5">
                            <textarea
                                value={tasks[index][tMsgIdx]}
                                onChange={(e) => updateTask(index, tMsgIdx, e.target.value)}
                                className="w-full h-full text-[9px] sm:text-[11px] text-center bg-white/60 border border-gray-100 rounded focus:bg-white focus:border-indigo-300 outline-none resize-none p-1 leading-tight"
                            />
                        </div>
                    ))}
                </div>
            );
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <SEO
                title="만다라트 플래너 | 온라인 목표 설정 도구"
                description="오타니 쇼헤이의 목표 달성 비법! 온라인에서 간편하게 만다라트 계획표를 작성하고 관리하세요. 핵심 목표를 64개의 구체적인 실행 계획으로 시각화할 수 있습니다."
                keywords="만다라트, 목표설정, 오타니만다라트, 계획표, 비주얼플래닝, 온라인플래너"
                category="utility"
                faqs={toolFaqs}
                steps={toolSteps}
            />

            <div className="text-center mb-10">
                <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-3 tracking-tight">
                    만다라트 플래너
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                    최종 목표를 달성하기 위한 8개의 세부 목표와 64개의 실행 계획을 세워보세요.
                </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700 p-4 sm:p-8 mb-12">
                <div className="flex justify-end gap-3 mb-6">
                    <button
                        onClick={handleReset}
                        className="flex items-center px-5 py-2.5 text-sm font-bold text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition-all active:scale-95"
                    >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        초기화
                    </button>
                    <button
                        onClick={handleDownload}
                        disabled={isCapturing}
                        className="flex items-center px-5 py-2.5 text-sm font-bold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 transition-all active:scale-95 shadow-lg shadow-indigo-600/20 disabled:opacity-50"
                    >
                        <Download className="w-4 h-4 mr-2" />
                        이미지로 저장
                    </button>
                </div>

                {/* The Grid Container */}
                <div className="overflow-x-auto pb-6 custom-scrollbar">
                    <div
                        ref={containerRef}
                        className="grid grid-cols-3 gap-1 md:gap-3 bg-gray-50 p-2 md:p-6 min-w-[700px] aspect-square mx-auto rounded-2xl border border-gray-200"
                    >
                        {/* 0, 1, 2 */}
                        {renderGridSection('surround', 0)}
                        {renderGridSection('surround', 1)}
                        {renderGridSection('surround', 2)}

                        {/* 7, Center, 3 */}
                        {renderGridSection('surround', 7)}
                        {renderGridSection('center')}
                        {renderGridSection('surround', 3)}

                        {/* 6, 5, 4 */}
                        {renderGridSection('surround', 6)}
                        {renderGridSection('surround', 5)}
                        {renderGridSection('surround', 4)}
                    </div>
                </div>

                <div className="mt-8 p-6 bg-indigo-50/50 dark:bg-indigo-900/10 rounded-2xl border border-indigo-100 dark:border-indigo-800/30">
                    <h3 className="text-lg font-bold text-indigo-900 dark:text-indigo-300 mb-3 flex items-center">
                        <Info className="w-5 h-5 mr-2" />
                        작성 방법 안내
                    </h3>
                    <ul className="space-y-2 text-sm text-indigo-800/80 dark:text-indigo-300/80 font-medium">
                        <li className="flex items-start gap-2">
                            <span className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center text-[10px] font-bold shrink-0">1</span>
                            정중앙의 <strong>최종목표</strong> 칸에 가장 큰 목표를 입력합니다.
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center text-[10px] font-bold shrink-0">2</span>
                            주변 8개의 <strong>세부목표</strong> 칸에 최종목표 달성을 위한 하위 목표를 입력합니다.
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center text-[10px] font-bold shrink-0">3</span>
                            동기화된 외곽의 8개 그리드에 각 세부목표를 이루기 위한 <strong>구체적인 행동</strong>을 채웁니다.
                        </li>
                    </ul>
                </div>
            </div>

            <ToolGuide
                title="만다라트 플래너 사용 가이드"
                intro="만다라트 기법은 목표를 시각화하고 세분화하는 데 가장 효율적인 도구입니다. 정중앙으로부터 시작해 주변으로 뻗어나가는 64개의 행동 계획을 통해, 막연했던 꿈을 구체적인 로드맵으로 바꿀 수 있습니다."
                steps={toolSteps}
                tips={toolTips}
                faqs={toolFaqs}
            />
        </div>
    );
};

export default MandalartPlanner;
