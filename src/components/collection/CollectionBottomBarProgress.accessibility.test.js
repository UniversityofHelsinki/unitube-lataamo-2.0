import { render } from "@testing-library/react";
import CollectionBottomBarProgress from "./CollectionBottomBarProgress.js";
import React from "react";
import { axe } from "jest-axe";
import { ProgressStatus } from "../../Constants.js";

describe('CollectionBottomBarProgress', () => {
  it('has no accessibility violations', async () => {
        const { container, rerender } = render(
          <CollectionBottomBarProgress progress={{ status: ProgressStatus.COLLECTION_SAVE.IN_PROGRESS, percentage: 0 }} />
        );
        rerender(
          <CollectionBottomBarProgress progress={{ status: ProgressStatus.COLLECTION_SAVE.IN_PROGRESS, percentage: 0 }} />
        );
        const results = await axe(container);
        expect(results).toHaveNoViolations();
  });
});
