import React, { useState, useRef, useEffect } from 'react';
import { Download, Barcode, Info, RefreshCw } from 'lucide-react';
import JsBarcode from 'jsbarcode';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { useLanguage } from '../context/LanguageContext';

const BarcodeGenerator = () => {
    const { lang, t } = useLanguage();
    const isEn = lang === 'en';

    const [text, setText] = useState('');
    const [format, setFormat] = useState('CODE128');
    const canvasRef = useRef(null);
    const [error, setError] = useState('');

    const formats = [
        { value: 'CODE128', label: isEn ? 'CODE128 (Standard)' : 'CODE128 (일반)' },
        { value: 'EAN13', label: isEn ? 'EAN-13 (13 digits)' : 'EAN-13 (13자리 숫자)' },
        { value: 'EAN13', label: isEn ? 'EAN-13 (13 digits)' : 'EAN-13 (13자리 숫자)' },
        { value: 'EAN8', label: isEn ? 'EAN-8 (8 digits)' : 'EAN-8 (8자리 숫자)' },
        { value: 'UPC', label: isEn ? 'UPC (12 digits)' : 'UPC (12자리 숫자)' },
        { value: 'CODE39', label: 'CODE39' },
    ];

    useEffect(() => {
        if (text.trim() && canvasRef.current) {
            try {
                JsBarcode(canvasRef.current, text, {
                    format: format,
                    width: 2,
                    height: 100,
                    displayValue: true,
                    fontSize: 14,
                    margin: 10
                });
                setError('');
            } catch (err) {
                setError(isEn ? 'Barcode generation failed: ' + err.message : '바코드 생성 실패: ' + err.message);
            }
        }
    }, [text, format, isEn]);

    const downloadBarcode = () => {
        if (!canvasRef.current) return;

        const link = document.createElement('a');
        link.download = `barcode_${format}.png`;
        link.href = canvasRef.current.toDataURL();
        link.click();
    };

    const reset = () => {
        setText('');
        setError('');
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <SEO
                title={isEn ? "Free Barcode Generator - Create Barcodes Online" : "바코드 생성기 - Utility Hub"}
                description={isEn 
                    ? "Generate high-quality barcodes for free. Supports CODE128, EAN-13, EAN-8, UPC, and CODE39 formats. Download as PNG."
                    : "텍스트나 숫자를 다양한 형식의 바코드로 변환할 수 있습니다. CODE128, EAN-13, UPC 등 지원."}
                keywords={isEn ? "barcode generator, online barcode, free barcode, ean13, upc, code128" : "바코드, 바코드생성기, CODE128, EAN13, UPC"}
            />

            <header className="text-center space-y-4 py-6">
                <div className="inline-flex items-center justify-center p-3 bg-orange-100 dark:bg-orange-900/30 rounded-full mb-2">
                    <Barcode className="w-8 h-8 text-orange-600 dark:text-orange-400" />
                </div>
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-amber-600">
                    {isEn ? 'Barcode Generator' : '바코드 생성기'}
                </h1>
                <p className="text-muted-foreground">
                    {isEn ? 'Convert text and numbers into various barcode formats' : '텍스트를 바코드로 변환하세요'}
                </p>
            </header>

            <div className="bg-card border border-border rounded-xl p-8 space-y-6 shadow-sm">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            {isEn ? 'Barcode Format' : '바코드 형식'}
                        </label>
                        <select
                            value={format}
                            onChange={(e) => setFormat(e.target.value)}
                            className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-medium"
                        >
                            {formats.map((f, idx) => (
                                <option key={`${f.value}-${idx}`} value={f.value}>{f.label}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            {isEn ? 'Input Text or Number' : '변환할 텍스트 또는 숫자'}
                        </label>
                        <input
                            type="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder={isEn ? "e.g., 1234567890" : "예: 1234567890128"}
                            className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-lg"
                        />
                        <div className="flex items-center gap-1.5 mt-3 text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg">
                            <Info className="w-3.5 h-3.5" />
                            <span>
                                {format === 'EAN13' && (isEn ? 'EAN-13: Requires exactly 12 or 13 digits.' : 'EAN-13: 13자리 숫자를 입력하세요')}
                                {format === 'EAN8' && (isEn ? 'EAN-8: Requires exactly 7 or 8 digits.' : 'EAN-8: 8자리 숫자를 입력하세요')}
                                {format === 'UPC' && (isEn ? 'UPC: Requires exactly 11 or 12 digits.' : 'UPC: 12자리 숫자를 입력하세요')}
                                {format === 'CODE128' && (isEn ? 'CODE128: Supports alphanumeric and special characters.' : 'CODE128: 영문, 숫자, 특수문자 사용 가능')}
                                {format === 'CODE39' && (isEn ? 'CODE39: Supports uppercase letters, digits, and specific symbols.' : 'CODE39: 영문 대문자, 숫자, 일부 특수문자 사용 가능')}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={reset}
                        className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-all font-bold"
                    >
                        <RefreshCw className="w-4 h-4" />
                        {isEn ? 'Reset' : '초기화'}
                    </button>
                    {text.trim() && !error && (
                        <button
                            onClick={downloadBarcode}
                            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:brightness-110 transition-all shadow-lg shadow-primary/20 font-bold"
                        >
                            <Download className="w-4 h-4" />
                            {isEn ? 'Download PNG' : '다운로드'}
                        </button>
                    )}
                </div>
            </div>

            {text.trim() && !error && (
                <div className="bg-white dark:bg-gray-100 border-2 border-dashed border-border rounded-xl p-10 flex flex-col items-center justify-center animate-in zoom-in-95 duration-300">
                    <canvas ref={canvasRef} className="max-w-full h-auto"></canvas>
                </div>
            )}

            {error && (
                <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-6 text-center text-red-600 dark:text-red-400 font-medium">
                    {error}
                </div>
            )}

            <div className="bg-muted/30 rounded-xl p-6 text-sm text-muted-foreground border border-border">
                <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
                    <Info className="w-4 h-4 text-amber-500" />
                    {isEn ? 'Barcode Usage Tips' : '바코드 생성 가이드'}
                </h3>
                <ul className="space-y-2 list-disc list-inside">
                    <li>{isEn ? 'Ensure the input length matches the format requirements (e.g., EAN13 needs 13 digits).' : '각 바코드 형식마다 입력 가능한 문자와 길이가 다릅니다.'}</li>
                    <li>{isEn ? 'CODE128 is highly versatile and handles most data types including English letters.' : 'CODE128은 가장 범용적이며 다양한 문자를 지원합니다.'}</li>
                    <li>{isEn ? 'Download high-quality PNG images for inventories, labeling, or product tracking.' : '생성된 바코드는 PNG 이미지로 다운로드하여 제품 관리 등에 활용할 수 있습니다.'}</li>
                </ul>
            </div>

            <ToolGuide
                title={isEn ? "Barcode Generator Guide" : "바코드 생성기 사용 가이드"}
                intro={isEn 
                    ? "Our online barcode generator permits you to create standard barcode symbols for personal and commercial usage. Simply input your digits and choose your preferred encoding format."
                    : "숫자나 영문을 표준 바코드로 즉시 변환해주는 도구입니다. 재고 관리, 라벨링, 개인용 도구로 활용해보세요."}
                steps={isEn ? [
                    "Choose the barcode standard (Format) from the dropdown gallery.",
                    "Type the value you want to encode into the input field.",
                    "Verify if the barcode appears correctly in the preview window.",
                    "Press 'Download PNG' to save the generated image to your device."
                ] : [
                    "상단 드롭다운에서 원하는 바코드 규격을 선택합니다.",
                    "변환하고자 하는 숫자나 문자를 입력창에 기입합니다.",
                    "화면에 나타난 바코드 이미지가 올바른지 실시간으로 확인합니다.",
                    "'다운로드' 버튼을 눌러 생성된 이미지를 저장하세요."
                ]}
                tips={isEn ? [
                    "Retail standards like EAN-13 and UPC are numeric only. Check digits are auto-calculated if you provide 12 or 11 digits respectively.",
                    "For internal office tracking or asset labeling, CODE128 is recommended due to its high data density.",
                    "Ensure your printer is set to high contrast for better optical scanning of the generated barcodes."
                ] : [
                    "EAN-13이나 UPC 같은 표준 규격은 정해진 자릿수(13자리, 12자리)를 채워야 생성이 가능합니다.",
                    "내부 자산 관리나 간단한 목록 생성에는 영문 혼용이 가능한 CODE128 규격을 추천합니다.",
                    "바코드를 인쇄할 때는 스캔 인식을 높이기 위해 가급적 선명한 고해상도로 출력하세요."
                ]}
                faqs={isEn ? [
                   { q: "Is this tool free for commercial use?", a: "Yes, you can generate and download barcodes for any purpose without registration or fees." },
                   { q: "What is the most common format?", a: "CODE128 is the industry standard for general shipping and logistics, while EAN-13 is most common for retail products worldwide." }
                ] : [
                    { "q": "이 도구들은 정말로 모두 무료인가요?", "a": "네! Tool Hive에서 제공하는 모든 도구 모음과 심리 테스트들은 가입 등의 번거로운 절차 없이 누구나 100% 무료로 무제한 사용할 수 있습니다." },
                    { "q": "제가 입력한 개인적인 정보 데이터가 서버에 남나요?", "a": "아니요, 사용자가 입력하는 이름, 숫자, 금액 등의 모든 데이터는 방문자의 기기 내 브라우저에서만 실시간으로 연산되며 어떠한 경우에도 외부 서버로 전송되거나 저장되지 않으므로 안심하셔도 됩니다." },
                ]}
            />
        </div>
    );
};

export default BarcodeGenerator;
