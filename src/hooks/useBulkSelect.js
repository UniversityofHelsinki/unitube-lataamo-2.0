import { useEffect, useState } from "react";

const useBulkSelect = (elements) => {

  const [selected, setSelected] = useState(new Set());

  const removeStaleElements = () => {
    const staleElements = 
      Array.from(selected)
        .filter(
          element => !elements.includes(element)
        );

    if (staleElements.length > 0) {
      const set = new Set(selected);
      staleElements.forEach(se => set.delete(se));
      setSelected(set);
    }

  };
  
  useEffect(() => {
    removeStaleElements();
  }, [elements]);

  const onSelect = (element) => {
    const set = new Set(selected);
    if (set.has(element)) {
      set.delete(element);
    } else {
      set.add(element);
    }
    setSelected(set);
  };

  const selectAll = () => {
    const set = new Set();
    elements.forEach(e => set.add(e));
    setSelected(set);
  };

  const clear = () => {
    setSelected(new Set());
  };

  const toggle = () => {
    if (selected.size === elements.length) {
      clear();
    } else {
      selectAll();
    }
  };

  return { 
    selected, 
    onSelect, 
    selectAll,
    allSelected: selected.size === elements.length,
    clear, 
    toggle
  };

};

export default useBulkSelect;
