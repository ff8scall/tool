import React, { useState } from 'react';
import { Binary, ArrowRightLeft, Copy, Trash2 } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';

const UnicodeConverter = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [mode, setMode] = useState('encode'); // 'encode' (Text -> Unicode), 'decode' (Unicode -> Text)

    const convert = (text, currentMode) => {
        if (!text) {
            setOutput('');
            return;
        }

        try {
            if (currentMode === 'encode') {
                // Text to Unicode
                let result = '';
                for (let i = 0; i < text.length; i++) {
                    result += '\\u' + text.charCodeAt(i).toString(16).padStart(4, '0').toUpperCase();
                }
                setOutput(result);
            } else {
                // Unicode to Text
                // Replace \uXXXX with actual characters
                const result = text.replace(/\\u[\dA-F]{4}/gi, (match) => {
                    return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
                });
                setOutput(result);
            }
        } catch (e) {
            setOutput('변환 중 오류가 발생했습니다. 유니코드 형식을 확인해주세요.');
        }
    };

    const handleInputChange = (e) => {
        const text = e.target.value;
        setInput(text);
        convert(text, mode);
    };

    const handleModeToggle = () => {
        const newMode = mode === 'encode' ? 'decode' : 'encode';
        setMode(newMode);
        // Swap input and output for convenience
        setInput(output);
        convert(output, newMode);
    };

    const handleCopy = () => {
        if (!output) return;
        navigator.clipboard.writeText(output);
        alert('결과가 복사되었습니다.');
    };

    const handleClear = () => {
        setInput('');
        setOutput('');
    };

    const toolFaqs = [
        {
            "q": "유니코드(Unicode)란 무엇인가요?",
            "a": "전 세계의 모든 문자를 컴퓨터에서 일관되게 표현하고 다룰 수 있도록 설계된 산업 표준입니다. 각 문자마다 고유한 숫자 값(코드 포인트)을 부여합니다."
        },
        {
            "q": "\\uXXXX 형식은 무엇인가요?",
            "a": "자바스크립트, 자바, C# 등 여러 프로그래밍 언어에서 유니코드 문자를 표현하는 이스케이프 시퀀스 방식입니다. 'XXXX'는 해당 문자의 16진수 코드 값을 나타냅니다."
        },
        {
            "q": "특수 문자나 이모지도 변환이 가능한가요?",
            "a": "네, 한글뿐만 아니라 특수 기호, 한자, 그리고 기본적인 이모지까지 모두 유니코드 이스케이프 형태로 변환하고 다시 복구할 수 있습니다."
        }
    ];

    const toolSteps = [
        "변환 모드(텍스트→유니코드 또는 유니코드→텍스트)를 선택하세요.",
        "왼쪽 입력창에 변환하고 싶은 내용을 입력합니다.",
        "오른쪽 결과창에 실시간으로 생성되는 변환 값을 확인하고 복사 버튼을 눌러 사용하세요."
    ];

    const toolTips = [
        "프로그래밍 소스 코드 내에서 특수 문자를 안전하게 포함시키고 싶을 때 유용합니다.",
        "가운데 화살표 버튼을 누르면 입력값과 결과값을 서로 맞바꾸어 반대 방향 변환을 바로 수행할 수 있습니다.",
        "유니코드 입력 시 반드시 \\u 로 시작하는 4자리 16진수 형식을 지켜주세요."
    ];

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <SEO
                title="유니코드 변환기 | Unicode 인코딩 및 디코딩 온라인 도구"
                description="한글 및 특수 문자를 유니코드(\\uXXXX) 이스케이프 시퀀스로 즉시 변환하거나 복구하세요. 개발자를 위한 빠르고 정확한 무료 온라인 유니코드 도구입니다."
                keywords="유니코드변환기, unicode converter, 유니코드인코딩, 유니코드디코딩, 한글유니코드변환, 개발자도구, 이스케이프시퀀스"
                category="dev"
                faqs={toolFaqs}
                steps={toolSteps}
            />

            <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center p-3 bg-purple-500 rounded-2xl text-white mb-4 shadow-lg">
                    <Binary size={32} />
                </div>
                <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-3 tracking-tight">
                    유니코드 변환기
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                    텍스트와 유니코드 이스케이프(\uXXXX)를 자유롭게 번역하세요.
                </p>
            </div>

            <div className="grid md:grid-cols-[1fr,auto,1fr] gap-6 items-start mb-12">
                {/* Input Section */}
                <div className="space-y-3">
                    <label className="block text-sm font-bold text-gray-500 dark:text-gray-400 ml-2">
                        {mode === 'encode' ? '일반 텍스트 (입력)' : '유니코드 (입력)'}
                    </label>
                    <textarea
                        value={input}
                        onChange={handleInputChange}
                        placeholder={mode === 'encode' ? '안녕하세요' : '\\uC548\\uB155\\uD558\\uC138\\uC694'}
                        className="w-full h-[350px] p-6 rounded-3xl bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/10 shadow-xl resize-none outline-none transition-all font-mono text-base dark:text-white"
                    />
                </div>

                {/* Controls */}
                <div className="flex md:flex-col gap-4 justify-center h-full pt-10">
                    <button
                        onClick={handleModeToggle}
                        className="p-5 rounded-full bg-white dark:bg-gray-800 text-purple-600 border border-gray-200 dark:border-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-all shadow-lg active:scale-95"
                        title={mode === 'encode' ? '디코딩 모드로 전환' : '인코딩 모드로 전환'}
                    >
                        <ArrowRightLeft className="w-8 h-8" />
                    </button>
                </div>

                {/* Output Section */}
                <div className="space-y-3">
                    <div className="flex justify-between items-center ml-2">
                        <label className="block text-sm font-bold text-gray-500 dark:text-gray-400">
                            {mode === 'encode' ? '유니코드 (결과)' : '일반 텍스트 (결과)'}
                        </label>
                        <div className="flex gap-2">
                            <button
                                onClick={handleCopy}
                                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-purple-600 transition-colors"
                                title="복사하기"
                            >
                                <Copy className="w-5 h-5" />
                            </button>
                            <button
                                onClick={handleClear}
                                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:text-red-500 transition-colors"
                                title="지우기"
                            >
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                    <textarea
                        value={output}
                        readOnly
                        placeholder="변환 결과가 여기에 표시됩니다."
                        className="w-full h-[350px] p-6 rounded-3xl bg-gray-50 dark:bg-gray-900 border-2 border-dashed border-gray-200 dark:border-gray-700 resize-none outline-none font-mono text-base text-gray-700 dark:text-gray-300 shadow-inner"
                    />
                </div>
            </div>

            <ToolGuide
                title="유니코드 변환기 사용 가이드"
                intro="유니코드 변환기는 다국어 지원이 필요한 프로그래밍 환경이나 데이터 처리 과정에서 문자 깨짐 현상을 방지하기 위해 필수적인 도구입니다. 복잡한 설비 없이 웹 브라우저에서 바로 텍스트를 인코딩하거나 복원할 수 있습니다."
                steps={toolSteps}
                tips={toolTips}
                faqs={toolFaqs}
            />
        </div>
    );
};

export default UnicodeConverter;
