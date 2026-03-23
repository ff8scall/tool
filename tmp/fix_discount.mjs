import fs from 'fs';
const filePath = 'c:\\AI\\Antigravity\\First\\utility-hub\\src\\pages\\DiscountCalculator.jsx';
let content = fs.readFileSync(filePath, 'utf8');
content = content.replace('            <ShareButtons />\r\n        </div>\r\n            <ToolGuide\r\n                title="할인율 계산기 사용 가이드"', '            <ShareButtons />\n            <ToolGuide\n                title="할인율 계산기 사용 가이드"');
content = content.replace('            />\r\n    );\r\n};\r\n\r\nexport default DiscountCalculator;', '            />\n        </div>\n    );\n};\n\nexport default DiscountCalculator;');
content = content.replace('            <ShareButtons />\n        </div>\n            <ToolGuide\n                title="할인율 계산기 사용 가이드"', '            <ShareButtons />\n            <ToolGuide\n                title="할인율 계산기 사용 가이드"');
fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed DiscountCalculator');
