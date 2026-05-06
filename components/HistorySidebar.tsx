import React from 'react';
import { HistoryItem } from '../types';

interface HistorySidebarProps {
  history: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
  isOpen: boolean;
  onClose: () => void;
}

const HistorySidebar: React.FC<HistorySidebarProps> = ({ history, onSelect, isOpen, onClose }) => {
  return (
    <div className={`fixed inset-y-0 right-0 w-80 bg-panelBg border-l border-gray-800 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 z-50 shadow-2xl overflow-y-auto`}>
      <div className="p-4 border-b border-gray-800 flex justify-between items-center">
        <h2 className="text-neonGold text-lg font-bold">LỊCH SỬ LUẬN GIẢI</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-white">✕</button>
      </div>
      <div className="p-4 space-y-3">
        {history.length === 0 && <p className="text-gray-500 text-sm">Chưa có dữ liệu lịch sử.</p>}
        {history.map((item) => (
          <div 
            key={item.id} 
            onClick={() => onSelect(item)}
            className="p-3 bg-black border border-gray-800 rounded hover:border-neonBlue cursor-pointer transition-colors group"
          >
            <p className="text-xs text-gray-400 mb-1">{new Date(item.timestamp).toLocaleString()}</p>
            <p className="text-sm text-gray-200 line-clamp-2 group-hover:text-neonBlue">{item.preview}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistorySidebar;
