import React, { useState } from 'react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { Ruler, ArrowRightLeft } from 'lucide-react';
import ShareButtons from '../components/ShareButtons';

const AreaConverter = () => {
    const [value, setValue] = useState('');
    const [fromUnit, setFromUnit] = useState('sqm');
    const [toUnit, setToUnit] = useState('pyeong');

    const units = {
        sqm: { name: '제곱미터 (㎡)', toBase: 1 },
        pyeong: { name: '평 (坪)', toBase: 3.305785 },
        sqft: { name: '제곱피트 (ft²)', toBase: 0.092903 },
        sqyd: { name: '제곱야드 (yd²)', toBase: 0.836127 },
        acre: { name: '에이커 (acre)', toBase: 4046.856 },
        hectare: { name: '헥타르 (ha)', toBase: 10000 },
        sqkm: { name: '제곱킬로미터 (km²)', toBase: 1000000 },
        sqmi: { name: '제곱마일 (mi²)', toBase: 2589988 }
    };

    const convert = () => {
        if (!value || isNaN(value)) return '';
        const baseValue = parseFloat(value) * units[fromUnit].toBase;
        const result = baseValue / units[toUnit].toBase;
        return result.toLocaleString('ko-KR', { maximumFractionDigits: 6 });
    };

    const swap = () => {
        setFromUnit(toUnit);
        setToUnit(fromUnit);
    };

    const faqs = [
        { q: '1평은 몇 제곱미터(㎡)인가요?', a: '1평은 약 3.306㎡(정확히는 3.3058...㎡)입니다. 반대로 1㎡는 약 0.3025평입니다. 예: 아파트 84㎡ = 약 25.4평. 부동산 면적 표기에서 ㎡와 평을 빠르게 변환해보세요.' },
        { q: '1에이커(acre)는 몇 평인가요?', a: '1에이커는 약 4,047㎡로, 평으로 환산하면 약 1,224평입니다. 미국·호주 등 영어권 국가의 토지 면적은 에이커 단위를 주로 사용합니다.' },
        { q: '1헥타르(ha)는 몇 평인가요?', a: '1헥타르는 10,000㎡로, 약 3,025평입니다. 농지나 대규모 토지 면적을 표시할 때 헥타르를 많이 씁니다. 예: 축구장 1개 ≈ 약 1헥타르.' },
        { q: '제곱피트(ft²)는 어디서 주로 쓰나요?', a: '미국·영국의 부동산 문화에서 집 면적을 제곱피트로 표기합니다. 1ft² = 약 0.0929㎡입니다. 예: 1,000ft² ≈ 92.9㎡ ≈ 28.1평.' },
        { q: '아파트 분양 광고에서 공급면적과 전용면적이 다른데요.', a: '이 도구는 단위 변환 도구로, ㎡↔평 변환만 지원합니다. 공급면적과 전용면적의 차이는 공용면적(복도, 계단 등) 포함 여부에 따라 다릅니다. 전용면적 기준으로 변환해 실거주 공간을 파악하세요.' },
    ];

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <SEO
                title="면적 변환기 | 제곱미터, 평, 에이커, 헥타르 단위 변환"
                description="제곱미터(㎡)와 평 변환, 에이커, 헥타르, 제곱피트 등 다양한 면적 단위를 간편하게 변환하세요. 부동산 평 계산, 농지 면적 변환에 활용하세요."
                keywords="면적변환기, 제곱미터평변환, 평계산기, 에이커변환, 헥타르계산, 아파트평수변환, 부동산면적계산"
                faqs={faqs}
            />

            <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold text-foreground flex items-center justify-center gap-3">
                    <Ruler className="w-8 h-8 text-primary" />
                    면적 변환기
                </h1>
                <p className="text-muted-foreground">
                    ㎡ · 평 · 에이커 · 헥타르 · ft² — 부동산, 농지, 인테리어 면적을 즉시 변환하세요.
                </p>
            </div>

            <div className="card p-6 space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">변환할 값</label>
                    <div className="flex gap-3">
                        <input
                            type="number"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            placeholder="숫자 입력"
                            className="input flex-1"
                        />
                        <select
                            value={fromUnit}
                            onChange={(e) => setFromUnit(e.target.value)}
                            className="input w-44"
                        >
                            {Object.entries(units).map(([key, unit]) => (
                                <option key={key} value={key}>{unit.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="flex justify-center">
                    <button
                        onClick={swap}
                        className="p-2 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
                        title="단위 바꾸기"
                    >
                        <ArrowRightLeft className="w-5 h-5" />
                    </button>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">변환 결과</label>
                    <div className="flex gap-3">
                        <div className="input flex-1 bg-secondary/50 flex items-center font-bold text-lg">
                            {convert() || '0'}
                        </div>
                        <select
                            value={toUnit}
                            onChange={(e) => setToUnit(e.target.value)}
                            className="input w-44"
                        >
                            {Object.entries(units).map(([key, unit]) => (
                                <option key={key} value={key}>{unit.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="bg-primary/5 rounded-xl p-4 text-sm">
                    <h3 className="font-bold mb-2">💡 자주 쓰는 환산 기준</h3>
                    <div className="text-muted-foreground space-y-1 grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <p>1평 ≈ 3.306㎡</p>
                        <p>1에이커 ≈ 1,224평</p>
                        <p>1헥타르 ≈ 3,025평</p>
                        <p>1ft² ≈ 0.093㎡</p>
                        <p>84㎡ ≈ 25.4평</p>
                        <p>100㎡ ≈ 30.25평</p>
                    </div>
                </div>
            </div>

            <ShareButtons />

            <ToolGuide
                title="면적 변환기 사용 가이드"
                intro="면적 변환기는 ㎡(제곱미터), 평, 에이커, 헥타르, 제곱피트 등 전 세계에서 사용되는 다양한 면적 단위를 정확하게 변환해 드립니다. 아파트·토지 면적 파악, 해외 부동산 비교, 농지 계산, 인테리어 공간 계획 등 다양한 상황에서 활용하세요."
                steps={[
                    '"변환할 값" 입력란에 면적 숫자를 입력합니다.',
                    '입력 값 오른쪽 드롭다운에서 현재 단위를 선택합니다. (예: ㎡)',
                    '아래 드롭다운에서 변환하고 싶은 단위를 선택합니다. (예: 평)',
                    '결과가 자동으로 계산되어 즉시 표시됩니다.',
                    '⇄ 버튼으로 변환 방향을 한 번에 바꿀 수 있습니다.',
                ]}
                tips={[
                    '한국 아파트 면적 표기: 공급면적 84㎡는 약 25.4평, 전용면적 59㎡는 약 17.8평입니다.',
                    '미국 부동산 리스팅에서 "1,200 sq ft"라고 나오면 약 111.5㎡ ≈ 33.7평입니다.',
                    '농지 면적 계산: 1,000평 = 약 3,306㎡ = 약 0.33헥타르입니다.',
                    '실내 인테리어 계획 시 ㎡와 평 모두 알아야 자재 견적을 비교하기 편합니다.',
                    '축구장 크기(국제 기준 약 105×68m = 7,140㎡)와 비교하면 대형 공간의 규모를 가늠할 수 있습니다.',
                ]}
                faqs={faqs}
            />
        </div>
    );
};

export default AreaConverter;
