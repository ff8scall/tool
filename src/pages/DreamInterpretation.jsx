import React, { useState, useMemo } from 'react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { Search, Cloud, Sparkles, BookOpen, ThumbsUp, ThumbsDown, Minus } from 'lucide-react';
import { dreamData, dreamCategories } from '../data/DreamData';
import ShareButtons from '../components/ShareButtons';

const DreamInterpretation = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    const filteredDreams = useMemo(() => {
        return dreamData.filter(dream => {
            const matchesSearch = dream.keyword.includes(searchTerm) || dream.description.includes(searchTerm);
            const matchesCategory = selectedCategory === 'all' || dream.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchTerm, selectedCategory]);

    const getGoodOrBadIcon = (type) => {
        switch (type) {
            case 'good': return <ThumbsUp className="w-5 h-5 text-blue-500" />;
            case 'bad': return <ThumbsDown className="w-5 h-5 text-red-500" />;
            default: return <Minus className="w-5 h-5 text-gray-500" />;
        }
    };

    const getGoodOrBadLabel = (type) => {
        switch (type) {
            case 'good': return <span className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded-full">길몽</span>;
            case 'bad': return <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-1 rounded-full">흉몽</span>;
            default: return <span className="text-xs font-bold text-gray-600 bg-gray-100 px-2 py-1 rounded-full">보통</span>;
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <SEO
                title="무료 꿈해몽 - 꿈풀이 검색 | Utility Hub"
                description="간밤에 꾼 꿈의 의미가 궁금하신가요? 뱀, 이빨, 똥, 조상님 등 다양한 키워드로 꿈해몽을 무료로 검색해보세요."
                keywords="꿈해몽, 꿈풀이, 무료꿈해몽, 태몽, 길몽, 흉몽, 로또꿈, 뱀꿈, 이빨빠지는꿈, 똥꿈"
            />

            <div className="text-center space-y-4 py-6">
                <div className="inline-flex items-center justify-center p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-full mb-2">
                    <Cloud className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">꿈해몽</h1>
                <p className="text-muted-foreground">
                    간밤에 꾼 꿈, 어떤 의미가 있을까요? 키워드로 검색해보세요.
                </p>
            </div>

            {/* 검색 및 필터 */}
            <div className="space-y-4 sticky top-4 z-10 bg-background/95 backdrop-blur-sm p-4 rounded-xl border border-border shadow-sm">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                    <input
                        type="text"
                        placeholder="꿈 내용을 검색해보세요 (예: 뱀, 이빨, 날다)"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                    />
                </div>

                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {dreamCategories.map(category => (
                        <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${selectedCategory === category.id
                                    ? 'bg-indigo-600 text-white shadow-md'
                                    : 'bg-card border border-border hover:bg-muted text-muted-foreground'
                                }`}
                        >
                            <span>{category.icon}</span>
                            {category.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* 결과 목록 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {filteredDreams.length > 0 ? (
                    filteredDreams.map((dream) => (
                        <div key={dream.id} className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-all group">
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                                        {dream.keyword}
                                    </span>
                                    {getGoodOrBadLabel(dream.goodOrBad)}
                                </div>
                                <div className="p-2 bg-muted rounded-full group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/20 transition-colors">
                                    {getGoodOrBadIcon(dream.goodOrBad)}
                                </div>
                            </div>
                            <p className="text-muted-foreground leading-relaxed">
                                {dream.description}
                            </p>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center py-12 text-muted-foreground">
                        <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-20" />
                        <p>검색 결과가 없습니다.</p>
                        <p className="text-sm">다른 키워드로 검색해보세요.</p>
                    </div>
                )}
            </div>

            <div className="mt-8">
                <ShareButtons
                    title="무료 꿈해몽 검색"
                    description="다양한 꿈의 의미를 무료로 확인해보세요!"
                />
            </div>
        \n            <ToolGuide
                title="꿈해몽"
                intro="꿈 내용으로 해몽 검색"
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

export default DreamInterpretation;
