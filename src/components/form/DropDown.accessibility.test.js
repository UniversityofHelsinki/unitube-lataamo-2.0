import {render} from "@testing-library/react";
import DropDown from "./DropDown";
import React from "react";
import {axe, toHaveNoViolations} from "jest-axe";

// extend expect with toHaveNoViolations function
expect.extend(toHaveNoViolations);

describe('DropDown', () => {
    it('should not have any accessibility violations', async () => {

        const { container } = render(<DropDown
            options={[{ value: 'asdf', label: 'fdsa' }]}
            message={{ content: 'asdfdf', type: 'neutral' }}
        />);
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});
