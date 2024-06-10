import { render } from "@testing-library/react";
import ConditionalCrisisBanner from "./ConditionalCrisisBanner.js";
import React from "react";
import { axe } from "jest-axe";
import { MockProvider } from "../../redux/reducers/MockProvider.js";

describe('ConditionalCrisisBanner', () => {
	it('has no accessibility violations', async () => {
				const { container, rerender } = render(
					<MockProvider>
						<ConditionalCrisisBanner />
					</MockProvider>
				);
				const results = await axe(container);
				expect(results).toHaveNoViolations();
	});
});

