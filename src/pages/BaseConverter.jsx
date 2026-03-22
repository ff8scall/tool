import React, { useState } from 'react';
import { Binary, ArrowRightLeft } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';

const BaseConverter = () => {
    const [inputValue, setInputValue] = useState('');
    const [inputBase, setInputBase] = useState(10);
    const [results, setResults] = useState({});

    const convertBase = (value, fromBase) => {
        if (!value.trim()) {
            setResults({});
            return;
        }

        try {
            // 입력값을 10진수로 변환
            const decimal = parseInt(value, fromBase);

            if (isNaN(decimal)) {
                setResults({ error: '유효하지 않은 입력값입니다' });
                return;
            }

            setResults({
                binary: decimal.toString(2),
                octal: decimal.toString(8),
                decimal: decimal.toString(10),
                hexadecimal: decimal.toString(16).toUpperCase()
            });
        } catch (error) {
            setResults({ error: '변환 중 오류가 발생했습니다' });
        }
    };

    const handleInputChange = (value) => {
        setInputValue(value);
        convertBase(value, inputBase);
    };

    const handleBaseChange = (base) => {
        setInputBase(base);
        if (inputValue.trim()) {
            convertBase(inputValue, base);
        }
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <SEO
                title="진법 변환기 (2진수, 8진수, 10진수, 16진수) - Utility Hub"
                description="2진수, 8진수, 10진수, 16진수를 서로 변환하세요. 온라인 진법 변환 계산기."
                keywords="진법 변환, 2진수 변환, 16진수 변환, 진법 계산기, binary converter"
            />

            <header className="text-center space-y-2">
                <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
                    <Binary className="w-8 h-8 text-primary" />
                    진법 변환기
                </h1>
                <p className="text-muted-foreground">
                    2진수, 8진수, 10진수, 16진수 변환
                </p>
            </header>

            {/* Input */}
            <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-2">입력 진법</label>
                    <div className="grid grid-cols-4 gap-2">
                        {[
                            { base: 2, label: '2진수' },
                            { base: 8, label: '8진수' },
                            { base: 10, label: '10진수' },
                            { base: 16, label: '16진수' }
                        ].map(({ base, label }) => (
                            <button
                                key={base}
                                onClick={() => handleBaseChange(base)}
                                className={`px-4 py-2 rounded-lg font-medium transition-all ${inputBase === base
                                        ? 'bg-primary text-primary-foreground'
                                        : 'bg-secondary hover:bg-accent'
                                    }`}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">입력값</label>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => handleInputChange(e.target.value)}
                        placeholder={
                            inputBase === 2 ? '예: 1010' :
                                inputBase === 8 ? '예: 12' :
                                    inputBase === 10 ? '예: 10' :
                                        '예: A'
                        }
                        className="w-full px-4 py-3 text-xl bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-mono"
                    />
                </div>
            </div>

            {/* Results */}
            {results.error ? (
                <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-6 text-center">
                    <p className="text-red-600 dark:text-red-400">{results.error}</p>
                </div>
            ) : Object.keys(results).length > 0 && (
                <div className="space-y-3">
                    {[
                        { key: 'binary', label: '2진수 (Binary)', color: 'bg-blue-500' },
                        { key: 'octal', label: '8진수 (Octal)', color: 'bg-green-500' },
                        { key: 'decimal', label: '10진수 (Decimal)', color: 'bg-yellow-500' },
                        { key: 'hexadecimal', label: '16진수 (Hexadecimal)', color: 'bg-purple-500' }
                    ].map(({ key, label, color }) => (
                        <div key={key} className="bg-card border border-border rounded-xl p-4">
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <div className={`w-3 h-3 rounded-full ${color}`} />
                                    <span className="font-bold text-sm">{label}</span>
                                </div>
                                <button
                                    onClick={() => copyToClipboard(results[key])}
                                    className="text-xs px-3 py-1 bg-secondary hover:bg-accent rounded-md transition-colors"
                                >
                                    복사
                                </button>
                            </div>
                            <div className="p-3 bg-background rounded-lg font-mono text-lg break-all">
                                {results[key]}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="bg-muted/30 rounded-xl p-6 text-sm text-muted-foreground">
                <h3 className="font-bold text-foreground mb-2">💡 진법이란?</h3>
                <ul className="space-y-1 list-disc list-inside">
                    <li><strong>2진수:</strong> 0과 1만 사용 (컴퓨터의 기본 언어)</li>
                    <li><strong>8진수:</strong> 0~7까지 사용</li>
                    <li><strong>10진수:</strong> 0~9까지 사용 (우리가 일상적으로 사용)</li>
                    <li><strong>16진수:</strong> 0~9, A~F까지 사용 (색상 코드 등에 사용)</li>
                </ul>
            </div>
        \n            <ToolGuide
                title="진법 변환기"
                intro="2진수, 8진수, 10진수, 16진수 변환"
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

export default BaseConverter;
