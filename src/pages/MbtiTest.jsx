import React, { useState, useRef, useEffect } from 'react';
import { Brain, ArrowRight, RotateCcw, Check, Star, Briefcase, Heart } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import ShareButtons from '../components/ShareButtons';

const MbtiTest = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [scores, setScores] = useState({ E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 });
    const [result, setResult] = useState(null);
    const [fadeIn, setFadeIn] = useState(true);
    const topRef = useRef(null);

    // 질문 데이터 (총 20문항, 각 지표당 5문항)
    // direction: 1 (정방향, 예: E), -1 (역방향, 예: I)
    const questions = [
        // E vs I
        { id: 1, dimension: 'EI', direction: 1, text: "새로운 사람들을 만나는 자리에서 에너지를 얻는 편이다." },
        { id: 2, dimension: 'EI', direction: -1, text: "주말에는 집에서 혼자 조용히 쉬는 것이 진정한 휴식이다." },
        { id: 3, dimension: 'EI', direction: 1, text: "대화할 때 내가 먼저 주제를 꺼내고 분위기를 주도한다." },
        { id: 4, dimension: 'EI', direction: -1, text: "많은 사람들 앞에 나서는 것보다 뒤에서 지켜보는 게 편하다." },
        { id: 5, dimension: 'EI', direction: 1, text: "생각하기보다 일단 행동으로 옮기는 것을 선호한다." },

        // S vs N
        { id: 6, dimension: 'SN', direction: 1, text: "구체적인 사실과 데이터에 기반하여 판단하는 것을 좋아한다." },
        { id: 7, dimension: 'SN', direction: -1, text: "미래의 가능성과 보이지 않는 의미를 상상하는 것을 즐긴다." },
        { id: 8, dimension: 'SN', direction: 1, text: "일할 때 정해진 매뉴얼과 절차를 따르는 것이 편하다." },
        { id: 9, dimension: 'SN', direction: -1, text: "남들이 하지 않은 독창적이고 새로운 방식을 시도해보고 싶다." },
        { id: 10, dimension: 'SN', direction: 1, text: "현재 눈앞에 닥친 현실적인 문제를 해결하는 데 집중한다." },

        // T vs F
        { id: 11, dimension: 'TF', direction: 1, text: "결정을 내릴 때 감정보다는 논리적인 인과관계를 따진다." },
        { id: 12, dimension: 'TF', direction: -1, text: "친구가 힘든 일을 털어놓으면 해결책보다 공감이 먼저 나온다." },
        { id: 13, dimension: 'TF', direction: 1, text: "토론할 때 상대방의 기분보다 사실 여부가 더 중요하다." },
        { id: 14, dimension: 'TF', direction: -1, text: "조화로운 인간관계를 유지하는 것이 무엇보다 중요하다." },
        { id: 15, dimension: 'TF', direction: 1, text: "목표 달성을 위해서라면 쓴소리도 마다하지 않아야 한다." },

        // J vs P
        { id: 16, dimension: 'JP', direction: 1, text: "여행을 갈 때 분 단위까지는 아니더라도 상세한 계획을 세운다." },
        { id: 17, dimension: 'JP', direction: -1, text: "계획에 얽매이기보다 그날의 기분과 상황에 따라 행동한다." },
        { id: 18, dimension: 'JP', direction: 1, text: "책상이나 컴퓨터 파일이 체계적으로 정리되어 있어야 마음이 편하다." },
        { id: 19, dimension: 'JP', direction: -1, text: "마감 기한이 임박했을 때 폭발적인 집중력을 발휘한다." },
        { id: 20, dimension: 'JP', direction: 1, text: "예상치 못한 변수가 생기는 것을 극도로 싫어한다." },
    ];

    const options = [
        { label: "매우 그렇다", score: 2, color: "bg-blue-600 text-white hover:bg-blue-700" },
        { label: "그렇다", score: 1, color: "bg-blue-400 text-white hover:bg-blue-500" },
        { label: "보통이다", score: 0, color: "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200" },
        { label: "아니다", score: -1, color: "bg-red-400 text-white hover:bg-red-500" },
        { label: "매우 아니다", score: -2, color: "bg-red-600 text-white hover:bg-red-700" },
    ];

    const mbtiDescriptions = {
        'INTJ': {
            title: '전략가',
            subtitle: '용의주도한 전략가',
            story: "당신은 전체 인구의 2%에 불과한 희귀한 유형으로, 풍부한 상상력과 철두철미한 계획을 통해 목표를 달성합니다. 지적 호기심이 많고, 남들이 보지 못하는 패턴과 가능성을 꿰뚫어 보는 통찰력을 지녔습니다. 혼자 있는 시간을 통해 에너지를 충전하며, 끊임없이 자신을 발전시키려는 욕구가 강합니다.",
            workStyle: "복잡한 문제를 구조화하고 해결하는 데 탁월합니다. 독립적으로 일하는 것을 선호하며, 비효율적인 관행을 참지 못합니다. 높은 기준을 가지고 있어 동료들에게도 완벽함을 요구할 수 있습니다.",
            relationships: "감정 표현에 서툴러 차가워 보일 수 있지만, 신뢰하는 사람에게는 깊은 헌신을 보여줍니다. 지적인 대화가 통하는 상대를 선호하며, 연애에서도 배울 점이 있는 사람에게 끌립니다.",
            traits: ['독립적', '분석적', '전략적', '완벽주의'],
            strengths: '복잡한 문제를 논리적으로 해결하고, 장기적인 비전을 가지고 계획을 실행합니다.',
            weaknesses: '감정 표현이 서툴고, 지나치게 비판적일 수 있습니다.',
            careers: '과학자, 엔지니어, 전략 기획자, 연구원, 개발자',
            famous: '일론 머스크, 마크 저커버그, 크리스토퍼 놀란'
        },
        'INTP': {
            title: '논리술사',
            subtitle: '논리적인 사색가',
            story: "당신은 끊임없이 생각하고 탐구하는 지적 탐험가입니다. 세상의 모든 원리를 이해하고 싶어 하며, 기존의 통념을 의심하고 새로운 관점을 제시하는 것을 즐깁니다. 조용하고 과묵해 보이지만, 관심 있는 분야에 대해서는 밤을 새워 이야기할 수 있는 열정을 가지고 있습니다.",
            workStyle: "반복적인 업무보다는 창의적이고 분석적인 문제 해결을 선호합니다. 혼자 깊이 생각할 수 있는 환경에서 최고의 성과를 냅니다. 아이디어는 넘치지만 실행력이 부족할 수 있습니다.",
            relationships: "상대방의 감정을 읽는 데 어려움을 겪을 수 있습니다. 솔직하고 직설적인 화법을 사용하며, 지적인 자극을 주는 파트너와 잘 맞습니다. 구속받는 것을 싫어합니다.",
            traits: ['논리적', '호기심', '독창적', '객관적'],
            strengths: '복잡한 이론을 이해하고 새로운 아이디어를 창출합니다.',
            weaknesses: '실용성이 부족하고, 감정 표현에 서툽니다.',
            careers: '프로그래머, 수학자, 철학자, 과학자, 교수',
            famous: '알버트 아인슈타인, 빌 게이츠, 아이작 뉴턴'
        },
        'ENTJ': {
            title: '통솔자',
            subtitle: '대담한 지도자',
            story: "당신은 타고난 리더입니다. 카리스마와 자신감을 바탕으로 사람들을 이끌고 목표를 성취하는 데서 큰 기쁨을 느낍니다. 어려운 도전일수록 더욱 불타오르며, 냉철한 판단력으로 위기를 기회로 바꿉니다. 큰 그림을 그리고 이를 실현하기 위한 전략을 세우는 데 능숙합니다.",
            workStyle: "효율성을 최우선으로 생각하며, 체계적이고 조직적으로 일합니다. 결단력이 빠르고 추진력이 강해 프로젝트를 성공적으로 이끕니다. 때로는 독단적으로 보일 수 있습니다.",
            relationships: "주도적인 연애를 선호합니다. 성장 지향적인 관계를 원하며, 파트너와 함께 미래를 계획하는 것을 좋아합니다. 감정적인 위로보다는 실질적인 해결책을 주는 편입니다.",
            traits: ['리더십', '결단력', '효율적', '자신감'],
            strengths: '목표를 설정하고 사람들을 이끌어 성과를 달성합니다.',
            weaknesses: '타인의 감정을 간과하고, 지나치게 강압적일 수 있습니다.',
            careers: 'CEO, 변호사, 경영 컨설턴트, 정치인, 장교',
            famous: '스티브 잡스, 고든 램지, 마거릿 대처'
        },
        'ENTP': {
            title: '변론가',
            subtitle: '뜨거운 논쟁을 즐기는 변론가',
            story: "당신은 지적 도전을 즐기는 재치 있는 입담꾼입니다. 풍부한 지식과 빠른 두뇌 회전으로 어떤 주제로든 토론하는 것을 좋아합니다. 기존의 질서에 의문을 제기하고 새로운 가능성을 모색하는 혁명가적 기질이 있습니다. 지루한 것을 참지 못하며 항상 새로운 자극을 찾아다닙니다.",
            workStyle: "아이디어가 샘솟고 창의적인 문제 해결에 능합니다. 하지만 세부적인 마무리나 반복적인 업무에는 흥미를 잃기 쉽습니다. 자유로운 분위기에서 능력을 발휘합니다.",
            relationships: "유머 감각이 뛰어나고 매력적입니다. 끊임없이 새로운 데이트를 즐기며, 지루한 관계는 오래가지 못합니다. 논쟁을 즐기다가 파트너에게 상처를 줄 수도 있습니다.",
            traits: ['창의적', '논쟁적', '열정적', '독창적'],
            strengths: '새로운 아이디어를 제시하고 토론을 즐깁니다.',
            weaknesses: '일관성이 부족하고, 논쟁을 즐겨 갈등을 일으킬 수 있습니다.',
            careers: '기업가, 마케터, 변호사, 발명가, 정치 평론가',
            famous: '토마스 에디슨, 로버트 다우니 주니어, 캡틴 잭 스패로우'
        },
        'INFJ': {
            title: '옹호자',
            subtitle: '선의의 옹호자',
            story: "당신은 가장 희귀한 성격 유형 중 하나로, 깊은 통찰력과 확고한 신념을 가지고 있습니다. 조용하고 신비로워 보이지만, 내면에는 인류애와 이상을 향한 뜨거운 열정이 숨어 있습니다. 타인의 감정을 자신의 것처럼 느끼는 뛰어난 공감 능력을 지녔으며, 세상을 더 나은 곳으로 만들기 위해 노력합니다.",
            workStyle: "의미 있고 가치 있는 일을 할 때 가장 큰 보람을 느낍니다. 창의적이고 직관적이며, 사람들의 성장을 돕는 일에 탁월합니다. 평화로운 분위기를 선호합니다.",
            relationships: "깊고 진정성 있는 관계를 추구합니다. 가벼운 만남보다는 영혼이 통하는 소울메이트를 찾습니다. 상대방에게 헌신적이지만, 한 번 신뢰가 깨지면 차갑게 돌아섭니다.",
            traits: ['이상주의', '통찰력', '헌신적', '공감능력'],
            strengths: '깊은 통찰력으로 사람들을 이해하고 돕습니다.',
            weaknesses: '완벽주의 성향으로 스트레스를 받고, 번아웃에 취약합니다.',
            careers: '상담사, 작가, 교사, 사회운동가, 심리학자',
            famous: '마더 테레사, 넬슨 만델라, 마틴 루터 킹'
        },
        'INFP': {
            title: '중재자',
            subtitle: '열정적인 중재자',
            story: "당신은 낭만적이고 부드러운 영혼의 소유자입니다. 자신만의 내면 세계가 깊고 풍부하며, 진정성과 의미를 무엇보다 중요하게 생각합니다. 타인의 감정에 깊이 공감하고 상처받은 사람들을 치유하는 능력이 있습니다. 현실보다는 이상을 꿈꾸며, 예술적인 감수성이 뛰어납니다.",
            workStyle: "자신의 가치관과 부합하는 일을 할 때 열정을 발휘합니다. 돈이나 지위보다는 자아실현이 중요합니다. 창의적이고 유연한 환경을 선호합니다.",
            relationships: "로맨티스트입니다. 영화 같은 사랑을 꿈꾸며, 파트너의 감정을 세심하게 배려합니다. 갈등을 싫어해서 불만을 속으로 삭이다가 한꺼번에 터뜨릴 수 있습니다.",
            traits: ['이상주의', '창의적', '공감적', '개방적'],
            strengths: '예술적 감각이 뛰어나고 타인을 깊이 이해합니다.',
            weaknesses: '현실적이지 못하고, 비판에 민감합니다.',
            careers: '작가, 예술가, 심리학자, 상담사, 디자이너',
            famous: '아이유, 윌리엄 셰익스피어, 조니 뎁'
        },
        'ENFJ': {
            title: '선도자',
            subtitle: '정의로운 사회운동가',
            story: "당신은 사람들을 이끄는 온화한 카리스마를 지녔습니다. 타인의 잠재력을 발견하고 성장시키는 데서 큰 기쁨을 느낍니다. 뛰어난 언변과 사교성으로 주변 사람들에게 긍정적인 영향을 미치며, 모두가 행복한 세상을 꿈꿉니다. 때로는 남을 챙기느라 정작 자신을 돌보지 못할 때가 있습니다.",
            workStyle: "협동심이 강하고 팀워크를 중요하게 생각합니다. 사람들을 동기부여하고 갈등을 중재하는 데 탁월합니다. 비판을 받으면 개인적인 비난으로 받아들여 힘들어할 수 있습니다.",
            relationships: "상대방에게 헌신적이고 애정 표현을 아끼지 않습니다. 파트너의 행복이 곧 나의 행복이라고 생각합니다. 관계에서 오는 갈등을 힘들어하며, 항상 조화를 추구합니다.",
            traits: ['카리스마', '이타적', '설득력', '공감능력'],
            strengths: '사람들에게 영감을 주고 긍정적인 변화를 이끕니다.',
            weaknesses: '타인의 문제를 지나치게 떠안고, 자신을 소홀히 합니다.',
            careers: '교사, 코치, 정치인, HR 전문가, 아나운서',
            famous: '오프라 윈프리, 버락 오바마, 유재석'
        },
        'ENFP': {
            title: '활동가',
            subtitle: '재기발랄한 활동가',
            story: "당신은 자유로운 영혼의 소유자입니다. 긍정적이고 낙천적인 에너지로 주변을 밝게 만듭니다. 호기심이 왕성하여 새로운 사람, 새로운 경험을 찾아다니는 것을 좋아합니다. 틀에 박힌 것을 싫어하고, 인생을 하나의 즐거운 모험으로 생각합니다. 감정이 풍부하고 표현이 솔직합니다.",
            workStyle: "창의적이고 자유로운 환경에서 빛을 발합니다. 아이디어 제안과 기획에 능하지만, 꼼꼼한 마무리나 반복 업무는 힘들어합니다. 여러 가지 일을 동시에 벌이는 경향이 있습니다.",
            relationships: "열정적이고 드라마틱한 연애를 합니다. 상대방의 장점을 잘 발견하고 칭찬해줍니다. 하지만 구속받는 것을 싫어하고, 금방 싫증을 느낄 수도 있습니다.",
            traits: ['열정적', '창의적', '사교적', '자유로운'],
            strengths: '새로운 가능성을 발견하고 사람들과 쉽게 친해집니다.',
            weaknesses: '집중력이 부족하고, 계획을 끝까지 실행하지 못합니다.',
            careers: '마케터, 배우, 상담사, 기획자, 유튜버',
            famous: '이효리, 로빈 윌리엄스, 월트 디즈니'
        },
        'ISTJ': {
            title: '현실주의자',
            subtitle: '청렴결백한 논리주의자',
            story: "당신은 세상의 소금 같은 존재입니다. 책임감이 강하고 성실하며, 한 번 맡은 일은 끝까지 해냅니다. 사실과 논리에 근거하여 판단하며, 질서와 전통을 중요하게 생각합니다. 겉으로는 무뚝뚝해 보일 수 있지만, 내면은 깊고 따뜻하며 신뢰할 수 있는 사람입니다.",
            workStyle: "정확하고 체계적으로 일합니다. 규칙과 절차를 준수하며, 실수를 용납하지 않습니다. 혼자 집중해서 일하는 것을 선호하며, 갑작스러운 변화를 싫어합니다.",
            relationships: "신중하게 관계를 맺습니다. 화려한 이벤트보다는 꾸준한 성실함으로 사랑을 표현합니다. 약속을 중요하게 생각하며, 파트너에게 안정감을 줍니다.",
            traits: ['책임감', '체계적', '신뢰성', '실용적'],
            strengths: '규칙을 준수하고 맡은 일을 완벽하게 수행합니다.',
            weaknesses: '변화에 저항하고, 융통성이 부족합니다.',
            careers: '회계사, 공무원, 군인, 관리자, 데이터 분석가',
            famous: '서장훈, 워런 버핏, 앙겔라 메르켈'
        },
        'ISFJ': {
            title: '수호자',
            subtitle: '용감한 수호자',
            story: "당신은 조용하지만 든든한 조력자입니다. 세심한 관찰력으로 타인의 필요를 파악하고 챙겨주는 데서 기쁨을 느낍니다. 겸손하고 온화하지만, 소중한 사람을 지키기 위해서는 누구보다 강해집니다. 전통과 안정을 중요시하며, 성실하고 묵묵하게 자신의 역할을 다합니다.",
            workStyle: "꼼꼼하고 세심하게 일 처리를 합니다. 동료들을 배려하고 협조적입니다. 리더보다는 뒤에서 지원하는 역할을 선호하지만, 맡은 책임은 완벽히 수행합니다.",
            relationships: "헌신적이고 가정적입니다. 상대방의 사소한 말도 기억하고 챙겨줍니다. 갈등을 피하려다 보니 자신의 속마음을 감추고 참는 경우가 많습니다.",
            traits: ['헌신적', '세심함', '책임감', '배려심'],
            strengths: '타인을 돌보고 안정적인 환경을 만듭니다.',
            weaknesses: '자신의 필요를 무시하고, 변화를 두려워합니다.',
            careers: '간호사, 교사, 사서, 행정직, 사회복지사',
            famous: '최수종, 마더 테레사, 엘리자베스 2세'
        },
        'ESTJ': {
            title: '경영자',
            subtitle: '엄격한 관리자',
            story: "당신은 타고난 관리자입니다. 명확한 기준과 원칙을 가지고 조직을 체계적으로 이끕니다. 현실적이고 실용적이며, 목표 달성을 위해 효율적으로 움직입니다. 불확실한 것을 싫어하고, 결정된 사항은 강력하게 추진합니다. 정직하고 직설적이며, 리더십이 뛰어납니다.",
            workStyle: "계획적이고 조직적으로 일합니다. 명확한 지시와 보고 체계를 선호합니다. 성과 중심적이며, 게으르거나 무능한 모습을 참지 못합니다.",
            relationships: "책임감 있고 듬직한 연인입니다. 데이트 코스도 계획적으로 짭니다. 감정적인 공감보다는 실질적인 도움을 주려고 하며, 가부장적인 면모가 있을 수 있습니다.",
            traits: ['조직력', '실용적', '결단력', '전통적'],
            strengths: '효율적으로 조직을 관리하고 목표를 달성합니다.',
            weaknesses: '융통성이 부족하고, 감정을 간과합니다.',
            careers: '경영자, 판사, 군인, 경찰, 프로젝트 매니저',
            famous: '김구라, 헨리 포드, 힐러리 클린턴'
        },
        'ESFJ': {
            title: '집정관',
            subtitle: '사교적인 외교관',
            story: "당신은 분위기 메이커입니다. 사람들을 좋아하고, 모두가 화목하게 지내는 것을 중요하게 생각합니다. 타고난 공감 능력과 배려심으로 주변 사람들을 챙깁니다. 인정받고 사랑받고 싶은 욕구가 강하며, 타인의 시선을 의식하는 편입니다. 모임이나 파티를 주도하는 것을 즐깁니다.",
            workStyle: "협력적이고 조화로운 분위기를 만듭니다. 사람들을 챙기는 업무나 서비스직에서 능력을 발휘합니다. 비판을 받으면 쉽게 상처받고 의기소침해질 수 있습니다.",
            relationships: "다정다감하고 애교가 많습니다. 연인에게 헌신하며, 끊임없는 애정 표현을 원합니다. 갈등 상황을 견디기 힘들어하며, 관계 유지를 위해 노력합니다.",
            traits: ['사교적', '협조적', '책임감', '배려심'],
            strengths: '사람들과 잘 어울리고 조화로운 환경을 만듭니다.',
            weaknesses: '비판에 민감하고, 타인의 인정에 의존합니다.',
            careers: '승무원, 교사, 이벤트 기획자, 영업, 상담사',
            famous: '손흥민, 테일러 스위프트, 빌 클린턴'
        },
        'ISTP': {
            title: '장인',
            subtitle: '만능 재주꾼',
            story: "당신은 호기심 많은 관찰자이자 뛰어난 문제 해결사입니다. 기계를 다루거나 도구를 사용하는 데 능숙하며, 원리를 파악하는 것을 좋아합니다. 말보다는 행동으로 보여주며, 쿨하고 독립적인 성향입니다. 위기 상황에서도 당황하지 않고 침착하게 대처하는 능력이 있습니다.",
            workStyle: "효율성을 중시하며, 불필요한 회의나 절차를 싫어합니다. 혼자서 자유롭게 일할 때 최고의 성과를 냅니다. 손재주가 좋고 기술적인 분야에 강점이 있습니다.",
            relationships: "구속받는 것을 싫어하고 개인 공간을 중요시합니다. 감정 표현이 서툴러 무심해 보일 수 있지만, 묵묵히 챙겨주는 스타일입니다. 함께 취미를 즐기는 데이트를 선호합니다.",
            traits: ['실용적', '독립적', '논리적', '유연함'],
            strengths: '문제를 빠르게 해결하고 손재주가 뛰어납니다.',
            weaknesses: '감정 표현이 서툴고, 장기 계획이 부족합니다.',
            careers: '엔지니어, 정비사, 운동선수, 소방관, 파일럿',
            famous: '박명수, 톰 크루즈, 마이클 조던'
        },
        'ISFP': {
            title: '모험가',
            subtitle: '호기심 많은 예술가',
            story: "당신은 온화하고 겸손한 예술가입니다. 뛰어난 미적 감각을 지녔으며, 현재의 순간을 즐길 줄 압니다. 타인의 감정을 세심하게 배려하며, 자신의 가치관에 따라 살아갑니다. 경쟁보다는 조화를 추구하며, 자신만의 공간에서 조용히 에너지를 충전하는 것을 좋아합니다.",
            workStyle: "자유롭고 창의적인 환경을 선호합니다. 엄격한 규율이나 마감 기한에 스트레스를 받습니다. 예술적 감각을 발휘하거나 사람을 돕는 일에 보람을 느낍니다.",
            relationships: "다정하고 배려심이 깊습니다. 말보다는 행동으로 사랑을 표현합니다. 갈등을 싫어해서 속마음을 잘 드러내지 않으며, 이별 후유증이 오래가는 편입니다.",
            traits: ['예술적', '유연함', '친절함', '개방적'],
            strengths: '예술적 감각이 뛰어나고 현재를 즐깁니다.',
            weaknesses: '계획성이 부족하고, 스트레스에 약합니다.',
            careers: '예술가, 디자이너, 음악가, 요리사, 수의사',
            famous: '유재석(놀면뭐하니), 마이클 잭슨, 정국(BTS)'
        },
        'ESTP': {
            title: '사업가',
            subtitle: '모험을 즐기는 사업가',
            story: "당신은 에너지가 넘치는 행동파입니다. 스릴과 모험을 즐기며, 문제가 생기면 즉각적으로 해결합니다. 직설적이고 유머 감각이 뛰어나 주변에 사람이 많습니다. 추상적인 이론보다는 실제 경험을 통해 배우는 것을 선호하며, 현재의 즐거움을 가장 중요하게 생각합니다.",
            workStyle: "빠르게 변화하는 환경에서 적응력이 뛰어납니다. 위기 대처 능력이 좋고 협상에 능합니다. 장기적인 계획보다는 단기적인 성과에 집중하는 경향이 있습니다.",
            relationships: "적극적이고 열정적으로 다가갑니다. 지루한 것을 못 참아서 항상 새로운 데이트를 추구합니다. 쿨한 연애를 선호하며, 구속하려 들면 도망갈 수 있습니다.",
            traits: ['활동적', '대담함', '실용적', '사교적'],
            strengths: '위기 상황에서 빠르게 대처하고 행동합니다.',
            weaknesses: '장기 계획이 부족하고, 충동적입니다.',
            careers: '영업, 기업가, 운동선수, 응급구조사, 주식 중개인',
            famous: '강호동, 도널드 트럼프, 마돈나'
        },
        'ESFP': {
            title: '연예인',
            subtitle: '자유로운 영혼의 연예인',
            story: "당신은 타고난 스타입니다. 어디를 가나 주목받기를 즐기며, 주변 사람들을 즐겁게 만듭니다. 낙천적이고 긍정적이며, 인생의 매 순간을 축제처럼 즐깁니다. 패션과 유행에 민감하고, 미적 감각이 뛰어납니다. 진지한 것보다는 가볍고 즐거운 대화를 선호합니다.",
            workStyle: "사람들과 함께 일하는 것을 좋아합니다. 딱딱한 사무실보다는 자유로운 현장 업무가 맞습니다. 분위기 메이커 역할을 하며, 즉흥적인 대처 능력이 좋습니다.",
            relationships: "금사빠 기질이 있습니다. 열정적이고 로맨틱한 사랑을 꿈꿉니다. 파트너와 함께 즐거운 시간을 보내는 것을 중요시하며, 깜짝 이벤트를 좋아합니다.",
            traits: ['사교적', '열정적', '즉흥적', '낙천적'],
            strengths: '사람들을 즐겁게 하고 분위기를 띄웁니다.',
            weaknesses: '계획성이 부족하고, 장기적 목표가 없습니다.',
            careers: '연예인, 이벤트 기획자, 영업, 여행 가이드, 승무원',
            famous: '비, 마릴린 먼로, 엘튼 존'
        }
    };

    const handleAnswer = (score) => {
        setFadeIn(false);

        setTimeout(() => {
            const currentQ = questions[currentQuestion];
            const dimension = currentQ.dimension;

            // 점수 계산: 선택 점수 * 방향 (정방향/역방향)
            // 예: E 질문(정방향)에 '매우 그렇다'(2) -> E 점수 +2
            // 예: I 질문(역방향)에 '매우 그렇다'(2) -> E 점수 -2 (즉, I 성향)
            // 여기서는 각 지표의 첫 글자(E, S, T, J)를 기준으로 점수를 누적하고,
            // 나중에 양수면 앞글자, 음수면 뒷글자로 판별하는 방식을 쓰거나
            // 혹은 단순히 E, I 각각 점수를 더하는 방식을 쓸 수 있음.
            // 여기서는 직관적으로 E, I 각각 점수를 더하는 방식으로 구현.

            setScores(prev => {
                const newScores = { ...prev };
                const chars = dimension.split(''); // ['E', 'I']

                // 정방향(1) 질문일 때: 점수가 양수면 첫글자(E) 점수 증가, 음수면 뒷글자(I) 점수 증가
                // 역방향(-1) 질문일 때: 점수가 양수면 뒷글자(I) 점수 증가, 음수면 첫글자(E) 점수 증가

                // 더 단순한 로직:
                // 각 문항은 특정 성향을 지지함.
                // 정방향 질문: 점수 그대로 해당 성향(첫글자)에 더하고, 반대 성향에는 뺌? 
                // 아니면 그냥 E점수, I점수 별도 누적?

                // 5점 척도: 2, 1, 0, -1, -2
                // 정방향(E) 질문에 2점(매우그렇다) -> E += 2
                // 정방향(E) 질문에 -2점(매우아니다) -> I += 2 (혹은 E -= 2)

                // 역방향(I) 질문에 2점(매우그렇다) -> I += 2
                // 역방향(I) 질문에 -2점(매우아니다) -> E += 2

                const val = score * currentQ.direction;
                // val > 0 이면 첫글자(E) 성향, val < 0 이면 뒷글자(I) 성향

                if (val > 0) {
                    newScores[chars[0]] += val;
                } else if (val < 0) {
                    newScores[chars[1]] += Math.abs(val);
                }
                // 0은 영향 없음

                return newScores;
            });

            if (currentQuestion < questions.length - 1) {
                setCurrentQuestion(currentQuestion + 1);
                setFadeIn(true);
                // 스크롤을 부드럽게 상단으로
                if (topRef.current) {
                    topRef.current.scrollIntoView({ behavior: 'smooth' });
                }
            } else {
                calculateResult();
            }
        }, 300);
};
    const calculateResult = () => {
        // 상태 업데이트가 비동기이므로, 마지막 문제의 점수가 반영된 후 실행되어야 함.
        // 하지만 setScores 안에서 해결하거나, useEffect로 처리해야 함.
        // 여기서는 간단히 마지막 점수를 예측해서 계산하지 않고, 
        // 렌더링 사이클을 한 번 기다리는 대신 마지막 점수를 인자로 받아서 처리하는게 안전하지만
        // 위 handleAnswer 로직상 setScores 직후 calculateResult를 호출하면 이전 state를 참조할 수 있음.
        // 따라서 useEffect로 result 계산을 분리하거나, handleAnswer에서 계산 로직을 포함해야 함.
        // 여기서는 useEffect를 사용하여 currentQuestion이 끝났을 때 처리하도록 수정.
    };

    // 마지막 문제 답변 후 결과 계산을 위한 Effect
    useEffect(() => {
        if (currentQuestion === questions.length - 1 && !fadeIn) {
            // 마지막 문제 애니메이션이 끝난 시점... 이 아니라
            // handleAnswer에서 currentQuestion을 증가시키는데, 
            // 범위를 벗어나면 여기서 처리?
            // 아니면 handleAnswer에서 직접 처리?
            // 리액트 state 업데이트 이슈를 피하기 위해 handleAnswer를 수정합니다.
        }
    }, [currentQuestion]);

    // handleAnswer 수정: 마지막 문제일 경우 바로 결과 계산
    const handleAnswerClick = (score) => {
        setFadeIn(false);

        setTimeout(() => {
            const currentQ = questions[currentQuestion];
            const dimension = currentQ.dimension;
            const chars = dimension.split('');
            const val = score * currentQ.direction;

            setScores(prev => {
                const newScores = { ...prev };
                if (val > 0) {
                    newScores[chars[0]] += val;
                } else if (val < 0) {
                    newScores[chars[1]] += Math.abs(val);
                }

                if (currentQuestion < questions.length - 1) {
                    setCurrentQuestion(currentQuestion + 1);
                    setFadeIn(true);
                    if (topRef.current) topRef.current.scrollIntoView({ behavior: 'smooth' });
                } else {
                    // 결과 도출
                    const mbti =
                        (newScores.E >= newScores.I ? 'E' : 'I') +
                        (newScores.S >= newScores.N ? 'S' : 'N') +
                        (newScores.T >= newScores.F ? 'T' : 'F') +
                        (newScores.J >= newScores.P ? 'J' : 'P');

                    setResult({ type: mbti, scores: newScores, ...mbtiDescriptions[mbti] });
                    if (topRef.current) topRef.current.scrollIntoView({ behavior: 'smooth' });
                }
                return newScores;
            });
        }, 300);
};
    const resetTest = () => {
        setCurrentQuestion(0);
        setScores({ E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 });
        setResult(null);
        setFadeIn(true);
};
    const mbtiFaqs = [
        { q: "MBTI 테스트는 무료인가요?", a: "네, 본 사이트에서 제공하는 모든 테스트와 도구는 별도의 비용이나 회원가입 없이 100% 무료로 이용 가능합니다." },
        { q: "정식 검사와 결과가 같은가요?", a: "기본적인 알고리즘은 유사하지만, 본 테스트는 웹에서 간편하게 즐길 수 있도록 제작된 약식 형태입니다. 더 전문적인 상담은 전문가를 통해 받으시길 권장합니다." }
    ];

    const mbtiSteps = [
        "제시되는 20개의 문항을 읽고 본인의 평소 생각과 가장 일치하는 답변을 선택하세요.",
        "가능한 '보통이다'보다는 동의/비동의 중 확실한 쪽을 선택하는 것이 더 정확합니다.",
        "너무 깊게 고민하지 말고 10초 이내에 직관적으로 떠오르는 답변을 고르세요."
    ];

    if (result) {
        return (
            <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700" ref={topRef}>
                <SEO
                    title={`MBTI 결과: ${result.type} - Utility Hub`}
                    description={`당신의 MBTI는 ${result.type} (${result.title})입니다. ${result.subtitle}`}
                    keywords="MBTI 테스트, 성격 유형, 심리 테스트, MBTI 결과"
                    faqs={mbtiFaqs}
                    steps={mbtiSteps}
                />

                {/* 헤더 섹션 */}
                <div className="text-center space-y-6 py-10 bg-gradient-to-b from-primary/5 to-transparent rounded-3xl">
                    <div className="inline-block px-4 py-1.5 bg-primary/10 rounded-full mb-4">
                        <span className="text-sm font-semibold text-primary">테스트 완료</span>
                    </div>
                    <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-foreground">
                        {result.type}
                    </h1>
                    <div className="space-y-2">
                        <p className="text-3xl font-bold text-primary">{result.title}</p>
                        <p className="text-xl text-muted-foreground">{result.subtitle}</p>
                    </div>
                </div>

                {/* 스토리 섹션 */}
                <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <Brain className="w-6 h-6 text-primary" />
                        당신의 이야기
                    </h3>
                    <p className="text-lg leading-relaxed text-muted-foreground whitespace-pre-line">
                        {result.story}
                    </p>
                </div>

                {/* 성향 분석 차트 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-card border border-border rounded-2xl p-6">
                        <h3 className="font-bold text-lg mb-6">성향 분석</h3>
                        <div className="space-y-6">
                            {[
                                { left: 'E (외향)', right: 'I (내향)', lKey: 'E', rKey: 'I', color: 'bg-blue-500' },
                                { left: 'S (감각)', right: 'N (직관)', lKey: 'S', rKey: 'N', color: 'bg-yellow-500' },
                                { left: 'T (사고)', right: 'F (감정)', lKey: 'T', rKey: 'F', color: 'bg-green-500' },
                                { left: 'J (판단)', right: 'P (인식)', lKey: 'J', rKey: 'P', color: 'bg-purple-500' }
                            ].map((item, idx) => {
                                const lScore = result.scores[item.lKey];
                                const rScore = result.scores[item.rKey];
                                const total = lScore + rScore;
                                const safeTotal = total === 0 ? 1 : total; // 0으로 나누기 방지
                                const leftPercent = Math.round((lScore / safeTotal) * 100);

                                return (
                                    <div key={idx} className="space-y-2">
                                        <div className="flex justify-between text-sm font-medium">
                                            <span className={lScore >= rScore ? "text-primary font-bold" : "text-muted-foreground"}>
                                                {item.left}
                                            </span>
                                            <span className={rScore > lScore ? "text-primary font-bold" : "text-muted-foreground"}>
                                                {item.right}
                                            </span>
                                        </div>
                                        <div className="h-4 bg-secondary rounded-full overflow-hidden flex relative">
                                            <div
                                                className={`h-full ${item.color} transition-all duration-1000 ease-out`}
                                                style={{ width: `${leftPercent}%` }}
                                            />
                                            <div
                                                className="h-full bg-gray-300 dark:bg-gray-600 transition-all duration-1000 ease-out"
                                                style={{ width: `${100 - leftPercent}%` }}
                                            />
                                            {/* 중앙선 */}
                                            <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-white/50 dark:bg-black/20" />
                                        </div>
                                        <div className="flex justify-between text-xs text-muted-foreground">
                                            <span>{leftPercent}%</span>
                                            <span>{100 - leftPercent}%</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* 주요 특징 태그 */}
                    <div className="bg-card border border-border rounded-2xl p-6">
                        <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                            <Star className="w-5 h-5 text-yellow-500" />
                            주요 특징
                        </h3>
                        <div className="flex flex-wrap gap-3">
                            {result.traits.map((trait, idx) => (
                                <span key={idx} className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg font-medium">
                                    #{trait}
                                </span>
                            ))}
                        </div>
                        <div className="mt-8 space-y-4">
                            <div>
                                <h4 className="font-semibold text-green-600 dark:text-green-400 mb-2">강점</h4>
                                <p className="text-sm text-muted-foreground">{result.strengths}</p>
                            </div>
                            <div>
                                <h4 className="font-semibold text-red-600 dark:text-red-400 mb-2">약점</h4>
                                <p className="text-sm text-muted-foreground">{result.weaknesses}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 업무와 관계 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-card border border-border rounded-2xl p-6">
                        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                            <Briefcase className="w-5 h-5 text-blue-500" />
                            업무 스타일
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                            {result.workStyle}
                        </p>
                        <div className="mt-4 pt-4 border-t border-border">
                            <p className="text-sm font-semibold mb-2">추천 직업</p>
                            <p className="text-sm text-muted-foreground">{result.careers}</p>
                        </div>
                    </div>
                    <div className="bg-card border border-border rounded-2xl p-6">
                        <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                            <Heart className="w-5 h-5 text-pink-500" />
                            인간관계 & 연애
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                            {result.relationships}
                        </p>
                        <div className="mt-4 pt-4 border-t border-border">
                            <p className="text-sm font-semibold mb-2">같은 유형의 유명인</p>
                            <p className="text-sm text-muted-foreground">{result.famous}</p>
                        </div>
                    </div>
                </div>

                {/* Share Buttons */}
                <div className="bg-card border border-border rounded-xl p-6">
                    <ShareButtons
                        title={`나의 MBTI는 ${result.type} (${result.title})입니다!`}
                        description={`${result.subtitle} - ${result.story.substring(0, 100)}...`}
                    />
                </div>

                <button
                    onClick={resetTest}
                    className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                    <RotateCcw className="w-6 h-6" />
                    다시 테스트하기
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto space-y-8" ref={topRef}>
            <SEO
                title="무료 MBTI 테스트 | 2026 최신 성격 유형 검사 및 분석"
                description="나의 MBTI는 무엇일까? 20문항의 정밀한 질문으로 알아보는 무료 온라인 성격 유형 테스트. 16가지 성격 유형별 연애, 직업, 특징 분석 보고서를 즉시 확인하세요."
                keywords="MBTI테스트, 무료성격테스트, 16 personalities, 심리검사, MBTI정식검사, MBTI결과, 연애성향테스트"
                category="운세/재미"
                faqs={mbtiFaqs}
                steps={mbtiSteps}
            />

            <header className="text-center space-y-4 py-8">
                <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-2xl mb-2">
                    <Brain className="w-10 h-10 text-primary" />
                </div>
                <h1 className="text-4xl font-bold tracking-tight">
                    MBTI 성격 유형 테스트
                </h1>
                <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                    20개의 질문에 솔직하게 답해보세요.<br />
                    너무 오래 고민하지 말고 직관적으로 선택하는 것이 좋습니다.
                </p>
            </header>

            {/* 진행률 */}
            <div className="space-y-2">
                <div className="flex justify-between text-sm font-medium text-muted-foreground">
                    <span>Question {currentQuestion + 1} / {questions.length}</span>
                    <span>{Math.round(((currentQuestion + 1) / questions.length) * 100)}%</span>
                </div>
                <div className="h-3 bg-secondary rounded-full overflow-hidden">
                    <div
                        className="h-full bg-primary transition-all duration-500 ease-out"
                        style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                    />
                </div>
            </div>

            {/* 질문 카드 */}
            <div className={`bg-card border border-border rounded-2xl p-8 md:p-12 shadow-sm transition-all duration-300 ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 leading-snug">
                    {questions[currentQuestion].text}
                </h2>

                <div className="flex flex-col md:flex-row gap-3 justify-center items-stretch md:items-center">
                    {options.map((option, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleAnswerClick(option.score)}
                            className={`
                                group relative flex-1 py-4 md:py-8 px-2 rounded-xl transition-all duration-200
                                flex flex-col items-center justify-center gap-2
                                hover:scale-105 active:scale-95
                                ${option.color}
                            `}
                        >
                            <span className="text-xs md:text-sm font-medium opacity-90">{option.label}</span>
                            {/* 모바일에서는 가로로 꽉 차게, 데스크탑에서는 원형 느낌으로 크기 조절 */}
                            <div className={`
                                w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-white/30 
                                flex items-center justify-center
                                group-hover:border-white/80 transition-colors
                            `}>
                                <Check className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </button>
                    ))}
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-4 px-2">
                    <span>동의</span>
                    <span>비동의</span>
                </div>
            </div>

            <ToolGuide
                title="MBTI 성격 유형 테스트 (무료)"
                intro="MBTI(Myers-Briggs Type Indicator)는 심리학자 칼 융의 심리 유형론을 바탕으로 개발된 성격 유형 지표입니다. 본 테스트는 정밀한 5점 척도 문항을 통해 여러분의 외향/내향, 감각/직관, 사고/감정, 판단/인식 성향을 분석하여 16가지 성격 유형 중 하나로 안내해 드립니다."
                steps={[
                    "제시되는 20개의 문항을 읽고 본인의 평소 생각과 가장 일치하는 답변을 선택하세요.",
                    "가능한 '보통이다'보다는 동의/비동의 중 확실한 쪽을 선택하는 것이 더 정확합니다.",
                    "너무 깊게 고민하지 말고 10초 이내에 직관적으로 떠오르는 답변을 고르세요.",
                    "모든 문항에 답하면 즉시 결과 페이지에서 상세한 성격 분석 리포트를 확인할 수 있습니다."
                ]}
                tips={[
                    "MBTI 결과는 시간이 지나며 환경이나 심리 상태에 따라 조금씩 변할 수 있습니다. 6개월 간격으로 테스트해 보시는 것을 추천합니다.",
                    "결과가 본인의 평소 모습과 조금 다르다면, '내가 되고 싶은 모습'으로 답하지 않았는지 생각해보세요.",
                    "친구들과 결과를 공유하고 서로의 궁합(Chemistry)을 맞춰보는 것이 MBTI를 가장 재미있게 즐기는 방법입니다.",
                    "각 성격 유형별 추천 직업과 인간관계 팁을 읽어보며 자신의 강점을 극대화할 방법을 찾아보세요."
                ]}
                faqs={[
                    { q: "MBTI 테스트는 무료인가요?", a: "네, 본 사이트에서 제공하는 모든 테스트와 도구는 별도의 비용이나 회원가입 없이 100% 무료로 이용 가능합니다." },
                    { q: "정식 검사와 결과가 같은가요?", a: "기본적인 알고리즘은 유사하지만, 본 테스트는 웹에서 간편하게 즐길 수 있도록 제작된 약식 형태입니다. 더 전문적인 상담은 전문가를 통해 받으시길 권장합니다." },
                    { q: "결과 데이터가 저장되나요?", a: "사용자의 답변 데이터는 서버에 저장되지 않으며, 결과 페이지에서 스크린샷으로 저장하거나 공유 버튼을 통해 간직하실 수 있습니다." },
                    { q: "16가지 유형은 무엇인가요?", a: "INTJ, ENFP, ISTJ 등 총 16가지 조합이 있으며, 각 조합마다 고유한 성격적 특징과 장단점을 가지고 있습니다." }
                ]}
            />
        </div>
    );
};
export default MbtiTest;
