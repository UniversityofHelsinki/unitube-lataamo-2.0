import React from 'react';
import { render } from '@testing-library/react';
import TextArea from './TextArea';
import {axe, toHaveNoViolations} from "jest-axe";

// extend expect with toHaveNoViolations function
expect.extend(toHaveNoViolations);

describe('TextArea', () => {
    it('should not have any accessibility violations', async () => {

        const { container } = render(
          <div>
            <label htmlFor="moimoi">asdf</label>
            <TextArea
              id="moimoi"
              value="asdf"
              onChange={() => {}}
              message={{ content: 'asdf', type: 'neutral' }} />
          </div>
        );
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});

