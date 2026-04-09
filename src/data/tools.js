import {
    Calculator, Type, FileText, Code, Image, Palette, Clock, Globe,
    Lock, Hash, QrCode, List, Calendar, Search, Moon, Star, Wand2, Sparkles,
    CloudRain, Activity, Flame, Zap, Keyboard, Gamepad2, DollarSign,
    Heart, Brain, Scroll, Gift, PenTool, Timer, CheckSquare, Lightbulb,
    Binary, FileCode, Edit, GitCompare, Barcode, Youtube, ImageIcon,
    Ruler, Weight, FileDigit, Key, Thermometer, Link, Trophy, MousePointer2, Crosshair, Target, Bomb, Disc, GitCommit,
    ArrowLeftRight, FileJson, Droplet, Gauge, Percent, Divide, Dices, Utensils, Bird, Grid3X3, Layers, PawPrint, Wind, User, Mic, Scale, Cookie, Eye, Circle, Ear, Music, BookOpen, HelpCircle, Radio, Smile, Battery, Smartphone, Briefcase, HelpingHand, MessageSquare, Mic2, Shield, Dog, Plus, Minus, X, TrendingUp, Wallet, Coins
} from 'lucide-react';

export const toolCategories = {
    unit: '단위 변환',
    finance: '생활/금융',
    text: '텍스트',
    dev: '개발',
    utility: '유틸리티',
    health: '건강',
    games: '게임',
    fun: '운세/재미',
    trivia: '간단 상식 테스트'
};

export const toolCategoryData = {
    unit: {
        title: '단위 변환기 모음',
        description: '길이, 무게, 환율, 온도, 면적 등 모든 단위를 한곳에서 즉시 변환하세요. 실시간 환율 정보와 정확한 단위 변환 공식을 제공합니다.',
        keywords: '단위변환기, 환율계산기, 길이변환, 무게변환, 온도계산기, 무료단위변환',
        icon: Ruler,
        color: 'from-sky-500 to-blue-500'
    },
    finance: {
        title: '생활 및 금융 계산기 모음',
        description: '대출 이자, 연봉 실수령액, 퇴직금, 최저임금 등 실생활에 꼭 필요한 금융 계산기들을 사용해보세요. 정확한 법정 산식과 최신 데이터를 반영합니다.',
        keywords: '금융계산기, 대출이자계산기, 연봉실수령액, 퇴직금계산, 최저임금계산기, 생활계산기',
        icon: DollarSign,
        color: 'from-emerald-500 to-teal-500'
    },
    text: {
        title: '텍스트 변환 및 분석 도구',
        description: '글자수 세기, 대소문자 변환, 유니코드 변환 등 텍스트 편집에 필요한 유용한 도구들입니다. 복사 붙여넣기만으로 간편하게 사용하세요.',
        keywords: '글자수세기, 텍스트변환, 대소문자변환, 유니코드변환, 텍스트도구',
        icon: Type,
        color: 'from-amber-500 to-orange-500'
    },
    dev: {
        title: '개발자 필수 온라인 도구 모음',
        description: 'JSON 포매터, Base64 인코더, 해시 생성기, URL 인코더 등 개발 생산성을 극대화하는 전문 도구들을 별도의 설치 없이 브라우저에서 사용하세요.',
        keywords: '개발자도구, JSON포매터, Base64변환, 해시생성기, 정규식테스터, 온라인코딩도구',
        icon: Code,
        color: 'from-slate-700 to-slate-900'
    },
    utility: {
        title: '편리한 생활 유틸리티 도구',
        description: 'QR코드 생성기, 바코드 생성, 비밀번호 생성, 세계 시계 등 일상의 번거로움을 해결해주는 다양한 유틸리티 도구 모음입니다.',
        keywords: '유틸리티도구, QR코드생성기, 바코드생성, 비밀번호생성기, 온라인색상표, IP주소확인',
        icon: Zap,
        color: 'from-indigo-500 to-blue-600'
    },
    health: {
        title: '건강 및 신체 지수 계산기',
        description: 'BMI(비만도), BMR(기초대사량), 바이오리듬 등 자신의 건강 상태를 체크할 수 있는 전문적인 건강 지수 계산기를 제공합니다.',
        keywords: '건강계산기, BMI계산기, 비만도측정, 기초대사량계산, 바이오리듬확인',
        icon: Activity,
        color: 'from-rose-500 to-pink-500'
    },
    games: {
        title: '미니 게임 모음',
        description: '수박 게임, 2048, 스도쿠, 스네이크 등 별도의 설치 없이 바로 즐길 수 있는 중독성 만점 미니 게임들을 한곳에서 플레이하세요.',
        keywords: '미니게임, 온라인게임, 무료게임, 수박게임, 2048, 스도쿠, 간단한게임',
        icon: Gamepad2,
        color: 'from-orange-500 to-red-600'
    },
    fun: {
        title: '재미있는 운세와 심리 테스트 무더기',
        description: '정통 사주팔자부터 MBTI 성격 테스트, 오늘의 운세, 타로 카드까지! 당신의 운세와 심리를 알아보는 즐거운 콘텐츠가 가득합니다.',
        keywords: '무료운세, 사주팔자, MBTI테스트, 심리테스트, 타로카드, 오늘의운세',
        icon: Sparkles,
        color: 'from-purple-500 to-fuchsia-600'
    },
    trivia: {
        title: '간단 상식 테스트 모음',
        description: '초성 퀴즈, 상식 문제 등 재미있게 지식을 쌓을 수 있는 퀴즈 모음입니다.',
        keywords: '상식, 퀴즈, 초성게임, 단어맞추기, trivia',
        icon: BookOpen,
        color: 'from-yellow-400 to-orange-500'
    }
};

