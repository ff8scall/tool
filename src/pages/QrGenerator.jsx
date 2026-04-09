import React, { useState, useRef } from 'react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { QrCode, Download, Wifi, User, Link as LinkIcon, Palette, Copy, Check } from 'lucide-react';
import ShareButtons from '../components/ShareButtons';
import QRCode from 'qrcode';
import { useLanguage } from '../context/LanguageContext';

const QrGenerator = () => {
    const { lang, t } = useLanguage();
    const isEn = lang === 'en';

    const [mode, setMode] = useState('text'); // text, wifi, vcard
    const [qrDataUrl, setQrDataUrl] = useState('');
    const [qrSize, setQrSize] = useState(400);
    const [copied, setCopied] = useState(false);

    // Text/URL
    const [text, setText] = useState('');

    // WiFi fields
    const [wifiSSID, setWifiSSID] = useState('');
    const [wifiPassword, setWifiPassword] = useState('');
    const [wifiEncryption, setWifiEncryption] = useState('WPA');

    // vCard fields
    const [vcardName, setVcardName] = useState('');
    const [vcardPhone, setVcardPhone] = useState('');
    const [vcardEmail, setVcardEmail] = useState('');
    const [vcardOrg, setVcardOrg] = useState('');

    const generateWiFiString = () => {
        return `WIFI:T:${wifiEncryption};S:${wifiSSID};P:${wifiPassword};;`;
    };

    const generateVCardString = () => {
        return `BEGIN:VCARD\nVERSION:3.0\nFN:${vcardName}\nTEL:${vcardPhone}\nEMAIL:${vcardEmail}\nORG:${vcardOrg}\nEND:VCARD`;
    };

    const getQRValue = () => {
        if (mode === 'wifi') return generateWiFiString();
        if (mode === 'vcard') return generateVCardString();
        return text;
    };

    const hasValidData = () => {
        if (mode === 'text') return text.trim().length > 0;
        if (mode === 'wifi') return wifiSSID.trim().length > 0;
        if (mode === 'vcard') return vcardName.trim().length > 0;
        return false;
    };

    const generateQR = async () => {
        if (!hasValidData()) return;

        try {
            const dataUrl = await QRCode.toDataURL(getQRValue(), {
                width: qrSize,
                margin: 2,
                color: {
                    dark: '#000000',
                    light: '#FFFFFF'
                }
            });
            setQrDataUrl(dataUrl);
        } catch (err) {
            console.error(isEn ? 'QR Gen Failed:' : 'QR 코드 생성 실패:', err);
        }
    };

    const downloadQR = () => {
        if (!qrDataUrl) return;
        const link = document.createElement('a');
        link.download = `qrcode-${Date.now()}.png`;
        link.href = qrDataUrl;
        link.click();
    };

    const copyToClipboard = async () => {
        if (!qrDataUrl) return;
        try {
            const blob = await (await fetch(qrDataUrl)).blob();
            await navigator.clipboard.write([
                new ClipboardItem({ 'image/png': blob })
            ]);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch (err) {
            console.error(isEn ? 'Copy Failed:' : '복사 실패:', err);
        }
    };

    const titleText = t('tools.qr-gen.title');
    const descText = t('tools.qr-gen.description');
    const keywordsText = t('tools.qr-gen.keywords');

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <SEO
                title={titleText}
                description={descText}
                keywords={keywordsText}
            />

            <div className="text-center space-y-4 py-6">
                <div className="inline-flex items-center justify-center p-3 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-2">
                    <QrCode className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                </div>
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                    {isEn ? 'QR Code Generator' : 'QR 코드 생성기'}
                </h1>
                <p className="text-muted-foreground">
                    {isEn ? 'Convert Text, URL, WiFi, or vCard into a QR Code instantly.' : '텍스트, URL, WiFi, 명함을 QR 코드로 변환하세요.'}
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-6">
                    <div className="card p-6 space-y-4">
                        <h3 className="font-bold text-lg">{isEn ? 'QR Code Type' : 'QR 코드 유형'}</h3>
                        <div className="grid grid-cols-3 gap-2">
                            <button
                                onClick={() => setMode('text')}
                                className={`p-3 rounded-lg border-2 transition-all ${mode === 'text'
                                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                                        : 'border-gray-200 dark:border-gray-700'
                                    }`}
                            >
                                <LinkIcon className="w-5 h-5 mx-auto mb-1" />
                                <div className="text-xs font-medium">{isEn ? 'Text/URL' : '텍스트/URL'}</div>
                            </button>
                            <button
                                onClick={() => setMode('wifi')}
                                className={`p-3 rounded-lg border-2 transition-all ${mode === 'wifi'
                                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                                        : 'border-gray-200 dark:border-gray-700'
                                    }`}
                            >
                                <Wifi className="w-5 h-5 mx-auto mb-1" />
                                <div className="text-xs font-medium">WiFi</div>
                            </button>
                            <button
                                onClick={() => setMode('vcard')}
                                className={`p-3 rounded-lg border-2 transition-all ${mode === 'vcard'
                                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                                        : 'border-gray-200 dark:border-gray-700'
                                    }`}
                            >
                                <User className="w-5 h-5 mx-auto mb-1" />
                                <div className="text-xs font-medium">{isEn ? 'vCard' : '명함'}</div>
                            </button>
                        </div>
                    </div>

                    <div className="card p-6 space-y-4">
                        <h3 className="font-bold text-lg">{isEn ? 'Enter Details' : '내용 입력'}</h3>

                        {mode === 'text' && (
                            <div>
                                <label className="block text-sm font-medium mb-2">{isEn ? 'Text or URL' : '텍스트 또는 URL'}</label>
                                <textarea
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    className="input w-full h-32 resize-none"
                                    placeholder={isEn ? "https://example.com or any text" : "https://example.com 또는 텍스트를 입력하세요"}
                                />
                            </div>
                        )}

                        {mode === 'wifi' && (
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-sm font-medium mb-2">{isEn ? 'Network Name (SSID)' : '네트워크 이름 (SSID)'}</label>
                                    <input
                                        type="text"
                                        value={wifiSSID}
                                        onChange={(e) => setWifiSSID(e.target.value)}
                                        className="input w-full"
                                        placeholder="MyWiFi"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">{isEn ? 'Password' : '비밀번호'}</label>
                                    <input
                                        type="text"
                                        value={wifiPassword}
                                        onChange={(e) => setWifiPassword(e.target.value)}
                                        className="input w-full"
                                        placeholder="password123"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">{isEn ? 'Encryption' : '암호화 방식'}</label>
                                    <select
                                        value={wifiEncryption}
                                        onChange={(e) => setWifiEncryption(e.target.value)}
                                        className="input w-full"
                                    >
                                        <option value="WPA">WPA/WPA2</option>
                                        <option value="WEP">WEP</option>
                                        <option value="nopass">{isEn ? 'None' : '암호 없음'}</option>
                                    </select>
                                </div>
                            </div>
                        )}

                        {mode === 'vcard' && (
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-sm font-medium mb-2">{isEn ? 'Name' : '이름'}</label>
                                    <input
                                        type="text"
                                        value={vcardName}
                                        onChange={(e) => setVcardName(e.target.value)}
                                        className="input w-full"
                                        placeholder={isEn ? "John Doe" : "홍길동"}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">{isEn ? 'Phone Number' : '전화번호'}</label>
                                    <input
                                        type="tel"
                                        value={vcardPhone}
                                        onChange={(e) => setVcardPhone(e.target.value)}
                                        className="input w-full"
                                        placeholder="010-1234-5678"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">{isEn ? 'Email' : '이메일'}</label>
                                    <input
                                        type="email"
                                        value={vcardEmail}
                                        onChange={(e) => setVcardEmail(e.target.value)}
                                        className="input w-full"
                                        placeholder="example@email.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">{isEn ? 'Organization' : '회사/조직'}</label>
                                    <input
                                        type="text"
                                        value={vcardOrg}
                                        onChange={(e) => setVcardOrg(e.target.value)}
                                        className="input w-full"
                                        placeholder={isEn ? "Company Name" : "회사명"}
                                    />
                                </div>
                            </div>
                        )}

                        <button
                            onClick={generateQR}
                            disabled={!hasValidData()}
                            className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isEn ? 'Generate QR Code' : 'QR 코드 생성'}
                        </button>
                    </div>

                    <div className="card p-6 space-y-4">
                        <h3 className="font-bold text-lg flex items-center gap-2">
                            <Palette className="w-5 h-5" />
                            {isEn ? 'Resolution Settings' : '크기 설정'}
                        </h3>

                        <div>
                            <label className="block text-sm font-medium mb-2">{isEn ? 'Size' : '크기'}: {qrSize}px</label>
                            <input
                                type="range"
                                min="200"
                                max="600"
                                step="50"
                                value={qrSize}
                                onChange={(e) => setQrSize(parseInt(e.target.value))}
                                className="w-full"
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="card p-6 space-y-4">
                        <h3 className="font-bold text-lg">{isEn ? 'Preview' : '미리보기'}</h3>

                        <div className="flex items-center justify-center p-8 bg-muted/30 rounded-xl min-h-[400px]">
                            {qrDataUrl ? (
                                <div className="inline-block p-4 bg-white rounded-lg shadow-lg">
                                    <img src={qrDataUrl} alt="QR Code" style={{ width: qrSize, height: qrSize }} />
                                </div>
                            ) : (
                                <div className="text-center text-muted-foreground">
                                    <QrCode className="w-16 h-16 mx-auto mb-4 opacity-50" />
                                    <p>{isEn ? 'Enter content and' : '내용을 입력하고'}<br />{isEn ? 'click Generate' : '생성 버튼을 클릭하세요'}</p>
                                </div>
                            )}
                        </div>

                        {qrDataUrl && (
                            <div className="flex gap-3">
                                <button
                                    onClick={downloadQR}
                                    className="btn btn-primary flex-1 flex items-center justify-center gap-2"
                                >
                                    <Download className="w-5 h-5" />
                                    {isEn ? 'Download' : '다운로드'}
                                </button>
                                <button
                                    onClick={copyToClipboard}
                                    className="btn btn-ghost flex-1 flex items-center justify-center gap-2"
                                >
                                    {copied ? (
                                        <>
                                            <Check className="w-5 h-5 text-green-500" />
                                            {isEn ? 'Copied' : '복사됨'}
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="w-5 h-5" />
                                            {isEn ? 'Copy' : '복사'}
                                        </>
                                    )}
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="bg-muted/30 rounded-xl p-6 space-y-2 text-sm">
                        <h3 className="font-bold text-base">💡 {isEn ? 'Tips' : '사용 팁'}</h3>
                        <ul className="space-y-1 text-muted-foreground list-disc list-inside">
                            <li><strong>{isEn ? 'WiFi QR:' : 'WiFi QR:'}</strong> {isEn ? 'Scan with your smartphone to connect to WiFi automatically.' : '스마트폰으로 스캔하면 자동으로 WiFi 연결'}</li>
                            <li><strong>{isEn ? 'vCard QR:' : '명함 QR:'}</strong> {isEn ? 'Quickly share contact information.' : '연락처 정보를 빠르게 공유'}</li>
                            <li>{isEn ? 'Use the generated QR code on business cards, posters, or websites.' : '생성된 QR 코드는 명함, 포스터, 웹사이트 등에 활용하세요'}</li>
                            <li>{isEn ? 'You can verify the info by scanning it with your mobile camera.' : '모바일 카메라로 스캔하여 정보를 확인할 수 있습니다'}</li>
                        </ul>
                    </div>
                </div>
            </div>

            <ShareButtons
                title={isEn ? "QR Code Generator" : "QR 코드 생성기"}
                description={isEn ? "Easily convert Text, URL, WiFi, and vCard into a QR code!" : "텍스트, URL, WiFi, 명함을 QR 코드로 쉽게 변환하세요!"}
            />

            <ToolGuide
                title={isEn ? "Smart QR Code Generator Guide" : "스마트한 QR 코드 생성 및 활용 가이드"}
                intro={isEn 
                    ? "Instantly generate QR codes for URLs, text, WiFi credentials, or contact details (vCard). Perfect for marketing, sharing info, or event management."
                    : "URL, 텍스트, WiFi 연결 정보, 연락처(vCard) 등을 담은 QR 코드를 즉석에서 생성할 수 있습니다. 마케팅, 정보 공유, 이벤트 등 다양한 용도로 활용해 보세요."}
                steps={isEn ? [
                    "Select the type of information you want to encode (Text/URL, WiFi, vCard).",
                    "Fill in the required fields for the chosen type.",
                    "Click 'Generate QR Code' to create the image.",
                    "Adjust the size if needed, then Download or Copy the QR code."
                ] : [
                    "생성하고자 하는 정보의 유형(URL, WiFi, 명함)을 선택합니다.",
                    "선택한 유형에 맞는 텍스트나 상세 정보를 입력란에 작성합니다.",
                    "'QR 코드 생성' 버튼을 클릭하여 이미지를 생성합니다.",
                    "원하는 크기로 조절한 후 다운로드하거나 복사하여 사용합니다."
                ]}
                tips={isEn ? [
                    "Print your WiFi QR code and stick it in your cafe or living room to avoid repeating the password.",
                    "When using URLs, it is better to link to mobile-optimized pages.",
                    "Set a higher resolution if you are printing the QR code."
                ] : [
                    "WiFi QR 코드를 만들어 카페나 거실에 부치면 매번 비밀번호를 말해줄 필요가 없습니다.",
                    "URL 입력 시에는 가급적 모바일 최적화된 페이지 링크를 사용하는 것이 좋습니다.",
                    "QR 코드의 해상도를 높게 설정하면 인쇄물에서도 선명하게 스캔됩니다."
                ]}
                faqs={isEn ? [
                    { q: "Does the generated QR code expire?", a: "No, QR codes generated here are permanent and have no expiration date." },
                    { q: "Can I use it for commercial purposes?", a: "Yes, you can generate and use them freely on commercial promotions or products." }
                ] : [
                    { q: "생성된 QR 코드에 유효 기간이 있나요?", a: "아니요, 이 서비스에서 생성된 QR 코드는 영구적이며 별도의 만료 기간이 없습니다." },
                    { q: "상업적 용도로 사용해도 되나요?", a: "네, 무료로 생성하여 상업적 홍보물이나 제품에 제한 없이 사용 가능합니다." }
                ]}
            />
        </div>
    );
};

export default QrGenerator;
