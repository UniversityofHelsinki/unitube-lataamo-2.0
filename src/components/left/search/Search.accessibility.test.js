import {render} from "@testing-library/react";
import Search from "./Search";
import React from "react";
import {axe} from "jest-axe";


describe('Search', () => {
    it('should not have any accessibility violations', async () => {

        const { container } = render(<Search />);
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});

