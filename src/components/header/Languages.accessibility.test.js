import {render} from "@testing-library/react";
import Languages from "./Languages";
import React from "react";
import {axe, toHaveNoViolations} from "jest-axe";

// extend expect with toHaveNoViolations function
expect.extend(toHaveNoViolations);

describe('Languages', () => {
    it('should not have any accessibility violations', async () => {

        const { container } = render(<Languages />);
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});
