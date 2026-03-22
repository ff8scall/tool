import React, { useState, useEffect } from 'react';
import { Type, Copy, Trash2, FileText } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';

const WordCounter = () => {
    const [text, setText] = useState('');
    const [stats, setStats] = useState({
        chars: 0,
        charsNoSpace: 0,
        words: 0,
        lines: 0,
        bytes: 0
    });

    useEffect(() => {
        const chars = text.length;
        const charsNoSpace = text.replace(/\s/g, '').length;
        const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
        const lines = text === '' ? 0 : text.split(/\n/).length;

        // Simple byte calculation
        const bytes = new Blob([text]).size;

        setStats({ chars, charsNoSpace, words, lines, bytes });
    }, [text]);

    const handleCopy = () => {
        if (!text) return;
        navigator.clipboard.writeText(text);
        alert('텍스트가 클립보드에 복사되었습니다.');
    };

    const handleClear = () => {
        if (text && window.confirm('입력한 내용을 모두 지우시겠습니까?')) {
            setText('');
        }
    };

    const toolFaqs = [
        {
            "q": "공백 제외 글자수는 왜 중요한가요?",
            "a": "대부분의 자기소개서나 공공기관 제출 문서는 띄어쓰기를 제외한 순수 글자수를 기준으로 분량을 제한하기 때문입니다."
        },
        {
            "q": "바이트(Byte) 계산 기준은 무엇인가요?",
            "a": "한글은 3바이트, 공백 및 영문/숫자는 1바이트로 계산되는 UTF-8 기준을 따릅니다. 다만, 시스템 환경에 따라 약간의 차이가 있을 수 있으니 참고용으로 활용하세요."
        },
        {
            "q": "입력한 텍스트가 서버에 저장되나요?",
            "a": "저희 도구는 브라우저 내에서만 실시간으로 계산하며, 사용자가 입력한 어떠한 텍스트도 서버로 전송하거나 저장하지 않으므로 보안 걱정 없이 사용하셔도 됩니다."
        }
    ];

    const toolSteps = [
        "중앙의 텍스트 영역에 글자수를 셀 내용을 입력하거나 붙여넣으세요.",
        "오른쪽 '통계' 섹션에서 글자수(공백 포함/제외), 단어수, 줄 수, 바이트를 실시간으로 확인합니다.",
        "필요한 경우 상단의 복사 아이콘을 눌러 내용을 복사하거나, 휴지통 아이콘을 눌러 초기화하세요."
    ];

    const toolTips = [
        "자기소개서 작성 시 공백 포함과 제외 기준을 모두 확인하여 분량을 조절해보세요.",
        "복사 버튼을 이용하면 작업한 내용을 즉시 다른 문서로 옮길 수 있습니다.",
        "긴 글을 작성할 때는 중간중간 내용을 복사하여 메모장 등에 백업하시는 것을 권장합니다."
    ];

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <SEO
                title="글자수 세기 | 실시간 글자수 계산 및 자기소개서 분량 확인"
                description="실시간으로 글자수(공백 포함/제외), 단어수, 줄 수, 파일 바이트를 계산해주는 무료 온라인 도구입니다. 취업 자기소개서, 블로그 포스팅, 레포트 분량 확인에 최적화되어 있습니다."
                keywords="글자수세기, 글자수계산기, 자기소개서글자수, 공백제외글자수, 바이트계산, 단어수세기, 온라인글자수"
                category="text"
                faqs={toolFaqs}
                steps={toolSteps}
            />

            <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-2xl text-white mb-4 shadow-lg">
                    <Type size={32} />
                </div>
                <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-3 tracking-tight">
                    실시간 글자수 계산기
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                    글자수, 단어수, 바이트까지 실시간으로 오차 없이 확인하세요.
                </p>
            </div>

            <div className="grid lg:grid-cols-[1fr,300px] gap-8 mb-12">
                {/* Input Area */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center px-2">
                        <label className="flex items-center gap-2 font-bold text-gray-700 dark:text-gray-300">
                            <FileText className="w-5 h-5 text-indigo-500" />
                            텍스트 입력
                        </label>
                        <div className="flex gap-2">
                            <button
                                onClick={handleCopy}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors border border-gray-200 dark:border-gray-700 font-medium text-sm"
                                title="복사하기"
                            >
                                <Copy className="w-4 h-4" />
                                복사
                            </button>
                            <button
                                onClick={handleClear}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-red-500 transition-colors border border-gray-200 dark:border-gray-700 font-medium text-sm"
                                title="지우기"
                            >
                                <Trash2 className="w-4 h-4" />
                                초기화
                            </button>
                        </div>
                    </div>
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="분량을 확인하고 싶은 텍스트를 이곳에 입력하거나 붙여넣으세요..."
                        className="w-full h-[500px] p-8 rounded-3xl bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 shadow-xl resize-none outline-none transition-all text-lg leading-relaxed dark:text-white placeholder-gray-400"
                    />
                </div>

                {/* Stats Sidebar */}
                <div className="space-y-6">
                    <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-100 dark:border-gray-700 shadow-xl sticky top-24">
                        <h3 className="font-black text-xl text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-5 mb-6">분석 통계</h3>

                        <div className="space-y-6">
                            <div className="group">
                                <span className="text-sm font-bold text-gray-500 dark:text-gray-400 block mb-1">글자수 (공백포함)</span>
                                <span className="font-black text-3xl text-indigo-600 dark:text-indigo-400">{stats.chars.toLocaleString()}</span>
                            </div>
                            <div className="group">
                                <span className="text-sm font-bold text-gray-500 dark:text-gray-400 block mb-1">글자수 (공백제외)</span>
                                <span className="font-black text-3xl text-indigo-600 dark:text-indigo-400">{stats.charsNoSpace.toLocaleString()}</span>
                            </div>
                            <div className="pt-6 border-t border-gray-100 dark:border-gray-700 space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-bold text-gray-500 dark:text-gray-400">단어 수</span>
                                    <span className="font-bold text-gray-900 dark:text-white">{stats.words.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-bold text-gray-500 dark:text-gray-400">줄 수</span>
                                    <span className="font-bold text-gray-900 dark:text-white">{stats.lines.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-bold text-gray-500 dark:text-gray-400">파일 용량 (Byte)</span>
                                    <span className="font-bold text-gray-900 dark:text-white">{stats.bytes.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ToolGuide
                title="글자수 세기 사용 가이드"
                intro="본 글자수 세기 도구는 실시간 분석 엔진을 탑재하여 텍스트를 입력하는 즉시 다양한 통계 정보를 제공합니다. 자기소개서, SNS 포스팅, 법률 문서 등 정확한 분량 조절이 필요한 모든 작업에 최적화되어 있습니다."
                steps={toolSteps}
                tips={toolTips}
                faqs={toolFaqs}
            />
        </div>
    );
};

export default WordCounter;
