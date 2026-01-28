import { create } from 'zustand';

import { persist, createJSONStorage } from 'zustand/middleware';

export const useListingStore = create(
  persist(
    (set, get) => ({
  photos: [],
  category: '',
  brand: '',
  size: '',
  condition: '',
  color: '',
  measurements: {
    shoulder: '',
    chest: '',
    length: '',
    sleeve: '',
  },
  defects: '',
  retailPrice: '',
  comparables: [],

  // Title and Description output
  generatedTitle: '',
  generatedDescription: '',
  generatedKeywords: [],
  suggestedPrice: null,

  setField: (field, value) => set((state) => ({ [field]: value })),

  setMeasurements: (measurements) => set((state) => ({
    measurements: { ...state.measurements, ...measurements }
  })),

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
    size: '',
    condition: '',
    color: '',
    measurements: { shoulder: '', chest: '', length: '', sleeve: '' },
    defects: '',
    retailPrice: '',
    comparables: [],
    generatedTitle: '',
    generatedDescription: '',
    generatedKeywords: [],
    suggestedPrice: null,
  }),
}),
{
  name: 'vinted-listing-storage',
  storage: createJSONStorage(() => localStorage),
  partialize: (state) => ({ history: state.history }), // Only persist history
}
));
