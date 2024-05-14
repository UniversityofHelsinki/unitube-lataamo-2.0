import { render } from "@testing-library/react";
import { MockProvider } from "../../redux/reducers/MockProvider";
import CollectionActions from "./CollectionActions.js";
import React from "react";
import { axe } from "jest-axe";

describe('CollectionActions', () => {
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
            <CollectionActions tags={{ distinct: [], onTagChange: (() => {}) }}/>
          </MockProvider>
        );
        const results = await axe(container);
        expect(results).toHaveNoViolations();
  });
});
