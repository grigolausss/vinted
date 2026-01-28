import React from 'react';
import { useListingStore } from '../store/useListingStore';
import { History, Copy, Clock, Search } from 'lucide-react';

export const HistoryPanel = () => {
  const { history } = useListingStore();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-wider text-vinted-gray-medium flex items-center gap-1.5">
          <History size={14} /> Cronologia Recente
        </h3>
        <div className="relative">
          <Search size={12} className="absolute left-2 top-1.5 text-vinted-gray-medium" />
          <input
            type="text"
            placeholder="Cerca..."
            className="bg-vinted-gray-light dark:bg-vinted-gray-dark border-none rounded-full pl-7 pr-3 py-1 text-[10px] w-24 focus:w-32 transition-all outline-none"
          />
        </div>
      </div>

      <div className="space-y-2">
        {history.length === 0 ? (
          <div className="text-[11px] text-vinted-gray-medium italic p-4 text-center">
            Nessun annuncio salvato.
          </div>
        ) : (
          history.map((item) => (
            <div key={item.id} className="p-3 bg-white dark:bg-vinted-gray-dark border border-gray-100 dark:border-vinted-gray-dark rounded-apple hover:border-vinted-teal transition-colors group">
              <div className="flex justify-between items-start gap-2">
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-bold truncate">{item.title}</div>
                  <div className="text-[10px] text-vinted-gray-medium flex items-center gap-1 mt-0.5">
                    <Clock size={10} /> {new Date(item.date).toLocaleDateString()} | €{item.price}
                  </div>
                </div>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-vinted-teal">
                  <Copy size={12} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
