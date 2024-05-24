import { useMemo } from "react";

const useSort = (comparators, list, criteria, descending) => {

  const sorted = useMemo(() => {
    if (comparators[criteria] && list) {
      const sorted = [ ...list ].sort(
        comparators[criteria](descending)
      );
      return sorted;
    }
    return list;
  }, [list, criteria, descending]);

  return [sorted, Object.keys(comparators)];
};

export default useSort;
