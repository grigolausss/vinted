import React from 'react';
import { useListingStore } from '../store/useListingStore';
import { Sliders, Smile, MessageSquare, Globe, RefreshCcw } from 'lucide-react';

export const PreferencesSection = () => {
  const {
    descriptionStyle,
    emojiLevel,
    offerPolicy,
    outputLanguage,
    variationActive,
    setField
  } = useListingStore();

  return (
    <div className="bg-white dark:bg-vinted-gray-dark/50 border border-gray-100 dark:border-vinted-gray-dark rounded-apple-lg p-5 space-y-4 shadow-apple mt-4">
      <div className="flex items-center gap-2 mb-2">
        <Sliders className="text-vinted-teal" size={18} />
        <h3 className="text-sm font-bold uppercase tracking-widest">Preferenze Output</h3>
      </div>

      <div className="space-y-4">
        {/* Style Selection */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-vinted-gray-medium uppercase flex items-center gap-1.5">
            <MessageSquare size={12} /> Stile Descrizione
          </label>
          <div className="grid grid-cols-3 gap-1">
            {['Umano', 'Secco', 'Misto'].map((style, idx) => (
              <button
                key={style}
                onClick={() => setField('descriptionStyle', idx)}
                className={`text-[10px] py-1.5 rounded-apple transition-all font-medium ${
                  descriptionStyle === idx
                  ? 'bg-vinted-teal text-white shadow-sm'
                  : 'bg-gray-100 dark:bg-vinted-gray-dark text-vinted-gray-medium hover:bg-gray-200'
                }`}
              >
                {style}
              </button>
            ))}
          </div>
        </div>

        {/* Emoji Selection */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-vinted-gray-medium uppercase flex items-center gap-1.5">
            <Smile size={12} /> Livello Emoji
          </label>
          <div className="grid grid-cols-4 gap-1">
            {['No', 'Min', 'Med', 'Max'].map((level, idx) => (
              <button
                key={level}
                onClick={() => setField('emojiLevel', idx)}
                className={`text-[10px] py-1.5 rounded-apple transition-all font-medium ${
                  emojiLevel === idx
                  ? 'bg-vinted-teal text-white shadow-sm'
                  : 'bg-gray-100 dark:bg-vinted-gray-dark text-vinted-gray-medium hover:bg-gray-200'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        {/* Offer Policy */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-vinted-gray-medium uppercase flex items-center gap-1.5">
            <Sliders size={12} /> Politica Offerte
          </label>
          <div className="grid grid-cols-4 gap-1">
            {['-10%', '-15%', '-20%', 'Negoz'].map((pol) => (
              <button
                key={pol}
                onClick={() => setField('offerPolicy', pol)}
                className={`text-[10px] py-1.5 rounded-apple transition-all font-medium ${
                  offerPolicy === pol
                  ? 'bg-vinted-teal text-white shadow-sm'
                  : 'bg-gray-100 dark:bg-vinted-gray-dark text-vinted-gray-medium hover:bg-gray-200'
                }`}
              >
                {pol}
              </button>
            ))}
          </div>
        </div>

        {/* Language */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-vinted-gray-medium uppercase flex items-center gap-1.5">
            <Globe size={12} /> Lingua Output
          </label>
          <select
            value={outputLanguage}
            onChange={(e) => setField('outputLanguage', e.target.value)}
            className="w-full bg-gray-100 dark:bg-vinted-gray-dark border-none rounded-apple py-2 px-3 text-[11px] font-medium focus:ring-1 focus:ring-vinted-teal"
          >
            <option value="it">Italiano</option>
            <option value="en">English</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
            <option value="es">Español</option>
          </select>
        </div>

        {/* Variation Toggle */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-vinted-gray-dark">
          <div className="flex items-center gap-2">
            <RefreshCcw className={variationActive ? "text-vinted-teal" : "text-vinted-gray-medium"} size={14} />
            <div className="flex flex-col">
              <span className="text-[11px] font-bold">Variazione Stile (Anti-Bot)</span>
              <span className="text-[9px] text-vinted-gray-medium leading-tight">Randomizza keywords e toni</span>
            </div>
          </div>
          <button
            onClick={() => setField('variationActive', !variationActive)}
            className={`w-10 h-5 rounded-full relative transition-colors ${variationActive ? 'bg-vinted-teal' : 'bg-gray-300'}`}
          >
            <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${variationActive ? 'right-1' : 'left-1'}`} />
          </button>
        </div>
      </div>
    </div>
  );
};
