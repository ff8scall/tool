import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { tools } from '../data/tools';
import SEO from '../components/SEO';
import { Sparkles, TrendingUp, Zap, Star, Search, X, Grid, ListFilter, Gamepad2, Brain, PenTool, LayoutTemplate, BookOpen, Ruler, DollarSign, Type, Code, Activity, Heart } from 'lucide-react';
import useUserPreferences from '../hooks/useUserPreferences';
import useToolAnalytics from '../hooks/useToolAnalytics';

const Home = () => {
    // User preferences & Analytics
    const { favorites, toggleFavorite, recentTools, addRecentTool } = useUserPreferences();
    const { trackToolClick } = useToolAnalytics();

    // State
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('all');
    const [isSticky, setIsSticky] = useState(false);

    // Handle scroll for sticky tab styling
    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 200);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Tabs Configuration (Korean)
    const tabs = [
        { id: 'all', label: '전체', icon: LayoutTemplate },
        { id: 'best', label: '인기/추천', icon: TrendingUp },
        { id: 'unit', label: '단위변환', icon: Ruler },
        { id: 'finance', label: '생활/금융', icon: DollarSign },
        { id: 'text', label: '텍스트', icon: Type },
        { id: 'dev', label: '개발도구', icon: Code },
        { id: 'utility', label: '유틸리티', icon: Zap },
        { id: 'health', label: '건강', icon: Activity },
        { id: 'games', label: '미니게임', icon: Gamepad2 },
        { id: 'fun', label: '운세/재미', icon: Heart },
        { id: 'trivia', label: '상식 테스트', icon: BookOpen },
    ];

    // Tool Filtering Logic
    const filteredTools = useMemo(() => {
        let result = tools;

        // 1. Tab Filter
        if (activeTab === 'best') {
            const popularIds = ['lotto', 'mandalart', 'mbti', 'saju', 'tarot', 'snake-game', 'suika-game', 'typing-test', 'qr-gen', 'loan', 'currency'];
            result = result.filter(t => popularIds.includes(t.id) || favorites.includes(t.id));
        } else if (activeTab !== 'all') {
            result = result.filter(t => t.category === activeTab);
        }

        // 2. Search Filter
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            result = result.filter(tool =>
                tool.title.toLowerCase().includes(query) ||
                tool.description.toLowerCase().includes(query) ||
                tool.keywords?.some(keyword => keyword.toLowerCase().includes(query))
            );
        }

        return result;
    }, [activeTab, searchQuery, favorites]);

    // Sub-lists for "All" tab view
    const favoriteToolsList = useMemo(() =>
        tools.filter(tool => favorites.includes(tool.id)),
        [favorites]);

    const newToolsList = useMemo(() => {
        const newIds = ['lotto', 'mandalart', 'suika-game', 'snake-game', 'currency', 'json-formatter'];
        return tools.filter(t => newIds.includes(t.id));
    }, []);


    // Helper Components
    const ToolCard = ({ tool, isFavorite, minimal = false }) => {
        const Icon = tool.icon;
        if (!tool) return null;
        return (
            <Link
                to={tool.path}
                onClick={() => {
                    addRecentTool(tool.id);
                    trackToolClick(tool.id);
                }}
                className={`group relative bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${minimal ? 'p-4' : 'p-5'}`}
            >
                <div className="flex items-start justify-between mb-3">
                    <div className={`p-3 rounded-xl ${tool.color} text-white shadow-sm group-hover:scale-110 transition-transform`}>
                        <Icon className="w-6 h-6" />
                    </div>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            toggleFavorite(tool.id);
                        }}
                        className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                        <Star className={`w-4 h-4 ${isFavorite ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} />
                    </button>
                </div>

                <h3 className={`font-bold text-gray-900 dark:text-white mb-1 ${minimal ? 'text-[13px]' : 'text-lg'}`}>
                    {tool.title.split('|')[0].trim()}
                </h3>
                <p className={`text-gray-500 dark:text-gray-400 line-clamp-2 ${minimal ? 'text-[11px]' : 'text-sm'}`}>
                    {tool.description}
                </p>

                {!minimal && tool.keywords && (
                    <div className="flex flex-wrap gap-1 mt-3">
                        {tool.keywords?.slice(0, 3).map(keyword => (
                            <span key={keyword} className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-[10px] font-medium rounded-md uppercase tracking-tighter">
                                #{keyword}
                            </span>
                        ))}
                    </div>
                )}
            </Link>
        );
    };

    return (
        <div className="min-h-screen">
            <SEO
                title="Tool Hive | 일상을 편리하게 만드는 134가지 이상의 도구"
                description="길이변환, 환율계산기, 글자수세기, JSON포매터, 간단 미니게임까지! 134개 이상의 모든 실생활 유틸리티를 한곳에서 무료로 즐기세요."
            />

            {/* Hero Section */}
            <section className="relative pt-12 pb-8 px-4 text-center">
                <div className="max-w-3xl mx-auto space-y-6">
                    <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
                        오늘 당신에게 필요한 도구는?
                        <span className="block text-2xl md:text-3xl mt-4 font-medium text-gray-500">
                            약 <span className="text-indigo-600 font-bold">{tools.length}개</span>의 생산성 도구를 만나보세요
                        </span>
                    </h1>

                    {/* Search Bar */}
                    <div className="relative max-w-xl mx-auto group">
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="block w-full h-16 pl-14 pr-12 rounded-2xl border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 text-lg shadow-xl focus:border-indigo-500 focus:ring-0 transition-all outline-none placeholder:text-gray-300"
                            placeholder="도구 이름을 입력하세요 (예: 단위, JSON, 사주)..."
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery('')}
                                className="absolute inset-y-0 right-4 flex items-center"
                            >
                                <X className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                            </button>
                        )}
                    </div>
                </div>
            </section>

            {/* Sticky Navigation Tabs */}
            <div className={`sticky top-0 z-30 transition-all duration-300 ${isSticky ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-6'}`}>
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex flex-wrap gap-2 justify-center px-2">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => {
                                        setActiveTab(tab.id);
                                    }}
                                    className={`flex items-center flex-shrink-0 px-5 py-3 rounded-2xl font-bold text-sm md:text-base transition-all scale-100 active:scale-95 border
                                        ${isActive
                                            ? 'bg-indigo-600 text-white border-transparent shadow-lg shadow-indigo-600/30 ring-2 ring-indigo-600 ring-offset-2 dark:ring-offset-gray-900'
                                            : 'bg-white dark:bg-gray-800 text-gray-500 border-gray-100 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-800'
                                        }
                                    `}
                                >
                                    <Icon className={`w-4 h-4 mr-2 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="max-w-7xl mx-auto px-4 pb-20 mt-8">

                {activeTab === 'all' && !searchQuery ? (
                    <div className="space-y-16">

                        {/* 1. New & Trending */}
                        <section>
                            <div className="flex items-center justify-between mb-6 px-2">
                                <h2 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                                    <Sparkles className="w-6 h-6 text-indigo-500 animate-pulse" />
                                    새로 추가된 도구
                                </h2>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                {newToolsList.map(tool => (
                                    <ToolCard key={tool.id} tool={tool} isFavorite={favorites.includes(tool.id)} />
                                ))}
                            </div>
                        </section>

                        {/* 2. Favorites */}
                        {favoriteToolsList.length > 0 && (
                            <section>
                                <div className="flex items-center justify-between mb-6 px-2">
                                    <h2 className="text-2xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                                        <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
                                        즐겨찾는 도구
                                    </h2>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                    {favoriteToolsList.map(tool => (
                                        <ToolCard key={tool.id} tool={tool} isFavorite={true} minimal={true} />
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* 3. All Tools Grid */}
                        <section>
                            <div className="flex items-center justify-between mb-6 px-2 border-b border-gray-100 dark:border-gray-800 pb-4">
                                <h2 className="text-2xl font-black text-gray-900 dark:text-white">
                                    모든 도구 둘러보기 ({tools.length})
                                </h2>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                                {tools.map(tool => (
                                    <ToolCard
                                        key={tool.id}
                                        tool={tool}
                                        isFavorite={favorites.includes(tool.id)}
                                    />
                                ))}
                            </div>
                        </section>
                    </div>
                ) : (
                    // Filtered View
                    <div className="animate-fade-in-up">
                        <div className="mb-6 px-2 text-gray-500 font-bold uppercase tracking-wider text-sm">
                            {filteredTools.length}개의 도구가 발견되었습니다
                        </div>
                        {filteredTools.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                                {filteredTools.map(tool => (
                                    <ToolCard
                                        key={tool.id}
                                        tool={tool}
                                        isFavorite={favorites.includes(tool.id)}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-32 bg-gray-50 dark:bg-gray-800/50 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-700">
                                <Search className="w-20 h-20 mx-auto text-gray-300 mb-6" />
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">검색 결과가 없습니다</h3>
                                <p className="text-gray-500 max-w-xs mx-auto mb-8">다른 키워드로 검색하거나 카테고리를 변경해 보세요.</p>
                                <button
                                    onClick={() => { setSearchQuery(''); setActiveTab('all'); }}
                                    className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20"
                                >
                                    모든 도구 보기
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Footer */}
            <footer className="mt-20 py-16 text-center border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
                <div className="max-w-2xl mx-auto px-4">
                    <p className="text-gray-800 dark:text-gray-200 font-bold text-lg mb-2">Tool Hive (툴 하이브)</p>
                    <p className="text-gray-500 dark:text-gray-400 mb-8">당신의 일상을 더 편리하게 만드는 무료 온라인 도구 모음입니다.</p>
                    <div className="flex justify-center flex-wrap gap-x-8 gap-y-4 mb-8">
                        <Link to="/about" className="text-sm text-gray-400 hover:text-indigo-600 font-medium underline-offset-4 hover:underline">서비스 소개</Link>
                        <Link to="/contact" className="text-sm text-gray-400 hover:text-indigo-600 font-medium underline-offset-4 hover:underline">문의하기</Link>
                        <Link to="/privacy" className="text-sm text-gray-400 hover:text-indigo-600 font-medium underline-offset-4 hover:underline">개인정보처리방침</Link>
                        <Link to="/terms" className="text-sm text-gray-400 hover:text-indigo-600 font-medium underline-offset-4 hover:underline">이용약관</Link>
                    </div>
                    <p className="text-xs text-gray-300 dark:text-gray-600 italic">© {new Date().getFullYear()} Tool Hive. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Home;
