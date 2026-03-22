import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { tools, toolCategoryData, toolCategories } from '../data/tools';
import SEO from '../components/SEO';
import { Star } from 'lucide-react';
import useUserPreferences from '../hooks/useUserPreferences';
import { useLanguage } from '../context/LanguageContext';

const CategoryPage = () => {
    const { categoryId } = useParams();
    const { favorites, toggleFavorite } = useUserPreferences();
    const { t, getLocalizedPath, lang } = useLanguage();

    // Get base data from static source first
    const staticInfo = toolCategoryData[categoryId];
    
    // Merge with translated text if available
    const categoryInfo = useMemo(() => {
        if (!staticInfo) return null;
        return {
            ...staticInfo,
            title: t(`categoryData.${categoryId}.title`, { defaultValue: staticInfo.title }),
            description: t(`categoryData.${categoryId}.description`, { defaultValue: staticInfo.description }),
        };
    }, [categoryId, t, staticInfo]);

    const categoryName = t(`common.categories.${categoryId}`, { defaultValue: toolCategories[categoryId] });

    const categoryTools = useMemo(() => {
        let result = tools.filter(tool => tool.category === categoryId);
        if (lang === 'en') {
            result = result.filter(tool => tool.translated);
        }
        return result;
    }, [categoryId, lang]);

    if (!categoryInfo) {
        return (
            <div className="text-center py-20">
                <h1 className="text-2xl font-bold">{t('category.notFound')}</h1>
                <Link to={getLocalizedPath('/')} className="text-primary hover:underline mt-4 inline-block">{t('category.backToHome')}</Link>
            </div>
        );
    }

    const Icon = categoryInfo.icon;

    return (
        <div className="space-y-10 pb-20">
            <SEO
                title={categoryInfo.title}
                description={categoryInfo.description}
                keywords={categoryInfo.keywords}
            />

            {/* Category Header */}
            <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-card to-background border border-border p-10 md:p-16 text-center space-y-6">
                <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-br ${categoryInfo.color} opacity-10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl`}></div>

                <div className={`inline-flex items-center justify-center p-5 rounded-2xl bg-gradient-to-br ${categoryInfo.color} text-white shadow-lg mb-4 animate-in zoom-in duration-500`}>
                    <Icon size={48} />
                </div>

                <h1 className="text-4xl md:text-5xl font-black tracking-tight">
                    {categoryName}
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    {categoryInfo.description}
                </p>

                <div className="flex justify-center gap-4 text-sm font-medium pt-4">
                    <span className="px-4 py-2 bg-primary/5 rounded-full border border-primary/10 text-primary">
                        {t('category.totalTools').replace('{count}', categoryTools.length)}
                    </span>
                    <span className="px-4 py-2 bg-secondary/50 rounded-full border border-border">
                        {t('category.freeToUse')}
                    </span>
                </div>
            </header>

            {/* Tools Grid */}
            <section className="space-y-6">
                <h2 className="text-2xl font-bold px-2">{t('category.allCategoryTools').replace('{name}', categoryName)}</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                    {categoryTools.map((tool) => {
                        const ToolIcon = tool.icon;
                        const isFavorite = favorites.includes(tool.id);
                        const translatedTitle = t(`tools.${tool.id}.title`, { defaultValue: tool.title });
                        const translatedDesc = t(`tools.${tool.id}.description`, { defaultValue: tool.description });

                        return (
                            <Link
                                key={tool.id}
                                to={getLocalizedPath(tool.path)}
                                className="group relative bg-card border border-border rounded-2xl p-6 hover:shadow-xl hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 flex flex-col items-center text-center"
                            >
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        toggleFavorite(tool.id);
                                    }}
                                    className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-accent transition-colors z-10"
                                >
                                    <Star
                                        className={`w-5 h-5 ${isFavorite ? 'fill-yellow-500 text-yellow-500' : 'text-muted-foreground'}`}
                                    />
                                </button>

                                <div className={`w-16 h-16 rounded-2xl ${tool.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm`}>
                                    <ToolIcon className="w-8 h-8 text-white" />
                                </div>

                                <h3 className="font-bold text-base mb-2 group-hover:text-primary transition-colors line-clamp-1">
                                    {translatedTitle.split('|')[0].trim()}
                                </h3>
                                <p className="text-xs text-muted-foreground line-clamp-2">
                                    {translatedDesc}
                                </p>
                            </Link>
                        );
                    })}
                </div>
            </section>

            {/* Keyword block for SEO at bottom */}
            <section className="bg-muted/30 rounded-3xl p-10 border border-border/50 text-center space-y-6 max-w-4xl mx-auto mt-20">
                <h3 className="text-xl font-bold">{t('category.whyUse').replace('{name}', categoryName)}</h3>
                <p className="text-muted-foreground leading-relaxed">
                    {t('category.whyUseDesc').replace('{name}', categoryName)}
                </p>
            </section>
        </div>
    );
};

export default CategoryPage;
