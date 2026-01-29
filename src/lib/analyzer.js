import { analyzePhotoDeeply, verifyOnline } from './gemini';

export const runFullDeepAnalysis = async (photos, store) => {
  store.setField('isAnalyzing', true);
  store.resetAnalysis();

  try {
    const apiKey = store.apiKey;
    const visionResults = await analyzePhotoDeeply(photos, (layer, data) => {
      store.updateAnalysisLayer(layer, data);
    }, apiKey);

    const searchResults = await verifyOnline(visionResults, (layer, data) => {
      store.updateAnalysisLayer(layer, data);
    });

    const visionData = visionResults.search.extra;
    const searchData = searchResults;

    // Auto-populate the form based on REAL analysis + Enrichment
    store.setField('category', visionData.category || '');
    store.setField('brand', visionData.brand || '');
    store.setField('model', visionData.model || visionResults.object.result);
    store.setField('color', visionData.color || '');
    store.setField('material', visionData.material || visionResults.material.result);
    store.setField('size', visionData.size || '');
    store.setField('condition', visionData.condition || 'very_good');
    store.setField('retailPrice', searchData.retailPrice || '');
    store.setField('comparables', searchData.comparables);
    store.setField('defects', visionData.defects || 'Nessuno');

    // Calculate suggested price based on market average from enrichment
    if (searchData.marketAvg) {
      store.setField('suggestedPrice', calculateSuggestedPrice({
        comparables: searchData.comparables,
        condition: visionData.condition || 'very_good',
        retailPrice: searchData.retailPrice
      }));
    }

    // Store field confidences for UI indicators
    const confidences = {
      category: visionResults.object.confidence,
      brand: visionResults.authenticity.confidence,
      model: visionResults.object.confidence,
      color: visionResults.color.confidence,
      material: visionResults.material.confidence,
      size: visionResults.size.confidence,
      condition: visionResults.condition.confidence,
      defects: 0.90,
      retailPrice: 0.95,
      suggestedPrice: 0.93,
    };
    store.setField('fieldConfidences', confidences);

  } catch (error) {
    console.error("Deep analysis failed:", error);
  } finally {
    store.setField('isAnalyzing', false);
  }
};

export const calculateSuggestedPrice = (data) => {
  const { comparables, condition, retailPrice } = data;

  if (!comparables || comparables.length === 0) {
    if (retailPrice) return (retailPrice * 0.6).toFixed(0);
    return null;
  }

  const validPrices = comparables
    .map(c => parseFloat(c.price))
    .filter(p => !isNaN(p) && p > 0);

  if (validPrices.length === 0) return null;

  const avg = validPrices.reduce((a, b) => a + b, 0) / validPrices.length;

  let factor = 1.0;
  if (condition === 'bnwt') factor = 1.15;
  if (condition === 'good') factor = 0.9;
  if (condition === 'satisfactory') factor = 0.75;

  return (avg * factor).toFixed(0);
};

export const runComplianceChecks = (data) => {
  const { photos, condition, comparables, suggestedPrice, analysisLayers } = data;
  const warnings = [];

  // Add enrichment warnings if search layer is complete
  if (analysisLayers.search?.status === 'complete' && analysisLayers.search.extra?.warnings) {
    analysisLayers.search.extra.warnings.forEach(w => {
      warnings.push({ id: 'search_warning', type: 'warning', message: w });
    });
  }

  if (condition === 'bnwt') {
    warnings.push({
      id: 'bnwt_risk',
      type: 'warning',
      message: 'Troppi articoli BNWT possono attivare flag commerciali. Considera di mescolare le condizioni.'
    });
  }

  if (suggestedPrice && comparables.length > 0) {
    const avg = comparables.reduce((a, b) => a + parseFloat(b.price || 0), 0) / comparables.length;
    if (suggestedPrice > avg * 1.3) {
      warnings.push({
        id: 'price_high',
        type: 'warning',
        message: 'Il tuo prezzo è significativamente sopra la media dei comparabili.'
      });
    }
  }

  if (photos.length < 3) {
    warnings.push({
      id: 'photo_count',
      type: 'info',
      message: 'Aggiungi almeno 3-5 foto per migliorare la visibilità e fiducia.'
    });
  }

  return warnings;
};
