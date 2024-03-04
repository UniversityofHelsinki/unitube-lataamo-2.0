import { render } from "@testing-library/react";
import { MockProvider } from "../../redux/reducers/MockProvider";
import RestoreRecordFooter from "./RestoreRecordFooter.js";
import React from "react";
import { axe } from "jest-axe";
import { ProgressStatus } from "../../Constants";

describe('RestoreRecordFooter', () => {
  it('has no accessibility violations', async () => {
        const { container, rerender } = render(
            <RestoreRecordFooter 
              progress={{ status: ProgressStatus.RECORD_RESTORE.NOT_STARTED, percentage: 100 }} hide={() => {}} />
        );
        rerender(
          <RestoreRecordFooter 
            progress={{ status: ProgressStatus.RECORD_RESTORE.NOT_STARTED, percentage: 100 }} hide={() => {}} />
        )
        const results = await axe(container);
        expect(results).toHaveNoViolations();
  });
});
