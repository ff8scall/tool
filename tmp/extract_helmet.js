const fs = require('fs');
const path = require('path');

const srcPagesDir = 'c:\\AI\\Antigravity\\First\\utility-hub\\src\\pages';
const files = fs.readdirSync(srcPagesDir).filter(f => f.endsWith('.jsx'));

const results = [];

for (const file of files) {
    const filePath = path.join(srcPagesDir, file);
    const content = fs.readFileSync(filePath, 'utf8');

    if (content.includes('<Helmet>')) {
        let title = '';
        let description = '';
        let keywords = '';

        const titleMatch = content.match(/<title>(.*?)<\/title>/);
        if (titleMatch) title = titleMatch[1];

        const descMatch = content.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["'].*?\/>/);
        if (descMatch) description = descMatch[1];

        const keyMatch = content.match(/<meta\s+name=["']keywords["']\s+content=["'](.*?)["'].*?\/>/);
        if (keyMatch) keywords = keyMatch[1];

        results.push({
            file,
            title,
            description,
            keywords
        });
    }
}

console.log(JSON.stringify(results, null, 2));
