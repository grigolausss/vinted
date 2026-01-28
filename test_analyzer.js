import { calculateSuggestedPrice, runComplianceChecks } from './src/lib/analyzer.js';

const mockData = {
  comparables: [{ price: '40' }, { price: '50' }, { price: '30' }],
  condition: 'bnwt',
  photos: [{ url: '...' }, { url: '...' }],
  suggestedPrice: 60
};

const price = calculateSuggestedPrice(mockData);
console.log('Price:', price);

const warnings = runComplianceChecks({...mockData, suggestedPrice: price});
console.log('Warnings:', warnings);

if (price === '46' && warnings.some(w => w.id === 'bnwt_risk')) {
  console.log('VERIFICATION SUCCESSFUL');
} else {
  console.log('VERIFICATION FAILED');
  process.exit(1);
}
