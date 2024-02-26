import {render} from "@testing-library/react";
import RecordActionOptions from "./RecordActionOptions.js";
import React from "react";
import {axe} from "jest-axe";


describe('SearchOptions', () => {
    it('should not have any accessibility violations', async () => {

      const { container } = render(<RecordActionOptions options={{ showDeleted: false, showRecordsInCollections: false }} onOptionChange={() => {}} />);
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});
