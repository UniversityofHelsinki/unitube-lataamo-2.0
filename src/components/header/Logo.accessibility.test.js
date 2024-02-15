import {render} from "@testing-library/react";
import Logo from "./Logo";
import React from "react";
import {axe} from "jest-axe";

describe('Logo', () => {
    it('should not have any accessibility violations', async () => {

        const { container } = render(<Logo />);
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});
