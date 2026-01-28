import React from 'react';
import { useListingStore } from '../store/useListingStore';
import { ChevronLeft, MoreVertical, Heart, MessageCircle, Share2, ShieldCheck, User } from 'lucide-react';

export const VintedMockup = () => {
  const {
    photos, category, brand, size, condition, color,
    generatedTitle, suggestedPrice, generatedDescription
  } = useListingStore();

  const mainPhoto = photos.length > 0 ? photos[0].url : null;

  return (
    <div className="w-full max-w-[375px] mx-auto bg-white dark:bg-black rounded-[32px] border-[8px] border-vinted-gray-light dark:border-vinted-gray-dark shadow-2xl overflow-hidden aspect-[9/19] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-vinted-gray-dark">
        <ChevronLeft size={20} />
        <span className="text-xs font-bold uppercase">Dettagli Annuncio</span>
        <MoreVertical size={20} />
      </div>

      {/* Content Scrollable */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {/* Photo Carousel */}
        <div className="aspect-[3/4] bg-vinted-gray-light dark:bg-vinted-gray-dark relative">
          {mainPhoto ? (
            <img src={mainPhoto} alt="Mockup Main" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-vinted-gray-medium">
              Foto Anteprima
            </div>
          )}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
            {[...Array(Math.max(1, photos.length))].map((_, i) => (
              <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-white' : 'bg-white/40'}`} />
            ))}
          </div>
        </div>

        <div className="p-4 space-y-4">
          {/* Actions */}
          <div className="flex gap-4 text-vinted-gray-medium">
            <Heart size={20} />
            <MessageCircle size={20} />
            <Share2 size={20} />
          </div>

          {/* Title & Price */}
          <div className="space-y-1">
            <h1 className="text-xl font-medium leading-tight">
              {generatedTitle || brand || 'Titolo Annuncio'}
            </h1>
            <div className="text-2xl font-bold">
              €{suggestedPrice || '0.00'}
            </div>
            <div className="text-[11px] text-vinted-gray-medium">
              Spedizione: calcolata all'ordine
            </div>
          </div>

          <hr className="border-gray-100 dark:border-vinted-gray-dark" />

          {/* Specs */}
          <div className="space-y-3 py-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-vinted-gray-medium">Condizione</span>
              <span className="font-medium text-vinted-teal flex items-center gap-1">
                <ShieldCheck size={14} /> {condition || 'Da selezionare'}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-vinted-gray-medium">Categoria</span>
              <span className="font-medium">{category || 'Da selezionare'}</span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-vinted-gray-medium">Taglia / Colore</span>
              <span className="font-medium">{size || '-'} / {color || '-'}</span>
            </div>
          </div>

          <hr className="border-gray-100 dark:border-vinted-gray-dark" />

          {/* Description */}
          <div className="space-y-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-vinted-gray-medium">Descrizione</h2>
            <div className="text-sm leading-relaxed whitespace-pre-wrap">
              {generatedDescription || 'La descrizione apparirà qui...'}
            </div>
          </div>

          <hr className="border-gray-100 dark:border-vinted-gray-dark" />

          {/* Seller */}
          <div className="flex items-center gap-3 py-2">
            <div className="w-10 h-10 bg-vinted-gray-light dark:bg-vinted-gray-dark rounded-full flex items-center justify-center">
              <User size={20} className="text-vinted-gray-medium" />
            </div>
            <div>
              <div className="text-sm font-bold">@vinted_entrepreneur</div>
              <div className="text-xs text-yellow-500">★★★★★ (47)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="p-4 border-t border-gray-100 dark:border-vinted-gray-dark space-y-2">
        <button className="w-full btn-primary rounded-full py-3">AGGIUNGI AL CARRELLO</button>
        <button className="w-full btn-secondary rounded-full py-3 border border-gray-200 dark:border-vinted-gray-dark bg-transparent">INVIA OFFERTA</button>
      </div>
    </div>
  );
};
