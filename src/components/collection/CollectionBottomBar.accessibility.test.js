import {render} from "@testing-library/react";
import CollectionBottomBar from "./CollectionBottomBar";
import React from "react";
import {axe} from "jest-axe";
import { ProgressStatus } from "../../Constants";

describe('CollectionBottomBar', () => {
    it('should not have any accessibility violations', async () => {

        const { container, rerender } = render(
          <CollectionBottomBar progress={{ status: ProgressStatus.COLLECTION_SAVE.IN_PROGRESS, percentage: 0 }} modified={false} disabled={false} isValid={true} undo={() => {}} collection={{ identifier: 'asdf' }} />
        );
        rerender(
          <CollectionBottomBar progress={{ status: ProgressStatus.COLLECTION_SAVE.IN_PROGRESS, percentage: 0 }} modified={false} disabled={false} isValid={true} undo={() => {}} collection={{ identifier: 'asdf' }} />
        );
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});
