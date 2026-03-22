import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';

const SpecialCharacters = () => {
    const [copiedChar, setCopiedChar] = useState('');

    const categories = [
        {
            name: '화살표',
            chars: ['←', '→', '↑', '↓', '↔', '↕', '⇐', '⇒', '⇑', '⇓', '⇔', '⇕', '➔', '➜', '➡', '⬅', '⬆', '⬇']
        },
        {
            name: '기호',
            chars: ['※', '◎', '○', '●', '◇', '◆', '□', '■', '△', '▲', '▽', '▼', '☆', '★', '♤', '♠', '♡', '♥', '♧', '♣', '⊙', '◈', '▣']
        },
        {
            name: '수학',
            chars: ['±', '×', '÷', '≠', '≤', '≥', '∞', '∑', '∫', '√', '∂', '∆', '∇', '≈', '≡', '⊂', '⊃', '∈', '∉', '∪', '∩']
        },
        {
            name: '통화',
            chars: ['$', '¢', '£', '¥', '€', '₩', '₽', '₹', '₨', '฿', '₫', '₪', '₱', '₦', '₡']
        },
        {
            name: '단위',
            chars: ['°', '℃', '℉', 'Å', '㎎', '㎏', '㎞', '㎡', '㎥', '㎖', '㎗', '㎘', '㏄', '㏊', '㎝', '㎜', '㎛', '㎚']
        },
        {
            name: '선',
            chars: ['─', '│', '┌', '┐', '└', '┘', '├', '┤', '┬', '┴', '┼', '═', '║', '╔', '╗', '╚', '╝', '╠', '╣', '╦', '╩', '╬']
        },
        {
            name: '괄호',
            chars: ['(', ')', '[', ']', '{', '}', '⟨', '⟩', '「', '」', '『', '』', '【', '】', '〔', '〕', '《', '》']
        },
        {
            name: '특수기호',
            chars: ['©', '®', '™', '§', '¶', '†', '‡', '‰', '′', '″', '№', '℡', '℮', '㏂', '㏘', '♨', '☎', '☏', '✓', '✔', '✕', '✖', '✗', '✘']
        }
    ];

    const copyToClipboard = (char) => {
        navigator.clipboard.writeText(char);
        setCopiedChar(char);
        setTimeout(() => setCopiedChar(''), 1500);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <SEO
                title="특수문자표 - Utility Hub"
                description="다양한 특수문자를 한 곳에서 쉽게 복사할 수 있습니다. 화살표, 기호, 수학 기호, 통화 기호 등을 제공합니다."
                keywords="특수문자, 특수기호, 화살표, 수학기호, 통화기호"
            />

            <header className="text-center space-y-2">
                <h1 className="text-3xl font-bold">특수문자표</h1>
                <p className="text-muted-foreground">
                    원하는 특수문자를 클릭하여 복사하세요
                </p>
            </header>

            <div className="space-y-6">
                {categories.map((category, idx) => (
                    <div key={idx} className="bg-card border border-border rounded-xl p-6">
                        <h2 className="text-lg font-bold mb-4">{category.name}</h2>
                        <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-2">
                            {category.chars.map((char, charIdx) => (
                                <button
                                    key={charIdx}
                                    onClick={() => copyToClipboard(char)}
                                    className="aspect-square flex items-center justify-center text-2xl bg-secondary hover:bg-accent rounded-lg transition-colors relative group"
                                    title={`클릭하여 복사: ${char}`}
                                >
                                    {char}
                                    {copiedChar === char && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-green-500 rounded-lg">
                                            <Check className="w-5 h-5 text-white" />
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-muted/30 rounded-xl p-6 text-sm text-muted-foreground">
                <h3 className="font-bold text-foreground mb-2">💡 사용 방법</h3>
                <ul className="space-y-1 list-disc list-inside">
                    <li>원하는 특수문자를 클릭하면 자동으로 클립보드에 복사됩니다.</li>
                    <li>복사된 문자는 녹색 체크 표시로 확인할 수 있습니다.</li>
                    <li>복사한 문자를 원하는 곳에 붙여넣기(Ctrl+V)하세요.</li>
                </ul>
            </div>
        \n            <ToolGuide
                title="특수문자표"
                intro="자주 쓰는 특수문자 모음"
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

export default SpecialCharacters;
