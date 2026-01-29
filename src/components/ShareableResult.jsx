import React, { useRef } from 'react';
import { Download, Share2, RefreshCw } from 'lucide-react';
import useShareCanvas from '../hooks/useShareCanvas';

const ShareableResult = ({ className = '', children, title = '테스트 결과', onRestart, restartLabel = '다시 하기' }) => {
    const captureRef = useRef(null);
    const { shareCanvas } = useShareCanvas();

    const handleShare = () => {
        shareCanvas(captureRef.current, title);
    };

    return (
        <div className={`space-y-10 ${className}`}>
            {/* Capture Area */}
            <div
                ref={captureRef}
                className="bg-white border-[12px] border-slate-50 rounded-[3rem] overflow-hidden relative shadow-2xl"
            >
                <div className="p-8 md:p-12">
                    {children}
                </div>

                {/* Watermark Footer (Visible in capture) */}
                <div className="bg-slate-100/50 p-8 border-t border-slate-100 flex flex-col items-center justify-center text-center">
                    <div className="text-2xl font-black text-slate-300 tracking-[0.5em] uppercase mb-3">TOOL HIVE</div>
                    <div className="text-sm text-slate-400 font-bold opacity-70 tracking-widest uppercase">
                        {window.location.host}
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4 no-print">
                <button
                    onClick={handleShare}
                    className="flex items-center gap-3 px-8 py-4 bg-indigo-600 text-white rounded-full font-black text-lg hover:scale-105 active:scale-95 transition-all shadow-xl shadow-indigo-600/20"
                >
                    <Download className="w-5 h-5" />
                    <span className="hidden sm:inline">결과 카드 저장</span>
                    <span className="sm:hidden">저장</span>
                </button>

                <button
                    onClick={() => {
                        // Native share if supported for link, otherwise just copy link
                        if (navigator.share) {
                            navigator.share({ title, text: `[Tool Hive] ${title}`, url: window.location.href });
                        } else {
                            navigator.clipboard.writeText(window.location.href);
                            alert('링크가 클립보드에 복사되었습니다!');
                        }
                    }}
                    className="flex items-center gap-3 px-8 py-4 bg-white text-slate-700 rounded-full font-black text-lg hover:scale-105 transition-all border-4 border-slate-50 shadow-lg"
                >
                    <Share2 className="w-5 h-5" />
                    <span className="hidden sm:inline">결과 공유하기</span>
                    <span className="sm:hidden">공유</span>
                </button>

                {onRestart && (
                    <button
                        onClick={onRestart}
                        className="flex items-center gap-3 px-8 py-4 bg-slate-100 text-slate-400 rounded-full font-black text-lg hover:scale-105 transition-all hover:text-indigo-600 hover:bg-slate-200"
                    >
                        <RefreshCw className="w-5 h-5" />
                        <span>{restartLabel}</span>
                    </button>
                )}
            </div>
        </div>
    );
};

export default ShareableResult;
