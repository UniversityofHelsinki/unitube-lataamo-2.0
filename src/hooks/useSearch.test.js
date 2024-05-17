import React from 'react';
import { render, renderHook, screen } from '@testing-library/react';
import useSearch, { partialMatch, wholeMatch } from './useSearch';

const objects = [
  {
    'firstName': 'Pekka',
    'lastName': 'Pakkanen',
  },
  {
    'firstName': 'Kalevi',
    'lastName': 'Kolehmainen'
  }
];

const propertiesToSearch = {
  firstName: partialMatch
};

const transforms = { firstName: () => 'Matti', lastName: 'Mattinen' };

const equals = (a, b) => {
  return a.firstName === b.firstName && 
    a.lastName === b.lastName;
};

describe('useSearch', () => {

  test('nothing is filtered out when query is empty', () => {
    const { result } = renderHook(() => 
      useSearch(objects, '', propertiesToSearch)
    );
    const searched = result.current;
    expect(searched).toHaveLength(objects.length);
  });

  test('filters out based on the query', () => {
    const { result } = renderHook(() => 
      useSearch(objects, 'pekka', propertiesToSearch)
    );
    const searched = result.current;
    expect(equals(objects[0], searched[0])).toBeTruthy();
  });

  test('transforms the defined properties when needed', () => {
    const { result } = renderHook(() => 
      useSearch(objects, 'pekka', propertiesToSearch, transforms)
    );
    const searched = result.current;
    expect(searched).toHaveLength(0);
  });

  test('matches on transformed properties', () => {
    const { result } = renderHook(() => 
      useSearch(objects, 'matti', propertiesToSearch, transforms)
    );
    const searched = result.current;
    expect(searched).toHaveLength(2);
  });

  test('wholeMatch matches only when the whole input equals the query', () => {
    expect(wholeMatch('Pekka Pakkanen', 'Pekka Pakkanen')).toBeTruthy();
    expect(wholeMatch('Pekka Pakkanen', 'Pekka Pakka')).toBeFalsy();
    expect(wholeMatch('Pekka Pakkanen', '')).toBeFalsy();
  });

  test('wholeMatch is case incensitive', () => {
    expect(wholeMatch('Pekka Pakkanen', 'pekka pakkaneN')).toBeTruthy();
  });

  test('partialMatch matches when part of the input equals the query', () => {
    expect(partialMatch('Pekka Pakkanen', 'kka Pakka')).toBeTruthy();
  });

  test('partialMatch is case incensitive', () => {
    expect(partialMatch('Pekka Pakkanen', 'KKA pakka')).toBeTruthy();
  });

});
