import fs from 'fs';
const file = 'c:\\AI\\Antigravity\\First\\utility-hub\\src\\pages\\TowerStacker.jsx';
let content = fs.readFileSync(file, 'utf8');

const regex = /\)\}(\s*)<\/div>(\s*)<ToolGuide/;
// Wait, in TowerStacker it is: `)}\n                \n            \n\n            </div>\n            <ToolGuide`
// Let's just do a generic replace before `<ToolGuide title="???“ê¸°`

content = content.replace(/<\/div>(\s*)<ToolGuide\s*title="???“ê¸°/, '    </div>\n$1</div>\n$1<ToolGuide title="???“ê¸°');

fs.writeFileSync(file, content, 'utf8');
console.log('Fixed TowerStacker');
