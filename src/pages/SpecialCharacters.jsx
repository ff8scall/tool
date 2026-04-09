import React, { useState } from 'react';
import { Copy, Check, Hash } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { useLanguage } from '../context/LanguageContext';

const SpecialCharacters = () => {
    const { lang, t } = useLanguage();
    const isEn = lang === 'en';

    const [copiedChar, setCopiedChar] = useState('');

    const categories = [
        {
            name: isEn ? 'Arrows' : '화살표',
            chars: ['←', '→', '↑', '↓', '↔', '↕', '⇐', '⇒', '⇑', '⇓', '⇔', '⇕', '➔', '➜', '➡', '⬅', '⬆', '⬇']
        },
        {
            name: isEn ? 'Symbols' : '기호',
            chars: ['※', '◎', '○', '●', '◇', '◆', '□', '■', '△', '▲', '▽', '▼', '☆', '★', '♤', '♠', '♡', '♥', '♧', '♣', '⊙', '◈', '▣']
        },
        {
            name: isEn ? 'Math' : '수학',
            chars: ['±', '×', '÷', '≠', '≤', '≥', '∞', '∑', '∫', '√', '∂', '∆', '∇', '≈', '≡', '⊂', '⊃', '∈', '∉', '∪', '∩']
        },
        {
            name: isEn ? 'Currency' : '통화',
            chars: ['$', '¢', '£', '¥', '€', '₩', '₽', '₹', '₨', '฿', '₫', '₪', '₱', '₦', '₡']
        },
        {
            name: isEn ? 'Units' : '단위',
            chars: ['°', '℃', '℉', 'Å', '㎎', '㎏', '㎞', '㎡', '㎥', '㎖', '㎗', '㎘', '㏄', '㏊', '㎝', '㎜', '㎛', '㎚']
        },
        {
            name: isEn ? 'Lines' : '선',
            chars: ['─', '│', '┌', '┐', '└', '┘', '├', '┤', '┬', '┴', '┼', '═', '║', '╔', '╗', '╚', '╝', '╠', '╣', '╦', '╩', '╬']
        },
        {
            name: isEn ? 'Brackets' : '괄호',
            chars: ['(', ')', '[', ']', '{', '}', '⟨', '⟩', '「', '」', '『', '』', '【', '】', '〔', '〕', '《', '》']
        },
        {
            name: isEn ? 'Special Symbols' : '특수기호',
            chars: ['©', '®', '™', '§', '¶', '†', '‡', '‰', '′', '″', '№', '℡', '℮', '㏂', '㏘', '♨', '☎', '☏', '✓', '✔', '✕', '✖', '✗', '✘']
        }
    ];

    const copyToClipboard = (char) => {
        navigator.clipboard.writeText(char);
        setCopiedChar(char);
        setTimeout(() => setCopiedChar(''), 1500);
    };

    const titleText = t('tools.special-char.title');
    const descText = t('tools.special-char.description');
    const keywordsText = t('tools.special-char.keywords');

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <SEO
                title={titleText}
                description={descText}
                keywords={keywordsText}
            />

            <header className="text-center space-y-2">
                <h1 className="text-3xl font-bold flex items-center justify-center gap-3">
                    <Hash className="w-8 h-8 text-emerald-600" />
                    {isEn ? 'Special Characters' : '특수문자표'}
                </h1>
                <p className="text-muted-foreground">
                    {isEn ? 'Click any symbol below to copy it instantly to your clipboard' : '원하는 특수문자를 클릭하여 복사하세요'}
                </p>
            </header>

            <div className="space-y-6">
                {categories.map((category, idx) => (
                    <div key={idx} className="bg-card border border-border rounded-xl p-6 shadow-sm">
                        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <span className="w-1 h-5 bg-emerald-500 rounded-full"></span>
                            {category.name}
                        </h2>
                        <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-2">
                            {category.chars.map((char, charIdx) => (
                                <button
                                    key={charIdx}
                                    onClick={() => copyToClipboard(char)}
                                    className="aspect-square flex items-center justify-center text-2xl bg-secondary/50 hover:bg-emerald-50 content-center dark:hover:bg-emerald-900/20 rounded-lg transition-all relative group border border-transparent hover:border-emerald-200"
                                    title={isEn ? `Click to copy: ${char}` : `클릭하여 복사: ${char}`}
                                >
                                    <span className="group-hover:scale-125 transition-transform">{char}</span>
                                    {copiedChar === char && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-emerald-500 rounded-lg animate-in fade-in zoom-in-50 duration-200">
                                            <Check className="w-5 h-5 text-white" />
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-muted/30 rounded-xl p-6 text-sm text-muted-foreground border border-border">
                <h3 className="font-bold text-foreground mb-2">💡 {isEn ? 'How to use' : '사용 방법'}</h3>
                <ul className="space-y-1 list-disc list-inside">
                    <li>{isEn ? 'Just click on the character you want, and it will be copied automatically.' : '원하는 특수문자를 클릭하면 자동으로 클립보드에 복사됩니다.'}</li>
                    <li>{isEn ? 'A green check mark indicates the copy was successful.' : '복사된 문자는 녹색 체크 표시로 확인할 수 있습니다.'}</li>
                    <li>{isEn ? 'Paste (Ctrl+V) the character wherever you need it.' : '복사한 문자를 원하는 곳에 붙여넣기(Ctrl+V)하세요.'}</li>
                </ul>
            </div>

            <ToolGuide
                title={isEn ? "Special Characters Picker Guide" : "특수문자표 활용 가이드"}
                intro={isEn 
                    ? "Organized repository of commonly used symbols and mathematical notation. Easy single-click copying for all your decorative and technical text needs."
                    : "문서 작성이나 개발 시 자주 사용되는 특수 기호와 화살표, 수학 기호 등을 카테고리별로 모아둔 도구입니다."}
                steps={isEn ? [
                    "Browse through the different categories like Arrows, Math, or Currency.",
                    "Click directly on any symbol square to trigger the copy action.",
                    "Verify the green checkmark appears briefly.",
                    "Paste the symbol into your target application or document."
                ] : [
                    "화살표, 기호, 수학, 통화 등 원하는 카테고리로 이동합니다.",
                    "사용하려는 특수문자를 마우스로 클릭합니다.",
                    "순식간에 클립보드에 복사되며, 체크 표시가 나타납니다.",
                    "원하는 문서(한글, 워드, 메모장)나 채팅창에 붙여넣어 사용하세요."
                ]}
                tips={isEn ? [
                    "Currency symbols include widely used ones like Won, Euro, and Dollar for financial documentation.",
                    "Math symbols are perfect for writing out formulas without using complex LaTeX systems.",
                    "Line symbols can be used to create simple TUI (Text User Interface) borders in terminal apps."
                ] : [
                    "단위 기호 카테고리에는 온도(℃)나 면적(㎡) 등 실생활에 자주 쓰이는 기호들이 포함되어 있습니다.",
                    "수학 기호는 복잡한 수식을 텍스트로 표현해야 할 때 유용하게 쓰입니다.",
                    "선 기호들을 조합하면 텍스트 기반의 표나 테두리를 직접 그려볼 수도 있습니다."
                ]}
                faqs={isEn ? [
                    { q: "Will these symbols work in all fonts?", a: "Most modern fonts support these standard symbols, though some older or specialized fonts might display them as boxes (tofu)." },
                    { q: "Is there a search function?", a: "You can use the browser default search (Ctrl+F or Cmd+F) to quickly locate a specific symbol category." }
                ] : [
                    { "q": "모든 폰트에서 정상적으로 보이나요?", "a": "대부분의 현대적인 폰트와 브라우저 환경에서 잘 작동하지만, 아주 오래된 시스템에서는 일부 문자가 깨져 보일 수 있습니다." },
                    { "q": "찾고 있는 기호가 없으면 어떻게 하나요?", "a": "가장 대중적인 기호들 위주로 구성되어 있습니다. 향후 더 많은 기호들을 지속적으로 업데이트할 예정입니다." }
                ]}
            />
        </div>
    );
};

export default SpecialCharacters;
