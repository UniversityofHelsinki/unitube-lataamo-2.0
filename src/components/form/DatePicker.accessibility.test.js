import {render} from "@testing-library/react";
import DatePicker from "./DatePicker";
import React from "react";
import {axe, toHaveNoViolations} from "jest-axe";

// extend expect with toHaveNoViolations function
expect.extend(toHaveNoViolations);

describe('DatePicker', () => {
    it('should not have any accessibility violations', async () => {

        const { container } = render(
          <div>
            <label htmlFor="datepicker">datepicker</label>
            <DatePicker id="datepicker" message={{}} />
          </div>
        );
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});
