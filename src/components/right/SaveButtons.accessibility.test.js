import {render} from "@testing-library/react";
import SaveButtons from "./SaveButtons";
import React from "react";
import {axe, toHaveNoViolations} from "jest-axe";

// extend expect with toHaveNoViolations function
expect.extend(toHaveNoViolations);

describe('SaveButtons', () => {
    it('should not have any accessibility violations', async () => {

        const { container } = render(<SaveButtons />);
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});
