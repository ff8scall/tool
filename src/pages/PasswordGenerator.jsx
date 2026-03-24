import React, { useState } from 'react';
import { Copy, Check, RefreshCw } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { useLanguage } from '../context/LanguageContext';

const PasswordGenerator = () => {
    const { lang, t } = useLanguage();
    const isEn = lang === 'en';

    const [password, setPassword] = useState('');
    const [length, setLength] = useState(16);
    const [options, setOptions] = useState({
        uppercase: true,
        lowercase: true,
        numbers: true,
        symbols: true
    });
    const [copied, setCopied] = useState(false);

    const generatePassword = () => {
        let charset = '';
        if (options.uppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (options.lowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
        if (options.numbers) charset += '0123456789';
        if (options.symbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

        if (charset === '') {
            setPassword(isEn ? 'Select at least one option' : '최소 하나의 옵션을 선택하세요');
            return;
        }

        let result = '';
        const array = new Uint32Array(length);
        crypto.getRandomValues(array);

        for (let i = 0; i < length; i++) {
            result += charset[array[i] % charset.length];
        }

        setPassword(result);
        setCopied(false);
    };

    const copyToClipboard = () => {
        if (!password || password.includes('선택') || password.includes('Select')) return;
        navigator.clipboard.writeText(password);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    const getStrength = () => {
        if (!password || password.includes('선택') || password.includes('Select')) return { text: '', color: '' };

        let score = 0;
        if (password.length >= 12) score++;
        if (password.length >= 16) score++;
        if (/[a-z]/.test(password)) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^a-zA-Z0-9]/.test(password)) score++;

        if (score <= 2) return { text: isEn ? 'Weak' : '약함', color: 'text-red-500' };
        if (score <= 4) return { text: isEn ? 'Medium' : '보통', color: 'text-yellow-500' };
        return { text: isEn ? 'Strong' : '강함', color: 'text-green-500' };
    };

    const strength = getStrength();

    const keywordsText = isEn ? "password generator, random password, secure password, strong password" : "비밀번호 생성기, 랜덤 비밀번호, 강력한 비밀번호, 패스워드 생성";

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <SEO
                title={t('tools.password-generator.title')}
                description={t('tools.password-generator.description')}
                keywords={keywordsText}
            />

            <header className="text-center space-y-2">
                <h1 className="text-3xl font-bold">{isEn ? 'Random Password Generator' : '랜덤 비밀번호 생성기'}</h1>
                <p className="text-muted-foreground">
                    {isEn ? 'Create strong and secure passwords instantly' : '강력하고 안전한 비밀번호를 생성하세요'}
                </p>
            </header>

            <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium">{isEn ? 'Generated Password' : '생성된 비밀번호'}</label>
                    {strength.text && (
                        <span className={`text-sm font-bold ${strength.color}`}>
                            {isEn ? 'Strength: ' : '강도: '}{strength.text}
                        </span>
                    )}
                </div>
                <div className="relative">
                    <input
                        type="text"
                        value={password}
                        readOnly
                        placeholder={isEn ? "Your password will appear here" : "비밀번호가 여기에 표시됩니다"}
                        className="w-full px-4 py-4 pr-24 bg-background border border-border rounded-lg font-mono text-lg focus:outline-none"
                    />
                    {password && !password.includes('선택') && !password.includes('Select') && (
                        <button
                            onClick={copyToClipboard}
                            className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-secondary hover:bg-accent rounded-md transition-colors flex items-center gap-1"
                        >
                            {copied ? (
                                <><Check className="w-4 h-4 text-green-500" /> {isEn ? 'Copied' : ''}</>
                            ) : (
                                <><Copy className="w-4 h-4" /> {isEn ? 'Copy' : ''}</>
                            )}
                        </button>
                    )}
                </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                <div className="space-y-2">
                    <label className="block text-sm font-medium">
                        {isEn ? 'Length: ' : '길이: '}{length}{isEn ? ' chars' : '자'}
                    </label>
                    <input
                        type="range"
                        min="8"
                        max="32"
                        value={length}
                        onChange={(e) => setLength(parseInt(e.target.value))}
                        className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                        <span>8</span>
                        <span>32</span>
                    </div>
                </div>

                <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={options.uppercase}
                            onChange={(e) => setOptions({ ...options, uppercase: e.target.checked })}
                            className="w-5 h-5 rounded border-border"
                        />
                        <span>{isEn ? 'Include Uppercase (A-Z)' : '대문자 포함 (A-Z)'}</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={options.lowercase}
                            onChange={(e) => setOptions({ ...options, lowercase: e.target.checked })}
                            className="w-5 h-5 rounded border-border"
                        />
                        <span>{isEn ? 'Include Lowercase (a-z)' : '소문자 포함 (a-z)'}</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={options.numbers}
                            onChange={(e) => setOptions({ ...options, numbers: e.target.checked })}
                            className="w-5 h-5 rounded border-border"
                        />
                        <span>{isEn ? 'Include Numbers (0-9)' : '숫자 포함 (0-9)'}</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={options.symbols}
                            onChange={(e) => setOptions({ ...options, symbols: e.target.checked })}
                            className="w-5 h-5 rounded border-border"
                        />
                        <span>{isEn ? 'Include Symbols (!@#$%^&*)' : '특수문자 포함 (!@#$%^&*)'}</span>
                    </label>
                </div>

                <button
                    onClick={generatePassword}
                    className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-bold hover:brightness-110 transition-all"
                >
                    <RefreshCw className="w-5 h-5" />
                    {isEn ? 'Generate Password' : '비밀번호 생성'}
                </button>
            </div>

            <div className="bg-muted/30 rounded-xl p-6 text-sm text-muted-foreground">
                <h3 className="font-bold text-foreground mb-2">💡 {isEn ? 'Tips for a Secure Password' : '안전한 비밀번호 팁'}</h3>
                <ul className="space-y-1 list-disc list-inside">
                    <li>{isEn ? 'Use at least 12 characters.' : '최소 12자 이상 사용하세요.'}</li>
                    <li>{isEn ? 'Include uppercase, lowercase, numbers, and symbols.' : '대소문자, 숫자, 특수문자를 모두 포함하세요.'}</li>
                    <li>{isEn ? 'Avoid easily guessable information like your name or birthday.' : '생일, 이름 등 추측 가능한 정보는 피하세요.'}</li>
                    <li>{isEn ? 'Use a unique password for each site or app.' : '각 사이트마다 다른 비밀번호를 사용하세요.'}</li>
                </ul>
            </div>
            
            <ToolGuide
                title={isEn ? "Password Generator Guide" : "비밀번호 생성기"}
                intro={isEn 
                    ? "Generate cryptographically secure random passwords easily." 
                    : "안전한 랜덤 비밀번호 생성"}
                steps={isEn ? [
                    "Adjust the slider to choose the length of your password (8-32).",
                    "Toggle the checkboxes to include or exclude uppercase, lowercase, numbers, and symbols.",
                    "Click 'Generate Password' to create a new unique password.",
                    "Click the 'Copy' icon inside the text box to copy it to your clipboard."
                ] : [
                    "원하시는 옵션이나 값을 화면에 안내된 순서대로 정확하게 기입해 주세요.",
                    "제시된 항목과 보기를 꼼꼼하게 살펴보고 본인에게 맞는 것을 선택합니다.",
                    "모든 입력을 완료한 후 결과 화면에서 계산된 수치나 분석된 내용을 확인합니다.",
                    "결과가 마음에 든다면 캡처하거나 공유하기 버튼을 눌러 지인들에게 공유해보세요!"
                ]}
                tips={isEn ? [
                    "We recommend setting a length of 16-24 for highly sensitive accounts.",
                    "All generated passwords happen purely locally on your device; they are never sent to a server.",
                    "The strength indicator measures basic entropy and variations to ensure it is hard to crack."
                ] : [
                    "결과값이 예상과 다르다면 입력한 숫자나 단위를 한 번 더 확인해보는 것이 좋습니다.",
                    "제공되는 다양한 부가 옵션을 함께 활용하면 훨씬 구체적인 형태의 맞춤형 결과를 얻을 수 있습니다.",
                    "모바일과 데스크톱 환경 모두에 완벽하게 최적화되어 있으니 언제 어디서든 편리하게 이용해 보세요."
                ]}
                faqs={isEn ? [
                    { q: "Are the passwords saved anywhere?", a: "No. Our password generation exclusively uses the `crypto.getRandomValues()` API in your browser meaning your password is not saved or transmitted anywhere." },
                    { q: "Why should I include symbols?", a: "Symbols vastly increase password entropy (randomness), exponentialising the mathematical difficulty for hackers attempting brute-force attacks." }
                ] : [
                    { "q": "이 도구들은 정말로 모두 무료인가요?", "a": "네! Tool Hive에서 제공하는 모든 도구 모음과 심리 테스트들은 가입 등의 번거로운 절차 없이 누구나 100% 무료로 무제한 사용할 수 있습니다." },
                    { "q": "제가 입력한 개인적인 정보 데이터가 서버에 남나요?", "a": "아니요, 사용자가 입력하는 이름, 숫자, 금액 등의 모든 데이터는 방문자의 기기 내 브라우저에서만 실시간으로 연산되며 어떠한 경우에도 외부 서버로 전송되거나 저장되지 않으므로 안심하셔도 됩니다." },
                    { "q": "버튼을 눌러도 반응이 없거나 에러가 생깁니다.", "a": "브라우저의 일시적인 캐시 문제일 수 있습니다. 키보드의 F5 버튼을 누르거나 새로고침을 진행한 후 다시 시도해 보시길 권장하며, 문제가 계속된다면 다른 브라우저 앱을 이용해 보세요." }
                ]}
            />
        </div>
    );
};

export default PasswordGenerator;
