import React, { useState } from 'react';
import { Copy, Check, RefreshCw, Key, Hash, Layers } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { useLanguage } from '../context/LanguageContext';

const UuidGenerator = () => {
    const { lang, t } = useLanguage();
    const isEn = lang === 'en';

    const [uuids, setUuids] = useState([]);
    const [count, setCount] = useState(1);
    const [copied, setCopied] = useState('');

    const generateUUIDs = () => {
        const newUuids = [];
        for (let i = 0; i < count; i++) {
            newUuids.push(crypto.randomUUID());
        }
        setUuids(newUuids);
        setCopied('');
    };

    const copyToClipboard = (text, index) => {
        navigator.clipboard.writeText(text);
        setCopied(index);
        setTimeout(() => setCopied(''), 1500);
    };

    const copyAll = () => {
        navigator.clipboard.writeText(uuids.join('\n'));
        setCopied('all');
        setTimeout(() => setCopied(''), 1500);
    };

    const keywordsText = isEn ? "uuid generator, generate guid, random uuid v4, generate unique identifier, online dev tools" : "UUID생성기, GUID생성, 고유식별자, 랜덤UUID, 개발자도구";

    const faqs = isEn ? [
        {
            q: "What is the difference between UUID and GUID specifically?",
            a: "Strictly speaking, they are the exact same 128-bit standard. 'GUID' is typically Microsoft's branding for the standard, while 'UUID' is the broader technical term."
        },
        {
            q: "How unique is a Version 4 UUID truly?",
            a: "A Version 4 UUID utilizes high-entropy random numbers. The probability of generating two identical IDs is astronomically low—practically impossible for any real-world application."
        }
    ] : [
        { "q": "UUID와 GUID의 차이점은 무엇인가요?", "a": "사실상 동일한 128비트 식별자 체계입니다. GUID는 마이크로소프트에서 주로 사용하는 명칭이며, UUID는 업계 전반의 범용적인 명칭입니다." },
        { "q": "생성된 UUID가 중복될 확률이 있나요?", "a": "이 도구가 생성하는 Version 4 UUID는 완전 난수를 사용하므로, 현실 세계의 어떤 시스템에서도 중복이 발생할 확률은 0에 가깝습니다." }
    ];

    const steps = isEn ? [
        "Adjust the horizontal slider to determine exactly how many unique IDs you need at once.",
        "Click the primary 'Generate IDs' button to populate the results list.",
        "Review the generated 36-character strings specifically in the v4 format.",
        "Use individual copy icons or the 'Batch Copy All' button to export the identifiers."
    ] : [
        "상단 슬라이더를 조절하여 한 번에 생성할 UUID 개수(최대 50개)를 선택하세요.",
        "중앙의 '고유 식별자 생성' 버튼을 클릭하여 리스트를 채웁니다.",
        "표준 32글자+하이픈 조합의 UUID v4 결과물을 확인하세요.",
        "개별 항목의 복사 아이콘이나 상단의 '전체 복사' 버튼으로 데이터를 가져갑니다."
    ];

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <SEO
                title={t('tools.uuid-gen.title')}
                description={t('tools.uuid-gen.description')}
                keywords={keywordsText}
                category="dev"
                faqs={faqs}
                steps={steps}
            />

            <header className="text-center space-y-4">
                <div className="inline-flex items-center justify-center p-3 bg-slate-100 dark:bg-slate-800 rounded-2xl text-slate-600 dark:text-slate-400 mb-2 border border-slate-200 dark:border-slate-700 shadow-sm">
                    <Key className="w-8 h-8" />
                </div>
                <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
                    {isEn ? 'Universal UUID / GUID Generator' : 'UUID/GUID 생성기'}
                </h1>
                <p className="text-muted-foreground">
                    {isEn ? 'Deploy cryptographically strong v4 random identifiers instantly for any system.' : '데이터베이스나 API에서 즉시 사용 가능한 고유 식별자를 빠르게 생성하세요'}
                </p>
            </header>

            {/* Controls Center */}
            <div className="bg-card border border-border rounded-2xl p-6 md:p-8 space-y-6 shadow-sm">
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                            <Layers className="w-4 h-4" />
                            {isEn ? `Generation Quantity: ${count}` : `생성 수량 설정: ${count}개`}
                        </label>
                    </div>
                    <div className="relative group">
                        <input
                            type="range"
                            min="1"
                            max="50"
                            value={count}
                            onChange={(e) => setCount(parseInt(e.target.value))}
                            className="w-full h-3 bg-secondary rounded-lg appearance-none cursor-pointer accent-slate-600 dark:accent-slate-400"
                        />
                        <div className="flex justify-between text-[10px] font-black text-muted-foreground/50 mt-2 px-1">
                            <span>MIN 1</span>
                            <span>MAX 50</span>
                        </div>
                    </div>
                </div>

                <button
                    onClick={generateUUIDs}
                    className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-slate-800 dark:bg-slate-200 text-white dark:text-slate-900 rounded-xl font-black text-lg hover:bg-slate-700 dark:hover:bg-white active:scale-[0.98] transition-all shadow-lg group"
                >
                    <RefreshCw className="w-5 h-5 group-active:rotate-180 transition-transform duration-500" />
                    {isEn ? 'Generate Unique IDs' : '고유 식별자 생성'}
                </button>
            </div>

            {/* Results Grid */}
            {uuids.length > 0 && (
                <div className="bg-card border border-border rounded-2xl p-6 space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500 shadow-md">
                    <div className="flex items-center justify-between pb-2 border-b border-border/50">
                        <h3 className="font-black text-lg flex items-center gap-2">
                            <Hash className="w-5 h-5 text-slate-500" />
                            {isEn ? 'Raw UUID Pool' : '추출된 UUID 목록'}
                        </h3>
                        <button
                            onClick={copyAll}
                            className={`flex items-center gap-2 px-5 py-2 rounded-xl transition-all text-xs font-black uppercase tracking-tighter shadow-sm border ${copied === 'all' ? 'bg-green-500 text-white border-green-500' : 'bg-secondary hover:bg-accent text-foreground border-border'}`}
                        >
                            {copied === 'all' ? (
                                <>
                                    <Check className="w-3.5 h-3.5" />
                                    {isEn ? 'Batch Copied' : '전체 복사됨'}
                                </>
                            ) : (
                                <>
                                    <Copy className="w-3.5 h-3.5" />
                                    {isEn ? 'Copy All Items' : '전체 리스트 복사'}
                                </>
                            )}
                        </button>
                    </div>

                    <div className="grid grid-cols-1 gap-3 max-h-[460px] overflow-y-auto pr-2 custom-scrollbar">
                        {uuids.map((uuid, index) => (
                            <div key={index} className="flex items-center gap-3 p-4 bg-background/50 border border-border/80 rounded-xl group hover:border-slate-500 transition-all hover:shadow-inner">
                                <span className="text-[10px] font-black text-slate-300 dark:text-slate-700 w-4">{index + 1}</span>
                                <span className="flex-1 font-mono text-sm break-all font-medium text-muted-foreground group-hover:text-foreground transition-colors lining-nums">{uuid}</span>
                                <button
                                    onClick={() => copyToClipboard(uuid, index)}
                                    className={`p-2.5 rounded-lg transition-all shadow-sm border ${copied === index ? 'bg-green-500 text-white border-green-500' : 'bg-background hover:bg-secondary text-muted-foreground border-border'}`}
                                >
                                    {copied === index ? (
                                        <Check className="w-4 h-4" />
                                    ) : (
                                        <Copy className="w-4 h-4" />
                                    )}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="bg-slate-500/5 border border-slate-500/10 rounded-2xl p-6 text-sm text-foreground space-y-4">
                <h3 className="font-black text-lg flex items-center gap-2 text-slate-700 dark:text-slate-400">💡 {isEn ? 'Standardized Specifications' : 'UUID v4 기술 규격'}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-background rounded-xl border border-border/50 space-y-2">
                        <p className="font-bold text-slate-600 dark:text-slate-400 text-xs uppercase tracking-widest">{isEn ? 'Structure' : '데이터 구조'}</p>
                        <p className="text-xs text-muted-foreground leading-relaxed">{isEn ? 'Contains 32 hexadecimal digits displayed in 5 groups separated by 4 hyphens.' : '32개의 16진수 문자와 4개의 하이픈을 조합하여 총 36자의 텍스트로 구성됩니다.'}</p>
                    </div>
                    <div className="p-4 bg-background rounded-xl border border-border/50 space-y-2">
                        <p className="font-bold text-slate-600 dark:text-slate-400 text-xs uppercase tracking-widest">{isEn ? 'Implementation' : '주요 활용처'}</p>
                        <p className="text-xs text-muted-foreground leading-relaxed">{isEn ? 'Perfect for primary keys, secure session tokens, and distributed system tracing.' : 'DB 기본 키, 결제 트랜잭션 ID, 파일 서버 고유 경로 지정 등에 널리 쓰입니다.'}</p>
                    </div>
                </div>
                <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl">
                    <p className="text-amber-700 dark:text-amber-400 text-[11px] font-bold">
                        {isEn 
                            ? "NOTE: This tool utilizes your browser's cryptographically secure pseudo-random number generator (CSPRNG) via crypto.randomUUID()." 
                            : "알림: 본 도구는 브라우저의 전용 암호화 API(crypto.randomUUID)를 사용하여 보안성이 보장된 난수 식별자를 생성합니다."}
                    </p>
                </div>
            </div>

            <ToolGuide
                title={isEn ? "Advanced UUID / GUID Guide" : "UUID 생성기 통합 가이드"}
                intro={isEn 
                    ? "Generate cryptographically secure GUID strings instantly. Our utility ensures 100% browser-side execution for zero-latency and total data privacy." 
                    : "개발자 및 인프라 엔지니어를 위해 설계된 고유 식별자 추출 도구입니다. 복잡한 설정 없이 클릭 한 번으로 모든 시스템에서 호환되는 표준 식별자 풀을 생성하세요."}
                steps={steps}
                tips={isEn ? [
                    "Need mock data for testing? Use the slider to batch-generate up to 50 entries and export them via 'Copy All'.",
                    "Unlike incrementing integers, UUIDs are secure because they don't reveal the total number of records to external users.",
                    "Save and refresh is not needed; every click triggers a fresh batch of completely unique entropy identifiers."
                ] : [
                    "테스트용 데이터가 대량으로 필요할 때 슬라이더를 50으로 맞추고 '전체 복사'를 누르면 매우 빠르게 작업할 수 있습니다.",
                    "일련번호(1, 2, 3...)와 달리 무작위 문자열이므로 외부에서 전체 데이터 규모를 추측하기 어렵게 만들어 보안성을 높입니다.",
                    "모든 데이터는 실시간으로 휘발되므로 중요한 ID는 생성 즉시 메모장에 반드시 저장해 두세요."
                ]}
                faqs={faqs}
            />
        </div>
    );
};

export default UuidGenerator;
