import React from 'react';
import { HelpCircle, Lightbulb, MessageCircle, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

/**
 * ToolGuide Component
 * Beautiful SEO-optimized component for tool usage, tips, and FAQs.
 */
const ToolGuide = ({ title, intro, steps, tips, faqs }) => {
    const { lang } = useLanguage();
    const isEn = lang === 'en';

    return (
        <div className="mt-16 space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
            {/* Header Section */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 via-background to-secondary/5 border border-primary/10 p-8 md:p-12">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                <div className="relative z-10 max-w-2xl">
                    <h2 className="text-3xl font-black mb-4 text-foreground">
                        {title}
                    </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        {intro}
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* How to Use Section */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                            <HelpCircle size={24} />
                        </div>
                        <h3 className="text-xl font-bold">{isEn ? 'How to Use' : '사용 방법'}</h3>
                    </div>
                    <div className="space-y-4">
                        {steps.map((step, index) => (
                            <div key={index} className="flex gap-4 p-4 rounded-2xl bg-card border border-border hover:border-primary/30 transition-colors shadow-sm group">
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center font-bold text-sm group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                                    {index + 1}
                                </div>
                                <p className="text-muted-foreground leading-snug">{step}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Professional Tips Section */}
                <div className="space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-600">
                            <Lightbulb size={24} />
                        </div>
                        <h3 className="text-xl font-bold">{isEn ? 'Professional Tips' : '전문가 팁'}</h3>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                        {tips.map((tip, index) => (
                            <div key={index} className="p-5 rounded-2xl bg-amber-50/50 dark:bg-amber-900/10 border border-amber-200/50 dark:border-amber-800/30 flex gap-4 items-start">
                                <ArrowRight className="text-amber-500 mt-1 flex-shrink-0" size={18} />
                                <p className="text-sm text-amber-900/80 dark:text-amber-200/80 leading-relaxed font-medium">
                                    {tip}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* FAQ Section */}
            {faqs && faqs.length > 0 && (
                <div className="space-y-8 pt-4">
                    <div className="flex items-center gap-3 justify-center mb-2">
                        <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600">
                            <MessageCircle size={24} />
                        </div>
                        <h3 className="text-xl font-bold">{isEn ? 'Frequently Asked Questions (FAQ)' : '자주 묻는 질문 (FAQ)'}</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="p-6 rounded-2xl bg-muted/30 border border-border space-y-2">
                                <h4 className="font-bold text-foreground">Q. {faq.q}</h4>
                                <p className="text-sm text-muted-foreground">A. {faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ToolGuide;
