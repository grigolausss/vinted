import React, { useState } from 'react';
import { useListingStore } from '../store/useListingStore';
import { Key, Save, CheckCircle2, Eye, EyeOff, AlertCircle } from 'lucide-react';

export const ApiKeySettings = () => {
  const { apiKey, setApiKey } = useListingStore();
  const [showKey, setShowKey] = useState(false);
  const [tempKey, setTempKey] = useState(apiKey);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setApiKey(tempKey);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-vinted-gray-dark/50 border border-gray-100 dark:border-vinted-gray-dark rounded-apple-lg p-5 space-y-4 shadow-apple">
      <div className="flex items-center gap-2 mb-2">
        <Key className="text-vinted-teal" size={18} />
        <h3 className="text-sm font-bold uppercase tracking-widest">Configurazione AI</h3>
      </div>

      <p className="text-[11px] text-vinted-gray-medium leading-relaxed">
        Inserisci la tua chiave API di Google Gemini per abilitare l'analisi reale delle foto.
        La chiave verrà salvata solo localmente sul tuo browser.
      </p>

      <div className="space-y-3">
        <div className="relative">
          <input
            type={showKey ? "text" : "password"}
            value={tempKey}
            onChange={(e) => setTempKey(e.target.value)}
            placeholder="Inserisci Gemini API Key..."
            className="input-field pr-10 text-xs font-mono"
          />
          <button
            onClick={() => setShowKey(!showKey)}
            className="absolute right-3 top-2.5 text-vinted-gray-medium hover:text-vinted-teal transition-colors"
          >
            {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>

        <button
          onClick={handleSave}
          disabled={!tempKey}
          className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-apple text-xs font-bold transition-all ${
            saved
            ? 'bg-vinted-green text-white shadow-lg scale-95'
            : 'bg-vinted-teal text-white hover:bg-vinted-teal/90 shadow-sm'
          }`}
        >
          {saved ? (
            <>
              <CheckCircle2 size={16} /> Salvata!
            </>
          ) : (
            <>
              <Save size={16} /> Salva Chiave API
            </>
          )}
        </button>
      </div>

      {!apiKey && (
        <div className="flex items-start gap-2 p-3 bg-vinted-red/5 rounded-apple border border-vinted-red/10">
          <AlertCircle className="text-vinted-red shrink-0" size={14} />
          <p className="text-[10px] text-vinted-red font-medium">
            Senza chiave API, l'analisi delle foto non funzionerà. Puoi ottenerne una gratuita su Google AI Studio.
          </p>
        </div>
      )}
    </div>
  );
};
