const fs = require('fs');
const path = require('path');

const toolsPath = 'c:/AI/Antigravity/Tool/src/data/tools.js';
const appPath = 'c:/AI/Antigravity/Tool/src/App.jsx';

// 1. Process tools.js
let toolsContent = fs.readFileSync(toolsPath, 'utf-8');

// Replace titles starting with "무료 온라인 ", "무료 ", "온라인 "
toolsContent = toolsContent.replace(/title:\s+'무료 온라인\s+([^']+)'/g, "title: '$1'");
toolsContent = toolsContent.replace(/title:\s+'무료\s+([^']+)'/g, "title: '$1'");
toolsContent = toolsContent.replace(/title:\s+'온라인\s+([^']+)'/g, "title: '$1'");

// Also replace in Category Data
toolsContent = toolsContent.replace(/title:\s+'무료 온라인\s+([^']+)'/g, "title: '$1'");
toolsContent = toolsContent.replace(/title:\s+'무료\s+([^']+)'/g, "title: '$1'");

// We need to add IfIAmGod and LifeBgm to tools.js
// IfIAmGod is "내가 만약 신이라면?" /if-i-am-god category: fun
// LifeBgm is "인생 BGM 추출기" /life-bgm category: fun

const newTools = `
    {
        id: 'if-i-am-god',
        title: '내가 만약 신이라면? | 수호신 테스트',
        description: '이름으로 알아보는 나의 수호신과 권능 테스트',
        path: '/if-i-am-god',
        category: 'fun',
        icon: Sparkles,
        color: 'bg-indigo-600',
        keywords: ['신테스트', '수호신', '이름테스트', 'fun']
    },
    {
        id: 'life-bgm',
        title: '인생 BGM 추출기',
        description: '나의 삶이 영화라면 어떤 음악이 흐를까?',
        path: '/life-bgm',
        category: 'fun',
        icon: Music,
        color: 'bg-stone-800',
        keywords: ['bgm', '인생음악', '플레이리스트', 'fun']
    }
];
`;

if (!toolsContent.includes("'if-i-am-god'")) {
    toolsContent = toolsContent.replace(/];[\s\n]*$/, newTools);
}

fs.writeFileSync(toolsPath, toolsContent, 'utf-8');
console.log('tools.js updated.');

// 2. Process App.jsx
let appContent = fs.readFileSync(appPath, 'utf-8');

// Ensure import LifeBgm
if (!appContent.includes('import LifeBgm from')) {
    appContent = appContent.replace(/import AdditionQuiz from '.\/pages\/AdditionQuiz';\n/, "import AdditionQuiz from './pages/AdditionQuiz';\nimport LifeBgm from './pages/LifeBgm';\n");
}

// Add Route for LifeBgm
if (!appContent.includes('path="/life-bgm"')) {
    appContent = appContent.replace(/<Route path="\*" element=\{/g, '<Route path="/life-bgm" element={<LifeBgm />} />\n              <Route path="*" element={');
}

fs.writeFileSync(appPath, appContent, 'utf-8');
console.log('App.jsx updated.');
