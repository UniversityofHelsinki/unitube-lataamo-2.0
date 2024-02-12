import {render} from "@testing-library/react";
import HelpDialog from "./HelpDialog";
import React from "react";
import {axe, toHaveNoViolations} from "jest-axe";

// extend expect with toHaveNoViolations function
expect.extend(toHaveNoViolations);
describe('HelpDialog', () => {
    it('should not have any accessibility violations', async () => {

        const { container } = render(<HelpDialog label="help-dialog-test" children={<span></span>}><span>hi</span></HelpDialog>);
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});
