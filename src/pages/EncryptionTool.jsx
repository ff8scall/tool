import React, { useState } from 'react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { Lock, Unlock, Copy, Check } from 'lucide-react';
import ShareButtons from '../components/ShareButtons';
import CryptoJS from 'crypto-js';

const EncryptionTool = () => {
    const [mode, setMode] = useState('encrypt'); // encrypt, decrypt
    const [text, setText] = useState('');
    const [password, setPassword] = useState('');
    const [result, setResult] = useState('');
    const [copied, setCopied] = useState(false);

    const handleEncrypt = () => {
        if (!text || !password) {
            alert('텍스트와 비밀번호를 모두 입력해주세요.');
            return;
        }
        try {
            const encrypted = CryptoJS.AES.encrypt(text, password).toString();
            setResult(encrypted);
        } catch (error) {
            alert('암호화 중 오류가 발생했습니다.');
        }
    };

    const handleDecrypt = () => {
        if (!text || !password) {
            alert('암호화된 텍스트와 비밀번호를 모두 입력해주세요.');
            return;
        }
        try {
            const decrypted = CryptoJS.AES.decrypt(text, password);
            const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
            if (!decryptedText) {
                alert('복호화 실패: 비밀번호가 틀렸거나 잘못된 암호문입니다.');
                return;
            }
            setResult(decryptedText);
        } catch (error) {
            alert('복호화 중 오류가 발생했습니다.');
        }
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(result);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            alert('복사 실패');
        }
    };

    const handleClear = () => {
        setText('');
        setPassword('');
        setResult('');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <SEO
                title="암호화/복호화 도구 - AES 암호화"
                description="AES 알고리즘을 사용한 텍스트 암호화 및 복호화 도구입니다. 비밀번호 기반으로 안전하게 암호화하세요."
                keywords={['암호화', '복호화', 'AES', 'encryption', 'decryption']}
                path="/encryption-tool"
            />

            <div className="container mx-auto px-4 py-8 max-w-4xl">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl mb-4 shadow-lg">
                        <Lock className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                        암호화/복호화 도구
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        AES 알고리즘 기반 텍스트 암호화
                    </p>
                </div>

                {/* Mode Toggle */}
                <div className="flex gap-2 mb-6">
                    <button
                        onClick={() => { setMode('encrypt'); setResult(''); }}
                        className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${mode === 'encrypt'
                                ? 'bg-red-500 text-white'
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                            }`}
                    >
                        <Lock className="w-5 h-5" />
                        암호화
                    </button>
                    <button
                        onClick={() => { setMode('decrypt'); setResult(''); }}
                        className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${mode === 'decrypt'
                                ? 'bg-red-500 text-white'
                                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                            }`}
                    >
                        <Unlock className="w-5 h-5" />
                        복호화
                    </button>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
                    {/* Input */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            {mode === 'encrypt' ? '원본 텍스트' : '암호화된 텍스트'}
                        </label>
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder={mode === 'encrypt' ? '암호화할 텍스트를 입력하세요' : '복호화할 암호문을 입력하세요'}
                            rows={6}
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-white resize-none"
                        />
                    </div>

                    {/* Password */}
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            비밀번호
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="암호화/복호화에 사용할 비밀번호"
                            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 dark:bg-gray-700 dark:text-white"
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-3 mb-6">
                        <button
                            onClick={mode === 'encrypt' ? handleEncrypt : handleDecrypt}
                            className="flex-1 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
                        >
                            {mode === 'encrypt' ? '암호화 실행' : '복호화 실행'}
                        </button>
                        <button
                            onClick={handleClear}
                            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors font-medium"
                        >
                            초기화
                        </button>
                    </div>

                    {/* Result */}
                    {result && (
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    결과
                                </label>
                                <button
                                    onClick={handleCopy}
                                    className="flex items-center gap-2 px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                                >
                                    {copied ? (
                                        <>
                                            <Check className="w-4 h-4" />
                                            복사됨
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="w-4 h-4" />
                                            복사
                                        </>
                                    )}
                                </button>
                            </div>
                            <div className="p-4 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg">
                                <pre className="whitespace-pre-wrap break-all text-sm text-gray-900 dark:text-white font-mono">
                                    {result}
                                </pre>
                            </div>
                        </div>
                    )}
                </div>

                {/* Warning */}
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-8">
                    <h3 className="font-bold text-yellow-800 dark:text-yellow-300 mb-2">⚠️ 주의사항</h3>
                    <ul className="text-sm text-yellow-700 dark:text-yellow-400 space-y-1">
                        <li>• 비밀번호를 잊어버리면 복호화할 수 없습니다</li>
                        <li>• 중요한 데이터는 반드시 백업하세요</li>
                        <li>• 브라우저에서 처리되며 서버로 전송되지 않습니다</li>
                        <li>• AES-256 알고리즘을 사용합니다</li>
                    </ul>
                </div>

                <ShareButtons />
            </div>
        \n            <ToolGuide
                title="암호화/복호화"
                intro="AES 알고리즘 기반 텍스트 암호화"
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

export default EncryptionTool;
