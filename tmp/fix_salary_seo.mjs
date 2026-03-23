import fs from 'fs';
const filePath = 'c:\\AI\\Antigravity\\First\\utility-hub\\src\\pages\\SalaryCalculator.jsx';
let content = fs.readFileSync(filePath, 'utf8');

const replacement = `<SEO
                title="연봉 실수령액 계산기"
                description="2025년 최신 세율(동결)을 적용하여 연봉 실수령액을 계산하세요. 4대보험, 소득세 공제 분석 제공."
                keywords={['연봉 계산기', '실수령액', '월급 계산', '4대보험', '비과세', 'salary calculator']}
            />`;

content = content.replace(/<SEO[\s\S]*?\/>/, replacement);
fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed SalaryCalculator SEO block');
