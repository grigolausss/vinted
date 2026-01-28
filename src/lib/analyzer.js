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
  const { photos, condition, comparables, suggestedPrice } = data;
  const warnings = [];

  // BNWT Overload
  // (In a real app, we'd check against history, here we just flag if user says it's BNWT and has many items)
  if (condition === 'bnwt') {
    warnings.push({
      id: 'bnwt_risk',
      type: 'warning',
      message: 'Troppi articoli BNWT possono attivare flag commerciali. Considera di mescolare le condizioni.'
    });
  }

  // Price Outlier
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

  // Photo count
  if (photos.length < 3) {
    warnings.push({
      id: 'photo_count',
      type: 'info',
      message: 'Aggiungi almeno 3-5 foto per migliorare la visibilità e fiducia.'
    });
  }

  return warnings;
};
