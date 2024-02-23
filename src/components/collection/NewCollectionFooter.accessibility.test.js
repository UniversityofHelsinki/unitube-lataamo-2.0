import { render } from "@testing-library/react";
import NewCollectionFooter from "./NewCollectionFooter.js";
import React from "react";
import { axe } from "jest-axe";
import { ProgressStatus } from "../../Constants.js";

describe('NewCollectionFooter', () => {
  it('has no accessibility violations', async () => {
        const { container, rerender } = render(
            <NewCollectionFooter progress={{ status: ProgressStatus.NEW_COLLECTION.SENDING, percentage: 23 }} />
        );
        rerender(
            <NewCollectionFooter progress={{ status: ProgressStatus.NEW_COLLECTION.SENDING, percentage: 23 }} />
        );
        const results = await axe(container);
        expect(results).toHaveNoViolations();
  });
});
