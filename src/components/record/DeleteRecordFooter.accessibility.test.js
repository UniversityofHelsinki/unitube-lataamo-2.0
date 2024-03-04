import { render } from "@testing-library/react";
import { MockProvider } from "../../redux/reducers/MockProvider";
import DeleteRecordFooter from "./DeleteRecordFooter.js";
import React from "react";
import { axe } from "jest-axe";
import { ProgressStatus } from "../../Constants";

describe('DeleteRecordFooter', () => {
  it('has no accessibility violations', async () => {
        const { container } = render(
          <MockProvider>
            <DeleteRecordFooter progress={{status: ProgressStatus.RECORD_DELETE.NOT_STARTED, percentage: 100 }} hide={console.log} />
          </MockProvider>
        );
        const results = await axe(container);
        expect(results).toHaveNoViolations();
  });
});
