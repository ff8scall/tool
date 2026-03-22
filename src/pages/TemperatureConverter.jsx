import React, { useState } from 'react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { Thermometer, RefreshCw } from 'lucide-react';
import ShareButtons from '../components/ShareButtons';
import { useLanguage } from '../context/LanguageContext';

const TemperatureConverter = () => {
    const { lang, t } = useLanguage();
    const isEn = lang === 'en';

    const [values, setValues] = useState({
        celsius: '',
        fahrenheit: '',
        kelvin: ''
    });

    const convert = (type, value) => {
        if (value === '') {
            setValues({ celsius: '', fahrenheit: '', kelvin: '' });
            return;
        }

        const val = parseFloat(value);
        if (isNaN(val)) return;

        let c, f, k;

        if (type === 'celsius') {
            c = val;
            f = (val * 9 / 5) + 32;
            k = val + 273.15;
        } else if (type === 'fahrenheit') {
            f = val;
            c = (val - 32) * 5 / 9;
            k = (val - 32) * 5 / 9 + 273.15;
        } else if (type === 'kelvin') {
            k = val;
            c = val - 273.15;
            f = (val - 273.15) * 9 / 5 + 32;
        }

        setValues({
            celsius: type === 'celsius' ? value : c.toFixed(2).replace(/\.00$/, ''),
            fahrenheit: type === 'fahrenheit' ? value : f.toFixed(2).replace(/\.00$/, ''),
            kelvin: type === 'kelvin' ? value : k.toFixed(2).replace(/\.00$/, '')
        });
};
    const handleChange = (e) => {
        const { name, value } = e.target;
        convert(name, value);
};
    const reset = () => {
        setValues({ celsius: '', fahrenheit: '', kelvin: '' });
};
    const faqs = isEn ? [
        { q: 'What is the conversion formula for Celsius (°C) and Fahrenheit (°F)?', a: 'Celsius to Fahrenheit: (°C × 9/5) + 32 = °F\nFahrenheit to Celsius: (°F − 32) × 5/9 = °C\nExample: 36.5°C (normal body temp) = 97.7°F, 100°F = 37.78°C' },
        { q: 'What is Kelvin (K)?', a: 'Kelvin is the base unit of temperature in the International System of Units (SI). 0K is absolute zero (-273.15°C), the lowest possible temperature. Celsius to Kelvin: °C + 273.15 = K' },
        { q: 'What are the freezing and boiling points of water in each unit?', a: 'Freezing point: 0°C = 32°F = 273.15K\nBoiling point: 100°C = 212°F = 373.15K\nThese points help understand the differences between the scales.' },
        { q: 'US weather apps use Fahrenheit, which is confusing.', a: 'The US uses Fahrenheit (°F). Quick references: 32°F (0°C, freezing), 72°F (22.2°C, comfortable room), 98.6°F (37°C, body temp), 212°F (100°C, boiling).' },
        { q: 'My oven temperature is in Fahrenheit. How do I convert it?', a: 'Many foreign recipes use Fahrenheit. Examples: 350°F ≈ 176.7°C, 400°F ≈ 204.4°C, 450°F ≈ 232.2°C. Just enter the oven temp in the Fahrenheit field to get Celsius instantly.' },
    ] : [
        { q: '섭씨(°C)와 화씨(°F) 변환 공식이 궁금합니다.', a: '섭씨→화씨: (°C × 9/5) + 32 = °F\n화씨→섭씨: (°F − 32) × 5/9 = °C\n예: 36.5°C(정상 체온) = 97.7°F, 100°F = 37.78°C' },
        { q: '켈빈(K)이란 무엇인가요?', a: '켈빈은 절대 온도 단위로, 과학 분야에서 주로 사용됩니다. 0K는 이론상 가장 낮은 온도인 절대 영도(-273.15°C)입니다. 섭씨→켈빈: °C + 273.15 = K' },
        { q: '물의 끓는점과 어는점은 각 단위로 몇 도인가요?', a: '물의 어는점: 0°C = 32°F = 273.15K\n물의 끓는점: 100°C = 212°F = 373.15K\n이 두 값을 기준점으로 섭씨/화씨의 차이를 이해할 수 있습니다.' },
        { q: '미국 날씨 앱에서 화씨로 나와서 잘 모르겠어요.', a: '미국은 화씨(°F)를 사용합니다. 간단히 기억할 기준점: 32°F(0°C, 어는점), 72°F(22.2°C, 쾌적한 실내), 98.6°F(37°C, 체온), 212°F(100°C, 끓는점). 이 도구에서 빠르게 변환하세요.' },
        { q: '오븐 온도가 화씨로 표기됐어요. 어떻게 변환하나요?', a: '해외 레시피는 화씨 기준인 경우가 많습니다. 예: 350°F = 약 176.7°C, 400°F = 약 204.4°C, 450°F = 약 232.2°C. 화씨 입력란에 오븐 온도를 넣으면 자동으로 섭씨가 표시됩니다.' },
    ];

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <SEO
                title={t('tools.temperature.title')}
                description={t('tools.temperature.description')}
                keywords={isEn ? "temperature converter, celsius to fahrenheit, kelvin to celsius, fahrenheit to celsius, unit converter" : "온도변환기, 섭씨화씨변환, 켈빈변환, 화씨섭씨계산, 온도계산기, 미국온도변환, celsius fahrenheit kelvin"}
                faqs={faqs}
            />

            <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-3">
                    <Thermometer className="w-8 h-8 text-red-500" />
                    {isEn ? 'Temperature Converter' : '온도 변환기'}
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    {isEn ? 'Convert simultaneously between Celsius (°C), Fahrenheit (°F), and Kelvin (K) in real-time.' : '섭씨(°C) · 화씨(°F) · 켈빈(K) — 세 가지 온도 단위를 동시에 실시간 변환하세요.'}
                </p>
            </div>

        <div className="card p-6 space-y-6">
                <div className="grid gap-6">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            {isEn ? 'Celsius (°C)' : '섭씨 (Celsius, °C)'}
                        </label>
                        <input
                            type="number"
                            name="celsius"
                            value={values.celsius}
                            onChange={handleChange}
                            placeholder={isEn ? "e.g. 36.5" : "예: 36.5"}
                            className="input w-full text-lg"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            {isEn ? 'Fahrenheit (°F)' : '화씨 (Fahrenheit, °F)'}
                        </label>
                        <input
                            type="number"
                            name="fahrenheit"
                            value={values.fahrenheit}
                            onChange={handleChange}
                            placeholder={isEn ? "e.g. 98.6" : "예: 98.6"}
                            className="input w-full text-lg"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            {isEn ? 'Kelvin (K)' : '켈빈 (Kelvin, K)'}
                        </label>
                        <input
                            type="number"
                            name="kelvin"
                            value={values.kelvin}
                            onChange={handleChange}
                            placeholder={isEn ? "e.g. 273.15" : "예: 273.15"}
                            className="input w-full text-lg"
                        />
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <button
                        onClick={reset}
                        className="btn btn-secondary flex items-center gap-2"
                    >
                        <RefreshCw className="w-4 h-4" />
                        {isEn ? 'Reset' : '초기화'}
                    </button>
                </div>
            </div>

            <ShareButtons />

            <div className="card p-6 bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    ℹ️ {isEn ? 'Temperature Formulas & Key Points' : '온도 변환 공식 & 주요 기준점'}
                </h3>
                {isEn ? (
                    <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                        <li>• <strong>Celsius to Fahrenheit:</strong> (°C × 9/5) + 32 = °F</li>
                        <li>• <strong>Fahrenheit to Celsius:</strong> (°F − 32) × 5/9 = °C</li>
                        <li>• <strong>Celsius to Kelvin:</strong> °C + 273.15 = K</li>
                        <li>• <strong>Kelvin to Celsius:</strong> K − 273.15 = °C</li>
                        <li className="pt-2 border-t border-blue-200 dark:border-blue-700">• Water Freezing Point: 0°C = 32°F = 273.15K</li>
                        <li>• Water Boiling Point: 100°C = 212°F = 373.15K</li>
                        <li>• Normal Body Temp: 37°C = 98.6°F</li>
                        <li>• Absolute Zero: -273.15°C = -459.67°F = 0K</li>
                    </ul>
                ) : (
                    <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                        <li>• <strong>섭씨 → 화씨:</strong> (°C × 9/5) + 32 = °F</li>
                        <li>• <strong>화씨 → 섭씨:</strong> (°F − 32) × 5/9 = °C</li>
                        <li>• <strong>섭씨 → 켈빈:</strong> °C + 273.15 = K</li>
                        <li>• <strong>켈빈 → 섭씨:</strong> K − 273.15 = °C</li>
                        <li className="pt-2 border-t border-blue-200 dark:border-blue-700">• 물 어는점: 0°C = 32°F = 273.15K</li>
                        <li>• 물 끓는점: 100°C = 212°F = 373.15K</li>
                        <li>• 체온(정상): 37°C = 98.6°F</li>
                        <li>• 절대 영도: -273.15°C = -459.67°F = 0K</li>
                    </ul>
                )}
            </div>

            <ToolGuide
                title={isEn ? "Temperature Converter Guide" : "온도 변환기 사용 가이드"}
                intro={isEn
                    ? "The Temperature Converter translates between Celsius (°C), Fahrenheit (°F), and Kelvin (K) in real-time. Simply type in any field and the others will automatically update."
                    : "온도 변환기는 전 세계에서 사용되는 세 가지 온도 스케일 — 섭씨(Celsius, °C), 화씨(Fahrenheit, °F), 켈빈(Kelvin, K) — 을 실시간으로 동시에 변환해줍니다. 하나의 입력란에 값을 입력하면 나머지 두 단위로 자동 변환되어 표시됩니다."}
                steps={isEn ? [
                    'Enter a temperature value into the Celsius, Fahrenheit, or Kelvin input field.',
                    'The equivalent temperatures in the other two units will instantly be calculated.',
                    'To enter a different temperature, simply edit the value in any box.',
                    'Click the "Reset" button to clear all values.'
                ] : [
                    '섭씨, 화씨, 켈빈 중 알고 있는 온도 값을 해당 입력란에 입력합니다.',
                    '나머지 두 단위의 값이 자동으로 즉시 계산되어 표시됩니다.',
                    '다른 온도를 입력하려면 해당 칸의 값을 수정하면 됩니다.',
                    '"초기화" 버튼을 클릭하면 모든 값이 초기화됩니다.',
                ]}
                tips={isEn ? [
                    'US apps usually default to Fahrenheit. Convert 72°F to Celsius to see it’s around 22.2°C (perfect room temp).',
                    'Oven temps in foreign recipes are often in Fahrenheit. 350°F converts to around 177°C.',
                    'A body temp of 38°C equals 100.4°F, which is useful when reading US medical information on fevers.',
                    'For science experiments requiring absolute temperature (K): Room temp of 25°C = 298.15K.'
                ] : [
                    '미국 앱·서비스는 화씨를 기본으로 사용합니다. 72°F를 섭씨로 변환하면 약 22.2°C(쾌적한 실내 온도)입니다.',
                    '해외 요리 레시피의 오븐 온도는 화씨 기준인 경우가 많습니다. 350°F를 변환해보면 약 177°C입니다.',
                    '체온 38°C는 화씨로 100.4°F로, 미국 기준 발열(100°F 이상) 여부를 비교할 수 있습니다.',
                    '과학 실험에서 절대온도(K)가 필요할 때: 실온 25°C = 298.15K입니다.',
                ]}
                faqs={faqs}
            />
        </div>
    );
};
export default TemperatureConverter;
