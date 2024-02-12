import {render} from "@testing-library/react";
import ProgressBar from "./ProgressBar";
import React from "react";
import {axe, toHaveNoViolations} from "jest-axe";

// extend expect with toHaveNoViolations function
expect.extend(toHaveNoViolations);

describe('ProgressBar', () => {
    it('should not have any accessibility violations', async () => {

        const { container } = render(<ProgressBar now={12} label="asdf-label" alertMessage={<></>} type="error" />);
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});
