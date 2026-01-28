import { generateTitles, generateDescription, extractKeywords } from './src/lib/generationEngine.js';

const mockData = {
  brand: 'Nike',
  category: 'Donna/Sweatshirts & Hoodies',
  color: 'Nero',
  size: 'M',
  condition: 'very_good',
  measurements: { shoulder: '44', chest: '52', length: '63' },
  defects: 'Piccolo graffio su zip'
};

const titles = generateTitles(mockData);
console.log('TITLES:', titles);

const desc = generateDescription(mockData, 0);
console.log('DESC 1:', desc);

const desc2 = generateDescription(mockData, 1);
console.log('DESC 2:', desc2);

const kws = extractKeywords(mockData);
console.log('KEYWORDS:', kws);

if (titles.length === 3 && desc.includes('Nike') && kws.includes('nero')) {
  console.log('VERIFICATION SUCCESSFUL');
} else {
  console.log('VERIFICATION FAILED');
  process.exit(1);
}
