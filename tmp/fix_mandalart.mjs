import fs from 'fs';
let content = fs.readFileSync('c:\\AI\\Antigravity\\First\\utility-hub\\src\\pages\\MandalartPlanner.jsx', 'utf8');

const injection = `const toolFaqs = [
    {
        "q": "만다라트 계획표가 무엇인가요?",
        "a": "가장 중심에 핵심 목표를 적고, 주변 8칸에 세부 목표, 그리고 그 외곽 64칸에 실천 방안을 적어 나가는 일본식 9x9 목표 달성 시각화 기법입니다. (오타니 쇼헤이가 사용하여 유명해졌습니다)"
    },
    {
        "q": "작성한 계획표는 자동 저장되나요?",
        "a": "브라우저 로컬 스토리지 등에 저장되지만 확실한 보관을 위해 작성 완료 후 하단의 '이미지로 저장' 버튼을 통해 캡처해 두는 것을 권장합니다."
    }
];
const toolSteps = [
    "가장 정중앙 칸에 올 한 해 이루고 싶은 '최종 핵심 목표'를 적습니다.",
    "중앙 주변의 8개 칸에 핵심 목표를 이루기 위한 '세부 목표 8가지'를 적습니다.",
    "세부 목표 주변의 칸들에 그것을 실천하기 위한 '구체적인 행동 방안'을 꼼꼼하게 채워 넣습니다.",
    "완성된 만다라트를 이미지로 다운로드합니다."
];
const toolTips = [
    "첫술에 64칸을 모두 채우려 하지 말고, 시간을 두고 천천히 핵심 내용 위주로 생각을 뻗어나가세요.",
    "다운로드한 만다라트 이미지를 스마트폰 배경화면으로 지정해두어 수시로 목표를 상기시켜 보세요."
];

const MandalartPlanner = () => {`;

content = content.replace("const MandalartPlanner = () => {", injection);

fs.writeFileSync('c:\\AI\\Antigravity\\First\\utility-hub\\src\\pages\\MandalartPlanner.jsx', content, 'utf8');
console.log('Fixed MandalartPlanner.jsx');
