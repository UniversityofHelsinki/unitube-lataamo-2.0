import {render} from "@testing-library/react";
import {MockProvider} from "../../redux/reducers/MockProvider";
import RecordForm from "./RecordForm";
import React from "react";
import {axe} from "jest-axe";


describe('RecordForm', () => {
    it('should not have any accessibility violations', async () => {

      const { container } = render(<MockProvider mockReducers={
        { collections: { 
          collections: 
            [{ identifier: 'asdf-asdf', title: 'asdfasdf' }],
            collectionDropDown: [{ identifier: 'asdf', title: 'inbox baabenom' }] 
          }
        }
        }>
          <RecordForm record={{ deletionDate: new Date().toISOString() }} onChange={() => {}} />
        </MockProvider>);
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});

