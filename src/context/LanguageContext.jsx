import React, { createContext, useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ko from '../locales/ko.json';
import en from '../locales/en.json';

const dictionaries = { ko, en };
const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const location = useLocation();
    const navigate = useNavigate();
    
    // Default to Korean if path doesn't start with /en/
    const defaultLang = location.pathname.startsWith('/en') ? 'en' : 'ko';
    const [lang, setLang] = useState(defaultLang);

    // Sync state if URL changes directly
    useEffect(() => {
        const pathLang = location.pathname.startsWith('/en') ? 'en' : 'ko';
        if (lang !== pathLang) {
            setLang(pathLang);
        }
    }, [location.pathname]);

    // Simple translate hook implementation with fallback support
    const t = (key, options = {}) => {
        const keys = key.split('.');
        let value = dictionaries[lang];
        for (const k of keys) {
            if (value === undefined || value === null) {
                return options.defaultValue !== undefined ? options.defaultValue : key;
            }
            value = value[k];
        }
        return value || (options.defaultValue !== undefined ? options.defaultValue : key);
    };

    // Helper to format localized links
    const getLocalizedPath = (path) => {
        // Strip out existing lang /en/ or /ko/ prefix first if any
        let cleanPath = path.replace(/^\/(?:ko|en)(?=\/|$)/, '');
        if (!cleanPath.startsWith('/')) cleanPath = '/' + cleanPath;
        
        // If language is English, add /en prefix. If Korean, no prefix.
        if (lang === 'en') {
            return `/en${cleanPath}`.replace(/\/$/, '') || '/en';
        }
        return cleanPath.replace(/\/$/, '') || '/';
    };

    // Switch language and navigate
    const switchLanguage = (newLang) => {
        if (newLang === lang) return;
        
        // Strip out current lang prefix
        let cleanPath = location.pathname.replace(/^\/(?:ko|en)(?=\/|$)/, '');
        if (!cleanPath.startsWith('/')) cleanPath = '/' + cleanPath;

        const search = location.search;
        
        if (newLang === 'en') {
            navigate(`/en${cleanPath}${search}`, { replace: true });
        } else {
            // Default (Korean) has no prefix
            navigate(`${cleanPath}${search}`, { replace: true });
        }
    };

    return (
        <LanguageContext.Provider value={{ lang, t, getLocalizedPath, switchLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
