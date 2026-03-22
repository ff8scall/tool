import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';

const AsciiTable = () => {
    const [copiedCode, setCopiedCode] = useState('');

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        setCopiedCode(text);
        setTimeout(() => setCopiedCode(''), 1500);
    };

    // ASCII 코드 범위: 32-126 (출력 가능한 문자)
    const asciiCodes = [];
    for (let i = 32; i <= 126; i++) {
        asciiCodes.push({
            dec: i,
            hex: i.toString(16).toUpperCase(),
            char: String.fromCharCode(i),
            description: getCharDescription(i)
        });
    }

    function getCharDescription(code) {
        if (code === 32) return 'Space';
        if (code >= 48 && code <= 57) return 'Digit';
        if (code >= 65 && code <= 90) return 'Uppercase';
        if (code >= 97 && code <= 122) return 'Lowercase';
        return 'Symbol';
    }

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            <SEO
                title="아스키 코드표 - Utility Hub"
                description="ASCII 코드표를 확인하고 복사할 수 있습니다. 10진수, 16진수, 문자를 한눈에 볼 수 있습니다."
                keywords="ASCII, 아스키코드, 문자코드, 16진수, 10진수"
            />

            <header className="text-center space-y-2">
                <h1 className="text-3xl font-bold">아스키 코드표</h1>
                <p className="text-muted-foreground">
                    ASCII 코드와 문자 대응표
                </p>
            </header>

            <div className="bg-card border border-border rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-muted">
                            <tr>
                                <th className="px-4 py-3 text-left font-bold">10진수</th>
                                <th className="px-4 py-3 text-left font-bold">16진수</th>
                                <th className="px-4 py-3 text-left font-bold">문자</th>
                                <th className="px-4 py-3 text-left font-bold">설명</th>
                                <th className="px-4 py-3 text-left font-bold">복사</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {asciiCodes.map((item) => (
                                <tr key={item.dec} className="hover:bg-accent/50 transition-colors">
                                    <td className="px-4 py-3 font-mono">{item.dec}</td>
                                    <td className="px-4 py-3 font-mono">0x{item.hex}</td>
                                    <td className="px-4 py-3 text-xl font-bold text-center">
                                        {item.char === ' ' ? '␣' : item.char}
                                    </td>
                                    <td className="px-4 py-3 text-muted-foreground">{item.description}</td>
                                    <td className="px-4 py-3">
                                        <button
                                            onClick={() => copyToClipboard(item.char)}
                                            className="p-2 hover:bg-secondary rounded-md transition-colors"
                                            title="문자 복사"
                                        >
                                            {copiedCode === item.char ? (
                                                <Check className="w-4 h-4 text-green-500" />
                                            ) : (
                                                <Copy className="w-4 h-4" />
                                            )}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="bg-muted/30 rounded-xl p-6 text-sm text-muted-foreground">
                <h3 className="font-bold text-foreground mb-2">💡 안내</h3>
                <ul className="space-y-1 list-disc list-inside">
                    <li>ASCII 코드는 0-127까지 정의되어 있으며, 32-126은 출력 가능한 문자입니다.</li>
                    <li>10진수: 일반적으로 사용하는 숫자 체계</li>
                    <li>16진수: 프로그래밍에서 자주 사용하는 숫자 체계 (0x 접두사)</li>
                    <li>복사 버튼을 클릭하면 해당 문자가 클립보드에 복사됩니다.</li>
                </ul>
            </div>
        \n            <ToolGuide
                title="아스키 코드표"
                intro="ASCII 코드 참조표"
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

export default AsciiTable;
