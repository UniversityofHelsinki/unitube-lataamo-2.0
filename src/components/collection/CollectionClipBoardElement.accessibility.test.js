import {render} from "@testing-library/react";
import React from "react";
import {axe} from "jest-axe";
import CollectionClipBoardElement from "./CollectionClipBoardElement";


describe('CollectionClipBoardElement', () => {

    it('should not have any accessibility violations', async () => {

        const { container } = render(<CollectionClipBoardElement
            collection={{ identifier: '10ee10101-101-10101ee'}}>
        </CollectionClipBoardElement>);
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});

