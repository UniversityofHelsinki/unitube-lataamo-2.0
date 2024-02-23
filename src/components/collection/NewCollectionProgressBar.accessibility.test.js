import { render } from "@testing-library/react";
import NewCollectionProgressBar from "./NewCollectionProgressBar.js";
import React from "react";
import { axe } from "jest-axe";
import { ProgressStatus } from "../../Constants.js";

describe('NewCollectionProgressBar', () => {
  it('has no accessibility violations', async () => {
        const { container, rerender } = render(
          <NewCollectionProgressBar progress={
            { status: ProgressStatus.NEW_COLLECTION.SENDING, percentage: 23 }
          } />
        );
        rerender(
          <NewCollectionProgressBar progress={
            { status: ProgressStatus.NEW_COLLECTION.SENDING, percentage: 23 }
          } />
        );
        const results = await axe(container);
        expect(results).toHaveNoViolations();
  });
});
