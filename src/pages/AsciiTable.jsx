import React, { useState } from 'react';
import { Copy, Check, FileCode } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { useLanguage } from '../context/LanguageContext';

const AsciiTable = () => {
    const { lang, t } = useLanguage();
    const isEn = lang === 'en';

    const [copiedCode, setCopiedCode] = useState('');

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        setCopiedCode(text);
        setTimeout(() => setCopiedCode(''), 1500);
    };

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
        if (code === 32) return isEn ? 'Space' : '공백';
        if (code >= 48 && code <= 57) return isEn ? 'Digit' : '숫자';
        if (code >= 65 && code <= 90) return isEn ? 'Uppercase' : '대문자';
        if (code >= 97 && code <= 122) return isEn ? 'Lowercase' : '소문자';
        return isEn ? 'Symbol' : '기호';
    }

    const titleText = t('tools.ascii-table.title');
    const descText = t('tools.ascii-table.description');
    const keywordsText = t('tools.ascii-table.keywords');

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            <SEO
                title={titleText}
                description={descText}
                keywords={keywordsText}
            />

            <header className="text-center space-y-2">
                <h1 className="text-3xl font-bold flex items-center justify-center gap-3">
                    <FileCode className="w-8 h-8 text-lime-600" />
                    {isEn ? 'ASCII Table Reference' : '아스키 코드표'}
                </h1>
                <p className="text-muted-foreground">
                    {isEn ? 'Complete list of printable ASCII characters and their numeric representatives.' : 'ASCII 코드와 문자 대응표'}
                </p>
            </header>

            <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-muted">
                            <tr>
                                <th className="px-4 py-3 text-left font-bold">{isEn ? 'DEC' : '10진수'}</th>
                                <th className="px-4 py-3 text-left font-bold">{isEn ? 'HEX' : '16진수'}</th>
                                <th className="px-4 py-3 text-center font-bold">{isEn ? 'CHAR' : '문자'}</th>
                                <th className="px-4 py-3 text-left font-bold">{isEn ? 'Description' : '설명'}</th>
                                <th className="px-4 py-3 text-left font-bold">{isEn ? 'Copy' : '복사'}</th>
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
                                            title={isEn ? "Copy Char" : "문자 복사"}
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

            <div className="bg-muted/30 rounded-xl p-6 text-sm text-muted-foreground border border-border">
                <h3 className="font-bold text-foreground mb-2">💡 {isEn ? 'What is ASCII?' : '아스키 코드 안내'}</h3>
                <ul className="space-y-1 list-disc list-inside">
                    <li>{isEn ? 'ASCII stands for American Standard Code for Information Interchange.' : 'ASCII는 정보 교환을 위한 미국 표준 기호 체계를 의미합니다.'}</li>
                    <li>{isEn ? 'This table focuses on characters 32-126, which are common printable symbols.' : '본 표는 32번부터 126번까지의 일반적인 출력 가능 문자를 보여줍니다.'}</li>
                    <li>{isEn ? 'DEC column shows standard integers while HEX shows hexadecimal programming values.' : '10진수(DEC)와 16진수(HEX)를 통해 프로그래밍에 필요한 값을 쉽게 찾을 수 있습니다.'}</li>
                    <li>{isEn ? 'Click the copy icon to quickly grab the literal character symbol.' : '복사 버튼을 클릭하면 해당 문자가 클립보드에 복사됩니다.'}</li>
                </ul>
            </div>

            <ToolGuide
                title={isEn ? "ASCII Table Guide" : "아스키 코드표 활용 가이드"}
                intro={isEn 
                    ? "Comprehensive lookup for the ASCII character set. Reference standard decimal and hexadecimal codes used in low-level programming."
                    : "개발자 및 학생들을 위한 ASCII 문자 및 코드 대응 참조표입니다."}
                steps={isEn ? [
                    "Scroll through the table or use browser search (Ctrl+F) to find a specific character.",
                    "Look up the corresponding Decimal or Hexadecimal value in the left columns.",
                    "Click the copy icon to copy the character to your clipboard.",
                    "Paste it directly into your source code or documentation."
                ] : [
                    "표를 스크롤하거나 브라우저 검색(Ctrl+F)을 통해 원하는 문자를 찾습니다.",
                    "좌측 열에서 해당 문자의 10진수 및 16진수 값을 확인합니다.",
                    "필요한 경우 우측의 복사 버튼을 눌러 문자를 클립보드에 담습니다.",
                    "학습용이나 실제 프로그래밍 소스 코드 작성 시 참고 자료로 활용하세요."
                ]}
                tips={isEn ? [
                    "Control characters (0-31) are not shown here as they are invisible non-printable characters like NEWLINE or TAB.",
                    "Hexadecimal codes are usually prefixed with '0x' in languages like C, C++, and JavaScript.",
                    "The character 'A' is always 65 (DEC) and 0x41 (HEX)."
                ] : [
                    "0~31번까지의 제어 문자(줄바꿈, 탭 등)는 화면에 출력되지 않으므로 본 표에서는 제외되었습니다.",
                    "프로그래밍 언어에서 16진수를 사용할 때는 보통 앞에 '0x'를 붙여 표기합니다.",
                    "문자 'A'는 10진수 65번, 16진수 0x41이라는 점을 기억해두면 편리합니다."
                ]}
                faqs={isEn ? [
                    { q: "What is the range of ASCII?", a: "The standard ASCII character set uses 7 bits and includes values from 0 to 127." },
                    { q: "Is Unicode the same as ASCII?", a: "ASCII is a subset of Unicode. The first 128 characters of Unicode (UTF-8) are identical to the standard ASCII table." }
                ] : [
                    { "q": "아스키 코드의 범위는 어디까지인가요?", "a": "표준 아스키 코드는 7비트로 구성되어 0번부터 127번까지 총 128개의 문자를 포함합니다." },
                    { "q": "확장 아스키 코드와는 무엇이 다른가요?", "a": "확장 아스키 코드는 8비트를 사용하여 255번까지 정의하며, 국가별 특수 기호나 그래픽 문자를 추가로 포함합니다." }
                ]}
            />
        </div>
    );
};

export default AsciiTable;
