import {render} from "@testing-library/react";
import Highlight from "./Highlight";
import React from "react";
import {axe} from "jest-axe";


describe('Highlight', () => {
    it('should not have any accessibility violations', async () => {

        const { container } = render(<Highlight input="" what="" />);
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});
