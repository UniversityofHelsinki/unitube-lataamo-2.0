import React from 'react';
import { render, renderHook, screen } from '@testing-library/react';
import useSort from './useSort';

const comparators = {
  name: () => (a, b) => (a.name || '').localeCompare(b.name)
};

describe('useSort', () => {

  it('returns empty list when input is empty list', () => {
    const { result } = renderHook(() => 
      useSort({}, [], '', false)
    );

    const [sorted] = result.current;

    expect(sorted).toHaveLength(0);

  });

  it('sorts the given list by the given criteria', () => {
    const { result } = renderHook(() => 
      useSort(
        comparators, 
        [{ name: 'bobster' }, { name: 'aliisa' }], 
        'name', 
        false
      )
    );
    const [sorted] = result.current;
    expect(sorted[0].name).toEqual('aliisa');
    expect(sorted[1].name).toEqual('bobster');
  });

});
