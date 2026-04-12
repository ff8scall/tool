import fs from 'fs';
const filePath = 'c:\\AI\\Antigravity\\First\\utility-hub\\src\\pages\\DiscountCalculator.jsx';
let content = fs.readFileSync(filePath, 'utf8');
content = content.replace('            <ShareButtons />\r\n        </div>\r\n            <ToolGuide\r\n                title="? ì¸??ê³„ì‚°ê¸??¬ìš© ê°€?´ë“œ"', '            <ShareButtons />\n            <ToolGuide\n                title="? ì¸??ê³„ì‚°ê¸??¬ìš© ê°€?´ë“œ"');
content = content.replace('            />\r\n    );\r\n};\r\n\r\nexport default DiscountCalculator;', '            />\n        </div>\n    );\n};\n\nexport default DiscountCalculator;');
content = content.replace('            <ShareButtons />\n        </div>\n            <ToolGuide\n                title="? ì¸??ê³„ì‚°ê¸??¬ìš© ê°€?´ë“œ"', '            <ShareButtons />\n            <ToolGuide\n                title="? ì¸??ê³„ì‚°ê¸??¬ìš© ê°€?´ë“œ"');
fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed DiscountCalculator');
