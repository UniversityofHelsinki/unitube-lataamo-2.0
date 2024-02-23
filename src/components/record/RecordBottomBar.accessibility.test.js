import {render} from "@testing-library/react";
import RecordBottomBar from "./RecordBottomBar";
import React from "react";
import {axe} from "jest-axe";
import { ProgressStatus } from "../../Constants";


describe('RecordBottomBar', () => {
    it('should not have any accessibility violations', async () => {

        const { container, rerender } = render(
          <RecordBottomBar disabled={true} record={{}} save={() => {}} undo={() => {}} progress={{ status: ProgressStatus.RECORD_SAVE.DONE }} />
        );
        rerender(
          <RecordBottomBar disabled={true} record={{}} save={() => {}} undo={() => {}} progress={{ status: ProgressStatus.RECORD_SAVE.DONE }} />
        );
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});
