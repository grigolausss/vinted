import React, { useCallback } from 'react';
import { useListingStore } from '../store/useListingStore';
import { Upload, X, Camera, AlertCircle } from 'lucide-react';
import { runFullDeepAnalysis } from '../lib/analyzer';
import { AnalysisProgress, AnalysisSummary } from './AnalysisUI';

export const PhotoUploader = () => {
  const state = useListingStore();
  const { photos, addPhoto, removePhoto, isAnalyzing } = state;

  const onDrop = useCallback((e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  }, []);

  const handleFiles = (files) => {
    const newPhotosCount = files.filter(f => f.type.startsWith('image/')).length;

    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          addPhoto({
            url: e.target.result,
            name: file.name,
            size: file.size,
          });
        };
        reader.readAsDataURL(file);
      }
    });

    // Trigger Deep Analysis after upload
    if (newPhotosCount > 0) {
      setTimeout(() => {
        runFullDeepAnalysis(files, useListingStore.getState());
      }, 500);
    }
  };

  return (
    <div className="space-y-4">
      <AnalysisProgress />
      <AnalysisSummary />

      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
        className="border-2 border-dashed border-gray-200 dark:border-vinted-gray-dark rounded-apple-lg p-8 text-center hover:border-vinted-teal transition-colors group cursor-pointer"
        onClick={() => document.getElementById('photo-input').click()}
      >
        <input
          id="photo-input"
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={(e) => handleFiles(Array.from(e.target.files))}
        />
        <div className="flex flex-col items-center">
          <div className="p-3 bg-vinted-teal/10 rounded-full group-hover:scale-110 transition-transform">
            <Upload className="text-vinted-teal w-8 h-8" />
          </div>
          <p className="mt-4 font-medium text-black dark:text-white">
            Trascina foto qui o clicca per selezionare
          </p>
          <p className="text-sm text-vinted-gray-medium mt-1">
            Fino a 12 foto (JPG, PNG)
          </p>
        </div>
      </div>

      {photos.length > 0 && (
        <div className="grid grid-cols-4 gap-3">
          {photos.map((photo, index) => (
            <div key={index} className="relative group aspect-square">
              <img
                src={photo.url}
                alt={`Preview ${index}`}
                className="w-full h-full object-cover rounded-apple border border-gray-100 dark:border-vinted-gray-dark"
              />
              <div className="absolute top-1 left-1 bg-black/50 text-white text-[10px] px-1.5 rounded-full">
                {index + 1}
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); removePhoto(index); }}
                className="absolute -top-2 -right-2 bg-vinted-red text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
              >
                <X size={12} />
              </button>
            </div>
          ))}
          {photos.length < 12 && (
            <button
              onClick={() => document.getElementById('photo-input').click()}
              className="border border-dashed border-gray-200 dark:border-vinted-gray-dark rounded-apple flex items-center justify-center text-vinted-gray-medium hover:text-vinted-teal hover:border-vinted-teal transition-all"
            >
              <Camera size={20} />
            </button>
          )}
        </div>
      )}

      {photos.length > 0 && (
        <div className="flex items-center gap-2 text-xs text-vinted-gray-medium bg-vinted-gray-light dark:bg-vinted-gray-dark p-2 rounded-apple">
          <AlertCircle size={14} className="text-vinted-teal" />
          <span>{photos.length} foto caricate. Risoluzione media ottimale.</span>
        </div>
      )}
    </div>
  );
};
