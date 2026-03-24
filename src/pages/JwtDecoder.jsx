import React, { useState } from 'react';
import { ShieldCheck, Copy, Check, FileJson, Lock } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { useLanguage } from '../context/LanguageContext';

const JwtDecoder = () => {
    const { lang, t } = useLanguage();
    const isEn = lang === 'en';

    const [token, setToken] = useState('');
    const [decoded, setDecoded] = useState(null);
    const [error, setError] = useState('');
    const [copiedKey, setCopiedKey] = useState(null);

    const decodeJwt = (jwt) => {
        try {
            const parts = jwt.split('.');
            if (parts.length !== 3) {
                throw new Error(isEn ? 'Invalid JWT structural format. Expected strictly 3 Dot separated dot-segments.' : '올바른 JWT 형식이 아닙니다. (3개 파트 필요)');
            }

            const header = JSON.parse(atob(parts[0].replace(/-/g, '+').replace(/_/g, '/')));
            const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));

            setDecoded({ header, payload });
            setError('');
        } catch (err) {
            setError(err.message);
            setDecoded(null);
        }
    };

    const handleTokenChange = (value) => {
        setToken(value.trim());
        if (value.trim()) {
            decodeJwt(value.trim());
        } else {
            setDecoded(null);
            setError('');
        }
    };

    const copyToClipboard = (text, key) => {
        navigator.clipboard.writeText(JSON.stringify(text, null, 2));
        setCopiedKey(key);
        setTimeout(() => setCopiedKey(null), 1500);
    };

    const keywordsText = isEn ? "jwt decoder, json web token, online jwt parser, decode jwt, jwt viewer" : "jwt, jwt decoder, json web token, 디코더, 인증, 토큰";

    const faqs = isEn ? [
        {
            q: "Can this tool modify the original signature values?",
            a: "This is strictly a local Viewer interface. Modification requires server-side private keys naturally entirely avoiding local browser exposure session safely."
        },
        {
            q: "Is the server storing tokens for logs or audits?",
            a: "Absolutely not. Input interpretation utilizes standard base64 decoding libraries residing natively strictly entirely across your computer's offline memory buffer."
        }
    ] : [
        { "q": "토큰의 서명(Signature) 검증도 가능하나요?", "a": "본 도구는 데이터 확인용 디코더로, 서명 검증을 하려면 서버의 Private Key가 필요하므로 프론트엔드에서는 지원하지 않습니다." },
        { "q": "제가 입력한 토큰이 서버로 전송되나요?", "a": "아니요, 모든 디코딩 작업은 순수하게 브라우저 내 자바스크립트로만 처리되며 외부 서버와 통신하지 않습니다." }
    ];

    const steps = isEn ? [
        "Pick a valid JWT string belonging strictly to your authentication session environment.",
        "Paste the raw token payload into the input box provided centrally.",
        "Verify immediately interpreted Header and Payload sections appearing automatically below.",
        "Export the JSON details using the top right copy interaction confidently."
    ] : [
        "분석하려는 JWT 토큰 문자열을 복사합니다.",
        "화면 상단 입력창에 토큰을 붙여넣으세요.",
        "자동으로 분할된 Header(헤더)와 Payload(페이로드) 영역을 확인합니다.",
        "각 JSON 데이터 우측의 복사 버튼으로 내용을 가져갈 수 있습니다."
    ];

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <SEO
                title={t('tools.jwt-decoder.title')}
                description={t('tools.jwt-decoder.description')}
                keywords={keywordsText}
                category="dev"
                faqs={faqs}
                steps={steps}
            />

            <header className="text-center space-y-4">
                <div className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-900/30 rounded-2xl text-blue-600 dark:text-blue-400 mb-2 border border-blue-200 dark:border-blue-800">
                    <ShieldCheck className="w-8 h-8" />
                </div>
                <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
                    {isEn ? 'Universal JWT Decoder' : 'JWT 디코더'}
                </h1>
                <p className="text-muted-foreground">
                    {isEn ? 'Visually parse JSON Web Tokens instantly within your browser environment.' : 'JSON Web Token을 실시간으로 분석하고 내용을 확인하세요'}
                </p>
            </header>

            {/* Input Section */}
            <div className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-4 shadow-sm">
                <label className="block text-sm font-bold text-muted-foreground uppercase tracking-widest">
                    {isEn ? 'Encoded JWT String' : '암호화된 토큰 입력'}
                </label>
                <textarea
                    value={token}
                    onChange={(e) => handleTokenChange(e.target.value)}
                    placeholder={isEn ? "Paste your encoded JWT string (header.payload.signature) here natively..." : "eyJhbG... 형식의 토큰을 붙여넣으세요"}
                    className="w-full h-40 px-5 py-4 bg-background border-2 border-border/80 focus:border-blue-500 rounded-xl font-mono text-sm shadow-inner transition-colors outline-none resize-none break-all"
                />
            </div>

            {/* Results Section */}
            {error && (
                <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/50 rounded-2xl p-6 text-center animate-in fade-in zoom-in-95 shadow-sm">
                    <p className="text-red-600 dark:text-red-400 font-bold flex items-center justify-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                        {error}
                    </p>
                </div>
            )}

            {decoded && (
                <div className="grid grid-cols-1 gap-6 animate-in slide-in-from-bottom-4 duration-500">
                    {/* Header */}
                    <div className="bg-card border-l-4 border-l-blue-500 border-border rounded-xl shadow-sm overflow-hidden">
                        <div className="flex items-center justify-between p-5 bg-blue-50/50 dark:bg-blue-900/10 border-b border-border/50">
                            <div className="flex items-center gap-3">
                                <FileJson className="text-blue-500" size={20} />
                                <span className="font-bold text-foreground">HEADER: <span className="text-blue-500 uppercase">{isEn ? 'Alg Meta' : '알고리즘 및 유형'}</span></span>
                            </div>
                            <button
                                onClick={() => copyToClipboard(decoded.header, 'header')}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold text-xs transition-all ${copiedKey === 'header' ? 'bg-green-500 text-white shadow-sm' : 'bg-background hover:bg-secondary text-muted-foreground border border-border'}`}
                            >
                                {copiedKey === 'header' ? <Check size={14} /> : <Copy size={14} />}
                                {copiedKey === 'header' ? (isEn ? 'Copied' : '복사됨') : (isEn ? 'Copy JSON' : 'JSON 복사')}
                            </button>
                        </div>
                        <div className="p-5 font-mono text-sm bg-background/50">
                            <pre className="text-foreground leading-relaxed">
                                {JSON.stringify(decoded.header, null, 2)}
                            </pre>
                        </div>
                    </div>

                    {/* Payload */}
                    <div className="bg-card border-l-4 border-l-purple-500 border-border rounded-xl shadow-sm overflow-hidden">
                        <div className="flex items-center justify-between p-5 bg-purple-50/50 dark:bg-purple-900/10 border-b border-border/50">
                            <div className="flex items-center gap-3">
                                <Lock className="text-purple-500" size={20} />
                                <span className="font-bold text-foreground">PAYLOAD: <span className="text-purple-500 uppercase">{isEn ? 'Data Claims' : '데이터 클레임'}</span></span>
                            </div>
                            <button
                                onClick={() => copyToClipboard(decoded.payload, 'payload')}
                                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold text-xs transition-all ${copiedKey === 'payload' ? 'bg-green-500 text-white shadow-sm' : 'bg-background hover:bg-secondary text-muted-foreground border border-border'}`}
                            >
                                {copiedKey === 'payload' ? <Check size={14} /> : <Copy size={14} />}
                                {copiedKey === 'payload' ? (isEn ? 'Copied' : '복사됨') : (isEn ? 'Copy JSON' : 'JSON 복사')}
                            </button>
                        </div>
                        <div className="p-5 font-mono text-sm bg-background/50 overflow-x-auto">
                            <pre className="text-foreground leading-relaxed">
                                {JSON.stringify(decoded.payload, null, 2)}
                            </pre>
                        </div>
                    </div>
                </div>
            )}

            <div className="bg-secondary/30 rounded-2xl p-6 border border-border/50 text-sm space-y-4">
                <h3 className="font-black text-foreground flex items-center gap-2">
                    🛡️ {isEn ? 'Security Best Practices' : '보안 및 토큰 안내'}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-muted-foreground leading-relaxed">
                    <div className="space-y-2">
                        <p className="font-bold text-foreground underline underline-offset-4 decoration-blue-500">{isEn ? 'What is a JWT Header?' : 'Header (헤더) 란?'}</p>
                        <p>{isEn ? 'The header typically consists strictly of two parts: the type of the token natively representing JWT, and the signing algorithm structurally used precisely like HMAC SHA256 or RSA.' : '토큰의 유형(JWT)과 사용 중인 암호화 알고리즘(예: HS256) 정보가 담겨 있습니다.'}</p>
                    </div>
                    <div className="space-y-2">
                        <p className="font-bold text-foreground underline underline-offset-4 decoration-purple-500">{isEn ? 'What is a JWT Payload?' : 'Payload (페이로드) 란?'}</p>
                        <p>{isEn ? 'The payload contains closely matched claims. Claims are logically structured statements natively about an entity (typically, the user) and additional data attributes.' : '사용자 식별 정보, 토큰 만료 시간 등의 실제 데이터가 담겨 있는 핵심 영역입니다.'}</p>
                    </div>
                </div>
            </div>
            
            <ToolGuide
                title={isEn ? "JWT Deep Dive Guide" : "JWT 디코더 활용 가이드"}
                intro={isEn 
                    ? "Safely inspect raw authentication claims natively derived entirely across internal session strings within safe offline boundaries instantly." 
                    : "JWT는 서버 간에 정보를 안전하게 전송하기 위한 표준 방식입니다. 본 도구는 복잡한 토큰 문자열을 보기 좋게 풀어 설명해줍니다."}
                steps={steps}
                tips={isEn ? [
                    "JWTs fundamentally are encoded, not encrypted, meaning anyone seeing the token can parse its metadata and payload natively.",
                    "If the token seems malformed, check for missing dots or invalid base64 padding markers.",
                    "Expired tokens (exp claim) are still decodable but natively invalid for server side authenticated sessions structurally."
                ] : [
                    "디코딩을 위해 불필요한 공백이 포함되지 않았는지 꼭 확인하세요.",
                    "JWT는 암호화(Encryption)된 것이 아니라 인코딩(Encoding)된 상태이므로 누구나 내용을 볼 수 있습니다. 민감한 비밀번호는 토큰에 넣지 않는 것이 정석입니다.",
                    "만료된 토큰인 경우 페이로드 내부의 'exp' 값을 통해 만료 시점을 확인할 수 있습니다."
                ]}
                faqs={faqs}
            />
        </div>
    );
};

export default JwtDecoder;
