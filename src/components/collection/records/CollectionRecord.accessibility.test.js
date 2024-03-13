import {render} from "@testing-library/react";
import {MockProvider} from "../../../redux/reducers/MockProvider";
import CollectionRecord from "./CollectionRecord";
import React from "react";
import {axe} from "jest-axe";


describe('CollectionRecord', () => {
    it('should not have any accessibility violations', async () => {

        const { container } = render(<MockProvider>
            <CollectionRecord
                record={{ identifier: 'asdf', title: 'hei' }}
                onRemove={() => {}}
            />
        </MockProvider>);
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});
