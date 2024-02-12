import {render} from "@testing-library/react";
import RecordLicense from "./RecordLicense";
import React from "react";
import {axe, toHaveNoViolations} from "jest-axe";

// extend expect with toHaveNoViolations function
expect.extend(toHaveNoViolations);

describe('RecordLicense', () => {
    it('should not have any accessibility violations', async () => {

        const { container } = render(<RecordLicense license={'asdf'} message={{ content: 'asdf', type: 'neutral' }} onChange={() => {}} />);
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});
