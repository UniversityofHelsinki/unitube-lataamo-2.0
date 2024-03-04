import { render } from "@testing-library/react";
import { MockProvider } from "../../redux/reducers/MockProvider";
import RestoreRecord from "./RestoreRecord.js";
import React from "react";
import { axe } from "jest-axe";

describe('RestoreRecord', () => {
  it('has no accessibility violations', async () => {
        const { container } = render(
          <MockProvider>
            <RestoreRecord record={{ identifier: 'asdf-asdf', title: 'asdfasdf' }} />
          </MockProvider>
        );
        const results = await axe(container);
        expect(results).toHaveNoViolations();
  });
});
