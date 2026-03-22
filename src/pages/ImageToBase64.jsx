import React, { useState } from 'react';
import { Upload, Download, Copy, Check, FileImage, ImageIcon, Hash, FileCode, CheckCircle2 } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { useLanguage } from '../context/LanguageContext';

const ImageToBase64 = () => {
    const { lang, t } = useLanguage();
    const isEn = lang === 'en';

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
        if (!base64) return;
        navigator.clipboard.writeText(base64);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const downloadAsText = () => {
        if (!base64) return;
        const blob = new Blob([base64], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `${fileName || 'image'}_base64.txt`;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
    };

    const titleText = isEn ? "Image to Base64 Converter | Encode Images Online" : "이미지 Base64 변환기 | 온라인 이미지 인코딩 도구";
    const descText = isEn 
        ? "Convert any image file (PNG, JPG, SVG, WebP) into a Base64 encoded string instantly. Perfect for embedding images directly into HTML or CSS." 
        : "이미지 파일을 Base64 문자열로 즉시 변환하세요. HTML이나 CSS에 이미지를 직접 삽입(Embed)할 때 필수적인 유용한 개발자 도구입니다.";
    const keywordsText = isEn ? "image to base64, base64 encoder, data uri generator, encode image online, svg to base64" : "이미지Base64, Base64변환, 이미지인코딩, DataURL생성, 개발자도구, 이미지임베딩";

    const toolFaqs = isEn ? [
        {
            q: "What is Base64 image encoding used for?",
            a: "It allows you to embed image data directly into HTML <img> tags or CSS 'background-image' properties, reducing the number of HTTP requests a browser needs to make."
        },
        {
            q: "Are there file size limitations?",
            a: "While our tool handles large files, Base64 strings are ~33% larger than raw binary files. For very large images, traditional file hosting is generally more performant."
        }
    ] : [
        { "q": "Base64 이미지 인코딩은 어디에 쓰이나요?", "a": "이미지 데이터를 HTML <img> 태그의 src 속성이나 CSS의 background-image에 직접 텍스트로 삽입하여, 별도의 이미지 파일 호출 없이 페이지를 렌더링할 때 사용합니다." },
        { "q": "파일 용량 제한이 있나요?", "a": "브라우저 성능이 허용하는 한 대용량 파일도 변환 가능하나, Base64 변환 시 원본보다 용량이 약 33% 커지므로 너무 큰 이미지는 직접 링크 방식을 권장합니다." }
    ];

    const toolSteps = isEn ? [
        "Drag and drop or click the upload area to select your target image file.",
        "Verify the visual output in the 'Live Preview' section to ensure the correct file was loaded.",
        "Examine the generated Base64 string in the output panel.",
        "Copy the resulting string or download it as a `.txt` file for your project."
    ] : [
        "업로드 영역을 클릭하거나 파일을 끌어다 놓아 변환할 이미지를 선택합니다.",
        "'실시간 미리보기' 섹션에서 불러온 파일이 맞는지 시각적으로 확인합니다.",
        "생성된 Base64 텍스트 코드를 하단 출력창에서 확인합니다.",
        "복사 버튼을 누르거나 텍스트 파일(.txt)로 다운로드하여 소스 코드에 활용하세요."
    ];

    const toolTips = isEn ? [
        "Great for small icons or logos to speed up initial page load by eliminating external requests.",
        "Use the 'Data URI' format (starting with data:image/...) directly in your code as a source.",
        "All processing is done locally in your browser—no images are uploaded to any server."
    ] : [
        "작은 아이콘이나 로고를 Base64로 처리하면 웹페이지 초기 로딩 시 서버 요청 횟수를 줄여 성능을 높일 수 있습니다.",
        "CSS 가상 요소(::before 등)의 content 속성에 이미지를 넣을 때 매우 유용합니다.",
        "모든 변환 과정은 사용자 PC 내에서만 진행되며 이미지가 서버로 전송되지 않아 보안상 매우 안전합니다."
    ];

    return (
        <div className="max-w-5xl mx-auto space-y-6 px-4 md:px-0">
            <SEO
                title={titleText}
                description={descText}
                keywords={keywordsText}
                category="dev"
                faqs={toolFaqs}
                steps={toolSteps}
            />

            <header className="text-center space-y-4">
                <div className="inline-flex items-center justify-center p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl text-indigo-600 dark:text-indigo-400 mb-2 border border-indigo-200 dark:border-indigo-800 shadow-sm">
                    <ImageIcon size={32} />
                </div>
                <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
                    {isEn ? 'Image to Base64 Encoder' : '이미지 Base64 변환기'}
                </h1>
                <p className="text-muted-foreground text-sm max-w-lg mx-auto leading-relaxed">
                    {isEn ? 'Seamlessly convert visual project assets into clean, ready-to-use Base64 strings for your source code.' : '이미지를 텍스트 데이터로 변환하여 HTML이나 CSS에 직접 삽입 가능한 코드로 만드세요'}
                </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Upload & Preview */}
                <div className="lg:col-span-12">
                    <div className="bg-card border-2 border-dashed border-border hover:border-indigo-500/50 rounded-3xl p-8 md:p-12 transition-all flex flex-col items-center justify-center space-y-4 group relative overflow-hidden bg-gradient-to-b from-card to-secondary/10">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="absolute inset-0 opacity-0 cursor-pointer z-10"
                        />
                        <div className="p-5 bg-background rounded-2xl shadow-sm border border-border group-hover:scale-110 transition-transform duration-500">
                            <Upload className="w-10 h-10 text-indigo-500" />
                        </div>
                        <div className="text-center">
                            <h3 className="text-lg font-black text-foreground mb-1">
                                {isEn ? 'Upload or Drop Image' : '이미지 업로드 또는 드래그'}
                            </h3>
                            <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">
                                JPG, PNG, GIF, WebP, SVG
                            </p>
                        </div>
                        {fileName && (
                            <div className="px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full flex items-center gap-2 animate-in zoom-in-95">
                                <FileImage size={14} className="text-indigo-600" />
                                <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300">{fileName}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Main Content Areas */}
                {base64 && (
                    <>
                        {/* Preview Card */}
                        <div className="lg:col-span-5 space-y-4">
                            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm h-full flex flex-col">
                                <div className="flex items-center gap-2 font-black text-[10px] text-muted-foreground uppercase tracking-widest mb-4 border-b border-border/50 pb-2">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                                    {isEn ? 'Live Visual Preview' : '실시간 시각 미리보기'}
                                </div>
                                <div className="flex-1 flex items-center justify-center bg-background/50 rounded-xl p-4 border border-dashed border-border min-h-[300px] overflow-hidden">
                                    <img
                                        src={imageUrl}
                                        alt="Base64 Preview"
                                        className="max-w-full max-h-[400px] rounded-lg shadow-2xl object-contain animate-in fade-in zoom-in-90 duration-700"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Base64 Result Card */}
                        <div className="lg:col-span-7 space-y-4">
                            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm space-y-4 flex flex-col h-full">
                                <div className="flex items-center justify-between border-b border-border/50 pb-3">
                                    <div className="flex items-center gap-2 font-black text-[10px] text-muted-foreground uppercase tracking-widest">
                                        <FileCode className="w-4 h-4 text-indigo-500" />
                                        {isEn ? 'Generated Base64 Payload' : '생성된 Base64 페이로드'}
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={copyToClipboard}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all font-black text-xs border shadow-sm ${
                                                copied ? 'bg-green-500 border-green-500 text-white' : 'bg-background hover:bg-secondary text-foreground border-border'
                                            }`}
                                        >
                                            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                            {copied ? (isEn ? 'COPIED' : '복사됨') : (isEn ? 'COPY' : '복사')}
                                        </button>
                                        <button
                                            onClick={downloadAsText}
                                            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 rounded-xl transition-all font-black text-xs shadow-md shadow-indigo-500/20"
                                        >
                                            <Download className="w-4 h-4" />
                                            {isEn ? 'DOWNLOAD' : '다운로드'}
                                        </button>
                                    </div>
                                </div>
                                <textarea
                                    value={base64}
                                    readOnly
                                    className="w-full flex-1 min-h-[250px] p-6 bg-background border-2 border-border/80 rounded-xl resize-none font-mono text-[11px] leading-relaxed focus:outline-none shadow-inner custom-scrollbar break-all"
                                />
                                <div className="flex items-center justify-between px-1">
                                    <div className="flex items-center gap-2">
                                        <Hash size={14} className="text-muted-foreground" />
                                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                                            {isEn ? 'Payload Complexity:' : '데이터 길이:'} {base64.length.toLocaleString()} {isEn ? 'Characters' : '글자'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* Quick Guide Tips */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-indigo-500/5 border border-indigo-500/10 rounded-2xl p-6 space-y-2">
                    <h4 className="font-black text-xs text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">{isEn ? 'Usage in HTML' : 'HTML 사용 예시'}</h4>
                    <code className="block p-3 bg-background border border-border rounded-lg text-xs font-mono break-all text-muted-foreground">
                        &lt;img src="data:image/png;base64,{base64 ? base64.substring(0, 20) : '...'}" /&gt;
                    </code>
                </div>
                <div className="bg-slate-500/5 border border-slate-500/10 rounded-2xl p-6 space-y-2">
                    <h4 className="font-black text-xs text-slate-600 dark:text-slate-400 uppercase tracking-widest">{isEn ? 'Usage in CSS' : 'CSS 사용 예시'}</h4>
                    <code className="block p-3 bg-background border border-border rounded-lg text-xs font-mono break-all text-muted-foreground">
                        background-image: url("data:image/png;base64,{base64 ? base64.substring(0, 20) : '...'}");
                    </code>
                </div>
            </div>

            <ToolGuide
                title={isEn ? "Professional Image Encoding Guide" : "이미지 Base64 변환 상세 가이드"}
                intro={isEn 
                    ? "Our studio-grade encoder facilitates optimized asset integration. Ideal for performance tuning web applications by minimizing individual HTTP asset fetches." 
                    : "이미지 리소스를 텍스트 데이터로 변환하여 성능과 편의성을 동시에 잡으세요. 모든 인코딩 과정은 격리된 브라우저 환경에서 안전하게 수행됩니다."}
                steps={toolSteps}
                tips={toolTips}
                faqs={toolFaqs}
            />
        </div>
    );
};

export default ImageToBase64;
