import React from 'react';
import { useListingStore } from '../store/useListingStore';
import { Loader2, CheckCircle2, Search, Zap, ShieldCheck, Camera, Layers, Activity } from 'lucide-react';

const LAYER_ICONS = {
  object: <Layers size={14} />,
  color: <Zap size={14} />,
  material: <Activity size={14} />,
  condition: <CheckCircle2 size={14} />,
  size: <Camera size={14} />,
  construction: <ShieldCheck size={14} />,
  authenticity: <ShieldCheck size={14} />,
  search: <Search size={14} />,
};

const LAYER_LABELS = {
  object: 'Identificazione Oggetto',
  color: 'Colore Accurato',
  material: 'Materiale & Composizione',
  condition: 'Condizione Dettagliata',
  size: 'Taglia (Etichetta + Inferenza)',
  construction: 'Dettagli Costruttivi',
  authenticity: 'Autenticità & Brand Verification',
  search: 'Ricerca Online & Market Data',
};

export const AnalysisProgress = () => {
  const { analysisLayers, isAnalyzing } = useListingStore();

  if (!isAnalyzing && Object.values(analysisLayers).every(l => l.status === 'idle')) return null;

  return (
    <div className="bg-white dark:bg-vinted-gray-dark/50 border border-gray-100 dark:border-vinted-gray-dark rounded-apple-lg p-5 space-y-4 shadow-apple">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold flex items-center gap-2">
          {isAnalyzing ? (
            <>
              <Loader2 className="animate-spin text-vinted-teal" size={18} />
              Analisi Profonda in corso...
            </>
          ) : (
            <>
              <CheckCircle2 className="text-vinted-green" size={18} />
              Analisi Completata
            </>
          )}
        </h3>
        <span className="text-[10px] text-vinted-gray-medium font-mono uppercase tracking-widest">
          {Object.values(analysisLayers).filter(l => l.status === 'complete').length}/8 Layers
        </span>
      </div>

      <div className="space-y-2.5">
        {Object.entries(analysisLayers).map(([key, layer]) => (
          <div key={key} className="flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-2.5">
              <div className={`p-1 rounded ${
                layer.status === 'complete' ? 'bg-vinted-green/10 text-vinted-green' :
                layer.status === 'analyzing' ? 'bg-vinted-teal/10 text-vinted-teal' : 'bg-gray-100 dark:bg-vinted-gray-dark text-vinted-gray-medium'
              }`}>
                {layer.status === 'analyzing' ? <Loader2 className="animate-spin" size={14} /> : LAYER_ICONS[key]}
              </div>
              <span className={layer.status === 'complete' ? 'font-medium' : 'text-vinted-gray-medium'}>
                {LAYER_LABELS[key]}
              </span>
            </div>
            {layer.status === 'complete' && (
              <div className="flex items-center gap-1.5 font-bold text-vinted-green">
                <span className="text-[9px] opacity-70">{(layer.confidence * 100).toFixed(0)}%</span>
                <CheckCircle2 size={12} />
              </div>
            )}
          </div>
        ))}
      </div>

      {isAnalyzing && (
        <p className="text-[10px] text-vinted-gray-medium text-center italic">
          Esamino ogni layer per garantire la massima accuratezza...
        </p>
      )}
    </div>
  );
};

export const AnalysisSummary = () => {
  const { analysisLayers, isAnalyzing, resetAnalysis } = useListingStore();
  const isComplete = Object.values(analysisLayers).every(l => l.status === 'complete');

  if (isAnalyzing || !isComplete) return null;

  const avgConfidence = (Object.values(analysisLayers).reduce((a, b) => a + b.confidence, 0) / 8 * 100).toFixed(0);

  return (
    <div className="bg-vinted-teal/5 border border-vinted-teal/20 rounded-apple-lg p-5 space-y-4 animate-in fade-in zoom-in-95 duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ShieldCheck className="text-vinted-teal" size={20} />
          <h3 className="font-bold text-sm">Summary Analisi Profonda</h3>
        </div>
        <div className="bg-vinted-teal text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
          HIGH CONFIDENCE {avgConfidence}%
        </div>
      </div>

      <div className="grid grid-cols-1 gap-1.5 text-[11px]">
        <div className="flex justify-between p-2 bg-white dark:bg-vinted-gray-dark rounded border border-vinted-teal/10">
          <span className="text-vinted-gray-medium italic">Identificazione:</span>
          <span className="font-bold">{analysisLayers.object.result}</span>
        </div>
        <div className="flex justify-between p-2 bg-white dark:bg-vinted-gray-dark rounded border border-vinted-teal/10">
          <span className="text-vinted-gray-medium italic">Vinted Market Data:</span>
          <span className="font-bold">Media {analysisLayers.search.extra.marketAvg}€ ({analysisLayers.search.extra.comparables.length} venduti)</span>
        </div>
      </div>

      <div className="flex gap-2">
        <button className="flex-1 btn-primary text-xs py-2 shadow-sm">
          ACCETTA DATI
        </button>
        <button
          onClick={resetAnalysis}
          className="flex-1 btn-secondary text-xs py-2 bg-transparent border border-vinted-gray-medium/20"
        >
          RIANALIZZA
        </button>
      </div>
    </div>
  );
};
