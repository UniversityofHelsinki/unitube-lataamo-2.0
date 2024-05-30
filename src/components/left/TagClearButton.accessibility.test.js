import { render } from "@testing-library/react";
import { MockProvider } from "../../redux/reducers/MockProvider";
import React from "react";
import { axe } from "jest-axe";
import TagClearButton from "./TagClearButton";

describe('TagClearButton', () => {
    it('has no accessibility violations', async () => {
        const { container, rerender } = render(
            <MockProvider>
                <TagClearButton />
            </MockProvider>
        );
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });
});
