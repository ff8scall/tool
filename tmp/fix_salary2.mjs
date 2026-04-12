import fs from 'fs';
const filePath = 'c:\\AI\\Antigravity\\First\\utility-hub\\src\\pages\\SalaryCalculator.jsx';
let content = fs.readFileSync(filePath, 'utf8');

const regex = /const formatKoreanNumber = \(numStr\) => \{[\s\S]*?return[^;]+;\s*\};/;
const replacement = `const formatKoreanNumber = (numStr) => {
        if (!numStr) return '';
        const n = parseInt(String(numStr).replace(/[^0-9]/g, ''));
        if (isNaN(n) || n === 0) return '';
        if (n < 10000) return \`\${n.toLocaleString()}??`;

        const unit = 10000;
        const man = Math.floor(n / unit);
        const remainder = n % unit;

        return \`\${man.toLocaleString()}만원\${remainder > 0 ? \` \${remainder.toLocaleString()}??` : ''}\`;
    };`;

content = content.replace(regex, replacement);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed SalaryCalculator');
