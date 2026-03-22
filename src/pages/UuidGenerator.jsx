import React, { useState } from 'react';
import { Copy, Check, RefreshCw, Key } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';

const UuidGenerator = () => {
    const [uuids, setUuids] = useState([]);
    const [count, setCount] = useState(1);
    const [copied, setCopied] = useState('');

    const generateUUIDs = () => {
        const newUuids = [];
        for (let i = 0; i < count; i++) {
            newUuids.push(crypto.randomUUID());
        }
        setUuids(newUuids);
        setCopied('');
    };

    const copyToClipboard = (text, index) => {
        navigator.clipboard.writeText(text);
        setCopied(index);
        setTimeout(() => setCopied(''), 1500);
    };

    const copyAll = () => {
        navigator.clipboard.writeText(uuids.join('\n'));
        setCopied('all');
        setTimeout(() => setCopied(''), 1500);
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <SEO
                title="UUID/GUID 생성기 - Utility Hub"
                description="고유 식별자 UUID/GUID를 생성하세요. 개발, 데이터베이스, API 등에서 사용할 수 있는 랜덤 UUID를 무료로 생성합니다."
                keywords="UUID 생성, GUID 생성, 고유 식별자, UUID 만들기, GUID 만들기"
            />

            <header className="text-center space-y-2">
                <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
                    <Key className="w-8 h-8 text-primary" />
                    UUID/GUID 생성기
                </h1>
                <p className="text-muted-foreground">
                    고유 식별자를 빠르게 생성하세요
                </p>
            </header>

            {/* Controls */}
            <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-2">
                        생성 개수: {count}개
                    </label>
                    <input
                        type="range"
                        min="1"
                        max="50"
                        value={count}
                        onChange={(e) => setCount(parseInt(e.target.value))}
                        className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>1개</span>
                        <span>50개</span>
                    </div>
                </div>

                <button
                    onClick={generateUUIDs}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-bold hover:brightness-110 transition-all"
                >
                    <RefreshCw className="w-5 h-5" />
                    UUID 생성
                </button>
            </div>

            {/* Results */}
            {uuids.length > 0 && (
                <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="font-bold">생성된 UUID</h3>
                        <button
                            onClick={copyAll}
                            className="flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-accent rounded-lg transition-colors text-sm"
                        >
                            {copied === 'all' ? (
                                <>
                                    <Check className="w-4 h-4 text-green-500" />
                                    전체 복사됨
                                </>
                            ) : (
                                <>
                                    <Copy className="w-4 h-4" />
                                    전체 복사
                                </>
                            )}
                        </button>
                    </div>

                    <div className="space-y-2 max-h-96 overflow-y-auto">
                        {uuids.map((uuid, index) => (
                            <div key={index} className="flex items-center gap-2 p-3 bg-background rounded-lg">
                                <span className="flex-1 font-mono text-sm break-all">{uuid}</span>
                                <button
                                    onClick={() => copyToClipboard(uuid, index)}
                                    className="p-2 hover:bg-secondary rounded-md transition-colors"
                                >
                                    {copied === index ? (
                                        <Check className="w-4 h-4 text-green-500" />
                                    ) : (
                                        <Copy className="w-4 h-4" />
                                    )}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="bg-muted/30 rounded-xl p-6 text-sm text-muted-foreground">
                <h3 className="font-bold text-foreground mb-2">💡 UUID란?</h3>
                <ul className="space-y-1 list-disc list-inside">
                    <li>UUID (Universally Unique Identifier): 범용 고유 식별자</li>
                    <li>128비트 숫자로 구성되며, 중복될 확률이 거의 없습니다</li>
                    <li>데이터베이스 기본 키, API 토큰, 세션 ID 등에 사용됩니다</li>
                    <li>형식: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx (Version 4)</li>
                </ul>
            </div>
        \n            <ToolGuide
                title="UUID 생성기"
                intro="UUID v4 생성"
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

export default UuidGenerator;
