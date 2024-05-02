import { render } from "@testing-library/react";
import { MockProvider } from "../../redux/reducers/MockProvider";
import React from "react";
import { axe } from "jest-axe";
import LandingPage from "./LandingPage";

describe('LandingPage', () => {
    it('has no accessibility violations', async () => {
        const { container} = render(
            <MockProvider>
                <LandingPage>
                </LandingPage>
            </MockProvider>
        );
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });
});
