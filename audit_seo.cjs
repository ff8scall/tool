const fs = require('fs');
const path = require('path');

const pagesDir = 'c:/AI/Antigravity/First/utility-hub/src/pages';
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.jsx'));

const results = [];

files.forEach(file => {
    const content = fs.readFileSync(path.join(pagesDir, file), 'utf-8');
    const hasSEO = content.includes('<SEO');
    const hasToolGuide = content.includes('<ToolGuide');
    
    // Check if ToolGuide has real content (not just empty props or placeholder)
    const toolGuideMatch = content.match(/<ToolGuide\s+([^>]*)\/>/s);
    let toolGuideDetails = 'Missing';
    if (hasToolGuide && toolGuideMatch) {
        toolGuideDetails = 'Present';
    }

    results.push({
        file,
        hasSEO,
        hasToolGuide,
        toolGuideDetails
    });
});

console.log(JSON.stringify(results, null, 2));
