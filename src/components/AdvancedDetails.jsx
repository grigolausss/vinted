import React, { useState } from 'react';
import { useListingStore } from '../store/useListingStore';
import { ChevronDown, Plus, Trash2, Info } from 'lucide-react';

export const AdvancedDetails = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    measurements, setMeasurements,
    defects, setField,
    retailPrice,
    comparables, addComparable, removeComparable,
    analysisLayers
  } = useListingStore();

  const isVerified = analysisLayers.search?.extra?.verified;

  const handleMeasurementChange = (field, value) => {
    setMeasurements({ [field]: value });
  };

  const addNewComp = () => {
    addComparable({ price: '', condition: 'very_good' });
  };

  return (
    <div className="border border-gray-100 dark:border-vinted-gray-dark rounded-apple-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-vinted-gray-light/50 dark:bg-vinted-gray-dark/30 hover:bg-vinted-gray-light dark:hover:bg-vinted-gray-dark transition-colors"
      >
        <span className="font-semibold text-sm">Aggiungi Dettagli Extra</span>
        <ChevronDown className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} size={18} />
      </button>

      {isOpen && (
        <div className="p-4 space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
          {/* Misure */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-vinted-gray-medium flex items-center gap-1.5">
              Misure Precise (cm) <Info size={12} />
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] text-vinted-gray-medium mb-1 block">Spalla</label>
                <input
                  type="number"
                  value={measurements.shoulder}
                  onChange={(e) => handleMeasurementChange('shoulder', e.target.value)}
                  className="input-field py-1.5 text-sm"
                  placeholder="44"
                />
              </div>
              <div>
                <label className="text-[10px] text-vinted-gray-medium mb-1 block">Petto</label>
                <input
                  type="number"
                  value={measurements.chest}
                  onChange={(e) => handleMeasurementChange('chest', e.target.value)}
                  className="input-field py-1.5 text-sm"
                  placeholder="52"
                />
              </div>
              <div>
                <label className="text-[10px] text-vinted-gray-medium mb-1 block">Lunghezza</label>
                <input
                  type="number"
                  value={measurements.length}
                  onChange={(e) => handleMeasurementChange('length', e.target.value)}
                  className="input-field py-1.5 text-sm"
                  placeholder="63"
                />
              </div>
              <div>
                <label className="text-[10px] text-vinted-gray-medium mb-1 block">Manica</label>
                <input
                  type="number"
                  value={measurements.sleeve}
                  onChange={(e) => handleMeasurementChange('sleeve', e.target.value)}
                  className="input-field py-1.5 text-sm"
                  placeholder="58"
                />
              </div>
            </div>
          </div>

          {/* Difetti */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-vinted-gray-medium">
              Difetti / Usure Note
            </h4>
            <textarea
              value={defects}
              onChange={(e) => setField('defects', e.target.value)}
              placeholder="Digita qui eventuali difetti (anche minimi)..."
              className="input-field min-h-[80px] text-sm py-2 resize-none"
              maxLength={200}
            />
            <div className="text-right text-[10px] text-vinted-gray-medium">
              {defects.length}/200
            </div>
          </div>

          {/* Prezzo Retail */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h4 className="text-xs font-bold uppercase tracking-wider text-vinted-gray-medium">
                Prezzo Retail Originale (€)
              </h4>
              {isVerified && (
                <div className="flex items-center gap-1 text-[10px] text-vinted-teal font-bold uppercase">
                  Verificato <Plus size={10} className="rotate-45" />
                </div>
              )}
            </div>
            <input
              type="number"
              value={retailPrice}
              onChange={(e) => setField('retailPrice', e.target.value)}
              className={`input-field text-sm ${isVerified ? 'border-vinted-teal/30 bg-vinted-teal/5' : ''}`}
              placeholder="100"
            />
          </div>

          {/* Comparables */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="text-xs font-bold uppercase tracking-wider text-vinted-gray-medium">
                Prezzi Comparabili Vinted
              </h4>
              <span className="text-[9px] text-vinted-gray-medium italic">Automatizzati via Online Search</span>
            </div>
            <div className="space-y-2">
              {comparables.map((comp, idx) => (
                <div key={idx} className="flex gap-2 items-center animate-in zoom-in-95 duration-200">
                  <div className="flex-1 flex gap-2">
                    <input
                      type="number"
                      placeholder="Prezzo €"
                      value={comp.price}
                      onChange={(e) => {
                        const newComps = [...comparables];
                        newComps[idx].price = e.target.value;
                        setField('comparables', newComps);
                      }}
                      className="input-field py-1.5 text-xs w-24"
                    />
                    <select
                      value={comp.condition}
                      onChange={(e) => {
                        const newComps = [...comparables];
                        newComps[idx].condition = e.target.value;
                        setField('comparables', newComps);
                      }}
                      className="input-field py-1.5 text-xs"
                    >
                      <option value="very_good">Ottimo</option>
                      <option value="bnwt">BNWT</option>
                      <option value="good">Buono</option>
                    </select>
                  </div>
                  <button
                    onClick={() => removeComparable(idx)}
                    className="p-1.5 text-vinted-gray-medium hover:text-vinted-red transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
              <button
                onClick={addNewComp}
                className="w-full py-2 border border-dashed border-gray-200 dark:border-vinted-gray-dark rounded-apple text-xs text-vinted-gray-medium hover:text-vinted-teal hover:border-vinted-teal transition-all flex items-center justify-center gap-1.5"
              >
                <Plus size={14} /> Aggiungi Comparable
              </button>
              <p className="text-[9px] text-vinted-gray-medium leading-tight mt-2">
                <strong>Tip:</strong> Se l'analisi automatica non è precisa, cerca su Vinted annunci simili "Venduti" e inserisci qui i prezzi per calibrare il suggerimento.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
