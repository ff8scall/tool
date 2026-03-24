import React, { useState } from 'react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { Link, ArrowRightLeft, Copy, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const UrlEncoderDecoder = () => {
    const { lang, t } = useLanguage();
    const isEn = lang === 'en';

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
            setOutput(isEn ? 'Error: Invalid input for decoding' : '에러: 유효하지 않은 디코딩 입력입니다.');
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

    const keywordsText = isEn ? "url encoder, url decoder, encode uri, percent encoding, decode url" : "URL 인코더, URL 디코더, URL encode, URL decode, percent encoding";

    const faqs = isEn ? [
        {
            q: "What is URL Encoding?",
            a: "URL Encoding (Percent Encoding) is a mechanism for encoding information in a Uniform Resource Identifier (URI). It replaces unsafe ASCII characters with a '%' followed by two hexadecimal digits."
        },
        {
            q: "Can I encode non-English letters?",
            a: "Yes, this tool strictly follows modern UTF-8 standards and safely translates characters from all languages including emojis into valid percent-encoded URI strings."
        }
    ] : [
        { "q": "URL 인코딩이 무엇인가요?", "a": "URL 인코딩은 웹 주소창에서 유효하지 않은 문자들을 %XX 형식으로 변환하여 안전하게 전송할 수 있게 만드는 기술입니다." },
        { "q": "언제 사용하나요?", "a": "주소창에 한글이나 특수문자가 포함된 파라미터를 넘겨야 할 때, 혹은 그 반대로 암호화된 주소를 읽기 쉬운 텍스트로 바꾸고 싶을 때 사용합니다." }
    ];

    const steps = isEn ? [
        "Select your desired mode by making sure the right button is toggled (Encode vs Decode).",
        "Place your raw or encoded string into the leftmost text area.",
        "Click the main 'Encode →' or 'Decode →' action button.",
        "Your successfully converted result will appear on the right pane where you can click Copy."
    ] : [
        "가운데 화살표 버튼이나 텍스트를 이용해 인코딩/디코딩 모드를 선택합니다.",
        "왼쪽 입력창에 변환할 텍스트나 URL 주소를 넣습니다.",
        "인코딩/디코딩 실행 버튼을 클릭합니다.",
        "오른쪽 결과창에 생성된 값을 확인하고 복사하여 사용하세요."
    ];

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <SEO
                title={t('tools.url-encoder.title')}
                description={t('tools.url-encoder.description')}
                keywords={keywordsText}
                category="dev"
                faqs={faqs}
                steps={steps}
            />

            <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-3">
                    <Link className="w-8 h-8 text-blue-500" />
                    {isEn ? 'URL Encoder / Decoder' : 'URL 인코더/디코더'}
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    {isEn ? 'Format URLs cleanly or reverse translate them safely.' : 'URL을 안전한 형식으로 인코딩하거나 원래 형태로 디코딩하세요.'}
                </p>
            </div>

            <div className="grid md:grid-cols-[1fr,auto,1fr] gap-4 items-start">
                <div className="card p-4 space-y-3 h-full mb-4 md:mb-0">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        {isEn ? `Input (${mode === 'encode' ? 'Plain Text' : 'Encoded URL'})` : `입력 (${mode === 'encode' ? '텍스트' : '인코딩된 URL'})`}
                    </label>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={isEn ? (mode === 'encode' ? 'Type text to encode...' : 'Type URL to decode...') : (mode === 'encode' ? '인코딩할 텍스트를 입력하세요...' : '디코딩할 URL을 입력하세요...')}
                        className="input w-full h-48 resize-none font-mono text-sm"
                    />
                </div>

                <div className="flex flex-col gap-3 justify-center h-full py-4 mb-4 md:mb-0">
                    <button
                        onClick={handleConvert}
                        className="btn btn-primary whitespace-nowrap"
                    >
                        {isEn ? (mode === 'encode' ? 'Encode →' : 'Decode →') : (mode === 'encode' ? '인코딩 하기 →' : '디코딩 하기 →')}
                    </button>

                    <button
                        onClick={switchMode}
                        className="btn btn-secondary flex items-center justify-center gap-2"
                        title={isEn ? "Switch Mode" : "모드 전환"}
                    >
                        <ArrowRightLeft className="w-4 h-4" />
                        <span className="md:hidden">{isEn ? 'Switch Mode' : '모드 전환'}</span>
                    </button>
                </div>

                <div className="card p-4 space-y-3 h-full">
                    <div className="flex justify-between items-center">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            {isEn ? `Result (${mode === 'encode' ? 'Encoded URL' : 'Plain Text'})` : `결과 (${mode === 'encode' ? '인코딩된 URL' : '텍스트'})`}
                        </label>
                        <button
                            onClick={handleCopy}
                            disabled={!output}
                            className="text-sm text-gray-500 hover:text-blue-500 disabled:opacity-50 flex items-center gap-1 font-bold"
                        >
                            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            {copied ? (isEn ? 'Copied' : '복사됨') : (isEn ? 'Copy' : '복사')}
                        </button>
                    </div>
                    <textarea
                        readOnly
                        value={output}
                        placeholder={isEn ? "Result will appear here..." : "결과가 여기에 표시됩니다..."}
                        className="input w-full h-48 resize-none font-mono text-sm bg-gray-50 dark:bg-gray-800/50"
                    />
                </div>
            </div>

            <div className="card p-6 bg-gray-50 dark:bg-gray-800/50 mt-4">
                <h3 className="text-lg font-semibold mb-3">💡 {isEn ? 'What is URL Encoding?' : 'URL 인코딩이란?'}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    {isEn 
                        ? <>URL encoding leverages <code>%</code> followed by hexadecimal numbers to safely dispatch string configurations. For example, a blank space naturally transforms into <code>%20</code>.</> 
                        : <>URL 인코딩(퍼센트 인코딩)은 URL에서 사용할 수 없는 문자나 의미가 있는 특수 문자를 <code>%</code> 뒤에 16진수 값을 붙여 표현하는 방식입니다. 예를 들어 공백(Space)은 <code>%20</code>으로, 한글 '가'는 <code>%EA%B0%80</code>로 변환됩니다.</>}
                </p>
            </div>

            <ToolGuide
                title={isEn ? "URL Encoder / Decoder Guide" : "URL 인코더/디코더 활용 가이드"}
                intro={isEn ? "Securely encode or decode URI components directly on your device using industry-standard percent encoding." : "URL 주소를 안전하게 인코딩하거나 원래 상태로 복원할 수 있습니다."}
                steps={steps}
                tips={isEn ? [
                    "This tool executes functions like encodeURIComponent() locally. Your private GET parameters are never sent to external domains.",
                    "If you encounter a URIError, it often implies the decoded URL string parameter isn't correctly percent-encoded.",
                    "Encoding is essential for handles URL parameters containing non-ASCII characters or reserved symbols like '&' or '='."
                ] : [
                    "한글이나 공백 등이 포함된 주소는 인코딩하여 전송해야 오류가 발생하지 않습니다.",
                    "모든 작업은 브라우저 내에서 직접 수행되어 데이터 유출 걱정 없이 안전합니다.",
                    "이미 인코딩된 주소를 원본으로 되돌리고 싶을 때는 '디코딩' 모드를 활용하세요."
                ]}
                faqs={faqs}
            />
        </div>
    );
};

export default UrlEncoderDecoder;
