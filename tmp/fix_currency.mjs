import fs from 'fs';
const file = 'c:\\AI\\Antigravity\\First\\utility-hub\\src\\pages\\CurrencyConverter.jsx';
let content = fs.readFileSync(file, 'utf8');

// The issue is missing </div> before ToolGuide
// Find `                )}\n            \n\n\n            <ToolGuide`
// and replace with `                )}\n            </div>\n\n            <ToolGuide`

content = content.replace(/(API 환율이 정확하지 않거나 특정 환율을 적용하고 싶을 때 직접 수정할 수 있습니다\.\s*<\/p>\s*)\)(})([\s\n]+)<ToolGuide/, '$1)$2\n            </div>\n\n            <ToolGuide');

fs.writeFileSync(file, content, 'utf8');
console.log('Fixed CurrencyConverter');
