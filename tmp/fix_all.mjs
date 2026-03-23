import fs from 'fs';
import path from 'path';

const srcPagesDir = 'c:\\AI\\Antigravity\\First\\utility-hub\\src\\pages';
const files = fs.readdirSync(srcPagesDir).filter(f => f.endsWith('.jsx'));

for (const file of files) {
    const filePath = path.join(srcPagesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    let modified = false;

    // Check if we have the specific bad pattern
    const match = content.match(/<\/div>([\s\n]*)<ToolGuide([\s\n]+)title=/);
    if (match) {
        // We replace it assuming it's the `</div>` closing the main wrapper.
        content = content.replace(/<\/div>([\s\n]*)<ToolGuide([\s\n]+)title=/, '$1<ToolGuide$2title=');
        
        // We also need to add a closing </div> at the end.
        // Usually it ends with `/>\n    );\n};\n\nexport default ...;
        // So we replace `    );\n};` with `        </div>\n    );\n};`
        content = content.replace(/(\s*)\);\s*\n\s*};\s*\n/g, '\n        </div>$1);\n};\n');
        
        modified = true;
    }

    if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Fixed ${file}`);
    }
}
