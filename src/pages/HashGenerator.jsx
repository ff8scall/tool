import React, { useState } from 'react';
import { Copy, Check, Shield } from 'lucide-react';
import CryptoJS from 'crypto-js';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { useLanguage } from '../context/LanguageContext';

const HashGenerator = () => {
    const { lang, t } = useLanguage();
    const isEn = lang === 'en';

    const [input, setInput] = useState('');
    const [copied, setCopied] = useState('');

    const hashes = {
        'MD5': CryptoJS.MD5(input).toString(),
        'SHA-1': CryptoJS.SHA1(input).toString(),
        'SHA-256': CryptoJS.SHA256(input).toString(),
        'SHA-512': CryptoJS.SHA512(input).toString(),
        'SHA3-256': CryptoJS.SHA3(input, { outputLength: 256 }).toString(),
        'SHA3-512': CryptoJS.SHA3(input, { outputLength: 512 }).toString(),
    };

    const copyToClipboard = (text, label) => {
        navigator.clipboard.writeText(text);
        setCopied(label);
        setTimeout(() => setCopied(''), 1500);
    };

    const titleText = isEn ? t('tools.hash-gen.title') : "해시 생성기 (MD5, SHA-256) - Utility Hub";
    const descText = isEn 
        ? t('tools.hash-gen.description')
        : "텍스트를 MD5, SHA-1, SHA-256, SHA-512 등 다양한 해시값으로 변환하세요. 암호화 해시 생성 도구.";
    const keywordsText = isEn ? "hash generator, text to md5, sha256 generator, sha512 generator, cryptography, hashing tool" : "해시 생성기, MD5, SHA256, SHA512, 암호화, 해시값";

    const faqs = isEn ? [
        {
            q: "Are hashes considered reversible encryption?",
            a: "No! Hashes are mathematically strictly one-way structural adaptations intended for matching equality without exposing the original string."
        },
        {
            q: "Is it safe to type my passwords here?",
            a: "This logic computes outputs directly using your own device's internal resources. Your typed strings absolutely never propagate into servers."
        }
    ] : [
        { "q": "해시값으로 원래 비밀번호를 찾을 수 있나요?", "a": "아니요, 해시는 단방향 암호화이므로 해시값만으로는 원래 텍스트를 복구할 수 없습니다." },
        { "q": "입력한 텍스트가 서버에 기록되나요?", "a": "전혀 그렇지 않습니다. 모든 계산은 브라우저 내에서 즉각적으로 이루어지며 외부로 전송되지 않습니다." }
    ];

    const steps = isEn ? [
        "Select the primary text area below actively.",
        "Begin typing whatever secret sentence or phrase you desire instantly.",
        "Notice the multiple hashing formats dynamically changing simultaneously underneath.",
        "Hit the copy button corresponding closely to your preferred cryptographic hash option."
    ] : [
        "변환하려는 텍스트나 문장을 입력창에 넣습니다.",
        "입력 즉시 하단에 여러 가지 해시 결과가 실시간으로 노출됩니다.",
        "원하는 알고리즘(MD5, SHA-256 등) 옆의 복사 버튼을 누르세요.",
        "복사된 해시값을 코드나 설정 파일에 붙여넣어 사용합니다."
    ];

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <SEO
                title={titleText}
                description={descText}
                keywords={keywordsText}
                category="dev"
                faqs={faqs}
                steps={steps}
            />

            <header className="text-center space-y-2">
                <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
                    <Shield className="w-8 h-8 text-primary" />
                    {isEn ? 'Cryptographic Hash Generator' : '해시 생성기'}
                </h1>
                <p className="text-muted-foreground">
                    {isEn ? 'Convert texts into cryptographic hashing algorithms interactively.' : '텍스트를 다양한 해시 알고리즘으로 변환하세요'}
                </p>
            </header>

            {/* Input */}
            <div className="bg-card border border-border rounded-xl p-6 space-y-4 shadow-sm">
                <label className="block text-sm font-bold uppercase tracking-widest text-muted-foreground">
                    {isEn ? 'Input Text String' : '변환할 텍스트 입력'}
                </label>
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={isEn ? "Type the text you'd like to hash completely..." : "해시로 변환할 텍스트를 입력하세요..."}
                    className="w-full h-32 px-4 py-3 bg-background border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm shadow-inner"
                />
            </div>

            {/* Hash Results */}
            {input && (
                <div className="space-y-3 animate-in fade-in">
                    {Object.entries(hashes).map(([algorithm, hash]) => (
                        <div key={algorithm} className="bg-card border border-border rounded-xl p-4 shadow-sm hover:border-primary/50 transition-colors group">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="font-bold text-sm text-primary">{algorithm}</h3>
                                <button
                                    onClick={() => copyToClipboard(hash, algorithm)}
                                    className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium bg-secondary hover:bg-accent rounded-md transition-colors"
                                >
                                    {copied === algorithm ? (
                                        <>
                                            <Check className="w-4 h-4 text-green-500" />
                                            {isEn ? 'Copied!' : '복사됨'}
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
                                            {isEn ? 'Copy Hash' : '복사'}
                                        </>
                                    )}
                                </button>
                            </div>
                            <div className="p-3 bg-secondary/50 rounded-lg font-mono text-xs break-all border border-border/50">
                                {hash}
                            </div>
                            <div className="text-xs font-semibold text-muted-foreground mt-2 text-right">
                                {isEn ? `Length: ${hash.length} characters` : `길이: ${hash.length} 문자`}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="bg-muted/30 rounded-xl p-6 text-sm text-muted-foreground border border-border/50">
                <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">💡 {isEn ? 'Algorithmic Summaries' : '해시 알고리즘 특징'}</h3>
                <ul className="space-y-3 list-inside text-xs leading-relaxed">
                    <li className="flex flex-col sm:flex-row gap-1">
                        <strong className="text-foreground shrink-0 w-24">MD5:</strong> 
                        <span>{isEn ? '128-bit hash. Historically fast, currently strictly recommended purely for broad file checksum integrity checks only.' : '128비트 해시. 매우 빠르지만 보안에 취약하여 주로 단순 파일 무결성 확인용'}</span>
                    </li>
                    <li className="flex flex-col sm:flex-row gap-1">
                        <strong className="text-foreground shrink-0 w-24">SHA-1:</strong> 
                        <span>{isEn ? '160-bit hash. Somewhat more structured than MD5, still depreciated heavily in highly modern encryption sectors.' : '160비트 해시. MD5보다 안정적이지만 역시 보안 취약점이 발견됨'}</span>
                    </li>
                    <li className="flex flex-col sm:flex-row gap-1">
                        <strong className="text-foreground shrink-0 w-24">SHA-256:</strong> 
                        <span>{isEn ? '256-bit hash. Currently the global standard heavily utilized inside blockchain distributions safely.' : '256비트 해시. 현재 가장 널리 사용되는 안전한 표준 알고리즘'}</span>
                    </li>
                    <li className="flex flex-col sm:flex-row gap-1">
                        <strong className="text-foreground shrink-0 w-24">SHA-512:</strong> 
                        <span>{isEn ? '512-bit hash. Architecturally more robust than 256 for systems requiring ultra-secure 64-bit bounds.' : '512비트 해시. 초고성능 시스템에서 보안을 극대화할 때 활용'}</span>
                    </li>
                    <li className="flex flex-col sm:flex-row gap-1">
                        <strong className="text-foreground shrink-0 w-24">SHA3:</strong> 
                        <span>{isEn ? 'Modern iteration entirely built heavily upon Keccak sponge constructor designs.' : '최신 세대 해시 알고리즘. 새로운 설계 방식으로 높은 효율과 보안 제공'}</span>
                    </li>
                </ul>
                <div className="mt-5 p-4 bg-yellow-500/10 border border-yellow-500/50 rounded-xl">
                    <p className="text-yellow-600 dark:text-yellow-400 font-bold flex items-center gap-2">⚠️ {isEn ? 'Security Warning' : '참고 사항'}</p>
                    <p className="mt-2 text-xs">
                        {isEn 
                            ? "A cryptographic hash acts essentially as a one-way fingerprint. Returning hashes backward fundamentally toward its originating native text cannot natively occur." 
                            : "해시는 단방향 암호화입니다. 해시값으로 원본 텍스트를 역추적하는 것은 수학적으로 매우 어렵거나 불가능합니다."}
                    </p>
                </div>
            </div>

            <ToolGuide
                title={isEn ? "Mastering Cryptographic Hashes" : "해시 생성기 활용 가이드"}
                intro={isEn 
                    ? "Generate an array of multi-format hashing iterations including MD5, SHA-256 entirely across offline environments directly within seconds." 
                    : "비밀번호 관리, 파일 무결성 확인, 데이터 고유 식별값(ID) 생성 등에 공통적으로 쓰이는 해시 알고리즘 실행 도구입니다."}
                steps={steps}
                tips={isEn ? [
                    "Checking SHA against downloaded internet software is critical to assert the files integrity.",
                    "Even moving a single whitespace completely changes the resulting output entirely.",
                    "Hashes are case-sensitive. 'A' produces a completely different result than 'a'."
                ] : [
                    "정확한 파일 무결성 확인을 위해 대량의 텍스트도 복사해서 한꺼번에 검증해보세요.",
                    "입력값 중 보이지 않는 띄어쓰기 한 칸만으로도 결과값은 완전히 달라집니다.",
                    "보안상 가장 권장되는 알고리즘은 SHA-256 이상 급의 SHA 시리즈입니다."
                ]}
                faqs={faqs}
            />
        </div>
    );
};

export default HashGenerator;