export const tools = [
    // Unit Converters
    {
        id: 'length',
        title: '길이 변환기 | 미터, 피트, 인치 단위 계산',
        description: '다양한 길이 단위를 즉시 변환하세요. 미터(m), 피트(ft), 인치(in), 센티미터(cm), 밀리미터(mm), 마일(mile) 등 전 세계 모든 길이 단위를 지원합니다. 별도의 설치 없이 브라우저에서 바로 사용하는 정확한 무료 온라인 변환 도구입니다.',
        path: '/length',
        category: 'unit',
        icon: Ruler,
        color: 'bg-sky-500',
        translated: true,
        keywords: ['길이변환기', '단위변환', '미터피트변환', '인치센티미터', '무료온라인도구', 'length converter']
    },
    {
        id: 'weight',
        title: '무게 변환기 | 킬로그램, 파운드, 온스 계산',
        description: '킬로그램(kg), 파운드(lb), 온스(oz), 그람(g), 밀리그램(mg) 등 무게 단위를 간편하게 상호 변환하세요. 정밀한 변환 공식을 사용하여 해외 직구, 다이어트, 요리 등 생활 속에 필요한 무게를 즉석에서 계산해 주는 무료 온라인 무게 계산기입니다.',
        path: '/weight',
        category: 'unit',
        icon: Weight,
        color: 'bg-sky-600',
        translated: true,
        keywords: ['무게변환기', '단위계산', 'kg파운드변환', '온스계산', 'weight converter']
    },
    {
        id: 'currency',
        title: '실시간 환율 계산기 | 오늘 달러 엔화 유로 환율 변환',
        description: '전 세계 주요 통화의 최신 시장 환율을 확인하고 목표 환전 금액을 상세히 분석하세요. 달러(USD), 엔화(JPY), 유로(EUR), 위안(CNY) 등 매일 업데이트되는 실시간 환율 정보를 기반으로 오차 없는 빠르고 정확한 금액 변환을 지원하는 계산기입니다.',
        path: '/currency',
        category: 'unit',
        icon: DollarSign,
        color: 'bg-sky-700',
        translated: true,
        keywords: ['환율계산기', '오늘의환율', '달러환율', '엔화환율', '통화변환', '실시간환율', 'currency exchange']
    },
    {
        id: 'temperature-converter',
        title: '온도 변환기',
        description: '섭씨(°C), 화씨(°F), 켈빈(K) 등 모든 글로벌 온도 단위를 즉시 상호 변환하세요. 해외 요리 레시피 해석, 과학 실험, 미국 등 해외 기상 및 날씨 정보를 확인할 때 유용하게 쓰이는 직관적이고 정확한 무료 온라인 온도 계산기입니다.',
        path: '/temperature-converter',
        category: 'unit',
        icon: Thermometer,
        color: 'bg-red-500',
        translated: true,
        keywords: ['온도', '섭씨', '화씨', '켈빈', 'temperature', 'converter']
    },
    {
        id: 'area-converter',
        title: '면적 변환기',
        description: '제곱미터(㎡), 평, 에이커(ac), 헥타르(ha) 등 다양한 부동산 면적 단위를 간편하게 변환하세요. 아파트 평수 계산이나 토지 면적 단위 환산 등 일상적인 부동산 거래 및 넓이 파악 시 꼭 필요한 빠르고 정확한 무료 온라인 면적 변환 평수 계산기입니다.',
        path: '/area-converter',
        category: 'unit',
        icon: Ruler,
        color: 'bg-blue-600',
        translated: true,
        keywords: ['면적', '평수', '제곱미터', '에이커', 'area']
    },
    {
        id: 'volume-converter',
        title: '부피 변환기',
        description: '리터(l), 갤런(gal), 세제곱미터(㎥), 온스(oz) 등 모든 액체 및 부피 단위를 즉시 자동 정밀 변환하세요. 해외 요리 레시피나 액체 용량, 과학 계산 등에 꼭 필요한 빠르고 편리한 무료 온라인 부피 전용 계산기 모음입니다.',
        path: '/volume-converter',
        category: 'unit',
        icon: Droplet,
        color: 'bg-cyan-600',
        translated: true,
        keywords: ['부피', '리터', '갤런', 'volume']
    },
    {
        id: 'speed-converter',
        title: '속도 변환기',
        description: 'km/h(시속), mph(마일), m/s(초속), 노트(knot), 마하(Mach) 등 구하기 까다로운 모든 속도 단위를 즉시 상호 변환하세요. 해외 여행 시 자동차 속도계 체감, 항공·선박 이동 속도 이해, 차량 스펙 비교에 유용한 정확한 무료 온라인 속도 계산기입니다.',
        path: '/speed-converter',
        category: 'unit',
        icon: Gauge,
        color: 'bg-orange-600',
        translated: true,
        keywords: ['속도', 'kmh', 'mph', 'speed']
    },

    // Finance/Life
    {
        id: 'loan',
        title: '대출 이자 계산기 | 원리금균등, 만기일시 상환',
        description: '대출 금액, 금리, 기간을 입력하여 매월 납부해야 하는 원리금 균등상환, 원금균등상환, 만기일시상환 방식별 이자와 총 상환 비용을 정확하게 계산하세요. 주담대, 전세자금, 신용대출 상환 계획 수립 시 필수적인 무료 대출이자 계산기입니다.',
        path: '/loan',
        category: 'finance',
        icon: Calculator,
        color: 'bg-blue-500',
        translated: true,
        keywords: ['loan calculator', 'interest', 'amortization', 'repayment']
    },
    {
        id: 'salary',
        title: '연봉 실수령액 계산기 | 2025년 최신 4대보험 반영',
        description: '2025년 최신 세율, 4대 사회보험 요율(국민연금, 건강보험, 고용보험), 소득세 및 비과세 한도(식대 등)를 모두 반영하여 나의 실제 월급 실수령액을 간편하게 계산하세요. 이직이나 연봉 협상 시 진짜 가져가는 급여 내역을 1원 단위까지 확인 가능합니다.',
        path: '/salary-calculator',
        category: 'finance',
        icon: DollarSign,
        color: 'bg-emerald-600',
        translated: true,
        keywords: ['salary calculator', 'net pay', 'korea tax', 'take home pay']
    },
    {
        id: 'severance',
        title: '퇴직금 계산기',
        description: '입사일과 퇴사일, 최근 3개월 급여 및 상여금 정보를 바탕으로 예상 퇴직금을 정확하게 산출해 드립니다. 고용노동부 기준 법정 퇴직금 계산법을 준수하므로 퇴사 전 정확한 재무 계획을 세우고 퇴직 연금을 확인해 볼 수 있습니다.',
        path: '/severance-calculator',
        category: 'finance',
        icon: Wallet,
        color: 'bg-teal-600',
        translated: true,
        keywords: ['severance pay', 'retirement pay', 'korea labor law', 'toejikgeum']
    },
    {
        id: 'minimum-wage',
        title: '최저임금 계산기 | 2025년 주휴수당 포함 월급 계산',
        description: '2025년 최저임금(10,030원)을 기준으로 나의 시급이 법적 기준을 충족하는지 바로 확인하세요. 정규 근로시간에 따른 예상 월급과 필수 산정되는 주휴수당까지 한 번에 자동 계산하여 알바나 파트타임 근무 시 꼭 필요한 임금 계산 도구입니다.',
        path: '/minimum-wage-calculator',
        category: 'finance',
        icon: Coins,
        color: 'bg-cyan-600',
        translated: true,
        keywords: ['minimum wage', 'korea labor law', 'hourly rate', 'weekly holiday pay']
    },
    {
        id: 'compound-interest',
        title: '복리 계산기 | 예금 적금 투자 수익률 계산',
        description: '원금과 월별 적립액, 기대 이자율, 그리고 투자 기간을 설정하여 시간이 지날수록 눈덩이처럼 불어나는 복리 이자의 마법을 시뮬레이션하세요. 주식, 펀드, 예적금 투자의 장기적인 연평균 수익률(CAGR)을 분석하는 강력한 투자 도구입니다.',
        path: '/compound-interest',
        category: 'finance',
        icon: Calculator,
        color: 'bg-blue-600',
        translated: true,
        keywords: ['compound interest', 'investing', 'ROI', 'savings']
    },
    {
        id: 'percent-calculator',
        title: '퍼센트 계산기 (백분율)',
        description: '전체값의 일정 비율(%), 값 간의 증감률, 주식 수익률, 할인가격 계산 등 일상에서 자주 접하지만 헷갈리는 모든 백분율 및 퍼센트 연산을 한 번에 막힘없이 해결해 드립니다. 비즈니스 마진율이나 쇼핑 할인율 파악에 특화된 직관적이고 정확한 계산기입니다.',
        path: '/percent-calculator',
        category: 'finance',
        icon: Percent,
        color: 'bg-green-600',
        translated: true,
        keywords: ['percent calculator', 'percentage', 'ratio', 'increase', 'decrease']
    },
    {
        id: 'discount-calculator',
        title: '할인 계산기',
        description: '상품 원가와 세일 할인율(%)을 입력하여 정확한 최종 결제 금액과 실제 절약된 혜택 금액을 확인하세요. 이중 할인이나 추가 쿠폰이 적용될 경우의 실구매가를 한 번에 알 수 있어 효율적이고 알뜰한 쇼핑을 도와주는 쇼핑 전용 계산기입니다.',
        path: '/discount-calculator',
        category: 'finance',
        icon: Calculator,
        color: 'bg-red-500',
        translated: true,
        keywords: ['discount calculator', 'sale price', 'shopping', 'savings', 'reverse discount']
    },
    {
        id: 'work-hours',
        title: '근무 시간 계산기 | 통상임금, 초과수당 자동 계산',
        description: '나의 출근 시간과 퇴근 시간, 휴게 시간을 입력하여 하루 실근로 시간과 주간 합산 근로 시간을 간편하게 기록하고 확인하세요. 아르바이트, 교대 근무, 시급제 근로자의 정확한 소정근로시간 파악 및 초과 근무 시간에 따른 추가 임금 산정에 매우 유용한 도구입니다.',
        path: '/work-hours',
        category: 'finance',
        icon: Clock,
        color: 'bg-blue-700',
        translated: true,
        keywords: ['work hours', 'salary', 'hourly wage', 'shift calculator', 'overtime', 'night shift']
    },
    {
        id: 'age-calc',
        title: '나이 계산기 | 만 나이, 연 나이 자동 계산',
        description: '법적 기준인 ‘만 나이 통일법’에 맞춰 나의 생년월일을 입력하면 현재 정확한 만 나이와 연 나이를 즉시 보여줍니다. 또한 띠 확인 및 다음 생일까지 남은 D-Day 날짜를 계산해 주어 여권 발급, 군인, 연금 수급 등 중요 법적 자격 요건 확인에 필수적입니다.',
        path: '/age-calc',
        category: 'finance',
        icon: Calendar,
        color: 'bg-cyan-600',
        translated: true,
        keywords: ['나이', '만나이', '연나이', 'age', 'calculator']
    },
    {
        id: 'date',
        title: '날짜 계산기 | 디데이(D-Day), 만난 날짜 자동 계산',
        description: '두 날짜 사이의 정확한 일수 차이 계산, 커플 연애 100일/200일 등 지정일로부터 지난 날짜 또는 앞으로 남은 D-Day 계산을 간편하게 해결하세요. 아기 개월 수, 달력 기반 휴일 제외 영업일 계산 등 중요한 날짜 관리를 한곳에서 모아 직관적으로 제공합니다.',
        path: '/date',
        category: 'finance',
        icon: Calendar,
        color: 'bg-cyan-500',
        translated: true,
        keywords: ['날짜', 'dday', '디데이', 'date', 'calculator']
    },
    {
        id: 'lunch-recommender',
        title: '점심 메뉴 추천 & 룰렛',
        description: '오늘 점심 뭐 먹지? 고민될 때 한식, 중식, 일식, 양식 등 다양한 카테고리 중에서 당신의 입맛에 맞는 매력적인 메뉴를 랜덤으로 추천해 드립니다. 식사 결정 장애를 한 번에 해결해 주는 재미있고 유용한 직장인 및 학생 필수 메뉴 추천 룰렛 도구입니다.',
        path: '/lunch-recommender',
        category: 'finance',
        icon: Utensils,
        color: 'bg-orange-500',
        translated: true,
        keywords: ['점심', '메뉴', '추천', 'lunch', 'food', 'random']
    },

    // Text Tools
    {
        id: 'word-count',
        title: '글자 수 세기 | 이력서 자소서 글자수 계산기',
        description: '입력한 텍스트의 공백 포함 및 공백 제외 글자 수, 단어 수, 문장 수, 원고지 매수(200자 기준), 바이트(Byte)를 즉시 실시간으로 아주 정확하게 분석해 드립니다. 입사 지원서, 자기소개서 작성이나 블로그, SNS 포스팅 최적화 시 꼭 필요한 필수 글자수 계산기입니다.',
        path: '/word-count',
        category: 'text',
        icon: FileText,
        color: 'bg-violet-500',
        translated: true,
        keywords: ['글자수', '단어수', 'word', 'count', 'character']
    },
    {
        id: 'unicode',
        title: '유니코드 변환기 | 인코딩 디코딩 문자 변환',
        description: '한글, 영문, 특수 기호 등 일반 텍스트를 컴퓨터가 이해할 수 있는 유니코드(Unicode) 이스케이프 이진 형식으로 완벽하게 인코딩 변환하거나, 읽기 복잡한 유니코드 문자를 다시 알아보기 쉬운 일상적인 텍스트 언어로 안전하고 신속하게 디코딩 해주는 개발자 전용 도구입니다.',
        path: '/unicode',
        category: 'text',
        icon: Code,
        color: 'bg-violet-600',
        translated: true,
        keywords: ['유니코드', 'unicode', 'converter', 'text']
    },
    {
        id: 'string-converter',
        title: '문자열 변환기 | 대소문자, 카멜케이스 포맷 변환',
        description: '영문 문자열의 전체 대문자(Uppercase), 소문자(Lowercase) 변환은 물론, 개발자에게 유용한 카멜 케이스(camelCase), 파스칼 케이스(PascalCase), 스네이크 케이스, 케밥 케이스 등 프로그래밍 코딩 명명 규칙에 맞게 즉시 다중 변환합니다.',
        path: '/string-converter',
        category: 'text',
        icon: Type,
        color: 'bg-violet-700',
        translated: true,
        keywords: ['문자열', 'string', 'case', 'converter']
    },
    {
        id: 'base64',
        title: 'Base64 인코더 및 디코더 | 텍스트 변환',
        description: '중요한 텍스트 문자열이나 프로그래밍 데이터를 암호화표준인 Base64 형식으로 빠르게 인코딩하거나, 전달받은 Base64 코드를 원래의 깨끗한 일반 텍스트로 안전하게 디코딩할 수 있습니다. 데이터 전송 오류를 막고 코드 스니펫 보안을 도와주는 강력한 무료 웹 기반 도구입니다.',
        path: '/base64',
        category: 'text',
        icon: FileDigit,
        color: 'bg-purple-600',
        translated: true,
        keywords: ['base64', 'encode', 'decode', 'text']
    },
    {
        id: 'html-encoder',
        title: 'HTML 인코더 및 디코더 | 엔티티 이스케이프',
        description: '웹페이지 개발 시 충돌을 일으키는 HTML 특수 문자나 태그를 안전한 HTML 엔티티(Entity) 형태로 이스케이프 인코딩하거나 원본 소스 상태로 디코딩합니다. XSS와 같은 크로스 사이트 스크립팅 웹 취약점 예방 및 안전한 프론트엔드 코드 작성을 적극적으로 돕습니다.',
        path: '/html-encoder',
        category: 'text',
        icon: Code,
        color: 'bg-purple-700',
        translated: true,
        keywords: ['html', 'encoder', 'entity', 'escape']
    },
    {
        id: 'morse-code',
        title: '모스 부호 변환기 (번역기)',
        description: '한글, 영어 알파벳, 숫자를 국제 민간 표준 규격인 삐- 점과 선의 모스 부호(Morse Code)로 완벽하게 변환하거나, 알 수 없는 모스 신호 체계를 다시 읽을 수 있는 텍스트 문서로 자동 번역 및 해독해 주는 매우 유익하고 흥미로운 양방향 통신 암호 변환 도구입니다.',
        path: '/morse-code',
        category: 'text',
        icon: Radio,
        color: 'bg-gray-800',
        translated: true,
        keywords: ['모스부호', 'morse', 'code']
    },

    // Dev Tools
    {
        id: 'base-converter',
        title: '진법 변환기',
        description: '복잡한 2진수, 8진수, 10진수, 16진수 사이의 진법 변환을 즉시 수행합니다. 각 진법별 정확한 표현 방식과 컴퓨터 공학에 필요한 수학적 계산 결과치를 실시간으로 제공하는 개발자 전용 무료 웹 계산기입니다.',
        path: '/base-converter',
        category: 'dev',
        icon: Binary,
        color: 'bg-green-600',
        translated: true,
        keywords: ['진법', 'binary', 'hex', 'decimal', 'calculator', '2진수', '16진수']
    },
    {
        id: 'json-formatter',
        title: 'JSON 포맷터',
        description: '복잡하고 길게 얽혀 알아보기 힘든 JSON 데이터를 사람이 읽기 좋게 들여쓰기 정렬(Beautify)해주고 문법 오류를 확실하게 검사해 드립니다. 깔끔한 트리 구조 뷰어 기능을 통해 데이터 파싱 구조를 단번에 파악하세요.',
        path: '/json-formatter',
        category: 'dev',
        icon: FileCode,
        color: 'bg-green-700',
        translated: true,
        keywords: ['json', 'formatter', 'validator']
    },
    {
        id: 'markdown-editor',
        title: '마크다운 에디터 | 실시간 미리보기 및 HTML 변환',
        description: '웹 브라우저에서 마크다운(Markdown) 코드를 작성하고 실시간 미리보기로 결과물을 즉시 확인하세요. 깃허브 리드미 작성 및 블로그 포스팅에 최적화된 무료 에디터입니다.',
        path: '/markdown-editor',
        category: 'dev',
        icon: FileText,
        color: 'bg-emerald-600',
        translated: true,
        keywords: ['markdown', 'editor', 'preview', 'github', 'readme', '마크다운']
    },
    {
        id: 'html-view',
        title: 'HTML 포맷터',
        description: '정돈되지 않은 HTML 소스 코드를 깔끔하게 정렬 포맷팅(Beautify) 하거나, 작성한 태그 코드가 실제 웹 브라우저 환경에서 어떻게 렌더링되어 보이는지 실시간 결과물로 점검할 수 있는 유용한 프론트엔드 검증 도구입니다.',
        path: '/html-view',
        category: 'dev',
        icon: FileCode,
        color: 'bg-emerald-500',
        translated: true,
        keywords: ['html', 'formatter', 'preview']
    },
    {
        id: 'diff',
        title: '코드 텍스트 비교 (Diff Checker)',
        description: '두 개의 서로 다른 코드나 텍스트 문서를 양옆으로 비교하여 추가되거나 삭제된 부분, 미세하게 변경된 줄을 깃(Git)처럼 시각적으로 한눈에 명확히 파악할 수 있도록 돕는 차이점 분석 및 디버깅 전용 툴입니다.',
        path: '/diff',
        category: 'dev',
        icon: GitCompare,
        color: 'bg-lime-600',
        translated: true,
        keywords: ['diff', 'compare', 'code', 'text', '비교', '차이']
    },
    {
        id: 'web-editor',
        title: '웹 에디터',
        description: '에디터 설치 없이 HTML, CSS, JavaScript 코드를 웹상에서 실시간으로 직접 편집하고 디자인 결과 화면을 즉시 확인해 보세요. 코드펜(CodePen)처럼 자유로운 퍼블리싱 학습이 가능합니다.',
        path: '/web-editor',
        category: 'dev',
        icon: Edit,
        color: 'bg-teal-500',
        translated: true,
        keywords: ['web', 'editor', 'html', 'css', 'javascript']
    },
    {
        id: 'hash-gen',
        title: '해시 생성기',
        description: '입력한 일반 텍스트 문장이나 비밀번호를 MD5, SHA-1, SHA-256, SHA-512 등 세계적으로 널리 쓰이는 다양한 암호화 알고리즘을 사용하여 복원 불가능한 일방향 보안 해시 문자열 값으로 즉석에서 안전하게 생성해 드립니다.',
        path: '/hash-gen',
        category: 'dev',
        icon: Hash,
        color: 'bg-teal-600',
        translated: true,
        keywords: ['hash', 'md5', 'sha', 'generator']
    },
    {
        id: 'uuid-gen',
        title: 'UUID 생성기',
        description: '소프트웨어 개발에 필수적으로 요구되는 절대 중복되지 않는 범용 고유 식별자인 UUID v4 버전을 대량으로 빠르게 생성해 드립니다. 데이터베이스 프라이머리 키(PK) 입력이나 안전한 API 통신을 위한 고유 키를 즉시 발급받으세요.',
        path: '/uuid-gen',
        category: 'dev',
        icon: Key,
        color: 'bg-teal-700',
        translated: true,
        keywords: ['uuid', 'guid', 'generator', 'unique']
    },
    {
        id: 'url-encoder',
        title: 'URL 인코더/디코더',
        description: '인터넷 웹 URL 주소에 포함된 민감한 특수 문자나 한글 데이터를 브라우저가 인식할 수 있는 안전한 퍼센트 인코딩 형식으로 변환하거나 알아보기 힘든 인코딩된 주소를 다시 가독성 높은 원본 주소로 디코딩합니다.',
        path: '/url-encoder',
        category: 'dev',
        icon: Link,
        color: 'bg-blue-500',
        translated: true,
        keywords: ['url', 'encoder', 'decoder', 'encode', 'decode']
    },
    {
        id: 'jwt-decoder',
        title: 'JWT 디코더',
        description: '웹 인증에 널리 사용되는 JSON 웹 토큰(JWT)의 헤더(Header)와 페이로드(Payload) 데이터를 브라우저 단에서 즉시 디코딩하여, 내부 클레임 정보와 서명 만료일 등의 구조를 안전하게 디버깅하세요.',
        path: '/jwt-decoder',
        category: 'dev',
        icon: Key,
        color: 'bg-yellow-500',
        translated: true,
        keywords: ['jwt', 'decoder', 'token', 'json', 'web']
    },
    {
        id: 'regex-tester',
        title: '정규식 테스터',
        description: '난해한 정규표현식(Regular Expression) 패턴을 실시간으로 테스트하고 즉시 매칭 결과를 검증하세요. 자바스크립트(JS) 엔진 기반의 직관적인 구문 하이라이트와 유용한 문법 치트시트를 활용하여 쉽고 빠르게 코드를 완성합니다.',
        path: '/regex-tester',
        category: 'dev',
        icon: Search,
        color: 'bg-purple-500',
        translated: true,
        keywords: ['regex', 'regular', 'expression', 'tester']
    },
    {
        id: 'ascii-art',
        title: '아스키아트',
        description: '영문 텍스트를 화려한 아스키 아트(ASCII Art) 모양의 폰트 블록으로 즉시 변환해 줍니다. 텍스트 기반 커뮤니티나 코드 주석 등에 사용하여 개성 있는 시각적 요소를 자유롭게 만들어 보세요.',
        path: '/ascii-art',
        category: 'dev',
        icon: Type,
        color: 'bg-green-800',
        translated: true,
        keywords: ['ascii', 'art', 'text']
    },
    {
        id: 'ascii-table',
        title: '아스키 코드표 (ASCII Table) | 10진수 16진수 문자 대응표',
        description: '표준 ASCII 코드표를 한눈에 확인하세요. 10진수, 16진수, 문자와 상세 설명을 제공하며 클릭 한 번으로 문자를 복사할 수 있는 개발자 전용 필수 참조 도구입니다.',
        path: '/ascii-table',
        category: 'dev',
        icon: FileCode,
        color: 'bg-lime-800',
        translated: true,
        keywords: ['ascii', 'table', 'code']
    },
    {
        id: 'special-char',
        title: '특수문자표 | 이모지 및 특수기호 원클릭 복사 모음',
        description: '화살표, 수학 기호, 통화 단위, 이모지 등 다양한 특수문자를 카테고리별로 모았습니다. 필요한 기호를 클릭하여 즉시 클립보드에 복사해 문서 및 채팅에 활용하세요.',
        path: '/special-char',
        category: 'dev',
        icon: Hash,
        color: 'bg-emerald-800',
        translated: true,
        keywords: ['special', 'character', 'symbol']
    },
    {
        id: 'cron-generator',
        title: 'CRON 표현식 생성기 | 크론탭(Crontab) 스케줄 설정 도구',
        description: '복잡한 CRON 표현식을 UI를 통해 간편하게 생성하세요. 실행 주기를 시각적으로 설정하고 향후 실행 일정을 미리 확인하여 서버 예약 작업을 완벽하게 관리할 수 있습니다.',
        path: '/cron-generator',
        category: 'dev',
        icon: Clock,
        color: 'bg-blue-600',
        translated: true,
        keywords: ['cron', 'schedule', 'expression', 'generator', '스케줄']
    },
    {
        id: 'csv-json',
        title: 'CSV ↔ JSON 변환기 | 데이터 양방향 변환기',
        description: 'CSV 파일을 JSON 객체로, 또는 JSON 데이터를 CSV 형식으로 상호 변환하세요. 데이터 파싱과 API 연동 작업을 돕는 빠르고 정확한 무료 온라인 데이터 변환 도구입니다.',
        path: '/csv-json',
        category: 'dev',
        icon: ArrowLeftRight,
        color: 'bg-purple-600',
        translated: true,
        keywords: ['csv', 'json', 'converter', '변환', 'data']
    },
    {
        id: 'fraction-calculator',
        title: '분수 계산기',
        description: '까다로운 두 분수의 덧셈, 뺄셈, 곱셈, 나눗셈 수학 연산을 정밀하게 수행합니다. 단순히 정답만 던져주는 것이 아니라 자동으로 약분 처리된 깔끔한 기약 분수 형태와 직관적인 소수점 환산 결과를 동시에 한 번에 제공합니다.',
        path: '/fraction-calculator',
        category: 'dev',
        icon: Divide,
        color: 'bg-violet-600',
        translated: true,
        keywords: ['fraction calculator', 'math', 'simplify', 'decimal to fraction']
    },
    {
        id: 'encryption-tool',
        title: 'AES 텍스트 암호화 및 복호화 | 텍스트 보안 도구',
        description: 'AES-256 알고리즘을 사용하여 중요한 텍스트를 비밀번호로 암호화하거나 복호화하세요. 브라우저 내에서 안전하게 처리되어 개인정보 유출 걱정 없이 보안 메시지를 관리합니다.',
        path: '/encryption-tool',
        category: 'dev',
        icon: Lock,
        color: 'bg-red-600',
        translated: true,
        keywords: ['암호화', '복호화', 'aes']
    },

    // Utility
    {
        id: 'qr-gen',
        title: 'QR코드 생성기 | URL 및 와이파이 명함 QR 만들기',
        description: '웹사이트 주소, 텍스트, WiFi 연결 정보, 연락처(vCard)를 담은 고화질 QR코드를 즉시 생성하고 다운로드하세요. 마케팅 및 정보 공유를 위한 최적의 무료 도구입니다.',
        path: '/qr-gen',
        category: 'utility',
        icon: QrCode,
        color: 'bg-orange-500',
        translated: true,
        keywords: ['qr', 'code', 'generator']
    },
    {
        id: 'barcode-gen',
        title: '바코드 생성기',
        description: '숫자를 입력하여 다양한 형식의 바코드 이미지를 빠르게 생성하세요. 재고 관리나 유통 업무에 무료로 활용할 수 있습니다.',
        path: '/barcode-gen',
        category: 'utility',
        icon: Barcode,
        color: 'bg-orange-600',
        translated: true,
        keywords: ['barcode', 'generator']
    },
    {
        id: 'password-gen',
        title: '비밀번호 생성기',
        description: '대소문자, 숫자, 특수문자를 조합하여 해킹이 불가능한 강력한 랜덤 비밀번호를 즉시 생성하여 보안을 강화하세요.',
        path: '/password-gen',
        category: 'utility',
        icon: Lock,
        color: 'bg-red-600',
        translated: true,
        keywords: ['password', 'generator', 'random']
    },
    {
        id: 'color-picker',
        title: '색상표 & 컬러 피커 | HEX RGB HSL 색상 변환',
        description: '디자인에 필요한 컬러 코드를 선택하고 HEX, RGB, HSL 형식으로 즉시 확인하세요. 웹 안전 색상과 팔레트 기능을 제공하여 완벽한 디자인 작업을 돕는 무료 색상표 도구입니다.',
        path: '/color-picker',
        category: 'utility',
        icon: Palette,
        color: 'bg-amber-600',
        translated: true,
        keywords: ['color', 'picker', 'hex', 'rgb']
    },
    {
        id: 'image-base64',
        title: '이미지 Base64 변환기 | 온라인 이미지 인코딩 도구',
        description: '이미지 파일을 Base64 문자열로 인코딩하여 HTML이나 CSS에 직접 삽입 가능한 Data URI 형식으로 변환하세요. 별도 파일 없이 이미지를 임베딩하는 필수 개발 도구입니다.',
        path: '/image-base64',
        category: 'utility',
        icon: Lightbulb,
        color: 'bg-yellow-700',
        translated: true,
        keywords: ['image', 'base64', 'encode']
    },
    {
        id: 'ip-address',
        title: '내 IP 주소 확인 | 공인 IP 및 위치 정보 조회',
        description: '현재 접속 중인 공인 IP 주소와 네트워크 위치, ISP 정보를 즉시 확인하세요. 별도의 프로그램 설치 없이 내 인터넷 연결 상태와 아이피 주소를 상세히 알려드립니다.',
        path: '/ip-address',
        category: 'utility',
        icon: Globe,
        color: 'bg-orange-700',
        translated: true,
        keywords: ['ip', 'address', 'location']
    },
    {
        id: 'timer',
        title: '타이머/스톱워치',
        description: '정밀한 시간 측정을 위한 온라인 타이머와 스톱워치입니다. 작업, 운동, 요리 등 다양한 상황에서 랩타임 기록 기능을 사용해 보세요.',
        path: '/timer',
        category: 'utility',
        icon: Timer,
        color: 'bg-amber-700',
        translated: true,
        keywords: ['timer', 'stopwatch', 'alarm']
    },
    {
        id: 'pomodoro-timer',
        title: '포모도로 타이머',
        description: '25분 집중 근무와 5분 휴식을 반복하는 포모도로 기법을 통해 업무 효율과 집중력을 극대화할 수 있도록 도와줍니다.',
        path: '/pomodoro-timer',
        category: 'utility',
        icon: Timer,
        color: 'bg-red-500',
        translated: true,
        keywords: ['pomodoro', 'timer', 'focus', 'study']
    },
    {
        id: 'checklist',
        title: '체크리스트',
        description: '간편하게 체크리스트를 작성하여 오늘의 할 일이나 장보기 목록을 관리하세요. 브라우저를 닫아도 기록이 로컬에 저장됩니다.',
        path: '/checklist',
        category: 'utility',
        icon: CheckSquare,
        color: 'bg-yellow-600',
        translated: true,
        keywords: ['checklist', 'todo', 'task manager']
    },
    {
        id: 'flashlight',
        title: '손전등',
        description: '어두운 곳에서 빛이 필요할 때 모바일이나 노트북 화면을 최대 밝기의 흰색 화면으로 전환하여 손전등 대용으로 사용하세요.',
        path: '/flashlight',
        category: 'utility',
        icon: Zap,
        color: 'bg-amber-500',
        keywords: ['flashlight', 'light', 'torch']
    },
    {
        id: 'image-resize',
        title: '이미지 리사이즈',
        description: '이미지의 가로 세로 크기를 원하는 픽셀 단위로 조정하고, 품질을 유지하면서 파일 용량을 효율적으로 압축하여 리사이징합니다.',
        path: '/image-resize',
        category: 'utility',
        icon: ImageIcon,
        color: 'bg-orange-700',
        translated: true,
        keywords: ['image', 'resize', 'compress']
    },
    {
        id: 'youtube-thumbnail',
        title: '유튜브 썸네일',
        description: '유튜브 영상의 URL을 입력하면 해당 영상의 고화질 썸네일 이미지를 즉시 추출하여 내 컴퓨터에 다운로드할 수 있습니다.',
        path: '/youtube-thumbnail',
        category: 'utility',
        icon: Youtube,
        color: 'bg-red-600',
        keywords: ['youtube', 'thumbnail', 'download']
    },
    {
        id: 'mandalart',
        title: '만다라트 플래너',
        description: '핵심 목표와 64개의 세부 실행 계획을 체계적으로 수립하는 만다라트 기법을 사용하여 꿈을 현실로 만드는 계획을 세워 보세요.',
        path: '/mandalart',
        category: 'utility',
        icon: Grid3X3,
        color: 'bg-sky-500',
        translated: true,
        keywords: ['만다라트', 'mandalart', '목표계획', '플래너']
    },
    {
        id: 'color-extractor',
        title: '이미지 색상 추출',
        description: '사진이나 이미지 파일을 업로드하면 이미지 내에서 사용된 주요 색상 팔레트와 HEX 코드를 전문가 수준으로 추출해 드립니다.',
        path: '/color-extractor',
        category: 'utility',
        icon: Palette,
        color: 'bg-pink-500',
        translated: true,
        keywords: ['color extractor', 'palette', 'image analysis']
    },
    {
        id: 'world-clock',
        title: '세계 시간',
        description: '뉴욕, 런던, 파리, 도쿄 등 전 세계 주요 도시의 현재 시간과 시차 정보를 실시간으로 비교하고 확인하세요.',
        path: '/world-clock',
        category: 'utility',
        translated: true,
        icon: Globe,
        color: 'bg-indigo-600',
        keywords: ['세계시간', 'timezone', '시계']
    },

    // Health
    {
        id: 'bmi',
        title: 'BMI 계산기',
        description: '나의 신장과 체중을 입력하여 체질량지수(BMI)를 산출하고, 현재의 비만도 상태와 건강 체중 범위를 즉시 확인하세요.',
        path: '/bmi',
        category: 'health',
        icon: Activity,
        color: 'bg-green-500',
        translated: true,
        keywords: ['bmi', 'body mass index', 'health']
    },
    {
        id: 'bmr',
        title: 'BMR 계산기 (기초대사량)',
        description: '성별, 연령, 활동량을 고려한 기초대사량(BMR)을 계산하여 하루에 필요한 기본 칼로리 섭취량을 파악하고 체계적으로 다이어트 계획을 세우세요.',
        path: '/bmr',
        category: 'health',
        icon: Flame,
        color: 'bg-orange-500',
        translated: true,
        keywords: ['bmr', 'tdee', 'calorie']
    },
    {
        id: 'biorhythm',
        title: '바이오리듬 확인',
        description: '생년월일을 기준으로 신체, 감성, 지성 주기를 그래프로 시각화하여 오늘의 컨디션과 주의해야 할 상태를 미리 확인해 보세요.',
        path: '/biorhythm',
        category: 'health',
        icon: Activity,
        color: 'bg-rose-500',
        translated: true,
        keywords: ['biorhythm', 'cycles', 'health trend', 'condition']
    },
    {
        id: 'life-expectancy',
        title: '기대 수명 테스트',
        description: '평소 생활 관념과 식습관, 운동 여부에 대한 설문을 통해 나의 예상 수명을 알아보고 더 건강한 삶을 위한 팁을 확인해 보세요.',
        path: '/life-expectancy',
        category: 'health',
        icon: Heart,
        color: 'bg-pink-500',
        translated: true,
        keywords: ['life expectancy', 'longevity', 'health quiz', 'lifestyle']
    },

    // Mini Games
    {
        id: 'reaction-test',
        title: '반응속도 테스트',
        description: '당신의 순발력은 얼마나 빠른가요? 화면 색상이 변하는 순간을 포착하여 밀리초(ms) 단위의 반응 속도를 정밀하게 측정하고 기록을 남기세요.',
        path: '/reaction-test',
        category: 'games',
        icon: Zap,
        color: 'bg-yellow-500',
        translated: true,
        keywords: ['반응속도', '순발력', '게임', 'reaction', 'test']
    },
    {
        id: 'typing-test',
        title: '타자 속도 테스트',
        description: '한글과 영어의 다양한 예문을 통해 나의 타자 속도(WPM)와 정확도를 측정하고, 실시간 피드백을 통해 타자 실력을 향상시키세요.',
        path: '/typing-test',
        category: 'games',
        icon: Keyboard,
        color: 'bg-indigo-500',
        translated: true,
        keywords: ['타자', '영타', '한타', 'wpm', 'typing', 'test', '한글', '영어']
    },
    {
        id: '1to50',
        title: '1 to 50',
        description: '1부터 50까지 숫자를 순서대로 최대한 빠르게 터치하는 뇌 활성화 게임입니다. 당신의 주변시와 집중력을 테스트해 보세요.',
        path: '/1to50',
        category: 'games',
        icon: Trophy,
        color: 'bg-amber-500',
        translated: true,
        keywords: ['1to50', 'reaction', 'focus', 'speed']
    },
    {
        id: 'cps-test',
        title: 'CPS 테스트 (클릭 속도)',
        description: '제한 시간 동안 마우스를 얼마나 많이 클릭할 수 있는지 측정하여 나의 초당 클릭 수(CPS)와 클릭 속도 순위를 확인하세요.',
        path: '/cps-test',
        category: 'games',
        icon: MousePointer2,
        color: 'bg-orange-500',
        translated: true,
        keywords: ['cps', 'click', 'speed', 'test']
    },
    {
        id: 'aim-trainer',
        title: '에임 연습 (Aim Trainer)',
        description: '화면에 무작위로 나타나는 타겟을 정확하게 클릭하여 에임 실력과 반응 속도를 기르세요. FPS 게이머를 위한 최적의 트레이닝 도구입니다.',
        path: '/aim-trainer',
        category: 'games',
        icon: Crosshair,
        color: 'bg-red-500',
        translated: true,
        keywords: ['aim', 'fps', 'training', 'mouse']
    },
    {
        id: 'number-memory',
        title: '숫자 기억력 테스트',
        description: '점점 길어지는 숫자 배열을 암기하여 자신의 단기 기억력 한계에 도전하세요. 원숭이 테스트로 알려진 기억력 측정 게임입니다.',
        path: '/number-memory',
        category: 'games',
        icon: Brain,
        color: 'bg-purple-500',
        translated: true,
        keywords: ['memory', 'number', 'brain', 'test']
    },
    {
        id: 'number-baseball',
        title: '숫자 야구',
        description: '힌트로 주어지는 스트라이크와 볼을 통해 숨겨진 3~4자리 숫자를 추리하여 맞추는 고전 로깅 게임입니다. 논리적 사고력을 발휘해 보세요.',
        path: '/number-baseball',
        category: 'games',
        icon: Target,
        color: 'bg-blue-500',
        translated: true,
        keywords: ['baseball', 'number', 'game', 'bulls', 'cows']
    },
    {
        id: 'minesweeper',
        title: '지뢰찾기',
        description: '숫자 힌트를 이용해 지뢰가 없는 안전한 칸을 모두 찾아내는 논리 퍼즐 게임입니다. 지뢰를 건드리지 않고 모든 구역을 점령해 보세요.',
        path: '/minesweeper',
        category: 'games',
        icon: Bomb,
        color: 'bg-gray-600',
        translated: true,
        keywords: ['minesweeper', 'mine', 'puzzle', 'game']
    },
    {
        id: 'roulette',
        title: '랜덤 룰렛',
        description: '점심 메뉴 선택부터 게임 벌칙 정하기까지, 직접 항목을 입력하고 화려하게 회전하는 랜덤 룰렛을 돌려 공정하게 결정하세요.',
        path: '/roulette',
        category: 'games',
        icon: Disc,
        color: 'bg-pink-500',
        translated: true,
        keywords: ['roulette', 'random', 'choice', 'game']
    },
    {
        id: 'suika-game',
        title: '수박 게임 (Suika Game)',
        description: '작은 과일들을 합쳐서 더 큰 과일로 만들어가는 중독성 강한 머지 퍼즐 게임입니다. 최종 목표인 거대한 수박을 완성해 보세요.',
        path: '/suika-game',
        category: 'games',
        icon: Gamepad2,
        color: 'bg-green-500',
        translated: true,
        keywords: ['수박게임', 'suika', '머지퍼즐']
    },
    {
        id: '2048',
        title: '2048',
        description: '숫자를 합쳐 2048을 만드는 전설적인 퍼즐 게임입니다. 큰 숫자를 향해 타일을 병합하며 최고 기록인 2048 타일에 도전해 보세요.',
        path: '/2048',
        category: 'games',
        icon: Trophy,
        color: 'bg-yellow-500',
        translated: true,
        keywords: ['2048', 'puzzle', 'game', 'number', '퍼즐']
    },
    {
        id: 'ladder-game',
        title: '사다리 타기',
        description: '참여자들의 운명을 가르는 스릴 넘치는 사다리 타기 게임입니다. 복잡하게 얽힌 길을 따라 행운과 불운의 결과를 확인하세요.',
        path: '/ladder-game',
        category: 'games',
        icon: GitCommit,
        color: 'bg-indigo-400',
        translated: true,
        keywords: ['ladder', 'random', 'game', 'bet']
    },
    {
        id: 'tanghulu-maker',
        title: '탕후루 만들기',
        description: '신선한 딸기, 샤인머스캣 등 과일을 꼬치에 꽂고 달콤한 설탕 시럽을 입혀 나만의 맛있는 탕후루를 가상으로 만들어 보세요.',
        path: '/tanghulu-maker',
        category: 'games',
        icon: Utensils,
        color: 'bg-rose-500',
        translated: true,
        keywords: ['tanghulu', 'game', 'stack', '탕후루', '게임']
    },
    {
        id: 'missile-dodge',
        title: '미사일 피하기',
        description: '사방에서 날아오는 미사일을 요리조리 피하며 최대한 오래 살아남으세요. 당신의 세밀한 컨트롤 실력을 생존 시간으로 증명하세요!',
        path: '/missile-dodge',
        category: 'games',
        icon: Gamepad2,
        color: 'bg-slate-700',
        translated: true,
        keywords: ['missile', 'dodge', 'game', 'avoid', '미사일', '피하기']
    },
    {
        id: 'flappy-bird',
        title: '플래피 버드',
        description: '수직 통로 사이를 아슬아슬하게 통과하며 새의 고도를 조절하세요. 단순하지만 높은 집중력을 요구하는 중독성 만점의 아케이드 게임입니다.',
        path: '/flappy-bird',
        category: 'games',
        icon: Bird,
        color: 'bg-yellow-600',
        translated: true,
        keywords: ['flappy', 'bird', 'game', '파닥파닥', '플래피버드']
    },
    {
        id: 'snake-game',
        title: '스네이크 게임',
        description: '사과를 먹을수록 길어지는 뱀을 조절하여 자신의 몸이나 벽에 부딪히지 않고 최고 점수에 도전하는 고전 명작 게임입니다.',
        path: '/snake-game',
        category: 'games',
        icon: Activity,
        color: 'bg-green-700',
        translated: true,
        keywords: ['snake', '뱀게임', '고전게임']
    },
    {
        id: 'sudoku',
        title: '스도쿠',
        description: '9x9 격자판의 가로, 세로, 3x3 구역에 1부터 9까지의 숫자가 중복 없이 들어가도록 채우는 정통 숫자 논리 퍼즐입니다.',
        path: '/sudoku',
        category: 'games',
        icon: Grid3X3,
        color: 'bg-blue-800',
        translated: true,
        keywords: ['스도쿠', 'sudoku', '퍼즐']
    },
    {
        id: 'tower-stacker',
        title: '타워 쌓기 (Tower Stacker)',
        description: '흔들리는 블록을 한 단씩 정확한 타이밍에 쌓아 올려 거대한 탑을 만드세요. 균형을 유지하는 것이 높은 점수의 핵심입니다.',
        path: '/tower-stacker',
        category: 'games',
        icon: Layers,
        color: 'bg-orange-600',
        translated: true,
        keywords: ['tower', 'stack', 'balancing']
    },
    {
        id: 'dice-roller',
        title: '주사위 굴리기',
        description: '보드 게임이나 내기 직전에 주사위가 없다면 이용하세요. 한 번에 여러 개의 주사위를 굴려 공정한 난수 결과를 얻을 수 있습니다.',
        path: '/dice-roller',
        category: 'games',
        icon: Dices,
        color: 'bg-indigo-500',
        translated: true,
        keywords: ['주사위', 'dice', 'random']
    },
    {
        id: 'time-sense',
        title: '시간 감각 테스트',
        description: '당신의 정확한 시간 감각은 어느 정도인가요? 눈을 감고 정확히 10초를 맞추는 스릴 넘치는 테스트로 시간 감각을 측정해 보세요.',
        path: '/time-sense',
        category: 'games',
        icon: Timer,
        color: 'bg-teal-500',
        translated: true,
        keywords: ['시간감각', '10초맞추기', 'test']
    },
    {
        id: 'pitch-test',
        title: '절대음감 테스트',
        description: '무작위로 연주되는 음계를 듣고 정답을 맞추는 절대음감 테스트입니다. 평소 당신의 음악적 재능과 음감을 객관적으로 확인해 보세요.',
        path: '/pitch-test',
        category: 'games',
        icon: Music,
        color: 'bg-indigo-600',
        translated: true,
        keywords: ['절대음감', '음감', '테스트']
    },
    {
        id: 'capital-quiz',
        title: '세계 수도 퀴즈',
        description: '세계 각국의 나라와 수도 매칭 퀴즈입니다. 대륙별로 다양한 수도 문제를 풀며 상식과 지리 지식을 한 단계 높일 수 있습니다.',
        path: '/capital-quiz',
        category: 'games',
        icon: Globe,
        color: 'bg-blue-600',
        translated: true,
        keywords: ['수도', '퀴즈', '상식', 'geography']
    },
    {
        id: 'typing-defense',
        title: '산성비 (타자 디펜스)',
        description: '하늘에서 떨어지는 단어들을 땅에 닿기 전에 신속하게 타자로 입력하여 도시를 방어하세요. 재미와 타자 실력 향상을 동시에 잡을 수 있습니다.',
        path: '/typing-defense',
        category: 'games',
        icon: Keyboard,
        color: 'bg-rose-500',
        translated: true,
        keywords: ['타자연습', '산성비', '디펜스']
    },
    {
        id: 'hangman',
        title: '행맨',
        description: '숨겨진 단어를 한 알파벳씩 추측하여 맞추는 정통 영단어 퀴즈입니다. 힌트를 활용해 행맨이 완성되기 전에 정답을 찾아내세요.',
        path: '/hangman',
        category: 'games',
        icon: HelpCircle,
        color: 'bg-gray-600',
        translated: true,
        keywords: ['hangman', '행맨', '단어맞추기']
    },
    {
        id: 'speed-math',
        title: '암산 게임',
        description: '제한 시간 내에 연속되는 사칙연산 문제를 풀어보세요. 빠른 판단력과 계산력을 요구하는 암산 게임으로 뇌를 활성화시켜 보세요.',
        path: '/speed-math',
        category: 'games',
        icon: Zap,
        color: 'bg-yellow-600',
        translated: true,
        keywords: ['암산', '수학', '두뇌훈련']
    },
    {
        id: 'bubble-wrap',
        title: '뾱뾱이 터뜨리기',
        description: '스트레스가 쌓였을 때 뾱뾱이를 무한으로 터뜨리며 힐링하세요. 기분 좋은 소리와 손맛이 당신의 지친 마음을 위로해 드립니다.',
        path: '/bubble-wrap',
        category: 'games',
        icon: Disc,
        color: 'bg-blue-400',
        translated: true,
        keywords: ['뾱뾱이', '스트레스해소', '힐링게임']
    },
    {
        id: 'dynamic-acuity',
        title: '동체시력 테스트',
        description: '빠르게 움직이는 물체 속의 문자를 맞추거나 지점을 클릭하여 동체시력을 측정하세요. 운동능력과 시각적 반응 속도 향상에 도움을 줍니다.',
        path: '/dynamic-acuity',
        category: 'games',
        icon: Eye,
        color: 'bg-indigo-500',
        translated: true,
        keywords: ['동체시력', '시력테스트', '순발력']
    },

    // Fun/Fortune
    {
        id: 'lotto',
        title: '로또 번호 생성기',
        description: '오늘의 행운 숫자를 정교한 난수 생성 알고리즘으로 추출하세요. 역대 당첨 번호 분석 통계와 함께 나만의 행운 번호를 조합해 드립니다.',
        path: '/lotto',
        category: 'fun',
        icon: Sparkles,
        color: 'bg-yellow-500',
        translated: true,
        keywords: ['로또', '행운번호', '추첨']
    },
    {
        id: 'lotto-sim',
        title: '로또 시뮬레이터',
        description: '내가 로또를 계속 샀을 때의 가상 수익률과 당첨 확률을 확인하세요. 재미로 보는 로또 구매 시뮬레이션으로 당첨의 꿈을 체감해 보세요.',
        path: '/lotto-sim',
        category: 'fun',
        icon: TrendingUp,
        color: 'bg-green-500',
        keywords: ['로또시뮬레이터', '수익률', '로또연습']
    },
    {
        id: 'tarot',
        title: '오늘의 타로 운세',
        description: '22장의 메이저 아르카나 타로 카드로 당신의 오늘 운세, 연애운, 직업운 등을 점쳐보세요. 신비로운 카드 해석이 당신의 하루를 안내합니다.',
        path: '/tarot',
        category: 'fun',
        icon: Moon,
        color: 'bg-purple-600',
        keywords: ['타로카드', '타로점', '오늘의운세']
    },
    {
        id: 'blood-type',
        title: '혈액형 성격',
        description: 'A, B, O, AB 각 혈액형별 특징과 성격, 연애 스타일을 확인해 보세요. 친구나 연인과의 혈액형 궁합도 재미로 알아볼 수 있습니다.',
        path: '/blood-type',
        category: 'fun',
        icon: Heart,
        color: 'bg-pink-600',
        keywords: ['혈액형', 'personality']
    },
    {
        id: 'mbti',
        title: 'MBTI 테스트',
        description: '정밀하게 설계된 질문지를 통해 자신의 성격 유형을 파악하세요. 16가지 성격 유형별 특징과 타인과의 조화로운 관계를 위한 팁을 제공합니다.',
        path: '/mbti',
        category: 'fun',
        icon: Brain,
        color: 'bg-pink-700',
        keywords: ['mbti', 'personality', 'test']
    },
    {
        id: 'saju',
        title: '만세력/사주',
        description: '생년월일시 정보를 바탕으로 당신의 타고난 운명과 사주팔자, 만세력을 확인하세요. 전통 명리학을 기반으로 한 상세한 풀이를 제공합니다.',
        path: '/saju',
        category: 'fun',
        icon: Scroll,
        color: 'bg-pink-800',
        keywords: ['사주', '만세력', 'fortune']
    },
    {
        id: 'zodiac-fortune',
        title: '띠별 운세',
        description: '오늘 나의 띠에 따른 금전운, 연애운, 건강운을 확인하세요. 12지신 전통 운세를 통해 하루를 더 활기차게 계획할 수 있습니다.',
        path: '/zodiac-fortune',
        category: 'fun',
        icon: Star,
        color: 'bg-purple-700',
        keywords: ['띠', '운세', 'zodiac']
    },
    {
        id: 'horoscope',
        title: '별자리 운세',
        description: '오늘의 별자리 운세를 확인하고 행운의 색상과 숫자를 알아보세요. 우주의 기운이 당신에게 전하는 메시지를 매일 아침 전해드립니다.',
        path: '/horoscope',
        category: 'fun',
        icon: Moon,
        color: 'bg-indigo-600',
        keywords: ['별자리', '운세', 'horoscope']
    },
    {
        id: 'dream-interpretation',
        title: '꿈해몽',
        description: '지난밤 꿈의 의미가 궁금하신가요? 키워드 검색을 통해 꿈속에 숨겨진 길흉화복과 심리적 상태를 명쾌하게 해석해 드립니다.',
        path: '/dream-interpretation',
        category: 'fun',
        icon: CloudRain,
        color: 'bg-indigo-500',
        keywords: ['꿈', '해몽', 'dream']
    },
    {
        id: 'birth-gen',
        title: '우주 탄생석/꽃 탄생일',
        description: '당신의 생일에 어울리는 탄생석과 탄생화, 그리고 그 안에 담긴 의미와 꽃말을 찾아보세요. 특별한 날을 더 의미 있게 만들어 드립니다.',
        path: '/birth-gen',
        category: 'fun',
        icon: Gift,
        color: 'bg-rose-400',
        keywords: ['탄생일', '탄생석', '탄생화']
    },
    {
        id: 'name-analysis',
        title: '이름 풀이 (작명)',
        description: '이름에 담긴 한자의 의미와 수리 오행을 분석하여 당신의 이름 운세를 풀이합니다. 좋은 이름이 가져다주는 기운을 확인해 보세요.',
        path: '/name-analysis',
        category: 'fun',
        icon: FileText,
        color: 'bg-indigo-400',
        keywords: ['이름풀이', '성명학', '이름해석']
    },
    {
        id: 'personal-color',
        title: '색채 심리 테스트',
        description: '나에게 어울리는 색상과 그 의미를 분석합니다.',
        path: '/personal-color',
        category: 'fun',
        icon: Palette,
        color: 'bg-fuchsia-500',
        keywords: ['퍼스널컬러', '색채심리', '테스트']
    },
    {
        id: 'past-life',
        title: '전생 알아보기',
        description: '당신은 전생에 어떤 사람이었을까요?',
        path: '/past-life',
        category: 'fun',
        icon: Clock,
        color: 'bg-amber-800',
        keywords: ['전생', '환생', '심리테스트']
    },
    {
        id: 'pet-mbti',
        title: '반려동물 MBTI',
        description: '우리 강아지, 고양이의 성격을 MBTI로 분석하세요.',
        path: '/pet-mbti',
        category: 'fun',
        icon: PawPrint,
        color: 'bg-orange-400',
        keywords: ['반려동물', '강아지MBTI', '고양이MBTI']
    },
    {
        id: 'mental-age',
        title: '정신 연령 테스트',
        description: '나의 생각과 태도로 정신 연령을 측정합니다.',
        path: '/mental-age',
        category: 'fun',
        icon: User,
        color: 'bg-blue-400',
        translated: true,
        keywords: ['정신연령', '두뇌나이', '테스트']
    },
    {
        id: 'brain-structure',
        title: '뇌 구조 분석',
        description: '지금 당신의 머릿속에는 어떤 생각이 가득한가요?',
        path: '/brain-structure',
        category: 'fun',
        icon: Brain,
        color: 'bg-pink-300',
        translated: true,
        keywords: ['뇌구조', '심리상태', '생각']
    },
    {
        id: 'joseon-job',
        title: '조선시대 직업 테스트',
        description: '내가 조선시대에 태어났다면 어떤 직업이었을까요?',
        path: '/joseon-job',
        category: 'fun',
        icon: Scroll,
        color: 'bg-amber-600',
        keywords: ['조선시대', '전생직업', '역사테스트']
    },
    {
        id: 'if-i-am-god',
        title: '내가 신이라면?',
        description: '당신이 세상을 만든 신이라면 어떤 모습일까요?',
        path: '/if-i-am-god',
        category: 'fun',
        icon: Wind,
        color: 'bg-cyan-500',
        keywords: ['신테스트', '상상력', '심리']
    },
    {
        id: 'life-bgm',
        title: '내 인생의 BGM',
        description: '지금 이 순간 당신의 인생에 어울리는 배경음악은?',
        path: '/life-bgm',
        category: 'fun',
        icon: Music,
        color: 'bg-violet-500',
        keywords: ['인생곡', 'BGM', '음악심리']
    },
    {
        id: 'first-impression-color',
        title: '첫인상 색상 테스트',
        description: '타인에게 비쳐지는 나의 첫인상 색깔은?',
        path: '/first-impression-color',
        category: 'fun',
        icon: Palette,
        color: 'bg-lime-500',
        keywords: ['첫인상', '이미지', '색상']
    },
    {
        id: 'animal-face',
        title: '동물상 테스트',
        description: '나는 어떤 동물을 닮았을까요?',
        path: '/animal-face',
        category: 'fun',
        icon: Dog,
        color: 'bg-orange-600',
        translated: true,
        keywords: ['동물상', '강아지상', '고양이상']
    },
    {
        id: 'personal-scent',
        title: '나의 향기 테스트',
        description: '나의 분위기와 성격에 어울리는 향기를 찾아보세요.',
        path: '/personal-scent',
        category: 'fun',
        icon: Wind,
        color: 'bg-emerald-400',
        keywords: ['향기', '분위기', '심리테스트']
    },
    {
        id: 'ideal-type',
        title: '이상형 월드컵 (기본)',
        description: '내가 선호하는 스타일을 분석해 드립니다.',
        path: '/ideal-type',
        category: 'fun',
        icon: Heart,
        color: 'bg-red-500',
        translated: true,
        keywords: ['이상형', '연애심리', '월드컵']
    },
    {
        id: 'couple-compatibility',
        title: '커플 궁합',
        description: '우리 둘의 연애 스타일과 조화도는?',
        path: '/couple-compatibility',
        category: 'fun',
        icon: Heart,
        color: 'bg-rose-600',
        keywords: ['궁합', '커플', '연애']
    },
    {
        id: 'hidden-talent',
        title: '내 안의 숨은 재능',
        description: '아직 발견하지 못한 당신만의 특별한 능력을 확인하세요.',
        path: '/hidden-talent',
        category: 'fun',
        icon: Zap,
        color: 'bg-teal-500',
        keywords: ['재능', '능력', '잠재력']
    },
    {
        id: 'balance-game',
        title: '밸런스 게임',
        description: '최악의 선택지 중 하나를 고르는 짜릿한 게임',
        path: '/balance-game',
        category: 'fun',
        icon: Scale,
        color: 'bg-indigo-500',
        translated: true,
        keywords: ['밸런스게임', '심리', '선택']
    },
    {
        id: 'fortune-cookie',
        title: '포춘 쿠키',
        description: '오늘 당신에게 전하는 짧고 강렬한 한마디',
        path: '/fortune-cookie',
        category: 'fun',
        icon: Cookie,
        color: 'bg-amber-500',
        keywords: ['포춘쿠키', '명언', '조언']
    },
    {
        id: 'color-test',
        title: '색채 예민도 테스트',
        description: '섬세한 색상 차이를 구별할 수 있나요?',
        path: '/color-test',
        category: 'fun',
        icon: Palette,
        color: 'bg-gradient-to-r from-red-400 via-green-400 to-blue-400',
        translated: true,
        keywords: ['색감', '예민도', '시각테스트']
    },
    {
        id: 'hearing-test',
        title: '청력 나이 테스트',
        description: '가청 주파수를 측정해 청력 나이를 알아보세요.',
        path: '/hearing-test',
        category: 'fun',
        icon: Ear,
        color: 'bg-cyan-600',
        translated: true,
        keywords: ['청력나이', '귀테스트', '청력']
    },
    {
        id: 'smile-dating-test',
        title: '스마일 연애 테스트',
        description: '나의 연애 스타일은 어떤 스마일일까요?',
        path: '/smile-dating-test',
        category: 'fun',
        icon: Smile,
        color: 'bg-yellow-400',
        keywords: ['연애심리', '스마일테스트', '데이트']
    },
    {
        id: 'dating-test',
        title: '연애 성향 검사',
        description: '나의 연애 스타일과 가치관을 분석합니다.',
        path: '/dating-test',
        category: 'fun',
        icon: Heart,
        color: 'bg-red-400',
        keywords: ['연애성향', '사랑', '심리']
    },
    {
        id: 'stress-test',
        title: '스트레스 지수 측정',
        description: '현재 당신의 마음은 얼마나 힘든가요?',
        path: '/stress-test',
        category: 'fun',
        icon: CloudRain,
        color: 'bg-slate-500',
        keywords: ['스트레스', '심리상태', '상담']
    },
    {
        id: 'brain-type',
        title: '좌뇌 우뇌 테스트',
        description: '어느 쪽 뇌를 더 많이 사용하는지 확인하세요.',
        path: '/brain-type',
        category: 'fun',
        icon: Brain,
        color: 'bg-indigo-700',
        translated: true,
        keywords: ['좌뇌우뇌', '두뇌테스트', '심리']
    },
    {
        id: 'eq-test',
        title: '감성 지수(EQ) 테스트',
        description: '공감 능력과 감성 지수를 분석합니다.',
        path: '/eq-test',
        category: 'fun',
        icon: Heart,
        color: 'bg-pink-400',
        keywords: ['EQ', '감성지수', '심리테스트']
    },
    {
        id: 'smartphone-addiction',
        title: '스마트폰 중독 테스트',
        description: '나의 스마트폰 의존도를 측정해 보세요.',
        path: '/smartphone-addiction',
        category: 'fun',
        icon: Smartphone,
        color: 'bg-blue-800',
        keywords: ['중독테스트', '스마트폰', '디지털디톡스']
    },
    {
        id: 'kkondae-test',
        title: '꼰대 테스트 (정밀)',
        description: '평소 자신의 태도와 말투를 통해 꼰대 지수를 정밀하게 측정해 보세요. 익명이 보장되는 재미있는 테스트로 자신의 소통 방식을 점검하세요.',
        path: '/kkondae-test',
        category: 'fun',
        icon: User,
        color: 'bg-stone-600',
        translated: true,
        keywords: ['꼰대', '심리테스트', '조직문화']
    },
    {
        id: 'hogu-test',
        title: '호구 성향 테스트',
        description: '거절을 잘 못하시나요? 당신의 착한 성격이 가끔은 \'호구\'처럼 이용되지는 않는지, 재미있는 질문을 통해 호구 지수를 확인해 보세요.',
        path: '/hogu-test',
        category: 'fun',
        icon: HelpingHand,
        color: 'bg-orange-300',
        translated: true,
        keywords: ['호구', '성격테스트', '인간관계']
    },
    {
        id: 'debate-test',
        title: '토론 능력 검사',
        description: '나의 논리와 언변 능력을 측정합니다.',
        path: '/debate-test',
        category: 'fun',
        icon: MessageSquare,
        color: 'bg-indigo-600',
        keywords: ['토론', '논리', '말잘하는법']
    },
    {
        id: 'idol-test',
        title: '아이돌 포지션 테스트',
        description: '내가 아이돌 그룹이라면 어떤 포지션일까요?',
        path: '/idol-test',
        category: 'fun',
        icon: Mic2,
        color: 'bg-fuchsia-600',
        keywords: ['아이돌', '데뷔', '적성테스트']
    },
    {
        id: 'resilience-test',
        title: '회복탄력성 검사',
        description: '어려움을 극복하는 나의 내면 에너지를 확인하세요.',
        path: '/resilience-test',
        category: 'fun',
        icon: Shield,
        color: 'bg-emerald-600',
        keywords: ['회복탄력성', '멘탈관리', '심리강화']
    },

    // Trivia
    {
        id: 'initial-sound-quiz',
        title: '초성 퀴즈',
        description: '제시된 초성을 보고 연상되는 단어를 제한 시간 내에 맞춰 보세요. 어휘력 향상과 두뇌 회전에 도움을 주는 재미있는 퀴즈 게임입니다.',
        path: '/initial-sound-quiz',
        category: 'trivia',
        icon: BookOpen,
        color: 'bg-yellow-400',
        keywords: ['초성', '퀴즈', 'trivia']
    },
    {
        id: 'food-quiz',
        title: '음식/맛집 퀴즈',
        description: '세상의 다양한 음식 사진이나 힌트를 보고 이름을 맞춰 보세요. 당신이 진정한 대식가이자 미식가인지 테스트할 수 있는 기회입니다.',
        path: '/food-quiz',
        category: 'trivia',
        icon: Utensils,
        color: 'bg-orange-500',
        keywords: ['음식', '퀴즈', '상식']
    },
    {
        id: 'association-quiz',
        title: '연상 퀴즈',
        description: '주어진 여러 개의 단어들을 보고 공통적으로 떠오르는 정답을 맞추는 고도의 추리 퀴즈입니다. 당신의 상상력과 논리력을 펼쳐 보세요.',
        path: '/association-quiz',
        category: 'trivia',
        icon: Brain,
        color: 'bg-purple-500',
        keywords: ['연상퀴즈', '두뇌훈련', '상식']
    },
    {
        id: 'spelling-quiz',
        title: '맞춤법 퀴즈',
        description: '자주 틀리는 우리말 맞춤법과 띄어쓰기를 퀴즈로 풀어보세요. 올바른 표현법을 익히고 국어 실력을 한 단계 높일 수 있습니다.',
        path: '/spelling-quiz',
        category: 'trivia',
        icon: Edit,
        color: 'bg-blue-500',
        keywords: ['맞춤법', '우리말', '국어실력']
    },
    {
        id: 'vocabulary-test',
        title: '어휘력 테스트',
        description: '자주 쓰이는 단어부터 어려운 전문 용어까지, 당신의 어휘력 수준을 단계별로 테스트하고 상위 몇 퍼센트인지 등급으로 확인해 보세요.',
        path: '/vocabulary-test',
        category: 'trivia',
        icon: Palette,
        color: 'bg-indigo-500',
        keywords: ['어휘력', '언어능력', '테스트']
    },
    {
        id: 'simple-math',
        title: '기초 연상 퀴즈 (사칙연산)',
        description: '더하기, 빼기, 곱하기를 빠르게 풀어보세요.',
        path: '/simple-addition',
        category: 'trivia',
        icon: Plus,
        color: 'bg-green-500',
        keywords: ['연산', '퀴즈', '사칙연산']
    }
];
