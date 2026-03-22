import React, { useState, useMemo } from 'react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';

const CodeDiff = () => {
    const [text1, setText1] = useState('');
    const [text2, setText2] = useState('');

    const diff = useMemo(() => {
        const lines1 = text1.split('\n');
        const lines2 = text2.split('\n');
        const maxLength = Math.max(lines1.length, lines2.length);
        const result = [];

        for (let i = 0; i < maxLength; i++) {
            const line1 = lines1[i] || '';
            const line2 = lines2[i] || '';

            if (line1 === line2) {
                result.push({ type: 'same', line1, line2, lineNum: i + 1 });
            } else if (!line1) {
                result.push({ type: 'added', line1, line2, lineNum: i + 1 });
            } else if (!line2) {
                result.push({ type: 'removed', line1, line2, lineNum: i + 1 });
            } else {
                result.push({ type: 'modified', line1, line2, lineNum: i + 1 });
            }
        }

        return result;
    }, [text1, text2]);

    const stats = useMemo(() => {
        const added = diff.filter(d => d.type === 'added').length;
        const removed = diff.filter(d => d.type === 'removed').length;
        const modified = diff.filter(d => d.type === 'modified').length;
        return { added, removed, modified };
    }, [diff]);

    return (
        <div className="max-w-7xl mx-auto space-y-6">
            <SEO
                title="코드 비교 - Utility Hub"
                description="두 개의 텍스트나 코드를 비교하여 차이점을 확인할 수 있습니다. Diff 도구입니다."
                keywords="코드비교, Diff, 텍스트비교, 차이점확인"
            />

            <header className="text-center space-y-2">
                <h1 className="text-3xl font-bold">코드 비교</h1>
                <p className="text-muted-foreground">
                    두 텍스트의 차이점을 확인하세요
                </p>
            </header>

            {/* Stats */}
            {(text1 || text2) && (
                <div className="flex gap-4 justify-center text-sm">
                    <div className="px-4 py-2 bg-green-500/20 text-green-600 dark:text-green-400 rounded-lg">
                        추가: {stats.added}줄
                    </div>
                    <div className="px-4 py-2 bg-red-500/20 text-red-600 dark:text-red-400 rounded-lg">
                        삭제: {stats.removed}줄
                    </div>
                    <div className="px-4 py-2 bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 rounded-lg">
                        수정: {stats.modified}줄
                    </div>
                </div>
            )}

            {/* Input */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                    <label className="block text-sm font-medium">
                        원본 텍스트
                    </label>
                    <textarea
                        value={text1}
                        onChange={(e) => setText1(e.target.value)}
                        placeholder="원본 텍스트를 입력하세요..."
                        className="w-full h-96 px-4 py-3 bg-background border border-border rounded-lg resize-none font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                    <label className="block text-sm font-medium">
                        비교할 텍스트
                    </label>
                    <textarea
                        value={text2}
                        onChange={(e) => setText2(e.target.value)}
                        placeholder="비교할 텍스트를 입력하세요..."
                        className="w-full h-96 px-4 py-3 bg-background border border-border rounded-lg resize-none font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
            </div>

            {/* Diff Result */}
            {(text1 || text2) && (
                <div className="bg-card border border-border rounded-xl p-6">
                    <h2 className="text-lg font-bold mb-4">비교 결과</h2>
                    <div className="bg-background rounded-lg overflow-hidden">
                        {diff.map((item, idx) => (
                            <div
                                key={idx}
                                className={`grid grid-cols-2 gap-4 px-4 py-2 font-mono text-sm border-b border-border last:border-b-0 ${item.type === 'added' ? 'bg-green-500/10' :
                                        item.type === 'removed' ? 'bg-red-500/10' :
                                            item.type === 'modified' ? 'bg-yellow-500/10' :
                                                ''
                                    }`}
                            >
                                <div className="flex gap-2">
                                    <span className="text-muted-foreground w-8 text-right">{item.lineNum}</span>
                                    <span className={item.type === 'removed' || item.type === 'modified' ? 'text-red-600 dark:text-red-400' : ''}>
                                        {item.line1}
                                    </span>
                                </div>
                                <div className="flex gap-2">
                                    <span className="text-muted-foreground w-8 text-right">{item.lineNum}</span>
                                    <span className={item.type === 'added' || item.type === 'modified' ? 'text-green-600 dark:text-green-400' : ''}>
                                        {item.line2}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <ToolGuide
                title="효율적인 코드 및 텍스트 비교(Diff) 가이드"
                intro="두 개의 텍스트나 소스 코드를 나란히 비교하여 추가, 삭제, 수정된 부분을 한눈에 파악할 수 있는 도구입니다. 버전 관리나 문서 검토 시 유용하게 사용할 수 있습니다."
                steps={[
                    "'원본 텍스트' 영역에 기준이 되는 코드를 입력하거나 붙여넣습니다.",
                    "'비교할 텍스트' 영역에 변경 사항이 포함된 코드를 입력합니다.",
                    "하단의 '비교 결과' 영역에서 줄 단위로 강조된 차이점을 확인합니다.",
                    "추가된 줄은 녹색, 삭제된 줄은 빨간색, 수정된 줄은 노란색으로 표시되는 통계를 확인합니다."
                ]}
                tips={[
                    "소스 코드뿐만 아니라 일반 문서의 초안과 수정안을 비교할 때도 효과적입니다.",
                    "가로 폭이 넓은 화면에서 비교하면 두 코드를 더 쾌적하게 대조할 수 있습니다.",
                    "코드 리뷰 전, 자신이 수정한 내용을 최종적으로 점검하는 습관을 들여보세요."
                ]}
                faqs={[
                    {
                        q: "대소문자나 공백 차이도 인식하나요?",
                        a: "네, 현재 도구는 문자열이 완벽하게 일치하지 않으면 차이가 있는 것으로 인식합니다."
                    },
                    {
                        q: "비교할 수 있는 텍스트 길이에 제한이 있나요?",
                        a: "브라우저 성능에 따라 수천 줄 이상의 방대한 데이터는 로딩이 지연될 수 있으나, 일반적인 코드 파일은 무리 없이 처리 가능합니다."
                    }
                ]}
            />
        </div>
    );
};

export default CodeDiff;
