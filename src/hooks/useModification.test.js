import React from 'react';
import { act, renderHook } from '@testing-library/react';
import useModification from './useModification';

const defaultObject = {
  identifier: 'asdf'
};

describe('useModification', () => {

  it('returns the object', () => {
    const { result } = renderHook(() => useModification(defaultObject));
    const [object] = result.current;
    expect(object.identifier).toEqual(defaultObject.identifier);
  });

  test('modified is false before calling onChange', () => {
    const { result } = renderHook(() => useModification(defaultObject));
    const [_object, _onChange, modified, _undo] = result.current;
    expect(modified).toBeFalsy();
  });

  test('modified is true after calling onChange', () => {
    const { result, rerender } = renderHook(() => useModification(defaultObject));
    const [_object, onChange, _modified, _undo] = result.current;
    act(() => {
      onChange('property', 'test-value');
      rerender();
    });
    const [_a, _b, modifiedAfterOnChange, _c] = result.current;
    expect(modifiedAfterOnChange).toBeTruthy();
  });

  test('onChange changes the property in return object', () => {
    const { result, rerender } = renderHook(() => useModification(defaultObject));
    const [_object, onChange, _modified, _undo] = result.current;
    act(() => {
      onChange('property', 'test-value');
      rerender();
    });
    expect(result.current[0].property).toEqual('test-value');
  });

  test('undo restores the state of object into initial state', () => {
    const { result, rerender } = renderHook(() => useModification(defaultObject));
    const [_object, onChange, _modified, undo] = result.current;
    act(() => {
      onChange('property', 'test-value');
      undo();
      rerender();
    });
    expect(result.current[0].property).toBeUndefined();
  });

  test('after input changes the returned object changes', () => {
    const { result, rerender } = renderHook((args) => 
      useModification(args),
      { initialProps: defaultObject }
    );
    expect(result.current[0].identifier).toEqual(defaultObject.identifier);
    rerender({ identifier: 'second-object' });
    expect(result.current[0].identifier).toEqual('second-object');
  });

  test('after input changes the modified is set to false', () => {
    const { result, rerender } = renderHook((args) => 
      useModification(args),
      { initialProps: defaultObject }
    );
    expect(result.current[0].identifier).toEqual(defaultObject.identifier);
    rerender({ identifier: 'second-object' });
    const modified = result.current[2];
    expect(modified).toBeFalsy();
  });

  test('object is validated at first when validation function is given', () => {
    const validationFn = jest.fn();
    const { result, rerender } = renderHook(() => 
      useModification(defaultObject, validationFn),
    );
    expect(validationFn).toHaveBeenCalled();
  });

  test('reset progress is called after undo is invoked', () => {
    const resetProgress = jest.fn();
    const { result, rerender } = renderHook(() => 
      useModification(defaultObject, null, resetProgress),
    );
    const undo = result.current[3];
    act(() => {
      undo();
    });
    expect(resetProgress).toHaveBeenCalled();

  });

});
