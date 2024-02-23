import { render } from "@testing-library/react";
import { MockProvider } from "../../redux/reducers/MockProvider";
import NewCollection from "./NewCollection.js";
import React from "react";
import { axe } from "jest-axe";

describe('NewCollection', () => {
  it('has no accessibility violations', async () => {
        const { container } = render(
          <MockProvider mockReducers={{ 
            collections: {
              collections: [] 
            }, users: { 
              user: { eppn: 'asdf' } 
            },
            location: {
              path: '/collections',
              searchParameters: { collection: '' }
            }
          }}>
            <NewCollection />
          </MockProvider>
        );
        const results = await axe(container);
        expect(results).toHaveNoViolations();
  });
});
