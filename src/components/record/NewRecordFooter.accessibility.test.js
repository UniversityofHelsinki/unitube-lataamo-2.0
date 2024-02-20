import {render} from "@testing-library/react";
import NewRecordFooter from "./NewRecordFooter";
import {ProgressStatus} from "../../Constants";
import React from "react";
import {axe} from "jest-axe";


describe('NewRecordFooter', () => {
    it('should not have any accessibility violations', async () => {

        const { container, rerender } = render(
          <NewRecordFooter
            onClick={() => {}}
            onCancel={() => {}}
            progress={{ status: ProgressStatus.NEW_RECORD.SENDING, percentage: 0 }}
            isValid={true} />
        );
        rerender(
          <NewRecordFooter
            onClick={() => {}}
            onCancel={() => {}}
            progress={{ status: ProgressStatus.NEW_RECORD.SENDING, percentage: 0 }}
            isValid={true} />
        );
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});

