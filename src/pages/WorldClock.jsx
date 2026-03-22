import React, { useState, useEffect } from 'react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { Globe, Clock } from 'lucide-react';
import ShareButtons from '../components/ShareButtons';
import { useLanguage } from '../context/LanguageContext';

const WorldClock = () => {
    const { t, lang } = useLanguage();
    const isEn = lang === 'en';
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const cities = [
        { name: isEn ? 'Seoul' : '서울', timezone: 'Asia/Seoul', flag: '🇰🇷', offset: 9 },
        { name: isEn ? 'Tokyo' : '도쿄', timezone: 'Asia/Tokyo', flag: '🇯🇵', offset: 9 },
        { name: isEn ? 'Beijing' : '베이징', timezone: 'Asia/Shanghai', flag: '🇨🇳', offset: 8 },
        { name: isEn ? 'Hong Kong' : '홍콩', timezone: 'Asia/Hong_Kong', flag: '🇭🇰', offset: 8 },
        { name: isEn ? 'Singapore' : '싱가포르', timezone: 'Asia/Singapore', flag: '🇸🇬', offset: 8 },
        { name: isEn ? 'Bangkok' : '방콕', timezone: 'Asia/Bangkok', flag: '🇹🇭', offset: 7 },
        { name: isEn ? 'New Delhi' : '뉴델리', timezone: 'Asia/Kolkata', flag: '🇮🇳', offset: 5.5 },
        { name: isEn ? 'Dubai' : '두바이', timezone: 'Asia/Dubai', flag: '🇦🇪', offset: 4 },
        { name: isEn ? 'Moscow' : '모스크바', timezone: 'Europe/Moscow', flag: '🇷🇺', offset: 3 },
        { name: isEn ? 'Paris' : '파리', timezone: 'Europe/Paris', flag: '🇫🇷', offset: 1 },
        { name: isEn ? 'London' : '런던', timezone: 'Europe/London', flag: '🇬🇧', offset: 0 },
        { name: isEn ? 'New York' : '뉴욕', timezone: 'America/New_York', flag: '🇺🇸', offset: -5 },
        { name: isEn ? 'LA' : 'LA', timezone: 'America/Los_Angeles', flag: '🇺🇸', offset: -8 },
        { name: isEn ? 'Sydney' : '시드니', timezone: 'Australia/Sydney', flag: '🇦🇺', offset: 11 }
    ];

    const getTimeForCity = (timezone) => {
        return currentTime.toLocaleTimeString(isEn ? 'en-US' : 'ko-KR', {
            timeZone: timezone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
    };

    const getDateForCity = (timezone) => {
        return currentTime.toLocaleDateString(isEn ? 'en-US' : 'ko-KR', {
            timeZone: timezone,
            month: 'short',
            day: 'numeric',
            weekday: 'short'
        });
    };

    const getTimeDiff = (offset) => {
        const baseOffset = isEn ? offset : offset - 9; // If EN, show absolute offset, if KO, show diff with Seoul
        
        if (!isEn) {
            if (baseOffset === 0) return '기준';
            return baseOffset > 0 ? `+${baseOffset}시간` : `${baseOffset}시간`;
        }
        
        // In English, just show the UTC offset as it's more standard globally
        const sign = offset >= 0 ? '+' : '';
        return `UTC ${sign}${offset}`;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <SEO
                title={isEn ? "World Clock - Current Time in Major Cities" : "세계 시계 - 전 세계 주요 도시 현재 시간"}
                description={isEn ? "Check the current time in major cities worldwide including Seoul, New York, London, Paris, and Tokyo in real-time." : "서울, 도쿄, 뉴욕, 런던, 파리 등 전 세계 주요 도시의 현재 시간을 실시간으로 확인하세요."}
                keywords={isEn ? ['world clock', 'time', 'timezone', 'time difference'] : ['세계시계', '시간', '시차', 'world clock', 'timezone']}
                path="/world-clock"
            />

            <div className="container mx-auto px-4 py-8 max-w-6xl">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
                        <Globe className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                        {isEn ? 'World Clock' : '세계 시계'}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        {isEn ? 'Real-time clocks for major cities worldwide' : '전 세계 주요 도시의 현재 시간'}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                    {cities.map((city) => (
                        <div
                            key={city.timezone}
                            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                        >
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                    <span className="text-3xl">{city.flag}</span>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                        {city.name}
                                    </h3>
                                </div>
                                <span className="text-xs px-2 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300 rounded-full">
                                    {getTimeDiff(city.offset)}
                                </span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 text-sm mb-2">
                                <Clock className="w-4 h-4" />
                                <span>{getDateForCity(city.timezone)}</span>
                            </div>
                            <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400 font-mono">
                                {getTimeForCity(city.timezone)}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-4">
                        {isEn ? 'Timezone Information' : '시차 정보'}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <div>
                            <p className="mb-2">
                                {isEn ? '• Displays timezone offsets globally' : '• 서울 기준으로 시차를 표시합니다'}
                            </p>
                            <p className="mb-2">
                                {isEn ? '• Daylight Saving Time (DST) is automatically applied' : '• 일광절약시간(DST)이 자동 반영됩니다'}
                            </p>
                        </div>
                        <div>
                            <p className="mb-2">
                                {isEn ? '• Updates automatically every second' : '• 매초 자동으로 업데이트됩니다'}
                            </p>
                            <p className="mb-2">
                                {isEn ? '• International Date Line is considered' : '• 날짜 변경선도 고려됩니다'}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-8">
                    <ShareButtons />
                </div>
            </div>

            <ToolGuide
                title={isEn ? 'World Clock' : '세계 시계'}
                intro={isEn ? 'Real-time clocks for major cities worldwide' : '전 세계 주요 도시의 현재 시간'}
                steps={isEn ? [
                    "Check the current time of major cities updated in real-time.",
                    "Look at the bottom of each city card for the local date and timezone offset.",
                    "The time difference is calculated automatically for your convenience.",
                    "Use the share button to show the current time to your friends!"
                ] : [
                    "원하시는 옵션이나 값을 화면에 안내된 순서대로 정확하게 기입해 주세요.",
                    "제시된 항목과 보기를 꼼꼼하게 살펴보고 본인에게 맞는 것을 선택합니다.",
                    "모든 입력을 완료한 후 결과 화면에서 계산된 수치나 분석된 내용을 확인합니다.",
                    "결과가 마음에 든다면 캡처하거나 공유하기 버튼을 눌러 지인들에게 공유해보세요!"
                ]}
                tips={isEn ? [
                    "Double-check your local device clock if the times seem inaccurate.",
                    "Daylight Saving Time is already accounted for in the displayed times.",
                    "This tool is fully optimized for both desktop and mobile environments."
                ] : [
                    "결과값이 예상과 다르다면 입력한 숫자나 단위를 한 번 더 확인해보는 것이 좋습니다.",
                    "제공되는 다양한 부가 옵션을 함께 활용하면 훨씬 구체적인 형태의 맞춤형 결과를 얻을 수 있습니다.",
                    "모바일과 데스크톱 환경 모두에 완벽하게 최적화되어 있으니 언제 어디서든 편리하게 이용해 보세요."
                ]}
                faqs={isEn ? [
                    { "q": "Is this tool free to use?", "a": "Yes! All tools provided by Tool Hive are 100% free and requires no signup." },
                    { "q": "Is my data stored on the server?", "a": "No, all time calculations happen on your local browser and no data is sent to external servers." },
                    { "q": "The clock is not updating.", "a": "Please try refreshing your browser (F5) or check if your internet connection is stable." }
                ] : [
                    { "q": "이 도구들은 정말로 모두 무료인가요?", "a": "네! Tool Hive에서 제공하는 모든 도구 모음과 심리 테스트들은 가입 등의 번거로운 절차 없이 누구나 100% 무료로 무제한 사용할 수 있습니다." },
                    { "q": "제가 입력한 개인적인 정보 데이터가 서버에 남나요?", "a": "아니요, 사용자가 입력하는 이름, 숫자, 금액 등의 모든 데이터는 방문자의 기기 내 브라우저에서만 실시간으로 연산되며 어떠한 경우에도 외부 서버로 전송되거나 저장되지 않으므로 안심하셔도 됩니다." },
                    { "q": "버튼을 눌러도 반응이 없거나 에러가 생깁니다.", "a": "브라우저의 일시적인 캐시 문제일 수 있습니다. 키보드의 F5 버튼을 누르거나 새로고침을 진행한 후 다시 시도해 보시길 권장하며, 문제가 계속된다면 다른 브라우저 앱을 이용해 보세요." }
                ]}
            />
        </div>
    );
};

export default WorldClock;
