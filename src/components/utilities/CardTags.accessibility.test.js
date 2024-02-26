import { render } from "@testing-library/react";
import { MockProvider } from "../../redux/reducers/MockProvider";
import CardTags from "./CardTags.js";
import React from "react";
import { axe } from "jest-axe";

describe('CardTags', () => {
  it('has no accessibility violations', async () => {
        const { container } = render(
          <CardTags tags={[{
            type: 'red',
            label: 'tag_deleted'
          }]} />
        );
        const results = await axe(container);
        expect(results).toHaveNoViolations();
  });
});
