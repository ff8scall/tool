import React, { useState, useMemo } from 'react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { Search, AlertTriangle } from 'lucide-react';

const RegexTester = () => {
    const [regexPattern, setRegexPattern] = useState('');
    const [flags, setFlags] = useState('gm');
    const [testString, setTestString] = useState('');

    const result = useMemo(() => {
        if (!regexPattern) return { matches: [], error: null };

        try {
            const regex = new RegExp(regexPattern, flags);
            const matches = [];
            let match;

            // Prevent infinite loops with global flag
            if (!flags.includes('g')) {
                const m = regex.exec(testString);
                if (m) matches.push(m);
            } else {
                // Limit matches to prevent browser crash on bad regex
                let count = 0;
                while ((match = regex.exec(testString)) !== null && count < 1000) {
                    matches.push(match);
                    if (match.index === regex.lastIndex) {
                        regex.lastIndex++;
                    }
                    count++;
                }
            }
            return { matches, error: null };
        } catch (e) {
            return { matches: [], error: e.message };
        }
    }, [regexPattern, flags, testString]);

    const highlightText = () => {
        if (!regexPattern || result.error || result.matches.length === 0) {
            return testString;
        }

        let lastIndex = 0;
        const elements = [];

        result.matches.forEach((match, i) => {
            // Text before match
            if (match.index > lastIndex) {
                elements.push(testString.slice(lastIndex, match.index));
            }

            // Match text
            elements.push(
                <span key={i} className="bg-yellow-200 dark:bg-yellow-900/50 border-b-2 border-yellow-500" title={`Match ${i + 1}`}>
                    {match[0]}
                </span>
            );

            lastIndex = match.index + match[0].length;
        });

        // Remaining text
        if (lastIndex < testString.length) {
            elements.push(testString.slice(lastIndex));
        }

        return elements;
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <SEO
                title="정규식 테스터 - Regex Tester"
                description="정규표현식(Regular Expression)을 실시간으로 테스트하고 검증하는 무료 도구입니다. 자바스크립트 정규식 엔진을 사용합니다."
                keywords={['정규식 테스터', 'regex tester', 'regular expression', '정규표현식', 'regex debug']}
            />

            <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center justify-center gap-3">
                    <Search className="w-8 h-8 text-purple-500" />
                    정규식 테스터
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    정규표현식을 입력하여 텍스트 매칭 결과를 실시간으로 확인하세요.
                </p>
            </div>

            <div className="card p-6 space-y-6">
                {/* Regex Input */}
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            정규식 패턴 (Pattern)
                        </label>
                        <div className="relative flex items-center">
                            <span className="absolute left-3 text-gray-400">/</span>
                            <input
                                type="text"
                                value={regexPattern}
                                onChange={(e) => setRegexPattern(e.target.value)}
                                placeholder="abc"
                                className={`input w-full pl-6 pr-4 font-mono ${result.error ? 'border-red-500 focus:ring-red-500' : ''
                                    }`}
                            />
                            <span className="absolute right-3 text-gray-400">/</span>
                        </div>
                        {result.error && (
                            <div className="text-red-500 text-xs flex items-center gap-1">
                                <AlertTriangle className="w-3 h-3" />
                                {result.error}
                            </div>
                        )}
                    </div>

                    <div className="w-full md:w-32 space-y-2">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            플래그 (Flags)
                        </label>
                        <input
                            type="text"
                            value={flags}
                            onChange={(e) => setFlags(e.target.value)}
                            placeholder="gmi"
                            className="input w-full font-mono"
                        />
                    </div>
                </div>

                {/* Test String Input */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        테스트 문자열 (Test String)
                    </label>
                    <textarea
                        value={testString}
                        onChange={(e) => setTestString(e.target.value)}
                        placeholder="테스트할 텍스트를 입력하세요..."
                        className="input w-full h-32 font-mono text-sm"
                    />
                </div>

                {/* Results */}
                <div className="space-y-2">
                    <div className="flex justify-between items-center">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            매칭 결과 ({result.matches.length} matches)
                        </label>
                    </div>
                    <div className="input w-full h-48 overflow-auto font-mono text-sm whitespace-pre-wrap bg-gray-50 dark:bg-gray-800/50">
                        {highlightText()}
                    </div>
                </div>
            </div>

            <div className="card p-6 bg-purple-50 dark:bg-purple-900/20 border-purple-100 dark:border-purple-800">
                <h3 className="text-lg font-semibold mb-3">ℹ️ 정규식 치트시트</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                        <strong className="block text-purple-700 dark:text-purple-300">Character Classes</strong>
                        <ul className="text-gray-600 dark:text-gray-400">
                            <li><code>.</code> Any character</li>
                            <li><code>\d</code> Digit</li>
                            <li><code>\w</code> Word char</li>
                            <li><code>\s</code> Whitespace</li>
                        </ul>
                    </div>
                    <div>
                        <strong className="block text-purple-700 dark:text-purple-300">Anchors</strong>
                        <ul className="text-gray-600 dark:text-gray-400">
                            <li><code>^</code> Start</li>
                            <li><code>$</code> End</li>
                            <li><code>\b</code> Word boundary</li>
                        </ul>
                    </div>
                    <div>
                        <strong className="block text-purple-700 dark:text-purple-300">Quantifiers</strong>
                        <ul className="text-gray-600 dark:text-gray-400">
                            <li><code>*</code> 0 or more</li>
                            <li><code>+</code> 1 or more</li>
                            <li><code>?</code> 0 or 1</li>
                            <li><code>{`{n}`}</code> Exactly n</li>
                        </ul>
                    </div>
                    <div>
                        <strong className="block text-purple-700 dark:text-purple-300">Flags</strong>
                        <ul className="text-gray-600 dark:text-gray-400">
                            <li><code>g</code> Global</li>
                            <li><code>i</code> Case insensitive</li>
                            <li><code>m</code> Multiline</li>
                        </ul>
                    </div>
                </div>
            </div>
        \n            <ToolGuide
                title="정규식 테스터"
                intro="정규표현식 테스트 및 검증"
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

export default RegexTester;
