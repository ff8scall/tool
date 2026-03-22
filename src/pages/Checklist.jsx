import React, { useState } from 'react';
import { Plus, Trash2, Check } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';
import { useLanguage } from '../context/LanguageContext';

const Checklist = () => {
    const { lang } = useLanguage();
    const isEn = lang === 'en';
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState('');

    const addItem = () => {
        if (!newItem.trim()) return;
        setItems([...items, { id: Date.now(), text: newItem, completed: false }]);
        setNewItem('');
    };

    const toggleItem = (id) => {
        setItems(items.map(item =>
            item.id === id ? { ...item, completed: !item.completed } : item
        ));
    };

    const deleteItem = (id) => {
        setItems(items.filter(item => item.id !== id));
    };

    const clearCompleted = () => {
        setItems(items.filter(item => !item.completed));
    };

    const stats = {
        total: items.length,
        completed: items.filter(i => i.completed).length,
        remaining: items.filter(i => !i.completed).length
    };

    const toolFaqs = isEn ? [
        { q: "Is this data saved?", a: "No, this is a session-based checklist. If you refresh the page or close the browser, the list will be cleared." },
        { q: "Can I use this for complex projects?", a: "This tool is designed for quick, temporary task management. For long-term projects, we recommend a permanent task management app." },
        { q: "How many items can I add?", a: "There is no hard limit, but it works best for daily tasks (10-50 items)." }
    ] : [
        { "q": "이 도구들은 정말로 모두 무료인가요?", "a": "네! Tool Hive에서 제공하는 모든 도구 모음과 심리 테스트들은 가입 등의 번거로운 절차 없이 누구나 100% 무료로 무제한 사용할 수 있습니다." },
        { "q": "제가 입력한 개인적인 정보 데이터가 서버에 남나요?", "a": "아니요, 사용자의 데이터는 기기 내 브라우저에서만 운용되며 외부 서버로 전송되지 않습니다." },
        { "q": "버튼을 눌러도 반응이 없거나 에러가 생깁니다.", "a": "브라우저의 일시적인 캐시 문제일 수 있습니다. 새로고침을 진행한 후 다시 시도해 보시길 권장합니다." }
    ];

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <SEO
                title={isEn ? "Checklist - Simple Todo List Manager" : "체크리스트 - Utility Hub"}
                description={isEn ? "Manage your daily tasks with our simple, easy-to-use checklist tool." : "할 일 목록을 관리할 수 있는 간단한 체크리스트 도구입니다."}
                keywords={isEn ? "checklist, todo list, task manager, todo" : "체크리스트, 할일목록, TODO, 작업관리"}
                faqs={toolFaqs}
            />

            <header className="text-center space-y-2 py-4">
                <h1 className="text-3xl font-bold">{isEn ? 'Checklist' : '체크리스트'}</h1>
                <p className="text-muted-foreground">
                    {isEn ? 'Stay organized and track your daily tasks.' : '할 일을 체크하며 관리하세요'}
                </p>
            </header>

            {/* Stats */}
            {items.length > 0 && (
                <div className="flex gap-4 justify-center text-sm">
                    <div className="px-4 py-2 bg-secondary rounded-lg border border-border">
                        {isEn ? 'Total' : '전체'}: {stats.total}
                    </div>
                    <div className="px-4 py-2 bg-green-500/10 text-green-600 dark:text-green-400 rounded-lg border border-green-500/20">
                        {isEn ? 'Completed' : '완료'}: {stats.completed}
                    </div>
                    <div className="px-4 py-2 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-lg border border-blue-500/20">
                        {isEn ? 'Remaining' : '남음'}: {stats.remaining}
                    </div>
                </div>
            )}

            {/* Add Item */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={newItem}
                        onChange={(e) => setNewItem(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addItem()}
                        placeholder={isEn ? "Enter a new task..." : "새로운 할 일을 입력하세요..."}
                        className="flex-1 px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button
                        onClick={addItem}
                        disabled={!newItem.trim()}
                        className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:brightness-110 transition-all disabled:opacity-50 flex items-center gap-2 font-bold"
                    >
                        <Plus className="w-5 h-5" />
                        {isEn ? 'Add' : '추가'}
                    </button>
                </div>
            </div>

            {/* Items List */}
            {items.length > 0 && (
                <div className="bg-card border border-border rounded-xl p-6 space-y-3 shadow-sm">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg group border border-transparent hover:border-border transition-all"
                        >
                            <button
                                onClick={() => toggleItem(item.id)}
                                className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${item.completed
                                        ? 'bg-primary border-primary'
                                        : 'border-border hover:border-primary'
                                    }`}
                            >
                                {item.completed && <Check className="w-4 h-4 text-primary-foreground" />}
                            </button>
                            <span
                                className={`flex-1 transition-all ${item.completed
                                        ? 'line-through text-muted-foreground'
                                        : 'text-foreground font-medium'
                                    }`}
                            >
                                {item.text}
                            </span>
                            <button
                                onClick={() => deleteItem(item.id)}
                                className="p-2 text-red-500 hover:bg-red-500/10 rounded-md transition-colors sm:opacity-0 group-hover:opacity-100"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    ))}

                    {stats.completed > 0 && (
                        <button
                            onClick={clearCompleted}
                            className="w-full px-4 py-2 mt-4 text-sm text-muted-foreground hover:text-foreground hover:bg-muted border border-border rounded-lg transition-colors border-dashed"
                        >
                            {isEn ? 'Delete Completed Items' : '완료된 항목 삭제'}
                        </button>
                    )}
                </div>
            )}

            {items.length === 0 && (
                <div className="bg-card border border-border rounded-xl p-12 text-center text-muted-foreground border-dashed">
                    {isEn ? 'Add some tasks to get started!' : '할 일을 추가해보세요!'}
                </div>
            )}

            <div className="bg-muted/30 rounded-xl p-6 text-sm text-muted-foreground">
                <h3 className="font-bold text-foreground mb-2">{isEn ? '💡 Instructions' : '💡 사용 방법'}</h3>
                <ul className="space-y-1 list-disc list-inside">
                    {isEn ? (
                        <>
                            <li>Type your task and click "Add" or press Enter.</li>
                            <li>Toggle the checkbox to complete/uncomplete tasks.</li>
                            <li>Hover over a task to see the delete button.</li>
                            <li>Note: Refreshing the page will clear your current list.</li>
                        </>
                    ) : (
                        <>
                            <li>입력창에 할 일을 입력하고 "추가" 버튼을 클릭하거나 Enter 키를 누르세요.</li>
                            <li>체크박스를 클릭하여 완료 상태를 변경할 수 있습니다.</li>
                            <li>항목에 마우스를 올리면 삭제 버튼이 나타납니다.</li>
                            <li>브라우저를 새로고침하면 목록이 초기화됩니다. (세션 저장 방식)</li>
                        </>
                    )}
                </ul>
            </div>

            <ToolGuide
                title={isEn ? "Checklist Guide" : "체크리스트 가이드"}
                intro={isEn ? "A lightweight todo list manager for your quick daily tasks." : "간단한 할 일 목록 관리 도구입니다."}
                steps={isEn ? [
                    "Enter your task in the input field.",
                    "Click 'Add' or press Enter to add it to the list.",
                    "Check off tasks as you finish them.",
                    "Delete individual tasks or clear all completed ones at once."
                ] : [
                    "할 일을 입력창에 작성합니다.",
                    "추가 버튼을 눌러 목록에 넣습니다.",
                    "완료된 일은 체크박스를 눌러 완료 처리합니다.",
                    "다 끝난 일은 삭제하거나 완료된 항목 삭제 버튼으로 정리합니다."
                ]}
                tips={isEn ? [
                    "Break down big goals into smaller, manageable tasks.",
                    "Keep your list short and focused for better productivity.",
                    "Use this for quick 'at-the-moment' tasks that don't need a dedicated app."
                ] : [
                    "큰 목표를 작은 단위의 할 일로 쪼개서 관리하세요.",
                    "너무 많은 항목보다는 하루에 끝낼 수 있는 만큼만 기록하는 것이 좋습니다.",
                    "브라우저 탭을 열어두고 수시로 체크하며 오늘 할 일을 완수해보세요."
                ]}
                faqs={toolFaqs}
            />
        </div>
    );
};

export default Checklist;
