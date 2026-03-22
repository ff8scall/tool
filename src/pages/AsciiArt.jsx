import React, { useState } from 'react';
import { Type } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';

const AsciiArt = () => {
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
                title="아스키아트 생성 - Utility Hub"
                description="텍스트를 아스키 아트로 변환할 수 있습니다. 큰 글자 텍스트 아트를 만들어보세요."
                keywords="아스키아트, ASCII아트, 텍스트아트, 문자그림"
            />

            <header className="text-center space-y-2">
                <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
                    <Type className="w-8 h-8" />
                    아스키아트 생성
                </h1>
                <p className="text-muted-foreground">
                    텍스트를 아스키 아트로 변환하세요
                </p>
            </header>

            {/* Input */}
            <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-2">
                        변환할 텍스트 (영문, 최대 20자 권장)
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
                    아스키 아트 생성
                </button>
            </div>

            {/* Output */}
            {art && (
                <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                    <h2 className="text-lg font-bold">결과</h2>
                    <div className="bg-background rounded-lg p-6 overflow-x-auto">
                        <pre className="font-mono text-sm whitespace-pre">
                            {art}
                        </pre>
                    </div>
                </div>
            )}

            <div className="bg-muted/30 rounded-xl p-6 text-sm text-muted-foreground">
                <h3 className="font-bold text-foreground mb-2">💡 안내</h3>
                <ul className="space-y-1 list-disc list-inside">
                    <li>영문 알파벳과 공백만 지원됩니다.</li>
                    <li>텍스트가 길수록 아스키 아트도 길어집니다.</li>
                    <li>생성된 아트를 복사하여 메시지, 문서 등에 사용할 수 있습니다.</li>
                </ul>
            </div>
        \n            <ToolGuide
                title="아스키아트"
                intro="텍스트를 아스키 아트로 변환"
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

export default AsciiArt;
