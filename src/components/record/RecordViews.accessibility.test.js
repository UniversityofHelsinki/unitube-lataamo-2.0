import {render} from "@testing-library/react";
import React from "react";
import {axe} from "jest-axe";
import RecordViews from "./RecordViews";


describe('RecordViews', () => {
    it('should not have any accessibility violations', async () => {

        const { container } = render(<RecordViews views={'-'} />);
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});
