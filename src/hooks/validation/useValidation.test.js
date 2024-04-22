import React from 'react';
import { act, render, renderHook, screen } from '@testing-library/react';
import useValidation from './useValidation';



describe('useValidation', () => {

  const validationFunctions = {
    firstName: jest.fn(),
    lastName: jest.fn()
  };

  describe('validate()', () => {
    it('validates the given fields if they have functions defined', async () => {
      const fieldsToValidate = ['firstName'];
      const { result } = renderHook(() => 
        useValidation([validationFunctions], fieldsToValidate)
      );
      const [_isValid, _messages, validate] = result.current;

      await act(async () => {
        await validate([{ firstName: 'asfd', lastName: 'asf'  }]);
      });

      expect(fieldsToValidate.length).toBeGreaterThan(0);
      fieldsToValidate.forEach((field) => {
        expect(validationFunctions[field]).toHaveBeenCalled();
      });
    });

    it('does not validate fields having validation functions that are not in fields array', async () => {

      const fieldsToValidate = ['firstName'];
      const { result } = renderHook(() => 
        useValidation([validationFunctions], fieldsToValidate)
      );
      const [_isValid, _messages, validate] = result.current;

      await act(async () => {
        await validate([{ firstName: 'asfd', lastName: 'asf'  }]);
      });

      Object.keys(validationFunctions).forEach(field => {
        if (!fieldsToValidate.includes(field)) {
          expect(validationFunctions[field]).not.toHaveBeenCalled();
        }
      });

    });
  });

  describe('messages', () => {
    it('is filled with return values of validationFunctions if field is invalid', async () => {
      const { result, rerender } = renderHook(() => 
        useValidation([{ firstName: () => 'can_not_be_empty' }], ['firstName'])
      );
      const [_isValid, _messages, validate] = result.current;

      await act(async () => {
        await validate([{ firstName: '' }]);
      });
      rerender();

      const [__isValid, messages] = result.current;

      expect(messages[0]['firstName'].content).toEqual('can_not_be_empty');
    });

    it('is empty before calling validate()', () => {
      const { result, rerender } = renderHook(() => 
        useValidation([{ firstName: () => 'can_not_be_empty' }], ['firstName'])
      );
      const [_isValid, messages, _validate] = result.current;

      expect(Object.keys(messages[0])).toHaveLength(0);
    });
  });

});


