import React from 'react';

export interface TabItem<T extends string = string> {
  id: T;
  label: string;
  count?: number;
  icon?: React.ReactNode;
}

export interface TabsProps<T extends string = string> {
  tabs: TabItem<T>[];
  activeTab: T;
  onChange: (tabId: T) => void;
  className?: string;
}

export function Tabs<T extends string = string>({
  tabs,
  activeTab,
  onChange,
  className = '',
}: TabsProps<T>) {
  return (
    <div className={`flex items-center gap-1.5 p-1 bg-stone-100 dark:bg-stone-800/80 rounded-xl border border-stone-200/80 dark:border-stone-800 ${className}`}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`flex items-center gap-2 px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${
              isActive
                ? 'bg-white dark:bg-stone-900 text-amber-700 dark:text-amber-400 shadow-xs font-semibold'
                : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
            {typeof tab.count === 'number' && (
              <span
                className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                  isActive
                    ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                    : 'bg-stone-200 text-stone-700 dark:bg-stone-700 dark:text-stone-300'
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
