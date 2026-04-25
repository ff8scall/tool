import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// 1. Load Data
const toolsContent = fs.readFileSync(path.join(rootDir, 'src/data/tools.js'), 'utf-8');
const ko = JSON.parse(fs.readFileSync(path.join(rootDir, 'src/locales/ko.json'), 'utf-8'));
const en = JSON.parse(fs.readFileSync(path.join(rootDir, 'src/locales/en.json'), 'utf-8'));
const htmlTemplate = fs.readFileSync(path.join(rootDir, 'dist/index.html'), 'utf-8');

const siteUrl = 'https://tool.lego-sia.com';

// Helper to extract tools using regex - fully synced with sitemap generator logic
const extractTools = (content) => {
    const tools = [];
    const toolMatches = content.matchAll(/path:\s*'([^']+)'/g);
    const seenPaths = new Set();
    
    // Extract translated status using a more granular approach
    const translatedTools = new Set();
    const toolsStartIndex = content.indexOf('export const tools = [');
    const toolsContentBlock = content.substring(toolsStartIndex);
    const toolBlocks = toolsContentBlock.split('},').map(block => block.trim());

    for (const block of toolBlocks) {
        const pathMatch = block.match(/path:\s*'([^']+)'/);
        const translatedMatch = block.match(/translated:\s*true/);
        if (pathMatch && translatedMatch) {
            translatedTools.add(pathMatch[1]);
        }
    }

    for (const match of toolMatches) {
        const routePath = match[1];
        if (routePath === '/' || seenPaths.has(routePath)) continue;
        seenPaths.add(routePath);
        
        // Find tool ID for translation lookup
        const idMatch = content.substring(0, content.indexOf(routePath)).lastIndexOf("id: '");
        let toolId = null;
        if (idMatch !== -1) {
            const idPart = content.substring(idMatch + 5);
            toolId = idPart.substring(0, idPart.indexOf("'"));
        }

        tools.push({
            id: toolId,
            path: routePath,
            translated: translatedTools.has(routePath)
        });
    }
    return tools;
};

// Helper to extract categories
const extractCategories = (content) => {
    const categories = [];
    const categoryBlockMatch = content.match(/export const toolCategories = \{([^}]+)\}/);
    if (categoryBlockMatch) {
        const categoryLines = categoryBlockMatch[1].split('\n');
        for (const line of categoryLines) {
            const idMatch = line.match(/^\s*(\w+):/);
            if (idMatch) {
                categories.push(idMatch[1]);
            }
        }
    }
    return categories;
};

const tools = extractTools(toolsContent);
const categories = extractCategories(toolsContent);

console.log(`Found ${tools.length} tools and ${categories.length} categories.`);

// 2. Generation Logic
const generatePage = (route, lang, metadata) => {
    const { title, description } = metadata;
    
    let content = htmlTemplate;
    
    // Remove existing SEO tags to prevent duplicates
    content = content.replace(/<title[^>]*>.*?<\/title>/gi, '');
    content = content.replace(/<meta[^>]*name="description"[^>]*>/gi, '');
    content = content.replace(/<meta[^>]*name="keywords"[^>]*>/gi, '');
    content = content.replace(/<meta[^>]*property="og:[^>]*"[^>]*>/gi, '');
    content = content.replace(/<meta[^>]*name="twitter:[^>]*"[^>]*>/gi, '');
    content = content.replace(/<link[^>]*rel="canonical"[^>]*>/gi, '');
    content = content.replace(/<link[^>]*rel="alternate"[^>]*>/gi, '');

    // Canonical & Hreflang
    const cleanPath = route.replace(/^\/(?:ko|en)(?=\/|$)/, '') || '';
    const currentUrl = `${siteUrl}${route === '/' ? '' : route}`;
    const koUrl = `${siteUrl}${cleanPath}` || siteUrl;
    const enUrl = `${siteUrl}/en${cleanPath}`.replace(/\/$/, '') || `${siteUrl}/en`;

    // Replace <html> lang attribute
    content = content.replace(/<html lang="[^"]*"/i, `<html lang="${lang}"`);

    const fullTitle = `${title} | Tool Hive`;
    const safeDesc = description.replace(/"/g, '&quot;').replace(/\n/g, ' ');
    
    const headTags = [
        `<title>${fullTitle}</title>`,
        `<meta name="description" content="${safeDesc}" />`,
        `<link rel="canonical" href="${currentUrl}" />`,
        `<link rel="alternate" hreflang="x-default" href="${siteUrl}" />`,
        `<link rel="alternate" hreflang="ko" href="${koUrl}" />`,
        `<link rel="alternate" hreflang="en" href="${enUrl}" />`,
        `<meta property="og:type" content="website" />`,
        `<meta property="og:title" content="${fullTitle}" />`,
        `<meta property="og:description" content="${safeDesc}" />`,
        `<meta property="og:url" content="${currentUrl}" />`,
        `<meta property="og:image" content="${siteUrl}/og-image.png" />`,
        `<meta name="twitter:card" content="summary_large_image" />`,
        `<meta name="twitter:title" content="${fullTitle}" />`,
        `<meta name="twitter:description" content="${safeDesc}" />`
    ].join('\n    ');

    content = content.replace('</head>', `    ${headTags}\n</head>`);

    // Inject visible content for Googlebot
    const visibleContent = `
        <div class="ssr-content" style="padding: 20px; max-width: 800px; margin: 0 auto;">
            <h1>${title}</h1>
            <p>${description}</p>
            <hr />
            <p>${lang === 'ko' ? '주요 도구 카테고리:' : 'Main Tool Categories:'}</p>
            <ul>
                ${categories.map(cat => `<li><a href="/category/${cat}">${cat}</a></li>`).join('')}
            </ul>
            <a href="/">${lang === 'ko' ? '홈으로 돌아가기' : 'Back to Home'}</a>
        </div>
    `;
    
    // Replace the #root div content even if it's not empty
    content = content.replace(/<div id="root">([\s\S]*?)<\/div>/, `<div id="root">${visibleContent}</div>`);

    // Save File
    const outDir = path.join(rootDir, 'dist', route === '/' ? '' : route);
    if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir, { recursive: true });
    }
    fs.writeFileSync(path.join(outDir, 'index.html'), content);
};

// 3. Process All Routes
// Root (Korean)
generatePage('/', 'ko', { 
    title: 'Tool Hive | 일상을 편리하게 만드는 134가지 이상의 도구', 
    description: ko.home.footerDesc 
});

// Root (English)
generatePage('/en', 'en', { 
    title: 'Tool Hive | Over 134+ Free Utilities for Everyday Life', 
    description: en.home.footerDesc 
});

// Categories
categories.forEach(catId => {
    const koData = ko.categoryData[catId];
    if (koData) {
        generatePage(`/category/${catId}`, 'ko', { title: koData.title, description: koData.description });
    }
    const enData = en.categoryData[catId];
    if (enData) {
        generatePage(`/en/category/${catId}`, 'en', { title: enData.title, description: enData.description });
    }
});

// Tools
tools.forEach(tool => {
    const toolId = tool.id;
    const toolRoute = tool.path;

    // Korean
    const koTool = ko.tools[toolId];
    if (koTool) {
        generatePage(toolRoute, 'ko', { title: koTool.title, description: koTool.description });
    }

    // English
    if (tool.translated) {
        const enTool = en.tools[toolId];
        if (enTool) {
            generatePage(`/en${toolRoute}`, 'en', { title: enTool.title, description: enTool.description });
        }
    }
});

console.log('Successfully generated static pages for SEO.');
