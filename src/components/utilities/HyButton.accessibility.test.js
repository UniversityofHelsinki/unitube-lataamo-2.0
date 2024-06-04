import { render } from "@testing-library/react";
import HyButton from "./HyButton.js";
import React from "react";
import { axe } from "jest-axe";
import { MockProvider } from "../../redux/reducers/MockProvider.js";

describe('HyButton', () => {
	it('has no accessibility violations', async () => {
				const { container, rerender } = render(
					<MockProvider>
            <HyButton variant="primary">Uusi tallenne</HyButton>
					</MockProvider>
				);
				const results = await axe(container);
				expect(results).toHaveNoViolations();
	});
});

