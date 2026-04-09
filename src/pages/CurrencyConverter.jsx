import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { DollarSign, RefreshCw, Calendar, Edit2, ArrowRightLeft, AlertCircle } from 'lucide-react';
import ShareButtons from '../components/ShareButtons';
import { useLanguage } from '../context/LanguageContext';

const DEFAULT_RATES = {
    KRW: 1,
    USD: 0.00075,
    JPY: 0.11,
    CNY: 0.0054,
    EUR: 0.00069,
    GBP: 0.00059,
    AUD: 0.0011,
    CAD: 0.0010,
    CHF: 0.00066,
    HKD: 0.0058,
    SGD: 0.0010,
};

const CURRENCY_INFO = {
    KRW: { name: '대한민국 원', symbol: '₩', flag: '🇰🇷' },
    USD: { name: '미국 달러', symbol: '$', flag: '🇺🇸' },
    JPY: { name: '일본 엔', symbol: '¥', flag: '🇯🇵' },
    CNY: { name: '중국 위안', symbol: '¥', flag: '🇨🇳' },
    EUR: { name: '유로', symbol: '€', flag: '🇪🇺' },
    GBP: { name: '영국 파운드', symbol: '£', flag: '🇬🇧' },
    AUD: { name: '호주 달러', symbol: 'A$', flag: '🇦🇺' },
    CAD: { name: '캐나다 달러', symbol: 'C$', flag: '🇨🇦' },
    CHF: { name: '스위스 프랑', symbol: 'CHF', flag: '🇨🇭' },
    HKD: { name: '홍콩 달러', symbol: 'HK$', flag: '🇭🇰' },
    SGD: { name: '싱가포르 달러', symbol: 'S$', flag: '🇸🇬' },
};

