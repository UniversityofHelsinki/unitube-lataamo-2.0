import {render} from "@testing-library/react";
import AutoCompleteOptionContainer from "./AutoCompleteOptionContainer";
import React from "react";
import {axe, toHaveNoViolations} from "jest-axe";

// extend expect with toHaveNoViolations function
expect.extend(toHaveNoViolations);

describe('AutoCompleteOptionContainer', () => {
    const show = false;

    it('should not have any accessibility violations', async () => {

        const { container } = render(<AutoCompleteOptionContainer options={[]} show={show} onSelect={() => {}} />);
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});
