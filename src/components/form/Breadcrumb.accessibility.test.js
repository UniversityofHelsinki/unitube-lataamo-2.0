import {render} from "@testing-library/react";
import Breadcrumb from "./Breadcrumb";
import React from "react";
import {axe} from "jest-axe";


describe('Breadcrumb', () => {
    it('should not have any accessibility violations', async () => {

        const { container } = render(<Breadcrumb crumbs={['eka', 'toka']} />);
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});
