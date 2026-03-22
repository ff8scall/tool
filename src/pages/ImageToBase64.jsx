import React, { useState } from 'react';
import { Upload, Download, Copy, Check } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';

const ImageToBase64 = () => {
    const [base64, setBase64] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [copied, setCopied] = useState(false);
    const [fileName, setFileName] = useState('');

    const handleFileUpload = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setFileName(file.name);
        const reader = new FileReader();
        reader.onloadend = () => {
            const result = reader.result;
            setBase64(result);
            setImageUrl(result);
        };
        reader.readAsDataURL(file);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(base64);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    const downloadAsText = () => {
        const blob = new Blob([base64], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = 'base64.txt';
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <SEO
                title="이미지 Base64 변환 - Utility Hub"
                description="이미지 파일을 Base64 문자열로 변환할 수 있습니다. HTML/CSS에 이미지를 임베드할 때 유용합니다."
                keywords="Base64, 이미지변환, 이미지인코딩, Data URL"
            />

            <header className="text-center space-y-2">
                <h1 className="text-3xl font-bold">이미지 Base64 변환</h1>
                <p className="text-muted-foreground">
                    이미지를 Base64 문자열로 변환하세요
                </p>
            </header>

            {/* Upload */}
            <div className="bg-card border border-border rounded-xl p-8">
                <label className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary transition-colors">
                    <Upload className="w-12 h-12 mb-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground mb-2">
                        클릭하여 이미지 업로드
                    </span>
                    <span className="text-xs text-muted-foreground">
                        JPG, PNG, GIF, WebP 등
                    </span>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                    />
                </label>
                {fileName && (
                    <p className="text-sm text-center mt-4 text-muted-foreground">
                        선택된 파일: {fileName}
                    </p>
                )}
            </div>

            {/* Preview */}
            {imageUrl && (
                <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                    <h2 className="text-lg font-bold">미리보기</h2>
                    <div className="flex justify-center bg-muted/30 rounded-lg p-4">
                        <img
                            src={imageUrl}
                            alt="Preview"
                            className="max-w-full max-h-96 rounded-lg shadow-lg"
                        />
                    </div>
                </div>
            )}

            {/* Base64 Output */}
            {base64 && (
                <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-bold">Base64 문자열</h2>
                        <div className="flex gap-2">
                            <button
                                onClick={copyToClipboard}
                                className="flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-accent rounded-lg transition-colors text-sm"
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
                            <button
                                onClick={downloadAsText}
                                className="flex items-center gap-2 px-4 py-2 bg-secondary hover:bg-accent rounded-lg transition-colors text-sm"
                            >
                                <Download className="w-4 h-4" />
                                다운로드
                            </button>
                        </div>
                    </div>
                    <textarea
                        value={base64}
                        readOnly
                        className="w-full h-48 px-4 py-3 bg-background border border-border rounded-lg resize-none font-mono text-xs focus:outline-none"
                    />
                    <div className="text-xs text-muted-foreground">
                        문자열 길이: {base64.length.toLocaleString()} 문자
                    </div>
                </div>
            )}

            <div className="bg-muted/30 rounded-xl p-6 text-sm text-muted-foreground">
                <h3 className="font-bold text-foreground mb-2">💡 사용 방법</h3>
                <ul className="space-y-1 list-disc list-inside">
                    <li>이미지 파일을 업로드하면 Base64 문자열로 변환됩니다.</li>
                    <li>HTML/CSS에서 이미지를 임베드할 때 사용할 수 있습니다.</li>
                    <li>예: &lt;img src="data:image/png;base64,..." /&gt;</li>
                    <li>큰 이미지는 문자열이 매우 길어질 수 있으니 주의하세요.</li>
                </ul>
            </div>
        \n            <ToolGuide
                title="이미지 Base64"
                intro="이미지를 Base64로 인코딩"
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

export default ImageToBase64;
