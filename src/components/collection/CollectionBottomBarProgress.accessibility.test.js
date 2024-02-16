import { render } from "@testing-library/react";
import { MockProvider } from "../../redux/reducers/MockProvider";
import CollectionBottomBarProgress from "./CollectionBottomBarProgress.js";
import React from "react";
import { axe } from "jest-axe";

describe('CollectionBottomBarProgress', async () => {
  it('has no accessibility violations', () => {
        const { container } = render(
          <MockProvider>
            <CollectionBottomBarProgress progress={{ status: 'NOT_STARTED', percentage: 0 }}/>
          </MockProvider>
        );
        const results = await axe(container);
        expect(results).toHaveNoViolations();
  });
});
