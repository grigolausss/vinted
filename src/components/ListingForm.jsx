import React from 'react';
import { useListingStore } from '../store/useListingStore';
import { ChevronDown, Sparkles, CheckCircle2, AlertCircle, Edit3 } from 'lucide-react';

const ConfidenceIcon = ({ score, isVerified }) => {
  if (isVerified) return <CheckCircle2 className="text-vinted-teal" size={14} title="Verificato Online" />;
  if (!score) return null;
  if (score >= 0.95) return <CheckCircle2 className="text-vinted-green" size={14} />;
  if (score >= 0.85) return <AlertCircle className="text-yellow-500" size={14} />;
  return <AlertCircle className="text-vinted-red" size={14} />;
};

const CATEGORIES = [
  'Donna/Tops & Blouses',
  'Donna/Sweatshirts & Hoodies',
  'Donna/Dresses',
  'Donna/Outerwear',
  'Uomo/Tops',
  'Uomo/Sweatshirts',
  'Accessori',
];

const BRANDS = ['Nike', 'Zara', 'H&M', 'Adidas', 'Gucci', 'Prada', 'Altro'];
const CONDITIONS = [
  { id: 'bnwt', label: 'BNWT (Nuovo con cartellino)', desc: 'Mai indossato, etichette attaccate' },
  { id: 'very_good', label: 'Ottime condizioni', desc: 'Indossato poco, quasi perfetto' },
  { id: 'good', label: 'Buone condizioni', desc: 'Segni di usura minori' },
  { id: 'satisfactory', label: 'Soddisfacente', desc: 'Difetti visibili o molto usato' },
];

const COLORS = [
  { name: 'Nero', hex: '#000000' },
  { name: 'Bianco', hex: '#FFFFFF' },
  { name: 'Grigio', hex: '#808080' },
  { name: 'Beige', hex: '#F5F5DC' },
  { name: 'Rosso', hex: '#FF0000' },
  { name: 'Blu', hex: '#0000FF' },
  { name: 'Verde', hex: '#008000' },
];

export const ListingForm = () => {
  const { category, brand, size, condition, color, material, model, setField, fieldConfidences, analysisLayers } = useListingStore();
  const searchResults = analysisLayers.search?.extra || {};

  return (
    <div className="space-y-6 py-4">
      {/* Modello / Item Preciso */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-xs font-bold uppercase tracking-wider text-vinted-gray-medium">
            Modello / Prodotto
          </label>
          <div className="flex items-center gap-1">
            <ConfidenceIcon score={fieldConfidences.model} />
            <button className="text-[10px] text-vinted-teal hover:underline flex items-center gap-0.5">
              <Edit3 size={10} /> Edit
            </button>
          </div>
        </div>
        <input
          type="text"
          value={model}
          onChange={(e) => setField('model', e.target.value)}
          className="input-field text-sm font-bold"
          placeholder="es. Nike Tech Fleece Hoodie"
        />
      </div>

      {/* Categoria */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-xs font-bold uppercase tracking-wider text-vinted-gray-medium">
            Categoria
          </label>
          <ConfidenceIcon score={fieldConfidences.category} />
        </div>
        <div className="relative">
          <select
            value={category}
            onChange={(e) => setField('category', e.target.value)}
            className="input-field appearance-none pr-10"
          >
            <option value="">Seleziona categoria</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <ChevronDown className="absolute right-3 top-2.5 text-vinted-gray-medium pointer-events-none" size={18} />
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-vinted-teal bg-vinted-teal/5 p-1.5 rounded">
          <Sparkles size={12} />
          <span>Auto-detect suggerisce: {category || '...'}</span>
        </div>
      </div>

      {/* Brand */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-xs font-bold uppercase tracking-wider text-vinted-gray-medium">
            Brand
          </label>
          <ConfidenceIcon score={fieldConfidences.brand} isVerified={searchResults.verified} />
        </div>
        <div className="relative">
          <input
            type="text"
            list="brands-list"
            placeholder="Cerca o digita brand"
            value={brand}
            onChange={(e) => setField('brand', e.target.value)}
            className="input-field"
          />
          <datalist id="brands-list">
            {BRANDS.map(b => <option key={b} value={b} />)}
          </datalist>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Taglia */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-vinted-gray-medium">
            Taglia
          </label>
          <input
            type="text"
            placeholder="es. M, 42, OS"
            value={size}
            onChange={(e) => setField('size', e.target.value)}
            className="input-field"
          />
        </div>

        {/* Colore */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold uppercase tracking-wider text-vinted-gray-medium">
              Colore
            </label>
            <ConfidenceIcon score={fieldConfidences.color} />
          </div>
          <div className="relative">
            <select
              value={color}
              onChange={(e) => setField('color', e.target.value)}
              className="input-field appearance-none"
            >
              <option value="">Seleziona</option>
              {COLORS.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
            </select>
            <ChevronDown className="absolute right-3 top-2.5 text-vinted-gray-medium pointer-events-none" size={18} />
          </div>
        </div>
      </div>

      {/* Materiale */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="text-xs font-bold uppercase tracking-wider text-vinted-gray-medium">
            Materiale
          </label>
          <div className="flex items-center gap-1">
            <ConfidenceIcon score={fieldConfidences.material} />
            <span className="text-[9px] text-vinted-gray-medium italic">da etichetta #2</span>
          </div>
        </div>
        <input
          type="text"
          value={material}
          onChange={(e) => setField('material', e.target.value)}
          className="input-field text-sm"
          placeholder="es. 100% Cotone"
        />
      </div>

      {/* Condizione */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <label className="text-xs font-bold uppercase tracking-wider text-vinted-gray-medium">
            Condizione
          </label>
          <ConfidenceIcon score={fieldConfidences.condition} />
        </div>
        <div className="grid grid-cols-1 gap-2">
          {CONDITIONS.map((c) => (
            <button
              key={c.id}
              onClick={() => setField('condition', c.id)}
              className={`text-left p-3 rounded-apple border transition-all ${
                condition === c.id
                ? 'border-vinted-teal bg-vinted-teal/5 ring-1 ring-vinted-teal'
                : 'border-gray-200 dark:border-vinted-gray-dark hover:border-vinted-teal/50'
              }`}
            >
              <div className="font-medium text-sm text-black dark:text-white">{c.label}</div>
              <div className="text-[11px] text-vinted-gray-medium">{c.desc}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
