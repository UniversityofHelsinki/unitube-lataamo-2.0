import { render } from "@testing-library/react";
import DeletionDateUpdateDialog from "./DeletionDateUpdateDialog.js";
import React from "react";
import { axe } from "jest-axe";
import { MockProvider } from "../../../../redux/reducers/MockProvider.js";

describe('DeletionDateUpdateDialog', () => {
	it('has no accessibility violations', async () => {
				const { container, rerender } = render(
					<MockProvider>
						<DeletionDateUpdateDialog />
					</MockProvider>
				);
				const results = await axe(container);
				expect(results).toHaveNoViolations();
	});
});

