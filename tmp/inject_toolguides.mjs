import fs from 'fs';
import path from 'path';

const pagesDir = 'c:\\AI\\Antigravity\\First\\utility-hub\\src\\pages';
const appJsxPath = 'c:\\AI\\Antigravity\\First\\utility-hub\\src\\App.jsx';
const toolsJsPath = 'c:\\AI\\Antigravity\\First\\utility-hub\\src\\data\\tools.js';

// Parse App.jsx
const appContent = fs.readFileSync(appJsxPath, 'utf8');
const routeRegex = /<Route\s+path="([^"]+)"\s+element=\{<([A-Za-z0-9_]+)\b[^>]*\/>\}\s*\/>/g;
const compToPath = {};
let match;
while ((match = routeRegex.exec(appContent)) !== null) {
  compToPath[match[2]] = match[1];
}

// Parse tools.js
const toolsContent = fs.readFileSync(toolsJsPath, 'utf8');
const toolsMatched = [...toolsContent.matchAll(/title:\s*'([^']+)'[\s\S]*?description:\s*'([^']+)'[\s\S]*?path:\s*'([^']+)'(?:[\s\S]*?category:\s*'([^']+)')?/g)];
const pathToTool = {};
for (const m of toolsMatched) {
    pathToTool[m[3]] = {
        title: m[1],
        description: m[2],
        category: m[4] || '기본'
    };
}

const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.jsx'));

for (const f of files) {
    let content = fs.readFileSync(path.join(pagesDir, f), 'utf8');
    if (!content.includes('<ToolGuide')) {
        const compName = f.replace('.jsx', '');
        let routePath = compToPath[compName];
        
        // Some components might not be routed exactly or have wrapper components
        if (!routePath) {
            console.log(`Skipping ${f} - No route mapping found`);
            continue;
        }

        const toolInfo = pathToTool[routePath];
        if (!toolInfo) {
            console.log(`Skipping ${f} - No tool info found for route ${routePath}`);
            continue;
        }

        const steps = `[
                    "원하시는 옵션이나 값을 화면에 안내된 순서대로 정확하게 기입해 주세요.",
                    "제시된 항목과 보기를 꼼꼼하게 살펴보고 본인에게 맞는 것을 선택합니다.",
                    "모든 입력을 완료한 후 결과 화면에서 계산된 수치나 분석된 내용을 확인합니다.",
                    "결과가 마음에 든다면 캡처하거나 공유하기 버튼을 눌러 지인들에게 공유해보세요!"
                ]`;
        
        const tips = `[
                    "결과값이 예상과 다르다면 입력한 숫자나 단위를 한 번 더 확인해보는 것이 좋습니다.",
                    "제공되는 다양한 부가 옵션을 함께 활용하면 훨씬 구체적인 형태의 맞춤형 결과를 얻을 수 있습니다.",
                    "모바일과 데스크톱 환경 모두에 완벽하게 최적화되어 있으니 언제 어디서든 편리하게 이용해 보세요."
                ]`;
        
        const faqs = `[
                    { "q": "이 도구들은 정말로 모두 무료인가요?", "a": "네! Tool Hive에서 제공하는 모든 도구 모음과 심리 테스트들은 가입 등의 번거로운 절차 없이 누구나 100% 무료로 무제한 사용할 수 있습니다." },
                    { "q": "제가 입력한 개인적인 정보 데이터가 서버에 남나요?", "a": "아니요, 사용자가 입력하는 이름, 숫자, 금액 등의 모든 데이터는 방문자의 기기 내 브라우저에서만 실시간으로 연산되며 어떠한 경우에도 외부 서버로 전송되거나 저장되지 않으므로 안심하셔도 됩니다." },
                    { "q": "버튼을 눌러도 반응이 없거나 에러가 생깁니다.", "a": "브라우저의 일시적인 캐시 문제일 수 있습니다. 키보드의 F5 버튼을 누르거나 새로고침을 진행한 후 다시 시도해 보시길 권장하며, 문제가 계속된다면 다른 브라우저 앱을 이용해 보세요." }
                ]`;

        if (!content.includes('ToolGuide')) {
            if (content.includes("from '../components/SEO';")) {
                content = content.replace("from '../components/SEO';", "from '../components/SEO';\nimport ToolGuide from '../components/ToolGuide';");
            } else {
                content = content.replace("from 'react';", "from 'react';\nimport ToolGuide from '../components/ToolGuide';");
            }
        }

        const injection = `\\n            <ToolGuide
                title="${toolInfo.title}"
                intro="${toolInfo.description}"
                steps={${steps}}
                tips={${tips}}
                faqs={${faqs}}
            />
        </div>`;
        
        const lastDivMatch = content.match(/<\/div>\s*\)(;)?\s*};/);
        if (lastDivMatch) {
            content = content.replace(/<\/div>\s*\)(;)?\s*};/, injection + '\n    );\n};');
            fs.writeFileSync(path.join(pagesDir, f), content, 'utf8');
            console.log(`Successfully injected into ${f}`);
        } else {
             const lastDivMatch2 = content.match(/<\/div>\s*\)\s*}/);
             if (lastDivMatch2) {
                 content = content.replace(/<\/div>\s*\)\s*}/, injection + '\n    )\n}');
                 fs.writeFileSync(path.join(pagesDir, f), content, 'utf8');
                 console.log(`Successfully injected into ${f}`);
             } else {
                 console.log(`Skipping ${f} - Failed to find injection point (custom layout)`);
             }
        }
    }
}
