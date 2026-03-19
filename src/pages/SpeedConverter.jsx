import React, { useState } from 'react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { Gauge, ArrowRightLeft } from 'lucide-react';
import ShareButtons from '../components/ShareButtons';

const SpeedConverter = () => {
    const [value, setValue] = useState('');
    const [fromUnit, setFromUnit] = useState('kmh');
    const [toUnit, setToUnit] = useState('mph');

    const units = {
        ms: { name: '미터/초 (m/s)', toBase: 1 },
        kmh: { name: '킬로미터/시 (km/h)', toBase: 0.277778 },
        mph: { name: '마일/시 (mph)', toBase: 0.44704 },
        fps: { name: '피트/초 (ft/s)', toBase: 0.3048 },
        knot: { name: '노트 (knot)', toBase: 0.514444 },
        mach: { name: '마하 (Mach)', toBase: 343 }
    };

    const convert = () => {
        if (!value || isNaN(value)) return '';
        const baseValue = parseFloat(value) * units[fromUnit].toBase;
        const result = baseValue / units[toUnit].toBase;
        return result.toLocaleString('ko-KR', { maximumFractionDigits: 4 });
    };

    const swap = () => {
        setFromUnit(toUnit);
        setToUnit(fromUnit);
    };

    const faqs = [
        { q: '100km/h는 몇 mph인가요?', a: '100km/h ≈ 62.14mph입니다. 미국 고속도로 제한 속도(65~75mph)를 한국 기준으로 환산할 때 유용합니다. 65mph ≈ 104.6km/h, 70mph ≈ 112.7km/h.' },
        { q: '1노트(knot)는 몇 km/h인가요?', a: '1노트 = 1.852km/h입니다. 노트는 선박과 항공기의 속도 단위로, 항공 날씨 예보나 선박 속도 표기에서 자주 등장합니다.' },
        { q: '마하(Mach)란 무엇인가요?', a: '마하는 음속을 기준으로 한 속도 단위입니다. 마하 1 = 약 1,235km/h (15°C 표준 대기 기준). 전투기나 초음속 비행기 속도를 표현할 때 사용합니다.' },
        { q: 'm/s와 km/h의 관계는?', a: '1m/s = 3.6km/h입니다. 반대로 1km/h ≈ 0.2778m/s. 과학 실험이나 물리 계산에서는 m/s를, 일상적 속도 표기에는 km/h를 사용합니다.' },
    ];

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <SEO
                title="속도 변환기 | km/h, mph, m/s, 노트, 마하 단위 변환"
                description="킬로미터/시(km/h), 마일/시(mph), 미터/초(m/s), 노트(knot), 마하(Mach) 등 속도 단위를 즉시 변환하세요. 해외 운전, 항공·해상 속도 변환에 활용하세요."
                keywords="속도변환기, kmh mph변환, 마일킬로미터변환, 노트변환, 마하변환, 속도계산기, speed converter"
                faqs={faqs}
            />

            <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl mb-2 shadow-lg">
                    <Gauge className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">속도 변환기</h1>
                <p className="text-gray-600 dark:text-gray-400">km/h · mph · m/s · 노트 · 마하 — 모든 속도 단위를 즉시 변환하세요.</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">변환할 값</label>
                    <div className="flex gap-4">
                        <input
                            type="number"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            placeholder="숫자 입력"
                            className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white"
                        />
                        <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)}
                            className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white">
                            {Object.entries(units).map(([key, unit]) => (
                                <option key={key} value={key}>{unit.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="flex justify-center mb-6">
                    <button onClick={swap} className="p-3 bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-300 rounded-full hover:bg-orange-200 transition-colors">
                        <ArrowRightLeft className="w-5 h-5" />
                    </button>
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">변환 결과</label>
                    <div className="flex gap-4">
                        <div className="flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg font-semibold text-lg dark:text-white">
                            {convert() || '0'}
                        </div>
                        <select value={toUnit} onChange={(e) => setToUnit(e.target.value)}
                            className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white">
                            {Object.entries(units).map(([key, unit]) => (
                                <option key={key} value={key}>{unit.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
                    <h3 className="font-semibold dark:text-white mb-2">💡 자주 쓰는 환산값</h3>
                    <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                        <p>• 100km/h ≈ 62.14mph ≈ 27.78m/s</p>
                        <p>• 1노트 = 1.852km/h (해상·항공 속도)</p>
                        <p>• 마하 1 ≈ 1,235km/h (음속, 15°C 기준)</p>
                        <p>• 1m/s = 3.6km/h</p>
                    </div>
                </div>
            </div>

            <ShareButtons />

            <ToolGuide
                title="속도 변환기 사용 가이드"
                intro="속도 변환기는 km/h, mph, m/s, 노트, 마하 등 다양한 속도 단위를 즉시 상호 변환해 드립니다. 해외 여행 시 도로 제한속도 파악, 항공·선박 속도 이해, 물리·과학 학습 등에 활용하세요."
                steps={[
                    '"변환할 값" 입력란에 속도 숫자를 입력합니다.',
                    '오른쪽 드롭다운에서 현재 단위를 선택합니다. (예: km/h)',
                    '아래 드롭다운에서 변환할 단위를 선택합니다. (예: mph)',
                    '결과가 즉시 자동 계산됩니다.',
                    '⇄ 버튼으로 변환 방향을 손쉽게 바꿀 수 있습니다.',
                ]}
                tips={[
                    '미국·영국 고속도로는 mph 단위: 70mph ≈ 112.7km/h.',
                    '항공기 순항 속도(약 900km/h)는 마하 0.73 수준입니다.',
                    '선박 뉴스에서 "15노트"는 약 27.78km/h입니다.',
                    '물리 문제에서 m/s를 km/h로: 값에 3.6을 곱하면 됩니다.',
                ]}
                faqs={faqs}
            />
        </div>
    );
};

export default SpeedConverter;
