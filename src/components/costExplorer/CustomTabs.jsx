import React, { useState } from 'react';
import { Menu, MenuItem, Button } from '@mui/material';
import { ChevronDown } from 'lucide-react';

const MAX_VISIBLE_TABS = 7;

const initialTabs = [
  'Compute',
  'Storage',
  'Networking',
  'Database',
  'AI/ML',
  'Security',
  'Monitoring',
  'Billing',
  'Support',
  'DevOps',
  'Analytics'
];

export default function CostExplorerTabs() {
  const [tabs, setTabs] = useState(initialTabs);
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  const openDropdown = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const closeDropdown = () => {
    setMenuAnchorEl(null);
  };

  const selectTab = (tab) => {
    setSelectedTab(tab);
  };

  const bringTabToFront = (tab) => {
    const reorderedTabs = [tab, ...tabs.filter((t) => t !== tab)];
    setTabs(reorderedTabs);
    setSelectedTab(tab);
    closeDropdown();
  };

  const visibleTabs = tabs.slice(0, MAX_VISIBLE_TABS);
  const hiddenTabs = tabs.slice(MAX_VISIBLE_TABS);

  return (
    <div className="flex items-center gap-2 px-6 py-4">
      {visibleTabs.map((tab) => (
        <button
          key={tab}
          onClick={() => selectTab(tab)}
          className={`px-4 py-2 rounded-lg border shadow-sm text-sm font-medium transform transition-all duration-300 hover:scale-105 hover:bg-blue-100 hover:text-blue-600 ${
            selectedTab === tab
              ? 'bg-blue-600 text-white border-blue-600 scale-105'
              : 'bg-white text-gray-800 border-gray-300'
          }`}
        >
          {tab}
        </button>
      ))}

      {hiddenTabs.length > 0 && (
        <div className="relative">
          <Button
            variant="outlined"
            onClick={openDropdown}
            className="ml-2 flex items-center gap-1 px-4 py-2 rounded-lg border border-gray-300 shadow-sm bg-white text-gray-800 hover:bg-blue-100 hover:text-blue-600 transition-all duration-300 hover:scale-105"
          >
            More <ChevronDown size={16} />
          </Button>
          <Menu
            anchorEl={menuAnchorEl}
            open={Boolean(menuAnchorEl)}
            onClose={closeDropdown}
          >
            {hiddenTabs.map((tab) => (
              <MenuItem key={tab} onClick={() => bringTabToFront(tab)}>
                {tab}
              </MenuItem>
            ))}
          </Menu>
        </div>
      )}
    </div>
  );
}
