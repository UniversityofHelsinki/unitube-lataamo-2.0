import {render} from "@testing-library/react";
import RecordEndDate from "./RecordEndDate";
import React from "react";
import {axe} from "jest-axe";


describe('RecordEndDate', () => {
    it('should not have any accessibility violations', async () => {

        const { container } = render(<RecordEndDate
            endDate={new Date().toISOString()}
            onChange={() => {}}
            message={{ content: 'asdf', type: 'neutral' }}
        />);
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});
