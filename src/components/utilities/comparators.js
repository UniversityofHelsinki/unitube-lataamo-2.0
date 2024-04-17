export const stringComparator = (a, b) => {
  return (a || '').localeCompare((b || ''));
};

export const integerComparator = (a, b) => {
  return (a || 0) - (b || 0);
};

