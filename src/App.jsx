import React, { useEffect } from 'react';
import { useListingStore } from './store/useListingStore';
import { PhotoUploader } from './components/PhotoUploader';
import { ApiKeySettings } from './components/ApiKeySettings';
import { ListingForm } from './components/ListingForm';
import { AdvancedDetails } from './components/AdvancedDetails';
import { VintedMockup } from './components/VintedMockup';
import { OutputPanel } from './components/OutputPanel';
import { HistoryPanel } from './components/HistoryPanel';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { generateTitles, generateDescription, extractKeywords } from './lib/generationEngine';
import { calculateSuggestedPrice, runComplianceChecks } from './lib/analyzer';
import { Sparkles, Info, ShieldAlert } from 'lucide-react';

function App() {
  const state = useListingStore();
  useKeyboardShortcuts();

  // Real-time generation effect
  useEffect(() => {
    if (state.brand && state.category && state.photos.length > 0) {
      const titles = generateTitles(state);
      const desc = generateDescription(state, 0);
      const kws = extractKeywords(state);
      const price = calculateSuggestedPrice(state);

      state.setField('generatedTitle', titles[0]);
      state.setField('generatedDescription', desc);
      state.setField('generatedKeywords', kws);
      state.setField('suggestedPrice', price);
    }
  }, [state.brand, state.category, state.size, state.condition, state.color, state.photos, state.comparables, state.defects, state.measurements]);

  const warnings = runComplianceChecks(state);

  return (
    <div className="min-h-screen bg-vinted-gray-light dark:bg-vinted-dark p-6 text-black dark:text-white font-sans">
      <header className="max-w-[1400px] mx-auto mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            Vinted Listing Generator <span className="text-vinted-teal font-black">PRO</span>
          </h1>
          <p className="text-vinted-gray-medium text-sm mt-1">Genera annunci perfetti in meno di 80 secondi.</p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-vinted-teal/10 rounded-full border border-vinted-teal/20">
            <Sparkles className="text-vinted-teal" size={14} />
            <span className="text-xs font-semibold text-vinted-teal">AI Engine Active</span>
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[380px_1fr_400px] gap-8 items-start">
        {/* LEFT COLUMN: Input */}
        <div className="space-y-6 bg-white dark:bg-vinted-gray-dark/20 p-6 rounded-[24px] border border-gray-100 dark:border-vinted-gray-dark shadow-apple overflow-y-auto max-h-[calc(100vh-160px)] no-scrollbar">
          <section>
            <ApiKeySettings />
          </section>

          <section>
            <h3 className="text-xs font-bold uppercase tracking-widest text-vinted-gray-medium mb-4">1. Foto del Prodotto</h3>
            <PhotoUploader />
          </section>

          <section>
            <h3 className="text-xs font-bold uppercase tracking-widest text-vinted-gray-medium mb-4">2. Dettagli Base</h3>
            <ListingForm />
          </section>

          <section>
            <AdvancedDetails />
          </section>

          <section className="pt-4">
            <HistoryPanel />
          </section>
        </div>

        {/* CENTER COLUMN: Preview */}
        <div className="flex flex-col items-center justify-center py-4">
          <div className="sticky top-10">
            <div className="mb-4 flex items-center justify-center gap-2 text-vinted-gray-medium">
              <Info size={14} />
              <span className="text-[11px] font-medium uppercase tracking-wider">Anteprima Real-Time Vinted</span>
            </div>
            <VintedMockup />
          </div>
        </div>

        {/* RIGHT COLUMN: Output */}
        <div className="space-y-6 bg-white dark:bg-vinted-gray-dark/20 p-6 rounded-[24px] border border-gray-100 dark:border-vinted-gray-dark shadow-apple min-h-[600px]">
          {warnings.length > 0 && (
            <div className="bg-vinted-red/5 border-l-4 border-vinted-red p-4 rounded-apple space-y-2">
              <div className="flex items-center gap-2 text-vinted-red font-bold text-xs uppercase tracking-wider">
                <ShieldAlert size={14} /> Avvisi Compliance
              </div>
              <ul className="space-y-1">
                {warnings.map((w, idx) => (
                  <li key={idx} className="text-[11px] text-vinted-red leading-tight">• {w.message}</li>
                ))}
              </ul>
            </div>
          )}

          <OutputPanel />
        </div>
      </main>
    </div>
  );
}

export default App;
