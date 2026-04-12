import fs from 'fs';
const file = 'c:\\AI\\Antigravity\\First\\utility-hub\\src\\pages\\MbtiTest.jsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(/<span>비동??\/span>[\s\n]*<\/div>[\s\n]*<ToolGuide/, '<span>비동??/span>\n                </div>\n            </div>\n\n            <ToolGuide');

fs.writeFileSync(file, content, 'utf8');
console.log('Fixed MbtiTest');
