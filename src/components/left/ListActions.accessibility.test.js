import {render} from "@testing-library/react";
import ListActions from "./ListActions";
import React from "react";
import {axe} from "jest-axe";


describe('ListActions', () => {
    it('should not have any accessibility violations', async () => {

        const { container } = render(<ListActions />);
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});
