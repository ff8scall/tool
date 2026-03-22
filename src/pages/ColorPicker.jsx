import React, { useState } from 'react';
import { Copy, Check, Palette } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { useLanguage } from '../context/LanguageContext';

const ColorPicker = () => {
    const { lang, t } = useLanguage();
    const isEn = lang === 'en';

    const [color, setColor] = useState('#3b82f6');
    const [copiedValue, setCopiedValue] = useState('');

    const hexToRgb = (hex) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    };

    const rgbToHsl = (r, g, b) => {
        r /= 255;
        g /= 255;
        b /= 255;
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
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

        return {
            h: Math.round(h * 360),
            s: Math.round(s * 100),
            l: Math.round(l * 100)
        };
    };

    const rgb = hexToRgb(color);
    const hsl = rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null;

    const copyToClipboard = (text, label) => {
        navigator.clipboard.writeText(text);
        setCopiedValue(label);
        setTimeout(() => setCopiedValue(''), 1500);
    };

    const presetColors = [
        '#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16', '#22c55e',
        '#10b981', '#14b8a6', '#06b6d4', '#0ea5e9', '#3b82f6', '#6366f1',
        '#8b5cf6', '#a855f7', '#d946ef', '#ec4899', '#f43f5e', '#000000',
        '#374151', '#6b7280', '#9ca3af', '#d1d5db', '#e5e7eb', '#ffffff'
    ];

    const titleText = isEn ? "Color Picker & Converter | Utility Hub" : "색상표 - Utility Hub";
    const descText = isEn 
        ? "Pick and convert colors easily via HEX, RGB, and HSL modes. Includes quick copy functions and standard preset colors." 
        : "색상 코드를 HEX, RGB, HSL 형식으로 변환하고 복사할 수 있습니다. 색상 선택기를 통해 원하는 색상을 쉽게 찾아보세요.";
    const keywordsText = isEn ? "color picker, hex to rgb, color palette, color converter, hsl" : "색상표, 컬러피커, HEX, RGB, HSL, 색상코드";

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <SEO
                title={titleText}
                description={descText}
                keywords={keywordsText}
            />

            <header className="text-center space-y-2">
                <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
                    <Palette className="w-8 h-8" />
                    {isEn ? 'Color Picker' : '색상표'}
                </h1>
                <p className="text-muted-foreground">
                    {isEn ? 'Convert and Copy Color Codes' : '색상 코드 변환 및 복사'}
                </p>
            </header>

            <div className="bg-card border border-border rounded-xl p-8 space-y-6">
                <div className="flex flex-col items-center gap-4">
                    <div
                        className="w-48 h-48 rounded-2xl shadow-xl border-4 border-white dark:border-gray-800"
                        style={{ backgroundColor: color }}
                    />
                    <input
                        type="color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        className="w-full h-16 rounded-lg cursor-pointer"
                    />
                </div>

                <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                        <div>
                            <div className="text-sm text-muted-foreground">HEX</div>
                            <div className="font-mono font-bold text-lg">{color.toUpperCase()}</div>
                        </div>
                        <button
                            onClick={() => copyToClipboard(color.toUpperCase(), 'HEX')}
                            className="p-2 hover:bg-accent rounded-md transition-colors"
                        >
                            {copiedValue === 'HEX' ? (
                                <Check className="w-5 h-5 text-green-500" />
                            ) : (
                                <Copy className="w-5 h-5" />
                            )}
                        </button>
                    </div>

                    {rgb && (
                        <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                            <div>
                                <div className="text-sm text-muted-foreground">RGB</div>
                                <div className="font-mono font-bold text-lg">
                                    rgb({rgb.r}, {rgb.g}, {rgb.b})
                                </div>
                            </div>
                            <button
                                onClick={() => copyToClipboard(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, 'RGB')}
                                className="p-2 hover:bg-accent rounded-md transition-colors"
                            >
                                {copiedValue === 'RGB' ? (
                                    <Check className="w-5 h-5 text-green-500" />
                                ) : (
                                    <Copy className="w-5 h-5" />
                                )}
                            </button>
                        </div>
                    )}

                    {hsl && (
                        <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                            <div>
                                <div className="text-sm text-muted-foreground">HSL</div>
                                <div className="font-mono font-bold text-lg">
                                    hsl({hsl.h}, {hsl.s}%, {hsl.l}%)
                                </div>
                            </div>
                            <button
                                onClick={() => copyToClipboard(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`, 'HSL')}
                                className="p-2 hover:bg-accent rounded-md transition-colors"
                            >
                                {copiedValue === 'HSL' ? (
                                    <Check className="w-5 h-5 text-green-500" />
                                ) : (
                                    <Copy className="w-5 h-5" />
                                )}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6">
                <h2 className="text-lg font-bold mb-4">{isEn ? 'Preset Colors' : '프리셋 색상'}</h2>
                <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-12 gap-2">
                    {presetColors.map((presetColor, idx) => (
                        <button
                            key={idx}
                            onClick={() => setColor(presetColor)}
                            className="aspect-square rounded-lg shadow-md hover:scale-110 transition-transform border-2 border-transparent hover:border-primary"
                            style={{ backgroundColor: presetColor }}
                            title={presetColor}
                        />
                    ))}
                </div>
            </div>

            <div className="bg-muted/30 rounded-xl p-6 text-sm text-muted-foreground">
                <h3 className="font-bold text-foreground mb-2">💡 {isEn ? 'Info' : '안내'}</h3>
                <ul className="space-y-1 list-disc list-inside">
                    <li>{isEn ? 'Drag the color selector or pick a preset to change color.' : '색상 선택기를 드래그하거나 프리셋 색상을 클릭하여 색상을 선택하세요.'}</li>
                    <li>{isEn ? 'Values automatically update to HEX, RGB, and HSL.' : 'HEX, RGB, HSL 형식으로 자동 변환됩니다.'}</li>
                    <li>{isEn ? 'Click the copy icon to copy a specific color code to clipboard.' : '복사 버튼을 클릭하여 원하는 형식의 색상 코드를 복사할 수 있습니다.'}</li>
                </ul>
            </div>
            
            <ToolGuide
                title={isEn ? "Color Picker Guide" : "색상표"}
                intro={isEn ? "Select and convert color codes elegantly." : "컬러 피커 및 색상 코드 변환"}
                steps={isEn ? [
                    "Click on the color input block to open your system's color picker tool.",
                    "Alternatively, select one of the beautiful preset color boxes.",
                    "The color format values (HEX, RGB, HSL) will automatically update.",
                    "Click the 'Copy' icon next to your preferred format to copy."
                ] : [
                    "원하시는 옵션이나 값을 화면에 안내된 순서대로 정확하게 기입해 주세요.",
                    "제시된 항목과 보기를 꼼꼼하게 살펴보고 본인에게 맞는 것을 선택합니다.",
                    "모든 입력을 완료한 후 결과 화면에서 계산된 수치나 분석된 내용을 확인합니다.",
                    "결과가 마음에 든다면 캡처하거나 공유하기 버튼을 눌러 지인들에게 공유해보세요!"
                ]}
                tips={isEn ? [
                    "HEX represents Hexadecimal base colors heavily used in web design (e.g. #FFFFFF).",
                    "RGB stands for Red Green Blue, mostly used in CSS and design tools.",
                    "HSL (Hue, Saturation, Lightness) is great for generating dynamic themes and color matching variations."
                ] : [
                    "결과값이 예상과 다르다면 입력한 숫자나 단위를 한 번 더 확인해보는 것이 좋습니다.",
                    "제공되는 다양한 부가 옵션을 함께 활용하면 훨씬 구체적인 형태의 맞춤형 결과를 얻을 수 있습니다.",
                    "모바일과 데스크톱 환경 모두에 완벽하게 최적화되어 있으니 언제 어디서든 편리하게 이용해 보세요."
                ]}
                faqs={isEn ? [
                    { q: "Is the color space exact?", a: "Yes, standard hex algorithms are used. Note that slight visual variations can occur depending on your monitor calibration (sRGB vs P3 hardware profiles)." }
                ] : [
                    { "q": "이 도구들은 정말로 모두 무료인가요?", "a": "네! Tool Hive에서 제공하는 모든 도구 모음과 심리 테스트들은 가입 등의 번거로운 절차 없이 누구나 100% 무료로 무제한 사용할 수 있습니다." },
                    { "q": "제가 입력한 개인적인 정보 데이터가 서버에 남나요?", "a": "아니요, 사용자가 입력하는 이름, 숫자, 금액 등의 모든 데이터는 방문자의 기기 내 브라우저에서만 실시간으로 연산되며 어떠한 경우에도 외부 서버로 전송되거나 저장되지 않으므로 안심하셔도 됩니다." },
                    { "q": "버튼을 눌러도 반응이 없거나 에러가 생깁니다.", "a": "브라우저의 일시적인 캐시 문제일 수 있습니다. 키보드의 F5 버튼을 누르거나 새로고침을 진행한 후 다시 시도해 보시길 권장하며, 문제가 계속된다면 다른 브라우저 앱을 이용해 보세요." }
                ]}
            />
        </div>
    );
};

export default ColorPicker;
