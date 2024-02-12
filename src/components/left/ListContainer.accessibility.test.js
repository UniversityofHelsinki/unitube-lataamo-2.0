import {render} from "@testing-library/react";
import ListContainer from "./ListContainer";
import React from "react";
import {axe, toHaveNoViolations} from "jest-axe";

// extend expect with toHaveNoViolations function
expect.extend(toHaveNoViolations);

describe('ListContainer', () => {
    it('should not have any accessibility violations', async () => {

        const { container } = render(<ListContainer children={[<span key="1">moi</span>]} />);
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});
