import fs from 'fs';
import path from 'path';

const filesToFix = [
    'AgeCalculator.jsx',
    'CompoundInterestCalculator.jsx',
    'CurrencyConverter.jsx',
    'MbtiTest.jsx',
    'TemperatureConverter.jsx',
    'TowerStacker.jsx',
    'WorkHoursCalculator.jsx'
];

const srcPagesDir = 'c:\\AI\\Antigravity\\First\\utility-hub\\src\\pages';

for (const f of filesToFix) {
    const file = path.join(srcPagesDir, f);
    if (!fs.existsSync(file)) continue;
    let content = fs.readFileSync(file, 'utf8');

    // Remove all injected `</div>`s
    content = content.replace(/\n        <\/div>(\s*\);\s*\n\s*};\s*\n)/g, '$1');

    // Find the LAST `);\n};\n` and put one `</div>` before it.
    const lastReturnEnd = content.lastIndexOf(');');
    const funcEnd = content.indexOf('};', lastReturnEnd);
    if (lastReturnEnd !== -1) {
        // Look backwards to ensure no </div> right before it.
        const textBefore = content.substring(lastReturnEnd - 20, lastReturnEnd);
        if (!textBefore.includes('</div>')) {
            content = content.substring(0, lastReturnEnd) + '        </div>\n    ' + content.substring(lastReturnEnd);
        }
    }

    fs.writeFileSync(file, content, 'utf8');
    console.log(`Fixed ${f}`);
}
