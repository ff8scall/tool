import React, { useState } from 'react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { ArrowLeftRight, Copy, Download, Check, FileJson, FileSpreadsheet } from 'lucide-react';

const CsvJsonConverter = () => {
    const [mode, setMode] = useState('csvToJson'); // csvToJson or jsonToCsv
    const [csvInput, setCsvInput] = useState('');
    const [jsonInput, setJsonInput] = useState('');
    const [output, setOutput] = useState('');
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);

    const csvToJson = (csv) => {
        try {
            const lines = csv.trim().split('\n');
            if (lines.length < 2) {
                throw new Error('CSV는 최소 헤더와 1개 이상의 데이터 행이 필요합니다.');
            }

            const headers = lines[0].split(',').map(h => h.trim());
            const result = [];

            for (let i = 1; i < lines.length; i++) {
                const values = lines[i].split(',').map(v => v.trim());
                const obj = {};
                headers.forEach((header, index) => {
                    // Try to parse as number if possible
                    const value = values[index];
                    obj[header] = isNaN(value) ? value : Number(value);
                });
                result.push(obj);
            }

            return JSON.stringify(result, null, 2);
        } catch (err) {
            throw new Error(`CSV 변환 오류: ${err.message}`);
        }
    };

    const jsonToCsv = (json) => {
        try {
            const data = JSON.parse(json);

            if (!Array.isArray(data)) {
                throw new Error('JSON은 배열 형식이어야 합니다.');
            }

            if (data.length === 0) {
                throw new Error('빈 배열은 변환할 수 없습니다.');
            }

            // Get headers from first object
            const headers = Object.keys(data[0]);
            const csvLines = [headers.join(',')];

            // Convert each object to CSV row
            data.forEach(obj => {
                const values = headers.map(header => {
                    const value = obj[header];
                    // Wrap in quotes if contains comma
                    if (typeof value === 'string' && value.includes(',')) {
                        return `"${value}"`;
                    }
                    return value;
                });
                csvLines.push(values.join(','));
            });

            return csvLines.join('\n');
        } catch (err) {
            throw new Error(`JSON 변환 오류: ${err.message}`);
        }
    };

    const handleConvert = () => {
        setError('');
        try {
            if (mode === 'csvToJson') {
                if (!csvInput.trim()) {
                    setError('CSV 데이터를 입력해주세요.');
                    return;
                }
                const result = csvToJson(csvInput);
                setOutput(result);
            } else {
                if (!jsonInput.trim()) {
                    setError('JSON 데이터를 입력해주세요.');
                    return;
                }
                const result = jsonToCsv(jsonInput);
                setOutput(result);
            }
        } catch (err) {
            setError(err.message);
            setOutput('');
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(output);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleDownload = () => {
        const blob = new Blob([output], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = mode === 'csvToJson' ? 'output.json' : 'output.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const loadSample = () => {
        if (mode === 'csvToJson') {
            setCsvInput(`name,age,city
John,30,Seoul
Jane,25,Busan
Bob,35,Incheon`);
        } else {
            setJsonInput(`[
  {
    "name": "John",
    "age": 30,
    "city": "Seoul"
  },
  {
    "name": "Jane",
    "age": 25,
    "city": "Busan"
  },
  {
    "name": "Bob",
    "age": 35,
    "city": "Incheon"
  }
]`);
        }
    };

    const switchMode = () => {
        setMode(mode === 'csvToJson' ? 'jsonToCsv' : 'csvToJson');
        setCsvInput('');
        setJsonInput('');
        setOutput('');
        setError('');
    };

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            <SEO
                title="CSV ↔ JSON 변환기 - 데이터 변환 도구"
                description="CSV와 JSON 형식을 상호 변환하세요. 데이터 처리와 API 작업에 필수적인 도구입니다."
                keywords={['csv', 'json', 'converter', '변환기', 'csv to json', 'json to csv', 'data']}
            />

            <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-3">
                    <ArrowLeftRight className="w-8 h-8 text-purple-500" />
                    CSV ↔ JSON 변환기
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    CSV와 JSON 형식을 쉽게 변환하세요
                </p>
            </div>

            {/* Mode Toggle */}
            <div className="flex justify-center">
                <div className="inline-flex items-center gap-2 bg-gray-100 dark:bg-gray-800 p-2 rounded-lg">
                    <div className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${mode === 'csvToJson' ? 'bg-white dark:bg-gray-700 shadow-md' : ''
                        }`}>
                        <FileSpreadsheet className="w-4 h-4" />
                        CSV
                    </div>
                    <button
                        onClick={switchMode}
                        className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                        <ArrowLeftRight className="w-5 h-5" />
                    </button>
                    <div className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${mode === 'jsonToCsv' ? 'bg-white dark:bg-gray-700 shadow-md' : ''
                        }`}>
                        <FileJson className="w-4 h-4" />
                        JSON
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Input */}
                <div className="card p-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="font-bold text-lg flex items-center gap-2">
                            {mode === 'csvToJson' ? (
                                <>
                                    <FileSpreadsheet className="w-5 h-5 text-green-500" />
                                    CSV 입력
                                </>
                            ) : (
                                <>
                                    <FileJson className="w-5 h-5 text-blue-500" />
                                    JSON 입력
                                </>
                            )}
                        </h3>
                        <button
                            onClick={loadSample}
                            className="text-sm text-blue-500 hover:text-blue-600"
                        >
                            샘플 불러오기
                        </button>
                    </div>

                    <textarea
                        value={mode === 'csvToJson' ? csvInput : jsonInput}
                        onChange={(e) => mode === 'csvToJson' ? setCsvInput(e.target.value) : setJsonInput(e.target.value)}
                        className="input w-full h-[400px] font-mono text-sm"
                        placeholder={mode === 'csvToJson'
                            ? 'CSV 데이터를 입력하세요...\n예:\nname,age,city\nJohn,30,Seoul'
                            : 'JSON 배열을 입력하세요...\n예:\n[\n  {"name": "John", "age": 30}\n]'
                        }
                    />

                    <button
                        onClick={handleConvert}
                        className="btn btn-primary w-full flex items-center justify-center gap-2"
                    >
                        <ArrowLeftRight className="w-5 h-5" />
                        {mode === 'csvToJson' ? 'JSON으로 변환' : 'CSV로 변환'}
                    </button>
                </div>

                {/* Output */}
                <div className="card p-6 space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="font-bold text-lg flex items-center gap-2">
                            {mode === 'csvToJson' ? (
                                <>
                                    <FileJson className="w-5 h-5 text-blue-500" />
                                    JSON 출력
                                </>
                            ) : (
                                <>
                                    <FileSpreadsheet className="w-5 h-5 text-green-500" />
                                    CSV 출력
                                </>
                            )}
                        </h3>
                        {output && (
                            <div className="flex gap-2">
                                <button
                                    onClick={handleCopy}
                                    className="btn btn-ghost btn-sm flex items-center gap-1"
                                >
                                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                    {copied ? '복사됨' : '복사'}
                                </button>
                                <button
                                    onClick={handleDownload}
                                    className="btn btn-ghost btn-sm flex items-center gap-1"
                                >
                                    <Download className="w-4 h-4" />
                                    다운로드
                                </button>
                            </div>
                        )}
                    </div>

                    {error && (
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                            <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
                        </div>
                    )}

                    <textarea
                        value={output}
                        readOnly
                        className="input w-full h-[400px] font-mono text-sm bg-gray-50 dark:bg-gray-900"
                        placeholder="변환 결과가 여기에 표시됩니다..."
                    />
                </div>
            </div>

            {/* Info */}
            <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl text-sm space-y-2">
                    <p className="font-bold text-blue-800 dark:text-blue-200">CSV 형식 안내</p>
                    <ul className="space-y-1 text-blue-700 dark:text-blue-300 list-disc list-inside">
                        <li>첫 번째 줄은 헤더(컬럼명)여야 합니다</li>
                        <li>각 값은 쉼표(,)로 구분됩니다</li>
                        <li>쉼표가 포함된 값은 따옴표로 감싸세요</li>
                    </ul>
                </div>

                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl text-sm space-y-2">
                    <p className="font-bold text-purple-800 dark:text-purple-200">JSON 형식 안내</p>
                    <ul className="space-y-1 text-purple-700 dark:text-purple-300 list-disc list-inside">
                        <li>배열 형식이어야 합니다 [ ]</li>
                        <li>각 객체는 동일한 키를 가져야 합니다</li>
                        <li>유효한 JSON 문법을 사용하세요</li>
                    </ul>
                </div>
            </div>
        \n            <ToolGuide
                title="CSV ↔ JSON 변환기"
                intro="CSV와 JSON 상호 변환"
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

export default CsvJsonConverter;
