import {render} from "@testing-library/react";
import {MockProvider} from "../../redux/reducers/MockProvider";
import Record from "./Record";
import React from "react";
import {axe, toHaveNoViolations} from "jest-axe";

// extend expect with toHaveNoViolations function
expect.extend(toHaveNoViolations);
describe('Record', () => {

    const reducers = {
        records: {
            record: {
                identifier: 'asdfasdf',
                deletionDate: new Date().toISOString(),
                media: [{ url: 'https://example.com', type: 'asdf' }],
                title: 'asdf',
                series: {
                    title: 'asdf'
                }
            }
        },
        location: {
            searchParameters: {
                record: 'asdfasdf'
            },
            path: '/records'
        },
        collections: {
            collections: [{ identifier: 'asdf-asdf', title: 'asdfasdf' }]
        }
    };

    it('should not have any accessibility violations', async () => {

        const { container } = render(<MockProvider mockReducers={reducers}>
            <Record />
        </MockProvider>);
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});
