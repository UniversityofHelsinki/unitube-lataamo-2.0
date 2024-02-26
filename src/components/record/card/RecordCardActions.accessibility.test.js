import { render } from "@testing-library/react";
import RecordCardActions from "./RecordCardActions.js";
import React from "react";
import { axe } from "jest-axe";
import { MockProvider } from "../../../redux/reducers/MockProvider.js";

describe('RecordCardActions', () => {
  it('has no accessibility violations', async () => {
        const { container } = render(
          <MockProvider mockReducers={{ users: { user: { eppn: 'baabenom' } }}}>
            <RecordCardActions record={{ series: 'asdf' }}/>
          </MockProvider>
        );
        const results = await axe(container);
        expect(results).toHaveNoViolations();
  });
});
