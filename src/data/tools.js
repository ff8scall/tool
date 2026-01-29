
import {
    Calculator, Type, FileText, Code, Image, Palette, Clock, Globe,
    Lock, Hash, QrCode, List, Calendar, Search, Moon, Star, Wand2, Sparkles,
    CloudRain, Activity, Flame, Zap, Keyboard, Gamepad2, DollarSign,
    Heart, Brain, Scroll, Gift, PenTool, Timer, CheckSquare, Lightbulb,
    Binary, FileCode, Edit, GitCompare, Barcode, Youtube, ImageIcon,
    Ruler, Weight, FileDigit, Key, Thermometer, Link, Trophy, MousePointer2, Crosshair, Target, Bomb, Disc, GitCommit,
    ArrowLeftRight, FileJson, Droplet, Gauge, Percent, Divide, Dices, Utensils, Bird, Grid3X3, Layers, PawPrint, Wind, User, Mic, Scale, Cookie, Eye, Circle, Ear, Music, BookOpen, HelpCircle, Radio, Smile, Battery, Smartphone, Briefcase, HelpingHand, MessageSquare, Mic2, Shield, Dog
} from 'lucide-react';

export const toolCategories = {
    unit: '단위 변환',
    finance: '생활/금융',
    text: '텍스트',
    dev: '개발',
    utility: '유틸리티',
    health: '건강',
    games: '게임',
    fun: '운세/재미'
};

export const toolCategoryData = {
    unit: {
        title: '무료 온라인 단위 변환기 모음',
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
        title: '무료 온라인 미니 게임 모음',
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
    }
};

