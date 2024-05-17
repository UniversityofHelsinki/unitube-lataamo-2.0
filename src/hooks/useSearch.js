export const wholeMatch = (property, query) => {
  return property?.toLowerCase() === query?.toLowerCase();
};

export const partialMatch = (property, query) => {
  return property?.toLowerCase().includes(query?.toLowerCase());
};

const useSearch = (objects = [], searchQuery, properties, transforms = {}) => {
  
  const bySearchQuery = (record) => {
    const propertiesToLookFor = Object.keys(properties);
    return propertiesToLookFor.some((property) => 
      properties[property](
        transforms[property] 
          ? transforms[property](record[property]) 
          : record[property],
        searchQuery
      )
    );
  };

  return objects.filter(bySearchQuery);
};

export default useSearch;
