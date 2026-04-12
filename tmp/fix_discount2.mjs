import fs from 'fs';
const filePath = 'c:\\AI\\Antigravity\\First\\utility-hub\\src\\pages\\DiscountCalculator.jsx';
let content = fs.readFileSync(filePath, 'utf8');

// The issue is `        </div>\n            <ToolGuide\n`
content = content.replace(/<\/div>(\s*)<ToolGuide\s*title="? ì¸??ê³„ì‚°ê¸??¬ìš© ê°€?´ë“œ"/, '$1<ToolGuide\ntitle="? ì¸??ê³„ì‚°ê¸??¬ìš© ê°€?´ë“œ"');

// And add </div> before the final );
content = content.replace(/ \/>(\s*)\);(\s*)};/, ' />\n</div>\n);\n};');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed DiscountCalculator');
