import { render } from "@testing-library/react";
import { MockProvider } from "../../redux/reducers/MockProvider";
import DeleteRecord from "./DeleteRecord.js";
import React from "react";
import { axe } from "jest-axe";

describe('DeleteRecord', () => {
  it('has no accessibility violations', async () => {
        const { container } = render(
          <MockProvider>
            <DeleteRecord record={{ 
              identifier: 'asdfasdf', 
              title: 'asdf' 
            }}
            showLabel={true}
            reloadCollectionOnRemove={false}
            />
          </MockProvider>
        );
        const results = await axe(container);
        expect(results).toHaveNoViolations();
  });
});
