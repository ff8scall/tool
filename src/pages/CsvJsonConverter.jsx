import React, { useState } from 'react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { ArrowLeftRight, Copy, Download, Check, FileJson, FileSpreadsheet } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const CsvJsonConverter = () => {
    const { lang, t } = useLanguage();
    const isEn = lang === 'en';

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
                throw new Error(isEn ? 'CSV requires at minimum one header mapping and subsequent row mapping.' : 'CSV는 최소 헤더와 1개 이상의 데이터 행이 필요합니다.');
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
            throw new Error((isEn ? 'CSV Convert Error: ' : 'CSV 변환 오류: ') + err.message);
        }
    };

    const jsonToCsv = (json) => {
        try {
            const data = JSON.parse(json);

            if (!Array.isArray(data)) {
                throw new Error(isEn ? 'JSON target must ideally be a structural array.' : 'JSON은 배열 형식이어야 합니다.');
            }

            if (data.length === 0) {
                throw new Error(isEn ? 'Empty arrays cannot be exported seamlessly.' : '빈 배열은 변환할 수 없습니다.');
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
            throw new Error((isEn ? 'JSON Convert Error: ' : 'JSON 변환 오류: ') + err.message);
        }
    };

    const handleConvert = () => {
        setError('');
        try {
            if (mode === 'csvToJson') {
                if (!csvInput.trim()) {
                    setError(isEn ? 'Please provide CSV payload items.' : 'CSV 데이터를 입력해주세요.');
                    return;
                }
                const result = csvToJson(csvInput);
                setOutput(result);
            } else {
                if (!jsonInput.trim()) {
                    setError(isEn ? 'Please populate JSON entries.' : 'JSON 데이터를 입력해주세요.');
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

    const titleText = t('tools.csv-json.title');
    const descText = t('tools.csv-json.description');
    const keywordsText = t('tools.csv-json.keywords');

    const faqs = isEn ? [
        {
            q: "How does the tool handle missing values entirely?",
            a: "This tool strictly formats items maintaining keys even with empty elements preventing JSON offset rendering completely."
        },
        {
            q: "Does my proprietary data load onto servers internally?",
            a: "Absolutely not! Transformation utilizes front-end pure Javascript. Elements don't leave your current connection terminal offline whatsoever."
        }
    ] : [
        { "q": "누락된 값은 어떻게 처리되나요?", "a": "데이터 구성 중 빈 값이 있으면 공백(null 혹은 빈 문자열) 상태로 구조를 유지하며 변환됩니다." },
        { "q": "입력한 데이터가 서버에 저장되나요?", "a": "아니요, 모든 데이터 변환 작업은 사용자의 브라우저 내에서만 처리되며 어떠한 경우에도 외부 서버로 전송되지 않습니다." }
    ];

    const steps = isEn ? [
        "Pick a directional translation target by utilizing the main center toggle.",
        "Optionally load Sample Data using 'Load Sample' to view exactly how configurations flow.",
        "Input explicit elements inside your origin box effectively.",
        "Export the modified outputs directly downloading `.json` or `.csv` files intuitively."
    ] : [
        "화면 중앙의 교체 버튼을 이용해 CSV를 JSON으로 바꿀지, 반대로 바꿀지 정합니다.",
        "실제 변환할 데이터를 좌측 입력창에 붙여넣습니다 (샘플 버튼으로 예시 확인 가능).",
        "가운데 '변환하기' 버튼을 누르면 실시간으로 결과가 생성됩니다.",
        "생성된 결과를 직접 복사하거나 '다운로드' 버튼으로 파일로 저장하세요."
    ];

    return (
        <div className="max-w-6xl mx-auto space-y-6">
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
                    <ArrowLeftRight className="w-8 h-8 text-purple-500" />
                    {isEn ? 'CSV ↔ JSON Format Converter' : 'CSV ↔ JSON 변환기'}
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    {isEn ? 'Convert structured payloads gracefully between CSV and JSON instantly.' : 'CSV와 JSON 형식을 쉽게 변환하세요'}
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
                        title={isEn ? "Switch format" : "포맷 전환"}
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
                <div className="card p-6 space-y-4 border border-border bg-card">
                    <div className="flex items-center justify-between">
                        <h3 className="font-bold text-lg flex items-center gap-2">
                            {mode === 'csvToJson' ? (
                                <>
                                    <FileSpreadsheet className="w-5 h-5 text-green-500" />
                                    {isEn ? 'Parse CSV' : 'CSV 입력'}
                                </>
                            ) : (
                                <>
                                    <FileJson className="w-5 h-5 text-blue-500" />
                                    {isEn ? 'Parse JSON' : 'JSON 입력'}
                                </>
                            )}
                        </h3>
                        <button
                            onClick={loadSample}
                            className="text-sm font-semibold text-blue-500 hover:text-blue-600 transition-colors"
                        >
                            {isEn ? 'Load Sample' : '샘플 불러오기'}
                        </button>
                    </div>

                    <textarea
                        value={mode === 'csvToJson' ? csvInput : jsonInput}
                        onChange={(e) => mode === 'csvToJson' ? setCsvInput(e.target.value) : setJsonInput(e.target.value)}
                        className="input w-full h-[400px] font-mono text-sm"
                        placeholder={mode === 'csvToJson'
                            ? (isEn ? 'Type CSV Data lines...\nExample:\nname,age,city\nJohn,30,Seoul' : 'CSV 데이터를 입력하세요...\n예:\nname,age,city\nJohn,30,Seoul')
                            : (isEn ? 'Enter Array structured JSON...\nExample:\n[\n  {"name": "John", "age": 30}\n]' : 'JSON 배열을 입력하세요...\n예:\n[\n  {"name": "John", "age": 30}\n]')
                        }
                    />

                    <button
                        onClick={handleConvert}
                        className="btn btn-primary w-full flex items-center justify-center gap-2 py-3 font-bold text-base"
                    >
                        <ArrowLeftRight className="w-5 h-5" />
                        {mode === 'csvToJson' ? (isEn ? 'Convert to JSON' : 'JSON으로 변환') : (isEn ? 'Convert to CSV' : 'CSV로 변환')}
                    </button>
                </div>

                {/* Output */}
                <div className="card p-6 space-y-4 border border-border bg-card">
                    <div className="flex items-center justify-between">
                        <h3 className="font-bold text-lg flex items-center gap-2">
                            {mode === 'csvToJson' ? (
                                <>
                                    <FileJson className="w-5 h-5 text-blue-500" />
                                    {isEn ? 'Rendered JSON' : 'JSON 출력'}
                                </>
                            ) : (
                                <>
                                    <FileSpreadsheet className="w-5 h-5 text-green-500" />
                                    {isEn ? 'Rendered CSV' : 'CSV 출력'}
                                </>
                            )}
                        </h3>
                        {output && (
                            <div className="flex gap-2">
                                <button
                                    onClick={handleCopy}
                                    className="btn btn-ghost btn-sm flex items-center gap-1 font-medium bg-secondary hover:bg-muted/80 rounded"
                                >
                                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                                    {copied ? (isEn ? 'Copied' : '복사됨') : (isEn ? 'Copy' : '복사')}
                                </button>
                                <button
                                    onClick={handleDownload}
                                    className="btn btn-primary btn-sm flex items-center gap-1 font-medium rounded"
                                >
                                    <Download className="w-4 h-4" />
                                    {isEn ? 'Save File' : '다운로드'}
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
                        placeholder={isEn ? "Expected processing will appear simultaneously here..." : "변환 결과가 여기에 표시됩니다..."}
                    />
                </div>
            </div>

            {/* Info */}
            <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl text-sm space-y-2 border border-blue-100 dark:border-blue-900/50">
                    <p className="font-bold text-blue-800 dark:text-blue-200">{isEn ? 'CSV Architecture Advice' : 'CSV 형식 안내'}</p>
                    <ul className="space-y-1 text-blue-700 dark:text-blue-300 list-disc list-inside">
                        <li>{isEn ? 'First index item strings implicitly must categorize exact column labels.' : '첫 번째 줄은 헤더(컬럼명)여야 합니다'}</li>
                        <li>{isEn ? 'All nested cell details depend heavily strictly on comma parameters (,).' : '각 값은 쉼표(,)로 구분됩니다'}</li>
                        <li>{isEn ? 'String elements embedding comma clauses enforce exact quoted enclosures.' : '쉼표가 포함된 값은 따옴표로 감싸세요'}</li>
                    </ul>
                </div>

                <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl text-sm space-y-2 border border-purple-100 dark:border-purple-900/50">
                    <p className="font-bold text-purple-800 dark:text-purple-200">{isEn ? 'JSON Parsing Guidelines' : 'JSON 형식 안내'}</p>
                    <ul className="space-y-1 text-purple-700 dark:text-purple-300 list-disc list-inside">
                        <li>{isEn ? 'Input structure strictly demands root elements mapping as valid Array brackets [].' : '배열 형식이어야 합니다 [ ]'}</li>
                        <li>{isEn ? 'Data mappings consistently utilize homogenous naming sequences logically.' : '각 객체는 동일한 키를 가져야 합니다'}</li>
                        <li>{isEn ? 'Verify your standard JSON formatting syntaxes accurately completely.' : '유효한 JSON 문법을 사용하세요'}</li>
                    </ul>
                </div>
            </div>

            <ToolGuide
                title={isEn ? "Data Converter Guide (JSON<>CSV)" : "CSV ↔ JSON 변환기 가이드"}
                intro={isEn 
                    ? "Effortlessly convert bulky database queries spanning thousands of rows back and forth seamlessly between arrays to spreadsheets respectively." 
                    : "개발 및 데이터 분석 시 자주 쓰이는 CSV와 JSON 형식을 상호 변환해주는 유용한 도구입니다."}
                steps={steps}
                tips={isEn ? [
                    "We automatically map numerical variables as Integer instances when transitioning back inside Javascript payloads from standard comma tables.",
                    "If a particular sequence fails matching object models while utilizing JsonToCsv toggle, our script omits unexpected entries silently.",
                    "Download extension features natively adapt `.json` extensions automatically saving browser buffer memories."
                ] : [
                    "CSV 데이터를 붙여넣을 때 콤마(,) 구분이 확실한지 확인하세요. 엑셀의 내용을 복사해서 붙여넣으면 탭(Tab) 구분이 될 수 있으니 주의가 필요합니다.",
                    "JSON 데이터를 변환할 때는 반드시 대괄호([ ])로 시작하는 배열 형식이어야 정상적으로 CSV 행으로 전환됩니다.",
                    "변환된 결과는 즉시 파일로 저장할 수 있으므로, 대용량 데이터 전송 시 유용하게 사용할 수 있습니다."
                ]}
                faqs={faqs}
            />
        </div>
    );
};

export default CsvJsonConverter;
