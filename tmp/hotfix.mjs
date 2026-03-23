import fs from 'fs';

// Fix MandalartPlanner.jsx
let mContent = fs.readFileSync('c:\\AI\\Antigravity\\First\\utility-hub\\src\\pages\\MandalartPlanner.jsx', 'utf8');
const regex = /const toolFaqs = \[.*?const toolTips = \[.*?\];/s;
const match = mContent.match(regex);
if (match) {
    const extracted = match[0];
    mContent = mContent.replace(regex, ''); // remove from renderGridSection
    mContent = mContent.replace('const MandalartPlanner = () => {', `${extracted}\n\nconst MandalartPlanner = () => {`);
    fs.writeFileSync('c:\\AI\\Antigravity\\First\\utility-hub\\src\\pages\\MandalartPlanner.jsx', mContent, 'utf8');
    console.log('Fixed MandalartPlanner');
} else {
    console.log('Could not find tools array in MandalartPlanner');
}

// Fix tools.js (duplicate if-i-am-god)
let tContent = fs.readFileSync('c:\\AI\\Antigravity\\First\\utility-hub\\src\\data\\tools.js', 'utf8');
const firstIdx = tContent.indexOf("id: 'if-i-am-god',");
const lastIdx = tContent.lastIndexOf("id: 'if-i-am-god',");

if (firstIdx !== -1 && lastIdx !== -1 && firstIdx !== lastIdx) {
    // Find the enclosing braces for the LAST occurrence
    const startOfBlock = tContent.lastIndexOf('{', lastIdx);
    const endOfBlock = tContent.indexOf('},', lastIdx) + 2;
    
    // Cut it out
    tContent = tContent.substring(0, startOfBlock) + tContent.substring(endOfBlock);
    
    // Clean up any double empty lines
    tContent = tContent.replace(/\s*\n\s*\n\s*\n/g, '\n\n');
    
    fs.writeFileSync('c:\\AI\\Antigravity\\First\\utility-hub\\src\\data\\tools.js', tContent, 'utf8');
    console.log('Fixed duplicated if-i-am-god in tools.js');
} else {
    console.log('No duplicate found in tools.js');
}
