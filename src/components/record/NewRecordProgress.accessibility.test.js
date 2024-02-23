import {render} from "@testing-library/react";
import NewRecordProgress from "./NewRecordProgress";
import {ProgressStatus} from "../../Constants";
import React from "react";
import {axe} from "jest-axe";


describe('NewRecordProgress', () => {
    it('should not have any accessibility violations', async () => {

        const { container, rerender } = render(<NewRecordProgress progress={{ status: ProgressStatus.NEW_RECORD.SENDING, percentage: 0 }} />);
        rerender(<NewRecordProgress progress={{ status: ProgressStatus.NEW_RECORD.SENDING, percentage: 0 }} />);
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});

