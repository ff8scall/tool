import React, { useState } from 'react';
import { Plus, Trash2, Check } from 'lucide-react';
import SEO from '../components/SEO';
import ToolGuide from '../components/ToolGuide';

const Checklist = () => {
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

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <SEO
                title="체크리스트 - Utility Hub"
                description="할 일 목록을 관리할 수 있는 간단한 체크리스트 도구입니다."
                keywords="체크리스트, 할일목록, TODO, 작업관리"
            />

            <header className="text-center space-y-2">
                <h1 className="text-3xl font-bold">체크리스트</h1>
                <p className="text-muted-foreground">
                    할 일을 체크하며 관리하세요
                </p>
            </header>

            {/* Stats */}
            {items.length > 0 && (
                <div className="flex gap-4 justify-center text-sm">
                    <div className="px-4 py-2 bg-secondary rounded-lg">
                        전체: {stats.total}
                    </div>
                    <div className="px-4 py-2 bg-green-500/20 text-green-600 dark:text-green-400 rounded-lg">
                        완료: {stats.completed}
                    </div>
                    <div className="px-4 py-2 bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-lg">
                        남음: {stats.remaining}
                    </div>
                </div>
            )}

            {/* Add Item */}
            <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={newItem}
                        onChange={(e) => setNewItem(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addItem()}
                        placeholder="새로운 할 일을 입력하세요..."
                        className="flex-1 px-4 py-3 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button
                        onClick={addItem}
                        disabled={!newItem.trim()}
                        className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:brightness-110 transition-all disabled:opacity-50 flex items-center gap-2"
                    >
                        <Plus className="w-5 h-5" />
                        추가
                    </button>
                </div>
            </div>

            {/* Items List */}
            {items.length > 0 && (
                <div className="bg-card border border-border rounded-xl p-6 space-y-3">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center gap-3 p-3 bg-secondary rounded-lg group"
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
                                className={`flex-1 ${item.completed
                                        ? 'line-through text-muted-foreground'
                                        : ''
                                    }`}
                            >
                                {item.text}
                            </span>
                            <button
                                onClick={() => deleteItem(item.id)}
                                className="p-2 text-red-500 hover:bg-red-500/10 rounded-md transition-colors opacity-0 group-hover:opacity-100"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    ))}

                    {stats.completed > 0 && (
                        <button
                            onClick={clearCompleted}
                            className="w-full px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent rounded-lg transition-colors"
                        >
                            완료된 항목 삭제
                        </button>
                    )}
                </div>
            )}

            {items.length === 0 && (
                <div className="bg-card border border-border rounded-xl p-12 text-center text-muted-foreground">
                    할 일을 추가해보세요!
                </div>
            )}

            <div className="bg-muted/30 rounded-xl p-6 text-sm text-muted-foreground">
                <h3 className="font-bold text-foreground mb-2">💡 사용 방법</h3>
                <ul className="space-y-1 list-disc list-inside">
                    <li>입력창에 할 일을 입력하고 "추가" 버튼을 클릭하거나 Enter 키를 누르세요.</li>
                    <li>체크박스를 클릭하여 완료 상태를 변경할 수 있습니다.</li>
                    <li>항목에 마우스를 올리면 삭제 버튼이 나타납니다.</li>
                    <li>브라우저를 새로고침하면 목록이 초기화됩니다.</li>
                </ul>
            </div>
        \n            <ToolGuide
                title="체크리스트"
                intro="간단한 할 일 목록"
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

export default Checklist;
