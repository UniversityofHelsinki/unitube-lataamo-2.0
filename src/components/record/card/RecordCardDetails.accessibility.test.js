import {render} from "@testing-library/react";
import RecordCardDetails from "./RecordCardDetails";
import React from "react";
import {axe} from "jest-axe";


describe('RecordCardDetails', () => {
    it('should not have any accessibility violations', async () => {

        const { container } = render(<RecordCardDetails record={{ title: 'asdf', description: 'asdfasdf' }} />);
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});
