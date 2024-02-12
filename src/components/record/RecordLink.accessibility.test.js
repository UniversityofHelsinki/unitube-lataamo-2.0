import {render} from "@testing-library/react";
import RecordLink from "./RecordLink";
import React from "react";
import {axe, toHaveNoViolations} from "jest-axe";

// extend expect with toHaveNoViolations function
expect.extend(toHaveNoViolations);
describe('RecordLink', () => {
    it('should not have any accessibility violations', async () => {

        const { container } = render(<RecordLink
            to="#"
            label={"https://unitube.it.helsinki.fi/21EC2020-3AEA-4069-A2DD-08002B30309D"}
        />);
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});
