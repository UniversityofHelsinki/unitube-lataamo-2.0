import React from "react";
import {axe, toHaveNoViolations} from "jest-axe";
import {render} from "@testing-library/react";
import CollectionName from "./CollectionName";

// extend expect with toHaveNoViolations function
expect.extend(toHaveNoViolations);

describe('CollectionName', () => {
    it('should not have any accessibility violations', async () => {

        const { container } = render(<CollectionName name="collection" />);
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});
