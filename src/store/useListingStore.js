import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { generateTitles, generateDescription, extractKeywords } from '../lib/generationEngine';

export const useListingStore = create(
  persist(
    (set, get) => ({
  apiKey: '',
  photos: [],
  category: '',
  brand: '',
  model: '',
  size: '',
  condition: '',
  color: '',
  material: '',
  measurements: {
    shoulder: '',
    chest: '',
    length: '',
    sleeve: '',
  },
  defects: '',
  retailPrice: '',
  comparables: [],

  // Analysis State
  isAnalyzing: false,
  analysisLayers: {
    object: { status: 'idle', result: null, confidence: 0 },
    color: { status: 'idle', result: null, confidence: 0 },
    material: { status: 'idle', result: null, confidence: 0 },
    condition: { status: 'idle', result: null, confidence: 0 },
    size: { status: 'idle', result: null, confidence: 0 },
    construction: { status: 'idle', result: null, confidence: 0 },
    authenticity: { status: 'idle', result: null, confidence: 0 },
    search: { status: 'idle', result: null, confidence: 0 },
  },
  fieldConfidences: {},

  // Title and Description output
  generatedTitle: '',
  generatedDescription: '',
  generatedKeywords: [],
  suggestedPrice: null,

  setApiKey: (key) => set({ apiKey: key }),

  setField: (field, value) => {
    set((state) => ({ [field]: value }));
    get().regenerateListing();
  },

  setMeasurements: (measurements) => {
    set((state) => ({
      measurements: { ...state.measurements, ...measurements }
    }));
    get().regenerateListing();
  },

  regenerateListing: () => {
    const state = get();
    // Only generate if we have at least brand or category
    if (!state.brand && !state.category) return;

    const data = {
      brand: state.brand,
      category: state.category,
      model: state.model,
      size: state.size,
      condition: state.condition,
      color: state.color,
      material: state.material,
      measurements: state.measurements,
      defects: state.defects
    };

    const titles = generateTitles(data);
    const description = generateDescription(data);
    const keywords = extractKeywords(data);

    set({
      generatedTitle: titles[0],
      generatedDescription: description,
      generatedKeywords: keywords
    });
  },

  addPhoto: (photo) => set((state) => ({
    photos: [...state.photos, photo].slice(0, 12)
  })),

  removePhoto: (index) => set((state) => ({
    photos: state.photos.filter((_, i) => i !== index)
  })),

  reorderPhotos: (newPhotos) => set({ photos: newPhotos }),

  addComparable: (comp) => set((state) => ({
    comparables: [...state.comparables, comp]
  })),

  removeComparable: (index) => set((state) => ({
    comparables: state.comparables.filter((_, i) => i !== index)
  })),

  updateAnalysisLayer: (layer, data) => set((state) => ({
    analysisLayers: {
      ...state.analysisLayers,
      [layer]: { ...state.analysisLayers[layer], ...data }
    }
  })),

  resetAnalysis: () => set({
    isAnalyzing: false,
    analysisLayers: {
      object: { status: 'idle', result: null, confidence: 0 },
      color: { status: 'idle', result: null, confidence: 0 },
      material: { status: 'idle', result: null, confidence: 0 },
      condition: { status: 'idle', result: null, confidence: 0 },
      size: { status: 'idle', result: null, confidence: 0 },
      construction: { status: 'idle', result: null, confidence: 0 },
      authenticity: { status: 'idle', result: null, confidence: 0 },
      search: { status: 'idle', result: null, confidence: 0 },
    }
  }),

  history: [],
  saveToHistory: () => {
    const state = get();
    const newEntry = {
      id: Date.now(),
      title: state.generatedTitle,
      price: state.suggestedPrice,
      brand: state.brand,
      date: new Date().toISOString(),
    };
    set({ history: [newEntry, ...state.history].slice(0, 20) });
  },

  resetForm: () => set({
    photos: [],
    category: '',
    brand: '',
    model: '',
    size: '',
    condition: '',
    color: '',
    material: '',
    measurements: { shoulder: '', chest: '', length: '', sleeve: '' },
    defects: '',
    retailPrice: '',
    comparables: [],
    generatedTitle: '',
    generatedDescription: '',
    generatedKeywords: [],
    suggestedPrice: null,
    isAnalyzing: false,
    fieldConfidences: {},
  }),
}),
{
  name: 'vinted-listing-storage',
  storage: createJSONStorage(() => localStorage),
  partialize: (state) => ({
    history: state.history,
    apiKey: state.apiKey // Persist API Key
  }),
}
));
