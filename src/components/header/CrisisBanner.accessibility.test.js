import { render } from "@testing-library/react";
import CrisisBanner from "./CrisisBanner.js";
import React from "react";
import { axe } from "jest-axe";
import { MockProvider } from "../../redux/reducers/MockProvider.js";

describe('CrisisBanner', () => {
	it('has no accessibility violations', async () => {
				const { container, rerender } = render(
					<MockProvider>
            <CrisisBanner link={{ href: 'https://helsinki.fi', label: 'read more' }}/>
					</MockProvider>
				);
				const results = await axe(container);
				expect(results).toHaveNoViolations();
	});
});

