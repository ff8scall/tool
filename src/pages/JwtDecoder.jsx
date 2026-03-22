import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { Key, AlertCircle, CheckCircle2 } from 'lucide-react';

const JwtDecoder = () => {
    const [token, setToken] = useState('');
    const [header, setHeader] = useState(null);
    const [payload, setPayload] = useState(null);
    const [error, setError] = useState('');
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        if (!token) {
            setHeader(null);
            setPayload(null);
            setError('');
            setIsValid(false);
            return;
        }

        try {
            const parts = token.split('.');
            if (parts.length !== 3) {
                throw new Error('Invalid JWT format. A JWT must have 3 parts (Header, Payload, Signature).');
            }

            const decodePart = (part) => {
                try {
                    return JSON.parse(atob(part.replace(/-/g, '+').replace(/_/g, '/')));
                } catch (e) {
                    throw new Error('Failed to decode base64 string.');
                }
            };

            const decodedHeader = decodePart(parts[0]);
            const decodedPayload = decodePart(parts[1]);

            setHeader(decodedHeader);
            setPayload(decodedPayload);
            setError('');
            setIsValid(true);
        } catch (err) {
            setHeader(null);
            setPayload(null);
            setError(err.message);
            setIsValid(false);
        }
    }, [token]);

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <SEO
                title="JWT 디코더 - JSON Web Token Decode"
                description="JWT(JSON Web Token)를 디코딩하여 헤더와 페이로드 내용을 확인하는 무료 도구입니다. 서명 검증 없이 내용만 확인합니다."
                keywords={['JWT 디코더', 'JWT decode', 'JSON Web Token', 'token debugger', 'jwt viewer']}
            />

            <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-3">
                    <Key className="w-8 h-8 text-yellow-500" />
                    JWT 디코더
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    JWT 토큰을 입력하여 내용을 확인하세요. (서버로 전송되지 않으며 브라우저에서만 처리됩니다)
                </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                {/* Input Section */}
                <div className="space-y-4">
                    <div className="card p-4 space-y-3">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Encoded Token
                        </label>
                        <textarea
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                            placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                            className={`input w-full h-64 resize-none font-mono text-sm ${token && !isValid ? 'border-red-500 focus:ring-red-500' : ''
                                } ${token && isValid ? 'border-green-500 focus:ring-green-500' : ''}`}
                        />
                        {error && (
                            <div className="text-red-500 text-sm flex items-center gap-2">
                                <AlertCircle className="w-4 h-4" />
                                {error}
                            </div>
                        )}
                        {isValid && (
                            <div className="text-green-500 text-sm flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4" />
                                Valid JWT Format
                            </div>
                        )}
                    </div>
                </div>

                {/* Output Section */}
                <div className="space-y-4">
                    {/* Header */}
                    <div className="card p-4 space-y-2">
                        <div className="flex justify-between items-center">
                            <h3 className="font-semibold text-gray-700 dark:text-gray-300">Header</h3>
                            <span className="text-xs text-gray-500">Algorithm & Token Type</span>
                        </div>
                        <pre className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg text-sm font-mono overflow-auto max-h-40">
                            {header ? JSON.stringify(header, null, 2) : <span className="text-gray-400">// Header will appear here</span>}
                        </pre>
                    </div>

                    {/* Payload */}
                    <div className="card p-4 space-y-2">
                        <div className="flex justify-between items-center">
                            <h3 className="font-semibold text-gray-700 dark:text-gray-300">Payload</h3>
                            <span className="text-xs text-gray-500">Data & Claims</span>
                        </div>
                        <pre className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg text-sm font-mono overflow-auto max-h-96">
                            {payload ? JSON.stringify(payload, null, 2) : <span className="text-gray-400">// Payload will appear here</span>}
                        </pre>
                    </div>
                </div>
            </div>
        \n            <ToolGuide
                title="JWT 디코더"
                intro="JWT 토큰 디코딩 및 확인"
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

export default JwtDecoder;
