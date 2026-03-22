import React, { useState } from 'react';
import { Zap, ZapOff } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';

const Flashlight = () => {
    const [isOn, setIsOn] = useState(false);

    const toggleFlashlight = () => {
        setIsOn(!isOn);
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <SEO
                title="손전등 - Utility Hub"
                description="화면을 밝게 켜서 손전등처럼 사용할 수 있습니다. 어두운 곳에서 유용합니다."
                keywords="손전등, 플래시라이트, 화면밝기"
            />

            <header className="text-center space-y-2">
                <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
                    <Zap className="w-8 h-8 text-yellow-500" />
                    손전등
                </h1>
                <p className="text-muted-foreground">
                    화면을 밝게 켜서 손전등으로 사용하세요
                </p>
            </header>

            {/* Flashlight Display */}
            <div
                className={`rounded-2xl transition-all duration-300 ${isOn
                        ? 'bg-white shadow-2xl'
                        : 'bg-card border border-border'
                    }`}
                style={{
                    minHeight: '400px',
                    boxShadow: isOn ? '0 0 100px 50px rgba(255, 255, 255, 0.5)' : 'none'
                }}
            >
                <div className="flex flex-col items-center justify-center h-full p-12">
                    {isOn ? (
                        <div className="text-center">
                            <Zap className="w-32 h-32 mx-auto mb-6 text-yellow-500 animate-pulse" />
                            <p className="text-2xl font-bold text-gray-800">켜짐</p>
                        </div>
                    ) : (
                        <div className="text-center">
                            <ZapOff className="w-32 h-32 mx-auto mb-6 text-muted-foreground" />
                            <p className="text-2xl font-bold text-muted-foreground">꺼짐</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Toggle Button */}
            <div className="flex justify-center">
                <button
                    onClick={toggleFlashlight}
                    className={`px-12 py-6 rounded-2xl font-bold text-xl transition-all shadow-lg hover:shadow-xl ${isOn
                            ? 'bg-gray-800 text-white hover:bg-gray-700'
                            : 'bg-primary text-primary-foreground hover:brightness-110'
                        }`}
                >
                    {isOn ? '끄기' : '켜기'}
                </button>
            </div>

            <div className="bg-muted/30 rounded-xl p-6 text-sm text-muted-foreground">
                <h3 className="font-bold text-foreground mb-2">💡 사용 방법</h3>
                <ul className="space-y-1 list-disc list-inside">
                    <li>켜기 버튼을 누르면 화면이 밝게 켜집니다.</li>
                    <li>어두운 곳에서 간단한 조명으로 사용할 수 있습니다.</li>
                    <li>화면 밝기를 최대로 설정하면 더 밝게 사용할 수 있습니다.</li>
                    <li>모바일 기기에서 사용하면 더욱 효과적입니다.</li>
                </ul>
            </div>
        \n            <ToolGuide
                title="손전등"
                intro="화면을 밝게 켜서 손전등으로 사용"
                steps={[
                    "원하시는 옵션이나 값을 화면에 안내된 순서대로 정확하게 기입해 주세요.",
                    "제시된 항목과 보기를 꼼꼼하게 살펴보고 본인에게 맞는 것을 선택합니다.",
                    "모든 입력을 완료한 후 결과 화면에서 계산된 수치나 분석된 내용을 확인합니다.",
                    "결과가 마음에 든다면 캡처하거나 공유하기 버튼을 눌러 지인들에게 공유해보세요!"
                ]}
                tips={[
                    "결과값이 예상과 다르다면 입력한 숫자나 단위를 한 번 더 확인해보는 것이 좋습니다.",
                    "제공되는 다양한 부가 옵션을 함께 활용하면 훨씬 구체적인 형태의 맞춤형 결과를 얻을 수 있습니다.",
                    "모바일과 데스크톱 환경 모두에 완벽하게 최적화되어 있으니 언제 어디서든 편리하게 이용해 보세요."
                ]}
                faqs={[
                    { "q": "이 도구들은 정말로 모두 무료인가요?", "a": "네! Tool Hive에서 제공하는 모든 도구 모음과 심리 테스트들은 가입 등의 번거로운 절차 없이 누구나 100% 무료로 무제한 사용할 수 있습니다." },
                    { "q": "제가 입력한 개인적인 정보 데이터가 서버에 남나요?", "a": "아니요, 사용자가 입력하는 이름, 숫자, 금액 등의 모든 데이터는 방문자의 기기 내 브라우저에서만 실시간으로 연산되며 어떠한 경우에도 외부 서버로 전송되거나 저장되지 않으므로 안심하셔도 됩니다." },
                    { "q": "버튼을 눌러도 반응이 없거나 에러가 생깁니다.", "a": "브라우저의 일시적인 캐시 문제일 수 있습니다. 키보드의 F5 버튼을 누르거나 새로고침을 진행한 후 다시 시도해 보시길 권장하며, 문제가 계속된다면 다른 브라우저 앱을 이용해 보세요." }
                ]}
            />
        </div>
    );
};

export default Flashlight;
