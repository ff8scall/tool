import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const toolsPath = path.resolve(__dirname, '../src/data/tools.js');
const publicPath = path.resolve(__dirname, '../public');
const distPath = path.resolve(__dirname, '../dist');

// Base URL - ensuring it matches the current domain
const BASE_URL = process.env.VITE_BASE_URL || 'https://tool.lego-sia.com';

function generateSitemap() {
    console.log('Generating sitemap...');

    if (!fs.existsSync(toolsPath)) {
        console.error(`Error: tools.js not found at ${toolsPath}`);
        process.exit(1);
    }

    const content = fs.readFileSync(toolsPath, 'utf-8');
    
    // Better tool extraction: instead of regexing across EVERYTHING, we'll try to split by blocks
    const translatedTools = new Set();
    
    // Find where tools array starts
    const toolsStartIndex = content.indexOf('export const tools = [');
    if (toolsStartIndex === -1) {
        console.error('Could not find tools array in tools.js');
        process.exit(1);
    }

    const toolsContent = content.substring(toolsStartIndex);
    
    // Divide into individual tool objects using simple delimiter (assuming flat structure as in tools.js)
    const toolBlocks = toolsContent.split('},').map(block => block.trim());

    for (const block of toolBlocks) {
        const pathMatch = block.match(/path:\s*'([^']+)'/);
        const translatedMatch = block.match(/translated:\s*true/);
        
        if (pathMatch && translatedMatch) {
            translatedTools.add(pathMatch[1]);
        }
    }

    console.log(`Detected ${translatedTools.size} translated tools.`);

    const urls = [];

    // Base URL objects
    const pushUrls = (pathRoute, priority, changefreq, forceEn = false) => {
        const cleanRoute = pathRoute.startsWith('/') ? pathRoute : `/${pathRoute}`;
        const koUrl = `${BASE_URL}${cleanRoute}`.replace(/\/$/, '') || `${BASE_URL}/`;
        const enUrl = `${BASE_URL}/en${cleanRoute}`.replace(/\/$/, '') || `${BASE_URL}/en`;
        
        // Always add Korean (default)
        urls.push({
            loc: koUrl,
            koUrl,
            enUrl,
            changefreq,
            priority,
            lang: 'ko'
        });
        
        // Add English only if tool is translated or it's a core page
        const isTranslated = translatedTools.has(pathRoute) || pathRoute === '' || pathRoute.startsWith('category/');
        if (isTranslated || forceEn) {
            urls.push({
                loc: enUrl,
                koUrl,
                enUrl,
                changefreq,
                priority,
                lang: 'en'
            });
        }
    };

    // Add home page
    pushUrls('', '1.0', 'weekly', true);

    // Add category pages
    const categoryBlock = content.match(/export const toolCategories = {([\s\S]+?)}/);
    if (categoryBlock) {
        const ids = categoryBlock[1].matchAll(/(\w+):/g);
        for (const id of ids) {
            pushUrls(`category/${id[1]}`, '0.9', 'weekly', true);
        }
    }

    // Add tool pages
    const toolMatches = content.matchAll(/path:\s*'([^']+)'/g);
    const seenPaths = new Set();
    for (const match of toolMatches) {
        const routePath = match[1];
        if (routePath === '/' || seenPaths.has(routePath)) continue;
        seenPaths.add(routePath);
        pushUrls(routePath, '0.8', 'monthly');
    }

    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <xhtml:link rel="alternate" hreflang="ko" href="${url.koUrl}" />
    <xhtml:link rel="alternate" hreflang="en" href="${url.enUrl}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${url.koUrl}" />
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

    // Write to both public and dist if they exist
    if (fs.existsSync(publicPath)) {
        fs.writeFileSync(path.join(publicPath, 'sitemap.xml'), sitemapContent);
        console.log(`Sitemap updated in ${publicPath}/sitemap.xml`);
    }

    if (fs.existsSync(distPath)) {
        fs.writeFileSync(path.join(distPath, 'sitemap.xml'), sitemapContent);
        console.log(`Sitemap updated in ${distPath}/sitemap.xml`);
    }

    console.log(`Sitemap generation complete with ${urls.length} URLs.`);

    generateRSS(urls);
}

function generateRSS(urls) {
    console.log('Generating RSS feed...');
    const rssPathPublic = path.join(publicPath, 'rss.xml');
    const rssPathDist = path.join(distPath, 'rss.xml');

    // Create RSS items
    const items = urls.map(url => {
        let title = 'Home';
        const cleanLoc = url.loc.replace(BASE_URL, '').replace(/^\/en/, '');
        
        if (cleanLoc && cleanLoc !== '/') {
            const pathParts = cleanLoc.split('/').filter(p => p && p.length > 0);
            const slug = pathParts[pathParts.length - 1] || 'Tool';
            // Convert kebab-case to Title Case
            title = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
            
            // Add (EN) suffix for English URLs
            if (url.loc.includes('/en/')) {
                title += ' (EN)';
            }
        } else if (url.loc.endsWith('/en')) {
            title = 'Home (EN)';
        }

        return `    <item>
      <title>${title}</title>
      <link>${url.loc}</link>
      <guid>${url.loc}</guid>
      <pubDate>${new Date().toUTCString()}</pubDate>
    </item>`;
    }).join('\n');

    const rssContent = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Tool Hive - Free Online Utility Tools</title>
    <link>${BASE_URL}/</link>
    <description>Over 134+ free online tools for your productivity</description>
    <language>ko-kr</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

    if (fs.existsSync(publicPath)) {
        fs.writeFileSync(rssPathPublic, rssContent);
    }
    if (fs.existsSync(distPath)) {
        fs.writeFileSync(rssPathDist, rssContent);
    }
    console.log(`RSS feed generation complete.`);
}

generateSitemap();
