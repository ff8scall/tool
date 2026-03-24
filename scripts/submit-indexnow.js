import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sitemapPath = path.resolve(__dirname, '../public/sitemap.xml');
const BASE_URL = process.env.VITE_BASE_URL || 'https://math.lego-sia.com';
const API_KEY = 'c6e8260628d349a68cb9d68d6e4a891c';
const KEY_LOCATION = `${BASE_URL}/${API_KEY}.txt`;
const HOST = new URL(BASE_URL).hostname;

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

    const data = {
        host: HOST,
        key: API_KEY,
        keyLocation: KEY_LOCATION,
        urlList: urlList
    };

    try {
        const response = await fetch('https://api.indexnow.org/IndexNow', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            console.log('Successfully submitted URLs to IndexNow!');
            console.log(`Status: ${response.status} ${response.statusText}`);
        } else {
            console.error('Failed to submit URLs to IndexNow.');
            console.error(`Status: ${response.status} ${response.statusText}`);
            const errorText = await response.text();
            console.error('Response:', errorText);
        }
    } catch (error) {
        console.error('Error during IndexNow submission:', error.message);
    }
}

submitToIndexNow();
