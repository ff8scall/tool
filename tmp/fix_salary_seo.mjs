import fs from 'fs';
const filePath = 'c:\\AI\\Antigravity\\First\\utility-hub\\src\\pages\\SalaryCalculator.jsx';
let content = fs.readFileSync(filePath, 'utf8');

const replacement = `<SEO
                title="?°ë´‰ ?¤ìˆ˜?¹ì•¡ ê³„ì‚°ê¸?
                description="2025??ìµœì‹  ?¸ìœ¨(?™ê²°)???ìš©?˜ì—¬ ?°ë´‰ ?¤ìˆ˜?¹ì•¡??ê³„ì‚°?˜ì„¸?? 4?€ë³´í—˜, ?Œë“??ê³µì œ ë¶„ì„ ?œê³µ."
                keywords={['?°ë´‰ ê³„ì‚°ê¸?, '?¤ìˆ˜?¹ì•¡', '?”ê¸‰ ê³„ì‚°', '4?€ë³´í—˜', 'ë¹„ê³¼??, 'salary calculator']}
            />`;

content = content.replace(/<SEO[\s\S]*?\/>/, replacement);
fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed SalaryCalculator SEO block');
