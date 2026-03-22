import React, { useState, useEffect } from 'react';
import { Globe, Copy, Check, RefreshCw } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { useLanguage } from '../context/LanguageContext';

const IpAddress = () => {
    const { lang, t } = useLanguage();
    const isEn = lang === 'en';

    const [ipInfo, setIpInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);

    const fetchIpInfo = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch('https://api.ipify.org?format=json');
            const data = await response.json();

            // Get additional info from ipapi.co
            const infoResponse = await fetch(`https://ipapi.co/${data.ip}/json/`);
            const infoData = await infoResponse.json();

            setIpInfo({
                ip: data.ip,
                city: infoData.city || (isEn ? 'Unknown' : '알 수 없음'),
                region: infoData.region || (isEn ? 'Unknown' : '알 수 없음'),
                country: infoData.country_name || (isEn ? 'Unknown' : '알 수 없음'),
                timezone: infoData.timezone || (isEn ? 'Unknown' : '알 수 없음'),
                isp: infoData.org || (isEn ? 'Unknown' : '알 수 없음')
            });
        } catch (err) {
            setError(isEn ? 'Failed to fetch IP information.' : 'IP 정보를 가져오는데 실패했습니다.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchIpInfo();
    }, []);

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    const titleText = isEn ? "My IP Address & Location Check | Utility Hub" : "IP 주소 확인 - Utility Hub";
    const descText = isEn 
        ? "Check your current public IP address, location, and ISP details instantly." 
        : "현재 사용 중인 공인 IP 주소와 위치 정보를 확인할 수 있습니다.";
    const keywordsText = isEn ? "my ip address, check ip, public ip, ip location, find ip" : "IP주소, 아이피조회, 공인IP, 위치정보";

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <SEO
                title={titleText}
                description={descText}
                keywords={keywordsText}
            />

            <header className="text-center space-y-2">
                <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
                    <Globe className="w-8 h-8 text-blue-500" />
                    {isEn ? 'My IP Address' : 'IP 주소 확인'}
                </h1>
                <p className="text-muted-foreground">
                    {isEn ? 'Your current public IP address' : '현재 사용 중인 공인 IP 주소'}
                </p>
            </header>

            {loading && (
                <div className="bg-card border border-border rounded-xl p-12 text-center">
                    <RefreshCw className="w-12 h-12 mx-auto mb-4 animate-spin text-primary" />
                    <p className="text-muted-foreground">{isEn ? 'Fetching IP info...' : 'IP 정보를 가져오는 중...'}</p>
                </div>
            )}

            {error && (
                <div className="bg-red-500/10 border border-red-500/50 rounded-xl p-6 text-center">
                    <p className="text-red-500">{error}</p>
                    <button
                        onClick={fetchIpInfo}
                        className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:brightness-110 transition-all"
                    >
                        {isEn ? 'Retry' : '다시 시도'}
                    </button>
                </div>
            )}

            {ipInfo && !loading && (
                <div className="space-y-4">
                    {/* IP Address */}
                    <div className="bg-card border border-border rounded-xl p-8 text-center">
                        <div className="text-sm text-muted-foreground mb-2">{isEn ? 'My IP Address is' : '내 IP 주소'}</div>
                        <div className="text-4xl font-bold font-mono mb-4">{ipInfo.ip}</div>
                        <button
                            onClick={() => copyToClipboard(ipInfo.ip)}
                            className="flex items-center gap-2 mx-auto px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:brightness-110 transition-all"
                        >
                            {copied ? (
                                <>
                                    <Check className="w-4 h-4" />
                                    {isEn ? 'Copied' : '복사됨'}
                                </>
                            ) : (
                                <>
                                    <Copy className="w-4 h-4" />
                                    {isEn ? 'Copy' : '복사하기'}
                                </>
                            )}
                        </button>
                    </div>

                    {/* Additional Info */}
                    <div className="bg-card border border-border rounded-xl p-6 space-y-3">
                        <h2 className="text-lg font-bold mb-4">{isEn ? 'Details' : '상세 정보'}</h2>

                        <div className="flex justify-between p-3 bg-secondary rounded-lg">
                            <span className="text-muted-foreground">{isEn ? 'City' : '도시'}</span>
                            <span className="font-semibold">{ipInfo.city}</span>
                        </div>

                        <div className="flex justify-between p-3 bg-secondary rounded-lg">
                            <span className="text-muted-foreground">{isEn ? 'Region' : '지역'}</span>
                            <span className="font-semibold">{ipInfo.region}</span>
                        </div>

                        <div className="flex justify-between p-3 bg-secondary rounded-lg">
                            <span className="text-muted-foreground">{isEn ? 'Country' : '국가'}</span>
                            <span className="font-semibold">{ipInfo.country}</span>
                        </div>

                        <div className="flex justify-between p-3 bg-secondary rounded-lg">
                            <span className="text-muted-foreground">{isEn ? 'Timezone' : '시간대'}</span>
                            <span className="font-semibold">{ipInfo.timezone}</span>
                        </div>

                        <div className="flex justify-between p-3 bg-secondary rounded-lg">
                            <span className="text-muted-foreground">{isEn ? 'ISP' : 'ISP'}</span>
                            <span className="font-semibold text-sm">{ipInfo.isp}</span>
                        </div>
                    </div>

                    <button
                        onClick={fetchIpInfo}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-secondary hover:bg-accent rounded-lg transition-colors"
                    >
                        <RefreshCw className="w-4 h-4" />
                        {isEn ? 'Refresh' : '새로고침'}
                    </button>
                </div>
            )}

            <div className="bg-muted/30 rounded-xl p-6 text-sm text-muted-foreground">
                <h3 className="font-bold text-foreground mb-2">💡 {isEn ? 'Notes' : '안내'}</h3>
                <ul className="space-y-1 list-disc list-inside">
                    <li>{isEn ? 'A public IP address is your unique identifier on the internet.' : '공인 IP 주소는 인터넷에 접속할 때 사용되는 고유한 주소입니다.'}</li>
                    <li>{isEn ? 'If you are using a VPN or Proxy, the location shown may not be your physical location.' : 'VPN이나 프록시를 사용하는 경우 실제 위치와 다를 수 있습니다.'}</li>
                    <li>{isEn ? 'Location data (city/region) is approximate and estimated based on ISP mapping.' : '위치 정보는 대략적인 정보이며 정확하지 않을 수 있습니다.'}</li>
                </ul>
            </div>
            
            <ToolGuide
                title={isEn ? "My IP Address Checker" : "IP 주소 확인"}
                intro={isEn ? "Instantly view your current IP address and networking details." : "내 IP 주소 및 위치 정보 확인"}
                steps={isEn ? [
                    "Just load the page! The IP lookup happens automatically.",
                    "Review your City, Country, and ISP detailed in the section below your IP.",
                    "Click the Copy button to copy your IP string to the clipboard easily.",
                    "Click Refresh to query your network details again."
                ] : [
                    "원하시는 옵션이나 값을 화면에 안내된 순서대로 정확하게 기입해 주세요.",
                    "제시된 항목과 보기를 꼼꼼하게 살펴보고 본인에게 맞는 것을 선택합니다.",
                    "모든 입력을 완료한 후 결과 화면에서 계산된 수치나 분석된 내용을 확인합니다.",
                    "결과가 마음에 든다면 캡처하거나 공유하기 버튼을 눌러 지인들에게 공유해보세요!"
                ]}
                tips={isEn ? [
                    "When troubleshooting network issues with an IT admin, this is the exact public IP they need.",
                    "Test your VPN functionality by verifying if the location here changes when you switch VPN servers."
                ] : [
                    "결과값이 예상과 다르다면 입력한 숫자나 단위를 한 번 더 확인해보는 것이 좋습니다.",
                    "제공되는 다양한 부가 옵션을 함께 활용하면 훨씬 구체적인 형태의 맞춤형 결과를 얻을 수 있습니다.",
                    "모바일과 데스크톱 환경 모두에 완벽하게 최적화되어 있으니 언제 어디서든 편리하게 이용해 보세요."
                ]}
                faqs={isEn ? [
                    { q: "What is an IPv4 or IPv6 address?", a: "Your IP is the numerical label assigned to your device on the internet. IPv4 looks like 192.168.1.1, while IPv6 is longer and contains letters." }
                ] : [
                    { "q": "이 도구들은 정말로 모두 무료인가요?", "a": "네! Tool Hive에서 제공하는 모든 도구 모음과 심리 테스트들은 가입 등의 번거로운 절차 없이 누구나 100% 무료로 무제한 사용할 수 있습니다." },
                    { "q": "제가 입력한 개인적인 정보 데이터가 서버에 남나요?", "a": "아니요, 사용자가 입력하는 이름, 숫자, 금액 등의 모든 데이터는 방문자의 기기 내 브라우저에서만 실시간으로 연산되며 어떠한 경우에도 외부 서버로 전송되거나 저장되지 않으므로 안심하셔도 됩니다." },
                    { "q": "버튼을 눌러도 반응이 없거나 에러가 생깁니다.", "a": "브라우저의 일시적인 캐시 문제일 수 있습니다. 키보드의 F5 버튼을 누르거나 새로고침을 진행한 후 다시 시도해 보시길 권장하며, 문제가 계속된다면 다른 브라우저 앱을 이용해 보세요." }
                ]}
            />
        </div>
    );
};

export default IpAddress;
