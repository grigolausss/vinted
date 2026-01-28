export const generateTitles = (data) => {
  const { brand, category, color, size, condition, model } = data;
  const itemType = model || category.split('/').pop() || 'Articolo';

  const variants = [
    `${brand} ${itemType} ${color} Taglia ${size}`,
    `${brand} ${color} ${size}`,
    `${brand} ${itemType} ${color} ${size} - ${condition === 'bnwt' ? 'Nuovo' : 'Ottimo stato'}`,
  ];

  return variants;
};

const DESCRIPTION_TEMPLATES = [
  // Template 1: Conversational
  (data) => {
    const { brand, category, color, size, condition, measurements, defects, material, model } = data;
    const itemType = (model || category.split('/').pop() || 'articolo').toLowerCase();

    let text = `Ciao! Vendo questa bellissima ${itemType} di ${brand} in color ${color.toLowerCase()}.\n\n`;

    if (condition === 'bnwt') {
      text += `L'articolo è nuovo con cartellino, mai indossato. Perfetto come regalo! 🎁\n\n`;
    } else {
      text += `Ho indossato questo capo solo poche volte, è in condizioni davvero ottime.\n\n`;
    }

    if (material) {
      text += `Materiale: ${material}\n\n`;
    }

    if (defects) {
      text += `Nota bene: ${defects}\n\n`;
    }

    if (measurements.shoulder || measurements.chest) {
      text += `Misure (prese in piano):\n`;
      if (measurements.shoulder) text += `- Spalla: ${measurements.shoulder} cm\n`;
      if (measurements.chest) text += `- Petto: ${measurements.chest} cm\n`;
      if (measurements.length) text += `- Lunghezza: ${measurements.length} cm\n`;
      text += `\n`;
    }

    text += `Taglia ${size}. Calza perfettamente.\n`;
    text += `Spedizione rapida in 24/48 ore. 📦`;

    return text;
  },

  // Template 2: Professional/Factual
  (data) => {
    const { brand, category, color, size, condition, measurements, defects } = data;
    const itemType = category.split('/').pop() || 'Articolo';

    let text = `${brand} - ${itemType}\n`;
    text += `Colore: ${color}\n`;
    text += `Taglia: ${size}\n\n`;

    text += `Condizioni: ${condition === 'bnwt' ? 'Nuovo con etichetta' : 'Ottime'}\n`;
    if (defects) text += `Dettagli: ${defects}\n`;
    text += `\n`;

    if (measurements.shoulder || measurements.chest) {
      text += `MISURE:\n`;
      if (measurements.shoulder) text += `Spalla-Spalla: ${measurements.shoulder}cm\n`;
      if (measurements.chest) text += `Ascella-Ascella: ${measurements.chest}cm\n`;
      if (measurements.length) text += `Lunghezza: ${measurements.length}cm\n`;
      text += `\n`;
    }

    text += `Disponibile per bundle e sconti. Smoke-free home.`;

    return text;
  }
];

const shuffleArray = (array) => {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

export const generateDescription = (data, styleIndex = 0) => {
  const template = DESCRIPTION_TEMPLATES[styleIndex % DESCRIPTION_TEMPLATES.length];
  let text = template(data);

  // Anti-bot: Occasionally swap blocks of text if they are separated by double newlines
  if (styleIndex % 3 === 0) {
    const parts = text.split('\n\n');
    if (parts.length > 3) {
      const header = parts[0];
      const footer = parts[parts.length - 1];
      const middle = parts.slice(1, -1);
      text = [header, ...shuffleArray(middle), footer].join('\n\n');
    }
  }

  return text;
};

export const extractKeywords = (data) => {
  const { brand, category, color, size } = data;
  const itemType = (category.split('/').pop() || '').toLowerCase();

  const base = [brand.toLowerCase(), itemType, color.toLowerCase(), size.toLowerCase()];
  return [...new Set(base)].filter(k => k.length > 1);
};
