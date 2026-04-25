import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getRoutes = () => {
  try {
    const toolsContent = fs.readFileSync(path.resolve(__dirname, '../src/data/tools.js'), 'utf-8');
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

const routes = getRoutes();
console.log('Total routes:', routes.length);
console.log('Sample routes:', routes.slice(0, 20));
console.log('Last 5 routes:', routes.slice(-5));
