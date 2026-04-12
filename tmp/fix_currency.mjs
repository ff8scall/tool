import fs from 'fs';
const file = 'c:\\AI\\Antigravity\\First\\utility-hub\\src\\pages\\CurrencyConverter.jsx';
let content = fs.readFileSync(file, 'utf8');

// The issue is missing </div> before ToolGuide
// Find `                )}\n            \n\n\n            <ToolGuide`
// and replace with `                )}\n            </div>\n\n            <ToolGuide`

content = content.replace(/(API ?˜ìœ¨???•í™•?˜ì? ?Šê±°???¹ì • ?˜ìœ¨???ìš©?˜ê³  ?¶ì„ ??ì§ì ‘ ?˜ì •?????ˆìŠµ?ˆë‹¤\.\s*<\/p>\s*)\)(})([\s\n]+)<ToolGuide/, '$1)$2\n            </div>\n\n            <ToolGuide');

fs.writeFileSync(file, content, 'utf8');
console.log('Fixed CurrencyConverter');
