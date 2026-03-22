import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Menu, X, ChevronDown, Search, Activity, Sparkles, Code, Calculator, Type, Image, Gamepad2 } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import SearchModal from './SearchModal';
import RelatedTools from './RelatedTools';
import Logo from './Logo';
import { tools, toolCategories } from '../data/tools';

const Layout = ({ children }) => {
    const location = useLocation();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    // Keyboard shortcut for search (Ctrl+K)
    React.useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                setIsSearchOpen(true);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Helper to clean title for menu (remove description parts after |)
    const getShortTitle = (title) => {
        return title.split('|')[0].trim();
    };

    // Sort categories by predefined order
    const categoryOrder = ['unit', 'finance', 'text', 'dev', 'utility', 'health', 'games', 'fun', 'trivia'];

    const navCategories = categoryOrder.map(id => {
        const categoryTools = tools.filter(tool => tool.category === id);
        return {
            id,
            title: toolCategories[id],
            items: categoryTools.map(tool => ({
                path: tool.path,
                label: getShortTitle(tool.title)
            }))
        };
    }).filter(category => category.items.length > 0);

    return (
        <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
            {/* Skip to content link for accessibility */}
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:shadow-lg"
            >
                본문으로 건너뛰기
            </a>

            {/* Header */}
            <header className="border-b border-border/40 bg-background/80 backdrop-blur-md sticky top-0 z-50 shadow-sm supports-[backdrop-filter]:bg-background/60">

                <div className="container-custom h-16 flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="hover:opacity-90 transition-opacity">
                        <Logo />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-6">
                        <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">홈</Link>

                        {navCategories.map((category) => (
                            <div key={category.title} className="relative group">
                                <Link
                                    to={`/category/${category.id}`}
                                    className="flex items-center gap-1 text-sm font-medium hover:text-primary transition-colors py-2"
                                >
                                    {category.title}
                                    <ChevronDown className="w-3 h-3" />
                                </Link>
                                {/* Dropdown */}
                                <div className="absolute top-full left-0 w-48 bg-white dark:bg-gray-950 border border-border rounded-md shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 z-50">
                                    <div className="py-1">
                                        {category.items.map((item) => (
                                            <Link
                                                key={item.path}
                                                to={item.path}
                                                className="block px-4 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                                            >
                                                {item.label}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </nav>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="p-2 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
                            aria-label="검색"
                        >
                            <Search className="w-5 h-5" />
                        </button>
                        <ThemeToggle />

                        {/* Mobile Menu Button */}
                        <button
                            className="md:hidden p-2 rounded-md hover:bg-accent"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="메뉴 열기"
                        >
                            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden border-b border-border bg-background">
                    <div className="container-custom py-4 space-y-4">
                        <Link
                            to="/"
                            className="block text-sm font-medium py-2"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            홈
                        </Link>
                        {navCategories.map((category) => (
                            <div key={category.title} className="space-y-2">
                                <Link
                                    to={`/category/${category.id}`}
                                    className="text-xs font-bold text-muted-foreground uppercase tracking-wider hover:text-primary transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {category.title}
                                </Link>
                                <div className="pl-4 space-y-1 border-l-2 border-border">
                                    {category.items.map((item) => (
                                        <Link
                                            key={item.path}
                                            to={item.path}
                                            className="block text-sm py-2 text-muted-foreground hover:text-foreground"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Main Content */}
            <main id="main-content" className="flex-1 container-custom py-8">
                {children}
                {location.pathname !== '/' && <RelatedTools />}
            </main>

            {/* Footer with SEO Sitemap */}
            <footer className="border-t border-border mt-auto bg-muted/30">
                <div className="container-custom py-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-12">
                        {navCategories.map((category) => (
                            <div key={category.title} className="space-y-4">
                                <h4 className="font-bold text-sm text-foreground uppercase tracking-wider">{category.title}</h4>
                                <ul className="space-y-2">
                                    {category.items.slice(0, 10).map((item) => (
                                        <li key={item.path}>
                                            <Link
                                                to={item.path}
                                                className="text-xs text-muted-foreground hover:text-primary transition-colors"
                                            >
                                                {item.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className="pt-8 border-t border-border/50 text-center space-y-4">
                        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
                            <Link to="/terms" className="text-muted-foreground hover:text-foreground underline-offset-4 hover:underline">이용약관</Link>
                            <Link to="/privacy" className="text-muted-foreground hover:text-foreground underline-offset-4 hover:underline">개인정보처리방침</Link>
                            <Link to="/contact" className="text-muted-foreground hover:text-foreground underline-offset-4 hover:underline">문의하기</Link>
                            <a href="/sitemap.xml" className="text-muted-foreground hover:text-foreground underline-offset-4 hover:underline">사이트맵</a>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm font-bold text-foreground opacity-80">Tool Hive (툴 하이브)</p>
                            <p className="text-xs text-muted-foreground italic">"당신의 일상을 더 편리하게 만드는 88가지 이상의 무료 온라인 도구 모음"</p>
                        </div>
                        <p className="text-xs text-muted-foreground/60">© {new Date().getFullYear()} Tool Hive. All rights reserved.</p>
                    </div>
                </div>
            </footer>

            <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </div>
    );
};

export default Layout;
