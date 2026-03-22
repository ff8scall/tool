import React, { useState } from 'react';
import { Type } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { useLanguage } from '../context/LanguageContext';

const AsciiArt = () => {
    const { lang, t } = useLanguage();
    const isEn = lang === 'en';

    const [text, setText] = useState('');
    const [art, setArt] = useState('');
    const [style, setStyle] = useState('standard');

    const fonts = {
        standard: {
            A: ['  A  ', ' A A ', 'AAAAA', 'A   A', 'A   A'],
            B: ['BBBB ', 'B   B', 'BBBB ', 'B   B', 'BBBB '],
            C: [' CCC ', 'C   C', 'C    ', 'C   C', ' CCC '],
            D: ['DDDD ', 'D   D', 'D   D', 'D   D', 'DDDD '],
            E: ['EEEEE', 'E    ', 'EEE  ', 'E    ', 'EEEEE'],
            F: ['FFFFF', 'F    ', 'FFF  ', 'F    ', 'F    '],
            G: [' GGG ', 'G    ', 'G  GG', 'G   G', ' GGG '],
            H: ['H   H', 'H   H', 'HHHHH', 'H   H', 'H   H'],
            I: ['IIIII', '  I  ', '  I  ', '  I  ', 'IIIII'],
            J: ['JJJJJ', '    J', '    J', 'J   J', ' JJJ '],
            K: ['K   K', 'K  K ', 'KKK  ', 'K  K ', 'K   K'],
            L: ['L    ', 'L    ', 'L    ', 'L    ', 'LLLLL'],
            M: ['M   M', 'MM MM', 'M M M', 'M   M', 'M   M'],
            N: ['N   N', 'NN  N', 'N N N', 'N  NN', 'N   N'],
            O: [' OOO ', 'O   O', 'O   O', 'O   O', ' OOO '],
            P: ['PPPP ', 'P   P', 'PPPP ', 'P    ', 'P    '],
            Q: [' QQQ ', 'Q   Q', 'Q   Q', 'Q  Q ', ' QQ Q'],
            R: ['RRRR ', 'R   R', 'RRRR ', 'R  R ', 'R   R'],
            S: [' SSS ', 'S    ', ' SSS ', '    S', 'SSSS '],
            T: ['TTTTT', '  T  ', '  T  ', '  T  ', '  T  '],
            U: ['U   U', 'U   U', 'U   U', 'U   U', ' UUU '],
            V: ['V   V', 'V   V', 'V   V', ' V V ', '  V  '],
            W: ['W   W', 'W   W', 'W W W', 'WW WW', 'W   W'],
            X: ['X   X', ' X X ', '  X  ', ' X X ', 'X   X'],
            Y: ['Y   Y', ' Y Y ', '  Y  ', '  Y  ', '  Y  '],
            Z: ['ZZZZZ', '   Z ', '  Z  ', ' Z   ', 'ZZZZZ'],
            ' ': ['     ', '     ', '     ', '     ', '     ']
        }
    };

    const generateArt = () => {
        const upperText = text.toUpperCase();
        const lines = ['', '', '', '', ''];

        for (let char of upperText) {
            const charArt = fonts[style][char] || fonts[style][' '];
            for (let i = 0; i < 5; i++) {
                lines[i] += charArt[i] + ' ';
            }
        }

        setArt(lines.join('\n'));
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <SEO
                title={isEn ? t('tools.ascii-art.title') : "아스키아트 생성 - Utility Hub"}
                description={isEn 
                    ? t('tools.ascii-art.description')
                    : "텍스트를 아스키 아트로 변환할 수 있습니다. 큰 글자 텍스트 아트를 만들어보세요."}
                keywords={isEn ? "ascii art, text art, character drawing" : "아스키아트, ASCII아트, 텍스트아트, 문자그림"}
            />

            <header className="text-center space-y-2">
                <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
                    <Type className="w-8 h-8" />
                    {isEn ? 'ASCII Art Generator' : '아스키아트 생성'}
                </h1>
                <p className="text-muted-foreground">
                    {isEn ? 'Convert your text into large ASCII art characters' : '텍스트를 아스키 아트로 변환하세요'}
                </p>
            </header>

            {/* Input */}
            <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-2">
                        {isEn ? 'Text to Convert (English, max 20 characters recommended)' : '변환할 텍스트 (영문, 최대 20자 권장)'}
                    </label>
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value.slice(0, 20))}
                        placeholder="HELLO"
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                <button
                    onClick={generateArt}
                    disabled={!text.trim()}
                    className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-bold hover:brightness-110 transition-all disabled:opacity-50"
                >
                    {isEn ? 'Generate ASCII Art' : '아스키 아트 생성'}
                </button>
            </div>

            {/* Output */}
            {art && (
                <div className="bg-card border border-border rounded-xl p-6 space-y-4 font-mono">
                    <h2 className="text-lg font-bold font-sans">{isEn ? 'Result' : '결과'}</h2>
                    <div className="bg-background rounded-lg p-6 overflow-x-auto">
                        <pre className="text-sm whitespace-pre">
                            {art}
                        </pre>
                    </div>
                </div>
            )}

            <div className="bg-muted/30 rounded-xl p-6 text-sm text-muted-foreground">
                <h3 className="font-bold text-foreground mb-2">💡 {isEn ? 'Guide' : '안내'}</h3>
                <ul className="space-y-1 list-disc list-inside">
                    <li>{isEn ? 'Only English alphabets and spaces are supported.' : '영문 알파벳과 공백만 지원됩니다.'}</li>
                    <li>{isEn ? 'Longer text results in wider ASCII art.' : '텍스트가 길수록 아스키 아트도 길어집니다.'}</li>
                    <li>{isEn ? 'Copy the generated art for use in messages or documents.' : '생성된 아트를 복사하여 메시지, 문서 등에 사용할 수 있습니다.'}</li>
                </ul>
            </div>

            <ToolGuide
                title={isEn ? "ASCII Art Generator Guide" : "아스키아트 활용 가이드"}
                intro={isEn 
                    ? "Turn standard text into decorative ASCII art blocks. Ideal for README files, source code comments, or terminal banners."
                    : "일반 텍스트를 커다란 문자 그림(ASCII Art)으로 변환해 주는 도구입니다."}
                steps={isEn ? [
                    "Type your desired English word into the input box.",
                    "Click the 'Generate ASCII Art' button.",
                    "Check the mono-spaced result in the output panel.",
                    "Copy the text blocks and paste them into your code or terminal."
                ] : [
                    "변환하고 싶은 영문 단어를 입력창에 기입합니다.",
                    "아스키 아트 생성 버튼을 클릭합니다.",
                    "결과창에 나타난 문자 그림을 확인합니다.",
                    "생성된 텍스트를 복사하여 원하는 곳에 붙여넣으세요."
                ]}
                tips={isEn ? [
                    "This tool is currently optimized for uppercase English letters for the best visual alignment.",
                    "If the art looks broken, ensure you are using a Monospaced font (like Courier or Consolas) where you paste it.",
                    "Use it for eye-catching headers in your text-based configuration files."
                ] : [
                    "현재 영문 대문자 기반으로 최적화되어 있어 대문자 입력 시 가장 예쁘게 나옵니다.",
                    "매칭 결과가 깨져 보인다면 사용하는 폰트가 '고정폭 폰트(Monospaced)'인지 확인하세요.",
                    "프로그래밍 소스 코드 상단의 헤더 주석으로 활용하면 가독성이 좋아집니다."
                ]}
                faqs={isEn ? [
                    { q: "Does it support Korean characters?", a: "ASCII art is traditionally built using the 128 standard characters of the ASCII set. Korean is not supported in this specific font style." },
                    { q: "Can I change the font style?", a: "The 'Standard' blocky style is currently active. More styles may be added in future updates." }
                ] : [
                    { "q": "한글도 지원하나요?", "a": "아스키 아트는 표준 ASCII 문자를 기반으로 하므로 한글은 지원하지 않습니다. 영문과 숫자 위주로 사용해 주세요." },
                    { "q": "글자 크기를 조절할 수 있나요?", "a": "생성되는 아트의 높이는 5줄로 고정되어 있습니다. 전체 크기는 결과 텍스트의 폰트 크기를 조절하여 맞출 수 있습니다." }
                ]}
            />
        </div>
    );
};

export default AsciiArt;
