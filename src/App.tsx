import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Trash2, Code2, Play, Package, IndianRupee, ArrowDownAZ } from 'lucide-react';

interface Item {
  id: number;
  name: string;
  price: number;
}

const INITIAL_ITEMS: Item[] = [
  { id: 101, name: 'Milk', price: 50 },
  { id: 102, name: 'Bread', price: 25 },
  { id: 103, name: 'Eggs', price: 60 },
  { id: 104, name: 'Butter', price: 42 },
];

const CPP_CODE = `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

struct Item {
    int id;
    string name;
    float price;
};

int main() {
    vector<Item> items = {
        {101, "Milk", 50},
        {102, "Bread", 25},
        {103, "Eggs", 60},
        {104, "Butter", 42}
    };

    // Sort items by price (ascending ₹)
    // Tie-break using name
    sort(items.begin(), items.end(), [](Item a, Item b) {
        if (a.price == b.price)
            return a.name < b.name;
        return a.price < b.price;
    });

    for (auto &i : items) {
        cout << i.name << " ₹" << i.price << endl;
    }

    return 0;
}`;

export default function App() {
  const [items, setItems] = useState<Item[]>(INITIAL_ITEMS);
  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [nextId, setNextId] = useState(105);
  const [activeTab, setActiveTab] = useState<'app' | 'code'>('app');

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      if (a.price === b.price) {
        return a.name.localeCompare(b.name);
      }
      return a.price - b.price;
    });
  }, [items]);

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newPrice) return;

    setItems((prev) => [
      ...prev,
      {
        id: nextId,
        name: newName.trim(),
        price: parseFloat(newPrice),
      },
    ]);
    setNextId((prev) => prev + 1);
    setNewName('');
    setNewPrice('');
  };

  const handleRemoveItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans selection:bg-indigo-200 flex flex-col">
      {/* Header */}
      <header className="h-auto sm:h-20 bg-white border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between px-6 sm:px-8 py-4 sm:py-0 shrink-0 gap-4">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-sm shrink-0">
            <span className="text-white font-bold text-sm">⚡</span>
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-bold text-slate-800 tracking-tight">
                Smart Inventory Sorter
              </h1>
              <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100 hidden sm:inline-block">C++ CORE v1.0</span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Sorting implementation inspired by <code className="font-mono text-indigo-500">std::sort</code>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:block text-right">
            <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">System Status</p>
            <p className="text-xs font-medium text-emerald-500 flex items-center gap-1 justify-end">● Optimized & Active</p>
          </div>
          <div className="flex bg-slate-100 p-1 rounded-xl shrink-0 border border-slate-200">
            <button
              onClick={() => setActiveTab('app')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 uppercase tracking-wide ${
                activeTab === 'app'
                  ? 'bg-white text-indigo-600 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <Play className="w-3.5 h-3.5" />
              Web App
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 uppercase tracking-wide ${
                activeTab === 'code'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              C++ Source
            </button>
          </div>
        </div>
      </header>

      <div className="flex-grow w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 flex flex-col">
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            {activeTab === 'app' ? (
              <motion.div
                key="app"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="grid lg:grid-cols-12 gap-8"
              >
                {/* Left Column: Form & Info */}
                <div className="lg:col-span-4 space-y-6">
                  <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                    <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                      <Plus className="w-4 h-4 text-indigo-500" />
                      Add New Item
                    </h2>
                    <form onSubmit={handleAddItem} className="space-y-4">
                      <div>
                        <label htmlFor="name" className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                          Item Name
                        </label>
                        <input
                          id="name"
                          type="text"
                          value={newName}
                          onChange={(e) => setNewName(e.target.value)}
                          placeholder="e.g. Apples"
                          className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none placeholder:text-slate-400"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="price" className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">
                          Price (₹)
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <span className="text-slate-400 text-sm">₹</span>
                          </div>
                          <input
                            id="price"
                            type="number"
                            min="0"
                            step="0.01"
                            value={newPrice}
                            onChange={(e) => setNewPrice(e.target.value)}
                            placeholder="0.00"
                            className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none placeholder:text-slate-400"
                            required
                          />
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-slate-800 hover:bg-slate-900 text-white text-sm font-bold tracking-wide py-2.5 rounded-xl transition-colors mt-2"
                      >
                        Add to Inventory
                      </button>
                    </form>
                  </div>

                  <div className="p-5 bg-white rounded-2xl shadow-sm border border-slate-200">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                       Sorting Logic
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded bg-slate-100 flex items-center justify-center text-xs text-slate-500 font-mono">01</div>
                        <p className="text-sm text-slate-600">Primary: <span className="font-bold">Price (₹)</span></p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded bg-slate-100 flex items-center justify-center text-xs text-slate-500 font-mono">02</div>
                        <p className="text-sm text-slate-600">Tie-break: <span className="font-bold">Item Name</span></p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded bg-slate-100 flex items-center justify-center text-xs text-slate-500 font-mono">03</div>
                        <p className="text-sm text-slate-600">Algo: <span className="font-bold font-mono text-indigo-500 mb-0">std::sort</span></p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column: Inventory List */}
                <div className="lg:col-span-8 flex flex-col gap-6">
                  {/* Top Analytics Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Total Items</p>
                      <p className="text-3xl font-bold text-slate-800">{sortedItems.length}</p>
                    </div>
                    <div className="bg-emerald-600 p-5 rounded-2xl shadow-sm flex flex-col justify-center">
                      <p className="text-xs font-semibold text-emerald-100 uppercase tracking-wider mb-1">Ready for Billing</p>
                      <p className="text-3xl font-bold text-white tracking-tight">Instant</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col flex-1 overflow-hidden min-h-[400px]">
                    <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                      <h2 className="font-bold text-slate-700 flex items-center gap-2">
                        Sorted Inventory View
                      </h2>
                      <div className="flex gap-2">
                        <span className="px-3 py-1 bg-white border border-slate-200 rounded text-xs font-medium text-slate-600 hidden sm:inline-block">ID</span>
                        <span className="px-3 py-1 bg-indigo-600 text-white rounded text-xs font-medium">Price (Asc)</span>
                        <span className="px-3 py-1 bg-white border border-slate-200 rounded text-xs font-medium text-slate-600 hidden sm:inline-block">Name</span>
                      </div>
                    </div>

                    <div className="p-4 flex-1 relative overflow-auto">
                      {sortedItems.length === 0 ? (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400">
                          <Package className="w-10 h-10 mb-3 text-slate-300" />
                          <p className="text-sm font-medium">Inventory is empty.</p>
                        </div>
                      ) : (
                        <div className="w-full min-w-[500px]">
                          <div className="grid grid-cols-12 text-[11px] text-slate-400 uppercase font-bold tracking-widest border-b border-slate-100 pb-3 mb-2 px-4 gap-4">
                            <div className="col-span-5">Item Name</div>
                            <div className="col-span-3 text-left">Item ID</div>
                            <div className="col-span-3 text-left">Price</div>
                            <div className="col-span-1 text-right"></div>
                          </div>
                          <ul className="space-y-1">
                            <AnimatePresence>
                              {sortedItems.map((item, index) => (
                                <motion.li
                                  layout
                                  initial={{ opacity: 0, y: 5 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  exit={{ opacity: 0, scale: 0.95 }}
                                  transition={{ duration: 0.2 }}
                                  key={item.id}
                                  className="group grid grid-cols-12 items-center px-4 py-3 border-b border-slate-50 hover:bg-slate-50/80 transition-colors gap-4"
                                >
                                  <div className="col-span-5 flex items-center gap-3 overflow-hidden">
                                    <div className="w-6 h-6 shrink-0 rounded bg-indigo-50 text-indigo-600 flex items-center justify-center text-[10px] font-bold font-mono">
                                      {(index + 1).toString().padStart(2, '0')}
                                    </div>
                                    <span className="font-semibold text-slate-700 text-sm truncate">{item.name}</span>
                                  </div>
                                  <div className="col-span-3 text-left text-slate-400 font-mono text-sm">
                                    #{item.id}
                                  </div>
                                  <div className="col-span-3 text-left font-bold text-slate-800 text-sm">
                                    ₹{item.price.toFixed(2)}
                                  </div>
                                  <div className="col-span-1 flex justify-end">
                                    <button
                                      onClick={() => handleRemoveItem(item.id)}
                                      className="p-1 px-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-red-200 opacity-0 group-hover:opacity-100"
                                      aria-label="Remove item"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                </motion.li>
                              ))}
                            </AnimatePresence>
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="code"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="bg-[#1E293B] rounded-2xl overflow-hidden shadow-xl relative border border-slate-700"
              >
                <div className="flex items-center px-4 py-3 bg-slate-900/50 border-b border-slate-700/50 flex-shrink-0">
                  <div className="flex gap-2 mr-4">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-xs text-slate-400 font-mono">main.cpp snippet</span>
                </div>
                <pre className="p-6 overflow-x-auto text-[13px] leading-relaxed">
                  <code className="font-mono text-slate-300">
                    {CPP_CODE.split('\\n').map((line, i) => (
                      <div key={i} className="table-row hover:bg-white/5 transition-colors">
                        <span className="table-cell w-12 text-gray-600 text-right pr-4 select-none mr-2">
                          {i + 1}
                        </span>
                        <span className="table-cell text-[#d4d4d4]">
                          {line.includes('#include') ? (
                            <span className="text-[#c586c0]">{line.split(' ')[0]} <span className="text-[#ce9178]">{line.split(' ')[1]}</span></span>
                          ) : line.includes('using namespace') ? (
                            <span className="text-[#c586c0]">using namespace <span className="text-[#4ec9b0]">std</span>;</span>
                          ) : line.includes('struct') || line.includes('int') || line.includes('float') || line.includes('string') || line.includes('vector') || line.includes('auto') ? (
                            <span className="text-[#569cd6]">{line}</span>
                          ) : line.includes('//') ? (
                            <span className="text-[#6a9955]">{line}</span>
                          ) : (
                            line
                          )}
                        </span>
                      </div>
                    ))}
                  </code>
                </pre>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
