import {render} from "@testing-library/react";
import {MockProvider} from "../../redux/reducers/MockProvider";
import CollectionCrumb from "./CollectionCrumb";
import React from "react";
import {axe} from "jest-axe";


describe('CollectionCrumb', () => {
    it('should not have any accessibility violations', async () => {

        const { container } = render(<MockProvider mockReducers={{ location: { path: '', searchParameters: {}} }}>
            <CollectionCrumb collection={{ id: '123123', title: 'collection' }} />
        </MockProvider>);
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});

