import fs from 'fs';
import path from 'path';

const pagesDir = 'c:\\AI\\Antigravity\\First\\utility-hub\\src\\pages';
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.jsx'));

const missingFiles = [];
for (const f of files) {
    const content = fs.readFileSync(path.join(pagesDir, f), 'utf8');
    if (!content.includes('<ToolGuide')) {
        missingFiles.push(f);
    }
}

console.log('Files missing ToolGuide:');
missingFiles.forEach(f => console.log(f));
console.log('Total:', missingFiles.length);
