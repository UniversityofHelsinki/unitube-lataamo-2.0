import {render} from "@testing-library/react";
import RecordIdentifier from "./RecordIdentifier";
import React from "react";
import {axe, toHaveNoViolations} from "jest-axe";

// extend expect with toHaveNoViolations function
expect.extend(toHaveNoViolations);
describe('RecordIdentifier', () => {
    it('should not have any accessibility violations', async () => {

        const { container } = render(<RecordIdentifier identifier="ffff-eeee-0000-a2a2-efef" />);
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});
