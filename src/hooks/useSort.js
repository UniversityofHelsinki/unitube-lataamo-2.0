import { useMemo } from "react";

const useSort = (comparators, list, criteria, descending, eppn) => {

  const sorted = useMemo(() => {
    if (comparators[criteria] && list) {
      const sorted = [ ...list ].sort(
        comparators[criteria](descending, eppn)
      );
      return sorted;
    }
  }, [list, criteria, descending]);

  return [sorted, Object.keys(comparators)];
};

export default useSort;
