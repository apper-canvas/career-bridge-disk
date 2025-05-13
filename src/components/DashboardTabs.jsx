import React from 'react';

const DashboardTabs = ({ tabs, activeTab, onChange }) => {
  return (
    <div className="flex flex-col w-full">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={`
            flex items-center px-4 py-3 mb-1 rounded-lg transition-colors
            ${
              activeTab === tab.id
                ? 'bg-primary/10 text-primary font-medium'
                : 'hover:bg-surface-100 dark:hover:bg-surface-700 text-surface-700 dark:text-surface-300'
            }
          `}
        >
          <span className="mr-3">{tab.icon}</span>
          <span>{tab.label}</span>
          {tab.count !== undefined && (
            <span 
              className={`ml-auto px-2 py-0.5 rounded-full text-xs ${
                activeTab === tab.id
                  ? 'bg-primary/20 text-primary'
                  : 'bg-surface-200 dark:bg-surface-700 text-surface-700 dark:text-surface-400'
              }`}
            >
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

export default DashboardTabs;