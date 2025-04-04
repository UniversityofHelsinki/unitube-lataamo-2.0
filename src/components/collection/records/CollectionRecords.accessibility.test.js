import {render} from "@testing-library/react";
import {MockProvider} from "../../../redux/reducers/MockProvider";
import CollectionRecords from "./CollectionRecords";
import React from "react";
import {axe} from "jest-axe";

describe('CollectionRecords', () => {
    it('should not have any accessibility violations', async () => {

        const { container } = render(<MockProvider>
            <CollectionRecords records={[{ identifier: 'sadf', title: 'asdfasf', publications: []}, { identifier: 'fdsa', title: 'hei', publications: []}]} />
        </MockProvider>);
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});
