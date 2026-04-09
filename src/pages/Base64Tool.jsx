import React, { useState } from 'react';
import { Copy, Check, ArrowRightLeft, ShieldCheck, Binary } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { useLanguage } from '../context/LanguageContext';

const Base64Tool = () => {
    const { lang, t } = useLanguage();
    const isEn = lang === 'en';

    const [mode, setMode] = useState('encode'); // encode or decode
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);

    const handleConvert = () => {
        setError('');
        try {
            if (mode === 'encode') {
                const encoded = btoa(unescape(encodeURIComponent(input)));
                setOutput(encoded);
            } else {
                const decoded = decodeURIComponent(escape(atob(input)));
                setOutput(decoded);
            }
        } catch (err) {
            setError(
                mode === 'encode' 
                    ? (isEn ? 'Encoding failed: Check input value.' : '인코딩 실패: 입력값을 확인하세요.') 
                    : (isEn ? 'Decoding failed: Not a valid Base64 string.' : '디코딩 실패: 올바른 Base64 문자열이 아닙니다.')
            );
            setOutput('');
        }
    };

    const handleSwap = () => {
        const nextMode = mode === 'encode' ? 'decode' : 'encode';
        setMode(nextMode);
        setInput(output);
        setOutput(input);
        setError('');
    };

    const copyToClipboard = () => {
        if (!output) return;
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    const faqs = isEn ? [
        {
            q: "What exactly is Base64 Encoding?",
            a: "It's a way of representing binary data using 64 ASCII characters. It ensures the data remains intact without modification during transport (such as sending image data via JSON payloads)."
        },
        {
            q: "Are non-English characters like emojis supported?",
            a: "Yes, this tool efficiently utilizes UTF-8 processing methods to support all international characters seamlessly."
        },
        {
            q: "Is Base64 a form of encryption?",
            a: "No! Base64 is merely an encoding technique, not an encryption protocol. Do not store sensitive passwords in Base64 assuming they are safe from prying eyes."
        }
    ] : [
        {
            "q": "Base64 인코딩이란 무엇인가요?",
            "a": "이진 데이터를 64개의 ASCII 문자로 이루어진 텍스트 형식으로 변환하는 방식입니다. 주로 바이너리 파일이나 특수 문자가 포함된 데이터를 텍스트 기반 시스템(이메일, URL 등)에서 안전하게 전송하기 위해 사용됩니다."
        },
        {
            "q": "한글도 변환이 가능한가요?",
            "a": "네, 본 도구는 UTF-8 인코딩을 지원하도록 설계되어 있어 한글 및 각종 특수 문자가 포함된 텍스트도 깨짐 없이 완벽하게 변환 및 복구할 수 있습니다."
        },
        {
            "q": "Base64는 암호화 기술인가요?",
            "a": "아니요, Base64는 데이터를 다른 형식으로 표현하는 '인코딩'일 뿐 암호화가 아닙니다. 누구나 디코딩하여 내용을 볼 수 있으므로 비밀번호와 같은 민감한 정보 보호용으로는 적합하지 않습니다."
        }
    ];

    const steps = isEn ? [
        "Select your operation: Encode (Text -> Base64) or Decode (Base64 -> Text).",
        "Input the raw string or Base64 block in the primary box.",
        "Hit 'Proceed' to translate exactly on your local browser.",
        "To reverse the operation immediately, tap the 'Swap' icon mapping the output back as an input!"
    ] : [
        "원하는 작업 모드(인코딩 또는 디코딩)를 상단 버튼에서 선택하세요.",
        "입력창에 변환하고 싶은 텍스트 또는 Base64 문자열을 입력하세요.",
        "하단의 '인코딩' 또는 '디코딩' 버튼을 클릭하면 즉시 결과가 하단에 출력됩니다."
    ];

    const tips = isEn ? [
        "The Swap arrows make testing iterative encodings blazing fast.",
        "Always base64 encode strings containing arbitrary punctuation if passing them through strict URL query parameters.",
        "Often seen as data URI prefixes 'data:image/png;base64,...' in HTML."
    ] : [
        "가운데 화살표 버튼을 누르면 인코딩 결과물을 즉시 디코딩 입력값으로 전환하여 올바르게 변환되었는지 빠르게 확인할 수 있습니다.",
        "API 통신 시 헤더나 바디에 텍스트를 담아 보낼 때 유용하게 활용해 보세요.",
        "이미지 주소(Data URI) 생성 시 기본이 되는 텍스트 포맷이 바로 Base64입니다."
    ];

    const titleText = t('tools.base64.title');
    const descText = t('tools.base64.description');
    const keywordsText = isEn ? "base64 encoder, base64 decoder, encode base64, utility tool" : "base64인코더, base64디코더, base64변환기, 온라인인코딩, 온라인디코딩, 개발자도구, 텍스트인코딩";

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            <SEO
                title={titleText}
                description={descText}
                keywords={keywordsText}
                category="dev"
                faqs={faqs}
                steps={steps}
            />

            <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center p-3 bg-slate-800 rounded-2xl text-white mb-4 shadow-lg border border-slate-700">
                    <Binary size={32} />
                </div>
                <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-3 tracking-tight">
                    {isEn ? 'Base64 Encoder / Decoder' : 'Base64 인코딩/디코딩'}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                    {isEn ? 'Safely transform your text via standard Base64 conventions instantly.' : '데이터 전송을 위한 표준 인코딩, 빠르고 안전하게 변환하세요.'}
                </p>
            </div>

            {/* Mode & Input Section */}
            <div className="bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 rounded-3xl p-8 mb-8 shadow-xl">
                <div className="flex flex-col sm:flex-row justify-center items-center gap-3 mb-8">
                    <button
                        onClick={() => setMode('encode')}
                        className={`w-full sm:w-auto px-10 py-3 rounded-2xl font-black transition-all shadow-sm active:scale-95 ${mode === 'encode'
                                ? 'bg-slate-900 text-white shadow-slate-300 dark:shadow-none'
                                : 'bg-gray-100 dark:bg-gray-900 text-gray-500 hover:bg-gray-200'
                            }`}
                    >
                        {isEn ? 'Encode' : '인코딩 (Encode)'}
                    </button>
                    <button
                        onClick={handleSwap}
                        className="p-3 rounded-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-slate-800 dark:text-slate-300 hover:bg-slate-100 transition-all shadow-md active:rotate-180"
                        title={isEn ? "Swap Mode & Content" : "입력/출력 전환"}
                    >
                        <ArrowRightLeft size={24} />
                    </button>
                    <button
                        onClick={() => setMode('decode')}
                        className={`w-full sm:w-auto px-10 py-3 rounded-2xl font-black transition-all shadow-sm active:scale-95 ${mode === 'decode'
                                ? 'bg-slate-900 text-white shadow-slate-300 dark:shadow-none'
                                : 'bg-gray-100 dark:bg-gray-900 text-gray-500 hover:bg-gray-200'
                            }`}
                    >
                        {isEn ? 'Decode' : '디코딩 (Decode)'}
                    </button>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center gap-2 mb-2 ml-2">
                        <label className="text-sm font-black text-gray-400 uppercase tracking-widest">
                            {mode === 'encode' ? 'Source Text (Raw)' : 'Base64 String'}
                        </label>
                    </div>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={
                            isEn 
                                ? (mode === 'encode' ? 'Insert text to encode...' : 'Paste Base64 to decipher...') 
                                : (mode === 'encode' ? '인코딩할 텍스트를 입력하세요...' : '디코딩할 Base64 문자열을 입력하세요...')
                        }
                        className="w-full h-56 p-8 bg-gray-50 dark:bg-gray-900 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-3xl resize-none font-mono text-lg focus:outline-none focus:border-slate-800 focus:ring-4 focus:ring-slate-800/5 transition-all dark:text-white"
                    />
                    <button
                        onClick={handleConvert}
                        disabled={!input.trim()}
                        className="w-full py-5 bg-slate-900 dark:bg-blue-600 text-white rounded-2xl font-black text-xl hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-slate-200 dark:shadow-none disabled:opacity-30 disabled:grayscale"
                    >
                        {isEn 
                            ? (mode === 'encode' ? 'Proceed with Encoding' : 'Proceed with Decoding') 
                            : (mode === 'encode' ? '즉시 인코딩 진행' : '즉시 디코딩 진행')}
                    </button>
                </div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border-2 border-red-100 dark:border-red-900/30 rounded-2xl p-5 mb-8 text-center text-red-600 dark:text-red-400 font-bold animate-pulse">
                    ⚠️ {error}
                </div>
            )}

            {/* Output Section */}
            {output && !error && (
                <div className="bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 rounded-3xl p-8 mb-8 shadow-xl animate-in fade-in slide-in-from-bottom-5">
                    <div className="flex items-center justify-between mb-4 px-2">
                        <label className="text-sm font-black text-gray-400 uppercase tracking-widest">
                            {mode === 'encode' ? 'Base64 Result' : 'Raw Text Result'}
                        </label>
                        <button
                            onClick={copyToClipboard}
                            className={`flex items-center gap-2 px-6 py-2 rounded-xl font-bold transition-all shadow-sm ${copied ? 'bg-green-500 text-white' : 'bg-slate-100 dark:bg-gray-900 text-slate-800 dark:text-slate-200 hover:bg-slate-200'}`}
                        >
                            {copied ? (
                                <><Check size={18} /> {isEn ? 'Copied' : '복사완료'}</>
                            ) : (
                                <><Copy size={18} /> {isEn ? 'Copy Full Output' : '결과전체복사'}</>
                            )}
                        </button>
                    </div>
                    <textarea
                        value={output}
                        readOnly
                        className="w-full h-56 p-8 bg-slate-50 dark:bg-gray-900/50 border-2 border-slate-100 dark:border-gray-700 rounded-3xl resize-none font-mono text-lg focus:outline-none text-slate-700 dark:text-gray-300"
                    />
                </div>
            )}

            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-3xl p-6 mb-10 flex items-start gap-4 border border-blue-100 dark:border-blue-900/30">
                <ShieldCheck className="w-6 h-6 text-blue-500 mt-1 flex-shrink-0" />
                <div>
                    <h4 className="font-black text-blue-900 dark:text-blue-300 mb-1">{isEn ? 'Data Privacy & Security' : '데이터 보안 안내'}</h4>
                    <p className="text-sm text-blue-700 dark:text-blue-400 leading-relaxed">
                        {isEn 
                            ? 'All conversion execution is conducted locally in your browser leveraging native parsing components. Your raw texts are never submitted onto any external server.' 
                            : '본 변환 작업은 사용자의 브라우저 내에서 자바스크립트로 직접 수행됩니다. 입력한 데이터는 서버에 저장되거나 전송되지 않으므로 안심하고 사용하실 수 있습니다.'}
                    </p>
                </div>
            </div>

            <ToolGuide
                title={isEn ? "The Complete Base64 Translation Tool Guide" : "Base64 변환 완벽 가이드"}
                intro={isEn 
                    ? "Base64 acts as the prevalent method for ensuring reliable transmission over media without breakage. Our utility effectively parses multi-byte elements to protect all developers." 
                    : "Base64는 데이터를 안전하게 전송하거나 임베딩하기 위해 가장 널리 쓰이는 표준 인코딩 방식입니다. 본 도구는 다양한 문자셋을 지원하며, 특히 다국어 처리에 특화되어 있어 개발 및 문서 작업의 효율성을 극대화합니다."}
                steps={steps}
                tips={tips}
                faqs={faqs}
            />
        </div>
    );
};

export default Base64Tool;
