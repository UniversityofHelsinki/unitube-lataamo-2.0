import {render} from "@testing-library/react";
import {MockProvider} from "../../redux/reducers/MockProvider";
import CollectionsBreadCrumb from "./CollectionsBreadCrumb";
import React from "react";
import {axe} from "jest-axe";


describe('CollectionsBreadCrumb', () => {
    it('should not have any accessibility violations', async () => {

        const { container } = render(<MockProvider mockReducers={{ location: { path: '', searchParameters: {}}}}>
            <CollectionsBreadCrumb collection={{ identifier: 'asdf', title: 'mo' }} />
        </MockProvider>);
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});
