import {render} from "@testing-library/react";
import CheckBox from "./CheckBox";
import React from "react";
import {axe, toHaveNoViolations} from "jest-axe";

// extend expect with toHaveNoViolations function
expect.extend(toHaveNoViolations);

describe('CheckBox', () => {
    it('should not have any accessibility violations', async () => {

        const { container } = render(<CheckBox label="Valinta" />);
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});

