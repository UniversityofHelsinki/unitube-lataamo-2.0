import { render } from "@testing-library/react";
import Footer from "./Footer.js";
import React from "react";
import { axe } from "jest-axe";
import { MockProvider } from "../../../../redux/reducers/MockProvider.js";

describe('Footer', () => {
	it('has no accessibility violations', async () => {
				const { container, rerender } = render(
					<MockProvider>
            <Footer progressBarProps={{ label: '', type: ''  }} progress="not_started" />
					</MockProvider>
				);
				const results = await axe(container);
				expect(results).toHaveNoViolations();
	});
});

