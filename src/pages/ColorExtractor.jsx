import React, { useState, useRef } from 'react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { Palette, Upload, Copy, Check, Download, Image as ImageIcon } from 'lucide-react';
import ShareButtons from '../components/ShareButtons';
import ColorThief from 'colorthief';
import { useLanguage } from '../context/LanguageContext';

const ColorExtractor = () => {
    const { lang } = useLanguage();
    const isEn = lang === 'en';
    const [colors, setColors] = useState([]);
    const [imageUrl, setImageUrl] = useState('');
    const [copiedIndex, setCopiedIndex] = useState(null);
    const fileInputRef = useRef(null);
    const imageRef = useRef(null);

    const rgbToHex = (r, g, b) => {
        return '#' + [r, g, b].map(x => {
            const hex = x.toString(16);
            return hex.length === 1 ? '0' + hex : hex;
        }).join('');
    };

    const rgbToHsl = (r, g, b) => {
        r /= 255;
        g /= 255;
        b /= 255;
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max === min) {
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
                case g: h = ((b - r) / d + 2) / 6; break;
                case b: h = ((r - g) / d + 4) / 6; break;
            }
        }

        return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
    };

    const extractColors = (img) => {
        const colorThief = new ColorThief();
        try {
            const palette = colorThief.getPalette(img, 8);
            const colorData = palette.map(([r, g, b]) => ({
                rgb: `rgb(${r}, ${g}, ${b})`,
                hex: rgbToHex(r, g, b),
                hsl: rgbToHsl(r, g, b),
                r, g, b
            }));
            setColors(colorData);
        } catch (error) {
            console.error('색상 추출 실패:', error);
            if (isEn) {
                alert('Failed to extract colors. Please try another image.');
            } else {
                alert('색상 추출에 실패했습니다. 다른 이미지를 시도해보세요.');
            }
        }
    };

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setImageUrl(event.target.result);
                setColors([]);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageLoad = () => {
        if (imageRef.current) {
            extractColors(imageRef.current);
        }
    };

    const copyToClipboard = (text, index) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 1500);
    };

    const exportAsCSS = () => {
        const css = colors.map((color, i) =>
            `--color-${i + 1}: ${color.hex};`
        ).join('\n');

        const blob = new Blob([`:root {\n  ${css}\n}`], { type: 'text/css' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = 'palette.css';
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
    };

    const exportAsJSON = () => {
        const json = JSON.stringify(colors, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = 'palette.json';
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
    };

    const toolFaqs = isEn ? [
        { q: "Is this tool free?", a: "Yes, it is 100% free to use for any number of images." },
        { q: "Are my images uploaded to a server?", a: "No, the color extraction happens entirely on your device inside the browser. Your images are never sent to our server." },
        { q: "What formats are supported?", a: "We support JPG, PNG, GIF, and WebP formats." }
    ] : [
        { "q": "이 도구들은 정말로 모두 무료인가요?", "a": "네! Tool Hive에서 제공하는 모든 도구 모음과 심리 테스트들은 가입 등의 번거로운 절차 없이 누구나 100% 무료로 무제한 사용할 수 있습니다." },
        { "q": "제가 입력한 개인적인 정보 데이터가 서버에 남나요?", "a": "아니요, 사용자가 입력하는 이름, 숫자, 금액 등의 모든 데이터는 방문자의 기기 내 브라우저에서만 실시간으로 연산되며 어떠한 경우에도 외부 서버로 전송되거나 저장되지 않으므로 안심하셔도 됩니다." },
        { "q": "버튼을 눌러도 반응이 없거나 에러가 생깁니다.", "a": "브라우저의 일시적인 캐시 문제일 수 있습니다. 키보드의 F5 버튼을 누르거나 새로고침을 진행한 후 다시 시도해 보시길 권장하며, 문제가 계속된다면 다른 브라우저 앱을 이용해 보세요." }
    ];

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <SEO
                title={isEn ? "Color Extractor - Get Color Palette from Image" : "색상 추출기 - 이미지에서 컬러 팔레트 추출 | Utility Hub"}
                description={isEn ? "Upload an image to automatically extract its primary color palette. Copy HEX, RGB, HSL codes and export to CSS/JSON." : "이미지를 업로드하면 주요 색상을 자동으로 추출합니다. HEX, RGB, HSL 코드를 복사하고 CSS/JSON으로 내보낼 수 있습니다."}
                keywords={isEn ? "color extractor, palette generator, image colors, hex code, rgb code, design tool" : "색상추출, 컬러팔레트, 이미지색상, 색상코드, HEX, RGB, HSL, 팔레트생성"}
                faqs={toolFaqs}
            />

            <div className="text-center space-y-4 py-6">
                <div className="inline-flex items-center justify-center p-3 bg-pink-100 dark:bg-pink-900/30 rounded-full mb-2">
                    <Palette className="w-8 h-8 text-pink-600 dark:text-pink-400" />
                </div>
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-purple-600">
                    {isEn ? 'Color Extractor' : '색상 추출기'}
                </h1>
                <p className="text-muted-foreground">
                    {isEn ? 'Extract vibrant color palettes from your favorite images.' : '이미지에서 주요 색상을 추출하여 팔레트를 만들어보세요.'}
                </p>
            </div>

            {/* Upload Section */}
            <div className="card p-8 bg-card border border-border rounded-xl shadow-sm">
                <div className="space-y-4">
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-12 text-center cursor-pointer hover:border-pink-500 dark:hover:border-pink-500 transition-colors"
                    >
                        <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                        <p className="text-lg font-medium mb-2">{isEn ? 'Upload Image' : '이미지 업로드'}</p>
                        <p className="text-sm text-muted-foreground">
                            {isEn ? 'Click to select or drag and drop' : '클릭하여 이미지를 선택하거나 드래그 앤 드롭'}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                            JPG, PNG, GIF, WEBP
                        </p>
                    </div>
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                    />
                </div>
            </div>

            {/* Image Preview */}
            {imageUrl && (
                <div className="card p-6 bg-card border border-border rounded-xl shadow-sm">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                        <ImageIcon className="w-5 h-5" />
                        {isEn ? 'Uploaded Image' : '업로드된 이미지'}
                    </h3>
                    <div className="flex justify-center">
                        <img
                            ref={imageRef}
                            src={imageUrl}
                            alt="Uploaded"
                            crossOrigin="anonymous"
                            onLoad={handleImageLoad}
                            className="max-w-full max-h-96 rounded-lg shadow-lg"
                        />
                    </div>
                </div>
            )}

            {/* Color Palette */}
            {colors.length > 0 && (
                <div className="space-y-6">
                    <div className="card p-6 bg-card border border-border rounded-xl shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-lg text-foreground">{isEn ? 'Extracted Palette' : '추출된 색상 팔레트'}</h3>
                            <div className="flex gap-2">
                                <button
                                    onClick={exportAsCSS}
                                    className="px-3 py-1.5 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-lg text-sm flex items-center gap-2 transition-colors"
                                >
                                    <Download className="w-4 h-4" />
                                    CSS
                                </button>
                                <button
                                    onClick={exportAsJSON}
                                    className="px-3 py-1.5 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-lg text-sm flex items-center gap-2 transition-colors"
                                >
                                    <Download className="w-4 h-4" />
                                    JSON
                                </button>
                            </div>
                        </div>

                        {/* Color Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                            {colors.map((color, index) => (
                                <div
                                    key={index}
                                    className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <div
                                        className="h-32 w-full"
                                        style={{ backgroundColor: color.hex }}
                                    />
                                    <div className="p-3 bg-card space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-mono font-bold">{color.hex.toUpperCase()}</span>
                                            <button
                                                onClick={() => copyToClipboard(color.hex, `hex-${index}`)}
                                                className="p-1 hover:bg-secondary rounded transition-colors"
                                            >
                                                {copiedIndex === `hex-${index}` ? (
                                                    <Check className="w-4 h-4 text-green-500" />
                                                ) : (
                                                    <Copy className="w-4 h-4" />
                                                )}
                                            </button>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-mono text-muted-foreground">{color.rgb}</span>
                                            <button
                                                onClick={() => copyToClipboard(color.rgb, `rgb-${index}`)}
                                                className="p-1 hover:bg-secondary rounded transition-colors"
                                            >
                                                {copiedIndex === `rgb-${index}` ? (
                                                    <Check className="w-4 h-4 text-green-500" />
                                                ) : (
                                                    <Copy className="w-4 h-4" />
                                                )}
                                            </button>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs font-mono text-muted-foreground">{color.hsl}</span>
                                            <button
                                                onClick={() => copyToClipboard(color.hsl, `hsl-${index}`)}
                                                className="p-1 hover:bg-secondary rounded transition-colors"
                                            >
                                                {copiedIndex === `hsl-${index}` ? (
                                                    <Check className="w-4 h-4 text-green-500" />
                                                ) : (
                                                    <Copy className="w-4 h-4" />
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Color Bar */}
                        <div className="h-16 rounded-lg overflow-hidden flex shadow-lg">
                            {colors.map((color, index) => (
                                <div
                                    key={index}
                                    className="flex-1"
                                    style={{ backgroundColor: color.hex }}
                                    title={color.hex}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Info */}
            <div className="bg-muted/30 rounded-xl p-6 space-y-2 text-sm">
                <h3 className="font-bold text-base">{isEn ? '💡 How to Use' : '💡 사용 방법'}</h3>
                <ul className="space-y-1 text-muted-foreground list-disc list-inside">
                    {isEn ? (
                        <>
                            <li>Upload an image to automatically extract 8 primary colors.</li>
                            <li>Click the copy icon to copy HEX, RGB, or HSL codes.</li>
                            <li>Export your palette as a CSS or JSON file.</li>
                            <li>Use it for design projects, web development, or branding.</li>
                        </>
                    ) : (
                        <>
                            <li>이미지를 업로드하면 자동으로 8가지 주요 색상을 추출합니다</li>
                            <li>각 색상의 HEX, RGB, HSL 코드를 클릭하여 복사할 수 있습니다</li>
                            <li>CSS 또는 JSON 파일로 팔레트를 내보낼 수 있습니다</li>
                            <li>디자인 작업, 웹 개발, 브랜딩 등에 활용하세요</li>
                        </>
                    )}
                </ul>
            </div>

            <ShareButtons
                title={isEn ? "Color Extractor" : "색상 추출기"}
                description={isEn ? "Generate color palettes from your images instantly!" : "이미지에서 색상 팔레트를 자동으로 추출하세요!"}
            />

            <ToolGuide
                title={isEn ? "Color Extractor" : "색상 추출기"}
                intro={isEn ? "Extract beautiful color palettes from any image." : "이미지에서 컬러 팔레트 추출"}
                steps={isEn ? [
                    "Upload your image (JPG, PNG, WEBP).",
                    "Wait for the palette to be generated.",
                    "Copy individual color codes as needed.",
                    "Export the full palette as CSS variables or JSON data."
                ] : [
                    "원하시는 옵션이나 값을 화면에 안내된 순서대로 정확하게 기입해 주세요.",
                    "제시된 항목과 보기를 꼼꼼하게 살펴보고 본인에게 맞는 것을 선택합니다.",
                    "모든 입력을 완료한 후 결과 화면에서 계산된 수치나 분석된 내용을 확인합니다.",
                    "결과가 마음에 든다면 캡처하거나 공유하기 버튼을 눌러 지인들에게 공유해보세요!"
                ]}
                tips={isEn ? [
                    "Use high-quality images for more diverse palette extraction.",
                    "The extracted colors are sorted by dominance in the image.",
                    "The CSS export is perfect for quick integration into your projects."
                ] : [
                    "결과값이 예상과 다르다면 입력한 숫자나 단위를 한 번 더 확인해보는 것이 좋습니다.",
                    "제공되는 다양한 부가 옵션을 함께 활용하면 훨씬 구체적인 형태의 맞춤형 결과를 얻을 수 있습니다.",
                    "모바일과 데스크톱 환경 모두에 완벽하게 최적화되어 있으니 언제 어디서든 편리하게 이용해 보세요."
                ]}
                faqs={toolFaqs}
            />
        </div>
    );
};

export default ColorExtractor;
