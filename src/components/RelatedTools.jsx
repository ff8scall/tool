import React, { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { tools } from '../data/tools';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const RelatedTools = () => {
    const location = useLocation();
    const { t, getLocalizedPath, lang } = useLanguage();
    const currentPath = location.pathname;

    // Memoize the related tools calculation
    const relatedTools = useMemo(() => {
        // Clean path (remove /ko or /en and leading slashes)
        let cleanPath = currentPath.replace(/^\/(ko|en)(?=\/|$)/, '');
        if (cleanPath.startsWith('/')) cleanPath = cleanPath.slice(1);
        if (cleanPath === '') cleanPath = '/';

        // Filter tools based on language
        let availableTools = tools;
        if (lang === 'en') {
            availableTools = tools.filter(t => t.translated);
        }

        // 1. Find current tool
        const currentTool = availableTools.find(t => t.path === cleanPath || t.path === '/' + cleanPath);

        if (!currentTool) return [];

        // 2. Filter by same category, exclude current
        let candidates = availableTools.filter(t =>
            t.category === currentTool.category && t.id !== currentTool.id
        );

        // 3. If less than 4, fill with random popular tools (excluding current and already selected)
        if (candidates.length < 4) {
            const others = availableTools.filter(t =>
                t.id !== currentTool.id && !candidates.includes(t)
            );
            // Shuffle others
            const shuffled = others.sort(() => 0.5 - Math.random());
            candidates = [...candidates, ...shuffled.slice(0, 4 - candidates.length)];
        }

        // 4. Limit to 4 items
        return candidates.slice(0, 4);
    }, [currentPath, lang]);

    if (relatedTools.length === 0) return null;

    return (
        <div className="mt-12 pt-8 border-t border-border">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                    <span className="w-1 h-6 bg-primary rounded-full"></span>
                    {t('related.title')}
                </h3>
                <Link to={getLocalizedPath('/')} className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors">
                    {t('related.viewAll')} <ArrowRight className="w-3 h-3" />
                </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {relatedTools.map((tool) => {
                    const Icon = tool.icon;
                    const translatedTitle = t(`tools.${tool.id}.title`, { defaultValue: tool.title });
                    const translatedDesc = t(`tools.${tool.id}.description`, { defaultValue: tool.description });
                    
                    return (
                        <Link
                            key={tool.id}
                            to={getLocalizedPath(tool.path)}
                            className="group flex items-center gap-3 p-3 rounded-xl border border-border bg-card hover:bg-accent/50 hover:border-primary/30 transition-all duration-200"
                        >
                            <div className={`p-2 rounded-lg ${tool.color} bg-opacity-10 text-opacity-100`}>
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white ${tool.color} shadow-sm group-hover:scale-110 transition-transform`}>
                                    <Icon className="w-5 h-5" />
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="text-sm font-bold text-foreground truncate group-hover:text-primary transition-colors">
                                    {translatedTitle.split('|')[0].trim()}
                                </div>
                                <div className="text-xs text-muted-foreground truncate">
                                    {translatedDesc}
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default RelatedTools;
