import React, { useState } from 'react';
import { Share2, MessageCircle, Facebook, Twitter, Link2, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const ShareButtons = ({ title, description, url }) => {
    const [copied, setCopied] = useState(false);
    const { lang } = useLanguage();
    const isEn = lang === 'en';

    // Use current page URL if not provided
    const shareUrl = url || window.location.href;
    const shareTitle = title || document.title;
    const shareDescription = description || '';

    // Web Share API (Mobile/Supported Browsers)
    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: shareTitle,
                    text: shareDescription,
                    url: shareUrl,
                });
            } catch (err) {
                console.log('Share canceled or failed:', err);
            }
        } else {
            // Fallback for unsupported browsers (shouldn't happen if button is hidden, but good practice)
            handleCopyLink();
        }
    };

    // Facebook Share
    const handleFacebookShare = () => {
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        window.open(facebookUrl, '_blank', 'width=600,height=400');
    };

    // Twitter Share
    const handleTwitterShare = () => {
        const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`;
        window.open(twitterUrl, '_blank', 'width=600,height=400');
    };

    // Copy Link
    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const canShare = typeof navigator !== 'undefined' && !!navigator.share;

    return (
        <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Share2 className="w-4 h-4" />
                {isEn ? 'Share:' : '공유하기:'}
            </span>

            {/* Native Share (Mobile/Supported) */}
            {canShare && (
                <button
                    onClick={handleShare}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg text-sm font-medium transition-colors"
                    title={isEn ? 'Share' : '공유하기'}
                >
                    <Share2 className="w-4 h-4" />
                    <span className="hidden sm:inline">{isEn ? 'Share' : '공유'}</span>
                </button>
            )}

            {/* Desktop Fallbacks */}
            {!canShare && (
                <>
                    {/* Facebook */}
                    <button
                        onClick={handleFacebookShare}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
                        title={isEn ? 'Share on Facebook' : '페이스북으로 공유'}
                    >
                        <Facebook className="w-4 h-4" />
                        <span className="hidden sm:inline">{isEn ? 'FB' : '페북'}</span>
                    </button>

                    {/* Twitter */}
                    <button
                        onClick={handleTwitterShare}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-sky-500 hover:bg-sky-600 text-white rounded-lg text-sm font-medium transition-colors"
                        title={isEn ? 'Share on Twitter' : '트위터로 공유'}
                    >
                        <Twitter className="w-4 h-4" />
                        <span className="hidden sm:inline">{isEn ? 'Twitter' : '트위터'}</span>
                    </button>
                </>
            )}

            {/* Copy Link (Always visible) */}
            <button
                onClick={handleCopyLink}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${copied
                    ? 'bg-green-600 text-white'
                    : 'bg-muted hover:bg-muted/80 text-foreground'
                    }`}
                title={isEn ? 'Copy Link' : '링크 복사'}
            >
                {copied ? (
                    <>
                        <Check className="w-4 h-4" />
                        <span className="hidden sm:inline">{isEn ? 'Copied!' : '복사됨!'}</span>
                    </>
                ) : (
                    <>
                        <Link2 className="w-4 h-4" />
                        <span className="hidden sm:inline">{isEn ? 'Link' : '링크'}</span>
                    </>
                )}
            </button>
        </div>
    );
};


export default ShareButtons;
