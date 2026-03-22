import React, { useState } from 'react';
import { Copy, Check, Type, RefreshCw } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';

const StringConverter = () => {
    const [input, setInput] = useState('');
    const [copied, setCopied] = useState('');

    const conversions = [
        {
            name: '대문자 (UPPERCASE)',
            convert: (str) => str.toUpperCase()
        },
        {
            name: '소문자 (lowercase)',
            convert: (str) => str.toLowerCase()
        },
        {
            name: '첫 글자만 대문자 (Sentence case)',
            convert: (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
        },
        {
            name: '단어별 첫 글자 대문자 (Title Case)',
            convert: (str) => str.replace(/\b\w/g, c => c.toUpperCase())
        },
        {
            name: '모든 공백 제거 (No Space)',
            convert: (str) => str.replace(/\s+/g, '')
        },
        {
            name: '앞뒤 공백만 제거 (Trim)',
            convert: (str) => str.trim()
        },
        {
            name: '줄바꿈을 공백으로 (No Newlines)',
            convert: (str) => str.replace(/\n/g, ' ')
        },
        {
            name: '문자열 뒤집기 (Reverse)',
            convert: (str) => str.split('').reverse().join('')
        }
    ];

    const copyToClipboard = (text, label) => {
        if (!text) return;
        navigator.clipboard.writeText(text);
        setCopied(label);
        setTimeout(() => setCopied(''), 1500);
    };

    const handleClear = () => {
        setInput('');
    };

    const toolFaqs = [
        {
            "q": "어떤 종류의 변환이 가능한가요?",
            "a": "영어 대소문자 상호 변환, 문장 첫 글자 대문자화, 공백 및 줄바꿈 제거, 문자열 역순 정렬 등 8가지 필수 변환 기능을 제공합니다."
        },
        {
            "q": "한글도 변환이 되나요?",
            "a": "대소문자 구분이 없는 한글의 경우 대소문자 변환은 적용되지 않으나, 공백 제거, 줄바꿈 제거, 문자열 뒤집기 기능은 정상적으로 작동합니다."
        },
        {
            "q": "대량의 텍스트도 처리가 기능한가요?",
            "a": "네, 수천 자 이상의 텍스트도 실시간으로 변환이 가능합니다. 다만 브라우저 메모리 한계에 따라 매우 방대한 양은 속도가 저하될 수 있습니다."
        }
    ];

    const toolSteps = [
        "상단 입력창에 변환하고 싶은 텍스트를 입력하거나 붙여넣으세요.",
        "텍스트를 입력하면 하단에 8가지 변환 결과가 실시간으로 나타납니다.",
        "원하는 변환 방식의 카드 오른쪽 상단에 있는 복사 아이콘을 눌러 결과를 사용하세요."
    ];

    const toolTips = [
        "코딩 시 변수명을 정리하거나 이메일 주소의 공백을 제거할 때 매우 유용합니다.",
        "Title Case 변환은 영어 제목이나 문서의 헤드라인을 작성할 때 표준 규격에 맞게 도와줍니다.",
        "입력창이 꽉 찼다면 오른쪽 상단의 초기화(새로고침 아이콘) 버튼을 눌러 비울 수 있습니다."
    ];

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <SEO
                title="문자열 변환기 | 대소문자 변환, 공백 제거, 텍스트 편집 온라인 도구"
                description="텍스트를 대문자나 소문자로 바꾸고, 공백을 제거하거나 문자열을 뒤집는 등 다양한 텍스트 편집 작업을 클릭 한 번으로 해결하세요. 실시간 무료 온라인 문자열 변환기입니다."
                keywords="문자열변환기, 대소문자변환, 공백제거, 텍스트편집, 첫글자대문자, 문자열뒤집기, 온라인텍스트도구"
                category="text"
                faqs={toolFaqs}
                steps={toolSteps}
            />

            <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center p-3 bg-blue-600 rounded-2xl text-white mb-4 shadow-lg">
                    <Type size={32} />
                </div>
                <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-3 tracking-tight">
                    문자열 변환기
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                    복잡한 텍스트 편집, 클릭 한 번으로 완벽하게 변환하세요.
                </p>
            </div>

            {/* Input Section */}
            <div className="bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 rounded-3xl p-8 mb-8 shadow-xl">
                <div className="flex justify-between items-center mb-4 px-2">
                    <label className="block text-sm font-black text-gray-500 dark:text-gray-400">
                        변환할 소스 텍스트
                    </label>
                    {input && (
                        <button 
                            onClick={handleClear}
                            className="text-xs font-bold text-gray-400 hover:text-red-500 flex items-center gap-1 transition-colors"
                        >
                            <RefreshCw size={14} /> 초기화
                        </button>
                    )}
                </div>
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="여기에 변환하고 싶은 문장을 입력하세요..."
                    className="w-full h-40 p-6 bg-gray-50 dark:bg-gray-900 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-2xl resize-none focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all text-lg dark:text-white"
                />
            </div>

            {/* Conversions Output Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {conversions.map((conv, idx) => {
                    const result = input ? conv.convert(input) : '';
                    return (
                        <div key={idx} className="group bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all hover:-translate-y-1">
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="font-black text-sm text-gray-400 group-hover:text-blue-600 transition-colors uppercase tracking-wider">{conv.name}</h3>
                                <button
                                    onClick={() => copyToClipboard(result, conv.name)}
                                    disabled={!result}
                                    className={`p-2 rounded-xl transition-all ${copied === conv.name ? 'bg-green-100 text-green-600' : 'bg-gray-50 dark:bg-gray-900 text-gray-400 hover:bg-blue-50 hover:text-blue-600'}`}
                                    title="복사"
                                >
                                    {copied === conv.name ? (
                                        <Check className="w-5 h-5" />
                                    ) : (
                                        <Copy className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                            <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl text-lg break-all min-h-[3.5rem] flex items-center border border-transparent group-hover:border-blue-100 dark:group-hover:border-blue-900/30 transition-colors font-medium dark:text-gray-200">
                                {result || <span className="text-gray-300 dark:text-gray-600 text-sm italic">입력 시 결과가 표시됩니다.</span>}
                            </div>
                        </div>
                    );
                })}
            </div>

            <ToolGuide
                title="문자열 변환기 상세 가이드"
                intro="문자열 변환기는 일상적인 문서 작업부터 정교한 프로그래밍 데이터 정제까지 폭넓게 활용할 수 있는 다목적 텍스트 편집 도구입니다. 복잡한 명령어나 수식 없이 실시간으로 결과를 확인할 수 있어 작업 시간을 획기적으로 단축해 드립니다."
                steps={toolSteps}
                tips={toolTips}
                faqs={toolFaqs}
            />
        </div>
    );
};

export default StringConverter;
