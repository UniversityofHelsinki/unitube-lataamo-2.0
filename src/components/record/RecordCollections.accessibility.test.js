import {MockProvider} from "../../redux/reducers/MockProvider";
import RecordCollections from "./RecordCollections";
import React from "react";
import {axe, toHaveNoViolations} from "jest-axe";
import {render} from "@testing-library/react";

// extend expect with toHaveNoViolations function
expect.extend(toHaveNoViolations);

describe('RecordCollections', () => {

    const  message = {
        content: '',
        type: ['light', 'neutral', 'warning']
    };

    it('should not have any accessibility violations', async () => {

        const { container } = render(
          <MockProvider mockReducers={
            { 
              collections: {
                collection: { identifier: 'asdf', title: 'asdfasdfa' } 
              }
            }}>
            <RecordCollections message={message} onChange={() => {}} />
        </MockProvider>);
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});
