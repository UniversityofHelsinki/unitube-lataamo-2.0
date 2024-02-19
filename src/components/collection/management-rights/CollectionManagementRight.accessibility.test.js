import {render} from "@testing-library/react";
import CollectionManagementRight from "./CollectionManagementRight";
import React from "react";
import { ReactComponent as GroupIcon } from '../../utilities/icons/avatar-group.svg';
import {axe} from "jest-axe";


describe('CollectionManagementRight', () => {
    it('should not have any accessibility violations', async () => {

        const { container } = render(<CollectionManagementRight onRemove={() => {}} Icon={GroupIcon} label="grp-hy-test"/>);
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});
