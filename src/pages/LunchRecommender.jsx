import React, { useState, useEffect } from 'react';
import { Utensils, RefreshCw, Share2, Check, ThumbsUp, ThumbsDown, MapPin, History, Filter, X } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { lunchMenu, foodCategories } from '../data/lunchData';
import { useLanguage } from '../context/LanguageContext';

const LunchRecommender = () => {
    const { lang } = useLanguage();
    const isEn = lang === 'en';
    
    // State
    const [selectedCategories, setSelectedCategories] = useState(['korean', 'chinese', 'japanese', 'western', 'snack']);
    const [filters, setFilters] = useState({ noSpicy: false, soupOnly: false });
    const [result, setResult] = useState(null);
    const [isSpinning, setIsSpinning] = useState(false);
    const [displayMenu, setDisplayMenu] = useState(null);
    const [showCopied, setShowCopied] = useState(false);

    // Personalization State (Persisted)
    const [likes, setLikes] = useState(() => JSON.parse(localStorage.getItem('lunch_likes') || '[]'));
    const [dislikes, setDislikes] = useState(() => JSON.parse(localStorage.getItem('lunch_dislikes') || '[]'));
    const [history, setHistory] = useState(() => JSON.parse(localStorage.getItem('lunch_history') || '[]'));

    // Save to localStorage
    useEffect(() => {
        localStorage.setItem('lunch_likes', JSON.stringify(likes));
        localStorage.setItem('lunch_dislikes', JSON.stringify(dislikes));
        localStorage.setItem('lunch_history', JSON.stringify(history));
    }, [likes, dislikes, history]);

    const toggleCategory = (category) => {
        if (selectedCategories.includes(category)) {
            if (selectedCategories.length === 1) return;
            setSelectedCategories(selectedCategories.filter(c => c !== category));
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    const toggleFilter = (key) => {
        setFilters(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const selectAll = () => {
        if (selectedCategories.length === Object.keys(foodCategories).length) {
            setSelectedCategories(['korean']);
        } else {
            setSelectedCategories(Object.keys(foodCategories));
        }
    };

    const handleLike = (id) => {
        if (likes.includes(id)) {
            setLikes(likes.filter(item => item !== id));
        } else {
            setLikes([...likes, id]);
            setDislikes(dislikes.filter(item => item !== id)); // Remove from dislike if liked
        }
    };

    const handleDislike = (id) => {
        if (dislikes.includes(id)) {
            setDislikes(dislikes.filter(item => item !== id));
        } else {
            setDislikes([...dislikes, id]);
            setLikes(likes.filter(item => item !== id)); // Remove from like if disliked
        }
    };

    const recommendMenu = () => {
        if (isSpinning) return;

        // Filter candidates
        let candidates = lunchMenu.filter(item => {
            // 1. Category check
            if (!selectedCategories.includes(item.category)) return false;
            // 2. Filter check
            if (filters.noSpicy && item.tags.includes('spicy')) return false;
            if (filters.soupOnly && !item.tags.includes('soup')) return false;
            // 3. Dislike check (exclude disliked items)
            if (dislikes.includes(item.id)) return false;
            return true;
        });

        if (candidates.length === 0) {
            alert(isEn ? 'No menu matches your criteria. Please adjust the filters!' : '조건에 맞는 메뉴가 없습니다. 필터를 조정해보세요!');
            return;
        }

        // Boost liked items (add them again to increase probability)
        const boostedCandidates = [...candidates];
        candidates.forEach(item => {
            if (likes.includes(item.id)) {
                boostedCandidates.push(item);
                boostedCandidates.push(item); // 3x chance
            }
        });

        setIsSpinning(true);
        setResult(null);

        // Animation
        let count = 0;
        const maxCount = 20;
        const interval = setInterval(() => {
            const randomIdx = Math.floor(Math.random() * candidates.length); // Use original candidates for animation variety
            setDisplayMenu(candidates[randomIdx]);
            count++;

            if (count >= maxCount) {
                clearInterval(interval);
                const finalChoice = boostedCandidates[Math.floor(Math.random() * boostedCandidates.length)];
                setDisplayMenu(finalChoice);
                setResult(finalChoice);
                setIsSpinning(false);

                // Add to history
                setHistory(prev => {
                    const newHistory = [finalChoice, ...prev.filter(h => h.id !== finalChoice.id)].slice(0, 5);
                    return newHistory;
                });
            }
        }, 80);
    };

    const copyToClipboard = () => {
        if (!result) return;
        const itemName = isEn ? result.nameEn : result.name;
        const message = isEn ? `What about [${itemName}] for lunch today?` : `오늘 점심 메뉴는 [${itemName}] 어때요?`;
        navigator.clipboard.writeText(message);
        setShowCopied(true);
        setTimeout(() => setShowCopied(false), 2000);
    };

    const openMapSearch = () => {
        if (!result) return;
        const itemName = isEn ? result.nameEn : result.name;
        const query = encodeURIComponent(itemName + (isEn ? ' restaurant near me' : ' 맛집'));
        
        if (isEn) {
            window.open(`https://www.google.com/maps/search/${query}`, '_blank');
        } else {
            window.open(`https://map.naver.com/v5/search/${query}`, '_blank');
        }
    };

    const toolFaqs = isEn ? [
        { q: "How are recommendations personaliazed?", a: "The tool tracks your 'Likes' to increase their probability in future rolls and 'Dislikes' to permanently exclude them from suggestions until you change your preference." },
        { q: "Can I use this for non-Korean food?", a: "Yes. Use the category filters at the top to select from Western, Chinese, Japanese, and Snack/Other categories." },
        { q: "Is any of my data saved to a server?", a: "No. All your preferences and history are stored locally in your browser's localStorage. No food data is sent to external servers." }
    ] : [
        { q: "추천 결과는 어떻게 개인화되나요?", a: "사용자가 '좋아요'를 누른 메뉴는 다음 추천에서 확률이 3배로 높아지며, '싫어요'를 누른 메뉴는 추천 목록에서 완전히 제외됩니다." },
        { q: "한식 외에 다른 메뉴도 있나요?", a: "네, 중식, 일식, 양식, 분식 등 다양한 카테고리의 50가지 이상의 점심 메뉴 데이터가 등록되어 있습니다." },
        { q: "기록이 서버에 저장되나요?", a: "아니오, 사용자의 선호도와 최근 기록은 오직 브라우저의 로컬 스토리지에만 저장되어 사생활을 보호합니다." }
    ];

    return (
        <div className="max-w-2xl mx-auto space-y-8 pb-12">
            <SEO
                title={isEn ? "Lunch Menu Recommender - What to Eat Today?" : "점심 메뉴 추천기 - 오늘 뭐 먹지? | Utility Hub"}
                description={isEn ? "Struggling to decide what to eat for lunch? Get personalized recommendations based on your preferences, categories, and dietary filters." : "오늘 점심 뭐 먹을지 고민되시나요? 개인화된 추천으로 딱 맞는 메뉴를 찾아보세요!"}
                keywords={isEn ? "lunch recommender, food picker, random menu, what to eat, menu suggestion" : "점심메뉴, 메뉴추천, 점심, 메뉴, 랜덤, 맛집"}
                faqs={toolFaqs}
            />

            <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center p-3 bg-red-100 dark:bg-red-900/30 rounded-full mb-2">
                    <Utensils className="w-8 h-8 text-red-600 dark:text-red-400" />
                </div>
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-500">
                    {isEn ? 'Lunch Recommender' : '점심 메뉴 추천기'}
                </h1>
                <p className="text-muted-foreground">
                    {isEn ? "Can't decide what to eat? We'll pick the perfect meal for you!" : '오늘 점심 뭐 먹을지 고민되시나요? 취향에 딱 맞는 메뉴를 골라드릴게요!'}
                </p>
            </div>

            <div className="card p-6 space-y-6">
                {/* Controls Section */}
                <div className="space-y-4">
                    {/* Categories */}
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <label className="text-sm font-medium text-muted-foreground">{isEn ? 'Categories' : '카테고리'}</label>
                            <button onClick={selectAll} className="text-xs text-primary hover:underline font-semibold">
                                {selectedCategories.length === Object.keys(foodCategories).length 
                                    ? (isEn ? 'Deselect All' : '전체 해제') 
                                    : (isEn ? 'Select All' : '전체 선택')}
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {Object.entries(foodCategories).map(([key, value]) => (
                                <button
                                    key={key}
                                    onClick={() => toggleCategory(key)}
                                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border ${selectedCategories.includes(key)
                                            ? value.color + ' shadow-sm border-transparent'
                                            : 'bg-secondary/50 text-muted-foreground border-transparent hover:bg-secondary'
                                        }`}
                                >
                                    {isEn ? value.labelEn : value.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-wrap gap-3 pt-4 border-t border-border/50">
                        <button
                            onClick={() => toggleFilter('noSpicy')}
                            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${filters.noSpicy ? 'bg-orange-100 text-orange-700 border-orange-200 ring-2 ring-orange-200' : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
                                }`}
                        >
                            <Filter className="w-3 h-3" />
                            {isEn ? 'No Spicy' : '매운거 제외'}
                        </button>
                        <button
                            onClick={() => toggleFilter('soupOnly')}
                            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${filters.soupOnly ? 'bg-blue-100 text-blue-700 border-blue-200 ring-2 ring-blue-200' : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
                                }`}
                        >
                            <Filter className="w-3 h-3" />
                            {isEn ? 'Soup Only' : '국물 요리만'}
                        </button>
                    </div>
                </div>

                {/* Display Area */}
                <div className="relative min-h-[280px] flex flex-col items-center justify-center bg-secondary/10 border-2 border-dashed border-border/50 rounded-2xl p-8 overflow-hidden transition-colors">
                    {displayMenu ? (
                        <div className={`text-center space-y-4 transition-all duration-300 ${result ? 'scale-100' : 'scale-95 opacity-80'}`}>
                            <div className="text-7xl mb-4 animate-bounce-slow drop-shadow-lg">{displayMenu.icon}</div>
                            <div>
                                <h2 className="text-4xl font-black text-foreground mb-3 tracking-tight">
                                    {isEn ? displayMenu.nameEn : displayMenu.name}
                                </h2>
                                {result && (
                                    <p className="text-base text-muted-foreground max-w-sm mx-auto animate-in fade-in slide-in-from-bottom-2 leading-relaxed">
                                        {isEn ? displayMenu.descriptionEn : displayMenu.description}
                                    </p>
                                )}
                            </div>

                            {/* Tags */}
                            {result && (
                                <div className="flex flex-wrap justify-center gap-2 pt-4">
                                    {displayMenu.tags.map(tag => (
                                        <span key={tag} className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 bg-white dark:bg-gray-800 shadow-sm border border-border rounded-lg text-muted-foreground">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="text-center space-y-3">
                            <Utensils className="w-16 h-16 mx-auto mb-2 opacity-10" />
                            <p className="text-xl font-medium text-muted-foreground">{isEn ? 'What to eat today?' : '오늘 뭐 먹지?'}</p>
                            <p className="text-sm text-muted-foreground/60">{isEn ? 'Click the button below to start!' : '아래 버튼을 눌러 추천을 받아보세요!'}</p>
                        </div>
                    )}

                    {result && (
                        <div className="absolute top-6 right-6">
                            <span className="px-4 py-1.5 bg-green-500 text-white text-xs font-black rounded-full shadow-lg shadow-green-500/30 animate-pulse uppercase tracking-widest">
                                {isEn ? 'PICKED!' : '추천 완료!'}
                            </span>
                        </div>
                    )}
                </div>

                {/* Result Actions */}
                {result && (
                    <div className="flex flex-wrap justify-center gap-4 animate-in fade-in slide-in-from-bottom-4">
                        <button
                            onClick={() => handleLike(result.id)}
                            className={`flex flex-col items-center gap-1 p-4 rounded-2xl transition-all ${likes.includes(result.id) ? 'bg-green-100 text-green-600 scale-110 shadow-md' : 'bg-secondary text-muted-foreground hover:bg-secondary/80'}`}
                            title={isEn ? "Like (increases chance)" : "좋아요 (더 자주 나옴)"}
                        >
                            <ThumbsUp className="w-6 h-6" />
                            <span className="text-[10px] font-black uppercase tracking-tighter">{isEn ? 'Like' : '좋아요'}</span>
                        </button>
                        <button
                            onClick={() => handleDislike(result.id)}
                            className={`flex flex-col items-center gap-1 p-4 rounded-2xl transition-all ${dislikes.includes(result.id) ? 'bg-red-100 text-red-600 scale-110 shadow-md' : 'bg-secondary text-muted-foreground hover:bg-secondary/80'}`}
                            title={isEn ? "Dislike (excludes item)" : "싫어요 (안 나옴)"}
                        >
                            <ThumbsDown className="w-6 h-6" />
                            <span className="text-[10px] font-black uppercase tracking-tighter">{isEn ? 'Exclude' : '싫어요'}</span>
                        </button>
                        <div className="w-px h-16 bg-border mx-2 self-center hidden sm:block"></div>
                        <button
                            onClick={openMapSearch}
                            className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-2xl font-bold hover:bg-green-600 hover:scale-105 transition-all shadow-lg shadow-green-500/20"
                        >
                            <MapPin className="w-5 h-5" />
                            {isEn ? 'Find Places' : '맛집 검색'}
                        </button>
                        <button
                            onClick={copyToClipboard}
                            className="flex items-center gap-2 px-6 py-3 bg-secondary text-foreground rounded-2xl font-bold hover:bg-secondary/80 transition-all"
                        >
                            {showCopied ? <Check className="w-5 h-5 text-green-500" /> : <Share2 className="w-5 h-5" />}
                            {isEn ? 'Share' : '공유'}
                        </button>
                    </div>
                )}

                {/* Main Action Button */}
                <button
                    onClick={recommendMenu}
                    disabled={isSpinning}
                    className="w-full h-16 bg-primary text-white rounded-2xl text-xl font-black flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:scale-100 transition-all"
                >
                    <RefreshCw className={`w-6 h-6 ${isSpinning ? 'animate-spin' : ''}`} />
                    {isSpinning ? (isEn ? 'PICKING...' : '고르는 중...') : (isEn ? 'ROLL FOR LUNCH' : '메뉴 추천받기')}
                </button>
            </div>

            {/* History Section */}
            {history.length > 0 && (
                <div className="space-y-4 animate-in fade-in">
                    <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground px-1 uppercase tracking-wider">
                        <History className="w-4 h-4" />
                        {isEn ? 'Recent Recommendations' : '최근 추천 기록'}
                    </div>
                    <div className="flex gap-4 overflow-x-auto pb-4 px-1 scrollbar-hide">
                        {history.map((item, idx) => (
                            <div key={`${item.id}-${idx}`} className="flex-shrink-0 w-28 bg-card border border-border shadow-sm rounded-2xl p-4 text-center space-y-2 hover:border-primary transition-colors cursor-default group">
                                <div className="text-3xl group-hover:scale-110 transition-transform">{item.icon}</div>
                                <div className="font-bold text-xs truncate">{isEn ? item.nameEn : item.name}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <ToolGuide
                title={isEn ? "How to Use Lunch Recommender" : "점심 메뉴 추천 가이드"}
                intro={isEn ? "Stuck in a lunch loop? Our smart recommender uses your likes and dislikes to suggest the perfect meal. Filter by cuisine style or dietary needs to narrow down the search." : "매일 반복되는 '오늘 뭐 먹지?' 고민을 해결해 드립니다. 사용자의 취향(좋아요/싫어요)을 반영하여 데이터 기반으로 최적의 한 끼를 추천합니다."}
                steps={isEn ? [
                    "Select categories (Korean, Western, etc.) you're in the mood for.",
                    "Apply dietary filters like 'No Spicy' or 'Soup Only' if needed.",
                    "Click the 'ROLL FOR LUNCH' button to start the animation.",
                    "Review the recommendation, then 'Like' to see it more often or 'Exclude' to never see it again.",
                    "Click 'Find Places' to see restaurants near you on the map."
                ] : [
                    "원하시는 음식 카테고리(한식, 일식 등)를 선택하세요.",
                    "취향에 따라 '매운거 제외'나 '국물 요리만' 필터를 적용합니다.",
                    "'메뉴 추천받기' 버튼을 누르면 랜덤 애니메이션이 시작됩니다.",
                    "추천된 메뉴가 마음에 든다면 '좋아요'를, 싫어하는 메뉴라면 '싫어요'를 눌러 개인화된 목록을 만드세요.",
                    "'맛집 검색' 버튼을 누르면 현재 위치 주변의 식당 정보를 바로 확인할 수 있습니다."
                ]}
                tips={isEn ? [
                    "Selecting fewer categories will more precisely target your specific cravings.",
                    "The logic boosts 'Liked' items by 3x, making them appear more frequently while still keeping the luck factor.",
                    "Add the page to your home screen for quick daily access before lunch.",
                    "Share your result with your colleagues via the Share button to coordinate a team lunch."
                ] : [
                    "카테고리를 좁힐수록 현재 가장 먹고 싶은 메뉴에 가까운 추천을 받을 수 있습니다.",
                    "'좋아요'를 누른 메뉴는 가중치가 부여되어 다음 추천 시 등장 확률이 높아집니다.",
                    "매일 점심시간 직전에 홈 화면에 추가하여 빠르게 이용해 보세요.",
                    "동료들에게 공유 기능을 활용해 오늘 점심 메뉴를 제안해 보는 것도 좋습니다."
                ]}
                faqs={toolFaqs}
            />
        </div>
    );
};

export default LunchRecommender;