const CURRENCY_INFO_EN = {
    KRW: { name: 'South Korean Won', symbol: '₩', flag: '🇰🇷' },
    USD: { name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
    JPY: { name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵' },
    CNY: { name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳' },
    EUR: { name: 'Euro', symbol: '€', flag: '🇪🇺' },
    GBP: { name: 'British Pound', symbol: '£', flag: '🇬🇧' },
    AUD: { name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺' },
    CAD: { name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦' },
    CHF: { name: 'Swiss Franc', symbol: 'CHF', flag: '🇨🇭' },
    HKD: { name: 'Hong Kong Dollar', symbol: 'HK$', flag: '🇭🇰' },
    SGD: { name: 'Singapore Dollar', symbol: 'S$', flag: '🇸🇬' },
};

const CurrencyConverter = () => {
    const { lang, t } = useLanguage();
    const isEn = lang === 'en';
    const activeInfo = isEn ? CURRENCY_INFO_EN : CURRENCY_INFO;

    const [rates, setRates] = useState(DEFAULT_RATES);
    const [lastUpdate, setLastUpdate] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('KRW');
    const [amount, setAmount] = useState('1');
    const [result, setResult] = useState('');

    const [editMode, setEditMode] = useState(false);
    const [editRates, setEditRates] = useState({});

    const fetchRates = async (force = false) => {
        setIsLoading(true);
        setError(null);
        try {
            const cachedData = localStorage.getItem('currency_cache');
            if (!force && cachedData) {
                const { rates: cachedRates, timestamp } = JSON.parse(cachedData);
                const now = Date.now();
                if (now - timestamp < 24 * 60 * 60 * 1000) {
                    setRates(cachedRates);
                    setLastUpdate(new Date(timestamp).toLocaleDateString());
                    setIsLoading(false);
                    return;
                }
            }

            const response = await fetch('https://open.er-api.com/v6/latest/KRW');
            const data = await response.json();

            if (data.result === 'success') {
                const newRates = { KRW: 1 };
                Object.keys(CURRENCY_INFO).forEach(code => {
                    if (code !== 'KRW' && data.rates[code]) {
                        newRates[code] = data.rates[code];
                    }
                });

                setRates(newRates);
                setLastUpdate(new Date(data.time_last_update_utc).toLocaleDateString());

                localStorage.setItem('currency_cache', JSON.stringify({
                    rates: newRates,
                    timestamp: Date.now()
                }));
            } else {
                throw new Error('API Error');
            }
        } catch (err) {
            console.error('Failed to fetch rates:', err);
            setError(isEn ? 'Failed to fetch latest rates. Using default values.' : '최신 환율을 가져오는데 실패했습니다. 기본값을 사용합니다.');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchRates();
    }, [isEn]); // Added isEn to trigger update on lang change if needed, though rates are numbers

    useEffect(() => {
        const amt = parseFloat(amount) || 0;
        if (amt === 0) {
            setResult('');
            return;
        }

        const rateFrom = rates[fromCurrency];
        const rateTo = rates[toCurrency];

        if (!rateFrom || !rateTo) return;

        const valInKrw = amt / rateFrom;
        const converted = valInKrw * rateTo;

        setResult(converted);
    }, [amount, fromCurrency, toCurrency, rates]);

    const formatNumber = (num) => {
        if (!num) return '';
        return num.toLocaleString(undefined, { maximumFractionDigits: 2 });
    };

    const swapCurrencies = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    };

    const startEdit = () => {
        const userFriendlyRates = {};
        Object.keys(rates).forEach(code => {
            if (code !== 'KRW') {
                userFriendlyRates[code] = 1 / rates[code];
            }
        });
        setEditRates(userFriendlyRates);
        setEditMode(true);
    };

    const saveRates = () => {
        const newRates = { KRW: 1 };
        Object.keys(editRates).forEach(code => {
            newRates[code] = 1 / parseFloat(editRates[code]);
        });
        setRates(newRates);
        setEditMode(false);
        localStorage.setItem('currency_cache', JSON.stringify({
            rates: newRates,
            timestamp: Date.now()
        }));
        setLastUpdate(isEn ? 'User Defined' : '사용자 지정');
    };

    const faqs = isEn ? [
        { q: 'How often are the exchange rates updated?', a: 'Latest exchange rates update automatically every 24 hours. Click "Refresh Rates" to fetch explicitly. Built-in defaults are used if API fails or there is no internet.' },
        { q: 'Is there a difference from actual bank exchange rates?', a: 'Yes, this tool calculates based on the market exchange rate. Actual banks apply spreads, so your received amount might slightly differ. Use it for reference purposes only.' },
        { q: 'What if you do not support the currency I need?', a: 'Currently supporting KRW, USD, JPY, CNY, EUR, GBP, AUD, CAD, CHF, HKD, and SGD. If you need others, use "Manual Rate Setting" to input explicit values.' },
        { q: 'I want to apply a specific currency exchange kiosk\'s rate.', a: 'Click the "Edit" button for manual rates and type the exact rate for the given currency.' },
    ] : [
        { q: '환율은 얼마나 자주 업데이트되나요?', a: '최신 환율은 24시간마다 자동으로 업데이트됩니다. "환율 새로고침" 버튼을 클릭하면 즉시 최신 환율을 불러옵니다. 인터넷 연결이 없거나 API 오류 시 내장된 기본 환율이 사용됩니다.' },
        { q: '실제 은행 환전 금액과 차이가 있을 수 있나요?', a: '네, 이 도구는 시장 환율(고시 환율)을 기준으로 계산합니다. 실제 은행·환전소에서는 수수료(스프레드)가 적용되어 실제 수령 금액은 다를 수 있습니다. 참고용으로만 사용하세요.' },
        { q: '지원하지 않는 통화는 어떻게 하나요?', a: '현재 원화(KRW), 달러(USD), 엔화(JPY), 위안(CNY), 유로(EUR), 파운드(GBP), 호주달러(AUD), 캐나다달러(CAD), 스위스프랑(CHF), 홍콩달러(HKD), 싱가포르달러(SGD) 11종을 지원합니다. 다른 통화가 필요하면 "수동 설정"에서 직접 환율을 입력해 사용할 수 있습니다.' },
        { q: '달러 대신 특정 환전소의 환율을 적용하고 싶어요.', a: '"수정하기" 버튼을 클릭하면 각 통화의 대원화 환율을 직접 입력할 수 있습니다. 은행이나 환전소의 실제 환율을 입력하면 더 정확한 계산이 가능합니다.' },
    ];

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <SEO
                title={t('tools.currency.title')}
                description={t('tools.currency.description')}
                keywords={isEn ? "currency converter, live exchange rates, USD KRW, JPY KRW, EUR KRW, money converter" : "환율계산기, 실시간환율, 달러환율, 엔화환율, 유로환율, 원화환율, 환전계산, USD KRW, JPY KRW, EUR KRW"}
                faqs={faqs}
            />

            <div className="text-center space-y-4 py-6">
                <div className="inline-flex items-center justify-center p-3 bg-green-100 dark:bg-green-900/30 rounded-full mb-2">
                    <DollarSign className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-blue-600">
                    {isEn ? 'Live Currency Converter' : '실시간 환율 계산기'}
                </h1>
                <p className="text-muted-foreground">
                    {isEn ? 'Calculate accurately based on the latest exchange rates.' : '최신 환율 정보를 기반으로 정확하게 계산하세요.'}
                </p>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-secondary/30 p-4 rounded-xl text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{isEn ? 'As of:' : '기준일:'} <span className="font-medium text-foreground">{lastUpdate || (isEn ? 'Updating...' : '업데이트 중...')}</span></span>
                </div>
                <div className="flex items-center gap-2">
                    {error && (
                        <span className="text-red-500 text-xs flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" /> {error}
                        </span>
                    )}
                    <button
                        onClick={() => fetchRates(true)}
                        disabled={isLoading}
                        className="btn btn-sm btn-ghost flex items-center gap-2"
                    >
                        <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                        {isLoading ? (isEn ? 'Updating...' : '업데이트 중...') : (isEn ? 'Refresh Rates' : '환율 새로고침')}
                    </button>
                </div>
            </div>

            <div className="card p-8 space-y-8">
                <div className="grid md:grid-cols-[1fr,auto,1fr] gap-6 items-center">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground">{isEn ? 'From Amount' : '보낼 금액'}</label>
                        <div className="flex gap-2">
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="input flex-1 text-xl font-bold"
                                placeholder="1"
                                min="0"
                            />
                            <select
                                value={fromCurrency}
                                onChange={(e) => setFromCurrency(e.target.value)}
                                className="input w-36 text-lg"
                            >
                                {Object.keys(activeInfo).map((code) => (
                                    <option key={code} value={code}>
                                        {activeInfo[code].flag} {code}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="text-sm text-muted-foreground text-right">
                            {activeInfo[fromCurrency].name}
                        </div>
                    </div>

                    <div className="flex justify-center mt-6">
                        <button
                            onClick={swapCurrencies}
                            className="p-3 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
                        >
                            <ArrowRightLeft className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground">{isEn ? 'To Amount' : '받을 금액'}</label>
                        <div className="flex gap-2">
                            <div className="input flex-1 text-xl font-bold bg-secondary/50 flex items-center text-primary overflow-x-auto whitespace-nowrap">
                                {formatNumber(result)}
                            </div>
                            <select
                                value={toCurrency}
                                onChange={(e) => setToCurrency(e.target.value)}
                                className="input w-36 text-lg"
                            >
                                {Object.keys(activeInfo).map((code) => (
                                    <option key={code} value={code}>
                                        {activeInfo[code].flag} {code}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="text-sm text-muted-foreground text-right">
                            {activeInfo[toCurrency].name}
                        </div>
                    </div>
                </div>

                <div className="bg-primary/5 rounded-xl p-4 text-center">
                    <p className="text-sm text-muted-foreground mb-1">{isEn ? 'Applied Exchange Rate' : '적용 환율'}</p>
                    <div className="text-lg font-bold flex items-center justify-center gap-2">
                        <span>1 {fromCurrency}</span>
                        <ArrowRightLeft className="w-4 h-4 text-muted-foreground" />
                        <span>
                            {rates[fromCurrency] && rates[toCurrency]
                                ? formatNumber((1 / rates[fromCurrency]) * rates[toCurrency])
                                : '...'} {toCurrency}
                        </span>
                    </div>
                </div>
            </div>

            <div className="card p-6 space-y-4">
                <div className="flex items-center justify-between">
                    <h3 className="font-bold text-lg flex items-center gap-2">
                        <Edit2 className="w-5 h-5" /> {isEn ? 'Manual Rate Setting' : '환율 수동 설정'}
                    </h3>
                    {!editMode ? (
                        <button onClick={startEdit} className="btn btn-sm btn-outline">
                            {isEn ? 'Edit' : '수정하기'}
                        </button>
                    ) : (
                        <div className="flex gap-2">
                            <button onClick={() => setEditMode(false)} className="btn btn-sm btn-ghost">{isEn ? 'Cancel' : '취소'}</button>
                            <button onClick={saveRates} className="btn btn-sm btn-primary">{isEn ? 'Save' : '저장'}</button>
                        </div>
                    )}
                </div>

                {editMode ? (
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                        {Object.keys(editRates).map(code => (
                            <div key={code} className="space-y-1">
                                <label className="text-xs text-muted-foreground flex items-center gap-1">
                                    {activeInfo[code].flag} 1 {code} = ? KRW
                                </label>
                                <input
                                    type="number"
                                    value={editRates[code]}
                                    onChange={(e) => setEditRates({ ...editRates, [code]: e.target.value })}
                                    className="input w-full text-sm"
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-muted-foreground">
                        {isEn ? 'You can manually adjust exchange rates if API rates are inaccurate or you want to apply specific rates.' : 'API 환율이 정확하지 않거나 특정 환율을 적용하고 싶을 때 직접 수정할 수 있습니다.'}
                    </p>
                )}
            </div>

            <ShareButtons />

            <ToolGuide
                title={isEn ? "Currency Converter Guide" : "환율 계산기 가이드"}
                intro={isEn ? "Instantly convert most global currencies using the latest market exchange rates." : "가장 최신 시장 환율 기준으로 주요 국가 통화 금액을 즉시 변환합니다."}
                steps={isEn ? [
                    'Enter value in the "From Amount" box.',
                    'Select base currency from the first dropdown.',
                    'Select resulting currency from the second dropdown.',
                    'Review the accurately converted amount.'
                ] : [
                    '"보낼 금액" 입력란에 환전하려는 금액을 입력합니다.',
                    '왼쪽 목록에서 기준 통화를 선택합니다.',
                    '오른쪽 목록에서 결과를 볼 통화를 선택합니다.',
                    '자동으로 변환된 "받을 금액"을 확인합니다.'
                ]}
                tips={isEn ? [
                    'You can always refresh manually if needed.',
                    'Set your own explicit rates for specific scenarios.'
                ] : [
                    '환율 새로고침 버튼을 눌러 최신 수치를 가져올 수 있습니다.',
                    '수동 설정에서 1단위 당 원화 금액을 입력하여 사용자 지정 환율을 적용하세요.'
                ]}
                faqs={faqs}
            />
        </div>
    );
};

export default CurrencyConverter;
