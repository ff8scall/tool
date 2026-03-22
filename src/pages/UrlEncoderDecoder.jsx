import React, { useState } from 'react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { Link, ArrowRightLeft, Copy, Check } from 'lucide-react';

const UrlEncoderDecoder = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [mode, setMode] = useState('encode'); // 'encode' or 'decode'
    const [copied, setCopied] = useState(false);

    const handleConvert = () => {
        try {
            if (mode === 'encode') {
                setOutput(encodeURIComponent(input));
            } else {
                setOutput(decodeURIComponent(input));
            }
        } catch (error) {
            setOutput('Error: Invalid input for decoding');
        }
    };

    const handleCopy = () => {
        if (!output) return;
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const switchMode = () => {
        setMode(mode === 'encode' ? 'decode' : 'encode');
        setInput(output);
        setOutput('');
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <SEO
                title="URL 인코더/디코더 - URL Encode & Decode"
                description="URL을 인코딩하거나 디코딩하는 무료 도구입니다. 특수 문자를 안전한 URL 형식으로 변환하세요."
                keywords={['URL 인코더', 'URL 디코더', 'URL encode', 'URL decode', 'percent encoding']}
            />

            <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-3">
                    <Link className="w-8 h-8 text-blue-500" />
                    URL 인코더/디코더
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    URL을 안전한 형식으로 인코딩하거나 원래 형태로 디코딩하세요.
                </p>
            </div>

            <div className="grid md:grid-cols-[1fr,auto,1fr] gap-4 items-start">
                {/* Input Section */}
                <div className="card p-4 space-y-3 h-full">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        입력 ({mode === 'encode' ? 'Plain Text' : 'Encoded URL'})
                    </label>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={mode === 'encode' ? '인코딩할 텍스트를 입력하세요...' : '디코딩할 URL을 입력하세요...'}
                        className="input w-full h-48 resize-none font-mono text-sm"
                    />
                </div>

                {/* Controls */}
                <div className="flex flex-col gap-3 justify-center h-full py-4">
                    <button
                        onClick={handleConvert}
                        className="btn btn-primary whitespace-nowrap"
                    >
                        {mode === 'encode' ? '인코딩 하기 →' : '디코딩 하기 →'}
                    </button>

                    <button
                        onClick={switchMode}
                        className="btn btn-secondary flex items-center justify-center gap-2"
                        title="모드 전환"
                    >
                        <ArrowRightLeft className="w-4 h-4" />
                        <span className="md:hidden">모드 전환</span>
                    </button>
                </div>

                {/* Output Section */}
                <div className="card p-4 space-y-3 h-full">
                    <div className="flex justify-between items-center">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            결과 ({mode === 'encode' ? 'Encoded URL' : 'Plain Text'})
                        </label>
                        <button
                            onClick={handleCopy}
                            disabled={!output}
                            className="text-sm text-gray-500 hover:text-blue-500 disabled:opacity-50 flex items-center gap-1"
                        >
                            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            {copied ? '복사됨' : '복사'}
                        </button>
                    </div>
                    <textarea
                        readOnly
                        value={output}
                        placeholder="결과가 여기에 표시됩니다..."
                        className="input w-full h-48 resize-none font-mono text-sm bg-gray-50 dark:bg-gray-800/50"
                    />
                </div>
            </div>

            <div className="card p-6 bg-gray-50 dark:bg-gray-800/50">
                <h3 className="text-lg font-semibold mb-3">💡 URL 인코딩이란?</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    URL 인코딩(퍼센트 인코딩)은 URL에서 사용할 수 없는 문자나 의미가 있는 특수 문자를
                    <code>%</code> 뒤에 16진수 값을 붙여 표현하는 방식입니다.
                    예를 들어 공백(Space)은 <code>%20</code>으로, 한글 '가'는 <code>%EA%B0%80</code>로 변환됩니다.
                </p>
            </div>
        \n            <ToolGuide
                title="URL 인코더/디코더"
                intro="URL 인코딩 및 디코딩"
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

export default UrlEncoderDecoder;
