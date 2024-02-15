import {render} from "@testing-library/react";
import SearchOptions from "./SearchOptions";
import React from "react";
import {axe} from "jest-axe";


describe('SearchOptions', () => {
    it('should not have any accessibility violations', async () => {

        const { container } = render(<SearchOptions />);
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});
