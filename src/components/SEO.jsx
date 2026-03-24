import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const SEO = ({ title, description, keywords, image, schema, category, faqs, steps }) => {
    const location = useLocation();
    const { lang, getLocalizedPath } = useLanguage();
    const siteTitle = 'Tool Hive';
    const siteUrl = 'https://tool.lego-sia.com';
    const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
    const defaultDescription = lang === 'en' 
        ? 'A collection of convenient web tools: Fortune telling, MBTI, Lotto, unit converters, loan calculators, word counts, and more. Experience over 134 free tools now.'
        : '편리한 웹 도구 모음: 사주팔자, MBTI, 로또, 길이 변환, 무게 변환, 대출 계산, 날짜 계산, 글자수 세기, 환율 변환 등 134가지 이상의 무료 도구를 지금 체험해보세요.';
    const metaDescription = description || defaultDescription;
    const metaKeywords = keywords 
        ? `${keywords}, ${lang === 'en' ? 'utility, tools, calculator, converter' : '유틸리티, 도구, 계산기, 변환기'}` 
        : (lang === 'en' ? 'utility, tools, calculator, converter, web tools' : '유틸리티, 도구, 계산기, 변환기, 웹 툴');

    // Default OG image
    const defaultImage = `${siteUrl}/og-image.png`;
    const ogImage = image || defaultImage;

    // Current page URL (normalized - no trailing slash, no hash for SEO)
    const normalizedPath = location.pathname.replace(/\/$/, '') || '';
    const currentUrl = `${siteUrl}${normalizedPath}`;
    
    // Internationalization URLs
    const cleanPath = normalizedPath.replace(/^\/(?:ko|en)(?=\/|$)/, '') || '';
    const koUrl = `${siteUrl}${cleanPath}` || siteUrl;
    const enUrl = `${siteUrl}/en${cleanPath}`.replace(/\/$/, '') || `${siteUrl}/en`;

    // WebSite Schema
    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": siteTitle,
        "url": siteUrl,
        "description": metaDescription,
        "potentialAction": {
            "@type": "SearchAction",
            "target": `${siteUrl}/#/search?q={search_term_string}`,
            "query-input": "required name=search_term_string"
        }
    };

    // Breadcrumb Schema
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {
                "@type": "ListItem",
                "position": 1,
                "name": lang === 'en' ? 'Home' : '홈',
                "item": siteUrl
            }
        ]
    };

    if (category) {
        const categoryMap = {
            '단위 변환': 'unit',
            '생활/금융': 'finance',
            '텍스트': 'text',
            '개발': 'dev',
            '개발자 도구': 'dev',
            '유틸리티': 'utility',
            '건강': 'health',
            '게임': 'games',
            '운세/재미': 'fun'
        };
        const categoryId = categoryMap[category] || category;

        breadcrumbSchema.itemListElement.push({
            "@type": "ListItem",
            "position": 2,
            "name": category,
            "item": `${siteUrl}/category/${categoryId}`
        });

        if (title) {
            breadcrumbSchema.itemListElement.push({
                "@type": "ListItem",
                "position": 3,
                "name": title,
                "item": currentUrl
            });
        }
    } else if (title) {
        breadcrumbSchema.itemListElement.push({
            "@type": "ListItem",
            "position": 2,
            "name": title,
            "item": currentUrl
        });
    }

    const schemas = [websiteSchema, breadcrumbSchema];
    if (schema) schemas.push(schema);

    // FAQ Schema
    if (faqs && faqs.length > 0) {
        schemas.push({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqs.map(faq => ({
                "@type": "Question",
                "name": faq.q,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.a
                }
            }))
        });
    }

    // HowTo Schema
    if (steps && steps.length > 0 && title) {
        schemas.push({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": lang === 'en' ? `How to use ${title}` : `${title} 사용 방법`,
            "step": steps.map((step, index) => ({
                "@type": "HowToStep",
                "position": index + 1,
                "text": step
            }))
        });
    }

    return (
        <Helmet>
            <html lang={lang} />
            {/* Basic Meta Tags */}
            <title>{fullTitle}</title>
            <meta name="description" content={metaDescription} />
            <meta name="keywords" content={metaKeywords} />
            <link rel="canonical" href={currentUrl} />
            <link rel="alternate" hreflang="x-default" href={koUrl} />
            <link rel="alternate" hreflang="ko" href={koUrl} />
            <link rel="alternate" hreflang="en" href={enUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:site_name" content={siteTitle} />
            <meta property="og:locale" content={lang === 'ko' ? 'ko_KR' : 'en_US'} />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={currentUrl} />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={metaDescription} />
            <meta name="twitter:image" content={ogImage} />

            {/* Additional Meta Tags */}
            <meta name="robots" content="index, follow" />
            <meta name="language" content={lang === 'ko' ? 'Korean' : 'English'} />
            <meta name="author" content="Tool Hive" />

            {/* Schema.org JSON-LD */}
            {schemas.map((s, i) => (
                <script key={i} type="application/ld+json">
                    {JSON.stringify(s)}
                </script>
            ))}
        </Helmet>
    );
};

export default SEO;
