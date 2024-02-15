import {render} from "@testing-library/react";
import RecordFile from "./RecordFile";
import React from "react";
import {axe} from "jest-axe";

describe('RecordFile', () => {
    it('should not have any accessibility violations', async () => {

        const { container } = render(<RecordFile message={{ content: 'asdf', type: 'neutral' }} onChange={() => {}} />);
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});
