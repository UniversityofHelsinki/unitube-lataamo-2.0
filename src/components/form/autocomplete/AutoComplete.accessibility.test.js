import {render} from "@testing-library/react";
import AutoComplete from "./AutoComplete";
import React from "react";
import {axe, toHaveNoViolations} from "jest-axe";

// extend expect with toHaveNoViolations function
expect.extend(toHaveNoViolations);
describe('AutoComplete', () => {

    const options = [];
    const placeholder = '';

    it('should not have any accessibility violations', async () => {

        const { container } = render(<AutoComplete options={options} onFilter={() => {}} placeholder={placeholder} onSelect={() => {}} />);
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});
