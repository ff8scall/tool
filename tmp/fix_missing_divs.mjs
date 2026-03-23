import fs from 'fs';
import path from 'path';

const filesToFix = [
    'AgeCalculator.jsx',
    'CompoundInterestCalculator.jsx',
    'MbtiTest.jsx',
    'TowerStacker.jsx',
    'WorkHoursCalculator.jsx'
];

const srcPagesDir = 'c:\\AI\\Antigravity\\First\\utility-hub\\src\\pages';

for (const f of filesToFix) {
    const file = path.join(srcPagesDir, f);
    if (!fs.existsSync(file)) continue;
    let content = fs.readFileSync(file, 'utf8');

    // Find `<ToolGuide` and ensure there's exactly one `</div>` before it.
    // Strip existing `</div>` immediately preceding `<ToolGuide`
    content = content.replace(/<\/div>([\s\n]*)<ToolGuide/, '$1<ToolGuide');
    
    // Add `</div>` immediately preceding `<ToolGuide`
    content = content.replace(/([\s\n]*)<ToolGuide/, '$1</div>\n            <ToolGuide');

    fs.writeFileSync(file, content, 'utf8');
    console.log(`Fixed missing div in ${f}`);
}
