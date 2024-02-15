import {render} from "@testing-library/react";
import RecordName from "./RecordName";
import React from "react";
import {axe} from "jest-axe";


describe('RecordName', () => {
    it('should not have any accessibility violations', async () => {

        const { container } = render(<RecordName
            name="Record"
            onChange={() => {}}
            message={{ content: 'test-message', type: 'neutral' }} />);
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});
