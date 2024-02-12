import {render} from "@testing-library/react";
import {axe, toHaveNoViolations} from "jest-axe";
import React from "react";
import CollectionPublicity from "./CollectionPublicity";

// extend expect with toHaveNoViolations function
expect.extend(toHaveNoViolations);

describe('CollectionPublicity', () => {
    it('should not have any accessibility violations', async () => {

        const { container } = render(<CollectionPublicity published="ROLE_ANONYMOUS" />);
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});
