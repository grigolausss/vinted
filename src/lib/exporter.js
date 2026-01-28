export const exportToJSON = (data) => {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `vinted_listing_${Date.now()}.json`;
  a.click();
  URL.revokeObjectURL(url);
};

export const exportToCSV = (data) => {
  const headers = ['Title', 'Brand', 'Category', 'Size', 'Color', 'Condition', 'Price', 'Keywords'];
  const row = [
    data.generatedTitle,
    data.brand,
    data.category,
    data.size,
    data.color,
    data.condition,
    data.suggestedPrice,
    data.generatedKeywords.join(', ')
  ];

  const csvContent = [
    headers.join(','),
    row.map(field => `"${field}"`).join(',')
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `vinted_listing_${Date.now()}.csv`;
  a.click();
  URL.revokeObjectURL(url);
};
