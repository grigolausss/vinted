import React, { useState } from 'react';
import { useListingStore } from '../store/useListingStore';
import { Copy, Check, Save, Download, Plus, AlertTriangle, TrendingUp } from 'lucide-react';
import { exportToJSON, exportToCSV } from '../lib/exporter';

export const OutputPanel = () => {
  const state = useListingStore();
  const {
    generatedTitle, generatedDescription, generatedKeywords,
    suggestedPrice, brand, category, photos, resetForm, analysisLayers
  } = state;

  const searchLayer = analysisLayers.search || {};

  const [copyStatus, setCopyStatus] = useState({ title: false, desc: false, all: false });

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopyStatus({ ...copyStatus, [key]: true });
    setTimeout(() => setCopyStatus({ ...copyStatus, [key]: false }), 2000);
  };

  const isReady = brand && category && photos.length > 0;

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold flex items-center gap-2">
          Annuncio Pronto <div className={`w-2 h-2 rounded-full ${isReady ? 'bg-vinted-green' : 'bg-gray-300'}`} />
        </h2>
      </div>

      {!isReady ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-vinted-gray-light dark:bg-vinted-gray-dark rounded-apple-lg border border-dashed border-gray-200 dark:border-vinted-gray-dark">
          <AlertTriangle className="text-vinted-gray-medium mb-3" size={32} />
          <p className="text-sm font-medium">Completa i dati obbligatori</p>
          <p className="text-xs text-vinted-gray-medium mt-1">Carica almeno una foto, brand e categoria per generare l'annuncio.</p>
        </div>
      ) : (
        <div className="flex-1 space-y-6 overflow-y-auto no-scrollbar pr-2">
          {/* Title Output */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-bold uppercase tracking-widest text-vinted-gray-medium">Titolo Consigliato</label>
              <button
                onClick={() => handleCopy(generatedTitle, 'title')}
                className="text-[10px] text-vinted-teal flex items-center gap-1 hover:underline"
              >
                {copyStatus.title ? <Check size={10} /> : <Copy size={10} />}
                {copyStatus.title ? 'Copiato' : 'Copia'}
              </button>
            </div>
            <div className="p-3 bg-white dark:bg-vinted-gray-dark border border-gray-100 dark:border-vinted-gray-dark rounded-apple font-medium text-sm">
              {generatedTitle || 'In attesa di generazione...'}
            </div>
          </div>

          {/* Description Output */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-bold uppercase tracking-widest text-vinted-gray-medium">Descrizione Completa</label>
              <button
                onClick={() => handleCopy(generatedDescription, 'desc')}
                className="text-[10px] text-vinted-teal flex items-center gap-1 hover:underline"
              >
                {copyStatus.desc ? <Check size={10} /> : <Copy size={10} />}
                {copyStatus.desc ? 'Copiato' : 'Copia'}
              </button>
            </div>
            <div className="p-3 bg-white dark:bg-vinted-gray-dark border border-gray-100 dark:border-vinted-gray-dark rounded-apple text-xs leading-relaxed min-h-[150px] whitespace-pre-wrap">
              {generatedDescription || 'La descrizione automatica apparirà qui dopo la generazione...'}
            </div>
          </div>

          {/* Keywords */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-vinted-gray-medium">Keywords Naturali</label>
            <div className="flex flex-wrap gap-1.5">
              {generatedKeywords.map((kw, i) => (
                <span key={i} className="text-[10px] bg-vinted-teal/10 text-vinted-teal px-2 py-0.5 rounded-full">
                  #{kw}
                </span>
              ))}
              {generatedKeywords.length === 0 && <span className="text-[10px] text-vinted-gray-medium italic">Nessuna keyword generata</span>}
            </div>
          </div>

          {/* Pricing Analysis */}
          <div className="p-4 bg-vinted-teal/5 border border-vinted-teal/10 rounded-apple-lg space-y-3">
            <div className="flex items-center justify-between text-vinted-teal">
              <div className="flex items-center gap-2">
                <TrendingUp size={16} />
                <span className="text-sm font-bold">Analisi Prezzo</span>
              </div>
              {searchLayer.status === 'complete' && searchLayer.extra?.verified && (
                <span className="text-[9px] font-black uppercase bg-vinted-teal text-white px-1.5 py-0.5 rounded">Verified Market Data</span>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-[10px] text-vinted-gray-medium">Suggerito</div>
                <div className="text-xl font-bold">€{suggestedPrice || '--'}</div>
              </div>
              <div>
                <div className="text-[10px] text-vinted-gray-medium">Floor (Min)</div>
                <div className="text-lg font-semibold text-vinted-gray-medium">€{suggestedPrice ? (suggestedPrice * 0.8).toFixed(0) : '--'}</div>
              </div>
            </div>
          </div>

          {/* Main Actions */}
          <div className="space-y-3 pt-4">
            <button
              onClick={() => handleCopy(`${generatedTitle}\n\n${generatedDescription}`, 'all')}
              className="w-full btn-primary py-4 flex items-center justify-center gap-2 text-lg"
            >
              {copyStatus.all ? <Check size={20} /> : <Copy size={20} />}
              {copyStatus.all ? 'ANNUNCIO COPIATO!' : 'COPIA ANNUNCIO COMPLETO'}
            </button>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => exportToJSON(state)}
                className="flex items-center justify-center gap-2 py-2 px-4 bg-vinted-gray-light dark:bg-vinted-gray-dark rounded-apple text-xs font-medium hover:bg-gray-200 transition-colors"
              >
                <Save size={14} /> SALVA JSON
              </button>
              <button
                onClick={() => exportToCSV(state)}
                className="flex items-center justify-center gap-2 py-2 px-4 bg-vinted-gray-light dark:bg-vinted-gray-dark rounded-apple text-xs font-medium hover:bg-gray-200 transition-colors"
              >
                <Download size={14} /> ESPORTA CSV
              </button>
            </div>
          </div>

          <button
            onClick={() => resetForm()}
            className="w-full mt-6 py-4 border-2 border-vinted-teal text-vinted-teal rounded-apple-lg font-bold flex items-center justify-center gap-2 hover:bg-vinted-teal/5 transition-colors"
          >
            <Plus size={20} /> NUOVO ANNUNCIO
          </button>
        </div>
      )}
    </div>
  );
};
