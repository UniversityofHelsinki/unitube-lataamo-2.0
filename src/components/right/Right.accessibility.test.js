import {render} from "@testing-library/react";
import {MockProvider} from "../../redux/reducers/MockProvider";
import Right from "./Right";
import React from "react";
import {axe} from "jest-axe";


describe('Right', () => {

    const reducers = {
        location: {
            searchParameters: {
                record: 'asdfasdf'
            },
            path: '/records'
        },
        collections: {
            collection: {
                identifier: 'asdfasdf',
                title: 'asdfsafsd'
            }
        },
        autocompletion: {
            users: [{ userName: 'baabenom' }],
            groups: [{ grpName: 'grp-hy-test' }]
        }
    };

    it('should not have any accessibility violations', async () => {

        const { container } = render(<MockProvider mockReducers={reducers}>
            <Right />
        </MockProvider>);
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});

