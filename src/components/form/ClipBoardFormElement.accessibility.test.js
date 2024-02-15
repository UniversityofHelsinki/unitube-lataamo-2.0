import {render} from "@testing-library/react";
import ClipBoardFormElement from "./ClipBoardFormElement";
import React from "react";
import {axe} from "jest-axe";


describe('ClipBoardFormElement', () => {
    const label = 'Otsikko';
    const content = 'sisältö';

    it('should not have any accessibility violations', async () => {

        const { container } = render(<ClipBoardFormElement
            label={label}
            content={content}>
        </ClipBoardFormElement>);
        const results = await axe(container);

        // use the matcher function in the test
        expect(results).toHaveNoViolations();
    });
});

