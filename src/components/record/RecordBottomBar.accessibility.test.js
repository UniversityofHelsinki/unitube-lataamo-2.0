import {render} from "@testing-library/react";
import RecordBottomBar from "./RecordBottomBar";
import React from "react";
import {axe} from "jest-axe";


describe('RecordBottomBar', () => {
    it('should not have any accessibility violations', async () => {

        const { container } = render(<RecordBottomBar disabled={true} record={{}} save={() => {}} undo={() => {}} progress={{ status: 'NOT_STARTED' }} />);
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});