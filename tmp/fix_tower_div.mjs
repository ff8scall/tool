import fs from 'fs';
const file = 'c:\\AI\\Antigravity\\First\\utility-hub\\src\\pages\\TowerStacker.jsx';
let content = fs.readFileSync(file, 'utf8');

const regex = /\)\}(\s*)<\/div>(\s*)<ToolGuide/;
// Wait, in TowerStacker it is: `)}\n                \n            \n\n            </div>\n            <ToolGuide`
// Let's just do a generic replace before `<ToolGuide title="탑 쌓기`

content = content.replace(/<\/div>(\s*)<ToolGuide\s*title="탑 쌓기/, '    </div>\n$1</div>\n$1<ToolGuide title="탑 쌓기');

fs.writeFileSync(file, content, 'utf8');
console.log('Fixed TowerStacker');
