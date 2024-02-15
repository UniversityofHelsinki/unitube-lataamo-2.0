import {render} from "@testing-library/react";
import CollectionManagementRights from "./CollectionManagementRights";
import React from "react";
import {axe} from "jest-axe";
import {MockProvider} from "../../../redux/reducers/MockProvider";


describe('CollectionManagementRights', () => {
    const users = [{ userName: 'baabenom' }];
    const groups = [{ grpName: 'grp-hy-test' }];

    const reducers = {
        autocompletion: {
            users: [{ userName: 'rkeskiva' }],
            groups: [{ grpName: 'grp-hy-test' }]
        }
    };

    it('should not have any accessibility violations', async () => {

        const { container } = render(    <MockProvider mockReducers={reducers}>
            <CollectionManagementRights users={users} groups={groups} />
        </MockProvider>);
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});
