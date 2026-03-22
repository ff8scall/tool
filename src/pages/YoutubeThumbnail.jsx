import React, { useState } from 'react';
import { Youtube, Download, Image as ImageIcon } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';

const YoutubeThumbnail = () => {
    const [url, setUrl] = useState('');
    const [videoId, setVideoId] = useState('');
    const [thumbnails, setThumbnails] = useState([]);

    const extractVideoId = (youtubeUrl) => {
        // 다양한 유튜브 URL 형식 지원
        const patterns = [
            /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
            /youtube\.com\/shorts\/([^&\n?#]+)/
        ];

        for (const pattern of patterns) {
            const match = youtubeUrl.match(pattern);
            if (match && match[1]) {
                return match[1];
            }
        }
        return null;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const id = extractVideoId(url);

        if (id) {
            setVideoId(id);
            setThumbnails([
                { quality: '최대 해상도', url: `https://img.youtube.com/vi/${id}/maxresdefault.jpg`, size: '1280×720' },
                { quality: '고화질', url: `https://img.youtube.com/vi/${id}/sddefault.jpg`, size: '640×480' },
                { quality: '중간 화질', url: `https://img.youtube.com/vi/${id}/hqdefault.jpg`, size: '480×360' },
                { quality: '일반 화질', url: `https://img.youtube.com/vi/${id}/mqdefault.jpg`, size: '320×180' },
                { quality: '저화질', url: `https://img.youtube.com/vi/${id}/default.jpg`, size: '120×90' }
            ]);
        } else {
            alert('유효한 유튜브 URL을 입력해주세요');
        }
    };

    const downloadImage = (imageUrl, quality) => {
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = `youtube_thumbnail_${videoId}_${quality}.jpg`;
        link.target = '_blank';
        link.click();
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <SEO
                title="유튜브 썸네일 다운로더 - Utility Hub"
                description="유튜브 동영상의 썸네일 이미지를 다운로드하세요. 고화질 썸네일을 무료로 저장할 수 있습니다."
                keywords="유튜브 썸네일, 유튜브 이미지 다운, 썸네일 다운로드, youtube thumbnail"
            />

            <header className="text-center space-y-2">
                <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
                    <Youtube className="w-8 h-8 text-red-600" />
                    유튜브 썸네일 다운로더
                </h1>
                <p className="text-muted-foreground">
                    유튜브 동영상의 썸네일 이미지를 다운로드하세요
                </p>
            </header>

            {/* Input */}
            <form onSubmit={handleSubmit} className="bg-card border border-border rounded-xl p-6 space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-2">유튜브 URL</label>
                    <input
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="https://www.youtube.com/watch?v=..."
                        className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full px-6 py-3 bg-red-600 text-white rounded-lg font-bold hover:brightness-110 transition-all"
                >
                    썸네일 가져오기
                </button>
            </form>

            {/* Thumbnails */}
            {thumbnails.length > 0 && (
                <div className="space-y-4">
                    <h2 className="text-xl font-bold">다운로드 가능한 썸네일</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {thumbnails.map((thumb, idx) => (
                            <div key={idx} className="bg-card border border-border rounded-xl p-4 space-y-3">
                                <div className="aspect-video bg-secondary rounded-lg overflow-hidden">
                                    <img
                                        src={thumb.url}
                                        alt={`Thumbnail ${thumb.quality}`}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.nextSibling.style.display = 'flex';
                                        }}
                                    />
                                    <div className="hidden w-full h-full items-center justify-center text-muted-foreground text-sm">
                                        <ImageIcon className="w-8 h-8" />
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-bold">{thumb.quality}</p>
                                        <p className="text-xs text-muted-foreground">{thumb.size}</p>
                                    </div>
                                    <button
                                        onClick={() => downloadImage(thumb.url, thumb.quality)}
                                        className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:brightness-110 transition-all"
                                    >
                                        <Download className="w-4 h-4" />
                                        다운로드
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="bg-muted/30 rounded-xl p-6 text-sm text-muted-foreground">
                <h3 className="font-bold text-foreground mb-2">💡 사용 방법</h3>
                <ul className="space-y-1 list-disc list-inside">
                    <li>유튜브 동영상 URL을 복사하여 붙여넣으세요</li>
                    <li>다양한 해상도의 썸네일을 선택할 수 있습니다</li>
                    <li>최대 해상도는 1280×720 (일부 영상은 지원하지 않을 수 있음)</li>
                    <li>모든 공개 유튜브 동영상에서 작동합니다</li>
                </ul>
            </div>
        \n            <ToolGuide
                title="유튜브 썸네일"
                intro="유튜브 영상 썸네일 다운로드"
                steps={[
                    "원하시는 옵션이나 값을 화면에 안내된 순서대로 정확하게 기입해 주세요.",
                    "제시된 항목과 보기를 꼼꼼하게 살펴보고 본인에게 맞는 것을 선택합니다.",
                    "모든 입력을 완료한 후 결과 화면에서 계산된 수치나 분석된 내용을 확인합니다.",
                    "결과가 마음에 든다면 캡처하거나 공유하기 버튼을 눌러 지인들에게 공유해보세요!"
                ]}
                tips={[
                    "결과값이 예상과 다르다면 입력한 숫자나 단위를 한 번 더 확인해보는 것이 좋습니다.",
                    "제공되는 다양한 부가 옵션을 함께 활용하면 훨씬 구체적인 형태의 맞춤형 결과를 얻을 수 있습니다.",
                    "모바일과 데스크톱 환경 모두에 완벽하게 최적화되어 있으니 언제 어디서든 편리하게 이용해 보세요."
                ]}
                faqs={[
                    { "q": "이 도구들은 정말로 모두 무료인가요?", "a": "네! Tool Hive에서 제공하는 모든 도구 모음과 심리 테스트들은 가입 등의 번거로운 절차 없이 누구나 100% 무료로 무제한 사용할 수 있습니다." },
                    { "q": "제가 입력한 개인적인 정보 데이터가 서버에 남나요?", "a": "아니요, 사용자가 입력하는 이름, 숫자, 금액 등의 모든 데이터는 방문자의 기기 내 브라우저에서만 실시간으로 연산되며 어떠한 경우에도 외부 서버로 전송되거나 저장되지 않으므로 안심하셔도 됩니다." },
                    { "q": "버튼을 눌러도 반응이 없거나 에러가 생깁니다.", "a": "브라우저의 일시적인 캐시 문제일 수 있습니다. 키보드의 F5 버튼을 누르거나 새로고침을 진행한 후 다시 시도해 보시길 권장하며, 문제가 계속된다면 다른 브라우저 앱을 이용해 보세요." }
                ]}
            />
        </div>
    );
};

export default YoutubeThumbnail;
