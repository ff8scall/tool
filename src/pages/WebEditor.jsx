import React, { useState, useEffect } from 'react';
import { Play } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';

const WebEditor = () => {
    const [html, setHtml] = useState('<h1>Hello World!</h1>');
    const [css, setCss] = useState('h1 { color: #3b82f6; text-align: center; }');
    const [js, setJs] = useState('console.log("Hello from Web Editor!");');
    const [output, setOutput] = useState('');

    const runCode = () => {
        const combinedCode = `
            <!DOCTYPE html>
            <html>
            <head>
                <style>${css}</style>
            </head>
            <body>
                ${html}
                <script>${js}<\/script>
            </body>
            </html>
        `;
        setOutput(combinedCode);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            runCode();
        }, 500);
        return () => clearTimeout(timer);
    }, [html, css, js]);

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            <SEO
                title="웹 에디터 - Utility Hub"
                description="HTML, CSS, JavaScript를 실시간으로 작성하고 미리보기할 수 있는 온라인 웹 에디터입니다."
                keywords="웹에디터, HTML에디터, 코드에디터, 온라인에디터"
            />

            <header className="text-center space-y-2">
                <h1 className="text-3xl font-bold">웹 에디터</h1>
                <p className="text-muted-foreground">
                    HTML, CSS, JavaScript를 실시간으로 작성하고 미리보기하세요
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {/* HTML */}
                <div className="bg-card border border-border rounded-xl p-4 space-y-2">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-bold">HTML</label>
                        <span className="text-xs text-muted-foreground">자동 실행</span>
                    </div>
                    <textarea
                        value={html}
                        onChange={(e) => setHtml(e.target.value)}
                        className="w-full h-64 px-3 py-2 bg-background border border-border rounded-lg resize-none font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="HTML 코드를 입력하세요..."
                    />
                </div>

                {/* CSS */}
                <div className="bg-card border border-border rounded-xl p-4 space-y-2">
                    <label className="text-sm font-bold">CSS</label>
                    <textarea
                        value={css}
                        onChange={(e) => setCss(e.target.value)}
                        className="w-full h-64 px-3 py-2 bg-background border border-border rounded-lg resize-none font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="CSS 코드를 입력하세요..."
                    />
                </div>

                {/* JavaScript */}
                <div className="bg-card border border-border rounded-xl p-4 space-y-2">
                    <label className="text-sm font-bold">JavaScript</label>
                    <textarea
                        value={js}
                        onChange={(e) => setJs(e.target.value)}
                        className="w-full h-64 px-3 py-2 bg-background border border-border rounded-lg resize-none font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="JavaScript 코드를 입력하세요..."
                    />
                </div>
            </div>

            {/* Preview */}
            <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold">미리보기</h2>
                    <button
                        onClick={runCode}
                        className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:brightness-110 transition-all text-sm"
                    >
                        <Play className="w-4 h-4" />
                        실행
                    </button>
                </div>
                <div className="bg-white rounded-lg border-2 border-border min-h-96">
                    <iframe
                        srcDoc={output}
                        title="preview"
                        sandbox="allow-scripts"
                        className="w-full h-96 rounded-lg"
                    />
                </div>
            </div>

            <div className="bg-muted/30 rounded-xl p-6 text-sm text-muted-foreground">
                <h3 className="font-bold text-foreground mb-2">💡 사용 방법</h3>
                <ul className="space-y-1 list-disc list-inside">
                    <li>각 에디터에 HTML, CSS, JavaScript 코드를 입력하세요.</li>
                    <li>코드는 자동으로 실행되며, 미리보기 창에서 결과를 확인할 수 있습니다.</li>
                    <li>간단한 웹 페이지 프로토타입을 빠르게 만들고 테스트할 수 있습니다.</li>
                </ul>
            </div>
        \n            <ToolGuide
                title="웹 에디터"
                intro="HTML/CSS/JS 실시간 편집 및 미리보기"
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

export default WebEditor;
