import React, { useState } from 'react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { Lock, Unlock, Copy, Check, RotateCcw } from 'lucide-react';
import CryptoJS from 'crypto-js';
import { useLanguage } from '../context/LanguageContext';

const EncryptionTool = () => {
    const { lang, t } = useLanguage();
    const isEn = lang === 'en';

    const [mode, setMode] = useState('encrypt'); // encrypt, decrypt
    const [text, setText] = useState('');
    const [password, setPassword] = useState('');
    const [result, setResult] = useState('');
    const [copied, setCopied] = useState(false);

    const handleEncrypt = () => {
        if (!text || !password) {
            alert(isEn ? 'Please provide both text and secret password.' : '텍스트와 비밀번호를 모두 입력해주세요.');
            return;
        }
        try {
            const encrypted = CryptoJS.AES.encrypt(text, password).toString();
            setResult(encrypted);
        } catch (error) {
            alert(isEn ? 'An error naturally occurred during the encryption session.' : '암호화 중 오류가 발생했습니다.');
        }
    };

    const handleDecrypt = () => {
        if (!text || !password) {
            alert(isEn ? 'Please provide the encrypted string and matching password.' : '암호화된 텍스트와 비밀번호를 모두 입력해주세요.');
            return;
        }
        try {
            const decrypted = CryptoJS.AES.decrypt(text, password);
            const decryptedText = decrypted.toString(CryptoJS.enc.Utf8);
            if (!decryptedText) {
                alert(isEn ? 'Decryption failed: Password incorrect or payload corrupted.' : '복호화 실패: 비밀번호가 틀렸거나 잘못된 암호문입니다.');
                return;
            }
            setResult(decryptedText);
        } catch (error) {
            alert(isEn ? 'An error occurred during the decryption attempt.' : '복호화 중 오류가 발생했습니다.');
        }
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(result);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            alert(isEn ? 'Copy failed' : '복사 실패');
        }
    };

    const handleClear = () => {
        setText('');
        setPassword('');
        setResult('');
    };

    const titleText = t('tools.encryption-tool.title');
    const descText = t('tools.encryption-tool.description');
    const keywordsText = t('tools.encryption-tool.keywords');

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <SEO
                title={titleText}
                description={descText}
                keywords={keywordsText}
            />

            <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center p-3 bg-red-100 dark:bg-red-900/30 rounded-2xl text-red-600 dark:text-red-400 mb-2 border border-red-200 dark:border-red-800">
                    <Lock className="w-8 h-8" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {isEn ? 'Secure Text Encryptor' : '암호화 / 복호화 도구'}
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    {isEn ? 'Protect your sensitive messages using industry-standard AES algorithms offline.' : 'AES 알고리즘 기반 고강도 텍스트 암호화'}
                </p>
            </div>

            {/* Mode Toggle */}
            <div className="flex gap-2 max-w-sm mx-auto bg-secondary/30 p-1 rounded-xl border border-border">
                <button
                    onClick={() => { setMode('encrypt'); setResult(''); }}
                    className={`flex-1 px-6 py-2.5 rounded-lg font-bold transition-all flex items-center justify-center gap-2 ${mode === 'encrypt'
                            ? 'bg-red-500 text-white shadow-md'
                            : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                        }`}
                >
                    <Lock className="w-4 h-4" />
                    {isEn ? 'Encrypt' : '암호화'}
                </button>
                <button
                    onClick={() => { setMode('decrypt'); setResult(''); }}
                    className={`flex-1 px-6 py-2.5 rounded-lg font-bold transition-all flex items-center justify-center gap-2 ${mode === 'decrypt'
                            ? 'bg-red-500 text-white shadow-md'
                            : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                        }`}
                >
                    <Unlock className="w-4 h-4" />
                    {isEn ? 'Decrypt' : '복호화'}
                </button>
            </div>

            <div className="bg-card border border-border rounded-2xl shadow-sm p-6 md:p-8 space-y-6">
                {/* Input */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider">
                        {mode === 'encrypt' ? (isEn ? 'Plaintext to Encrypt' : '원본 텍스트') : (isEn ? 'Ciphertext to Decrypt' : '암호화된 텍스트')}
                    </label>
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder={mode === 'encrypt' ? (isEn ? 'Enter the sensitive message you want to scramble...' : '암호화할 텍스트를 입력하세요') : (isEn ? 'Paste the base64 encoded cryptographic string here...' : '복호화할 암호문을 입력하세요')}
                        rows={6}
                        className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-red-500 bg-background font-mono text-sm shadow-inner transition-colors"
                    />
                </div>

                {/* Password */}
                <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider">
                        {isEn ? 'Secret Passphrase' : '비밀번호 설정'}
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={isEn ? "The key required to unlock this message" : "암호화/복호화에 사용할 비밀번호"}
                        className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-red-500 bg-background font-bold shadow-inner"
                    />
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                    <button
                        onClick={mode === 'encrypt' ? handleEncrypt : handleDecrypt}
                        className="flex-1 px-6 py-4 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all font-bold text-lg shadow-lg active:scale-[0.98]"
                    >
                        {mode === 'encrypt' ? (isEn ? 'Encrypt Now' : '암호화 실행') : (isEn ? 'Decrypt Now' : '복호화 실행')}
                    </button>
                    <button
                        onClick={handleClear}
                        className="px-6 py-4 bg-secondary text-foreground rounded-xl hover:bg-secondary/80 transition-all font-bold group"
                        title={isEn ? "Reset all fields" : "초기화"}
                    >
                        <RotateCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                    </button>
                </div>

                {/* Result */}
                {result && (
                    <div className="pt-6 border-t border-border animate-in fade-in slide-in-from-top-4 duration-500">
                        <div className="flex items-center justify-between mb-3">
                            <label className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-widest flex items-center gap-2">
                                <Check className="w-4 h-4 text-green-500" />
                                {isEn ? 'Output Result' : '처리 결과'}
                            </label>
                            <button
                                onClick={handleCopy}
                                className={`flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-lg transition-all ${copied ? 'bg-green-500 text-white' : 'bg-secondary hover:bg-muted text-foreground border border-border'}`}
                            >
                                {copied ? (
                                    <>
                                        <Check className="w-4 h-4" />
                                        {isEn ? 'Copied' : '복사됨'}
                                    </>
                                ) : (
                                    <>
                                        <Copy className="w-4 h-4" />
                                        {isEn ? 'Copy' : '복사'}
                                    </>
                                )}
                            </button>
                        </div>
                        <div className="p-5 bg-muted/50 dark:bg-gray-900/50 border border-border rounded-xl shadow-inner group">
                            <pre className="whitespace-pre-wrap break-all text-sm text-foreground font-mono leading-relaxed">
                                {result}
                            </pre>
                        </div>
                    </div>
                )}
            </div>

            {/* Warning */}
            <div className="bg-yellow-500/10 dark:bg-yellow-900/10 border border-yellow-500/20 rounded-2xl p-6 space-y-3">
                <h3 className="font-bold text-yellow-700 dark:text-yellow-400 flex items-center gap-2">⚠️ {isEn ? 'Privacy Notice & Disclaimer' : '사용 시 주의사항'}</h3>
                <ul className="text-sm text-yellow-800 dark:text-yellow-300/80 space-y-1 list-disc list-inside">
                    <li>{isEn ? 'Decryption is mathematically impossible if you lose or forget the passphrase.' : '설정한 비밀번호를 분실하면 절대로 데이터를 복구할 수 없습니다.'}</li>
                    <li>{isEn ? 'All processes occur locally in your browser. Your data is NEVER sent to any server.' : '모든 작업은 브라우저 메모리 내에서만 처리되며, 서버로 데이터가 전송되지 않습니다.'}</li>
                    <li>{isEn ? 'Standard AES-256 bit encryption is utilized for high security.' : '업계 표준인 AES-256 알고리즘을 사용하여 강력한 보안을 제공합니다.'}</li>
                    <li>{isEn ? 'Always keep a backup of your important plaintext entries.' : '중요한 값은 암호화 전 반드시 다른 곳에 안전하게 보관하세요.'}</li>
                </ul>
            </div>

            <ToolGuide
                title={isEn ? "How to Secure Your Text" : "암호화 / 복호화 활용 가이드"}
                intro={isEn 
                    ? "Advanced cryptographic interface to protect your sensitive notes, passwords, or communications. Using military-grade AES, ensure your data stays private even if intercepted." 
                    : "민감한 개인 정보나 메모를 타인이 볼 수 없도록 암호로 잠그거나, 암호화된 메시지를 다시 읽을 수 있는 상태로 풀어주는 도구입니다."}
                steps={isEn ? [
                    "Select the 'Encrypt' or 'Decrypt' mode using the top toggle buttons.",
                    "Paste your target text into the large input field.",
                    "Type a strong, memorable secret passphrase into the password field.",
                    "Press the action button to process the text instantly.",
                    "Copy the resulting scrambled text (ciphertext) or revealed message securely."
                ] : [
                    "암호화(메시지 잠그기) 또는 복호화(메시지 풀기) 중 원하는 모드를 선택합니다.",
                    "잠그고 싶은 원본 내용이나, 풀어야 할 암호문을 입력칸에 기입합니다.",
                    "암호화 키(비밀번호)를 입력합니다. 이 비밀번호는 나중에 내용을 풀 때 반드시 동일하게 입력해야 합니다.",
                    "'실행' 버튼을 누르면 화면 아래쪽에 결과가 나타납니다.",
                    "복합적인 문자열로 변환된 결과를 복사하여 필요한 곳에 저장하거나 전달하세요."
                ]}
                tips={isEn ? [
                    "AES (Advanced Encryption Standard) is the global standard for securing electronic data.",
                    "Use a long passphrase with multiple types of characters (symbols, numbers) for maximum security.",
                    "This tool is perfect for sending secrets over non-secure channels like email or chat."
                ] : [
                    "비밀번호가 단 한 글자라도 틀리면 복호화 결과가 완전히 깨지거나 에러가 발생합니다.",
                    "암호화된 결과는 특수문자가 섞인 긴 텍스트 형태로 출력되며, 이를 그대로 보관하셔야 합니다.",
                    "친구와 비밀 메시지를 주고받을 때 서로 약속된 비밀번호를 정해두고 사용하면 매우 유용합니다."
                ]}
                faqs={isEn ? [
                    { q: "Is the server storing my password?", a: "No. The logic runs entirely on your device (Client-side). We have zero visibility into your entries or keys." },
                    { q: "Can the staff here recover my text?", a: "Impossible. Without your unique password, even the developers of this site cannot reverse the AES encryption." }
                ] : [
                    { "q": "제 비밀번호가 서버에 기록되나요?", "a": "아니요. 모든 암호화 로직은 브라우저에서 직접 수행되므로 비밀번호나 원본 텍스트는 서버에 전혀 노출되지 않습니다." },
                    { "q": "비밀번호를 까먹었는데 복구가 될까요?", "a": "죄송하지만 기술적으로 불가능합니다. 보안을 위해 별도의 백업 기능을 제공하지 않으므로 비밀번호를 잘 기억해두셔야 합니다." }
                ]}
            />
        </div>
    );
};

export default EncryptionTool;
