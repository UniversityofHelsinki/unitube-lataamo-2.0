import {render} from "@testing-library/react";
import RecordCard from "./RecordCard";
import React from "react";

import {axe} from "jest-axe";
import { MockProvider } from "../../../redux/reducers/MockProvider";


describe('RecordCard', () => {
    it('should not have any accessibility violations', async () => {

        const { container } = render(
          <MockProvider mockReducers={{ users: { user: { eppn: 'baabenom' } }}}>
              <RecordCard
                record={{ identifier: 'asdf', title: 'hello', series: 'asdf' }}
                onClick={() => {}}
                selected={false} 
            />
          </MockProvider>
        );
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});

