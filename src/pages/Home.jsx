import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { tools } from '../data/tools';
import SEO from '../components/SEO';
import { useLanguage } from '../context/LanguageContext';
import useUserPreferences from '../hooks/useUserPreferences';
import useToolAnalytics from '../hooks/useToolAnalytics';
import { LayoutTemplate, TrendingUp, Ruler, DollarSign, Type, Code, Zap, Activity, Gamepad2, Heart, BookOpen, Star, Search, X, Sparkles } from 'lucide-react';

const Home = () => {
    // User preferences & Analytics
    const { favorites, toggleFavorite, recentTools, addRecentTool } = useUserPreferences();
    const { trackToolClick } = useToolAnalytics();
    const { t, getLocalizedPath, lang } = useLanguage();
    const isEn = lang === 'en';

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
        { id: 'all', label: t('common.tabs.all'), icon: LayoutTemplate },
        { id: 'best', label: t('common.tabs.best'), icon: TrendingUp },
        { id: 'unit', label: t('common.categories.unit'), icon: Ruler },
        { id: 'finance', label: t('common.categories.finance'), icon: DollarSign },
        { id: 'text', label: t('common.categories.text'), icon: Type },
        { id: 'dev', label: t('common.categories.dev'), icon: Code },
        { id: 'utility', label: t('common.categories.utility'), icon: Zap },
        { id: 'health', label: t('common.categories.health'), icon: Activity },
        { id: 'games', label: t('common.categories.games'), icon: Gamepad2 },
        { id: 'fun', label: t('common.categories.fun'), icon: Heart },
        { id: 'trivia', label: t('common.categories.trivia'), icon: BookOpen },
    ];

    // Tool Filtering Logic
    const filteredTools = useMemo(() => {
        let result = tools;
        
        // Filter out non-translated tools for English language
        if (lang === 'en') {
            result = result.filter(tool => tool.translated);
        }

        // 1. Tab Filter
        if (activeTab === 'best') {
            // Updated popular list to focus on translated ones if in English
            const popularIds = isEn 
                ? ['json-formatter', 'qr-gen', 'length', 'currency', 'word-count', 'password-gen', 'timer']
                : ['lotto', 'mandalart', 'mbti', 'saju', 'tarot', 'snake-game', 'suika-game', 'typing-test', 'qr-gen', 'loan', 'currency'];
            result = result.filter(t => popularIds.includes(t.id) || favorites.includes(t.id));
        } else if (activeTab !== 'all') {
            result = result.filter(t => t.category === activeTab);
        }

        // 2. Search Filter
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            result = result.filter(tool => {
                const title = t(`tools.${tool.id}.title`) || tool.title;
                const desc = t(`tools.${tool.id}.description`) || tool.description;
                return title.toLowerCase().includes(query) ||
                       desc.toLowerCase().includes(query) ||
                       tool.keywords?.some(keyword => keyword.toLowerCase().includes(query));
            });
        }

        return result;
    }, [activeTab, searchQuery, favorites]);

    // Sub-lists for "All" tab view
    const favoriteToolsList = useMemo(() =>
        tools.filter(tool => favorites.includes(tool.id) && (lang !== 'en' || tool.translated)),
        [favorites, lang]);

    const newToolsList = useMemo(() => {
        // Highlighting recently translated or popular tools in English
        const newIds = isEn 
            ? ['json-formatter', 'image-base64', 'currency', 'web-editor', 'diff', 'morse-code']
            : ['lotto', 'mandalart', 'suika-game', 'snake-game', 'currency', 'json-formatter'];
        return tools.filter(t => newIds.includes(t.id));
    }, [isEn]);

    const availableToolsCount = useMemo(() => {
        return lang === 'en' ? tools.filter(t => t.translated).length : tools.length;
    }, [lang]);


    // Helper Components
    const ToolCard = ({ tool, isFavorite, minimal = false }) => {
        const Icon = tool.icon;
        if (!tool) return null;
        
        const translatedTitle = t(`tools.${tool.id}.title`, { defaultValue: tool.title });
        const translatedDesc = t(`tools.${tool.id}.description`, { defaultValue: tool.description });

        return (
            <Link
                to={getLocalizedPath(tool.path)}
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
                    {translatedTitle.split('|')[0].trim()}
                </h3>
                <p className={`text-gray-500 dark:text-gray-400 line-clamp-2 ${minimal ? 'text-[11px]' : 'text-sm'}`}>
                    {translatedDesc}
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
                title={isEn ? "Tool Hive | Over 134+ Free Utilities for Everyday Life" : "Tool Hive | 일상을 편리하게 만드는 134가지 이상의 도구"}
                description={isEn ? "Length converters, JSON formatters, currency calculators, games and more! Do everything simply in one place for free." : "길이변환, 환율계산기, 글자수세기, JSON포매터, 간단 미니게임까지! 134개 이상의 모든 실생활 유틸리티를 한곳에서 무료로 즐기세요."}
            />

            {/* Hero Section */}
            <section className="relative pt-12 pb-8 px-4 text-center">
                <div className="max-w-3xl mx-auto space-y-6">
                    <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
                        {t('home.heroTitle')}
                        <span className="block text-2xl md:text-3xl mt-4 font-medium text-gray-500">
                            {t('home.heroSubtitle').split('{count}')[0]}
                            <span className="text-indigo-600 font-bold">{availableToolsCount}</span>
                            {t('home.heroSubtitle').split('{count}')[1]}
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
                            placeholder={t('home.searchPrompt')}
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
                                    {t('home.newDesc')}
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
                                        {t('home.fav')}
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
                                    {t('home.allToolsTotal').replace('{count}', availableToolsCount)}
                                </h2>
                            </div>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                                {tools.filter(t => lang !== 'en' || t.translated).map(tool => (
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
                            {t('home.foundTools').replace('{count}', filteredTools.length)}
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
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t('home.noResult')}</h3>
                                <p className="text-gray-500 max-w-xs mx-auto mb-8">{t('home.tryDiff')}</p>
                                <button
                                    onClick={() => { setSearchQuery(''); setActiveTab('all'); }}
                                    className="px-8 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/20"
                                >
                                    {t('home.viewAll')}
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Footer */}
            <footer className="mt-20 py-16 text-center border-t border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
                <div className="max-w-2xl mx-auto px-4">
                    <p className="text-gray-800 dark:text-gray-200 font-bold text-lg mb-2">{t('home.footerTitle')}</p>
                    <p className="text-gray-500 dark:text-gray-400 mb-8">{t('home.footerDesc')}</p>
                    <div className="flex justify-center flex-wrap gap-x-8 gap-y-4 mb-8">
                        <Link to={getLocalizedPath('/about')} className="text-sm text-gray-400 hover:text-indigo-600 font-medium underline-offset-4 hover:underline">{t('home.aboutUs')}</Link>
                        <Link to={getLocalizedPath('/contact')} className="text-sm text-gray-400 hover:text-indigo-600 font-medium underline-offset-4 hover:underline">{t('common.contact')}</Link>
                        <Link to={getLocalizedPath('/privacy')} className="text-sm text-gray-400 hover:text-indigo-600 font-medium underline-offset-4 hover:underline">{t('common.privacy')}</Link>
                        <Link to={getLocalizedPath('/terms')} className="text-sm text-gray-400 hover:text-indigo-600 font-medium underline-offset-4 hover:underline">{t('common.terms')}</Link>
                    </div>
                    <p className="text-xs text-gray-300 dark:text-gray-600 italic">© {new Date().getFullYear()} Tool Hive. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Home;
