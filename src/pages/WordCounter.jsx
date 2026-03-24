import React, { useState, useEffect } from 'react';
import { Type, Copy, Trash2, FileText } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { useLanguage } from '../context/LanguageContext';

const WordCounter = () => {
    const { lang, t } = useLanguage();
    const isEn = lang === 'en';

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
        alert(isEn ? 'Text copied to clipboard.' : '텍스트가 클립보드에 복사되었습니다.');
    };

    const handleClear = () => {
        const confirmMsg = isEn ? 'Are you sure you want to clear all text?' : '입력한 내용을 모두 지우시겠습니까?';
        if (text && window.confirm(confirmMsg)) {
            setText('');
        }
    };

    const faqs = isEn ? [
        {
            q: "Why is 'characters without spaces' important?",
            a: "Many application forms or academic papers limit the document size based purely on the character count excluding blank spaces."
        },
        {
            q: "How is the byte count calculated?",
            a: "It uses UTF-8 encoding standards. English letters and spaces are 1 byte, while emojis or characters in other languages (like Korean) usually take 3-4 bytes."
        },
        {
            q: "Is the text I type saved on a server?",
            a: "No. Everything is calculated in real-time in your browser. We do not store or transmit any text you input."
        }
    ] : [
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

    const steps = isEn ? [
        "Type or paste your content into the large text area.",
        "Check the right side 'Statistics' panel to see real-time updates for Characters, Words, Lines, and Bytes.",
        "Use the Copy button to copy the text to clipboard, or the Clear button to start over."
    ] : [
        "중앙의 텍스트 영역에 글자수를 셀 내용을 입력하거나 붙여넣으세요.",
        "오른쪽 '통계' 섹션에서 글자수(공백 포함/제외), 단어수, 줄 수, 바이트를 실시간으로 확인합니다.",
        "필요한 경우 상단의 복사 아이콘을 눌러 내용을 복사하거나, 휴지통 아이콘을 눌러 초기화하세요."
    ];

    const tips = isEn ? [
        "Use this tool to precisely meet character limits for social media platforms or application forms.",
        "Backup long texts frequently by copying them into another document."
    ] : [
        "자기소개서 작성 시 공백 포함과 제외 기준을 모두 확인하여 분량을 조절해보세요.",
        "복사 버튼을 이용하면 작업한 내용을 즉시 다른 문서로 옮길 수 있습니다.",
        "긴 글을 작성할 때는 중간중간 내용을 복사하여 메모장 등에 백업하시는 것을 권장합니다."
    ];

    const keywordsText = isEn ? "word counter, character counter, byte counter, count letters, online counter" : "글자수세기, 글자수계산기, 자기소개서글자수, 공백제외글자수, 바이트계산, 단어수세기, 온라인글자수";

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <SEO
                title={t('tools.word-count.title')}
                description={t('tools.word-count.description')}
                keywords={keywordsText}
                category="text"
                faqs={faqs}
                steps={steps}
            />

            <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-2xl text-white mb-4 shadow-lg">
                    <Type size={32} />
                </div>
                <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-3 tracking-tight">
                    {isEn ? 'Real-time Word Counter' : '실시간 글자수 계산기'}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                    {isEn ? 'Quickly count characters, words, lines, and bytes.' : '글자수, 단어수, 바이트까지 실시간으로 오차 없이 확인하세요.'}
                </p>
            </div>

            <div className="grid lg:grid-cols-[1fr,300px] gap-8 mb-12">
                {/* Input Area */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center px-2">
                        <label className="flex items-center gap-2 font-bold text-gray-700 dark:text-gray-300">
                            <FileText className="w-5 h-5 text-indigo-500" />
                            {isEn ? 'Text Input' : '텍스트 입력'}
                        </label>
                        <div className="flex gap-2">
                            <button
                                onClick={handleCopy}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors border border-gray-200 dark:border-gray-700 font-medium text-sm"
                                title={isEn ? "Copy" : "복사하기"}
                            >
                                <Copy className="w-4 h-4" />
                                {isEn ? 'Copy' : '복사'}
                            </button>
                            <button
                                onClick={handleClear}
                                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-red-500 transition-colors border border-gray-200 dark:border-gray-700 font-medium text-sm"
                                title={isEn ? "Clear" : "지우기"}
                            >
                                <Trash2 className="w-4 h-4" />
                                {isEn ? 'Clear' : '초기화'}
                            </button>
                        </div>
                    </div>
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder={isEn ? "Type or paste your text here to count..." : "분량을 확인하고 싶은 텍스트를 이곳에 입력하거나 붙여넣으세요..."}
                        className="w-full h-[500px] p-8 rounded-3xl bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 shadow-xl resize-none outline-none transition-all text-lg leading-relaxed dark:text-white placeholder-gray-400"
                    />
                </div>

                {/* Stats Sidebar */}
                <div className="space-y-6">
                    <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 border border-gray-100 dark:border-gray-700 shadow-xl sticky top-24">
                        <h3 className="font-black text-xl text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-700 pb-5 mb-6">
                            {isEn ? 'Statistics' : '분석 통계'}
                        </h3>

                        <div className="space-y-6">
                            <div className="group">
                                <span className="text-sm font-bold text-gray-500 dark:text-gray-400 block mb-1">{isEn ? 'Characters (With Spaces)' : '글자수 (공백포함)'}</span>
                                <span className="font-black text-3xl text-indigo-600 dark:text-indigo-400">{stats.chars.toLocaleString()}</span>
                            </div>
                            <div className="group">
                                <span className="text-sm font-bold text-gray-500 dark:text-gray-400 block mb-1">{isEn ? 'Characters (No Spaces)' : '글자수 (공백제외)'}</span>
                                <span className="font-black text-3xl text-indigo-600 dark:text-indigo-400">{stats.charsNoSpace.toLocaleString()}</span>
                            </div>
                            <div className="pt-6 border-t border-gray-100 dark:border-gray-700 space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-bold text-gray-500 dark:text-gray-400">{isEn ? 'Words' : '단어 수'}</span>
                                    <span className="font-bold text-gray-900 dark:text-white">{stats.words.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-bold text-gray-500 dark:text-gray-400">{isEn ? 'Lines' : '줄 수'}</span>
                                    <span className="font-bold text-gray-900 dark:text-white">{stats.lines.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-bold text-gray-500 dark:text-gray-400">{isEn ? 'Bytes' : '파일 용량 (Byte)'}</span>
                                    <span className="font-bold text-gray-900 dark:text-white">{stats.bytes.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ToolGuide
                title={isEn ? "Word / Character Counter Guide" : "글자수 세기 사용 가이드"}
                intro={isEn 
                    ? "Our real-time word counter provides instantaneous layout size and detailed statistics regarding your text input. Perfect for adjusting text limits precisely." 
                    : "본 글자수 세기 도구는 실시간 분석 엔진을 탑재하여 텍스트를 입력하는 즉시 다양한 통계 정보를 제공합니다. 자기소개서, SNS 포스팅, 법률 문서 등 정확한 분량 조절이 필요한 모든 작업에 최적화되어 있습니다."}
                steps={steps}
                tips={tips}
                faqs={faqs}
            />
        </div>
    );
};

export default WordCounter;
