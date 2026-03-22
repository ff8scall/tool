import React, { useState } from 'react';
import { Cake } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import ShareButtons from '../components/ShareButtons';
import { useLanguage } from '../context/LanguageContext';

const AgeCalculator = () => {
    const { lang, t } = useLanguage();
    const isEn = lang === 'en';
    const [birthDate, setBirthDate] = useState('');

    const calculateAge = () => {
        if (!birthDate) return null;

        const birth = new Date(birthDate);
        const today = new Date();

        // Korean Age
        let koreanAge = today.getFullYear() - birth.getFullYear() + 1;

        // International Age
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }

        // Days until next birthday
        const nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
        if (nextBirthday < today) {
            nextBirthday.setFullYear(today.getFullYear() + 1);
        }
        const daysUntilBirthday = Math.ceil((nextBirthday - today) / (1000 * 60 * 60 * 24));

        // Days since birth
        const daysSinceBirth = Math.floor((today - birth) / (1000 * 60 * 60 * 24));

        return {
            koreanAge,
            internationalAge: age,
            daysUntilBirthday,
            daysSinceBirth,
            nextBirthday: nextBirthday.toLocaleDateString(isEn ? 'en-US' : 'ko-KR')
        };
    };

    const result = calculateAge();

    const faqs = isEn ? [
        { q: 'What is the difference between International Age and Korean Age?', a: 'International Age: Calculated from birth date, increases by 1 on your birthday.\nKorean Age: You are 1 year old at birth, and age increases by 1 every January 1st.\nKorean Age is usually 1-2 years older than International Age.' },
        { q: 'What is the 2023 Korean Age Unification Law?', a: 'Since June 28, 2023, the official age calculation standard in South Korea for legal and official documents has been unified to the International Age.' },
        { q: 'Which age should I use for medical and insurance documents?', a: 'For medical, insurance, and legal documents after June 2023, you must use the International Age.' },
    ] : [
        { q: '만 나이와 한국 나이의 차이는 무엇인가요?', a: '만 나이(국제 기준): 태어난 날부터 계산, 생일이 지나야 1세 증가.\n한국 나이(세는 나이): 태어나자마자 1세, 매년 1월 1일마다 1세 증가.\n보통 만 나이는 한국 나이보다 1~2살 적습니다.' },
        { q: '2023년 만 나이 통일법이란?', a: '2023년 6월 28일부터 공식 법률·서류에서 나이 계산 기준이 만 나이로 통일되었습니다. 일상 대화에서는 여전히 한국 나이를 쓰기도 하지만, 법적으로는 만 나이가 기준입니다.' },
        { q: '의료·보험 서류에 나이를 어떻게 써야 하나요?', a: '2023년 6월 이후 의료, 보험, 법률 서류에서는 만 나이를 기재해야 합니다. 이 계산기의 "만 나이"를 기준으로 사용하세요.' },
    ];

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <SEO
                title={t('tools.age-calc.title') || "만 나이 계산기 | 생년월일로 만 나이·한국 나이 즉시 계산"}
                description={t('tools.age-calc.description') || "생년월일을 입력하면 만 나이와 한국 나이(세는 나이)를 즉시 계산합니다."}
                keywords={isEn ? "age calculator, international age, korean age calculator, days since birth, D-day birthday" : "만나이계산기, 한국나이계산, 만나이통일법, 생년월일나이계산, 나이계산기, 만나이변환, 생일D-day"}
                faqs={faqs}
            />

            <header className="text-center space-y-2">
                <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
                    <Cake className="w-8 h-8 text-primary" />
                    {isEn ? 'Age Calculator' : '만 나이 계산기'}
                </h1>
                <p className="text-muted-foreground">
                    {isEn ? 'Calculate your exact age and Korean age based on your birth date.' : '생년월일로 만 나이와 한국 나이를 계산하세요'}
                </p>
            </header>

            <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-2">{isEn ? 'Date of Birth' : '생년월일'}</label>
                    <input
                        type="date"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                        max={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
            </div>

            {result && (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-border rounded-xl p-8 text-center">
                            <h3 className="text-sm font-medium text-muted-foreground mb-2">{isEn ? 'International Age' : '만 나이'}</h3>
                            <p className="text-5xl font-bold text-primary mb-2">
                                {result.internationalAge}{isEn ? ' yrs' : '세'}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                {isEn ? '(Global Standard)' : '(국제 표준 / 법적 나이)'}
                            </p>
                        </div>

                        <div className="bg-gradient-to-br from-pink-500/10 to-rose-500/10 border border-border rounded-xl p-8 text-center">
                            <h3 className="text-sm font-medium text-muted-foreground mb-2">{isEn ? 'Korean Age' : '한국 나이'}</h3>
                            <p className="text-5xl font-bold text-pink-600 dark:text-pink-400 mb-2">
                                {result.koreanAge}{isEn ? ' yrs' : '세'}
                            </p>
                            <p className="text-xs text-muted-foreground">
                                {isEn ? '(Traditional Korean)' : '(전통적 계산법)'}
                            </p>
                        </div>
                    </div>

                    <div className="bg-card border border-border rounded-xl p-6 space-y-4">
                        <h3 className="font-bold text-lg">📊 {isEn ? 'Detailed Info' : '상세 정보'}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div className="p-4 bg-secondary rounded-lg">
                                <p className="text-muted-foreground mb-1">{isEn ? 'Next Birthday' : '다음 생일'}</p>
                                <p className="font-bold text-lg">{result.nextBirthday}</p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    {isEn ? `${result.daysUntilBirthday} days left` : `${result.daysUntilBirthday}일 남음`}
                                </p>
                            </div>
                            <div className="p-4 bg-secondary rounded-lg">
                                <p className="text-muted-foreground mb-1">{isEn ? 'Days Since Birth' : '살아온 날'}</p>
                                <p className="font-bold text-lg">
                                    {result.daysSinceBirth.toLocaleString(isEn ? 'en-US' : 'ko-KR')}{isEn ? ' days' : '일'}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                    {isEn ? `Approx ${Math.floor(result.daysSinceBirth / 365)} years` : `약 ${Math.floor(result.daysSinceBirth / 365)}년`}
                                </p>
                            </div>
                        </div>
                    </div>
                </>
            )}

            <div className="bg-muted/30 rounded-xl p-6 text-sm text-muted-foreground">
                <h3 className="font-bold text-foreground mb-2">💡 {isEn ? 'International vs Korean Age' : '만 나이 vs 한국 나이'}</h3>
                <ul className="space-y-2">
                    <li>
                        <strong className="text-foreground">{isEn ? 'International Age: ' : '만 나이: '}</strong> 
                        {isEn ? 'Calculated from birth date, increases by 1 on your birthday.' : '태어난 날부터 계산하여 생일이 지나야 한 살 증가'}
                    </li>
                    <li>
                        <strong className="text-foreground">{isEn ? 'Korean Age: ' : '한국 나이: '}</strong> 
                        {isEn ? 'You are 1 year old at birth, and age increases by 1 every January 1st.' : '태어나자마자 1세, 1월 1일마다 한 살 증가'}
                    </li>
                    <li className="pt-2 border-t border-border">
                        <strong className="text-foreground">{isEn ? 'Since June 28, 2023, ' : '2023년 6월 28일부터 '}</strong> 
                        {isEn ? 'South Korea officially uses the International age system.' : '대한민국에서 공식적으로 만 나이를 사용합니다.'}
                    </li>
                </ul>
            </div>

            <ShareButtons />

            <ToolGuide
                title={isEn ? "Age Calculator Guide" : "만 나이 계산기 사용 가이드"}
                intro={isEn 
                    ? "Since June 28, 2023, South Korea officially adopted the global standard age system. This calculator computes your International age, traditional Korean age, days until next birthday, and total days lived instantly."
                    : "2023년 6월 28일부터 대한민국에서 공식적으로 만 나이를 사용합니다. 이 계산기는 생년월일을 입력하면 만 나이(법적 나이), 한국 나이(세는 나이), 다음 생일까지 남은 일수, 살아온 날수를 즉시 계산합니다."}
                steps={isEn ? [
                    'Select or type your birth date in the "Date of Birth" field.',
                    'Your International age and traditional Korean age will automatically calculate.',
                    'Check your next birthday countdown and total days lived in the "Detailed Info" card.'
                ] : [
                    '"생년월일" 입력란에서 달력을 클릭하거나 직접 날짜를 선택합니다.',
                    '선택 즉시 만 나이와 한국 나이가 자동 계산됩니다.',
                    '"상세 정보" 카드에서 다음 생일 날짜, 남은 D-day, 살아온 날수를 확인합니다.',
                ]}
                tips={isEn ? [
                    'For all Korean official or legal documents after June 28, 2023, use your International Age.',
                    'International Age increases exactly on your birthday. If your birthday hasn\'t passed yet this year: Current Year - Birth Year - 1.',
                    'Korean Age: 1 year old at birth + 1 year every January 1st.',
                    'Calendar Age (Current Year - Birth Year) is used occasionally in specific laws like conscription or minor protection acts.'
                ] : [
                    '2023년 6월 28일부터 법적·공식 서류에서는 만 나이를 사용합니다. (주민등록법·행정기본법 개정)',
                    '만 나이는 생일이 지나야 한 살 증가합니다. 생일 전이면 올해 연도 - 출생연도 - 1.',
                    '한국 나이(세는 나이): 태어난 해에 1세, 매년 1월 1일마다 한 살씩 증가합니다.',
                    '연 나이(현재 연도 - 출생 연도)는 병역법, 청소년보호법 등 일부 법률에서 별도로 사용됩니다.',
                ]}
                faqs={faqs}
            />
        </div>
    );
};
export default AgeCalculator;
