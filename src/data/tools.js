import {
    Calculator, Type, FileText, Code, Image, Palette, Clock, Globe,
    Lock, Hash, QrCode, List, Calendar, Search, Moon, Star, Wand2, Sparkles,
    CloudRain, Activity, Flame, Zap, Keyboard, Gamepad2, DollarSign,
    Heart, Brain, Scroll, Gift, PenTool, Timer, CheckSquare, Lightbulb,
    Binary, FileCode, Edit, GitCompare, Barcode, Youtube, ImageIcon,
    Ruler, Weight, FileDigit, Key, Thermometer, Link, Trophy, MousePointer2, Crosshair, Target, Bomb, Disc, GitCommit,
    ArrowLeftRight, FileJson, Droplet, Gauge, Percent, Divide, Dices, Utensils, Bird, Grid3X3, Layers, PawPrint, Wind, User, Mic, Scale, Cookie, Eye, Circle, Ear, Music, BookOpen, HelpCircle, Radio, Smile, Battery, Smartphone, Briefcase, HelpingHand, MessageSquare, Mic2, Shield, Dog, Plus, Minus, X, TrendingUp
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
        description: '다양한 길이 단위를 즉시 변환하세요. 미터(m), 피트(ft), 인치(in), 센티미터(cm) 등 모든 길이 단위를 지원하는 정확한 무료 온라인 변환 도구입니다.',
        path: '/length',
        category: 'unit',
        icon: Ruler,
        color: 'bg-sky-500',
        keywords: ['길이변환기', '단위변환', '미터피트변환', '인치센티미터', '무료온라인도구', 'length converter']
    },
    {
        id: 'weight',
        title: '무게 변환기 | 킬로그램, 파운드, 온스 계산',
        description: '킬로그램(kg), 파운드(lb), 온스(oz), 그람(g) 등 무게 단위를 간편하게 변환하세요. 정밀한 변환 공식을 사용하는 무료 온라인 무게 계산기입니다.',
        path: '/weight',
        category: 'unit',
        icon: Weight,
        color: 'bg-sky-600',
        keywords: ['무게변환기', '단위계산', 'kg파운드변환', '온스계산', 'weight converter']
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
        id: 'area-converter',
        title: '면적 변환기',
        description: '제곱미터, 평, 에이커 단위 변환',
        path: '/area-converter',
        category: 'unit',
        icon: Ruler,
        color: 'bg-blue-600',
        keywords: ['면적', '평수', '제곱미터', '에이커', 'area']
    },
    {
        id: 'volume-converter',
        title: '부피 변환기',
        description: '리터, 갤런, 세제곱미터 변환',
        path: '/volume-converter',
        category: 'unit',
        icon: Droplet,
        color: 'bg-cyan-600',
        keywords: ['부피', '리터', '갤런', 'volume']
    },
    {
        id: 'speed-converter',
        title: '속도 변환기',
        description: 'km/h, mph, m/s 변환',
        path: '/speed-converter',
        category: 'unit',
        icon: Gauge,
        color: 'bg-orange-600',
        keywords: ['속도', 'kmh', 'mph', 'speed']
    },

    // Finance/Life
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
        id: 'percent-calculator',
        title: '퍼센트 계산기',
        description: '비율, 증감, 할인가 계산',
        path: '/percent-calculator',
        category: 'finance',
        icon: Percent,
        color: 'bg-green-600',
        keywords: ['퍼센트', '백분율', '계산기']
    },
    {
        id: 'discount-calculator',
        title: '할인 계산기',
        description: '할인율과 최종 가격 계산',
        path: '/discount-calculator',
        category: 'finance',
        icon: Calculator,
        color: 'bg-red-500',
        keywords: ['할인', '세일', '가격계산']
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
    {
        id: 'lunch-recommender',
        title: '점심 메뉴 추천',
        description: '오늘 뭐 먹지? 결정 장애를 위한 점심 메뉴 랜덤 추천기',
        path: '/lunch-recommender',
        category: 'finance',
        icon: Utensils,
        color: 'bg-orange-500',
        keywords: ['점심', '메뉴', '추천', 'lunch', 'food', 'random']
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
    {
        id: 'morse-code',
        title: '모스 부호 변환기',
        description: '텍스트를 모스 부호로 변환',
        path: '/morse-code',
        category: 'text',
        icon: Radio,
        color: 'bg-gray-800',
        keywords: ['모스부호', 'morse', 'code']
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
    {
        id: 'fraction-calculator',
        title: '분수 계산기',
        description: '분수의 사칙연산 계산',
        path: '/fraction-calculator',
        category: 'dev',
        icon: Divide,
        color: 'bg-violet-600',
        keywords: ['분수', '계산기', '나누기']
    },
    {
        id: 'encryption-tool',
        title: '암호화/복호화 도구',
        description: 'AES 알고리즘을 이용한 텍스트 암호화',
        path: '/encryption-tool',
        category: 'dev',
        icon: Lock,
        color: 'bg-red-600',
        keywords: ['암호화', '복호화', 'aes']
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
    {
        id: 'mandalart',
        title: '만다라트 플래너',
        description: '오타니 쇼헤이의 목표 달성 기법을 이용한 비주얼 플래너',
        path: '/mandalart',
        category: 'utility',
        icon: Grid3X3,
        color: 'bg-sky-500',
        keywords: ['만다라트', 'mandalart', '목표계획', '플래너']
    },
    {
        id: 'color-extractor',
        title: '이미지 색상 추출',
        description: '이미지에서 주요 색상 팔레트 추출',
        path: '/color-extractor',
        category: 'utility',
        icon: Palette,
        color: 'bg-pink-500',
        keywords: ['색상추출', '팔레트', '이미지분석']
    },
    {
        id: 'world-clock',
        title: '세계 시간',
        description: '주요 도시의 현재 시간 확인',
        path: '/world-clock',
        category: 'utility',
        icon: Globe,
        color: 'bg-indigo-600',
        keywords: ['세계시간', 'timezone', '시계']
    },

    // Health
    {
        id: 'bmi',
        title: 'BMI 계산기',
        description: '비만도 및 체질량 지수 측정',
        path: '/bmi',
        category: 'health',
        icon: Activity,
        color: 'bg-green-500',
        keywords: ['bmi', '비만도', '건강']
    },
    {
        id: 'bmr',
        title: 'BMR 계산기 (기초대사량)',
        description: '자신의 기초대사량을 계산하고 일일 권장 칼로리를 확인하세요.',
        path: '/bmr',
        category: 'health',
        icon: Flame,
        color: 'bg-orange-500',
        keywords: ['bmr', '기초대사량', '칼로리', '건강계산기']
    },
    {
        id: 'biorhythm',
        title: '바이오리듬 확인',
        description: '신체, 감성, 지성 주기를 통해 오늘의 상태를 확인하세요.',
        path: '/biorhythm',
        category: 'health',
        icon: Activity,
        color: 'bg-rose-500',
        keywords: ['바이오리듬', '오늘의상태', '신체주기']
    },
    {
        id: 'life-expectancy',
        title: '기대 수명 테스트',
        description: '생활 습관을 통해 나의 예상 수명을 알아보세요.',
        path: '/life-expectancy',
        category: 'health',
        icon: Heart,
        color: 'bg-pink-500',
        keywords: ['기대수명', '수명테스트', '건강관리']
    },

    // Mini Games
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
        id: '1to50',
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
        title: '수박 게임',
        description: '과일을 합쳐서 가장 큰 수박을 만드는 머지 퍼즐 게임',
        path: '/suika-game',
        category: 'games',
        icon: Gamepad2,
        color: 'bg-green-500',
        keywords: ['수박게임', 'suika', '머지퍼즐']
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
    {
        id: 'snake-game',
        title: '스네이크 게임',
        description: '사과를 먹고 길어지는 고전 뱀 게임',
        path: '/snake-game',
        category: 'games',
        icon: Activity,
        color: 'bg-emerald-500',
        keywords: ['snake', '뱀게임', '고전게임']
    },
    {
        id: 'sudoku',
        title: '스도쿠',
        description: '9x9 칸에 숫자를 채우는 논리 퍼즐',
        path: '/sudoku',
        category: 'games',
        icon: Grid3X3,
        color: 'bg-blue-500',
        keywords: ['스도쿠', 'sudoku', '퍼즐']
    },
    {
        id: 'tower-stacker',
        title: '타워 쌓기',
        description: '높게 높게 타워를 쌓아보세요',
        path: '/tower-stacker',
        category: 'games',
        icon: Layers,
        color: 'bg-indigo-500',
        keywords: ['tower', 'stack', 'balancing']
    },
    {
        id: 'dice-roller',
        title: '주사위 굴리기',
        description: '랜덤 주사위 굴리기 도구',
        path: '/dice-roller',
        category: 'games',
        icon: Dices,
        color: 'bg-purple-600',
        keywords: ['주사위', 'dice', 'random']
    },
    {
        id: 'time-sense',
        title: '시간 감각 테스트',
        description: '정확히 10초를 맞춰보세요',
        path: '/time-sense',
        category: 'games',
        icon: Timer,
        color: 'bg-teal-500',
        keywords: ['시간감각', '10초맞추기', 'test']
    },
    {
        id: 'pitch-test',
        title: '절대음감 테스트',
        description: '소리를 듣고 음을 맞춰보세요',
        path: '/pitch-test',
        category: 'games',
        icon: Music,
        color: 'bg-indigo-600',
        keywords: ['절대음감', '음감', '테스트']
    },
    {
        id: 'capital-quiz',
        title: '세계 수도 퀴즈',
        description: '나라별 수도를 맞춰보세요',
        path: '/capital-quiz',
        category: 'games',
        icon: Globe,
        color: 'bg-blue-600',
        keywords: ['수도', '퀴즈', '상식', 'geography']
    },
    {
        id: 'typing-defense',
        title: '산성비 (타자 디펜스)',
        description: '내려오는 단어를 입력해 방어하세요',
        path: '/typing-defense',
        category: 'games',
        icon: Keyboard,
        color: 'bg-rose-500',
        keywords: ['타자연습', '산성비', '디펜스']
    },
    {
        id: 'hangman',
        title: '행맨',
        description: '단어를 추측해 글자를 맞춰보세요',
        path: '/hangman',
        category: 'games',
        icon: HelpCircle,
        color: 'bg-gray-600',
        keywords: ['hangman', '행맨', '단어맞추기']
    },
    {
        id: 'speed-math',
        title: '암산 게임',
        description: '빠르게 계산하여 뇌를 활성화시키세요',
        path: '/speed-math',
        category: 'games',
        icon: Zap,
        color: 'bg-yellow-600',
        keywords: ['암산', '수학', '두뇌훈련']
    },
    {
        id: 'bubble-wrap',
        title: '뾱뾱이 터뜨리기',
        description: '무한으로 즐기는 스트레스 해소 뾱뾱이',
        path: '/bubble-wrap',
        category: 'games',
        icon: Disc,
        color: 'bg-blue-400',
        keywords: ['뾱뾱이', '스트레스해소', '힐링게임']
    },
    {
        id: 'dynamic-acuity',
        title: '동체시력 테스트',
        description: '움직이는 물체를 잡아내는 시력을 측정하세요',
        path: '/dynamic-acuity',
        category: 'games',
        icon: Eye,
        color: 'bg-indigo-500',
        keywords: ['동체시력', '시력테스트', '순발력']
    },

    // Fun/Fortune
    {
        id: 'lotto',
        title: '로또 번호 생성기',
        description: '오늘의 행운 번호를 정교한 알고리즘으로 추출하세요.',
        path: '/lotto',
        category: 'fun',
        icon: Sparkles,
        color: 'bg-yellow-500',
        keywords: ['로또', '행운번호', '추첨']
    },
    {
        id: 'lotto-sim',
        title: '로또 시뮬레이터',
        description: '내가 로또를 계속 사면 얼마를 벌까요? 결과 확인!',
        path: '/lotto-sim',
        category: 'fun',
        icon: TrendingUp,
        color: 'bg-green-500',
        keywords: ['로또시뮬레이터', '수익률', '로또연습']
    },
    {
        id: 'tarot',
        title: '오늘의 타로 운세',
        description: '22장의 메이저 타로 카드로 당신의 운명을 점쳐보세요.',
        path: '/tarot',
        category: 'fun',
        icon: Moon,
        color: 'bg-purple-600',
        keywords: ['타로카드', '타로점', '오늘의운세']
    },
    {
        id: 'blood-type',
        title: '혈액형 성격',
        description: '혈액형별 성격 분석',
        path: '/blood-type',
        category: 'fun',
        icon: Heart,
        color: 'bg-pink-600',
        keywords: ['혈액형', 'personality']
    },
    {
        id: 'mbti',
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
        title: '만세력/사주',
        description: '생년월일로 사주팔자 확인',
        path: '/saju',
        category: 'fun',
        icon: Scroll,
        color: 'bg-pink-800',
        keywords: ['사주', '만세력', 'fortune']
    },
    {
        id: 'zodiac-fortune',
        title: '띠별 운세',
        description: '12띠 오늘의 운세',
        path: '/zodiac-fortune',
        category: 'fun',
        icon: Star,
        color: 'bg-purple-700',
        keywords: ['띠', '운세', 'zodiac']
    },
    {
        id: 'horoscope',
        title: '별자리 운세',
        description: '12별자리 오늘의 운세',
        path: '/horoscope',
        category: 'fun',
        icon: Moon,
        color: 'bg-indigo-600',
        keywords: ['별자리', '운세', 'horoscope']
    },
    {
        id: 'dream-interpretation',
        title: '꿈해몽',
        description: '꿈 내용으로 해몽 검색',
        path: '/dream-interpretation',
        category: 'fun',
        icon: CloudRain,
        color: 'bg-indigo-500',
        keywords: ['꿈', '해몽', 'dream']
    },
    {
        id: 'birth-gen',
        title: '우주 탄생석/꽃 탄생일',
        description: '당신의 생일에 어울리는 탄생석과 꽃을 찾아보세요.',
        path: '/birth-gen',
        category: 'fun',
        icon: Gift,
        color: 'bg-rose-400',
        keywords: ['탄생일', '탄생석', '탄생화']
    },
    {
        id: 'name-analysis',
        title: '이름 풀이 (작명)',
        description: '이름에 담긴 의미와 운세를 분석합니다.',
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
        keywords: ['좌뇌우뇌', '두뇌유형', '심리']
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
        description: '당신의 꼰대 지수는 몇 점인가요? (익명 보장)',
        path: '/kkondae-test',
        category: 'fun',
        icon: User,
        color: 'bg-stone-600',
        keywords: ['꼰대', '심리테스트', '조직문화']
    },
    {
        id: 'hogu-test',
        title: '호구 성향 테스트',
        description: '나만 당하고 사는 건 아닐까? 호구 지수 확인!',
        path: '/hogu-test',
        category: 'fun',
        icon: HelpingHand,
        color: 'bg-orange-300',
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
        description: '제시된 초성을 보고 단어를 맞춰보세요',
        path: '/initial-sound-quiz',
        category: 'trivia',
        icon: BookOpen,
        color: 'bg-yellow-400',
        keywords: ['초성', '퀴즈', 'trivia']
    },
    {
        id: 'food-quiz',
        title: '음식/맛집 퀴즈',
        description: '당신은 얼마나 많은 음식을 알고 있나요?',
        path: '/food-quiz',
        category: 'trivia',
        icon: Utensils,
        color: 'bg-orange-500',
        keywords: ['음식', '퀴즈', '상식']
    },
    {
        id: 'association-quiz',
        title: '연상 퀴즈',
        description: '주어진 단어들을 보고 정답을 연상하세요.',
        path: '/association-quiz',
        category: 'trivia',
        icon: Brain,
        color: 'bg-purple-500',
        keywords: ['연상퀴즈', '두뇌훈련', '상식']
    },
    {
        id: 'spelling-quiz',
        title: '맞춤법 퀴즈',
        description: '자주 틀리는 우리말 맞춤법, 얼마나 알고 계신가요?',
        path: '/spelling-quiz',
        category: 'trivia',
        icon: Edit,
        color: 'bg-blue-500',
        keywords: ['맞춤법', '우리말', '국어실력']
    },
    {
        id: 'vocabulary-test',
        title: '어휘력 테스트',
        description: '당신의 어휘 수준을 등급으로 확인하세요.',
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
