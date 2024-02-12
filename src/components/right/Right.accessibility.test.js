import {render} from "@testing-library/react";
import {MockProvider} from "../../redux/reducers/MockProvider";
import Right from "./Right";
import React from "react";
import {axe, toHaveNoViolations} from "jest-axe";

// extend expect with toHaveNoViolations function
expect.extend(toHaveNoViolations);

describe('Right', () => {

    const reducers = {
        location: {
            searchParameters: {
                collection: 'asdfasdf'
            },
            path: '/records'
        },
        records: {
            record: {
                identifier: 'asdfasdf',
                deletionDate: new Date().toISOString()
            }
        },
        collections: {
            collection: {
                identifier: 'asdfasdf'
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

