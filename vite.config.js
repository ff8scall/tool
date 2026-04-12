import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { createRequire } from 'module'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const require = createRequire(import.meta.url)
const vitePrerender = require('vite-plugin-prerender')

// Helper to extract paths from tools.js without importing it
const getRoutes = () => {
  try {
    const toolsContent = fs.readFileSync(path.resolve(__dirname, 'src/data/tools.js'), 'utf-8');
    const rawRoutes = ['/']; // Add root
    
    // Add categories
    const categoryBlockMatch = toolsContent.match(/export const toolCategories = \{([^}]+)\}/);
    if (categoryBlockMatch) {
      const categoryLines = categoryBlockMatch[1].split('\n');
      for (const line of categoryLines) {
        const idMatch = line.match(/^\s*(\w+):/);
        if (idMatch) {
          rawRoutes.push(`/category/${idMatch[1]}`);
        }
      }
    }

    const matches = toolsContent.matchAll(/path:\s*'([^']+)'/g);
    for (const match of matches) {
      const matchedPath = match[1].startsWith('/') ? match[1] : '/' + match[1];
      rawRoutes.push(matchedPath);
    }

    const finalRoutes = ['/'];
    rawRoutes.forEach(route => {
      if (route === '/') return;
      const cleanRoute = route.startsWith('/') ? route : '/' + route;
      finalRoutes.push(cleanRoute); // Root (Korean)
      finalRoutes.push(`/en${cleanRoute}`); // English
    });

    return finalRoutes;
  } catch (e) {
    console.warn('Failed to read tools.js for prerendering:', e);
    return ['/', '/ko', '/en'];
  }
}

// https://vite.dev/config/
// Trigger redeploy for MIME type fix
export default defineConfig({
  plugins: [
    react(),
    // Disable prerender on Vercel to avoid Puppeteer issues
    ...(process.env.VERCEL ? [] : [
      vitePrerender({
        staticDir: path.join(__dirname, 'dist'),
        routes: getRoutes(),
        renderer: new vitePrerender.PuppeteerRenderer({
          maxConcurrentRoutes: 1, // Stay memory efficient
          renderAfterTime: 2500, // Slightly more time for dynamic content
          headless: true,
          // CRITICAL: Ensure build fails if prerendering fails
          skipThirdPartyRequests: true, // Speed up by ignoring non-essential external JS
          args: [
            '--no-sandbox', 
            '--disable-setuid-sandbox', 
            '--disable-dev-shm-usage',
            '--disable-gpu',
            '--hide-scrollbars'
          ],
        }),
        postProcess(renderedRoute) {
          // SEO Polish: Remove script tags that are not needed after prerender (optional)
          // Ensure index.html is generated for every route (directory structure)
          renderedRoute.outputPath = path.join(__dirname, 'dist', renderedRoute.route, 'index.html');
          return renderedRoute;
        },
      }),
    ]),
  ],
  base: '/',
})