export const tools = [
    // Unit Converters
    {
        id: 'length',
        title: '무료 온라인 길이 변환기 | 미터, 피트, 인치 단위 계산',
        description: '다양한 길이 단위를 즉시 변환하세요. 미터(m), 피트(ft), 인치(in), 센티미터(cm) 등 모든 길이 단위를 지원하는 정확한 무료 온라인 변환 도구입니다.',
        path: '/length',
        category: 'unit',
        icon: Ruler,
        color: 'bg-sky-500',
        keywords: ['길이변환기', '단위변환', '미터피트변환', '인치센티미터', '무료온라인도구', 'length converter']
    },
    {
        id: 'weight',
        title: '무료 무게 변환기 | 킬로그램, 파운드, 온스 단위 계산',
        description: '킬로그램(kg), 파운드(lb), 온스(oz), 그람(g) 등 다양한 무게 단위를 실시간으로 변환하세요. 정확하고 간편한 무료 온라인 무게 변환 도구.',
        path: '/weight',
        category: 'unit',
        icon: Weight,
        color: 'bg-sky-600',
        keywords: ['무게변환기', '단위변환', '킬로그램파운드', '그램온스', '무료온라인도구', 'weight converter']
    },
    {
        id: 'currency',
        title: '실시간 환율 계산기 | 오늘 달러 엔화 유로 환율 변환',
        description: '전 세계 주요 통화의 실시간 환율을 확인하고 변환하세요. 달러(USD), 엔화(JPY), 유로(EUR) 등 최신 환율 정보를 기반으로 한 정확한 계산기.',
        path: '/currency',
        category: 'unit',
        icon: DollarSign,
        color: 'bg-sky-700',
        keywords: ['환율계산기', '오늘의환율', '달러환율', '엔화환율', '통화변환', '실시간환율', 'currency exchange']
    },
    {
        id: 'temperature-converter',
        title: '온도 변환기',
        description: '섭씨, 화씨, 켈빈 온도 변환',
        path: '/temperature-converter',
        category: 'unit',
        icon: Thermometer,
        color: 'bg-red-500',
        keywords: ['온도', '섭씨', '화씨', '켈빈', 'temperature', 'converter']
    },
    {
        id: 'lunch',
        title: '점심 메뉴 추천기',
        description: '오늘 뭐 먹지? 점심 메뉴 랜덤 추천',
        path: '/lunch',
        category: 'fun',
        icon: Utensils,
        color: 'bg-orange-500',
        keywords: ['점심', '메뉴', '추천', '랜덤', 'lunch', 'food']
    },

    // Health
    {
        id: 'bmi',
        title: '무료 BMI 계산기 | 비만도 측정 및 체질량 지수 확인',
        description: '나의 비만도는 얼마일까? 키와 몸무게만 입력하여 정확한 BMI(체질량 지수)를 측정하고 건강 상태를 확인하세요. WHO 기준 표준 체중 가이드 제공.',
        path: '/bmi',
        category: 'health',
        icon: Activity,
        color: 'bg-green-500',
        keywords: ['bmi계산기', '비만도측정', '체질량지수', '건강관리', '다이어트계산기', '무료검사', 'health calculator']
    },
    {
        id: 'bmr',
        title: 'BMR 계산기',
        description: '기초대사량 및 하루 권장 칼로리 계산',
        path: '/bmr',
        category: 'health',
        icon: Flame,
        color: 'bg-orange-500',
        keywords: ['bmr', '기초대사량', '칼로리', 'tdee', 'diet']
    },

    // Games
    {
        id: 'reaction-test',
        title: '반응속도 테스트',
        description: '나의 순발력은 몇 ms? 반응속도 측정 게임',
        path: '/reaction-test',
        category: 'games',
        icon: Zap,
        color: 'bg-yellow-500',
        keywords: ['반응속도', '순발력', '게임', 'reaction', 'test']
    },
    {
        id: 'typing-test',
        title: '타자 속도 테스트',
        description: '한글/영어 타자 속도(WPM)와 정확도 측정',
        path: '/typing-test',
        category: 'games',
        icon: Keyboard,
        color: 'bg-indigo-500',
        keywords: ['타자', '영타', '한타', 'wpm', 'typing', 'test', '한글', '영어']
    },
    {
        id: 'one-to-fifty',
        title: '1 to 50',
        description: '1부터 50까지 빠르게 터치하기',
        path: '/1to50',
        category: 'games',
        icon: Trophy,
        color: 'bg-yellow-500',
        keywords: ['1to50', 'game', 'speed', 'touch']
    },
    {
        id: 'cps-test',
        title: 'CPS 테스트',
        description: '초당 마우스 클릭 속도 측정',
        path: '/cps-test',
        category: 'games',
        icon: MousePointer2,
        color: 'bg-blue-500',
        keywords: ['cps', 'click', 'speed', 'test']
    },
    {
        id: 'aim-trainer',
        title: '에임 트레이너',
        description: '마우스 정확도 및 반응속도 훈련',
        path: '/aim-trainer',
        category: 'games',
        icon: Crosshair,
        color: 'bg-red-500',
        keywords: ['aim', 'fps', 'training', 'mouse']
    },
    {
        id: 'number-memory',
        title: '숫자 기억하기',
        description: '순간 기억력 테스트 (침팬지 테스트)',
        path: '/number-memory',
        category: 'games',
        icon: Brain,
        color: 'bg-pink-500',
        keywords: ['memory', 'number', 'brain', 'test']
    },
    {
        id: 'number-baseball',
        title: '숫자 야구',
        description: '숫자와 위치를 맞추는 추리 게임',
        path: '/number-baseball',
        category: 'games',
        icon: Target,
        color: 'bg-green-500',
        keywords: ['baseball', 'number', 'game', 'bulls', 'cows']
    },
    {
        id: 'minesweeper',
        title: '지뢰찾기',
        description: '지뢰를 피해 모든 칸을 여는 퍼즐',
        path: '/minesweeper',
        category: 'games',
        icon: Bomb,
        color: 'bg-gray-600',
        keywords: ['minesweeper', 'mine', 'puzzle', 'game']
    },
    {
        id: 'roulette',
        title: '돌림판 돌리기',
        description: '랜덤 추첨을 위한 룰렛 게임',
        path: '/roulette',
        category: 'games',
        icon: Disc,
        color: 'bg-purple-500',
        keywords: ['roulette', 'random', 'choice', 'game']
    },
    {
        id: 'suika-game',
        title: '수박 게임 (Suika Game) | 무료 온라인 머지 퍼즐 게임',
        description: '중독성 강한 수박 게임을 온라인에서 무료로 즐기세요! 과일을 합쳐서 가장 큰 수박을 만드는 머지 퍼즐 게임. 높은 점수에 도전하고 친구들과 공유하세요.',
        path: '/suika-game',
        category: 'games',
        icon: Gamepad2,
        color: 'bg-green-500',
        keywords: ['수박게임', 'suikagame', '머지퍼즐', '과일합치기', '무료게임', '중독성게임', '정식버전']
    },
    {
        id: '2048',
        title: '2048',
        description: '숫자를 합쳐 2048을 만드는 레전드 퍼즐',
        path: '/2048',
        category: 'games',
        icon: Trophy,
        color: 'bg-yellow-500',
        keywords: ['2048', 'puzzle', 'game', 'number', '퍼즐']
    },
    {
        id: 'ladder-game',
        title: '사다리 타기',
        description: '내기할 때 좋은 사다리 게임',
        path: '/ladder-game',
        category: 'games',
        icon: GitCommit,
        color: 'bg-green-600',
        keywords: ['ladder', 'random', 'game', 'bet']
    },
    {
        id: 'tanghulu-maker',
        title: '탕후루 만들기',
        description: '과일을 쌓아 나만의 탕후루 만들기',
        path: '/tanghulu-maker',
        category: 'games',
        icon: Utensils,
        color: 'bg-red-500',
        keywords: ['tanghulu', 'game', 'stack', '탕후루', '게임']
    },
    {
        id: 'missile-dodge',
        title: '미사일 피하기',
        description: '날아오는 미사일을 피해서 살아남으세요!',
        path: '/missile-dodge',
        category: 'games',
        icon: Gamepad2,
        color: 'bg-gray-700',
        keywords: ['missile', 'dodge', 'game', 'avoid', '미사일', '피하기']
    },
    {
        id: 'flappy-bird',
        title: '파닥파닥 버드',
        description: '장애물을 피해 최대한 멀리 날아가세요!',
        path: '/flappy-bird',
        category: 'games',
        icon: Bird,
        color: 'bg-sky-400',
        keywords: ['flappy', 'bird', 'game', '파닥파닥', '플래피버드']
    },

    // Finance/Life
    {
        id: 'lunch-recommender',
        title: '점심 메뉴 추천',
        description: '오늘 뭐 먹지? 결정 장애를 위한 점심 메뉴 랜덤 추천기',
        path: '/lunch-recommender',
        category: 'finance', // Grouping with Life/Finance as it fits 'Life'
        icon: Utensils,
        color: 'bg-orange-500',
        keywords: ['점심', '메뉴', '추천', 'lunch', 'food', 'random']
    },
    {
        id: 'loan',
        title: '대출금 계산기',
        description: '원리금 균등상환 방식의 대출 이자 계산',
        path: '/loan',
        category: 'finance',
        icon: Calculator,
        color: 'bg-blue-500',
        keywords: ['대출', '이자', '원리금', '상환', 'loan']
    },
    {
        id: 'salary',
        title: '연봉 실수령액',
        description: '4대 보험과 세금을 제외한 실수령액 계산',
        path: '/salary-calc',
        category: 'finance',
        icon: DollarSign,
        color: 'bg-green-600',
        keywords: ['연봉', '실수령액', '세금', '4대보험', 'salary']
    },
    {
        id: 'severance',
        title: '퇴직금 계산기',
        description: '입사일과 퇴사일로 예상 퇴직금 계산',
        path: '/severance-calc',
        category: 'finance',
        icon: Calculator,
        color: 'bg-emerald-600',
        keywords: ['퇴직금', '퇴직', '예상퇴직금', 'severance']
    },
    {
        id: 'minimum-wage',
        title: '최저임금 계산기',
        description: '2024/2025년 최저임금 확인 및 계산',
        path: '/minimum-wage',
        category: 'finance',
        icon: DollarSign,
        color: 'bg-teal-600',
        keywords: ['최저임금', '최저시급', '2025', 'minimum wage']
    },
    {
        id: 'compound-interest',
        title: '복리 계산기',
        description: '복리 이자 및 투자 수익 계산',
        path: '/compound-interest',
        category: 'finance',
        icon: Calculator,
        color: 'bg-blue-600',
        keywords: ['복리', '이자', '투자', '수익', 'compound', 'interest']
    },
    {
        id: 'work-hours',
        title: '근무시간 계산기',
        description: '근무 시간 및 급여 계산',
        path: '/work-hours',
        category: 'finance',
        icon: Clock,
        color: 'bg-blue-700',
        keywords: ['근무시간', '급여', '시급', 'work', 'hours']
    },
    {
        id: 'age-calc',
        title: '나이 계산기',
        description: '만 나이, 연 나이 계산',
        path: '/age-calc',
        category: 'finance',
        icon: Calendar,
        color: 'bg-cyan-600',
        keywords: ['나이', '만나이', '연나이', 'age', 'calculator']
    },
    {
        id: 'date',
        title: '날짜 계산기',
        description: '날짜 차이 및 D-day 계산',
        path: '/date',
        category: 'finance',
        icon: Calendar,
        color: 'bg-cyan-500',
        keywords: ['날짜', 'dday', '디데이', 'date', 'calculator']
    },

    // Text Tools
    {
        id: 'word-count',
        title: '글자 수 세기',
        description: '글자, 단어, 문장 수 계산',
        path: '/word-count',
        category: 'text',
        icon: FileText,
        color: 'bg-violet-500',
        keywords: ['글자수', '단어수', 'word', 'count', 'character']
    },
    {
        id: 'unicode',
        title: '유니코드 변환기',
        description: '텍스트와 유니코드 상호 변환',
        path: '/unicode',
        category: 'text',
        icon: Code,
        color: 'bg-violet-600',
        keywords: ['유니코드', 'unicode', 'converter', 'text']
    },
    {
        id: 'string-converter',
        title: '문자열 변환기',
        description: '대소문자, 카멜케이스 등 변환',
        path: '/string-converter',
        category: 'text',
        icon: Type,
        color: 'bg-violet-700',
        keywords: ['문자열', 'string', 'case', 'converter']
    },
    {
        id: 'base64',
        title: 'Base64 도구',
        description: 'Base64 인코딩 및 디코딩',
        path: '/base64',
        category: 'text',
        icon: FileDigit,
        color: 'bg-purple-600',
        keywords: ['base64', 'encode', 'decode', 'text']
    },
    {
        id: 'html-encoder',
        title: 'HTML 인코더',
        description: 'HTML 엔티티 인코딩/디코딩',
        path: '/html-encoder',
        category: 'text',
        icon: Code,
        color: 'bg-purple-700',
        keywords: ['html', 'encoder', 'entity', 'escape']
    },

    // Dev Tools
    {
        id: 'base-converter',
        title: '진법 변환기',
        description: '2진수, 8진수, 10진수, 16진수 변환',
        path: '/base-converter',
        category: 'dev',
        icon: Binary,
        color: 'bg-green-600',
        keywords: ['진법', 'binary', 'hex', 'decimal']
    },
    {
        id: 'json-formatter',
        title: 'JSON 포맷터',
        description: 'JSON 데이터 정리 및 검증',
        path: '/json-formatter',
        category: 'dev',
        icon: FileCode,
        color: 'bg-green-700',
        keywords: ['json', 'formatter', 'validator']
    },
    {
        id: 'markdown-editor',
        title: '마크다운 에디터',
        description: '실시간 미리보기 마크다운 편집기',
        path: '/markdown-editor',
        category: 'dev',
        icon: FileText,
        color: 'bg-emerald-600',
        keywords: ['markdown', 'editor', 'preview']
    },
    {
        id: 'html-view',
        title: 'HTML 포맷터',
        description: 'HTML 코드 정리 및 미리보기',
        path: '/html-view',
        category: 'dev',
        icon: FileCode,
        color: 'bg-emerald-500',
        keywords: ['html', 'formatter', 'preview']
    },
    {
        id: 'diff',
        title: '코드 비교',
        description: '두 텍스트/코드의 차이점 비교',
        path: '/diff',
        category: 'dev',
        icon: GitCompare,
        color: 'bg-lime-600',
        keywords: ['diff', 'compare', 'code']
    },
    {
        id: 'web-editor',
        title: '웹 에디터',
        description: 'HTML/CSS/JS 실시간 편집 및 미리보기',
        path: '/web-editor',
        category: 'dev',
        icon: Edit,
        color: 'bg-teal-500',
        keywords: ['web', 'editor', 'html', 'css', 'javascript']
    },
    {
        id: 'hash-gen',
        title: '해시 생성기',
        description: 'MD5, SHA-1, SHA-256 등 해시 생성',
        path: '/hash-gen',
        category: 'dev',
        icon: Hash,
        color: 'bg-teal-600',
        keywords: ['hash', 'md5', 'sha', 'generator']
    },
    {
        id: 'uuid-gen',
        title: 'UUID 생성기',
        description: 'UUID v4 생성',
        path: '/uuid-gen',
        category: 'dev',
        icon: Key,
        color: 'bg-teal-700',
        keywords: ['uuid', 'guid', 'generator', 'unique']
    },
    {
        id: 'url-encoder',
        title: 'URL 인코더/디코더',
        description: 'URL 인코딩 및 디코딩',
        path: '/url-encoder',
        category: 'dev',
        icon: Link,
        color: 'bg-blue-500',
        keywords: ['url', 'encoder', 'decoder', 'encode', 'decode']
    },
    {
        id: 'jwt-decoder',
        title: 'JWT 디코더',
        description: 'JWT 토큰 디코딩 및 확인',
        path: '/jwt-decoder',
        category: 'dev',
        icon: Key,
        color: 'bg-yellow-500',
        keywords: ['jwt', 'decoder', 'token', 'json', 'web']
    },
    {
        id: 'regex-tester',
        title: '정규식 테스터',
        description: '정규표현식 테스트 및 검증',
        path: '/regex-tester',
        category: 'dev',
        icon: Search,
        color: 'bg-purple-500',
        keywords: ['regex', 'regular', 'expression', 'tester']
    },
    {
        id: 'ascii-art',
        title: '아스키아트',
        description: '텍스트를 아스키 아트로 변환',
        path: '/ascii-art',
        category: 'dev',
        icon: Type,
        color: 'bg-green-800',
        keywords: ['ascii', 'art', 'text']
    },
    {
        id: 'ascii-table',
        title: '아스키 코드표',
        description: 'ASCII 코드 참조표',
        path: '/ascii-table',
        category: 'dev',
        icon: FileCode,
        color: 'bg-lime-800',
        keywords: ['ascii', 'table', 'code']
    },
    {
        id: 'special-char',
        title: '특수문자표',
        description: '자주 쓰는 특수문자 모음',
        path: '/special-char',
        category: 'dev',
        icon: Hash,
        color: 'bg-emerald-800',
        keywords: ['special', 'character', 'symbol']
    },
    {
        id: 'cron-generator',
        title: 'CRON 표현식 생성기',
        description: 'CRON 스케줄링 표현식 생성',
        path: '/cron-generator',
        category: 'dev',
        icon: Clock,
        color: 'bg-blue-600',
        keywords: ['cron', 'schedule', 'expression', 'generator', '스케줄']
    },
    {
        id: 'csv-json',
        title: 'CSV ↔ JSON 변환기',
        description: 'CSV와 JSON 상호 변환',
        path: '/csv-json',
        category: 'dev',
        icon: ArrowLeftRight,
        color: 'bg-purple-600',
        keywords: ['csv', 'json', 'converter', '변환', 'data']
    },

    // Utility
    {
        id: 'qr-gen',
        title: 'QR코드 생성기',
        description: 'URL이나 텍스트를 QR코드로 변환',
        path: '/qr-gen',
        category: 'utility',
        icon: QrCode,
        color: 'bg-orange-500',
        keywords: ['qr', 'code', 'generator']
    },
    {
        id: 'barcode-gen',
        title: '바코드 생성기',
        description: '숫자를 바코드로 변환',
        path: '/barcode-gen',
        category: 'utility',
        icon: Barcode,
        color: 'bg-orange-600',
        keywords: ['barcode', 'generator']
    },
    {
        id: 'password-gen',
        title: '비밀번호 생성기',
        description: '안전한 랜덤 비밀번호 생성',
        path: '/password-gen',
        category: 'utility',
        icon: Lock,
        color: 'bg-red-600',
        keywords: ['password', 'generator', 'random']
    },
    {
        id: 'color-picker',
        title: '색상표',
        description: '컬러 피커 및 색상 코드 변환',
        path: '/color-picker',
        category: 'utility',
        icon: Palette,
        color: 'bg-amber-600',
        keywords: ['color', 'picker', 'hex', 'rgb']
    },
    {
        id: 'image-base64',
        title: '이미지 Base64',
        description: '이미지를 Base64로 인코딩',
        path: '/image-base64',
        category: 'utility',
        icon: Lightbulb,
        color: 'bg-yellow-700',
        keywords: ['image', 'base64', 'encode']
    },
    {
        id: 'ip-address',
        title: 'IP 주소 확인',
        description: '내 IP 주소 및 위치 정보 확인',
        path: '/ip-address',
        category: 'utility',
        icon: Globe,
        color: 'bg-orange-700',
        keywords: ['ip', 'address', 'location']
    },
    {
        id: 'timer',
        title: '타이머/스톱워치',
        description: '온라인 타이머 및 스톱워치',
        path: '/timer',
        category: 'utility',
        icon: Timer,
        color: 'bg-amber-700',
        keywords: ['timer', 'stopwatch', 'alarm']
    },
    {
        id: 'pomodoro-timer',
        title: '포모도로 타이머',
        description: '25분 집중/5분 휴식 타이머',
        path: '/pomodoro-timer',
        category: 'utility',
        icon: Timer,
        color: 'bg-red-500',
        keywords: ['pomodoro', 'timer', 'focus', 'study']
    },
    {
        id: 'checklist',
        title: '체크리스트',
        description: '간단한 할 일 목록',
        path: '/checklist',
        category: 'utility',
        icon: CheckSquare,
        color: 'bg-yellow-600',
        keywords: ['checklist', 'todo', 'task']
    },
    {
        id: 'flashlight',
        title: '손전등',
        description: '화면을 밝게 켜서 손전등으로 사용',
        path: '/flashlight',
        category: 'utility',
        icon: Zap,
        color: 'bg-amber-500',
        keywords: ['flashlight', 'light', 'torch']
    },
    {
        id: 'image-resize',
        title: '이미지 리사이즈',
        description: '이미지 크기 조절 및 압축',
        path: '/image-resize',
        category: 'utility',
        icon: ImageIcon,
        color: 'bg-orange-700',
        keywords: ['image', 'resize', 'compress']
    },
    {
        id: 'youtube-thumbnail',
        title: '유튜브 썸네일',
        description: '유튜브 영상 썸네일 다운로드',
        path: '/youtube-thumbnail',
        category: 'utility',
        icon: Youtube,
        color: 'bg-red-600',
        keywords: ['youtube', 'thumbnail', 'download']
    },

    // Fun/Fortune
    {
        id: 'blood-type',
        title: '혈액형 성격',
        description: '혈액형별 성격 분석',
        path: '/blood-type',
        category: 'fun',
        icon: Heart,
        color: 'bg-pink-600',
        keywords: ['혈액형', 'blood', 'type', 'personality']
    },
    {
        id: 'mbti-test',
        title: 'MBTI 테스트',
        description: '간단한 MBTI 성격 유형 검사',
        path: '/mbti',
        category: 'fun',
        icon: Brain,
        color: 'bg-pink-700',
        keywords: ['mbti', 'personality', 'test']
    },
    {
        id: 'saju',
        title: '무료 만세력',
        description: '생년월일로 사주팔자 확인',
        path: '/saju',
        category: 'fun',
        icon: Scroll,
        color: 'bg-pink-800',
        keywords: ['사주', 'saju', '만세력', 'fortune']
    },
    {
        id: 'zodiac-fortune',
        title: '띠별 운세',
        description: '12띠 오늘의 운세',
        path: '/zodiac-fortune',
        category: 'fun',
        icon: Star,
        color: 'bg-purple-700',
        keywords: ['띠', 'zodiac', 'fortune', '운세']
    },
    {
        id: 'horoscope',
        title: '별자리 운세',
        description: '12별자리 오늘의 운세',
        path: '/horoscope',
        category: 'fun',
        icon: Moon,
        color: 'bg-indigo-600',
        keywords: ['별자리', 'horoscope', 'fortune']
    },
    {
        id: 'dream-interpretation',
        title: '꿈해몽',
        description: '꿈 내용으로 해몽 검색',
        path: '/dream-interpretation',
        category: 'fun',
        icon: CloudRain,
        color: 'bg-indigo-500',
        keywords: ['꿈', 'dream', '해몽', 'interpretation']
    },
    {
        id: 'name-analysis',
        title: '성명학',
        description: '이름 획수로 운세 분석',
        path: '/name-analysis',
        category: 'fun',
        icon: PenTool,
        color: 'bg-indigo-600',
        keywords: ['이름', 'name', '성명학', 'fortune']
    },
    {
        id: 'biorhythm',
        title: '바이오리듬',
        description: '신체/감성/지성 리듬 확인',
        path: '/biorhythm',
        category: 'fun',
        icon: Activity,
        color: 'bg-green-600',
        keywords: ['바이오리듬', 'biorhythm', 'cycle']
    },
    {
        id: 'birth-gen',
        title: '탄생석/탄생화',
        description: '월별 탄생석과 탄생화 확인',
        path: '/birth-gen',
        category: 'fun',
        icon: Gift,
        color: 'bg-pink-500',
        keywords: ['탄생석', 'birthstone', '탄생화', 'flower']
    },
    {
        id: 'tarot',
        title: '타로 카드',
        description: '오늘의 타로 운세',
        path: '/tarot',
        category: 'fun',
        icon: Sparkles,
        color: 'bg-purple-600',
        keywords: ['타로', 'tarot', 'card', 'fortune']
    },
    {
        id: 'lotto',
        title: '로또 번호 생성기',
        description: '행운의 로또 번호 자동 생성',
        path: '/lotto',
        category: 'fun',
        icon: Sparkles,
        color: 'bg-yellow-500',
        keywords: ['로또', 'lotto', '번호', 'number', 'random']
    },
    {
        id: 'discount-calculator',
        title: '할인율 계산기',
        description: '원가와 할인율로 최종 가격 계산',
        path: '/discount-calculator',
        category: 'finance',
        icon: Calculator,
        color: 'bg-red-500',
        keywords: ['할인', '할인율', '세일', '가격계산', 'discount', 'sale']
    },
    {
        id: 'color-extractor',
        title: '색상 추출기',
        description: '이미지에서 컬러 팔레트 추출',
        path: '/color-extractor',
        category: 'utility',
        icon: Palette,
        color: 'bg-pink-500',
        keywords: ['색상', '팔레트', '이미지', 'color', 'palette', 'extractor']
    },
    {
        id: 'area-converter',
        title: '면적 변환기',
        description: '제곱미터, 평, 에이커 등 면적 단위 변환',
        path: '/area-converter',
        category: 'unit',
        icon: Ruler,
        color: 'bg-blue-600',
        keywords: ['면적', '평', '제곱미터', 'area', 'converter']
    },
    {
        id: 'volume-converter',
        title: '부피 변환기',
        description: '리터, 갤런, 세제곱미터 등 부피 단위 변환',
        path: '/volume-converter',
        category: 'unit',
        icon: Droplet,
        color: 'bg-cyan-600',
        keywords: ['부피', '리터', '갤런', 'volume', 'converter']
    },
    {
        id: 'speed-converter',
        title: '속도 변환기',
        description: 'km/h, mph, m/s 등 속도 단위 변환',
        path: '/speed-converter',
        category: 'unit',
        icon: Gauge,
        color: 'bg-orange-600',
        keywords: ['속도', 'kmh', 'mph', 'speed', 'converter']
    },
    {
        id: 'world-clock',
        title: '세계 시계',
        description: '전 세계 주요 도시의 현재 시간',
        path: '/world-clock',
        category: 'utility',
        icon: Globe,
        color: 'bg-indigo-600',
        keywords: ['세계시계', '시간', '시차', 'world', 'clock']
    },
    {
        id: 'percent-calculator',
        title: '퍼센트 계산기',
        description: '백분율, 증감률, 비율 계산',
        path: '/percent-calculator',
        category: 'finance',
        icon: Percent,
        color: 'bg-green-600',
        keywords: ['퍼센트', '백분율', '증감률', 'percent', 'calculator']
    },
    {
        id: 'fraction-calculator',
        title: '분수 계산기',
        description: '분수 사칙연산 및 기약분수 변환',
        path: '/fraction-calculator',
        category: 'dev',
        icon: Divide,
        color: 'bg-violet-600',
        keywords: ['분수', '기약분수', 'fraction', 'calculator']
    },
    {
        id: 'encryption-tool',
        title: '암호화/복호화',
        description: 'AES 알고리즘 기반 텍스트 암호화',
        path: '/encryption-tool',
        category: 'dev',
        icon: Lock,
        color: 'bg-red-600',
        keywords: ['암호화', '복호화', 'AES', 'encryption']
    },
    {
        id: 'dice-roller',
        title: '주사위 굴리기',
        description: 'D4, D6, D8, D10, D12, D20, D100 주사위',
        path: '/dice-roller',
        category: 'games',
        icon: Dices,
        color: 'bg-purple-600',
        keywords: ['주사위', 'dice', 'roller', 'd20', 'rpg']
    },
    {
        id: 'snake-game',
        title: '스네이크 게임',
        description: '먹이를 먹고 점점 길어지는 클래식 뱀 게임',
        path: '/snake-game',
        category: 'games',
        icon: Activity,
        color: 'bg-emerald-500',
        keywords: ['스네이크', '뱀게임', 'snake', 'game', 'classic']
    },
    {
        id: 'sudoku',
        title: '스도쿠',
        description: '클래식 9x9 로직 퍼즐 게임',
        path: '/sudoku',
        category: 'games',
        icon: Grid3X3,
        color: 'bg-blue-500',
        keywords: ['스도쿠', 'sudoku', '로직퍼즐', '퍼즐', 'puzzle']
    },
    {
        id: 'tower-stacker',
        title: '탑 쌓기',
        description: '정확한 타이밍에 블록을 높이 쌓는 게임',
        path: '/tower-stacker',
        category: 'games',
        icon: Layers,
        color: 'bg-indigo-500',
        keywords: ['탑쌓기', '타워빌더', 'stacker', 'tower', 'timing']
    },
    {
        id: 'personal-color',
        title: '퍼스널 컬러 진단',
        description: '무료 웜톤 쿨톤 자가 진단 테스트',
        path: '/personal-color',
        category: 'fun',
        icon: Palette,
        color: 'bg-pink-500',
        keywords: ['퍼스널컬러', '자가진단', '웜톤', '쿨톤', 'personalcolor', 'test']
    },
    {
        id: 'past-life',
        title: '나의 전생 알아보기',
        description: '이름으로 보는 나의 신비로운 전생 테스트',
        path: '/past-life',
        category: 'fun',
        icon: Scroll,
        color: 'bg-indigo-600',
        keywords: ['전생', '이름전생', 'pastlife', 'fortune', '재미']
    },
    {
        id: 'pet-mbti',
        title: '펫 MBTI 진단',
        description: '행동으로 알아보는 우리 반려동물 성격 유형',
        path: '/pet-mbti',
        category: 'fun',
        icon: PawPrint,
        color: 'bg-orange-500',
        keywords: ['펫mbti', '반려동물', '강아지mbti', '고양이mbti', 'petmbti']
    },
    {
        id: 'mental-age',
        title: '정신 연령 테스트',
        description: '나는 잼민이일까, 꼰대일까? 나의 마음 나이 확인하기',
        path: '/mental-age',
        category: 'fun',
        icon: Brain,
        color: 'bg-indigo-500',
        keywords: ['정신연령', '심리테스트', 'mentalage', '재미', '꼰대테스트']
    },
    {
        id: 'brain-structure',
        title: '나의 뇌 구조 분석',
        description: '이름으로 보는 머릿속 생각 키워드 분석 리포트',
        path: '/brain-structure',
        category: 'fun',
        icon: Brain,
        color: 'bg-pink-500',
        keywords: ['뇌구조', '머릿속', '생각분석', '이름테스트', 'brainstructure']
    },
    {
        id: 'joseon-job',
        title: '조선시대 직업 테스트',
        description: '내가 조선시대에 태어났다면? 전생 신분 진단하기',
        path: '/joseon-job',
        category: 'fun',
        icon: Scroll,
        color: 'bg-orange-800',
        keywords: ['조선시대', '전생테스트', '신분테스트', '이름테스트', 'joseonjob']
    },
    {
        id: 'if-i-am-god',
        title: "내가 '신'이라면?",
        description: "나는 지름신? 잠의 신? 파괴의 신? 나의 숨겨진 신성 찾기",
        path: '/if-i-am-god',
        category: 'fun',
        icon: Sparkles,
        color: 'bg-indigo-900',
        keywords: ['신테스트', '지름신', '이름테스트', '재미', 'ifiamgod']
    },
    {
        id: 'first-impression-color',
        title: '첫인상 컬러 테스트',
        description: '나는 남들에게 어떤 색으로 보일까? 나의 아우라 컬러 확인하기',
        path: '/first-impression-color',
        category: 'fun',
        icon: Palette,
        color: 'bg-rose-500',
        keywords: ['첫인상', '컬러테스트', '아우라', '이미지테스트', 'color']
    },
    {
        id: 'animal-face',
        title: '동물상 테스트',
        description: '나는 강아지상? 고양이상? 인공지능이 아닌 심리 기반 관상 테스트',
        path: '/animal-face',
        category: 'fun',
        icon: Dog,
        color: 'bg-amber-500',
        keywords: ['동물상', '강아지상', '고양이상', '여우상', '관상', 'animalface']
    },
    {
        id: 'personal-scent',
        title: '나만의 향기 테스트',
        description: '나의 분위기에 찰떡인 향수는? 퍼스널 향기 찾기',
        path: '/personal-scent',
        category: 'fun',
        icon: Wind,
        color: 'bg-emerald-500',
        keywords: ['향기', '향수', '퍼스널향기', '비누향', '우디향', 'personalscent']
    },
    {
        id: 'ideal-type',
        title: '이상형 찾기 테스트',
        description: '내 마음속 진짜 이상형은? 연애 스타일로 알아보는 운명의 상대',
        path: '/ideal-type',
        category: 'fun',
        icon: Heart,
        color: 'bg-rose-500',
        keywords: ['이상형', '연애', '운명', '심리테스트', 'idealtype', 'love']
    },
    {
        id: 'couple-compatibility',
        title: '커플 궁합 테스트',
        description: '우리 둘의 이름으로 보는 사랑의 궁합 점수는? (이름 궁합)',
        path: '/couple-compatibility',
        category: 'fun',
        icon: Heart,
        color: 'bg-pink-500',
        keywords: ['커플궁합', '이름궁합', '속궁합', '연애운', 'compatibility', 'love']
    },
    {
        id: 'hidden-talent',
        title: '숨겨진 재능 테스트',
        description: '나도 모르는 나의 잠재력은? 숨겨진 재능과 적성 찾기 (심리테스트)',
        path: '/hidden-talent',
        category: 'fun',
        icon: Lightbulb,
        color: 'bg-indigo-600',
        keywords: ['재능', '적성', '잠재력', '심리테스트', 'talent', 'potential']
    },
    {
        id: 'balance-game',
        title: '밸런스 게임',
        description: '평생 라면만 먹기 vs 평생 탄산 끊기? 인생 최대 난제 밸런스 게임',
        path: '/balance-game',
        category: 'fun',
        icon: Scale,
        color: 'bg-indigo-500',
        keywords: ['밸런스게임', 'vs', '선택', '만약에', 'balance', 'game']
    },
    {
        id: 'fortune-cookie',
        title: '포춘 쿠키',
        description: '바삭! 쿠키 속에 숨겨진 오늘의 행운 메시지를 확인하세요',
        path: '/fortune-cookie',
        category: 'fun',
        icon: Cookie,
        color: 'bg-yellow-500',
        keywords: ['포춘쿠키', '운세', '행운', '메시지', 'fortune', 'cookie']
    },
    {
        id: 'color-sensitivity',
        title: '색감 능력 테스트',
        description: '당신의 눈은 매의 눈? 미세하게 다른 색깔을 찾아보세요 (색맹 테스트)',
        path: '/color-sensitivity',
        category: 'fun',
        icon: Eye,
        color: 'bg-indigo-600',
        keywords: ['색감테스트', '색맹', '시력', '게임', 'color', 'test']
    },
    {
        id: 'speed-math',
        title: '암산 챌린지',
        description: '제한 시간 내에 문제를 풀어라! 두뇌 회전 스피드 게임',
        path: '/speed-math',
        category: 'fun',
        icon: Calculator,
        color: 'bg-red-500',
        keywords: ['암산', '수학', '게임', '두뇌회전', 'math', 'speed']
    },
    {
        id: 'bubble-wrap',
        title: '무한 뽁뽁이',
        description: '톡! 톡! 멈출 수 없는 중독성, 무한 뽁뽁이로 스트레스 해소하기',
        path: '/bubble-wrap',
        category: 'fun',
        icon: Circle,
        color: 'bg-blue-400',
        keywords: ['뽁뽁이', '스트레스', '피젯', '장난감', 'bubble', 'pop']
    },
    {
        id: 'hearing-test',
        title: '청력 나이 테스트',
        description: '나는 몇 Hz까지 들릴까? 고주파로 측정하는 귀 나이 (모기소리 테스트)',
        path: '/hearing-test',
        category: 'health',
        icon: Ear,
        color: 'bg-rose-400',
        keywords: ['청력', '귀나이', '고주파', '청력검사', 'hearing', 'age']
    },
    {
        id: 'spelling-quiz',
        title: '한국어 맞춤법 능력 고사',
        description: '안되나요 vs 안돼나요? 헷갈리는 맞춤법 퀴즈로 국어 실력 테스트',
        path: '/spelling-quiz',
        category: 'fun',
        icon: PenTool,
        color: 'bg-indigo-500',
        keywords: ['맞춤법', '국어', '한글', '퀴즈', 'spelling', 'korean']
    },
    {
        id: 'time-sense',
        title: '절대 시간 감각 테스트',
        description: '눈 감고 10초 맞추기! 당신의 생체 시계는 얼마나 정확할까요?',
        path: '/time-sense',
        category: 'games',
        icon: Timer,
        color: 'bg-teal-500',
        keywords: ['시간', '타이머', '10초', '감각', 'time', 'sense']
    },
    {
        id: 'pitch-test',
        title: '절대음감 테스트',
        description: '도레미파솔라시도~ 들려주는 음을 맞추고 당신의 음감을 확인하세요',
        path: '/pitch-test',
        category: 'games',
        icon: Music,
        color: 'bg-indigo-600',
        keywords: ['절대음감', '음감', '테스트', '음악', 'music', 'pitch']
    },
    {
        id: 'capital-quiz',
        title: '세계 수도 퀴즈',
        description: '국기를 보고 이 나라의 수도를 맞춰보세요! 지리 상식 챌린지',
        path: '/capital-quiz',
        category: 'games',
        icon: Globe,
        color: 'bg-blue-600',
        keywords: ['수도', '국기', '지리', '퀴즈', 'capital', 'flag']
    },
    {
        id: 'typing-defense',
        title: '타자 디펜스 게임',
        description: '하늘에서 떨어지는 단어를 막아라! 추억의 산성비 게임',
        path: '/typing-defense',
        category: 'games',
        icon: Keyboard,
        color: 'bg-rose-500',
        keywords: ['타자', '게임', '산성비', '베네치아', 'typing', 'defense']
    },
    {
        id: 'vocabulary-test',
        title: '어휘력/문해력 테스트',
        description: '심심한 사과? 금일? 논란의 어휘력 총정리! 당신의 문해력은?',
        path: '/vocabulary-test',
        category: 'fun',
        icon: BookOpen,
        color: 'bg-green-600',
        keywords: ['어휘력', '문해력', '사자성어', '국어', 'vocabulary', 'test']
    },
    {
        id: 'dynamic-acuity',
        title: '동체 시력 테스트',
        description: '빠르게 지나가는 숫자를 잡아라! 당신의 동체 시력 레벨은?',
        path: '/dynamic-acuity',
        category: 'health',
        icon: Eye,
        color: 'bg-yellow-500',
        keywords: ['동체시력', '시력', '순발력', '눈', 'visual', 'acuity']
    },
    {
        id: 'hangman',
        title: '행맨 게임',
        description: '단어가 완성되기 전에 영단어를 맞춰보세요! 고전 추리 게임',
        path: '/hangman',
        category: 'games',
        icon: HelpCircle,
        color: 'bg-gray-600',
        keywords: ['행맨', '영어', '단어', '추리', 'hangman', 'word']
    },
    {
        id: 'morse-code',
        title: '모스 부호 번역기',
        description: '... --- ... 텍스트를 모스 부호로, 부호를 텍스트로 변환하고 소리로 들어보세요',
        path: '/morse-code',
        category: 'text',
        icon: Radio,
        color: 'bg-gray-800',
        keywords: ['모스부호', '번역', '오디오', '신호', 'morse', 'code']
    },
    {
        id: 'smile-dating-test',
        title: '스마일 연애 테스트 (MBTI 연애 유형)',
        description: '나의 연애 성향을 귀여운 스마일 캐릭터로 확인해보세요! MBTI 기반 소름돋는 연애 심리 테스트',
        path: '/smile-dating-test',
        category: 'fun',
        icon: Smile,
        color: 'bg-yellow-400',
        keywords: ['연애테스트', '스마일연애', 'mbti연애', '심리테스트', 'dating', 'test']
    },
    {
        id: 'dating-test',
        title: '연애 능력 고사 (연애 모의고사)',
        description: '당신의 연애 세포는 안녕한가요? 난감한 이별/썸 상황 대처 능력 평가',
        path: '/dating-test',
        category: 'fun',
        icon: Heart,
        color: 'bg-pink-500',
        keywords: ['연애능력고사', '연애고사', '연애퀴즈', '썸', 'dating', 'quiz']
    },
    {
        id: 'stress-test',
        title: '번아웃 증후군 테스트 (직무 스트레스 자가진단)',
        description: '혹시 나도 번아웃? 우울증과 만성 피로, 직장인 스트레스 수치 확인하기',
        path: '/stress-test',
        category: 'health',
        icon: Battery,
        color: 'bg-orange-500',
        keywords: ['번아웃', '스트레스', '우울증', '자가진단', '직장인', 'burnout']
    },
    {
        id: 'brain-type',
        title: '좌뇌 우뇌 테스트 (두뇌 유형 진단)',
        description: '깍지 끼기, 팔짱 끼기 등 신체 습관으로 알아보는 나의 두뇌 성향 분석',
        path: '/brain-type',
        category: 'fun',
        icon: Brain,
        color: 'bg-indigo-600',
        keywords: ['좌뇌우뇌', '뇌구조', '심리테스트', '두뇌회전', 'brain', 'test']
    },
    {
        id: 'eq-test',
        title: 'EQ 공감 능력 테스트 (감정 지능 검사)',
        description: '너 T야? 나의 공감 지수는 몇 점일까? 상황별 대처로 보는 감정 지능 측정',
        path: '/eq-test',
        category: 'fun',
        icon: Heart,
        color: 'bg-pink-500',
        keywords: ['eq테스트', '공감능력', 't발c', 'mbti', 'emotional', 'test']
    },
    {
        id: 'smartphone-addiction',
        title: '스마트폰 중독 자가진단 (스몸비 테스트)',
        description: '혹시 나도 디지털 치매? 스마트폰 의존도 체크리스트 및 해결 방안',
        path: '/smartphone-addiction',
        category: 'health',
        icon: Smartphone,
        color: 'bg-blue-500',
        keywords: ['스마트폰중독', '스몸비', '디지털디톡스', '중독테스트', 'smartphone']
    },
    {
        id: 'kkondae-test',
        title: '꼰대 성향 테스트 (라떼는 말이야)',
        description: '직장 내 꼰대력 측정! 나는 쿨한 선배일까 답답한 꼰대일까? 무료 자가진단',
        path: '/kkondae-test',
        category: 'fun',
        icon: Briefcase,
        color: 'bg-gray-700',
        keywords: ['꼰대테스트', '라떼는', '직장인', '성향검사', 'kkondae', 'test']
    },
    {
        id: 'hogu-test',
        title: '호구 성향 테스트 (거절 못하는 성격)',
        description: '부탁을 거절하기 힘든가요? 당신의 착한 아이 콤플렉스와 호구력을 진단합니다.',
        path: '/hogu-test',
        category: 'fun',
        icon: HelpingHand,
        color: 'bg-purple-500',
        keywords: ['호구테스트', '거절', '착한아이', '심리테스트', 'pushover', 'hogu']
    },
    {
        id: 'debate-test',
        title: '깻잎 논쟁 테스트 (커플 밸런스 게임)',
        description: '깻잎 떼주기, 패딩 지퍼 올려주기... 과몰입 유발 연애 논쟁 모음집',
        path: '/debate-test',
        category: 'fun',
        icon: MessageSquare,
        color: 'bg-green-500',
        keywords: ['깻잎논쟁', '밸런스게임', '연애논쟁', '커플', 'debate', 'balance']
    },
    {
        id: 'idol-test',
        title: 'K-POP 아이돌 포지션 테스트 (데뷔 반)',
        description: '내가 아이돌이라면? 메인보컬, 센터, 리더 등 나에게 딱 맞는 포지션 찾기',
        path: '/idol-test',
        category: 'fun',
        icon: Mic2,
        color: 'bg-indigo-500',
        keywords: ['아이돌테스트', '포지션', 'kpop', '데뷔', 'idol', 'test']
    },
    {
        id: 'resilience-test',
        title: '회복 탄력성 테스트 (멘탈 강도 측정)',
        description: '유리멘탈 vs 강철멘탈? 시련과 스트레스를 이겨내는 나의 마음 근육 점수는?',
        path: '/resilience-test',
        category: 'health',
        icon: Shield,
        color: 'bg-blue-600',
        keywords: ['회복탄력성', '멘탈', '자존감', '심리테스트', 'resilience', 'mental']
    }
];
