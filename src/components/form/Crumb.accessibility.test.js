import {render} from "@testing-library/react";
import Crumb from "./Crumb";
import React from "react";
import {axe, toHaveNoViolations} from "jest-axe";

// extend expect with toHaveNoViolations function
expect.extend(toHaveNoViolations);

describe('Crumb', () => {
    it('should not have any accessibility violations', async () => {

        const { container } = render(<Crumb onClick={() => {}}>asdf</Crumb>);
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});
