import React, { useState, useEffect } from 'react';
import { ArrowRightLeft, Weight, Clock, Trash2 } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import useHistory from '../hooks/useHistory';

const units = [
    { value: 'mg', label: '밀리그램 (mg)', ratio: 0.001 },
    { value: 'g', label: '그램 (g)', ratio: 1 },
    { value: 'kg', label: '킬로그램 (kg)', ratio: 1000 },
    { value: 't', label: '(메트릭) 톤 (t)', ratio: 1000000 },
    { value: 'oz', label: '온스 (oz)', ratio: 28.3495 },
    { value: 'lb', label: '파운드 (lb)', ratio: 453.592 },
];

const WeightConverter = () => {
    const [amount, setAmount] = useState('');
    const [fromUnit, setFromUnit] = useState('kg');
    const [toUnit, setToUnit] = useState('lb');
    const [result, setResult] = useState('');

    const { history, saveHistory, clearHistory } = useHistory('weight-converter-history');

    useEffect(() => {
        if (amount === '' || isNaN(amount)) {
            setResult('');
            return;
        }

        const fromRatio = units.find(u => u.value === fromUnit)?.ratio || 1;
        const toRatio = units.find(u => u.value === toUnit)?.ratio || 1;

        const valueInGrams = parseFloat(amount) * fromRatio;
        const convertedValue = valueInGrams / toRatio;

        const formattedResult = Number(convertedValue.toPrecision(10)).toString();
        setResult(formattedResult);

        const timer = setTimeout(() => {
            if (amount && formattedResult) {
                saveHistory({
                    from: `${amount} ${fromUnit}`,
                    to: `${formattedResult} ${toUnit}`,
                    date: new Date().toLocaleString()
                });
            }
        }, 2000);

        return () => clearTimeout(timer);
    }, [amount, fromUnit, toUnit]);

    const handleSwap = () => {
        setFromUnit(toUnit);
        setToUnit(fromUnit);
    };

    const handleHistoryClick = (item) => {
        const [val, unit] = item.from.split(' ');
        setAmount(val);
        setFromUnit(unit);
        const [, targetUnit] = item.to.split(' ');
        setToUnit(targetUnit);
    };

    const faqs = [
        { q: '1킬로그램(kg)은 몇 파운드(lb)인가요?', a: '1kg은 약 2.2046파운드(lb)입니다. 미국에서는 체중을 파운드로 표기하기 때문에, 운동·다이어트 관련 정보를 볼 때 자주 변환이 필요합니다. 예: 70kg ≈ 154.3lb.' },
        { q: '1파운드(lb)는 몇 그램(g)인가요?', a: '1파운드는 약 453.59g입니다. 해외 레시피의 재료 무게가 파운드로 표기될 때 그램으로 변환하면 계량이 편리합니다.' },
        { q: '1온스(oz)는 몇 그램인가요?', a: '1온스(troy oz 제외, 상형 온스 기준)는 약 28.35g입니다. 커피 원두나 귀금속 무게 표기에 자주 등장합니다. 금 시세는 주로 troy ounce(약 31.1g) 기준이니 참고하세요.' },
        { q: 'mg와 g, kg의 관계가 궁금합니다.', a: '1g = 1,000mg이며, 1kg = 1,000g = 1,000,000mg입니다. 의약품 용량이나 영양소 함량은 mg 단위로 표기되는 경우가 많습니다.' },
        { q: '영양 성분표에서 본 단위를 변환하고 싶어요.', a: '식품 영양 성분표는 보통 g(그램), mg(밀리그램), mcg(마이크로그램) 단위를 사용합니다. 이 도구에서 g·mg 간 변환이 가능합니다. mcg(마이크로그램)는 0.001mg에 해당합니다.' },
    ];

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <SEO
                title="무게 변환기 | kg, 파운드, 온스, 그램 단위 변환"
                description="킬로그램(kg), 파운드(lb), 온스(oz), 그램(g), 밀리그램(mg) 등 무게 단위를 즉시 변환하세요. 체중 변환, 요리 재료 계량, 해외 직구 배송 무게 계산에 활용하세요."
                keywords="무게변환기, kg파운드변환, 킬로그램파운드, 온스그램변환, lb kg변환, 무게단위계산기, 체중변환"
                faqs={faqs}
            />

            <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold text-text-primary flex items-center justify-center gap-3">
                    <Weight className="w-8 h-8 text-primary" />
                    무게 변환기
                </h1>
                <p className="text-text-secondary">
                    kg · g · mg · 톤 · 파운드 · 온스 — 모든 무게 단위를 즉시 변환하세요.
                </p>
            </div>

            <div className="card p-8 space-y-8">
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-text-secondary">변환할 값</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="숫자를 입력하세요"
                        className="input text-2xl font-bold py-4"
                    />
                </div>

                <div className="grid grid-cols-[1fr,auto,1fr] gap-4 items-center">
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-text-secondary">에서</label>
                        <select
                            value={fromUnit}
                            onChange={(e) => setFromUnit(e.target.value)}
                            className="input cursor-pointer"
                        >
                            {units.map((u) => (
                                <option key={u.value} value={u.value}>{u.label}</option>
                            ))}
                        </select>
                    </div>

                    <button
                        onClick={handleSwap}
                        className="p-3 rounded-full hover:bg-bg-card-hover text-primary transition-colors mt-6"
                        title="단위 바꾸기"
                    >
                        <ArrowRightLeft className="w-5 h-5" />
                    </button>

                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-text-secondary">으로</label>
                        <select
                            value={toUnit}
                            onChange={(e) => setToUnit(e.target.value)}
                            className="input cursor-pointer"
                        >
                            {units.map((u) => (
                                <option key={u.value} value={u.value}>{u.label}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="pt-8 border-t border-border-color text-center space-y-2">
                    <p className="text-text-secondary text-sm">변환 결과</p>
                    <div className="text-4xl font-bold text-primary break-all">
                        {result || '0'}
                        <span className="text-lg text-text-tertiary ml-2 font-normal">
                            {units.find(u => u.value === toUnit)?.value}
                        </span>
                    </div>
                </div>
            </div>

            {history.length > 0 && (
                <div className="card p-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="font-bold flex items-center gap-2">
                            <Clock className="w-5 h-5 text-text-secondary" />
                            최근 변환 기록
                        </h3>
                        <button
                            onClick={clearHistory}
                            className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1"
                        >
                            <Trash2 className="w-3 h-3" />
                            기록 삭제
                        </button>
                    </div>
                    <div className="space-y-2">
                        {history.map((item, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleHistoryClick(item)}
                                className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-bg-card-hover transition-colors text-sm group"
                            >
                                <div className="flex items-center gap-2">
                                    <span className="font-medium">{item.from}</span>
                                    <ArrowRightLeft className="w-3 h-3 text-text-tertiary" />
                                    <span className="font-bold text-primary">{item.to}</span>
                                </div>
                                <span className="text-xs text-text-tertiary opacity-0 group-hover:opacity-100 transition-opacity">
                                    {item.date}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <ToolGuide
                title="무게 변환기 사용 가이드"
                intro="무게 변환기는 킬로그램, 그램, 파운드, 온스, 밀리그램, 톤 등 다양한 질량 단위를 정확하게 상호 변환해 드립니다. 체중 관리, 해외 레시피 재료 계량, 해외 직구 시 배송 무게 계산, 의약품·영양제 용량 확인 등 생활 속 곳곳에서 활용할 수 있습니다."
                steps={[
                    '"변환할 값" 입력란에 변환하려는 무게 숫자를 입력합니다.',
                    '"에서" 드롭다운에서 원래 단위를 선택합니다. (예: 킬로그램)',
                    '"으로" 드롭다운에서 변환할 대상 단위를 선택합니다. (예: 파운드)',
                    '결과가 자동으로 하단에 즉시 표시됩니다.',
                    '⇄ 버튼으로 변환 방향을 손쉽게 바꿀 수 있습니다.',
                ]}
                tips={[
                    '체중을 파운드로 말하는 미국 의학 정보를 볼 때: 1lb ≈ 0.454kg입니다. 내 체중(kg)을 2.2046으로 나누면 파운드가 됩니다.',
                    '해외 직구 시 배송 무게가 파운드(lb)로 표기되면, 이 도구로 kg로 변환해 배송비를 예측할 수 있습니다.',
                    '커피 원두 무게 표기(oz): 12oz 봉지 = 약 340g입니다.',
                    '운동·헬스 정보에서 파운드로 표기된 바벨 무게를 kg으로 변환해 비교하세요.',
                    '의약품 용량(mg)과 일반 무게(g) 간 변환: 500mg = 0.5g입니다.',
                ]}
                faqs={faqs}
            />
        </div>
    );
};

export default WeightConverter;
