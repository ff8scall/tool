const fs = require('fs');
const path = require('path');

const toolsContent = fs.readFileSync('c:/AI/Antigravity/First/utility-hub/src/data/tools.js', 'utf-8');
const appContent = fs.readFileSync('c:/AI/Antigravity/First/utility-hub/src/App.jsx', 'utf-8');
const pagesDir = 'c:/AI/Antigravity/First/utility-hub/src/pages';

// 1. Get all page components
const pageFiles = fs.readdirSync(pagesDir).filter(f => f.endsWith('.jsx') && f !== 'Home.jsx' && f !== 'CategoryPage.jsx' && f !== 'SEO.jsx');
const pageComponents = pageFiles.map(f => f.replace('.jsx', ''));

// 2. Parse basic tool properties from tools.js using simpler parsing
const tools = [];
const matches = toolsContent.matchAll(/id:\s*'([^']+)',\s*title:\s*'([^']+)',\s*description:\s*'([^']+)',\s*path:\s*'([^']+)',\s*category:\s*'([^']+)'/g);
for (const m of matches) {
    tools.push({ id: m[1], title: m[2], path: m[4], category: m[5] });
}

// Check if any tool has an invalid category
const validCategories = ['unit', 'finance', 'text', 'dev', 'utility', 'health', 'games', 'fun', 'trivia'];
const invalidCategoryTools = tools.filter(t => !validCategories.includes(t.category));
if (invalidCategoryTools.length > 0) {
    console.log('Invalid category assignment:');
    console.log(invalidCategoryTools.map(t => t.id + ' -> ' + t.category).join('\n'));
} else {
    console.log('All tools have valid categories.');
}

// 3. Map components to paths from App.jsx
const componentPaths = {};
const routeRegex = /<Route\s+path=\"([^\"]+)\"\s+element=\{<([A-Za-z0-9_]+)\s*\/>\}/g;
for (const match of appContent.matchAll(routeRegex)) {
    const routePath = match[1];
    const comp = match[2];
    if (routePath === '*' || routePath === '/' || routePath.includes(':')) continue;
    if (!componentPaths[comp]) componentPaths[comp] = [];
    componentPaths[comp].push(routePath);
}

// 4. Find missing pages
const missingInTools = [];
for (const comp of pageComponents) {
    const paths = componentPaths[comp];
    if (!paths) {
        missingInTools.push(comp + ' (Not in App.jsx)');
        continue;
    }
    // Check if at least one path is in tools
    const isInTools = paths.some(p => tools.some(t => t.path === p));
    if (!isInTools) {
        missingInTools.push(comp + ' (Paths: ' + paths.join(', ') + ')');
    }
}

if (missingInTools.length > 0) {
    console.log('\nMissing in tools.js:');
    console.log(missingInTools.join('\n'));
} else {
    console.log('\nNo pages missing in tools.js.');
}
