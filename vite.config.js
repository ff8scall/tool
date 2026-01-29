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
    const routes = ['/']; // Add root

    // Add categories - dynamically extract from toolCategories object
    const categoryBlockMatch = toolsContent.match(/export const toolCategories = \{([^}]+)\}/);
    if (categoryBlockMatch) {
      const categoryLines = categoryBlockMatch[1].split('\n');
      for (const line of categoryLines) {
        const idMatch = line.match(/^\s*(\w+):/);
        if (idMatch) {
          routes.push(`/category/${idMatch[1]}`);
        }
      }
    }

    const matches = toolsContent.matchAll(/path:\s*'([^']+)'/g);
    for (const match of matches) {
      routes.push(match[1]);
    }
    return routes;
  } catch (e) {
    console.warn('Failed to read tools.js for prerendering:', e);
    return ['/'];
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Disable prerender on Vercel to avoid Puppeteer issues
    ...(process.env.VERCEL ? [] : [
      vitePrerender({
        staticDir: path.join(__dirname, 'dist'),
        routes: getRoutes(),
        renderer: new vitePrerender.PuppeteerRenderer({
          maxConcurrentRoutes: 1,
          renderAfterTime: 2000,
          // Critical for CI/GitHub Actions
          args: ['--no-sandbox', '--disable-setuid-sandbox'],
        }),
        postProcess(renderedRoute) {
          // Ensure index.html is generated for every route (directory structure)
          renderedRoute.outputPath = path.join(__dirname, 'dist', renderedRoute.route, 'index.html');
          return renderedRoute;
        },
      }),
    ]),
  ],
  base: '/utility-hub/',
})
