import CollectionIdentifier from "./CollectionIdentifier.js";
import React from "react";
import { axe } from "jest-axe";
import NotificationProvider from "../notification/NotificationContext.js";
import { render } from "@testing-library/react";

describe('CollectionIdentifier', () => {
  it('has no accessibility violations', async () => {
        const { container } = render(
          <NotificationProvider>
            <CollectionIdentifier identifier="aaaa-bbbb-cccc-dddd-eeee" />
          </NotificationProvider>
        );
        const results = await axe(container);
        expect(results).toHaveNoViolations();
  });
});
