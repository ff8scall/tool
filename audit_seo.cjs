const fs = require('fs');
const path = require('path');

const pagesDir = 'c:/AI/Antigravity/Tool/src/pages';
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.jsx'));

const results = [];

files.forEach(file => {
    const content = fs.readFileSync(path.join(pagesDir, file), 'utf-8');
    const hasSEO = content.includes('<SEO');
    const hasToolGuide = content.includes('<ToolGuide');
    const h1Matches = content.match(/<h1/gi);
    const h1Count = h1Matches ? h1Matches.length : 0;
    const hasH1 = h1Count > 0;
    
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
        hasH1,
        h1Count,
        toolGuideDetails
    });
});

const missingH1 = results.filter(r => !r.hasH1).map(r => r.file);
const multipleH1 = results.filter(r => r.h1Count > 1).map(r => ({ file: r.file, count: r.h1Count }));

console.log('Files missing <h1>:');
console.log(JSON.stringify(missingH1, null, 2));

console.log('\nFiles with multiple <h1>:');
console.log(JSON.stringify(multipleH1, null, 2));

fs.writeFileSync('seo_audit_h1_results.json', JSON.stringify(results, null, 2));
