import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { tools } from '../data/tools';
import SEO from '../components/SEO';
import { Sparkles, TrendingUp, Zap, Star, Search, X, Grid, ListFilter, Gamepad2, Brain, PenTool, LayoutTemplate, BookOpen } from 'lucide-react';
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

    // Tabs Configuration
    const tabs = [
        { id: 'all', label: '전체', icon: LayoutTemplate },
        { id: 'best', label: '인기', icon: TrendingUp },
        { id: 'test', label: '심리/운세', icon: Brain },
        { id: 'game', label: '게임', icon: Gamepad2 },
        { id: 'trivia', label: '상식/퀴즈', icon: BookOpen },
        { id: 'utility', label: '유틸리티', icon: Zap },
    ];

    // Tool Filtering Logic
    const filteredTools = useMemo(() => {
        let result = tools;

        // 1. Tab Filter
        if (activeTab === 'test') {
            result = result.filter(t => ['fun', 'health', 'love'].includes(t.category) || t.keywords?.includes('테스트'));
        } else if (activeTab === 'game') {
            result = result.filter(t => t.category === 'games');
        } else if (activeTab === 'trivia') {
            result = result.filter(t => t.category === 'trivia');
        } else if (activeTab === 'utility') {
            result = result.filter(t => ['utility', 'finance', 'dev', 'unit', 'text'].includes(t.category));
        } else if (activeTab === 'best') {
            // "Best" logic: Manually picked popular items + Favorites
            // For now, let's pick some specific popular IDs and combine with user favorites
            const popularIds = ['mental-age', 'personal-color', 'lotto-sim', 'mandalart', 'brain-structure', 'saju', 'tarot', 'speed-math'];
            result = result.filter(t => popularIds.includes(t.id) || favorites.includes(t.id));
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

    const recentToolsList = useMemo(() =>
        recentTools.map(id => tools.find(tool => tool.id === id)).filter(Boolean),
        [recentTools]);

    const newToolsList = useMemo(() => {
        // Assume simplified logic for "New": items added recently (ID based or manual list for now)
        const newIds = ['mandalart', 'life-expectancy', 'lotto-sim', 'zodiac-fortune'];
        return tools.filter(t => newIds.includes(t.id));
    }, []);


    // Helper Components
    const ToolCard = ({ tool, isFavorite, minimal = false }) => {
        const Icon = tool.icon;
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

                <h3 className={`font-bold text-gray-900 dark:text-white mb-1 ${minimal ? 'text-sm' : 'text-lg'}`}>
                    {tool.title}
                </h3>
                <p className={`text-gray-500 dark:text-gray-400 line-clamp-2 ${minimal ? 'text-xs' : 'text-sm'}`}>
                    {tool.description}
                </p>

                {!minimal && tool.badges && (
                    <div className="flex gap-1 mt-3">
                        {tool.badges?.map(badge => (
                            <span key={badge} className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-[10px] font-bold rounded-md">
                                {badge}
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
                title="Tool Hive - 세상의 모든 유용한 도구"
                description="심리테스트, 미니게임, 유틸리티 도구를 한 곳에서 즐기세요."
            />

            {/* Hero Section - Simplified */}
            <section className="relative pt-8 pb-6 px-4 text-center">
                <div className="max-w-3xl mx-auto space-y-6">
                    <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">
                        무엇이 필요하신가요?
                        <span className="block text-2xl md:text-3xl mt-2 font-normal text-gray-500">
                            <span className="text-indigo-600 font-bold">{tools.length}+</span>개의 도구가 준비되어 있습니다
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
                            className="block w-full h-14 pl-12 pr-12 rounded-2xl border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 text-lg shadow-sm focus:border-indigo-500 focus:ring-0 transition-all outline-none"
                            placeholder="도구 검색..."
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
            <div className={`sticky top-0 z-30 transition-all duration-200 ${isSticky ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-sm py-2' : 'bg-transparent py-4'}`}>
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex overflow-x-auto pb-2 md:pb-0 hide-scrollbar gap-2 md:justify-center">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => {
                                        setActiveTab(tab.id);
                                        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll top on tab change usually better UX here? Or keep position?
                                        // keeping position is better if sticky. But if sticky, maybe scroll to top of list?
                                        // Let's just keep position for now.
                                    }}
                                    className={`flex items-center flex-shrink-0 px-4 py-2.5 rounded-full font-bold text-sm md:text-base transition-all scale-100 active:scale-95 border
                                        ${isActive
                                            ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900 border-transparent shadow-lg'
                                            : 'bg-white dark:bg-gray-800 text-gray-500 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                                        }
                                    `}
                                >
                                    <Icon className={`w-4 h-4 mr-2 ${isActive ? '' : 'text-gray-400'}`} />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Content Area */}
            <div className="max-w-7xl mx-auto px-4 pb-20 mt-4">

                {/* Special Layout for "All" Tab without search */}
                {activeTab === 'all' && !searchQuery ? (
                    <div className="space-y-12">

                        {/* 1. New & Trending */}
                        <section>
                            <div className="flex items-center justify-between mb-4 px-2">
                                <h2 className="text-xl font-bold flex items-center gap-2">
                                    <Sparkles className="w-5 h-5 text-indigo-500" />
                                    따끈따끈 신규 도구
                                </h2>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {newToolsList.map(tool => (
                                    <ToolCard key={tool.id} tool={tool} isFavorite={favorites.includes(tool.id)} />
                                ))}
                            </div>
                        </section>

                        {/* 2. Favorites (if exists) */}
                        {favoriteToolsList.length > 0 && (
                            <section>
                                <div className="flex items-center justify-between mb-4 px-2">
                                    <h2 className="text-xl font-bold flex items-center gap-2">
                                        <Star className="w-5 h-5 text-amber-500" />
                                        즐겨찾기
                                    </h2>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                                    {favoriteToolsList.map(tool => (
                                        <ToolCard key={tool.id} tool={tool} isFavorite={true} minimal={true} />
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* 3. All Tools Grid */}
                        <section>
                            <div className="flex items-center justify-between mb-4 px-2">
                                <h2 className="text-xl font-bold">
                                    전체 도구 ({tools.length})
                                </h2>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
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
                    // Filtered View for other tabs or search
                    <div className="animate-fade-in-up">
                        <div className="mb-4 px-2 text-gray-500 font-medium">
                            {filteredTools.length}개의 도구
                        </div>
                        {filteredTools.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                {filteredTools.map(tool => (
                                    <ToolCard
                                        key={tool.id}
                                        tool={tool}
                                        isFavorite={favorites.includes(tool.id)}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20">
                                <Search className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                                <p className="text-gray-500 text-lg">찾으시는 도구가 없네요...</p>
                                <button
                                    onClick={() => { setSearchQuery(''); setActiveTab('all'); }}
                                    className="mt-4 text-indigo-600 font-bold hover:underline"
                                >
                                    전체 목록 보기
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Footer / Info Section (Simplified) */}
            <footer className="mt-20 py-10 text-center text-gray-400 text-sm border-t border-gray-100 dark:border-gray-800">
                <p>Tool Hive © 2025. All rights reserved.</p>
                <div className="flex justify-center gap-4 mt-2">
                    <Link to="/about" className="hover:text-gray-600">소개</Link>
                    <Link to="/contact" className="hover:text-gray-600">문의</Link>
                    <Link to="/privacy" className="hover:text-gray-600">개인정보처리방침</Link>
                </div>
            </footer>
        </div>
    );
};

export default Home;
