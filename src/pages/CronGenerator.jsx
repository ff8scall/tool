import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { Clock, Copy, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const CronGenerator = () => {
    const { lang, t } = useLanguage();
    const isEn = lang === 'en';

    const [cronType, setCronType] = useState('simple');
    const [minute, setMinute] = useState('*');
    const [hour, setHour] = useState('*');
    const [dayOfMonth, setDayOfMonth] = useState('*');
    const [month, setMonth] = useState('*');
    const [dayOfWeek, setDayOfWeek] = useState('*');
    const [cronExpression, setCronExpression] = useState('* * * * *');
    const [description, setDescription] = useState('');
    const [copied, setCopied] = useState(false);

    // Simple mode states
    const [simpleType, setSimpleType] = useState('everyMinute');
    const [simpleMinute, setSimpleMinute] = useState('0');
    const [simpleHour, setSimpleHour] = useState('0');
    const [simpleDayOfWeek, setSimpleDayOfWeek] = useState('1');

    useEffect(() => {
        if (cronType === 'simple') {
            generateSimpleCron();
        } else {
            generateAdvancedCron();
        }
        // eslint-disable-next-line
    }, [cronType, simpleType, simpleMinute, simpleHour, simpleDayOfWeek, minute, hour, dayOfMonth, month, dayOfWeek, isEn]);

    const generateSimpleCron = () => {
        let cron = '';
        switch (simpleType) {
            case 'everyMinute':
                cron = '* * * * *';
                break;
            case 'everyHour':
                cron = `${simpleMinute} * * * *`;
                break;
            case 'everyDay':
                cron = `${simpleMinute} ${simpleHour} * * *`;
                break;
            case 'everyWeek':
                cron = `${simpleMinute} ${simpleHour} * * ${simpleDayOfWeek}`;
                break;
            case 'everyMonth':
                cron = `${simpleMinute} ${simpleHour} 1 * *`;
                break;
            default:
                cron = '* * * * *';
        }
        setCronExpression(cron);
        setDescription(describeCron(cron));
    };

    const generateAdvancedCron = () => {
        const cron = `${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`;
        setCronExpression(cron);
        setDescription(describeCron(cron));
    };

    const describeCron = (cron) => {
        const parts = cron.split(' ');
        const [min, hr, dom, mon, dow] = parts;

        let desc = '';

        if (isEn) {
            // English description
            // Minute
            if (min === '*') desc += 'Every minute';
            else if (min.includes('/')) desc += `Every ${min.split('/')[1]} minutes`;
            else desc += `At minute ${min}`;

            // Hour
            if (hr === '*') desc += ', every hour';
            else if (hr.includes('/')) desc += `, every ${hr.split('/')[1]} hours`;
            else desc += `, at ${hr}:00`;

            // Day of Month
            if (dom !== '*') {
                if (dom.includes('/')) desc += `, every ${dom.split('/')[1]} days`;
                else desc += `, on day ${dom}`;
            }

            // Month
            if (mon !== '*') {
                const months = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                desc += `, in ${months[parseInt(mon)]}`;
            }

            // Day of Week
            if (dow !== '*') {
                const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                desc += `, on ${days[parseInt(dow) % 7]}`;
            }

            return desc;
        } else {
            // Korean description
            // Minute
            if (min === '*') desc += '매 분';
            else if (min.includes('/')) desc += `${min.split('/')[1]}분마다`;
            else desc += `${min}분`;

            // Hour
            if (hr === '*') desc += ', 매 시간';
            else if (hr.includes('/')) desc += `, ${hr.split('/')[1]}시간마다`;
            else desc += `, ${hr}시`;

            // Day of Month
            if (dom !== '*') {
                if (dom.includes('/')) desc += `, ${dom.split('/')[1]}일마다`;
                else desc += `, ${dom}일`;
            }

            // Month
            if (mon !== '*') {
                const months = ['', '1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
                desc += `, ${months[parseInt(mon)]}`;
            }

            // Day of Week
            if (dow !== '*') {
                const days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
                desc += `, ${days[parseInt(dow) % 7]}`;
            }

            return desc + '에 실행';
        }
    };

    const copyCron = () => {
        navigator.clipboard.writeText(cronExpression);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const presets = isEn ? [
        { label: 'Every Minute', value: '* * * * *' },
        { label: 'Every Hour', value: '0 * * * *' },
        { label: 'Every Midnight', value: '0 0 * * *' },
        { label: 'Daily at 9:00 AM', value: '0 9 * * *' },
        { label: 'Every Mon 9:00 AM', value: '0 9 * * 1' },
        { label: 'Monthly 1st 9:00 AM', value: '0 9 1 * *' },
    ] : [
        { label: '매 분', value: '* * * * *' },
        { label: '매 시간', value: '0 * * * *' },
        { label: '매일 자정', value: '0 0 * * *' },
        { label: '매일 오전 9시', value: '0 9 * * *' },
        { label: '매주 월요일 오전 9시', value: '0 9 * * 1' },
        { label: '매월 1일 오전 9시', value: '0 9 1 * *' },
    ];

    const applyPreset = (preset) => {
        const parts = preset.split(' ');
        setMinute(parts[0]);
        setHour(parts[1]);
        setDayOfMonth(parts[2]);
        setMonth(parts[3]);
        setDayOfWeek(parts[4]);
        setCronType('advanced');
    };

    const titleText = t('tools.cron-generator.title');
    const descText = t('tools.cron-generator.description');
    const keywordsText = t('tools.cron-generator.keywords');

    const faqs = isEn ? [
        {
            q: "What does the * asterisk basically imply?",
            a: "In a Cron environment, '*' symbolizes matching comprehensively 'every entirely valid condition' for that specific time section."
        },
        {
            q: "Are the expressions exported directly safe for servers?",
            a: "Absolutely, they strictly adhere consistently to standard Unix shell boundaries globally adopted securely across AWS or local Linux clusters natively."
        }
    ] : [
        { "q": "별표(*) 기호는 무엇을 의미하나요?", "a": "별표는 해당 시간 단위의 모든 값을 의미합니다. 예를 들어 분 자리에 *이 있으면 '매 분마다' 실행된다는 뜻입니다." },
        { "q": "생성된 표현식을 그대로 서버에 써도 되나요?", "a": "네, 리눅스(Linux)나 유닉스(Unix) 시스템의 표준 Crontab 형식을 따르고 있어 그대로 복사해서 사용하시면 됩니다." }
    ];

    const steps = isEn ? [
        "Select strictly 'Simple Mode' for UI guided sliders, or 'Advanced Mode' if editing granular expressions.",
        "Toggle frequency rates such as Minute, Hour, or Day.",
        "Analyze the translated text interpretation immediately appearing below.",
        "Hit the bottom right copy button confidently and paste dynamically into your script."
    ] : [
        "간단 모드나 고급 모드 중 원하는 설정 방식을 선택합니다.",
        "분, 시, 일 등 각 실행 주기에 맞게 값을 변경합니다.",
        "하단에 실시간으로 생성되는 표현식과 한글 설명을 확인합니다.",
        "복사 버튼을 눌러 소스 코드나 서버 설정 파일에 붙여넣어 사용하세요."
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

            <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-3">
                    <Clock className="w-8 h-8 text-blue-500" />
                    {isEn ? 'CRON Expression Generator' : 'CRON 표현식 생성기'}
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    {isEn ? 'Build DevOps CRON tasks and immediately interpret formats gracefully.' : '작업 스케줄링을 위한 CRON 표현식을 쉽게 생성하세요'}
                </p>
            </div>

            {/* Mode Toggle */}
            <div className="flex justify-center gap-2 bg-secondary/30 p-1 rounded-xl w-fit mx-auto border border-border">
                <button
                    onClick={() => setCronType('simple')}
                    className={`px-8 py-2.5 rounded-lg font-bold transition-all ${cronType === 'simple'
                            ? 'bg-blue-500 text-white shadow-md'
                            : 'text-muted-foreground hover:text-foreground hover:bg-secondary/80'
                        }`}
                >
                    {isEn ? 'Simple Mode' : '간단 모드'}
                </button>
                <button
                    onClick={() => setCronType('advanced')}
                    className={`px-8 py-2.5 rounded-lg font-bold transition-all ${cronType === 'advanced'
                            ? 'bg-blue-500 text-white shadow-md'
                            : 'text-muted-foreground hover:text-foreground hover:bg-secondary/80'
                        }`}
                >
                    {isEn ? 'Advanced Mode' : '고급 모드'}
                </button>
            </div>

            <div className="card p-6 md:p-8 space-y-8 border border-border shadow-sm">
                {/* Simple Mode */}
                {cronType === 'simple' && (
                    <div className="space-y-6 animate-in fade-in">
                        <div>
                            <label className="block text-sm font-bold text-foreground mb-2">{isEn ? 'Execution Frequency' : '실행 주기'}</label>
                            <select
                                value={simpleType}
                                onChange={(e) => setSimpleType(e.target.value)}
                                className="input w-full bg-secondary/30 border-border/50 focus:border-blue-500 shadow-inner font-medium h-12"
                            >
                                <option value="everyMinute">{isEn ? 'Every Minute' : '매 분'}</option>
                                <option value="everyHour">{isEn ? 'Every Hour' : '매 시간'}</option>
                                <option value="everyDay">{isEn ? 'Every Day' : '매일'}</option>
                                <option value="everyWeek">{isEn ? 'Every Week' : '매주'}</option>
                                <option value="everyMonth">{isEn ? 'Every Month' : '매월'}</option>
                            </select>
                        </div>

                        {simpleType !== 'everyMinute' && (
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-foreground mb-2">{isEn ? 'Minute' : '분'}</label>
                                    <input
                                        type="number"
                                        min="0"
                                        max="59"
                                        value={simpleMinute}
                                        onChange={(e) => setSimpleMinute(e.target.value)}
                                        className="input w-full font-mono text-center font-bold text-lg h-12"
                                    />
                                </div>
                                {(simpleType === 'everyDay' || simpleType === 'everyWeek' || simpleType === 'everyMonth') && (
                                    <div>
                                        <label className="block text-sm font-bold text-foreground mb-2">{isEn ? 'Hour' : '시'}</label>
                                        <input
                                            type="number"
                                            min="0"
                                            max="23"
                                            value={simpleHour}
                                            onChange={(e) => setSimpleHour(e.target.value)}
                                            className="input w-full font-mono text-center font-bold text-lg h-12"
                                        />
                                    </div>
                                )}
                            </div>
                        )}

                        {simpleType === 'everyWeek' && (
                            <div>
                                <label className="block text-sm font-bold text-foreground mb-2">{isEn ? 'Day of Week' : '요일'}</label>
                                <select
                                    value={simpleDayOfWeek}
                                    onChange={(e) => setSimpleDayOfWeek(e.target.value)}
                                    className="input w-full h-12 font-medium"
                                >
                                    <option value="0">{isEn ? 'Sunday' : '일요일'}</option>
                                    <option value="1">{isEn ? 'Monday' : '월요일'}</option>
                                    <option value="2">{isEn ? 'Tuesday' : '화요일'}</option>
                                    <option value="3">{isEn ? 'Wednesday' : '수요일'}</option>
                                    <option value="4">{isEn ? 'Thursday' : '목요일'}</option>
                                    <option value="5">{isEn ? 'Friday' : '금요일'}</option>
                                    <option value="6">{isEn ? 'Saturday' : '토요일'}</option>
                                </select>
                            </div>
                        )}
                    </div>
                )}

                {/* Advanced Mode */}
                {cronType === 'advanced' && (
                    <div className="space-y-6 animate-in fade-in">
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                            {[
                                { val: minute, set: setMinute, label: isEn ? 'Minute (0-59)' : '분 (0-59)' },
                                { val: hour, set: setHour, label: isEn ? 'Hour (0-23)' : '시 (0-23)' },
                                { val: dayOfMonth, set: setDayOfMonth, label: isEn ? 'Day (1-31)' : '일 (1-31)' },
                                { val: month, set: setMonth, label: isEn ? 'Month (1-12)' : '월 (1-12)' },
                                { val: dayOfWeek, set: setDayOfWeek, label: isEn ? 'Day/Wk (0-6)' : '요일 (0-6)' },
                            ].map((field, idx) => (
                                <div key={idx}>
                                    <label className="block text-xs font-bold text-muted-foreground whitespace-nowrap mb-2">{field.label}</label>
                                    <input
                                        type="text"
                                        value={field.val}
                                        onChange={(e) => field.set(e.target.value)}
                                        className="input w-full font-mono text-center font-black text-lg h-12 text-blue-600 focus:text-blue-600 dark:text-blue-400"
                                        placeholder="*"
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="bg-blue-50 dark:bg-blue-900/20 p-5 rounded-xl text-sm border border-blue-100 dark:border-blue-900/50">
                            <p className="font-bold mb-3 text-blue-800 dark:text-blue-200">{isEn ? 'Supported Expression Markers:' : '사용 가능한 특수 문자:'}</p>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-blue-700 dark:text-blue-300">
                                <li className="flex items-center gap-2"><code className="bg-white dark:bg-gray-800 px-2.5 py-1 rounded font-black shadow-sm shrink-0 border border-blue-100 dark:border-blue-800">*</code> <span>{isEn ? 'Every single value instance' : '모든 값'}</span></li>
                                <li className="flex items-center gap-2"><code className="bg-white dark:bg-gray-800 px-2.5 py-1 rounded font-black shadow-sm shrink-0 border border-blue-100 dark:border-blue-800">,</code> <span>{isEn ? 'Value array (Ex: 1,3,5)' : '값 목록 (예: 1,3,5)'}</span></li>
                                <li className="flex items-center gap-2"><code className="bg-white dark:bg-gray-800 px-2.5 py-1 rounded font-black shadow-sm shrink-0 border border-blue-100 dark:border-blue-800">-</code> <span>{isEn ? 'Value range limits (Ex: 1-5)' : '범위 (예: 1-5)'}</span></li>
                                <li className="flex items-center gap-2"><code className="bg-white dark:bg-gray-800 px-2.5 py-1 rounded font-black shadow-sm shrink-0 border border-blue-100 dark:border-blue-800">/</code> <span>{isEn ? 'Value steps (Ex: */5 = per 5)' : '증분 (예: */5 = 5마다)'}</span></li>
                            </ul>
                        </div>

                        <div className="pt-2">
                            <label className="block text-sm font-bold text-foreground mb-3">{isEn ? 'Saved Presets' : '프리셋'}</label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {presets.map((preset, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => applyPreset(preset.value)}
                                        className="btn bg-secondary border border-border/50 text-sm hover:ring-2 hover:ring-blue-500/50 font-medium whitespace-nowrap overflow-hidden text-ellipsis"
                                    >
                                        {preset.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Result */}
                <div className="pt-8 border-t border-border mt-8 space-y-5">
                    <div>
                        <label className="block text-sm font-bold text-foreground mb-3">{isEn ? 'Final CRON Output' : 'CRON 표현식'}</label>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <input
                                type="text"
                                value={cronExpression}
                                readOnly
                                className="input flex-1 font-mono text-2xl font-black bg-slate-100 dark:bg-gray-900 border-2 py-4 shadow-inner text-center sm:text-left"
                            />
                            <button
                                onClick={copyCron}
                                className="btn btn-primary flex items-center justify-center gap-2 px-8 py-4 text-base font-bold sm:w-auto"
                            >
                                {copied ? <Check className="w-5 h-5 text-green-300" /> : <Copy className="w-5 h-5" />}
                                {copied ? (isEn ? 'Copied!' : '복사됨!') : (isEn ? 'Copy' : '복사')}
                            </button>
                        </div>
                    </div>

                    <div className="bg-green-50 dark:bg-green-900/20 p-5 rounded-xl border border-green-200 dark:border-green-900/50 flex flex-col items-center sm:block">
                        <p className="text-xs font-bold uppercase tracking-wider text-green-600 dark:text-green-400 mb-2">{isEn ? 'Human Translation' : '설명'}</p>
                        <p className="text-green-800 dark:text-green-200 font-bold text-lg text-center sm:text-left leading-relaxed">{description}</p>
                    </div>
                </div>
            </div>
            
            <ToolGuide
                title={isEn ? "CRON Scheduler Guide" : "CRON 표현식 활용 가이드"}
                intro={isEn 
                    ? "Build and understand CRON schedule expressions effortlessly. Ideal for DevOps, system administration, and automation tasks." 
                    : "리눅스나 유닉스 기반 시스템에서 작업을 자동화할 때 사용하는 스케줄링 표현식을 쉽게 만들어주는 도구입니다."}
                steps={steps}
                tips={isEn ? [
                    "Cron syntax naturally skips seconds definitions natively relying structurally directly from exact minutes.",
                    "The expression consists of 5 main elements: Minute, Hour, Day, Month, and Day of Week.",
                    "If you need to run tasks every N units, use the slash (/) character (e.g., */15 for every 15 minutes)."
                ] : [
                    "표준 CRON 표현식은 초(Second) 단위를 포함하지 않는 5개 필드(분, 시, 일, 월, 요일) 구성이 기본입니다.",
                    "일(Day or Month)과 요일(Day of Week)을 동시에 지정할 때 충돌이 발생하지 않도록 주의하세요.",
                    "특정 간격마다 실행하고 싶다면 슬래시(/)를, 여러 시점을 지정하려면 쉼표(,)를 사용하세요."
                ]}
                faqs={faqs}
            />
        </div>
    );
};

export default CronGenerator;
