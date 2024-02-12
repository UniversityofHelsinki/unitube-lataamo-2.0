import {render} from "@testing-library/react";
import AlertMessage from "./AlertMessage";
import React from "react";
import {axe, toHaveNoViolations} from "jest-axe";

// extend expect with toHaveNoViolations function
expect.extend(toHaveNoViolations);

describe('AlertMessage', () => {
    it('should not have any accessibility violations', async () => {

        const { container } = render(<AlertMessage type="warning">"asdf"</AlertMessage>);
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});
