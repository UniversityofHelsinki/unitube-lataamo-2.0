import React from 'react';
import { render, renderHook, screen } from '@testing-library/react';
import useDistinctTags from './useDistinctTags';

const tags = [
  {
    label: 'tag_asdf',
  },
  {
    label: 'tag_asdf',
  },
  {
    label: 'tag_processing'
  }
];

describe('useDistinctTags', () => {

  it('removes duplicates of the input', () => {
    const { result } = renderHook(() => 
      useDistinctTags(tags)
    );
    const labels = new Set();
    result.current.forEach(tag => {
      labels.add(tag.label);
    });
    expect(labels.size).toBeLessThan(tags.length);
    expect(labels.size).toEqual(result.current.length);
  });

  it('appends the count of each tag', () => {
    const { result } = renderHook(() => 
      useDistinctTags(tags)
    );
    expect(result.current.length).toBeGreaterThan(0);
    result.current.forEach(tag => {
      expect(tag.count).toBeDefined()
    });
  });

  it('calculates the count of each distinct tag', () => {
    const { result } = renderHook(() => 
      useDistinctTags(tags)
    );
    const correctLengths = {
      tag_asdf: 2,
      tag_processing: 1
    };
    expect(result.current.length).toBeGreaterThan(0);
    result.current.forEach(tag => {
      expect(tag.count).toEqual(correctLengths[tag.label]);
    });
  });


});
