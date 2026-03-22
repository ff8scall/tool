import React, { useState } from 'react';
import { Copy, Check, Shield } from 'lucide-react';
import CryptoJS from 'crypto-js';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';

const HashGenerator = () => {
    const [input, setInput] = useState('');
    const [copied, setCopied] = useState('');

    const hashes = {
        'MD5': CryptoJS.MD5(input).toString(),
        'SHA-1': CryptoJS.SHA1(input).toString(),
        'SHA-256': CryptoJS.SHA256(input).toString(),
        'SHA-512': CryptoJS.SHA512(input).toString(),
        'SHA3-256': CryptoJS.SHA3(input, { outputLength: 256 }).toString(),
        'SHA3-512': CryptoJS.SHA3(input, { outputLength: 512 }).toString(),
    };

    const copyToClipboard = (text, label) => {
        navigator.clipboard.writeText(text);
        setCopied(label);
        setTimeout(() => setCopied(''), 1500);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <SEO
                title="해시 생성기 (MD5, SHA-256) - Utility Hub"
                description="텍스트를 MD5, SHA-1, SHA-256, SHA-512 등 다양한 해시값으로 변환하세요. 암호화 해시 생성 도구."
                keywords="해시 생성기, MD5, SHA256, SHA512, 암호화, 해시값"
            />

            <header className="text-center space-y-2">
                <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
                    <Shield className="w-8 h-8 text-primary" />
                    해시 생성기
                </h1>
                <p className="text-muted-foreground">
                    텍스트를 다양한 해시 알고리즘으로 변환하세요
                </p>
            </header>

            {/* Input */}
            <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                <label className="block text-sm font-medium">
                    변환할 텍스트
                </label>
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="해시로 변환할 텍스트를 입력하세요..."
                    className="w-full h-32 px-4 py-3 bg-background border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                />
            </div>

            {/* Hash Results */}
            {input && (
                <div className="space-y-3">
                    {Object.entries(hashes).map(([algorithm, hash]) => (
                        <div key={algorithm} className="bg-card border border-border rounded-xl p-4">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="font-bold text-sm">{algorithm}</h3>
                                <button
                                    onClick={() => copyToClipboard(hash, algorithm)}
                                    className="flex items-center gap-2 px-3 py-1 text-sm bg-secondary hover:bg-accent rounded-md transition-colors"
                                >
                                    {copied === algorithm ? (
                                        <>
                                            <Check className="w-4 h-4 text-green-500" />
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
                            <div className="p-3 bg-background rounded-lg font-mono text-xs break-all">
                                {hash}
                            </div>
                            <div className="text-xs text-muted-foreground mt-2">
                                길이: {hash.length} 문자
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="bg-muted/30 rounded-xl p-6 text-sm text-muted-foreground">
                <h3 className="font-bold text-foreground mb-2">💡 해시 알고리즘 설명</h3>
                <ul className="space-y-2">
                    <li>
                        <strong className="text-foreground">MD5:</strong> 128비트 해시. 빠르지만 보안에 취약하여 파일 무결성 검증용으로만 사용 권장
                    </li>
                    <li>
                        <strong className="text-foreground">SHA-1:</strong> 160비트 해시. MD5보다 안전하지만 현재는 권장되지 않음
                    </li>
                    <li>
                        <strong className="text-foreground">SHA-256:</strong> 256비트 해시. 현재 가장 널리 사용되는 안전한 해시 알고리즘
                    </li>
                    <li>
                        <strong className="text-foreground">SHA-512:</strong> 512비트 해시. SHA-256보다 더 강력한 보안
                    </li>
                    <li>
                        <strong className="text-foreground">SHA3:</strong> 최신 해시 알고리즘. Keccak 기반으로 설계됨
                    </li>
                </ul>
                <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/50 rounded-lg">
                    <p className="text-yellow-600 dark:text-yellow-400 font-bold">⚠️ 주의사항</p>
                    <p className="mt-1">해시는 단방향 암호화입니다. 해시값으로 원본 텍스트를 복원할 수 없습니다.</p>
                </div>
            </div>
        \n            <ToolGuide
                title="해시 생성기"
                intro="MD5, SHA-1, SHA-256 등 해시 생성"
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

export default HashGenerator;
