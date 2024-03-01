import { render } from "@testing-library/react";
import { MockProvider } from "../../redux/reducers/MockProvider";
import CardTag from "./CardTag.js";
import React from "react";
import { axe } from "jest-axe";

describe('CardTag', () => {
  it('has no accessibility violations', async () => {
        const { container } = render(
          <CardTag label={'tag_deleted'} color="blue" />
        );
        const results = await axe(container);
        expect(results).toHaveNoViolations();
  });
});
