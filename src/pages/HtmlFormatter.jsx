import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';

const HtmlFormatter = () => {
    const [input, setInput] = useState('');
    const [formatted, setFormatted] = useState('');
    const [copied, setCopied] = useState(false);

    const formatHtml = () => {
        try {
            let html = input.trim();
            let indent = 0;
            const tab = '  ';
            let result = '';

            html = html.replace(/>\s+</g, '><');

            const tokens = html.split(/(<[^>]+>)/g).filter(token => token.trim());

            tokens.forEach(token => {
                if (token.match(/^<\/\w/)) {
                    indent--;
                    result += tab.repeat(Math.max(0, indent)) + token + '\n';
                } else if (token.match(/^<\w[^>]*[^\/]>$/)) {
                    result += tab.repeat(indent) + token + '\n';
                    indent++;
                } else if (token.match(/^<\w[^>]*\/>$/)) {
                    result += tab.repeat(indent) + token + '\n';
                } else if (token.trim()) {
                    result += tab.repeat(indent) + token + '\n';
                }
            });

            setFormatted(result.trim());
        } catch (err) {
            setFormatted('포맷팅 오류: ' + err.message);
        }
    };

    const minifyHtml = () => {
        const minified = input
            .replace(/\s+/g, ' ')
            .replace(/>\s+</g, '><')
            .trim();
        setFormatted(minified);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(formatted);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            <SEO
                title="HTML 코드 뷰/포맷터 - Utility Hub"
                description="HTML 코드를 보기 좋게 포맷팅하거나 압축할 수 있습니다. 들여쓰기 자동 정렬 기능을 제공합니다."
                keywords="HTML포맷터, HTML정렬, 코드포맷팅, HTML압축"
            />

            <header className="text-center space-y-2">
                <h1 className="text-3xl font-bold">HTML 코드 뷰/포맷터</h1>
                <p className="text-muted-foreground">
                    HTML 코드를 정렬하거나 압축하세요
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Input */}
                <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                    <label className="block text-sm font-medium">
                        HTML 코드 입력
                    </label>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="<div><p>Hello World</p></div>"
                        className="w-full h-96 px-4 py-3 bg-background border border-border rounded-lg resize-none font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <div className="flex gap-2">
                        <button
                            onClick={formatHtml}
                            disabled={!input.trim()}
                            className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:brightness-110 transition-all disabled:opacity-50"
                        >
                            포맷팅
                        </button>
                        <button
                            onClick={minifyHtml}
                            disabled={!input.trim()}
                            className="flex-1 px-4 py-2 bg-secondary hover:bg-accent rounded-lg transition-colors disabled:opacity-50"
                        >
                            압축
                        </button>
                    </div>
                </div>

                {/* Output */}
                <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <label className="block text-sm font-medium">
                            결과
                        </label>
                        {formatted && (
                            <button
                                onClick={copyToClipboard}
                                className="flex items-center gap-2 px-3 py-1 text-sm bg-secondary hover:bg-accent rounded-md transition-colors"
                            >
                                {copied ? (
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
                        )}
                    </div>
                    <textarea
                        value={formatted}
                        readOnly
                        placeholder="결과가 여기에 표시됩니다"
                        className="w-full h-96 px-4 py-3 bg-background border border-border rounded-lg resize-none font-mono text-sm focus:outline-none"
                    />
                </div>
            </div>

            <ToolGuide
                title="깨끗한 코드를 위한 HTML 포맷터 활용 가이드"
                intro="가독성이 떨어지는 HTML 소스 코드를 표준 들여쓰기 규칙에 맞춰 예쁘게 정렬하거나, 웹사이트 로딩 속도 최적화를 위해 불필요한 공백을 제거(압축)하는 도구입니다."
                steps={[
                    "'HTML 코드 입력'란에 작업 중인 소스 코드를 붙여넣습니다.",
                    "코드를 예쁘게 정렬하고 싶다면 '포맷팅' 버튼을 클릭합니다.",
                    "파일 용량을 줄이고 싶다면 '압축' 버튼을 클릭하여 공백을 제거합니다.",
                    "결과물 구성이 완료되면 우측 상단의 '복사' 버튼을 눌러 프로젝트에 적용합니다."
                ]}
                tips={[
                    "다른 사람의 코드를 분석할 때 '포맷팅' 기능을 사용하면 구조를 파악하기 훨씬 수월해집니다.",
                    "실제 서비스 배포 시에는 '압축'된 코드를 사용하여 네트워크 트래픽을 절약할 수 있습니다.",
                    "복잡한 중첩 구조(Div hell)를 정렬하여 태그 닫힘 누락 오류를 쉽게 찾아보세요."
                ]}
                faqs={[
                    {
                        q: "스크립트(JS)나 스타일(CSS) 태그 안의 내용도 정렬되나요?",
                        a: "현재 도구는 HTML 태그 구조를 중심으로 정렬하며, 내부의 복잡한 스크립트 논리는 원본을 최대한 유지합니다."
                    },
                    {
                        q: "포맷팅 후 코드가 깨질 위험은 없나요?",
                        a: "단순 공백과 들여쓰기만 조정하므로 실행 로직에는 영향을 주지 않지만, 중요한 코드는 항상 백업 후 작업하시길 권장합니다."
                    }
                ]}
            />
        </div>
    );
};

export default HtmlFormatter;
