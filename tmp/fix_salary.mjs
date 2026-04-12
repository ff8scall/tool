import fs from 'fs';
const filePath = 'c:\\AI\\Antigravity\\First\\utility-hub\\src\\pages\\SalaryCalculator.jsx';
let content = fs.readFileSync(filePath, 'utf8');

// The issue is `return \`\${man.toLocaleString()}留뚯??${remainder > 0 ? \` \${remainder.toLocaleString()}?? : ''}\`;`
// But we can just replace lines 168-170 with regex
content = content.replace(/return\s+`\$\{man\.toLocaleString\(\)\}[^`]+`\s*;/g, "return `${man.toLocaleString()}만원${remainder > 0 ? ` ${remainder.toLocaleString()}?? : ''}`;");

// Since the whole file might have corruption (e.g., `留뚯?? = 만원), let's just do a specific replace.
// Let's just catch the parsing error at line 170
content = content.replace(/return\s+`\$\{man\.toLocaleString\(\)\}.*?;\s*$/, "return `${man.toLocaleString()}만원${remainder > 0 ? ` ${remainder.toLocaleString()}?? : ''}`;");

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed SalaryCalculator');
