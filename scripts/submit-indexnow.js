import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sitemapPath = path.resolve(__dirname, '../public/sitemap.xml');
const BASE_URL = process.env.VITE_BASE_URL || 'https://tool.lego-sia.com';
const ENGINE_KEYS = {
    'api.indexnow.org': 'bbd0d9a6843c450eb3e9d811a0fd504a',
    'searchadvisor.naver.com': '6687659b44b1f1d304f1068df35daec0'
};

const ENDPOINTS = [
    'https://api.indexnow.org/IndexNow',
    'https://searchadvisor.naver.com/indexnow'
];

async function submitToIndexNow() {
    console.log('Starting IndexNow submission...');

    if (!fs.existsSync(sitemapPath)) {
        console.error(`Error: sitemap.xml not found at ${sitemapPath}`);
        process.exit(1);
    }

    const sitemapContent = fs.readFileSync(sitemapPath, 'utf-8');
    
    // Extract logical locations (URLs) from sitemap
    const urlMatches = sitemapContent.matchAll(/<loc>(https?:\/\/[^<]+)<\/loc>/g);
    const urlList = [];
    for (const match of urlMatches) {
        urlList.push(match[1]);
    }

    if (urlList.length === 0) {
        console.error('No URLs found in sitemap.xml');
        process.exit(1);
    }

    console.log(`Found ${urlList.length} URLs to submit.`);

    const HOST = new URL(BASE_URL).hostname;

    for (const endpoint of ENDPOINTS) {
        const engineName = new URL(endpoint).hostname;
        const apiKey = ENGINE_KEYS[engineName];
        
        console.log(`\nSubmitting to ${engineName}...`);

        const data = {
            host: HOST,
            key: apiKey,
            keyLocation: `${BASE_URL}/${apiKey}.txt`,
            urlList: urlList
        };

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8'
                },
                body: JSON.stringify(data)
            });

            if (response.ok || response.status === 202) {
                console.log(`[${engineName}] Successfully submitted URLs!`);
                console.log(`Status: ${response.status} ${response.statusText}`);
            } else {
                console.error(`[${engineName}] Failed to submit URLs.`);
                console.error(`Status: ${response.status} ${response.statusText}`);
                const errorText = await response.text();
                console.error('Response:', errorText);
            }
        } catch (error) {
            console.error(`[${engineName}] Error during submission:`, error.message);
        }
    }
    
    console.log('\nIndexNow submission process completed.');
}

submitToIndexNow();
