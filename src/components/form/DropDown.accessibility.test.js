import {render} from "@testing-library/react";
import DropDown from "./DropDown";
import React from "react";
import {axe} from "jest-axe";


describe('DropDown', () => {
    it('should not have any accessibility violations', async () => {

        const { container } = render(
          <div>
            <label htmlFor="dropdown">asdf</label>
            <DropDown
              options={[{ value: 'asdf', label: 'fdsa' }]}
              message={{ content: 'asdfdf', type: 'neutral' }}
              id="dropdown"
            />
          </div>
        );
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});
