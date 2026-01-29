import React from 'react';
import { useListingStore } from '../store/useListingStore';

export const CompletionBar = () => {
  const { brand, category, photos, size, condition, color } = useListingStore();

  const fields = [
    { id: 'photos', val: photos.length > 0 },
    { id: 'category', val: category },
    { id: 'brand', val: brand },
    { id: 'size', val: size },
    { id: 'condition', val: condition },
    { id: 'color', val: color }
  ];

  const completed = fields.filter(f => f.val).length;
  const percentage = Math.round((completed / fields.length) * 100);

  return (
    <div className="space-y-1.5 mb-6">
      <div className="flex justify-between items-end">
        <span className="text-[10px] font-bold uppercase tracking-wider text-vinted-gray-medium">Completamento Annuncio</span>
        <span className={`text-xs font-black ${percentage === 100 ? 'text-vinted-green' : 'text-vinted-teal'}`}>
          {percentage}%
        </span>
      </div>
      <div className="h-1.5 w-full bg-gray-100 dark:bg-vinted-gray-dark rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-500 ease-out ${percentage === 100 ? 'bg-vinted-green' : 'bg-vinted-teal'}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
